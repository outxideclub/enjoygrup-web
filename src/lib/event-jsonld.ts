import type { FVEvent } from "@/lib/fourvenues";
import { eventCheckoutUrl } from "@/lib/events";

// ÚNICA fuente de verdad del markup de eventos: los eventos REALES de
// FourVenues. Lo comparten /agenda y /outxide para no emitir datos
// contradictorios ni eventos sintéticos (riesgo de información engañosa,
// LCD art. 5/7, y de acción manual de Google por markup no fiel).
// Las URL de evento y de oferta van a la taquilla (regla del dueño: TODO el
// tráfico de compra entra por entradas.grupoenjoy.es, también desde Google).

export function buildEventsItemList(events: FVEvent[], locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Agenda Grupo Enjoy",
    itemListElement: events.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Event",
        name: e.name,
        startDate: e.start_date,
        endDate: e.end_date,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        image: e.image_url,
        url: eventCheckoutUrl(e, locale),
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
        offers: {
          "@type": "Offer",
          url: eventCheckoutUrl(e, locale),
          availability: "https://schema.org/InStock",
        },
        organizer: {
          "@type": "Organization",
          name: "Outxide Club",
          url: "https://www.grupoenjoy.es/outxide",
        },
      },
    })),
  };
}
