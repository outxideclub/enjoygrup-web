"use client";

import Image from "next/image";
import { Calendar } from "lucide-react";
import { useT } from "@/i18n";
import { formatEventDate, formatEventTime } from "@/lib/events";
import { formatGenres } from "./format";
import type { NativeCheckoutData, NativeCheckoutEvent } from "./types";

/**
 * Sin `?event`: próximos eventos. Cada tarjeta es un <a> con navegación
 * COMPLETA a `?event={ref}&lang=…` conservando la campaña (fbclid/utm_*), tal
 * como exige el contrato público de la taquilla.
 */
export function EventList({ data }: { data: NativeCheckoutData }) {
  const t = useT();
  const { locale } = data;

  const hrefFor = (ev: NativeCheckoutEvent) => {
    const params = new URLSearchParams({ event: ev.ref, lang: locale });
    for (const [k, v] of Object.entries(data.campaign)) params.set(k, v);
    return `?${params.toString()}`;
  };

  return (
    <div data-testid="event-list" className="p-4 sm:p-6">
      {data.eventNotFound && (
        <p
          role="alert"
          data-testid="event-not-found"
          className="mb-5 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-100"
        >
          {t("checkout.eventNotFound")}
        </p>
      )}
      <h2 className="font-display text-2xl font-bold uppercase text-white">{t("checkout.eventsTitle")}</h2>

      {data.events.length === 0 ? (
        <div className="py-12 text-center">
          <Calendar className="mx-auto mb-4 h-10 w-10 text-muted-foreground" aria-hidden />
          <p className="text-muted-foreground">{t("checkout.eventsEmpty")}</p>
        </div>
      ) : (
        <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.events.map((ev) => {
            const genres = formatGenres(ev.music_genres);
            return (
              <li key={ev.id} className="h-full">
                <a
                  data-testid="event-card"
                  href={hrefFor(ev)}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors hover:border-outxide/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-outxide"
                >
                  <div className="relative aspect-[4/5] w-full max-w-full overflow-hidden">
                    <Image
                      src={ev.image_url}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute left-3 top-3 rounded-lg bg-black/60 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
                      {formatEventDate(ev.start_date, locale)} · {formatEventTime(ev.start_date, locale)}h
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="line-clamp-2 text-base font-bold text-white">{ev.name}</h3>
                    <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span className="rounded-md border border-white/15 px-1.5 py-0.5 text-white/70">
                        {ev.age > 0 && ev.age !== 18 ? `+${ev.age}` : t("checkout.adults")}
                      </span>
                      {genres && <span>{genres}</span>}
                    </p>
                    <span className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-outxide px-5 text-sm font-semibold text-black transition-colors group-hover:bg-outxide/90">
                      {t("checkout.openTickets")}
                    </span>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
