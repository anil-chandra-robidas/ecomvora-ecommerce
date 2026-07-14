"use client";

import Link from "next/link";
import { CATEGORIES } from "@/types";
import { categoryEmojis } from "@/lib/utils";
import Animate from "@/components/ui/Animate";

const categoryDescriptions: Record<string, string> = {
  tops: "T-shirts, shirts & blouses",
  bottoms: "Jeans, trousers & shorts",
  dresses: "Casual & evening dresses",
  outerwear: "Jackets, coats & blazers",
  accessories: "Watches, bags & more",
  footwear: "Sneakers, boots & heels",
};

export default function FeaturedCategories() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[120px] pb-[60px]">
      <Animate>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">
            Shop by <span className="text-gradient-brand">Category</span>
          </h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Explore our curated selection of premium fashion categories
          </p>
        </div>
      </Animate>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {CATEGORIES.map((cat, i) => (
          <Animate key={cat} delay={i * 0.08}>
            <Link
              href={`/products?category=${cat}`}
              className="group relative bg-surface rounded-2xl border border-white/5 p-6 text-center hover:border-brand/30 hover:shadow-xl hover:shadow-brand/5 transition-all duration-300 block"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {categoryEmojis[cat]}
              </div>
              <h3 className="text-white font-semibold text-sm capitalize mb-1">{cat}</h3>
              <p className="text-gray-500 text-xs">{categoryDescriptions[cat]}</p>
            </Link>
          </Animate>
        ))}
      </div>
    </section>
  );
}
