import { NextResponse } from "next/server";
import { exchangeCodeForProfile, getBaseUrl } from "@/lib/auth";
import { upsertGoogleUser } from "@/lib/upsert-google-user";
import { setSessionCookie } from "@/lib/session";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");
  const state = url.searchParams.get("state");

  // Base URL publik (BASE_URL di .env). Tidak memakai request.url karena di
  // belakang nginx alamat internalnya 127.0.0.1:4001, sehingga redirect bisa
  // mengarah ke http://localhost:4001.
  const base = getBaseUrl();
  const to = (path: string) => NextResponse.redirect(new URL(path, base));

  // Anti CSRF: state dari /api/auth/google/start harus cocok dengan cookie httpOnly.
  const cookieState = request.headers
    .get("cookie")
    ?.split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("jm_oauth_state="))
    ?.slice("jm_oauth_state=".length);

  if (!state || !cookieState || state !== cookieState) {
    return to("/masuk?error=state");
  }

  if (error && !code) {
    return to("/masuk?error=google");
  }
  if (!code) {
    return to("/masuk?error=missing_code");
  }

  try {
    const profile = await exchangeCodeForProfile(code);
    if (!profile.email) {
      return to("/masuk?error=no_email");
    }
    const user = await upsertGoogleUser(profile);
    await setSessionCookie({
      uid: user.id,
      role: user.role,
      email: user.email,
      name: user.name,
    });
    const response = to("/akun");
    response.cookies.set("jm_oauth_state", "", { path: "/", maxAge: 0 });
    return response;
  } catch (e) {
    console.error("Google callback error:", e);
    return to("/masuk?error=callback");
  }
}
