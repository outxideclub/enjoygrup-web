"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Wine, Music, Flame } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { EnjoyLogo, OutxideLogo, HiruLogo } from "@/components/ui/logos";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { useT } from "@/i18n";

const AmbientGlow = dynamic(
  () => import("@/components/ui/ambient-glow").then((m) => ({ default: m.AmbientGlow })),
  { ssr: false }
);

/* ------------------------------------------------------------------ */
/*  Counter component — animates from 0 to target when scrolled into view */
/* ------------------------------------------------------------------ */
function CountUp({ target, suffix = "", prefix = "", duration = 2 }: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = target;
    const stepTime = Math.max(16, Math.floor((duration * 1000) / end));
    const increment = Math.max(1, Math.floor(end / ((duration * 1000) / stepTime)));

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}{isInView ? count.toLocaleString() : "0"}{suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Venue data                                                         */
/* ------------------------------------------------------------------ */
const venues = [
  {
    id: "enjoy",
    name: "Enjoy Terrace",
    logo: EnjoyLogo,
    icon: Wine,
    href: "/enjoy",
    accent: "text-enjoy",
    border: "border-enjoy/20 hover:border-enjoy/40",
    glow: "hover-glow-enjoy",
    gradient: "from-pink-500/20 to-pink-900/10",
    cardKey: "about.enjoyCard" as const,
    image: "/images/enjoy/485765269_1384374992965504_5931564430169011113_n.jpg",
  },
  {
    id: "outxide",
    name: "Outxide Club",
    logo: OutxideLogo,
    icon: Music,
    href: "/outxide",
    accent: "text-outxide",
    border: "border-outxide/20 hover:border-outxide/40",
    glow: "hover-glow-outxide",
    gradient: "from-cyan-500/20 to-violet-500/10",
    cardKey: "about.outxideCard" as const,
    image: "/images/outxide/DSCF8103-9.jpg",
  },
  {
    id: "hiru",
    name: "Hiru Food & Drinks",
    logo: HiruLogo,
    icon: Flame,
    href: "/hiru",
    accent: "text-hiru",
    border: "border-hiru/20 hover:border-hiru/40",
    glow: "hover-glow-hiru",
    gradient: "from-amber-800/20 to-amber-950/10",
    cardKey: "about.hiruCard" as const,
    image: "/images/hiru/694647172_122298670106201104_2257975202148597878_n.jpg",
  },
];

/* ------------------------------------------------------------------ */
/*  Stats data                                                         */
/* ------------------------------------------------------------------ */
const stats = [
  { target: 19, suffix: "+", labelKey: "about.yearsLabel" as const },
  { target: 2200, suffix: "+", labelKey: "about.reviewsLabel" as const },
  { target: 11200, suffix: "+", labelKey: "about.checkinsLabel" as const },
  { target: 1, prefix: "#", suffix: "", labelKey: "about.tripAdvisorLabel" as const },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */
export default function AboutPage() {
  const t = useT();

  return (
    <div className="noise-texture relative">
      <AmbientGlow venue="home" />
      <Navbar />
      <main>

        {/* ===== Section 1: Hero ===== */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(236,72,153,0.12)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,rgba(6,182,212,0.08)_0%,transparent_50%)]" />
          <div className="relative z-10 mx-auto max-w-4xl px-6 pt-32 pb-20 text-center">
            <ScrollReveal>
              <p className="text-sm font-bold tracking-[0.2em] text-white/40 uppercase mb-6">
                {t("about.heroSubtitle")}
              </p>
              <h1 className="font-display text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight uppercase">
                {t("about.heroTitle")}
              </h1>
            </ScrollReveal>
          </div>
          {/* Subtle scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center pt-1.5">
              <div className="w-1 h-1.5 rounded-full bg-white/40" />
            </div>
          </motion.div>
        </section>

        {/* ===== Section 2: The Story ===== */}
        <section className="grain-overlay py-24 md:py-32 relative">
          <div className="mx-auto max-w-4xl px-6">
            <ScrollReveal>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight uppercase mb-12">
                {t("about.storyTitle")}
              </h2>
            </ScrollReveal>

            <div className="space-y-8">
              <ScrollReveal delay={0.1}>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  {t("about.storyP1")}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  {t("about.storyP2")}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  {t("about.storyP3")}
                </p>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ===== Section 3: Numbers that Matter ===== */}
        <section className="grain-overlay py-24 md:py-32 relative bg-[radial-gradient(ellipse_at_50%_50%,rgba(236,72,153,0.08)_0%,transparent_60%)]">
          <div className="mx-auto max-w-5xl px-6">
            <ScrollReveal>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight uppercase text-center mb-16">
                {t("about.numbersTitle")}
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, i) => (
                <ScrollReveal key={stat.labelKey} delay={i * 0.1}>
                  <div className="glass-card rounded-3xl p-6 md:p-8 text-center">
                    <div className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
                      <CountUp
                        target={stat.target}
                        suffix={stat.suffix}
                        prefix={stat.prefix}
                        duration={stat.target > 100 ? 2.5 : 2}
                      />
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground">
                      {t(stat.labelKey)}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Section 4: Venue Cards ===== */}
        <section className="grain-overlay py-32 relative bg-[radial-gradient(ellipse_at_50%_0%,rgba(236,72,153,0.10)_0%,transparent_60%),radial-gradient(ellipse_at_80%_80%,rgba(6,182,212,0.08)_0%,transparent_60%)]">
          <div className="mx-auto max-w-6xl px-6">
            <ScrollReveal>
              <div className="text-center mb-6">
                <p className="text-sm font-bold tracking-[0.2em] text-white/40 uppercase mb-4">
                  Grupo Enjoy
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight uppercase">
                  {t("about.venuesTitle")}
                </h2>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-center text-lg text-muted-foreground max-w-2xl mx-auto mb-16">
                {t("about.venuesSubtitle")}
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {venues.map((venue, i) => (
                <ScrollReveal key={venue.id} delay={i * 0.15}>
                  <Link href={venue.href} className="group block h-full">
                    <div className={`relative overflow-hidden rounded-3xl border ${venue.border} ${venue.glow} transition-all duration-500 h-full`}>
                      {/* Image */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={venue.image}
                          alt={venue.name}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-b ${venue.gradient} to-black/80`} />
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                          <venue.logo className="h-12 w-auto drop-shadow-lg" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 bg-surface-1/50">
                        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                          {t(venue.cardKey)}
                        </p>
                        <span className={`inline-flex items-center gap-2 text-sm font-medium ${venue.accent} transition-colors`}>
                          {t("common.explore")} {venue.name}
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Section 5: Team Philosophy ===== */}
        <section className="grain-overlay py-24 md:py-32 relative bg-[radial-gradient(ellipse_at_20%_50%,rgba(184,115,51,0.08)_0%,transparent_60%)]">
          <div className="mx-auto max-w-4xl px-6">
            <ScrollReveal>
              <div className="glass-card rounded-3xl p-10 md:p-14">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight uppercase mb-8">
                  {t("about.teamTitle")}
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {t("about.teamDescription")}
                </p>
                <blockquote className="border-l-2 border-white/20 pl-6">
                  <p className="text-base md:text-lg text-white/60 italic">
                    {t("about.philosophyQuote")}
                  </p>
                </blockquote>
              </div>
            </ScrollReveal>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
