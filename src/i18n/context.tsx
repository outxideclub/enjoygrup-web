"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { type Locale, defaultLocale, COOKIE_NAME, locales } from "./config";
import { es, type Dictionary } from "./dictionaries/es";
import { en } from "./dictionaries/en";
import { de } from "./dictionaries/de";
import { fr } from "./dictionaries/fr";
import { it } from "./dictionaries/it";

const dictionaries: Record<Locale, Dictionary> = { es, en, de, fr, it };

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function readCookieLocale(): Locale | null {
  if (typeof document === "undefined") return null;
  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`))
    ?.split("=")[1];
  return value && locales.includes(value as Locale) ? (value as Locale) : null;
}

function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return defaultLocale;
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const lang of languages) {
    const normalized = lang.toLowerCase();
    if (normalized.startsWith("es")) return "es";
    if (normalized.startsWith("en")) return "en";
    if (normalized.startsWith("de")) return "de";
    if (normalized.startsWith("fr")) return "fr";
    if (normalized.startsWith("it")) return "it";
  }
  return "en";
}

function getNestedValue(obj: unknown, path: string): string | undefined {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== "object") {
      return undefined;
    }
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === "string" ? current : undefined;
}

interface LocaleProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
}

export function LocaleProvider({ children, initialLocale }: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale ?? defaultLocale);

  useEffect(() => {
    const id = window.setTimeout(() => {
      const nextLocale = readCookieLocale() ?? detectBrowserLocale();
      if (nextLocale !== locale) {
        setLocaleState(nextLocale);
      }
      if (!readCookieLocale()) {
        document.cookie = `${COOKIE_NAME}=${nextLocale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
      }
    }, 0);
    return () => window.clearTimeout(id);
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    document.cookie = `${COOKIE_NAME}=${newLocale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
  }, []);

  const t = useCallback(
    (key: string): string => {
      const value = getNestedValue(dictionaries[locale], key);
      if (value !== undefined) return value;
      // Fallback to Spanish
      const fallback = getNestedValue(dictionaries[defaultLocale], key);
      return fallback ?? key;
    },
    [locale]
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): Locale {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return ctx.locale;
}

export function useSetLocale(): (locale: Locale) => void {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useSetLocale must be used within a LocaleProvider");
  }
  return ctx.setLocale;
}

export function useT(): (key: string) => string {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useT must be used within a LocaleProvider");
  }
  return ctx.t;
}
