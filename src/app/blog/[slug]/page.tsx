import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import { getPostBySlug, getAllPosts, toBlogLocale, getPostText } from "../../../../data/blog/posts";
import { getServerLocale, getServerT } from "@/i18n/server";
import { JsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { notFound } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BlogPostClient } from "./client";

const BASE_URL = "https://www.grupoenjoy.es";

const ogLocaleMap: Record<string, string> = { es: "es_ES", en: "en_GB", de: "de_DE", fr: "fr_FR", it: "it_IT" };

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getServerLocale();
  const blogLocale = toBlogLocale(locale);
  const post = getPostBySlug(slug);
  if (!post) return {};

  const title = getPostText(post.title, blogLocale);
  const description = getPostText(post.excerpt, blogLocale);

  return {
    title,
    description,
    alternates: {
      canonical: `${BASE_URL}/blog/${post.slug}`,
      languages: {
        "x-default": `${BASE_URL}/blog/${post.slug}`,
        es: `${BASE_URL}/blog/${post.slug}`,
        en: `${BASE_URL}/blog/${post.slug}`,
        de: `${BASE_URL}/blog/${post.slug}`,
        fr: `${BASE_URL}/blog/${post.slug}`,
        it: `${BASE_URL}/blog/${post.slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      locale: ogLocaleMap[locale] || "es_ES",
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getServerLocale();
  const blogLocale = toBlogLocale(locale);
  const t = getServerT(locale);
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const title = getPostText(post.title, blogLocale);
  const rawContent = getPostText(post.content, blogLocale);
  const content = DOMPurify.sanitize(rawContent);
  const excerpt = getPostText(post.excerpt, blogLocale);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: excerpt,
    image: `${BASE_URL}${post.image}`,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: post.author,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Grupo Enjoy",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logos/enjoy.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${post.slug}`,
    },
    wordCount: rawContent.replace(/<[^>]+>/g, "").split(/\s+/).length,
    articleSection: post.tags[0],
    keywords: post.tags.join(", "),
  };

  const breadcrumbItems = [
    { name: t("common.backToGroup"), url: BASE_URL },
    { name: "Blog", url: `${BASE_URL}/blog` },
    { name: title, url: `${BASE_URL}/blog/${post.slug}` },
  ];

  const dateLocaleMap: Record<string, string> = { es: "es-ES", en: "en-GB", de: "de-DE", fr: "fr-FR", it: "it-IT" };
  const formattedDate = new Date(post.date).toLocaleDateString(
    dateLocaleMap[locale] || "es-ES",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const venueDescriptions: Record<string, Record<string, string>> = {
    enjoy: { es: "Cócteles de autor y shisha premium", en: "Signature cocktails and premium shisha", de: "Signature-Cocktails und Premium-Shisha", fr: "Cocktails signature et shisha premium", it: "Cocktail d'autore e shisha premium" },
    outxide: { es: "Los mejores DJs y noches inolvidables", en: "The best DJs and unforgettable nights", de: "Die besten DJs und unvergessliche Nächte", fr: "Les meilleurs DJs et des nuits inoubliables", it: "I migliori DJ e notti indimenticabili" },
    hiru: { es: "Cocina a la brasa y producto fresco", en: "Charcoal grill cuisine and fresh produce", de: "Grillküche und frische Produkte", fr: "Cuisine au charbon et produits frais", it: "Cucina alla brace e prodotti freschi" },
  };

  const venues = [
    {
      name: "Enjoy Terrace",
      href: "/enjoy",
      description: venueDescriptions.enjoy[locale] || venueDescriptions.enjoy.es,
      icon: "wine" as const,
      accent: "text-enjoy",
      border: "border-enjoy/20 hover:border-enjoy/40",
      glow: "hover:shadow-[0_4px_24px_rgba(236,72,153,0.15)]",
    },
    {
      name: "Outxide Club",
      href: "/outxide",
      description: venueDescriptions.outxide[locale] || venueDescriptions.outxide.es,
      icon: "music" as const,
      accent: "text-outxide",
      border: "border-outxide/20 hover:border-outxide/40",
      glow: "hover:shadow-[0_4px_24px_rgba(6,182,212,0.15)]",
    },
    {
      name: "Hiru Food & Drinks",
      href: "/hiru",
      description: venueDescriptions.hiru[locale] || venueDescriptions.hiru.es,
      icon: "flame" as const,
      accent: "text-hiru",
      border: "border-hiru/20 hover:border-hiru/40",
      glow: "hover:shadow-[0_4px_24px_rgba(184,115,51,0.15)]",
    },
  ];

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

  return (
    <div className="noise-texture relative">
      <Navbar />
      <JsonLd data={articleJsonLd} />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <main>
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-end overflow-hidden">
        <Image
          src={post.image}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 pb-12 sm:pb-16 w-full">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-white/50">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {t("common.backToGroup")}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white/70 truncate max-w-[200px]">{title}</li>
            </ol>
          </nav>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-sm ${tagColorMap[tag] || "bg-white/10 text-white/70 border-white/10"}`}
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight uppercase leading-tight">
            {title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-5 text-sm text-white/60">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>{formattedDate}</time>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {post.readingTime} min {t("blog.readingTime")}
            </span>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="grain-overlay py-16 sm:py-20 relative">
        <div className="mx-auto max-w-3xl px-6">
          <article
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-display prose-headings:uppercase prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-white
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-white/90
              prose-p:text-white/70 prose-p:leading-relaxed prose-p:mb-5
              prose-li:text-white/70 prose-li:leading-relaxed
              prose-strong:text-white prose-strong:font-semibold
              prose-ul:my-4 prose-ul:pl-0
              prose-a:text-enjoy prose-a:underline-offset-4 prose-a:hover:text-enjoy-light"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </section>

      {/* Back to blog */}
      <div className="mx-auto max-w-3xl px-6 pb-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("blog.backToBlog")}
        </Link>
      </div>

      {/* Discover Venues */}
      <BlogPostClient venues={venues} discoverLabel={t("blog.discoverVenues")} visitLabel={t("common.visit")} />

      </main>
      <Footer />
    </div>
  );
}
