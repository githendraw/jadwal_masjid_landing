import { NextResponse } from "next/server";
import { exchangeCodeForProfile } from "@/lib/auth";
import { upsertGoogleUser } from "@/lib/upsert-google-user";
import { setSessionCookie } from "@/lib/session";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error && !code) {
    return NextResponse.redirect(
      new URL("/masuk?error=google", url.origin)
    );
  }
  if (!code) {
    return NextResponse.redirect(
      new URL("/masuk?error=missing_code", url.origin)
    );
  }

  try {
    const profile = await exchangeCodeForProfile(code);
    if (!profile.email) {
      return NextResponse.redirect(
        new URL("/masuk?error=no_email", url.origin)
      );
    }
    const user = await upsertGoogleUser(profile);
    await setSessionCookie({
      uid: user.id,
      role: user.role,
      email: user.email,
      name: user.name,
    });
    return NextResponse.redirect(new URL("/akun", url.origin));
  } catch (e) {
    console.error("Google callback error:", e);
    return NextResponse.redirect(new URL("/masuk?error=callback", url.origin));
  }
}