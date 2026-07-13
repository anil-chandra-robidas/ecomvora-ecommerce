"use client";

import { User, Package, LogOut } from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-white mb-8">
        My <span className="text-gradient-brand">Account</span>
      </h1>

      <div className="grid sm:grid-cols-2 gap-6">
        <Link
          href="/account"
          className="bg-surface rounded-2xl border border-white/5 p-6 hover:border-brand/30 transition-all group"
        >
          <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-colors">
            <User className="w-6 h-6 text-brand" />
          </div>
          <h3 className="text-white font-semibold mb-1">Profile</h3>
          <p className="text-sm text-gray-400">
            Manage your personal information and preferences
          </p>
        </Link>

        <Link
          href="/account"
          className="bg-surface rounded-2xl border border-white/5 p-6 hover:border-brand/30 transition-all group"
        >
          <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-colors">
            <Package className="w-6 h-6 text-brand" />
          </div>
          <h3 className="text-white font-semibold mb-1">Orders</h3>
          <p className="text-sm text-gray-400">
            View your order history and track deliveries
          </p>
        </Link>
      </div>

      <button className="mt-8 flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors">
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>
    </div>
  );
}
