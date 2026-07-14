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
  tops: "from-pink-500/20 to-pink-600/5 border-pink-500/30",
  bottoms: "from-blue-500/20 to-blue-600/5 border-blue-500/30",
  dresses: "from-purple-500/20 to-purple-600/5 border-purple-500/30",
  outerwear: "from-amber-500/20 to-amber-600/5 border-amber-500/30",
  accessories: "from-cyan-500/20 to-cyan-600/5 border-cyan-500/30",
  footwear: "from-emerald-500/20 to-emerald-600/5 border-emerald-500/30",
};

export const categoryEmojis: Record<string, string> = {
  tops: "👕",
  bottoms: "👖",
  dresses: "👗",
  outerwear: "🧥",
  accessories: "⌚",
  footwear: "👟",
};
