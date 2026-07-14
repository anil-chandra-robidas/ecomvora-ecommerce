export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  featured: boolean;
  onSale?: boolean;
  avgRating?: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "paid" | "processing" | "shipped" | "delivered";
  shippingName: string;
  shippingEmail: string;
  shippingAddr: string;
  paymentIntentId?: string;
  createdAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  user: {
    name: string;
    image?: string;
  };
}

export interface WishlistItem {
  id: string;
  product: Product;
  createdAt: Date | string;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export const CATEGORIES = [
  "tops",
  "bottoms",
  "dresses",
  "outerwear",
  "accessories",
  "footwear",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  readTime: string;
  published: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export const BLOG_CATEGORIES = [
  "Nutrition",
  "Seasonal",
  "Lifestyle",
  "Tips",
  "Education",
  "Recipes",
] as const;
