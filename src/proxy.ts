import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "ge_admin_session";
const SESSION_MAX_AGE = 86400; // 24 hours in seconds

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
}

function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a[i] ^ b[i];
  }
  return result === 0;
}

async function verifySession(token: string): Promise<boolean> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;

  const dotIdx = token.lastIndexOf(".");
  if (dotIdx === -1) return false;

  const payload = token.slice(0, dotIdx);
  const signatureHex = token.slice(dotIdx + 1);

  if (!/^[0-9a-f]+$/.test(signatureHex) || signatureHex.length === 0) return false;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const expectedSig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  const expectedBytes = new Uint8Array(expectedSig);
  const providedBytes = hexToBytes(signatureHex);

  if (!timingSafeEqual(expectedBytes, providedBytes)) return false;

  try {
    const { ts } = JSON.parse(payload);
    if (typeof ts !== "number") return false;
    return Date.now() - ts < SESSION_MAX_AGE * 1000;
  } catch {
    return false;
  }
}

function denyAdmin(req: NextRequest, pathname: string): NextResponse {
  if (pathname.startsWith("/api/admin")) {
    return new NextResponse(JSON.stringify({ error: "No autorizado" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }
  return NextResponse.redirect(new URL("/admin/login", req.url));
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── Inject x-pathname header for HreflangTags component ──
  // Needed because Next.js metadata API deduplicates identical
  // alternate URLs (cookie-based i18n = same URL for all locales).
  const isAdminRoute =
    pathname.startsWith("/admin") || pathname.startsWith("/api/admin");

  if (!isAdminRoute) {
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-pathname", pathname);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // ── Admin auth guard ──
  if (pathname === "/admin/login" || pathname === "/api/admin/auth") {
    return NextResponse.next();
  }

  const session = req.cookies.get(SESSION_COOKIE);
  if (!session?.value) {
    return denyAdmin(req, pathname);
  }

  const valid = await verifySession(session.value);
  if (!valid) {
    const response = denyAdmin(req, pathname);
    response.cookies.delete(SESSION_COOKIE);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // All pages (for hreflang injection) + admin routes (for auth)
    "/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|manifest.webmanifest|robots.txt|sitemap.xml|images|videos).*)",
  ],
};
