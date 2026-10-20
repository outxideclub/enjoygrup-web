import { statSync } from "node:fs";
import { test, expect, type APIRequestContext, type BrowserContext, type Page } from "@playwright/test";
import type { FVEvent, FVTicketRate, FVTicketsCheckoutRequest } from "../src/lib/fourvenues/types";
import { es } from "../src/i18n/dictionaries/es";
import { en } from "../src/i18n/dictionaries/en";
import { de } from "../src/i18n/dictionaries/de";
import { fr } from "../src/i18n/dictionaries/fr";
import { it as itDict } from "../src/i18n/dictionaries/it";
import { dictionaryScopeFor, pickDictionary } from "../src/i18n/scoped-dictionary";
import { siteContact } from "../src/lib/site";
import {
  OUTXIDIOUS_CONTENT,
  OUTXIDIOUS_PATH,
  OUTXIDIOUS_SLOTS,
  isOutxidiousIndexable,
  outxidiousSitemapPaths,
  parseOutxidiousContent,
  resolveOutxidiousContent,
  type OutxidiousApproval,
  type OutxidiousContent,
} from "../src/lib/outxidious/content";
import {
  AFTER_FROM,
  OUTXIDE_END_ISO,
  OUTXIDE_START_ISO,
  TARDEO_END_TIME,
  TARDEO_START_TIME,
  TODAY_FROM,
  TODAY_TO,
  findOutxidiousEvent,
  outxideSchedule,
  priceFromWithFees,
  resolvePhase,
  sellableRates,
} from "../src/lib/outxidious/event-config";
import { buildOutxidiousEventJsonLd, toMadridIso } from "../src/lib/outxidious/jsonld";

// Landing de OUTXIDIOUS (Halloween 2026), destino de los anuncios de Meta, contra
// el doble de Fourvenues (e2e/mocks/fourvenues-mock.mjs: evento "OUTXIDIOUS |
// OUTXIDE", código OX31, con tarifas que llevan 🍭 y «COPA + CHUPITO» a
// propósito y otras que no deben contar para el «desde»).
//
// OUTXIDIOUS es un evento COMPARTIDO (19-oct): tardeo de ACCESO LIBRE en Enjoy
// Terrace (20:00–23:00, sin botón, precio ni formulario) y OUTXIDE (23:00–05:30)
// con entrada; precio y botón solo de OUTXIDE. noindex y fuera del sitemap.
// Aprobación POR HUECO (content.ts). 20-oct (tarde): paquete creativo
// PROVISIONAL de META ADS (v0.2) encendido por orden de Sergi: teaser, claim,
// bloques con FAQ y tema rojo; imagen OG e index apagados; DE/FR/IT sin copy
// creativo (página neutra, nunca español). Otras combinaciones de huecos se
// prueban con contenido FICTICIO que vive solo en este fichero y viaja en la
// cabecera del doble de pruebas (solo la atiende `next dev`).
// 20-oct (paquete v0.4, hechos de Sergi): el tardeo es +18 como OUTXIDE (las
// frases del paquete que lo dicen vuelven), DJ Siquiers en la parte de OUTXIDE
// (5 idiomas, sin performer en el JSON-LD), meta description en inglés con
// «free-entry», descripción del JSON-LD de Enjoy Terrace y OUTXIDE, y el muro
// +18 como fila 0 de la primera pantalla (375×600 con ?phase=hoy).

const MOCK = process.env.FV_MOCK_URL ?? "http://localhost:3999";
const OX_CODE = "OX31";
const OX_REF = `outxidious--outxide-31-10-2026-${OX_CODE}`;
const CONSENT_KEY = "ge_cookie_consent";
const AGE_KEY = "ge_age_verified";
const TEST_CONTENT_HEADER = "x-test-outxidious-content";

// La campaña real del 22-oct (parámetros de URL de los anuncios).
const CAMPAIGN = {
  utm_source: "meta",
  utm_medium: "paid_social",
  utm_campaign: "OUTXIDE | 20261022 | TRAFICO",
  utm_term: "OUTXIDE | 20261031 | VENTA",
  utm_content: "OUTXIDE | 20261031 | VENTA-916-H1",
  fbclid: "PRUEBA123",
} as const;
const CAMPAIGN_QUERY =
  "utm_source=meta&utm_medium=paid_social&utm_campaign=OUTXIDE%20%7C%2020261022%20%7C%20TRAFICO" +
  "&utm_term=OUTXIDE%20%7C%2020261031%20%7C%20VENTA&utm_content=OUTXIDE%20%7C%2020261031%20%7C%20VENTA-916-H1" +
  "&fbclid=PRUEBA123";

// Tras la noche del 31 el doble deja de devolver el evento (terminado) y la
// página pasa sola a «después»: los casos de venta ya no tienen sentido.
const CAMPAIGN_OVER = Date.now() >= AFTER_FROM;

/**
 * Léxico vetado en TODA la página (HTML, metadatos, alt, JSON-LD y payload RSC),
 * sobre el texto sin acentos y en minúsculas. Regla del dueño + Meta (alcohol y
 * tabaco) y §5 del paquete creativo («Qué NO se pone», al pie de la letra).
 * «Enjoy Terrace» y «tardeo» SÍ se permiten desde el 19-oct (evento
 * compartido): se comprueba aparte que aparecen.
 */
const FORBIDDEN: [string, RegExp][] = [
  ["🍭", /🍭|\\ud83c\\udf6d/i],
  ["chupito", /\bchupitos?\b/],
  ["copa / copas", /\bcopas?\b/],
  ["cóctel / cocktail", /\bcoct[ae]l(es)?\b|\bcocktails?\b/],
  ["shisha", /\bshishas?\b/],
  ["cachimba", /\bcachimbas?\b/],
  ["barra libre", /barra libre/],
  ["happy hour", /happy hour/],
  ["2x1", /\b2\s?x\s?1\b/],
  ["últimas", /\bultimas?\b/],
  ["quedan", /\bquedan\b/],
  ["agotado", /\bagota(do|dos|da|das|ndose)\b/],
  ["oficial", /\boficial(es)?\b/],
  ["insidious", /insidious/],
  ["sangre", /\bsangre\b/],
  ["muerte", /\bmuerte\b/],
  ["matar", /\bmatar\b/],
  ["demonio", /\bdemonios?\b/],
  ["poseído", /\bposeid[oa]s?\b/],
  ["encerrado", /\bencerrad[oa]s?\b/],
  ["no hay salida", /no hay salida/],
  ["nadie sale", /nadie sale/],
  ["Hiru", /\bhiru\b/],
  ["previa", /\bprevia\b/],
  ["precio VIP", /precio vip/],
  ["precio de puerta", /precio de puerta/],
  ["GREGAL", /\bgregal\b/],
  ["PONENT", /\bponent\b/],
  ["NIEBLA", /\bniebla\b/],
  // §5 del paquete creativo v0.2 (20-oct). El tardeo es de ACCESO LIBRE: ni
  // «gratis» ni «entrada libre» (la «entrada» es la de OUTXIDE), y la noche no
  // se cuenta como un bloque desde las 20 ni de 20:00 a 05:30.
  ["gratis", /\bgratis\b/],
  ["entrada libre", /entrada libre/],
  // Abierto («desde las 20», «from 20:00»…); un tramo cerrado («de 20:00 a 23:00», «from 20:00 to 23:00») sí vale.
  ["desde las 20 (y equivalentes)", /desde las 20\b|\bfrom 20[:.]00(?!\s*(?:to|–|-))|\bab 20([:.]00)?\s*uhr|\bdes 20[:h.]|\bdalle (?:ore )?20[:.]00(?!\s*alle)/],
  ["20:00–05:30", /\b20[:.]00\s*(?:–|—|-|a|to|bis|alle)\s*0?5[:.]30/],
  ["2 copas / combinado", /\b2 copas\b|\bcombinados?\b/],
  // Nada de conducción ni transporte para volver (LGCA 123.3.b; a las 05:30, sin confirmar).
  ["taxi", /\btaxis?\b/],
  ["no conduzcas / coche", /no conduzcas|\bconducir\b|\bcoches?\b|don'?t drive|drink and drive/],
  ["transporte público / TIB / lanzadera", /transporte publico|public transport|\btib\b|lanzadera|shuttle/],
  // Promesas sin confirmar.
  ["humo / line-up / zona VIP / actuaciones", /\bhumo\b|line[- ]?up|zona vip|vip area|\bactuacion(es)?\b/],
  // Cupos y puerta (A2 y LANDING-WEB §5): ni aforo ni comparación con la puerta.
  ["aforo / cupo", /\baforo\b|\bcupos?\b/],
  ["en puerta / at the door", /\ben (?:la )?puerta\b|at the door|door price/],
  // Campaña anterior y léxico vetado de LANDING-WEB §4, sin el OK de Jose.
  ["Cruza la X", /cruza la x/],
  ["La puerta roja", /puerta roja|red door/],
  ["El Más Allá", /el mas alla/],
  // Nombres internos de los tokens de color (de trabajo, nunca visibles).
  ["nombres internos de tokens", /rojo rendija|rojo senal|rojo puerta|\blacre\b|\bnucleo\b|\blaton\b|\bhueso\b|negro otro lado|blanco outxide/],
];

/** Datos del panel que NO pueden viajar en la página (nombres, includes, stock, otras noches). */
const LEAKS: [string, RegExp][] = [
  ["otra noche (CALENTÓN)", /calent/],
  ["nombre de tarifa", /anticipada|preventa futura|rrpp invitacion|tarifa completa|tarifa no disponible|campo desconocido/],
  ["descripción del panel", /descripcion de prueba del mock/],
  ["nombre del evento del panel", /outxidious \| outxide/],
  ["cifras de stock", /"sold"|\\"sold\\"|organization_id/],
  ["includes", /\\?"includes\\?"/],
];

function normalize(html: string): string {
  return html.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function expectCleanHtml(html: string, where: string): void {
  const text = normalize(html);
  for (const [name, re] of [...FORBIDDEN, ...LEAKS]) {
    const m = re.exec(text);
    expect(m, `${where}: aparece «${name}» → …${m ? text.slice(Math.max(0, m.index - 60), m.index + 60) : ""}…`).toBeNull();
  }
}

/** Todas las claves hoja del diccionario ("ns.clave"): sirven para cazar claves crudas pintadas. */
function leafKeys(obj: unknown, prefix = ""): string[] {
  if (typeof obj !== "object" || obj === null) return [prefix];
  return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) => leafKeys(v, prefix ? `${prefix}.${k}` : k));
}
const ALL_KEYS = leafKeys(es);

async function expectNoRawKeys(page: Page, where: string): Promise<void> {
  const text = await page.locator("body").innerText();
  const raw = ALL_KEYS.filter((k) => text.includes(k));
  expect(raw, `${where}: claves sin traducir en la página`).toEqual([]);
}

/** Los 5 diccionarios (mismas claves; es.ts define el tipo). */
const DICTS = { es, en, de, fr, it: itDict } as const;
const LOCALES = ["es", "en", "de", "fr", "it"] as const;
const localePath = (loc: (typeof LOCALES)[number], q = "") => `${loc === "es" ? "" : `/${loc}`}${OUTXIDIOUS_PATH}${q}`;

/** Todas las cadenas de un objeto (para revisar content.ts y el diccionario). */
function allStrings(obj: unknown): string[] {
  if (typeof obj === "string") return [obj];
  if (typeof obj !== "object" || obj === null) return [];
  return Object.values(obj as Record<string, unknown>).flatMap(allStrings);
}

/**
 * Edad: +18 en las DOS partes (el tardeo también, resuelto por Sergi el 20-oct;
 * paquete v0.4). Ningún texto puede dar otra edad («+16», «21+», «mayores de
 * 16», «todas las edades»…). Devuelve los textos que la dan.
 */
// (El «ab» alemán también precede al precio, «ab 12,96 €»: por eso no cuenta
// si detrás del número viene un decimal o una hora.)
const OTHER_AGE =
  /\+\s?(?!18\b)\d{2}\b|\b(?!18\b)\d{2}\s?\+|(?:mayores|menores) de (?!18\b)\d{2}\b|\bab (?!18\b)\d{2}(?![,.:]\d)\b|\b(?!18\b)\d{2} (?:ans|jahren|anni)\b|maggiori di (?!18\b)\d{2}\b|todas las edades|all ages|alle altersgruppen|tous ages|tutte le eta/;
function wrongAge(texts: string[]): string[] {
  return texts.filter((t) => OTHER_AGE.test(normalize(t)));
}

