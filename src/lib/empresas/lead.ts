// Reglas de la solicitud de CELEBRACIÓN DE EMPRESA (formulario de /empresas).
//
// PURO y sin dependencias de servidor: el formulario (cliente) y la ruta
// /api/empresas (servidor) validan con ESTA misma función, así el usuario ve
// en vivo exactamente lo que el servidor rechazaría. El servidor no se fía del
// cliente: vuelve a validarlo todo (tipos estrictos, longitudes, formatos).

import { isEmail, isPhone, sanitizeText } from "@/lib/checkout/validation";

/** Formatos de celebración (valores del <select>, estables para el correo). */
export const LEAD_FORMATS = ["after_dinner", "lunch_afternoon_night", "undecided"] as const;
export type LeadFormat = (typeof LEAD_FORMATS)[number];

/** «¿Cómo nos conocisteis?» — mide la campaña de empresas (PLAN.md §7). */
export const LEAD_SOURCES = ["instagram", "facebook", "google", "referral", "already_knew", "other"] as const;
export type LeadSource = (typeof LEAD_SOURCES)[number];

export const LEAD_LIMITS = {
  company: 120,
  name: 100,
  email: 254,
  phone: 20,
  comments: 1000,
  /** Máximo razonable de personas: más que eso no es un formulario, es una llamada. */
  peopleMax: 500,
  /** Fechas más allá de dos años son casi seguro un error de tecleo. */
  maxDaysAhead: 730,
} as const;

export type LeadField =
  | "company"
  | "name"
  | "phone"
  | "email"
  | "date"
  | "people"
  | "format"
  | "source"
  | "comments";

/** Orden visual del formulario: el foco va al PRIMER campo con error. */
export const LEAD_FIELD_ORDER: readonly LeadField[] = [
  "company",
  "name",
  "phone",
  "email",
  "date",
  "people",
  "format",
  "source",
  "comments",
];

export type LeadErrorCode = "required" | "invalid" | "too_long" | "out_of_range";

export interface Lead {
  company: string;
  name: string;
  phone: string;
  email: string;
  /** YYYY-MM-DD */
  date: string;
  people: number;
  format: LeadFormat;
  source: LeadSource;
  /** "" si no hay comentarios. */
  comments: string;
}

export type LeadErrors = Partial<Record<LeadField, LeadErrorCode>>;

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Fecha YYYY-MM-DD válida en calendario (rechaza 2026-02-30). */
export function isIsoDate(value: string): boolean {
  if (!DATE_RE.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}

/** Suma días a una fecha YYYY-MM-DD (aritmética en UTC: sin saltos de horario). */
export function addDaysIso(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/**
 * Hoy como YYYY-MM-DD. Sin `timeZone`, en la zona del navegador (el `min` del
 * input date); en servidor se pasa "Europe/Madrid" (la fecha del local).
 */
export function todayIso(timeZone?: string, now: Date = new Date()): string {
  // Por partes y no con `format()` de en-CA: el patrón de fecha de un locale
  // puede cambiar con la versión de ICU del navegador (ya pasó con en-CA) y un
  // `min` mal formado dejaría el input date sin límite o rechazaría todo.
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")}`;
}

function codePoints(s: string): number {
  return Array.from(s).length;
}

/**
 * Comentario multilínea limpio: conserva los saltos de línea (quien organiza
 * suele escribir varias líneas) pero quita caracteres de control/invisibles,
 * espacios sobrantes y más de una línea en blanco seguida.
 */
export function cleanMultiline(s: string): string {
  return s
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => sanitizeText(line, LEAD_LIMITS.comments))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function requiredText(raw: unknown, max: number): { value: string } | { error: LeadErrorCode } {
  if (typeof raw !== "string") return { error: raw === undefined || raw === null ? "required" : "invalid" };
  // La longitud se mide ANTES de sanear: rechazar es más honesto que recortar
  // en silencio lo que la persona escribió.
  if (codePoints(raw) > max) return { error: "too_long" };
  const value = sanitizeText(raw, max);
  return value.length > 0 ? { value } : { error: "required" };
}

export interface ValidateOptions {
  /** Primera fecha admitida (YYYY-MM-DD). */
  minDate: string;
  /** Última fecha admitida (YYYY-MM-DD). */
  maxDate: string;
}

/**
 * Valida los campos de la solicitud. Tipos ESTRICTOS: `people` debe ser un
 * número entero (ni "5" ni 5.5), los selects solo admiten sus valores y los
 * textos se rechazan si exceden el máximo. Devuelve el objeto limpio solo si
 * no hay ningún error.
 */
export function validateLead(
  raw: Record<string, unknown>,
  { minDate, maxDate }: ValidateOptions,
): { lead: Lead | null; errors: LeadErrors } {
  const errors: LeadErrors = {};
  const out: Partial<Lead> = {};

  const company = requiredText(raw.company, LEAD_LIMITS.company);
  if ("error" in company) errors.company = company.error;
  else out.company = company.value;

  const name = requiredText(raw.name, LEAD_LIMITS.name);
  if ("error" in name) errors.name = name.error;
  else out.name = name.value;

  const phone = requiredText(raw.phone, LEAD_LIMITS.phone + 10);
  if ("error" in phone) errors.phone = phone.error;
  else if (!isPhone(phone.value)) errors.phone = "invalid";
  else out.phone = phone.value;

  const email = requiredText(raw.email, LEAD_LIMITS.email);
  if ("error" in email) errors.email = email.error;
  else if (!isEmail(email.value) || /\s/.test(email.value)) errors.email = "invalid";
  else out.email = email.value;

  const date = raw.date;
  if (date === undefined || date === null || date === "") errors.date = "required";
  else if (typeof date !== "string" || !isIsoDate(date)) errors.date = "invalid";
  else if (date < minDate || date > maxDate) errors.date = "out_of_range";
  else out.date = date;

  const people = raw.people;
  if (people === undefined || people === null || people === "") errors.people = "required";
  else if (typeof people !== "number" || !Number.isInteger(people)) errors.people = "invalid";
  else if (people < 1 || people > LEAD_LIMITS.peopleMax) errors.people = "out_of_range";
  else out.people = people;

  const format = raw.format;
  if (format === undefined || format === null || format === "") errors.format = "required";
  else if (typeof format !== "string" || !(LEAD_FORMATS as readonly string[]).includes(format)) errors.format = "invalid";
  else out.format = format as LeadFormat;

  const source = raw.source;
  if (source === undefined || source === null || source === "") errors.source = "required";
  else if (typeof source !== "string" || !(LEAD_SOURCES as readonly string[]).includes(source)) errors.source = "invalid";
  else out.source = source as LeadSource;

  const comments = raw.comments;
  if (comments === undefined || comments === null || comments === "") out.comments = "";
  else if (typeof comments !== "string") errors.comments = "invalid";
  else if (codePoints(comments) > LEAD_LIMITS.comments) errors.comments = "too_long";
  else out.comments = cleanMultiline(comments);

  const ok = Object.keys(errors).length === 0;
  return { lead: ok ? (out as Lead) : null, errors };
}
