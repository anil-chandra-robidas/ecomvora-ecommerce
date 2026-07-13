"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Zap, Crown, Leaf } from "lucide-react";

function CountdownTimer({ hours }: { hours: number }) {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const target = Date.now() + hours * 60 * 60 * 1000;

    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setTime({
        h: Math.floor(diff / (1000 * 60 * 60)),
        m: Math.floor((diff / (1000 * 60)) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [hours]);

  return (
    <div className="flex items-center gap-1 text-xs font-mono">
      <Clock className="w-3 h-3" />
      <span className="bg-black/30 px-1.5 py-0.5 rounded">{String(time.h).padStart(2, "0")}</span>
      <span>:</span>
      <span className="bg-black/30 px-1.5 py-0.5 rounded">{String(time.m).padStart(2, "0")}</span>
      <span>:</span>
      <span className="bg-black/30 px-1.5 py-0.5 rounded">{String(time.s).padStart(2, "0")}</span>
    </div>
  );
}

const promos = [
  {
    title: "Budget Bites",
    subtitle: "Special Offer",
    discount: "50% Off",
    description: "Grab healthy snacks at unbeatable prices",
    icon: Zap,
    emoji: "🍿",
    href: "/products?category=snacks",
    gradient: "from-emerald-900/80 via-emerald-800/60 to-dark",
    iconColor: "text-emerald-400",
    hours: 24,
  },
  {
    title: "Premium Selection",
    subtitle: "Exclusive Picks",
    discount: null,
    description: "Curated dairy products for the finest taste",
    icon: Crown,
    emoji: "🧀",
    href: "/products?category=dairy",
    gradient: "from-brand/30 via-brand/10 to-dark",
    iconColor: "text-brand",
    hours: 36,
  },
  {
    title: "Seasonal Favorites",
    subtitle: "Limited Time",
    discount: "30% Off",
    description: "Fresh bakery items baked just for you",
    icon: Leaf,
    emoji: "🍞",
    href: "/products?category=bakery",
    gradient: "from-orange-900/80 via-orange-800/60 to-dark",
    iconColor: "text-orange-400",
    hours: 48,
  },
];

export default function PromoCards() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[120px]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {promos.map((promo) => (
          <Link
            key={promo.title}
            href={promo.href}
            className={`group relative bg-gradient-to-br ${promo.gradient} rounded-2xl p-6 overflow-hidden min-h-[200px] flex flex-col justify-between`}
          >
            {/* Decorative blur */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[60px]" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <promo.icon className={`w-4 h-4 ${promo.iconColor}`} />
                <span className="text-xs font-medium text-gray-400">{promo.subtitle}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{promo.title}</h3>
              {promo.discount && (
                <span className="inline-block px-2.5 py-0.5 gradient-brand rounded-lg text-xs font-bold text-black mb-2">
                  {promo.discount}
                </span>
              )}
              <p className="text-gray-400 text-sm">{promo.description}</p>
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <CountdownTimer hours={promo.hours} />
              <span className="text-4xl">{promo.emoji}</span>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors rounded-2xl" />
          </Link>
        ))}
      </div>
    </section>
  );
}
