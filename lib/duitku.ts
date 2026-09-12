import "server-only";
import { createHash } from "node:crypto";
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

export function isDuitkuSimulation(): boolean {
  const allow = process.env.DUITKU_ALLOW_SIMULATION === "true";
  const key = process.env.DUITKU_API_KEY || "";
  return allow || key === "DUMMY" || key.trim() === "";
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
 */
export function verifyCallbackSignature(params: {
  merchantCode: string;
  amount: string | number;
  merchantOrderId: string;
  signature: string;
}): boolean {
  const expected = md5(
    `${params.merchantCode}${params.amount}${params.merchantOrderId}${apiKey()}`
  );
  return expected === params.signature;
}