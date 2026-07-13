"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { CATEGORIES } from "@/types";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    price: "",
    image: "🍎",
    category: "fruits",
    stock: "",
    featured: false,
  });

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  async function fetchProduct() {
    const res = await fetch(`/api/products/${params.id}`);
    if (res.ok) {
      const data = await res.json();
      setForm({
        name: data.name,
        slug: data.slug,
        description: data.description,
        price: data.price.toString(),
        image: data.image,
        category: data.category,
        stock: data.stock.toString(),
        featured: data.featured,
      });
    }
    setLoading(false);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/products/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          stock: parseInt(form.stock),
        }),
      });

      if (res.ok) {
        router.push("/admin/products");
      }
    } catch {
      console.error("Failed to update product");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const emojiOptions = ["🍎", "🍓", "🍌", "🍊", "🥑", "🥬", "🍅", "🥦", "🌽", "🧃", "🍵", "💧", "🥛", "☕", "🥜", "🍫", "🍘", "🧀", "🥚", "🍞", "🥐", "🧁"];

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-white mb-6">Edit Product</h1>

      <form onSubmit={handleSubmit} className="bg-surface rounded-2xl border border-white/5 p-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Input
              label="Product Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <Input
            label="Slug"
            name="slug"
            value={form.slug}
            onChange={handleChange}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand/50"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="capitalize">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 resize-none"
              required
            />
          </div>

          <Input
            label="Price ($)"
            name="price"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange}
            required
          />

          <Input
            label="Stock"
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            required
          />

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Product Image (Emoji)
            </label>
            <div className="flex flex-wrap gap-2">
              {emojiOptions.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, image: emoji }))}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all ${
                    form.image === emoji
                      ? "bg-brand/20 border-2 border-brand scale-110"
                      : "bg-surface-light border border-white/10 hover:border-white/30"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="w-4 h-4 rounded border-white/20 bg-surface-light text-brand focus:ring-brand/50"
              />
              <span className="text-sm text-gray-300">Featured product</span>
            </label>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
          <Button variant="secondary" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
