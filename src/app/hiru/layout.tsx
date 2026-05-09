import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hiru Food & Drinks | Cocina Mallorquina a la Brasa",
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
  openGraph: {
    title: "Hiru Food & Drinks | Cocina Mallorquina a la Brasa",
    description:
      "Producto, tradición y sabor. Cocina mallorquina a la brasa en Alcúdia.",
    type: "website",
    locale: "es_ES",
  },
};

export default function HiruLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="theme-hiru">{children}</div>;
}
