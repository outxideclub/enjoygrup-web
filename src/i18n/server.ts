import { cookies, headers } from "next/headers";
import { type Locale, defaultLocale, COOKIE_NAME, locales } from "./config";
import { es, type Dictionary } from "./dictionaries/es";
import { en } from "./dictionaries/en";
import { de } from "./dictionaries/de";
import { fr } from "./dictionaries/fr";
import { it } from "./dictionaries/it";

const dictionaries: Record<Locale, Dictionary> = { es, en, de, fr, it };

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

/** Negocia el idioma con la cabecera Accept-Language del navegador. */
function negotiateFromHeader(acceptLanguage: string | null): Locale | null {
  if (!acceptLanguage) return null;
  // "de-DE,de;q=0.9,en;q=0.8" → ["de-de", "de", "en"] respetando el orden/q
  const requested = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .filter((x) => !Number.isNaN(x.q))
    .sort((a, b) => b.q - a.q);
  for (const { tag } of requested) {
    const base = tag.split("-")[0];
    if (locales.includes(base as Locale)) return base as Locale;
  }
  return null;
}

export async function getServerLocale(): Promise<Locale> {
  const headerStore = await headers();
  // 1º: idioma fijado por la RUTA (/de/... → x-locale, lo pone el middleware).
  // Manda sobre la cookie: una URL /de/enjoy debe renderizar SIEMPRE en alemán
  // (es lo que la hace indexable y compartible).
  const forced = headerStore.get("x-locale");
  if (forced && locales.includes(forced as Locale)) {
    return forced as Locale;
  }
  // 2º: preferencia guardada en cookie.
  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value;
  if (value && locales.includes(value as Locale)) {
    return value as Locale;
  }
  // 3º: primera visita sin cookie → idioma del navegador (Accept-Language).
  return negotiateFromHeader(headerStore.get("accept-language")) ?? defaultLocale;
}

export function getServerT(locale: Locale): (key: string) => string {
  return (key: string): string => {
    const value = getNestedValue(dictionaries[locale], key);
    if (value !== undefined) return value;
    const fallback = getNestedValue(dictionaries[defaultLocale], key);
    return fallback ?? key;
  };
}
