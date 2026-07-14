import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const items = await prisma.contactInfo.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const item = await prisma.contactInfo.create({
    data: {
      type: body.type,
      label: body.label,
      details: body.details,
      order: body.order ?? 0,
    },
  });

  return NextResponse.json(item, { status: 201 });
}
