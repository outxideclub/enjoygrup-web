"use client";

import Image from "next/image";
import { useId } from "react";
import { ArrowRight } from "lucide-react";
import { useT, useLocale } from "@/i18n";
import { localizedPath } from "@/i18n/config";
import { cn } from "@/lib/utils";
import { EMPRESAS_PATH, OUTXIDIOUS_PATH, PROMO_IMAGES } from "@/lib/promos";

/**
 * Accesos a las dos landings de octubre-2026 (encargo del 20-oct): OUTXIDIOUS
 * (Halloween, sáb 31-oct) y celebraciones de empresa. Va en la portada, /outxide
 * y /enjoy, cerca de arriba, con el acento de cada página.
 *
 * - Textos NEUTROS del namespace i18n «promos» (no hay copy creativo aprobado):
 *   ni bebida, ni precios, ni disponibilidad, ni urgencia.
 * - Qué tarjetas salen lo decide el SERVIDOR (src/lib/promos.server.ts) y llega
 *   como prop: la de OUTXIDIOUS desaparece sola al acabar el evento sin
 *   desajustes de hidratación.
 * - Enlaces con <a> (carga completa), no con <Link>: la landing de OUTXIDIOUS
 *   lleva diccionario RECORTADO y guardia de navegación (src/i18n/
 *   scoped-dictionary.ts), que solo se montan cuando su HTML se pide entero.
 *   Así se ve igual que desde el anuncio (lo que prueba e2e/outxidious.spec.ts)
 *   y el muro +18 sale por el camino de siempre. /empresas, también destino de
 *   anuncios, va igual para que un recorte futuro de su diccionario no dependa
 *   de cómo se llegó.
 */

export type PromoTone = "group" | "outxide" | "enjoy";
export type PromoKind = "outxidious" | "empresas";

interface PromoAccesosProps {
  /** Calculado en servidor (getPromoVisibility). */
  showOutxidious: boolean;
  /**
   * También del servidor: la tarjeta de empresas dice «Fin de temporada y
   * Navidad» hasta que /empresas retira su fin de temporada (lun 9-nov a las
   * 00:00) y desde ahí solo Navidad.
   */
  empresasEndOfSeason: boolean;
  /** Acento de la página: portada (neutro), OUTXIDE (cian) o Enjoy (rosa). */
  tone?: PromoTone;
  className?: string;
}

const TONES: Record<PromoTone, { label: string; accent: string; card: string; cta: string }> = {
  group: {
    label: "text-white/60",
    accent: "text-white/80",
    card: "hover:border-white/25 has-[a:focus-visible]:border-white/40",
    cta: "border-white/15 bg-white/10 text-white group-hover:border-white group-hover:bg-white group-hover:text-black",
  },
  outxide: {
    label: "text-outxide",
    accent: "text-outxide",
    card: "hover:border-outxide/30 has-[a:focus-visible]:border-outxide/50",
    cta: "border-outxide/40 text-outxide group-hover:bg-outxide/10",
  },
  enjoy: {
    label: "text-enjoy-light",
    accent: "text-enjoy-light",
    card: "hover:border-enjoy/30 has-[a:focus-visible]:border-enjoy/50",
    cta: "border-enjoy/40 text-enjoy-light group-hover:bg-enjoy/10",
  },
};

interface CardData {
  kind: PromoKind;
  href: string;
  image: string;
  imageAlt: string;
  title: string;
  when: string;
  details: string[];
  cta: string;
}

// Mismo orden en las tres páginas: primero la que caduca. En /enjoy también
// encaja (el tardeo de OUTXIDIOUS es en Enjoy Terrace).
const ORDER: readonly PromoKind[] = ["outxidious", "empresas"];

