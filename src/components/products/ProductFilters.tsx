"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { CATEGORIES } from "@/types";
import { cn, categoryEmojis } from "@/lib/utils";

interface ProductFiltersProps {
  selectedCategory: string;
  searchQuery: string;
  onCategoryChange: (category: string) => void;
  onSearchChange: (query: string) => void;
}

export default function ProductFilters({
  selectedCategory,
  searchQuery,
  onCategoryChange,
  onSearchChange,
}: ProductFiltersProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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
          {selectedCategory && (
            <span className="ml-1 px-2 py-0.5 gradient-brand rounded-full text-xs text-black font-semibold">
              1
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

          {/* Active filters */}
          {(selectedCategory || searchQuery) && (
            <div>
              <h3 className="text-white font-semibold text-sm mb-3">Active Filters</h3>
              <div className="flex flex-wrap gap-2">
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand/10 text-brand rounded-lg text-xs font-medium">
                    {selectedCategory}
                    <button onClick={() => onCategoryChange("")}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand/10 text-brand rounded-lg text-xs font-medium">
                    &quot;{searchQuery}&quot;
                    <button onClick={() => onSearchChange("")}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
