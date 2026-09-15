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
 * Default: "native" en todos los entornos desde el 15-sep-2026 (orden de Jose:
 * "actívalo"; antes producción arrancaba en "iframe").
 *
 * Producción nunca obedece a ?engine: nadie puede cambiar el motor de la venta
 * real desde la URL; ahí manda solo la variable de entorno. Vuelta atrás al
 * iframe = CHECKOUT_ENGINE=iframe en Vercel + redeploy (o Instant Rollback al
 * despliegue anterior, o revertir este commit).
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

  return "native";
}
