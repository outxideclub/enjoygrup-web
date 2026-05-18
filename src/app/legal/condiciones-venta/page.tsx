import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal/legal-page-content";

export const metadata: Metadata = {
  title: "Condiciones de Venta",
};

export default function CondicionesVentaPage() {
  return <LegalPageContent slug="condiciones-venta" />;
}
