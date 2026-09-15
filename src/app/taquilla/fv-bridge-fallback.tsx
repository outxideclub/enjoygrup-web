"use client";

import { useEffect } from "react";
import { FV_BRIDGE_SCRIPT, FV_IFRAME_SRC_SCRIPT } from "./fv-bridge";

// Red de seguridad: los <script> inline del servidor solo se ejecutan en carga
// completa del documento. Si algún día se llegase a /taquilla por navegación
// suave (un <Link> interno), React insertaría esos scripts SIN ejecutarlos y el
// marco quedaría sin src y sin puente (venta muerta). Este efecto los inyecta
// como scripts reales si no han corrido; en carga normal no hace nada.
export function FvBridgeFallback() {
  useEffect(() => {
    if ((window as Window & { __fvBridge?: number }).__fvBridge) return;
    for (const code of [FV_BRIDGE_SCRIPT, FV_IFRAME_SRC_SCRIPT]) {
      const s = document.createElement("script");
      s.textContent = code;
      document.body.appendChild(s);
      s.remove();
    }
  }, []);
  return null;
}
