import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const order = await prisma.order.update({
    where: { id },
    data: { status: body.status },
  });

  return NextResponse.json(order);
}
