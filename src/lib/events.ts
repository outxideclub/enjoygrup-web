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
//   https://web.fourvenues.com/{idioma}/outxide-club/events/{slug}
// FourVenues soporta es/en/de/fr/it en el segmento de idioma (verificado /en y
// /de en producción): el turista aterriza en el checkout en SU idioma.
// OJO: event.iframe.tag_url NO sirve como enlace — es una URL para incrustar
// en iframe cuya cadena de redirecciones acaba en un host inválido.
const FOURVENUES_LOCALES = new Set(["es", "en", "de", "fr", "it"]);

export function fourVenuesOrgUrl(locale = "es"): string {
  const l = FOURVENUES_LOCALES.has(locale) ? locale : "en";
  return `https://web.fourvenues.com/${l}/outxide-club`;
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

export function eventTicketUrl(event: FVEvent, locale = "es"): string {
  const base = fourVenuesOrgUrl(locale);
  return event.slug ? `${base}/events/${event.slug}` : base;
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
