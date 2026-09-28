"use client";

import { useEffect } from "react";
import { CONSENT_EVENT, getStoredConsent } from "@/lib/consent";
import { getGoogleAdsConfig, purchaseSendTo } from "@/lib/google-ads";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (event: string, params?: Record<string, unknown>) => void };
  }
}

const FIRED_KEY = "ge_purchase_fired";
// Valor almacenado cuando Fourvenues no añade referencia de pedido a la URL:
// permite distinguir "ya disparé sin referencia" de una compra nueva con ella.
const NO_REF = "no-ref";

type Platform = "meta" | "tiktok" | "google";
const ALL_PLATFORMS: Platform[] = ["meta", "tiktok", "google"];

/** Registro en sessionStorage: qué plataformas ya recibieron ESTE pedido. */
interface FiredRecord {
  ref: string;
  platforms: Platform[];
}

function readFired(): FiredRecord | null {
  try {
    const raw = sessionStorage.getItem(FIRED_KEY);
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw) as Partial<FiredRecord> | null;
      if (parsed && typeof parsed.ref === "string" && Array.isArray(parsed.platforms)) {
        return {
          ref: parsed.ref,
          platforms: parsed.platforms.filter((p): p is Platform => ALL_PLATFORMS.includes(p as Platform)),
        };
      }
    } catch {
      /* formato anterior: solo la referencia */
    }
    // Formato anterior a sep-2026 (solo la referencia): entonces solo existían
    // Meta y TikTok, así que son las que constan como disparadas.
    return { ref: raw, platforms: ["meta", "tiktok"] };
  } catch {
    return null;
  }
}

/**
 * Dispara la conversión al aterrizar en /gracias (Thank You Page de la compra
 * en Fourvenues). Contexto propio de grupoenjoy.es: aquí SÍ existen _fbp/_fbc
 * gracias a la propagación de fbclid (src/lib/campaign-params.ts), y _gcl_aw
 * (gclid) porque www. y entradas. comparten el dominio grupoenjoy.es.
 *
 * Guardias (endurecidas tras revisión adversarial, 1-sep-2026; por plataforma
 * desde 28-sep-2026):
 * - Anti-recarga: recargar /gracias no cuenta otra venta (sessionStorage).
 * - Segunda compra legítima: si la URL trae una referencia de pedido DISTINTA
 *   de la almacenada, sí se dispara (Meta deduplica además por eventID y
 *   Google Ads por transaction_id).
 * - Por plataforma: el registro guarda QUÉ plataformas ya recibieron el pedido.
 *   La que llegue tarde (script async) dispara igual y ninguna repite. Antes
 *   bastaba con que una disparase para cerrar el pedido y las lentas se
 *   perdían; con gtag (definido desde el primer byte por Consent Mode) Meta y
 *   TikTok se habrían quedado siempre fuera.
 * - Sin fugas: el bucle de reintentos se cancela al desmontar y re-comprueba
 *   la guardia antes de disparar (un remontaje no produce dos Purchase).
 * - Consentimiento tardío: si el visitante acepta el banner ya en /gracias,
 *   el evento de consentimiento relanza el disparo.
 * - Google Ads: gtag() existe siempre (solo encola en dataLayer), así que la
 *   señal de "activo" no es su presencia sino el consentimiento de marketing,
 *   la misma condición con la que AnalyticsScripts carga la etiqueta. Sin
 *   consentimiento el evento NO se encola: con solo analytics GA4 cargaría
 *   gtag.js y un send_to AW-… en cola acabaría en Google Ads.
 *
 * IMPORTANTE — anti-duplicados con Fourvenues: si en su panel se configura el
 * píxel de Meta con evento Purchase, habrá DOS Purchase por venta. Decisión
 * vigente (1-sep-2026): el Purchase se dispara AQUÍ; en el panel de Fourvenues
 * el píxel queda para PageView/InitiateCheckout. Si la sesión de Meta Ads
 * decide lo contrario, apagar este disparo o deduplicar con eventID compartido.
 * Lo mismo con Google Ads: la conversión "Compra" se mide AQUÍ (etiqueta
 * propia); no importar además la compra de GA4 como conversión principal.
 */
