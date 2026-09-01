// Gestión centralizada del consentimiento de cookies (cliente).
// La usan el banner, el botón "Configurar cookies" del footer y AnalyticsScripts,
// para que todos compartan el mismo criterio de validez y el mismo borrado.

export type ConsentState = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

export const CONSENT_KEY = "ge_cookie_consent";
export const CONSENT_VERSION = "2"; // bump = el banner vuelve a preguntar a todos
/** La AEPD recomienda renovar el consentimiento como máximo a los 12 meses. */
export const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;
/** Evento propio para avisar a AnalyticsScripts sin polling. */
export const CONSENT_EVENT = "ge-consent-changed";

// La decisión se espeja además en una cookie propia con Domain=.grupoenjoy.es:
// el consentimiento dado en www vale también en entradas.grupoenjoy.es (misma
// web, mismo responsable) y el comprador no ve el banner dos veces al pasar por
// la taquilla. En localhost/preview no hay dominio raíz: solo localStorage.
function rootDomain(): string | null {
  const host = window.location.hostname;
  if (host === "localhost" || /^[0-9.:]+$/.test(host) || !host.includes(".")) return null;
  return host.split(".").slice(-2).join(".");
}

type ParsedConsent = { consent: ConsentState; ts: number };

function parseStored(raw: string | null): ParsedConsent | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    if (parsed.version !== CONSENT_VERSION) return null;
    const ts = Date.parse(parsed.timestamp ?? "");
    if (Number.isNaN(ts) || Date.now() - ts > CONSENT_MAX_AGE_MS) return null;
    return { consent: parsed.consent as ConsentState, ts };
  } catch {
    return null;
  }
}

function readSharedCookie(): string | null {
  const m = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_KEY}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

/**
 * Consentimiento almacenado, o null si no existe, es de otra versión de la
 * política o tiene más de 12 meses (en esos casos hay que volver a preguntar).
 * Entre localStorage del origen y la cookie compartida gana la decisión MÁS
 * RECIENTE (el usuario pudo cambiarla en el otro origen); si gana la cookie,
 * se hidrata localStorage para las siguientes cargas.
 */
export function getStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const local = parseStored(localStorage.getItem(CONSENT_KEY));
    const rawCookie = readSharedCookie();
    const shared = parseStored(rawCookie);
    if (local && (!shared || local.ts >= shared.ts)) return local.consent;
    if (shared && rawCookie) {
      try {
        localStorage.setItem(CONSENT_KEY, rawCookie);
      } catch {
        /* sin hidratar */
      }
      return shared.consent;
    }
    return null;
  } catch {
    return null;
  }
}

export function storeConsent(consent: ConsentState): void {
  const payload = JSON.stringify({
    consent,
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
  });
  try {
    localStorage.setItem(CONSENT_KEY, payload);
  } catch {
    /* quota / modo privado antiguo: la cookie compartida sigue guardándose */
  }
  const root = rootDomain();
  if (root) {
    document.cookie = `${CONSENT_KEY}=${encodeURIComponent(payload)}; path=/; domain=.${root}; max-age=${60 * 60 * 24 * 365}; SameSite=Lax; Secure`;
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT));
}

/**
 * Retira el consentimiento almacenado en TODOS los soportes (localStorage y
 * cookie compartida del dominio raíz): tras llamarlo, el banner vuelve a salir
 * también en el otro origen. Lo usa el botón "Configurar cookies" del footer.
 */
export function clearStoredConsent(): void {
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* nada que borrar */
  }
  const past = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = `${CONSENT_KEY}=;${past};path=/`;
  const root = rootDomain();
  if (root) document.cookie = `${CONSENT_KEY}=;${past};path=/;domain=.${root}`;
}

/** Cookies que instalan las herramientas de análisis y marketing en NUESTRO dominio. */
const ANALYTICS_COOKIES = ["_ga", "_gid"];
const MARKETING_COOKIES = ["_fbp", "_fbc", "_ttp"];

function expireCookie(name: string): void {
  const past = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
  const host = window.location.hostname;
  // Se borran en el host y en el dominio raíz (GA/Meta las ponen con Domain=.dominio).
  document.cookie = `${name}=;${past};path=/`;
  document.cookie = `${name}=;${past};path=/;domain=${host}`;
  const root = host.split(".").slice(-2).join(".");
  if (root !== host) document.cookie = `${name}=;${past};path=/;domain=.${root}`;
}

/**
 * Al retirar (o no otorgar) el consentimiento, elimina del navegador las cookies
 * de rastreo ya instaladas desde nuestro dominio, incluidas las _ga_* con sufijo.
 */
export function deleteTrackingCookies(consent: ConsentState): void {
  const names = document.cookie.split("; ").map((c) => c.split("=")[0]);
  if (!consent.analytics) {
    for (const n of names) {
      if (ANALYTICS_COOKIES.includes(n) || n.startsWith("_ga_")) expireCookie(n);
    }
  }
  if (!consent.marketing) {
    for (const n of names) {
      if (MARKETING_COOKIES.includes(n) || n.startsWith("tt_")) expireCookie(n);
    }
  }
}
