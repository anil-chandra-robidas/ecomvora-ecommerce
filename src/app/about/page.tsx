import { Truck, ShieldCheck, Leaf, Headphones } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "About Us — EcomVora",
  description: "Learn about EcomVora, your trusted source for fresh groceries delivered to your door.",
};

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Leaf,
  Truck,
  ShieldCheck,
  Headphones,
};

function getSection(sections: { section: string; content: string }[], key: string) {
  const s = sections.find((s) => s.section === key);
  if (!s) return {};
  try { return JSON.parse(s.content); } catch { return {}; }
}

async function getAboutContent() {
  try {
    const sections = await prisma.pageContent.findMany({
      where: { page: "about" },
      orderBy: { order: "asc" },
    });
    return sections;
  } catch {
    return [];
  }
}

export default async function AboutPage() {
  const sections = await getAboutContent();
  const hero = getSection(sections, "hero");
  const mission = getSection(sections, "mission");
  const vision = getSection(sections, "vision");
  const goal = getSection(sections, "goal");
  const story = getSection(sections, "story");
  const valuesTitle = getSection(sections, "values_title");

  const valuesSection = sections.find((s) => s.section === "values");
  let values = [
    { title: "Farm Fresh", description: "We source directly from local farms to ensure the freshest produce reaches your table." },
    { title: "Fast Delivery", description: "Same-day delivery on orders placed before 2 PM. Your groceries, on your schedule." },
    { title: "Quality Guaranteed", description: "Every product is quality-checked. Not satisfied? We offer hassle-free returns." },
    { title: "24/7 Support", description: "Our team is always here to help with orders, returns, or any questions you have." },
  ];
  if (valuesSection) {
    try { values = JSON.parse(valuesSection.content); } catch { /* keep defaults */ }
  }

  const valueIcons = [Leaf, Truck, ShieldCheck, Headphones];

  return (
    <div className="min-h-screen bg-dark">
      {/* Mission & Vision */}
      <section className="pt-[120px] bg-gradient-to-br from-emerald-900/40 via-dark to-dark">
        <div className="max-w-6xl mx-auto px-4">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {hero.title ? (
                <>{hero.title.split(" ").slice(0, -1).join(" ")} <span className="text-brand">{hero.title.split(" ").slice(-1)}</span></>
              ) : (
                <>About <span className="text-brand">EcomVora</span></>
              )}
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              {hero.description || "We&apos;re on a mission to make fresh, quality groceries accessible to everyone. Founded in 2024, EcomVora connects local farmers and producers directly with your doorstep — no middlemen, no compromises."}
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-brand to-amber-500" />

            {/* Mission */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center mb-16 last:mb-0">
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-500 border-4 border-dark z-10 ring-4 ring-emerald-500/20" />
              <div className="w-full md:w-[calc(50%-2rem)] pl-16 md:pl-0 md:pr-16 md:text-right">
                <div className="group bg-gradient-to-br from-emerald-900/30 via-surface to-surface border border-white/10 rounded-2xl p-8 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500">
                  <span className="inline-block text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">{mission.badge || "01 — Purpose"}</span>
                  <h3 className="text-2xl font-bold text-white mb-4">{mission.title || "Our Mission"}</h3>
                  <p className="text-gray-400 leading-relaxed text-[15px]">
                    {mission.description || "To make fresh, high-quality groceries accessible and affordable for everyone. We bridge the gap between local farmers and consumers, ensuring every household enjoys farm-fresh produce without the hassle."}
                  </p>
                </div>
              </div>
              <div className="hidden md:block w-[calc(50%-2rem)]" />
            </div>

            {/* Vision */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center mb-16 last:mb-0">
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-brand border-4 border-dark z-10 ring-4 ring-brand/20" />
              <div className="hidden md:block w-[calc(50%-2rem)]" />
              <div className="w-full md:w-[calc(50%-2rem)] pl-16 md:pl-16">
                <div className="group bg-gradient-to-br from-brand/10 via-surface to-surface border border-white/10 rounded-2xl p-8 hover:border-brand/40 hover:shadow-2xl hover:shadow-brand/10 transition-all duration-500">
                  <span className="inline-block text-xs font-bold text-brand uppercase tracking-widest mb-3">{vision.badge || "02 — Aspiration"}</span>
                  <h3 className="text-2xl font-bold text-white mb-4">{vision.title || "Our Vision"}</h3>
                  <p className="text-gray-400 leading-relaxed text-[15px]">
                    {vision.description || "To become the most trusted grocery platform that empowers local communities, supports sustainable farming, and transforms the way people experience fresh food delivery."}
                  </p>
                </div>
              </div>
            </div>

            {/* Goal */}
            <div className="relative flex flex-col md:flex-row items-start md:items-center mb-16 last:mb-0">
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-500 border-4 border-dark z-10 ring-4 ring-amber-500/20" />
              <div className="w-full md:w-[calc(50%-2rem)] pl-16 md:pl-0 md:pr-16 md:text-right">
                <div className="group bg-gradient-to-br from-amber-900/30 via-surface to-surface border border-white/10 rounded-2xl p-8 hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-500">
                  <span className="inline-block text-xs font-bold text-amber-400 uppercase tracking-widest mb-3">{goal.badge || "03 — Ambition"}</span>
                  <h3 className="text-2xl font-bold text-white mb-4">{goal.title || "Our Goal"}</h3>
                  <p className="text-gray-400 leading-relaxed text-[15px]">
                    {goal.description || "To serve 1 million+ households by 2030 with 100% locally sourced produce, zero-waste packaging, and same-day delivery in every city we operate."}
                  </p>
                </div>
              </div>
              <div className="hidden md:block w-[calc(50%-2rem)]" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-[60px]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">{valuesTitle.title || "Our Values"}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {valuesTitle.subtitle || "The principles that guide everything we do — from sourcing to delivery."}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value: { title: string; description: string }, index: number) => {
              const Icon = valueIcons[index % valueIcons.length];
              return (
                <div
                  key={value.title}
                  className="group relative bg-surface border border-white/10 rounded-2xl p-6 text-center hover:border-brand/30 hover:shadow-xl hover:shadow-brand/5 transition-all duration-300"
                >
                  <div className="absolute top-3 right-4 text-5xl font-bold text-white/[0.03] select-none">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div className="w-12 h-12 gradient-brand rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-[60px]">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">{story.title || "Our Story"}</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              {story.paragraph1 || "EcomVora started with a simple idea: why should getting fresh food be complicated? We noticed that people wanted quality groceries but were tired of overpriced options and unreliable delivery."}
            </p>
            <p className="text-gray-400 leading-relaxed">
              {story.paragraph2 || "So we built a platform that partners directly with local farms, dairies, and bakeries. The result? Fresher food, fairer prices, and a shopping experience that actually makes your day better."}
            </p>
          </div>
          <div className="bg-surface border border-white/10 rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-brand">{story.stat1Value || "500+"}</p>
                <p className="text-sm text-gray-400 mt-1">{story.stat1Label || "Local Farms"}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-brand">{story.stat2Value || "50K+"}</p>
                <p className="text-sm text-gray-400 mt-1">{story.stat2Label || "Happy Customers"}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-brand">{story.stat3Value || "10K+"}</p>
                <p className="text-sm text-gray-400 mt-1">{story.stat3Label || "Products"}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-brand">{story.stat4Value || "99%"}</p>
                <p className="text-sm text-gray-400 mt-1">{story.stat4Label || "Satisfaction"}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-[60px]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose Us</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value: { title: string; description: string }, index: number) => {
              const Icon = valueIcons[index % valueIcons.length];
              return (
                <div
                  key={value.title}
                  className="bg-surface border border-white/10 rounded-2xl p-6 text-center hover:border-brand/30 transition-colors"
                >
                  <div className="w-12 h-12 gradient-brand rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-400">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
