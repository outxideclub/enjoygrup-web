import { test, expect, type APIRequestContext, type BrowserContext, type Page } from "@playwright/test";
import { es } from "../src/i18n/dictionaries/es";
import { en } from "../src/i18n/dictionaries/en";
import { de } from "../src/i18n/dictionaries/de";
import { fr } from "../src/i18n/dictionaries/fr";
import { it as itDict } from "../src/i18n/dictionaries/it";
import { dictionaryScopeFor, pickDictionary } from "../src/i18n/scoped-dictionary";
import { EMPRESAS_CONTENT, isEmpresasIndexable, type EmpresasContent } from "../src/lib/empresas/content";
import { hasForbiddenLexicon } from "../src/lib/empresas/lexicon";
import { EMPRESAS_OFFER, isOfferPublished } from "../src/lib/empresas/offer";
import { isBefore, parseInstant, resolveNow } from "../src/lib/empresas/schedule";
import { isEndOfSeasonLive, resolveEmpresasMeta, resolveEmpresasView } from "../src/lib/empresas/view";

// /empresas — landing de CELEBRACIONES DE EMPRESA (destino del anuncio de Meta
// GRUPOENJOY | 20261108 | EMPRESAS). Desde el 20-oct-2026 lleva la creatividad
// PROVISIONAL del paquete CREATIVO-LANDING-EMPRESAS.md v0.2 (ES y EN) en
// src/lib/empresas/content.ts; DE/FR/IT siguen con los textos neutros. La
// oferta (offer.ts) sigue vacía, así que la página sigue en NOINDEX.
//
// Ajustes del 20-oct-2026 (tarde): antetítulo y H1 del CARTEL del anuncio
// (el antetítulo de fin de temporada se retira con el bloque, al acabar el
// conjunto el dom 8-nov, COPYS.md v1.7), Navidad A con «En diciembre, fines de semana o bajo reserva para
// grupos.», FAQ 2 con la apertura confirmada por Sergi, diccionario RECORTADO
// (src/i18n/scoped-dictionary.ts: ni shisha ni cócteles en el HTML, scripts
// incluidos) con su guarda de navegación, y muro +18 sin la foto rota.
//
// Comprueba: primera pantalla en 375×550 con la placa +18, muro +18 (el mismo
// componente de /outxide, con su texto propio), bloque de fin de temporada que
// se retira solo al acabar el conjunto, el dom 8-nov (?now= solo fuera de
// producción), Navidad SIN fechas, solo fotos permitidas, léxico prohibido
// ausente (también en metadatos), formulario accesible, campaña (utm_* +
// fbclid) hasta la solicitud y defensas de la API.
//
// El dev server de los e2e arranca SIN RESEND_API_KEY (playwright.config.ts):
// la API responde 503 y ninguna prueba manda correos reales. Los envíos felices
// del formulario se interceptan con page.route.

test.use({ locale: "es-ES" });

const LANDING =
  "/empresas?utm_source=meta&utm_medium=paid_social" +
  "&utm_campaign=GRUPOENJOY%20%7C%2020261022%20%7C%20TRAFICO" +
  "&utm_term=GRUPOENJOY%20%7C%2020261108%20%7C%20EMPRESAS" +
  "&utm_content=GRUPOENJOY%20%7C%2020261108%20%7C%20EMPRESAS-45-E2" +
  "&fbclid=PRUEBA123";

const EXPECTED_CAMPAIGN = {
  utm_source: "meta",
  utm_medium: "paid_social",
  utm_campaign: "GRUPOENJOY | 20261022 | TRAFICO",
  utm_term: "GRUPOENJOY | 20261108 | EMPRESAS",
  utm_content: "GRUPOENJOY | 20261108 | EMPRESAS-45-E2",
  fbclid: "PRUEBA123",
};

const AGE_KEY = "ge_age_verified";
const CONSENT_KEY = "ge_cookie_consent";

// Textos del CARTEL del anuncio (antetítulo y H1) y del paquete (§4.2) que la
// página tiene que pintar tal cual.
const H1_LINES_ES = ["La cena, donde queráis.", "La fiesta, con nosotros."];
const H1_LINES_EN = ["Dinner, wherever you like.", "The party, with us."];
const EYEBROW_SEASON_ES = "Celebra tu fin de temporada en OUTXIDE Club";
const EYEBROW_SEASON_EN = "Celebrate your end of season at OUTXIDE Club";
const EYEBROW_NEUTRAL_ES = "Celebraciones de empresa · Port d'Alcúdia";
const EYEBROW_NEUTRAL_EN = "Company celebrations · Port d'Alcúdia";
// Navidad A y FAQ 2 con la apertura confirmada por Sergi (20-oct-2026).
const XMAS_TITLE_ES = "La cena de Navidad, donde queráis. La fiesta de después, con nosotros.";
const XMAS_DATES_ES = "En diciembre, fines de semana o bajo reserva para grupos.";
const XMAS_DATES_EN = "In December, weekends or by group booking.";
const FAQ2_ES = "Hasta mediados de noviembre, cualquier día; después, fines de semana o bajo reserva para grupos.";
const FAQ2_EN = "Until mid-November, any day; after that, weekends or by group booking.";
const PLATE_ES = "+18 · Consumo responsable";
const PLATE_EN = "18+ · Drink responsibly";
const CTA_ES = "Pedir presupuesto";
const OFFER_CUSTOM_ES =
  "Contadnos la fecha, cuántos seréis y qué formato os encaja, y os mandamos un presupuesto cerrado, con el IVA incluido.";

// Horas de prueba (?now=, ISO con desfase; el 31-oct ya es +01:00).
const BEFORE_CUTOFF = "2026-10-31T17:59:00+01:00";
const AT_CUTOFF = "2026-10-31T18:00:00+01:00";
const AFTER_HALLOWEEN_FAQ = "2026-10-31T23:00:00+01:00";
// Fin de temporada (bloque y antetítulo del cartel): hasta el final del
// conjunto de empresas, dom 8-nov 23:59 (COPYS.md v1.7; revisión F2).
const SEASON_LAST_MINUTE = "2026-11-08T23:59:00+01:00";
const SEASON_OVER = "2026-11-09T00:00:00+01:00";
const withNow = (path: string, iso: string) => `${path}${path.includes("?") ? "&" : "?"}now=${encodeURIComponent(iso)}`;

// Léxico prohibido en páginas destino de anuncios (reglas del dueño y paquete
// §6). Se compara en minúsculas y sin acentos.
const FORBIDDEN: readonly RegExp[] = [
  /\bbarra libre\b/,
  /\bfree bar\b/,
  /\bcopas? incluidas?\b/,
  /\bcopas?\b/,
  /\bchupitos?\b/,
  /\bbotellas?\b/,
  /\b2 ?x ?1\b/,
  /\bhappy hour\b/,
  /\bultimas plazas\b/,
  /\bplazas limitadas\b/,
  /\bse llenan\b/,
  /\bquedan\b/,
  /\bagotad[oa]s?\b/,
  // Tabaco: la shisha en una landing de Meta es publicidad de tabaco.
  /\bshisha\b/,
  /\bcachimbas?\b/,
  // La bebida como gancho (la web los usa en Enjoy y en la VIP; aquí no).
  /\bcocteles?\b/,
  /\bcocktails?\b/,
  /\bmixologia\b/,
  // Conducción, léxico vetado en destinos de pago y campaña de Halloween.
  /\bsin coger el coche\b/,
  /\btaxis?\b/,
  /\boficial(es)?\b/,
  /\binsidious\b/,
  /\bpuerta roja\b/,
];

function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

function forbiddenFound(text: string): string[] {
  const t = normalize(text);
  return FORBIDDEN.filter((re) => re.test(t)).map((re) => `${re} → «${t.match(re)?.[0]}»`);
}

// Lo que NO puede viajar en el HTML de /empresas, scripts incluidos (payload
// RSC con el diccionario): tabaco, bebida como gancho y el emoji 🍭 de otras
// piezas. «chicha» es la shisha en el diccionario francés. Sin acentos.
const HTML_FORBIDDEN: readonly RegExp[] = [
  /shisha/,
  /chicha/,
  /cachimba/,
  /coctel/,
  /cocktail/,
  /\bcopas?\b/,
  /botella/,
  /barra libre/,
  /chupito/,
  /\u{1F36D}/u,
];

// Horarios que ya no valen (apertura confirmada por Sergi el 20-oct-2026):
// «jueves a sábado» y «mayo-octubre», en cualquiera de los 5 idiomas.
const OLD_HOURS =
  /jueves a sabado|de jueves|mayo.{0,3}octubre|may.{0,3}oct\b|thursday to saturday|donnerstag bis samstag|du jeudi au samedi|dal giovedi al sabato/;

function htmlForbiddenFound(html: string): string[] {
  const t = normalize(html);
  return HTML_FORBIDDEN.filter((re) => re.test(t)).map((re) => {
    const m = re.exec(t)!;
    return `${re} → …${t.slice(Math.max(0, m.index - 60), m.index + 40)}…`;
  });
}

const DICTS = { es, en, de, fr, it: itDict } as const;

/** Todas las claves hoja del diccionario ("ns.clave"): sirven para cazar claves crudas pintadas. */
function leafKeys(obj: unknown, prefix = ""): string[] {
  if (typeof obj !== "object" || obj === null) return [prefix];
  return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) => leafKeys(v, prefix ? `${prefix}.${k}` : k));
}
const ALL_KEYS = leafKeys(es);

/**
 * Claves sin traducir en la página: texto visible Y atributos (aria-label,
 * placeholder, title, alt…), porque la cabecera pone sus claves en aria-label
 * y esas no salen en innerText.
 */
