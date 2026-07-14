import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const item = await prisma.contactInfo.update({
    where: { id },
    data: {
      type: body.type,
      label: body.label,
      details: body.details,
      order: body.order,
    },
  });

  return NextResponse.json(item);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.contactInfo.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
