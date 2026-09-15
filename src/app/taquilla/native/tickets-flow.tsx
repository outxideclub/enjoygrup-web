"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Copy, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT } from "@/i18n";
import { formatEur, ticketFee, ticketsQuote } from "@/lib/fourvenues/pricing";
import type { FVDiscountCode } from "@/lib/fourvenues/types";
import { cn } from "@/lib/utils";
import {
  errorKey,
  postJson,
  type AttendeePayload,
  type DiscountBody,
  type DiscountResult,
  type TicketsCheckoutBody,
  type TicketsCheckoutResult,
} from "./api";
import {
  AttendeeFields,
  DOC_NUMBER_SLUGS,
  DOC_TYPE_SLUGS,
  effectiveFields,
  emptyForm,
  firstErrorLabel,
  phoneValue,
  validateForm,
  type FormValues,
} from "./attendee-form";
import { CheckoutBar } from "./checkout-bar";
import { ConsentFields, consentsComplete, EMPTY_CONSENTS, missingConsentLabel } from "./consents";
import { Honeypot, INPUT_CLASS, QtyStepper } from "./fields";
import { fill } from "./format";
import { StepHeading, useStepFocus } from "./step-heading";
import { Stepper } from "./stepper";
import { useLegalHref } from "./use-legal-href";
import type { ClientTicketRate, Consents, NativeCheckoutData, NativeCheckoutEvent } from "./types";

// Compra de entradas (CHECKOUT-PROPIO.md §5): 1 Selección · 2 Datos · 3 Resumen
// · 4 Pago (en Fourvenues, por redirección a payment_url). Una sola tarifa por
// compra: la API acepta un ticket_rate_id por checkout.

type Step = 1 | 2 | 3;

interface Selection {
  rateId: string;
  qty: number;
}

/**
 * Sesión de pago ya creada en Fourvenues cuyo total no es el que enseñamos:
 * por conditions_changed o porque su total_amount no cuadra con el presupuesto
 * local. Se pide confirmación con el importe real antes de redirigir.
 */
interface ConditionsChanged {
  total: number;
  paymentUrl: string;
}

/** Máximo por compra; si Fourvenues no lo informa, un tope prudente. */
function rateMax(rate: ClientTicketRate): number {
  return rate.max > 0 ? rate.max : 10;
}

function rateMin(rate: ClientTicketRate): number {
  return rate.min > 0 ? rate.min : 1;
}

function isSoldOut(rate: ClientTicketRate): boolean {
  return !rate.available || rate.complete || !rate.current_price;
}

function resizeForms(prev: FormValues[], count: number): FormValues[] {
  return Array.from({ length: count }, (_, i) => prev[i] ?? emptyForm());
}

/** Convierte el formulario en el asistente del cuerpo de /api/checkout/tickets. */
function toAttendee(form: FormValues, rate: ClientTicketRate): AttendeePayload {
  const fields = effectiveFields(rate.fields);
  const has = (slug: string) => fields.some((f) => f.slug === slug);
  const out: AttendeePayload = {};
  const name = (form.values.full_name ?? "").trim();
  const email = (form.values.email ?? "").trim();
  const phone = phoneValue(form.values.phone ?? "");
  const birthday = (form.values.birthday ?? form.values.birthdate ?? "").trim();
  if (has("full_name") && name) out.full_name = name;
  if (has("email") && email) out.email = email;
  if (has("phone") && phone) out.phone = phone;
  if ((has("birthday") || has("birthdate")) && birthday) out.birthday = birthday;
  // Documento: cualquiera de los slugs de la tarifa → claves de la API.
  for (const f of fields) {
    const v = (form.values[f.slug] ?? "").trim();
    if (!v) continue;
    if (DOC_TYPE_SLUGS.has(f.slug)) out.personal_document_type = v;
    else if (DOC_NUMBER_SLUGS.has(f.slug)) out.personal_document_number = v;
  }
  const answers = (rate.questions ?? [])
    .map((q) => ({ question_id: q._id, answer: (form.answers[q._id] ?? "").trim() }))
    .filter((a) => a.answer !== "");
  if (answers.length) out.answers = answers;
  return out;
}

