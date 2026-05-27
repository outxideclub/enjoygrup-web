"use client";

import { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import { useLocale, useSetLocale } from "@/i18n";
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
  const setLocale = useSetLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300"
        aria-label={`Language: ${languageNames[locale]}. Click to change.`}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Globe size={14} className="opacity-70" />
        <span className="uppercase tracking-wide">{languageLabels[locale]}</span>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Select language"
          className="absolute right-0 top-full mt-2 min-w-[140px] rounded-xl bg-black/90 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {localeOrder.map((loc) => (
            <button
              key={loc}
              role="option"
              aria-selected={locale === loc}
              onClick={() => {
                setLocale(loc);
                setOpen(false);
              }}
              className={`flex items-center gap-3 w-full px-3.5 py-2.5 text-left text-sm transition-colors duration-150 ${
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
