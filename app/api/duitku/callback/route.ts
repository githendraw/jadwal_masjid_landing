import prisma from "@/lib/prisma";
import { verifyCallbackSignature } from "@/lib/duitku";
import { updateOrderStatus } from "@/lib/orders";

/**
 * Callback Duitku (server-to-server notification setelah pembayaran).
 * Signature: md5(merchantCode + amount + merchantOrderId + apiKey)
 * resultCode "00" = berhasil.
 */
export async function POST(request: Request) {
  const rawBody = await request.text();
  const params = new URLSearchParams(rawBody);

  const merchantOrderId = params.get("merchantOrderId") || "";
  const merchantCode = params.get("merchantCode") || "";
  const amount = params.get("amount") || "";
  const resultCode = params.get("resultCode") || "";
  const reference = params.get("reference") || "";
  const signature = params.get("signature") || "";

  // Simpan mentah untuk audit
  try {
    await prisma.duitkuCallback.create({
      data: {
        merchantOrderId,
        merchantCode,
        amount: amount ? Number(amount) : null,
        resultCode: resultCode ? Number(resultCode) : null,
        reference,
        signature,
        rawJson: rawBody,
      },
    });
  } catch (e) {
    console.error("Gagal simpan callback log:", e);
  }

  if (!signature || !merchantOrderId || !verifyCallbackSignature({ merchantCode, amount, merchantOrderId, signature })) {
    console.warn("Callback Duitku signature tidak valid", { merchantOrderId });
    return new Response("01", { status: 400 });
  }

  try {
    const order = await prisma.order.findUnique({
      where: { orderNumber: merchantOrderId },
    });

    if (order && resultCode === "00" && order.status !== "PAID") {
      await updateOrderStatus(order.id, "PAID", `Pembayaran Duitku diterima (ref: ${reference})`);
      // tandai callback terproses
      await prisma.duitkuCallback.updateMany({
        where: { merchantOrderId },
        data: { processed: true },
      });
    }
  } catch (e) {
    console.error("Callback Duitku gagal diproses:", e);
    return new Response("01", { status: 500 });
  }

  return new Response("00", { status: 200 });
}