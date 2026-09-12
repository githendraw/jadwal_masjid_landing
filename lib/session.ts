import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "jm_session";

export interface SessionPayload {
  uid: number;
  role: "CUSTOMER" | "ADMIN";
  email: string;
  name: string;
}

/**
 * HMAC-SHA256 signed token (stateless session).
 * token = base64url(payloadJson) + "." + hex(hmac)
 */
function signRaw(payload: string): string {
  const secret = process.env.SESSION_SECRET || "dev-insecure-secret";
  const hmac = createHmac("sha256", secret);
  hmac.update(payload);
  return hmac.digest("hex");
}

export function signSession(payload: SessionPayload): string {
  const body = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  return `${body}.${signRaw(body)}`;
}

export function verifySession(token: string): SessionPayload | null {
  const idx = token.lastIndexOf(".");
  if (idx === -1) return null;
  const body = token.slice(0, idx);
  const sig = token.slice(idx + 1);
  const expected = signRaw(body);
  const a = Buffer.from(sig, "hex");
  const b = Buffer.from(expected, "hex");
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8"));
    return payload as SessionPayload;
  } catch {
    return null;
  }
}

export async function setSessionCookie(payload: SessionPayload): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, signSession(payload), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 30 * 24 * 60 * 60,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function getSession(): Promise<SessionPayload | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySession(token);
}

export const sessionCookieName = COOKIE_NAME;