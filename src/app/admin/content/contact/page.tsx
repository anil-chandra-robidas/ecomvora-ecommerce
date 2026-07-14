"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Save, Phone, Mail, MapPin, Clock } from "lucide-react";
import Button from "@/components/ui/Button";

interface ContactInfoItem {
  id: string;
  type: string;
  label: string;
  details: string;
  order: number;
}

const INFO_TYPES = [
  { value: "phone", label: "Phone", icon: Phone },
  { value: "email", label: "Email", icon: Mail },
  { value: "address", label: "Address", icon: MapPin },
  { value: "hours", label: "Business Hours", icon: Clock },
];

export default function AdminContactPage() {
  const [items, setItems] = useState<ContactInfoItem[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const res = await fetch("/api/admin/contact");
    const data = await res.json();
    setItems(data.map((item: ContactInfoItem & { details: string }) => ({
      ...item,
      details: item.details,
    })));
  }

  function addItem() {
    setItems([
      ...items,
      { id: "", type: "phone", label: "Phone", details: "", order: items.length },
    ]);
  }

  function updateItem(index: number, field: keyof ContactInfoItem, value: string) {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  }

  async function handleSave() {
    setSaving(true);
    try {
      for (const item of items) {
        if (!item.label.trim()) continue;
        if (item.id) {
          await fetch(`/api/admin/contact/${item.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
          });
        } else {
          const res = await fetch("/api/admin/contact", {
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

  async function deleteItem(item: ContactInfoItem) {
    if (!item.id) {
      setItems((prev) => prev.filter((i) => i !== item));
      return;
    }
    if (!confirm("Delete this contact info?")) return;
    await fetch(`/api/admin/contact/${item.id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Contact Page Content</h1>
          <p className="text-gray-400 text-sm mt-1">Manage contact information displayed on the Contact page</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={addItem}>
            <Plus className="w-4 h-4" />
            Add Info
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save All"}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => {
          const typeInfo = INFO_TYPES.find((t) => t.value === item.type);
          return (
            <div
              key={item.id || index}
              className="bg-surface rounded-2xl border border-white/5 p-5"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center shrink-0 mt-1">
                  {typeInfo && <typeInfo.icon className="w-5 h-5 text-black" />}
                </div>

                <div className="flex-1 grid sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Type</label>
                    <select
                      value={item.type}
                      onChange={(e) => updateItem(index, "type", e.target.value)}
                      className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-brand/50 text-sm"
                    >
                      {INFO_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Label</label>
                    <input
                      type="text"
                      value={item.label}
                      onChange={(e) => updateItem(index, "label", e.target.value)}
                      placeholder="Phone"
                      className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Details (comma-separated)</label>
                    <input
                      type="text"
                      value={item.details}
                      onChange={(e) => updateItem(index, "details", e.target.value)}
                      placeholder="+1 (555) 123-4567, +1 (555) 765-4321"
                      className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 text-sm"
                    />
                  </div>
                </div>

                <button
                  onClick={() => deleteItem(item)}
                  className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all mt-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {items.length === 0 && (
        <div className="bg-surface rounded-2xl border border-white/5 p-12 text-center text-gray-500">
          <p>No contact info yet. Click &quot;Add Info&quot; to create one.</p>
        </div>
      )}
    </div>
  );
}
