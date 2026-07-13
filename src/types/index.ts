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
  status: "pending" | "processing" | "shipped" | "delivered";
  shippingName: string;
  shippingEmail: string;
  shippingAddr: string;
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

export const CATEGORIES = [
  "fruits",
  "vegetables",
  "beverages",
  "snacks",
  "dairy",
  "bakery",
] as const;

export type Category = (typeof CATEGORIES)[number];
