import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal/legal-page-content";

export const metadata: Metadata = {
  title: "Condiciones de Entrada",
};

export default function CondicionesEntradaPage() {
  return <LegalPageContent slug="condiciones-entrada" />;
}
