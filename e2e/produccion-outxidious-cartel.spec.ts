import { test, expect } from "@playwright/test";

// Comprobación CONTRA PRODUCCIÓN (https://www.grupoenjoy.es, no el baseURL):
// el cartel viejo de OUTXIDIOUS, con DAVID CASTRO (23-oct-2026: «david castro
// no viene»), no se sirve por ningún camino público. Además del origen,
// cubre las cachés de delante: Cloudflare (el archivo de /images iba con
// caché immutable de un año) y el optimizador de imágenes de Vercel
// (/_next/image), también para el flyer viejo que traía la API de Fourvenues.
//
// Depende del estado de producción, así que no corre con el resto de la
// suite: PROD_CHECK=1 npx playwright test e2e/produccion-outxidious-cartel.spec.ts
test.skip(!process.env.PROD_CHECK, "solo con PROD_CHECK=1 (mira producción)");

const PROD = "https://www.grupoenjoy.es";
const OLD_CARTEL = "/images/outxidious/outxidious-cartel-4x5.jpg";
const NEW_CARTEL = "/images/outxidious/outxidious-cartel-4x5-23oct.jpg";
const OLD_FLYER = "https://fourvenues.com/cdn-cgi/imagedelivery/kWuoTchaMsk7Xnc_FNem7A/7b0926e9-1bb7-41cc-8427-c79ea3cad400/w=1350";
const LANDINGS = ["/outxide/outxidious", "/en/outxide/outxidious", "/de/outxide/outxidious", "/fr/outxide/outxidious", "/it/outxide/outxidious"];
const nextImage = (src: string, w: number) => `${PROD}/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75`;

test.describe("producción · OUTXIDIOUS sin el cartel viejo", () => {
  test("el archivo borrado da 404 en la URL exacta, sin query (también desde la caché de Cloudflare)", async ({ request }) => {
    const res = await request.get(`${PROD}${OLD_CARTEL}`);
    expect(res.status(), `cf-cache-status: ${res.headers()["cf-cache-status"]}`).toBe(404);
    expect(res.headers()["content-type"] ?? "").not.toMatch(/^image\//);
  });

  test("el optimizador de imágenes ya no devuelve el cartel viejo ni el flyer viejo de Fourvenues", async ({ request }) => {
    for (const src of [OLD_CARTEL, OLD_FLYER]) {
      for (const w of [640, 1080, 1920]) {
        const res = await request.get(nextImage(src, w));
        const tag = `${src} w=${w} · x-vercel-cache: ${res.headers()["x-vercel-cache"]}`;
        expect(res.headers()["content-type"] ?? "", tag).not.toMatch(/^image\//);
      }
    }
  });

  test("la landing, en los 5 idiomas, solo usa el cartel nuevo y no nombra a DAVID CASTRO", async ({ request }) => {
    for (const path of LANDINGS) {
      const res = await request.get(`${PROD}${path}`);
      expect(res.status(), path).toBe(200);
      const html = await res.text();
      expect(html, path).not.toMatch(/david\s*castro/i);
      expect(html, path).not.toContain("outxidious-cartel-4x5.jpg");
      expect(html, path).not.toContain("7b0926e9-1bb7-41cc-8427-c79ea3cad400");
      expect(html, path).toContain(NEW_CARTEL);
    }
    const img = await request.get(`${PROD}${NEW_CARTEL}`);
    expect(img.status()).toBe(200);
    expect(img.headers()["content-type"]).toBe("image/jpeg");
  });
});
