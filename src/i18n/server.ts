import { cookies } from "next/headers";
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

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get(COOKIE_NAME);
  const value = localeCookie?.value;
  if (value && locales.includes(value as Locale)) {
    return value as Locale;
  }
  return defaultLocale;
}

export function getServerT(locale: Locale): (key: string) => string {
  return (key: string): string => {
    const value = getNestedValue(dictionaries[locale], key);
    if (value !== undefined) return value;
    const fallback = getNestedValue(dictionaries[defaultLocale], key);
    return fallback ?? key;
  };
}
