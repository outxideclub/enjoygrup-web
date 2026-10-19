// Contenido CREATIVO de la landing de OUTXIDIOUS, gobernado por aprobación.
// PURO (sin env, sin fetch, sin "server-only"): lo leen la página, sus
// metadatos, el sitemap y los e2e.
//
// Por qué existe (corrección del 19-oct-2026, tarde): el dueño todavía NO ha
// aprobado el material de la campaña (logo OUTXIDIOUS, teaser, identidad roja,
// claim, textos del ritual y del dress code). Mientras tanto la página que se
// despliega es un MARCADOR NEUTRO y FACTUAL (nombre, fecha, hora, lugar, precio,
// botón, +18 y legales: esos textos viven en el namespace i18n "outxidious") y
// queda fuera de buscadores (noindex y fuera del sitemap).
//
// Cuando Jose apruebe el material, el único cambio es RELLENAR este objeto
// (y copiar los ficheros aprobados a public/): con approved=true la página
// pinta lo que haya aquí, aplica el tema elegido, pasa a index y entra en el
// sitemap. Con approved=false nada de lo de aquí se pinta, aunque esté relleno.
//
// OJO al rellenarlo: es la página de destino de anuncios con alcohol. Siguen
// valiendo el léxico vetado de e2e/outxidious.spec.ts (que lo comprueba en el
// HTML entero) y la regla de que la placa «+18 · Consumo responsable» nunca
// va pegada al claim.

import { defaultLocale, type Locale } from "@/i18n/config";

/** Ruta base de la landing (sin prefijo de idioma). */
export const OUTXIDIOUS_PATH = "/outxide/outxidious";

/** "neutro" = tema oscuro del sitio · "campana-roja" = .theme-outxidious (tokens rojos). */
export type OutxidiousTheme = "neutro" | "campana-roja";

export interface OutxidiousSection {
  title: string;
  text: string;
}

/**
 * Cabecera multimedia. Vídeo: mp4 H.264 sin audio (y webm opcional), con el
 * póster como LCP; se reproduce solo, en silencio y en bucle salvo con
 * prefers-reduced-motion o ahorro de datos (entonces solo el póster), y lleva
 * botón de pausa (WCAG 2.2.2). Comprobar antes ≤ 3 destellos por segundo.
 * Rutas de public/ ("/videos/…", "/images/…").
 */
export type OutxidiousHeroMedia =
  | {
      kind: "video";
      src: string;
      webmSrc?: string;
      poster: string;
      width: number;
      height: number;
      /** Descripción accesible del vídeo (no es copy: lo que se ve). */
      label: string;
    }
  | { kind: "image"; src: string; width: number; height: number; alt: string };

export interface OutxidiousOgImage {
  /** Ruta de public/ (1200×630 recomendado, JPG ≤ 300 KB). */
  url: string;
  width: number;
  height: number;
  alt: string;
}

/** Huecos por idioma. Lo que falte en un idioma cae al español. */
export interface OutxidiousLocaleContent {
  /** Claim del hero. Siempre separado ≥ 24 px de la placa legal. */
  claim?: string;
  /** Claim del día del evento (sábado 31); sin él se usa `claim`. */
  claimToday?: string;
  /** Bloques bajo el hero, en este orden. */
  sections?: OutxidiousSection[];
  heroMedia?: OutxidiousHeroMedia;
  ogImage?: OutxidiousOgImage;
}

export interface OutxidiousContent {
  /** Interruptor general: sin aprobación del dueño, false. */
  approved: boolean;
  theme: OutxidiousTheme;
  locales: Partial<Record<Locale, OutxidiousLocaleContent>>;
}

/**
 * EL FICHERO QUE SE RELLENA cuando llegue el material aprobado. Hoy, apagado y
 * vacío a propósito: los datos de prueba de la rama aprobada viven SOLO en
 * e2e/outxidious.spec.ts.
 */
export const OUTXIDIOUS_CONTENT: OutxidiousContent = {
  approved: false,
  theme: "neutro",
  locales: {},
};

/** Lo que la página pinta de verdad para un idioma (todo vacío sin aprobación). */
export interface ResolvedOutxidiousContent {
  approved: boolean;
  theme: OutxidiousTheme;
  claim: string | null;
  claimToday: string | null;
  sections: OutxidiousSection[];
  heroMedia: OutxidiousHeroMedia | null;
  ogImage: OutxidiousOgImage | null;
}

const NOTHING: ResolvedOutxidiousContent = {
  approved: false,
  theme: "neutro",
  claim: null,
  claimToday: null,
  sections: [],
  heroMedia: null,
  ogImage: null,
};

