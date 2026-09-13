#!/usr/bin/env node
/**
 * Uji kirim email memakai konfigurasi di .env.
 *   node scripts/test-mail.mjs alamat@tujuan
 *
 * Otomatis memilih jalur:
 *   - API Brevo  : kalau BREVO_API_KEY diisi (atau MAIL_TRANSPORT=api)
 *   - SMTP relay : kalau MAIL_TRANSPORT=smtp / tidak ada API key
 * Script ini tidak mengubah data apa pun; hanya mencoba satu pengiriman dan
 * melaporkan jawaban server apa adanya.
 */
import { readFileSync } from "node:fs";
import path from "node:path";

const envPath = path.join(process.cwd(), ".env");
try {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)$/);
    if (m && process.env[m[1]] === undefined) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "").trim();
    }
  }
} catch {
  console.error("Tidak bisa membaca .env di", envPath);
  process.exit(2);
}

const to = process.argv[2];
if (!to) {
  console.error("Pemakaian: node scripts/test-mail.mjs alamat@tujuan");
  process.exit(2);
}

const truthy = (v) => ["true", "1", "yes", "ssl"].includes((v ?? "").toLowerCase());
const apiKey = (process.env.BREVO_API_KEY ?? "").trim();
const from = process.env.SMTP_FROM || "Jadwal Masjid <noreply@jadwalmasjid.com>";
const subject = "Uji pengiriman email — Jadwal Masjid";
const html =
  '<p>Ini email uji dari jadwalmasjid.com. Kalau kamu menerima ini, konfigurasi email sudah benar.</p>' +
  '<p style="color:#6b7280;font-size:12px">Dikirim oleh scripts/test-mail.mjs</p>';

const forced = (process.env.MAIL_TRANSPORT ?? "").toLowerCase();
const useApi = forced === "api" || (!forced && apiKey.length > 0);

function parseFrom(f) {
  const m = f.match(/^\s*(.*?)\s*<\s*([^>]+)\s*>\s*$/);
  return m ? { name: m[1] || undefined, email: m[2].trim() } : { email: f.trim() };
}

if (useApi) {
  console.log("Jalur : API Brevo (HTTPS, dipaksa IPv4)");
  console.log("   key    :", apiKey ? apiKey.slice(0, 12) + "…(disembunyikan)" : "(kosong)");
  console.log("   from   :", from);
  console.log("   tujuan :", to);
  console.log();
  if (!apiKey) {
    console.error("   ✘ BREVO_API_KEY belum diisi");
    process.exit(1);
  }
  const { default: https } = await import("node:https");
  const payload = JSON.stringify({
    sender: parseFrom(from),
    to: [{ email: to }],
    subject,
    htmlContent: html,
  });
  const result = await new Promise((resolve, reject) => {
    const req = https.request(
      {
        host: "api.brevo.com",
        port: 443,
        path: "/v3/smtp/email",
        method: "POST",
        family: 4, // paksa IPv4 supaya IP pengirim = 203.194.112.157
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "api-key": apiKey,
          "content-length": Buffer.byteLength(payload),
        },
        timeout: 20000,
      },
      (res) => {
        let data = "";
        res.setEncoding("utf8");
        res.on("data", (c) => (data += c));
        res.on("end", () => resolve({ status: res.statusCode, body: data }));
      }
    );
    req.on("timeout", () => req.destroy(new Error("timeout 20s")));
    req.on("error", reject);
    req.write(payload);
    req.end();
  });
  console.log("   HTTP", result.status);
  let parsed = {};
  try {
    parsed = JSON.parse(result.body);
  } catch {
    parsed = {};
  }
  console.log("   jawaban server:", result.body.slice(0, 300));
  if (result.status < 200 || result.status >= 300) process.exit(1);
  console.log("   ✔ email diterima Brevo, messageId:", parsed?.messageId ?? "(tidak ada)");
} else {
  const { default: nodemailer } = await import("nodemailer");
  const secure = truthy(process.env.SMTP_SECURE);
  const cfg = {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? (secure ? 465 : 587)),
    secure,
    requireTLS: !secure,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 20000,
  };
  console.log("Jalur : SMTP relay");
  console.log("   host   :", cfg.host);
  console.log("   port   :", cfg.port, secure ? "(SSL)" : "(STARTTLS)");
  console.log("   user   :", cfg.auth.user ? cfg.auth.user.slice(0, 8) + "…" : "(kosong)");
  console.log("   pass   :", cfg.auth.pass ? cfg.auth.pass.slice(0, 10) + "…(disembunyikan)" : "(kosong)");
  console.log("   from   :", from);
  console.log("   tujuan :", to);
  console.log();
  const t = nodemailer.createTransport(cfg);
  try {
    console.log("1) cek koneksi & autentikasi …");
    await t.verify();
    console.log("   ✔ autentikasi diterima server");
    console.log("2) kirim email uji …");
    const info = await t.sendMail({ from, to, subject, html });
    console.log("   ✔ terkirim, messageId:", info.messageId);
    console.log("   jawaban server:", info.response);
  } catch (err) {
    console.error(
      "   ✘ GAGAL:",
      err?.code ? err.code + " " : "",
      err?.responseCode ? err.responseCode + " " : "",
      err?.message ?? String(err)
    );
    process.exit(1);
  }
}
