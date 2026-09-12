import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/current-user";
import { adminProductPatchSchema } from "@/lib/schemas";
import { slugify } from "@/lib/format";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id: Number(id) } });
  if (!product) return NextResponse.json({ error: "Produk tidak ditemukan" }, { status: 404 });

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body JSON tidak valid" }, { status: 400 });
  }
  const parsed = adminProductPatchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Data tidak valid", details: parsed.error.flatten() }, { status: 400 });
  }
  const d = parsed.data;
  let slug = d.slug || product.slug;
  if (d.name && !d.slug) slug = slugify(d.name);
  const conflict = await prisma.product.findFirst({
    where: { slug, id: { not: product.id } },
  });
  if (conflict) return NextResponse.json({ error: "Slug sudah dipakai" }, { status: 400 });

  const updated = await prisma.product.update({
    where: { id: product.id },
    data: {
      ...(d.name ? { name: d.name } : {}),
      ...(slug !== product.slug ? { slug } : {}),
      ...(d.subtitle !== undefined ? { subtitle: d.subtitle || null } : {}),
      ...(d.description !== undefined ? { description: d.description || null } : {}),
      ...(d.price !== undefined ? { price: d.price } : {}),
      ...(d.originalPrice !== undefined ? { originalPrice: d.originalPrice } : {}),
      ...(d.badge !== undefined ? { badge: d.badge || null } : {}),
      ...(d.isFeatured !== undefined ? { isFeatured: d.isFeatured } : {}),
      ...(d.isActive !== undefined ? { isActive: d.isActive } : {}),
      ...(d.stock !== undefined ? { stock: d.stock } : {}),
      ...(d.weightGrams !== undefined ? { weightGrams: d.weightGrams } : {}),
      ...(d.shippingFee !== undefined ? { shippingFee: d.shippingFee } : {}),
      ...(d.imageKey !== undefined ? { imageKey: d.imageKey || null } : {}),
      ...(d.sortOrder !== undefined ? { sortOrder: d.sortOrder } : {}),
    },
  });
  return NextResponse.json({ product: updated });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const { id } = await params;
  try {
    await prisma.product.delete({ where: { id: Number(id) } });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    if (e?.code === "P2025") {
      return NextResponse.json({ error: "Produk tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Produk tidak bisa dihapus (mungkin punya pesanan) — set nonaktif saja" },
      { status: 400 }
    );
  }
}