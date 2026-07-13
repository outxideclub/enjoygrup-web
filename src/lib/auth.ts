import { cookies } from "next/headers";
import { timingSafeEqual } from "crypto";

const SESSION_COOKIE = "ge_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24; // 24 hours

// El secreto firma la sesión del admin (única barrera): exigimos entropía real.
// Rechazamos valores cortos o con pinta de placeholder elegido a mano para que
// nunca se despliegue una clave débil por descuido.
const WEAK_SECRET = /^(ge-|test|dev|change|secret|admin|password|placeholder|example)/i;

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("ADMIN_SESSION_SECRET env var is required");
  if (secret.length < 32 || WEAK_SECRET.test(secret)) {
    throw new Error(
      "ADMIN_SESSION_SECRET débil: usa >=32 bytes aleatorios (openssl rand -base64 48)",
    );
  }
  return secret;
}

function getPassword(): string {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) throw new Error("ADMIN_PASSWORD env var is required");
  return pw;
}

async function sign(payload: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  const hex = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `${payload}.${hex}`;
}

async function verify(token: string, secret: string): Promise<string | null> {
  const dotIdx = token.lastIndexOf(".");
  if (dotIdx === -1) return null;
  const payload = token.slice(0, dotIdx);
  const expected = await sign(payload, secret);
  // Timing-safe comparison to prevent timing attacks
  const tokenBuf = Buffer.from(token);
  const expectedBuf = Buffer.from(expected);
  if (tokenBuf.length !== expectedBuf.length) return null;
  if (!timingSafeEqual(tokenBuf, expectedBuf)) return null;
  return payload;
}

export async function createSession(): Promise<void> {
  const payload = JSON.stringify({ ts: Date.now() });
  const token = await sign(payload, getSecret());
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
}

export async function validateSession(): Promise<boolean> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  const payload = await verify(token, getSecret());
  if (!payload) return false;
  try {
    const { ts } = JSON.parse(payload);
    return Date.now() - ts < SESSION_MAX_AGE * 1000;
  } catch {
    return false;
  }
}

export async function destroySession(): Promise<void> {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

// Hosts permitidos como Origin en las rutas de escritura del admin.
// Comparación EXACTA (nada de substring, que era evadible con
// "https://www.grupoenjoy.es.attacker.com").
const ALLOWED_ORIGIN_HOSTS = new Set(["grupoenjoy.es", "www.grupoenjoy.es"]);

/**
 * Comprobación CSRF de origen para las rutas admin de escritura.
 * - Origin ausente: se permite (clientes no-navegador); la defensa principal
 *   sigue siendo la cookie de sesión con SameSite=Lax.
 * - Origin malformado: se rechaza (en vez de lanzar y devolver 500).
 * - Se acepta la allowlist fija o la igualdad exacta con el Host de la
 *   petición (cubre los deploys de preview de Vercel).
 */
export function isAllowedAdminOrigin(origin: string | null, host: string | null): boolean {
  // Sin Origin no hay señal de mismo-origen: las escrituras del panel se hacen
  // con fetch (que SIEMPRE envía Origin), así que un Origin ausente se rechaza
  // en vez de permitirse — así el check sí protege frente a CSRF.
  if (!origin) return false;
  try {
    const originUrl = new URL(origin);
    if (ALLOWED_ORIGIN_HOSTS.has(originUrl.host)) return true;
    if (
      process.env.NODE_ENV !== "production" &&
      (originUrl.hostname === "localhost" || originUrl.hostname === "127.0.0.1")
    ) {
      return true;
    }
    return host !== null && originUrl.host === host;
  } catch {
    return false;
  }
}

export function checkPassword(input: string): boolean {
  const expected = getPassword();
  const inputBuf = Buffer.from(input);
  const expectedBuf = Buffer.from(expected);
  if (inputBuf.length !== expectedBuf.length) {
    // Still perform a comparison to avoid leaking length info via timing
    timingSafeEqual(expectedBuf, expectedBuf);
    return false;
  }
  return timingSafeEqual(inputBuf, expectedBuf);
}
