"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/types";
import ProductCard from "@/components/products/ProductCard";
import type { Product } from "@/types";

const ITEMS_PER_PAGE = 8;

const tabs = [
  { id: "all", label: "All" },
  ...CATEGORIES.map((cat) => ({ id: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1) })),
];

export default function NewArrivals({ products }: { products: Product[] }) {
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = activeTab === "all"
    ? products
    : products.filter((p) => p.category === activeTab);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[60px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-block px-3 py-1 bg-brand/10 text-brand rounded-lg text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 inline-block mr-1" />
            Just In
          </span>
          <h2 className="text-3xl font-bold text-white">
            New <span className="text-brand">Arrivals</span>
          </h2>
        </div>
        <Link
          href="/products?sort=newest"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm text-brand hover:text-brand-light transition-colors font-medium"
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200",
              activeTab === tab.id
                ? "gradient-brand text-black"
                : "bg-surface border border-white/5 text-gray-400 hover:text-white hover:border-white/10"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {paginated.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {paginated.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500">No products found in this category</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-surface border border-white/5 text-gray-400 hover:text-white hover:border-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={cn(
                "w-10 h-10 rounded-lg text-sm font-medium transition-all",
                currentPage === page
                  ? "gradient-brand text-black"
                  : "bg-surface border border-white/5 text-gray-400 hover:text-white hover:border-white/10"
              )}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-surface border border-white/5 text-gray-400 hover:text-white hover:border-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Mobile View All */}
      <div className="sm:hidden mt-8 text-center">
        <Link
          href="/products?sort=newest"
          className="inline-flex items-center gap-2 px-6 py-3 gradient-brand rounded-xl text-black font-semibold"
        >
          View All Products <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
