"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarPlus, ChevronDown } from "lucide-react";
import { buildGoogleCalendarUrl, buildIcsContent, type CalendarEvent } from "@/lib/ics";
import { useT } from "@/i18n";
import { cn } from "@/lib/utils";

// Botón "Añadir al calendario" con menú: Google Calendar (enlace) y descarga
// .ics (Apple/Outlook) generada en el navegador vía Blob del propio origen
// (permitido por la CSP default-src 'self'). Reutilizable en tarjetas de evento.
export function AddToCalendar({
  event,
  className,
}: {
  event: CalendarEvent;
  className?: string;
}) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const downloadIcs = () => {
    const blob = new Blob([buildIcsContent(event)], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${event.title.replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-+|-+$/g, "").toLowerCase() || "evento"}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    // Diferir la revocación: en iOS/WebKit revocar en la misma tarea puede
    // cancelar la descarga antes de que el navegador lea el Blob.
    setTimeout(() => URL.revokeObjectURL(url), 0);
    setOpen(false);
  };

  return (
    <div ref={ref} className={className}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/15 px-3 py-2 text-xs font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
      >
        <CalendarPlus className="h-4 w-4" aria-hidden />
        {t("cta.addToCalendar")}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} aria-hidden />
      </button>
      {/* Opciones EN FLUJO (no absolute): las tarjetas de evento recortan con
          overflow-hidden cualquier menú flotante, así que al abrir se expande
          dentro de la tarjeta empujando el contenido — nada que recortar. */}
      {open && (
        <div className="mt-2 overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] animate-in fade-in slide-in-from-top-1 duration-150">
          <a
            href={buildGoogleCalendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-center text-xs font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
          >
            {t("cta.googleCalendar")}
          </a>
          <div className="mx-3 border-t border-white/10" aria-hidden />
          <button
            type="button"
            onClick={downloadIcs}
            className="block w-full px-4 py-2.5 text-center text-xs font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
          >
            {t("cta.icsCalendar")}
          </button>
        </div>
      )}
    </div>
  );
}
