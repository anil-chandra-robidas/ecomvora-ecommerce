"use client";

import { useState, useEffect } from "react";
import { Save, Plus, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";

interface PageSection {
  id: string;
  page: string;
  section: string;
  title: string | null;
  content: string;
  order: number;
}

const SECTIONS = [
  { key: "hero", label: "Hero Section", fields: ["title", "subtitle", "description"] },
  { key: "mission", label: "Mission", fields: ["badge", "title", "description"] },
  { key: "vision", label: "Vision", fields: ["badge", "title", "description"] },
  { key: "goal", label: "Goal", fields: ["badge", "title", "description"] },
  { key: "story", label: "Our Story", fields: ["title", "paragraph1", "paragraph2", "stat1Label", "stat1Value", "stat2Label", "stat2Value", "stat3Label", "stat3Value", "stat4Label", "stat4Value"] },
  { key: "values_title", label: "Values Section Title", fields: ["title", "subtitle"] },
];

const DEFAULT_VALUES = [
  { title: "Farm Fresh", description: "We source directly from local farms to ensure the freshest produce reaches your table." },
  { title: "Fast Delivery", description: "Same-day delivery on orders placed before 2 PM. Your groceries, on your schedule." },
  { title: "Quality Guaranteed", description: "Every product is quality-checked. Not satisfied? We offer hassle-free returns." },
  { title: "24/7 Support", description: "Our team is always here to help with orders, returns, or any questions you have." },
];

export default function AdminAboutPage() {
  const [sections, setSections] = useState<PageSection[]>([]);
  const [values, setValues] = useState<{ title: string; description: string }[]>(DEFAULT_VALUES);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("hero");

  useEffect(() => {
    fetchSections();
  }, []);

  async function fetchSections() {
    const res = await fetch("/api/admin/pages?page=about");
    const data = await res.json();
    setSections(data);

    const valuesSection = data.find((s: PageSection) => s.section === "values");
    if (valuesSection) {
      try {
        setValues(JSON.parse(valuesSection.content));
      } catch { /* keep defaults */ }
    }
  }

  function getSectionContent(sectionKey: string): Record<string, string> {
    const section = sections.find((s) => s.section === sectionKey);
    if (!section) return {};
    try {
      return JSON.parse(section.content);
    } catch {
      return {};
    }
  }

  function setSectionContent(sectionKey: string, field: string, value: string) {
    setSections((prev) => {
      const existing = prev.find((s) => s.section === sectionKey);
      const content = existing ? (() => { try { return JSON.parse(existing.content); } catch { return {}; } })() : {};
      content[field] = value;
      if (existing) {
        return prev.map((s) => s.section === sectionKey ? { ...s, content: JSON.stringify(content) } : s);
      } else {
        return [...prev, { id: "", page: "about", section: sectionKey, title: null, content: JSON.stringify(content), order: 0 }];
      }
    });
  }

  async function handleSave() {
    setSaving(true);
    try {
      for (const section of SECTIONS) {
        const content = getSectionContent(section.key);
        if (Object.keys(content).length > 0) {
          await fetch("/api/admin/pages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              page: "about",
              section: section.key,
              title: section.label,
              content: JSON.stringify(content),
              order: SECTIONS.indexOf(section),
            }),
          });
        }
      }

      await fetch("/api/admin/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          page: "about",
          section: "values",
          title: "Values",
          content: JSON.stringify(values),
          order: SECTIONS.length,
        }),
      });
    } finally {
      setSaving(false);
    }
  }

  function renderInput(label: string, value: string, onChange: (v: string) => void, multiline = false) {
    if (multiline) {
      return (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={3}
            className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 resize-none text-sm"
          />
        </div>
      );
    }
    return (
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 text-sm"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">About Page Content</h1>
          <p className="text-gray-400 text-sm mt-1">Manage the content displayed on the About page</p>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save All"}
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {SECTIONS.map((section) => (
          <button
            key={section.key}
            onClick={() => setActiveTab(section.key)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === section.key
                ? "bg-brand text-black"
                : "bg-surface border border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            {section.label}
          </button>
        ))}
        <button
          onClick={() => setActiveTab("values")}
          className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
            activeTab === "values"
              ? "bg-brand text-black"
              : "bg-surface border border-white/10 text-gray-400 hover:text-white"
          }`}
        >
          Values
        </button>
      </div>

      {/* Section Editor */}
      <div className="bg-surface rounded-2xl border border-white/5 p-6">
        {activeTab === "values" ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Values</h2>
              <button
                onClick={() => setValues([...values, { title: "", description: "" }])}
                className="flex items-center gap-1 text-sm text-brand hover:text-brand-light"
              >
                <Plus className="w-4 h-4" /> Add Value
              </button>
            </div>
            {values.map((value, index) => (
              <div key={index} className="bg-surface-light rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 font-medium">Value {index + 1}</span>
                  <button
                    onClick={() => setValues(values.filter((_, i) => i !== index))}
                    className="text-gray-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {renderInput("Title", value.title, (v) => {
                  const updated = [...values];
                  updated[index].title = v;
                  setValues(updated);
                })}
                {renderInput("Description", value.description, (v) => {
                  const updated = [...values];
                  updated[index].description = v;
                  setValues(updated);
                }, true)}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white mb-4">
              {SECTIONS.find((s) => s.key === activeTab)?.label}
            </h2>
            {SECTIONS.find((s) => s.key === activeTab)?.fields.map((field) => {
              const content = getSectionContent(activeTab);
              const label = field.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
              return (
                <div key={field}>
                  {renderInput(
                    label,
                    content[field] || "",
                    (v) => setSectionContent(activeTab, field, v),
                    field.includes("description") || field.includes("paragraph") || field.includes("subtitle")
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
