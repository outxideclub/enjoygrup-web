// Medición de conversiones de Google Ads (campaña de marca, sep-2026).
//
// ÚNICO punto de lectura de la configuración para que AnalyticsScripts (carga de
// la etiqueta) y PurchaseTracking (evento de conversión en /gracias) apliquen
// exactamente la misma regla. Sin NEXT_PUBLIC_GOOGLE_ADS_ID todo es no-op: ni se
// carga gtag.js para Ads ni se encola ningún evento (cero peticiones a Google).
//
// Variables de entorno (Vercel → Settings → Environment Variables, marcar
// Production Y Preview; llevan prefijo NEXT_PUBLIC_ porque Next las incrusta en
// el bundle del cliente al compilar → hay que REDESPLEGAR tras cambiarlas):
//   NEXT_PUBLIC_GOOGLE_ADS_ID             "AW-XXXXXXXXXX": id de la etiqueta de
//                                         Google Ads (Objetivos → Conversiones →
//                                         Configuración de la etiqueta).
//   NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL etiqueta de la acción de conversión
//                                         "Compra" (lo que va tras la barra en
//                                         send_to: 'AW-XXXXXXXXXX/ETIQUETA').
// Solo con el id se carga la etiqueta (linker de gclid → cookies _gcl_*); sin
// la etiqueta de compra no se envía ninguna conversión.

export interface GoogleAdsConfig {
  id: string;
  /** null = acción de compra sin configurar: se carga la etiqueta pero no se envía conversión. */
  purchaseLabel: string | null;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    /** Doble de pruebas, solo fuera de producción (ver getGoogleAdsConfig). */
    __GE_TEST_ADS__?: { id?: unknown; label?: unknown };
  }
}

// Los valores se interpolan en un <script> inline: solo se aceptan formas
// estrictas (id "AW-" + alfanumérico; etiqueta alfanumérica con _ y -).
const ID_RE = /^AW-[A-Za-z0-9]+$/;
const LABEL_RE = /^[A-Za-z0-9_-]+$/;

function normalize(id: unknown, label: unknown): GoogleAdsConfig | null {
  if (typeof id !== "string" || !ID_RE.test(id)) return null;
  return {
    id,
    purchaseLabel: typeof label === "string" && LABEL_RE.test(label) ? label : null,
  };
}

export function getGoogleAdsConfig(): GoogleAdsConfig | null {
  // Los e2e no pueden fijar variables de compilación: fuera de producción se
  // acepta window.__GE_TEST_ADS__ = { id, label }. NODE_ENV se sustituye al
  // compilar, así que en el bundle de producción esta rama desaparece.
  if (process.env.NODE_ENV !== "production" && typeof window !== "undefined" && window.__GE_TEST_ADS__) {
    return normalize(window.__GE_TEST_ADS__.id, window.__GE_TEST_ADS__.label);
  }
  return normalize(process.env.NEXT_PUBLIC_GOOGLE_ADS_ID, process.env.NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL);
}

/** Destino (`send_to`) del evento de conversión de compra, o null si falta la etiqueta. */
export function purchaseSendTo(config: GoogleAdsConfig): string | null {
  return config.purchaseLabel ? `${config.id}/${config.purchaseLabel}` : null;
}
