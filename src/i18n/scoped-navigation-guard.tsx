"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Compañero de src/i18n/scoped-dictionary.ts. El layout raíz NO se vuelve a
// renderizar en una navegación suave (<Link>, router.push): si la página de
// destino de un anuncio, que lleva el diccionario RECORTADO, saliera así a otra
// página, esa página heredaría el diccionario parcial y pintaría claves sin
// traducir. Mientras el diccionario es parcial, toda salida a otra ruta del
// sitio se hace con CARGA COMPLETA, que trae su diccionario entero.
//
// Solo se monta en las rutas recortadas (lo decide el layout raíz): el resto
// del sitio no lleva este componente y conserva su navegación suave tal cual.

/** Enlace interno a OTRA ruta que Next resolvería con navegación suave. */
function internalHrefToOtherPath(e: MouseEvent): string | null {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return null;
  const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
  if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return null;
  let url: URL;
  try {
    url = new URL(a.href, window.location.href);
  } catch {
    return null;
  }
  if (url.origin !== window.location.origin) return null;
  // Misma ruta (ancla, otra query): el diccionario sigue sirviendo.
  if (url.pathname === window.location.pathname) return null;
  return url.toString();
}

export function ScopedNavigationGuard() {
  const pathname = usePathname();
  const firstPath = useRef(pathname);

  useEffect(() => {
    // Fase de CAPTURA en document: corre antes que el onClick de <Link> (React
    // escucha en la raíz de la app) y, con preventDefault, Link ya no navega.
    const onClick = (e: MouseEvent) => {
      const href = internalHrefToOtherPath(e);
      if (!href) return;
      e.preventDefault();
      window.location.assign(href);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Red de seguridad: cualquier otra navegación suave (router.push…) recarga.
  useEffect(() => {
    if (pathname !== firstPath.current) window.location.reload();
  }, [pathname]);

  return null;
}
