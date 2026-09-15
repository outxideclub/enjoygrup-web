"use client";

import { DOCUMENT_TYPES, isDocumentNumber, isEmail, isPhone } from "@/lib/checkout/validation";
import type { FVField, FVQuestion } from "@/lib/fourvenues/types";
import { CheckField, SelectField, TextAreaField, TextField } from "./fields";

// Modelo y validación del formulario de datos (asistente, reserva, lista).
// Los campos vienen de `rate.fields[]` de Fourvenues; la validación usa las
// MISMAS reglas que las rutas de servidor (isEmail/isPhone) para que el
// cliente nunca deje pasar algo que el servidor vaya a rechazar.

export interface FormValues {
  /** Por slug de campo (full_name, email, email_confirm, phone, birthday…). */
  values: Record<string, string>;
  /** Por _id de pregunta. */
  answers: Record<string, string>;
}

/** Clave de traducción del error por campo (slug, "email_confirm" o "q:{id}"). */
export type FormErrors = Record<string, string>;

/** Prefijo por defecto del teléfono (público mayoritariamente español). */
export const PHONE_PREFIX = "+34 ";

export function emptyForm(): FormValues {
  return { values: { phone: PHONE_PREFIX }, answers: {} };
}

/** Campos mínimos cuando la tarifa no declara ninguno: sin email no hay entradas. */
export const DEFAULT_FIELDS: FVField[] = [
  { slug: "full_name", type: "text", required: true, label: "" },
  { slug: "email", type: "email", required: true, label: "" },
  { slug: "phone", type: "tel", required: false, label: "" },
];

/** Datos de contacto de una reserva VIP (todos obligatorios) + observaciones. */
export const BOOKING_FIELDS: FVField[] = [
  { slug: "full_name", type: "text", required: true, label: "" },
  { slug: "email", type: "email", required: true, label: "" },
  { slug: "phone", type: "tel", required: true, label: "" },
  { slug: "observations", type: "textarea", required: false, label: "" },
];

/** Datos de una inscripción en lista. */
export const LIST_FIELDS: FVField[] = [
  { slug: "full_name", type: "text", required: true, label: "" },
  { slug: "email", type: "email", required: true, label: "" },
];

export function effectiveFields(fields: FVField[] | undefined): FVField[] {
  return Array.isArray(fields) && fields.length > 0 ? fields : DEFAULT_FIELDS;
}

/** Un teléfono que solo trae el prefijo cuenta como vacío. */
export function phoneValue(raw: string): string {
  const v = raw.trim();
  return /^\+?\d{0,3}$/.test(v.replace(/\s+/g, "")) ? "" : v;
}

// Slugs con los que Fourvenues puede pedir el documento de identidad; en el
// cuerpo al servidor viajan siempre como personal_document_type/_number.
export const DOC_TYPE_SLUGS: ReadonlySet<string> = new Set(["personal_document_type", "document_type"]);
export const DOC_NUMBER_SLUGS: ReadonlySet<string> = new Set(["personal_document_number", "document_number", "dni"]);

const LABEL_KEY: Record<string, string> = {
  full_name: "checkout.fullName",
  email: "checkout.email",
  email_confirm: "checkout.emailConfirm",
  phone: "checkout.phone",
  birthday: "checkout.birthday",
  birthdate: "checkout.birthday",
  observations: "checkout.observations",
  personal_document_type: "checkout.documentType",
  document_type: "checkout.documentType",
  personal_document_number: "checkout.documentNumber",
  document_number: "checkout.documentNumber",
  dni: "checkout.documentNumber",
};

const DOC_TYPE_LABEL_KEY: Record<(typeof DOCUMENT_TYPES)[number], string> = {
  dni: "checkout.docDni",
  nie: "checkout.docNie",
  passport: "checkout.docPassport",
  other: "checkout.docOther",
};

/** Etiqueta traducida para los slugs conocidos; si no, la de Fourvenues. */
export function fieldLabel(field: FVField, t: (key: string) => string): string {
  const key = LABEL_KEY[field.slug];
  return key ? t(key) : field.label || field.slug;
}