/** Cuadra con Fourvenues si la diferencia es menor de medio céntimo. */
function sameAmount(a: number, b: number): boolean {
  return Math.abs(a - b) <= 0.005;
}

interface TicketsFlowProps {
  data: NativeCheckoutData;
  event: NativeCheckoutEvent;
  rates: ClientTicketRate[];
}

export function TicketsFlow({ data, event, rates }: TicketsFlowProps) {
  const t = useT();
  const { locale } = data;
  const headingId = useId();
  const legal = useLegalHref(data.origin, locale);

  const [step, setStep] = useState<Step>(1);
  const [sel, setSel] = useState<Selection | null>(null);
  const [forms, setForms] = useState<FormValues[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [consents, setConsentsState] = useState<Consents>(EMPTY_CONSENTS);
  const [website, setWebsite] = useState("");
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState<FVDiscountCode | null>(null);
  const [discountError, setDiscountError] = useState<string | null>(null);
  const [applying, setApplying] = useState(false);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  const [changed, setChanged] = useState<ConditionsChanged | null>(null);
  const headingRef = useStepFocus(step);
  const changedRef = useRef<HTMLDivElement>(null);

  // Vuelta atrás desde la pasarela: Safari iOS y Chrome restauran la página
  // desde bfcache con el estado React intacto (paying=true, botón bloqueado).
  useEffect(() => {
    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        setPaying(false);
        setPayError(null);
      }
    };
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, []);

  // Al aparecer la confirmación de nuevo total, el foco va a ella: el botón
  // pay-button deja de existir y el foco no debe caer a <body>.
  useEffect(() => {
    if (changed) changedRef.current?.focus();
  }, [changed]);

  const rate = sel ? (rates.find((r) => r._id === sel.rateId) ?? null) : null;
  const qty = rate && sel ? sel.qty : 0;
  const quote = useMemo(() => (rate ? ticketsQuote(rate, qty, discount) : null), [rate, qty, discount]);
  const fields = useMemo(() => effectiveFields(rate?.fields), [rate]);
  const questions = useMemo(() => rate?.questions ?? [], [rate]);
  const errors = useMemo(
    () => forms.map((form) => validateForm(form, fields, questions)),
    [forms, fields, questions],
  );

  // Primer campo pendiente → "Falta: Email · Asistente 2" / "Falta: +18".
  const missingText = useMemo(() => {
    for (let i = 0; i < errors.length; i++) {
      const label = firstErrorLabel(errors[i], fields, questions, t);
      if (label) {
        const what = forms.length > 1 ? `${label} · ${fill(t("checkout.attendee"), { n: i + 1 })}` : label;
        return fill(t("checkout.missing"), { what });
      }
    }
    const consent = missingConsentLabel(consents, t);
    if (consent) return fill(t("checkout.missing"), { what: consent });
    return null;
  }, [errors, fields, questions, forms.length, consents, t]);
  const detailsValid = missingText === null && consentsComplete(consents);

  // Cualquier cambio de datos, descuento o cantidad deja obsoleta una sesión
  // de pago ya creada (pay-confirm apuntaría a datos antiguos): se descarta y
  // el siguiente "Pagar" crea un checkout nuevo.
  const invalidateSession = () => setChanged(null);

  // --- Paso 1: cantidad por tarifa (elegir otra pone la anterior a 0) ---
  const resetDiscount = () => {
    setDiscount(null);
    setDiscountError(null);
    invalidateSession();
  };
  const plus = (r: ClientTicketRate) => {
    setSel((prev) => {
      const current = prev?.rateId === r._id ? prev.qty : 0;
      const next = current === 0 ? rateMin(r) : Math.min(rateMax(r), current + 1);
      return { rateId: r._id, qty: next };
    });
    resetDiscount();
  };
  const minus = (r: ClientTicketRate) => {
    setSel((prev) => {
      if (!prev || prev.rateId !== r._id) return prev;
      const next = prev.qty <= rateMin(r) ? 0 : prev.qty - 1;
      return next === 0 ? null : { rateId: r._id, qty: next };
    });
    resetDiscount();
  };

  const goToDetails = () => {
    if (!rate || qty === 0) return;
    setForms((prev) => resizeForms(prev, rate.nominative ? qty : 1));
    setStep(2);
  };
  const goToSummary = () => {
    if (!detailsValid) return;
    setPayError(null);
    setStep(3);
  };
  const back = () => {
    setPayError(null);
    invalidateSession();
    setStep((s) => (s === 3 ? 2 : 1));
  };

  // --- Paso 2: formularios ---
  const setValue = (i: number, slug: string, value: string) => {
    invalidateSession();
    setForms((prev) => prev.map((f, idx) => (idx === i ? { ...f, values: { ...f.values, [slug]: value } } : f)));
  };
  const setAnswer = (i: number, questionId: string, value: string) => {
    invalidateSession();
    setForms((prev) =>
      prev.map((f, idx) => (idx === i ? { ...f, answers: { ...f.answers, [questionId]: value } } : f)),
    );
  };
  const setConsents = (next: Consents) => {
    invalidateSession();
    setConsentsState(next);
  };
  const touch = (i: number, key: string) => setTouched((prev) => ({ ...prev, [`${i}:${key}`]: true }));
  const touchedFor = (i: number) => {
    const out: Record<string, boolean> = {};
    for (const [k, v] of Object.entries(touched)) {
      if (k.startsWith(`${i}:`)) out[k.slice(k.indexOf(":") + 1)] = v;
    }
    return out;
  };
  const copyFirst = () => {
    invalidateSession();
    setForms((prev) =>
      prev.map((f, i) => (i === 0 ? f : { values: { ...prev[0].values }, answers: { ...prev[0].answers } })),
    );
  };

  // --- Paso 3: descuento y pago ---
  const applyDiscount = async () => {
    if (!rate || applying) return;
    const trimmed = code.trim();
    if (!trimmed) return;
    setApplying(true);
    setDiscountError(null);
    invalidateSession();
    const body: DiscountBody = { code: trimmed, rateId: rate._id, quantity: qty, supplementsTotal: 0 };
    const res = await postJson<DiscountResult>("/api/checkout/discount", body);
    setApplying(false);
    if (res.ok) {
      setDiscount(res.discount);
    } else {
      setDiscount(null);
      setDiscountError(t(errorKey(res.error, "form")));
    }
  };

  const pay = async () => {
    if (!rate || !quote || paying || !detailsValid) return;
    setPaying(true);
    setPayError(null);
    // Sin nominatividad hay un solo formulario: se replica por entrada, porque
    // el servidor exige quantity === attendees.length.
    const list = rate.nominative ? forms : Array.from({ length: qty }, () => forms[0]);
    const body: TicketsCheckoutBody = {
      eventId: event.id,
      rateId: rate._id,
      quantity: qty,
      attendees: list.map((f) => toAttendee(f, rate)),
      discountCode: discount?.code,
      consents: { adult: true, terms: true, marketing: consents.marketing },
      locale,
      campaign: data.campaign,
      expectedTotal: quote.total,
      website,
    };
    const res = await postJson<TicketsCheckoutResult>("/api/checkout/tickets", body);
    if (!res.ok) {
      setPaying(false);
      setPayError(t(errorKey(res.error, "pay")));
      // Un 4xx permanente en Fourvenues suele ser el código (agotado, caducado)
      // o la tarifa: se retira el descuento para que el siguiente intento no
      // repita el mismo cuerpo.
      if (res.error === "rate_unavailable" && discount) {
        setDiscount(null);
        setDiscountError(t("checkout.invalidCode"));
      }
      return;
    }
    // El total mostrado (art. 98.2 TRLGDCU) DEBE ser el que cobra Fourvenues:
    // si cambiaron las condiciones o su total_amount no cuadra con nuestro
    // presupuesto, se enseña el importe real y se pide confirmación.
    if (res.conditionsChanged || !sameAmount(res.totalAmount, quote.total)) {
      setPaying(false);
      setChanged({ total: res.totalAmount, paymentUrl: res.paymentUrl });
      return;
    }
    window.location.assign(res.paymentUrl);
  };

  const titles = [t("checkout.stepSelect"), t("checkout.stepDetails"), t("checkout.stepSummary"), t("checkout.stepPay")];
  const barTotal = changed ? changed.total : (quote?.total ?? 0);
  const caption =
    quote && qty > 0
      ? `${qty === 1 ? t("checkout.ticketOne") : fill(t("checkout.ticketMany"), { n: qty })} · ${fill(t("checkout.inclFees"), { fee: formatEur(quote.fees, locale) })}`
      : undefined;
  const actionClass = "h-12 rounded-full px-6 text-sm font-semibold aria-disabled:opacity-50 aria-disabled:pointer-events-none";

  return (
    <div>
      <Stepper steps={titles} current={paying ? 4 : step} />
      <StepHeading
        ref={headingRef}
        id={headingId}
        title={titles[step - 1]}
        backLabel={t("checkout.back")}
        onBack={step > 1 && !paying ? back : undefined}
      />

      {step === 1 && (
        <section data-testid="step-select" aria-labelledby={headingId} className="mt-4 space-y-3">
          {rates.map((r) => (
            <RateCard
              key={r._id}
              rate={r}
              qty={sel?.rateId === r._id ? sel.qty : 0}
              locale={locale}
              t={t}
              onPlus={() => plus(r)}
              onMinus={() => minus(r)}
            />
          ))}
        </section>
      )}

      {step === 2 && rate && (
        <section data-testid="step-details" aria-labelledby={headingId} className="relative mt-4 space-y-5">
          {forms.map((form, i) => (
            <div key={i} className="space-y-3">
              <fieldset
                data-testid="attendee-form"
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5"
              >
                <legend className="px-1 text-sm font-semibold text-white">
                  {forms.length > 1 ? fill(t("checkout.attendee"), { n: i + 1 }) : t("checkout.yourData")}
                </legend>
                <div className="mt-2">
                  <AttendeeFields
                    idPrefix={`att-${i}`}
                    fields={fields}
                    questions={questions}
                    form={form}
                    errors={errors[i] ?? {}}
                    touched={touchedFor(i)}
                    onValue={(slug, v) => setValue(i, slug, v)}
                    onAnswer={(qid, v) => setAnswer(i, qid, v)}
                    onBlur={(key) => touch(i, key)}
                    t={t}
                  />
                </div>
              </fieldset>
              {i === 0 && forms.length > 1 && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    data-testid="copy-first"
                    onClick={copyFirst}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 text-sm font-medium text-white transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-outxide"
                  >
                    <Copy className="h-4 w-4 text-outxide" aria-hidden />
                    {t("checkout.copyFirst")}
                  </button>
                </div>
              )}
            </div>
          ))}

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
            <ConsentFields value={consents} onChange={setConsents} origin={data.origin} locale={locale} idPrefix="tickets" />
          </div>
          <Honeypot value={website} onChange={setWebsite} />
        </section>
      )}

      {step === 3 && rate && quote && (
        <section data-testid="step-summary" aria-labelledby={headingId} className="mt-4 space-y-4">
          <dl className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02] text-sm">
            <div data-testid="summary-line" className="flex items-center justify-between gap-4 p-4">
              <dt className="text-white/80">
                {qty} × {rate.name}
              </dt>
              <dd className="font-semibold text-white">{formatEur(quote.subtotal, locale)}</dd>
            </div>
            {quote.discount > 0 && (
              <div data-testid="summary-discount" className="flex items-center justify-between gap-4 p-4">
                <dt className="text-white/80">
                  {t("checkout.discount")}
                  {discount?.code ? ` (${discount.code})` : ""}
                </dt>
                <dd className="font-semibold text-outxide">{formatEur(-quote.discount, locale)}</dd>
              </div>
            )}
            <div data-testid="summary-fees" className="flex items-center justify-between gap-4 p-4">
              <dt className="text-white/80">{t("checkout.fees")}</dt>
              <dd className="font-semibold text-white">{formatEur(quote.fees, locale)}</dd>
            </div>
            <div data-testid="summary-total" className="flex items-center justify-between gap-4 p-4">
              <dt className="text-base font-semibold text-white">{t("checkout.total")}</dt>
              <dd className="font-display text-xl font-bold text-white">{formatEur(quote.total, locale)}</dd>
            </div>
          </dl>
          <p data-testid="tax-included" className="text-sm text-muted-foreground">
            {t("checkout.taxIncluded")}
          </p>

          <ul className="space-y-1 text-sm text-muted-foreground">
            {forms.map((f, i) => (
              <li key={i} className="truncate">
                {forms.length > 1 ? `${fill(t("checkout.attendee"), { n: i + 1 })}: ` : ""}
                {[f.values.full_name, f.values.email].filter((v) => v && v.trim()).join(" · ")}
              </li>
            ))}
          </ul>

          {rate.has_discount_codes_enabled && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void applyDiscount();
              }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-4"
            >
              <label htmlFor="discount-code" className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-white/80">
                <Tag className="h-4 w-4 text-outxide" aria-hidden />
                {t("checkout.discountCode")}
              </label>
              <div className="flex gap-2">
                <input
                  id="discount-code"
                  data-testid="discount-input"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setDiscountError(null);
                  }}
                  autoComplete="off"
                  autoCapitalize="characters"
                  maxLength={60}
                  aria-invalid={discountError ? true : false}
                  aria-describedby={discountError ? "discount-code-error" : undefined}
                  className={INPUT_CLASS}
                />
                <Button
                  type="submit"
                  variant="outline"
                  data-testid="discount-apply"
                  disabled={applying || !code.trim() || paying}
                  className="h-12 shrink-0 rounded-xl border-white/15 px-4 text-white hover:bg-white/10"
                >
                  {t("checkout.apply")}
                </Button>
              </div>
              <div id="discount-code-error" aria-live="polite">
                {discountError && (
                  <p data-testid="discount-error" className="mt-2 text-sm text-red-400">
                    {discountError}
                  </p>
                )}
                {discount && !discountError && (
                  <p className="mt-2 text-sm text-outxide">
                    {discount.code}
                    {discount.description ? ` · ${discount.description}` : ""}
                  </p>
                )}
              </div>
            </form>
          )}

          {changed && (
            <div
              ref={changedRef}
              tabIndex={-1}
              data-testid="conditions-changed"
              role="alert"
              className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm text-amber-100 outline-none focus-visible:ring-2 focus-visible:ring-amber-300/60"
            >
              {fill(t("checkout.conditionsChanged"), { total: formatEur(changed.total, locale) })}
            </div>
          )}

          {/* Información precontractual justo antes de pagar (art. 97.1.m y
              103.l TRLGDCU): sin devolución ni desistimiento. */}
          <p data-testid="no-refund-note" className="text-sm leading-relaxed text-muted-foreground">
            {t("checkout.noRefundNote")}{" "}
            <a
              href={legal("/legal/condiciones-venta")}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white"
            >
              {t("checkout.salesTerms")}
              <span className="sr-only"> ({t("checkout.newTab")})</span>
            </a>
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">{t("checkout.secureNote")}</p>
        </section>
      )}

      <CheckoutBar
        total={formatEur(barTotal, locale)}
        caption={caption}
        missing={step === 2 ? (missingText ?? undefined) : undefined}
        error={payError ?? undefined}
        loading={paying ? t("checkout.paying") : undefined}
        fallbackHref={data.fallbackHref}
      >
        {step === 3 ? (
          changed ? (
            <Button
              type="button"
              variant="outxide"
              data-testid="pay-confirm"
              onClick={() => window.location.assign(changed.paymentUrl)}
              className={actionClass}
            >
              {fill(t("checkout.confirmNewTotal"), { total: formatEur(changed.total, locale) })}
            </Button>
          ) : (
            // aria-disabled + aria-busy en vez de disabled: el botón conserva
            // el foco mientras se prepara el pago (pay() ya ignora repeticiones).
            <Button
              type="button"
              variant="outxide"
              data-testid="pay-button"
              onClick={() => void pay()}
              aria-disabled={paying || undefined}
              aria-busy={paying || undefined}
              className={actionClass}
            >
              {fill(t("checkout.payNow"), { total: formatEur(quote?.total ?? 0, locale) })}
            </Button>
          )
        ) : (
          <Button
            type="button"
            variant="outxide"
            data-testid="bar-continue"
            onClick={step === 1 ? goToDetails : goToSummary}
            disabled={step === 1 ? qty === 0 : !detailsValid}
            className={actionClass}
          >
            {t("checkout.continue")}
          </Button>
        )}
      </CheckoutBar>
    </div>
  );
}

