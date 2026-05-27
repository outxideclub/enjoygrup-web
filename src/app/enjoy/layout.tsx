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
    url: "https://www.grupoenjoy.es/enjoy",
    images: [
      {
        url: "https://www.grupoenjoy.es/images/enjoy/489390658_1397879798281690_242980700226707519_n.jpg",
        width: 1200,
        height: 630,
        alt: "Enjoy Terrace — Cocktails & Shisha en Alcúdia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.grupoenjoy.es/images/enjoy/489390658_1397879798281690_242980700226707519_n.jpg"],
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
