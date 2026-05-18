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
    title: "Hiru Food & Drinks | Restaurante a la Brasa en Alcudia",
    description:
      "Producto, tradición y sabor. Cocina mallorquina a la brasa en Alcúdia.",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
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
