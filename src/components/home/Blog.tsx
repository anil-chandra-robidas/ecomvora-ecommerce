"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BlogPost } from "@/types";

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch("/api/admin/blog?published=true")
      .then((res) => res.json())
      .then((data) => setPosts(data.slice(0, 3)))
      .catch(() => {});
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-[60px]">
      {/* Header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <span className="inline-block px-3 py-1 bg-brand/10 text-brand rounded-lg text-xs font-bold uppercase tracking-wider mb-3">
            Our Blog
          </span>
          <h2 className="text-3xl font-bold text-white">
            Latest <span className="text-brand">Stories</span>
          </h2>
        </div>
        <Link
          href="/blog"
          className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-surface border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
          >
            {/* Image Container */}
            <div className="relative h-52 overflow-hidden bg-surface-light">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const fallback = target.parentElement?.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              <div className="hidden absolute inset-0 items-center justify-center bg-surface-light text-4xl">📝</div>
              {/* Category Badge */}
              <span className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-semibold rounded-lg z-10">
                {post.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-brand transition-colors duration-200">
                {post.title}
              </h3>
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

      {/* Mobile View All */}
      <div className="sm:hidden mt-8 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-surface border border-white/10 rounded-xl text-sm font-semibold text-white hover:bg-white/5 transition-colors"
        >
          View All Posts <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
