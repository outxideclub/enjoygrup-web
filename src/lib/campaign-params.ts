// Propagación de parámetros de campaña hacia Fourvenues (TAREA-VENTA-EN-WEB §1).
//
// Cuando un anuncio (Meta/TikTok/Google) trae al usuario a grupoenjoy.es, la URL
// llega con fbclid/ttclid/gclid y utm_*. Si el salto a Fourvenues no los lleva,
// su píxel no puede formar _fbc y la venta deja de atribuirse a la campaña.
//
// DECISIÓN DE PRIVACIDAD (explícita, no por inercia): estos valores ya viajan en
// la URL que el propio usuario abrió; reenviarlos en un enlace no crea un
// identificador nuevo ni escribe cookies de marketing. Se guardan en
// **sessionStorage** (mueren con la pestaña, no persisten entre visitas) y NUNCA
// en localStorage ni en cookies, precisamente para no convertirlos en
// almacenamiento de seguimiento que exigiría consentimiento previo.
// Ref: src/lib/consent.ts gobierna los píxeles; esto es independiente de ellos.

const KEYS = [
  "fbclid",
  "ttclid",
  "gclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

const STORE_KEY = "ge_campaign_params";

type Params = Partial<Record<(typeof KEYS)[number], string>>;

function read(): Params {
  try {
    return JSON.parse(sessionStorage.getItem(STORE_KEY) ?? "{}") as Params;
  } catch {
    return {};
  }
}

/**
 * Captura los parámetros de campaña de la URL actual y los conserva durante la
 * sesión de navegación (el usuario puede mirar dos eventos antes de comprar).
 * La última campaña vista gana clave a clave.
 */
export function captureCampaignParams(): void {
  try {
    const qs = new URLSearchParams(window.location.search);
    const found: Params = {};
    for (const k of KEYS) {
      const v = qs.get(k);
      if (v) found[k] = v;
    }
    if (Object.keys(found).length === 0) return;
    sessionStorage.setItem(STORE_KEY, JSON.stringify({ ...read(), ...found }));
  } catch {
    // sessionStorage puede lanzar (Safari privado antiguo, storage lleno):
    // la propagación es best-effort y jamás debe romper la navegación.
  }
}

/**
 * Devuelve `url` con los parámetros de campaña de la sesión añadidos, si la URL
 * apunta a Fourvenues o a la taquilla (entradas.grupoenjoy.es — sessionStorage
 * no cruza orígenes: los parámetros deben viajar en la URL para que la taquilla
 * los recapture). No pisa parámetros que la URL ya lleve. Idempotente.
 */
export function decorateFourvenuesUrl(url: string): string {
  try {
    const u = new URL(url, window.location.origin);
    const isTicketed =
      /(^|\.)fourvenues\.com$/.test(u.hostname) || u.hostname === "entradas.grupoenjoy.es";
    if (!isTicketed) return url;
    const stored = read();
    let changed = false;
    for (const [k, v] of Object.entries(stored)) {
      if (v && !u.searchParams.has(k)) {
        u.searchParams.set(k, v);
        changed = true;
      }
    }
    return changed ? u.toString() : url;
  } catch {
    return url;
  }
}