/** Marcas de trabajo que no pueden publicarse: corchetes y [CONFIRMAR]/[CONFIRM]. */
const WORK_MARKS = /[[\]]|confirmar|\bconfirm\b/i;

// ---------------------------------------------------------------------------
// Datos del doble de Fourvenues
// ---------------------------------------------------------------------------

function unwrap<T>(json: unknown): T[] {
  if (Array.isArray(json)) return json as T[];
  return ((json as { data?: T[] } | null)?.data ?? []) as T[];
}

async function mockEvents(request: APIRequestContext): Promise<FVEvent[]> {
  return unwrap<FVEvent>(await (await request.get(`${MOCK}/events`)).json());
}

async function mockOxRates(request: APIRequestContext): Promise<{ event: FVEvent; rates: FVTicketRate[] }> {
  const event = (await mockEvents(request)).find((e) => e.code === OX_CODE);
  if (!event) throw new Error("el doble no devuelve el evento OUTXIDIOUS");
  const rates = unwrap<FVTicketRate>(await (await request.get(`${MOCK}/ticket-rates?event_id=${event._id}`)).json());
  return { event, rates };
}

/**
 * Precio «desde» calculado A MANO desde el doble, sin el código de la app:
 * precio + 8 % de gastos redondeado a céntimos, solo de las tarifas públicas,
 * disponibles, no completas, ya en venta y sin campos que la taquilla no sabe
 * pedir. Con los datos del doble: min(12 + 0,96; 15 + 1,20) = 12,96 €.
 */
function handPriceFrom(rates: FVTicketRate[]): number {
  const known = new Set(["full_name", "email", "phone", "birthday", "birthdate"]);
  const totals = rates
    .filter((r) => r.type !== "private" && r.available !== false && r.complete !== true)
    .filter((r) => !r.valid_from || Date.parse(r.valid_from) <= Date.now())
    .filter((r) => !(r.fields ?? []).some((f) => f.required && !known.has(f.slug)))
    .filter((r) => (r.current_price?.price ?? 0) > 0)
    .map((r) => {
      const p = r.current_price!;
      const fee = p.fee_type === "percentage" ? Math.round(p.price * p.fee_quantity) / 100 : p.fee_quantity;
      return Math.round((p.price + fee) * 100) / 100;
    });
  return Math.min(...totals);
}

// ---------------------------------------------------------------------------
// Contenido FICTICIO de la rama aprobada (solo aquí, nunca en content.ts)
// ---------------------------------------------------------------------------

/** Todos los huecos encendidos (también index). */
const ALL_APPROVED: OutxidiousApproval = Object.fromEntries(OUTXIDIOUS_SLOTS.map((s) => [s, true]));

const FIXTURE: OutxidiousContent = {
  approved: ALL_APPROVED,
  theme: "campana-roja",
  locales: {
    es: {
      claim: "CLAIM FICTICIO DE PRUEBA",
      claimToday: "CLAIM DEL DIA FICTICIO",
      sections: [
        { title: "SECCION FICTICIA UNO", text: "Texto ficticio uno." },
        { title: "SECCION FICTICIA DOS", text: "Texto ficticio dos." },
      ],
      // Ficheros YA publicados del sitio: solo para que el vídeo cargue en la prueba.
      // Con claim, el vídeo de móvil va más recortado (4:1) para que la placa
      // siga en la primera pantalla: se reduce el vídeo, nunca la placa.
      heroMedia: {
        kind: "video",
        src: "/videos/outxide-hero.mp4",
        poster: "/videos/outxide-hero-poster.jpg",
        width: 960,
        height: 540,
        mobileAspect: 4,
        label: "Video ficticio de prueba",
      },
      ogImage: { url: "/videos/outxide-hero-poster.jpg", width: 1920, height: 1080, alt: "Imagen OG ficticia" },
    },
    en: { claim: "FICTITIOUS EN CLAIM" },
  },
};
const toHeader = (c: OutxidiousContent) => Buffer.from(JSON.stringify(c), "utf8").toString("base64url");
const FIXTURE_HEADER = toHeader(FIXTURE);

// El teaser aprobado (content.ts) y sus ficheros en public/.
const TEASER = {
  mp4: "/videos/outxidious/outxidious-teaser-720.mp4",
  webm: "/videos/outxidious/outxidious-teaser-720.webm",
  poster: "/videos/outxidious/outxidious-teaser-poster.webp",
} as const;

// ---------------------------------------------------------------------------
// Preparación de página
// ---------------------------------------------------------------------------

/** Muro +18 ya confirmado y cookies ya decididas (solo necesarias), como los demás specs. */
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

/** IP propia por test (X-Forwarded-For): las rutas /api/checkout limitan por IP. */
function clientIp(): string {
  const info = test.info();
  let h = 11;
  for (const ch of `${info.testId}:${info.retry}:${info.repeatEachIndex}`) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return `10.${(h >>> 16) & 255}.${(h >>> 8) & 255}.${h & 255}`;
}

const buyLinks = (page: Page) => page.locator('a[href*="entradas.grupoenjoy.es"]');

test.use({ locale: "es-ES" });

// ===========================================================================
// 1. Lógica pura (sin navegador)
// ===========================================================================

