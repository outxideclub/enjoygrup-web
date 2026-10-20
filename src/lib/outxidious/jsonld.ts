// JSON-LD de la landing de OUTXIDIOUS. PURO (sin env ni fetch).
//
// Solo se emite cuando el evento EXISTE en Fourvenues (principio del repo, ver
// src/lib/event-jsonld.ts: nada de eventos sintéticos), con NUESTRO nombre y
// NUESTRA descripción —nunca las del panel, que pueden traer 🍭 o alcohol—, el
// precio con gastos (el total que se paga, mismo cálculo que la taquilla) y
// disponibilidad InStock (nunca LimitedAvailability: regla del dueño, jamás se
// comunica stock). Es el ÚNICO marcado de la página: el ItemList con todos los
// eventos del club vive en /outxide (page.tsx), no en su layout.
//
// Evento COMPARTIDO (19-oct-2026): el Event a la venta es el de OUTXIDE
// (23:00–05:30, con la oferta de Fourvenues). El TARDEO de acceso libre en
// Enjoy Terrace (20:00–23:00) va SOLO en la descripción, NO como subEvent ni
// como Event aparte, por coherencia:
// - schema.org define subEvent como una parte del evento; el tardeo empieza
//   antes que OUTXIDE y en otro local, así que colgarlo del Event de OUTXIDE
//   afirmaría algo falso (un subEvent fuera del horario de su evento).
// - Principio del repo (src/lib/event-jsonld.ts): en el marcado solo eventos
//   REALES de Fourvenues, nunca sintéticos. El tardeo no existe en Fourvenues
//   (ni ficha ni entrada): sería un nodo Event escrito a mano.
// - /outxide y /agenda publican este mismo evento de Fourvenues como UN Event
//   en Outxide Club dentro de su ItemList; un segundo nodo Event (gratis, en
//   Enjoy Terrace) para la misma noche abriría una contradicción entre páginas.
// - El paquete creativo de META ADS pide lo mismo: el tardeo sin offers y sin
//   ser un evento aparte. Desde la v0.4 el +18 vale para las dos partes
//   (typicalAgeRange "18-" sigue siendo veraz).
// OUTXIDIOUS es de los DOS sitios (COPYS.md §0.3 y paquete v0.3: «nunca el
// Halloween de OUTXIDE»): la descripción lo presenta como el Halloween de Enjoy
// Terrace y OUTXIDE y el organizador son los dos locales (revisión F10). El
// lugar sigue siendo Outxide Club porque el Event marcado es la parte con
// entrada.
// Sin performer: el line-up está confirmado (Sergi, 20-oct), pero Fourvenues
// no tiene campo de artistas (solo una línea en la descripción del panel), y
// en el marcado solo va lo que trae el evento real.

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
    organizer: [
      { "@type": "Organization", name: "Enjoy Terrace", url: `${SITE}/enjoy` },
      { "@type": "Organization", name: "Outxide Club", url: `${SITE}/outxide` },
    ],
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
