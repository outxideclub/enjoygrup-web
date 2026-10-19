"use client";

import { useEffect } from "react";
import { useLocale, useT } from "@/i18n";
import { localizedPath } from "@/i18n/config";

// Límite de error PROPIO de la landing. El de la raíz (src/app/error.tsx) pinta
// el menú y el pie generales del sitio: aquí rompería «solo este evento» y,
// además, pediría claves que el diccionario recortado de esta ruta no lleva
// (ver src/i18n/scoped-dictionary.ts). Solo usa error.* y outxidious.*.
export default function OutxidiousError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useT();
  const locale = useLocale();

  useEffect(() => {
    console.error("Render error:", error);
  }, [error]);

  return (
    <main id="contenido" className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-6">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-2xl font-bold text-white">{t("error.title")}</h1>
        <p className="mb-10 leading-relaxed text-white/70">{t("error.description")}</p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="min-h-[44px] rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/90"
          >
            {t("error.retry")}
          </button>
          {/* <a> normal: carga completa, la página del club trae su diccionario entero. */}
          <a
            href={localizedPath("/outxide", locale)}
            className="min-h-[44px] rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            {t("outxidious.backToClub")}
          </a>
        </div>
      </div>
    </main>
  );
}
