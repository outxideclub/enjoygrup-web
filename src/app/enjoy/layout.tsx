import type { Metadata } from "next";
import { EnjoyJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Enjoy Terrace | Cocktails & Shisha en Alcúdia",
  description:
    "Enjoy Terrace: cócteles de autor, shisha premium y la mejor terraza nocturna de Alcúdia, Mallorca. Where nights begin. Abierto diario desde las 17:00.",
  keywords: [
    "enjoy terrace alcudia",
    "cocktails alcudia",
    "shisha mallorca",
    "terraza nocturna",
    "cócteles premium",
    "bar de copas alcudia",
    "nightlife mallorca",
  ],
  alternates: {
    canonical: "https://www.grupoenjoy.es/enjoy",
  },
  openGraph: {
    title: "Enjoy Terrace | Cocktails & Shisha en Alcúdia",
    description:
      "Where nights begin. Cócteles de autor y shisha premium en la mejor terraza de Alcúdia.",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function EnjoyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme-enjoy">
      {children}
      <EnjoyJsonLd />
    </div>
  );
}
