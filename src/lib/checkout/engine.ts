import "server-only";

// Motor de la taquilla (CHECKOUT-PROPIO.md §1): "iframe" = checkout oficial de
// Fourvenues incrustado (lo que vende hoy en producción); "native" = checkout
// propio sobre la Channel Manager API. Se decide en servidor porque depende de
// variables de entorno que no deben llegar al cliente.

export type CheckoutEngine = "iframe" | "native";

const ENGINES: ReadonlySet<string> = new Set<CheckoutEngine>(["iframe", "native"]);

function asEngine(value: string | string[] | undefined): CheckoutEngine | null {
  const raw = Array.isArray(value) ? value[0] : value;
  const v = raw?.trim().toLowerCase();
  // Un valor desconocido se ignora (cae al siguiente nivel), nunca rompe.
  return v && ENGINES.has(v) ? (v as CheckoutEngine) : null;
}

/**
 * Motor efectivo: ?engine (solo fuera de producción) > CHECKOUT_ENGINE > default.
 * Default: "native" si VERCEL_ENV !== "production", "iframe" en producción.
 *
 * Producción nunca obedece a ?engine: nadie puede activar el motor nuevo en la
 * venta real desde la URL; ahí manda solo la variable de entorno (vuelta atrás
 * = CHECKOUT_ENGINE=iframe, sin redeploy de código).
 */
export function resolveCheckoutEngine(
  searchParams: Record<string, string | string[] | undefined>,
): CheckoutEngine {
  // Sin VERCEL_ENV (local, e2e) se considera "no producción".
  const isProduction = process.env.VERCEL_ENV === "production";

  if (!isProduction) {
    const fromQuery = asEngine(searchParams.engine);
    if (fromQuery) return fromQuery;
  }

  const fromEnv = asEngine(process.env.CHECKOUT_ENGINE);
  if (fromEnv) return fromEnv;

  return isProduction ? "iframe" : "native";
}