const text = (v: string | undefined): string | null => (typeof v === "string" && v.trim() ? v.trim() : null);

export function resolveOutxidiousContent(content: OutxidiousContent, locale: Locale): ResolvedOutxidiousContent {
  if (content.approved !== true) return NOTHING;
  const own = content.locales[locale] ?? {};
  const base = content.locales[defaultLocale] ?? {};
  const pick = <K extends keyof OutxidiousLocaleContent>(k: K) => own[k] ?? base[k];
  return {
    approved: true,
    theme: content.theme === "campana-roja" ? "campana-roja" : "neutro",
    claim: text(pick("claim")),
    // Primero el mismo idioma (claim del día y si no el claim), luego el español.
    claimToday:
      text(own.claimToday) ?? text(own.claim) ?? text(base.claimToday) ?? text(base.claim),
    sections: (pick("sections") ?? []).filter((s) => text(s.title) && text(s.text)),
    heroMedia: pick("heroMedia") ?? null,
    ogImage: pick("ogImage") ?? null,
  };
}

/** Indexable (robots index + sitemap) solo con el contenido aprobado. */
export function isOutxidiousIndexable(content: OutxidiousContent): boolean {
  return content.approved === true;
}

/** Rutas que el sitemap debe anunciar (vacío mientras no haya aprobación). */
export function outxidiousSitemapPaths(content: OutxidiousContent): string[] {
  return isOutxidiousIndexable(content) ? [OUTXIDIOUS_PATH] : [];
}

// --- Validación (para el doble de pruebas de content.server.ts) -------------

const isRecord = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);
const isStr = (v: unknown): v is string => typeof v === "string";
/** Solo rutas propias de public/ (nada de otro origen ni "//host"). */
const isPublicPath = (v: unknown): v is string => isStr(v) && /^\/(?!\/)[A-Za-z0-9._~\-/]+$/.test(v);
const isSize = (v: unknown): v is number => typeof v === "number" && Number.isInteger(v) && v > 0 && v <= 4000;

function parseMedia(v: unknown): OutxidiousHeroMedia | undefined {
  if (!isRecord(v)) return undefined;
  if (v.kind === "video" && isPublicPath(v.src) && isPublicPath(v.poster) && isSize(v.width) && isSize(v.height) && isStr(v.label)) {
    return {
      kind: "video",
      src: v.src,
      ...(isPublicPath(v.webmSrc) ? { webmSrc: v.webmSrc } : {}),
      poster: v.poster,
      width: v.width,
      height: v.height,
      label: v.label,
    };
  }
  if (v.kind === "image" && isPublicPath(v.src) && isSize(v.width) && isSize(v.height) && isStr(v.alt)) {
    return { kind: "image", src: v.src, width: v.width, height: v.height, alt: v.alt };
  }
  return undefined;
}

function parseLocaleContent(v: unknown): OutxidiousLocaleContent | undefined {
  if (!isRecord(v)) return undefined;
  const out: OutxidiousLocaleContent = {};
  if (isStr(v.claim)) out.claim = v.claim;
  if (isStr(v.claimToday)) out.claimToday = v.claimToday;
  if (Array.isArray(v.sections)) {
    out.sections = v.sections
      .filter((s): s is Record<string, unknown> => isRecord(s) && isStr(s.title) && isStr(s.text))
      .map((s) => ({ title: s.title as string, text: s.text as string }));
  }
  const media = parseMedia(v.heroMedia);
  if (media) out.heroMedia = media;
  const og = v.ogImage;
  if (isRecord(og) && isPublicPath(og.url) && isSize(og.width) && isSize(og.height) && isStr(og.alt)) {
    out.ogImage = { url: og.url, width: og.width, height: og.height, alt: og.alt };
  }
  return out;
}

/** Valida un contenido llegado de fuera del código; null si no tiene la forma. */
export function parseOutxidiousContent(raw: unknown): OutxidiousContent | null {
  if (!isRecord(raw) || typeof raw.approved !== "boolean") return null;
  const theme: OutxidiousTheme = raw.theme === "campana-roja" ? "campana-roja" : "neutro";
  const locales: OutxidiousContent["locales"] = {};
  if (isRecord(raw.locales)) {
    for (const loc of ["es", "en", "de", "fr", "it"] as const) {
      const parsed = parseLocaleContent(raw.locales[loc]);
      if (parsed) locales[loc] = parsed;
    }
  }
  return { approved: raw.approved, theme, locales };
}
