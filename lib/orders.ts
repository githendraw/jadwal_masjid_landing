import "server-only";
import prisma from "./prisma";
import type { OrderStatus, Prisma } from "@/lib/generated/prisma/client";
import { generateOrderNumber } from "./format";

export interface CheckoutProductLine {
  productId: number;
  qty: number;
}

export interface ShippingAddress {
  recipientName: string;
  phone: string;
  mosqueName: string;
  address: string;
  city: string;
  province: string;
  postalCode?: string;
}

export async function createOrder(
  userId: number,
  lines: CheckoutProductLine[],
  shipping: ShippingAddress,
  notes?: string
) {
  if (lines.length === 0) throw new Error("Keranjang kosong");

  const productIds = lines.map((l) => l.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, isActive: true },
  });

  let subtotal = 0;
  let shippingFee = 0;
  const items: Prisma.OrderItemCreateWithoutOrderInput[] = [];

  for (const line of lines) {
    const product = products.find((p) => p.id === line.productId);
    if (!product) throw new Error("Produk tidak ditemukan / tidak aktif");
    if (product.stock < line.qty)
      throw new Error(`Stok "${product.name}" tidak mencukupi`);
    const lineTotal = product.price * line.qty;
    subtotal += lineTotal;
    shippingFee += product.shippingFee * line.qty;
    items.push({
      product: { connect: { id: product.id } },
      productName: product.name,
      unitPrice: product.price,
      qty: line.qty,
      lineTotal,
    });
  }

  const total = subtotal + shippingFee;

  return prisma.$transaction(async (tx) => {
    // Kurangi stok
    for (const line of lines) {
      await tx.product.update({
        where: { id: line.productId },
        data: { stock: { decrement: line.qty } },
      });
    }

    const order = await tx.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId,
        status: "PENDING_PAYMENT",
        subtotal,
        shippingFee,
        total,
        expiryAt: new Date(
          Date.now() + Number(process.env.DUITKU_EXPIRY_MINUTES || 1440) * 60000
        ),
        recipientName: shipping.recipientName,
        phone: shipping.phone,
        receiverMosqueName: shipping.mosqueName,
        address: shipping.address,
        city: shipping.city,
        province: shipping.province,
        postalCode: shipping.postalCode || "",
        notes: notes || null,
        items: { create: items },
      },
      include: { items: true },
    });

    await tx.orderStatusLog.create({
      data: {
        orderId: order.id,
        status: "PENDING_PAYMENT",
        note: "Pesanan dibuat, menunggu pembayaran",
      },
    });

    return order;
  });
}

export async function getOrderForUser(orderNumber: string, userId: number) {
  return prisma.order.findFirst({
    where: { orderNumber, userId },
    include: { items: true, logs: { orderBy: { createdAt: "desc" } } },
  });
}

export async function updateOrderStatus(
  orderId: number,
  status: OrderStatus,
  note?: string
) {
  const data: Prisma.OrderUpdateInput = { status };
  if (status === "PAID") data.paidAt = new Date();
  if (status === "CANCELLED" || status === "EXPIRED") {
    // kembalikan stok
    await restoreStock(orderId);
  }
  const order = await prisma.order.update({
    where: { id: orderId },
    data,
  });
  await prisma.orderStatusLog.create({
    data: { orderId, status, note: note || null },
  });
  return order;
}

async function restoreStock(orderId: number) {
  const items = await prisma.orderItem.findMany({ where: { orderId } });
  for (const it of items) {
    await prisma.product.update({
      where: { id: it.productId },
      data: { stock: { increment: it.qty } },
    });
  }
}