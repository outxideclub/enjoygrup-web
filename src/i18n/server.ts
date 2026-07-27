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

export async function getServerLocale(): Promise<Locale> {
  const headerStore = await headers();
  // 1º: idioma fijado por la RUTA (/de/... → x-locale, lo pone el middleware).
  // Manda sobre la cookie: una URL /de/enjoy debe renderizar SIEMPRE en alemán
  // (es lo que la hace indexable y compartible).
  const forced = headerStore.get("x-locale");
  if (forced && locales.includes(forced as Locale)) {
    return forced as Locale;
  }
  // 2º: preferencia guardada en cookie (rutas no cubiertas por la redirección
  // del middleware, p. ej. la landing de confirmación del newsletter).
  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value;
  if (value && locales.includes(value as Locale)) {
    return value as Locale;
  }
  // 3º: español. La negociación por Accept-Language vive en el middleware, que
  // REDIRIGE a la URL del idioma en vez de variar el contenido de la URL es
  // (así cada URL indexable sirve siempre el mismo idioma).
  return defaultLocale;
}

/** Diccionario completo de un idioma (para pasarlo al LocaleProvider cliente). */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export function getServerT(locale: Locale): (key: string) => string {
  return (key: string): string => {
    const value = getNestedValue(dictionaries[locale], key);
    if (value !== undefined) return value;
    const fallback = getNestedValue(dictionaries[defaultLocale], key);
    return fallback ?? key;
  };
}
