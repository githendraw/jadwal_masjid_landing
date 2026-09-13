import "server-only";
import prisma from "./prisma";
import { adminNotifyEmail, isMailEnabled, sendMail } from "./mail";
import {
  newOrderAdminTemplate,
  orderCreatedTemplate,
  paymentReceivedTemplate,
  statusChangedTemplate,
  type MailTemplate,
  type OrderLike,
} from "./mail-templates";

/**
 * Notifikasi email untuk alur pesanan.
 *
 * Semua fungsi di sini "fire-and-forget": dipanggil tanpa await dan tidak pernah
 * melempar error, supaya kegagalan email TIDAK menggagalkan transaksi pesanan.
 * Hasilnya dicatat ke log PM2 sebagai "[mail] OK ..." / "[mail] GAGAL ...".
 */

export interface OrderWithItems extends OrderLike {
  id: number;
  userId: number;
}

function baseUrl(): string {
  return process.env.BASE_URL?.trim() || "https://jadwalmasjid.com";
}

function spawn(tag: string, task: () => Promise<void>): void {
  if (!isMailEnabled()) {
    console.log(`[mail] dilewati (MAIL_ENABLED=false atau konfigurasi belum lengkap): ${tag}`);
    return;
  }
  void task().catch((err: unknown) => {
    console.error(`[mail] ${tag} error:`, err instanceof Error ? err.message : err);
  });
}

async function kirim(to: string, tpl: MailTemplate, tag: string): Promise<void> {
  const res = await sendMail({ to, subject: tpl.subject, html: tpl.html, text: tpl.text });
  if (res.ok) {
    console.log(`[mail] OK ${tag} -> ${to} (${res.via}) messageId=${res.messageId}`);
  } else {
    console.error(`[mail] GAGAL ${tag} -> ${to}: ${res.error}`);
  }
}

/** Ambil ulang order dari DB (supaya data terbaru, mis. nomor resi, ikut terkirim). */
async function ambilOrder(orderId: number) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });
  if (!order) return null;
  const user = await prisma.user.findUnique({ where: { id: order.userId } });
  return { order, user };
}

/** 1 + 3. Pesanan baru dibuat: konfirmasi ke pembeli, notifikasi ke admin. */
export function notifyOrderCreated(
  order: OrderWithItems,
  pembeli: { name: string; email: string }
): void {
  const tag = `order-created ${order.orderNumber}`;
  spawn(`${tag} (pembeli)`, () => kirim(pembeli.email, orderCreatedTemplate(order, baseUrl()), tag));
  const admin = adminNotifyEmail();
  if (admin) {
    spawn(`${tag} (admin)`, () =>
      kirim(admin, newOrderAdminTemplate(order, pembeli, baseUrl()), `${tag} admin`)
    );
  }
}

/** 2. Pembayaran diterima (dipicu callback Duitku). */
export function notifyPaymentReceived(orderId: number): void {
  const tag = `payment-received #${orderId}`;
  spawn(tag, async () => {
    const data = await ambilOrder(orderId);
    if (!data?.user) {
      console.error(`[mail] ${tag}: order/user tidak ditemukan`);
      return;
    }
    await kirim(
      data.user.email,
      paymentReceivedTemplate(data.order, baseUrl()),
      `${tag} ${data.order.orderNumber}`
    );
  });
}

/** 4. Perubahan status oleh admin (PAID pakai template pembayaran diterima). */
export function notifyStatusChanged(orderId: number, status: string, note?: string | null): void {
  const tag = `status-${status} #${orderId}`;
  spawn(tag, async () => {
    const data = await ambilOrder(orderId);
    if (!data?.user) {
      console.error(`[mail] ${tag}: order/user tidak ditemukan`);
      return;
    }
    const tpl =
      status === "PAID"
        ? paymentReceivedTemplate(data.order, baseUrl())
        : statusChangedTemplate(data.order, status, note, baseUrl());
    await kirim(data.user.email, tpl, `${tag} ${data.order.orderNumber}`);
  });
}
