import type { Metadata } from "next";
import "../globals.css";
import { CartProvider } from "@/context/CartContext";

export const metadata: Metadata = {
  title: "Dashboard — EcomVora",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-dark text-white font-sans">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
