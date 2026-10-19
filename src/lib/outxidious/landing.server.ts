import "server-only";

import { cache } from "react";
import { FourVenuesClient, type FVEvent } from "@/lib/fourvenues";
import type { FVTicketRate } from "@/lib/fourvenues/types";
import { getUpcomingOutxideEvents } from "@/lib/events.server";
import { eventCheckoutUrl, formatEventTime } from "@/lib/events";
import { formatEur } from "@/lib/fourvenues/pricing";
import type { Locale } from "@/i18n/config";
import {
  DEFAULT_END_TIME,
  DEFAULT_START_TIME,
  asEnvPhase,
  asQueryPhase,
  findOutxidiousEvent,
  priceFromWithFees,
  resolvePhase,
  sellableRates,
  type LandingPhase,
} from "./event-config";

// Datos de la landing de OUTXIDIOUS resueltos en SERVIDOR por petición, con la
// caché que ya tiene el cliente de Fourvenues (eventos 60 s, tarifas 30 s): en
// cuanto la sesión de Fourvenues publique el evento, la página lo encuentra sola
// en menos de un minuto, sin redeploy.
//
// Todo lo que sale de aquí acaba en el HTML/RSC, así que se PROYECTA: ni el
// nombre ni la descripción del evento del panel, ni nombres de tarifa, ni
// «includes», ni cifras de stock (los nombres del panel traen 🍭 y «COPA +
// CHUPITO»: la página de destino de un anuncio con alcohol no puede llevarlos
// ni escondidos en el payload). Solo fechas, la URL de la taquilla y un precio.

export interface OutxidiousView {
  phase: LandingPhase;
  today: boolean;
  /** Taquilla con el evento abierto (absoluta). Solo en «venta». */
  checkoutUrl: string | null;
  /** «12,96 €» / «€12.96», gastos incluidos. Solo en «venta». */
  priceFromLabel: string | null;
  /** Mismo precio como número (JSON-LD). Solo en «venta». */
  priceFromValue: number | null;
  /** Horario en Madrid ("23:00"): del evento si existe, si no el de los anuncios. */
  startTime: string;
  endTime: string;
  /** Lo mínimo del evento real para el JSON-LD; null mientras no exista. */
  event: { startDate: string; endDate: string; ticketUrl: string; validFrom: string | null } | null;
}

async function loadRates(event: FVEvent): Promise<FVTicketRate[]> {
  try {
    const rates = await new FourVenuesClient().getTicketRates(event._id);
    return Array.isArray(rates) ? rates : [];
  } catch {
    // Sin clave o Fourvenues caído: sin tarifas = «pronto», nunca una página rota.
    return [];
  }
}

/**
 * Evento + precio «desde» de ESTA petición. cache(): generateMetadata y la
 * página comparten la misma consulta dentro de una petición.
 */
const loadEventData = cache(async () => {
  const now = Date.now();
  const events = await getUpcomingOutxideEvents();
  const event = findOutxidiousEvent(events, process.env.OUTXIDIOUS_EVENT_REF);
  const sellable = event ? sellableRates(await loadRates(event), now) : [];
  const validFrom =
    sellable
      .map((r) => r.valid_from)
      .filter((v): v is string => typeof v === "string" && !Number.isNaN(Date.parse(v)))
      .sort((a, b) => Date.parse(a) - Date.parse(b))[0] ?? null;
  return { now, event, priceFrom: priceFromWithFees(sellable), validFrom };
});

/** Horario mostrado: el del evento real en Madrid o, si aún no existe, el de los anuncios. */
export async function loadOutxidiousTimes(): Promise<{ startTime: string; endTime: string }> {
  const { event } = await loadEventData();
  return {
    // es-ES con hora de 2 dígitos: "23:00" / "05:30" en todos los idiomas.
    startTime: event ? formatEventTime(event.start_date, "es") : DEFAULT_START_TIME,
    endTime: event ? formatEventTime(event.end_date, "es") : DEFAULT_END_TIME,
  };
}

export async function loadOutxidiousView(opts: {
  locale: Locale;
  queryPhase: string | string[] | undefined;
}): Promise<OutxidiousView> {
  const { now, event, priceFrom, validFrom } = await loadEventData();

  // Mismo patrón que resolveCheckoutEngine: la venta real nunca obedece a la URL.
  const isProduction = process.env.VERCEL_ENV === "production";
  const { phase, today } = resolvePhase({
    now,
    canSell: Boolean(event) && priceFrom !== null,
    envPhase: asEnvPhase(process.env.OUTXIDIOUS_PHASE),
    queryPhase: isProduction ? null : asQueryPhase(opts.queryPhase),
  });

  const checkoutUrl = event ? eventCheckoutUrl(event, opts.locale) : null;
  const selling = phase === "venta" && checkoutUrl !== null && priceFrom !== null;
  const { startTime, endTime } = await loadOutxidiousTimes();

  return {
    phase,
    today,
    checkoutUrl: selling ? checkoutUrl : null,
    priceFromLabel: selling ? formatEur(priceFrom, opts.locale) : null,
    priceFromValue: selling ? priceFrom : null,
    startTime,
    endTime,
    event:
      event && checkoutUrl
        ? { startDate: event.start_date, endDate: event.end_date, ticketUrl: checkoutUrl, validFrom }
        : null,
  };
}
