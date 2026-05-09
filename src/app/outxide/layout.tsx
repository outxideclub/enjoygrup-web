import type { Metadata } from "next";

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
  openGraph: {
    title: "Outxide Club | Discoteca en Alcúdia, Mallorca",
    description:
      "The night continues. Discoteca y club nocturno en Alcúdia. Entradas online via FourVenues.",
    type: "website",
    locale: "es_ES",
  },
};

export default function OutxideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="theme-outxide">{children}</div>;
}
