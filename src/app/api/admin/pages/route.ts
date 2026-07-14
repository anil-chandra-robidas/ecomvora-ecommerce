import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page");

  const where: Record<string, unknown> = {};
  if (page) where.page = page;

  const sections = await prisma.pageContent.findMany({
    where,
    orderBy: { order: "asc" },
  });

  return NextResponse.json(sections);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const section = await prisma.pageContent.upsert({
    where: { page_section: { page: body.page, section: body.section } },
    update: {
      title: body.title,
      content: body.content,
      order: body.order ?? 0,
    },
    create: {
      page: body.page,
      section: body.section,
      title: body.title,
      content: body.content,
      order: body.order ?? 0,
    },
  });

  return NextResponse.json(section, { status: 201 });
}
