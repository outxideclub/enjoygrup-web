"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AlertCircle, CheckCircle2, ExternalLink, Loader2, MessageCircle, Phone, Send } from "lucide-react";
import { useLocale, useT } from "@/i18n";
import { localizedPath } from "@/i18n/config";
import { CAMPAIGN_KEYS, getStoredCampaignParams } from "@/lib/campaign-params";
import {
  LEAD_FIELD_ORDER,
  LEAD_FORMATS,
  LEAD_LIMITS,
  LEAD_SOURCES,
  addDaysIso,
  todayIso,
  validateLead,
  type LeadErrorCode,
  type LeadErrors,
  type LeadField,
  type LeadFormat,
  type LeadSource,
} from "@/lib/empresas/lead";
import { siteContact, telHref } from "@/lib/site";
import type { EmpresasFormCopy, EmpresasFormCopyKey } from "@/lib/empresas/content";
import { cn } from "@/lib/utils";

// Formulario de solicitud de /empresas. Accesible a propósito (WCAG 2.2):
// etiqueta visible en cada campo, error con TEXTO (no solo color) enlazado con
// aria-describedby, resumen anunciado y foco al PRIMER campo con error. La
// validación es la misma función que usa el servidor (src/lib/empresas/lead.ts).
//
// Textos: `copy` trae, ya resueltos en el servidor, los del paquete creativo
// (CREATIVO-LANDING-EMPRESAS.md §4.8) para el idioma de la página; lo que no
// venga en `copy` sale del diccionario (textos neutros, y en DE/FR/IT todos).
// Marcadores de posición y ayudas SOLO existen en el paquete: sin `copy`, no
// se pintan. La casilla y la información de privacidad son siempre las del
// diccionario (versión legal de la web, no la del paquete).

type Values = Record<LeadField, string>;
type FormErrors = LeadErrors & { consent?: true };
type Status = "idle" | "sending" | "success" | "unavailable" | "rate_limited" | "error";

const EMPTY: Values = {
  company: "",
  name: "",
  phone: "",
  email: "",
  date: "",
  people: "",
  format: "",
  source: "",
  comments: "",
};

const FORMAT_LABEL: Record<LeadFormat, EmpresasFormCopyKey> = {
  after_dinner: "formatAfterDinner",
  lunch_afternoon_night: "formatLunch",
  undecided: "formatUndecided",
};

const SOURCE_LABEL: Record<LeadSource, EmpresasFormCopyKey> = {
  instagram: "sourceInstagram",
  facebook: "sourceFacebook",
  google: "sourceGoogle",
  referral: "sourceReferral",
  already_knew: "sourceAlreadyKnew",
  other: "sourceOther",
};

/** Ayuda bajo el campo (solo con texto del paquete). */
const HELP_KEY: Partial<Record<LeadField, EmpresasFormCopyKey>> = {
  name: "helpName",
  phone: "helpPhone",
  date: "helpDate",
  people: "helpPeople",
};

/** Marcador de posición (solo con texto del paquete). */
const PLACEHOLDER_KEY: Partial<Record<LeadField, EmpresasFormCopyKey>> = {
  company: "phCompany",
  name: "phName",
  email: "phEmail",
  comments: "phComments",
};

const fieldId = (f: LeadField | "consent") => `empresas-${f}`;

/**
 * Texto del paquete para un error, si lo trae: el obligatorio de cada campo y
 * los de teléfono, correo y listas. Los demás (fecha pasada, rango de
 * personas, longitud) siguen con el texto neutro, más concreto.
 */
function copyErrorKey(field: LeadField, code: LeadErrorCode): EmpresasFormCopyKey | null {
  switch (field) {
    case "company":
      return code === "required" ? "errCompany" : null;
    case "name":
      return code === "required" ? "errName" : null;
    case "phone":
      return code === "required" || code === "invalid" ? "errPhone" : null;
    case "email":
      return code === "required" || code === "invalid" ? "errEmail" : null;
    case "date":
      return code === "required" ? "errDateRequired" : null;
    case "people":
      return code === "required" ? "errPeopleRequired" : null;
    case "format":
    case "source":
      return "errSelect";
    default:
      return null;
  }
}

