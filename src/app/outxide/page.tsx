"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Ticket,
  Clock,
  MapPin,
  ExternalLink,
  Users,
  X,
  Loader2,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";
import { OutxideLogo } from "@/components/ui/logos";
import { LaserBeams } from "@/components/ui/laser-beams";
import { ParticleBackground } from "@/components/ui/particle-background";
import { EventTicketTabs } from "@/components/outxide/event-ticket-tabs";
import type { FVEvent } from "@/lib/fourvenues";
import { useT, useLocale } from "@/i18n";
import { useRef, useState, useEffect, useCallback } from "react";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const localeMap = { es: "es-ES", en: "en-GB" } as const;

function formatDate(isoDate: string, locale: string) {
  return new Date(isoDate).toLocaleDateString(localeMap[locale as keyof typeof localeMap] ?? "es-ES", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function formatTime(isoDate: string, locale: string) {
  return new Date(isoDate).toLocaleTimeString(localeMap[locale as keyof typeof localeMap] ?? "es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Madrid",
  });
}

function extractGenres(event: FVEvent): string {
  if (event.music_genres.length > 0) {
    return event.music_genres
      .map((g) => g.charAt(0).toUpperCase() + g.slice(1))
      .join(" / ");
  }
  return "";
}

function extractArtists(event: FVEvent): string {
  if (event.artists.length > 0) {
    return event.artists.map((a) => (typeof a === "string" ? a : a.name)).join(", ");
  }
  return "";
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

interface GalleryImage { src: string; alt: string; }

export default function OutxidePage() {
  const t = useT();
  const locale = useLocale();
  const [events, setEvents] = useState<FVEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<FVEvent | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoReady = useCallback(() => {
    setVideoReady(true);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (v && v.readyState >= 3) handleVideoReady();
  }, [handleVideoReady]);

  const containerRef = useRef<HTMLDivElement>(null);
  const ticketSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Fetch events + gallery
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/fourvenues/events");
        if (!res.ok) throw new Error();
        const json = await res.json();
        const now = new Date();
        const visible = (json.data ?? []).filter(
          (e: FVEvent) =>
            e.image_url && new Date(e.end_date) >= now,
        );
        setEvents(visible);
      } catch {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }
    load();
    fetch("/api/gallery/outxide").then(r => r.json()).then(setGalleryImages).catch(() => {});
  }, []);

  // Scroll to ticket section
  useEffect(() => {
    if (selectedEvent && ticketSectionRef.current) {
      ticketSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [selectedEvent]);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden perspective-1000">
        <motion.div style={{ y, rotateX }} className="absolute inset-0">
          {/* Poster — visible instantly, fades out when video is ready */}
          <img
            src="/videos/outxide-hero-poster.jpg"
            alt=""
            aria-hidden
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${videoReady ? "opacity-0" : "opacity-100"}`}
          />
          {/* Video — loads in background, fades in when canplaythrough */}
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlayThrough={handleVideoReady}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${videoReady ? "opacity-100" : "opacity-0"}`}
          >
            <source src="/videos/outxide-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.25),transparent_60%)]" />
          <LaserBeams />
          <ParticleBackground color="#06b6d4" count={80} className="opacity-30" />
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("common.backToGroup")}
            </Link>
            <div className="flex items-center justify-center mb-6">
              <motion.div
                initial={{ scale: 0.5, rotateY: 180, opacity: 0 }}
                animate={{ scale: 1, rotateY: 0, opacity: 1 }}
                transition={{ duration: 1.5, type: "spring", stiffness: 50 }}
              >
                <OutxideLogo className="h-64 md:h-80 w-auto" />
              </motion.div>
            </div>
            <h1 className="sr-only">Outxide Club</h1>
            <p className="mt-2 text-lg tracking-[0.2em] text-outxide/80 uppercase font-bold drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
              {t("outxide.tagline")}
            </p>
            <p className="mt-3 max-w-lg mx-auto text-muted-foreground">
              {t("outxide.description")}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Info bar */}
      <section className="relative z-20 border-y border-white/5 bg-background/80 backdrop-blur-md">
        <div className="mx-auto max-w-4xl px-6 py-6 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-outxide" />
            <span>{t("outxide.hours")}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-outxide" />
            <span>{t("outxide.address")}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-outxide" />
            <span>+21</span>
          </div>
          <Link
            href="/hiru"
            className="flex items-center gap-2 text-outxide hover:text-outxide/80 transition-colors"
          >
            <ArrowRight className="h-4 w-4" />
            <span>{t("outxide.dinnerHiru")}</span>
          </Link>
        </div>
      </section>

      {/* Events */}
      <section id="eventos" className="relative z-20 py-24 md:py-32 bg-background">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-bold tracking-[0.2em] text-outxide/60 uppercase mb-4">
                {t("outxide.eventsCalendar")}
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white uppercase">
                {t("outxide.eventsTitle")}
              </h2>
            </div>
          </ScrollReveal>

          {loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 text-outxide animate-spin" />
            </div>
          )}

          {!loading && events.length === 0 && (
            <div className="text-center py-20">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                {t("outxide.noEvents")}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, i) => {
              const isSelected = selectedEvent?._id === event._id;
              const genres = extractGenres(event);
              const artists = extractArtists(event);

              return (
                <ScrollReveal key={event._id} delay={i * 0.05} className="h-full">
                  <div className={`group relative overflow-hidden rounded-2xl border glass transition-all duration-500 flex flex-col h-full ${
                    isSelected
                      ? "border-outxide/50 shadow-[0_0_30px_rgba(6,182,212,0.15)]"
                      : "border-white/5 hover:border-outxide/30"
                  }`}>
                    {/* Flyer */}
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={event.image_url}
                        alt={event.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                      <div className="absolute top-4 left-4 glass rounded-lg px-3 py-1.5">
                        <span className="text-xs font-semibold text-white">
                          {formatDate(event.display_date, locale)}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">
                        {event.name}
                      </h3>
                      {artists && (
                        <p className="text-sm text-outxide mb-1 line-clamp-1">
                          {artists}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground mb-4">
                        {genres && `${genres} · `}
                        {formatTime(event.start_date, locale)}h
                      </p>

                      <Button
                        size="sm"
                        className={`w-full rounded-lg text-white mt-auto ${
                          isSelected
                            ? "bg-outxide/60"
                            : "bg-outxide hover:bg-outxide/80"
                        }`}
                        onClick={() =>
                          setSelectedEvent(isSelected ? null : event)
                        }
                      >
                        <Ticket className="h-4 w-4 mr-2" />
                        {isSelected ? t("common.close") : t("outxide.buyTicket")}
                      </Button>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Inline Ticket Purchase Section */}
          <AnimatePresence>
            {selectedEvent && (
              <motion.div
                ref={ticketSectionRef}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-12 rounded-3xl border border-outxide/20 bg-zinc-950/50 backdrop-blur-xl p-6 md:p-10">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {selectedEvent.name}
                      </h3>
                      <p className="text-sm text-outxide mt-1">
                        {formatDate(selectedEvent.display_date, locale)} · {formatTime(selectedEvent.start_date, locale)}h
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedEvent(null)}
                      className="p-2 rounded-full hover:bg-white/10 transition-colors"
                      aria-label="Cerrar sección de entradas"
                    >
                      <X className="h-6 w-6 text-white" />
                    </button>
                  </div>

                  <EventTicketTabs eventId={selectedEvent._id} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <ScrollReveal>
            <div className="mt-12 text-center">
              <a
                href="https://web.fourvenues.com/es/outxide-club"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 glass rounded-full px-6 py-3 hover:border-outxide/30 transition-colors"
              >
                <Calendar className="h-4 w-4 text-outxide" />
                <span className="text-sm text-muted-foreground">
                  {t("outxide.eventsVia")}{" "}
                  <span className="text-white font-medium">FourVenues</span>
                </span>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <section className="py-24 md:py-32 relative z-20 bg-background">
          <div className="mx-auto max-w-6xl px-6">
            <ScrollReveal>
              <div className="text-center mb-16">
                <p className="text-sm font-bold tracking-[0.2em] text-outxide/60 uppercase mb-4">
                  {t("common.gallery")}
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white uppercase">
                  {t("outxide.galleryTitle")}
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryImages.map((img, i) => (
                <ScrollReveal key={i} delay={i * 0.05}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="group relative overflow-hidden rounded-xl aspect-[3/2]"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
