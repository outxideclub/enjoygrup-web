import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME as LOCALE_COOKIE, defaultLocale, localeFromPath } from "@/i18n/config";

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

// Cabeceras de confianza que SOLO puede fijar este middleware. Si llegan del
// cliente hay que borrarlas antes de reenviar la petición para que no las falsee.
const TRUSTED_HEADERS = ["x-locale", "x-pathname", "x-base-path"] as const;

function baseHeaders(req: NextRequest): Headers {
  const h = new Headers(req.headers);
  for (const name of TRUSTED_HEADERS) h.delete(name);
  return h;
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // El idioma NUNCA prefija rutas internas. Detectamos admin sobre la ruta base
  // (sin prefijo de idioma) para que /en/admin o /de/api/admin no esquiven el
  // guard de autenticación colándose por la rama de i18n.
  const { locale: pathLocale, basePath } = localeFromPath(pathname);
  const isAdminRoute =
    basePath.startsWith("/admin") || basePath.startsWith("/api/admin");

  // Un admin route con prefijo de idioma (/en/admin…) se redirige a su forma
  // canónica sin prefijo; el guard se aplica siempre sobre /admin y /api/admin.
  if (isAdminRoute && pathLocale) {
    const url = req.nextUrl.clone();
    url.pathname = basePath;
    return NextResponse.redirect(url, 308);
  }

  if (!isAdminRoute) {
    // ── i18n por rutas ──
    // /en|de|fr|it/... se reescribe a la ruta sin prefijo fijando el idioma con
    // la cabecera x-locale (la lee getServerLocale). El español va sin prefijo.
    // x-pathname (ruta real, con prefijo) alimenta el canonical; x-base-path
    // (ruta sin prefijo) alimenta los hreflang de HreflangTags.

    // /es/... no existe: el idioma por defecto va sin prefijo → redirección permanente.
    if (pathname === `/${defaultLocale}` || pathname.startsWith(`/${defaultLocale}/`)) {
      const url = req.nextUrl.clone();
      url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
      return NextResponse.redirect(url, 308);
    }

    const requestHeaders = baseHeaders(req);
    requestHeaders.set("x-pathname", pathname);
    requestHeaders.set("x-base-path", basePath);

    if (pathLocale) {
      requestHeaders.set("x-locale", pathLocale);
      const url = req.nextUrl.clone();
      url.pathname = basePath;
      const res = NextResponse.rewrite(url, { request: { headers: requestHeaders } });
      // Sincroniza la cookie para que la navegación posterior (enlaces sin
      // prefijo) siga en el mismo idioma.
      if (req.cookies.get(LOCALE_COOKIE)?.value !== pathLocale) {
        res.cookies.set(LOCALE_COOKIE, pathLocale, {
          path: "/",
          maxAge: 60 * 60 * 24 * 365,
          sameSite: "lax",
        });
      }
      return res;
    }

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
