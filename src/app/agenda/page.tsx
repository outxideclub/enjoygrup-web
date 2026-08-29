import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Ticket, ExternalLink, CalendarDays, CalendarPlus, Clock, Crown, UtensilsCrossed } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AddToCalendar } from "@/components/ui/add-to-calendar";
import { EventAlertsForm } from "@/components/ui/event-alerts-form";
import { JsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { getUpcomingOutxideEvents } from "@/lib/events.server";
import { buildEventsItemList } from "@/lib/event-jsonld";
import {
  formatEventDate,
  formatEventTime,
  eventTicketUrl,
  extractGenres,
  extractArtists,
  fourVenuesOrgUrl,
} from "@/lib/events";
import { getServerLocale, getServerT } from "@/i18n/server";
import { siteContact, telHref } from "@/lib/site";
import { localizedPath } from "@/i18n/config";

// Los eventos reales de Outxide se obtienen en servidor (revalidate 60): la
// agenda queda en el HTML inicial (crawlable) y sin spinner.
export const revalidate = 60;

const OUTXIDE_LOCATION = "Outxide Club, Av. Tucán 1, 07400 Alcúdia, Mallorca";

export default async function AgendaPage() {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  const events = await getUpcomingOutxideEvents();

  // Programa semanal veraz de los 3 locales (horarios reales; sin inventar noches).
  const venues = [
    {
      key: "enjoy",
      name: "Enjoy Terrace",
      accent: "text-enjoy",
      chip: "bg-enjoy/15 text-enjoy",
      btn: "bg-enjoy text-white hover:bg-enjoy/90",
      icon: Crown,
      schedule: t("agenda.enjoySchedule"),
      cta: t("cta.enjoyReserve"),
      href: telHref(siteContact.general.phone),
      path: "/enjoy",
    },
    {
      key: "outxide",
      name: "Outxide Club",
      accent: "text-outxide",
      chip: "bg-outxide/15 text-outxide",
      btn: "bg-outxide text-black hover:bg-outxide/90",
      icon: CalendarDays,
      schedule: t("agenda.outxideSchedule"),
      cta: t("cta.outxideTickets"),
      href: fourVenuesOrgUrl(locale),
      path: "/outxide",
    },
    {
      key: "hiru",
      name: "Hiru Food & Drinks",
      accent: "text-hiru",
      chip: "bg-hiru/15 text-hiru",
      btn: "bg-hiru text-white hover:bg-hiru/90",
      icon: UtensilsCrossed,
      schedule: t("agenda.hiruSchedule"),
      cta: t("cta.hiruFarewell"),
      href: localizedPath("/hiru#carta", locale),
      path: "/hiru",
    },
  ];

  const eventsLd = events.length > 0 ? buildEventsItemList(events, locale) : null;

  return (
    <div className="noise-texture relative">
      <Navbar />
      <main id="contenido">
        {/* Header */}
        <section className="relative overflow-hidden pt-36 pb-16 bg-[radial-gradient(ellipse_at_50%_0%,rgba(124,58,237,0.18)_0%,transparent_60%)]">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-outxide/70">
              {t("agenda.eyebrow")}
            </p>
            <h1 className="mt-4 font-display text-5xl md:text-6xl font-bold uppercase text-white text-balance">
              {t("agenda.title")}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
              {t("agenda.subtitle")}
            </p>
          </div>
        </section>

        {/* Próximos eventos (Outxide, datos reales) */}
        <section className="relative z-20 py-8 md:py-12">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-outxide" aria-hidden />
                <h2 className="font-display text-2xl md:text-3xl font-bold uppercase text-white">
                  {t("agenda.upcoming")}
                </h2>
              </div>
              {/* Suscripción al calendario COMPLETO: las apps se actualizan solas
                  con cada evento nuevo (feed iCal en /api/calendar). */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarPlus className="h-4 w-4 text-outxide" aria-hidden />
                  {t("agenda.subscribeCalendar")}
                </span>
                <a
                  href="https://calendar.google.com/calendar/r?cid=https%3A%2F%2Fwww.grupoenjoy.es%2Fapi%2Fcalendar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                >
                  Google Calendar
                </a>
                <a
                  href="webcal://www.grupoenjoy.es/api/calendar"
                  className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                >
                  Apple · Outlook
                </a>
              </div>
            </div>

            {events.length === 0 ? (
              <div className="rounded-2xl border border-white/5 bg-white/[0.02] py-16 text-center">
                <p className="mx-auto max-w-md text-muted-foreground">{t("agenda.noEvents")}</p>
                <a
                  href={fourVenuesOrgUrl(locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-outxide px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-outxide/90"
                >
                  <Ticket className="h-4 w-4" />
                  {t("cta.ticketsAll")}
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => {
                  const genres = extractGenres(event);
                  const artists = extractArtists(event);
                  return (
                    <div
                      key={event._id}
                      className="card-hover group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 glass hover:border-outxide/30"
                    >
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <Image
                          src={event.image_url}
                          alt={event.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                        <div className="absolute left-4 top-4 glass rounded-lg px-3 py-1.5">
                          <span className="text-xs font-semibold text-white">
                            {formatEventDate(event.display_date, locale)}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="mb-1 line-clamp-2 text-lg font-bold text-white">{event.name}</h3>
                        {artists && <p className="mb-1 line-clamp-1 text-sm text-outxide">{artists}</p>}
                        <p className="mb-4 text-xs text-muted-foreground">
                          {genres && `${genres} · `}
                          {formatEventTime(event.start_date, locale)}h
                        </p>
                        <div className="mt-auto flex flex-col gap-3">
                          <a
                            href={eventTicketUrl(event, locale)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-magnetic inline-flex w-full items-center justify-center rounded-lg bg-outxide px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-outxide/90"
                          >
                            <Ticket className="mr-2 h-4 w-4" />
                            {t("outxide.buyTicket")}
                            <ExternalLink className="ml-2 h-3.5 w-3.5 opacity-60" />
                          </a>
                          <AddToCalendar
                            event={{
                              title: event.name,
                              start: event.start_date,
                              end: event.end_date,
                              location: OUTXIDE_LOCATION,
                              description: [artists, genres].filter(Boolean).join(" · "),
                              url: eventTicketUrl(event, locale),
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Programa habitual de los 3 locales */}
        <section className="relative z-20 py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10 flex items-center gap-3">
              <Clock className="h-5 w-5 text-white/60" aria-hidden />
              <h2 className="font-display text-2xl md:text-3xl font-bold uppercase text-white">
                {t("agenda.regularProgramme")}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {venues.map((v) => (
                <div
                  key={v.key}
                  className="flex h-full flex-col rounded-2xl border border-white/5 bg-white/[0.03] p-7"
                >
                  <div className={`mb-4 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${v.chip}`}>
                    <v.icon className="h-3.5 w-3.5" aria-hidden />
                    {v.key === "hiru" ? t("hiru.farewellEyebrow") : t("agenda.schedule")}
                  </div>
                  <h3 className={`font-display text-xl font-bold ${v.accent}`}>{v.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.schedule}</p>
                  <div className="mt-6 flex flex-col gap-3">
                    <a
                      href={v.href}
                      {...(v.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${v.btn}`}
                    >
                      {v.cta}
                    </a>
                    <Link
                      href={localizedPath(v.path, locale)}
                      className="inline-flex items-center justify-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {t("agenda.visitVenue")}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Avisos de eventos (captación con doble opt-in) */}
        <section className="relative z-20 pb-24 md:pb-32">
          <div className="mx-auto max-w-6xl px-6">
            <EventAlertsForm />
          </div>
        </section>
      </main>
      <Footer />

      <BreadcrumbJsonLd
        items={[
          { name: "Grupo Enjoy", url: "https://www.grupoenjoy.es" },
          { name: t("agenda.title"), url: `https://www.grupoenjoy.es${localizedPath("/agenda", locale)}` },
        ]}
      />
      {eventsLd && <JsonLd data={eventsLd} />}
    </div>
  );
}
