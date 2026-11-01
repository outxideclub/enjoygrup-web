import { readFileSync } from "node:fs";
import { test, expect } from "@playwright/test";
import { es } from "../src/i18n/dictionaries/es";
import { en } from "../src/i18n/dictionaries/en";
import { de } from "../src/i18n/dictionaries/de";
import { fr } from "../src/i18n/dictionaries/fr";
import { it as itDict } from "../src/i18n/dictionaries/it";

// Horario de Enjoy Terrace: abre a las 17:00 (orden de Sergi, 1-nov-2026:
// «cambio de horario en enjoy, abrimos 17h desde ya»). La misma hora en los
// 5 idiomas, en los datos para buscadores (JSON-LD) y en llms.txt; ninguna
// apertura vieja (18:00, 19:00…) en lo que se publica de Enjoy.

const DICTS = { es, en, de, fr, it: itDict } as const;
const OPENS_17 = /\b17(?::00|h00|h)?\b|\b17 Uhr\b/;
const OTHER_OPENING = /\b(1[0-689]|20)(?::00|h00|h)\b|\b(1[0-689]|20) Uhr\b|\b[4-8] ?pm\b/i;

test.describe("horario de Enjoy Terrace", () => {
  test("los 5 idiomas dicen que abre a las 17:00 (página de Enjoy, contacto, FAQ y agenda)", () => {
    for (const [loc, d] of Object.entries(DICTS)) {
      const texts = {
        "enjoy.hours": d.enjoy.hours,
        "contact.enjoyHours": d.contact.enjoyHours,
        "faq.enjoyA2": d.faq.enjoyA2,
        "faq.enjoyA5": d.faq.enjoyA5,
        "agenda.enjoySchedule": d.agenda.enjoySchedule,
      };
      for (const [key, text] of Object.entries(texts)) {
        expect(text, `${loc} ${key}`).toMatch(OPENS_17);
        expect(text, `${loc} ${key}`).not.toMatch(OTHER_OPENING);
      }
    }
  });

  test("llms.txt y llms-full.txt: Enjoy Terrace desde las 17:00, sin otra hora de apertura", () => {
    for (const file of ["public/llms.txt", "public/llms-full.txt"]) {
      const lines = readFileSync(file, "utf8").split("\n").filter((l) => /enjoy terrace/i.test(l) && /\bfrom \d/i.test(l));
      expect(lines.length, file).toBeGreaterThan(0);
      // La primera hora «from …» detrás de «Enjoy Terrace» es la suya (la de
      // Outxide, 23:00, va después en la misma línea).
      for (const line of lines) {
        expect(line.match(/Enjoy Terrace.*?\bfrom (\d{2}:\d{2})/i)?.[1], `${file}: ${line}`).toBe("17:00");
      }
    }
  });

  test("/enjoy: el JSON-LD abre a las 17:00", async ({ request }) => {
    const html = await (await request.get("/enjoy")).text();
    const blocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
    const opens = blocks.flatMap((b) => [...b.matchAll(/"opens":"(\d{2}:\d{2})"/g)].map((m) => m[1]));
    expect(opens.length).toBeGreaterThan(0);
    expect(new Set(opens)).toEqual(new Set(["17:00"]));
  });
});
