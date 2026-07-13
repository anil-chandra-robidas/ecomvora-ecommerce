"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Heart, Truck, Star, Eye, Zap } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice, categoryEmojis } from "@/lib/utils";
import type { Product } from "@/types";

function CountdownTimer() {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = Date.now() + 24 * 60 * 60 * 1000;

    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setTime({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-1">
      {[
        { val: time.hours },
        { val: time.minutes },
        { val: time.seconds },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-1">
          <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-1.5 py-1 rounded min-w-[24px] text-center">
            {String(item.val).padStart(2, "0")}
          </span>
          {i < 2 && <span className="text-brand text-[10px] font-bold">:</span>}
        </div>
      ))}
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const originalPrice = product.price * 1.3;
  const discountPercent = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  };

  return (
    <div className="group bg-surface rounded-2xl border border-white/5 overflow-hidden hover:border-brand/20 hover:shadow-2xl hover:shadow-brand/10 transition-all duration-500">
      {/* Image Area */}
      <div className="relative aspect-square bg-gradient-to-br from-surface-light to-surface overflow-hidden" style={{ perspective: "1000px" }}>
        {/* Product Image with flip */}
        <div className="absolute inset-0 transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(180deg)]" style={{ transformStyle: "preserve-3d" }}>
          <Link href={`/products/${product.id}`} className="block absolute inset-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain backface-hidden"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const fallback = target.nextElementSibling as HTMLElement;
                if (fallback) fallback.style.display = "flex";
              }}
            />
            <div className="hidden items-center justify-center w-full h-full text-7xl sm:text-8xl">
              {categoryEmojis[product.category] || "📦"}
            </div>
          </Link>
        </div>

        {/* Top Left — Featured Badge */}
        {product.featured && (
          <div className="absolute top-4 left-4 z-20">
            <div className="bg-brand px-2.5 py-1 rounded-lg text-[11px] font-bold text-white flex items-center gap-1 shadow-lg">
              <Zap className="w-3 h-3" />
              Featured
            </div>
          </div>
        )}

        {/* Top Right — Discount Badge */}
        <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-1.5">
          <div className="bg-emerald-500 px-2 py-1 rounded-lg text-[10px] font-bold text-white shadow-lg">
            -{discountPercent}%
          </div>
          {/* Low Stock Warning */}
          {product.stock < 10 && product.stock > 0 && (
            <div className="bg-red-500 px-2 py-1 rounded-lg text-[10px] font-bold text-white shadow-lg">
              Only {product.stock} left!
            </div>
          )}
        </div>

        {/* Bottom Right — Wishlist Heart */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className={`absolute bottom-4 right-4 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
            isWishlisted
              ? "bg-red-500 text-white"
              : "bg-black/60 backdrop-blur-md text-white hover:bg-red-500"
          }`}
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
        </button>

        {/* Bottom Left — Countdown Timer */}
        <div className="absolute bottom-4 left-4 z-20">
          <CountdownTimer />
        </div>

        {/* Left Side — Quick View (appears on hover) */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <Link
            href={`/products/${product.id}`}
            className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-brand transition-all shadow-xl"
          >
            <Eye className="w-5 h-5" />
          </Link>
        </div>

        {/* Right Side — Add to Cart (appears on hover) */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <button
            onClick={handleAddToCart}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl ${
              addedToCart
                ? "bg-emerald-500 text-white"
                : "bg-black/60 backdrop-blur-md text-white hover:bg-brand"
            }`}
          >
            {addedToCart ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <ShoppingCart className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category + Rating Row */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-brand font-semibold uppercase tracking-wider bg-brand/10 px-2 py-0.5 rounded">
            {product.category}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-xs font-medium text-gray-300">4.8</span>
            <span className="text-[10px] text-gray-500">(120)</span>
          </div>
        </div>

        {/* Product Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="text-white font-semibold text-sm mb-2 line-clamp-2 group-hover:text-brand transition-colors duration-300 min-h-[40px]">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-brand font-bold text-xl">{formatPrice(product.price)}</span>
          <span className="text-gray-500 text-sm line-through">{formatPrice(originalPrice)}</span>
        </div>

        {/* Delivery Info */}
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <Truck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Free Delivery</span>
          <span className="text-gray-600">•</span>
          <span className="text-emerald-400 font-medium">In Stock</span>
        </div>
      </div>
    </div>
  );
}
