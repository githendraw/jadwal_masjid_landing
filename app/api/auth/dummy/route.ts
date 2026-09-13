import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { upsertGoogleUser } from "@/lib/upsert-google-user";
import { setSessionCookie } from "@/lib/session";
import { getBaseUrl } from "@/lib/auth";

/**
 * LOGIN SIMULASI (hanya untuk development / pengujian internal).
 *
 * KEAMANAN: endpoint ini TIDAK boleh bisa dipakai publik. Dulu ia aktif bila
 * GOOGLE_ALLOW_DUMMY=true ATAU kredensial masih placeholder -- artinya siapa pun
 * di internet bisa memanggil ?email=<email admin> dan langsung menjadi ADMIN.
 *
 * Sekarang endpoint hanya hidup bila:
 *   1) NODE_ENV bukan "production" (pengembangan lokal), ATAU
 *   2) permintaan menyertakan ?key=<DEV_LOGIN_SECRET> yang benar.
 * Di luar itu balasannya 404 supaya keberadaan endpoint tidak terungkap.
 *
 * Cara pakai (produksi, untuk uji internal):
 *   /api/auth/dummy?key=<DEV_LOGIN_SECRET>&email=admin@jadwalmasjid.com
 * Key-nya ada di ~/.hermes/... no -- ada di file .env project (DEV_LOGIN_SECRET).
 */
function safeEqual(a: string, b: string): boolean {
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

function notFound(): NextResponse {
  return new NextResponse("Not Found", { status: 404 });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = process.env.DEV_LOGIN_SECRET || "";
  const supplied = url.searchParams.get("key") || "";
  const devMode = process.env.NODE_ENV !== "production";
  const allowed = devMode || (secret.length >= 16 && safeEqual(supplied, secret));

  if (!allowed) return notFound();

  const emailOverride = url.searchParams.get("email");
  const email = emailOverride || process.env.DUMMY_GOOGLE_EMAIL || "penguji@jadwalmasjid.id";
  const name = email.split("@")[0] || "Penguji";

  const profile = { email, name, picture: null, googleId: `dummy-${email}` };
  const user = await upsertGoogleUser(profile);
  await setSessionCookie({
    uid: user.id,
    role: user.role,
    email: user.email,
    name: user.name,
  });
  const next = url.searchParams.get("next");
  return NextResponse.redirect(new URL(next || "/akun", getBaseUrl()));
}

export const dynamic = "force-dynamic";
