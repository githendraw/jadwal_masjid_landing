import { NextResponse } from "next/server";
import { buildGoogleAuthUrl, googleAuthEnabled, getBaseUrl } from "@/lib/auth";

export async function GET() {
  // Dalam mode dummy (belum ada kredensial), arahkan ke login simulasi.
  if (!googleAuthEnabled()) {
    return NextResponse.redirect(`${getBaseUrl()}/api/auth/dummy`);
  }
  const state = Array.from(
    crypto.getRandomValues(new Uint8Array(16)),
    (b) => b.toString(16).padStart(2, "0")
  ).join("");
  const url = await buildGoogleAuthUrl(state);
  return NextResponse.redirect(url);
}