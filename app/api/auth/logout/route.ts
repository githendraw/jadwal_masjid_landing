import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/session";
import { getBaseUrl } from "@/lib/auth";

export async function POST() {
  await clearSessionCookie();
  return NextResponse.json({ ok: true });
}

export async function GET() {
  await clearSessionCookie();
  return NextResponse.redirect(`${getBaseUrl()}`);
}