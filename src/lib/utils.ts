export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

export const categoryColors: Record<string, string> = {
  fruits: "from-green-500/20 to-green-600/5 border-green-500/30",
  vegetables: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/30",
  beverages: "from-blue-500/20 to-blue-600/5 border-blue-500/30",
  snacks: "from-amber-500/20 to-amber-600/5 border-amber-500/30",
  dairy: "from-cyan-500/20 to-cyan-600/5 border-cyan-500/30",
  bakery: "from-orange-500/20 to-orange-600/5 border-orange-500/30",
};

export const categoryEmojis: Record<string, string> = {
  fruits: "🍎",
  vegetables: "🥬",
  beverages: "🥤",
  snacks: "🍿",
  dairy: "🧀",
  bakery: "🍞",
};
