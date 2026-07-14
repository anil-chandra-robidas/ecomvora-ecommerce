"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Package,
  DollarSign,
  Heart,
  Star,
  ArrowRight,
  ShoppingCart,
  Truck,
  Headphones,
  ChevronRight,
} from "lucide-react";

const stats = [
  {
    label: "Total Orders",
    value: "12",
    icon: Package,
    gradient: "from-blue-500/20 to-blue-600/5",
    iconColor: "text-blue-400",
  },
  {
    label: "Total Spent",
    value: "$1,284",
    icon: DollarSign,
    gradient: "from-emerald-500/20 to-emerald-600/5",
    iconColor: "text-emerald-400",
  },
  {
    label: "Wishlist Items",
    value: "8",
    icon: Heart,
    gradient: "from-red-500/20 to-red-600/5",
    iconColor: "text-red-400",
  },
  {
    label: "Reward Points",
    value: "2,450",
    icon: Star,
    gradient: "from-amber-500/20 to-amber-600/5",
    iconColor: "text-amber-400",
  },
];

const recentOrders = [
  {
    id: "ORD-7891",
    date: "Jan 15, 2025",
    total: 89.99,
    status: "delivered",
    items: 3,
  },
  {
    id: "ORD-7890",
    date: "Jan 12, 2025",
    total: 156.50,
    status: "shipped",
    items: 5,
  },
  {
    id: "ORD-7889",
    date: "Jan 8, 2025",
    total: 42.00,
    status: "processing",
    items: 2,
  },
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-400",
  processing: "bg-blue-500/10 text-blue-400",
  shipped: "bg-purple-500/10 text-purple-400",
  delivered: "bg-emerald-500/10 text-emerald-400",
};

const quickActions = [
  {
    label: "Browse Products",
    href: "/products",
    icon: ShoppingCart,
    color: "from-brand/20 to-brand/5 hover:from-brand/30",
  },
  {
    label: "Track Order",
    href: "/account/orders",
    icon: Truck,
    color: "from-blue-500/20 to-blue-500/5 hover:from-blue-500/30",
  },
  {
    label: "Contact Support",
    href: "/contact",
    icon: Headphones,
    color: "from-emerald-500/20 to-emerald-500/5 hover:from-emerald-500/30",
  },
];

export default function AccountPage() {
  return (
    <div className="space-y-8 pb-20 lg:pb-0">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`bg-gradient-to-br ${stat.gradient} border border-white/5 rounded-2xl p-5 hover:scale-[1.02] transition-transform duration-300`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${stat.iconColor}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        {/* Recent Orders */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Recent Orders</h2>
            <Link
              href="/account/orders"
              className="text-sm text-brand hover:text-brand-light transition-colors flex items-center gap-1"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                href={`/account/orders/${order.id}`}
                className="flex items-center justify-between bg-surface border border-white/5 rounded-xl p-4 hover:border-white/10 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-surface-light flex items-center justify-center">
                    <Package className="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{order.id}</p>
                    <p className="text-xs text-gray-500">{order.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-white">${order.total.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">{order.items} items</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-medium capitalize ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {quickActions.map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className={`flex items-center gap-4 bg-gradient-to-r ${action.color} border border-white/5 rounded-xl p-4 transition-all group hover:scale-[1.02]`}
              >
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{action.label}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
