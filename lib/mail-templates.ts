/**
 * Template email untuk alur pesanan jadwalmasjid.com.
 * Semua memakai kerangka mailLayout() (navy + teal, senada dengan situs) dan
 * hanya memakai tabel + inline style agar tampil konsisten di semua klien email.
 */
import { mailLayout } from "./mail";

export interface MailTemplate {
  subject: string;
  html: string;
  text: string;
}

export interface OrderItemLike {
  productName: string;
  unitPrice: number;
  qty: number;
  lineTotal: number;
}

export interface OrderLike {
  orderNumber: string;
  status: string;
  subtotal: number;
  shippingFee: number;
  total: number;
  recipientName: string;
  phone: string;
  receiverMosqueName: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  createdAt: Date;
  paidAt?: Date | null;
  expiryAt?: Date | null;
  courier?: string | null;
  trackingNumber?: string | null;
  duitkuPaymentUrl?: string | null;
  items: OrderItemLike[];
}

export const ORDER_STATUS_LABEL: Record<string, string> = {
  PENDING_PAYMENT: "Menunggu pembayaran",
  PAID: "Pembayaran diterima",
  PROCESSING: "Sedang diproses",
  SHIPPED: "Dikirim",
  COMPLETED: "Selesai",
  CANCELLED: "Dibatalkan",
  EXPIRED: "Kedaluwarsa",
};

export function statusLabel(status: string): string {
  return ORDER_STATUS_LABEL[status] ?? status;
}

function rupiah(n: number): string {
  return "Rp " + new Intl.NumberFormat("id-ID").format(n);
}

function tanggal(d?: Date | null): string {
  if (!d) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  }).format(d);
}

function domain(baseUrl: string): string {
  return baseUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

/* ---------- blok tampilan yang dipakai berulang ---------- */

function card(inner: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
    style="width:100%;border:1px solid #e2e8f0;border-radius:12px;margin-top:18px">
    <tr><td style="padding:16px 18px">${inner}</td></tr>
  </table>`;
}

function cardJudul(teks: string): string {
  return `<div style="font:700 12px/1 Arial,Helvetica,sans-serif;color:#0f766e;letter-spacing:.6px;text-transform:uppercase;margin-bottom:12px">${teks}</div>`;
}

function kv(rows: [string, string][]): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;font:400 14px/1.6 Arial,Helvetica,sans-serif;color:#334155">
    ${rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:3px 0;color:#64748b;white-space:nowrap" valign="top">${k}</td><td style="padding:3px 0;text-align:right" align="right"><strong style="color:#0f172a">${v}</strong></td></tr>`
      )
      .join("")}
  </table>`;
}

function rincianPesanan(order: OrderLike): string {
  const rows = order.items
    .map(
      (i) => `<tr>
        <td style="padding:9px 0;border-bottom:1px solid #f1f5f9;font:400 14px/1.5 Arial,Helvetica,sans-serif;color:#334155">
          ${i.productName}
          <div style="font:400 12px/1.5 Arial,Helvetica,sans-serif;color:#94a3b8">${rupiah(i.unitPrice)} × ${i.qty}</div>
        </td>
        <td style="padding:9px 0;border-bottom:1px solid #f1f5f9;text-align:right;font:600 14px/1.5 Arial,Helvetica,sans-serif;color:#0f172a" align="right">
          ${rupiah(i.lineTotal)}
        </td>
      </tr>`
    )
    .join("");
  return card(`
    ${cardJudul("Rincian pesanan")}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse">
      ${rows}
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-top:12px;font:400 13px/1.7 Arial,Helvetica,sans-serif;color:#64748b">
      <tr><td>Subtotal</td><td align="right" style="text-align:right">${rupiah(order.subtotal)}</td></tr>
      <tr><td>Ongkos kirim</td><td align="right" style="text-align:right">${rupiah(order.shippingFee)}</td></tr>
    </table>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-top:8px;background:#ecfdf9;border-radius:10px">
      <tr>
        <td style="padding:12px 14px;font:700 14px/1.4 Arial,Helvetica,sans-serif;color:#0f172a">Total</td>
        <td align="right" style="padding:12px 14px;text-align:right;font:700 16px/1.4 Arial,Helvetica,sans-serif;color:#0f766e">${rupiah(order.total)}</td>
      </tr>
    </table>`);
}

function alamatPesanan(order: OrderLike): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
    style="width:100%;margin-top:18px;background:#f8fafc;border-left:4px solid #00d4aa;border-radius:0 12px 12px 0">
    <tr><td style="padding:14px 18px">
      <div style="font:700 12px/1 Arial,Helvetica,sans-serif;color:#0f766e;letter-spacing:.6px;text-transform:uppercase">Alamat pengiriman</div>
      <div style="margin-top:9px;font:400 14px/1.7 Arial,Helvetica,sans-serif;color:#334155">
        <strong style="color:#0f172a">${order.recipientName}</strong> &middot; ${order.phone}<br />
        ${order.receiverMosqueName}<br />
        ${order.address}, ${order.city}, ${order.province} ${order.postalCode}
      </div>
    </td></tr>
  </table>`;
}

