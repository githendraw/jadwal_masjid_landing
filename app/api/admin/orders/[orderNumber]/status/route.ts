import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/current-user";
import { updateOrderStatus } from "@/lib/orders";
import type { OrderStatus } from "@/lib/generated/prisma/client";

const VALID: OrderStatus[] = [
  "PENDING_PAYMENT",
  "PAID",
  "PROCESSING",
  "SHIPPED",
  "COMPLETED",
  "CANCELLED",
  "EXPIRED",
];

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const { orderNumber } = await params;
  const body = await request.json().catch(() => ({}));
  const status: OrderStatus = body.status;
  const note: string = body.note || "";
  const tracking: string = body.trackingNumber || "";
  const courier: string = body.courier || "";

  if (!VALID.includes(status)) {
    return NextResponse.json({ error: "Status tidak valid" }, { status: 400 });
  }

  const order = await prisma.order.findUnique({ where: { orderNumber } });
  if (!order) return NextResponse.json({ error: "Pesanan tidak ditemukan" }, { status: 404 });

  const updated = await updateOrderStatus(order.id, status, note || `Status ${status}`);
  if (tracking || courier) {
    await prisma.order.update({
      where: { id: order.id },
      data: {
        ...(tracking ? { trackingNumber: tracking } : {}),
        ...(courier ? { courier: courier } : {}),
      },
    });
  }
  return NextResponse.json({ order: updated });
}