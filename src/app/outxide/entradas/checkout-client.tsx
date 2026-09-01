"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { fourVenuesOrgUrl } from "@/lib/events";
import { captureCampaignParams, decorateFourvenuesUrl } from "@/lib/campaign-params";
import { useT, useLocale } from "@/i18n";
import { localizedPath } from "@/i18n/config";

// Host del iframe OFICIAL de Fourvenues (distinto del microsite): la versión
// pensada para incrustar, con protocolo postMessage. Ingeniería inversa del
// cargador público https://www.fourvenues.com/assets/iframe/outxide-club/events
// (1-sep-2026). Mensajes del hijo → padre:
//   addHeight   → altura total del contenido (el marco crece: SIN scroll interno)
//   openUrl     → navegación a nivel de ventana (así sale la Thank You Page)
//   currentUrl* → el hijo pide la URL del padre (para su tracking)
//   getFBC/getFBP/getTTP/getTTCLID → el hijo pide las cookies de atribución
//   getCampaignsTracking / getTrackeableLinksTracking → almacenes propios de FV
//   setCookie   → guest-token de sesión de compra (cookie funcional, exenta)
//   track       → NO se reenvía: la medición está centralizada en /gracias
// URL DIRECTA del iframe con idioma explícito (descubierta el 1-sep-2026):
// la puerta oficial www.fourvenues.com/iframe/... encadena redirecciones
// (www→web→site) que auto-negocian el idioma ignorando nuestro selector y
// cuya Location está rota a nivel HTTP. La app embebible real vive en
// site.fourvenues.com/{idioma}/iframe/... (es/en/de/fr/it verificados, sin
// cabeceras anti-iframe): idioma clavado al de la web y sin redirecciones
// que pierdan la query.
const FV_IFRAME_LOCALES = new Set(["es", "en", "de", "fr", "it"]);
function fvIframeBase(locale: string): string {
  const l = FV_IFRAME_LOCALES.has(locale) ? locale : "en";
  return `https://site.fourvenues.com/${l}/iframe/outxide-club/events`;
}
const FV_ORIGINS = new Set(["https://www.fourvenues.com", "https://site.fourvenues.com"]);

function readCookie(name: string): string | null {
  const m = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : null;
}

/** _fbc real si existe; si no, se sintetiza del fbclid propagado (formato oficial de Meta). */
function fbcValue(): string | null {
  const cookie = readCookie("_fbc");
  if (cookie) return cookie;
  try {
    const stored = JSON.parse(sessionStorage.getItem("ge_campaign_params") ?? "{}");
    if (stored.fbclid) return `fb.1.${Date.now()}.${stored.fbclid}`;
  } catch {
    /* sin síntesis */
  }
  return null;
}

function ttclidValue(): string | null {
  try {
    const stored = JSON.parse(sessionStorage.getItem("ge_campaign_params") ?? "{}");
    return stored.ttclid ?? null;
  } catch {
    return null;
  }
}

/**
 * Taquilla embebida (TAREA-VENTA-EN-WEB §3). El marco se auto-redimensiona a
 * la altura que publica Fourvenues: todo el contenido visible sin deslizar
 * dentro del iframe (petición del dueño, 1-sep-2026); solo scrollea la página.
 */
