"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ShoppingCart,
  Minus,
  Plus,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  ChevronLeft,
  Heart,
  Share2,
  Clock,
  Check,
  Package,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice, categoryEmojis } from "@/lib/utils";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/types";

export default function ProductDetailPage() {
  const params = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "nutrition" | "reviews">("details");

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  async function fetchProduct() {
    try {
      const res = await fetch(`/api/products/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setProduct(data);

        // Fetch related products (same category, excluding current)
        const relatedRes = await fetch(`/api/products?category=${data.category}`);
        if (relatedRes.ok) {
          const allProducts = await relatedRes.json();
          const related = allProducts
            .filter((p: Product) => p.id !== data.id)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      }
    } catch {
      console.error("Failed to fetch product");
    } finally {
      setLoading(false);
    }
  }

  function handleAddToCart() {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-2xl font-bold text-white mb-4">Product Not Found</h1>
        <Link href="/products" className="text-brand hover:underline">
          Back to Shop
        </Link>
      </div>
    );
  }

  const originalPrice = product.price * 1.3;
  const discountPercent = Math.round(((originalPrice - product.price) / originalPrice) * 100);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[60px]">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-white transition-colors">Shop</Link>
        <span>/</span>
        <Link href={`/products?category=${product.category}`} className="hover:text-white transition-colors capitalize">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-300 truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left — Image */}
        <div className="relative">
          <div className="relative bg-gradient-to-br from-surface to-surface-light rounded-3xl border border-white/5 overflow-hidden aspect-square">
            {/* Discount badge */}
            {product.featured && (
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                <div className="gradient-brand px-3 py-1.5 rounded-xl text-xs font-bold text-black flex items-center gap-1">
                  <Star className="w-3 h-3" fill="currentColor" />
                  Featured
                </div>
                <div className="bg-emerald-500 px-3 py-1.5 rounded-xl text-xs font-bold text-white">
                  -{discountPercent}% OFF
                </div>
              </div>
            )}

            {/* Wishlist */}
            <button
              onClick={() => setWishlisted(!wishlisted)}
              className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                wishlisted
                  ? "bg-red-500 text-white"
                  : "bg-white/10 backdrop-blur-sm text-gray-400 hover:text-white hover:bg-white/20"
              }`}
            >
              <Heart className={`w-5 h-5 ${wishlisted ? "fill-current" : ""}`} />
            </button>

            {/* Product Image */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              <div className="hidden items-center justify-center w-full h-full text-[120px]">
                {categoryEmojis[product.category] || "📦"}
              </div>
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-3 mt-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-20 h-20 rounded-xl border overflow-hidden cursor-pointer transition-all ${
                  i === 0 ? "border-brand" : "border-white/10 hover:border-white/20"
                }`}
              >
                <img
                  src={product.image}
                  alt=""
                  className="w-full h-full object-contain p-2"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right — Details */}
        <div className="flex flex-col">
          {/* Category */}
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-brand/10 text-brand text-xs font-semibold rounded-lg uppercase tracking-wider">
              {product.category}
            </span>
            {product.stock < 10 && product.stock > 0 && (
              <span className="px-3 py-1 bg-red-500/10 text-red-400 text-xs font-semibold rounded-lg">
                Only {product.stock} left!
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-4 h-4 ${s <= 4 ? "text-amber-400 fill-amber-400" : "text-gray-600"}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-400">4.8</span>
            <span className="text-sm text-gray-500">(128 reviews)</span>
            <span className="text-sm text-gray-500">·</span>
            <span className="text-sm text-emerald-400 font-medium">In Stock</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-bold text-brand">{formatPrice(product.price)}</span>
            <span className="text-lg text-gray-500 line-through">{formatPrice(originalPrice)}</span>
            <span className="px-2.5 py-1 bg-emerald-500/15 text-emerald-400 text-sm font-bold rounded-lg">
              Save {discountPercent}%
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-400 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Delivery Info */}
          <div className="bg-surface rounded-2xl border border-white/5 p-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Free Delivery</p>
                  <p className="text-gray-500 text-xs">Orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Express Delivery</p>
                  <p className="text-gray-500 text-xs">1-2 business days</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <RotateCcw className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Easy Returns</p>
                  <p className="text-gray-500 text-xs">7-day return policy</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Secure Payment</p>
                  <p className="text-gray-500 text-xs">100% protected</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            {/* Quantity */}
            <div className="flex items-center bg-surface border border-white/10 rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-white/5 transition-colors"
              >
                <Minus className="w-4 h-4 text-gray-400" />
              </button>
              <span className="px-6 py-3 text-white font-semibold min-w-[60px] text-center tabular-nums">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 hover:bg-white/5 transition-colors"
              >
                <Plus className="w-4 h-4 text-gray-400" />
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-black font-semibold transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${
                added
                  ? "bg-emerald-500 text-white"
                  : "gradient-brand hover:shadow-xl hover:shadow-brand/25"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </>
              )}
            </button>

            {/* Share */}
            <button className="p-3.5 bg-surface border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Subtotal */}
          <div className="flex items-center justify-between bg-surface rounded-xl border border-white/5 p-4 mb-6">
            <span className="text-gray-400 text-sm">Subtotal ({quantity} item{quantity > 1 ? "s" : ""})</span>
            <span className="text-white font-bold text-lg">{formatPrice(product.price * quantity)}</span>
          </div>

          {/* Tabs */}
          <div className="border-t border-white/5 pt-6">
            <div className="flex gap-1 bg-surface rounded-xl p-1 mb-4">
              {(["details", "nutrition", "reviews"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab
                      ? "gradient-brand text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="min-h-[80px]">
              {activeTab === "details" && (
                <div className="text-sm text-gray-400 leading-relaxed space-y-2">
                  <p>{product.description}</p>
                  <p className="text-gray-500">Category: <span className="text-gray-300 capitalize">{product.category}</span></p>
                  <p className="text-gray-500">SKU: <span className="text-gray-300">{product.slug}</span></p>
                </div>
              )}
              {activeTab === "nutrition" && (
                <div className="text-sm text-gray-400">
                  <p>Nutritional information coming soon.</p>
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="text-sm text-gray-400">
                  <p>Customer reviews coming soon.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 pt-12 border-t border-white/5">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                Related <span className="text-gradient-brand">Products</span>
              </h2>
              <p className="text-gray-400 text-sm">You might also like these from {product.category}</p>
            </div>
            <Link
              href={`/products?category=${product.category}`}
              className="text-sm text-brand hover:text-brand-light transition-colors font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
