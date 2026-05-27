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
    title: {
      default: t("meta.title"),
      template: "%s | Grupo Enjoy",
    },
    description: t("meta.description"),
    keywords: t("meta.keywords").split(", "),
    alternates: {
      canonical: "https://www.grupoenjoy.es",
      languages: {
        "x-default": "https://www.grupoenjoy.es",
        es: "https://www.grupoenjoy.es",
        en: "https://www.grupoenjoy.es",
        de: "https://www.grupoenjoy.es",
        fr: "https://www.grupoenjoy.es",
        it: "https://www.grupoenjoy.es",
      },
    },
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
        <link rel="preconnect" href="https://fourvenues.com" />
        <link rel="dns-prefetch" href="https://fourvenues.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://hirufoodanddrinks.myrestoo.net" />
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
