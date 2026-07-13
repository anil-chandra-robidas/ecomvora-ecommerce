"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How does delivery work?",
    answer: "We offer same-day delivery for orders placed before 2 PM. Simply add items to your cart, proceed to checkout, and choose your preferred delivery window. Our drivers will bring your order right to your door.",
  },
  {
    question: "What is your return policy?",
    answer: "If you're not satisfied with any product, you can request a return within 24 hours of delivery. We'll process a full refund or send a replacement — no questions asked.",
  },
  {
    question: "Do you offer free delivery?",
    answer: "Yes! Orders over $50 qualify for free standard delivery. For smaller orders, a flat delivery fee of $4.99 applies. Premium same-day delivery is $7.99.",
  },
  {
    question: "Where do you source your products?",
    answer: "We partner directly with local farms, dairies, and artisan producers within 100 miles of our distribution centers. This ensures freshness and supports local communities.",
  },
  {
    question: "Can I schedule a specific delivery time?",
    answer: "Absolutely. During checkout, you can choose from available delivery windows including morning (8 AM – 12 PM), afternoon (12 PM – 4 PM), and evening (4 PM – 8 PM).",
  },
  {
    question: "How do I track my order?",
    answer: "Once your order is out for delivery, you'll receive a real-time tracking link via SMS and email. You can also check your order status from your account dashboard.",
  },
  {
    question: "Do you have a subscription service?",
    answer: "Yes! EcomVora Fresh Club offers weekly or bi-weekly recurring deliveries of your favorite items at a 10% discount. You can pause, modify, or cancel anytime.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept Visa, Mastercard, American Express, PayPal, and Apple Pay. All transactions are encrypted and secure.",
  },
];

function FaqItem({ faq }: { faq: (typeof faqs)[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/5 transition-colors"
      >
        <span className="text-sm font-medium text-white pr-4">{faq.question}</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      {open && (
        <div className="px-6 pb-4">
          <p className="text-sm text-gray-400 leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-dark">
      <section className="py-20 bg-gradient-to-br from-emerald-900/40 via-dark to-dark">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Frequently Asked <span className="text-brand">Questions</span>
          </h1>
          <p className="text-gray-400">
            Everything you need to know about shopping with EcomVora.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 space-y-3">
          {faqs.map((faq) => (
            <FaqItem key={faq.question} faq={faq} />
          ))}
        </div>
      </section>
    </div>
  );
}
