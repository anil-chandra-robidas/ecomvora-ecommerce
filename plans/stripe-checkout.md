# Stripe Checkout Integration Plan

## Overview
Replace fake card inputs with Stripe Checkout (hosted payment page). User fills shipping info → clicks Pay → redirected to Stripe → Stripe confirms payment via webhook → user returns to success page with order details.

---

## API Flow

```
1. User fills shipping form → clicks "Pay"
2. Client POST /api/checkout → creates Order (status: "pending") + Stripe Checkout Session
3. Stripe returns checkoutSession.url → client redirects to Stripe
4. User completes payment on Stripe
5. Stripe fires POST /api/webhooks/stripe → server verifies signature, updates Order status to "paid"
6. Stripe redirects user to /checkout/success?session_id=cs_xxx
7. Success page fetches /api/orders/[id] to display real order details
```

---

## Step-by-Step Implementation

### Step 0: Environment Setup

**Files to modify:**
- `.env` — add `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_BASE_URL`
- `.env.example` — add same vars with placeholder values

**Values:**
```
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

**Stripe account setup instructions (add as comment in .env.example):**
1. Go to https://dashboard.stripe.com/register
2. Once logged in, go to https://dashboard.stripe.com/apikeys
3. Copy the "Secret key" (starts with `sk_test_`)
4. Go to https://dashboard.stripe.com/webhooks
5. Add endpoint: `{YOUR_DOMAIN}/api/webhooks/stripe`
6. Select `checkout.session.completed` event
7. Copy the webhook signing secret (starts with `whsec_`)

---

### Step 1: Install Stripe (verify it's installed)

`stripe` is already in `package.json` at `^22.3.1`. Run:
```bash
npm install
```

---

### Step 2: Create Stripe lib helper

**New file:** `src/lib/stripe.ts`

```ts
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-27.basil",
});
```

Note: Check `package.json` stripe version to pick the correct API version. The `^22.3.1` stripe package uses the `2025-05-27.basil` API version. Verify by checking `node_modules/stripe/package.json` or use whatever `Stripe.VERSION` resolves to.

---

### Step 3: Create checkout session API

**New file:** `src/app/api/checkout/route.ts`

This endpoint:
1. Receives shipping info + cart items from client
2. Validates all fields exist
3. Looks up products from DB to get real prices (server-side validation)
4. Creates Order in DB with status "pending"
5. Creates Stripe Checkout Session with line items from DB
6. Returns the checkout session URL

Key details:
- **Server-side price validation**: Fetch product prices from DB, don't trust client-sent prices. Calculate total from DB prices.
- **line_items**: Use Stripe's `price_data` with product name + unit amount (from DB) for each cart item. Amount in cents (multiply by 100).
- **metadata**: Store orderId in the session metadata so the webhook can find the order.
- **success_url**: `{BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`
- **cancel_url**: `{BASE_URL}/checkout`
- **customer_email**: Use the shipping email.
- **mode**: `"payment"`

Pseudocode:
```ts
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { items, shippingName, shippingEmail, shippingAddr } = body;

  // Validate required fields
  if (!items?.length || !shippingName || !shippingEmail || !shippingAddr) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Fetch products from DB for server-side price validation
  const productIds = items.map((i: any) => i.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });

  // Build line items from DB prices, calculate total
  const lineItems = [];
  let totalFromDb = 0;
  for (const item of items) {
    const product = products.find(p => p.id === item.productId);
    if (!product) {
      return NextResponse.json({ error: `Product ${item.productId} not found` }, { status: 400 });
    }
    const qty = item.quantity;
    totalFromDb += product.price * qty;
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: { name: product.name },
        unit_amount: Math.round(product.price * 100), // cents
      },
      quantity: qty,
    });
  }

  // Add tax (8%)
  const tax = totalFromDb * 0.08;
  const grandTotal = totalFromDb + tax;

  // Get or create user
  let user = await prisma.user.findFirst({ where: { role: "customer" } });
  if (!user) {
    user = await prisma.user.create({
      data: { name: shippingName, email: shippingEmail },
    });
  }

  // Create order in DB
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      total: grandTotal,
      shippingName,
      shippingEmail,
      shippingAddr,
      status: "pending",
      items: {
        create: items.map((item: any) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: products.find(p => p.id === item.productId)!.price,
        })),
      },
    },
  });

  // Create Stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
    customer_email: shippingEmail,
    metadata: { orderId: order.id },
  });

  // Store session ID in order
  await prisma.order.update({
    where: { id: order.id },
    data: { paymentIntentId: session.id },
  });

  return NextResponse.json({ url: session.url });
}
```

---

### Step 4: Create webhook endpoint

**New file:** `src/app/api/webhooks/stripe/route.ts`

This endpoint:
1. Reads raw body (must use `request.text()`, not `request.json()`)
2. Verifies Stripe signature using `stripe.webhooks.constructEvent()`
3. On `checkout.session.completed`: looks up order by `metadata.orderId`, updates status to `"paid"`

Key details:
- **Raw body**: Use `await request.text()` to get the raw body string for signature verification.
- **Signature header**: Read from `request.headers.get("stripe-signature")`.
- **Construct event**: `stripe.webhooks.constructEvent(body, sig, webhookSecret)`
- **Idempotency**: Check if order is already "paid" before updating.
- **Return 200** always (Stripe retries on non-200).

Pseudocode:
```ts
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if (orderId) {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "paid" },
      });
    }
  }

  return NextResponse.json({ received: true });
}
```

---

### Step 5: Add GET-by-ID endpoint for orders

**File to modify:** `src/app/api/orders/route.ts` — no changes needed here.

**New file:** `src/app/api/orders/[id]/route.ts`

The success page needs to fetch order details. Add a GET endpoint for a single order:

```ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: { include: { product: true } },
      user: { select: { name: true, email: true } },
    },
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json(order);
}
```

---

### Step 6: Create session-to-order lookup API

**New file:** `src/app/api/orders/by-session/[sessionId]/route.ts`

The success page receives a Stripe `session_id`, not an order ID. We need to look up the order by `paymentIntentId` (which stores the Stripe session ID):

```ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;

  const order = await prisma.order.findFirst({
    where: { paymentIntentId: sessionId },
    include: {
      items: { include: { product: true } },
      user: { select: { name: true, email: true } },
    },
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json(order);
}
```

---

### Step 7: Update checkout page

**File to modify:** `src/app/checkout/page.tsx`

Changes:
1. **Remove card inputs** (cardNumber, expiry, cvc fields and the entire "Payment Details" section)
2. **Remove fake payment simulation** (the `setTimeout` and direct POST to `/api/orders`)
3. **Submit handler** calls `POST /api/checkout` with shipping info + items, then redirects to returned `url`
4. **Remove cardNumber, expiry, cvc from form state**
5. **Remove demo notice** ("This is a demo. No real payment will be charged.")

Updated handler pseudocode:
```ts
async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
        shippingName: form.name,
        shippingEmail: form.email,
        shippingAddr: `${form.address}, ${form.city} ${form.zip}`,
      }),
    });

    const data = await res.json();
    if (data.url) {
      clearCart();
      window.location.href = data.url; // full redirect to Stripe
    }
  } catch {
    console.error("Checkout failed");
  } finally {
    setLoading(false);
  }
}
```

Form state becomes:
```ts
const [form, setForm] = useState({
  name: "",
  email: "",
  address: "",
  city: "",
  zip: "",
});
```

Remove the "Payment Details" `<div>` block entirely (lines 137-168).
Remove the "This is a demo" `<p>` (line 225-227).

---

### Step 8: Update success page

**File to modify:** `src/app/checkout/success/page.tsx`

Changes:
1. Read `session_id` from URL search params
2. Fetch order from `/api/orders/by-session/{session_id}`
3. Display real order ID, items, total
4. Handle loading and error states

Updated component pseudocode:
```tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { Order } from "@/types";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }
    fetch(`/api/orders/by-session/${sessionId}`)
      .then(res => res.json())
      .then(data => {
        setOrder(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [sessionId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-400">Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 gradient-brand rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-black" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">Order Confirmed!</h1>
        <p className="text-gray-400 mb-8">
          Thank you for your order. We're preparing your fresh items for delivery.
          You'll receive a confirmation email shortly.
        </p>

        {order && (
          <div className="bg-surface rounded-2xl border border-white/5 p-6 mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Package className="w-6 h-6 text-brand" />
              <span className="text-white font-semibold">
                Order #ECV-{order.id.slice(-6).toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-2">
              Total: {formatPrice(order.total)}
            </p>
            <p className="text-sm text-gray-400">
              Status: <span className="text-green-400 capitalize">{order.status}</span>
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 gradient-brand rounded-xl text-black font-semibold hover:shadow-xl hover:shadow-brand/25 transition-all"
          >
            Continue Shopping
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/10 rounded-xl text-white font-semibold hover:bg-white/5 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
```

Note: This page now needs `"use client"` since it uses `useSearchParams` and `useState`/`useEffect`.

---

### Step 9: Update TypeScript types

**File to modify:** `src/types/index.ts`

Add `paymentIntentId` to the Order type and add "paid" to the status union:

```ts
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "paid" | "processing" | "shipped" | "delivered";
  shippingName: string;
  shippingEmail: string;
  shippingAddr: string;
  paymentIntentId?: string;
  createdAt: Date;
}
```

---

### Step 10: Mark checkout route as dynamic

The checkout API route must not be statically cached. Add at the top of `src/app/api/checkout/route.ts`:

```ts
export const dynamic = "force-dynamic";
```

Same for the webhook route — add to `src/app/api/webhooks/stripe/route.ts`:

```ts
export const dynamic = "force-dynamic";
```

---

## Files Summary

| Action | File | Description |
|--------|------|-------------|
| Modify | `.env` | Add STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, NEXT_PUBLIC_BASE_URL |
| Modify | `.env.example` | Add same vars with placeholders |
| Create | `src/lib/stripe.ts` | Stripe client singleton |
| Create | `src/app/api/checkout/route.ts` | Creates checkout session + order |
| Create | `src/app/api/webhooks/stripe/route.ts` | Handles payment confirmation |
| Create | `src/app/api/orders/[id]/route.ts` | GET single order by ID |
| Create | `src/app/api/orders/by-session/[sessionId]/route.ts` | Lookup order by Stripe session ID |
| Modify | `src/app/checkout/page.tsx` | Remove card inputs, call /api/checkout, redirect to Stripe |
| Modify | `src/app/checkout/success/page.tsx` | Fetch real order details, display them |
| Modify | `src/types/index.ts` | Add paymentIntentId field, add "paid" to status union |

---

## Testing Approach

1. **Create Stripe test account** and get `sk_test_` key
2. **Set up webhook** in Stripe dashboard pointing to ngrok URL or deployed URL
3. **Test happy path**: Fill form → redirect to Stripe → pay with test card `4242 4242 4242 4242` → success page shows order
4. **Test webhook**: After payment, verify order status changed from "pending" to "paid" in DB
5. **Test cancellation**: Click pay → go to Stripe → cancel → return to checkout page
6. **Test error cases**:
   - Empty cart → redirected to /cart
   - Missing form fields → 400 error
   - Invalid product ID → 400 error
   - Webhook with bad signature → 400 error
7. **Test with Stripe CLI** (for local dev):
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
   This forwards webhook events to local dev server.
8. **Test card numbers**:
   - `4242 4242 4242 4242` — succeeds
   - `4000 0000 0000 0002` — declines
   - `4000 0025 0000 3155` — requires 3D Secure

---

## Deployment Notes (Vercel)

- Set env vars in Vercel dashboard
- Webhook endpoint must be publicly accessible
- For local dev, use `stripe listen --forward-to` or ngrok
- Stripe Checkout sessions expire after 24 hours — no cleanup needed
