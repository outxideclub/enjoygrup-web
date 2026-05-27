import type { Metadata } from "next";
import { Poppins, Oswald } from "next/font/google";
import { CookieBanner } from "@/components/legal/cookie-banner";
import { AnalyticsScripts } from "@/components/seo/analytics";
import { MotionConfig } from "framer-motion";
import { LocaleProvider } from "@/i18n/context";
import { getServerLocale, getServerT } from "@/i18n/server";
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

const ogLocaleMap = { es: "es_ES", en: "en_GB" } as const;

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
    openGraph: {
      title: t("meta.ogTitle"),
      description: t("meta.ogDescription"),
      type: "website",
      locale: ogLocaleMap[locale],
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
    <html lang={locale} className={`${poppins.variable} ${oswald.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fourvenues.com" />
        <link rel="dns-prefetch" href="https://fourvenues.com" />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased" suppressHydrationWarning>
        <MotionConfig reducedMotion="user">
          <LocaleProvider initialLocale={locale}>
            {children}
            <CookieBanner />
            <AnalyticsScripts />
          </LocaleProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
