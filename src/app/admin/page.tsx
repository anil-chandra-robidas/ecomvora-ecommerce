"use client";

import { useState, useEffect } from "react";
import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalUsers: number;
  recentOrders: {
    id: string;
    total: number;
    status: string;
    createdAt: string;
    user: { name: string };
  }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data);
    } catch {
      console.error("Failed to fetch stats");
    }
  }

  const statCards = stats
    ? [
        {
          label: "Total Revenue",
          value: `$${stats.totalRevenue.toFixed(2)}`,
          icon: DollarSign,
          change: "+12.5%",
          color: "text-green-400",
        },
        {
          label: "Total Orders",
          value: stats.totalOrders.toString(),
          icon: ShoppingCart,
          change: "+8.2%",
          color: "text-green-400",
        },
        {
          label: "Products",
          value: stats.totalProducts.toString(),
          icon: Package,
          change: "+3",
          color: "text-green-400",
        },
        {
          label: "Users",
          value: stats.totalUsers.toString(),
          icon: Users,
          change: "+24",
          color: "text-green-400",
        },
      ]
    : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">
          Welcome back! Here&apos;s what&apos;s happening with your store.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="bg-surface rounded-2xl border border-white/5 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-brand/10 rounded-xl flex items-center justify-center">
                <card.icon className="w-5 h-5 text-brand" />
              </div>
              <span className={`text-xs font-medium flex items-center gap-0.5 ${card.color}`}>
                <TrendingUp className="w-3 h-3" />
                {card.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-white">{card.value}</p>
            <p className="text-sm text-gray-400 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-surface rounded-2xl border border-white/5 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">Recent Orders</h2>
          <a
            href="/admin/orders"
            className="text-sm text-brand hover:text-brand-light flex items-center gap-1"
          >
            View All <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {stats?.recentOrders && stats.recentOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-white/5">
                  <th className="pb-3 font-medium">Order ID</th>
                  <th className="pb-3 font-medium">Customer</th>
                  <th className="pb-3 font-medium">Total</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {stats.recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/[0.02]">
                    <td className="py-3 text-gray-300 font-mono text-xs">
                      #{order.id.slice(0, 8)}
                    </td>
                    <td className="py-3 text-white">{order.user.name}</td>
                    <td className="py-3 text-brand font-medium">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          order.status === "delivered"
                            ? "bg-green-500/20 text-green-400"
                            : order.status === "shipped"
                            ? "bg-blue-500/20 text-blue-400"
                            : order.status === "processing"
                            ? "bg-amber-500/20 text-amber-400"
                            : "bg-white/10 text-gray-400"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <ShoppingCart className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p>No orders yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
