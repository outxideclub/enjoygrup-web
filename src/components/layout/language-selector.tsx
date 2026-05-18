"use client";

import { Globe } from "lucide-react";
import { useLocale, useSetLocale } from "@/i18n";
import type { Locale } from "@/i18n";

export function LanguageSelector() {
  const locale = useLocale();
  const setLocale = useSetLocale();

  const toggle = () => {
    const next: Locale = locale === "es" ? "en" : "es";
    setLocale(next);
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 backdrop-blur-sm transition-all duration-300"
      aria-label={`Switch language to ${locale === "es" ? "English" : "Spanish"}`}
    >
      <Globe size={14} className="opacity-70" />
      <span className="uppercase tracking-wide">{locale}</span>
    </button>
  );
}
