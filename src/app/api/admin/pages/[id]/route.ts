import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const section = await prisma.pageContent.update({
    where: { id },
    data: {
      title: body.title,
      content: body.content,
      order: body.order,
    },
  });

  return NextResponse.json(section);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.pageContent.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
