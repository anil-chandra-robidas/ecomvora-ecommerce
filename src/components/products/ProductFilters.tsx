"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, DollarSign } from "lucide-react";
import { CATEGORIES } from "@/types";
import { cn, categoryEmojis } from "@/lib/utils";

interface ProductFiltersProps {
  selectedCategory: string;
  searchQuery: string;
  priceRange: [number, number];
  onCategoryChange: (category: string) => void;
  onSearchChange: (query: string) => void;
  onPriceChange: (range: [number, number]) => void;
}

export default function ProductFilters({
  selectedCategory,
  searchQuery,
  priceRange,
  onCategoryChange,
  onSearchChange,
  onPriceChange,
}: ProductFiltersProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(priceRange[0].toString());
  const [maxPrice, setMaxPrice] = useState(priceRange[1].toString());

  const handlePriceApply = () => {
    const min = parseInt(minPrice) || 0;
    const max = parseInt(maxPrice) || 9999;
    onPriceChange([min, max]);
  };

  return (
    <>
      {/* Mobile filter toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="flex items-center gap-2 px-4 py-2.5 bg-surface-light rounded-xl text-sm text-gray-300 hover:text-white transition-colors w-full justify-center border border-white/10"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {(selectedCategory || priceRange[0] > 0 || priceRange[1] < 9999) && (
            <span className="ml-1 px-2 py-0.5 gradient-brand rounded-full text-xs text-black font-semibold">
              {(selectedCategory ? 1 : 0) + (priceRange[0] > 0 || priceRange[1] < 9999 ? 1 : 0)}
            </span>
          )}
        </button>
      </div>

      {/* Filters panel */}
      <div
        className={cn(
          "lg:block",
          mobileFiltersOpen ? "block" : "hidden"
        )}
      >
        <div className="bg-surface rounded-2xl border border-white/5 p-5 space-y-6">
          {/* Search */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Search</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-9 pr-3 py-2 bg-dark border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand/50"
              />
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Categories</h3>
            <div className="space-y-1">
              <button
                onClick={() => onCategoryChange("")}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all text-left",
                  !selectedCategory
                    ? "bg-brand/10 text-brand"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                All Products
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all text-left capitalize",
                    selectedCategory === cat
                      ? "bg-brand/10 text-brand"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <span>{categoryEmojis[cat]}</span>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">Price Range</h3>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Min"
                  min="0"
                  className="w-full pl-7 pr-2 py-2 bg-dark border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand/50"
                />
              </div>
              <span className="text-gray-500 text-sm">—</span>
              <div className="relative flex-1">
                <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Max"
                  min="0"
                  className="w-full pl-7 pr-2 py-2 bg-dark border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand/50"
                />
              </div>
            </div>
            <button
              onClick={handlePriceApply}
              className="w-full mt-3 px-4 py-2 bg-brand/10 text-brand rounded-lg text-sm font-medium hover:bg-brand/20 transition-colors"
            >
              Apply Price
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
