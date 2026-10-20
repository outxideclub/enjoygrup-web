import type { Dictionary } from "./dictionaries/es";

// Diccionario RECORTADO para páginas de destino de anuncios (19-oct-2026).
//
// El layout raíz pasa el diccionario al LocaleProvider (cliente) como prop, así
// que viaja ENTERO, serializado en el payload RSC, en el HTML de cada página.
// En la landing de un anuncio con alcohol eso es un problema: Meta revisa la
// página y el diccionario completo lleva textos de otros locales y eventos
// («Hiru», «cócteles», «shisha», «copas», «Agotado», «oficiales»…). Desde el
// 19-oct OUTXIDIOUS es un evento compartido y la landing SÍ nombra «Enjoy
// Terrace» y el «tardeo», pero con sus propias claves del namespace outxidious
// (que viaja entero), nunca con las de enjoy.*, que hablan de cócteles y
// shisha. En estas rutas
// solo viajan las claves que piden sus componentes CLIENTE; el resto de textos
// se pinta en servidor con getServerT (solo la cadena final llega al HTML).
//
// Salir de una de estas páginas por navegación suave dejaría la siguiente con
// el diccionario parcial (el layout raíz no se vuelve a renderizar): por eso el
// layout raíz monta ScopedNavigationGuard en estas rutas, que convierte esas
// salidas en cargas completas. e2e/outxidious.spec.ts y e2e/empresas.spec.ts
// prueban las dos cosas: el resto del sitio sigue recibiendo el diccionario
// entero y con navegación suave, y salir de la landing no deja claves sin
// traducir.
//
// Si un componente cliente nuevo de estas rutas pide otra clave, AÑADIRLA aquí
// (el e2e busca claves crudas pintadas en la página).

const SCOPES: Record<string, readonly string[]> = {
  "/outxide/outxidious": [
    // Textos neutros de la propia landing (botón de pausa del vídeo, etc.).
    "outxidious",
    // Muro +18 heredado de /outxide (usa también cookieBanner.and) y banner y
    // botón de cookies del layout raíz y del pie.
    "ageVerification",
    "cookieBanner",
    // Selector de idioma de la cabecera.
    "common.language",
    // error.tsx propio de la landing.
    "error",
    // Formulario de avisos: los MISMOS textos legales que el de /agenda.
    "agenda.alertsPlaceholder",
    "agenda.alertsSubmit",
    "agenda.alertsPrivacy",
    "agenda.alertsPrivacyLink",
    "agenda.alertsSuccess",
    "agenda.alertsError",
    "agenda.alertsPrivacyRequired",
    "agenda.alertsInfoLayer",
  ],
  // /empresas (20-oct-2026): destino de los anuncios de empresas. A diferencia
  // de la landing de OUTXIDIOUS, aquí van la cabecera y el pie GENERALES de la
  // web (componentes cliente), así que el recorte lleva sus claves una a una.
  // Lo que NO viaja: «footer.enjoyCocktails» («Cocktails & Shisha»: con
  // adLanding el pie usa «enjoy.viewMenu») y el resto de namespaces de otras
  // páginas (cócteles, shisha, botellas, horarios de mayo-octubre…).
  "/empresas": [
    // Formulario (textos neutros y claves de error dinámicas «empresas.<x>»).
    // El namespace entero está limpio: lo comprueba e2e/empresas.spec.ts.
    "empresas",
    // Muro +18 (usa también cookieBanner.and), banner de cookies y su botón del pie.
    "ageVerification",
    "cookieBanner",
    // Navbar: menú, aria-labels de los locales y botón de reserva.
    "nav",
    "agenda.title",
    "cta.navReserve",
    "cta.navTickets",
    // Selector de idioma de la cabecera y columnas del pie.
    "common.language",
    "common.discover",
    "common.events",
    // Pie (Footer con adLanding), sin «footer.enjoyCocktails».
    "footer.tagline",
    "footer.enjoyTerrace",
    "enjoy.viewMenu",
    "cta.hiruFarewell",
    "footer.company",
    "footer.aboutUs",
    "footer.blog",
    "footer.contactUs",
    "footer.faqShort",
    "footer.legal",
    "footer.avisoLegal",
    "footer.privacy",
    "footer.cookies",
    "footer.salesConditions",
    "footer.email",
    // Enlace del torneo del pie: solo se pinta con EVENT_PHASE activo, pero si
    // alguien lo enciende no puede salir la clave cruda.
    "mundial.navLabel",
    // Boletín del pie.
    "footer.newsletterTagline",
    "footer.newsletterPlaceholder",
    "footer.newsletterSubmit",
    "footer.newsletterSuccess",
    "footer.newsletterError",
    "footer.newsletterPrivacy",
    "footer.newsletterPrivacyLink",
    "footer.newsletterInfoLayer",
    "footer.newsletterPrivacyRequired",
    // error.tsx y not-found.tsx raíz (cliente), por si se pintan en esta ruta.
    "error",
    "notFound",
  ],
};

/** Claves del recorte para una ruta base (sin prefijo de idioma), o null si va entero. */
export function dictionaryScopeFor(basePath: string | null | undefined): readonly string[] | null {
  if (!basePath) return null;
  const path = basePath.length > 1 ? basePath.replace(/\/+$/, "") : basePath;
  return SCOPES[path] ?? null;
}

/** Copia del diccionario con solo las rutas pedidas ("ns" o "ns.clave"). */
export function pickDictionary(dict: Dictionary, paths: readonly string[]): Dictionary {
  const out: Record<string, unknown> = {};
  for (const path of paths) {
    const keys = path.split(".");
    let src: unknown = dict;
    for (const k of keys) {
      src = src && typeof src === "object" ? (src as Record<string, unknown>)[k] : undefined;
    }
    if (src === undefined) continue;
    let dst = out;
    for (const k of keys.slice(0, -1)) {
      dst[k] = (dst[k] as Record<string, unknown> | undefined) ?? {};
      dst = dst[k] as Record<string, unknown>;
    }
    dst[keys[keys.length - 1]] = src;
  }
  // Tipo completo a propósito: el recorte solo se usa en rutas cuyos
  // componentes cliente piden exactamente estas claves (useT devuelve la clave
  // si faltara, nunca rompe).
  return out as unknown as Dictionary;
}
