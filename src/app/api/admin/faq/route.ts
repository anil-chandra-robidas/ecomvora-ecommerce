import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const items = await prisma.faqItem.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const item = await prisma.faqItem.create({
    data: {
      question: body.question,
      answer: body.answer,
      order: body.order ?? 0,
    },
  });

  return NextResponse.json(item, { status: 201 });
}
