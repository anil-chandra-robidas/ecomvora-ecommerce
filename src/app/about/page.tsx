import { Metadata } from "next";
import { Truck, ShieldCheck, Leaf, Headphones } from "lucide-react";

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
      <section className="relative py-20 bg-gradient-to-br from-emerald-900/40 via-dark to-dark overflow-hidden">
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

      {/* Story */}
      <section className="py-20">
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
      <section className="py-20 bg-surface/50">
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
