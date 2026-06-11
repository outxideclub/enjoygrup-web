"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Radio } from "lucide-react";
import { useT } from "@/i18n";
import { flagUrl } from "@/lib/mundial";

// Selecciones con más tirón para el público de la zona (decoración del banner).
const MARQUEE = ["ESP", "GER", "ENG", "BRA", "FRA", "ARG"] as const;

/** Trofeo dorado estilizado (SVG propio, sin usar el trofeo oficial FIFA). */
function TrophySVG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 150" className={className} aria-hidden role="img">
      <defs>
        <linearGradient id="gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fde68a" />
          <stop offset="0.45" stopColor="#f59e0b" />
          <stop offset="1" stopColor="#b45309" />
        </linearGradient>
        <linearGradient id="goldShine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fffbeb" stopOpacity="0.9" />
          <stop offset="0.5" stopColor="#fbbf24" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* asas */}
      <path
        d="M22 40 C2 40 2 78 30 80 L30 70 C16 68 16 50 22 50 Z"
        fill="url(#gold)"
      />
      <path
        d="M98 40 C118 40 118 78 90 80 L90 70 C104 68 104 50 98 50 Z"
        fill="url(#gold)"
      />
      {/* copa */}
      <path
        d="M28 26 L92 26 L88 64 C86 84 74 96 60 96 C46 96 34 84 32 64 Z"
        fill="url(#gold)"
      />
      <path d="M36 32 L52 32 L46 70 C44 60 40 46 36 32 Z" fill="url(#goldShine)" />
      {/* estrella */}
      <path
        d="M60 44 l3.4 7 7.7 1.1 -5.6 5.4 1.3 7.6 -6.8 -3.6 -6.8 3.6 1.3 -7.6 -5.6 -5.4 7.7 -1.1 Z"
        fill="#fffbeb"
        opacity="0.9"
      />
      {/* cuello + base */}
      <rect x="54" y="96" width="12" height="14" fill="url(#gold)" />
      <path d="M40 110 L80 110 L84 124 L36 124 Z" fill="url(#gold)" />
      <rect x="30" y="124" width="60" height="12" rx="3" fill="url(#gold)" />
      <rect x="24" y="136" width="72" height="10" rx="3" fill="#92400e" />
    </svg>
  );
}

/** Balón de fútbol (SVG propio). */
function BallSVG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden role="img">
      <circle cx="50" cy="50" r="46" fill="#fff" stroke="#0a0a0a" strokeWidth="2" />
      <path
        d="M50 22 l16 12 -6 19 -20 0 -6 -19 Z"
        fill="#0a0a0a"
      />
      <path d="M50 22 l0 -13 M66 34 l12 -6 M60 53 l13 7 M40 53 l-13 7 M34 34 l-12 -6" stroke="#0a0a0a" strokeWidth="3" fill="none" />
      <circle cx="50" cy="50" r="46" fill="none" stroke="#0a0a0a" strokeWidth="2" />
    </svg>
  );
}

export function MundialBanner() {
  const t = useT();
  const reduce = useReducedMotion();

  return (
    <section className="px-6 pb-24">
      <Link
        href="/mundial"
        aria-label={t("mundial.homeBannerCta")}
        className="group relative mx-auto block max-w-5xl overflow-hidden rounded-3xl border border-amber-400/25 bg-[#0c0a06]"
      >
        {/* fondos / glows */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(16,185,129,0.20)_0%,transparent_55%),radial-gradient(ellipse_at_95%_90%,rgba(245,158,11,0.22)_0%,transparent_55%)]" />
        {/* rayas de césped sutiles */}
        <div className="absolute inset-0 opacity-[0.06] bg-[repeating-linear-gradient(90deg,transparent_0,transparent_48px,#fff_48px,#fff_96px)]" />

        <div className="relative flex flex-col items-center gap-8 p-8 sm:flex-row sm:p-12">
          {/* Texto */}
          <div className="flex-1 text-center sm:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
              <Radio size={13} />
              {t("mundial.badge")}
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl">
              {t("mundial.homeBannerTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-white/60 sm:mx-0 sm:text-base">
              {t("mundial.homeBannerText")}
            </p>

            {/* banderas de selecciones */}
            <div className="mt-5 flex items-center justify-center gap-2 sm:justify-start">
              {MARQUEE.map((code) => (
                <Image
                  key={code}
                  src={flagUrl(code)!}
                  alt={code}
                  width={28}
                  height={28}
                  className="h-7 w-7 rounded-full object-cover ring-1 ring-white/20"
                  unoptimized
                />
              ))}
            </div>

            <span className="btn-magnetic mt-7 inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-black transition-colors group-hover:bg-amber-300">
              {t("mundial.homeBannerCta")}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          </div>

          {/* Gráfico: trofeo + balón + "2026" */}
          <div className="relative flex h-48 w-48 shrink-0 items-center justify-center sm:h-60 sm:w-60">
            {/* halo */}
            <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-3xl" />
            <span className="absolute -top-1 right-4 font-display text-6xl font-black tracking-tighter text-white/[0.06] sm:text-7xl">
              2026
            </span>
            <motion.div
              className="relative z-10 h-44 sm:h-52"
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <TrophySVG className="h-full w-auto drop-shadow-[0_8px_24px_rgba(245,158,11,0.45)]" />
            </motion.div>
            <motion.div
              className="absolute bottom-2 right-2 z-20 h-12 w-12 sm:h-14 sm:w-14"
              animate={reduce ? undefined : { y: [0, -6, 0], rotate: [0, 12, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <BallSVG className="h-full w-full drop-shadow-lg" />
            </motion.div>
          </div>
        </div>
      </Link>
    </section>
  );
}
