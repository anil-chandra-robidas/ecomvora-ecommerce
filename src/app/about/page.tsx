import { Metadata } from "next";
import { Truck, ShieldCheck, Leaf, Headphones, Target, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — EcomVora",
  description: "Learn about EcomVora, your trusted source for fresh groceries delivered to your door.",
};

const values = [
  {
    icon: Leaf,
    title: "Farm Fresh",
    description: "We source directly from local farms to ensure the freshest produce reaches your table.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Same-day delivery on orders placed before 2 PM. Your groceries, on your schedule.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Guaranteed",
    description: "Every product is quality-checked. Not satisfied? We offer hassle-free returns.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our team is always here to help with orders, returns, or any questions you have.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-dark">
      {/* Hero */}
      <section className="relative pt-20 pb-0 bg-gradient-to-br from-emerald-900/40 via-dark to-dark overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About <span className="text-brand">EcomVora</span>
          </h1>
          <p className="text-lg text-gray-400 leading-relaxed">
            We&apos;re on a mission to make fresh, quality groceries accessible to everyone.
            Founded in 2024, EcomVora connects local farmers and producers directly with
            your doorstep — no middlemen, no compromises.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-[120px]">
        <div className="max-w-6xl mx-auto px-4">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-brand to-amber-500" />

            {/* Mission — Left */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center mb-16 last:mb-0">
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-500 border-4 border-dark z-10 ring-4 ring-emerald-500/20" />

              {/* Content — Left side */}
              <div className="w-full md:w-[calc(50%-2rem)] pl-16 md:pl-0 md:pr-16 md:text-right">
                <div className="group bg-gradient-to-br from-emerald-900/30 via-surface to-surface border border-white/10 rounded-2xl p-8 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500">
                  <span className="inline-block text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">01 — Purpose</span>
                  <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                  <p className="text-gray-400 leading-relaxed text-[15px]">
                    To make fresh, high-quality groceries accessible and affordable for everyone.
                    We bridge the gap between local farmers and consumers, ensuring every
                    household enjoys farm-fresh produce without the hassle.
                  </p>
                </div>
              </div>

              {/* Spacer — Right side */}
              <div className="hidden md:block w-[calc(50%-2rem)]" />
            </div>

            {/* Vision — Right */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center mb-16 last:mb-0">
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-brand border-4 border-dark z-10 ring-4 ring-brand/20" />

              {/* Spacer — Left side */}
              <div className="hidden md:block w-[calc(50%-2rem)]" />

              {/* Content — Right side */}
              <div className="w-full md:w-[calc(50%-2rem)] pl-16 md:pl-16">
                <div className="group bg-gradient-to-br from-brand/10 via-surface to-surface border border-white/10 rounded-2xl p-8 hover:border-brand/40 hover:shadow-2xl hover:shadow-brand/10 transition-all duration-500">
                  <span className="inline-block text-xs font-bold text-brand uppercase tracking-widest mb-3">02 — Aspiration</span>
                  <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                  <p className="text-gray-400 leading-relaxed text-[15px]">
                    To become the most trusted grocery platform that empowers local communities,
                    supports sustainable farming, and transforms the way people experience
                    fresh food delivery.
                  </p>
                </div>
              </div>
            </div>

            {/* Goal — Left */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center mb-16 last:mb-0">
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-500 border-4 border-dark z-10 ring-4 ring-amber-500/20" />

              {/* Content — Left side */}
              <div className="w-full md:w-[calc(50%-2rem)] pl-16 md:pl-0 md:pr-16 md:text-right">
                <div className="group bg-gradient-to-br from-amber-900/30 via-surface to-surface border border-white/10 rounded-2xl p-8 hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500">
                  <span className="inline-block text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">03 — Ambition</span>
                  <h3 className="text-2xl font-bold text-white mb-4">Our Goal</h3>
                  <p className="text-gray-400 leading-relaxed text-[15px]">
                    To serve 1 million+ households by 2030 with 100% locally sourced produce,
                   zero-waste packaging, and same-day delivery in every city we operate.
                  </p>
                </div>
              </div>

              {/* Spacer — Right side */}
              <div className="hidden md:block w-[calc(50%-2rem)]" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do — from sourcing to delivery.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="group relative bg-surface border border-white/10 rounded-2xl p-6 text-center hover:border-brand/30 hover:shadow-xl hover:shadow-brand/5 transition-all duration-300"
              >
                <div className="absolute top-3 right-4 text-5xl font-bold text-white/[0.03] select-none">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="w-12 h-12 gradient-brand rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-[120px]">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Our Story</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              EcomVora started with a simple idea: why should getting fresh food be complicated?
              We noticed that people wanted quality groceries but were tired of overpriced options
              and unreliable delivery.
            </p>
            <p className="text-gray-400 leading-relaxed">
              So we built a platform that partners directly with local farms, dairies, and
              bakeries. The result? Fresher food, fairer prices, and a shopping experience
              that actually makes your day better.
            </p>
          </div>
          <div className="bg-surface border border-white/10 rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-brand">500+</p>
                <p className="text-sm text-gray-400 mt-1">Local Farms</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-brand">50K+</p>
                <p className="text-sm text-gray-400 mt-1">Happy Customers</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-brand">10K+</p>
                <p className="text-sm text-gray-400 mt-1">Products</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-brand">99%</p>
                <p className="text-sm text-gray-400 mt-1">Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-[120px] bg-surface/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose Us</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-surface border border-white/10 rounded-2xl p-6 text-center hover:border-brand/30 transition-colors"
              >
                <div className="w-12 h-12 gradient-brand rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-sm text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