interface RateCardProps {
  rate: ClientTicketRate;
  qty: number;
  locale: string;
  t: (key: string) => string;
  onPlus: () => void;
  onMinus: () => void;
}

function RateCard({ rate, qty, locale, t, onPlus, onMinus }: RateCardProps) {
  const price = rate.current_price;
  const unit = price && Number.isFinite(price.price) ? Math.max(0, price.price) : 0;
  const fee = price ? ticketFee(unit, price.fee_type, price.fee_quantity) : 0;
  const soldOut = isSoldOut(rate);
  const selected = qty > 0;

  return (
    <div
      data-testid="rate-card"
      data-rate-id={rate._id}
      aria-disabled={soldOut || undefined}
      className={cn(
        "rounded-2xl border bg-white/[0.02] p-4 transition-colors sm:p-5",
        selected ? "border-outxide/60 bg-outxide/[0.06]" : "border-white/10",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          {/* Agotada: se atenúan solo nombre y precio (≈6,9:1), nunca la tarjeta
              entera, para que "Agotado" y el resto sigan en contraste AA. */}
          <h3 className={cn("text-base font-semibold", soldOut ? "text-white/60" : "text-white")}>{rate.name}</h3>
          {price?.includes && (
            <p className="mt-1 text-sm text-muted-foreground">
              {t("checkout.includes")}: {price.includes}
            </p>
          )}
          {price?.additional_info && <p className="mt-1 text-sm text-muted-foreground">{price.additional_info}</p>}
        </div>
        <div className="shrink-0 text-right">
          <p data-testid="rate-price" className={cn("font-display text-xl font-bold", soldOut ? "text-white/60" : "text-white")}>
            {formatEur(unit, locale)}
          </p>
          <p data-testid="rate-fee" className="text-sm text-muted-foreground">
            {fill(t("checkout.feeSuffix"), { fee: formatEur(fee, locale) })}
          </p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        {soldOut ? (
          <span
            data-testid="rate-soldout"
            className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-semibold uppercase tracking-wider text-white/85"
          >
            {t("checkout.soldOut")}
          </span>
        ) : (
          <>
            <span className="text-sm text-muted-foreground">{t("checkout.quantity")}</span>
            <QtyStepper
              prefix="qty"
              label={`${t("checkout.quantity")} · ${rate.name}`}
              lessLabel={`${t("checkout.qtyLess")} · ${rate.name}`}
              moreLabel={`${t("checkout.qtyMore")} · ${rate.name}`}
              valueLabel={qty === 1 ? t("checkout.ticketOne") : fill(t("checkout.ticketMany"), { n: qty })}
              value={qty}
              onMinus={onMinus}
              onPlus={onPlus}
              minusDisabled={qty === 0}
              plusDisabled={qty >= rateMax(rate)}
            />
          </>
        )}
      </div>
    </div>
  );
}
