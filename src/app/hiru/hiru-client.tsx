"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Flame, MapPin } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { HiruLogo } from "@/components/ui/logos";
import { GalleryLightbox } from "@/components/ui/gallery-lightbox";
import dynamic from "next/dynamic";

const ParticleBackground = dynamic(() => import("@/components/ui/particle-background").then(m => ({ default: m.ParticleBackground })), { ssr: false });
const AmbientGlow = dynamic(() => import("@/components/ui/ambient-glow").then(m => ({ default: m.AmbientGlow })), { ssr: false });
import { useT, useLocale } from "@/i18n";
import { localizedPath } from "@/i18n/config";
import { useRef, useCallback, useState, useEffect } from "react";

export interface GalleryImage { src: string; alt: string; category?: string; }
export interface GalleryData { categories: string[]; images: GalleryImage[]; }

export interface HiruClientProps {
  galleryData: GalleryData;
}

/**
 * Página de despedida de Hiru (cerrado en agosto de 2026). El local se
 * conserva para un posible proyecto futuro: la página no vende nada — hero,
 * carta de despedida, guiño a lo que viene, recuerdos y puentes a los locales
 * que siguen abiertos.
 */
export function HiruClient({ galleryData }: HiruClientProps) {
  const t = useT();
  const locale = useLocale();
  const [videoReady, setVideoReady] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);
  const [isFirstMount, setIsFirstMount] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const handleVideoReady = useCallback(() => {
    setVideoReady(true);
  }, []);

  useEffect(() => {
    setIsFirstMount(false);
    document.querySelectorAll('[data-hero]').forEach(el => el.removeAttribute('data-hero'));
  }, []);

  useEffect(() => {
    // Con prefers-reduced-motion no inyectamos el <source>: sin autoplay,
    // se queda el poster estático y se ahorra la descarga del mp4
    if (prefersReduced) return;
    const id = window.setTimeout(() => setLoadVideo(true), 800);
    return () => window.clearTimeout(id);
  }, [prefersReduced]);

  useEffect(() => {
    const v = videoRef.current;
    if (v && v.readyState >= 3) handleVideoReady();
  }, [handleVideoReady, loadVideo]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scaleRaw = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const borderRadiusRaw = useTransform(scrollYProgress, [0, 1], [0, 32]);
  const scale = prefersReduced ? 1 : scaleRaw;
  const borderRadius = prefersReduced ? 0 : borderRadiusRaw;

  return (
    <div className="noise-texture relative">
      <AmbientGlow venue="hiru" />
      <Navbar />
      <main id="contenido">
      <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale, borderRadius }} className="absolute inset-0 z-0 origin-center overflow-hidden will-change-transform">
          <Image
            src="/videos/hiru-hero-poster.jpg"
            alt=""
            aria-hidden
            fill
            priority
            sizes="100vw"
            className={`object-cover transition-opacity duration-1000 ${videoReady ? "opacity-0" : "opacity-100"}`}
          />
          <video
            key={loadVideo ? "hiru-video" : "hiru-poster"}
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            poster="/videos/hiru-hero-poster.jpg"
            preload="none"
            onLoadedData={handleVideoReady}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${videoReady ? "opacity-100" : "opacity-0"}`}
          >
            {loadVideo && <source src="/videos/hiru-hero.mp4" type="video/mp4" />}
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(184,115,51,0.15),transparent_60%)]" />
          <ParticleBackground color="#b87333" count={30} />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.div
            data-hero
            initial={isFirstMount ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isFirstMount ? 0 : 1.2, ease: "easeOut" }}
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
                initial={isFirstMount ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: isFirstMount ? 0 : 1, delay: isFirstMount ? 0 : 0.3 }}
              >
                <HiruLogo className="h-64 md:h-80 w-auto" priority />
              </motion.div>
            </div>
            <h1 className="sr-only">{t("hiru.h1")}</h1>
            <p className="mt-2 text-sm tracking-[0.2em] text-white/50 uppercase">
              {t("hiru.subtitle")}
            </p>
            <p className="mt-4 text-lg tracking-[0.2em] text-hiru/80 uppercase font-bold">
              {t("hiru.farewellEyebrow")}
            </p>
            <p className="mt-8 max-w-lg mx-auto text-muted-foreground">
              {t("hiru.description")}
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href="#carta"
                className="btn-magnetic inline-flex items-center gap-2 rounded-full bg-hiru px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-hiru/90"
              >
                {t("cta.hiruFarewell")}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Estado del local + puentes a los locales abiertos */}
      <section className="relative z-20 border-y border-white/5 bg-background/60 backdrop-blur-md">
        <div className="mx-auto max-w-4xl px-6 py-6 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Flame className="h-4 w-4 text-hiru" />
            <span>{t("hiru.farewellBadge")}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-hiru" />
            <span>{t("hiru.address")}</span>
          </div>
          <Link
            href={localizedPath("/enjoy", locale)}
            className="link-underline flex items-center gap-2 text-enjoy hover:text-enjoy/80 transition-colors"
          >
            <ArrowRight className="h-4 w-4" />
            <span>{t("hiru.continueEnjoy")}</span>
          </Link>
          <Link
            href={localizedPath("/outxide", locale)}
            className="link-underline flex items-center gap-2 text-outxide hover:text-outxide/80 transition-colors"
          >
            <ArrowRight className="h-4 w-4" />
            <span>{t("hiru.continueOutxide")}</span>
          </Link>
        </div>
      </section>

      {/* La carta de despedida */}
      <section id="carta" className="grain-overlay relative z-20 py-24 md:py-32 scroll-mt-24 bg-[radial-gradient(ellipse_at_50%_30%,rgba(184,115,51,0.15)_0%,transparent_60%)]">
        <div className="mx-auto max-w-2xl px-6">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-sm font-bold tracking-[0.2em] text-hiru/60 uppercase mb-4">
                {t("hiru.farewellLetterEyebrow")}
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white uppercase">
                {t("hiru.farewellTitle")}
              </h2>
              <div className="mt-6 h-1 w-24 bg-hiru mx-auto" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p data-speakable>{t("hiru.farewellP1")}</p>
              <p data-speakable>{t("hiru.farewellP2")}</p>
              <p>{t("hiru.farewellP3")}</p>
            </div>
            <p className="mt-10 text-right text-hiru italic">
              — {t("hiru.farewellSignature")}
            </p>
          </ScrollReveal>

          {/* Guiño a lo que viene (nada confirmado: solo se deja caer) */}
          <ScrollReveal delay={0.15}>
            <div className="mt-16 rounded-2xl border border-hiru/20 bg-hiru/5 p-8 text-center">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-hiru/10 text-hiru mb-4">
                <Flame className="h-6 w-6" />
              </div>
              <h3 className="font-display text-2xl font-bold text-white uppercase mb-3">
                {t("hiru.farewellTeaserTitle")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("hiru.farewellTeaserText")}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Los recuerdos */}
      <section className="grain-overlay relative z-20 py-24 md:py-32 bg-[radial-gradient(ellipse_at_30%_50%,rgba(184,115,51,0.18)_0%,transparent_65%)]">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-bold tracking-[0.2em] text-hiru/60 uppercase mb-4">
                {t("common.gallery")}
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white uppercase">
                {t("hiru.galleryTitle")}
              </h2>
            </div>
          </ScrollReveal>

          <GalleryLightbox
            images={galleryData.images}
            categories={[
              { key: "all", label: t("hiru.galleryAll") },
              { key: "gastronomia", label: t("hiru.galleryFood") },
              { key: "espacio", label: t("hiru.gallerySpace") },
            ]}
          />
        </div>
      </section>

      {/* La historia continúa en los otros locales */}
      <section className="relative z-20 py-20 border-t border-white/5">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white uppercase mb-10">
              {t("hiru.continueTitle")}
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={localizedPath("/enjoy", locale)}
                className="btn-magnetic inline-flex items-center gap-2 rounded-full bg-enjoy px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-enjoy/90"
              >
                {t("hiru.continueEnjoy")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={localizedPath("/outxide", locale)}
                className="btn-magnetic inline-flex items-center gap-2 rounded-full bg-outxide px-7 py-3 text-sm font-semibold text-black transition-colors hover:bg-outxide/90"
              >
                {t("hiru.continueOutxide")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
