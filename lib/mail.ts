/**
 * Pengiriman email — dua jalur, dipilih lewat env (jangan hardcode kredensial):
 *
 *   MAIL_ENABLED=true|false
 *   MAIL_TRANSPORT=api | smtp
 *
 *   Jalur API  (lewat HTTPS 443, tidak terpengaruh blokir IP SMTP):
 *     BREVO_API_KEY=xkeysib-...          <- API key Brevo (BEDA dari SMTP key)
 *
 *   Jalur SMTP (relay smtp-relay.brevo.com):
 *     SMTP_HOST, SMTP_PORT, SMTP_SECURE (false = STARTTLS/587, true = SSL/465)
 *     SMTP_USER, SMTP_PASS               <- pasangan "SMTP login" + "SMTP key" Brevo
 *
 *   Dipakai kedua jalur:
 *     SMTP_FROM="Nama Situs <noreply@domain>"
 *     ADMIN_NOTIFY_EMAIL
 *
 * Pemakaian:
 *   const res = await sendMail({ to, subject, html });
 *   if (!res.ok) console.error("[mail]", res.error);
 */
import nodemailer, { type Transporter } from "nodemailer";
import https from "node:https";

export type MailResult =
  | { ok: true; messageId: string; via: "api" | "smtp" }
  | { ok: false; error: string; via: "api" | "smtp" | "none" };

let transport: Transporter | null = null;

function isTruthy(v: string | undefined): boolean {
  const s = (v ?? "").trim().toLowerCase();
  return s === "true" || s === "1" || s === "yes" || s === "ssl";
}

function apiKey(): string {
  return process.env.BREVO_API_KEY?.trim() ?? "";
}

/** Jalur pengiriman yang aktif: "api", "smtp", atau "none". */
export function mailTransportKind(): "api" | "smtp" | "none" {
  const forced = (process.env.MAIL_TRANSPORT ?? "").trim().toLowerCase();
  if (forced === "api" || (!forced && apiKey())) return apiKey() ? "api" : "none";
  if (forced === "smtp" || !forced) {
    return process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS ? "smtp" : "none";
  }
  return "none";
}

export function isMailEnabled(): boolean {
  return isTruthy(process.env.MAIL_ENABLED) && mailTransportKind() !== "none";
}

export function mailFrom(): string {
  return process.env.SMTP_FROM?.trim() || "Jadwal Masjid <noreply@jadwalmasjid.com>";
}

export function adminNotifyEmail(): string | null {
  const v = process.env.ADMIN_NOTIFY_EMAIL?.trim();
  return v ? v : null;
}

/** "Nama <alamat@domain>" -> { name, email } */
function parseFrom(from: string): { name?: string; email: string } {
  const m = from.match(/^\s*(.*?)\s*<\s*([^>]+)\s*>\s*$/);
  if (m) return { name: m[1] || undefined, email: m[2].trim() };
  return { email: from.trim() };
}

/**
 * POST JSON ke api.brevo.com dengan IPv4 dipaksa (family: 4).
 * Server ini punya IPv6, dan api.brevo.com punya record AAAA — tanpa paksaan ini
 * koneksi keluar lewat IPv6, sehingga IP yang didaftarkan di Brevo (IPv4) tidak cocok.
 */
function httpsPostJson(
  path: string,
  headers: Record<string, string>,
  body: string
): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        host: "api.brevo.com",
        port: 443,
        path,
        method: "POST",
        family: 4,
        headers: { ...headers, "content-length": Buffer.byteLength(body) },
        timeout: 20000,
      },
      (res) => {
        let data = "";
        res.setEncoding("utf8");
        res.on("data", (chunk: string) => {
          data += chunk;
        });
        res.on("end", () => resolve({ status: res.statusCode ?? 0, body: data }));
      }
    );
    req.on("timeout", () => req.destroy(new Error("timeout setelah 20s")));
    req.on("error", (err: Error) => reject(err));
    req.write(body);
    req.end();
  });
}

function getSmtpTransport(): Transporter {
  if (transport) return transport;
  const secure = isTruthy(process.env.SMTP_SECURE);
  transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? (secure ? 465 : 587)),
    secure,
    requireTLS: !secure,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
  } as Parameters<typeof nodemailer.createTransport>[0]);
  return transport;
}

async function sendViaApi(opts: {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}): Promise<MailResult> {
  const sender = parseFrom(mailFrom());
  const to = (Array.isArray(opts.to) ? opts.to : [opts.to]).map((email) => ({ email: email.trim() }));
  const payload = JSON.stringify({
    sender,
    to,
    subject: opts.subject,
    htmlContent: opts.html,
    ...(opts.text ? { textContent: opts.text } : {}),
    ...(opts.replyTo ? { replyTo: { email: opts.replyTo } } : {}),
  });
  try {
    const res = await httpsPostJson(
      "/v3/smtp/email",
      { accept: "application/json", "content-type": "application/json", "api-key": apiKey() },
      payload
    );
    let body: Record<string, unknown> = {};
    try {
      body = JSON.parse(res.body) as Record<string, unknown>;
    } catch {
      body = {};
    }
    if (res.status < 200 || res.status >= 300) {
      const msg = typeof body.message === "string" ? body.message : `HTTP ${res.status}`;
      return { ok: false, error: `brevo_api: ${res.status} ${msg}`, via: "api" };
    }
    return { ok: true, messageId: typeof body.messageId === "string" ? body.messageId : "", via: "api" };
  } catch (err) {
    return { ok: false, error: `brevo_api: ${err instanceof Error ? err.message : String(err)}`, via: "api" };
  }
}

async function sendViaSmtp(opts: {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}): Promise<MailResult> {
  try {
    const info = await getSmtpTransport().sendMail({
      from: mailFrom(),
      to: Array.isArray(opts.to) ? opts.to.join(", ") : opts.to,
      subject: opts.subject,
      html: opts.html,
      ...(opts.text ? { text: opts.text } : {}),
      ...(opts.replyTo ? { replyTo: opts.replyTo } : {}),
    });
    return { ok: true, messageId: info.messageId, via: "smtp" };
  } catch (err) {
    return { ok: false, error: `smtp: ${err instanceof Error ? err.message : String(err)}`, via: "smtp" };
  }
}

export async function sendMail(opts: {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}): Promise<MailResult> {
  const kind = mailTransportKind();
  if (!isTruthy(process.env.MAIL_ENABLED) || kind === "none") {
    return { ok: false, error: "mail_disabled_or_incomplete_config", via: "none" };
  }
  return kind === "api" ? sendViaApi(opts) : sendViaSmtp(opts);
}

/** Bungkus isi email dengan kerangka HTML sederhana (aman untuk semua klien email). */
export function mailLayout(title: string, bodyHtml: string): string {
  return `<!doctype html>
<html lang="id">
  <body style="margin:0;padding:0;background:#f6f7fb;font-family:Arial,Helvetica,sans-serif;color:#111827">
    <div style="max-width:560px;margin:0 auto;padding:24px 16px">
      <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
        <div style="padding:18px 22px;border-bottom:1px solid #e5e7eb">
          <strong style="font-size:15px">Jadwal Masjid</strong>
        </div>
        <div style="padding:22px">
          <h1 style="margin:0 0 12px;font-size:18px;line-height:1.4">${title}</h1>
          <div style="font-size:14px;line-height:1.7;color:#374151">${bodyHtml}</div>
        </div>
      </div>
      <p style="margin:14px 2px 0;font-size:12px;color:#6b7280">
        Email ini dikirim otomatis oleh jadwalmasjid.com. Jangan balas email ini.
      </p>
    </div>
  </body>
</html>`;
}
