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

/** Contenido de un fichero .ics (una sola VEVENT). */
export function buildIcsContent(evt: CalendarEvent): string {
  const description = [evt.description, evt.url].filter(Boolean).join("\n\n");
  // UID estable a partir del título + inicio (sin depender de random, para SSR).
  const uid = `${toUtcStamp(evt.start)}-${evt.title.replace(/\s+/g, "-").toLowerCase()}@grupoenjoy.es`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Grupo Enjoy//Agenda//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toUtcStamp(evt.start)}`,
    `DTSTART:${toUtcStamp(evt.start)}`,
    `DTEND:${toUtcStamp(resolveEnd(evt))}`,
    `SUMMARY:${escapeIcsText(evt.title)}`,
    description ? `DESCRIPTION:${escapeIcsText(description)}` : "",
    evt.location ? `LOCATION:${escapeIcsText(evt.location)}` : "",
    evt.url ? `URL:${evt.url}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);
  // RFC 5545: líneas separadas por CRLF.
  return lines.join("\r\n");
}
