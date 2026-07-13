"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Regular Customer",
    rating: 5,
    text: "The freshest produce I've ever received! The fruits are always ripe and the vegetables are crispy. EcomVora has become my go-to for weekly groceries.",
    avatar: "👩‍🦰",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Food Enthusiast",
    rating: 5,
    text: "Amazing quality and super fast delivery. I love how they source from local farms. The organic selection is fantastic and prices are very competitive.",
    avatar: "👨‍🍳",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Busy Mom",
    rating: 5,
    text: "As a working mom, EcomVora saves me so much time. Fresh groceries delivered right to my door within hours. The kids love the fresh fruits!",
    avatar: "👩‍👧‍👦",
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Health Conscious",
    rating: 5,
    text: "Finally found a reliable source for organic produce. The quality is consistent and delivery is always on time. Highly recommend to anyone who values fresh food.",
    avatar: "🧑‍⚕️",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[60px]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="inline-block px-3 py-1 bg-brand/10 text-brand rounded-lg text-xs font-bold uppercase tracking-wider mb-3">
            Testimonials
          </span>
          <h2 className="text-3xl font-bold text-white">
            What Our <span className="text-brand">Customers</span> Say
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="p-2 rounded-xl bg-surface border border-white/5 text-gray-400 hover:text-white hover:border-white/10 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="p-2 rounded-xl bg-surface border border-white/5 text-gray-400 hover:text-white hover:border-white/10 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {testimonials.map((testimonial, idx) => (
          <div
            key={testimonial.id}
            className={cn(
              "relative bg-surface border border-white/5 rounded-2xl p-6 transition-all duration-300",
              idx === currentIndex
                ? "border-brand/30 bg-brand/5"
                : "hover:border-white/10"
            )}
          >
            {/* Quote Icon */}
            <div className="absolute top-4 right-4 text-brand/20">
              <Quote className="w-8 h-8" />
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-4">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-brand fill-brand" />
              ))}
            </div>

            {/* Text */}
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              &ldquo;{testimonial.text}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-xl">
                {testimonial.avatar}
              </div>
              <div>
                <p className="text-white text-sm font-medium">{testimonial.name}</p>
                <p className="text-gray-500 text-xs">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              idx === currentIndex
                ? "bg-brand w-6"
                : "bg-gray-600 hover:bg-gray-500"
            )}
          />
        ))}
      </div>
    </section>
  );
}
