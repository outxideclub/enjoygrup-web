import type { Metadata } from "next";
import { Poppins, Oswald } from "next/font/google";
import { CookieBanner } from "@/components/legal/cookie-banner";
import { AnalyticsScripts } from "@/components/seo/analytics";
import { MotionConfig } from "framer-motion";
import { LocaleProvider } from "@/i18n/context";
import { getServerLocale } from "@/i18n/server";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.grupoenjoy.es"),
  title: {
    default: "Grupo Enjoy | Cocteleria, Club & Restaurante",
    template: "%s | Grupo Enjoy",
  },
  description:
    "Tres experiencias unicas bajo un mismo grupo. Enjoy Terrace, Outxide Club y Hiru Food & Drinks en Alcudia, Mallorca.",
  keywords: [
    "grupo enjoy",
    "cocteleria alcudia",
    "discoteca alcudia",
    "restaurante alcudia",
    "enjoy terrace",
    "outxide club",
    "hiru food drinks",
    "nightlife mallorca",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Grupo Enjoy",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();

  return (
    <html lang={locale} className={`${poppins.variable} ${oswald.variable}`} suppressHydrationWarning>
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