async function rawKeysOnPage(page: Page): Promise<string[]> {
  const text = await page.evaluate(() => {
    const skip = new Set(["class", "style", "href", "src", "srcset", "sizes", "d", "id", "for", "viewbox", "data-testid"]);
    const parts = [document.body.innerText];
    for (const el of document.body.querySelectorAll("*")) {
      for (const a of Array.from(el.attributes)) if (!skip.has(a.name.toLowerCase())) parts.push(a.value);
    }
    return parts.join("\n");
  });
  return ALL_KEYS.filter((k) => text.includes(k));
}

async function expectNoRawKeys(page: Page, where: string): Promise<void> {
  expect(await rawKeysOnPage(page), `${where}: claves sin traducir`).toEqual([]);
}

/** Marca el documento: si sigue tras navegar, la navegación fue suave (sin carga completa). */
async function markDocument(page: Page): Promise<void> {
  await page.evaluate(() => ((window as unknown as { __empMarker: number }).__empMarker = 1));
}
async function documentWasReplaced(page: Page): Promise<boolean> {
  // Mientras recarga, evaluate puede fallar (contexto destruido): se reintenta.
  for (let i = 0; i < 20; i++) {
    try {
      return await page.evaluate(() => (window as unknown as { __empMarker?: number }).__empMarker === undefined);
    } catch {
      await page.waitForTimeout(250);
    }
  }
  throw new Error("no se pudo leer el documento tras navegar");
}

// Texto del diccionario que NINGUNA página pinta en servidor: solo está en su
// HTML si viaja el diccionario entero en el payload RSC (prefijos sin comillas
// ni acentos, para buscarlos tal cual dentro del payload escapado).
const SENTINELS: Record<keyof typeof DICTS, string> = {
  es: es.purchase.thanksSubtitle.slice(0, 26),
  en: en.purchase.thanksSubtitle.slice(0, 26),
  de: de.purchase.thanksSubtitle.slice(0, 27),
  fr: fr.purchase.thanksSubtitle.slice(0, 22),
  it: itDict.purchase.thanksSubtitle.slice(0, 15),
};

/** YYYY-MM-DD a `days` días de hoy (hora local del runner, con margen de sobra). */
function isoInDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Todas las cadenas de un objeto (valores, no claves), unidas, en minúsculas. */
function allText(v: unknown): string {
  const out: string[] = [];
  const walk = (x: unknown) => {
    if (typeof x === "string") out.push(x);
    else if (Array.isArray(x)) x.forEach(walk);
    else if (x && typeof x === "object") Object.values(x).forEach(walk);
  };
  walk(v);
  return out.join("\n").toLowerCase();
}

/** `t` de servidor sobre un diccionario (para probar view.ts sin Next). */
function tFrom(dict: unknown) {
  return (key: string): string => {
    let cur: unknown = dict;
    for (const k of key.split(".")) cur = cur && typeof cur === "object" ? (cur as Record<string, unknown>)[k] : undefined;
    return typeof cur === "string" ? cur : key;
  };
}

/** Muro +18 ya confirmado y cookies ya decididas (solo necesarias), como en el resto de specs. */
async function preconfirm(context: BrowserContext, opts: { age?: boolean; cookies?: boolean } = {}): Promise<void> {
  await context.addInitScript(
    ([ageKey, consentKey, age, cookies]) => {
      try {
        if (age) sessionStorage.setItem(ageKey as string, "true");
        if (cookies) {
          localStorage.setItem(
            consentKey as string,
            JSON.stringify({
              consent: { necessary: true, analytics: false, marketing: false },
              version: "2",
              timestamp: new Date().toISOString(),
            }),
          );
        }
      } catch {
        /* sin storage */
      }
    },
    [AGE_KEY, CONSENT_KEY, opts.age !== false, opts.cookies !== false] as const,
  );
}

/** Campos por su etiqueta VISIBLE, dentro del formulario (el pie también tiene un «Teléfono»). */
function field(page: Page, label: string) {
  return page.getByTestId("empresas-form").getByLabel(label, { exact: true });
}

async function fillValidForm(page: Page, date: string): Promise<void> {
  await field(page, "Empresa").fill("Hotel Prueba Alcúdia");
  await field(page, "Tu nombre").fill("Ana Pérez");
  await field(page, "Teléfono").fill("+34 600 123 456");
  await field(page, "Correo electrónico").fill("ana.perez@example.com");
  await field(page, "¿Qué día tenéis en mente?").fill(date);
  await field(page, "¿Cuántos seréis?").fill("45");
  await field(page, "¿Qué formato os encaja?").selectOption("after_dinner");
  await field(page, "¿Cómo nos conocisteis?").selectOption("instagram");
  await field(page, "¿Algo más que debamos saber? (opcional)").fill("Fin de temporada del equipo de sala.\nSomos de un hotel de Alcúdia.");
  await page.locator("#empresas-consent").check();
}

// ===========================================================================
// 1. Reglas puras (sin navegador): reloj, condiciones, léxico y robots
// ===========================================================================

