import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";
import { createOrder } from "@/lib/orders";
import { checkoutSchema } from "@/lib/schemas";

export async function GET(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

  const url = new URL(request.url);
  const page = Math.max(1, Number(url.searchParams.get("page") || 1));
  const perPage = 10;
  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: { items: true },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    prisma.order.count({ where: { userId: user.id } }),
  ]);
  return NextResponse.json({ orders, total, page, perPage });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body JSON tidak valid" }, { status: 400 });
  }

  const parsed = checkoutSchema.safeParse(body.shipping);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Data pengiriman tidak valid", details: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const lines = Array.isArray(body.lines) ? body.lines : null;
  if (
    !lines ||
    lines.length === 0 ||
    !lines.every((l: any) => l && l.productId && l.qty > 0)
  ) {
    return NextResponse.json({ error: "Keranjang kosong" }, { status: 400 });
  }

  try {
    const order = await createOrder(user.id, lines, parsed.data, body.notes || undefined);
    return NextResponse.json({ order }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Gagal membuat pesanan" }, { status: 400 });
  }
}