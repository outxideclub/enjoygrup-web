import type { Metadata } from "next";
import { OutxideJsonLd } from "@/components/seo/json-ld";
import { AgeVerification } from "@/components/legal/age-verification";

export const metadata: Metadata = {
  title: "Outxide Club | Discoteca en Alcúdia, Mallorca",
  description:
    "Outxide Club: discoteca y club nocturno en Alcúdia. The night continues. Eventos exclusivos, DJs, y la mejor vida nocturna. Entradas via FourVenues.",
  keywords: [
    "outxide club",
    "discoteca alcudia",
    "club nocturno mallorca",
    "eventos alcudia",
    "dj mallorca",
    "entradas discoteca",
    "nightlife alcudia",
    "fourvenues",
  ],
  alternates: {
    canonical: "https://www.grupoenjoy.es/outxide",
  },
  openGraph: {
    title: "Outxide Club | Discoteca en Alcúdia, Mallorca",
    description:
      "The night continues. Discoteca y club nocturno en Alcúdia. Entradas online via FourVenues.",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function OutxideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme-outxide">
      <AgeVerification />
      {children}
      <OutxideJsonLd />
    </div>
  );
}
