import "server-only";

import { connection } from "next/server";
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
  // Mismo patrón que la landing (loadOutxidiousView): la producción nunca
  // obedece a la URL; en local y en preview, ?phase=despues simula el final.
  const isProduction = process.env.VERCEL_ENV === "production";
  const queryPhase = !isProduction && searchParams ? (await searchParams).phase : null;
  return promoVisibility({
    now: Date.now(),
    envPhase: process.env.OUTXIDIOUS_PHASE,
    queryPhase,
  });
}
