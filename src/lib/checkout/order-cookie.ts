// Cookie técnica del pedido iniciado en el checkout propio. PURA (sin
// dependencias de Next): la escriben las rutas /api/checkout/* y la lee
// /gracias en servidor para verificar el pago en Fourvenues y pasar su importe
// real al Purchase. Valor `ref:payment_id`; dominio raíz grupoenjoy.es porque
// la taquilla vive en entradas. y /gracias en www. (en local y previews,
// host-only). 1 hora: el payment_url de Fourvenues caduca antes. HttpOnly.

export const ORDER_COOKIE = "ge_order";
export const ORDER_COOKIE_MAX_AGE = 60 * 60;

const REF_RE = /^ge-[a-z0-9]{10}$/;
const PAYMENT_ID_RE = /^[A-Za-z0-9_-]{1,64}$/;

export interface OrderCookieOptions {
  path: string;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax";
  secure: boolean;
  domain?: string;
}

/** Atributos de la cookie según el Host de la petición. */
export function orderCookieOptions(hostHeader: string | null | undefined): OrderCookieOptions {
  const host = (hostHeader ?? "").toLowerCase().split(":")[0];
  const local = ["localhost", "127.0.0.1", "[::1]"].includes(host);
  const shared = host === "grupoenjoy.es" || host.endsWith(".grupoenjoy.es");
  return {
    path: "/",
    maxAge: ORDER_COOKIE_MAX_AGE,
    httpOnly: true,
    sameSite: "lax",
    secure: !local,
    ...(shared ? { domain: "grupoenjoy.es" } : {}),
  };
}

export function orderCookieValue(ref: string, paymentId: string): string {
  return `${ref}:${paymentId}`;
}

/** Lee `ge_order` ("ref:payment_id") y valida su forma; null si no cuadra. */
export function parseOrderCookie(value: string | undefined): { ref: string; paymentId: string } | null {
  if (!value) return null;
  const idx = value.indexOf(":");
  if (idx <= 0) return null;
  const ref = value.slice(0, idx);
  const paymentId = value.slice(idx + 1);
  if (!REF_RE.test(ref) || !PAYMENT_ID_RE.test(paymentId)) return null;
  return { ref, paymentId };
}
