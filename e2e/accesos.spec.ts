import { test, expect, type BrowserContext, type Page } from "@playwright/test";
import { es } from "../src/i18n/dictionaries/es";
import { en } from "../src/i18n/dictionaries/en";
import { de } from "../src/i18n/dictionaries/de";
import { fr } from "../src/i18n/dictionaries/fr";
import { it as itDict } from "../src/i18n/dictionaries/it";
import { localizedPath, locales, type Locale } from "../src/i18n/config";
import { AFTER_FROM } from "../src/lib/outxidious/event-config";
import { EMPRESAS_PATH, OUTXIDIOUS_PATH, PROMO_IMAGES } from "../src/lib/promos";
import { isOutxidiousPromoVisible, promoVisibility } from "../src/lib/promos-visibility";

// Bloque de accesos a las dos landings de octubre-2026 (OUTXIDIOUS y
// celebraciones de empresa) en la portada, /outxide y /enjoy
// (src/components/blocks/promo-accesos.tsx). Comprueba: las dos tarjetas en las
// tres páginas y en los cinco idiomas, los enlaces por idioma, que la de
// OUTXIDIOUS se va al acabar el evento (reloj y palanca en servidor; ?phase=
// fuera de producción), la llegada a cada landing desde la tarjeta (carga
// completa, muro +18, sin claves crudas), léxico neutro y móvil a 375 px.

test.use({ locale: "es-ES" });

const DICTS = { es, en, de, fr, it: itDict } as const;
const CONSENT_KEY = "ge_cookie_consent";
const AGE_KEY = "ge_age_verified";
const PAGES = ["/", "/outxide", "/enjoy"] as const;
// Pasado el final real (dom 1-nov 05:30) la tarjeta ya no sale por defecto.
const EVENT_OVER = Date.now() >= AFTER_FROM;

/** Muro +18 y cookies ya decididos (como el resto de specs), salvo que se pida lo contrario. */
async function preconfirm(context: BrowserContext, opts: { age?: boolean } = {}): Promise<void> {
  await context.addInitScript(
    ([ageKey, consentKey, age]) => {
      try {
        if (age) sessionStorage.setItem(ageKey as string, "true");
        localStorage.setItem(
          consentKey as string,
          JSON.stringify({
            consent: { necessary: true, analytics: false, marketing: false },
            version: "2",
            timestamp: new Date().toISOString(),
          }),
        );
      } catch {
        /* sin storage */
      }
    },
    [AGE_KEY, CONSENT_KEY, opts.age !== false] as const,
  );
}

function leafKeys(obj: unknown, prefix = ""): string[] {
  if (typeof obj !== "object" || obj === null) return [prefix];
  return Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) => leafKeys(v, prefix ? `${prefix}.${k}` : k));
}
const ALL_KEYS = leafKeys(es);

async function expectNoRawKeys(page: Page, where: string): Promise<void> {
  const text = await page.locator("body").innerText();
  expect(ALL_KEYS.filter((k) => text.includes(k)), `${where}: claves sin traducir`).toEqual([]);
}

const block = (page: Page) => page.getByTestId("promo-accesos");
const card = (page: Page, kind: "outxidious" | "empresas") => page.getByTestId(`promo-${kind}`);
const cardLink = (page: Page, kind: "outxidious" | "empresas") => page.getByTestId(`promo-${kind}-link`);

async function markDocument(page: Page): Promise<void> {
  await page.evaluate(() => ((window as unknown as { __accMarker: number }).__accMarker = 1));
}
async function documentWasReplaced(page: Page): Promise<boolean> {
  return page.evaluate(() => (window as unknown as { __accMarker?: number }).__accMarker === undefined);
}

// ===========================================================================
// 1. Lógica pura y diccionarios (sin navegador)
// ===========================================================================

