"use client";

import { useEffect } from "react";
import { captureCampaignParams, decorateFourvenuesUrl } from "@/lib/campaign-params";

/**
 * Interceptor global que añade los parámetros de campaña (fbclid, utm_*…) a
 * TODOS los enlaces hacia Fourvenues justo antes de usarse: página del club,
 * tarjetas de evento, botón de mesa VIP, agenda y enlaces dentro del blog.
 * Un solo punto en el layout raíz cubre cualquier CTA presente o futuro sin
 * tocar cada call-site (TAREA-VENTA-EN-WEB §1).
 *
 * Se reescribe el href en `pointerdown` (cubre botón izquierdo, central y
 * derecho antes de que el navegador lo use) y en `click` (cubre teclado).
 */
export function CampaignLinkTracker() {
  useEffect(() => {
    captureCampaignParams();

    const rewrite = (e: Event) => {
      const target = e.target as Element | null;
      const a = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href");
      if (!href || !(href.includes("fourvenues.com") || href.includes("entradas.grupoenjoy.es"))) return;
      // Recaptura por si hubo navegación suave con nuevos parámetros en la URL.
      captureCampaignParams();
      const decorated = decorateFourvenuesUrl(a.href);
      if (decorated !== a.href) a.href = decorated;
    };

    document.addEventListener("pointerdown", rewrite, true);
    document.addEventListener("click", rewrite, true);
    return () => {
      document.removeEventListener("pointerdown", rewrite, true);
      document.removeEventListener("click", rewrite, true);
    };
  }, []);

  return null;
}
