// Generación de enlaces "añadir al calendario" sin dependencias externas:
// una URL de Google Calendar y un fichero .ics (VEVENT) descargable. Pensado
// para reutilizarse desde cualquier tarjeta de evento (Outxide, agenda).

export interface CalendarEvent {
  title: string;
  /** ISO 8601 (con o sin offset). */
  start: string;
  /** ISO 8601. Si no es válida, se asume start + 4 h. */
  end?: string;
  location?: string;
  description?: string;
  /** URL pública del evento (se añade a la descripción del .ics/Google). */
  url?: string;
}

/** Convierte una fecha ISO a UTC en formato ICS: YYYYMMDDTHHMMSSZ. */
function toUtcStamp(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function resolveEnd(evt: CalendarEvent): string {
  if (evt.end && !Number.isNaN(new Date(evt.end).getTime())) return evt.end;
  return new Date(new Date(evt.start).getTime() + 4 * 60 * 60 * 1000).toISOString();
}

/** Escapa texto para valores de propiedad ICS (RFC 5545). */
function escapeIcsText(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/** Enlace a Google Calendar (acción TEMPLATE) para añadir el evento. */
export function buildGoogleCalendarUrl(evt: CalendarEvent): string {
  const details = [evt.description, evt.url].filter(Boolean).join("\n\n");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: evt.title,
    dates: `${toUtcStamp(evt.start)}/${toUtcStamp(resolveEnd(evt))}`,
  });
  if (details) params.set("details", details);
  if (evt.location) params.set("location", evt.location);
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Líneas VEVENT de un evento (compartidas por el .ics suelto y el feed). */
function icsEventLines(evt: CalendarEvent, uid?: string): string[] {
  const description = [evt.description, evt.url].filter(Boolean).join("\n\n");
  // UID estable (sin random, para SSR): si el evento trae id propio se usa ese
  // — clave en el feed de suscripción para que las apps actualicen en vez de duplicar.
  const stableUid =
    uid ?? `${toUtcStamp(evt.start)}-${evt.title.replace(/\s+/g, "-").toLowerCase()}@grupoenjoy.es`;
  return [
    "BEGIN:VEVENT",
    `UID:${stableUid}`,
    `DTSTAMP:${toUtcStamp(evt.start)}`,
    `DTSTART:${toUtcStamp(evt.start)}`,
    `DTEND:${toUtcStamp(resolveEnd(evt))}`,
    `SUMMARY:${escapeIcsText(evt.title)}`,
    description ? `DESCRIPTION:${escapeIcsText(description)}` : "",
    evt.location ? `LOCATION:${escapeIcsText(evt.location)}` : "",
    evt.url ? `URL:${evt.url}` : "",
    "END:VEVENT",
  ].filter(Boolean);
}

/** Contenido de un fichero .ics (una sola VEVENT). */
export function buildIcsContent(evt: CalendarEvent): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Grupo Enjoy//Agenda//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...icsEventLines(evt),
    "END:VCALENDAR",
  ];
  // RFC 5545: líneas separadas por CRLF.
  return lines.join("\r\n");
}

/**
 * Feed iCalendar COMPLETO por suscripción (webcal/Google "añadir por URL"):
 * todos los eventos en un solo VCALENDAR con nombre y sugerencia de refresco.
 * Las apps de calendario que se suscriben a la URL se actualizan solas cuando
 * se publican eventos nuevos.
 */
export function buildIcsFeed(
  events: { event: CalendarEvent; uid: string }[],
  name = "Grupo Enjoy — Agenda",
): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Grupo Enjoy//Agenda//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${escapeIcsText(name)}`,
    "X-WR-TIMEZONE:Europe/Madrid",
    // Sugerencia de refresco para las apps que la respetan (Outlook, Apple).
    "REFRESH-INTERVAL;VALUE=DURATION:PT12H",
    "X-PUBLISHED-TTL:PT12H",
    ...events.flatMap(({ event, uid }) => icsEventLines(event, uid)),
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}
