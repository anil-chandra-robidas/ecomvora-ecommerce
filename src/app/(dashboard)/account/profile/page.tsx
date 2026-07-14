"use client";

import { useState } from "react";
import { Save, Camera } from "lucide-react";

export default function ProfilePage() {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "User",
    email: "user@ecomvora.com",
    phone: "",
    birthday: "",
  });

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };

  return (
    <div className="max-w-2xl space-y-6 pb-20 lg:pb-0">
      {/* Avatar */}
      <div className="bg-surface border border-white/5 rounded-2xl p-8">
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-black font-bold text-3xl ring-4 ring-brand/20">
              {form.name.charAt(0).toUpperCase()}
            </div>
            <button className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Camera className="w-6 h-6 text-white" />
            </button>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{form.name}</h3>
            <p className="text-sm text-gray-400">{form.email}</p>
            <button className="mt-2 text-sm text-brand hover:text-brand-light transition-colors">
              Change Photo
            </button>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-surface border border-white/5 rounded-2xl p-8">
        <h3 className="text-lg font-bold text-white mb-6">Personal Information</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Email Address</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all text-sm"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Phone Number</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Date of Birth</label>
              <input
                type="date"
                value={form.birthday}
                onChange={(e) => setForm({ ...form, birthday: e.target.value })}
                className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 px-6 py-3 gradient-brand rounded-xl text-black font-semibold hover:shadow-lg hover:shadow-brand/25 transition-all disabled:opacity-50"
      >
        <Save className="w-4 h-4" />
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
