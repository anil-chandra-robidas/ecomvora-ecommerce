"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight, Truck, ShieldCheck, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  {
    id: 1,
    badge: "New Collection 2026",
    title: ["Elevate Your", "Style With", "Premium Fashion"],
    description: "Discover curated collections that blend comfort with elegance. From everyday essentials to statement pieces.",
    cta: { text: "Shop Now", href: "/products?category=tops" },
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=800&fit=crop",
  },
  {
    id: 2,
    badge: "Limited Time Offer",
    title: ["Summer Sale", "Up to 50%", "Off Selected Styles"],
    description: "Refresh your wardrobe with our handpicked summer essentials. Bold colors, lightweight fabrics, effortless style.",
    cta: { text: "Explore Now", href: "/products?category=dresses" },
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=800&fit=crop",
  },
  {
    id: 3,
    badge: "Best Sellers",
    title: ["Statement", "Outerwear For", "Every Occasion"],
    description: "Layer up with premium jackets, blazers, and coats. Designed to turn heads and keep you comfortable.",
    cta: { text: "Order Now", href: "/products?category=outerwear" },
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=800&fit=crop",
  },
];

const trustItems = [
  { icon: Truck, text: "Free Delivery" },
  { icon: ShieldCheck, text: "Quality Guaranteed" },
  { icon: Star, text: "4.9 Rating" },
];

export default function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden bg-dark"
      style={{ height: "calc(100vh - var(--header-height))" }}
    >
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true, el: ".hero-pagination" }}
        navigation={{ nextEl: ".hero-next", prevEl: ".hero-prev" }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {/* Desktop: 50/50 grid */}
            <div className="hidden md:block h-full relative">
              {/* Left — Content (full width for alignment) */}
              <div className="absolute inset-0 flex items-start pt-16 lg:pt-20 pointer-events-none">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-auto">
                  <div className="max-w-xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-white">{slide.badge}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
                      {slide.title.map((line, i) => (
                        <span key={i} className="block">
                          {i === 1 ? <span className="text-white/60">{line}</span> : line}
                        </span>
                      ))}
                    </h1>
                    <p className="text-white/70 text-base lg:text-lg max-w-md mb-10 leading-relaxed">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mb-12">
                      <Link
                        href={slide.cta.href}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all hover:shadow-xl"
                      >
                        {slide.cta.text}
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                      <Link
                        href="/products"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-2xl font-bold text-lg hover:bg-white/20 transition-all"
                      >
                        View All
                      </Link>
                    </div>
                    <div className="flex flex-wrap gap-6">
                      {trustItems.map((item) => (
                        <div key={item.text} className="flex items-center gap-2 text-white/60">
                          <item.icon className="w-5 h-5" />
                          <span className="text-sm font-medium">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right — Image */}
              <div className="absolute top-0 right-0 w-1/2 h-full">
                <Image
                  src={slide.image}
                  alt={slide.title.join(" ")}
                  fill
                  sizes="50vw"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>

            {/* Mobile: stacked */}
            <div className="md:hidden flex flex-col h-full">
              <div className="relative h-[45%] w-full shrink-0">
                <Image
                  src={slide.image}
                  alt={slide.title.join(" ")}
                  fill
                  sizes="100vw"
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent" />
              </div>
              <div className="flex-1 flex flex-col justify-center px-5 py-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-4 w-fit">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs font-medium text-white">{slide.badge}</span>
                </div>
                <h1 className="text-3xl font-bold text-white leading-tight mb-3">
                  {slide.title.map((line, i) => (
                    <span key={i} className="block">
                      {i === 1 ? <span className="text-white/60">{line}</span> : line}
                    </span>
                  ))}
                </h1>
                <p className="text-white/70 text-sm max-w-sm mb-6 leading-relaxed">
                  {slide.description}
                </p>
                <div className="flex flex-col gap-3 mb-6">
                  <Link
                    href={slide.cta.href}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-xl font-bold text-base hover:bg-gray-100 transition-all"
                  >
                    {slide.cta.text}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-bold text-base hover:bg-white/20 transition-all"
                  >
                    View All
                  </Link>
                </div>
                <div className="flex flex-wrap gap-4">
                  {trustItems.map((item) => (
                    <div key={item.text} className="flex items-center gap-1.5 text-white/60">
                      <item.icon className="w-4 h-4" />
                      <span className="text-xs font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation */}
      <button className="hero-prev absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all hidden sm:flex items-center justify-center">
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button className="hero-next absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all hidden sm:flex items-center justify-center">
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Pagination */}
      <div className="hero-pagination absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3" />
    </section>
  );
}
