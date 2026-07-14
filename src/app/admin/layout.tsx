"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Utensils,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/blog", label: "Blog", icon: FileText },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-surface border-r border-white/5 p-4">
        {/* Admin header */}
        <div className="flex items-center gap-3 px-3 py-4 mb-4">
          <div className="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center">
            <Utensils className="w-5 h-5 text-black" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Admin Panel</p>
            <p className="text-xs text-gray-500">EcomVora</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-brand/10 text-brand"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 lg:p-8 overflow-auto">{children}</main>
    </div>
  );
}
