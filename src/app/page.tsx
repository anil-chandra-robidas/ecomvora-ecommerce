import Hero from "@/components/home/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import TrendingProducts from "@/components/home/TrendingProducts";
import TopSelling from "@/components/home/TopSelling";
import NewArrivals from "@/components/home/NewArrivals";
import BestRated from "@/components/home/BestRated";
import Testimonials from "@/components/home/Testimonials";
import PromoCards from "@/components/home/PromoCards";
import Blog from "@/components/home/Blog";
import Newsletter from "@/components/home/Newsletter";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featuredProducts = await prisma.product.findMany({
    where: { featured: true },
    orderBy: { createdAt: "desc" },
    take: 24,
  });

  const topSellingProducts = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 24,
  });

  const newArrivalsProducts = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 24,
  });

  const bestRatedProducts = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 24,
  });

  const serialize = (products: typeof featuredProducts) =>
    products.map((p) => ({
      ...p,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));

  return (
    <>
      <Hero />
      <FeaturedCategories />
      <TrendingProducts products={serialize(featuredProducts) as never} />
      <TopSelling products={serialize(topSellingProducts) as never} />
      <NewArrivals products={serialize(newArrivalsProducts) as never} />
      <BestRated products={serialize(bestRatedProducts) as never} />
      <PromoCards />
      <Newsletter />
      <Testimonials />
      <Blog />
    </>
  );
}
