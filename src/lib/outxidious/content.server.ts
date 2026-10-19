import "server-only";

import { headers } from "next/headers";
import { OUTXIDIOUS_CONTENT, parseOutxidiousContent, type OutxidiousContent } from "./content";

/**
 * Cabecera del DOBLE DE PRUEBAS de contenido: JSON en base64url con la forma
 * de OutxidiousContent. Permite a e2e/outxidious.spec.ts probar la rama
 * aprobada (claim, secciones, vídeo, tema rojo, index) con datos ficticios que
 * viven SOLO en el test, sin tocar content.ts.
 */
export const TEST_CONTENT_HEADER = "x-test-outxidious-content";

/**
 * Contenido efectivo de la landing. Fuera de `next dev` es SIEMPRE el de
 * content.ts: la cabecera solo se atiende con NODE_ENV=development (los e2e
 * corren sobre `next dev`) y nunca con VERCEL_ENV=production. Ni producción ni
 * las previews de Vercel (compiladas en modo producción) la leen, así que nadie
 * puede pintar contenido no aprobado desde fuera.
 */
export async function getOutxidiousContent(): Promise<OutxidiousContent> {
  if (process.env.NODE_ENV === "development" && process.env.VERCEL_ENV !== "production") {
    const raw = (await headers()).get(TEST_CONTENT_HEADER);
    if (raw) {
      try {
        const parsed = parseOutxidiousContent(JSON.parse(Buffer.from(raw, "base64url").toString("utf8")));
        if (parsed) return parsed;
      } catch {
        // Cabecera malformada: contenido real, como si no hubiera venido.
      }
    }
  }
  return OUTXIDIOUS_CONTENT;
}