test.describe("/empresas · reglas puras", () => {
  const t = tFrom(es);
  const href = "/outxide/outxidious";

  test("reloj: ISO con desfase obligatorio, falla cerrado y ?now ignorado en producción", () => {
    expect(EMPRESAS_CONTENT.finTemporada?.visibleHasta).toBe(SEASON_OVER);
    // 00:00 del lunes 9-nov en Madrid (horario de invierno) = 23:00 UTC del 8.
    expect(parseInstant(EMPRESAS_CONTENT.finTemporada?.visibleHasta)).toBe(Date.UTC(2026, 10, 8, 23, 0, 0));
    expect(parseInstant("2026-10-31T18:00:00")).toBeNull(); // sin desfase: dependería del servidor
    expect(parseInstant("31/10/2026 18:00")).toBeNull();
    expect(isBefore(Date.UTC(2026, 9, 20), "no-es-fecha")).toBe(false);
    expect(isBefore(Date.UTC(2026, 9, 20), undefined)).toBe(false);

    const real = Date.UTC(2026, 9, 20, 10);
    expect(resolveNow({ query: AT_CUTOFF, isProduction: true, realNow: real })).toBe(real);
    expect(resolveNow({ query: AT_CUTOFF, isProduction: false, realNow: real })).toBe(Date.UTC(2026, 9, 31, 17));
    // Un «+» sin codificar llega como espacio.
    expect(resolveNow({ query: "2026-10-31T18:00:00 01:00", isProduction: false, realNow: real })).toBe(Date.UTC(2026, 9, 31, 17));
    expect(resolveNow({ query: "basura", isProduction: false, realNow: real })).toBe(real);
    expect(resolveNow({ query: undefined, isProduction: false, realNow: real })).toBe(real);
  });

  test("fin de temporada: vivo todo el conjunto (también el sáb 31 tras las 18:00) y retirado al acabar el dom 8-nov", () => {
    const before = Date.parse("2026-11-08T23:59:59+01:00");
    const at = Date.parse(SEASON_OVER);
    expect(isEndOfSeasonLive(Date.parse("2026-10-22T12:00:00+02:00"))).toBe(true);
    // El cartel E1 sigue corriendo después del cambio de tanda (F2).
    expect(isEndOfSeasonLive(Date.parse(AT_CUTOFF))).toBe(true);
    expect(isEndOfSeasonLive(Date.parse("2026-11-01T12:00:00+01:00"))).toBe(true);
    expect(isEndOfSeasonLive(before)).toBe(true);
    expect(isEndOfSeasonLive(at)).toBe(false);

    const vBefore = resolveEmpresasView({ locale: "es", now: before, t, outxidiousHref: href });
    expect(vBefore.endOfSeason?.title).toBe("Toda la temporada cuidando de los demás. Ahora os toca a vosotros.");
    // Antetítulo del cartel del anuncio mientras vive el bloque…
    expect(vBefore.hero.eyebrow).toBe(EYEBROW_SEASON_ES);
    expect(vBefore.hero.h1Lines).toEqual(H1_LINES_ES);
    const vAt = resolveEmpresasView({ locale: "es", now: at, t, outxidiousHref: href });
    expect(vAt.endOfSeason).toBeNull();
    // …y a la misma hora vuelve el neutro del paquete; el H1 del cartel se queda.
    expect(vAt.hero.eyebrow).toBe(EYEBROW_NEUTRAL_ES);
    expect(vAt.hero.h1Lines).toEqual(H1_LINES_ES);
    expect(resolveEmpresasView({ locale: "en", now: before, t: tFrom({}), outxidiousHref: href }).hero.eyebrow).toBe(EYEBROW_SEASON_EN);
    // Acabado el conjunto, «temporada» no sigue en ningún texto de la página.
    expect(allText(vAt)).not.toContain("temporada");
    const enAt = resolveEmpresasView({ locale: "en", now: at, t: tFrom({}), outxidiousHref: href });
    expect(allText(enAt)).not.toContain("season");
    expect(enAt.hero.eyebrow).toBe(EYEBROW_NEUTRAL_EN);
    expect(enAt.hero.h1Lines).toEqual(H1_LINES_EN);

    // DE (sin paquete): la línea neutra de ocasiones habla de fin de temporada → se retira a la misma hora.
    const deT = tFrom(de);
    expect(resolveEmpresasView({ locale: "de", now: before, t: deT, outxidiousHref: href }).hero.occasions).toBe(de.empresas.occasions);
    expect(resolveEmpresasView({ locale: "de", now: at, t: deT, outxidiousHref: href }).hero.occasions).toBeNull();
    // DE/FR/IT siguen con el antetítulo neutro antes y después (el cartel no se traduce).
    expect(resolveEmpresasView({ locale: "de", now: before, t: deT, outxidiousHref: href }).hero.eyebrow).toBe(de.empresas.heroEyebrow);
    expect(resolveEmpresasView({ locale: "de", now: at, t: deT, outxidiousHref: href }).hero.eyebrow).toBe(de.empresas.heroEyebrow);
  });

  test("Navidad con [SI-DICIEMBRE] (confirmado): versión A con la línea de fechas y sin la terraza; sin él, versión B", () => {
    const now = Date.parse("2026-10-25T12:00:00+01:00");
    expect(EMPRESAS_CONTENT.condiciones.siDiciembre).toBe(true);
    expect(EMPRESAS_CONTENT.condiciones.siTerrazaDic).toBe(false);
    const a = resolveEmpresasView({ locale: "es", now, t, outxidiousHref: href }).christmas;
    expect(a).toEqual({
      eyebrow: "Navidad 2026",
      title: XMAS_TITLE_ES,
      text: "Si la cena de empresa es en diciembre, la fiesta de después se organiza ahora. Vosotros elegís el restaurante; la noche la ponemos nosotros en OUTXIDE.",
      dates: XMAS_DATES_ES,
      cta: CTA_ES,
    });
    // Sin días concretos.
    expect(a!.dates).not.toMatch(/\d/);
    const aEn = resolveEmpresasView({ locale: "en", now, t: tFrom({}), outxidiousHref: href }).christmas;
    expect(aEn?.title).toBe("Your Christmas dinner, wherever you like. The party afterwards, with us.");
    expect(aEn?.dates).toBe(XMAS_DATES_EN);
    // Sin [SI-TERRAZA-DIC], la tarde en Enjoy Terrace no se promete en diciembre.
    expect(a!.text).not.toContain("Enjoy");
    expect(aEn!.text).not.toContain("Enjoy");
    // La descripción con «Navidad» ya está encendida (la condiciona [SI-DICIEMBRE]).
    expect(resolveEmpresasMeta("es", t).description).toBe(
      "La cena, donde queráis: la fiesta sigue en OUTXIDE y, según fechas, en Enjoy Terrace. Port d'Alcúdia. Fiestas de empresa y de Navidad. Pide presupuesto. +18.",
    );
    expect(resolveEmpresasMeta("en", tFrom({})).description).toContain("Team and Christmas parties");

    // Sin [SI-DICIEMBRE]: versión B, sin fechas ni promesa de OUTXIDE, y sin «Navidad» en la descripción.
    const unconfirmed: EmpresasContent = {
      ...EMPRESAS_CONTENT,
      condiciones: { ...EMPRESAS_CONTENT.condiciones, siDiciembre: false },
    };
    expect(resolveEmpresasView({ locale: "es", now, t, outxidiousHref: href, content: unconfirmed }).christmas).toEqual({
      eyebrow: "Navidad 2026",
      title: "¿La cena de Navidad es en diciembre?",
      text: "Contadnos la fecha y cuántos seréis, y os decimos qué podemos montar para la fiesta de después.",
      dates: null,
      cta: CTA_ES,
    });
    expect(resolveEmpresasMeta("es", t, unconfirmed).description.toLowerCase()).not.toContain("navidad");
    // Con [SI-TERRAZA-DIC] (aún no), entraría la frase de la terraza.
    const terrace: EmpresasContent = {
      ...EMPRESAS_CONTENT,
      condiciones: { ...EMPRESAS_CONTENT.condiciones, siTerrazaDic: true },
    };
    expect(resolveEmpresasView({ locale: "es", now, t, outxidiousHref: href, content: terrace }).christmas?.text).toContain(
      "Y si es comida, la tarde sigue antes en Enjoy Terrace.",
    );
  });

  test("FAQ: seis preguntas; la de Halloween hasta las 23:00 del 31 y después la de vestimenta", () => {
    const early = resolveEmpresasView({ locale: "es", now: Date.parse(BEFORE_CUTOFF), t, outxidiousHref: href });
    expect(early.faq).toHaveLength(6);
    // FAQ 2 con la apertura confirmada por Sergi, sin días de la semana ni meses de temporada.
    expect(early.faq![1]).toEqual({ question: "¿Qué días se puede?", answer: FAQ2_ES });
    const earlyEn = resolveEmpresasView({ locale: "en", now: Date.parse(BEFORE_CUTOFF), t: tFrom({}), outxidiousHref: href });
    expect(earlyEn.faq![1]).toEqual({ question: "Which days are available?", answer: FAQ2_EN });
    for (const v of [early, earlyEn]) expect(normalize(allText(v))).not.toMatch(OLD_HOURS);
    const halloween = early.faq![5];
    expect(halloween.question).toBe("¿Y si queremos celebrarlo en Halloween?");
    // Sin [SI-GRUPOS-31] ni [SI-VENTA-ONLINE]: ni oferta de grupo ni frase de entradas.
    expect(halloween.answer).not.toContain("pedid presupuesto");
    expect(halloween.answer).not.toContain("grupoenjoy.es/outxide/outxidious");
    expect(halloween.link).toBeUndefined();
    // «tardeo» siempre con «acceso libre» en la misma frase (COPYS §0.3).
    expect(halloween.answer).toContain("tardeo de acceso libre");

    const late = resolveEmpresasView({ locale: "es", now: Date.parse(AFTER_HALLOWEEN_FAQ), t, outxidiousHref: href });
    expect(late.faq).toHaveLength(6);
    expect(late.faq![5].question).toBe("¿Hay código de vestimenta?");
    expect(allText(late.faq)).not.toContain("halloween");

    // Con la venta online confirmada, la frase de entradas vive hasta las 18:00 del 31 y enlaza a la landing.
    const selling: EmpresasContent = {
      ...EMPRESAS_CONTENT,
      condiciones: { ...EMPRESAS_CONTENT.condiciones, siVentaOnline: true },
    };
    const sale = resolveEmpresasView({ locale: "es", now: Date.parse(BEFORE_CUTOFF), t, outxidiousHref: href, content: selling });
    expect(sale.faq![5].answer).toContain("Entradas para OUTXIDE en grupoenjoy.es/outxide/outxidious.");
    expect(sale.faq![5].link).toEqual({ text: "grupoenjoy.es/outxide/outxidious", href });
    const closed = resolveEmpresasView({ locale: "es", now: Date.parse(AT_CUTOFF), t, outxidiousHref: href, content: selling });
    expect(closed.faq![5].question).toBe("¿Y si queremos celebrarlo en Halloween?");
    expect(closed.faq![5].answer).not.toContain("Entradas");
  });

  test("idiomas: ES/EN con el paquete; DE/FR/IT con el neutro y sin bloques que no tengan versión neutra", () => {
    const now = Date.parse("2026-10-25T12:00:00+01:00");
    const en = resolveEmpresasView({ locale: "en", now, t: tFrom({}), outxidiousHref: href });
    expect(en.creative).toBe(true);
    expect(en.hero.h1Lines).toEqual(H1_LINES_EN);
    expect(en.hero.plate).toBe(PLATE_EN);
    const deView = resolveEmpresasView({ locale: "de", now, t: tFrom(de), outxidiousHref: href });
    expect(deView.creative).toBe(false);
    expect(deView.hero.h1Lines).toEqual([de.empresas.h1]);
    expect(deView.endOfSeason).toBeNull();
    expect(deView.christmas).toBeNull();
    expect(deView.faq).toBeNull();
    expect(deView.hero.facts).toBeNull();
    // Nunca español en la página alemana.
    expect(JSON.stringify(deView)).not.toContain("La cena, donde queráis");
    expect(JSON.stringify(deView)).not.toContain("Celebra tu fin de temporada");
    // La nota neutra de horario (solo DE/FR/IT) ya no dice «jueves a sábado».
    for (const [loc, dict] of [["de", de], ["fr", fr], ["it", itDict]] as const) {
      const v = resolveEmpresasView({ locale: loc, now, t: tFrom(dict), outxidiousHref: href });
      expect(v.formats.notes).toContain(dict.empresas.hoursNote);
      expect(normalize(allText(v)), loc).not.toMatch(OLD_HOURS);
    }
  });

  test("ningún texto del paquete cae por el léxico prohibido, sin corchetes ni emojis, y la página sigue en noindex", () => {
    const strings: string[] = [];
    const walk = (v: unknown) => {
      if (typeof v === "string") strings.push(v);
      else if (Array.isArray(v)) v.forEach(walk);
      else if (v && typeof v === "object") Object.values(v).forEach(walk);
    };
    walk(EMPRESAS_CONTENT);
    expect(strings.length).toBeGreaterThan(100);
    expect(strings.filter(hasForbiddenLexicon)).toEqual([]);
    expect(strings.filter((s) => /[[\]]/.test(s))).toEqual([]);
    expect(strings.filter((s) => /\p{Extended_Pictographic}/u.test(s))).toEqual([]);
    // Ningún idioma que no sea ES o EN: el copy creativo no se traduce por nuestra cuenta.
    const locales = new Set<string>();
    const walkLocales = (v: unknown) => {
      if (v && typeof v === "object" && !Array.isArray(v)) {
        const obj = v as Record<string, unknown>;
        if ("es" in obj) Object.keys(obj).forEach((k) => locales.add(k));
        else Object.values(obj).forEach(walkLocales);
      }
    };
    walkLocales(EMPRESAS_CONTENT);
    expect([...locales].sort()).toEqual(["en", "es"]);

    // Textos encendidos, pero sin el OK de Jose ni oferta: NOINDEX. Y rellenar
    // la oferta con textos aún provisionales tampoco indexa la página.
    expect(EMPRESAS_CONTENT.activo).toBe(true);
    expect(EMPRESAS_CONTENT.approved).toBe(false);
    expect(isOfferPublished()).toBe(false);
    expect(isEmpresasIndexable()).toBe(false);
    const fullOffer = {
      ...EMPRESAS_OFFER,
      publicado: true,
      incluye: { es: ["Entrada a OUTXIDE para todo el grupo"] },
      precioConIva: 25,
      unidad: "persona" as const,
      minimoPersonas: 15,
      fechas: { es: "de jueves a sábado" },
    };
    expect(isOfferPublished(fullOffer)).toBe(true);
    expect(isEmpresasIndexable(EMPRESAS_CONTENT, fullOffer)).toBe(false);
    expect(isEmpresasIndexable({ ...EMPRESAS_CONTENT, approved: true }, fullOffer)).toBe(true);
  });

  test("diccionario recortado: /empresas lleva solo lo de sus componentes cliente, limpio en los 5 idiomas", () => {
    const scope = dictionaryScopeFor("/empresas");
    expect(scope).not.toBeNull();
    expect(dictionaryScopeFor("/empresas/")).toEqual(scope);
    // Solo esa ruta: el resto de la web sigue con el diccionario entero.
    for (const p of ["/empresasx", "/empresas/otra", "/", "/outxide", "/enjoy", "/agenda", null]) {
      expect(dictionaryScopeFor(p), String(p)).toBeNull();
    }
    for (const [loc, dict] of Object.entries(DICTS)) {
      const picked = pickDictionary(dict, scope!) as unknown as Record<string, Record<string, string>>;
      expect(Object.keys(picked).sort(), loc).toEqual(
        ["ageVerification", "agenda", "common", "cookieBanner", "cta", "empresas", "enjoy", "error", "footer", "mundial", "nav", "notFound"].sort(),
      );
      // La columna «Cocktails & Shisha» del pie NO viaja (con adLanding el pie usa «Ver carta»).
      expect(picked.footer.enjoyCocktails, loc).toBeUndefined();
      expect(Object.keys(picked.enjoy), loc).toEqual(["viewMenu"]);
      expect(Object.keys(picked.agenda), loc).toEqual(["title"]);
      // Cada clave pedida existe en ese idioma: una errata dejaría la clave cruda en pantalla.
      for (const path of scope!) {
        const value = path.split(".").reduce<unknown>((o, k) => (o && typeof o === "object" ? (o as Record<string, unknown>)[k] : undefined), dict);
        expect(value, `${loc}: ${path}`).toBeDefined();
      }
      // Lo que viaja en el payload RSC: ni léxico vetado ni horarios viejos.
      const json = JSON.stringify(picked);
      expect(htmlForbiddenFound(json), loc).toEqual([]);
      expect(forbiddenFound(json), loc).toEqual([]);
      expect(normalize(json), loc).not.toMatch(OLD_HOURS);
    }
  });
});

