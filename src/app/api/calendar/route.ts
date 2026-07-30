import { NextResponse } from "next/server";
import { getUpcomingOutxideEvents } from "@/lib/events.server";
import { eventTicketUrl, extractArtists, extractGenres } from "@/lib/events";
import { buildIcsFeed } from "@/lib/ics";

// Feed iCalendar POR SUSCRIPCIÓN con todos los próximos eventos (FourVenues).
// Google Calendar ("añadir por URL"), Apple Calendar y Outlook (webcal://) se
// suscriben a esta URL y se actualizan solos cuando se publican eventos nuevos.
// El fetch upstream ya revalida cada 60 s; el CDN cachea el feed 1 h.

const OUTXIDE_LOCATION = "Outxide Club, Av. Tucán 1, 07400 Alcúdia, Mallorca";

export async function GET() {
  const events = await getUpcomingOutxideEvents();

  const feed = buildIcsFeed(
    events.map((e) => ({
      // UID estable por evento (id de FourVenues): las apps actualizan la
      // entrada existente en vez de duplicarla si el evento cambia.
      uid: `${e._id}@grupoenjoy.es`,
      event: {
        title: e.name,
        start: e.start_date,
        end: e.end_date,
        location: OUTXIDE_LOCATION,
        description: [extractArtists(e), extractGenres(e)].filter(Boolean).join(" · "),
        url: eventTicketUrl(e),
      },
    })),
  );

  return new NextResponse(feed, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'inline; filename="grupo-enjoy-agenda.ics"',
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
