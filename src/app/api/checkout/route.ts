import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { items, shippingName, shippingEmail, shippingAddr } = body;

  if (!items?.length || !shippingName || !shippingEmail || !shippingAddr) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Fetch product prices from DB (server-side validation)
  const productIds = items.map((item: { productId: string }) => item.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });

  const productMap = new Map(products.map((p) => [p.id, p]));

  // Calculate total server-side
  let subtotal = 0;
  const lineItems: { productId: string; quantity: number; price: number }[] = [];

  for (const item of items) {
    const product = productMap.get(item.productId);
    if (!product) {
      return NextResponse.json({ error: `Product not found: ${item.productId}` }, { status: 400 });
    }
    const price = product.price;
    subtotal += price * item.quantity;
    lineItems.push({ productId: item.productId, quantity: item.quantity, price });
  }

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  // Get or create a default user
  let user = await prisma.user.findFirst({ where: { role: "customer" } });
  if (!user) {
    user = await prisma.user.create({
      data: { name: shippingName, email: shippingEmail },
    });
  }

  // Create order in DB (status: pending)
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      total,
      shippingName,
      shippingEmail,
      shippingAddr,
      items: {
        create: lineItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
  });

  // Create Stripe Checkout Session
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    customer_email: shippingEmail,
    line_items: lineItems.map((item) => {
      const product = productMap.get(item.productId)!;
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.name,
            images: product.image ? [product.image] : [],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      };
    }),
    mode: "payment",
    success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/cart`,
    metadata: {
      orderId: order.id,
    },
  });

  // Store Stripe session ID in order
  await prisma.order.update({
    where: { id: order.id },
    data: { paymentIntentId: session.id },
  });

  return NextResponse.json({ url: session.url });
}
