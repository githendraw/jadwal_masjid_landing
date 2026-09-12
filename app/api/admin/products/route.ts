import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/current-user";
import { adminProductSchema } from "@/lib/schemas";
import { slugify } from "@/lib/format";

export async function GET() {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const products = await prisma.product.findMany({
    orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }, { id: "asc" }],
  });
  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body JSON tidak valid" }, { status: 400 });
  }
  const parsed = adminProductSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Data tidak valid", details: parsed.error.flatten() }, { status: 400 });
  }
  const d = parsed.data;
  let slug = d.slug || slugify(d.name);
  // pastikan slug unik
  if (await prisma.product.findUnique({ where: { slug } })) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }
  const product = await prisma.product.create({
    data: {
      slug,
      name: d.name,
      subtitle: d.subtitle || null,
      description: d.description || null,
      price: d.price,
      originalPrice: d.originalPrice ?? null,
      badge: d.badge || null,
      isFeatured: d.isFeatured ?? false,
      isActive: d.isActive ?? true,
      stock: d.stock ?? 0,
      weightGrams: d.weightGrams ?? 1000,
      shippingFee: d.shippingFee ?? 0,
      imageKey: d.imageKey || null,
      sortOrder: d.sortOrder ?? 0,
    },
  });
  return NextResponse.json({ product }, { status: 201 });
}