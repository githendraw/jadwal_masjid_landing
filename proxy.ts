import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Nama cookie sesi — harus sama dengan lib/session.ts.
const SESSION_COOKIE = "jm_session";

const PROTECTED = ["/akun", "/checkout", "/admin", "/keranjang"];

/**
 * Proxy (pengganti middleware) Next 16.
 * Hanya cek ada/tidaknya cookie sesi (UX redirect). Otorisasi penuh
 * divalidasi ulang di server component / API dengan data DB.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/_next") || pathname.startsWith("/favicon")) {
    return NextResponse.next();
  }

  const guard = PROTECTED.find(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
  if (!guard) return NextResponse.next();

  const token = request.cookies.get(SESSION_COOKIE)?.value;

  // Checkout tetap boleh dibuka pelanggan (perlu login); keranjang juga.
  if (!token) {
    const loginUrl = new URL("/masuk", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Admin: cek role dari cookie (cookie sudah ditandatangani HMAC).
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    let role: string | null = null;
    try {
      const body = token.split(".")[0];
      role = JSON.parse(Buffer.from(body, "base64url").toString("utf8")).role;
    } catch {
      role = null;
    }
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/akun", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/akun/:path*",
    "/checkout",
    "/keranjang",
    "/admin/:path*",
    "/masuk",
    "/produk/:path*",
    "/pembayaran/:path*",
  ],
};