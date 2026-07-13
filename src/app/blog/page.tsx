"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { getAllPosts, toBlogLocale, getPostText, type BlogPost } from "../../../data/blog/posts";
import { useT, useLocale } from "@/i18n";

const tagColorMap: Record<string, string> = {
  nightlife: "bg-outxide/15 text-outxide border-outxide/20",
  alcudia: "bg-white/10 text-white/70 border-white/10",
  mallorca: "bg-white/10 text-white/70 border-white/10",
  restaurants: "bg-hiru/15 text-hiru-light border-hiru/20",
  food: "bg-hiru/15 text-hiru-light border-hiru/20",
  hiru: "bg-hiru/15 text-hiru-light border-hiru/20",
  activities: "bg-outxide/15 text-outxide border-outxide/20",
  guide: "bg-outxide/15 text-outxide border-outxide/20",
  outxide: "bg-outxide/15 text-outxide border-outxide/20",
  clubs: "bg-outxide/15 text-outxide border-outxide/20",
  events: "bg-outxide/15 text-outxide border-outxide/20",
  cocktails: "bg-enjoy/15 text-enjoy border-enjoy/20",
  shisha: "bg-enjoy/15 text-enjoy border-enjoy/20",
  enjoy: "bg-enjoy/15 text-enjoy border-enjoy/20",
  terrace: "bg-enjoy/15 text-enjoy border-enjoy/20",
};

function venueAccent(venue?: BlogPost["venue"]): string {
  switch (venue) {
    case "enjoy":
      return "hover:border-enjoy/30 hover:shadow-[0_4px_24px_rgba(236,72,153,0.15)]";
    case "outxide":
      return "hover:border-outxide/30 hover:shadow-[0_4px_24px_rgba(6,182,212,0.15)]";
    case "hiru":
      return "hover:border-hiru/30 hover:shadow-[0_4px_24px_rgba(184,115,51,0.15)]";
    default:
      return "hover:border-white/15";
  }
}

function formatDate(dateStr: string, locale: string): string {
  const localeMap: Record<string, string> = { es: "es-ES", en: "en-GB", de: "de-DE", fr: "fr-FR", it: "it-IT" };
  return new Date(dateStr).toLocaleDateString(localeMap[locale] || "es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const t = useT();
  const locale = useLocale();
  const bl = toBlogLocale(locale);

  return (
    <ScrollReveal delay={index * 0.1}>
      <Link href={`/blog/${post.slug}`} className="group block h-full">
        <article
          className={`glass-card rounded-2xl overflow-hidden transition-all duration-500 h-full flex flex-col ${venueAccent(post.venue)}`}
        >
          {/* Image */}
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={post.image}
              alt={getPostText(post.title, bl)}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Tags */}
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-sm ${tagColorMap[tag] || "bg-white/10 text-white/70 border-white/10"}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-5 sm:p-6">
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readingTime} min {t("blog.readingTime")}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-white/90 transition-colors leading-tight">
              {getPostText(post.title, bl)}
            </h2>

            <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-3">
              {getPostText(post.excerpt, bl)}
            </p>

            <span className="inline-flex items-center gap-2 text-sm font-medium text-white/60 group-hover:text-white transition-colors mt-auto">
              {t("blog.readMore")}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </article>
      </Link>
    </ScrollReveal>
  );
}

export default function BlogPage() {
  const t = useT();
  const locale = useLocale();
  const posts = getAllPosts();
  const bl = toBlogLocale(locale);

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog | Grupo Enjoy",
    description: t("meta.blogDescription"),
    url: "https://www.grupoenjoy.es/blog",
    isPartOf: {
      "@type": "WebSite",
      name: "Grupo Enjoy",
      url: "https://www.grupoenjoy.es",
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: getPostText(post.title, bl),
        url: `https://www.grupoenjoy.es/blog/${post.slug}`,
      })),
    },
  };

  return (
    <div className="noise-texture relative">
      <Navbar />
      <JsonLd data={collectionJsonLd} />
      <main id="contenido">
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(236,72,153,0.1)_0%,transparent_50%),radial-gradient(ellipse_at_80%_80%,rgba(6,182,212,0.08)_0%,transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-6">
          <ScrollReveal>
            <div className="text-center">
              <p className="text-sm font-bold tracking-[0.2em] text-white/40 uppercase mb-4">
                Grupo Enjoy
              </p>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight uppercase">
                {t("blog.title")}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t("blog.subtitle")}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="grain-overlay pb-32 relative">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {posts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
