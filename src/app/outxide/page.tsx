"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Ticket,
  Clock,
  MapPin,
  ExternalLink,
  Users,
  Loader2,
  Crown,
  Wine,
  Sofa,
  Star,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";
import { OutxideLogo } from "@/components/ui/logos";
import { GalleryLightbox } from "@/components/ui/gallery-lightbox";
import dynamic from "next/dynamic";
import outxideGallery from "../../../data/gallery/outxide.json";

const LaserBeams = dynamic(() => import("@/components/ui/laser-beams").then(m => ({ default: m.LaserBeams })), { ssr: false });
const ParticleBackground = dynamic(() => import("@/components/ui/particle-background").then(m => ({ default: m.ParticleBackground })), { ssr: false });
const AmbientGlow = dynamic(() => import("@/components/ui/ambient-glow").then(m => ({ default: m.AmbientGlow })), { ssr: false });
import type { FVEvent } from "@/lib/fourvenues";
import { useT, useLocale } from "@/i18n";
import { useRef, useState, useEffect, useCallback } from "react";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const localeMap: Record<string, string> = {
  es: "es-ES",
  en: "en-GB",
  de: "de-DE",
  fr: "fr-FR",
  it: "it-IT",
};

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

const galleryImages = outxideGallery as GalleryImage[];

