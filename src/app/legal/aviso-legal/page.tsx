import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal/legal-page-content";

export const metadata: Metadata = {
  title: "Aviso Legal",
};

export default function AvisoLegalPage() {
  return <LegalPageContent slug="aviso-legal" />;
}