// ===========================================================================
// 2. La página
// ===========================================================================

test.describe("/empresas · primera pantalla 375×550", () => {
  test.use({ viewport: { width: 375, height: 550 } });
  test.beforeEach(async ({ context }) => preconfirm(context));

  // Las dos horas que importan: el día que arrancan los anuncios (antetítulo
  // del cartel) y al acabar el conjunto, desde el lun 9-nov (antetítulo
  // neutro): la primera pantalla tiene que caber igual con los dos.
  const MOMENTS = [
    { name: "con el antetítulo del cartel", now: "2026-10-22T12:00:00+02:00", es: EYEBROW_SEASON_ES, en: EYEBROW_SEASON_EN },
    { name: "acabado el conjunto (9-nov)", now: SEASON_OVER, es: EYEBROW_NEUTRAL_ES, en: EYEBROW_NEUTRAL_EN },
  ];
  for (const lang of ["es", "en"] as const) for (const moment of MOMENTS) {
    test(`${lang} ${moment.name}: antetítulo, H1 del cartel en dos líneas, subtítulo, botón y placa +18 sin desplazar`, async ({ page }) => {
      const path = lang === "es" ? "/empresas" : "/en/empresas";
      await page.goto(withNow(path, moment.now));
      const eyebrow = page.getByTestId("empresas-hero").locator(".emp-eyebrow");
      await expect(eyebrow).toHaveText(moment[lang]);
      await expect(eyebrow).toBeInViewport({ ratio: 1 });
      const h1 = page.locator("h1");
      await expect(h1).toHaveCount(1);
      const lines = h1.locator("span");
      await expect(lines).toHaveText(lang === "es" ? H1_LINES_ES : H1_LINES_EN);
      // Dos líneas de verdad: ninguna de las dos se parte.
      for (const line of await lines.all()) {
        const box = await line.boundingBox();
        const lh = await line.evaluate((el) => parseFloat(getComputedStyle(el).lineHeight));
        expect(box!.height).toBeLessThan(lh * 1.5);
      }
      await expect(h1).toBeInViewport({ ratio: 1 });

      const hero = page.getByTestId("empresas-hero");
      await expect(hero.locator("p").nth(1)).toBeInViewport({ ratio: 1 }); // subtítulo

      const cta = page.getByTestId("empresas-hero-cta");
      await expect(cta).toHaveText(lang === "es" ? CTA_ES : "Request a quote");
      await expect(cta).toHaveAttribute("href", "#solicitud");
      await expect(cta).toBeInViewport({ ratio: 1 });
      const ctaBox = await cta.boundingBox();
      expect(ctaBox!.height).toBeGreaterThanOrEqual(48);

      const plate = page.getByTestId("empresas-adult-hero");
      await expect(plate).toHaveText(lang === "es" ? PLATE_ES : PLATE_EN);
      await expect(plate).toBeInViewport({ ratio: 1 });
      const plateBox = await plate.boundingBox();
      expect(plateBox!.y + plateBox!.height).toBeLessThanOrEqual(550);
      // Debajo del botón, separada al menos 16 px (paquete §4.2).
      expect(plateBox!.y - (ctaBox!.y + ctaBox!.height)).toBeGreaterThanOrEqual(16);
      // Placa #F8F8F8 sobre #1E1F1F, y botón rosa con letra NEGRA.
      expect(await plate.evaluate((el) => [getComputedStyle(el).color, getComputedStyle(el).backgroundColor])).toEqual([
        "rgb(248, 248, 248)",
        "rgb(30, 31, 31)",
      ]);
      expect(await cta.evaluate((el) => [getComputedStyle(el).color, getComputedStyle(el).backgroundColor])).toEqual([
        "rgb(10, 10, 10)",
        "rgb(236, 72, 153)",
      ]);
      // Nada la tapa (cabecera fija): el punto central es suyo.
      const covered = await plate.evaluate((el) => {
        const r = el.getBoundingClientRect();
        const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
        return !(hit && el.contains(hit));
      });
      expect(covered).toBe(false);
    });
  }

  test("el botón salta al formulario", async ({ page }) => {
    await page.goto("/empresas");
    await page.getByTestId("empresas-hero-cta").click();
    await expect(page).toHaveURL(/#solicitud$/);
    await expect(page.locator("#empresas-solicitud")).toBeInViewport();
  });

  test("sin scroll horizontal a 375 px", async ({ page }) => {
    await page.goto("/empresas");
    await page.waitForTimeout(800);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(400);
    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      const vw = doc.clientWidth;
      const wide: string[] = [];
      for (const el of document.querySelectorAll("main *")) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && (r.right > vw + 2 || r.left < -2)) {
          // Las imágenes `fill` dentro de un contenedor con overflow oculto no
          // desbordan, ni el campo trampa (recortado dentro de .sr-only).
          if (el.closest(".overflow-hidden") && el.tagName === "IMG") continue;
          if (el.closest(".sr-only")) continue;
          wide.push(`${el.tagName.toLowerCase()}.${String(el.className).slice(0, 40)}`);
        }
      }
      return { scrollable: doc.scrollWidth - doc.clientWidth, wide: wide.slice(0, 5) };
    });
    expect(overflow.scrollable).toBeLessThanOrEqual(1);
    expect(overflow.wide).toEqual([]);
  });
});

