"use client";

import { useState } from "react";
import { Lock, Bell, Trash2, Save, Eye, EyeOff } from "lucide-react";

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailPromos: false,
    emailNewsletter: true,
    smsOrders: false,
    smsPromos: false,
  });

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  return (
    <div className="max-w-2xl space-y-6 pb-20 lg:pb-0">
      {/* Change Password */}
      <div className="bg-surface border border-white/5 rounded-2xl p-8">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Lock className="w-5 h-5 text-brand" />
          Change Password
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Current Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={passwords.current}
                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                placeholder="Enter current password"
                className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 text-sm pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">New Password</label>
              <input
                type="password"
                value={passwords.new}
                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                placeholder="Enter new password"
                className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Confirm Password</label>
              <input
                type="password"
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                placeholder="Confirm new password"
                className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 text-sm"
              />
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 gradient-brand rounded-xl text-sm font-semibold text-black hover:shadow-lg hover:shadow-brand/25 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Updating..." : "Update Password"}
          </button>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-surface border border-white/5 rounded-2xl p-8">
        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Bell className="w-5 h-5 text-brand" />
          Notification Preferences
        </h3>
        <div className="space-y-4">
          {[
            { key: "emailOrders" as const, label: "Order Updates", desc: "Email notifications for order status changes" },
            { key: "emailPromos" as const, label: "Promotions", desc: "Email notifications for sales and discounts" },
            { key: "emailNewsletter" as const, label: "Newsletter", desc: "Weekly newsletter with fresh content" },
            { key: "smsOrders" as const, label: "SMS Order Updates", desc: "Text messages for order status changes" },
            { key: "smsPromos" as const, label: "SMS Promotions", desc: "Text messages for flash sales" },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
              <div>
                <p className="text-sm font-medium text-white">{item.label}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
              <button
                onClick={() => toggleNotification(item.key)}
                className={`relative w-11 h-6 rounded-full transition-colors ${notifications[item.key] ? "bg-brand" : "bg-surface-light"}`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${notifications[item.key] ? "translate-x-5" : ""}`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-surface border border-red-500/20 rounded-2xl p-8">
        <h3 className="text-lg font-bold text-red-400 mb-2 flex items-center gap-2">
          <Trash2 className="w-5 h-5" />
          Danger Zone
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button className="px-5 py-2.5 bg-red-500/10 border border-red-500/20 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/20 transition-all">
          Delete Account
        </button>
      </div>
    </div>
  );
}
