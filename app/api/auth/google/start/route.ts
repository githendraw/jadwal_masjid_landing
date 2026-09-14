import { NextResponse } from "next/server";
import { buildGoogleAuthUrl, googleAuthEnabled, getBaseUrl } from "@/lib/auth";
import { HALAMAN_DITUTUP, TOKO_AKTIF } from "@/lib/features";

export const dynamic = "force-dynamic";

export async function GET() {
  // Toko belum dibuka: login dimatikan total (pemilik memilih termasuk admin),
  // jadi jangan sampai alur OAuth dimulai sama sekali.
  if (!TOKO_AKTIF) {
    return NextResponse.redirect(`${getBaseUrl()}${HALAMAN_DITUTUP}`);
  }

  // Google belum dikonfigurasi: JANGAN arahkan ke login simulasi (dulu ini
  // membuat siapa pun bisa masuk sebagai admin). Kembalikan ke halaman masuk
  // dengan pesan yang jelas.
  if (!googleAuthEnabled()) {
    return NextResponse.redirect(`${getBaseUrl()}/masuk?error=google_belum_dikonfigurasi`);
  }

  const state = Array.from(
    crypto.getRandomValues(new Uint8Array(16)),
    (b) => b.toString(16).padStart(2, "0")
  ).join("");

  const url = await buildGoogleAuthUrl(state);
  const response = NextResponse.redirect(url);

  // Simpan state di cookie httpOnly untuk diverifikasi di callback (anti CSRF).
  response.cookies.set("jm_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });

  return response;
}
