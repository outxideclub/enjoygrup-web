"use client";

import Image from "next/image";
import { Calendar } from "lucide-react";
import { useT } from "@/i18n";
import { formatEventDate, formatEventTime } from "@/lib/events";
import { formatGenres } from "./format";
import type { NativeCheckoutEvent } from "./types";

/** Cabecera del evento elegido: flyer, nombre, fecha/hora y +18. */
export function EventHeader({ event, locale }: { event: NativeCheckoutEvent; locale: string }) {
  const t = useT();
  const genres = formatGenres(event.music_genres);
  return (
    <div data-testid="event-header" className="flex items-center gap-4 border-b border-white/10 p-4 sm:p-6">
      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-white/5">
        <Image src={event.image_url} alt="" fill sizes="80px" className="object-cover" priority />
      </div>
      <div className="min-w-0">
        <h2 className="font-display text-xl font-bold uppercase leading-tight text-white sm:text-2xl">
          {event.name}
        </h2>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 shrink-0 text-outxide" aria-hidden />
          <span>
            {formatEventDate(event.start_date, locale)} · {formatEventTime(event.start_date, locale)}h
          </span>
        </p>
        <p className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span className="rounded-md border border-white/15 px-1.5 py-0.5 text-white/70">
            {event.age > 0 && event.age !== 18 ? `+${event.age}` : t("checkout.adults")}
          </span>
          {genres && <span>{genres}</span>}
        </p>
      </div>
    </div>
  );
}
