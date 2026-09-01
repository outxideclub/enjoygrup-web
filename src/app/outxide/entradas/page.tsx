import type { Metadata } from "next";
import { CheckoutClient } from "./checkout-client";
import { getServerLocale, getServerT } from "@/i18n/server";

// Taquilla embebida de Outxide (checkout de Fourvenues dentro de la web).
// Hereda del segmento /outxide el muro de edad (AgeVerification en su layout)
// y el tema. Fuera de buscadores: la landing indexable es /outxide.
export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  return {
    title: t("purchase.checkoutTitle"),
    robots: { index: false, follow: false },
  };
}

export default function EntradasPage() {
  return <CheckoutClient />;
}