function kotakCatatan(judul: string, isi: string, tone: "netral" | "peringatan" = "netral"): string {
  const bg = tone === "peringatan" ? "#fffbeb" : "#f8fafc";
  const border = tone === "peringatan" ? "#f59e0b" : "#cbd5e1";
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
    style="width:100%;margin-top:16px;background:${bg};border-left:4px solid ${border};border-radius:0 10px 10px 0">
    <tr><td style="padding:13px 16px;font:400 13px/1.7 Arial,Helvetica,sans-serif;color:#334155">
      <strong style="color:#0f172a">${judul}</strong><br />${isi}
    </td></tr>
  </table>`;
}

function ringkas(order: OrderLike): string {
  const daftar = order.items
    .map((i) => `- ${i.productName} x${i.qty} = ${rupiah(i.lineTotal)}`)
    .join("\n");
  return [
    `Nomor pesanan: ${order.orderNumber}`,
    `Status: ${statusLabel(order.status)}`,
    `Dibuat: ${tanggal(order.createdAt)}`,
    "",
    daftar,
    "",
    `Subtotal: ${rupiah(order.subtotal)}`,
    `Ongkos kirim: ${rupiah(order.shippingFee)}`,
    `Total: ${rupiah(order.total)}`,
    "",
    `Dikirim ke: ${order.recipientName} (${order.phone})`,
    order.receiverMosqueName,
    `${order.address}, ${order.city}, ${order.province} ${order.postalCode}`,
    "",
    "Email otomatis dari jadwalmasjid.com",
  ].join("\n");
}

/* ---------- 1. Pesanan dibuat: ke pembeli ---------- */

export function orderCreatedTemplate(order: OrderLike, baseUrl: string): MailTemplate {
  const bayar = order.duitkuPaymentUrl || baseUrl;
  const body = `
    <p style="margin:0 0 12px">Terima kasih, pesananmu sudah kami terima. Selesaikan pembayaran sebelum batas waktu berikut agar pesanan tidak kedaluwarsa.</p>
    ${card(`${cardJudul("Nomor pesanan")}${kv([
      ["Nomor", order.orderNumber],
      ["Dibuat", tanggal(order.createdAt)],
      ["Batas pembayaran", tanggal(order.expiryAt)],
    ])}`)}
    ${rincianPesanan(order)}
    ${alamatPesanan(order)}`;
  return {
    subject: `Pesanan ${order.orderNumber} diterima — menunggu pembayaran`,
    html: mailLayout({
      title: "Pesananmu sudah kami terima",
      preheader: `Pesanan ${order.orderNumber} menunggu pembayaran. Batas: ${tanggal(order.expiryAt)}.`,
      badge: { text: "Menunggu pembayaran", tone: "warn" },
      cta: { label: "Bayar sekarang", url: bayar },
      bodyHtml: body,
      footerNote:
        "Sudah membayar? Email konfirmasi akan dikirim otomatis setelah pembayaran terverifikasi.",
    }),
    text: `Pesanan diterima\n\n${ringkas(order)}\n\nBayar: ${bayar}\nBatas pembayaran: ${tanggal(order.expiryAt)}`,
  };
}

/* ---------- 2. Pembayaran diterima: ke pembeli ---------- */

export function paymentReceivedTemplate(order: OrderLike, baseUrl: string): MailTemplate {
  const body = `
    <p style="margin:0 0 12px">Pembayaranmu sudah kami terima dan pesanan sedang kami siapkan. Kami akan mengirim email lagi begitu pesanan dikirim.</p>
    ${card(`${cardJudul("Ringkasan pembayaran")}${kv([
      ["Nomor pesanan", order.orderNumber],
      ["Dibayar pada", tanggal(order.paidAt)],
      ["Total dibayar", rupiah(order.total)],
    ])}`)}
    ${rincianPesanan(order)}
    ${alamatPesanan(order)}`;
  return {
    subject: `Pembayaran diterima — pesanan ${order.orderNumber}`,
    html: mailLayout({
      title: "Pembayaran diterima",
      preheader: `Pembayaran ${rupiah(order.total)} untuk pesanan ${order.orderNumber} sudah kami terima.`,
      badge: { text: "Pembayaran diterima", tone: "ok" },
      cta: { label: "Lihat " + domain(baseUrl), url: baseUrl },
      bodyHtml: body,
      footerNote: "Terima kasih sudah berbelanja di Jadwal Masjid.",
    }),
    text: `Pembayaran diterima\n\n${ringkas(order)}\n\nDibayar pada: ${tanggal(order.paidAt)}`,
  };
}

/* ---------- 3. Pesanan baru: ke admin ---------- */

export function newOrderAdminTemplate(
  order: OrderLike,
  pembeli: { name: string; email: string },
  baseUrl: string
): MailTemplate {
  const body = `
    <p style="margin:0 0 12px">Ada pesanan baru yang menunggu pembayaran.</p>
    ${card(`${cardJudul("Data pesanan")}${kv([
      ["Nomor pesanan", order.orderNumber],
      ["Total", rupiah(order.total)],
      ["Masuk", tanggal(order.createdAt)],
      ["Status", statusLabel(order.status)],
    ])}`)}
    ${card(`${cardJudul("Pembeli")}${kv([
      ["Nama", pembeli.name],
      ["Email", pembeli.email],
      ["Telepon", order.phone],
    ])}`)}
    ${rincianPesanan(order)}
    ${alamatPesanan(order)}`;
  return {
    subject: `[Pesanan baru] ${order.orderNumber} — ${rupiah(order.total)}`,
    html: mailLayout({
      title: "Pesanan baru masuk",
      preheader: `${order.orderNumber} — ${rupiah(order.total)} dari ${pembeli.name}.`,
      badge: { text: "Pesanan baru", tone: "info" },
      cta: { label: "Buka panel admin", url: `${baseUrl}/admin` },
      bodyHtml: body,
      footerNote: "Notifikasi otomatis untuk admin Jadwal Masjid.",
    }),
    text: `Pesanan baru\n\n${ringkas(order)}\n\nPembeli: ${pembeli.name} (${pembeli.email})`,
  };
}

/* ---------- 4. Perubahan status: ke pembeli ---------- */

export function statusChangedTemplate(
  order: OrderLike,
  status: string,
  note: string | null | undefined,
  baseUrl: string
): MailTemplate {
  const label = statusLabel(status);
  const nada: Record<string, "ok" | "info" | "warn"> = {
    PAID: "ok",
    PROCESSING: "info",
    SHIPPED: "info",
    COMPLETED: "ok",
    CANCELLED: "warn",
    EXPIRED: "warn",
    PENDING_PAYMENT: "warn",
  };
  const penjelasan: Record<string, string> = {
    PROCESSING: "Pesananmu sedang kami siapkan untuk dikirim.",
    SHIPPED: "Pesananmu sudah kami kirimkan. Cek nomor resi di bawah.",
    COMPLETED: "Pesananmu sudah selesai. Terima kasih sudah berbelanja!",
    CANCELLED:
      "Pesananmu dibatalkan. Kalau kamu sudah membayar, tim kami akan menghubungimu untuk pengembalian dana.",
    EXPIRED: "Pesananmu kedaluwarsa karena belum dibayar dalam batas waktu.",
    PAID: "Pembayaranmu sudah kami terima.",
    PENDING_PAYMENT: "Pesanan menunggu pembayaran.",
  };
  const pengiriman =
    order.trackingNumber || order.courier
      ? card(`${cardJudul("Pengiriman")}${kv([
          ["Kurir", order.courier || "-"],
          ["Nomor resi", order.trackingNumber || "-"],
        ])}`)
      : "";
  const catatan = note ? kotakCatatan("Catatan dari kami", note) : "";
  const body = `
    <p style="margin:0 0 12px">Status pesanan <strong>${order.orderNumber}</strong> sekarang: <strong>${label}</strong>. ${
      penjelasan[status] ?? ""
    }</p>
    ${card(`${cardJudul("Ringkasan")}${kv([
      ["Nomor pesanan", order.orderNumber],
      ["Status", label],
      ["Total", rupiah(order.total)],
    ])}`)}
    ${pengiriman}
    ${catatan}
    ${rincianPesanan(order)}
    ${alamatPesanan(order)}`;
  return {
    subject: `Status pesanan ${order.orderNumber}: ${label}`,
    html: mailLayout({
      title: `Status pesanan: ${label}`,
      preheader: `Pesanan ${order.orderNumber} — ${label}.`,
      badge: { text: label, tone: nada[status] ?? "info" },
      cta: { label: "Kunjungi " + domain(baseUrl), url: baseUrl },
      bodyHtml: body,
      footerNote: "Email otomatis dari sistem Jadwal Masjid.",
    }),
    text: `Status pesanan ${order.orderNumber}: ${label}\n\n${ringkas(order)}` +
      (order.trackingNumber || order.courier
        ? `\nKurir: ${order.courier || "-"} / Resi: ${order.trackingNumber || "-"}`
        : "") +
      (note ? `\nCatatan: ${note}` : ""),
  };
}
