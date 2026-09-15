"use client";

import { useCallback, useSyncExternalStore } from "react";
import { localizedPath, locales, type Locale } from "@/i18n/config";
import { TICKETS_HOST } from "@/lib/events";

// Mismo criterio que src/components/legal/cookie-banner.tsx: en la taquilla
// (entradas.grupoenjoy.es) los textos legales viven en www, así que el enlace
// va absoluto. Se lee window.location en cliente; en servidor se parte del
// origen de la petición para que el HTML ya salga correcto (sin parpadeo).
// Siempre con prefijo de idioma (/en/legal/…): la cookie de idioma es host-only
// y www renegociaría por Accept-Language; el texto legal debe salir en la
// lengua en que se presta la aceptación (art. 98.1 TRLGDCU).
const SITE_ORIGIN = "https://www.grupoenjoy.es";

// Sin suscripción: el host de la ventana no cambia en vida de la página.
const subscribe = () => () => {};

function hostnameOf(origin: string): string {
  try {
    return new URL(origin).hostname.toLowerCase();
  } catch {
    return "";
  }
}

function asLocale(locale: string | undefined): Locale {
  return locale && (locales as readonly string[]).includes(locale) ? (locale as Locale) : "es";
}

export function useLegalHref(origin: string, locale?: string): (path: string) => string {
  const serverOnTickets = hostnameOf(origin) === TICKETS_HOST;
  const onTickets = useSyncExternalStore(
    subscribe,
    () => window.location.hostname === TICKETS_HOST,
    () => serverOnTickets,
  );
  const loc = asLocale(locale);
  return useCallback(
    (path: string) => {
      const localized = localizedPath(path, loc);
      return onTickets ? `${SITE_ORIGIN}${localized}` : localized;
    },
    [onTickets, loc],
  );
}
