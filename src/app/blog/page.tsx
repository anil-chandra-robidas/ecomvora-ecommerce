"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 6;

const posts = [
  {
    slug: "healthy-eating-on-a-budget",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop",
    category: "Nutrition",
    title: "Healthy Eating on a Budget: Smart Tips for Fresh Grocery Shopping",
    excerpt: "Discover practical strategies to fill your cart with nutritious, fresh produce without breaking the bank. From seasonal picks to smart meal planning.",
    date: "Jan 15, 2025",
  },
  {
    slug: "seasonal-produce-guide",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=600&h=400&fit=crop",
    category: "Seasonal",
    title: "What's in Season: Your Guide to Fresh Produce This Month",
    excerpt: "Learn which fruits and vegetables are at their peak flavor and best value right now. Make the most of nature's calendar.",
    date: "Jan 10, 2025",
  },
  {
    slug: "farm-to-table-benefits",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop",
    category: "Lifestyle",
    title: "Farm to Table: Why Local Sourcing Matters for Your Health",
    excerpt: "Explore the benefits of choosing locally sourced food and how it supports your community, the environment, and your well-being.",
    date: "Jan 5, 2025",
  },
  {
    slug: "meal-prep-for-beginners",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&h=400&fit=crop",
    category: "Tips",
    title: "Meal Prep for Beginners: Save Time with Fresh Ingredients",
    excerpt: "Start your meal prep journey with simple strategies using fresh groceries. Save time, reduce waste, and eat healthier every day.",
    date: "Dec 28, 2024",
  },
  {
    slug: "organic-vs-conventional",
    image: "https://images.unsplash.com/photo-1506617420156-8e4536971650?w=600&h=400&fit=crop",
    category: "Education",
    title: "Organic vs Conventional: What You Need to Know",
    excerpt: "A balanced look at organic and conventional produce — the differences, the benefits, and how to make the right choice for your family.",
    date: "Dec 20, 2024",
  },
  {
    slug: "winter-comfort-recipes",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop",
    category: "Recipes",
    title: "Winter Comfort Recipes Using Fresh Groceries",
    excerpt: "Warm up with hearty soups, stews, and baked goods made from seasonal ingredients. Comfort food at its freshest.",
    date: "Dec 15, 2024",
  },
  {
    slug: "smoothie-bowl-ideas",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=600&h=400&fit=crop",
    category: "Recipes",
    title: "10 Delicious Smoothie Bowl Ideas for a Fresh Start",
    excerpt: "Start your morning right with these vibrant, nutrient-packed smoothie bowls. Easy to make and gorgeous to photograph.",
    date: "Dec 10, 2024",
  },
  {
    slug: "understanding-food-labels",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
    category: "Education",
    title: "Understanding Food Labels: What to Look For",
    excerpt: "Decode nutrition labels and ingredient lists to make informed choices about the food you buy for your family.",
    date: "Dec 5, 2024",
  },
  {
    slug: "sustainable-grocery-shopping",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=400&fit=crop",
    category: "Lifestyle",
    title: "Sustainable Grocery Shopping: Tips to Reduce Waste",
    excerpt: "Simple changes to your shopping habits that make a big difference for the planet. From reusable bags to bulk buying.",
    date: "Nov 28, 2024",
  },
  {
    slug: "best-superfoods-for-energy",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=400&fit=crop",
    category: "Nutrition",
    title: "10 Superfoods That Boost Your Energy Naturally",
    excerpt: "Skip the caffeine crash and fuel your day with these natural energy-boosting foods. Backed by science, tested by us.",
    date: "Nov 20, 2024",
  },
  {
    slug: "kitchen-organization-tips",
    image: "https://images.unsplash.com/photo-1556909114-44e3e70034e2?w=600&h=400&fit=crop",
    category: "Tips",
    title: "Kitchen Organization Tips for Meal Prep Success",
    excerpt: "An organized kitchen makes cooking easier and more enjoyable. Learn how to set up your space for efficient meal prep.",
    date: "Nov 15, 2024",
  },
  {
    slug: "holiday-entertaining-ideas",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
    category: "Recipes",
    title: "Holiday Entertaining: Impressive Dishes Made Simple",
    excerpt: "Wow your guests with these impressive yet easy-to-make dishes. Perfect for holiday gatherings and dinner parties.",
    date: "Nov 10, 2024",
  },
  {
    slug: "morning-routine-healthy-breakfast",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&h=400&fit=crop",
    category: "Tips",
    title: "Building a Morning Routine with Healthy Breakfasts",
    excerpt: "Transform your mornings with quick, nutritious breakfast ideas that keep you fueled until lunch.",
    date: "Nov 5, 2024",
  },
  {
    slug: "food-storage-guide",
    image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=600&h=400&fit=crop",
    category: "Education",
    title: "The Ultimate Guide to Food Storage and Freshness",
    excerpt: "Learn the best ways to store fruits, vegetables, and other groceries to maximize freshness and minimize waste.",
    date: "Oct 28, 2024",
  },
  {
    slug: "plant-based-diet-benefits",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop",
    category: "Nutrition",
    title: "The Benefits of a Plant-Based Diet for Your Health",
    excerpt: "Explore the science behind plant-based eating and how it can improve your health, energy, and longevity.",
    date: "Oct 20, 2024",
  },
  {
    slug: "cooking-with-seasonal-herbs",
    image: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=600&h=400&fit=crop",
    category: "Recipes",
    title: "Cooking with Seasonal Herbs: A Flavor Guide",
    excerpt: "Fresh herbs can transform any dish. Learn which herbs are in season and how to use them for maximum flavor.",
    date: "Oct 15, 2024",
  },
  {
    slug: "budget-friendly-meal-planning",
    image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=600&h=400&fit=crop",
    category: "Tips",
    title: "Budget-Friendly Meal Planning for Families",
    excerpt: "Feed your family nutritious meals without breaking the bank. Smart strategies for weekly meal planning on a budget.",
    date: "Oct 10, 2024",
  },
  {
    slug: "benefits-of-local-farmers-market",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=600&h=400&fit=crop",
    category: "Lifestyle",
    title: "Why Shopping at Local Farmers Markets Matters",
    excerpt: "Fresh produce, supporting local farmers, and building community. Here's why farmers markets are worth the trip.",
    date: "Oct 5, 2024",
  },
  {
    slug: "immune-boosting-foods",
    image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=600&h=400&fit=crop",
    category: "Nutrition",
    title: "Immune-Boosting Foods to Keep You Healthy This Season",
    excerpt: "Strengthen your immune system with these powerful foods. Perfect for cold and flu season.",
    date: "Sep 28, 2024",
  },
  {
    slug: "quick-weeknight-dinners",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
    category: "Recipes",
    title: "Quick Weeknight Dinners Ready in 30 Minutes",
    excerpt: "Busy evenings call for fast, delicious meals. These recipes are perfect for hectic weeknights.",
    date: "Sep 20, 2024",
  },
];

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const paginated = posts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-dark">
      {/* Blog Grid */}
      <section className="pt-[120px]">
        <div className="max-w-6xl mx-auto px-4">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our <span className="text-brand">Blog</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Tips, recipes, and stories from the world of fresh groceries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-surface border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block px-2.5 py-0.5 bg-brand/10 text-brand rounded text-[11px] font-bold uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500">{post.date}</span>
                  </div>
                  <h2 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-brand transition-colors duration-200">
                    {post.title}
                  </h2>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand group-hover:gap-3 transition-all duration-200">
                    Read More <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
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
                      ? "gradient-brand text-white"
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
        </div>
      </section>
    </div>
  );
}