test.describe("Accesos · lógica pura", () => {
  test("OUTXIDIOUS: visible hasta las 05:30 del 1-nov, palanca y ?phase como la landing", () => {
    const before = AFTER_FROM - 1;
    expect(AFTER_FROM).toBe(Date.parse("2026-11-01T05:30:00+01:00"));
    // Reloj
    expect(isOutxidiousPromoVisible({ now: before })).toBe(true);
    expect(isOutxidiousPromoVisible({ now: AFTER_FROM })).toBe(false);
    // OUTXIDIOUS_PHASE (valor desconocido = automático)
    expect(isOutxidiousPromoVisible({ now: before, envPhase: "despues" })).toBe(false);
    expect(isOutxidiousPromoVisible({ now: before, envPhase: "pronto" })).toBe(true);
    expect(isOutxidiousPromoVisible({ now: before, envPhase: "auto" })).toBe(true);
    expect(isOutxidiousPromoVisible({ now: before, envPhase: "loquesea" })).toBe(true);
    expect(isOutxidiousPromoVisible({ now: AFTER_FROM, envPhase: "pronto" })).toBe(true);
    // ?phase (el llamante lo anula en producción) manda sobre la palanca
    expect(isOutxidiousPromoVisible({ now: before, queryPhase: "despues" })).toBe(false);
    expect(isOutxidiousPromoVisible({ now: AFTER_FROM, queryPhase: "pronto" })).toBe(true);
    expect(isOutxidiousPromoVisible({ now: before, envPhase: "despues", queryPhase: "venta" })).toBe(true);
    expect(isOutxidiousPromoVisible({ now: before, queryPhase: null })).toBe(true);
    // Empresas no caduca
    expect(promoVisibility({ now: AFTER_FROM + 365 * 86_400_000 }).empresas).toBe(true);
  });

  test("namespace «promos»: mismas claves en los 5 idiomas, sin vacíos y justo detrás de «home»", () => {
    const esKeys = Object.keys(es.promos).sort();
    for (const loc of locales) {
      const dict = DICTS[loc];
      expect(Object.keys(dict.promos).sort(), `${loc}: claves`).toEqual(esKeys);
      for (const [k, v] of Object.entries(dict.promos)) expect(v.trim(), `${loc}.promos.${k}`).not.toBe("");
      const ns = Object.keys(dict);
      expect(ns.indexOf("promos"), `${loc}: posición`).toBe(ns.indexOf("home") + 1);
    }
  });

  test("léxico: ni bebida, ni shisha, ni precios, ni disponibilidad ni urgencia en ningún idioma", () => {
    const FORBIDDEN: RegExp[] = [
      /alcohol/, /\bcoctel/, /\bcocktail/, /\bcopas?\b/, /\bchupitos?\b/, /barra libre/, /open bar/,
      /\bshisha\b/, /\bcachimba/, /\bchicha\b/, /\bbotell/, /\bbottle/, /\bdrinks?\b/, /\bgetr[aä]nk/,
      /\bultimas?\b/, /\bquedan\b/, /\bagotad/, /sold out/, /ausverkauft/, /\bepuise/, /esaurit/,
      /€|\beur\b|\bprecio|\bprice|\bpreis|\bprix\b|\bprezzo/, /\bplazas\b/, /disponib/, /\bentradas?\b/,
    ];
    for (const loc of locales) {
      const text = Object.values(DICTS[loc].promos)
        .join(" | ")
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase();
      const hits = FORBIDDEN.filter((re) => re.test(text)).map(String);
      expect(hits, `${loc}: léxico vetado`).toEqual([]);
    }
    // Nunca el logotipo OUTXIDIOUS quieto (el póster del teaser es su último
    // fotograma): foto ya publicada y el nombre en texto (F3).
    expect(PROMO_IMAGES.outxidious).not.toMatch(/outxidious/i);
    for (const loc of locales) expect(DICTS[loc].promos.outxidiousImageAlt, loc).not.toMatch(/logo/i);
    // «Tardeo» siempre con «acceso libre» en la misma frase (COPYS §0.3).
    expect(es.promos.outxidiousTardeo).toMatch(/tardeo.*acceso libre/i);
    // En inglés, el término de la landing y de los anuncios: «early party» (F9).
    expect(DICTS.en.promos.outxidiousTardeo).toMatch(/free-entry early party/i);
    // Empresas: la noche siempre; la tarde en Enjoy Terrace solo «si es comida»,
    // como la landing y EMP-2-S, nunca prometida sin condición (F9).
    expect(es.promos.empresasDetails).toMatch(/^La noche en OUTXIDE; si es comida/);
    expect(DICTS.en.promos.empresasDetails).toMatch(/if it's lunch/);
  });
});

// ===========================================================================
// 2. Las dos tarjetas en las tres páginas
// ===========================================================================

test.describe("Accesos · tarjetas visibles", () => {
  test.beforeEach(async ({ context }) => {
    await preconfirm(context);
  });

  for (const base of PAGES) {
    for (const locale of ["es", "en"] as const) {
      const path = localizedPath(base, locale);
      test(`${path}: dos tarjetas con textos, imagen y enlaces en ${locale}`, async ({ page }) => {
        test.skip(EVENT_OVER, "OUTXIDIOUS ya terminó: la tarjeta no sale por defecto");
        const d = DICTS[locale].promos;
        await page.goto(path);
        await expect(block(page)).toBeVisible({ timeout: 15_000 });
        await expect(block(page).getByRole("heading", { level: 2 })).toHaveText(d.sectionLabel);

        const ox = card(page, "outxidious");
        await expect(ox).toBeVisible();
        await expect(ox.getByRole("heading", { level: 3 })).toHaveText(d.outxidiousTitle);
        await expect(ox).toContainText(d.outxidiousDate);
        await expect(ox).toContainText(d.outxidiousTardeo);
        await expect(ox).toContainText(d.outxidiousNight);
        await expect(ox.getByRole("img", { name: d.outxidiousImageAlt })).toBeVisible();
        const oxLink = ox.getByRole("link", { name: `${d.outxidiousCta}: ${d.outxidiousTitle}`, exact: true });
        await expect(oxLink).toHaveAttribute("href", localizedPath(OUTXIDIOUS_PATH, locale));

        const em = card(page, "empresas");
        await expect(em).toBeVisible();
        await expect(em.getByRole("heading", { level: 3 })).toHaveText(d.empresasTitle);
        await expect(em).toContainText(d.empresasWhen);
        await expect(em).toContainText(d.empresasDetails);
        await expect(em.getByRole("img", { name: d.empresasImageAlt })).toBeVisible();
        const emLink = em.getByRole("link", { name: `${d.empresasCta}: ${d.empresasTitle}`, exact: true });
        await expect(emLink).toHaveAttribute("href", localizedPath(EMPRESAS_PATH, locale));

        // Primero la que caduca, en las tres páginas.
        const order = await block(page).locator("article").evaluateAll((els) => els.map((e) => e.getAttribute("data-testid")));
        expect(order).toEqual(["promo-outxidious", "promo-empresas"]);
        // Imágenes servidas por next/image (con srcset) desde los ficheros aprobados.
        const srcs = await block(page).locator("img").evaluateAll((els) => els.map((e) => (e as HTMLImageElement).currentSrc || (e as HTMLImageElement).src));
        expect(decodeURIComponent(srcs[0])).toContain(PROMO_IMAGES.outxidious);
        expect(decodeURIComponent(srcs[1])).toContain(PROMO_IMAGES.empresas);
        await expectNoRawKeys(page, path);
      });
    }
  }

  test("enlaces por idioma en la portada: los 5 idiomas apuntan a la landing de su idioma", async ({ page }) => {
    test.skip(EVENT_OVER, "OUTXIDIOUS ya terminó");
    for (const locale of locales as readonly Locale[]) {
      await page.goto(localizedPath("/", locale));
      await expect(cardLink(page, "outxidious")).toHaveAttribute("href", localizedPath(OUTXIDIOUS_PATH, locale));
      await expect(cardLink(page, "empresas")).toHaveAttribute("href", localizedPath(EMPRESAS_PATH, locale));
      await expect(cardLink(page, "outxidious")).toContainText(DICTS[locale].promos.outxidiousCta);
      await expect(cardLink(page, "empresas")).toContainText(DICTS[locale].promos.empresasCta);
    }
  });

  test("el bloque va cerca de arriba: justo bajo el hero (portada) o bajo la barra de datos (locales)", async ({ page }) => {
    // El HTML llega en streaming (loading.tsx) y React puede revelar el
    // contenido un instante después del evento load: se espera a que el bloque
    // esté ya colgado de <main> antes de contar (si no, la prueba era intermitente).
    const promoInMain = page.locator('main > section[data-testid="promo-accesos"]');
    await page.goto("/");
    await expect(promoInMain).toHaveCount(1);
    // En la portada, primera sección tras el hero.
    const homeIdx = await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll("main > section"));
      return sections.findIndex((s) => s.getAttribute("data-testid") === "promo-accesos");
    });
    expect(homeIdx).toBe(1);
    for (const path of ["/outxide", "/enjoy"]) {
      await page.goto(path);
      await expect(promoInMain).toHaveCount(1);
      const idx = await page.evaluate(() => {
        const sections = Array.from(document.querySelectorAll("main > section"));
        return sections.findIndex((s) => s.getAttribute("data-testid") === "promo-accesos");
      });
      // hero (0), barra de datos (1), accesos (2)
      expect(idx, path).toBe(2);
    }
  });
});

