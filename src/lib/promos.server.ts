import "server-only";

import { connection } from "next/server";
import { resolveNow } from "./empresas/schedule";
import { promoVisibility, type PromoVisibility } from "./promos-visibility";

type SearchParams = Record<string, string | string[] | undefined>;

/**
 * Qué tarjetas del bloque de accesos se pintan en ESTA petición. Se calcula en
 * servidor y baja como prop: el HTML y la hidratación coinciden siempre (ni el
 * reloj del navegador ni OUTXIDIOUS_PHASE, que solo existe en servidor, entran
 * en el render del cliente).
 *
 * connection(): la respuesta depende de la hora, así que la página se pinta en
 * cada petición aunque algún día deje de ser dinámica por otra vía (hoy ya lo
 * es: el layout raíz lee headers()). Sin esto, un prerender congelaría la
 * tarjeta de OUTXIDIOUS para siempre.
 */
export async function getPromoVisibility(searchParams?: Promise<SearchParams>): Promise<PromoVisibility> {
  await connection();
  // Mismo patrón que la landing (loadOutxidiousView) y /empresas: la
  // producción nunca obedece a la URL. En local y en preview, ?phase=despues
  // simula el final de OUTXIDIOUS (la tarjeta sigue a su landing, que no lee
  // ?now=: hora real) y ?now=<ISO con desfase> la hora de la línea de fin de
  // temporada de la tarjeta de empresas, con el mismo reloj que /empresas.
  const isProduction = process.env.VERCEL_ENV === "production";
  const sp = !isProduction && searchParams ? await searchParams : undefined;
  const now = Date.now();
  return promoVisibility({
    now,
    empresasNow: resolveNow({ query: sp?.now, isProduction, realNow: now }),
    envPhase: process.env.OUTXIDIOUS_PHASE,
    queryPhase: sp?.phase ?? null,
  });
}
