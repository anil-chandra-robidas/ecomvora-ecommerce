import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [totalRevenue, totalOrders, totalProducts, totalUsers, recentOrders] =
    await Promise.all([
      prisma.order.aggregate({ _sum: { total: true } }),
      prisma.order.count(),
      prisma.product.count(),
      prisma.user.count(),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { user: { select: { name: true } } },
      }),
    ]);

  return NextResponse.json({
    totalRevenue: totalRevenue._sum.total || 0,
    totalOrders,
    totalProducts,
    totalUsers,
    recentOrders,
  });
}
