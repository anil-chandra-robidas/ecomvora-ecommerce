import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // Get or create a default user
  let user = await prisma.user.findFirst({
    where: { role: "customer" },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        name: body.shippingName || "Guest",
        email: body.shippingEmail || "guest@ecomvora.com",
      },
    });
  }

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      total: body.total,
      shippingName: body.shippingName,
      shippingEmail: body.shippingEmail,
      shippingAddr: body.shippingAddr,
      items: {
        create: body.items.map((item: { productId: string; quantity: number; price: number }) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: { items: true },
  });

  return NextResponse.json(order, { status: 201 });
}

export async function GET() {
  const orders = await prisma.order.findMany({
    include: {
      items: { include: { product: true } },
      user: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(orders);
}
