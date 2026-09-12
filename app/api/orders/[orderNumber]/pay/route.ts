import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";
import { getOrderForUser, updateOrderStatus } from "@/lib/orders";
import { createDuitkuInvoice } from "@/lib/duitku";
import { getBaseUrl } from "@/lib/auth";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ orderNumber: string }> }
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

  const { orderNumber } = await params;
  let order = await getOrderForUser(orderNumber, user.id);
  if (!order) return NextResponse.json({ error: "Pesanan tidak ditemukan" }, { status: 404 });

  // Izinkan bayar ulang bila belum lunas (menunggu bayar atau kadaluarsa)
  if (order.status === "PAID") {
    return NextResponse.json({ error: "Pesanan sudah lunas" }, { status: 400 });
  }

  const details = order.items.map((i) => `${i.productName} x${i.qty}`).join(", ");

  const invoice = await createDuitkuInvoice({
    merchantOrderId: order.orderNumber,
    amount: order.total,
    productDetails: details,
    customerEmail: user.email,
    customerName: user.name,
    customerPhone: order.phone,
    returnUrl: `${getBaseUrl()}/pembayaran/selesai?order=${order.orderNumber}`,
    callbackUrl:
      process.env.DUITKU_CALLBACK_URL || `${getBaseUrl()}/api/duitku/callback`,
  });

  order = await prisma.order.update({
    where: { id: order.id },
    data: {
      duitkuReference: invoice.reference,
      duitkuPaymentUrl: invoice.paymentUrl,
      // saat bayar ulang dari status kadaluarsa, kembalikan ke menunggu bayar
      ...(order.status === "EXPIRED" ? { status: "PENDING_PAYMENT", expiryAt: new Date(Date.now() + Number(process.env.DUITKU_EXPIRY_MINUTES || 1440) * 60000) } : {}),
    },
    include: { items: true, logs: true },
  });

  return NextResponse.json({
    paymentUrl: invoice.paymentUrl,
    simulation: invoice.simulation,
    order,
  });
}