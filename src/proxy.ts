import { NextRequest, NextResponse } from "next/server";
import {
  COOKIE_NAME as LOCALE_COOKIE,
  defaultLocale,
  localeFromPath,
  localizedPath,
  negotiateLocale,
  type Locale,
  locales,
} from "@/i18n/config";

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

// La taquilla vive en su propio subdominio (regla del dueño, 1-sep-2026):
// entradas.grupoenjoy.es SIRVE /outxide/entradas (rewrite interno), y la ruta
// en el host canónico redirige allí. Claves solo de producción: en localhost y
// previews de Vercel nada de esto aplica (los e2e siguen usando la ruta).
const TICKETS_HOST = "entradas.grupoenjoy.es";
const CANONICAL_HOSTS = new Set(["www.grupoenjoy.es", "grupoenjoy.es"]);
const TICKETS_PATH = "/outxide/entradas";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // El idioma NUNCA prefija rutas internas. Detectamos admin sobre la ruta base
  // (sin prefijo de idioma) para que /en/admin o /de/api/admin no esquiven el
  // guard de autenticación colándose por la rama de i18n.
  const { locale: pathLocale, basePath } = localeFromPath(pathname);

  const host = (req.headers.get("host") ?? "").toLowerCase().split(":")[0];

  if (host === TICKETS_HOST) {
    // El admin y su API NUNCA se sirven por el subdominio: irían por la rama
    // de la taquilla esquivando el guard de autenticación de más abajo
    // (cazado en revisión adversarial). A la web canónica, donde el guard corre.
    if (basePath.startsWith("/admin") || basePath.startsWith("/api/admin")) {
      const url = req.nextUrl.clone();
      url.protocol = "https:";
      url.host = "www.grupoenjoy.es";
      url.port = "";
      return NextResponse.redirect(url, 307);
    }
    // API y ficheros de public/: tal cual (los assets de _next ya quedan fuera
    // por el matcher). baseHeaders: sin cabeceras x-* falsificables del cliente.
    if (basePath.startsWith("/api") || /\.[a-z0-9]+$/i.test(basePath)) {
      return NextResponse.next({ request: { headers: baseHeaders(req) } });
    }
    // La portada del subdominio ES la taquilla. Idioma: ?lang (lo ponen los CTA
    // de la web para conservar el idioma del visitante) → prefijo de ruta →
    // cookie → Accept-Language → es. La URL del navegador no cambia (rewrite),
    // así el cliente sigue leyendo ?event y los parámetros de campaña.
    if (basePath === "/" || basePath === TICKETS_PATH) {
      const langParam = req.nextUrl.searchParams.get("lang");
      const cookieLoc = req.cookies.get(LOCALE_COOKIE)?.value;
      const locale: Locale =
        (langParam && (locales as readonly string[]).includes(langParam)
          ? (langParam as Locale)
          : null) ??
        pathLocale ??
        (cookieLoc && (locales as readonly string[]).includes(cookieLoc)
          ? (cookieLoc as Locale)
          : null) ??
        negotiateLocale(req.headers.get("accept-language")) ??
        defaultLocale;
      const url = req.nextUrl.clone();
      url.pathname = TICKETS_PATH;
      const requestHeaders = baseHeaders(req);
      requestHeaders.set("x-locale", locale);
      requestHeaders.set("x-pathname", TICKETS_PATH);
      requestHeaders.set("x-base-path", TICKETS_PATH);
      return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
    }
    // Cualquier otra página pedida al subdominio → web canónica (el subdominio
    // no duplica el sitio; navbar y footer de la taquilla siguen funcionando).
    const url = req.nextUrl.clone();
    url.protocol = "https:";
    url.host = "www.grupoenjoy.es";
    url.port = "";
    return NextResponse.redirect(url, 307);
  }

  // Host canónico: la compra de entradas SIEMPRE en el subdominio.
  if (
    CANONICAL_HOSTS.has(host) &&
    basePath === TICKETS_PATH &&
    (req.method === "GET" || req.method === "HEAD")
  ) {
    const url = new URL(`https://${TICKETS_HOST}/`);
    req.nextUrl.searchParams.forEach((v, k) => url.searchParams.set(k, v));
    // El idioma viaja SIEMPRE como ?lang: la cookie ge_locale es host-only y no
    // llega al subdominio, así que sin el parámetro un visitante en español con
    // navegador en otro idioma vería la taquilla renegociada (cazado en revisión).
    url.searchParams.set("lang", pathLocale ?? defaultLocale);
    return NextResponse.redirect(url, 307);
  }
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

    // ── URLs canónicas por idioma ──
    // Una URL sin prefijo debe renderizar SIEMPRE español (coherente con el
    // hreflang que la declara versión "es"). Si el visitante prefiere otro
    // idioma (cookie de preferencia, o Accept-Language en su primera visita),
    // se le redirige a la URL de SU idioma en vez de variar el contenido de la
    // URL española. Los bots (sin cookie y normalmente sin Accept-Language)
    // nunca se redirigen, así que cada URL indexable tiene un solo idioma.
    if (
      !pathLocale &&
      (req.method === "GET" || req.method === "HEAD") &&
      !basePath.startsWith("/api") &&
      // Ficheros estáticos de public/ (llms.txt, *.svg…): sin redirección de
      // idioma — un fichero tiene una única URL, y los fetchers simples de
      // llms.txt no siguen redirecciones.
      !/\.[a-z0-9]+$/i.test(basePath)
    ) {
      // El enlace del email de confirmación lleva ?lang: manda sobre la cookie
      // para que la landing del newsletter salga en el idioma del email.
      const langParam = req.nextUrl.searchParams.get("lang");
      const explicit: Locale | null =
        basePath === "/newsletter" && langParam && (locales as readonly string[]).includes(langParam)
          ? (langParam as Locale)
          : null;
      const cookieLoc = req.cookies.get(LOCALE_COOKIE)?.value;
      const preferred: Locale | null =
        explicit ??
        (cookieLoc && (locales as readonly string[]).includes(cookieLoc)
          ? (cookieLoc as Locale)
          : cookieLoc
            ? null // cookie inválida: no negociar, tratar como es
            : negotiateLocale(req.headers.get("accept-language")));
      if (preferred && preferred !== defaultLocale) {
        const url = req.nextUrl.clone();
        url.pathname = localizedPath(basePath, preferred);
        const res = NextResponse.redirect(url, 307);
        // Fija la preferencia en la primera visita para no renegociar.
        if (!cookieLoc) {
          res.cookies.set(LOCALE_COOKIE, preferred, {
            path: "/",
            maxAge: 60 * 60 * 24 * 365,
            sameSite: "lax",
          });
        }
        return res;
      }
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