function isEmpty(field: FVField, raw: string): boolean {
  const v = raw.trim();
  if (field.slug === "phone" || field.type === "tel") return phoneValue(v) === "";
  return v === "";
}

export function validateForm(
  form: FormValues,
  fields: FVField[],
  questions: FVQuestion[],
  // Confirmación de email: entradas y mesas la piden; la lista (contrato §5:
  // solo nombre y email) no.
  confirmEmail = true,
): FormErrors {
  const errors: FormErrors = {};
  for (const field of fields) {
    const raw = form.values[field.slug] ?? "";
    const empty = isEmpty(field, raw);
    if (field.required && empty) {
      errors[field.slug] = "checkout.required";
      continue;
    }
    if (empty) continue;
    const v = raw.trim();
    if (field.slug === "email" || field.type === "email") {
      if (!isEmail(v)) errors[field.slug] = "checkout.invalidEmail";
    } else if (field.slug === "phone" || field.type === "tel") {
      if (!isPhone(v)) errors[field.slug] = "checkout.invalidPhone";
    } else if (DOC_NUMBER_SLUGS.has(field.slug)) {
      if (!isDocumentNumber(v)) errors[field.slug] = "checkout.invalidDocument";
    }
  }

  // Confirmación de email: solo cuando el email existe y ya es válido.
  if (confirmEmail && fields.some((f) => f.slug === "email")) {
    const email = (form.values.email ?? "").trim();
    const confirm = (form.values.email_confirm ?? "").trim();
    if (email && !errors.email) {
      if (!confirm) errors.email_confirm = "checkout.required";
      else if (confirm.toLowerCase() !== email.toLowerCase()) errors.email_confirm = "checkout.emailMismatch";
    }
  }

  for (const q of questions) {
    if (q.required && !(form.answers[q._id] ?? "").trim()) errors[`q:${q._id}`] = "checkout.required";
  }
  return errors;
}

/**
 * Etiqueta del primer campo con error (para "Falta: …" en la barra). El orden
 * es el del formulario, no el del objeto de errores.
 */
export function firstErrorLabel(
  errors: FormErrors,
  fields: FVField[],
  questions: FVQuestion[],
  t: (key: string) => string,
): string | null {
  for (const field of fields) {
    if (errors[field.slug]) return fieldLabel(field, t);
    if (field.slug === "email" && errors.email_confirm) return t("checkout.emailConfirm");
  }
  for (const q of questions) {
    if (errors[`q:${q._id}`]) return q.label;
  }
  return null;
}

const AUTOCOMPLETE: Record<string, string> = {
  full_name: "name",
  email: "email",
  email_confirm: "email",
  phone: "tel",
  birthday: "bday",
  birthdate: "bday",
};

interface AttendeeFieldsProps {
  /** Prefijo de ids DOM (único por formulario). */
  idPrefix: string;
  fields: FVField[];
  questions: FVQuestion[];
  form: FormValues;
  errors: FormErrors;
  /** Claves tocadas (slug / q:id): solo entonces se muestra su error. */
  touched: Record<string, boolean>;
  onValue: (slug: string, value: string) => void;
  onAnswer: (questionId: string, value: string) => void;
  onBlur: (key: string) => void;
  t: (key: string) => string;
  /** Pinta la confirmación de email (por defecto sí; la lista no la lleva). */
  confirmEmail?: boolean;
}

/**
 * Pinta los campos de `rate.fields[]` (y las preguntas) con validación en vivo.
 * data-testid = `input-{slug}` (input-full_name, input-email, input-email-confirm,
 * input-phone, input-birthday, input-observations…).
 */
