import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  const order = await prisma.order.findFirst({
    where: { paymentIntentId: sessionId },
    include: {
      items: { include: { product: true } },
    },
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: order.id,
    total: order.total,
    status: order.status,
    shippingName: order.shippingName,
    items: order.items.map((item) => ({
      product: { name: item.product.name },
      quantity: item.quantity,
      price: item.price,
    })),
  });
}
