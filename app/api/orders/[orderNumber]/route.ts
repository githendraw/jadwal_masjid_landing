import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/current-user";
import { getOrderForUser } from "@/lib/orders";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

  const { orderNumber } = await params;
  const order = await getOrderForUser(orderNumber, user.id);
  if (!order) return NextResponse.json({ error: "Pesanan tidak ditemukan" }, { status: 404 });
  return NextResponse.json({ order });
}