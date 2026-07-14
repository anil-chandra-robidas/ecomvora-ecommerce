"use client";

import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, itemCount, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="text-7xl mb-6">🛒</div>
        <h1 className="text-3xl font-bold text-white mb-3">Your Cart is Empty</h1>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Looks like you haven&apos;t added any items yet. Start shopping to fill your cart!
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-7 py-3.5 gradient-brand rounded-xl text-black font-semibold hover:shadow-xl hover:shadow-brand/25 transition-all"
        >
          <ShoppingBag className="w-5 h-5" />
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-white mb-8">
        Shopping <span className="text-gradient-brand">Cart</span>
      </h1>

      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        {/* Cart items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 bg-surface rounded-2xl border border-white/5 p-4 sm:p-6"
            >
              {/* Image */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-surface-light rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
                <div className="hidden items-center justify-center w-full h-full text-4xl">
                  {item.product.category === "tops" ? "👕" : item.product.category === "bottoms" ? "👖" : item.product.category === "dresses" ? "👗" : item.product.category === "outerwear" ? "🧥" : item.product.category === "accessories" ? "⌚" : "👟"}
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${item.product.id}`}
                  className="text-white font-semibold hover:text-brand transition-colors line-clamp-1"
                >
                  {item.product.name}
                </Link>
                <p className="text-sm text-gray-500 capitalize mt-0.5">
                  {item.product.category}
                </p>

                <div className="flex items-center justify-between mt-3">
                  {/* Quantity controls */}
                  <div className="flex items-center border border-white/10 rounded-lg overflow-hidden">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                      className="p-2 hover:bg-white/5 transition-colors disabled:opacity-30"
                    >
                      <Minus className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                    <span className="px-3 py-1.5 text-white text-sm font-medium min-w-[40px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="p-2 hover:bg-white/5 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-brand font-bold">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Clear cart */}
          <div className="flex justify-between items-center pt-4">
            <button
              onClick={clearCart}
              className="text-sm text-gray-500 hover:text-red-400 transition-colors"
            >
              Clear Cart
            </button>
            <Link
              href="/products"
              className="text-sm text-brand hover:text-brand-light transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-surface rounded-2xl border border-white/5 p-6 h-fit sticky top-24">
          <h2 className="text-lg font-bold text-white mb-6">Order Summary</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">
                Subtotal ({itemCount} item{itemCount !== 1 ? "s" : ""})
              </span>
              <span className="text-white font-medium">{formatPrice(total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Shipping</span>
              <span className="text-green-400 font-medium">Free</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Tax (estimated)</span>
              <span className="text-white font-medium">
                {formatPrice(total * 0.08)}
              </span>
            </div>
          </div>

          <div className="border-t border-white/10 mt-4 pt-4">
            <div className="flex justify-between">
              <span className="text-white font-bold text-lg">Total</span>
              <span className="text-brand font-bold text-lg">
                {formatPrice(total + total * 0.08)}
              </span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="mt-6 w-full flex items-center justify-center gap-2 px-7 py-3.5 gradient-brand rounded-xl text-black font-semibold hover:shadow-xl hover:shadow-brand/25 transition-all active:scale-95"
          >
            Proceed to Checkout
            <ArrowRight className="w-5 h-5" />
          </Link>

          <p className="text-xs text-gray-500 text-center mt-4">
            Secure checkout powered by Stripe
          </p>
        </div>
      </div>
    </div>
  );
}