export default function OutxidePage() {
  const t = useT();
  const locale = useLocale();
  const [events, setEvents] = useState<FVEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const [videoReady, setVideoReady] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);
  const [isFirstMount, setIsFirstMount] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoReady = useCallback(() => {
    setVideoReady(true);
  }, []);

  useEffect(() => {
    setIsFirstMount(false);
    document.querySelectorAll('[data-hero]').forEach(el => el.removeAttribute('data-hero'));
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => setLoadVideo(true), 800);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (v && v.readyState >= 3) handleVideoReady();
  }, [handleVideoReady, loadVideo]);

  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yRaw = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const rotateXRaw = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const opacityRaw = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = prefersReduced ? "0%" : yRaw;
  const rotateX = prefersReduced ? 0 : rotateXRaw;
  const opacity = prefersReduced ? 1 : opacityRaw;

  // Events stay live; gallery is bundled so it renders immediately.
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
  }, []);


  return (
    <div className="noise-texture relative">
      <AmbientGlow venue="outxide" />
      <LaserBeams />
      <Navbar />
      <main>
      <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden perspective-1000">
        <motion.div style={{ y, rotateX }} className="absolute inset-0">
          {/* Poster — visible instantly, fades out when video is ready */}
          <Image
            src="/videos/outxide-hero-poster.jpg"
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className={`object-cover transition-opacity duration-1000 ${videoReady ? "opacity-0" : "opacity-100"}`}
          />
          {/* Video — loads in background, fades in when canplaythrough */}
          <video
            key={loadVideo ? "outxide-video" : "outxide-poster"}
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            poster="/videos/outxide-hero-poster.jpg"
            preload="none"
            onLoadedData={handleVideoReady}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${videoReady ? "opacity-100" : "opacity-0"}`}
          >
            {loadVideo && <source src="/videos/outxide-hero.mp4" type="video/mp4" />}
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.25),transparent_60%)]" />
          <ParticleBackground color="#06b6d4" count={80} className="opacity-30" />
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        >
          <motion.div
            data-hero
            initial={isFirstMount ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isFirstMount ? 0 : 1 }}
          >
            <Link
              href="/"
              className="link-underline inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("common.backToGroup")}
            </Link>
            <div className="flex items-center justify-center mb-6">
              <motion.div
                data-hero
                initial={isFirstMount ? false : { scale: 0.5, rotateY: 180, opacity: 0 }}
                animate={{ scale: 1, rotateY: 0, opacity: 1 }}
                transition={{ duration: isFirstMount ? 0 : 1.5, type: "spring", stiffness: 50 }}
              >
                <OutxideLogo className="h-64 md:h-80 w-auto" />
              </motion.div>
            </div>
            <h1 className="sr-only">{t("outxide.h1")}</h1>
            <p className="mt-2 text-lg tracking-[0.2em] text-outxide/80 uppercase font-bold drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]">
              {t("outxide.tagline")}
            </p>
            <p className="mt-3 max-w-lg mx-auto text-muted-foreground">
              {t("outxide.description")}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="btn-magnetic rounded-full px-8 bg-outxide hover:bg-outxide/80 text-white shadow-lg shadow-outxide/20"
              >
                <a href="#eventos">
                  <Ticket className="h-4 w-4 mr-2" />
                  {t("outxide.buyTickets")}
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="btn-magnetic rounded-full px-8 border-outxide/40 text-outxide hover:bg-outxide/10"
              >
                <a href="https://web.fourvenues.com/es/outxide-club" target="_blank" rel="noopener noreferrer">
                  <Crown className="h-4 w-4 mr-2" />
                  {t("outxide.reserveVip")}
                </a>
              </Button>
            </div>
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
          <a
            href="https://maps.google.com/?q=Outxide+Club+Av+Tucan+1+Port+Alcudia+Mallorca"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors"
          >
            <MapPin className="h-4 w-4 text-outxide" />
            <span>{t("outxide.address")}</span>
          </a>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-outxide" />
            <span>+21</span>
          </div>
          <Link
            href="/hiru"
            className="link-underline flex items-center gap-2 text-outxide hover:text-outxide/80 transition-colors"
          >
            <ArrowRight className="h-4 w-4" />
            <span>{t("outxide.dinnerHiru")}</span>
          </Link>
        </div>
      </section>

      {/* About — branded SEO content */}
      <section className="relative z-20 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <ScrollReveal>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight mb-6">
              {t("outxide.aboutHeading")}
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {t("outxide.aboutText")}
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg mt-4">
              {t("outxide.aboutText2")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Events */}
      <section id="eventos" className="grain-overlay relative z-20 py-24 md:py-32 bg-[radial-gradient(ellipse_at_60%_30%,rgba(6,182,212,0.18)_0%,transparent_65%),radial-gradient(ellipse_at_20%_70%,rgba(124,58,237,0.12)_0%,transparent_60%)]">
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
              const genres = extractGenres(event);
              const artists = extractArtists(event);

              return (
                <ScrollReveal key={event._id} delay={i * 0.05} className="h-full">
                  <div className="card-hover group relative overflow-hidden rounded-2xl border border-white/5 hover:border-outxide/30 glass flex flex-col h-full">
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

                      <a
                        href={event.iframe?.tag_url ?? `https://web.fourvenues.com/es/outxide-club`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`btn-magnetic inline-flex items-center justify-center w-full rounded-lg text-white text-sm font-medium mt-auto px-4 py-2 bg-outxide hover:bg-outxide/80 transition-colors`}
                      >
                        <Ticket className="h-4 w-4 mr-2" />
                        {t("outxide.buyTicket")}
                        <ExternalLink className="h-3.5 w-3.5 ml-2 opacity-60" />
                      </a>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

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

      {/* VIP Experience */}
      <section className="grain-overlay relative z-20 py-24 md:py-32 overflow-hidden bg-[radial-gradient(ellipse_at_50%_50%,rgba(124,58,237,0.2)_0%,transparent_65%)]">
        <div className="mx-auto max-w-4xl px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-sm font-bold tracking-[0.2em] text-outxide/60 uppercase mb-4">
                {t("outxide.vipSubtitle")}
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white uppercase mb-6">
                {t("outxide.vipTitle")}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
                {t("outxide.vipDescription")}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
              {[
                { icon: Wine, label: t("outxide.vipBottleService") },
                { icon: Sofa, label: t("outxide.vipPrivateArea") },
                { icon: Star, label: t("outxide.vipPersonalHost") },
              ].map((perk, i) => (
                <div
                  key={i}
                  className="card-hover flex flex-col items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-6 text-center hover:border-outxide/20 hover:bg-outxide/[0.04]"
                >
                  <perk.icon className="h-6 w-6 text-outxide" />
                  <span className="text-sm font-medium text-white/80">{perk.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="text-center">
              <Button
                asChild
                size="lg"
                className="btn-magnetic rounded-full px-10 bg-outxide hover:bg-outxide/80 text-white shadow-lg shadow-outxide/20"
              >
                <a href="https://web.fourvenues.com/es/outxide-club" target="_blank" rel="noopener noreferrer">
                  <Crown className="h-4 w-4 mr-2" />
                  {t("outxide.vipReserve")}
                  <ExternalLink className="h-3.5 w-3.5 ml-2 opacity-60" />
                </a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery */}
      {galleryImages.length > 0 && (
        <section className="grain-overlay py-24 md:py-32 relative z-20 bg-[radial-gradient(ellipse_at_40%_50%,rgba(124,58,237,0.15)_0%,transparent_65%)]">
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

            <GalleryLightbox images={galleryImages} />
          </div>
        </section>
      )}

      {/* Related Blog Articles */}
      <section className="grain-overlay relative z-20 py-16 sm:py-20 border-t border-white/5">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white uppercase tracking-tight text-center mb-10">
            {t("blog.venueRelatedArticles")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { slug: "outxide-club-discoteca-alcudia-mallorca", label: locale === "es" ? "Outxide Club: La Discoteca de Referencia" : locale === "de" ? "Outxide Club: Der Referenz-Nachtclub" : locale === "fr" ? "Outxide Club: La Discothèque de Référence" : locale === "it" ? "Outxide Club: La Discoteca di Riferimento" : "Outxide Club: The Reference Nightclub" },
              { slug: "guia-vida-nocturna-alcudia", label: locale === "es" ? "Guía de Vida Nocturna en Alcúdia" : locale === "de" ? "Nachtleben-Guide Alcúdia" : locale === "fr" ? "Guide Vie Nocturne Alcúdia" : locale === "it" ? "Guida Vita Notturna Alcúdia" : "Nightlife Guide in Alcúdia" },
              { slug: "mejores-discotecas-clubs-alcudia", label: locale === "es" ? "Mejores Discotecas y Clubs en Alcúdia" : locale === "de" ? "Beste Clubs in Alcúdia" : locale === "fr" ? "Meilleurs Clubs à Alcúdia" : locale === "it" ? "Migliori Discoteche ad Alcúdia" : "Best Clubs in Alcúdia" },
              { slug: "despedida-soltera-soltero-alcudia-mallorca", label: locale === "es" ? "Despedidas de Soltera en Alcúdia" : locale === "de" ? "Junggesellenabschied Alcúdia" : locale === "fr" ? "Enterrement de Vie à Alcúdia" : locale === "it" ? "Addio al Nubilato ad Alcúdia" : "Bachelorette Parties in Alcúdia" },
              { slug: "plan-nocturno-port-alcudia-mallorca", label: locale === "es" ? "Mejor Plan Nocturno en Port d'Alcúdia" : locale === "de" ? "Bester Nachtplan Port d'Alcúdia" : locale === "fr" ? "Meilleur Plan Nocturne à Alcúdia" : locale === "it" ? "Miglior Piano Notturno ad Alcúdia" : "Best Night Out in Port d'Alcúdia" },
            ].map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-4 transition-all hover:border-outxide/30 hover:bg-outxide/[0.04]"
              >
                <ArrowRight className="h-4 w-4 text-outxide shrink-0 transition-transform group-hover:translate-x-0.5" />
                <span className="text-sm text-white/70 group-hover:text-white transition-colors">{article.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