export function CheckoutClient() {
  const t = useT();
  const locale = useLocale();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [height, setHeight] = useState(720);
  const [fallbackHref, setFallbackHref] = useState<string>(fourVenuesOrgUrl("es"));

  useEffect(() => {
    captureCampaignParams();
    const qs = new URLSearchParams(window.location.search);
    const event = qs.get("event");
    const safeEvent = event && /^[a-z0-9-]{3,120}$/i.test(event) ? event : null;
    const target = `${fvIframeBase(locale)}${safeEvent ? `/${safeEvent}` : ""}?theme=dark`;
    setSrc(decorateFourvenuesUrl(target));
    // La salida de emergencia va al microsite completo (pestaña propia).
    const base = fourVenuesOrgUrl(locale);
    setFallbackHref(decorateFourvenuesUrl(safeEvent ? `${base}/events/${safeEvent}` : base));
  }, [locale]);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (!FV_ORIGINS.has(e.origin)) return;
      const data = (e.data ?? {}) as Record<string, unknown>;
      const child = iframeRef.current?.contentWindow;
      const respond = (payload: Record<string, unknown>) =>
        child?.postMessage(payload, e.origin);

      switch (data.key) {
        case "addHeight": {
          const raw = data.height;
          const px =
            typeof raw === "number" ? raw : parseInt(String(raw ?? ""), 10);
          if (Number.isFinite(px) && px > 200 && px < 20000) setHeight(px);
          return;
        }
        case "openUrl": {
          const url = typeof data.url === "string" ? data.url : "";
          if (!/^https:\/\//.test(url)) return;
          if (data.target === "_blank") window.open(url, "_blank", "noopener");
          else window.location.href = url;
          return;
        }
        case "currentUrl":
          respond({ key: "currentUrl", url: window.location.href });
          return;
        case "currentUrlCli":
          // Formato legacy: el hijo espera un string JSON con {location}.
          child?.postMessage(
            JSON.stringify({ location: window.location.href }),
            e.origin,
          );
          return;
        case "getFBC":
          respond({ key: "getFBC", value: fbcValue() });
          return;
        case "getFBP":
          respond({ key: "getFBP", value: readCookie("_fbp") });
          return;
        case "getTTP":
          respond({ key: "getTTP", value: readCookie("_ttp") });
          return;
        case "getTTCLID":
          respond({ key: "getTTCLID", value: ttclidValue() });
          return;
        case "getCampaignsTracking":
          respond({ key: "getCampaignsTracking", value: [] });
          return;
        case "getTrackeableLinksTracking":
          respond({ key: "getTrackeableLinksTracking", value: {} });
          return;
        case "setCookie": {
          // Cookie funcional de sesión de compra de FV (estrictamente necesaria).
          const v = typeof data.cookie === "string" ? data.cookie : "";
          if (/^[\w.-]{1,512}$/.test(v)) {
            document.cookie = `guest-token=${v}; path=/; max-age=31536000; SameSite=Lax; Secure`;
          }
          return;
        }
        case "track":
          // Deliberadamente NO reenviado a los píxeles: el Purchase se mide en
          // /gracias (una sola fuente, sin duplicados). Ver purchase-tracking.tsx.
          return;
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div className="noise-texture relative">
      <Navbar />
      <main id="contenido">
        <section className="relative overflow-hidden pt-28 pb-6 bg-[radial-gradient(ellipse_at_50%_0%,rgba(6,182,212,0.15)_0%,transparent_60%)]">
          <div className="mx-auto max-w-5xl px-6">
            <Link
              href={localizedPath("/outxide", locale)}
              className="link-underline inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("purchase.thanksBack")}
            </Link>
            <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-outxide/70">
                  {t("purchase.checkoutEyebrow")}
                </p>
                <h1 className="mt-2 font-display text-4xl md:text-5xl font-bold uppercase text-white">
                  {t("purchase.checkoutTitle")}
                </h1>
              </div>
              <p className="flex max-w-md items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4 shrink-0 text-outxide" aria-hidden />
                {t("purchase.checkoutNote")}
              </p>
            </div>
          </div>
        </section>

        <section className="relative z-20 pb-6">
          <div className="mx-auto max-w-5xl px-6">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
              {src && (
                <iframe
                  ref={iframeRef}
                  src={src}
                  title={t("purchase.checkoutIframeTitle")}
                  allow="payment"
                  scrolling="no"
                  className="block w-full"
                  style={{ height: `${height}px`, border: 0, overflow: "hidden" }}
                />
              )}
            </div>
            {/* Salida de emergencia SIEMPRE visible: si Cloudflare o el 3DS del
                banco no renderizan en el marco, la venta sigue viva aquí. */}
            <p className="mt-4 text-center">
              <a
                href={fallbackHref}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-white"
              >
                <ExternalLink className="h-4 w-4" aria-hidden />
                {t("purchase.checkoutFallback")}
              </a>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
