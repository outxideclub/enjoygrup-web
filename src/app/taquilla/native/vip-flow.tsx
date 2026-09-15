"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT } from "@/i18n";
import { bookingQuote, formatEur, ticketFee } from "@/lib/fourvenues/pricing";
import type { FVBookingRate } from "@/lib/fourvenues/types";
import { cn } from "@/lib/utils";
import { errorKey, postJson, type BookingCheckoutBody, type BookingCheckoutResult } from "./api";
import {
  AttendeeFields,
  BOOKING_FIELDS,
  emptyForm,
  firstErrorLabel,
  phoneValue,
  validateForm,
  type FormValues,
} from "./attendee-form";
import { CheckoutBar } from "./checkout-bar";
import { ConsentFields, consentsComplete, EMPTY_CONSENTS, missingConsentLabel } from "./consents";
import { Honeypot, QtyStepper, SelectField } from "./fields";
import { fill, formatPercent } from "./format";
import { StepHeading, useStepFocus } from "./step-heading";
import { Stepper } from "./stepper";
import { useLegalHref } from "./use-legal-href";
import type {
  ClientBookingSpace,
  ClientBookingZone,
  Consents,
  NativeCheckoutData,
  NativeCheckoutEvent,
} from "./types";

// Reserva de mesa VIP (CHECKOUT-PROPIO.md §5): Mesa · Datos · Resumen · Pago.
// Se cobra hoy el depósito de la tarifa (full_payment:false); el resto, en el
// local. Nunca se enseñan cantidades de mesas disponibles: solo agotado o no
// (el servidor ya no manda mesas ocultas ni bloqueadas: load-data.ts).

type Step = 1 | 2 | 3;

interface Selection {
  zoneSlug: string;
  rateSlug: string;
}

/** Sesión de pago creada con un total distinto del mostrado (ver tickets-flow). */
interface ConditionsChanged {
  total: number;
  paymentUrl: string;
}

const NO_QUESTIONS: never[] = [];

/** Tarifas únicas de la zona (las repiten todas sus mesas). */
function zoneRates(zone: ClientBookingZone): FVBookingRate[] {
  const seen = new Map<string, FVBookingRate>();
  for (const space of zone.spaces ?? []) {
    for (const rate of space.rates ?? []) {
      if (!seen.has(rate.slug)) seen.set(rate.slug, rate);
    }
  }
  return Array.from(seen.values());
}

function zoneSoldOut(zone: ClientBookingZone): boolean {
  return !zone.available || zone.is_full;
}

/** Mesas elegibles para una tarifa (solo si la zona deja elegir; ya llegan libres). */
function selectableTables(zone: ClientBookingZone, rateSlug: string): ClientBookingSpace[] {
  return (zone.spaces ?? []).filter((s) => s.rates.some((r) => r.slug === rateSlug));
}

function sameAmount(a: number, b: number): boolean {
  return Math.abs(a - b) <= 0.005;
}

interface VipFlowProps {
  data: NativeCheckoutData;
  event: NativeCheckoutEvent;
  zones: ClientBookingZone[];
}

