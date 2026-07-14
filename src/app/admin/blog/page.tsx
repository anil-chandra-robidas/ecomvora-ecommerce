"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { BlogPost } from "@/types";
import Button from "@/components/ui/Button";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const res = await fetch("/api/admin/blog");
    const data = await res.json();
    setPosts(data);
  }

  async function deletePost(id: string) {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    setPosts((prev) => prev.filter((p) => p.id !== id));
  }

  const filtered = posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-gray-400 text-sm mt-1">{posts.length} posts total</p>
        </div>
        <Link href="/admin/blog/new">
          <Button>
            <Plus className="w-4 h-4" />
            Add Post
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search posts..."
          className="w-full pl-10 pr-4 py-2.5 bg-surface border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand/50"
        />
      </div>

      {/* Table */}
      <div className="bg-surface rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-white/5">
                <th className="px-6 py-4 font-medium">Post</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Author</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((post) => (
                <tr key={post.id} className="hover:bg-white/[0.02]">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-surface-light rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-white font-medium truncate max-w-[250px]">{post.title}</p>
                        <p className="text-xs text-gray-500">{post.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{post.category}</td>
                  <td className="px-6 py-4 text-gray-400">{post.author}</td>
                  <td className="px-6 py-4">
                    {post.published ? (
                      <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-medium rounded-lg">
                        Published
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs font-medium rounded-lg">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="p-2 text-gray-400 hover:text-brand hover:bg-brand/10 rounded-lg transition-all"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No blog posts yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
