"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Clock,
  MapPin,
  Phone,
  Leaf,
  Anchor,
  Waves,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";
import { HiruLogo } from "@/components/ui/logos";
import { GalleryLightbox } from "@/components/ui/gallery-lightbox";
import dynamic from "next/dynamic";
import hiruGallery from "../../../data/gallery/hiru.json";
import hiruMenuEs from "../../../data/menus/hiru.json";
import hiruMenuEn from "../../../data/menus/hiru.en.json";

const ParticleBackground = dynamic(() => import("@/components/ui/particle-background").then(m => ({ default: m.ParticleBackground })), { ssr: false });
const AmbientGlow = dynamic(() => import("@/components/ui/ambient-glow").then(m => ({ default: m.AmbientGlow })), { ssr: false });
import { getIcon } from "@/lib/icons";
import { useT, useLocale } from "@/i18n";
import { useRef, useCallback, useState, useEffect } from "react";

interface MenuItem { name: string; description: string; price?: string; }
interface MenuSection { id: string; category: string; icon: string; subtitle?: string; items: MenuItem[]; }
interface GalleryImage { src: string; alt: string; }

const galleryImages = hiruGallery as GalleryImage[];
const menus = {
  es: hiruMenuEs,
  en: hiruMenuEn,
} as const;

export default function HiruPage() {
  const t = useT();
  const locale = useLocale();
  const [videoReady, setVideoReady] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuSections = menus[locale] as unknown as MenuSection[];
  const menuNavRef = useRef<HTMLElement>(null);
  const menuSectionRef = useRef<HTMLElement>(null);
  const [showFloatingNav, setShowFloatingNav] = useState(false);

  const handleVideoReady = useCallback(() => {
    setVideoReady(true);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => setLoadVideo(true), 800);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (v && v.readyState >= 3) handleVideoReady();
  }, [handleVideoReady, loadVideo]);

  useEffect(() => {
    const nav = menuNavRef.current;
    const section = menuSectionRef.current;
    if (!nav || !section) return;
    const navObs = new IntersectionObserver(
      ([entry]) => setShowFloatingNav(!entry.isIntersecting),
      { threshold: 0 },
    );
    const sectionObs = new IntersectionObserver(
      ([entry]) => { if (!entry.isIntersecting) setShowFloatingNav(false); },
      { threshold: 0 },
    );
    navObs.observe(nav);
    sectionObs.observe(section);
    return () => { navObs.disconnect(); sectionObs.disconnect(); };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 32]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="noise-texture relative">
      <AmbientGlow venue="hiru" />
      <Navbar />

      {/* Hero with Immersive Reveal */}
      <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale, borderRadius }} className="absolute inset-0 z-0 origin-center overflow-hidden will-change-transform">
          <Image
            src="/videos/hiru-hero-poster.jpg"
            alt=""
            aria-hidden
            fill
            preload
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
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
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <HiruLogo className="h-64 md:h-80 w-auto" />
              </motion.div>
            </div>
            <h1 className="sr-only">Hiru Food & Drinks</h1>
            <p className="mt-2 text-lg tracking-[0.2em] text-hiru/80 uppercase font-bold">
              {t("hiru.subtitle")}
            </p>
            <p className="mt-8 max-w-lg mx-auto text-muted-foreground">
              {t("hiru.description")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Info bar */}
      <section className="relative z-20 border-y border-white/5 bg-background/60 backdrop-blur-md">
        <div className="mx-auto max-w-4xl px-6 py-6 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-hiru" />
            <span>{t("hiru.hours")}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-hiru" />
            <span>{t("hiru.address")}</span>
          </div>
          <a href="tel:+34971853932" className="flex items-center gap-2 text-hiru font-medium hover:text-hiru/80 transition-colors">
            <Phone className="h-4 w-4" />
            <span>971 853 932</span>
          </a>
          <Link
            href="/enjoy"
            className="flex items-center gap-2 text-hiru hover:text-hiru/80 transition-colors"
          >
            <ArrowRight className="h-4 w-4" />
            <span>{t("hiru.continueEnjoy")}</span>
          </Link>
        </div>
      </section>

      {/* Product Highlights */}
      <section className="grain-overlay relative z-20 py-24 bg-[radial-gradient(ellipse_at_50%_50%,rgba(184,115,51,0.15)_0%,transparent_65%)]">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Anchor, title: t("hiru.freshProduct"), desc: t("hiru.freshProductDesc") },
              { icon: Leaf, title: t("hiru.signatureCuisine"), desc: t("hiru.signatureCuisineDesc") },
              { icon: Waves, title: t("hiru.openLate"), desc: t("hiru.openLateDesc") }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="text-center group">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-hiru/5 text-hiru mb-6 transition-colors group-hover:bg-hiru/10">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
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

          <GalleryLightbox images={galleryImages} />
        </div>
      </section>

      {/* Menu */}
      <section id="menu" ref={menuSectionRef} className="grain-overlay relative z-20 py-24 md:py-32 overflow-hidden bg-[radial-gradient(ellipse_at_70%_20%,rgba(184,115,51,0.15)_0%,transparent_60%),radial-gradient(ellipse_at_20%_80%,rgba(139,94,60,0.10)_0%,transparent_60%)]">
        <div className="mx-auto max-w-4xl px-6 relative">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-bold tracking-[0.2em] text-hiru/60 uppercase mb-4">
                {t("common.menu")}
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 uppercase">
                {t("hiru.menuTitle")}
              </h2>
              <div className="h-1 w-24 bg-hiru mx-auto" />
            </div>
          </ScrollReveal>

          {/* Category Navigation */}
          <ScrollReveal>
            <nav ref={menuNavRef} className="mb-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {menuSections.map((section) => {
                const Icon = getIcon(section.icon);
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className="group flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-3 text-left transition-all hover:border-hiru/30 hover:bg-hiru/[0.06]"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-hiru/60 group-hover:text-hiru transition-colors" />
                    <span className="text-xs font-medium text-white/70 group-hover:text-white transition-colors truncate">
                      {section.category}
                    </span>
                  </button>
                );
              })}
            </nav>
          </ScrollReveal>

          {/* Menu Sections */}
          <div className="space-y-16">
            {menuSections.map((section, si) => {
              const Icon = getIcon(section.icon);
              return (
                <ScrollReveal key={section.id} delay={si * 0.03}>
                  <div id={section.id} className="scroll-mt-24">
                    <h3 className="text-2xl font-display text-hiru mb-2 flex items-center gap-4 uppercase tracking-wider">
                      <span className="h-px flex-1 bg-hiru/20" />
                      <Icon className="h-5 w-5" />
                      {section.category}
                      <span className="h-px flex-1 bg-hiru/20" />
                    </h3>
                    {"subtitle" in section && section.subtitle && (
                      <p className="text-center text-xs text-muted-foreground mb-6 uppercase tracking-widest">
                        {section.subtitle}
                      </p>
                    )}
                    <div className={`mt-6 grid grid-cols-1 ${section.items.length > 3 ? "sm:grid-cols-2" : ""} gap-x-8 gap-y-5`}>
                      {section.items.map((item) => (
                        <div key={item.name} className="group relative">
                          <div className="flex items-baseline justify-between gap-4">
                            <h4 className="text-white font-medium group-hover:text-hiru transition-colors">
                              {item.name}
                            </h4>
                            {item.price && (
                              <span className="text-hiru font-bold text-sm whitespace-nowrap">
                                {item.price}
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                              {item.description}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal>
            <div className="mt-20 text-center">
              <Button
                asChild
                size="lg"
                className="rounded-full px-10 bg-hiru hover:bg-hiru/80 text-white shadow-xl shadow-hiru/20"
              >
                <a href="https://hirufoodanddrinks.myrestoo.net/es/reservar" target="_blank" rel="noopener noreferrer">
                  <Phone className="h-4 w-4 mr-2" />
                  {t("common.reserveTable")}
                </a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Floating back-to-menu button */}
      <AnimatePresence>
        {showFloatingNav && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={() => scrollToSection("menu")}
            className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/80 backdrop-blur-md px-4 py-2.5 text-sm text-white/70 shadow-lg shadow-black/30 transition-colors hover:border-hiru/40 hover:text-white"
          >
            <ArrowUp className="h-4 w-4 text-hiru" />
            {t("common.backToMenu")}
          </motion.button>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