export function VipFlow({ data, event, zones }: VipFlowProps) {
  const t = useT();
  const { locale } = data;
  const headingId = useId();
  const legal = useLegalHref(data.origin, locale);

  const [step, setStep] = useState<Step>(1);
  const [sel, setSel] = useState<Selection | null>(null);
  const [people, setPeopleState] = useState(1);
  const [tableId, setTableIdState] = useState("");
  const [form, setForm] = useState<FormValues>(() => emptyForm());
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [consents, setConsentsState] = useState<Consents>(EMPTY_CONSENTS);
  const [website, setWebsite] = useState("");
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);
  const [changed, setChanged] = useState<ConditionsChanged | null>(null);
  const headingRef = useStepFocus(step);
  const changedRef = useRef<HTMLDivElement>(null);

  // Vuelta atrás desde la pasarela (bfcache): el estado React vuelve intacto.
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

  useEffect(() => {
    if (changed) changedRef.current?.focus();
  }, [changed]);

  const zone = sel ? (zones.find((z) => z.slug === sel.zoneSlug) ?? null) : null;
  const rate = zone && sel ? (zoneRates(zone).find((r) => r.slug === sel.rateSlug) ?? null) : null;
  const maxPeople = rate ? Math.max(1, rate.included_persons + rate.supplement_persons) : 1;
  const quote = useMemo(() => (rate ? bookingQuote(rate, people) : null), [rate, people]);
  const tables = useMemo(
    () => (zone && rate && zone.can_select_client ? selectableTables(zone, rate.slug) : []),
    [zone, rate],
  );
  // La mesa elegida deja de valer si el grupo crece por encima de su aforo.
  const validTableId =
    tables.some((s) => s._id === tableId && !(s.capacity > 0 && s.capacity < people)) ? tableId : "";
  const errors = useMemo(() => validateForm(form, BOOKING_FIELDS, NO_QUESTIONS), [form]);
  const missingText = useMemo(() => {
    const label = firstErrorLabel(errors, BOOKING_FIELDS, NO_QUESTIONS, t);
    if (label) return fill(t("checkout.missing"), { what: label });
    const consent = missingConsentLabel(consents, t);
    if (consent) return fill(t("checkout.missing"), { what: consent });
    return null;
  }, [errors, consents, t]);
  const detailsValid = missingText === null && consentsComplete(consents);

  // Cualquier cambio invalida una sesión de pago ya creada (ver tickets-flow).
  const invalidateSession = () => setChanged(null);
  const setPeople = (updater: (p: number) => number) => {
    invalidateSession();
    setPeopleState(updater);
  };
  const setTableId = (v: string) => {
    invalidateSession();
    setTableIdState(v);
  };
  const setConsents = (next: Consents) => {
    invalidateSession();
    setConsentsState(next);
  };

  const choose = (z: ClientBookingZone, r: FVBookingRate) => {
    invalidateSession();
    setSel({ zoneSlug: z.slug, rateSlug: r.slug });
    // Se parte de las personas incluidas: es el tamaño de grupo habitual.
    setPeopleState(Math.max(1, r.included_persons || 1));
    setTableIdState("");
  };

  const back = () => {
    setPayError(null);
    invalidateSession();
    setStep((s) => (s === 3 ? 2 : 1));
  };

  // Lo que se paga hoy es el depósito; si la tarifa no lo define, el total.
  const chargeNow = quote ? (quote.depositNow > 0 ? quote.depositNow : quote.total) : 0;

  const pay = async () => {
    if (!zone || !rate || !quote || paying || !detailsValid) return;
    setPaying(true);
    setPayError(null);
    const observations = (form.values.observations ?? "").trim();
    const body: BookingCheckoutBody = {
      eventId: event.id,
      zoneSlug: zone.slug,
      rateSlug: rate.slug,
      tableId: validTableId || undefined,
      people,
      contact: {
        full_name: (form.values.full_name ?? "").trim(),
        email: (form.values.email ?? "").trim(),
        phone: phoneValue(form.values.phone ?? ""),
      },
      observations: observations || undefined,
      consents: { adult: true, terms: true, marketing: consents.marketing },
      locale,
      campaign: data.campaign,
      expectedTotal: chargeNow,
      website,
    };
    const res = await postJson<BookingCheckoutResult>("/api/checkout/booking", body);
    if (!res.ok) {
      setPaying(false);
      setPayError(t(errorKey(res.error, "pay")));
      return;
    }
    // El botón dice "Pagar X" con el depósito: si Fourvenues va a cobrar otra
    // cifra (ni el depósito ni el total), se enseña y se pide confirmación.
    if (!sameAmount(res.totalAmount, chargeNow)) {
      setPaying(false);
      setChanged({ total: res.totalAmount, paymentUrl: res.paymentUrl });
      return;
    }
    window.location.assign(res.paymentUrl);
  };

  const titles = [t("checkout.stepTable"), t("checkout.stepDetails"), t("checkout.stepSummary"), t("checkout.stepPay")];
  const caption = quote
    ? `${t("checkout.vipPeople")}: ${people} · ${fill(t("checkout.inclFees"), { fee: formatEur(quote.fees, locale) })}`
    : undefined;
  const actionClass = "h-12 rounded-full px-6 text-sm font-semibold aria-disabled:opacity-50 aria-disabled:pointer-events-none";
  const selectedTable = tables.find((s) => s._id === validTableId) ?? null;
  const barTotal = changed ? changed.total : (quote?.total ?? 0);

  return (
    <div data-testid="step-vip">
      <Stepper steps={titles} current={paying ? 4 : step} />
      <StepHeading
        ref={headingRef}
        id={headingId}
        title={titles[step - 1]}
        backLabel={t("checkout.back")}
        onBack={step > 1 && !paying ? back : undefined}
      />

      {step === 1 && (
        <section data-testid="step-select" aria-labelledby={headingId} className="mt-4 space-y-4">
          {zones.map((z) => {
            const rates = zoneRates(z);
            const soldOut = zoneSoldOut(z);
            return (
              <div
                key={z._id}
                data-testid="zone-card"
                data-zone-slug={z.slug}
                // p-3 en móvil: tres cajas anidadas (panel, zona, tarifa) dejan
                // poco ancho útil a 375 px; cada rem cuenta.
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-3 sm:p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className={cn("flex items-center gap-2 text-base font-semibold", soldOut ? "text-white/60" : "text-white")}>
                    <Crown className="h-4 w-4 text-outxide" aria-hidden />
                    {t("checkout.vipZone")}: {z.name}
                  </h3>
                  {soldOut && (
                    <span
                      data-testid="rate-soldout"
                      className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-semibold uppercase tracking-wider text-white/85"
                    >
                      {t("checkout.soldOut")}
                    </span>
                  )}
                </div>
                <div className="mt-3 space-y-3">
                  {rates.map((r) => {
                    const selected = sel?.zoneSlug === z.slug && sel.rateSlug === r.slug;
                    return (
                      <BookingRateCard
                        key={r.slug}
                        zone={z}
                        rate={r}
                        selected={selected}
                        disabled={soldOut}
                        people={selected ? people : undefined}
                        locale={locale}
                        t={t}
                        onSelect={() => choose(z, r)}
                      >
                        {selected && rate && (
                          <div className="mt-4 space-y-4 border-t border-white/10 pt-4">
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-sm text-white/80">{t("checkout.vipPeople")}</span>
                              <QtyStepper
                                prefix="people"
                                label={`${t("checkout.vipPeople")} · ${rate.name}`}
                                lessLabel={t("checkout.peopleLess")}
                                moreLabel={t("checkout.peopleMore")}
                                valueLabel={`${people} ${t("checkout.vipPeople").toLowerCase()}`}
                                value={people}
                                onMinus={() => setPeople((p) => Math.max(1, p - 1))}
                                onPlus={() => setPeople((p) => Math.min(maxPeople, p + 1))}
                                minusDisabled={people <= 1}
                                plusDisabled={people >= maxPeople}
                              />
                            </div>
                            {z.can_select_client && tables.length > 0 ? (
                              <SelectField
                                id="table-select"
                                testId="table-select"
                                label={t("checkout.vipChooseTable")}
                                value={tableId}
                                onChange={setTableId}
                                placeholder={t("checkout.vipTableAssigned")}
                                options={tables.map((s) => ({
                                  value: s._id,
                                  label: s.name,
                                  disabled: s.capacity > 0 && s.capacity < people,
                                }))}
                              />
                            ) : (
                              <p className="text-sm text-muted-foreground">{t("checkout.vipTableAssigned")}</p>
                            )}
                          </div>
                        )}
                      </BookingRateCard>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
      )}

      {step === 2 && rate && (
        <section data-testid="step-details" aria-labelledby={headingId} className="relative mt-4 space-y-5">
          <fieldset className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
            <legend className="px-1 text-sm font-semibold text-white">{t("checkout.vipContact")}</legend>
            <div className="mt-2">
              <AttendeeFields
                idPrefix="vip"
                fields={BOOKING_FIELDS}
                questions={NO_QUESTIONS}
                form={form}
                errors={errors}
                touched={touched}
                onValue={(slug, v) => {
                  invalidateSession();
                  setForm((f) => ({ ...f, values: { ...f.values, [slug]: v } }));
                }}
                onAnswer={() => undefined}
                onBlur={(key) => setTouched((prev) => ({ ...prev, [key]: true }))}
                t={t}
              />
            </div>
          </fieldset>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
            <ConsentFields value={consents} onChange={setConsents} origin={data.origin} locale={locale} idPrefix="vip" />
          </div>
          <Honeypot value={website} onChange={setWebsite} />
        </section>
      )}

      {step === 3 && rate && quote && (
        <section data-testid="step-summary" aria-labelledby={headingId} className="mt-4 space-y-4">
          <dl className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.02] text-sm">
            <div data-testid="summary-line" className="flex items-center justify-between gap-4 p-4">
              <dt className="text-white/80">
                {t("checkout.vipBase")}: {rate.name}
                {selectedTable ? ` · ${selectedTable.name}` : ""}
                <span className="block text-sm text-muted-foreground">
                  {t("checkout.vipPeople")}: {people}
                </span>
              </dt>
              <dd className="font-semibold text-white">{formatEur(quote.base, locale)}</dd>
            </div>
            {quote.extraPeople > 0 && (
              <div data-testid="summary-extra" className="flex items-center justify-between gap-4 p-4">
                <dt className="text-white/80">
                  {t("checkout.vipExtraPeople")} × {quote.extraPeople}
                </dt>
                <dd className="font-semibold text-white">{formatEur(quote.supplement, locale)}</dd>
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
            <div data-testid="summary-deposit" className="flex items-center justify-between gap-4 bg-outxide/[0.06] p-4">
              <dt className="font-semibold text-white">{t("checkout.vipDepositNow")}</dt>
              <dd className="font-display text-xl font-bold text-outxide">{formatEur(chargeNow, locale)}</dd>
            </div>
            {quote.total - chargeNow > 0.004 && (
              <div data-testid="summary-remaining" className="flex items-center justify-between gap-4 p-4">
                <dt className="text-white/80">{t("checkout.vipRemaining")}</dt>
                <dd className="font-semibold text-white">{formatEur(quote.total - chargeNow, locale)}</dd>
              </div>
            )}
          </dl>
          <p data-testid="tax-included" className="text-sm text-muted-foreground">
            {t("checkout.taxIncluded")}
          </p>

          <p className="truncate text-sm text-muted-foreground">
            {[form.values.full_name, form.values.email, phoneValue(form.values.phone ?? "")]
              .filter((v) => v && v.trim())
              .join(" · ")}
          </p>

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

          {/* Política de cancelación del depósito (condiciones-venta §5.2) y sin
              desistimiento (art. 103.l TRLGDCU), antes de pulsar Pagar. */}
          <p data-testid="vip-cancel-note" className="text-sm leading-relaxed text-muted-foreground">
            {t("checkout.vipCancelNote")}{" "}
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
            <Button
              type="button"
              variant="outxide"
              data-testid="pay-button"
              onClick={() => void pay()}
              aria-disabled={paying || undefined}
              aria-busy={paying || undefined}
              className={actionClass}
            >
              {fill(t("checkout.payNow"), { total: formatEur(chargeNow, locale) })}
            </Button>
          )
        ) : (
          <Button
            type="button"
            variant="outxide"
            data-testid="bar-continue"
            onClick={() => {
              if (step === 1 && rate) setStep(2);
              else if (step === 2 && detailsValid) {
                setPayError(null);
                setStep(3);
              }
            }}
            disabled={step === 1 ? !rate : !detailsValid}
            className={actionClass}
          >
            {t("checkout.continue")}
          </Button>
        )}
      </CheckoutBar>
    </div>
  );
}

interface BookingRateCardProps {
  zone: ClientBookingZone;
  rate: FVBookingRate;
  selected: boolean;
  disabled: boolean;
  /** Personas elegidas (solo en la tarifa seleccionada): el depósito se enseña para ese grupo. */
  people?: number;
  locale: string;
  t: (key: string) => string;
  onSelect: () => void;
  children?: React.ReactNode;
}

function BookingRateCard({ zone, rate, selected, disabled, people, locale, t, onSelect, children }: BookingRateCardProps) {
  const inputId = `booking-rate-${zone.slug}-${rate.slug}`;
  const feeText =
    rate.fee_type === "percentage"
      ? `${t("checkout.fees")} ${formatPercent(rate.fee_quantity, locale)}`
      : fill(t("checkout.feeSuffix"), { fee: formatEur(ticketFee(rate.price, rate.fee_type, rate.fee_quantity), locale) });
  // Depósito del grupo actual (personas incluidas mientras no se elige): así la
  // cifra de la tarjeta cuadra con la barra al añadir personas extra.
  const deposit = bookingQuote(rate, people ?? rate.included_persons).depositNow;

  return (
    <div
      data-testid="booking-rate-card"
      data-rate-slug={rate.slug}
      className={cn(
        "rounded-2xl border bg-black/30 p-3 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-outxide/60 sm:p-4",
        selected ? "border-outxide/60 bg-outxide/[0.06]" : "border-white/10",
      )}
    >
      <label htmlFor={inputId} className={cn("block", disabled ? "cursor-not-allowed" : "cursor-pointer")}>
        <input
          id={inputId}
          type="radio"
          name={`booking-rate-${zone.slug}`}
          value={rate.slug}
          checked={selected}
          disabled={disabled}
          onChange={onSelect}
          className="sr-only"
        />
        {/* El texto de gastos va bajo la fila entera: a 375 px la columna del
            precio dejaba la descripción a una palabra por línea. */}
        <span className="flex items-start justify-between gap-3">
          <span className="min-w-0 flex-1">
            <span className={cn("block text-base font-semibold", disabled ? "text-white/60" : "text-white")}>
              {t("checkout.vipRate")}: {rate.name}
            </span>
            {rate.content && <span className="mt-1 block text-sm text-muted-foreground">{rate.content}</span>}
          </span>
          <span data-testid="rate-price" className={cn("shrink-0 font-display text-xl font-bold", disabled ? "text-white/60" : "text-white")}>
            {formatEur(rate.price, locale)}
          </span>
        </span>
        <span data-testid="rate-fee" className="mt-1 block text-sm text-muted-foreground">
          {feeText}
        </span>
        <span className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm text-white/70">
          <span>{fill(t("checkout.vipIncludes"), { n: rate.included_persons })}</span>
          {rate.supplement_persons > 0 && (
            <span>
              {fill(t("checkout.vipExtra"), {
                price: formatEur(rate.supplement_price, locale),
                max: rate.included_persons + rate.supplement_persons,
              })}
            </span>
          )}
          <span className="text-outxide">
            {t("checkout.vipDepositNow")}: {formatEur(deposit, locale)}
          </span>
        </span>
      </label>
      {children}
    </div>
  );
}
