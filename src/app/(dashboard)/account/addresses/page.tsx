"use client";

import { useState } from "react";
import { MapPin, Plus, Pencil, Trash2, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const initialAddresses = [
  {
    id: "1",
    name: "Home",
    phone: "+1 (555) 123-4567",
    street: "123 Fresh Street",
    city: "Farmville",
    state: "CA",
    zip: "90210",
    country: "US",
    isDefault: true,
  },
  {
    id: "2",
    name: "Office",
    phone: "+1 (555) 987-6543",
    street: "456 Business Ave, Suite 200",
    city: "Worktown",
    state: "CA",
    zip: "90211",
    country: "US",
    isDefault: false,
  },
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "US",
  });

  const resetForm = () => {
    setForm({ name: "", phone: "", street: "", city: "", state: "", zip: "", country: "US" });
    setShowForm(false);
    setEditingId(null);
  };

  const handleSave = () => {
    if (editingId) {
      setAddresses(addresses.map((a) => a.id === editingId ? { ...a, ...form } : a));
    } else {
      setAddresses([...addresses, { ...form, id: Date.now().toString(), isDefault: addresses.length === 0 }]);
    }
    resetForm();
  };

  const handleEdit = (addr: typeof addresses[0]) => {
    setForm({ name: addr.name, phone: addr.phone, street: addr.street, city: addr.city, state: addr.state, zip: addr.zip, country: addr.country });
    setEditingId(addr.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map((a) => ({ ...a, isDefault: a.id === id })));
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Add Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 gradient-brand rounded-xl text-sm font-semibold text-black hover:shadow-lg hover:shadow-brand/25 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add New Address
        </button>
      )}

      {/* Address Form */}
      {showForm && (
        <div className="bg-surface border border-white/5 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">{editingId ? "Edit Address" : "New Address"}</h3>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Label (Home, Office, etc.)</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Home"
                  className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Phone</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Street Address</label>
              <input
                type="text"
                value={form.street}
                onChange={(e) => setForm({ ...form, street: e.target.value })}
                placeholder="123 Main Street"
                className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">City</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="Farmville"
                  className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">State</label>
                <input
                  type="text"
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  placeholder="CA"
                  className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">ZIP</label>
                <input
                  type="text"
                  value={form.zip}
                  onChange={(e) => setForm({ ...form, zip: e.target.value })}
                  placeholder="90210"
                  className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Country</label>
                <input
                  type="text"
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  placeholder="US"
                  className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 text-sm"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-5 py-2.5 gradient-brand rounded-xl text-sm font-semibold text-black hover:shadow-lg hover:shadow-brand/25 transition-all"
              >
                <Check className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={resetForm}
                className="flex items-center gap-2 px-5 py-2.5 bg-surface-light border border-white/10 rounded-xl text-sm font-medium text-gray-400 hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Address Cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className={cn(
              "bg-surface border rounded-2xl p-6 relative",
              addr.isDefault ? "border-brand/30" : "border-white/5"
            )}
          >
            {addr.isDefault && (
              <span className="absolute top-4 right-4 px-2 py-0.5 bg-brand/10 text-brand rounded text-[10px] font-bold uppercase">
                Default
              </span>
            )}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-surface-light flex items-center justify-center">
                <MapPin className="w-5 h-5 text-brand" />
              </div>
              <h3 className="font-semibold text-white">{addr.name}</h3>
            </div>
            <div className="space-y-1 text-sm text-gray-400 mb-4">
              <p>{addr.street}</p>
              <p>{addr.city}, {addr.state} {addr.zip}</p>
              <p>{addr.country}</p>
              <p className="text-gray-500">{addr.phone}</p>
            </div>
            <div className="flex items-center gap-2 pt-4 border-t border-white/5">
              {!addr.isDefault && (
                <button
                  onClick={() => handleSetDefault(addr.id)}
                  className="text-xs text-gray-500 hover:text-brand transition-colors"
                >
                  Set as Default
                </button>
              )}
              <button
                onClick={() => handleEdit(addr)}
                className="ml-auto p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(addr.id)}
                className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/5 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