// ===========================================================================
// 3. Fin del evento: la tarjeta de OUTXIDIOUS desaparece (en servidor)
// ===========================================================================

test.describe("Accesos · después de OUTXIDIOUS", () => {
  test.beforeEach(async ({ context }) => {
    await preconfirm(context);
  });

  for (const path of ["/", "/outxide", "/enjoy", "/en", "/en/enjoy"]) {
    test(`${path}?phase=despues: sin tarjeta de OUTXIDIOUS (ni en el HTML), empresas sigue`, async ({ page, request }) => {
      // HTML del servidor: la tarjeta no existe (la decisión es de servidor, no
      // un ocultado en cliente tras hidratar).
      const html = await (await request.get(`${path}?phase=despues`)).text();
      expect(html).not.toContain('data-testid="promo-outxidious"');
      expect(html).toContain('data-testid="promo-empresas"');

      await page.goto(`${path}?phase=despues`);
      await expect(card(page, "empresas")).toBeVisible({ timeout: 15_000 });
      await expect(card(page, "outxidious")).toHaveCount(0);
      // Una sola tarjeta: centrada y estrecha, sin hueco de la otra columna.
      const box = await card(page, "empresas").boundingBox();
      expect(box!.width).toBeLessThanOrEqual(580);
      // Tras hidratar sigue igual (sin desajuste servidor/cliente).
      await page.waitForTimeout(500);
      await expect(card(page, "outxidious")).toHaveCount(0);
    });
  }

  test("reloj real pasado el 1-nov 05:30: oculta por defecto", async ({ page }) => {
    test.skip(!EVENT_OVER, "solo cuando el evento ya ha terminado de verdad");
    await page.goto("/");
    await expect(card(page, "empresas")).toBeVisible({ timeout: 15_000 });
    await expect(card(page, "outxidious")).toHaveCount(0);
  });

  test("antes del final, ?phase=pronto o sin parámetro: la tarjeta sigue", async ({ page }) => {
    test.skip(EVENT_OVER, "OUTXIDIOUS ya terminó");
    for (const path of ["/?phase=pronto", "/?phase=loquesea", "/outxide?phase=venta"]) {
      await page.goto(path);
      await expect(card(page, "outxidious"), path).toBeVisible({ timeout: 15_000 });
    }
  });
});

