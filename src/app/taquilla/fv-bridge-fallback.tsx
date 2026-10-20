"use client";

import { useEffect } from "react";
import { FV_BRIDGE_SCRIPT, FV_IFRAME_ID, FV_IFRAME_SRC_SCRIPT } from "./fv-bridge";

// Red de seguridad: los <script> inline del servidor solo se ejecutan en carga
// completa del documento. Si algún día se llegase a /taquilla por navegación
// suave (un <Link> interno), React insertaría esos scripts SIN ejecutarlos y el
// marco quedaría sin src y sin puente (venta muerta). Este efecto los inyecta
// como scripts reales si no han corrido; en carga normal no hace nada.
//
// Hidratación fallida (20-oct-2026): si el HTML del servidor no coincide con el
// del cliente (una extensión que cambia un texto antes de que React hidrate, o
// el servidor de desarrollo con carga), React REGENERA el árbol en cliente: el
// <iframe> del servidor, al que el script inline ya había puesto el src, se
// cambia por uno nuevo que solo lleva data-src. El puente sí corrió
// (window.__fvBridge) y busca el marco por id en cada mensaje, así que sigue
// valiendo; lo que falta es el src. Por eso el src se comprueba aparte del
// puente: si el marco que hay ahora no lo tiene, se vuelve a lanzar su script
// (que no hace nada si el src ya está y nunca lo pone dos veces).
// e2e/checkout-embed.spec.ts lo prueba provocando el fallo de hidratación.
export function FvBridgeFallback() {
  useEffect(() => {
    const run = (code: string) => {
      const s = document.createElement("script");
      s.textContent = code;
      document.body.appendChild(s);
      s.remove();
    };
    if (!(window as Window & { __fvBridge?: number }).__fvBridge) run(FV_BRIDGE_SCRIPT);
    if (!document.getElementById(FV_IFRAME_ID)?.getAttribute("src")) run(FV_IFRAME_SRC_SCRIPT);
  }, []);
  return null;
}
