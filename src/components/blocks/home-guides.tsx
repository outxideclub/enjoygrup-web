"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { featuredGuides, type FeaturedLocale } from "../../../data/blog/featured";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useT, useLocale } from "@/i18n";
import { localizedPath } from "@/i18n/config";

/**
 * Sección "Guías de Alcúdia" en la home: enlaza a los posts de blog más fuertes
 * desde la página de más autoridad (reparte equity al blog). Usa el módulo
 * ligero data/blog/featured.ts para no arrastrar todo posts.ts al bundle cliente.
 */
export function HomeGuides() {
  const t = useT();
  const locale = useLocale() as FeaturedLocale;

  return (
    <section className="px-6 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="mb-12 text-center">
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
              {t("home.guidesTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
              {t("home.guidesSubtitle")}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {featuredGuides.map((guide, i) => (
            <ScrollReveal key={guide.slug} delay={i * 0.05}>
              <Link
                href={localizedPath(`/blog/${guide.slug}`, locale)}
                className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 transition-colors hover:border-white/25"
              >
                <Image
                  src={guide.image}
                  alt={guide.title[locale]}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <h3 className="absolute inset-x-0 bottom-0 p-4 font-display text-sm font-semibold leading-tight text-white sm:text-base">
                  {guide.title[locale]}
                </h3>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={localizedPath("/blog", locale)}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
          >
            {t("home.guidesCta")}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
