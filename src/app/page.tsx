"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";
import { EnjoyLogo, OutxideLogo, HiruLogo } from "@/components/ui/logos";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/json-ld";
import { MundialBanner } from "@/components/ui/mundial-banner";
import { ChampionBanner } from "@/components/ui/champion-banner";
import { EVENT_PHASE, effectivePhase } from "@/lib/mundial/event-config";
import dynamic from "next/dynamic";

const AmbientGlow = dynamic(() => import("@/components/ui/ambient-glow").then(m => ({ default: m.AmbientGlow })), { ssr: false });
import { useT } from "@/i18n";
import { useState, useEffect, useRef, useCallback } from "react";

// Los textos visibles (subtitle/description) salen de t("home.*") en el render;
// aquí solo viven los datos no traducibles de cada local.
const businesses = [
  {
    name: "Enjoy",
    id: "enjoy",
    logo: EnjoyLogo,
    href: "/enjoy",
    color: "from-pink-500/40 to-pink-900/20",
    accent: "text-enjoy",
    image: "/images/enjoy/489390658_1397879798281690_242980700226707519_n.jpg",
    cardImage: "/images/enjoy/485765269_1384374992965504_5931564430169011113_n.jpg",
    video: "/videos/enjoy-hero.mp4",
    poster: "/videos/enjoy-hero-poster.jpg",
  },
  {
    name: "Outxide",
    id: "outxide",
    logo: OutxideLogo,
    href: "/outxide",
    color: "from-cyan-500/40 to-violet-500/20",
    accent: "text-outxide",
    image: "/images/outxide/DSCF8103-9.jpg",
    cardImage: "/images/outxide/DSCF8103-9.jpg",
    video: "/videos/outxide-hero.mp4",
    poster: "/videos/outxide-hero-poster.jpg",
  },
  {
    name: "Hiru",
    id: "hiru",
    logo: HiruLogo,
    href: "/hiru",
    color: "from-amber-800/40 to-amber-950/20",
    accent: "text-hiru",
    image: "/images/hiru/694647172_122298670106201104_2257975202148597878_n.jpg",
    cardImage: "/images/hiru/694647172_122298670106201104_2257975202148597878_n.jpg",
    video: "/videos/hiru-hero.mp4",
    poster: "/videos/hiru-hero-poster.jpg",
  },
];

