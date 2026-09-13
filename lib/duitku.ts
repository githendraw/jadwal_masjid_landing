import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";
import { getBaseUrl } from "./auth";

export interface DuitkuInvoiceInput {
  merchantOrderId: string;
  amount: number;
  productDetails: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  returnUrl: string;
  callbackUrl: string;
}

export interface DuitkuInvoiceResult {
  paymentUrl: string;
  reference: string | null;
  statusCode?: number;
  statusMessage?: string;
  simulation: boolean;
}

function isPlaceholder(v: string | undefined): boolean {
  const s = (v || "").trim();
  return s === "" || s.toUpperCase().startsWith("DUMMY");
}

/**
 * True bila kredensial Duitku asli sudah diisi (merchant code + api key bukan placeholder).
 * Selama belum, gateway belum bisa dipakai untuk transaksi nyata.
 */
export function isDuitkuConfigured(): boolean {
  return !isPlaceholder(process.env.DUITKU_MERCHANT_CODE) && !isPlaceholder(process.env.DUITKU_API_KEY);
}

/**
 * Mode simulasi pembayaran.
 *
 * KEAMANAN: dulu fungsi ini menganggap simulasi aktif cukup karena API key masih
 * "DUMMY", sehingga di produksi siapa pun bisa menandai pesanannya sendiri LUNAS.
 * Sekarang:
 *   - gateway asli sudah dikonfigurasi  -> simulasi SELALU mati (tidak bisa dibypass)
 *   - NODE_ENV = production            -> simulasi mati (tidak ada pesanan gratis)
 *   - selain itu mengikuti DUITKU_ALLOW_SIMULATION=true (pengembangan lokal)
 */
export function isDuitkuSimulation(): boolean {
  if (isDuitkuConfigured()) return false;
  if (process.env.NODE_ENV === "production") return false;
  return process.env.DUITKU_ALLOW_SIMULATION === "true";
}

function md5(input: string): string {
  return createHash("md5").update(input).digest("hex");
}

function merchantCode(): string {
  return process.env.DUITKU_MERCHANT_CODE || "DUMMY";
}
function apiKey(): string {
  return process.env.DUITKU_API_KEY || "DUMMY";
}

/**
 * Panggil Duitku API v2 inquiry (Duitku Pop / VC redirect).
 * Dalam mode simulasi, kembalikan URL pembayaran simulasi lokal.
 */
export async function createDuitkuInvoice(
  input: DuitkuInvoiceInput
): Promise<DuitkuInvoiceResult> {
  if (isDuitkuSimulation()) {
    const simUrl = `${getBaseUrl()}/pembayaran/simulasi/${input.merchantOrderId}`;
    return {
      paymentUrl: simUrl,
      reference: `SIM-${input.merchantOrderId}`,
      simulation: true,
    };
  }

  if (!isDuitkuConfigured()) {
    throw new Error(
      "Pembayaran belum dikonfigurasi: kredensial Duitku (merchant code & API key) belum diisi."
    );
  }

  const payload = {
    merchantCode: merchantCode(),
    paymentAmount: input.amount,
    merchantOrderId: input.merchantOrderId,
    productDetails: input.productDetails.slice(0, 200),
    email: input.customerEmail,
    customerVaName: input.customerName,
    phoneNumber: input.customerPhone || "",
    returnUrl: input.returnUrl,
    callbackUrl: input.callbackUrl,
    signature: md5(
      `${merchantCode()}${input.merchantOrderId}${input.amount}${apiKey()}`
    ),
    expiryPeriod: Number(process.env.DUITKU_EXPIRY_MINUTES || 1440),
  };

  const res = await fetch(
    process.env.DUITKU_ENDPOINT ||
      "https://sandbox.duitku.com/webapi/api/merchant/v2/inquiry",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );
  const data = await res.json();
  if (!data.paymentUrl) {
    throw new Error(
      `Duitku inquiry gagal: ${data.statusMessage || res.status}`
    );
  }
  return {
    paymentUrl: data.paymentUrl,
    reference: data.reference || null,
    statusCode: data.statusCode,
    statusMessage: data.statusMessage,
    simulation: false,
  };
}

/**
 * Verifikasi tanda tangan callback Duitku.
 * signature = md5(merchantCode + amount + merchantOrderId + apiKey)
 *
 * KEAMANAN: bila kredensial Duitku belum dikonfigurasi (masih "DUMMY"), tanda
 * tangan bisa dihitung siapa pun -- dulu itu cukup untuk menandai pesanan LUNAS.
 * Sekarang callback ditolak selama gateway belum dikonfigurasi, dan
 * perbandingannya memakai waktu konstan.
 */
export function verifyCallbackSignature(params: {
  merchantCode: string;
  amount: string | number;
  merchantOrderId: string;
  signature: string;
}): boolean {
  if (!isDuitkuConfigured()) return false;

  const expected = md5(
    `${params.merchantCode}${params.amount}${params.merchantOrderId}${apiKey()}`
  );
  const a = Buffer.from(expected, "utf8");
  const b = Buffer.from(params.signature || "", "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}
