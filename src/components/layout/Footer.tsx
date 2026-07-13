import Link from "next/link";
import {
  Utensils,
  Mail,
  MapPin,
  Phone,
  CreditCard,
  ShieldCheck,
  Truck,
  Clock,
} from "lucide-react";
import { categoryEmojis } from "@/lib/utils";
import { CATEGORIES } from "@/types";

const footerCategories = CATEGORIES.map((cat) => ({
  name: cat.charAt(0).toUpperCase() + cat.slice(1),
  href: `/products?category=${cat}`,
  emoji: categoryEmojis[cat],
}));

const accountLinks = [
  { label: "My Account", href: "/account" },
  { label: "Order History", href: "/account" },
  { label: "Wishlist", href: "/products" },
  { label: "Track Order", href: "/account" },
  { label: "Help Center", href: "/about" },
];

const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
);
const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);
const TwitterIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
);
const YoutubeIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"/></svg>
);

const socialLinks = [
  { name: "Facebook", icon: FacebookIcon, href: "#" },
  { name: "Instagram", icon: InstagramIcon, href: "#" },
  { name: "Twitter", icon: TwitterIcon, href: "#" },
  { name: "YouTube", icon: YoutubeIcon, href: "#" },
];

const paymentMethods = ["Visa", "Mastercard", "PayPal", "Stripe"];

export default function Footer() {
  return (
    <footer className="mt-[120px] bg-surface border-t border-white/5">
      {/* Trust Bar */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
              { icon: Clock, title: "24/7 Support", desc: "Round the clock service" },
              { icon: ShieldCheck, title: "Secure Payment", desc: "100% protected" },
              { icon: CreditCard, title: "Easy Returns", desc: "7-day return policy" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{item.title}</p>
                  <p className="text-gray-500 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand + Newsletter */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center">
                <Utensils className="w-5 h-5 text-black" />
              </div>
              <span className="text-2xl font-bold text-white">
                Ecom<span className="text-brand">Vora</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Premium food and beverages delivered fresh to your doorstep. Quality
              ingredients for quality living.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-white text-sm font-semibold mb-2">Subscribe to Newsletter</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-4 py-2.5 bg-dark border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/50 focus:border-brand transition-all"
                />
                <button className="px-5 py-2.5 gradient-brand rounded-xl text-sm font-semibold text-black hover:shadow-lg hover:shadow-brand/25 transition-all whitespace-nowrap">
                  Join
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand/10 hover:border-brand/20 transition-all"
                >
                  <social.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 gradient-brand rounded-full" />
              Categories
            </h3>
            <ul className="space-y-2.5">
              {footerCategories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={cat.href}
                    className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-white transition-colors group"
                  >
                    <span className="text-base group-hover:scale-110 transition-transform">{cat.emoji}</span>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 gradient-brand rounded-full" />
              Account
            </h3>
            <ul className="space-y-2.5">
              {accountLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 gradient-brand rounded-full" />
              Contact Us
            </h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-brand" />
                </div>
                <span className="text-sm text-gray-400 leading-relaxed">
                  123 Fresh Street, Foodie City, FC 12345
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-brand" />
                </div>
                <span className="text-sm text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-brand" />
                </div>
                <span className="text-sm text-gray-400">hello@ecomvora.com</span>
              </li>
            </ul>

            {/* Payment Methods */}
            <div>
              <p className="text-white text-sm font-semibold mb-3">We Accept</p>
              <div className="flex flex-wrap gap-2">
                {paymentMethods.map((method) => (
                  <div
                    key={method}
                    className="px-3 py-1.5 bg-dark border border-white/10 rounded-lg text-xs text-gray-400 font-medium"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} EcomVora. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {["Privacy Policy", "Terms of Service", "Refund Policy", "Cookie Policy"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
