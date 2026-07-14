"use client";

import { useState } from "react";
import Link from "next/link";
import { Package, ChevronRight, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

const orders = [
  {
    id: "ORD-7891",
    date: "Jan 15, 2025",
    total: 89.99,
    status: "delivered",
    items: [
      { name: "Organic Apples", qty: 2, price: 4.99 },
      { name: "Fresh Milk", qty: 1, price: 3.49 },
      { name: "Sourdough Bread", qty: 2, price: 5.99 },
    ],
  },
  {
    id: "ORD-7890",
    date: "Jan 12, 2025",
    total: 156.50,
    status: "shipped",
    items: [
      { name: "Protein Pack", qty: 3, price: 12.99 },
      { name: "Organic Eggs", qty: 2, price: 6.99 },
      { name: "Mixed Berries", qty: 4, price: 8.99 },
    ],
  },
  {
    id: "ORD-7889",
    date: "Jan 8, 2025",
    total: 42.00,
    status: "processing",
    items: [
      { name: "Green Smoothie Mix", qty: 2, price: 9.99 },
      { name: "Avocado Oil", qty: 1, price: 12.99 },
    ],
  },
  {
    id: "ORD-7888",
    date: "Jan 3, 2025",
    total: 67.50,
    status: "delivered",
    items: [
      { name: "Honey Oat Granola", qty: 3, price: 7.99 },
      { name: "Almond Milk", qty: 4, price: 4.49 },
    ],
  },
  {
    id: "ORD-7887",
    date: "Dec 28, 2024",
    total: 124.99,
    status: "delivered",
    items: [
      { name: "Holiday Gift Basket", qty: 1, price: 49.99 },
      { name: "Premium Coffee Beans", qty: 2, price: 18.99 },
      { name: "Artisan Chocolate", qty: 3, price: 12.99 },
    ],
  },
];

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-400",
  processing: "bg-blue-500/10 text-blue-400",
  shipped: "bg-purple-500/10 text-purple-400",
  delivered: "bg-emerald-500/10 text-emerald-400",
};

const filters = ["All", "Processing", "Shipped", "Delivered"];

export default function OrdersPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredOrders = activeFilter === "All"
    ? orders
    : orders.filter((o) => o.status === activeFilter.toLowerCase());

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={cn(
              "px-4 py-2 rounded-xl text-sm font-medium transition-all",
              activeFilter === filter
                ? "bg-brand/10 text-brand"
                : "bg-surface border border-white/5 text-gray-400 hover:text-white hover:border-white/10"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Orders Found</h3>
          <p className="text-gray-400 mb-6">You haven&apos;t placed any orders yet.</p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 gradient-brand rounded-xl text-black font-semibold hover:shadow-lg hover:shadow-brand/25 transition-all"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Link
              key={order.id}
              href={`/account/orders/${order.id}`}
              className="block bg-surface border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-surface-light flex items-center justify-center shrink-0">
                    <Package className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-semibold text-white">{order.id}</h3>
                      <span className={`px-2.5 py-0.5 rounded-lg text-xs font-medium capitalize ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {order.date} &middot; {order.items.length} items
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-6">
                  <div className="text-right">
                    <p className="text-lg font-bold text-white">${order.total.toFixed(2)}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-brand group-hover:translate-x-1 transition-all" />
                </div>
              </div>

              {/* Items Preview */}
              <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap gap-2">
                {order.items.map((item, i) => (
                  <span key={i} className="px-2.5 py-1 bg-surface-light rounded-lg text-xs text-gray-400">
                    {item.name} x{item.qty}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
