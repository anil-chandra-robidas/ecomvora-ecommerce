import Link from "next/link";
import { CheckCircle, Package, ArrowRight } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-20 h-20 gradient-brand rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-black" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">Order Confirmed!</h1>
        <p className="text-gray-400 mb-8">
          Thank you for your order. We&apos;re preparing your fresh items for delivery.
          You&apos;ll receive a confirmation email shortly.
        </p>

        <div className="bg-surface rounded-2xl border border-white/5 p-6 mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Package className="w-6 h-6 text-brand" />
            <span className="text-white font-semibold">Order #ECV-{Math.random().toString(36).substring(2, 8).toUpperCase()}</span>
          </div>
          <p className="text-sm text-gray-400">
            Estimated delivery: 2-3 business days
          </p>
        </div>

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
