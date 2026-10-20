// Contenido CREATIVO de la landing de OUTXIDIOUS, gobernado por aprobación
// POR HUECO. PURO (sin env, sin fetch, sin "server-only"): lo leen la página,
// sus metadatos, su loading, el sitemap y los e2e.
//
// Historia: el 19-oct-2026 (tarde) el dueño no había aprobado NADA del material
// de la campaña y la página se desplegó como MARCADOR NEUTRO y FACTUAL (nombre,
// fecha, las dos partes de la noche con sus horas y lugares, precio, botón, +18
// y legales: esos textos viven en el namespace i18n "outxidious"), fuera de
// buscadores. Un único interruptor `approved` encendía o apagaba TODO lo
// creativo a la vez.
//
// 20-oct-2026: el teaser OUTXIDE → OUTXIDIOUS está APROBADO por el usuario y el
// resto (claim, secciones, tema rojo, imagen OG) llega después en un paquete
// provisional de META ADS. Por eso la aprobación es por HUECO: cada pieza se
// enciende por separado en `approved`, y lo que no esté encendido NO se pinta
// aunque esté relleno (se puede pegar el paquete entero y encender solo lo que
// Jose/Sergi den por bueno). Buscadores aparte: `approved.index` (noindex y
// fuera del sitemap hasta nuevo aviso, aunque todo lo demás esté aprobado).
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

/**
 * Huecos que se aprueban por separado:
 * - heroMedia: vídeo/imagen de la cabecera · claim: claim y claim del día ·
 *   sections: bloques bajo el hero · theme: el tema elegido en `theme` ·
 *   ogImage: imagen para compartir.
 * - index: NO es material creativo: robots index + sitemap. Decisión aparte.
 */
export const OUTXIDIOUS_SLOTS = ["heroMedia", "claim", "sections", "theme", "ogImage", "index"] as const;
export type OutxidiousSlot = (typeof OUTXIDIOUS_SLOTS)[number];
export type OutxidiousApproval = Partial<Record<OutxidiousSlot, boolean>>;

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
      /**
       * Recorte en MÓVIL (< 768 px) como proporción ancho/alto, p. ej. 2 = 2:1.
       * Para que el h1 y la placa +18 quepan en la primera pantalla con el vídeo
       * ENCIMA: solo se recorta fondo vacío si todo lo que pasa en el vídeo cabe
       * en la franja central (medirlo antes). Sin él, la proporción del vídeo.
       */
      mobileAspect?: number;
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
  /** Qué huecos tienen el OK del dueño. Lo que no esté a true no se pinta. */
  approved: OutxidiousApproval;
  theme: OutxidiousTheme;
  locales: Partial<Record<Locale, OutxidiousLocaleContent>>;
}

// Teaser OUTXIDE → OUTXIDIOUS APROBADO por el usuario (20-oct-2026): 7 s en
// bucle, 720×720 (1:1), H.264 sin audio (159 KB) + WebM VP9 (98 KB) y póster
// WebP (8,5 KB); sin destellos según WCAG 2.3.1 (comprobado al codificarlo).
// Todo lo que se mueve vive en la franja central (filas 37,5–55,3 % del alto,
// medido fotograma a fotograma): en móvil se recorta a 5:2 (ventana 30–70 %)
// sin perder nada, para que el h1, las dos partes, el precio, el botón y la
// placa +18 quepan debajo en 375×667 (también el sábado, con la línea «Hoy»).
// Si se recodifica, CAMBIAR EL NOMBRE del fichero: /videos va con caché
// immutable de un año (next.config.ts).
const TEASER = {
  kind: "video",
  src: "/videos/outxidious/outxidious-teaser-720.mp4",
  webmSrc: "/videos/outxidious/outxidious-teaser-720.webm",
  poster: "/videos/outxidious/outxidious-teaser-poster.webp",
  width: 720,
  height: 720,
  mobileAspect: 2.5,
} as const;

/**
 * EL FICHERO QUE SE RELLENA cuando llegue material aprobado. Hoy solo está
 * encendido el vídeo de cabecera (el teaser aprobado). Claim, secciones, tema
 * rojo e imagen OG esperan al paquete de META ADS; index, a nueva orden. Los
 * datos de prueba de los huecos apagados viven SOLO en e2e/outxidious.spec.ts.
 */
