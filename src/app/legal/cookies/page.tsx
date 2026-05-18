import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal/legal-page-content";

export const metadata: Metadata = {
  title: "Política de Cookies",
};

export default function CookiesPage() {
  return <LegalPageContent slug="cookies" />;
}
