#!/usr/bin/env node
/**
 * Buat cookie sesi untuk pengujian alur (ditulis ke file, TIDAK dicetak).
 *   node scripts/make-test-session.mjs <uid> <role> <email> <nama> <fileTujuan>
 */
import { readFileSync, writeFileSync } from "node:fs";
import { createHmac } from "node:crypto";
import path from "node:path";

const [uid, role, email, name, outFile] = process.argv.slice(2);
if (!uid || !role || !email || !name || !outFile) {
  console.error("Pemakaian: node scripts/make-test-session.mjs <uid> <role> <email> <nama> <fileTujuan>");
  process.exit(2);
}

let secret = process.env.SESSION_SECRET;
if (!secret) {
  const envPath = path.join(process.cwd(), ".env");
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^SESSION_SECRET=(.*)$/);
    if (m) secret = m[1].trim();
  }
}
if (!secret) {
  console.error("SESSION_SECRET tidak ditemukan");
  process.exit(1);
}

const payload = { uid: Number(uid), role, email, name };
const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
const sig = createHmac("sha256", secret).update(body).digest("hex");
const token = `${body}.${sig}`;

writeFileSync(outFile, `jm_session=${token}\n`);
import("node:fs").then((fs) => fs.chmodSync(outFile, 0o600));
console.log(`cookie sesi dibuat untuk uid=${uid} role=${role} -> ${outFile} (isi tidak ditampilkan)`);