test.describe("/empresas · muro +18", () => {
  test("presente al entrar, con el texto del paquete, y confirmable (recordado en la sesión)", async ({ page, context }) => {
    await preconfirm(context, { age: false });
    await page.goto("/empresas");
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText("Verificación de edad");
    await expect(dialog).toContainText(
      "Esta página habla de un bar de terraza y de una discoteca, solo para mayores de 18 años. ¿Confirmas que eres mayor de edad?",
    );
    await expect(dialog.getByRole("button", { name: "No, soy menor de edad" })).toBeVisible();
    const confirm = dialog.getByRole("button", { name: "Sí, soy mayor de 18 años" });
    await expect(confirm).toBeFocused();
    await confirm.click();
    await expect(dialog).toHaveCount(0);
    expect(await page.evaluate((k) => sessionStorage.getItem(k), AGE_KEY)).toBe("true");
    await page.reload();
    await expect(page.locator("h1")).toBeVisible();
    await page.waitForTimeout(500);
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  test("en inglés, su texto; y en /outxide el muro de siempre, sin cambios", async ({ page, context }) => {
    await preconfirm(context, { age: false });
    // /outxide primero: visitar /en/… fija la cookie de idioma.
    await page.goto("/outxide");
    const dialog = page.getByRole("dialog");
    await expect(dialog).toContainText(es.ageVerification.description);
    await expect(dialog.getByRole("button", { name: es.ageVerification.confirm })).toBeVisible();
    await page.goto("/en/empresas");
    await expect(page.getByRole("dialog")).toContainText("This page is about a terrace bar and a nightclub, for over-18s only.");
  });

  test("sin la foto de fondo rota (hero-poster.webp daba 404): ningún 404 de imagen y el mismo muro en /empresas y /outxide", async ({ page, context }) => {
    await preconfirm(context, { age: false });
    const broken: string[] = [];
    page.on("response", (res) => {
      const url = new URL(res.url());
      if (res.status() >= 400 && (url.pathname.startsWith("/images/") || url.pathname.startsWith("/videos/"))) broken.push(`${res.status()} ${url.pathname}`);
    });
    for (const path of ["/empresas", "/outxide"]) {
      await page.goto(path);
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      // La capa del muro (padre del diálogo) no pide ninguna imagen de fondo.
      const backgrounds = await page.evaluate(() => {
        const wall = document.querySelector('[role="dialog"]')?.parentElement;
        return wall ? [wall, ...Array.from(wall.querySelectorAll("*"))].map((el) => getComputedStyle(el).backgroundImage).filter((b) => b.includes("url(")) : ["sin muro"];
      });
      expect(backgrounds, path).toEqual([]);
      // Comportamiento intacto: bloqueante, foco en «Sí» y la capa negra encima.
      await expect(dialog.getByRole("button", { name: path === "/empresas" ? "Sí, soy mayor de 18 años" : es.ageVerification.confirm })).toBeFocused();
      await page.waitForLoadState("networkidle");
    }
    expect(page.url()).toContain("/outxide");
    expect(broken).toEqual([]);
    expect(await page.content()).not.toContain("hero-poster.webp");
  });
});

test.describe("/empresas · bloques con fecha (reloj de servidor)", () => {
  test.beforeEach(async ({ context }) => preconfirm(context));

  test("fin de temporada visible todo el conjunto (también el sáb 31 a las 18:00) y retirado al acabar", async ({ page }) => {
    // Tras el cambio de tanda del sáb 31 sigue: el cartel E1 corre hasta el 8-nov (F2).
    await page.goto(withNow("/empresas", AT_CUTOFF));
    await expect(page.getByTestId("empresas-end-of-season")).toBeVisible();
    await expect(page.getByTestId("empresas-hero").locator(".emp-eyebrow")).toHaveText(EYEBROW_SEASON_ES);

    await page.goto(withNow("/empresas", SEASON_LAST_MINUTE));
    const block = page.getByTestId("empresas-end-of-season");
    await expect(block).toBeVisible();
    await expect(block.locator("h2")).toHaveText("Toda la temporada cuidando de los demás. Ahora os toca a vosotros.");
    await expect(block).toContainText("Todo el grupo, mayor de 18.");
    await expect(block.locator('a[href="#solicitud"]')).toHaveText(CTA_ES);
    // Va primero: antes que Navidad.
    const order = await page.evaluate(() => {
      const a = document.querySelector('[data-testid="empresas-end-of-season"]');
      const b = document.querySelector('[data-testid="empresas-christmas"]');
      return !!a && !!b && !!(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);
    });
    expect(order).toBe(true);

    const eyebrow = page.getByTestId("empresas-hero").locator(".emp-eyebrow");
    await expect(eyebrow).toHaveText(EYEBROW_SEASON_ES);

    await page.goto(withNow("/empresas", SEASON_OVER));
    await expect(page.getByTestId("empresas-christmas")).toBeVisible();
    await expect(page.getByTestId("empresas-end-of-season")).toHaveCount(0);
    // El antetítulo del cartel se va a la misma hora que el bloque; el H1 se queda.
    await expect(eyebrow).toHaveText(EYEBROW_NEUTRAL_ES);
    await expect(page.locator("h1 span")).toHaveText(H1_LINES_ES);
    expect(normalize(await page.locator("main").innerText())).not.toContain("temporada");

    await page.goto(withNow("/en/empresas", SEASON_LAST_MINUTE));
    await expect(eyebrow).toHaveText(EYEBROW_SEASON_EN);
    await page.goto(withNow("/en/empresas", SEASON_OVER));
    await expect(page.getByTestId("empresas-end-of-season")).toHaveCount(0);
    await expect(eyebrow).toHaveText(EYEBROW_NEUTRAL_EN);
    await expect(page.locator("h1 span")).toHaveText(H1_LINES_EN);
    expect(normalize(await page.locator("main").innerText())).not.toContain("season");
  });

  test("la pregunta de Halloween se cambia por la de vestimenta a las 23:00 del 31", async ({ page }) => {
    await page.goto(withNow("/empresas", BEFORE_CUTOFF));
    const faq = page.getByTestId("empresas-faq-item");
    await expect(faq).toHaveCount(6);
    await expect(faq.nth(5).locator("dt")).toHaveText("¿Y si queremos celebrarlo en Halloween?");
    await page.goto(withNow("/empresas", AFTER_HALLOWEEN_FAQ));
    await expect(faq).toHaveCount(6);
    await expect(faq.nth(5).locator("dt")).toHaveText("¿Hay código de vestimenta?");
    expect(normalize(await page.locator("main").innerText())).not.toContain("halloween");
  });
});

test.describe("/empresas · contenido", () => {
  test.beforeEach(async ({ context }) => preconfirm(context));

  test("orden del paquete, Navidad A con su línea de fechas, FAQ 2, sin oferta ni precio, y +18 en formulario y pie", async ({ page }) => {
    await page.goto(withNow("/empresas", "2026-10-25T12:00:00+01:00"));
    // Orden (§3): primera pantalla · formatos · fin de temporada y Navidad · propuesta · formulario · FAQ.
    const ids = [
      "empresas-hero",
      "empresas-format-night",
      "empresas-format-day",
      "empresas-end-of-season",
      "empresas-christmas",
      "empresas-offer-custom",
      "empresas-form",
      "empresas-faq",
    ];
    const tops = await page.evaluate(
      (list) => list.map((id) => document.querySelector(`[data-testid="${id}"]`)?.getBoundingClientRect().top ?? NaN),
      ids,
    );
    expect(tops.every((v) => Number.isFinite(v))).toBe(true);
    // En escritorio la tarde va en la fila de la noche y Navidad en la del fin de temporada.
    const sameRow = new Set(["empresas-format-day", "empresas-christmas"]);
    for (let i = 1; i < tops.length; i++) {
      const msg = `${ids[i]} después de ${ids[i - 1]}`;
      if (sameRow.has(ids[i])) expect(tops[i], msg).toBeGreaterThanOrEqual(tops[i - 1]);
      else expect(tops[i], msg).toBeGreaterThan(tops[i - 1]);
    }

    // Navidad, versión A ([SI-DICIEMBRE] confirmado por Sergi): la noche en
    // OUTXIDE y la línea de fechas sin días concretos; sin la terraza.
    const christmas = page.getByTestId("empresas-christmas");
    await expect(christmas.locator("h2")).toHaveText(XMAS_TITLE_ES);
    await expect(christmas).toContainText("la noche la ponemos nosotros en OUTXIDE");
    await expect(christmas.locator("p", { hasText: XMAS_DATES_ES })).toHaveText(XMAS_DATES_ES);
    await expect(christmas).not.toContainText("Enjoy");
    // Sin días concretos: el único número del bloque es el año del antetítulo.
    expect((await christmas.innerText()).match(/\d+/g)).toEqual(["2026"]);
    // FAQ 2 con la apertura confirmada, y ningún horario viejo en la página.
    const faq2 = page.getByTestId("empresas-faq-item").nth(1);
    await expect(faq2.locator("dt")).toHaveText("¿Qué días se puede?");
    await expect(faq2.locator("dd")).toHaveText(FAQ2_ES);
    expect(normalize(await page.locator("body").innerText())).not.toMatch(OLD_HOURS);

    // Dos formatos con su recorrido y firmas (inglés también en español).
    await expect(page.getByTestId("empresas-format-night").locator("h3")).toHaveText("La noche, en OUTXIDE");
    await expect(page.getByTestId("empresas-format-night-signature")).toHaveText("The night continues");
    // Cada paso lleva delante su número (1, 2, 3).
    await expect(page.getByTestId("empresas-format-day").locator("ol > li")).toHaveText([
      /^1\s*La comida, donde queráis$/,
      /^2\s*La tarde, en Enjoy Terrace$/,
      /^3\s*La noche, en OUTXIDE, desde las 23:00$/,
    ]);

    // Oferta vacía: ni oferta, ni precio, ni correo de destino.
    await expect(page.getByTestId("empresas-offer")).toHaveCount(0);
    await expect(page.getByTestId("empresas-offer-custom")).toHaveText(OFFER_CUSTOM_ES);
    const main = (await page.locator("main").innerText()).toLowerCase();
    expect(main).not.toContain("€");
    expect(main).not.toContain("info@grupoenjoy.es");
    expect(main).not.toMatch(/[[\]]/); // ningún hueco del paquete llega al público
    expect(main).not.toMatch(/\p{Extended_Pictographic}/u);

    await expect(page.getByTestId("empresas-adult-form")).toHaveText(PLATE_ES);
    await expect(page.getByTestId("footer-adult-plate")).toHaveText(PLATE_ES);
    await expect(page.getByRole("button", { name: CTA_ES })).toBeVisible();
  });

  test("metadatos propios, noindex y sin palabras clave heredadas", async ({ page, request }) => {
    await page.goto("/empresas");
    await expect(page).toHaveTitle("Celebraciones de empresa en Port d'Alcúdia · Grupo Enjoy");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    // Con [SI-DICIEMBRE], la descripción con Navidad; y las palabras del cartel, no el titular viejo.
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      "La cena, donde queráis: la fiesta sigue en OUTXIDE y, según fechas, en Enjoy Terrace. Port d'Alcúdia. Fiestas de empresa y de Navidad. Pide presupuesto. +18.",
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", "La cena, donde queráis. La fiesta, con nosotros.");
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute("content", "La cena, donde queráis. La fiesta, con nosotros.");
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
      "content",
      "La noche en OUTXIDE y, si es comida, antes la tarde en Enjoy Terrace (según fechas). Port d'Alcúdia. Pide presupuesto.",
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /668998962_1705308414205492_561026873108522450_n\.jpg$/);
    await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute(
      "content",
      "Fachada de OUTXIDE Club y Enjoy Terrace de noche en Port d'Alcúdia",
    );
    // Ni las palabras clave generales («coctelería alcúdia», «restaurante alcúdia»…).
    await expect(page.locator('meta[name="keywords"]')).toHaveCount(0);

    const head = await (await request.get("/en/empresas")).text();
    expect(head).toContain("<title>Company celebrations in Port d&#x27;Alcúdia · Grupo Enjoy</title>");
    expect(head).toContain('<meta property="og:title" content="Dinner, wherever you like. The party, with us."/>');
    // Ni rastro del titular viejo en ningún idioma.
    for (const path of ["/empresas", "/en/empresas"]) {
      const html = await (await request.get(path)).text();
      expect(html, path).not.toMatch(/Cenad donde|La fiesta, aquí|Dine wherever|party&#x27;s here|party's here/);
    }
    const metas = (head.match(/<meta[^>]+>/g) ?? []).join("\n");
    expect(forbiddenFound(metas)).toEqual([]);
    expect(normalize(metas)).not.toMatch(/shisha|cocteles|cocktails/);
    // El sitemap no la lista mientras sea noindex.
    expect(await (await request.get("/sitemap.xml")).text()).not.toContain("/empresas");
  });

  test("solo fotos permitidas por el paquete (O01, O04, E25 y los juegos)", async ({ page }) => {
    await page.goto("/empresas");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const srcs = await page.evaluate(() =>
      [...document.querySelectorAll("main img")].map((img) => {
        const raw = img.getAttribute("src") ?? "";
        // next/image sirve /_next/image?url=<ruta>&w=…
        const u = new URL(raw, location.href);
        return u.pathname === "/_next/image" ? decodeURIComponent(u.searchParams.get("url") ?? "") : u.pathname;
      }),
    );
    const allowed = new Set([
      "/images/outxide/668998962_1705308414205492_561026873108522450_n.jpg", // O01 fachada
      "/images/outxide/DSCF8103-9.jpg", // O04 manos en la mesa
      "/images/enjoy/489390658_1397879798281690_242980700226707519_n.jpg", // E25 rótulo
      "/images/juegos/futbolin.png",
      "/images/juegos/billar.png",
      "/images/juegos/dardos.png",
    ]);
    expect(srcs.length).toBe(6);
    expect(srcs.filter((s) => !allowed.has(s))).toEqual([]);
    // Las que el paquete descarta, en ningún sitio del HTML servido (tampoco en Open Graph).
    const html = await page.content();
    for (const banned of ["DSCF8127-10", "669619110_", "PIC06195-2", "PIC06191-1", "DSCF8230-13", "/images/enjoy/deco/", "490779000_"]) {
      expect(html, banned).not.toContain(banned);
    }
    // Todas con texto alternativo del paquete.
    const alts = await page.locator("main img").evaluateAll((imgs) => imgs.map((i) => i.getAttribute("alt") ?? ""));
    expect(alts).toEqual(
      expect.arrayContaining([
        "Fachada de OUTXIDE Club y Enjoy Terrace de noche, en la Av. Tucán 1 de Port d'Alcúdia",
        "Manos de un DJ en la mesa de mezclas de OUTXIDE",
        "Rótulo luminoso de Enjoy Terrace de noche",
        "Futbolín",
        "Mesa de billar",
        "Diana de dardos de Enjoy Terrace",
      ]),
    );
  });

  test("tema de la ruta: OUTXIDE en dorado (nada de cian) y campos con borde #737373", async ({ page }) => {
    await page.goto("/empresas");
    await expect(page.getByTestId("empresas-format-night").locator(".emp-eyebrow")).toHaveCSS("color", "rgb(201, 169, 119)");
    await expect(page.getByTestId("empresas-format-day").locator(".emp-eyebrow")).toHaveCSS("color", "rgb(236, 72, 153)");
    await expect(page.locator("#empresas-company")).toHaveCSS("border-top-color", "rgb(115, 115, 115)");
    // Cualquier text-outxide heredado (pie) sale en dorado, no en cian #06b6d4.
    const outxideColors = await page.locator("footer .text-outxide").evaluateAll((els) => els.map((e) => getComputedStyle(e).color));
    expect(outxideColors.length).toBeGreaterThan(0);
    expect(new Set(outxideColors)).toEqual(new Set(["rgb(201, 169, 119)"]));
  });

  test("alemán: textos neutros del diccionario, sin bloques del paquete", async ({ page }) => {
    await page.goto(withNow("/de/empresas", BEFORE_CUTOFF));
    await expect(page.locator("h1")).toHaveText(de.empresas.h1);
    await expect(page.getByTestId("empresas-faq")).toHaveCount(0);
    await expect(page.getByTestId("empresas-end-of-season")).toHaveCount(0);
    await expect(page.getByTestId("empresas-christmas")).toHaveCount(0);
    await expect(page.getByTestId("empresas-adult-hero")).toHaveText(de.empresas.adultNotice);
    expect(await page.locator("main").innerText()).not.toContain("La cena, donde");
    await expect(page.getByTestId("empresas-hero").locator(".emp-eyebrow")).toHaveText(de.empresas.heroEyebrow);
  });
});

test.describe("/empresas · léxico prohibido", () => {
  test.beforeEach(async ({ context }) => preconfirm(context));

  for (const path of ["/empresas", "/en/empresas", "/de/empresas", "/fr/empresas", "/it/empresas"]) {
    test(`${path}: ni en el HTML completo (scripts y payload RSC incluidos) ni en el texto visible`, async ({ page, request }) => {
      // HTML ENTERO: metadatos, alt, textos, JSON-LD y también los <script>.
      // Desde el diccionario recortado (src/i18n/scoped-dictionary.ts) el
      // payload RSC ya no lleva los textos del resto de la web.
      for (const now of ["2026-10-22T12:00:00+02:00", AT_CUTOFF, SEASON_OVER]) {
        const res = await request.get(withNow(path, now), { headers: { "accept-language": "es-ES" } });
        expect(res.status()).toBe(200);
        const html = await res.text();
        expect(htmlForbiddenFound(html), `${path} @ ${now}`).toEqual([]);
        expect(forbiddenFound(html), `${path} @ ${now}`).toEqual([]);
        expect(normalize(html), `${path} @ ${now}: horario viejo`).not.toMatch(OLD_HOURS);
      }

      await page.goto(path);
      await expect(page.locator("h1")).toHaveCount(1);
      const visible = await page.locator("body").innerText();
      expect(forbiddenFound(visible)).toEqual([]);
      expect(htmlForbiddenFound(visible)).toEqual([]);
    });
  }
});

// ===========================================================================
// 3. Diccionario recortado (src/i18n/scoped-dictionary.ts) y guarda de
//    navegación: sin textos de otras páginas en el HTML, sin claves crudas en
//    nada de lo que pintan los componentes cliente, y salidas con carga completa.
// ===========================================================================

const LOCALE_PREFIX: Record<keyof typeof DICTS, string> = { es: "", en: "/en", de: "/de", fr: "/fr", it: "/it" };

test.describe("/empresas · diccionario recortado", () => {
  test("el HTML de /empresas no lleva el diccionario entero; el resto de la web sí", async ({ playwright, baseURL }) => {
    // Contexto NUEVO por petición: visitar /it/… fija la cookie de idioma y una
    // ruta sin prefijo pedida después redirigiría a la de ese idioma.
    const fresh = async (path: string) => {
      const ctx = await playwright.request.newContext({ baseURL });
      try {
        const res = await ctx.get(path);
        expect(new URL(res.url()).pathname, `${path} sin redirección`).toBe(path);
        return await res.text();
      } finally {
        await ctx.dispose();
      }
    };
    for (const [loc, prefix] of Object.entries(LOCALE_PREFIX) as [keyof typeof DICTS, string][]) {
      const html = await fresh(`${prefix}/empresas`);
      expect(html.includes(SENTINELS[loc]), `${prefix}/empresas: diccionario recortado`).toBe(false);
      // Y sí lleva las claves que piden sus componentes cliente (p. ej. el botón de cookies del pie).
      expect(html.includes(DICTS[loc].cookieBanner.settingsButton), `${prefix}/empresas: botón de cookies`).toBe(true);
    }
    for (const [path, loc] of [
      ["/", "es"],
      ["/outxide", "es"],
      ["/enjoy", "es"],
      ["/agenda", "es"],
      ["/en/outxide", "en"],
      ["/de/enjoy", "de"],
      ["/fr/outxide", "fr"],
      ["/it", "it"],
    ] as const) {
      const html = await fresh(path);
      expect(html.includes(SENTINELS[loc]), `${path}: diccionario entero`).toBe(true);
    }
  });

  for (const [loc, prefix] of Object.entries(LOCALE_PREFIX) as [keyof typeof DICTS, string][]) {
    test(`${loc}: ninguna clave cruda en muro, cookies (y su panel), menú móvil, pie y formulario`, async ({ page, context }) => {
      await preconfirm(context, { age: false, cookies: false });
      await page.setViewportSize({ width: 375, height: 740 });
      const d = DICTS[loc];
      await page.goto(`${prefix}/empresas`);

      // Muro +18 y banner de cookies a la vez (el muro va encima).
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      const banner = page.getByRole("region", { name: d.cookieBanner.title });
      await expect(banner).toBeVisible({ timeout: 10_000 });
      await expectNoRawKeys(page, `${loc}: muro + banner`);
      await dialog.getByRole("button").first().click();
      await expect(dialog).toHaveCount(0);

      // Panel de configurar cookies.
      await banner.getByRole("button", { name: d.cookieBanner.configure }).click();
      await expect(banner.getByText(d.cookieBanner.configureTitle)).toBeVisible();
      await expect(banner.getByText(d.cookieBanner.marketingDesc)).toBeVisible();
      await expectNoRawKeys(page, `${loc}: panel de cookies`);
      await banner.getByRole("button", { name: d.cookieBanner.savePreferences }).click();
      await expect(banner).toHaveCount(0);

      // Menú móvil abierto (enlaces del menú y aria-label del botón de cerrar).
      await page.getByRole("button", { name: d.nav.openMenu }).click();
      const menu = page.locator("#nav-mobile-menu");
      await expect(menu).toBeVisible();
      await expect(menu.getByRole("link", { name: d.agenda.title })).toBeVisible();
      await expect(page.getByRole("button", { name: d.nav.closeMenu })).toBeVisible();
      await expectNoRawKeys(page, `${loc}: menú móvil`);
      await page.keyboard.press("Escape");
      await expect(menu).toHaveCount(0);

      // Selector de idioma abierto.
      await page.getByRole("button", { name: new RegExp(`^${d.common.language} `) }).first().click();
      await expectNoRawKeys(page, `${loc}: selector de idioma`);
      await page.keyboard.press("Escape");

      // Pie (columnas, boletín, botón de cookies) con su error del boletín.
      const footer = page.locator("footer");
      await footer.scrollIntoViewIfNeeded();
      await expect(footer.getByRole("button", { name: d.cookieBanner.settingsButton })).toBeVisible();
      await expect(footer.getByRole("link", { name: d.enjoy.viewMenu })).toBeVisible();
      await footer.getByRole("button", { name: d.footer.newsletterSubmit }).click();
      await expect(footer.getByText(d.footer.newsletterPrivacyRequired)).toBeVisible();

      // Formulario enviado vacío: todos los errores (claves dinámicas «empresas.err…»).
      const form = page.getByTestId("empresas-form");
      await form.getByRole("button", { name: d.empresas.submit }).click();
      await expect(page.getByTestId("empresas-error-summary")).toBeVisible();
      await expectNoRawKeys(page, `${loc}: pie y formulario con errores`);

      // Y el aviso de envío fallido (503), que usa otra clave del diccionario.
      await page.route("**/api/empresas", (route) =>
        route.fulfill({ status: 503, contentType: "application/json", body: JSON.stringify({ ok: false, error: "unavailable" }) }),
      );
      await form.locator("#empresas-company").fill("Hotel Prueba");
      await form.locator("#empresas-name").fill("Ana");
      await form.locator("#empresas-phone").fill("+34 600 123 456");
      await form.locator("#empresas-email").fill("ana@example.com");
      await form.locator("#empresas-date").fill(isoInDays(20));
      await form.locator("#empresas-people").fill("20");
      await form.locator("#empresas-format").selectOption("after_dinner");
      await form.locator("#empresas-source").selectOption("google");
      await page.locator("#empresas-consent").check();
      await form.getByRole("button", { name: d.empresas.submit }).click();
      await expect(page.getByTestId("empresas-send-error")).toContainText(d.empresas.errUnavailable);
      await expectNoRawKeys(page, `${loc}: aviso de envío fallido`);
    });
  }

  test("fuera de /empresas la navegación suave sigue siendo suave (sin guarda)", async ({ page, context }) => {
    await preconfirm(context);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/enjoy");
    await markDocument(page);
    await page.locator('header a[href="/agenda"]').first().click();
    await page.waitForURL(/\/agenda$/);
    await expect(page.locator("h1")).toBeVisible();
    expect(await documentWasReplaced(page)).toBe(false);
    await expectNoRawKeys(page, "/agenda tras navegación suave desde /enjoy");
  });

  test("salir por el logo: carga completa y la portada con el diccionario entero", async ({ page, context }) => {
    await preconfirm(context);
    await page.goto("/empresas");
    await markDocument(page);
    await page.locator('header a[href="/"]').first().click();
    await page.waitForURL((url) => url.pathname === "/");
    expect(await documentWasReplaced(page)).toBe(true);
    // El pie de la portada pinta una clave que /empresas no lleva: prueba de diccionario entero.
    await expect(page.locator("footer").getByText(es.footer.enjoyCocktails)).toBeAttached({ timeout: 15_000 });
    await expectNoRawKeys(page, "portada tras salir de /empresas por el logo");
  });

  test("salir por el menú móvil: carga completa y página traducida", async ({ page, context }) => {
    await preconfirm(context);
    await page.setViewportSize({ width: 375, height: 740 });
    await page.goto("/empresas");
    await markDocument(page);
    await page.getByRole("button", { name: es.nav.openMenu }).click();
    await page.locator("#nav-mobile-menu").getByRole("link", { name: "Outxide Club" }).click();
    await page.waitForURL(/\/outxide$/);
    expect(await documentWasReplaced(page)).toBe(true);
    await expect(page.getByText(es.outxide.tagline).first()).toBeVisible({ timeout: 15_000 });
    await expectNoRawKeys(page, "/outxide tras salir de /empresas por el menú móvil");
  });

  test("salir por el menú de escritorio y por un enlace del pie: carga completa y sin claves crudas", async ({ page, context }) => {
    await preconfirm(context);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/empresas");
    await markDocument(page);
    await page.locator('header a[href="/agenda"]').first().click();
    await page.waitForURL(/\/agenda$/);
    expect(await documentWasReplaced(page)).toBe(true);
    await expect(page.locator("footer").getByText(es.footer.enjoyCocktails)).toBeAttached({ timeout: 15_000 });
    await expectNoRawKeys(page, "/agenda tras salir de /empresas por el menú");

    await page.goto("/en/empresas");
    await markDocument(page);
    const link = page.locator('footer a[href="/en/nosotros"]');
    await link.scrollIntoViewIfNeeded();
    await link.click();
    await page.waitForURL(/\/en\/nosotros$/);
    expect(await documentWasReplaced(page)).toBe(true);
    await expect(page.locator("footer").getByText(en.footer.enjoyCocktails)).toBeAttached({ timeout: 15_000 });
    await expectNoRawKeys(page, "/en/nosotros tras salir de /en/empresas por el pie");
  });

  test("salir por un <Link> del banner de cookies también recarga", async ({ page, context }) => {
    await preconfirm(context, { cookies: false });
    await page.goto("/empresas");
    await markDocument(page);
    const banner = page.getByRole("region", { name: es.cookieBanner.title });
    await expect(banner).toBeVisible({ timeout: 10_000 });
    await banner.getByRole("link", { name: es.cookieBanner.moreInfo }).click();
    await page.waitForURL(/\/legal\/cookies$/);
    await page.waitForLoadState("load");
    expect(await documentWasReplaced(page)).toBe(true);
    await expectNoRawKeys(page, "/legal/cookies tras salir de /empresas");
  });

  test("dentro de /empresas el botón al formulario no recarga (ancla en la misma ruta)", async ({ page, context }) => {
    await preconfirm(context);
    await page.goto("/empresas");
    await markDocument(page);
    await page.getByTestId("empresas-hero-cta").click();
    await expect(page).toHaveURL(/#solicitud$/);
    await page.waitForTimeout(500);
    expect(await documentWasReplaced(page)).toBe(false);
  });
});

test.describe("/empresas · formulario", () => {
  test.beforeEach(async ({ context }) => preconfirm(context));

  test("validación: errores del paquete con texto, resumen y foco al primer error", async ({ page }) => {
    await page.goto("/empresas");
    const submit = page.getByRole("button", { name: CTA_ES });

    // Vacío → todos los obligatorios y la casilla de privacidad.
    await submit.click();
    await expect(page.getByTestId("empresas-error-summary")).toHaveText("Revisa los campos marcados.");
    await expect(page.locator("#empresas-company")).toBeFocused();
    await expect(page.locator("#empresas-company")).toHaveAttribute("aria-invalid", "true");
    await expect(page.locator("#empresas-company-error")).toHaveText("Escribe el nombre de la empresa.");
    await expect(page.locator("#empresas-name-error")).toHaveText("Escribe tu nombre.");
    await expect(page.locator("#empresas-date-error")).toHaveText("Elige una fecha.");
    await expect(page.locator("#empresas-people-error")).toHaveText("Indica cuántos seréis.");
    await expect(page.locator("#empresas-consent-error")).toHaveText("Para enviarlo, acepta la política de privacidad.");
    // La casilla de privacidad empieza SIN marcar.
    await expect(page.locator("#empresas-consent")).not.toBeChecked();
    // Error rojo #ef4444 (paquete §1.4) y borde rojo en el campo.
    await expect(page.locator("#empresas-company-error")).toHaveCSS("color", "rgb(239, 68, 68)");
    await expect(page.locator("#empresas-company")).toHaveCSS("border-top-color", "rgb(239, 68, 68)");

    // Formatos inválidos → foco al primer campo con error (teléfono).
    await field(page, "Empresa").fill("Hotel Prueba");
    await field(page, "Tu nombre").fill("Ana");
    await field(page, "Teléfono").fill("abc");
    await field(page, "Correo electrónico").fill("ana@");
    await field(page, "¿Qué día tenéis en mente?").fill(isoInDays(-3));
    await field(page, "¿Cuántos seréis?").fill("0");
    await submit.click();
    await expect(page.locator("#empresas-phone")).toBeFocused();
    await expect(page.locator("#empresas-company-error")).toHaveCount(0);
    await expect(page.locator("#empresas-phone-error")).toHaveText("Revisa el teléfono: faltan números.");
    await expect(page.locator("#empresas-email-error")).toHaveText("Revisa el correo: falta algo.");
    // Fecha pasada y rango de personas: el texto neutro, más concreto que el del paquete.
    await expect(page.locator("#empresas-date-error")).toHaveText("Elige una fecha a partir de hoy.");
    await expect(page.locator("#empresas-people-error")).toHaveText("Indica un número entero entre 1 y 500.");
    await expect(page.locator("#empresas-format-error")).toHaveText("Elige una opción.");
    await expect(page.locator("#empresas-source-error")).toHaveText("Elige una opción.");
    // Error y ayuda enlazados al campo para los lectores de pantalla.
    await expect(page.locator("#empresas-email")).toHaveAttribute("aria-describedby", /empresas-email-error/);
    await expect(page.locator("#empresas-phone")).toHaveAttribute("aria-describedby", "empresas-phone-error empresas-phone-help");
    await expect(page.locator("#empresas-phone-help")).toHaveText("Con prefijo si no es español.");
    await expect(page.locator("#empresas-people-help")).toHaveText("Un número aproximado vale. Todo el grupo tiene que ser mayor de 18.");

    // Más de 500 personas también es un error.
    await field(page, "¿Cuántos seréis?").fill("501");
    await submit.click();
    await expect(page.locator("#empresas-people-error")).toHaveText("Indica un número entero entre 1 y 500.");
  });

  test("etiquetas, marcadores y opciones del paquete", async ({ page }) => {
    await page.goto("/empresas");
    await expect(field(page, "Empresa")).toHaveAttribute("placeholder", "Nombre de la empresa o del hotel");
    await expect(field(page, "Correo electrónico")).toHaveAttribute("placeholder", "nombre@empresa.com");
    await expect(field(page, "¿Qué formato os encaja?").locator("option")).toHaveText([
      "Elige una opción",
      "Después de la cena: la noche en OUTXIDE",
      // Sin [SI-TERRAZA-DIC], la opción de comida lleva «(según fechas)».
      "Después de la comida: la tarde en Enjoy Terrace y la noche en OUTXIDE (según fechas)",
      "Aún no lo sabemos",
    ]);
    await expect(field(page, "¿Cómo nos conocisteis?").locator("option")).toHaveText([
      "Elige una opción",
      "Instagram",
      "Facebook",
      "Google",
      "Nos lo recomendaron",
      "Ya habíamos venido",
      "Otro",
    ]);
    // Casilla e información de privacidad: la versión legal de la web.
    await expect(page.locator('label[for="empresas-consent"]')).toHaveText(es.empresas.consentLabel);
    await expect(page.getByTestId("empresas-privacy-basic")).toContainText("Responsable: Enjoy Club 78 S.L.");
  });

  test("envío feliz: todos los campos + utm_* y fbclid exactos de la URL de aterrizaje", async ({ page }) => {
    let body: Record<string, unknown> | null = null;
    await page.route("**/api/empresas", async (route) => {
      body = route.request().postDataJSON() as Record<string, unknown>;
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
    });
    await page.goto(LANDING);
    const date = isoInDays(30);
    await fillValidForm(page, date);
    await page.getByRole("button", { name: CTA_ES }).click();

    await expect(page.getByTestId("empresas-success")).toContainText("Recibido.");
    await expect(page.getByTestId("empresas-success")).toContainText("Revisa también la carpeta de spam.");
    expect(body).not.toBeNull();
    const sent = body as unknown as Record<string, unknown>;
    expect(sent).toMatchObject({
      company: "Hotel Prueba Alcúdia",
      name: "Ana Pérez",
      phone: "+34 600 123 456",
      email: "ana.perez@example.com",
      date,
      people: 45,
      format: "after_dinner",
      source: "instagram",
      comments: "Fin de temporada del equipo de sala.\nSomos de un hotel de Alcúdia.",
      consent: true,
      website: "",
      locale: "es",
      page: "/empresas",
    });
    expect(sent.campaign).toEqual(EXPECTED_CAMPAIGN);
  });

  test("la campaña guardada al aterrizar llega aunque la URL actual ya no la lleve", async ({ page }) => {
    let body: Record<string, unknown> | null = null;
    await page.route("**/api/empresas", async (route) => {
      body = route.request().postDataJSON() as Record<string, unknown>;
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
    });
    // Aterriza con la campaña (CampaignLinkTracker la guarda en sessionStorage)…
    await page.goto(LANDING);
    await expect.poll(() => page.evaluate(() => sessionStorage.getItem("ge_campaign_params"))).toContain("PRUEBA123");
    // …y vuelve a /empresas sin parámetros en la misma pestaña.
    await page.goto("/empresas");
    await fillValidForm(page, isoInDays(45));
    await page.getByRole("button", { name: CTA_ES }).click();
    await expect(page.getByTestId("empresas-success")).toBeVisible();
    expect((body as unknown as Record<string, unknown>).campaign).toEqual(EXPECTED_CAMPAIGN);
  });

  test("si la API no puede enviar (503), lo dice y ofrece el teléfono", async ({ page }) => {
    await page.route("**/api/empresas", (route) =>
      route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({ ok: false, error: "unavailable" }),
      }),
    );
    await page.goto("/empresas");
    await fillValidForm(page, isoInDays(20));
    await page.getByRole("button", { name: CTA_ES }).click();
    const alert = page.getByTestId("empresas-send-error");
    await expect(alert).toBeVisible();
    await expect(alert).toBeFocused();
    await expect(alert).toContainText("Ahora mismo no podemos recibir solicitudes por la web");
    await expect(alert.locator('a[href^="tel:"]')).toBeVisible();
    await expect(page.getByTestId("empresas-success")).toHaveCount(0);
  });

  test("error de red: el texto del paquete y el teléfono", async ({ page }) => {
    await page.route("**/api/empresas", (route) => route.abort("failed"));
    await page.goto("/empresas");
    await fillValidForm(page, isoInDays(20));
    await page.getByRole("button", { name: CTA_ES }).click();
    const alert = page.getByTestId("empresas-send-error");
    await expect(alert).toContainText("No se ha podido enviar. Inténtalo de nuevo en un momento.");
    await expect(alert.locator('a[href^="tel:"]')).toBeVisible();
  });
});

test.describe("/api/empresas · defensas", () => {
  /** IP distinta por petición: el rate limit por IP no contamina otras pruebas. */
  const ip = () => `10.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}`;

  function validBody(overrides: Record<string, unknown> = {}): Record<string, unknown> {
    return {
      company: "Hotel Prueba",
      name: "Ana Pérez",
      phone: "+34 600 123 456",
      // Correo único (dominio reservado): el cubo por destinatario no se llena.
      email: `prueba-${Date.now()}-${Math.floor(Math.random() * 1e6)}@example.com`,
      date: isoInDays(30),
      people: 30,
      format: "lunch_afternoon_night",
      source: "google",
      comments: "",
      consent: true,
      website: "",
      locale: "es",
      page: "/empresas",
      campaign: { ...EXPECTED_CAMPAIGN },
      ...overrides,
    };
  }

  async function post(request: APIRequestContext, baseURL: string | undefined, data: unknown, origin?: string) {
    const own = new URL(baseURL ?? "http://localhost:3001").origin;
    return request.post("/api/empresas", {
      headers: { origin: origin ?? own, "x-forwarded-for": ip(), "content-type": "application/json" },
      data,
    });
  }

  test("origen ajeno → 403", async ({ request, baseURL }) => {
    const res = await post(request, baseURL, validBody(), "https://otra-web.example");
    expect(res.status()).toBe(403);
    expect((await res.json()).ok).toBe(false);
  });

  test("honeypot relleno → 400", async ({ request, baseURL }) => {
    const res = await post(request, baseURL, validBody({ website: "https://spam.example" }));
    expect(res.status()).toBe(400);
  });

  test("sin consentimiento → 403 consent_required", async ({ request, baseURL }) => {
    for (const consent of [false, undefined, "true"]) {
      const res = await post(request, baseURL, validBody({ consent }));
      expect(res.status()).toBe(403);
      expect((await res.json()).error).toBe("consent_required");
    }
  });

  test("campos inválidos → 400 con los campos rechazados", async ({ request, baseURL }) => {
    const bad = await post(
      request,
      baseURL,
      validBody({
        email: "no-es-correo",
        people: "30", // texto, no número
        date: "2020-01-01", // pasado
        format: "barra_libre", // fuera de la lista
        company: "x".repeat(121),
        comments: "y".repeat(1001),
      }),
    );
    expect(bad.status()).toBe(400);
    const json = await bad.json();
    expect(json.error).toBe("invalid_input");
    expect(json.fields).toEqual(expect.arrayContaining(["email", "people", "date", "format", "company", "comments"]));

    for (const people of [0, 501, 2.5]) {
      const res = await post(request, baseURL, validBody({ people }));
      expect(res.status()).toBe(400);
    }
    // Cuerpo que no es JSON / no es un objeto.
    const notObject = await post(request, baseURL, ["no", "objeto"]);
    expect(notObject.status()).toBe(400);
  });

  test("sin RESEND_API_KEY → 503 (no simula éxito)", async ({ request, baseURL }) => {
    const res = await post(request, baseURL, validBody());
    expect(res.status()).toBe(503);
    expect(await res.json()).toMatchObject({ ok: false, error: "unavailable" });
  });
});
