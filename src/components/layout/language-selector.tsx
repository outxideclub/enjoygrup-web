"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { useLocale, useT } from "@/i18n";
import { localeFromPath, localizedPath, COOKIE_NAME } from "@/i18n/config";
import type { Locale } from "@/i18n";

const languageLabels: Record<Locale, string> = {
  es: "ES",
  en: "EN",
  de: "DE",
  fr: "FR",
  it: "IT",
};

const languageNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
};

const localeOrder: Locale[] = ["es", "en", "de", "fr", "it"];

export function LanguageSelector() {
  const locale = useLocale();
  const t = useT();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Cambiar de idioma navega a la URL propia de ese idioma (/de/..., /en/...)
  // con NAVEGACIÓN COMPLETA: el diccionario viaja como prop del root layout y
  // los layouts no se re-renderizan en navegación suave, así que un router.push
  // dejaría los textos (y metadatos/JSON-LD) en el idioma anterior. La cookie
  // se fija antes vía setLocale para que el middleware no re-redirija.
  const changeLocale = (loc: Locale) => {
    setOpen(false);
    // Solo cookie + navegación completa: mutar el estado React (locale/html
    // lang) antes de navegar dejaría un instante la UI con el idioma nuevo
    // pero el diccionario viejo. El render fresco del servidor lo trae todo.
    document.cookie = `${COOKIE_NAME}=${loc};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
    const { basePath } = localeFromPath(pathname || "/");
    window.location.assign(localizedPath(basePath, loc));
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-[36px] items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"
        aria-label={`${t("common.language")} (${languageNames[locale]})`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <Globe size={14} className="opacity-70" />
        <span className="uppercase tracking-wide">{languageLabels[locale]}</span>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 min-w-[140px] rounded-xl bg-black/90 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {localeOrder.map((loc) => (
            <button
              key={loc}
              type="button"
              aria-current={locale === loc ? "true" : undefined}
              onClick={() => changeLocale(loc)}
              className={`flex items-center gap-3 w-full px-3.5 py-2.5 text-left text-sm transition-colors duration-150 focus-visible:outline focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-white/40 ${
                locale === loc
                  ? "text-white bg-white/10"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              <span className="font-semibold uppercase tracking-wider text-xs w-6">
                {languageLabels[loc]}
              </span>
              <span className="text-white/50 text-xs">{languageNames[loc]}</span>
              {locale === loc && (
                <span className="ml-auto text-white/40 text-xs">&#10003;</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
