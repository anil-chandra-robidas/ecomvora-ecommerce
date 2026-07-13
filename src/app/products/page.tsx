"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductGrid from "@/components/products/ProductGrid";
import ProductFilters from "@/components/products/ProductFilters";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Product } from "@/types";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  useEffect(() => {
    fetchProducts();
  }, [category, searchQuery]);

  async function fetchProducts() {
    setLoading(true);
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (searchQuery) params.set("search", searchQuery);

    try {
      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      setProducts(data);
    } catch {
      console.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {category ? (
            <>
              <span className="capitalize">{category}</span>{" "}
              <span className="text-gradient-brand">Products</span>
            </>
          ) : (
            <>
              All <span className="text-gradient-brand">Products</span>
            </>
          )}
        </h1>
        <p className="text-gray-400">
          {products.length} product{products.length !== 1 ? "s" : ""} available
        </p>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar */}
        <ProductFilters
          selectedCategory={category}
          searchQuery={searchQuery}
          onCategoryChange={setCategory}
          onSearchChange={setSearchQuery}
        />

        {/* Products grid */}
        <div>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <LoadingSpinner size="lg" />
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