export default function HomePage() {
  const t = useT();
  // Fase del banner de competición (se degrada a "off" pasada la fecha del campeón).
  const [phase, setPhase] = useState(EVENT_PHASE);
  useEffect(() => {
    setPhase(effectivePhase(Date.now()));
  }, []);
  const [index, setIndex] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [deferredVideoId, setDeferredVideoId] = useState<string | null>(null);
  const [isFirstMount, setIsFirstMount] = useState(true);
  // Pausa de la rotación automática mientras el puntero está encima o el foco dentro del hero
  const [isHovered, setIsHovered] = useState(false);
  const [isFocusWithin, setIsFocusWithin] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    setIsFirstMount(false);
    // Remove data-hero so CSS override stops and Framer Motion controls animations
    document.querySelectorAll('[data-hero]').forEach(el => el.removeAttribute('data-hero'));
  }, []);
  const activeBiz = businesses[index];
  const loadVideo = deferredVideoId === activeBiz.id;

  const handleVideoReady = useCallback(() => {
    setVideoReady(true);
  }, []);

  useEffect(() => {
    // Con prefers-reduced-motion no cargamos el vídeo: se queda el poster estático
    if (prefersReduced) return;
    const id = window.setTimeout(() => setDeferredVideoId(activeBiz.id), 800);
    return () => window.clearTimeout(id);
  }, [activeBiz.id, prefersReduced]);

  useEffect(() => {
    const v = videoRef.current;
    if (v && v.readyState >= 3) handleVideoReady();
  }, [handleVideoReady, index, loadVideo]);

  const next = () => setIndex((prev) => (prev + 1) % businesses.length);
  const prev = () => setIndex((prev) => (prev - 1 + businesses.length) % businesses.length);

  useEffect(() => {
    // Sin rotación automática con reduced-motion, ni mientras el usuario interactúa
    if (prefersReduced || isHovered || isFocusWithin) return;
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, [prefersReduced, isHovered, isFocusWithin]);

  return (
    <div className="noise-texture relative">
      <AmbientGlow venue="home" />
      <Navbar />
      <main id="contenido">
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsFocusWithin(true)}
        onBlur={(e) => {
          // Solo reanudamos cuando el foco sale de verdad de la sección
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setIsFocusWithin(false);
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            data-hero
            key={activeBiz.id}
            onAnimationStart={() => setVideoReady(false)}
            initial={isFirstMount ? false : { opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: isFirstMount ? 0 : 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {activeBiz.video ? (
              <>
                <Image
                  src={activeBiz.poster}
                  alt=""
                  aria-hidden
                  fill
                  priority
                  sizes="100vw"
                  className={`object-cover transition-opacity duration-1000 ${videoReady ? "opacity-0" : "opacity-80"}`}
                />
                <video
                  key={loadVideo ? activeBiz.video : activeBiz.poster}
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  onLoadedData={handleVideoReady}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${videoReady ? "opacity-70" : "opacity-0"}`}
                >
                  {loadVideo && <source src={activeBiz.video} type="video/mp4" />}
                </video>
              </>
            ) : (
              <Image
                src={activeBiz.image}
                alt={activeBiz.name}
                fill
                className="object-cover opacity-60"
                priority
                sizes="100vw"
              />
            )}
            <div className={`absolute inset-0 bg-gradient-to-b ${activeBiz.color} to-black`} />
            <div className="absolute inset-0 bg-black/25" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 mx-auto max-w-6xl px-6 w-full pt-20">
          <h1 className="sr-only">Grupo Enjoy — Alcúdia, Mallorca</h1>
          <AnimatePresence mode="wait">
            <motion.div
              data-hero
              key={activeBiz.id}
              initial={isFirstMount ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: isFirstMount ? 0 : 0.8, delay: isFirstMount ? 0 : 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <p className="text-sm font-bold tracking-[0.2em] text-white/60 uppercase mb-4">
                  {t("common.location")}
                </p>
                <div className="mb-6 h-28 md:h-40 flex items-center">
                  {/* priority: único logo above-the-fold de verdad (hero de la home) */}
                  <activeBiz.logo className="h-full w-auto max-w-[400px]" priority />
                </div>
                <p className={`text-xl font-medium ${activeBiz.accent} mb-6 tracking-wide`}>
                  {t(`home.${activeBiz.id}Subtitle`)}
                </p>
                <p className="text-lg text-white/80 leading-relaxed max-w-lg mb-10">
                  {t(`home.${activeBiz.id}Description`)}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="btn-magnetic rounded-full px-8 bg-white text-black hover:bg-white/90">
                    <Link href={activeBiz.href}>
                      {t("common.explore")} {activeBiz.name}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Visual element */}
              <div className="hidden lg:block relative">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                  <Image
                    src={activeBiz.image}
                    alt={activeBiz.name}
                    fill
                    // Oculto en <lg (1px evita la descarga); en desktop la columna
                    // está capada a ~528px por max-w-6xl, no a 50vw reales
                    sizes="(max-width: 1023px) 1px, (max-width: 1151px) 50vw, 528px"
                    className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
                <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full ${activeBiz.accent.replace('text-', 'bg-')}/20 blur-2xl`} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="absolute bottom-12 left-6 md:left-12 flex items-center gap-4 z-20">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="btn-magnetic p-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="btn-magnetic p-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
          <div className="ml-4 flex gap-1.5">
            {businesses.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-500 ${i === index ? 'w-10 bg-white' : 'w-3 bg-white/25 hover:bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Banner de competición bajo el hero. Una sola palanca en
          src/lib/mundial/event-config.ts decide qué se muestra:
          "featured" → promo del torneo · "champion" → campeón · "off" → nada. */}
      {phase !== "off" && (
        <div className="pt-16">
          {phase === "champion" ? <ChampionBanner /> : <MundialBanner />}
        </div>
      )}

      {/* Featured Spaces Section */}
      <section id="spaces" className="grain-overlay py-32 relative bg-[radial-gradient(ellipse_at_50%_0%,rgba(236,72,153,0.15)_0%,transparent_60%),radial-gradient(ellipse_at_80%_80%,rgba(6,182,212,0.12)_0%,transparent_60%)]">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal>
            <div className="text-center mb-24">
              <p className="text-sm font-bold tracking-[0.2em] text-white/40 uppercase mb-4">
                {t("home.grupoEnjoy")}
              </p>
              <h2 className="font-display text-5xl md:text-6xl font-bold text-shimmer tracking-tight leading-tight uppercase">
                {t("home.threeSpaces")}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {businesses.map((biz, i) => (
              <ScrollReveal key={biz.name} delay={i * 0.15}>
                <Link href={biz.href} className="group block h-full">
                  <div className="card-hover relative aspect-[3/4] overflow-hidden rounded-3xl will-change-transform group-hover:scale-[1.02]">
                    {/* Background photo */}
                    <Image
                      src={biz.cardImage}
                      alt={biz.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-all duration-700 ease-out group-hover:brightness-110 group-hover:scale-105"
                    />

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/80" />

                    {/* Colored accent glow on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${biz.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                    {/* Card content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
                      {/* Top: Logo */}
                      <div className="flex justify-center">
                        <biz.logo className="h-16 sm:h-20 w-auto drop-shadow-lg" />
                      </div>

                      {/* Bottom: Text + CTA */}
                      <div>
                        <p className={`text-sm font-semibold tracking-wide ${biz.accent} mb-2`}>
                          {t(`home.${biz.id}Subtitle`)}
                        </p>
                        <p className="text-sm text-white/70 leading-relaxed mb-5 line-clamp-2">
                          {t(`home.${biz.id}Description`)}
                        </p>
                        <span className="btn-magnetic inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 group-hover:bg-white group-hover:text-black group-hover:border-white">
                          {t("common.visit")} {biz.name}
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      </main>
      <Footer />
      <OrganizationJsonLd />
      <WebSiteJsonLd />
    </div>
  );
}
