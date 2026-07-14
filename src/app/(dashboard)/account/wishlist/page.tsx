"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const wishlistItems = [
  {
    id: "1",
    name: "Organic Avocados Pack",
    price: 8.99,
    image: "🥑",
    category: "fruits",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Fresh Salmon Fillet",
    price: 24.99,
    image: "🐟",
    category: "seafood",
    rating: 4.9,
  },
  {
    id: "3",
    name: "Artisan Sourdough",
    price: 6.49,
    image: "🍞",
    category: "bakery",
    rating: 4.7,
  },
  {
    id: "4",
    name: "Greek Yogurt Organic",
    price: 5.99,
    image: "🥛",
    category: "dairy",
    rating: 4.6,
  },
  {
    id: "5",
    name: "Mixed Berry Medley",
    price: 12.99,
    image: "🫐",
    category: "fruits",
    rating: 4.9,
  },
  {
    id: "6",
    name: "Cold Pressed Orange Juice",
    price: 7.49,
    image: "🍊",
    category: "beverages",
    rating: 4.5,
  },
];

export default function WishlistPage() {
  const [items, setItems] = useState(wishlistItems);

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-20 pb-40 lg:pb-20">
        <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Your Wishlist is Empty</h3>
        <p className="text-gray-400 mb-6">Save your favorite items here for later.</p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 gradient-brand rounded-xl text-black font-semibold hover:shadow-lg hover:shadow-brand/25 transition-all"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <p className="text-sm text-gray-400">{items.length} items in your wishlist</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-surface border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all group"
          >
            {/* Image */}
            <div className="relative h-48 bg-surface-light flex items-center justify-center text-6xl">
              {item.image}
              <button
                onClick={() => removeItem(item.id)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              <p className="text-[10px] text-brand font-semibold uppercase tracking-wider mb-1">
                {item.category}
              </p>
              <h3 className="text-sm font-medium text-white mb-2 line-clamp-2 min-h-[36px]">
                {item.name}
              </h3>
              <div className="flex items-center gap-1 mb-3">
                <span className="text-amber-400 text-sm">★</span>
                <span className="text-xs text-gray-400">{item.rating}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-brand font-bold">{formatPrice(item.price)}</span>
                <button className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center text-black hover:shadow-lg hover:shadow-brand/25 transition-all active:scale-90">
                  <ShoppingCart className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
