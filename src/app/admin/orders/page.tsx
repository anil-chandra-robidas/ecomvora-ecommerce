"use client";

import { useState, useEffect } from "react";
import { formatPrice } from "@/lib/utils";

interface Order {
  id: string;
  total: number;
  status: string;
  shippingName: string;
  shippingEmail: string;
  shippingAddr: string;
  createdAt: string;
  items: { quantity: number; price: number; product: { name: string } }[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    const res = await fetch("/api/admin/orders");
    const data = await res.json();
    setOrders(data);
  }

  async function updateStatus(orderId: string, status: string) {
    await fetch(`/api/admin/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Orders</h1>
        <p className="text-gray-400 text-sm mt-1">{orders.length} orders total</p>
      </div>

      <div className="bg-surface rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-white/5">
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Items</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-white/[0.02]">
                  <td className="px-6 py-4 text-gray-300 font-mono text-xs">
                    #{order.id.slice(0, 8)}
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-white">{order.shippingName}</p>
                    <p className="text-xs text-gray-500">{order.shippingEmail}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                  </td>
                  <td className="px-6 py-4 text-brand font-medium">
                    {formatPrice(order.total)}
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className="px-2 py-1 bg-surface-light border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:ring-1 focus:ring-brand/50"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {orders.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No orders yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
