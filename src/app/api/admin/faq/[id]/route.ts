import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const item = await prisma.faqItem.update({
    where: { id },
    data: {
      question: body.question,
      answer: body.answer,
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
  await prisma.faqItem.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
