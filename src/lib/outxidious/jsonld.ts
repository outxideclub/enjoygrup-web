// JSON-LD de la landing de OUTXIDIOUS. PURO (sin env ni fetch).
//
// Solo se emite cuando el evento EXISTE en Fourvenues (principio del repo, ver
// src/lib/event-jsonld.ts: nada de eventos sintéticos), con NUESTRO nombre y
// NUESTRA descripción —nunca las del panel, que pueden traer 🍭 o alcohol—, el
// precio con gastos (el total que se paga, mismo cálculo que la taquilla) y
// disponibilidad InStock (nunca LimitedAvailability: regla del dueño, jamás se
// comunica stock). Es el ÚNICO marcado de la página: el ItemList con todos los
// eventos del club vive en /outxide (page.tsx), no en su layout.

import { VENUE_TIMEZONE } from "@/lib/events";

const SITE = "https://www.grupoenjoy.es";

/** ISO con el desfase de Madrid ("2026-10-31T23:00:00+01:00") en vez de UTC. */
export function toMadridIso(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: VENUE_TIMEZONE,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
      timeZoneName: "longOffset",
    })
      .formatToParts(d)
      .map((p) => [p.type, p.value]),
  );
  // "GMT+01:00" → "+01:00" ("GMT" a secas = UTC).
  const offset = String(parts.timeZoneName ?? "").replace("GMT", "") || "+00:00";
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}${offset}`;
}

export interface OutxidiousJsonLdInput {
  name: string;
  description: string;
  locale: string;
  pageUrl: string;
  /** Ruta de public/ o URL absoluta de la imagen (la misma que og:image). */
  image: string;
  startDate: string;
  endDate: string;
  /** Solo en venta: precio con gastos y URL de la taquilla con el evento. */
  offer: { price: number; url: string; validFrom: string | null } | null;
}

export function buildOutxidiousEventJsonLd(input: OutxidiousJsonLdInput) {
  const image = input.image.startsWith("/") ? `${SITE}${input.image}` : input.image;
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: input.name,
    description: input.description,
    startDate: toMadridIso(input.startDate),
    endDate: toMadridIso(input.endDate),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    inLanguage: input.locale,
    typicalAgeRange: "18-",
    isAccessibleForFree: false,
    image: [image],
    url: input.pageUrl,
    location: {
      "@type": "Place",
      name: "Outxide Club",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. Tucán 1",
        addressLocality: "Alcúdia",
        postalCode: "07400",
        addressRegion: "Illes Balears",
        addressCountry: "ES",
      },
    },
    organizer: { "@type": "Organization", name: "Outxide Club", url: `${SITE}/outxide` },
    ...(input.offer
      ? {
          offers: {
            "@type": "Offer",
            url: input.offer.url,
            price: input.offer.price.toFixed(2),
            priceCurrency: "EUR",
            availability: "https://schema.org/InStock",
            ...(input.offer.validFrom ? { validFrom: toMadridIso(input.offer.validFrom) } : {}),
          },
        }
      : {}),
  };
}
