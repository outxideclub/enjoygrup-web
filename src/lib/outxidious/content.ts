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
// 20-oct-2026 (tarde): Sergi autoriza la creatividad PROVISIONAL del paquete de
// META ADS (CREATIVO-LANDING-OUTXIDIOUS.md v0.2) y se encienden heroMedia,
// claim, sections y theme. ogImage sigue apagado (el paquete no trae imagen OG:
// la foto de la cabina hasta el OK, porque una imagen fija que circula sola
// funciona como logo fijo) e index también (noindex, fuera del sitemap).
//
// 20-oct-2026 (tarde, paquete v0.4): Sergi resuelve que el TARDEO es +18, igual
// que OUTXIDE. Las frases del paquete que dicen que las dos partes son solo
// para mayores de 18 (bloque 1, FAQ 1, 3 y 7) vuelven tal como vienen.
//
// OJO al rellenarlo: es la página de destino de anuncios con alcohol. Siguen
// valiendo el léxico vetado de e2e/outxidious.spec.ts (que lo comprueba en el
// HTML entero) y la regla de que la placa «+18 · Consumo responsable» nunca
// va pegada al claim. La edad es +18 en las dos partes: ningún texto puede
// dar otra. Nada con [CONFIRMAR] / [CONFIRM] se publica: o llega el dato o se
// borra la frase entera.
//
// Huecos {start} {end} (OUTXIDE, de Fourvenues) y {tardeoStart} {tardeoEnd}:
// la página los rellena en el claim, las secciones y la FAQ, así las horas
// escritas aquí nunca se separan de las del panel.

import { defaultLocale, type Locale } from "@/i18n/config";

/** Ruta base de la landing (sin prefijo de idioma). */
export const OUTXIDIOUS_PATH = "/outxide/outxidious";

/** "neutro" = tema oscuro del sitio · "campana-roja" = .theme-outxidious (tokens rojos). */
export type OutxidiousTheme = "neutro" | "campana-roja";

/**
 * Huecos que se aprueban por separado:
 * - heroMedia: vídeo/imagen de la cabecera · claim: claim y claim del día
 *   (y el subtítulo del diccionario, que es creativo) · sections: bloques bajo
 *   el hero y la FAQ · theme: el tema elegido en `theme` · ogImage: imagen
 *   para compartir.
 * - index: NO es material creativo: robots index + sitemap. Decisión aparte.
 */
export const OUTXIDIOUS_SLOTS = ["heroMedia", "claim", "sections", "theme", "ogImage", "index"] as const;
export type OutxidiousSlot = (typeof OUTXIDIOUS_SLOTS)[number];
export type OutxidiousApproval = Partial<Record<OutxidiousSlot, boolean>>;

/**
 * Color de la hora de un bloque: «este lado» (tardeo) y «el otro lado»
 * (OUTXIDE). Los dos colores están PENDIENTES DE JOSE (outxidious.css).
 */
export const OUTXIDIOUS_SECTION_TONES = ["tardeo", "noche"] as const;
export type OutxidiousSectionTone = (typeof OUTXIDIOUS_SECTION_TONES)[number];

export interface OutxidiousSection {
  /** Hora del bloque, pintada delante del título y en el color de `tone` (p. ej. "{tardeoStart}–{tardeoEnd}"). */
  time?: string;
  tone?: OutxidiousSectionTone;
  title: string;
  text: string;
}

