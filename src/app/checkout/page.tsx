"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const tax = total * 0.08;
  const grandTotal = total + tax;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Create order via API
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
          })),
          shippingName: form.name,
          shippingEmail: form.email,
          shippingAddr: `${form.address}, ${form.city} ${form.zip}`,
          total: grandTotal,
        }),
      });

      if (res.ok) {
        clearCart();
        router.push("/checkout/success");
      }
    } catch {
      console.error("Order failed");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items.length, router]);

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-white mb-8">
        <span className="text-gradient-brand">Checkout</span>
      </h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-[1fr_400px] gap-8">
        {/* Shipping + Payment */}
        <div className="space-y-8">
          {/* Shipping */}
          <div className="bg-surface rounded-2xl border border-white/5 p-6">
            <h2 className="text-lg font-bold text-white mb-6">Shipping Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
              />
              <div className="sm:col-span-2">
                <Input
                  label="Address"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="123 Main St"
                  required
                />
              </div>
              <Input
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="New York"
                required
              />
              <Input
                label="ZIP Code"
                name="zip"
                value={form.zip}
                onChange={handleChange}
                placeholder="10001"
                required
              />
            </div>
          </div>

          {/* Payment */}
          <div className="bg-surface rounded-2xl border border-white/5 p-6">
            <h2 className="text-lg font-bold text-white mb-6">Payment Details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Input
                  label="Card Number"
                  name="cardNumber"
                  value={form.cardNumber}
                  onChange={handleChange}
                  placeholder="4242 4242 4242 4242"
                  required
                />
              </div>
              <Input
                label="Expiry Date"
                name="expiry"
                value={form.expiry}
                onChange={handleChange}
                placeholder="12/28"
                required
              />
              <Input
                label="CVC"
                name="cvc"
                value={form.cvc}
                onChange={handleChange}
                placeholder="123"
                required
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-surface rounded-2xl border border-white/5 p-6 h-fit sticky top-24">
          <h2 className="text-lg font-bold text-white mb-6">Order Summary</h2>

          <div className="space-y-3 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-surface-light rounded-lg flex items-center justify-center text-lg shrink-0">
                  {item.product.image}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{item.product.name}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
                <span className="text-sm text-white font-medium">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-white">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Shipping</span>
              <span className="text-green-400">Free</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Tax</span>
              <span className="text-white">{formatPrice(tax)}</span>
            </div>
          </div>

          <div className="border-t border-white/10 mt-4 pt-4">
            <div className="flex justify-between">
              <span className="text-white font-bold text-lg">Total</span>
              <span className="text-brand font-bold text-lg">
                {formatPrice(grandTotal)}
              </span>
            </div>
          </div>

          <Button
            type="submit"
            fullWidth
            className="mt-6"
            disabled={loading}
          >
            {loading ? "Processing..." : `Pay ${formatPrice(grandTotal)}`}
          </Button>

          <p className="text-xs text-gray-500 text-center mt-4">
            This is a demo. No real payment will be charged.
          </p>
        </div>
      </form>
    </div>
  );
}