export function PromoAccesos({ showOutxidious, empresasEndOfSeason, tone = "group", className }: PromoAccesosProps) {
  const t = useT();
  const locale = useLocale();
  const labelId = useId();
  const styles = TONES[tone];

  const all: Record<PromoKind, CardData | null> = {
    outxidious: showOutxidious
      ? {
          kind: "outxidious",
          href: localizedPath(OUTXIDIOUS_PATH, locale),
          image: PROMO_IMAGES.outxidious,
          imageAlt: t("promos.outxidiousImageAlt"),
          title: t("promos.outxidiousTitle"),
          when: t("promos.outxidiousDate"),
          details: [t("promos.outxidiousTardeo"), t("promos.outxidiousNight")],
          cta: t("promos.outxidiousCta"),
        }
      : null,
    empresas: {
      kind: "empresas",
      href: localizedPath(EMPRESAS_PATH, locale),
      image: PROMO_IMAGES.empresas,
      imageAlt: t("promos.empresasImageAlt"),
      title: t("promos.empresasTitle"),
      when: t(empresasEndOfSeason ? "promos.empresasWhen" : "promos.empresasWhenChristmas"),
      details: [t("promos.empresasDetails")],
      cta: t("promos.empresasCta"),
    },
  };
  const cards = ORDER.map((k) => all[k]).filter((c): c is CardData => c !== null);
  if (cards.length === 0) return null;

  const single = cards.length === 1;
  // Ancho real de cada imagen: contenedor max-w-5xl (1024) − px-6 a cada lado,
  // dos columnas con gap-6 desde md; una sola tarjeta, max-w-xl (576).
  const sizes = single
    ? "(min-width: 624px) 576px, calc(100vw - 48px)"
    : "(min-width: 1072px) 476px, (min-width: 768px) calc(50vw - 36px), calc(100vw - 48px)";

  return (
    <section
      aria-labelledby={labelId}
      data-testid="promo-accesos"
      className={cn("relative z-20 px-6", className)}
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id={labelId}
          className={cn("mb-6 text-center text-xs font-bold uppercase tracking-[0.2em] sm:text-sm", styles.label)}
        >
          {t("promos.sectionLabel")}
        </h2>
        <ul role="list" className={cn("grid grid-cols-1 gap-6", single ? "mx-auto max-w-xl" : "md:grid-cols-2")}>
          {cards.map((card) => (
            <li key={card.kind} className="h-full">
              <PromoCard card={card} styles={styles} sizes={sizes} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PromoCard({
  card,
  styles,
  sizes,
}: {
  card: CardData;
  styles: (typeof TONES)[PromoTone];
  sizes: string;
}) {
  const titleId = useId();
  return (
    <article
      aria-labelledby={titleId}
      data-testid={`promo-${card.kind}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors",
        styles.card,
      )}
    >
      {/* Caja con proporción fija: la imagen no mueve nada al cargar (sin CLS). */}
      <div className="relative aspect-[16/9] overflow-hidden bg-black">
        <Image
          src={card.image}
          alt={card.imageAlt}
          fill
          sizes={sizes}
          className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" aria-hidden />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 id={titleId} className="font-display text-2xl font-bold uppercase leading-tight tracking-tight text-white">
          {card.title}
        </h3>
        <p className={cn("mt-2 text-sm font-semibold", styles.accent)}>{card.when}</p>
        <ul role="list" className="mt-3 space-y-1 text-sm leading-relaxed text-white/70">
          {card.details.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
        <div className="mt-auto pt-6">
          {/* <a> a propósito (ver cabecera). El ::after estira el enlace a toda
              la tarjeta. Nombre accesible = texto visible del botón + título
              («Ver el evento: Halloween 2026 · OUTXIDIOUS»): empieza por lo que
              se ve (WCAG 2.5.3) y fuera de contexto sigue diciendo adónde va. */}
          <a
            href={card.href}
            aria-label={`${card.cta}: ${card.title}`}
            data-testid={`promo-${card.kind}-link`}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors",
              "after:absolute after:inset-0 after:content-['']",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
              styles.cta,
            )}
          >
            {card.cta}
            <ArrowRight
              className="h-4 w-4 shrink-0 motion-safe:transition-transform motion-safe:group-hover:translate-x-1"
              aria-hidden
            />
          </a>
        </div>
      </div>
    </article>
  );
}
