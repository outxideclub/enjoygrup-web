"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, CONSENT_KEY, getStoredConsent, type ConsentState } from "@/lib/consent";
import { getGoogleAdsConfig, type GoogleAdsConfig } from "@/lib/google-ads";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
// Google Ads: NEXT_PUBLIC_GOOGLE_ADS_ID (AW-XXXXXXXXXX) y
// NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL, leídas y validadas en
// src/lib/google-ads.ts (documentación de alta en Vercel allí). Sin el id no se
// carga nada de Ads.

interface TagState {
  consent: ConsentState | null;
  ads: GoogleAdsConfig | null;
  /**
   * Id con el que se pidió gtag.js la primera vez. Un solo gtag.js sirve a GA4
   * y a Google Ads: Google documenta un único snippet con un id en el src y un
   * gtag('config') por destino adicional (el segundo se carga en caliente desde
   * googletagmanager.com/gtag/destination). Se fija para no volver a bajar la
   * librería si el consentimiento cambia a mitad de visita.
   */
  loaderId: string | null;
}

export function AnalyticsScripts() {
  const [state, setState] = useState<TagState>({ consent: null, ads: null, loaderId: null });

  useEffect(() => {
    const ads = getGoogleAdsConfig();
    // getStoredConsent valida versión y antigüedad (12 meses): un consentimiento
    // caducado o de otra versión de la política NO carga ningún píxel.
    const sync = () => {
      const consent = getStoredConsent();
      setState((prev) => {
        const ga4 = GA_ID && consent?.analytics ? GA_ID : null;
        const aw = ads && consent?.marketing ? ads.id : null;
        return { consent, ads, loaderId: prev.loaderId ?? ga4 ?? aw };
      });
    };
    sync();

    // El banner avisa con un evento propio en esta pestaña; el evento "storage"
    // cubre cambios desde otras pestañas. Sin polling.
    window.addEventListener(CONSENT_EVENT, sync);
    const handleStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_KEY) sync();
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener(CONSENT_EVENT, sync);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const { consent, ads, loaderId } = state;
  const ga4Active = Boolean(GA_ID && consent?.analytics);
  // Gating de Google Ads (decisión explícita, 28-sep-2026): la etiqueta se carga
  // SOLO con consentimiento de marketing, igual que Meta y TikTok. Google
  // recomienda cargarla siempre bajo Consent Mode v2 (con ad_storage denegado
  // envía pings sin cookies y modela más fino), pero la regla de este sitio y lo
  // que promete la política de cookies es "ningún píxel antes de consentir": la
  // coherencia vale más que el modelado avanzado. Es el "modo básico" de Consent
  // Mode; Google sigue modelando conversiones a partir de los rechazos.
  const adsActive = Boolean(ads && consent?.marketing);

  return (
    <>
      {/* Consent Mode v2 default — always loads first, before any tags.
          url_passthrough / ads_data_redaction solo actúan con ad_storage
          denegado (p. ej. si se retira el consentimiento con la etiqueta ya
          cargada): el gclid viaja por la URL en vez de en cookies y los
          identificadores de clic se redactan en los pings. Deben ir ANTES de
          cualquier config (orden exigido por Google). */}
      <Script id="consent-mode-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'wait_for_update': 500
          });
          gtag('set', 'url_passthrough', true);
          gtag('set', 'ads_data_redaction', true);
        `}
      </Script>

      {/* Librería gtag.js compartida por GA4 y Google Ads: solo si alguno tiene consentimiento */}
      {loaderId && (
        <Script
          id="gtag-js"
          src={`https://www.googletagmanager.com/gtag/js?id=${loaderId}`}
          strategy="afterInteractive"
        />
      )}

      {/* GA4 — only configured when analytics consent is granted */}
      {ga4Active && (
        <Script id="ga4-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              anonymize_ip: true,
              // Caduca la cookie _ga a ~13 meses (recomendación AEPD de
              // duraciones cortas y coherente con la política de cookies).
              cookie_expires: 34164000,
              custom_map: { dimension1: 'venue' }
            });
          `}
        </Script>
      )}

      {/* Google Ads — solo con consentimiento de marketing (misma regla que Meta/TikTok).
          allow_enhanced_conversions deja la acción lista para recibir user_data
          (email hasheado) el día que se pase; sin user_data no envía nada más.
          Sin linker entre www. y entradas.: mismo dominio registrable
          (grupoenjoy.es), gtag pone _gcl_aw con Domain=.grupoenjoy.es y el
          gclid del aterrizaje llega solo a /gracias. */}
      {adsActive && ads && (
        <Script id="google-ads-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ads.id}', { allow_enhanced_conversions: true });
          `}
        </Script>
      )}

      {/* Meta Pixel — only loads when marketing consent is granted */}
      {META_PIXEL_ID && consent?.marketing && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* TikTok Pixel — only loads when marketing consent is granted */}
      {TIKTOK_PIXEL_ID && consent?.marketing && (
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src=r+"?sdkid="+e+"&lib="+t;var s=document.getElementsByTagName("script")[0];s.parentNode.insertBefore(a,s)};
              ttq.load('${TIKTOK_PIXEL_ID}');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
      )}
    </>
  );
}
