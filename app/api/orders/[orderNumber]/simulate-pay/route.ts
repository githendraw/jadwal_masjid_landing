import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";
import { getOrderForUser, updateOrderStatus } from "@/lib/orders";
import { isDuitkuSimulation } from "@/lib/duitku";

/**
 * Bayar simulasi (khusus development sebelum Duitku aktif).
 * HANYA aktif bila DUITKU_ALLOW_SIMULATION=true / API key masih DUMMY.
 */
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  if (!isDuitkuSimulation()) {
    return NextResponse.json({ error: "Mode simulasi dimatikan" }, { status: 403 });
  }
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

  const { orderNumber } = await params;
  const order = await getOrderForUser(orderNumber, user.id);
  if (!order) return NextResponse.json({ error: "Pesanan tidak ditemukan" }, { status: 404 });
  if (order.status === "PAID") {
    return NextResponse.json({ order });
  }

  const updated = await updateOrderStatus(
    order.id,
    "PAID",
    "Pembayaran simulasi (development)"
  );
  return NextResponse.json({ order: updated });
}