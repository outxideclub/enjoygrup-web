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

/**
 * Consentimiento almacenado, o null si no existe, es de otra versión de la
 * política o tiene más de 12 meses (en esos casos hay que volver a preguntar).
 */
export function getStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.version !== CONSENT_VERSION) return null;
    const ts = Date.parse(parsed.timestamp ?? "");
    if (Number.isNaN(ts) || Date.now() - ts > CONSENT_MAX_AGE_MS) return null;
    return parsed.consent as ConsentState;
  } catch {
    return null;
  }
}

export function storeConsent(consent: ConsentState): void {
  localStorage.setItem(
    CONSENT_KEY,
    JSON.stringify({ consent, version: CONSENT_VERSION, timestamp: new Date().toISOString() }),
  );
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT));
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
