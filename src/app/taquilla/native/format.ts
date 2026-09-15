// Utilidades de texto del checkout propio: interpolación de las claves
// checkout.* ({n}, {fee}, {total}, {what}…) y porcentajes en el idioma del
// visitante. Sin dependencias de servidor.
import { localeMap } from "@/lib/events";

/** Sustituye cada `{clave}` de la plantilla por su valor (CHECKOUT-PROPIO.md §6). */
export function fill(template: string, vars: Record<string, string | number>): string {
  let out = template;
  for (const [key, value] of Object.entries(vars)) {
    // Función de reemplazo: un valor con "$" no se interpreta como patrón.
    out = out.replace(`{${key}}`, () => String(value));
  }
  return out;
}

/** "7,7 %" (es) / "7.7 %" (en): para los gastos porcentuales de las mesas. */
export function formatPercent(n: number, locale: string): string {
  const tag = localeMap[locale] ?? "es-ES";
  const amount = Number.isFinite(n) ? n : 0;
  return `${new Intl.NumberFormat(tag, { maximumFractionDigits: 2 }).format(amount)} %`;
}

/** "Techno / House" a partir de los géneros en minúscula de Fourvenues. */
export function formatGenres(genres: string[] | undefined): string {
  if (!Array.isArray(genres) || genres.length === 0) return "";
  return genres
    .filter((g) => typeof g === "string" && g.length > 0)
    .map((g) => g.charAt(0).toUpperCase() + g.slice(1))
    .join(" / ");
}
