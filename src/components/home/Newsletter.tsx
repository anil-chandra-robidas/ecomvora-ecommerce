"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ShoppingCart, Star, Flame } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice, categoryEmojis } from "@/lib/utils";
import type { Product } from "@/types";

export default function Newsletter() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data.slice(0, 12));
        }
      })
      .catch(() => {});
  }, []);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [products]);

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.75;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  if (products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/10 text-red-400 rounded-lg text-xs font-bold uppercase tracking-wider mb-3">
            <Flame className="w-3 h-3" />
            Just In
          </span>
          <h2 className="text-3xl font-bold text-white">
            Stay Fresh with <span className="text-brand">EcomVora</span>
          </h2>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Slider */}
      <div className="relative">
        {/* Fade edges */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
        )}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />
        )}

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="group flex-shrink-0 w-[220px] snap-start bg-surface border border-white/5 rounded-2xl overflow-hidden hover:border-brand/20 hover:shadow-xl hover:shadow-brand/5 transition-all duration-300"
            >
              {/* Image */}
              <Link href={`/products/${product.id}`} className="block relative aspect-square bg-gradient-to-br from-surface-light to-surface overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center p-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <div className="hidden items-center justify-center w-full h-full text-5xl">
                    {categoryEmojis[product.category] || "📦"}
                  </div>
                </div>

                {product.featured && (
                  <span className="absolute top-2 left-2 gradient-brand px-2 py-0.5 rounded-md text-[10px] font-bold text-black">
                    Featured
                  </span>
                )}
              </Link>

              {/* Content */}
              <div className="p-3">
                <p className="text-[10px] text-brand font-semibold uppercase tracking-wider mb-1">
                  {product.category}
                </p>
                <Link href={`/products/${product.id}`}>
                  <h3 className="text-white text-sm font-medium mb-2 line-clamp-2 min-h-[36px] group-hover:text-brand transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-[11px] text-gray-400">4.8</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-brand font-bold">{formatPrice(product.price)}</span>
                  <button
                    onClick={() => addItem(product)}
                    className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center text-black hover:shadow-lg hover:shadow-brand/25 transition-all active:scale-90"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
