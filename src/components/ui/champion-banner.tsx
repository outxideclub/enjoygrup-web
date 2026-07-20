"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Trophy } from "lucide-react";
import { useT } from "@/i18n";
import { CHAMPION } from "@/lib/mundial/event-config";

/**
 * Escudo de campeón ORIGINAL. NO reproduce el escudo oficial de ninguna
 * federación (sin corona, cuarteles heráldicos, lemas ni siglas federativas):
 * es un emblema propio con las bandas rojo-gualda-rojo de la bandera de España,
 * laureles de victoria (símbolo genérico) y una estrella dorada por cada título
 * (CHAMPION.stars). Uso decorativo/celebrativo.
 */
function ChampionShield({ stars, className = "" }: { stars: number; className?: string }) {
  const starRow = Array.from({ length: stars });
  const shieldPath = "M70 26 L118 40 V92 C118 126 98 150 70 162 C42 150 22 126 22 92 V40 Z";
  // Una hoja de laurel, reutilizada a lo largo de cada rama.
  const leaf = "M0 0 C4 -3 9 -2 11 3 C7 5 2 4 0 0 Z";
  const leaves = [
    { y: 138, a: 60 }, { y: 122, a: 48 }, { y: 106, a: 36 },
    { y: 90, a: 26 }, { y: 74, a: 16 }, { y: 60, a: 8 },
  ];
  return (
    <svg viewBox="0 0 140 190" className={className} role="img" aria-hidden>
      <defs>
        <linearGradient id="champGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fde68a" />
          <stop offset="0.5" stopColor="#f5b301" />
          <stop offset="1" stopColor="#b45309" />
        </linearGradient>
        <linearGradient id="champShine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <clipPath id="shieldClip">
          <path d={shieldPath} />
        </clipPath>
      </defs>

      {/* Laureles de victoria a ambos lados (símbolo genérico, no heráldico) */}
      {[1, -1].map((side) => (
        <g key={side} transform={`translate(70,0) scale(${side},1)`}>
          {leaves.map((lf, i) => (
            <path
              key={i}
              d={leaf}
              transform={`translate(46,${lf.y}) rotate(${lf.a})`}
              fill="url(#champGold)"
              opacity="0.9"
            />
          ))}
        </g>
      ))}

      {/* Estrellas de los títulos */}
      <g transform="translate(70,0)">
        {starRow.map((_, i) => {
          const gap = 26;
          const x = (i - (stars - 1) / 2) * gap;
          return (
            <path
              key={i}
              transform={`translate(${x},14) scale(1.35)`}
              d="M0 -8 l2.4 5 5.4 0.8 -3.9 3.8 0.9 5.3 -4.8 -2.5 -4.8 2.5 0.9 -5.3 -3.9 -3.8 5.4 -0.8 Z"
              fill="url(#champGold)"
            />
          );
        })}
      </g>

      {/* Cuerpo del escudo con las bandas de la bandera */}
      <g clipPath="url(#shieldClip)">
        <rect x="22" y="40" width="96" height="130" fill="#c60b1e" />
        <rect x="22" y="74" width="96" height="52" fill="#f5b301" />
        <rect x="22" y="126" width="96" height="44" fill="#c60b1e" />
        {/* Brillo diagonal */}
        <path d={shieldPath} fill="url(#champShine)" />
        {/* ESPAÑA en la banda superior */}
        <text
          x="70" y="64" textAnchor="middle" fontSize="12" fontWeight="700"
          letterSpacing="1.5"
          fontFamily="var(--font-oswald), system-ui, sans-serif" fill="#fff2cc"
        >
          ESPAÑA
        </text>
        {/* Año sobre la banda dorada */}
        <text
          x="70" y="112" textAnchor="middle" fontSize="30" fontWeight="800"
          fontFamily="var(--font-oswald), system-ui, sans-serif" fill="#7a1010"
        >
          {CHAMPION.year}
        </text>
        {/* CAMPEONA en la banda inferior */}
        <text
          x="70" y="150" textAnchor="middle" fontSize="10.5" fontWeight="700"
          letterSpacing="1.2"
          fontFamily="var(--font-oswald), system-ui, sans-serif" fill="#fff2cc"
        >
          CAMPEONA
        </text>
      </g>
      {/* Doble borde dorado del escudo */}
      <path d={shieldPath} fill="none" stroke="url(#champGold)" strokeWidth="5" />
      <path d={shieldPath} fill="none" stroke="#7a1010" strokeWidth="1" opacity="0.35" transform="scale(0.955) translate(3.3,4)" />
    </svg>
  );
}

/**
 * Banner de celebración del campeón para la home. Temporal: la home solo lo
 * monta mientras effectivePhase() === "champion" (ver event-config.ts).
 */
export function ChampionBanner() {
  const t = useT();
  const reduce = useReducedMotion();

  return (
    <section className="px-6 pb-24">
      <Link
        href={`/blog/${CHAMPION.blogSlug}`}
        aria-label={t("champion.cta")}
        className="group relative mx-auto block max-w-5xl overflow-hidden rounded-3xl border border-amber-400/25 bg-[#0c0906]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgba(198,11,30,0.18)_0%,transparent_55%),radial-gradient(ellipse_at_95%_90%,rgba(245,179,1,0.22)_0%,transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.05] bg-[repeating-linear-gradient(90deg,transparent_0,transparent_48px,#fff_48px,#fff_96px)]" />

        <div className="relative flex flex-col items-center gap-8 p-8 sm:flex-row sm:p-12">
          {/* Texto */}
          <div className="flex-1 text-center sm:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
              <Trophy size={13} />
              {t("champion.badge")}
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-5xl">
              {t("champion.title")}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-white/60 sm:mx-0 sm:text-base">
              {t("champion.text")}
            </p>
            {/* Dato factual del partido (no es marca): resultado, fecha y sede de la final. */}
            <p className="mt-4 text-xs font-medium uppercase tracking-wider text-amber-300/80">
              {t("champion.finalLabel")} · España 1–0 Argentina · 19 jul 2026 · New York/New Jersey
            </p>
            <span className="btn-magnetic mt-6 inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-black transition-colors group-hover:bg-amber-300">
              {t("champion.cta")}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          </div>

          {/* Escudo con las 2 estrellas */}
          <div className="relative flex h-48 w-48 shrink-0 items-center justify-center sm:h-60 sm:w-60">
            <div className="absolute inset-0 rounded-full bg-amber-400/20 blur-3xl" />
            <motion.div
              className="relative z-10 h-44 sm:h-52"
              animate={reduce ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChampionShield
                stars={CHAMPION.stars}
                className="h-full w-auto drop-shadow-[0_8px_24px_rgba(245,179,1,0.45)]"
              />
            </motion.div>
          </div>
        </div>
      </Link>
    </section>
  );
}
