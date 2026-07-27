import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal/legal-page-content";
import { getServerLocale, getServerT } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  return { title: t("legal.titleEntrada") };
}

export default function CondicionesEntradaPage() {
  return <LegalPageContent slug="condiciones-entrada" />;
}
