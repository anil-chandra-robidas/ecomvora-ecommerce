"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import type { Product } from "@/types";

export default function Newsletter() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[60px]">
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
            <div key={product.id} className="flex-shrink-0 w-[calc(25%-12px)] snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
