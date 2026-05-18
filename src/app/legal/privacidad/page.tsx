import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal/legal-page-content";

export const metadata: Metadata = {
  title: "Política de Privacidad",
};

export default function PrivacidadPage() {
  return <LegalPageContent slug="privacidad" />;
}
