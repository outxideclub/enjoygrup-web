// Helpers PUROS de eventos, seguros para cliente y servidor (no leen env ni
// importan el cliente de FourVenues). Los comparten la página de Outxide y la
// agenda unificada para no duplicar formateo de fechas ni construcción de URLs.
import type { FVEvent } from "@/lib/fourvenues";

export const localeMap: Record<string, string> = {
  es: "es-ES",
  en: "en-GB",
  de: "de-DE",
  fr: "fr-FR",
  it: "it-IT",
};

// Zona horaria del local: sin fijarla, un visitante en UK/Irlanda/Portugal
// vería el día anterior en eventos que empiezan a medianoche hora de Madrid.
export const VENUE_TIMEZONE = "Europe/Madrid";

// URL pública de un evento en FourVenues (formato verificado):
//   https://site.fourvenues.com/{idioma}/outxide-club/events/{slug}
// FourVenues soporta es/en/de/fr/it en el segmento de idioma: el turista
// aterriza en el checkout en SU idioma.
// OJO 1: se enlaza site.fourvenues.com DIRECTAMENTE. El host antiguo
// (web.fourvenues.com) redirige a site. y esa redirección PIERDE la query
// entera (fbclid, utm_*) — verificado el 1-sep-2026 — además de estar tras un
// desafío de Cloudflare más agresivo. Enlazar web. rompería la atribución que
// implementa src/lib/campaign-params.ts.
// OJO 2: event.iframe.tag_url NO sirve como enlace — es una URL para incrustar
// en iframe cuya cadena de redirecciones acaba en un host inválido.
const FOURVENUES_LOCALES = new Set(["es", "en", "de", "fr", "it"]);

export function fourVenuesOrgUrl(locale = "es"): string {
  const l = FOURVENUES_LOCALES.has(locale) ? locale : "en";
  return `https://site.fourvenues.com/${l}/outxide-club`;
}

/** @deprecated Usar fourVenuesOrgUrl(locale) para respetar el idioma del visitante. */
export const FOURVENUES_ORG_URL = fourVenuesOrgUrl("es");

export function formatEventDate(isoDate: string, locale: string): string {
  return new Date(isoDate).toLocaleDateString(localeMap[locale] ?? "es-ES", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: VENUE_TIMEZONE,
  });
}

export function formatEventTime(isoDate: string, locale: string): string {
  return new Date(isoDate).toLocaleTimeString(localeMap[locale] ?? "es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: VENUE_TIMEZONE,
  });
}

// OJO 3: la ruta pública de un evento es `{slug}-{code}`, NO el slug solo.
// Sin el sufijo del código, FourVenues responde 404 (verificado en producción
// el 1-sep-2026: .../events/viernes--outxide-04-09-2026 da 404 y
// .../events/viernes--outxide-04-09-2026-VWTA carga el checkout).
// El código es corto y estable por evento (VWTA, 9WB0, UQ26, IRAG…).
function eventPathSegment(event: FVEvent): string {
  if (!event.slug) return "";
  return event.code ? `${event.slug}-${event.code}` : event.slug;
}

export function eventTicketUrl(event: FVEvent, locale = "es"): string {
  const base = fourVenuesOrgUrl(locale);
  const seg = eventPathSegment(event);
  return seg ? `${base}/events/${seg}` : base;
}

/**
 * Taquilla de entradas (regla del dueño, 1-sep-2026): TODO el tráfico de compra
 * de la web va al subdominio entradas.grupoenjoy.es, que sirve la taquilla
 * embebida (src/proxy.ts la enruta). ?event abre un evento concreto y ?lang
 * conserva el idioma del visitante (el consentimiento de cookies también viaja:
 * cookie compartida de dominio raíz en src/lib/consent.ts).
 * Excepción a la regla: las salidas de emergencia a Fourvenues por si el
 * iframe no funciona.
 */
export const TICKETS_HOST = "entradas.grupoenjoy.es";

export function eventCheckoutUrl(event?: FVEvent, locale = "es"): string {
  const u = new URL(`https://${TICKETS_HOST}/`);
  const seg = event ? eventPathSegment(event) : "";
  if (seg) u.searchParams.set("event", seg);
  // SIEMPRE, también para "es": la cookie de idioma es host-only y el
  // subdominio renegociaría por Accept-Language sin este parámetro.
  if (FOURVENUES_LOCALES.has(locale)) u.searchParams.set("lang", locale);
  return u.toString();
}

export function extractGenres(event: FVEvent): string {
  // La respuesta de FourVenues es externa y sin validar: un evento puede venir
  // sin music_genres/artists (o null). Sin la guarda, un solo registro tira /agenda.
  if (Array.isArray(event.music_genres) && event.music_genres.length > 0) {
    return event.music_genres
      .map((g) => g.charAt(0).toUpperCase() + g.slice(1))
      .join(" / ");
  }
  return "";
}

export function extractArtists(event: FVEvent): string {
  if (Array.isArray(event.artists) && event.artists.length > 0) {
    return event.artists.map((a) => (typeof a === "string" ? a : a.name)).join(", ");
  }
  return "";
}
