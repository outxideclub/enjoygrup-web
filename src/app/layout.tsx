import type { Metadata } from "next";
import { Poppins, Oswald } from "next/font/google";
import { CookieBanner } from "@/components/legal/cookie-banner";
import { AnalyticsScripts } from "@/components/seo/analytics";
import { LocaleProvider } from "@/i18n/context";
import MotionConfigProvider from "@/components/ui/motion-config-provider";
import { getServerLocale, getServerT } from "@/i18n/server";
import { HreflangTags } from "@/components/seo/hreflang-tags";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const ogLocaleMap: Record<string, string> = {
  es: "es_ES",
  en: "en_GB",
  de: "de_DE",
  fr: "fr_FR",
  it: "it_IT",
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getServerT(locale);

  return {
    metadataBase: new URL("https://www.grupoenjoy.es"),
    verification: {
      google: "949yLzP1TpjpLfi4-yVUoI_rn19gdumwRyCgnkv6fv4",
    },
    title: {
      default: t("meta.title"),
      template: "%s | Grupo Enjoy",
    },
    description: t("meta.description"),
    keywords: t("meta.keywords").split(", "),
    // alternates (canonical + hreflang) handled by <HreflangTags /> server component
    // to avoid Next.js metadata deduplication of identical URLs in cookie-based i18n
    openGraph: {
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      type: "website",
      locale: ogLocaleMap[locale] || "es_ES",
      siteName: "Grupo Enjoy",
      images: [
        {
          url: "/images/enjoy/489390658_1397879798281690_242980700226707519_n.jpg",
          width: 1200,
          height: 630,
          alt: "Grupo Enjoy — Alcúdia, Mallorca",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();

  return (
    <html lang={locale} className={`${poppins.variable} ${oswald.variable}`} style={{ scrollBehavior: "smooth" }} suppressHydrationWarning>
      <head>
        <HreflangTags />
        {/* Override Framer Motion SSR opacity:0 on hero elements for instant LCP paint.
            Removed after hydration via data-hero attribute cleanup in page.tsx */}
        <style dangerouslySetInnerHTML={{ __html: '[data-hero]{opacity:1!important;transform:none!important}' }} />
        <link rel="preconnect" href="https://fourvenues.com" />
        <link rel="dns-prefetch" href="https://fourvenues.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://hirufoodanddrinks.myrestoo.net" />
        {/* LLM-readable content for AI crawlers (llms.txt convention) */}
        <link rel="help" type="text/plain" href="/llms.txt" title="LLM summary" />
        <link rel="help" type="text/plain" href="/llms-full.txt" title="LLM full reference" />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased" suppressHydrationWarning>
        <MotionConfigProvider>
          <LocaleProvider initialLocale={locale}>
            {children}
            <CookieBanner />
            <AnalyticsScripts />
          </LocaleProvider>
        </MotionConfigProvider>
      </body>
    </html>
  );
}
