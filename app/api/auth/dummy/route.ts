import { NextResponse } from "next/server";
import { upsertGoogleUser } from "@/lib/upsert-google-user";
import { setSessionCookie } from "@/lib/session";
import { getBaseUrl } from "@/lib/auth";

/**
 * LOGIN SIMULASI (khusus development).
 * Hanya aktif bila GOOGLE_ALLOW_DUMMY=true ATAU kredensial masih placeholder
 * (belum diganti di akhir development). JANGAN nyalakan di produksi.
 */
export async function GET(request: Request) {
  const isPlaceholder =
    !process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID.startsWith("DUMMY");
  const allowDummy = process.env.GOOGLE_ALLOW_DUMMY === "true";
  if (!allowDummy && !isPlaceholder) {
    return NextResponse.json(
      { error: "Login dummy dinonaktifkan" },
      { status: 403 }
    );
  }

  const url = new URL(request.url);
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
  return NextResponse.redirect(new URL(next || "/akun", url.origin));
}