// ===========================================================================
// 4. Llegada a cada landing desde la tarjeta
// ===========================================================================

test.describe("Accesos · llegada a las landings", () => {
  test("portada → OUTXIDIOUS: carga completa, muro +18 de /outxide y landing traducida", async ({ page, context }) => {
    test.skip(EVENT_OVER, "OUTXIDIOUS ya terminó");
    await preconfirm(context, { age: false });
    await page.goto("/");
    await expect(card(page, "outxidious")).toBeVisible({ timeout: 15_000 });
    await markDocument(page);
    // Clic en la imagen (no en el botón): el enlace cubre toda la tarjeta.
    await card(page, "outxidious").click({ position: { x: 40, y: 40 } });
    await page.waitForURL(new RegExp(`${OUTXIDIOUS_PATH}$`));
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible({ timeout: 15_000 });
    await expect(dialog).toContainText(es.ageVerification.title);
    expect(await documentWasReplaced(page)).toBe(true);
    await dialog.getByRole("button", { name: es.ageVerification.confirm }).click();
    await expect(dialog).toBeHidden();
    await expect(page.getByTestId("outxidious-page")).toBeVisible();
    await expect(page.locator("h1")).toContainText(es.outxidious.h1Name);
    await expectNoRawKeys(page, "landing OUTXIDIOUS desde la portada");
  });

  test("/outxide → OUTXIDIOUS: carga completa (diccionario recortado y guardia) y sin claves crudas", async ({ page, context }) => {
    test.skip(EVENT_OVER, "OUTXIDIOUS ya terminó");
    await preconfirm(context);
    await page.goto("/outxide");
    await markDocument(page);
    await cardLink(page, "outxidious").click();
    await page.waitForURL(new RegExp(`${OUTXIDIOUS_PATH}$`));
    await expect(page.getByTestId("outxidious-page")).toBeVisible({ timeout: 15_000 });
    expect(await documentWasReplaced(page)).toBe(true);
    await expectNoRawKeys(page, "landing OUTXIDIOUS desde /outxide");
    // Llegó como documento entero: lleva el diccionario RECORTADO, igual que desde el anuncio.
    const SENTINEL = es.purchase.thanksSubtitle.slice(0, 26);
    expect(await page.content()).not.toContain(SENTINEL);
    // Y la guardia está montada: salir por el logo vuelve a ser carga completa.
    await markDocument(page);
    await page.locator('header a[href="/outxide"]').click();
    await page.waitForURL(/\/outxide$/);
    await expect(page.getByText(es.outxide.tagline).first()).toBeVisible({ timeout: 15_000 });
    expect(await documentWasReplaced(page)).toBe(true);
    await expectNoRawKeys(page, "/outxide tras volver de la landing");
  });

  test("/en/enjoy → OUTXIDIOUS en inglés", async ({ page, context }) => {
    test.skip(EVENT_OVER, "OUTXIDIOUS ya terminó");
    await preconfirm(context);
    await page.goto("/en/enjoy");
    await cardLink(page, "outxidious").click();
    await page.waitForURL(new RegExp(`/en${OUTXIDIOUS_PATH}$`));
    await expect(page.getByTestId("outxidious-page")).toBeVisible({ timeout: 15_000 });
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    // Las dos partes de la noche (tardeo + OUTXIDE): el bloque de datos de la landing.
    await expect(page.getByTestId("outxidious-parts")).toBeVisible();
    await expectNoRawKeys(page, "/en landing OUTXIDIOUS");
  });

  test("portada → /empresas y /en/outxide → /en/empresas", async ({ page, context }) => {
    await preconfirm(context);
    await page.goto("/");
    await card(page, "empresas").click({ position: { x: 40, y: 40 } });
    await page.waitForURL(/\/empresas$/);
    await expect(page.locator("h1")).toHaveCount(1);
    // El h1 de ES/EN es el del paquete creativo de /empresas (no empresas.h1, que
    // es el neutro de DE/FR/IT): basta con que sea la landing, traducida.
    await expect(page.getByTestId("empresas-hero").locator("h1")).toBeVisible({ timeout: 15_000 });
    await expectNoRawKeys(page, "/empresas desde la portada");

    await page.goto("/en/outxide");
    await cardLink(page, "empresas").click();
    await page.waitForURL(/\/en\/empresas$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByTestId("empresas-hero").locator("h1")).toBeVisible({ timeout: 15_000 });
    await expectNoRawKeys(page, "/en/empresas desde /en/outxide");
  });
});