/** Clave del diccionario con el texto de error de cada campo y código. */
function errorKey(field: LeadField, code: LeadErrorCode): string {
  switch (field) {
    case "phone":
      return code === "required" ? "empresas.errRequired" : "empresas.errPhone";
    case "email":
      return code === "required" ? "empresas.errRequired" : "empresas.errEmail";
    case "date":
      if (code === "required") return "empresas.errRequired";
      return code === "out_of_range" ? "empresas.errDate" : "empresas.errDateInvalid";
    case "people":
      return code === "required" ? "empresas.errRequired" : "empresas.errPeople";
    case "format":
    case "source":
      return "empresas.errSelect";
    case "comments":
      return "empresas.errComments";
    default:
      return code === "too_long" ? "empresas.errTooLong" : "empresas.errRequired";
  }
}

/**
 * Campaña de la visita: lo que CampaignLinkTracker guardó en la sesión al
 * aterrizar (getStoredCampaignParams, solo lectura) y, como respaldo, lo que
 * traiga la URL actual (sessionStorage puede estar bloqueado o vacío si el
 * visitante abrió la página en una pestaña nueva). Lo guardado manda: es la
 * campaña con la que aterrizó, la URL solo rellena huecos.
 */
function collectCampaign(): Record<string, string> {
  const fromUrl: Record<string, string> = {};
  try {
    const qs = new URLSearchParams(window.location.search);
    for (const k of CAMPAIGN_KEYS) {
      const v = qs.get(k);
      if (v) fromUrl[k] = v;
    }
  } catch {
    // URL ilegible: sin respaldo, no se rompe el envío.
  }
  return { ...fromUrl, ...getStoredCampaignParams() };
}

/** `people` como número solo si son dígitos; si no, se pasa tal cual y la validación lo rechaza. */
function toPayloadPeople(raw: string): number | string {
  const s = raw.trim();
  return /^\d{1,4}$/.test(s) ? Number(s) : s;
}

function whatsappHref(number: string): string | null {
  const digits = number.replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : null;
}

// Campos con los tokens del paquete (empresas.css): borde #737373 (≥ 3:1 sobre
// el fondo del campo), foco rosa y, con aria-invalid, borde rojo.
const INPUT = "emp-field";

