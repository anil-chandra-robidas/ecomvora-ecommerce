"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { BLOG_CATEGORIES } from "@/types";
import { slugify } from "@/lib/utils";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    category: "Nutrition",
    author: "",
    readTime: "",
    published: false,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    setForm((prev) => {
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
      };
      if (name === "title" && !prev.slug) {
        updated.slug = slugify(value);
      }
      return updated;
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push("/admin/blog");
      }
    } catch {
      console.error("Failed to create blog post");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-6">Add New Blog Post</h1>
      <form onSubmit={handleSubmit} className="bg-surface rounded-2xl border border-white/5 p-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Input label="Title" name="title" value={form.title} onChange={handleChange} placeholder="Healthy Eating on a Budget" required />
          </div>
          <Input label="Slug" name="slug" value={form.slug} onChange={handleChange} placeholder="healthy-eating-on-a-budget" required />
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Category</label>
            <select name="category" value={form.category} onChange={handleChange}
              className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand/50">
              {BLOG_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <Input label="Author" name="author" value={form.author} onChange={handleChange} placeholder="Sarah Johnson" required />
          <Input label="Read Time" name="readTime" value={form.readTime} onChange={handleChange} placeholder="5 min read" required />
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Excerpt</label>
            <textarea name="excerpt" value={form.excerpt} onChange={handleChange} rows={3}
              placeholder="A short summary of the blog post..."
              className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 resize-none"
              required />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Content (HTML)</label>
            <textarea name="content" value={form.content} onChange={handleChange} rows={12}
              placeholder="<p>Your blog post content here...</p>"
              className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 resize-none font-mono text-sm"
              required />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Image URL</label>
            <input type="url" name="image" value={form.image} onChange={handleChange}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50" />
            {form.image && (
              <div className="mt-2 w-20 h-20 rounded-lg overflow-hidden bg-surface-light">
                <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
          <div className="sm:col-span-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" name="published" checked={form.published} onChange={handleChange}
                className="w-4 h-4 rounded border-white/20 bg-surface-light text-brand focus:ring-brand/50" />
              <span className="text-sm text-gray-300">Published</span>
            </label>
          </div>
        </div>
        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Post"}
          </Button>
          <Button variant="secondary" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
