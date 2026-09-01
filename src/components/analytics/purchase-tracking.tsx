"use client";

import { useEffect } from "react";
import { CONSENT_EVENT } from "@/lib/consent";

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

/**
 * Dispara la conversión al aterrizar en /gracias (Thank You Page de la compra
 * en Fourvenues). Contexto propio de grupoenjoy.es: aquí SÍ existen _fbp/_fbc
 * gracias a la propagación de fbclid (src/lib/campaign-params.ts).
 *
 * Guardias (endurecidas tras revisión adversarial, 1-sep-2026):
 * - Anti-recarga: recargar /gracias no cuenta otra venta (sessionStorage).
 * - Segunda compra legítima: si la URL trae una referencia de pedido DISTINTA
 *   de la almacenada, sí se dispara (Meta deduplica además por eventID).
 * - Sin fugas: el bucle de reintentos se cancela al desmontar y re-comprueba
 *   la guardia antes de disparar (un remontaje no produce dos Purchase).
 * - Consentimiento tardío: si el visitante acepta el banner ya en /gracias,
 *   el evento de consentimiento relanza el disparo.
 *
 * IMPORTANTE — anti-duplicados con Fourvenues: si en su panel se configura el
 * píxel de Meta con evento Purchase, habrá DOS Purchase por venta. Decisión
 * vigente (1-sep-2026): el Purchase se dispara AQUÍ; en el panel de Fourvenues
 * el píxel queda para PageView/InitiateCheckout. Si la sesión de Meta Ads
 * decide lo contrario, apagar este disparo o deduplicar con eventID compartido.
 */
export function PurchaseTracking() {
  useEffect(() => {
    let cancelled = false;
    let timer: number | undefined;

    const qs = new URLSearchParams(window.location.search);
    const orderRef =
      qs.get("order") || qs.get("order_id") || qs.get("reference") || qs.get("id");
    const eventID = orderRef || `ge-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

    const alreadyFired = (): boolean => {
      try {
        const stored = sessionStorage.getItem(FIRED_KEY);
        if (!stored) return false;
        // Compra nueva con referencia distinta → debe dispararse.
        if (orderRef && stored !== orderRef) return false;
        return true;
      } catch {
        return false;
      }
    };

    if (alreadyFired()) return;

    let tries = 0;
    const fire = () => {
      if (cancelled || alreadyFired()) return;
      const fired: string[] = [];
      if (typeof window.fbq === "function") {
        window.fbq("track", "Purchase", { currency: "EUR" }, { eventID });
        fired.push("meta");
      }
      if (window.ttq?.track) {
        window.ttq.track("CompletePayment", { currency: "EUR", event_id: eventID });
        fired.push("tiktok");
      }
      if (fired.length > 0) {
        try {
          sessionStorage.setItem(FIRED_KEY, orderRef || NO_REF);
        } catch {
          /* sin guardia persistente */
        }
        return;
      }
      // El píxel puede tardar (consentimiento + script async): reintenta.
      if (++tries < 20) timer = window.setTimeout(fire, 500);
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
  }, []);

  return null;
}
