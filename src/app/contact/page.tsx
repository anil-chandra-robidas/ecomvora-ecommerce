import { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us — EcomVora",
  description: "Get in touch with the EcomVora team. We're here to help.",
};

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+1 (555) 123-4567", "+1 (555) 765-4321"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["support@ecomvora.com", "orders@ecomvora.com"],
  },
  {
    icon: MapPin,
    title: "Address",
    details: ["123 Fresh Street", "Farmville, CA 90210"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon - Fri: 8 AM – 8 PM", "Sat - Sun: 9 AM – 6 PM"],
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-dark">
      <section className="pt-[120px] bg-gradient-to-br from-emerald-900/40 via-dark to-dark">
        <div className="max-w-6xl mx-auto px-4">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get in <span className="text-brand">Touch</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Have a question or need help? We&apos;d love to hear from you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-surface border border-white/10 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-6">Send us a Message</h2>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us more..."
                  className="w-full px-4 py-2.5 bg-surface-light border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 gradient-brand rounded-xl text-black font-semibold hover:shadow-lg hover:shadow-brand/25 transition-all"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info) => (
              <div
                key={info.title}
                className="bg-surface border border-white/10 rounded-2xl p-6 flex gap-4"
              >
                <div className="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center shrink-0">
                  <info.icon className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">{info.title}</h3>
                  {info.details.map((detail) => (
                    <p key={detail} className="text-sm text-gray-400">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </section>
    </div>
  );
}