export const OUTXIDIOUS_CONTENT: OutxidiousContent = {
  approved: {
    heroMedia: true,
    claim: false,
    sections: false,
    theme: false,
    ogImage: false,
    index: false,
  },
  theme: "neutro",
  // La descripción accesible va en los 5 idiomas (es lo que lee un lector de
  // pantalla; no es copy de campaña: describe lo que se ve).
  locales: {
    es: {
      heroMedia: {
        ...TEASER,
        label: "Animación sin sonido: el logotipo de OUTXIDE Club se transforma en OUTXIDIOUS y su X se rompe en esquirlas iluminadas de rojo.",
      },
    },
    en: {
      heroMedia: {
        ...TEASER,
        label: "Silent animation: the OUTXIDE Club logo turns into OUTXIDIOUS and its X breaks into shards lit in red.",
      },
    },
    de: {
      heroMedia: {
        ...TEASER,
        label: "Animation ohne Ton: Das Logo von OUTXIDE Club verwandelt sich in OUTXIDIOUS, und sein X zerbricht in rot leuchtende Splitter.",
      },
    },
    fr: {
      heroMedia: {
        ...TEASER,
        label: "Animation sans son : le logo d'OUTXIDE Club se transforme en OUTXIDIOUS et son X se brise en éclats éclairés en rouge.",
      },
    },
    it: {
      heroMedia: {
        ...TEASER,
        label: "Animazione senza audio: il logo di OUTXIDE Club si trasforma in OUTXIDIOUS e la sua X si rompe in schegge illuminate di rosso.",
      },
    },
  },
};

/** Lo que la página pinta de verdad para un idioma (cada hueco, solo si está aprobado). */
export interface ResolvedOutxidiousContent {
  theme: OutxidiousTheme;
  claim: string | null;
  claimToday: string | null;
  sections: OutxidiousSection[];
  heroMedia: OutxidiousHeroMedia | null;
  ogImage: OutxidiousOgImage | null;
}

const text = (v: string | undefined): string | null => (typeof v === "string" && v.trim() ? v.trim() : null);

/** ¿Tiene este hueco el OK? Solo un true explícito cuenta. */
export function isSlotApproved(content: OutxidiousContent, slot: OutxidiousSlot): boolean {
  return content.approved?.[slot] === true;
}

export function resolveOutxidiousContent(content: OutxidiousContent, locale: Locale): ResolvedOutxidiousContent {
  const own = content.locales[locale] ?? {};
  const base = content.locales[defaultLocale] ?? {};
  const pick = <K extends keyof OutxidiousLocaleContent>(k: K) => own[k] ?? base[k];
  const ok = (slot: OutxidiousSlot) => isSlotApproved(content, slot);
  const claimOk = ok("claim");
  return {
    theme: ok("theme") && content.theme === "campana-roja" ? "campana-roja" : "neutro",
    claim: claimOk ? text(pick("claim")) : null,
    // Primero el mismo idioma (claim del día y si no el claim), luego el español.
    claimToday: claimOk
      ? (text(own.claimToday) ?? text(own.claim) ?? text(base.claimToday) ?? text(base.claim))
      : null,
    sections: ok("sections") ? (pick("sections") ?? []).filter((s) => text(s.title) && text(s.text)) : [],
    heroMedia: ok("heroMedia") ? (pick("heroMedia") ?? null) : null,
    ogImage: ok("ogImage") ? (pick("ogImage") ?? null) : null,
  };
}

/** Indexable (robots index + sitemap) solo con el hueco `index` aprobado. */
export function isOutxidiousIndexable(content: OutxidiousContent): boolean {
  return isSlotApproved(content, "index");
}

/** Rutas que el sitemap debe anunciar (vacío mientras `index` no esté aprobado). */
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
/** Proporción de recorte razonable (de 1:2 a 4:1). */
const isAspect = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v) && v >= 0.5 && v <= 4;

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
      ...(isAspect(v.mobileAspect) ? { mobileAspect: v.mobileAspect } : {}),
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

/**
 * Valida un contenido llegado de fuera del código; null si no tiene la forma.
 * `approved` tiene que ser un objeto por hueco: el interruptor único antiguo
 * (approved: true/false) ya no vale y se rechaza entero.
 */
export function parseOutxidiousContent(raw: unknown): OutxidiousContent | null {
  if (!isRecord(raw) || !isRecord(raw.approved)) return null;
  const approved: OutxidiousApproval = {};
  for (const slot of OUTXIDIOUS_SLOTS) {
    if (typeof raw.approved[slot] === "boolean") approved[slot] = raw.approved[slot] as boolean;
  }
  const theme: OutxidiousTheme = raw.theme === "campana-roja" ? "campana-roja" : "neutro";
  const locales: OutxidiousContent["locales"] = {};
  if (isRecord(raw.locales)) {
    for (const loc of ["es", "en", "de", "fr", "it"] as const) {
      const parsed = parseLocaleContent(raw.locales[loc]);
      if (parsed) locales[loc] = parsed;
    }
  }
  return { approved, theme, locales };
}
