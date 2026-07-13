import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "EcomVora — Fresh Food & Beverages Delivered",
  description:
    "Premium food and beverages delivered to your doorstep. Fresh fruits, organic vegetables, artisan snacks, and handcrafted beverages.",
  keywords: ["food", "beverages", "grocery", "organic", "fresh", "delivery"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-dark text-white font-sans">
        <Preloader />
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
