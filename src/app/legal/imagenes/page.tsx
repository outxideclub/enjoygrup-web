import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal/legal-page-content";

export const metadata: Metadata = {
  title: "Política de Captación de Imágenes",
};

export default function ImagenesPage() {
  return <LegalPageContent slug="imagenes" />;
}
