"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Package,
  Heart,
  MapPin,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/account", label: "Overview", icon: LayoutDashboard },
  { href: "/account/profile", label: "Profile", icon: User },
  { href: "/account/orders", label: "Orders", icon: Package },
  { href: "/account/wishlist", label: "Wishlist", icon: Heart },
  { href: "/account/addresses", label: "Addresses", icon: MapPin },
  { href: "/account/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-[280px] bg-surface border-r border-white/5 min-h-[calc(100vh-var(--header-height))] sticky top-[var(--header-height)]">
      {/* User Info */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-black font-bold text-xl shrink-0 ring-4 ring-brand/20">
            U
          </div>
          <div className="min-w-0">
            <h3 className="text-white font-semibold truncate">User</h3>
            <p className="text-sm text-gray-500 truncate">user@ecomvora.com</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-brand/10 text-brand"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
