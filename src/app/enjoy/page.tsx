"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowUp, Clock, MapPin, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { EnjoyLogo } from "@/components/ui/logos";
import { ParticleBackground } from "@/components/ui/particle-background";
import { getIcon } from "@/lib/icons";
import { useT, useLocale } from "@/i18n";
import { useRef, useCallback, useState, useEffect } from "react";

interface MenuSection {
  id: string;
  category: string;
  icon: string;
  type?: "cocktails" | "drinks";
  items: ({ name: string; description: string } | string)[];
}
interface GalleryImage { src: string; alt: string; }

export default function EnjoyPage() {
  const t = useT();
  const locale = useLocale();
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [drinkSections, setDrinkSections] = useState<MenuSection[]>([]);
  const [shishaSections, setShishaSections] = useState<MenuSection[]>([]);
  const menuNavRef = useRef<HTMLDivElement>(null);
  const cartaSectionRef = useRef<HTMLElement>(null);
  const [showFloatingNav, setShowFloatingNav] = useState(false);

  useEffect(() => {
    fetch(`/api/menus/enjoy-drinks?locale=${locale}`).then(r => r.json()).then(setDrinkSections).catch(() => {});
    fetch(`/api/menus/enjoy-shisha?locale=${locale}`).then(r => r.json()).then(setShishaSections).catch(() => {});
    fetch("/api/gallery/enjoy").then(r => r.json()).then(setGalleryImages).catch(() => {});
  }, [locale]);

  const handleVideoReady = useCallback(() => {
    setVideoReady(true);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (v && v.readyState >= 3) handleVideoReady();
  }, [handleVideoReady]);

  useEffect(() => {
    const nav = menuNavRef.current;
    const section = cartaSectionRef.current;
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

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      <Navbar />

      {/* Hero with Immersive Reveal */}
      <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y, scale }} className="absolute inset-0">
          <img
            src="/videos/enjoy-hero-poster.jpg"
            alt=""
            aria-hidden
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${videoReady ? "opacity-0" : "opacity-100"}`}
          />
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
            <source src="/videos/enjoy-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.2),transparent_60%)]" />
          <ParticleBackground color="#ec4899" count={40} />
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="relative z-10 mx-auto max-w-4xl px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
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
                initial={{ filter: "blur(10px)", opacity: 0 }}
                animate={{ filter: "blur(0px)", opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.2 }}
              >
                <EnjoyLogo className="h-64 md:h-80 w-auto" />
              </motion.div>
            </div>
            <h1 className="sr-only">Enjoy Terrace</h1>
            <p className="mt-2 text-lg font-bold tracking-[0.2em] text-enjoy/80 uppercase drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]">
              {t("enjoy.subtitle")}
            </p>
            <p className="mt-6 max-w-lg mx-auto text-muted-foreground text-lg italic drop-shadow-md">
              {t("enjoy.tagline")}
            </p>
          </motion.div>
        </motion.div>

        {/* Floating elements for 3D depth */}
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-enjoy/10 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-enjoy/5 blur-3xl"
        />
      </section>

      {/* Info bar */}
      <section className="relative z-20 border-y border-white/5 bg-background">
        <div className="mx-auto max-w-4xl px-6 py-6 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-enjoy" />
            <span>{t("enjoy.hours")}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-enjoy" />
            <span>{t("enjoy.address")}</span>
          </div>
          <Link
            href="/outxide"
            className="flex items-center gap-2 text-enjoy hover:text-enjoy-light transition-colors"
          >
            <ArrowRight className="h-4 w-4" />
            <span>{t("enjoy.continueOutxide")}</span>
          </Link>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 md:py-32 relative z-20 bg-background">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-bold tracking-[0.2em] text-enjoy/60 uppercase mb-4">
                {t("common.gallery")}
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white uppercase">
                {t("enjoy.galleryTitle")}
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

      {/* Carta — Shisha + Cocktails & Bebidas */}
      <section id="carta" ref={cartaSectionRef} className="py-24 md:py-32 bg-card/30 relative z-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-20 -left-10 w-64 h-64 rounded-full bg-enjoy/[0.03] blur-3xl" />
          <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-enjoy/[0.02] blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-48 h-48 rounded-full bg-enjoy/[0.03] blur-3xl" />
          <img
            src="/images/enjoy/deco/fresh-drink.png"
            alt=""
            className="absolute top-16 right-[5%] h-[320px] w-auto opacity-[0.13]"
          />
          <img
            src="/images/enjoy/deco/margarita.png"
            alt=""
            className="absolute top-[32%] left-[3%] h-[350px] w-auto opacity-[0.12]"
          />
          <img
            src="/images/enjoy/deco/martini-gold.png"
            alt=""
            className="absolute top-[58%] right-[4%] h-[300px] w-auto opacity-[0.12]"
          />
          <img
            src="/images/enjoy/deco/margarita-ice.png"
            alt=""
            className="absolute bottom-[8%] left-[5%] h-[340px] w-auto opacity-[0.13]"
          />
        </div>

        <div className="mx-auto max-w-5xl px-6 relative">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm font-bold tracking-[0.2em] text-enjoy/60 uppercase mb-4">
                {t("common.menu")}
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white uppercase">
                {t("enjoy.menuTitle")}
              </h2>
            </div>
          </ScrollReveal>

          {/* Shisha nav */}
          <ScrollReveal>
            <div className="mb-6">
              <h3 className="text-sm font-bold tracking-[0.15em] text-enjoy/50 uppercase mb-3">{t("enjoy.shishaTitle")}</h3>
              <div className="flex flex-wrap gap-2">
                {shishaSections.map((section) => {
                  const Icon = getIcon(section.icon);
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="group flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-2.5 text-left transition-all hover:border-enjoy/30 hover:bg-enjoy/[0.06]"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-enjoy/60 group-hover:text-enjoy transition-colors" />
                      <span className="text-xs font-medium text-white/70 group-hover:text-white transition-colors">
                        {section.category}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Drinks nav */}
          <ScrollReveal>
            <div ref={menuNavRef} className="mb-20">
              <h3 className="text-sm font-bold tracking-[0.15em] text-enjoy/50 uppercase mb-3">{t("enjoy.drinksNavTitle")}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {drinkSections.map((section) => {
                  const Icon = getIcon(section.icon);
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="group flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.03] px-4 py-2.5 text-left transition-all hover:border-enjoy/30 hover:bg-enjoy/[0.06]"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-enjoy/60 group-hover:text-enjoy transition-colors" />
                      <span className="text-xs font-medium text-white/70 group-hover:text-white transition-colors truncate">
                        {section.category.replace(" · Para compartir", "")}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* Shisha content — first */}
          <div className="space-y-20 mb-20">
            {shishaSections.map((section, si) => {
              const ShishaIcon = getIcon(section.icon);
              return (
              <ScrollReveal key={section.id} delay={si * 0.03}>
                <div id={section.id} className="scroll-mt-24">
                  <h3 className="text-lg font-semibold text-enjoy tracking-wider uppercase mb-6 pb-2 border-b border-enjoy/20 flex items-center gap-3">
                    <ShishaIcon className="h-5 w-5 text-enjoy/60" />
                    {section.category}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                    {(section.items as { name: string; description: string }[]).map((item) => (
                      <div key={item.name}>
                        <h4 className="text-white font-medium">
                          {item.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
              );
            })}
          </div>

          {/* Drinks content — after shisha */}
          <div className="space-y-20">
            {drinkSections.map((section, si) => {
              const SectionIcon = getIcon(section.icon);
              return (
              <ScrollReveal key={section.id} delay={si * 0.03}>
                <div id={section.id} className="scroll-mt-24">
                  <h3 className="text-lg font-semibold text-enjoy tracking-wider uppercase mb-6 pb-2 border-b border-enjoy/20 flex items-center gap-3">
                    <SectionIcon className="h-5 w-5 text-enjoy/60" />
                    {section.category}
                  </h3>

                  {section.type === "cocktails" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                      {(section.items as { name: string; description: string }[]).map((item) => (
                        <div key={item.name}>
                          <h4 className="text-white font-medium">
                            {item.name}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {(section.items as string[]).map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-sm text-white/80 transition-colors hover:border-enjoy/30 hover:text-white"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollReveal>
              );
            })}
          </div>

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
            onClick={() => scrollToSection("carta")}
            className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/80 backdrop-blur-md px-4 py-2.5 text-sm text-white/70 shadow-lg shadow-black/30 transition-colors hover:border-enjoy/40 hover:text-white"
          >
            <ArrowUp className="h-4 w-4 text-enjoy" />
            {t("common.backToMenu")}
          </motion.button>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