test.describe("OUTXIDIOUS · lógica pura", () => {
  test("content.ts: paquete provisional encendido (vídeo, claim, bloques con FAQ y tema rojo); OG e index apagados", () => {
    expect(OUTXIDIOUS_CONTENT.approved).toEqual({
      heroMedia: true,
      claim: true,
      sections: true,
      theme: true,
      ogImage: false,
      index: false,
    });
    expect(OUTXIDIOUS_CONTENT.theme).toBe("campana-roja");
    expect(isOutxidiousIndexable(OUTXIDIOUS_CONTENT)).toBe(false);
    expect(outxidiousSitemapPaths(OUTXIDIOUS_CONTENT)).toEqual([]);
    const labels = new Set<string>();
    for (const loc of LOCALES) {
      const r = resolveOutxidiousContent(OUTXIDIOUS_CONTENT, loc);
      // Sin imagen OG en el paquete: la foto por defecto (nunca el logo fijo).
      expect(r).toMatchObject({ theme: "campana-roja", ogImage: null });
      // El teaser aprobado, con su descripción accesible PROPIA en cada idioma
      // y el recorte más estrecho para pantallas bajas.
      expect(r.heroMedia).toMatchObject({
        kind: "video",
        src: TEASER.mp4,
        webmSrc: TEASER.webm,
        poster: TEASER.poster,
        width: 720,
        height: 720,
        mobileAspect: 2.5,
        shortAspect: 5,
        focusY: 45,
      });
      const label = r.heroMedia?.kind === "video" ? r.heroMedia.label : "";
      expect(label.length, loc).toBeGreaterThan(20);
      labels.add(label);
    }
    expect(labels.size, "una descripción distinta por idioma").toBe(5);

    // ES y EN: claim, claim del día, los 4 bloques y la FAQ del paquete.
    for (const loc of ["es", "en"] as const) {
      const r = resolveOutxidiousContent(OUTXIDIOUS_CONTENT, loc);
      expect(r.claim, loc).toBeTruthy();
      expect(r.claimToday, loc).toBeTruthy();
      expect(r.sections, loc).toHaveLength(4);
      // Tardeo («este lado») y OUTXIDE («el otro lado»), cada uno con su color.
      expect(r.sections.map((x) => x.tone)).toEqual(["tardeo", "noche", undefined, undefined]);
      expect(r.sections[0].time).toBe("{tardeoStart}–{tardeoEnd}");
      expect(r.sections[1].time).toBe("{start}–{end}");
      // Las 7 preguntas del paquete (la 3, «¿Necesito algo para entrar al
      // tardeo?», vuelve con el +18 del tardeo resuelto).
      expect(r.faq.length, loc).toBe(7);
      // Las dos partes, +18: el bloque del tardeo, la FAQ 1, la 3 y la 7 lo dicen.
      expect(r.sections[0].text, loc).toMatch(/18/);
      for (const i of [0, 2, 6]) expect(r.faq[i].a, `${loc} FAQ ${i + 1}`).toMatch(/18/);
    }
    expect(resolveOutxidiousContent(OUTXIDIOUS_CONTENT, "es").sections[0].text).toBe(
      "Empezamos antes, en Enjoy Terrace, con acceso libre y gratuito.\nSolo mayores de\u00a018: trae tu documento.",
    );
    expect(resolveOutxidiousContent(OUTXIDIOUS_CONTENT, "es").faq[0]).toEqual({
      q: "¿Qué edad hay que tener? ¿Piden DNI?",
      a: "Las dos partes son solo para mayores de 18: se pide DNI o pasaporte. Sin documento, no se entra.",
    });
    expect(resolveOutxidiousContent(OUTXIDIOUS_CONTENT, "es").faq[2].q).toBe("¿Necesito algo para entrar al tardeo?");
    expect(resolveOutxidiousContent(OUTXIDIOUS_CONTENT, "en").faq[0].a).toBe("Both parts are 18+ only: ID or passport required. No ID, no entry.");
    expect(resolveOutxidiousContent(OUTXIDIOUS_CONTENT, "es").claim).toBe("Algo cruzó contigo.");
    expect(resolveOutxidiousContent(OUTXIDIOUS_CONTENT, "en").claim).toBe("Something crossed over with you.");
    // DE, FR e IT: sin copy creativo (no se traduce) y NUNCA el español.
    for (const loc of ["de", "fr", "it"] as const) {
      const r = resolveOutxidiousContent(OUTXIDIOUS_CONTENT, loc);
      expect(r, loc).toMatchObject({ claim: null, claimToday: null, sections: [], faq: [] });
    }

    const copy = (["es", "en"] as const).flatMap((loc) => {
      const own = OUTXIDIOUS_CONTENT.locales[loc]!;
      return [own.claim ?? "", own.claimToday ?? "", ...allStrings(own.sections), ...allStrings(own.faq)];
    });
    // Ninguna frase da otra edad que no sea +18.
    expect(wrongAge(copy)).toEqual([]);
    // Las horas de las dos partes van con huecos (Fourvenues manda), nunca a mano;
    // las 00:00 son la hora del «se rompe», no un dato del panel.
    expect(copy.filter((x) => /\b(20|23):00\b|\b05:30\b/.test(x))).toEqual([]);
    // Léxico vetado también en la fuente (los 5 idiomas).
    expectCleanHtml(JSON.stringify(OUTXIDIOUS_CONTENT), "content.ts");

    // Los ficheros están en public/ y pesan lo que se aprobó (vídeo ligero).
    for (const [file, max] of [[TEASER.mp4, 200_000], [TEASER.webm, 150_000], [TEASER.poster, 20_000]] as const) {
      const size = statSync(`public${file}`).size;
      expect(size, file).toBeGreaterThan(1_000);
      expect(size, file).toBeLessThanOrEqual(max);
    }
  });

  test("nada con [CONFIRMAR] / [CONFIRM] ni corchetes en lo publicable, en los 5 idiomas", () => {
    // Fuente: content.ts entero y el namespace outxidious de los 5 diccionarios.
    const sources: [string, string[]][] = [
      ["content.ts", allStrings(OUTXIDIOUS_CONTENT.locales)],
      ...LOCALES.map((loc) => [`${loc}.ts · outxidious`, allStrings(DICTS[loc].outxidious)] as [string, string[]]),
    ];
    for (const [where, strings] of sources) {
      expect(strings.filter((x) => WORK_MARKS.test(x)), where).toEqual([]);
    }
    // En el diccionario, +18 y ninguna otra edad; DJ Siquiers tal cual en los 5 idiomas.
    for (const loc of LOCALES) {
      const { legalPlate, partOutxideDj, ...rest } = DICTS[loc].outxidious;
      expect(legalPlate).toMatch(/18/);
      expect(partOutxideDj, loc).toBe("DJ Siquiers");
      expect(wrongAge(allStrings(rest)), loc).toEqual([]);
      expectCleanHtml(JSON.stringify(DICTS[loc].outxidious), `${loc}.ts · outxidious`);
    }
    // Copy creativo del diccionario (§6.3b) solo en ES y EN: DE/FR/IT, vacío.
    expect(es.outxidious.subtitle.length).toBeGreaterThan(20);
    expect(en.outxidious.subtitle.length).toBeGreaterThan(20);
    for (const loc of ["de", "fr", "it"] as const) expect(DICTS[loc].outxidious.subtitle, loc).toBe("");
  });

  test("aprobación POR HUECO: cada pieza se enciende sola; index aparte; el interruptor único ya no vale", () => {
    // Relleno entero pero nada aprobado: nada se pinta.
    const off = { ...FIXTURE, approved: {} };
    expect(resolveOutxidiousContent(off, "es")).toMatchObject({ theme: "neutro", claim: null, heroMedia: null, ogImage: null });
    expect(resolveOutxidiousContent(off, "es").sections).toEqual([]);
    expect(outxidiousSitemapPaths(off)).toEqual([]);
    // Solo el vídeo (lo de hoy): ni claim, ni secciones, ni rojo, ni OG, ni index.
    const onlyMedia = { ...FIXTURE, approved: { heroMedia: true } };
    expect(resolveOutxidiousContent(onlyMedia, "es")).toMatchObject({ theme: "neutro", claim: null, ogImage: null });
    expect(resolveOutxidiousContent(onlyMedia, "es").heroMedia?.kind).toBe("video");
    expect(isOutxidiousIndexable(onlyMedia)).toBe(false);
    // Solo el claim: sin vídeo ni tema.
    const onlyClaim = resolveOutxidiousContent({ ...FIXTURE, approved: { claim: true } }, "es");
    expect(onlyClaim).toMatchObject({ claim: "CLAIM FICTICIO DE PRUEBA", claimToday: "CLAIM DEL DIA FICTICIO", heroMedia: null, theme: "neutro" });
    // Solo el tema: rojo sin ningún texto creativo.
    const onlyTheme = resolveOutxidiousContent({ ...FIXTURE, approved: { theme: true } }, "es");
    expect(onlyTheme).toMatchObject({ theme: "campana-roja", claim: null, heroMedia: null });
    // Index sin nada creativo (y al revés, todo creativo sin index).
    expect(outxidiousSitemapPaths({ ...FIXTURE, approved: { index: true } })).toEqual([OUTXIDIOUS_PATH]);
    expect(isOutxidiousIndexable({ ...FIXTURE, approved: { ...ALL_APPROVED, index: false } })).toBe(false);
    // Solo un true explícito cuenta.
    expect(resolveOutxidiousContent({ ...FIXTURE, approved: { claim: "yes" as unknown as boolean } }, "es").claim).toBeNull();
    // El formato antiguo (approved: true/false) se rechaza entero en el doble de pruebas.
    expect(parseOutxidiousContent({ ...FIXTURE, approved: true })).toBeNull();
    expect(parseOutxidiousContent({ approved: false, theme: "neutro", locales: {} })).toBeNull();
    // La FAQ va con el hueco `sections`.
    const withFaq: OutxidiousContent = {
      ...FIXTURE,
      locales: { ...FIXTURE.locales, es: { ...FIXTURE.locales.es, faq: [{ q: "PREGUNTA FICTICIA", a: "Respuesta ficticia." }] } },
    };
    expect(resolveOutxidiousContent({ ...withFaq, approved: { sections: true } }, "es").faq).toHaveLength(1);
    expect(resolveOutxidiousContent({ ...withFaq, approved: { claim: true } }, "es").faq).toEqual([]);
    // Un idioma con los huecos de texto VACÍOS no cae al español (ni el claim
    // del día); uno que no los trae, sí.
    const emptyDe: OutxidiousContent = {
      ...withFaq,
      approved: ALL_APPROVED,
      locales: { ...withFaq.locales, de: { claim: "", claimToday: "", sections: [], faq: [] } },
    };
    expect(resolveOutxidiousContent(emptyDe, "de")).toMatchObject({ claim: null, claimToday: null, sections: [], faq: [] });
    expect(resolveOutxidiousContent(emptyDe, "fr")).toMatchObject({ claim: "CLAIM FICTICIO DE PRUEBA", claimToday: "CLAIM DEL DIA FICTICIO" });
    expect(resolveOutxidiousContent(emptyDe, "fr").faq).toHaveLength(1);
    expect(parseOutxidiousContent(emptyDe)).toEqual(emptyDe);
  });

  test("rama aprobada: index, sitemap y huecos por idioma con caída al español", () => {
    expect(isOutxidiousIndexable(FIXTURE)).toBe(true);
    expect(outxidiousSitemapPaths(FIXTURE)).toEqual([OUTXIDIOUS_PATH]);
    const esR = resolveOutxidiousContent(FIXTURE, "es");
    expect(esR).toMatchObject({ theme: "campana-roja", claim: "CLAIM FICTICIO DE PRUEBA", claimToday: "CLAIM DEL DIA FICTICIO" });
    expect(esR.sections).toHaveLength(2);
    const enR = resolveOutxidiousContent(FIXTURE, "en");
    expect(enR.claim).toBe("FICTITIOUS EN CLAIM");
    // Sin claimToday propio, el del día cae al claim del idioma.
    expect(enR.claimToday).toBe("FICTITIOUS EN CLAIM");
    expect(enR.heroMedia?.kind).toBe("video");
    // El validador del doble de pruebas solo acepta rutas propias de public/.
    expect(parseOutxidiousContent(FIXTURE)).toEqual(FIXTURE);
    expect(parseOutxidiousContent(OUTXIDIOUS_CONTENT)).toEqual(OUTXIDIOUS_CONTENT);
    const evil = parseOutxidiousContent({
      ...FIXTURE,
      locales: { es: { heroMedia: { ...FIXTURE.locales.es!.heroMedia!, src: "https://evil.example/x.mp4" } } },
    });
    expect(evil?.locales.es?.heroMedia).toBeUndefined();
    expect(parseOutxidiousContent({ approved: "yes" })).toBeNull();
  });

  test("detección del evento: OUTXIDIOUS_EVENT_REF por código, o nombre + noche del 31", async ({ request }) => {
    const events = await mockEvents(request);
    expect(findOutxidiousEvent(events)?.code).toBe(OX_CODE);
    // El ref manda por código (aunque el nombre no case)…
    const calenton = events.find((e) => e.code === "AA6X")!;
    expect(findOutxidiousEvent(events, "calenton--outxide-18-09-2026-AA6X")?._id).toBe(calenton._id);
    // …y un ref que no existe cae a la detección por nombre y fecha.
    expect(findOutxidiousEvent(events, "no-existe-31-10-2026-ZZZZ")?.code).toBe(OX_CODE);
    const base = events.find((e) => e.code === OX_CODE)!;
    // Evento del panel para TODA la noche (inicio a las 20:00 por el tardeo) o
    // solo para OUTXIDE (23:00): se reconoce igual.
    expect(findOutxidiousEvent([{ ...base, start_date: "2026-10-31T20:00:00+01:00" }])?.code).toBe(OX_CODE);
    expect(findOutxidiousEvent([{ ...base, start_date: "2026-10-31T19:00:00.000Z" }])?.code).toBe(OX_CODE);
    expect(findOutxidiousEvent([{ ...base, start_date: "2026-10-31T23:00:00+01:00" }])?.code).toBe(OX_CODE);
    // Acentos y mayúsculas da igual; otra fecha u otro nombre, no.
    expect(findOutxidiousEvent([{ ...base, name: "Outxídious · Halloween" }])).not.toBeNull();
    expect(findOutxidiousEvent([{ ...base, start_date: "2026-11-01T00:30:00+01:00" }])).not.toBeNull();
    expect(findOutxidiousEvent([{ ...base, start_date: "2026-10-30T23:00:00+01:00" }])).toBeNull();
    expect(findOutxidiousEvent([{ ...base, start_date: "2026-11-01T07:00:00+01:00" }])).toBeNull();
    expect(findOutxidiousEvent([{ ...base, name: "HALLOWEEN | OUTXIDE" }])).toBeNull();
    expect(findOutxidiousEvent([])).toBeNull();
  });

  test("horario de OUTXIDE: el del evento solo si es coherente (≥ 22:00), si no la constante; el tardeo, fijo", () => {
    expect([TARDEO_START_TIME, TARDEO_END_TIME]).toEqual(["20:00", "23:00"]);
    const ev = (start_date: string, end_date = "2026-11-01T05:30:00+01:00") => ({ start_date, end_date });
    const c = { startIso: OUTXIDE_START_ISO, endIso: OUTXIDE_END_ISO };
    // Sin evento: el horario de los anuncios.
    expect(outxideSchedule(null)).toEqual(c);
    // Evento de toda la noche (20:00, por el tardeo): la línea de OUTXIDE sigue a las 23:00; el fin real vale.
    expect(outxideSchedule(ev("2026-10-31T20:00:00+01:00"))).toEqual(c);
    expect(outxideSchedule(ev("2026-10-31T19:00:00.000Z", "2026-11-01T04:30:00.000Z"))).toEqual({
      startIso: OUTXIDE_START_ISO,
      endIso: "2026-11-01T04:30:00.000Z",
    });
    expect(outxideSchedule(ev("2026-10-31T21:59:00+01:00")).startIso).toBe(OUTXIDE_START_ISO);
    // Evento de OUTXIDE (23:00) o con otra hora de la noche: manda el panel.
    expect(outxideSchedule(ev("2026-10-31T22:00:00.000Z", "2026-11-01T04:30:00.000Z"))).toEqual({
      startIso: "2026-10-31T22:00:00.000Z",
      endIso: "2026-11-01T04:30:00.000Z",
    });
    expect(outxideSchedule(ev("2026-10-31T22:30:00+01:00")).startIso).toBe("2026-10-31T22:30:00+01:00");
    expect(outxideSchedule(ev("2026-11-01T00:30:00+01:00")).startIso).toBe("2026-11-01T00:30:00+01:00");
    // Fin absurdo (antes del inicio o al día siguiente) o fechas rotas: la constante.
    expect(outxideSchedule(ev("2026-10-31T23:00:00+01:00", "2026-10-31T22:00:00+01:00")).endIso).toBe(OUTXIDE_END_ISO);
    expect(outxideSchedule(ev("2026-10-31T23:00:00+01:00", "2026-11-02T05:30:00+01:00")).endIso).toBe(OUTXIDE_END_ISO);
    expect(outxideSchedule({ start_date: "no es fecha", end_date: null })).toEqual(c);
    // En hora de Madrid: «23:00» y «05:30».
    expect(toMadridIso(OUTXIDE_START_ISO)).toBe("2026-10-31T23:00:00+01:00");
    expect(toMadridIso(OUTXIDE_END_ISO)).toBe("2026-11-01T05:30:00+01:00");
  });

  test("JSON-LD: un único Event (OUTXIDE) con la oferta; OUTXIDIOUS de Enjoy Terrace y OUTXIDE en la descripción, sin subEvent ni performer", () => {
    // Lo que hace la página con un evento del panel que empieza a las 20:00.
    const { startIso, endIso } = outxideSchedule({ start_date: "2026-10-31T19:00:00.000Z", end_date: "2026-11-01T04:30:00.000Z" });
    const ld = buildOutxidiousEventJsonLd({
      name: es.outxidious.jsonLdName,
      description: es.outxidious.jsonLdDescription
        .replace("{start}", "23:00")
        .replace("{end}", "05:30")
        .replace("{tardeoStart}", TARDEO_START_TIME)
        .replace("{tardeoEnd}", TARDEO_END_TIME),
      locale: "es",
      pageUrl: "https://www.grupoenjoy.es/outxide/outxidious",
      image: "/images/outxide/DSCF8103-9.jpg",
      startDate: startIso,
      endDate: endIso,
      offer: { price: 12.96, url: `https://entradas.grupoenjoy.es/?event=${OX_REF}&lang=es`, validFrom: null },
    });
    expect(ld).toMatchObject({
      "@type": "Event",
      startDate: "2026-10-31T23:00:00+01:00",
      endDate: "2026-11-01T05:30:00+01:00",
      isAccessibleForFree: false,
      typicalAgeRange: "18-",
      location: { name: "Outxide Club" },
      offers: { "@type": "Offer", price: "12.96", priceCurrency: "EUR" },
    });
    expect(ld).not.toHaveProperty("subEvent");
    // DJ Siquiers no va como performer: Fourvenues no tiene campo de artistas.
    expect(ld).not.toHaveProperty("performer");
    expect(JSON.stringify(ld).match(/"@type":"Event"/g)).toHaveLength(1);
    // Paquete v0.3: OUTXIDIOUS no se reduce al club; v0.4: +18 en las dos partes.
    expect(ld.description).toBe(
      "OUTXIDIOUS, el Halloween 2026 de Enjoy Terrace y OUTXIDE (Av. Tucán 1, Port d'Alcúdia), sábado 31 de octubre: OUTXIDE de 23:00 a 05:30. Antes, de 20:00 a 23:00, tardeo de acceso libre en Enjoy Terrace. Solo mayores de 18 años.",
    );
    expect(ld.description).not.toMatch(/Halloween 2026 en OUTXIDE/);
    // Los 5 idiomas: ninguno presenta OUTXIDIOUS como «el Halloween de OUTXIDE (Club)».
    for (const loc of LOCALES) {
      const d = DICTS[loc].outxidious.jsonLdDescription;
      expect(d, loc).toMatch(/^OUTXIDIOUS, /);
      expect(d, loc).toMatch(/Enjoy Terrace.*OUTXIDE/);
      expect(d, loc).toMatch(/18/);
    }
  });

  test("tarifas vendibles y precio «desde» con gastos = cálculo a mano", async ({ request }) => {
    const { rates } = await mockOxRates(request);
    const sellable = sellableRates(rates, Date.now());
    // Fuera: privada, inicio futuro, completa, no disponible y campo desconocido.
    expect(sellable.map((r) => r.current_price?.price).sort()).toEqual([12, 15]);
    expect(priceFromWithFees(sellable)).toBe(handPriceFrom(rates));
    expect(handPriceFrom(rates)).toBe(12.96);
    expect(priceFromWithFees([])).toBeNull();
  });

  test("estado: ?phase (no producción) > OUTXIDIOUS_PHASE > automático, y nunca botón sin tarifa", () => {
    const oct19 = Date.parse("2026-10-19T12:00:00+02:00");
    const sat = TODAY_FROM + 60 * 60 * 1000;
    const after = AFTER_FROM;
    const r = (now: number, canSell: boolean, envPhase: "auto" | "pronto" | "despues" = "auto", queryPhase: "pronto" | "venta" | "hoy" | "despues" | null = null) =>
      resolvePhase({ now, canSell, envPhase, queryPhase });
    expect(r(oct19, true)).toEqual({ phase: "venta", today: false });
    expect(r(oct19, false)).toEqual({ phase: "pronto", today: false });
    expect(r(sat, true)).toEqual({ phase: "venta", today: true });
    expect(r(sat, false)).toEqual({ phase: "pronto", today: true });
    expect(r(after, true)).toEqual({ phase: "despues", today: false });
    expect(r(oct19, true, "pronto")).toEqual({ phase: "pronto", today: false });
    expect(r(oct19, true, "despues")).toEqual({ phase: "despues", today: false });
    expect(r(oct19, true, "auto", "hoy")).toEqual({ phase: "venta", today: true });
    expect(r(oct19, false, "auto", "venta")).toEqual({ phase: "pronto", today: false });
    expect(r(oct19, false, "auto", "hoy")).toEqual({ phase: "pronto", today: true });
    expect(r(after, true, "auto", "venta")).toEqual({ phase: "venta", today: false });
    // «Hoy» se apaga a las 00:00 del domingo 1 (desde ahí «hoy» ya es domingo);
    // la venta sigue hasta el final de la noche.
    expect(TODAY_TO - TODAY_FROM).toBe(24 * 60 * 60 * 1000);
    expect(r(TODAY_TO - 60_000, true)).toEqual({ phase: "venta", today: true });
    expect(r(TODAY_TO, true)).toEqual({ phase: "venta", today: false });
    expect(r(TODAY_TO, false)).toEqual({ phase: "pronto", today: false });
    expect(r(AFTER_FROM - 60_000, true)).toEqual({ phase: "venta", today: false });
  });

  test("diccionario recortado SOLO en la landing", () => {
    expect(dictionaryScopeFor("/outxide/outxidious")).not.toBeNull();
    expect(dictionaryScopeFor("/outxide/outxidious/")).not.toBeNull();
    for (const p of ["/", "/outxide", "/agenda", "/taquilla", "/legal/privacidad", "/outxide/outxidiousx", null, undefined]) {
      expect(dictionaryScopeFor(p), String(p)).toBeNull();
    }
    const picked = pickDictionary(es, dictionaryScopeFor(OUTXIDIOUS_PATH)!) as unknown as Record<string, Record<string, string>>;
    expect(Object.keys(picked).sort()).toEqual(["agenda", "ageVerification", "common", "cookieBanner", "error", "outxidious"].sort());
    expect(Object.keys(picked.common)).toEqual(["language"]);
    expect(Object.keys(picked.agenda).every((k) => k.startsWith("alerts"))).toBe(true);
    // El recorte no lleva léxico vetado (es lo que viaja en el payload RSC).
    expectCleanHtml(JSON.stringify(picked), "diccionario recortado");
  });
});

