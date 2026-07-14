"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  order: number;
}

function FaqItemComponent({ faq }: { faq: FaqItem }) {
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

const DEFAULT_FAQS: FaqItem[] = [
  {
    id: "1",
    question: "How does delivery work?",
    answer: "We offer same-day delivery for orders placed before 2 PM. Simply add items to your cart, proceed to checkout, and choose your preferred delivery window. Our drivers will bring your order right to your door.",
    order: 0,
  },
  {
    id: "2",
    question: "What is your return policy?",
    answer: "If you're not satisfied with any product, you can request a return within 24 hours of delivery. We'll process a full refund or send a replacement — no questions asked.",
    order: 1,
  },
  {
    id: "3",
    question: "Do you offer free delivery?",
    answer: "Yes! Orders over $50 qualify for free standard delivery. For smaller orders, a flat delivery fee of $4.99 applies. Premium same-day delivery is $7.99.",
    order: 2,
  },
];

export default function FaqPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>(DEFAULT_FAQS);

  useEffect(() => {
    fetch("/api/admin/faq")
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) setFaqs(data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-dark">
      <section className="pt-[120px] bg-gradient-to-br from-emerald-900/40 via-dark to-dark">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked <span className="text-brand">Questions</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to know about shopping with EcomVora.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq) => (
              <FaqItemComponent key={faq.id} faq={faq} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
