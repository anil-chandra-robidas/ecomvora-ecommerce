"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, GripVertical, Save } from "lucide-react";
import Button from "@/components/ui/Button";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export default function AdminFaqPage() {
  const [items, setItems] = useState<FaqItem[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const res = await fetch("/api/admin/faq");
    const data = await res.json();
    setItems(data);
  }

  function addItem() {
    setItems([
      ...items,
      { id: "", question: "", answer: "", order: items.length },
    ]);
  }

  function updateItem(index: number, field: keyof FaqItem, value: string) {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function moveItem(index: number, direction: -1 | 1) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= items.length) return;
    const updated = [...items];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setItems(updated.map((item, i) => ({ ...item, order: i })));
  }

  async function handleSave() {
    setSaving(true);
    try {
      for (const item of items) {
        if (!item.question.trim()) continue;
        if (item.id) {
          await fetch(`/api/admin/faq/${item.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
          });
        } else {
          const res = await fetch("/api/admin/faq", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
          });
          if (res.ok) {
            const created = await res.json();
            setItems((prev) =>
              prev.map((i) => (i === item ? { ...i, id: created.id } : i))
            );
          }
        }
      }
      await fetchItems();
    } finally {
      setSaving(false);
    }
  }

  async function deleteItem(item: FaqItem) {
    if (!item.id) {
      setItems((prev) => prev.filter((i) => i !== item));
      return;
    }
    if (!confirm("Delete this FAQ item?")) return;
    await fetch(`/api/admin/faq/${item.id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">FAQ Management</h1>
          <p className="text-gray-400 text-sm mt-1">Manage frequently asked questions</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={addItem}>
            <Plus className="w-4 h-4" />
            Add Question
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save All"}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={item.id || index}
            className="bg-surface rounded-2xl border border-white/5 p-5"
          >
            <div className="flex items-start gap-3">
              <div className="flex flex-col gap-1 pt-2">
                <button
                  onClick={() => moveItem(index, -1)}
                  disabled={index === 0}
                  className="text-gray-500 hover:text-white disabled:opacity-30"
                >
                  <GripVertical className="w-4 h-4 rotate-180" />
                </button>
                <button
                  onClick={() => moveItem(index, 1)}
                  disabled={index === items.length - 1}
                  className="text-gray-500 hover:text-white disabled:opacity-30"
                >
                  <GripVertical className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Question</label>
                  <input
                    type="text"
                    value={item.question}
                    onChange={(e) => updateItem(index, "question", e.target.value)}
                    placeholder="How does delivery work?"
                    className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Answer</label>
                  <textarea
                    value={item.answer}
                    onChange={(e) => updateItem(index, "answer", e.target.value)}
                    rows={3}
                    placeholder="Write the answer here..."
                    className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 resize-none text-sm"
                  />
                </div>
              </div>

              <button
                onClick={() => deleteItem(item)}
                className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all mt-2"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="bg-surface rounded-2xl border border-white/5 p-12 text-center text-gray-500">
          <p>No FAQ items yet. Click &quot;Add Question&quot; to create one.</p>
        </div>
      )}
    </div>
  );
}
