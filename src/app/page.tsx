import { headers } from "next/headers";
import { getPromoVisibility } from "@/lib/promos.server";
import { HomeClient } from "./home-client";

// Portada. La isla cliente (hero, tarjetas de los locales, guías) vive en
// home-client.tsx; aquí, en servidor, solo se decide qué accesos a las landings
// de octubre se pintan (la tarjeta de OUTXIDIOUS desaparece sola al acabar el
// evento y obedece a OUTXIDIOUS_PHASE: ver src/lib/promos-visibility.ts).

type SearchParams = Record<string, string | string[] | undefined>;

export default async function HomePage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const [promos, reqHeaders] = await Promise.all([getPromoVisibility(searchParams), headers()]);
  // Ahorro de datos (cabecera Save-Data): sin el vídeo del hero, solo el póster
  // (revisión PA-6; el cliente mira también navigator.connection.saveData).
  const saveData = reqHeaders.get("save-data")?.trim().toLowerCase() === "on";
  return <HomeClient showOutxidiousPromo={promos.outxidious} saveData={saveData} />;
}