// ===========================================================================
// 5. Accesibilidad y móvil
// ===========================================================================

test.describe("Accesos · accesibilidad y móvil", () => {
  test.beforeEach(async ({ context }) => {
    await preconfirm(context);
  });

  test("foco visible en los enlaces de las tarjetas", async ({ page }) => {
    await page.goto("/enjoy");
    await expect(card(page, "empresas")).toBeVisible({ timeout: 15_000 });
    // Foco por teclado: el anterior elemento enfocable y Tab.
    await cardLink(page, "empresas").focus();
    await page.keyboard.press("Shift+Tab");
    await page.keyboard.press("Tab");
    await expect(cardLink(page, "empresas")).toBeFocused();
    const outline = await cardLink(page, "empresas").evaluate((el) => {
      const s = getComputedStyle(el);
      return { style: s.outlineStyle, width: parseFloat(s.outlineWidth) };
    });
    expect(outline.style).not.toBe("none");
    expect(outline.width).toBeGreaterThanOrEqual(2);
  });

  for (const path of PAGES) {
    test(`${path} a 375 px: sin scroll horizontal, nada cortado y caja de imagen fija (sin CLS)`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });
      await page.goto(path);
      await block(page).scrollIntoViewIfNeeded();
      await expect(card(page, "empresas")).toBeVisible({ timeout: 15_000 });
      const res = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth;
        const root = document.querySelector('[data-testid="promo-accesos"]')!;
        const cut: string[] = [];
        for (const el of root.querySelectorAll("a, h2, h3, p, li, img")) {
          const r = el.getBoundingClientRect();
          if (r.width && (r.right > vw + 1 || r.left < -1)) cut.push(`${el.tagName} ${Math.round(r.left)}-${Math.round(r.right)}`);
        }
        // La caja de cada imagen tiene alto propio (16:9) aunque la imagen no haya cargado.
        const boxes = Array.from(root.querySelectorAll("article > div:first-child")).map((b) => {
          const r = b.getBoundingClientRect();
          return Math.abs(r.height - (r.width * 9) / 16) <= 1;
        });
        return { scroll: document.documentElement.scrollWidth - vw, cut, boxes };
      });
      expect(res.scroll).toBeLessThanOrEqual(1);
      expect(res.cut).toEqual([]);
      expect(res.boxes.length).toBeGreaterThan(0);
      expect(res.boxes.every(Boolean)).toBe(true);
    });
  }

  test("sin desplazamientos de diseño en el bloque al cargar las imágenes", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/outxide");
    await block(page).scrollIntoViewIfNeeded();
    const before = await block(page).boundingBox();
    // Espera a que las dos imágenes estén cargadas.
    await expect
      .poll(() => block(page).locator("img").evaluateAll((els) => els.every((e) => (e as HTMLImageElement).complete && (e as HTMLImageElement).naturalWidth > 0)), {
        timeout: 15_000,
      })
      .toBe(true);
    const after = await block(page).boundingBox();
    expect(Math.round(after!.height)).toBe(Math.round(before!.height));
  });
});
