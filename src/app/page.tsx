"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Wine, Music, Flame, ChevronLeft, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";
import { EnjoyLogo, OutxideLogo, HiruLogo } from "@/components/ui/logos";
import { OrganizationJsonLd } from "@/components/seo/json-ld";
import dynamic from "next/dynamic";

const AmbientGlow = dynamic(() => import("@/components/ui/ambient-glow").then(m => ({ default: m.AmbientGlow })), { ssr: false });
import { useT } from "@/i18n";
import { useState, useEffect, useRef, useCallback } from "react";

const businesses = [
  {
    name: "Enjoy",
    id: "enjoy",
    logo: EnjoyLogo,
    subtitle: "Terrace · Cocktails & Shisha",
    description:
      "Where nights begin. Los mejores cócteles de Alcúdia, shisha premium y la terraza con más ambiente para empezar la noche.",
    href: "/enjoy",
    icon: Wine,
    color: "from-pink-500/40 to-pink-900/20",
    accent: "text-enjoy",
    borderColor: "hover:border-enjoy/30",
    image: "/images/enjoy/489390658_1397879798281690_242980700226707519_n.jpg",
    video: "/videos/enjoy-hero.mp4",
    poster: "/videos/enjoy-hero-poster.jpg",
    cta: "Enjoy Terrace"
  },
  {
    name: "Outxide",
    id: "outxide",
    logo: OutxideLogo,
    subtitle: "Club",
    description:
      "The night continues. Club nocturno con los mejores DJs, producción de primer nivel y una energía que no encontrarás en otro sitio.",
    href: "/outxide",
    icon: Music,
    color: "from-cyan-500/40 to-violet-500/20",
    accent: "text-outxide",
    borderColor: "hover:border-outxide/30",
    image: "/images/outxide/DSCF8103-9.webp",
    video: "/videos/outxide-hero.mp4",
    poster: "/videos/outxide-hero-poster.jpg",
    cta: "Outxide Club"
  },
  {
    name: "Hiru",
    id: "hiru",
    logo: HiruLogo,
    subtitle: "Food & Drinks",
    description:
      "Brasa, cocktails y buen ambiente. Cocina de autor con las mejores carnes, arroces y cócteles hasta altas horas de la noche.",
    href: "/hiru",
    icon: Flame,
    color: "from-amber-800/40 to-amber-950/20",
    accent: "text-hiru",
    borderColor: "hover:border-hiru/30",
    image: "/images/hiru/694647172_122298670106201104_2257975202148597878_n.jpg",
    video: "/videos/hiru-hero.mp4",
    poster: "/videos/hiru-hero-poster.jpg",
    cta: "Hiru Food & Drinks"
  },
];

export default function HomePage() {
  const t = useT();
  const [index, setIndex] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [deferredVideoId, setDeferredVideoId] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeBiz = businesses[index];
  const loadVideo = deferredVideoId === activeBiz.id;

  const handleVideoReady = useCallback(() => {
    setVideoReady(true);
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => setDeferredVideoId(activeBiz.id), 800);
    return () => window.clearTimeout(id);
  }, [activeBiz.id]);

  useEffect(() => {
    const v = videoRef.current;
    if (v && v.readyState >= 3) handleVideoReady();
  }, [handleVideoReady, index, loadVideo]);

  const next = () => setIndex((prev) => (prev + 1) % businesses.length);
  const prev = () => setIndex((prev) => (prev - 1 + businesses.length) % businesses.length);

  useEffect(() => {
    const timer = setInterval(next, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="noise-texture relative">
      <AmbientGlow venue="home" />
      <Navbar />

      {/* Hero with Immersive Slider */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeBiz.id}
            onAnimationStart={() => setVideoReady(false)}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {activeBiz.video ? (
              <>
                <Image
                  src={activeBiz.poster}
                  alt=""
                  aria-hidden
                  fill
                  preload
                  sizes="100vw"
                  className={`object-cover transition-opacity duration-1000 ${videoReady ? "opacity-0" : "opacity-60"}`}
                />
                <video
                  key={loadVideo ? activeBiz.video : activeBiz.poster}
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={activeBiz.poster}
                  preload="none"
                  onLoadedData={handleVideoReady}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${videoReady ? "opacity-60" : "opacity-0"}`}
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
                preload
                sizes="100vw"
              />
            )}
            <div className={`absolute inset-0 bg-gradient-to-b ${activeBiz.color} to-black`} />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 mx-auto max-w-6xl px-6 w-full pt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeBiz.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <p className="text-sm font-bold tracking-[0.2em] text-white/60 uppercase mb-4">
                  {t("common.location")}
                </p>
                <div className="mb-6 h-28 md:h-40 flex items-center">
                  <activeBiz.logo className="h-full w-auto max-w-[400px]" />
                </div>
                <p className={`text-xl font-medium ${activeBiz.accent} mb-6 tracking-wide`}>
                  {t(`home.${activeBiz.id}Subtitle`)}
                </p>
                <p className="text-lg text-white/80 leading-relaxed max-w-lg mb-10">
                  {t(`home.${activeBiz.id}Description`)}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="rounded-full px-8 bg-white text-black hover:bg-white/90">
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
            className="p-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
          <button
            onClick={next}
            className="p-3 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
          <div className="ml-4 flex gap-2">
            {businesses.map((_, i) => (
              <div
                key={i}
                className={`h-1 transition-all duration-500 ${i === index ? 'w-8 bg-white' : 'w-2 bg-white/20'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Spaces Section */}
      <section id="spaces" className="grain-overlay py-32 relative bg-[radial-gradient(ellipse_at_50%_0%,rgba(236,72,153,0.15)_0%,transparent_60%),radial-gradient(ellipse_at_80%_80%,rgba(6,182,212,0.12)_0%,transparent_60%)]">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal>
            <div className="text-center mb-24">
              <p className="text-sm font-bold tracking-[0.2em] text-white/40 uppercase mb-4">
                {t("home.grupoEnjoy")}
              </p>
              <h2 className="font-display text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight uppercase">
                {t("home.threeSpaces")}
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {businesses.map((biz, i) => (
              <ScrollReveal key={biz.name} delay={i * 0.15}>
                <Link href={biz.href} className="group block h-full">
                  <div className="relative h-full overflow-hidden rounded-3xl border border-white/5 bg-zinc-950 p-8 transition-all duration-500 hover:border-white/20 flex flex-col">
                    <div className="mb-8">
                      <biz.logo className="h-28 w-auto mb-6" />
                      <p className="text-sm text-white/50 leading-relaxed">
                        {t(`home.${biz.id}Description`)}
                      </p>
                    </div>
                    <div className="mt-auto pt-8 flex items-center justify-between border-t border-white/5">
                      <span className="text-sm font-medium text-white group-hover:text-white/70 transition-colors">
                        {t("common.visit")} {biz.name}
                      </span>
                      <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center transition-transform group-hover:translate-x-1">
                        <ArrowRight className="h-4 w-4 text-white" />
                      </div>
                    </div>

                    {/* Background glow on hover */}
                    <div className={`absolute -bottom-24 -right-24 w-48 h-48 rounded-full ${biz.accent.replace('text-', 'bg-')}/5 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <OrganizationJsonLd />
    </div>
  );
}
