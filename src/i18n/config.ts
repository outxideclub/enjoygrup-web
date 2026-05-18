export const defaultLocale = "es";
export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const COOKIE_NAME = "ge_locale";
