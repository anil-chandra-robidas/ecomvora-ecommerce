"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Calendar, User, Tag, Clock, Share2, Bookmark, ChevronRight } from "lucide-react";
import { BlogPost } from "@/types";

const categories = ["All", "Nutrition", "Seasonal", "Lifestyle", "Tips", "Education", "Recipes"];

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string>("");
  const [post, setPost] = useState<BlogPost | null>(null);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then((p) => setSlug(p.slug));
  }, [params]);

  useEffect(() => {
    if (!slug) return;

    Promise.all([
      fetch(`/api/admin/blog?slug=${slug}`).then((r) => r.json()),
      fetch("/api/admin/blog?published=true").then((r) => r.json()),
    ]).then(([postData, allPostsData]) => {
      setPost(Array.isArray(postData) ? postData[0] || null : postData);
      setAllPosts(Array.isArray(allPostsData) ? allPostsData : []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [slug]);

  function formatDate(dateStr: string | Date) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/10 border-t-brand rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-brand hover:underline">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);
  const categoryPosts = allPosts.filter((p) => p.category === post.slug && p.slug !== post.slug).slice(0, 5);
  const sidebarCategoryPosts = allPosts.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 5);

  return (
    <div className="min-h-screen bg-dark pt-[120px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-400">{post.title}</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_320px] gap-10">
          {/* Main Content */}
          <article>
            {/* Hero Image */}
            <div className="relative rounded-2xl overflow-hidden mb-8 aspect-[2/1]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover"
                priority
              />
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="inline-block px-3 py-1 bg-brand/10 text-brand rounded-lg text-xs font-bold uppercase tracking-wider">
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <User className="w-4 h-4" />
                {post.author}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                {formatDate(post.createdAt)}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <button className="p-2 rounded-lg bg-surface border border-white/10 text-gray-400 hover:text-white transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg bg-surface border border-white/10 text-gray-400 hover:text-white transition-colors">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-8 pb-8 border-b border-white/10">
              {post.title}
            </h1>

            {/* Content */}
            <div
              className="prose prose-invert max-w-none prose-headings:text-white prose-headings:font-bold prose-p:text-gray-400 prose-p:leading-relaxed prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4 prose-li:text-gray-400"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="flex items-center gap-2 mt-10 pt-8 border-t border-white/10">
              <Tag className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">Tags:</span>
              <span className="px-3 py-1 bg-surface border border-white/10 rounded-lg text-xs text-gray-400">{post.category}</span>
              <span className="px-3 py-1 bg-surface border border-white/10 rounded-lg text-xs text-gray-400">Fresh Grocery</span>
              <span className="px-3 py-1 bg-surface border border-white/10 rounded-lg text-xs text-gray-400">Healthy Living</span>
            </div>

            {/* Back to Blog */}
            <div className="mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Search */}
            <div className="bg-surface border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">Search</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full pl-4 pr-4 py-2.5 bg-dark border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-surface border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">Categories</h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    href={cat === "All" ? "/blog" : `/blog?category=${cat.toLowerCase()}`}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    {cat}
                    <span className="text-xs text-gray-600">
                      {cat === "All" ? allPosts.length : allPosts.filter((p) => p.category === cat).length}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Related Posts */}
            {sidebarCategoryPosts.length > 0 && (
              <div className="bg-surface border border-white/10 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {sidebarCategoryPosts.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="flex gap-3 group"
                    >
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          sizes="80px"
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-white line-clamp-2 group-hover:text-brand transition-colors">
                          {p.title}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">{formatDate(p.createdAt)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Tags */}
            <div className="bg-surface border border-white/10 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {["Nutrition", "Recipes", "Tips", "Organic", "Fresh", "Seasonal", "Healthy"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-dark border border-white/10 rounded-lg text-xs text-gray-400 hover:text-white hover:border-white/20 cursor-pointer transition-all"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Related Blog Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-[120px] pb-[60px]">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="inline-block px-3 py-1 bg-brand/10 text-brand rounded-lg text-xs font-bold uppercase tracking-wider mb-3">
                  Related Posts
                </span>
                <h2 className="text-3xl font-bold text-white">
                  More <span className="text-brand">Stories</span>
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group bg-surface border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-block px-2.5 py-0.5 bg-brand/10 text-brand rounded text-[11px] font-bold uppercase tracking-wider">
                        {p.category}
                      </span>
                      <span className="text-xs text-gray-500">{formatDate(p.createdAt)}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-brand transition-colors duration-200">
                      {p.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-4 line-clamp-2 leading-relaxed">
                      {p.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand group-hover:gap-3 transition-all duration-200">
                      Read More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