interface PurchaseTrackingProps {
  /**
   * Importe real del pago (motor native: lo verifica /gracias en servidor).
   * Meta exige `value` en Purchase para ROAS y optimización por valor; sin él
   * (motor iframe o verificación caída) se dispara solo con la moneda.
   */
  value?: number;
}

export function PurchaseTracking({ value }: PurchaseTrackingProps) {
  useEffect(() => {
    let cancelled = false;
    let timer: number | undefined;

    const qs = new URLSearchParams(window.location.search);
    const orderRef =
      qs.get("order") || qs.get("order_id") || qs.get("reference") || qs.get("id");
    const eventID = orderRef || `ge-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

    const ads = getGoogleAdsConfig();
    const googleSendTo = ads ? purchaseSendTo(ads) : null;
    // Plataformas que pueden llegar a disparar en esta página. Meta y TikTok no
    // exponen aquí su id: se espera a que aparezca su objeto global.
    const expected: Platform[] = googleSendTo ? ALL_PLATFORMS : ["meta", "tiktok"];

    const stored = readFired();
    // Sin referencia en la URL no se puede distinguir una compra de otra:
    // cualquier registro previo bloquea (conservador). Con referencia, solo
    // bloquea el registro del MISMO pedido.
    const sameOrder = stored !== null && (!orderRef || stored.ref === orderRef);
    const done = new Set<Platform>(sameOrder && stored ? stored.platforms : []);
    const pending = () => expected.filter((p) => !done.has(p));

    if (pending().length === 0) return;

    const markFired = (platform: Platform) => {
      done.add(platform);
      try {
        const record: FiredRecord = { ref: orderRef || NO_REF, platforms: [...done] };
        sessionStorage.setItem(FIRED_KEY, JSON.stringify(record));
      } catch {
        /* sin guardia persistente */
      }
    };

    let tries = 0;
    const fire = () => {
      // Un relanzamiento (consentimiento) no debe dejar dos bucles vivos.
      if (timer) {
        window.clearTimeout(timer);
        timer = undefined;
      }
      if (cancelled) return;
      const amount = typeof value === "number" && Number.isFinite(value) ? { value } : {};
      if (!done.has("meta") && typeof window.fbq === "function") {
        window.fbq("track", "Purchase", { ...amount, currency: "EUR" }, { eventID });
        markFired("meta");
      }
      if (!done.has("tiktok") && window.ttq?.track) {
        window.ttq.track("CompletePayment", { ...amount, currency: "EUR", event_id: eventID });
        markFired("tiktok");
      }
      if (
        googleSendTo &&
        !done.has("google") &&
        typeof window.gtag === "function" &&
        getStoredConsent()?.marketing
      ) {
        // transaction_id: Google Ads descarta conversiones repetidas con el
        // mismo id dentro de la acción, además de la guardia local.
        window.gtag("event", "conversion", {
          send_to: googleSendTo,
          ...amount,
          currency: "EUR",
          transaction_id: eventID,
        });
        markFired("google");
      }
      // Los píxeles pueden tardar (consentimiento + script async): reintento
      // acotado mientras quede alguno por disparar.
      if (pending().length > 0 && ++tries < 20) timer = window.setTimeout(fire, 500);
    };

    // Si el consentimiento llega estando ya en /gracias, se relanza el disparo.
    const onConsent = () => {
      tries = 0;
      fire();
    };
    window.addEventListener(CONSENT_EVENT, onConsent);
    fire();

    return () => {
      cancelled = true;
      if (timer) window.clearTimeout(timer);
      window.removeEventListener(CONSENT_EVENT, onConsent);
    };
  }, [value]);

  return null;
}
