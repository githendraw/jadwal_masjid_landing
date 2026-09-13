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

export interface LayoutOptions {
  title: string;
  /** teks pratinjau yang muncul di daftar inbox (tidak terlihat di badan email) */
  preheader?: string;
  /** label status kecil di atas judul */
  badge?: { text: string; tone?: "ok" | "info" | "warn" };
  /** tombol aksi utama */
  cta?: { label: string; url: string };
  bodyHtml: string;
  footerNote?: string;
}

const SITE = "jadwalmasjid.com";
const LOGO_URL = "https://jadwalmasjid.com/logo-email.png";

const TONES: Record<string, { bg: string; fg: string }> = {
  ok: { bg: "#ccfbf1", fg: "#0f766e" },
  info: { bg: "#e0f2fe", fg: "#075985" },
  warn: { bg: "#fef3c7", fg: "#92400e" },
};

/**
 * Kerangka email ber-brand (navy #0a192f + teal #00d4aa, sama seperti situs).
 * Dipakai tabel + inline style supaya tampil konsisten di Gmail, Outlook, dan klien mobile.
 */
export function mailLayout(o: LayoutOptions): string {
  const preheader = o.preheader
    ? `<div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;color:#eef2f7">${o.preheader}</div>`
    : "";
  const tone = TONES[o.badge?.tone ?? "info"] ?? TONES.info;
  const badge = o.badge
    ? `<div style="margin:0 0 10px"><span style="display:inline-block;padding:6px 12px;border-radius:999px;background:${tone.bg};color:${tone.fg};font:700 11px/1 Arial,Helvetica,sans-serif;letter-spacing:.6px;text-transform:uppercase">${o.badge.text}</span></div>`
    : "";
  const cta = o.cta
    ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:22px 0 4px"><tr>
         <td bgcolor="#00d4aa" style="border-radius:10px;background-color:#00d4aa;background-image:linear-gradient(135deg,#00d4aa 0%,#00a98f 100%)">
           <a href="${o.cta.url}" target="_blank" style="display:inline-block;padding:14px 26px;font:700 15px/1 Arial,Helvetica,sans-serif;color:#062e2a;text-decoration:none;border-radius:10px">${o.cta.label}</a>
         </td>
       </tr></table>`
    : "";
  return `<!doctype html>
<html lang="id">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="light only" />
    <title>${o.title}</title>
  </head>
  <body style="margin:0;padding:0;background:#eef7f3">
    ${preheader}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#eef7f3">
      <tr>
        <td align="center" style="padding:26px 12px">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(2,44,34,.10)">
            <tr><td bgcolor="#c9a44c" height="5" style="height:5px;line-height:5px;font-size:0;background-color:#c9a44c;background-image:linear-gradient(90deg,#7d6122 0%,#e6c766 50%,#7d6122 100%)">&nbsp;</td></tr>
            <tr>
              <td bgcolor="#04231c" style="background-color:#04231c;background-image:linear-gradient(135deg,#02150f 0%,#06412f 50%,#021b15 100%);padding:26px 26px 24px" align="center">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto">
                  <tr>
                    <td align="center" style="padding-bottom:10px">
                      <img src="${LOGO_URL}" width="112" height="112" alt="Jadwal Masjid"
                           style="display:block;width:112px;height:112px;border:0;outline:none;text-decoration:none" />
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <div style="font:700 13px/1.4 Arial,Helvetica,sans-serif;color:#e0c060;letter-spacing:1.4px">JADWALMASJID.COM</div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 26px 22px">
                ${badge}
                <h1 style="margin:0 0 10px;font:700 22px/1.35 Arial,Helvetica,sans-serif;color:#0f172a">${o.title}</h1>
                <div style="width:64px;height:4px;border-radius:2px;background-color:#00d4aa;background-image:linear-gradient(90deg,#00d4aa 0%,#d4af37 100%);margin:0 0 16px"></div>
                <div style="font:400 14px/1.75 Arial,Helvetica,sans-serif;color:#334155">${o.bodyHtml}</div>
                ${cta}
              </td>
            </tr>
            <tr>
              <td style="background:#f2faf6;border-top:1px solid #d7ece2;padding:18px 26px;font:400 12px/1.7 Arial,Helvetica,sans-serif;color:#5c7a6e;background-image:linear-gradient(180deg,#f2faf6 0%,#e8f5ee 100%)">
                ${o.footerNote ?? "Email ini dikirim otomatis oleh sistem, mohon jangan dibalas."}
                <div style="margin-top:8px">
                  <a href="https://${SITE}" target="_blank" style="color:#0f766e;text-decoration:none;font-weight:700">${SITE}</a>
                </div>
              </td>
            </tr>
          </table>
          <div style="font:400 11px/1.6 Arial,Helvetica,sans-serif;color:#7d9a8e;margin-top:12px">
            &copy; ${new Date().getFullYear()} Jadwal Masjid
          </div>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

