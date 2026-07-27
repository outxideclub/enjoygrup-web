import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal/legal-page-content";
import { getServerLocale, getServerT } from "@/i18n/server";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  return { title: t("legal.titleVenta") };
}

export default function CondicionesVentaPage() {
  return <LegalPageContent slug="condiciones-venta" />;
}
