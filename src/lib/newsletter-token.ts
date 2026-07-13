import "server-only";
import { createHmac, timingSafeEqual } from "crypto";

// Token de confirmación de la newsletter (doble opt-in). Firma email+timestamp
// con HMAC-SHA256 usando ADMIN_SESSION_SECRET (server-only). El enlace de
// confirmación no necesita estado en servidor: la firma prueba que el email se
// dio de alta desde nuestro formulario y acota la validez temporal.

const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // el enlace caduca a los 7 días

function getSecret(): string {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s) throw new Error("ADMIN_SESSION_SECRET requerido para firmar la confirmación");
  return s;
}

function b64url(input: string): string {
  return Buffer.from(input, "utf-8").toString("base64url");
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(`newsletter-confirm:${payload}`).digest("hex");
}

/** Crea el token para el enlace de confirmación de un email. */
export function createConfirmToken(email: string, nowMs: number): string {
  const payload = `${b64url(email)}.${nowMs}`;
  return `${payload}.${sign(payload)}`;
}

/** Verifica el token y devuelve el email si es válido y no ha caducado. */
export function verifyConfirmToken(token: string, nowMs: number): string | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [emailB64, tsStr, sig] = parts;
  const payload = `${emailB64}.${tsStr}`;
  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  const ts = parseInt(tsStr, 10);
  if (Number.isNaN(ts) || nowMs - ts > MAX_AGE_MS || ts > nowMs) return null;
  try {
    return Buffer.from(emailB64, "base64url").toString("utf-8");
  } catch {
    return null;
  }
}