/** Pregunta frecuente (va con el hueco `sections`). */
export interface OutxidiousFaqItem {
  q: string;
  a: string;
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
      /**
       * Recorte en móvil con POCA ALTURA de pantalla (≤ 719 px: iPhone SE en
       * Safari o dentro de Instagram), más estrecho que `mobileAspect`. Con el
       * claim y el sábado la línea «Hoy», la placa +18 no cabría: se reduce el
       * vídeo, nunca la placa. Por debajo de 660 px de alto el vídeo pasa
       * DEBAJO del texto (outxidious.css). Medir antes que todo lo que se
       * mueve quepa en la franja.
       */
      shortAspect?: number;
      /** Encuadre vertical del recorte (object-position Y, 0–100 %; 50 = centro). */
      focusY?: number;
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

/**
 * Huecos por idioma. Lo que FALTE en un idioma cae al español; lo que esté
 * puesto VACÍO ("" o []) significa «en este idioma, nada» y no cae: así un
 * idioma sin versión del copy creativo se queda con la página neutra en vez
 * de enseñar español (DE, FR e IT, 20-oct: el paquete solo trae ES y EN).
 */
export interface OutxidiousLocaleContent {
  /** Claim del hero. Siempre separado ≥ 24 px de la placa legal. */
  claim?: string;
  /** Claim del día del evento (sábado 31); sin él se usa `claim`. */
  claimToday?: string;
  /** Bloques bajo el hero, en este orden. */
  sections?: OutxidiousSection[];
  /** Preguntas frecuentes, después de los bloques (hueco `sections`). */
  faq?: OutxidiousFaqItem[];
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
// Todo lo que se mueve vive en la franja central (filas 37,5–55,4 % del alto,
// medido fotograma a fotograma): en móvil se recorta a 5:2 y, con poca altura
// de pantalla, a 5:1, encuadrado al 45 % (ventanas 27–67 % y 36–56 %: la franja
// entera, «CLUB» y las esquirlas de la X incluidos, comprobado en una hoja de
// fotogramas del recorte), para que el h1, el claim, las dos partes, el
// precio, el botón y la placa +18 quepan debajo (también el sábado, con la
// línea «Hoy»). 20-oct (v0.4): el recorte bajo pasa de 4:1 a 5:1 porque la
// parte de OUTXIDE gana una línea (DJ Siquiers) y a 375×667 la placa se salía
// unos 5 px: se reduce el vídeo, nunca la placa.
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
  shortAspect: 5,
  focusY: 45,
} as const;

/** Huecos de texto vacíos A PROPÓSITO: «en este idioma, sin copy creativo» (no cae al español). */
const NO_CREATIVE_COPY = { claim: "", claimToday: "", sections: [], faq: [] } satisfies OutxidiousLocaleContent;

/**
 * EL FICHERO QUE SE RELLENA cuando llegue material aprobado.
 *
 * PROVISIONAL — pendiente del contenido nuevo y del OK de Jose (paquete v0.4
 * de META ADS, 20-oct-2026: meta-ads-outxide/campanas/2026-10-halloween-cenas/
 * CREATIVO-LANDING-OUTXIDIOUS.md §4.2, §4.3 y §6.1; la v0.4 no cambia ningún
 * bloque para pegar respecto a la v0.2, solo resuelve la edad del tardeo).
 * Sergi autorizó encenderlo como provisional. Cambios sobre el paquete, a
 * propósito:
 * - FAQ: con [CONFIRMAR] sin dato se borra la frase entera, nunca solo la
 *   marca. La 1 va con la respuesta por defecto del paquete (§4.3: la regla
 *   de puerta que ya publica la web, para las dos partes), porque Jose no ha
 *   confirmado la lista ampliada de documentos, las fotocopias ni el control
 *   con disfraz; la 4 sin las normas de disfraz; la 5 sin por dónde se entra
 *   a cada local ni si se pasa por dentro.
 * - Horas con huecos ({start} {end} de Fourvenues; {tardeoStart} {tardeoEnd}).
 * - DE, FR e IT: sin versión del copy creativo (no se traduce): claim,
 *   secciones y FAQ VACÍOS para que no caigan al español; esos idiomas siguen
 *   con la página neutra (con el tema rojo y el teaser, que no son texto).
 * Los datos de prueba de los huecos viven SOLO en e2e/outxidious.spec.ts.
 */
export const OUTXIDIOUS_CONTENT: OutxidiousContent = {
  approved: {
    heroMedia: true,
    claim: true,
    sections: true,
    theme: true,
    // Sin imagen OG en el paquete: sigue la foto de la cabina (nunca el logo fijo).
    ogImage: false,
    // Fuera de buscadores hasta nueva orden.
    index: false,
  },
  theme: "campana-roja",
  // La descripción accesible del vídeo va en los 5 idiomas (es lo que lee un
  // lector de pantalla; no es copy de campaña: describe lo que se ve).
  locales: {
    es: {
      claim: "Algo cruzó contigo.",
      claimToday: "{start} se abre. 00:00 se rompe.",
      sections: [
        {
          time: "{tardeoStart}–{tardeoEnd}",
          tone: "tardeo",
          title: "Tardeo de acceso libre en Enjoy Terrace",
          text: "Empezamos antes, en Enjoy Terrace, con acceso libre y gratuito.\nSolo mayores de\u00a018: trae tu documento.",
        },
        {
          time: "{start}–{end}",
          tone: "noche",
          title: "OUTXIDE",
          text: "A las {start} se abre. A las 00:00 se rompe. Y la noche sigue al otro lado hasta las {end}.\nCon entrada para OUTXIDE, solo mayores de\u00a018.", // espacio duro: el «18» no se queda solo en otra línea
        },
        {
          title: "Dress code: negro",
          text: "Ven de negro y trae una grieta roja: un trazo de maquillaje, una cinta, un pañuelo, unos cordones. Lo que quieras, mientras se vea rojo.",
        },
        {
          title: "Llega antes de las 00:00",
          text: "A medianoche se rompe, y se rompe una sola vez. Que te pille dentro.",
        },
      ],
      faq: [
        {
          q: "¿Qué edad hay que tener? ¿Piden DNI?",
          a: "Las dos partes son solo para mayores de 18: se pide DNI o pasaporte. Sin documento, no se entra.",
        },
        {
          q: "¿El tardeo es de acceso libre?",
          a: "Sí. El tardeo en Enjoy Terrace, de {tardeoStart} a {tardeoEnd}, es de acceso libre y gratuito.",
        },
        {
          q: "¿Necesito algo para entrar al tardeo?",
          a: "Solo tu documento: es de acceso libre y para mayores de 18. La entrada solo hace falta para seguir en OUTXIDE a partir de las {start}.",
        },
        {
          q: "¿Cuál es el dress code?",
          a: "Negro. Y una grieta roja: un detalle rojo que se vea, como un trazo de maquillaje, una cinta o un pañuelo.",
        },
        {
          q: "¿Cómo llego a cada sitio?",
          a: "Los dos están en la Av. Tucán 1 de Port d'Alcúdia: Enjoy Terrace es la terraza y OUTXIDE, el club.",
        },
        {
          q: "¿A qué hora cierra?",
          a: "El tardeo de acceso libre de Enjoy Terrace termina a las {tardeoEnd}. OUTXIDE abre a las {start} y cierra a las {end}. Llega antes de las 00:00: es cuando se rompe.",
        },
        {
          q: "¿Y el consumo responsable?",
          a: "Es una noche para mayores de 18 y pedimos consumo responsable. Si alguien de tu grupo no se encuentra bien, avisa a cualquier persona del equipo.",
        },
      ],
      heroMedia: {
        ...TEASER,
        label: "Animación sin sonido: el logotipo de OUTXIDE Club se transforma en OUTXIDIOUS y su X se rompe en esquirlas iluminadas de rojo.",
      },
    },
    en: {
      claim: "Something crossed over with you.",
      claimToday: "Opens {start}. Breaks 00:00.",
      sections: [
        {
          time: "{tardeoStart}–{tardeoEnd}",
          tone: "tardeo",
          title: "Free-entry early party at Enjoy Terrace",
          text: "We start early, at Enjoy Terrace, with free entry.\n18+ only: bring your ID.",
        },
        {
          time: "{start}–{end}",
          tone: "noche",
          title: "OUTXIDE",
          text: "It opens at {start}. It breaks at 00:00. And on the other side, the night goes on until {end}.\nOUTXIDE ticket required, 18+ only.",
        },
        {
          title: "Dress code: black",
          text: "Wear black and bring a red crack: a stroke of make-up, a ribbon, a scarf, a pair of laces. Anything, as long as it shows red.",
        },
        {
          title: "Get in before 00:00",
          text: "At midnight it breaks, and it only breaks once. Be inside when it does.",
        },
      ],
      faq: [
        {
          q: "How old do I need to be? Do you check ID?",
          a: "Both parts are 18+ only: ID or passport required. No ID, no entry.",
        },
        {
          q: "Is the early party free entry?",
          a: "Yes. The early party at Enjoy Terrace, {tardeoStart}–{tardeoEnd}, is free entry.",
        },
        {
          q: "Do I need anything to get into the early party?",
          a: "Just your ID: it's free entry and 18+ only. You only need a ticket to carry on at OUTXIDE from {start}.",
        },
        {
          q: "What's the dress code?",
          a: "Black. Plus a red crack: a red detail that shows, like a stroke of make-up, a ribbon or a scarf.",
        },
        {
          q: "How do I get to each place?",
          a: "Both are at Av. Tucán 1, Port d'Alcúdia: Enjoy Terrace is the terrace and OUTXIDE is the club.",
        },
        {
          q: "What time does it close?",
          a: "The free-entry early party at Enjoy Terrace ends at {tardeoEnd}. OUTXIDE opens at {start} and closes at {end}. Get in before 00:00: that's when it breaks.",
        },
        {
          q: "What about drinking responsibly?",
          a: "It's an 18+ night and we ask everyone to drink responsibly. If someone in your group isn't feeling well, tell any member of staff.",
        },
      ],
      heroMedia: {
        ...TEASER,
        label: "Silent animation: the OUTXIDE Club logo turns into OUTXIDIOUS and its X breaks into shards lit in red.",
      },
    },
    // Sin copy creativo en estos idiomas (no se traduce): vacíos a propósito
    // para que no caigan al español. Solo la descripción accesible del vídeo.
    de: {
      ...NO_CREATIVE_COPY,
      heroMedia: {
        ...TEASER,
        label: "Animation ohne Ton: Das Logo von OUTXIDE Club verwandelt sich in OUTXIDIOUS, und sein X zerbricht in rot leuchtende Splitter.",
      },
    },
    fr: {
      ...NO_CREATIVE_COPY,
      heroMedia: {
        ...TEASER,
        label: "Animation sans son : le logo d'OUTXIDE Club se transforme en OUTXIDIOUS et son X se brise en éclats éclairés en rouge.",
      },
    },
    it: {
      ...NO_CREATIVE_COPY,
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
  faq: OutxidiousFaqItem[];
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
  // Un idioma que pone su claim (aunque sea VACÍO) decide por sí mismo: no cae
  // al español. Así DE/FR/IT sin copy creativo no enseñan el claim en español.
  const ownClaims = typeof own.claim === "string" || typeof own.claimToday === "string";
  return {
    theme: ok("theme") && content.theme === "campana-roja" ? "campana-roja" : "neutro",
    claim: claimOk ? text(pick("claim")) : null,
    // Primero el mismo idioma (claim del día y si no el claim); el español solo
    // si el idioma no trae ninguno de los dos.
    claimToday: claimOk
      ? ownClaims
        ? (text(own.claimToday) ?? text(own.claim))
        : (text(base.claimToday) ?? text(base.claim))
      : null,
    sections: ok("sections") ? (pick("sections") ?? []).filter((s) => text(s.title) && text(s.text)) : [],
    // La FAQ va con el hueco `sections` (es contenido bajo el hero).
    faq: ok("sections") ? (pick("faq") ?? []).filter((f) => text(f.q) && text(f.a)) : [],
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
const isTone = (v: unknown): v is OutxidiousSectionTone =>
  isStr(v) && (OUTXIDIOUS_SECTION_TONES as readonly string[]).includes(v);
const isPercent = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v) && v >= 0 && v <= 100;
/** Proporción de recorte razonable (de 1:2 a 5:1: el recorte bajo del teaser es 5:1). */
const isAspect = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v) && v >= 0.5 && v <= 5;

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
      ...(isAspect(v.shortAspect) ? { shortAspect: v.shortAspect } : {}),
      ...(isPercent(v.focusY) ? { focusY: v.focusY } : {}),
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
      .map((s) => ({
        ...(isStr(s.time) ? { time: s.time } : {}),
        ...(isTone(s.tone) ? { tone: s.tone } : {}),
        title: s.title as string,
        text: s.text as string,
      }));
  }
  if (Array.isArray(v.faq)) {
    out.faq = v.faq
      .filter((f): f is Record<string, unknown> => isRecord(f) && isStr(f.q) && isStr(f.a))
      .map((f) => ({ q: f.q as string, a: f.a as string }));
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
