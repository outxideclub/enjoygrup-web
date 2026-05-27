import type { Metadata } from "next";
import { HiruJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Hiru Food & Drinks | Restaurante a la Brasa en Alcudia",
  description:
    "Hiru: cocina mallorquina a la brasa en Alcúdia. Carnes maduradas, arroces de lonja y pescados del Mediterráneo. Producto, tradición y sabor.",
  keywords: [
    "hiru alcudia",
    "restaurante alcudia",
    "cocina mallorquina",
    "carne a la brasa",
    "arroces mallorca",
    "pescado fresco",
    "restaurante mallorca",
  ],
  alternates: {
    canonical: "https://www.grupoenjoy.es/hiru",
  },
  openGraph: {
    title: "Hiru Food & Drinks | Restaurante a la Brasa en Alcúdia",
    description:
      "Producto, tradición y sabor. Cocina mallorquina a la brasa en Alcúdia.",
    type: "website",
    locale: "es_ES",
    url: "https://www.grupoenjoy.es/hiru",
    images: [
      {
        url: "https://www.grupoenjoy.es/images/hiru/694647172_122298670106201104_2257975202148597878_n.jpg",
        width: 1200,
        height: 630,
        alt: "Hiru Food & Drinks — Restaurante a la Brasa en Alcúdia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.grupoenjoy.es/images/hiru/694647172_122298670106201104_2257975202148597878_n.jpg"],
  },
};

export default function HiruLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="theme-hiru">
      {children}
      <HiruJsonLd />
    </div>
  );
}