export function AttendeeFields({
  idPrefix,
  fields,
  questions,
  form,
  errors,
  touched,
  onValue,
  onAnswer,
  onBlur,
  t,
  confirmEmail = true,
}: AttendeeFieldsProps) {
  const errorFor = (key: string) => (touched[key] && errors[key] ? t(errors[key]) : undefined);

  return (
    <div className="space-y-4">
      {fields.map((field) => {
        const slug = field.slug;
        const id = `${idPrefix}-${slug}`;
        const testId = `input-${slug}`;
        const common = {
          id,
          testId,
          label: fieldLabel(field, t),
          value: form.values[slug] ?? "",
          onChange: (v: string) => onValue(slug, v),
          onBlur: () => onBlur(slug),
          error: errorFor(slug),
          required: field.required,
        };

        if (field.type === "textarea" || slug === "observations") {
          return <TextAreaField key={slug} {...common} maxLength={500} />;
        }
        if (DOC_TYPE_SLUGS.has(slug)) {
          // Tipo de documento: lista cerrada (dni/nie/passport/other), como la API.
          return (
            <SelectField
              key={slug}
              {...common}
              options={DOCUMENT_TYPES.map((d) => ({ value: d, label: t(DOC_TYPE_LABEL_KEY[d]) }))}
            />
          );
        }
        if (DOC_NUMBER_SLUGS.has(slug)) {
          return <TextField key={slug} {...common} maxLength={32} autoComplete="off" />;
        }
        if (field.type === "dropdown" && Array.isArray(field.items)) {
          return (
            <SelectField
              key={slug}
              {...common}
              options={field.items.map((item) => ({ value: item, label: item }))}
            />
          );
        }
        if (slug === "email" || field.type === "email") {
          if (!confirmEmail) {
            return <TextField key={slug} {...common} type="email" autoComplete="email" inputMode="email" />;
          }
          const confirmId = `${idPrefix}-email_confirm`;
          return (
            <div key={slug} className="space-y-4">
              <TextField {...common} type="email" autoComplete="email" inputMode="email" />
              <TextField
                id={confirmId}
                testId="input-email-confirm"
                label={t("checkout.emailConfirm")}
                value={form.values.email_confirm ?? ""}
                onChange={(v) => onValue("email_confirm", v)}
                onBlur={() => onBlur("email_confirm")}
                error={errorFor("email_confirm")}
                required={field.required}
                type="email"
                autoComplete="email"
                inputMode="email"
              />
            </div>
          );
        }
        if (slug === "phone" || field.type === "tel") {
          return <TextField key={slug} {...common} type="tel" autoComplete="tel" inputMode="tel" />;
        }
        if (slug === "birthday" || slug === "birthdate" || field.type === "date") {
          return <TextField key={slug} {...common} type="date" autoComplete={AUTOCOMPLETE[slug]} />;
        }
        return <TextField key={slug} {...common} autoComplete={AUTOCOMPLETE[slug]} />;
      })}

      {questions.map((q) => {
        const key = `q:${q._id}`;
        const id = `${idPrefix}-q-${q._id}`;
        const testId = `question-${q._id}`;
        const value = form.answers[q._id] ?? "";
        if (q.type === "checkbox") {
          return (
            <CheckField
              key={q._id}
              id={id}
              testId={testId}
              label={q.label}
              checked={value === "true"}
              onChange={(c) => onAnswer(q._id, c ? "true" : "")}
              onBlur={() => onBlur(key)}
              required={q.required}
              error={errorFor(key)}
            />
          );
        }
        if (q.type === "dropdown" && Array.isArray(q.items)) {
          return (
            <SelectField
              key={q._id}
              id={id}
              testId={testId}
              label={q.label}
              value={value}
              onChange={(v) => onAnswer(q._id, v)}
              onBlur={() => onBlur(key)}
              options={q.items.map((item) => ({ value: item, label: item }))}
              error={errorFor(key)}
              required={q.required}
            />
          );
        }
        return (
          <TextField
            key={q._id}
            id={id}
            testId={testId}
            label={q.label}
            value={value}
            onChange={(v) => onAnswer(q._id, v)}
            onBlur={() => onBlur(key)}
            error={errorFor(key)}
            required={q.required}
          />
        );
      })}
    </div>
  );
}
