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

/**
 * Placa de edad «+18 · Consumo responsable» (o «+21 · …» si el evento pide
 * otra edad). La taquilla es el segundo salto del tráfico de anuncios y la
 * política de Meta para alcohol pide el +18 y el consumo responsable visibles
 * también aquí, no solo en la landing. Sin edad en Fourvenues → 18.
 */
export function ageNotice(age: number, template: string): string {
  return fill(template, { age: Number.isFinite(age) && age > 0 ? age : 18 });
}

/**
 * 🍭 (U+1F36D) seguido o no de su selector de variación (U+FE0E/U+FE0F), con
 * los espacios de alrededor; varios seguidos cuentan como uno.
 */
const LOLLIPOP_RUN = /(?:\s*\u{1F36D}[\u{FE0E}\u{FE0F}]?)+\s*/gu;

/**
 * Quita el emoji 🍭 de un nombre de tarifa o de su «Incluye» (y el espacio que
 * sobra). Red de seguridad acordada con META ADS y el usuario: la taquilla es
 * el destino que sigue a un anuncio y no puede enseñar una golosina junto a
 * una tarifa con alcohol, y el panel de Fourvenues la usa en tarifas de muchas
 * noches. SOLO el emoji: palabras como «copa» o «chupito» no se tocan (el
 * nombre dice qué se compra y renombrar es decisión del dueño). Es pura
 * presentación: a Fourvenues solo viajan ids y slugs, nunca estos textos.
 */
export function withoutLollipop<T extends string | undefined>(text: T): T {
  if (typeof text !== "string" || !text.includes("\u{1F36D}")) return text;
  return text.replace(LOLLIPOP_RUN, " ").trim() as T;
}

/** "Techno / House" a partir de los géneros en minúscula de Fourvenues. */
export function formatGenres(genres: string[] | undefined): string {
  if (!Array.isArray(genres) || genres.length === 0) return "";
  return genres
    .filter((g) => typeof g === "string" && g.length > 0)
    .map((g) => g.charAt(0).toUpperCase() + g.slice(1))
    .join(" / ");
}
