const pageSections = [
  {
    page: "about",
    section: "hero",
    title: "Hero Section",
    content: JSON.stringify({
      title: "About EcomVora",
      subtitle: "Fresh Groceries, Delivered",
      description: "We're on a mission to make fresh, quality groceries accessible to everyone. Founded in 2024, EcomVora connects local farmers and producers directly with your doorstep — no middlemen, no compromises.",
    }),
    order: 0,
  },
  {
    page: "about",
    section: "mission",
    title: "Mission",
    content: JSON.stringify({
      badge: "01 — Purpose",
      title: "Our Mission",
      description: "To make fresh, high-quality groceries accessible and affordable for everyone. We bridge the gap between local farmers and consumers, ensuring every household enjoys farm-fresh produce without the hassle.",
    }),
    order: 1,
  },
  {
    page: "about",
    section: "vision",
    title: "Vision",
    content: JSON.stringify({
      badge: "02 — Aspiration",
      title: "Our Vision",
      description: "To become the most trusted grocery platform that empowers local communities, supports sustainable farming, and transforms the way people experience fresh food delivery.",
    }),
    order: 2,
  },
  {
    page: "about",
    section: "goal",
    title: "Goal",
    content: JSON.stringify({
      badge: "03 — Ambition",
      title: "Our Goal",
      description: "To serve 1 million+ households by 2030 with 100% locally sourced produce, zero-waste packaging, and same-day delivery in every city we operate.",
    }),
    order: 3,
  },
  {
    page: "about",
    section: "story",
    title: "Our Story",
    content: JSON.stringify({
      title: "Our Story",
      paragraph1: "EcomVora started with a simple idea: why should getting fresh food be complicated? We noticed that people wanted quality groceries but were tired of overpriced options and unreliable delivery.",
      paragraph2: "So we built a platform that partners directly with local farms, dairies, and bakeries. The result? Fresher food, fairer prices, and a shopping experience that actually makes your day better.",
      stat1Value: "500+",
      stat1Label: "Local Farms",
      stat2Value: "50K+",
      stat2Label: "Happy Customers",
      stat3Value: "10K+",
      stat3Label: "Products",
      stat4Value: "99%",
      stat4Label: "Satisfaction",
    }),
    order: 4,
  },
  {
    page: "about",
    section: "values_title",
    title: "Values Section Title",
    content: JSON.stringify({
      title: "Our Values",
      subtitle: "The principles that guide everything we do — from sourcing to delivery.",
    }),
    order: 5,
  },
  {
    page: "about",
    section: "values",
    title: "Values",
    content: JSON.stringify([
      { title: "Farm Fresh", description: "We source directly from local farms to ensure the freshest produce reaches your table." },
      { title: "Fast Delivery", description: "Same-day delivery on orders placed before 2 PM. Your groceries, on your schedule." },
      { title: "Quality Guaranteed", description: "Every product is quality-checked. Not satisfied? We offer hassle-free returns." },
      { title: "24/7 Support", description: "Our team is always here to help with orders, returns, or any questions you have." },
    ]),
    order: 6,
  },
];

const faqItems = [
  { question: "How does delivery work?", answer: "We offer same-day delivery for orders placed before 2 PM. Simply add items to your cart, proceed to checkout, and choose your preferred delivery window. Our drivers will bring your order right to your door.", order: 0 },
  { question: "What is your return policy?", answer: "If you're not satisfied with any product, you can request a return within 24 hours of delivery. We'll process a full refund or send a replacement — no questions asked.", order: 1 },
  { question: "Do you offer free delivery?", answer: "Yes! Orders over $50 qualify for free standard delivery. For smaller orders, a flat delivery fee of $4.99 applies. Premium same-day delivery is $7.99.", order: 2 },
  { question: "Where do you source your products?", answer: "We partner directly with local farms, dairies, and artisan producers within 100 miles of our distribution centers. This ensures freshness and supports local communities.", order: 3 },
  { question: "Can I schedule a specific delivery time?", answer: "Absolutely. During checkout, you can choose from available delivery windows including morning (8 AM – 12 PM), afternoon (12 PM – 4 PM), and evening (4 PM – 8 PM).", order: 4 },
  { question: "How do I track my order?", answer: "Once your order is out for delivery, you'll receive a real-time tracking link via SMS and email. You can also check your order status from your account dashboard.", order: 5 },
  { question: "Do you have a subscription service?", answer: "Yes! EcomVora Fresh Club offers weekly or bi-weekly recurring deliveries of your favorite items at a 10% discount. You can pause, modify, or cancel anytime.", order: 6 },
  { question: "What payment methods do you accept?", answer: "We accept Visa, Mastercard, American Express, PayPal, and Apple Pay. All transactions are encrypted and secure.", order: 7 },
];

const contactItems = [
  { type: "phone", label: "Phone", details: "+1 (555) 123-4567\n+1 (555) 765-4321", order: 0 },
  { type: "email", label: "Email", details: "support@ecomvora.com\norders@ecomvora.com", order: 1 },
  { type: "address", label: "Address", details: "123 Fresh Street\nFarmville, CA 90210", order: 2 },
  { type: "hours", label: "Business Hours", details: "Mon - Fri: 8 AM – 8 PM\nSat - Sun: 9 AM – 6 PM", order: 3 },
];

const BASE = "http://localhost:3000";

async function seed() {
  console.log("Seeding page content...");

  for (const section of pageSections) {
    const res = await fetch(`${BASE}/api/admin/pages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(section),
    });
    if (res.ok) console.log(`  Page: ${section.page}/${section.section}`);
    else console.error(`  Failed: ${section.page}/${section.section}`);
  }

  for (const item of faqItems) {
    const res = await fetch(`${BASE}/api/admin/faq`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (res.ok) console.log(`  FAQ: ${item.question.slice(0, 40)}...`);
    else console.error(`  Failed FAQ: ${item.question.slice(0, 40)}`);
  }

  for (const item of contactItems) {
    const res = await fetch(`${BASE}/api/admin/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });
    if (res.ok) console.log(`  Contact: ${item.label}`);
    else console.error(`  Failed Contact: ${item.label}`);
  }

  console.log("Done!");
}

seed();
