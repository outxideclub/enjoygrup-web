import { NextRequest, NextResponse } from "next/server";

const SESSION_COOKIE = "ge_admin_session";
const LOCALE_COOKIE = "ge_locale";
const SESSION_MAX_AGE = 86400; // 24 hours in seconds
const VALID_LOCALES = ["es", "en"] as const;

function detectLocale(req: NextRequest): "es" | "en" {
  const acceptLang = req.headers.get("accept-language") ?? "";
  // Check if any Spanish variant appears before English
  const languages = acceptLang.split(",").map((l) => l.split(";")[0].trim().toLowerCase());
  for (const lang of languages) {
    if (lang.startsWith("es")) return "es";
    if (lang.startsWith("en")) return "en";
  }
  // Default: non-Spanish speakers get English
  return "en";
}

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

  // Validate hex format
  if (!/^[0-9a-f]+$/.test(signatureHex) || signatureHex.length === 0) return false;

  // Recompute HMAC
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

  // Timing-safe comparison of HMAC signatures
  if (!timingSafeEqual(expectedBytes, providedBytes)) return false;

  // Validate payload and check expiration
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

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // --- Admin auth guard ---
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
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

  // --- Locale cookie validation ---
  const localeCookie = req.cookies.get(LOCALE_COOKIE);
  if (localeCookie?.value && !(VALID_LOCALES as readonly string[]).includes(localeCookie.value)) {
    const response = NextResponse.next();
    response.cookies.delete(LOCALE_COOKIE);
    return response;
  }

  // --- Locale detection for public pages ---
  if (!localeCookie?.value) {
    const detected = detectLocale(req);
    const response = NextResponse.next();
    response.cookies.set(LOCALE_COOKIE, detected, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm)).*)",
  ],
};
