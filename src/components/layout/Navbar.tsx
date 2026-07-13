"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  Utensils,
  ChevronDown,
  Heart,
  MapPin,
  Flame,
  ChevronRight,
  Phone,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/types";
import { categoryEmojis } from "@/lib/utils";

const categoryDescriptions: Record<string, string> = {
  fruits: "Seasonal & exotic fruits",
  vegetables: "Farm-fresh greens",
  beverages: "Juices, teas & more",
  snacks: "Healthy & tasty bites",
  dairy: "Milk, cheese & yogurt",
  bakery: "Freshly baked goods",
};

type NavItem =
  | { href: string; label: string; hasDropdown?: boolean }
  | {
      label: string;
      hasPagesDropdown: true;
      items: { href: string; label: string; icon: React.ElementType }[];
    };

const navLinks: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop", hasDropdown: true },
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

function AnnouncementCountdown() {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = Date.now() + 24 * 60 * 60 * 1000;

    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setTime({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-1 text-[10px] font-mono">
      <span className="bg-white/20 px-1.5 py-0.5 rounded">{String(time.hours).padStart(2, "0")}</span>
      <span className="text-brand">:</span>
      <span className="bg-white/20 px-1.5 py-0.5 rounded">{String(time.minutes).padStart(2, "0")}</span>
      <span className="text-brand">:</span>
      <span className="bg-white/20 px-1.5 py-0.5 rounded">{String(time.seconds).padStart(2, "0")}</span>
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const { itemCount } = useCart();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="sticky top-0 z-50">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-9">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Flame className="w-3.5 h-3.5 text-brand" />
              <span className="hidden sm:inline">
                🎉 Celebrating Big Deals — Fresh Groceries at Unbeatable Prices
              </span>
              <span className="sm:hidden">
                🎉 Big Deals on Fresh Groceries!
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-emerald-200 hidden sm:inline">Ends in</span>
              <AnnouncementCountdown />
            </div>
          </div>
        </div>
      </div>

      {/* Row 1: Logo, Search, Actions */}
      <div className="bg-dark/95 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 lg:gap-6 h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="w-9 h-9 gradient-brand rounded-xl flex items-center justify-center">
                <Utensils className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold text-white hidden sm:block">
                Ecom<span className="text-brand">Vora</span>
              </span>
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const input = (e.target as HTMLFormElement).searchInput.value;
                  if (input.trim()) {
                    router.push(`/products?search=${encodeURIComponent(input.trim())}`);
                  }
                }}
                className="flex items-stretch"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    name="searchInput"
                    type="text"
                    placeholder="Search Product"
                    className="w-full pl-12 pr-4 py-2.5 bg-surface-light border border-white/10 border-r-0 rounded-l-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 gradient-brand rounded-r-xl text-black font-semibold hover:shadow-lg hover:shadow-brand/25 transition-all flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </form>
            </div>

            {/* Action Icons */}
            <div className="flex items-center gap-1">
              <Link
                href="/products"
                className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm"
              >
                <MapPin className="w-4 h-4" />
                <div className="text-left">
                  <p className="text-[10px] text-gray-500 leading-none">Deliver to</p>
                  <p className="text-xs font-medium leading-tight">Your Location</p>
                </div>
              </Link>

              <button className="relative p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all">
                <Heart className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-brand rounded-full" />
              </button>

              <Link
                href="/cart"
                className="relative p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 gradient-brand rounded-full flex items-center justify-center text-[10px] font-bold text-black">
                    {itemCount}
                  </span>
                )}
              </Link>

              <Link
                href="/login"
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm"
              >
                <User className="w-5 h-5" />
                <div className="text-left hidden lg:block">
                  <p className="text-[10px] text-gray-500 leading-none">Hello, Sign In</p>
                  <p className="text-xs font-medium leading-tight">Account</p>
                </div>
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all lg:hidden"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Category Dropdown + Nav Links (Desktop) */}
      <div className="hidden lg:block bg-surface/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 h-11">
            {/* Browse Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                className="flex items-center gap-2 px-5 py-2 rounded-lg bg-brand text-black text-sm font-semibold hover:bg-brand-light transition-colors"
              >
                <Menu className="w-4 h-4" />
                Browse Categories
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", categoriesOpen && "rotate-180")} />
              </button>

              {categoriesOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setCategoriesOpen(false)} />
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <div className="bg-surface border border-white/10 rounded-xl shadow-2xl shadow-black/50 p-2 min-w-[260px]">
                      {CATEGORIES.map((cat) => (
                        <Link
                          key={cat}
                          href={`/products?category=${cat}`}
                          onClick={() => setCategoriesOpen(false)}
                          className="flex items-center justify-between px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-xl">{categoryEmojis[cat]}</span>
                            <div>
                              <p className="font-medium capitalize">{cat}</p>
                              <p className="text-xs text-gray-500">{categoryDescriptions[cat]}</p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-brand transition-colors" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Divider */}
            <div className="w-px h-5 bg-white/10" />

            {/* Nav Links */}
            <div className="flex items-center gap-0.5">
              {navLinks.map((link) => {
                if ("hasDropdown" in link && link.hasDropdown) {
                  return (
                    <div key={link.label} className="relative">
                      <button
                        onMouseEnter={() => setShopDropdownOpen(true)}
                        onMouseLeave={() => setShopDropdownOpen(false)}
                        className={cn(
                          "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                          pathname === link.href
                            ? "bg-brand/10 text-brand"
                            : shopDropdownOpen
                              ? "text-white bg-white/5"
                              : "text-gray-300 hover:text-white hover:bg-white/5"
                        )}
                      >
                        {link.label}
                        <ChevronDown className={cn("w-3 h-3 transition-transform duration-200", shopDropdownOpen && "rotate-180")} />
                      </button>

                      {/* Shop Mega Dropdown */}
                      <div
                        onMouseEnter={() => setShopDropdownOpen(true)}
                        onMouseLeave={() => setShopDropdownOpen(false)}
                        className={cn(
                          "absolute top-full left-0 pt-3 z-50 transition-all duration-200 ease-out",
                          shopDropdownOpen
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 -translate-y-2 pointer-events-none"
                        )}
                      >
                        <div className="bg-surface/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/60 p-2 min-w-[520px]">
                          <div className="grid grid-cols-2 gap-1">
                            {CATEGORIES.map((cat) => (
                              <Link
                                key={cat}
                                href={`/products?category=${cat}`}
                                onClick={() => setShopDropdownOpen(false)}
                                className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-all duration-150 group"
                              >
                                <span className="text-2xl group-hover:scale-110 transition-transform duration-150">{categoryEmojis[cat]}</span>
                                <div>
                                  <p className="text-sm font-medium text-white capitalize group-hover:text-brand transition-colors duration-150">{cat}</p>
                                  <p className="text-xs text-gray-500">{categoryDescriptions[cat]}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                const href = "href" in link ? link.href : "/";
                return (
                  <Link
                    key={link.label}
                    href={href}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      pathname === href
                        ? "bg-brand/10 text-brand"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Right side — Phone */}
            <div className="ml-auto flex items-center gap-2 text-sm text-gray-400">
              <Phone className="w-4 h-4 text-brand" />
              <span className="hidden xl:inline">+1 (555) 123-4567</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-surface/95 backdrop-blur-xl max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            {/* Mobile search */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const input = (e.target as HTMLFormElement).searchInput.value;
                if (input.trim()) {
                  router.push(`/products?search=${encodeURIComponent(input.trim())}`);
                  setMobileOpen(false);
                }
              }}
              className="flex items-stretch mb-4"
            >
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  name="searchInput"
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-12 pr-4 py-3 bg-surface-light border border-white/10 border-r-0 rounded-l-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all"
                />
              </div>
              <button
                type="submit"
                className="px-5 gradient-brand rounded-r-xl text-black font-semibold"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>

            {/* Categories accordion */}
            <button
              onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-brand/10 border border-brand/20 text-sm font-medium text-brand"
            >
              <span className="flex items-center gap-2">
                <Menu className="w-4 h-4" />
                Browse Categories
              </span>
              <ChevronDown className={cn("w-4 h-4 transition-transform", mobileCategoriesOpen && "rotate-180")} />
            </button>
            {mobileCategoriesOpen && (
              <div className="pl-4 space-y-1 mt-1">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat}
                    href={`/products?category=${cat}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400 hover:text-brand transition-colors"
                  >
                    <span className="text-lg">{categoryEmojis[cat]}</span>
                    <span className="capitalize">{cat}</span>
                  </Link>
                ))}
              </div>
            )}

            {/* Divider */}
            <div className="border-t border-white/10 my-2" />

            {/* Nav links */}
            {navLinks.map((link) => {
              const href = "href" in link ? link.href : "/";
              return (
                <Link
                  key={link.label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150",
                    pathname === href
                      ? "bg-brand/10 text-brand"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* Divider */}
            <div className="border-t border-white/10 my-2" />

            {/* Account actions */}
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl"
            >
              <User className="w-5 h-5" />
              Sign In / Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
