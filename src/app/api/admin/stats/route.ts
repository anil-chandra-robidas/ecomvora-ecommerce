import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const [
    totalRevenue,
    totalOrders,
    totalProducts,
    totalUsers,
    totalBlogPosts,
    publishedBlogPosts,
    recentOrders,
    recentBlogPosts,
  ] = await Promise.all([
    prisma.order.aggregate({ _sum: { total: true } }),
    prisma.order.count(),
    prisma.product.count(),
    prisma.user.count(),
    prisma.blogPost.count(),
    prisma.blogPost.count({ where: { published: true } }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true } } },
    }),
    prisma.blogPost.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        author: true,
        published: true,
        createdAt: true,
      },
    }),
  ]);

  return NextResponse.json({
    totalRevenue: totalRevenue._sum.total || 0,
    totalOrders,
    totalProducts,
    totalUsers,
    totalBlogPosts,
    publishedBlogPosts,
    recentOrders,
    recentBlogPosts,
  });
}