// ===========================================================================
// 2. La página
// ===========================================================================

test.describe("OUTXIDIOUS · landing", () => {
  test.beforeEach(async ({ context }) => {
    await preconfirm(context);
  });

  test("venta: un h1, precio «desde» del doble, UN botón con el href exacto y placa legal", async ({ page, request }) => {
    test.skip(CAMPAIGN_OVER, "la noche ya pasó");
    const { rates } = await mockOxRates(request);
    const expected = handPriceFrom(rates);

    await page.goto(OUTXIDIOUS_PATH);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText("OUTXIDIOUS · sábado 31 de octubre");
    await expect(page.getByTestId("outxidious-page")).toHaveAttribute("data-phase", "venta");
    // Importe como CADENA (Intl usa espacio duro; Playwright lo normaliza).
    expect(expected).toBe(12.96);
    await expect(page.getByTestId("outxidious-price")).toHaveText("Entradas para OUTXIDE desde 12,96 € (gastos incluidos)");

    await expect(buyLinks(page)).toHaveCount(1);
    const buy = page.getByTestId("outxidious-buy");
    await expect(buy).toHaveText("Comprar entradas");
    expect(await buy.evaluate((a) => a.tagName)).toBe("A");
    await expect(buy).toHaveAttribute("href", `https://entradas.grupoenjoy.es/?event=${OX_REF}&lang=es`);
    const box = await buy.boundingBox();
    expect(box!.width).toBeGreaterThanOrEqual(44);
    expect(box!.height).toBeGreaterThanOrEqual(44);
    expect(await buy.evaluate((a) => parseFloat(getComputedStyle(a).fontSize))).toBeGreaterThanOrEqual(16);

    // Solo este evento: sin menú general ni enlaces a otros locales o noches.
    await expect(page.locator("nav a[href='/enjoy'], a[href*='/hiru'], a[href='/agenda']")).toHaveCount(0);
    await expect(page.getByTestId("outxidious-legal-plate")).toHaveText("+18 · Consumo responsable");
    await expect(page.getByTestId("outxidious-footer-plate")).toHaveText("+18 · Consumo responsable");
    await expect(page.locator("footer")).toContainText("Organiza Enjoy Club 78 S.L. · NIF B75300376 · Av. Tucán 1, 07400 Alcúdia");
    for (const href of ["/legal/condiciones-venta", "/legal/condiciones-entrada", "/legal/privacidad", "/legal/cookies"]) {
      await expect(page.locator(`footer a[href="${href}"]`)).toHaveCount(1);
    }
    // Las DOS partes de la noche, con sus horas y lugares.
    await expect(page.getByTestId("outxidious-part-tardeo")).toHaveText("Tardeo · Enjoy Terrace 20:00–23:00 · acceso libre");
    // DJ Siquiers (confirmado por Sergi, 20-oct) en la parte de OUTXIDE, como dato.
    await expect(page.getByTestId("outxidious-part-outxide")).toHaveText("OUTXIDE · DJ Siquiers 23:00–05:30 · entrada");
    await expect(page.getByTestId("outxidious-part-dj")).toHaveText("DJ Siquiers");
    await expect(page.getByTestId("outxidious-part-tardeo")).not.toContainText("Siquiers");
    // Un mapa por local (los de data/site/contact.json, como el resto de la web).
    await expect(page.locator('a[href^="https://www.google.com/maps"]')).toHaveCount(2);
    // Paquete creativo provisional: claim, nota del botón (debajo de la placa),
    // subtítulo, los 4 bloques con sus horas de Fourvenues, la FAQ y quién lo hace.
    await expect(page.getByTestId("outxidious-claim")).toHaveText("Algo cruzó contigo.");
    await expect(page.getByTestId("outxidious-buy-note")).toHaveText(
      "Entrada para OUTXIDE, de 23:00 a 05:30. El tardeo en Enjoy Terrace es de acceso libre.",
    );
    const plateBox = (await page.getByTestId("outxidious-legal-plate").boundingBox())!;
    const noteBox = (await page.getByTestId("outxidious-buy-note").boundingBox())!;
    expect(noteBox.y).toBeGreaterThanOrEqual(plateBox.y + plateBox.height);
    await expect(page.getByTestId("outxidious-subtitle")).toHaveText(es.outxidious.subtitle);
    const sections = page.getByTestId("outxidious-section");
    await expect(sections).toHaveCount(4);
    await expect(sections.nth(0).locator("h2")).toHaveText("20:00–23:00 · Tardeo de acceso libre en Enjoy Terrace");
    await expect(sections.nth(0)).toContainText("Solo mayores de 18: trae tu documento.");
    await expect(sections.nth(1).locator("h2")).toHaveText("23:00–05:30 · OUTXIDE");
    await expect(sections.nth(1)).toContainText("A las 23:00 se abre. A las 00:00 se rompe. Y la noche sigue al otro lado hasta las 05:30.");
    await expect(sections.nth(2).locator("h2")).toHaveText("Dress code: negro");
    await expect(sections.nth(3).locator("h2")).toHaveText("Llega antes de las 00:00");
    const faq = page.getByTestId("outxidious-faq");
    await expect(faq.locator("h2")).toHaveText("Preguntas frecuentes");
    await expect(faq.locator("h3")).toHaveCount(7);
    await expect(faq).toContainText("OUTXIDE abre a las 23:00 y cierra a las 05:30.");
    await expect(faq).toContainText("Las dos partes son solo para mayores de 18: se pide DNI o pasaporte.");
    await expect(faq).toContainText(
      "Solo tu documento: es de acceso libre y para mayores de 18. La entrada solo hace falta para seguir en OUTXIDE a partir de las 23:00.",
    );
    await expect(faq).toContainText("Es una noche para mayores de 18 y pedimos consumo responsable.");
    await expect(page.locator("footer")).toContainText("OUTXIDIOUS es un evento de OUTXIDE Club y Enjoy Terrace.");
  });

  test("tardeo de acceso libre: sin botón, precio, enlace ni formulario; el único botón y el precio son de OUTXIDE", async ({ page }) => {
    test.skip(CAMPAIGN_OVER, "la noche ya pasó");
    await page.goto(OUTXIDIOUS_PATH);
    const tardeo = page.getByTestId("outxidious-part-tardeo");
    await expect(tardeo).toBeVisible();
    await expect(tardeo.locator("a, button, form, input")).toHaveCount(0);
    await expect(tardeo).not.toContainText("€");
    // En venta no hay ningún formulario en la página (los avisos solo salen en «pronto»).
    await expect(page.locator("form")).toHaveCount(0);
    await expect(buyLinks(page)).toHaveCount(1);
    await expect(page.locator("main button")).toHaveCount(1); // solo pausa/reproducir del vídeo
    await expect(page.getByTestId("outxidious-video-toggle")).toHaveCount(1);
    // El precio dice de qué parte es y va DESPUÉS de las dos partes, junto al botón.
    await expect(page.getByTestId("outxidious-price")).toContainText("OUTXIDE");
    const parts = (await page.getByTestId("outxidious-parts").boundingBox())!;
    const price = (await page.getByTestId("outxidious-price").boundingBox())!;
    expect(price.y).toBeGreaterThan(parts.y + parts.height - 1);
    // El bloque del tardeo: acceso libre y +18 (resuelto el 20-oct), sin
    // precio, ni botón, ni «entrada».
    const block = page.getByTestId("outxidious-section").first();
    await expect(block).toContainText("acceso libre");
    await expect(block).toContainText("Solo mayores de 18");
    await expect(block).not.toContainText("€");
    await expect(block).not.toContainText(/entrada/i);
    await expect(block.locator("a, button, form, input")).toHaveCount(0);
  });

  test("tema rojo provisional: tokens del paquete, placa a 14 px y +0,2 em, horas del tardeo y de OUTXIDE en su color", async ({ page }) => {
    test.skip(CAMPAIGN_OVER, "la noche ya pasó");
    await page.goto(OUTXIDIOUS_PATH);
    const root = page.getByTestId("outxidious-page");
    await expect(root).toHaveAttribute("data-theme", "campana-roja");
    await expect(root).toHaveClass(/theme-outxidious/);
    const css = (sel: ReturnType<Page["getByTestId"]>, prop: string) =>
      sel.evaluate((el, p) => getComputedStyle(el).getPropertyValue(p).trim(), prop);
    expect(await css(root, "background-color")).toBe("rgb(7, 7, 7)");
    expect(await css(root, "color")).toBe("rgb(238, 231, 218)");
    // Claim y hora de OUTXIDE en #f23300 (5,04:1, PENDIENTE DE JOSE); nunca #a0070e como texto.
    expect(await css(page.getByTestId("outxidious-claim"), "color")).toBe("rgb(242, 51, 0)");
    const buy = page.getByTestId("outxidious-buy");
    expect(await css(buy, "background-color")).toBe("rgb(228, 38, 43)");
    expect(await css(buy, "color")).toBe("rgb(255, 255, 255)");
    expect(await css(root, "--ox-btn-active")).toBe("#a0070e");
    // Brillo al 0,26 (el minificador de CSS lo escribe en hex: 0x42/255 ≈ 0,26).
    expect(await css(root, "--ox-glow")).toMatch(/rgba\(160, 7, 14, 0\.26\)|#a0070e42/);
    const plate = page.getByTestId("outxidious-legal-plate");
    expect(await css(plate, "background-color")).toBe("rgb(160, 7, 14)");
    expect(await css(plate, "color")).toBe("rgb(248, 248, 248)");
    expect(await css(plate, "font-size")).toBe("14px");
    expect(await css(plate, "letter-spacing")).toBe("2.8px");
    const times = page.getByTestId("outxidious-section-time");
    await expect(times).toHaveCount(2);
    expect(await css(times.nth(0), "color"), "tardeo: dorado (PENDIENTE DE JOSE)").toBe("rgb(201, 169, 119)");
    expect(await css(times.nth(1), "color"), "OUTXIDE: rojo de texto").toBe("rgb(242, 51, 0)");
    // Ningún texto en #a0070e ni #4a0a0e (2,43:1 y 1,29:1 sobre negro).
    const darkRedText = await page.evaluate(() =>
      [...document.querySelectorAll("main *, footer *")]
        .filter((el) => el.childNodes.length && [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent!.trim()))
        .filter((el) => ["rgb(160, 7, 14)", "rgb(74, 10, 14)"].includes(getComputedStyle(el).color))
        .map((el) => el.outerHTML.slice(0, 80)),
    );
    expect(darkRedText).toEqual([]);
    // La placa sigue separada del claim (≥ 24 px).
    const claimBox = (await page.getByTestId("outxidious-claim").boundingBox())!;
    const plateBox = (await plate.boundingBox())!;
    expect(plateBox.y - (claimBox.y + claimBox.height)).toBeGreaterThanOrEqual(24);
  });

  test("cómo llegar: Enjoy Terrace (tardeo) y OUTXIDE Club, cada uno con su dirección y su mapa", async ({ page }) => {
    await page.goto(OUTXIDIOUS_PATH);
    const enjoy = page.getByTestId("outxidious-venue-enjoy");
    const outxide = page.getByTestId("outxidious-venue-outxide");
    await expect(enjoy.locator("h3")).toHaveText("Enjoy Terrace · tardeo de 20:00 a 23:00");
    await expect(outxide.locator("h3")).toHaveText("OUTXIDE Club · de 23:00 a 05:30");
    await expect(enjoy).toContainText("Av. Tucán 1, 07400 Port d'Alcúdia (Mallorca)");
    await expect(outxide).toContainText("Av. Tucán 1, 07400 Port d'Alcúdia (Mallorca)");
    const enjoyMap = enjoy.getByRole("link", { name: "Ver Enjoy Terrace en Google Maps" });
    const outxideMap = outxide.getByRole("link", { name: "Ver OUTXIDE Club en Google Maps" });
    await expect(enjoyMap).toHaveAttribute("href", siteContact.venues.enjoy.mapsUrl);
    await expect(outxideMap).toHaveAttribute("href", siteContact.venues.outxide.mapsUrl);
    for (const link of [enjoyMap, outxideMap]) {
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noopener/);
    }
  });

  for (const viewport of [
    { width: 375, height: 667 },
    { width: 390, height: 844 },
  ]) {
    for (const phase of ["venta", "hoy", "pronto"] as const) {
      test(`primera pantalla ${viewport.width}×${viewport.height} (${phase}): vídeo encima, h1, las dos partes y placa +18 sin hacer scroll`, async ({ page }) => {
        test.skip(CAMPAIGN_OVER && phase !== "pronto", "la noche ya pasó");
        await page.setViewportSize(viewport);
        await page.goto(`${OUTXIDIOUS_PATH}?phase=${phase}`);
        const media = (await page.getByTestId("outxidious-hero-media").boundingBox())!;
        const h1 = (await page.locator("h1").boundingBox())!;
        const parts = (await page.getByTestId("outxidious-parts").boundingBox())!;
        const plate = (await page.getByTestId("outxidious-legal-plate").boundingBox())!;
        // En móvil el vídeo va ENCIMA del h1, recortado a 5:2 (a 5:1 con poca
        // altura de pantalla: con el claim y DJ Siquiers, se reduce el vídeo,
        // nunca la placa).
        const ratio = viewport.height <= 719 ? 5 : 2.5;
        expect(media.y + media.height).toBeLessThanOrEqual(h1.y);
        expect(Math.abs(media.width / media.height - ratio)).toBeLessThan(0.05);
        expect(h1.y).toBeGreaterThanOrEqual(0);
        const claim = (await page.getByTestId("outxidious-claim").boundingBox())!;
        expect(claim.y + claim.height, "el claim en la primera pantalla").toBeLessThanOrEqual(viewport.height);
        expect(parts.y + parts.height, "las dos partes en la primera pantalla").toBeLessThanOrEqual(viewport.height);
        expect(plate.y + plate.height, "la placa debe caber en la primera pantalla").toBeLessThanOrEqual(viewport.height);
        if (phase !== "pronto") {
          const buy = (await page.getByTestId("outxidious-buy").boundingBox())!;
          expect(buy.y + buy.height).toBeLessThanOrEqual(viewport.height);
        }
      });
    }
  }

  for (const phase of ["hoy", "venta", "pronto"] as const) {
    test(`primera pantalla 375×600 (${phase}, navegador de Instagram en un iPhone SE): h1, claim, las dos partes, precio, botón y placa; el vídeo, debajo`, async ({
      page,
    }) => {
      test.skip(CAMPAIGN_OVER && phase !== "pronto", "la noche ya pasó");
      await page.setViewportSize({ width: 375, height: 600 });
      await page.goto(`${OUTXIDIOUS_PATH}?phase=${phase}`);
      const ids = ["outxidious-claim", "outxidious-parts", "outxidious-legal-plate", ...(phase === "pronto" ? [] : ["outxidious-price", "outxidious-buy"])];
      if (phase === "hoy") ids.push("outxidious-today");
      const h1 = (await page.locator("h1").boundingBox())!;
      expect(h1.y).toBeGreaterThanOrEqual(0);
      expect(h1.y + h1.height).toBeLessThanOrEqual(600);
      for (const id of ids) {
        const box = (await page.getByTestId(id).boundingBox())!;
        expect(box.y + box.height, `${id} en la primera pantalla`).toBeLessThanOrEqual(600);
      }
      // Ni recortado cabe encima: el vídeo pasa debajo del texto (nunca la placa fuera).
      const media = (await page.getByTestId("outxidious-hero-media").boundingBox())!;
      const plate = (await page.getByTestId("outxidious-legal-plate").boundingBox())!;
      expect(media.y).toBeGreaterThanOrEqual(plate.y + plate.height);
    });
  }

  test("primera pantalla 375×667 y 375×600 en los otros 4 idiomas (venta y hoy): la placa sigue cabiendo", async ({ page }) => {
    test.skip(CAMPAIGN_OVER, "la noche ya pasó");
    for (const height of [667, 600]) {
      await page.setViewportSize({ width: 375, height });
      for (const loc of ["en", "de", "fr", "it"]) {
        for (const q of ["", "?phase=hoy"]) {
          await page.goto(`/${loc}${OUTXIDIOUS_PATH}${q}`);
          const plate = (await page.getByTestId("outxidious-legal-plate").boundingBox())!;
          const buy = (await page.getByTestId("outxidious-buy").boundingBox())!;
          expect(plate.y + plate.height, `${loc}${q} ${height}`).toBeLessThanOrEqual(height);
          expect(buy.y + buy.height, `${loc}${q} ${height}`).toBeLessThanOrEqual(height);
        }
      }
    }
  });

  test("pronto (?phase=pronto): sin enlace a la taquilla, texto verdadero antes y después de la venta y formulario de avisos con RGPD", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${OUTXIDIOUS_PATH}?phase=pronto`);
    await expect(page.getByTestId("outxidious-page")).toHaveAttribute("data-phase", "pronto");
    await expect(page.locator("h1")).toHaveText("OUTXIDIOUS · sábado 31 de octubre");
    await expect(buyLinks(page)).toHaveCount(0);
    await expect(page.getByTestId("outxidious-price")).toHaveCount(0);
    // «Pronto» sale siempre que no hay tarifa vendible (antes, con todo completo
    // o con Fourvenues caído): nada de «muy pronto», y sin huecos sin rellenar.
    await expect(page.getByTestId("outxidious-soon").locator("h2")).toHaveText("Entradas para OUTXIDE");
    await expect(page.getByTestId("outxidious-soon")).toContainText(
      "La venta online de entradas para OUTXIDE se hace en esta página cuando está abierta. El tardeo en Enjoy Terrace, de 20:00 a 23:00, es de acceso libre.",
    );
    await expect(page.getByTestId("outxidious-soon")).not.toContainText(/pronto|\{/);
    await expect(page.getByTestId("outxidious-buy-note")).toHaveCount(0);
    // El tardeo sigue contado en «pronto», sin botón ni formulario propios.
    await expect(page.getByTestId("outxidious-part-tardeo")).toHaveText("Tardeo · Enjoy Terrace 20:00–23:00 · acceso libre");
    await expect(page.getByTestId("outxidious-part-tardeo").locator("a, button, form, input")).toHaveCount(0);
    const form = page.getByTestId("outxidious-alerts");
    await expect(form).toBeVisible();
    // Misma casilla y textos legales que el formulario de /agenda, sin marcar.
    await expect(form.locator('input[type="checkbox"]')).not.toBeChecked();
    await expect(form).toContainText(es.agenda.alertsPrivacy);
    await expect(form).toContainText(es.agenda.alertsInfoLayer);
    // Sin consentimiento no se envía nada.
    let posted = 0;
    await page.route("**/api/waitlist", (route) => {
      posted++;
      return route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
    });
    await form.locator('input[type="email"]').fill("prueba@test.local");
    await form.getByRole("button", { name: es.agenda.alertsSubmit }).click();
    await expect(form).toContainText(es.agenda.alertsPrivacyRequired);
    expect(posted).toBe(0);
    // Con la casilla: POST /api/waitlist con consentimiento expreso.
    const req = page.waitForRequest("**/api/waitlist");
    await form.locator('input[type="checkbox"]').check();
    await form.getByRole("button", { name: es.agenda.alertsSubmit }).click();
    expect((await req).postDataJSON()).toEqual({ email: "prueba@test.local", consent: true });
    await expect(form).toContainText(es.agenda.alertsSuccess);
  });

  test("hoy (?phase=hoy): línea «Hoy» sin horas, claim del día con la hora de Fourvenues y el mismo botón", async ({ page }) => {
    test.skip(CAMPAIGN_OVER, "la noche ya pasó");
    await page.goto(`${OUTXIDIOUS_PATH}?phase=hoy`);
    await expect(page.getByTestId("outxidious-today")).toHaveText("Hoy, sábado 31");
    await expect(page.getByTestId("outxidious-part-outxide")).toHaveText("OUTXIDE · DJ Siquiers 23:00–05:30 · entrada");
    await expect(buyLinks(page)).toHaveCount(1);
    await expect(page.getByTestId("outxidious-claim")).toHaveText("23:00 se abre. 00:00 se rompe.");
    await page.goto(`/en${OUTXIDIOUS_PATH}?phase=hoy`);
    await expect(page.getByTestId("outxidious-today")).toHaveText("Today, Saturday 31");
    await expect(page.getByTestId("outxidious-claim")).toHaveText("Opens 23:00. Breaks 00:00.");
    // DE/FR/IT: sin claim (no hay versión del copy creativo), nunca el español.
    await page.goto(`/de${OUTXIDIOUS_PATH}?phase=hoy`);
    await expect(page.getByTestId("outxidious-today")).toHaveText("Heute, Samstag, 31. Oktober");
    await expect(page.getByTestId("outxidious-claim")).toHaveCount(0);
  });

  test("después (?phase=despues): sin botón ni precio, agradecimiento y enlace de texto a /outxide", async ({ page }) => {
    await page.goto(`${OUTXIDIOUS_PATH}?phase=despues`);
    await expect(page.getByTestId("outxidious-page")).toHaveAttribute("data-phase", "despues");
    await expect(buyLinks(page)).toHaveCount(0);
    await expect(page.getByTestId("outxidious-price")).toHaveCount(0);
    await expect(page.getByTestId("outxidious-after").locator("h2")).toHaveText("OUTXIDIOUS ya cruzó");
    await expect(page.getByTestId("outxidious-after")).toContainText("Fue el sábado 31 de octubre de 2026. Gracias por venir.");
    await expect(page.getByTestId("outxidious-after").locator('a[href="/outxide"]')).toHaveCount(1);
    await expect(page.getByTestId("outxidious-legal-plate")).toBeVisible();
    // Después del evento, ni bloques ni FAQ ni subtítulo: ya no son verdad.
    await expect(page.getByTestId("outxidious-sections")).toHaveCount(0);
    await expect(page.getByTestId("outxidious-faq")).toHaveCount(0);
    await expect(page.getByTestId("outxidious-subtitle")).toHaveCount(0);
    await expect(page.getByTestId("outxidious-buy-note")).toHaveCount(0);
  });

  test("/en/outxide/outxidious: en inglés, con la taquilla en inglés y el precio en formato inglés", async ({ page }) => {
    test.skip(CAMPAIGN_OVER, "la noche ya pasó");
    await page.goto(`/en${OUTXIDIOUS_PATH}`);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("h1")).toHaveText("OUTXIDIOUS · Saturday 31 October");
    await expect(page.getByTestId("outxidious-buy")).toHaveText("Buy tickets");
    await expect(page.getByTestId("outxidious-buy")).toHaveAttribute("href", `https://entradas.grupoenjoy.es/?event=${OX_REF}&lang=en`);
    await expect(page.getByTestId("outxidious-price")).toHaveText("OUTXIDE tickets from €12.96 (fees included)");
    await expect(page.getByTestId("outxidious-part-tardeo")).toHaveText("Early party · Enjoy Terrace 20:00–23:00 · free entry");
    await expect(page.getByTestId("outxidious-part-outxide")).toHaveText("OUTXIDE · DJ Siquiers 23:00–05:30 · ticket required");
    // Descripción accesible del vídeo en inglés.
    await expect(page.getByTestId("outxidious-hero-video")).toHaveAttribute("aria-label", /^Silent animation/);
    await expect(page.getByTestId("outxidious-legal-plate")).toHaveText("18+ · Drink responsibly");
    await expect(page).toHaveTitle("OUTXIDIOUS · Halloween at Enjoy & OUTXIDE · Sat 31 Oct");
    await expect(page.getByTestId("outxidious-claim")).toHaveText("Something crossed over with you.");
    await expect(page.getByTestId("outxidious-buy-note")).toHaveText("Ticket for OUTXIDE, 23:00–05:30. The early party at Enjoy Terrace is free entry.");
    await expect(page.getByTestId("outxidious-section").nth(0).locator("h2")).toHaveText("20:00–23:00 · Free-entry early party at Enjoy Terrace");
    await expect(page.getByTestId("outxidious-faq").locator("h2")).toHaveText("FAQ");
    await expectNoRawKeys(page, "/en landing");
  });

  test("DE, FR e IT: página neutra con el tema rojo y el teaser, sin copy creativo y nunca en español", async ({ page }) => {
    test.skip(CAMPAIGN_OVER, "la noche ya pasó");
    for (const loc of ["de", "fr", "it"] as const) {
      await page.goto(localePath(loc));
      await expect(page.locator("html")).toHaveAttribute("lang", loc);
      await expect(page.getByTestId("outxidious-page")).toHaveAttribute("data-theme", "campana-roja");
      await expect(page.getByTestId("outxidious-hero-video")).toHaveAttribute("poster", TEASER.poster);
      for (const id of ["outxidious-claim", "outxidious-sections", "outxidious-faq", "outxidious-subtitle"]) {
        await expect(page.getByTestId(id), `${loc}: ${id}`).toHaveCount(0);
      }
      await expect(page.getByTestId("outxidious-buy")).toHaveText(DICTS[loc].outxidious.buy);
      await expect(page.getByTestId("outxidious-legal-plate")).toHaveText(DICTS[loc].outxidious.legalPlate);
      // DJ Siquiers es un dato (no copy creativo): también en DE, FR e IT, tal cual.
      await expect(page.getByTestId("outxidious-part-dj")).toHaveText("DJ Siquiers");
      const text = await page.locator("main").innerText();
      // Ni el claim ni los bloques del paquete en español.
      for (const spanish of ["Algo cruzó contigo", "Empezamos antes", "Dress code: negro", "Preguntas frecuentes"]) {
        expect(text, `${loc}: «${spanish}»`).not.toContain(spanish);
      }
      await expectNoRawKeys(page, `/${loc} landing`);
    }
  });

  test("HTML completo (con payload RSC) sin léxico vetado ni datos del panel o de otras noches", async ({ request }) => {
    const others = LOCALES.filter((l) => l !== "es").map((l) => localePath(l));
    const paths = CAMPAIGN_OVER
      ? [`${OUTXIDIOUS_PATH}?phase=pronto`, `${OUTXIDIOUS_PATH}?phase=despues`]
      : [OUTXIDIOUS_PATH, `${OUTXIDIOUS_PATH}?phase=pronto`, `${OUTXIDIOUS_PATH}?phase=hoy`, `${OUTXIDIOUS_PATH}?phase=despues`, ...others];
    for (const path of paths) {
      const res = await request.get(path);
      expect(res.status(), path).toBe(200);
      const html = await res.text();
      expect(html, `${path}: debe llevar el payload RSC`).toContain("self.__next_f");
      expectCleanHtml(html, path);
      // Ni marcas de trabajo ([CONFIRMAR]/[CONFIRM]). (Los huecos {start}… sí
      // viajan crudos en el diccionario recortado del payload; que no se vean
      // sin rellenar lo comprueba la prueba siguiente sobre el texto visible.)
      expect(normalize(html), path).not.toMatch(/\[confirm/);
      // Evento compartido: el tardeo y Enjoy Terrace sí aparecen (léxico permitido desde el 19-oct).
      expect(normalize(html)).toContain("enjoy terrace");
      // El teaser APROBADO sí (póster precargado + vídeo) y el tema rojo
      // (provisional); el logo fijo suelto, nunca.
      expect(html).toContain(TEASER.poster);
      expect(html).toContain(TEASER.mp4);
      expect(html).not.toContain("/images/outxidious");
      expect(html).toContain("theme-outxidious");
      // Claim y bloques solo en ES y EN, y nunca después del evento.
      const creative = !path.includes("despues") && !/^\/(de|fr|it)\//.test(path);
      expect(html.includes('data-testid="outxidious-claim"'), `${path}: claim`).toBe(!/^\/(de|fr|it)\//.test(path));
      expect(html.includes('data-testid="outxidious-sections"'), `${path}: bloques`).toBe(creative);
      expect(html.includes('data-testid="outxidious-faq"'), `${path}: FAQ`).toBe(creative);
    }
  });

  test("ningún corchete ni hueco sin rellenar en lo que se ve, en los 5 idiomas y en cada estado", async ({ page }) => {
    const phases = CAMPAIGN_OVER ? ["pronto", "despues"] : ["venta", "hoy", "pronto", "despues"];
    for (const loc of LOCALES) {
      for (const phase of phases) {
        const path = localePath(loc, `?phase=${phase}`);
        await page.goto(path);
        const text = await page.locator("body").innerText();
        expect(text.match(/[[\]{}]/g), `${path}: corchetes o llaves`).toBeNull();
        expect(text, path).not.toMatch(/confirmar|\bconfirm\b/i);
        const meta = [
          await page.title(),
          (await page.locator('meta[name="description"]').getAttribute("content")) ?? "",
          (await page.locator('meta[property="og:description"]').getAttribute("content")) ?? "",
        ].join(" | ");
        expect(meta.match(/[[\]{}]/g), `${path}: metadatos`).toBeNull();
      }
    }
  });

  test("edad: +18 en las dos partes y ninguna otra edad en ningún texto de la página", async ({ page }) => {
    for (const loc of LOCALES) {
      for (const q of CAMPAIGN_OVER ? ["?phase=pronto"] : ["", "?phase=hoy", "?phase=pronto"]) {
        const path = localePath(loc, q);
        await page.goto(path);
        // La placa (en mayúsculas por CSS: «ß» pasa a «SS») va aparte.
        const flat = (x: string) => normalize(x).replace(/ß/g, "ss").trim();
        const plate = flat(DICTS[loc].outxidious.legalPlate);
        const lines = (await page.locator("body").innerText()).split("\n").filter((l) => flat(l) !== plate);
        const meta = [
          (await page.locator('meta[name="description"]').getAttribute("content")) ?? "",
          (await page.locator('meta[property="og:description"]').getAttribute("content")) ?? "",
          ...(await page.locator('script[type="application/ld+json"]').allTextContents()).map((j) => JSON.parse(j).description ?? ""),
        ];
        expect(wrongAge([...lines, ...meta]), path).toEqual([]);
        // En ES y EN (con copy creativo), el bloque del tardeo dice el +18.
        if ((loc === "es" || loc === "en") && !q.includes("despues")) {
          await expect(page.getByTestId("outxidious-section").first(), path).toContainText("18");
        }
      }
    }
  });

  test("metadatos propios, noindex, fuera del sitemap y JSON-LD solo del evento", async ({ page, request }) => {
    test.skip(CAMPAIGN_OVER, "la noche ya pasó");
    await page.goto(OUTXIDIOUS_PATH);
    await expect(page).toHaveTitle("OUTXIDIOUS · Halloween en Enjoy y OUTXIDE · Sáb 31 oct");
    expect((await page.title()).length).toBeLessThanOrEqual(60);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    // Paquete v0.4 (§4.5), tal cual: el +18 vale para las dos partes.
    expect(description).toBe(
      "Halloween en Port d'Alcúdia, sáb 31 oct: tardeo de acceso libre en Enjoy Terrace de 20:00 a 23:00. Después, OUTXIDE de 23:00 a 05:30, con entrada. +18.",
    );
    expect(description!.length).toBeLessThanOrEqual(155);
    expect(description).not.toMatch(/€|desde/);
    // og:description creativa (§6.3b) y sin precio: la caché de Meta no se entera de los cambios.
    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute("content");
    expect(ogDescription).toBe(
      "Algo cruzó contigo. Tardeo de acceso libre en Enjoy Terrace de 20:00 a 23:00 y, después, OUTXIDE hasta las 05:30. +18.",
    );
    expect(ogDescription).not.toMatch(/€|\d+,\d\d/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", "OUTXIDIOUS · Sáb 31·10 · Enjoy Terrace + OUTXIDE");
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /\/images\/outxide\/DSCF8103-9\.jpg$/);
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "es_ES");
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", "https://www.grupoenjoy.es/outxide/outxidious");
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute("content", "summary_large_image");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://www.grupoenjoy.es/outxide/outxidious");

    // Un único JSON-LD: el Event a la venta, el de OUTXIDE (sin el ItemList del
    // club). El tardeo gratuito va en la descripción, sin subEvent ni oferta.
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld).toHaveLength(1);
    const data = JSON.parse(ld[0]);
    expect(data["@type"]).toBe("Event");
    expect(data.name).toBe("OUTXIDIOUS · Halloween 2026");
    expect(data.startDate).toBe("2026-10-31T23:00:00+01:00");
    expect(data.endDate).toBe("2026-11-01T05:30:00+01:00");
    expect(data.location.name).toBe("Outxide Club");
    expect(data.isAccessibleForFree).toBe(false);
    expect(data.subEvent).toBeUndefined();
    expect(ld[0].match(/"@type":"Event"/g)).toHaveLength(1);
    expect(ld[0].match(/"@type":"Offer"/g)).toHaveLength(1);
    expect(data.description).toBe(
      "OUTXIDIOUS, el Halloween 2026 de Enjoy Terrace y OUTXIDE (Av. Tucán 1, Port d'Alcúdia), sábado 31 de octubre: OUTXIDE de 23:00 a 05:30. Antes, de 20:00 a 23:00, tardeo de acceso libre en Enjoy Terrace. Solo mayores de 18 años.",
    );
    expect(data.performer).toBeUndefined();
    expect(data.offers).toMatchObject({
      price: "12.96",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `https://entradas.grupoenjoy.es/?event=${OX_REF}&lang=es`,
    });
    expect(JSON.stringify(data)).not.toContain("LimitedAvailability");

    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap).toContain("<urlset");
    expect(sitemap).not.toContain("outxidious");
  });

  test("sin scroll horizontal a 375 px (venta y pronto)", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    for (const q of CAMPAIGN_OVER ? ["?phase=pronto"] : ["", "?phase=pronto"]) {
      await page.goto(`${OUTXIDIOUS_PATH}${q}`);
      await page.waitForTimeout(500);
      const { scrollable, cut } = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        const bad: string[] = [];
        for (const el of document.querySelectorAll("a, button, input, h1, h2, p, label")) {
          const r = el.getBoundingClientRect();
          if (r.width && r.height && (r.right > vw + 2 || r.left < -2)) bad.push(el.outerHTML.slice(0, 80));
        }
        return { scrollable: document.documentElement.scrollWidth - vw, cut: bad };
      });
      expect(scrollable, q).toBeLessThanOrEqual(1);
      expect(cut, q).toEqual([]);
    }
  });

  test("teaser aprobado: póster precargado con prioridad (LCP), sin autoplay en el HTML, arranca solo en silencio y en bucle, con pausa", async ({
    page,
    request,
  }) => {
    // El HTML de servidor: póster precargado con prioridad alta, vídeo sin autoplay y con preload=metadata.
    const html = await (await request.get(OUTXIDIOUS_PATH)).text();
    expect(html).toMatch(new RegExp(`<link rel="preload" href="${TEASER.poster}" as="image" fetchPriority="high"/>`, "i"));
    const tag = html.match(/<video[^>]*>/)?.[0] ?? "";
    expect(tag).toContain(`poster="${TEASER.poster}"`);
    expect(tag).toContain('preload="metadata"');
    expect(tag).toMatch(/\bmuted=""/);
    expect(tag).toMatch(/\bplaysInline=""/i);
    expect(tag).toMatch(/\bloop=""/);
    expect(tag).not.toMatch(/\bautoplay/i);
    // Ficheros servidos con su tipo.
    for (const [file, type] of [[TEASER.mp4, "video/mp4"], [TEASER.webm, "video/webm"], [TEASER.poster, "image/webp"]] as const) {
      const res = await request.get(file);
      expect(res.status(), file).toBe(200);
      expect(res.headers()["content-type"], file).toContain(type);
    }

    await page.goto(OUTXIDIOUS_PATH);
    const video = page.getByTestId("outxidious-hero-video");
    await expect(video).toHaveJSProperty("muted", true);
    await expect(video).toHaveJSProperty("loop", true);
    await expect(video.locator("source")).toHaveCount(2);
    await expect(video.locator("source").first()).toHaveAttribute("src", TEASER.webm);
    await expect(video).toHaveAttribute("aria-label", /^Animación sin sonido/);
    await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.paused), { timeout: 15_000 }).toBe(false);
    const toggle = page.getByTestId("outxidious-video-toggle");
    await expect(toggle).toBeVisible();
    await expect(toggle).toHaveAttribute("aria-label", "Pausar el vídeo");
    const tb = (await toggle.boundingBox())!;
    expect(tb.width).toBeGreaterThanOrEqual(44);
    expect(tb.height).toBeGreaterThanOrEqual(44);
    await toggle.click();
    await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
    await expect(toggle).toHaveAttribute("aria-label", "Reproducir el vídeo");
    await toggle.click();
    await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(false);
  });

  test("teaser: con movimiento reducido o Save-Data solo el póster (y el botón ofrece reproducir)", async ({ page, context }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(OUTXIDIOUS_PATH);
    await page.waitForTimeout(1500);
    const video = page.getByTestId("outxidious-hero-video");
    expect(await video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
    await expect(page.getByTestId("outxidious-video-toggle")).toHaveAttribute("aria-label", "Reproducir el vídeo");

    // Save-Data: on → ni precarga ni reproducción automática.
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await context.setExtraHTTPHeaders({ "save-data": "on" });
    await page.goto(OUTXIDIOUS_PATH);
    await page.waitForTimeout(1500);
    await expect(video).toHaveAttribute("preload", "none");
    expect(await video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
    await expect(video).toHaveAttribute("poster", TEASER.poster);
  });

  test("teaser sin CLS: la caja tiene su tamaño definitivo desde el HTML (5:2 en móvil, 5:1 con poca altura, 1:1 en escritorio)", async ({ page }) => {
    for (const [width, height, ratio] of [[390, 844, 2.5], [375, 667, 5], [1280, 800, 1]] as const) {
      await page.setViewportSize({ width, height });
      // Sin el vídeo (peticiones cortadas): el HTML y el CSS del servidor ya reservan la caja.
      await page.route(/\.(mp4|webm)$/, (route) => route.abort());
      await page.goto(OUTXIDIOUS_PATH, { waitUntil: "domcontentloaded" });
      const media = page.getByTestId("outxidious-hero-media");
      // El HTML llega en streaming (loading.tsx): se espera a que el hero esté
      // pintado; el vídeo sigue cortado, así que la caja aún no tiene vídeo.
      await expect(media).toBeVisible();
      const before = (await media.boundingBox())!;
      expect(Math.abs(before.width / before.height - ratio), `${width}px`).toBeLessThan(0.02);
      await page.unroute(/\.(mp4|webm)$/);
      await page.reload({ waitUntil: "load" });
      await expect(media).toBeVisible();
      await page.waitForTimeout(1200);
      const after = (await media.boundingBox())!;
      expect(Math.abs(after.height - before.height), `${width}px: la caja no cambia al cargar`).toBeLessThanOrEqual(1);
      // Y el h1 tampoco se mueve por culpa del vídeo.
      const shift = await page.evaluate(
        () =>
          new Promise<number>((resolve) => {
            let total = 0;
            new PerformanceObserver((list) => {
              for (const e of list.getEntries() as unknown as { value: number; hadRecentInput: boolean }[]) {
                if (!e.hadRecentInput) total += e.value;
              }
            }).observe({ type: "layout-shift", buffered: true });
            setTimeout(() => resolve(total), 500);
          }),
      );
      expect(shift, `${width}px: CLS`).toBeLessThan(0.05);
    }
  });

  test("/agenda: la tarjeta de OUTXIDIOUS lleva a la landing; las demás, a la taquilla", async ({ page }) => {
    test.skip(CAMPAIGN_OVER, "la noche ya pasó");
    await page.goto("/agenda");
    const card = page.getByTestId("agenda-outxidious-card");
    await expect(card).toHaveCount(1);
    await expect(card).toHaveAttribute("href", OUTXIDIOUS_PATH);
    // CALENTÓN (y cualquier otra noche) sigue yendo a la taquilla con su evento.
    await expect(page.locator('main a[href*="entradas.grupoenjoy.es"][href*="event=calenton"]').first()).toBeVisible();
    await page.goto(`/en/agenda`);
    await expect(page.getByTestId("agenda-outxidious-card")).toHaveAttribute("href", `/en${OUTXIDIOUS_PATH}`);
  });

  test("cadena de campaña completa: anuncio → botón → taquilla → compra → metadata en Fourvenues", async ({
    page,
    context,
    request,
  }) => {
    test.skip(CAMPAIGN_OVER, "la noche ya pasó");
    await context.setExtraHTTPHeaders({ "x-forwarded-for": clientIp() });

    // 1) Landing con la URL exacta de los anuncios; el salto a la taquilla de
    //    producción se intercepta (no sale de la máquina).
    let captured = "";
    await context.route("https://entradas.grupoenjoy.es/**", (route) => {
      captured = route.request().url();
      return route.fulfill({ status: 200, contentType: "text/html", body: "<!doctype html><title>taquilla</title>" });
    });
    await page.goto(`${OUTXIDIOUS_PATH}?${CAMPAIGN_QUERY}`);
    await page.getByTestId("outxidious-buy").click();
    await expect.poll(() => captured, { timeout: 10_000 }).not.toBe("");
    const target = new URL(captured);
    expect(target.origin).toBe("https://entradas.grupoenjoy.es");
    expect(target.searchParams.get("event")).toBe(OX_REF);
    expect(target.searchParams.get("lang")).toBe("es");
    for (const [k, v] of Object.entries(CAMPAIGN)) expect(target.searchParams.get(k), k).toBe(v);

    // 2) La misma query en la taquilla local, compra contra el doble.
    const { rates } = await mockOxRates(request);
    const cheapest = rates.find((r) => r.current_price?.price === 12)!;
    await page.goto(`/taquilla?${target.searchParams.toString()}`);
    await expect(page.getByTestId("step-select")).toBeVisible({ timeout: 15_000 });
    const card = page.locator(`[data-testid="rate-card"][data-rate-id="${cheapest._id}"]`);
    await expect(card).toBeVisible();
    await card.getByTestId("qty-plus").first().click();
    await expect(card.getByTestId("qty-value").first()).toHaveText("1");
    await page.getByTestId("bar-continue").click();

    await expect(page.getByTestId("step-details")).toBeVisible({ timeout: 10_000 });
    const tag = `ox${Date.now().toString(36)}`;
    const form = page.getByTestId("attendee-form").first();
    await form.getByTestId("input-full_name").fill(`Asistente ${tag}`);
    await form.getByTestId("input-email").fill(`${tag}@test.local`);
    await form.getByTestId("input-email-confirm").fill(`${tag}@test.local`);
    const phone = form.getByTestId("input-phone");
    if ((await phone.count()) > 0) await phone.fill("+34 600 000 001");
    // El <html> lleva scroll-behavior: smooth en línea: se centra la casilla al
    // instante antes de marcarla para que no se mueva bajo el clic.
    for (const id of ["consent-adult", "consent-terms"]) {
      const box = page.getByTestId(id);
      await box.evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" as ScrollBehavior }));
      await box.check();
    }
    await page.getByTestId("bar-continue").click();
    await expect(page.getByTestId("step-summary")).toBeVisible({ timeout: 10_000 });
    await expect(page.getByTestId("summary-total")).toContainText("12,96 €");
    await page.getByTestId("pay-button").click();
    await page.waitForURL(/\/pay\//, { timeout: 15_000 });

    // 3) Lo que recibió Fourvenues (doble), casado por el asistente de ESTA compra.
    let checkout: FVTicketsCheckoutRequest | undefined;
    await expect
      .poll(
        async () => {
          const all = (await (await request.get(`${MOCK}/__test/requests`)).json()) as { method: string; path: string; body: unknown }[];
          checkout = all
            .filter((r) => r.method === "POST" && r.path === "/tickets/checkout")
            .map((r) => r.body as FVTicketsCheckoutRequest)
            .find((b) => JSON.stringify(b?.tickets ?? []).includes(tag));
          return checkout !== undefined;
        },
        { timeout: 10_000 },
      )
      .toBe(true);
    expect(checkout!.ticket_rate_id).toBe(cheapest._id);
    expect(checkout!.metadata).toMatchObject({ source: "grupoenjoy-native", locale: "es", ...CAMPAIGN });
    expect(new URL(checkout!.redirect_url).searchParams.get("event")).toBe(OX_REF);

    // 4) El pago en el doble termina en /gracias.
    await page.getByRole("button", { name: /^Pagar/ }).click();
    await page.waitForURL(/\/gracias\?order=ge-/, { timeout: 15_000 });
  });
});

// ===========================================================================
// 3. Muro +18 (heredado de /outxide, sin preconfirmar)
// ===========================================================================

test.describe("OUTXIDIOUS · verificación de edad", () => {
  test("el diálogo +18 aparece, se confirma y se recuerda en la sesión", async ({ page, context }) => {
    await preconfirm(context, { age: false });
    await page.goto(OUTXIDIOUS_PATH);
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible({ timeout: 10_000 });
    await expect(dialog).toContainText(es.ageVerification.title);
    await dialog.getByRole("button", { name: es.ageVerification.confirm }).click();
    await expect(dialog).toBeHidden();
    expect(await page.evaluate((k) => sessionStorage.getItem(k), AGE_KEY)).toBe("true");
    await page.reload();
    await page.waitForTimeout(800);
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  // Paquete v0.3 (§3.1, fila 0, y §7 punto 8): el muro ligero del layout de
  // /outxide, sin degradar, es lo primero de la primera pantalla; al
  // confirmarlo, la placa «+18 · Consumo responsable» sigue en ella. El caso
  // más justo es el sábado (línea «Hoy») en el navegador de Instagram de un
  // iPhone SE (unos 600 px visibles).
  for (const height of [600, 667]) {
    test(`fila 0 a 375×${height} con ?phase=hoy: el muro sale primero y, al confirmarlo, la placa sigue en la primera pantalla`, async ({
      page,
      context,
    }) => {
      test.skip(CAMPAIGN_OVER, "la noche ya pasó");
      await preconfirm(context, { age: false });
      await page.setViewportSize({ width: 375, height });
      await page.goto(`${OUTXIDIOUS_PATH}?phase=hoy`);
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible({ timeout: 10_000 });
      await expect(dialog).toContainText(es.ageVerification.title);
      // Fila 0: el muro tapa toda la pantalla, por encima de la página (arriba,
      // en medio y abajo, lo que hay en primer plano es el muro).
      const covered = await dialog.evaluate((el) => {
        const overlay = el.parentElement!;
        const pts = [
          [window.innerWidth / 2, 4],
          [window.innerWidth / 2, window.innerHeight / 2],
          [8, window.innerHeight - 4],
        ];
        return pts.every(([x, y]) => overlay.contains(document.elementFromPoint(x, y)));
      });
      expect(covered, "el muro cubre la primera pantalla").toBe(true);
      // Sus dos botones se alcanzan sin hacer scroll.
      const confirm = dialog.getByRole("button", { name: es.ageVerification.confirm });
      for (const btn of [confirm, dialog.getByRole("button", { name: es.ageVerification.deny })]) {
        const b = (await btn.boundingBox())!;
        expect(b.y).toBeGreaterThanOrEqual(0);
        expect(b.y + b.height).toBeLessThanOrEqual(height);
      }

      await confirm.click();
      await expect(dialog).toBeHidden();
      expect(await page.evaluate(() => window.scrollY), "sin scroll tras confirmar").toBe(0);
      const h1 = (await page.locator("h1").boundingBox())!;
      expect(h1.y).toBeGreaterThanOrEqual(0);
      for (const id of ["outxidious-claim", "outxidious-today", "outxidious-parts", "outxidious-price", "outxidious-buy", "outxidious-legal-plate"]) {
        const box = (await page.getByTestId(id).boundingBox())!;
        expect(box.y + box.height, `${id} en la primera pantalla tras confirmar`).toBeLessThanOrEqual(height);
      }
      await expect(page.getByTestId("outxidious-legal-plate")).toBeInViewport({ ratio: 1 });
    });
  }
});

// ===========================================================================
// 4. Diccionario recortado: el resto del sitio no cambia y salir no rompe
// ===========================================================================

test.describe("OUTXIDIOUS · diccionario recortado", () => {
  // Texto del diccionario que NINGUNA de estas páginas pinta en servidor: solo
  // está en su HTML si viaja el diccionario entero en el payload RSC. (Prefijo
  // sin comillas ni símbolos: se busca tal cual dentro del payload escapado.)
  const SENTINEL = es.purchase.thanksSubtitle.slice(0, 26);
  const SENTINEL_EN = en.purchase.thanksSubtitle.slice(0, 26);

  test("el resto de páginas sigue recibiendo el diccionario entero; la landing no", async ({ request }) => {
    for (const path of ["/", "/outxide", "/agenda", "/legal/privacidad", "/taquilla", "/en/outxide"]) {
      const html = await (await request.get(path)).text();
      const sentinel = path.startsWith("/en") ? SENTINEL_EN : SENTINEL;
      expect(html.includes(sentinel), `${path}: diccionario entero`).toBe(true);
    }
    for (const path of [OUTXIDIOUS_PATH, `${OUTXIDIOUS_PATH}?phase=pronto`, `/en${OUTXIDIOUS_PATH}`]) {
      const html = await (await request.get(path)).text();
      expect(html.includes(SENTINEL) || html.includes(SENTINEL_EN), `${path}: diccionario recortado`).toBe(false);
    }
  });

  test("fuera de la landing la navegación suave sigue siendo suave (sin guardia)", async ({ page, context }) => {
    await preconfirm(context);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/outxide");
    await page.evaluate(() => ((window as unknown as { __softMarker: number }).__softMarker = 1));
    // Enlace <Link> del menú general a /agenda.
    await page.locator('header a[href="/agenda"]').first().click();
    await page.waitForURL(/\/agenda$/);
    expect(await page.evaluate(() => (window as unknown as { __softMarker?: number }).__softMarker)).toBe(1);
    await expectNoRawKeys(page, "/agenda tras navegación suave");
  });

  test("salir de la landing por el logo: carga completa y página traducida", async ({ page, context }) => {
    await preconfirm(context);
    await page.goto(OUTXIDIOUS_PATH);
    await page.evaluate(() => ((window as unknown as { __oxMarker: number }).__oxMarker = 1));
    await page.locator('header a[href="/outxide"]').click();
    await page.waitForURL(/\/outxide$/);
    await expect(page.getByText(es.outxide.tagline).first()).toBeVisible({ timeout: 15_000 });
    expect(await page.evaluate(() => (window as unknown as { __oxMarker?: number }).__oxMarker)).toBeUndefined();
    await expectNoRawKeys(page, "/outxide tras salir de la landing");
  });

  test("salir por un <Link> (banner de cookies) también recarga: sin claves crudas", async ({ page, context }) => {
    await preconfirm(context, { cookies: false });
    await page.goto(OUTXIDIOUS_PATH);
    await expectNoRawKeys(page, "landing con banner de cookies");
    await page.evaluate(() => ((window as unknown as { __oxMarker: number }).__oxMarker = 1));
    const banner = page.getByRole("region", { name: es.cookieBanner.title });
    await expect(banner).toBeVisible({ timeout: 10_000 });
    await banner.getByRole("link", { name: es.cookieBanner.moreInfo }).click();
    await page.waitForURL(/\/legal\/cookies$/);
    await page.waitForLoadState("load");
    expect(await page.evaluate(() => (window as unknown as { __oxMarker?: number }).__oxMarker)).toBeUndefined();
    await expectNoRawKeys(page, "/legal/cookies tras salir de la landing");
  });

  test("red de seguridad: un router.push desde la landing acaba en carga completa", async ({ page, context }) => {
    await preconfirm(context);
    await page.goto(OUTXIDIOUS_PATH);
    const hasRouter = await page.evaluate(
      () => typeof (window as unknown as { next?: { router?: { push?: unknown } } }).next?.router?.push === "function",
    );
    test.skip(!hasRouter, "window.next.router no expuesto en esta versión");
    await page.evaluate(() => ((window as unknown as { __oxMarker: number }).__oxMarker = 1));
    await page.evaluate(() => (window as unknown as { next: { router: { push: (h: string) => void } } }).next.router.push("/outxide"));
    await page.waitForURL(/\/outxide$/);
    await expect(page.getByText(es.outxide.tagline).first()).toBeVisible({ timeout: 15_000 });
    // Mientras recarga, evaluate puede fallar (contexto destruido): se reintenta.
    await expect
      .poll(() => page.evaluate(() => (window as unknown as { __oxMarker?: number }).__oxMarker ?? "recargada").catch(() => "recargando"))
      .toBe("recargada");
    await expectNoRawKeys(page, "/outxide tras router.push");
  });
});

// ===========================================================================
// 5. Rama aprobada con contenido FICTICIO (doble de pruebas, solo en next dev)
// ===========================================================================

test.describe("OUTXIDIOUS · rama aprobada (contenido ficticio)", () => {
  test.beforeEach(async ({ context }) => {
    await preconfirm(context);
    await context.setExtraHTTPHeaders({ [TEST_CONTENT_HEADER]: FIXTURE_HEADER });
  });

  test("pinta claim, secciones, vídeo y tema rojo; index; placa a ≥ 24 px del claim en la primera pantalla", async ({ page }) => {
    test.skip(CAMPAIGN_OVER, "la noche ya pasó");
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(OUTXIDIOUS_PATH);
    const root = page.getByTestId("outxidious-page");
    await expect(root).toHaveAttribute("data-theme", "campana-roja");
    await expect(root).toHaveClass(/theme-outxidious/);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /^index/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /\/videos\/outxide-hero-poster\.jpg$/);
    await expect(page.getByTestId("outxidious-claim")).toHaveText("CLAIM FICTICIO DE PRUEBA");
    await expect(page.getByTestId("outxidious-sections")).toContainText("SECCION FICTICIA UNO");
    await expect(page.getByTestId("outxidious-sections")).toContainText("Texto ficticio dos.");
    await expect(page.getByTestId("outxidious-hero-video")).toHaveAttribute("poster", "/videos/outxide-hero-poster.jpg");
    // Tokens del tema rojo (LANDING-WEB.md §7.1).
    expect(await page.getByTestId("outxidious-buy").evaluate((a) => getComputedStyle(a).backgroundColor)).toBe("rgb(228, 38, 43)");
    expect(await page.getByTestId("outxidious-legal-plate").evaluate((a) => getComputedStyle(a).backgroundColor)).toBe("rgb(160, 7, 14)");

    const claim = (await page.getByTestId("outxidious-claim").boundingBox())!;
    const plate = (await page.getByTestId("outxidious-legal-plate").boundingBox())!;
    expect(plate.y - (claim.y + claim.height), "placa separada del claim ≥ 24 px").toBeGreaterThanOrEqual(24);
    expect(plate.y + plate.height, "placa en la primera pantalla").toBeLessThanOrEqual(667);
  });

  test("hoy: claim del día del contenido aprobado", async ({ page }) => {
    test.skip(CAMPAIGN_OVER, "la noche ya pasó");
    await page.goto(`${OUTXIDIOUS_PATH}?phase=hoy`);
    await expect(page.getByTestId("outxidious-claim")).toHaveText("CLAIM DEL DIA FICTICIO");
  });

  test("vídeo: se reproduce solo, en silencio, con botón de pausa; con reduced-motion solo el póster", async ({ page }) => {
    await page.goto(`${OUTXIDIOUS_PATH}?phase=pronto`);
    const video = page.getByTestId("outxidious-hero-video");
    await expect(video).toHaveJSProperty("muted", true);
    expect(await video.evaluate((v) => v.hasAttribute("autoplay"))).toBe(false);
    await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.paused), { timeout: 10_000 }).toBe(false);
    const toggle = page.getByTestId("outxidious-video-toggle");
    await expect(toggle).toHaveAttribute("aria-label", "Pausar el vídeo");
    await toggle.click();
    await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
    await expect(toggle).toHaveAttribute("aria-label", "Reproducir el vídeo");

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();
    await page.waitForTimeout(1500);
    expect(await page.getByTestId("outxidious-hero-video").evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
  });

  test("el contenido ficticio no se cuela sin la cabecera (lo real: el paquete provisional)", async ({ page, context }) => {
    await context.setExtraHTTPHeaders({});
    await page.goto(`${OUTXIDIOUS_PATH}?phase=pronto`);
    await expect(page.getByTestId("outxidious-page")).toHaveAttribute("data-theme", "campana-roja");
    await expect(page.getByTestId("outxidious-claim")).toHaveText("Algo cruzó contigo.");
    await expect(page.getByTestId("outxidious-sections")).not.toContainText("FICTICIA");
    await expect(page.getByTestId("outxidious-hero-video")).toHaveAttribute("poster", TEASER.poster);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /\/images\/outxide\/DSCF8103-9\.jpg$/);
  });

  test("todo relleno pero solo el vídeo aprobado: vídeo sí; claim, secciones, rojo, OG e index no", async ({ page, context }) => {
    await context.setExtraHTTPHeaders({ [TEST_CONTENT_HEADER]: toHeader({ ...FIXTURE, approved: { heroMedia: true } }) });
    await page.goto(`${OUTXIDIOUS_PATH}?phase=pronto`);
    await expect(page.getByTestId("outxidious-hero-video")).toHaveAttribute("poster", "/videos/outxide-hero-poster.jpg");
    await expect(page.getByTestId("outxidious-page")).toHaveAttribute("data-theme", "neutro");
    await expect(page.getByTestId("outxidious-page")).not.toHaveClass(/theme-outxidious/);
    await expect(page.getByTestId("outxidious-claim")).toHaveCount(0);
    await expect(page.getByTestId("outxidious-sections")).toHaveCount(0);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", /\/images\/outxide\/DSCF8103-9\.jpg$/);
    // La placa a 14 px y +0,2 em es la regla BASE: también en el tema neutro.
    const plate = page.getByTestId("outxidious-legal-plate");
    expect(await plate.evaluate((el) => [getComputedStyle(el).fontSize, getComputedStyle(el).letterSpacing])).toEqual(["14px", "2.8px"]);
  });
});