export function EmpresasForm({ copy = {} }: { copy?: EmpresasFormCopy }) {
  const t = useT();
  const locale = useLocale();
  /** Texto del paquete o, si no viene, el del diccionario (`empresas.<clave>`). */
  const tx = (key: EmpresasFormCopyKey) => copy[key] ?? t(`empresas.${key}`);
  const [values, setValues] = useState<Values>(EMPTY);
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSummary, setShowSummary] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  // El `min` del input date se calcula en el navegador tras montar (en el HTML
  // de servidor no hay "hoy" fiable del visitante y daría error de hidratación).
  const [range, setRange] = useState<{ min: string; max: string } | null>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const today = todayIso();
    setRange({ min: today, max: addDaysIso(today, LEAD_LIMITS.maxDaysAhead) });
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
    if (status === "unavailable" || status === "rate_limited" || status === "error") alertRef.current?.focus();
  }, [status]);

  const sending = status === "sending";

  function validate(v: Values, c: boolean) {
    const today = todayIso();
    const { lead, errors: fieldErrors } = validateLead(
      { ...v, people: toPayloadPeople(v.people) },
      { minDate: today, maxDate: addDaysIso(today, LEAD_LIMITS.maxDaysAhead) },
    );
    const all: FormErrors = { ...fieldErrors };
    if (!c) all.consent = true;
    return { lead, errors: all };
  }

  function focusFirstError(errs: FormErrors) {
    const first = LEAD_FIELD_ORDER.find((f) => errs[f]);
    const id = first ? fieldId(first) : errs.consent ? fieldId("consent") : null;
    if (id) document.getElementById(id)?.focus();
  }

  function update(field: LeadField, value: string) {
    const next = { ...values, [field]: value };
    setValues(next);
    if (status !== "idle" && status !== "sending") setStatus("idle");
    // Tras un intento de envío, el error de ESTE campo se recalcula en vivo
    // (desaparece en cuanto se corrige, sin esperar a otro envío).
    if (errors[field]) {
      const fresh = validate(next, consent).errors;
      setErrors((prev) => ({ ...prev, [field]: fresh[field] }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (sending) return;
    const { lead, errors: errs } = validate(values, consent);
    if (!lead || errs.consent) {
      setErrors(errs);
      setShowSummary(true);
      focusFirstError(errs);
      return;
    }
    setErrors({});
    setShowSummary(false);
    setStatus("sending");
    try {
      const res = await fetch("/api/empresas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...lead,
          consent: true,
          website,
          campaign: collectCampaign(),
          page: window.location.pathname,
          locale,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setValues(EMPTY);
        setConsent(false);
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string; fields?: unknown };
      if (res.status === 503) return setStatus("unavailable");
      if (res.status === 429) return setStatus("rate_limited");
      if (data.error === "consent_required") {
        const errs2: FormErrors = { consent: true };
        setErrors(errs2);
        setShowSummary(true);
        setStatus("idle");
        focusFirstError(errs2);
        return;
      }
      if (res.status === 400 && Array.isArray(data.fields) && data.fields.length > 0) {
        // El servidor es la última palabra: marca los campos que rechazó.
        const errs2: FormErrors = {};
        for (const f of data.fields) {
          if (typeof f === "string" && (LEAD_FIELD_ORDER as readonly string[]).includes(f)) {
            errs2[f as LeadField] = "invalid";
          }
        }
        setErrors(errs2);
        setShowSummary(true);
        setStatus("idle");
        focusFirstError(errs2);
        return;
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        data-testid="empresas-success"
        className="flex flex-col items-center gap-3 rounded-2xl border border-green-500/25 bg-green-500/10 p-8 text-center outline-none"
      >
        <CheckCircle2 className="h-8 w-8 text-green-400" aria-hidden />
        <p className="font-display text-2xl font-bold uppercase text-white">{tx("successTitle")}</p>
        <p className="text-sm leading-relaxed text-green-100/90">{tx("successText")}</p>
      </div>
    );
  }

  const errorText = (field: LeadField) => {
    const code = errors[field];
    if (!code) return null;
    const fromCopy = copyErrorKey(field, code);
    return (fromCopy && copy[fromCopy]) || t(errorKey(field, code));
  };

  const helpId = (field: LeadField) => `${fieldId(field)}-help`;
  const helpText = (field: LeadField) => {
    const key = HELP_KEY[field];
    return key ? (copy[key] ?? null) : null;
  };
  const placeholder = (field: LeadField) => {
    const key = PLACEHOLDER_KEY[field];
    return key ? copy[key] : undefined;
  };

  // Error primero y ayuda después: el lector de pantalla anuncia lo urgente antes.
  const describedBy = (field: LeadField, hintId?: string) =>
    [errors[field] ? `${fieldId(field)}-error` : null, helpText(field) ? helpId(field) : null, hintId]
      .filter(Boolean)
      .join(" ") || undefined;

  // Etiqueta SIEMPRE visible encima del campo (nunca solo como marcador).
  const label = (field: LeadField, key: EmpresasFormCopyKey) => (
    <label htmlFor={fieldId(field)} className="mb-2 block text-sm font-medium text-[var(--emp-text)]">
      {tx(key)}
    </label>
  );

  const fieldHelp = (field: LeadField) => {
    const text = helpText(field);
    return text ? (
      <p id={helpId(field)} className="mt-1.5 text-sm leading-snug text-[var(--emp-text-2)]">
        {text}
      </p>
    ) : null;
  };

  const fieldError = (field: LeadField) => {
    const msg = errorText(field);
    return msg ? (
      <p id={`${fieldId(field)}-error`} className="emp-error mt-1.5 flex items-start gap-1.5 text-sm">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        <span>{msg}</span>
      </p>
    ) : null;
  };


  const whatsapp = whatsappHref(siteContact.general.whatsapp);
  // 503 y 429 son avisos técnicos con salida por teléfono: texto neutro. El de
  // red, el del paquete si lo hay.
  const failureText =
    status === "unavailable"
      ? t("empresas.errUnavailable")
      : status === "rate_limited"
        ? t("empresas.errRateLimited")
        : status === "error"
          ? tx("errGeneric")
          : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="relative space-y-5" data-testid="empresas-form">
      <p className="text-sm text-[var(--emp-text-2)]">{t("empresas.requiredHint")}</p>

      {showSummary && Object.keys(errors).some((k) => errors[k as keyof FormErrors]) && (
        <div role="alert" data-testid="empresas-error-summary" className="flex items-center gap-2 rounded-xl border border-red-500/25 bg-red-500/10 p-3 text-sm text-red-200">
          <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
          {tx("errSummary")}
        </div>
      )}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          {label("company", "fieldCompany")}
          <input
            id={fieldId("company")}
            name="company"
            type="text"
            autoComplete="organization"
            required
            aria-invalid={!!errors.company}
            aria-describedby={describedBy("company")}
            placeholder={placeholder("company")}
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
            disabled={sending}
            className={INPUT}
          />
          {fieldError("company")}
        </div>

        <div>
          {label("name", "fieldName")}
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={!!errors.name}
            aria-describedby={describedBy("name")}
            placeholder={placeholder("name")}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            disabled={sending}
            className={INPUT}
          />
          {fieldHelp("name")}
          {fieldError("name")}
        </div>

        <div>
          {label("phone", "fieldPhone")}
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            aria-invalid={!!errors.phone}
            aria-describedby={describedBy("phone")}
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            disabled={sending}
            className={INPUT}
          />
          {fieldHelp("phone")}
          {fieldError("phone")}
        </div>

        <div className="sm:col-span-2">
          {label("email", "fieldEmail")}
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            aria-invalid={!!errors.email}
            aria-describedby={describedBy("email")}
            placeholder={placeholder("email")}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            disabled={sending}
            className={INPUT}
          />
          {fieldError("email")}
        </div>

        <div>
          {label("date", "fieldDate")}
          <input
            id={fieldId("date")}
            name="date"
            type="date"
            required
            min={range?.min}
            max={range?.max}
            aria-invalid={!!errors.date}
            aria-describedby={describedBy("date")}
            value={values.date}
            onChange={(e) => update("date", e.target.value)}
            disabled={sending}
            className={cn(INPUT, "appearance-none")}
          />
          {fieldHelp("date")}
          {fieldError("date")}
        </div>

        <div>
          {label("people", "fieldPeople")}
          <input
            id={fieldId("people")}
            name="people"
            type="number"
            inputMode="numeric"
            min={1}
            max={LEAD_LIMITS.peopleMax}
            step={1}
            required
            aria-invalid={!!errors.people}
            aria-describedby={describedBy("people")}
            value={values.people}
            onChange={(e) => update("people", e.target.value)}
            disabled={sending}
            className={INPUT}
          />
          {fieldHelp("people")}
          {fieldError("people")}
        </div>

        <div className="sm:col-span-2">
          {label("format", "fieldFormat")}
          <select
            id={fieldId("format")}
            name="format"
            required
            aria-invalid={!!errors.format}
            aria-describedby={describedBy("format")}
            value={values.format}
            onChange={(e) => update("format", e.target.value)}
            disabled={sending}
            className={cn(INPUT, "cursor-pointer appearance-none")}
          >
            <option value="">
              {t("empresas.selectPlaceholder")}
            </option>
            {LEAD_FORMATS.map((f) => (
              <option key={f} value={f}>
                {tx(FORMAT_LABEL[f])}
              </option>
            ))}
          </select>
          {fieldError("format")}
        </div>

        <div className="sm:col-span-2">
          {label("source", "fieldSource")}
          <select
            id={fieldId("source")}
            name="source"
            required
            aria-invalid={!!errors.source}
            aria-describedby={describedBy("source")}
            value={values.source}
            onChange={(e) => update("source", e.target.value)}
            disabled={sending}
            className={cn(INPUT, "cursor-pointer appearance-none")}
          >
            <option value="">
              {t("empresas.selectPlaceholder")}
            </option>
            {LEAD_SOURCES.map((s) => (
              <option key={s} value={s}>
                {tx(SOURCE_LABEL[s])}
              </option>
            ))}
          </select>
          {fieldError("source")}
        </div>

        <div className="sm:col-span-2">
          {label("comments", "fieldComments")}
          <textarea
            id={fieldId("comments")}
            name="comments"
            rows={4}
            maxLength={LEAD_LIMITS.comments}
            aria-invalid={!!errors.comments}
            aria-describedby={describedBy("comments", `${fieldId("comments")}-hint`)}
            placeholder={placeholder("comments")}
            value={values.comments}
            onChange={(e) => update("comments", e.target.value)}
            disabled={sending}
            className={cn(INPUT, "resize-y")}
          />
          <p id={`${fieldId("comments")}-hint`} className="mt-1.5 text-xs text-[var(--emp-text-2)]">
            {t("empresas.commentsHint")}
          </p>
          {fieldError("comments")}
        </div>
      </div>

      {/* Trampa para bots: fuera de la vista y del orden de tabulación. Una
          persona nunca la rellena; si llega con texto, la API responde 400. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="empresas-website">{t("empresas.honeypotLabel")}</label>
        <input
          id="empresas-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {/* Consentimiento RGPD: casilla SIN marcar, obligatoria, con la
          información básica (art. 13 RGPD / 11 LOPDGDD) debajo. */}
      <div className="space-y-3 border-t border-[var(--emp-line)] pt-5">
        <div className="flex items-start gap-3">
          <input
            id={fieldId("consent")}
            name="consent"
            type="checkbox"
            required
            checked={consent}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? `${fieldId("consent")}-error` : undefined}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (errors.consent && e.target.checked) setErrors((prev) => ({ ...prev, consent: undefined }));
            }}
            disabled={sending}
            className="emp-checkbox"
          />
          <label htmlFor={fieldId("consent")} className="cursor-pointer text-sm leading-relaxed text-[var(--emp-text)]">
            {t("empresas.consentLabel")}
          </label>
        </div>
        {errors.consent && (
          <p id={`${fieldId("consent")}-error`} className="emp-error flex items-start gap-1.5 pl-8 text-sm">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <span>{tx("errConsent")}</span>
          </p>
        )}
        <p data-testid="empresas-privacy-basic" className="text-xs leading-relaxed text-[var(--emp-text-2)]">
          {t("empresas.privacyBasic")}{" "}
          <a
            href={localizedPath("/legal/privacidad", locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-white"
          >
            {t("empresas.privacyLink")}
            <ExternalLink className="h-3 w-3" aria-hidden />
            <span className="sr-only"> ({t("empresas.newTab")})</span>
          </a>
        </p>
      </div>

      <button
        type="submit"
        disabled={sending}
        className="emp-btn w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
        {sending ? tx("sending") : tx("submit")}
      </button>

      {failureText && (
        <div
          ref={alertRef}
          tabIndex={-1}
          role="alert"
          data-testid="empresas-send-error"
          className="space-y-3 rounded-xl border border-red-500/25 bg-red-500/10 p-4 outline-none"
        >
          <p className="flex items-start gap-2 text-sm text-red-200">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            <span>{failureText}</span>
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href={telHref(siteContact.general.phone)}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {t("empresas.contactCall")} {siteContact.general.phone}
            </a>
            {whatsapp && (
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/20 px-5 py-2 text-sm font-medium text-white hover:bg-white/5"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                {t("empresas.contactWhatsapp")}
              </a>
            )}
          </div>
        </div>
      )}
    </form>
  );
}
