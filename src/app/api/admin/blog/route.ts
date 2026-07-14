import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const published = searchParams.get("published");
  const search = searchParams.get("search");
  const slug = searchParams.get("slug");

  const where: Record<string, unknown> = {};

  if (published === "true") {
    where.published = true;
  }

  if (slug) {
    where.slug = slug;
  }

  if (search) {
    where.OR = [
      { title: { contains: search } },
      { excerpt: { contains: search } },
    ];
  }

  const posts = await prisma.blogPost.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const post = await prisma.blogPost.create({
    data: {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      image: body.image,
      category: body.category,
      author: body.author,
      readTime: body.readTime,
      published: body.published || false,
    },
  });

  return NextResponse.json(post, { status: 201 });
}
