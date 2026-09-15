"use client";

import { useId, useMemo, useState } from "react";
import { ListChecks, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT } from "@/i18n";
import { listRateMax } from "@/lib/checkout/validation";
import { formatEur, roundCents } from "@/lib/fourvenues/pricing";
import type { FVListPrice } from "@/lib/fourvenues/types";
import { cn } from "@/lib/utils";
import { errorKey, postJson, type ListCreateBody, type ListCreateResult } from "./api";
import { AttendeeFields, emptyForm, firstErrorLabel, LIST_FIELDS, validateForm, type FormValues } from "./attendee-form";
import { CheckoutBar } from "./checkout-bar";
import { ConsentFields, consentsComplete, EMPTY_CONSENTS, missingConsentLabel } from "./consents";
import { Honeypot, QtyStepper } from "./fields";
import { fill } from "./format";
import { StepHeading, useStepFocus } from "./step-heading";
import { Stepper } from "./stepper";
import type { ClientListRate, Consents, NativeCheckoutData, NativeCheckoutEvent } from "./types";

// Apuntarse a una lista (CHECKOUT-PROPIO.md §5): Personas · Datos ·
// Confirmación. Sin pago: al terminar se enseña el código (qr_code) en grande
// y se avisa del email. Hoy Outxide no tiene listas, pero el flujo va completo.

type Step = 1 | 2 | 3;

const NO_QUESTIONS: never[] = [];

function isSoldOut(rate: ClientListRate): boolean {
  return !rate.available || rate.complete;
}

/** Precios vigentes (la página ya filtró por fecha; aquí solo por disponibilidad). */
function currentPrices(rate: ClientListRate): FVListPrice[] {
  const prices = Array.isArray(rate.prices) ? rate.prices : [];
  const available = prices.filter((p) => p.available);
  return available.length ? available : prices;
}

/** Precio orientativo de la lista (el más bajo si hay varios) por persona. */
function unitPrice(rate: ClientListRate): number {
  const prices = currentPrices(rate);
  if (!prices.length) return 0;
  return Math.max(0, Math.min(...prices.map((p) => (Number.isFinite(p.price) ? p.price : 0))));
}

interface ListFlowProps {
  data: NativeCheckoutData;
  event: NativeCheckoutEvent;
  listRates: ClientListRate[];
}

export function ListFlow({ data, event, listRates }: ListFlowProps) {
  const t = useT();
  const { locale } = data;
  const headingId = useId();

  const [step, setStep] = useState<Step>(1);
  const [rateId, setRateId] = useState<string | null>(null);
  const [people, setPeople] = useState(1);
  const [form, setForm] = useState<FormValues>(() => emptyForm());
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [consents, setConsents] = useState<Consents>(EMPTY_CONSENTS);
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [result, setResult] = useState<ListCreateResult | null>(null);
  const headingRef = useStepFocus(step);

  const rate = rateId ? (listRates.find((r) => r._id === rateId) ?? null) : null;
  // Misma regla que la ruta de servidor (listRateMax): nunca desalineadas.
  const maxPeople = rate ? listRateMax(rate.max) : 1;
  const unit = rate ? unitPrice(rate) : 0;
  const total = roundCents(unit * people);
  // Sin confirmación de email: la lista solo pide nombre y email (contrato §5).
  const errors = useMemo(() => validateForm(form, LIST_FIELDS, NO_QUESTIONS, false), [form]);
  const missingText = useMemo(() => {
    const label = firstErrorLabel(errors, LIST_FIELDS, NO_QUESTIONS, t);
    if (label) return fill(t("checkout.missing"), { what: label });
    const consent = missingConsentLabel(consents, t);
    if (consent) return fill(t("checkout.missing"), { what: consent });
    return null;
  }, [errors, consents, t]);
  const detailsValid = missingText === null && consentsComplete(consents);

  const choose = (r: ClientListRate) => {
    setRateId(r._id);
    setPeople((p) => Math.min(p, listRateMax(r.max)));
  };

  const submit = async () => {
    if (!rate || submitting || !detailsValid) return;
    setSubmitting(true);
    setSubmitError(null);
    const body: ListCreateBody = {
      eventId: event.id,
      listRateId: rate._id,
      people,
      contact: {
        full_name: (form.values.full_name ?? "").trim(),
        email: (form.values.email ?? "").trim(),
      },
      consents: { adult: true, terms: true, marketing: consents.marketing },
      locale,
      website,
    };
    const res = await postJson<ListCreateResult>("/api/checkout/list", body);
    setSubmitting(false);
    if (!res.ok) {
      setSubmitError(t(errorKey(res.error, "form")));
      return;
    }
    setResult({ qrCode: res.qrCode, listId: res.listId });
    setStep(3);
  };

  const titles = [t("checkout.stepPeople"), t("checkout.stepDetails"), t("checkout.stepConfirm")];
  const actionClass = "h-12 rounded-full px-6 text-sm font-semibold aria-disabled:opacity-50 aria-disabled:pointer-events-none";
  const barTotal = rate ? (unit > 0 ? formatEur(total, locale) : t("checkout.listFree")) : formatEur(0, locale);

  return (
    <div data-testid="step-list">
      <Stepper steps={titles} current={step} />
      <StepHeading
        ref={headingRef}
        id={headingId}
        title={titles[step - 1]}
        backLabel={t("checkout.back")}
        onBack={step === 2 && !submitting ? () => setStep(1) : undefined}
      />

      {step === 1 && (
        <section data-testid="step-select" aria-labelledby={headingId} className="mt-4 space-y-3">
          {listRates.map((r) => {
            const selected = rateId === r._id;
            const soldOut = isSoldOut(r);
            const prices = currentPrices(r);
            const inputId = `list-rate-${r._id}`;
            return (
              <div
                key={r._id}
                data-testid="list-rate-card"
                data-list-rate-id={r._id}
                className={cn(
                  "rounded-2xl border bg-white/[0.02] p-4 transition-colors sm:p-5 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-outxide/60",
                  selected ? "border-outxide/60 bg-outxide/[0.06]" : "border-white/10",
                )}
              >
                <label htmlFor={inputId} className={cn("block", soldOut ? "cursor-not-allowed" : "cursor-pointer")}>
                  <input
                    id={inputId}
                    type="radio"
                    name="list-rate"
                    value={r._id}
                    checked={selected}
                    disabled={soldOut}
                    onChange={() => choose(r)}
                    className="sr-only"
                  />
                  <span className="flex items-start justify-between gap-3">
                    <span className="min-w-0 flex-1">
                      <span className={cn("flex items-center gap-2 text-base font-semibold", soldOut ? "text-white/60" : "text-white")}>
                        <ListChecks className="h-4 w-4 text-outxide" aria-hidden />
                        {t("checkout.listRate")}: {r.name}
                      </span>
                      {prices.map((p) =>
                        p.includes ? (
                          <span key={p._id} className="mt-1 block text-sm text-muted-foreground">
                            {t("checkout.includes")}: {p.includes}
                          </span>
                        ) : null,
                      )}
                    </span>
                    <span className="shrink-0 space-y-0.5 text-right">
                      {(prices.length ? prices : [null]).map((p, i) => (
                        <span key={p?._id ?? i} className="block">
                          {p && p.men !== p.women && (
                            <span className="mr-1 text-sm text-muted-foreground">
                              {p.men ? t("checkout.listMen") : t("checkout.listWomen")}
                            </span>
                          )}
                          <span data-testid="rate-price" className={cn("font-display text-xl font-bold", soldOut ? "text-white/60" : "text-white")}>
                            {p && p.price > 0 ? formatEur(p.price, locale) : t("checkout.listFree")}
                          </span>
                        </span>
                      ))}
                    </span>
                  </span>
                </label>
                {soldOut && (
                  <span
                    data-testid="rate-soldout"
                    className="mt-3 inline-block rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm font-semibold uppercase tracking-wider text-white/85"
                  >
                    {t("checkout.soldOut")}
                  </span>
                )}
                {selected && !soldOut && (
                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                    <span className="text-sm text-white/80">{t("checkout.listPeople")}</span>
                    <QtyStepper
                      prefix="people"
                      label={`${t("checkout.listPeople")} · ${r.name}`}
                      lessLabel={t("checkout.peopleLess")}
                      moreLabel={t("checkout.peopleMore")}
                      valueLabel={`${people} ${t("checkout.listPeople").toLowerCase()}`}
                      value={people}
                      onMinus={() => setPeople((p) => Math.max(1, p - 1))}
                      onPlus={() => setPeople((p) => Math.min(maxPeople, p + 1))}
                      minusDisabled={people <= 1}
                      plusDisabled={people >= maxPeople}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </section>
      )}

      {step === 2 && rate && (
        <section data-testid="step-details" aria-labelledby={headingId} className="relative mt-4 space-y-5">
          <fieldset className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
            <legend className="px-1 text-sm font-semibold text-white">{t("checkout.yourData")}</legend>
            <div className="mt-2">
              <AttendeeFields
                idPrefix="list"
                fields={LIST_FIELDS}
                questions={NO_QUESTIONS}
                form={form}
                errors={errors}
                touched={touched}
                onValue={(slug, v) => setForm((f) => ({ ...f, values: { ...f.values, [slug]: v } }))}
                onAnswer={() => undefined}
                onBlur={(key) => setTouched((prev) => ({ ...prev, [key]: true }))}
                t={t}
                confirmEmail={false}
              />
            </div>
          </fieldset>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 sm:p-5">
            <ConsentFields value={consents} onChange={setConsents} origin={data.origin} locale={locale} idPrefix="list" />
          </div>
          <Honeypot value={website} onChange={setWebsite} />
        </section>
      )}

      {step === 3 && result && (
        <section
          data-testid="list-confirmation"
          aria-labelledby={headingId}
          className="mt-4 rounded-2xl border border-outxide/40 bg-outxide/[0.06] p-6 text-center"
        >
          <p className="font-display text-2xl font-bold uppercase text-white">{t("checkout.listDone")}</p>
          <p className="mt-4 text-sm text-muted-foreground">{t("checkout.listCode")}</p>
          <p data-testid="list-qr" className="mt-1 break-all font-display text-4xl font-bold tracking-wider text-outxide">
            {result.qrCode}
          </p>
          <p className="mt-5 flex items-center justify-center gap-2 text-sm text-white/80">
            <Mail className="h-4 w-4 shrink-0 text-outxide" aria-hidden />
            {t("checkout.listEmailSent")}
          </p>
        </section>
      )}

      {step !== 3 && (
        <CheckoutBar
          total={barTotal}
          caption={rate ? `${t("checkout.listPeople")}: ${people}` : undefined}
          missing={step === 2 ? (missingText ?? undefined) : undefined}
          error={submitError ?? undefined}
          loading={submitting ? t("checkout.paying") : undefined}
          fallbackHref={data.fallbackHref}
        >
          {step === 1 ? (
            <Button
              type="button"
              variant="outxide"
              data-testid="bar-continue"
              onClick={() => rate && setStep(2)}
              disabled={!rate}
              className={actionClass}
            >
              {t("checkout.continue")}
            </Button>
          ) : (
            // aria-disabled mientras se envía: conserva el foco (submit() ya
            // ignora repeticiones); disabled solo cuando faltan datos.
            <Button
              type="button"
              variant="outxide"
              data-testid="list-submit"
              onClick={() => void submit()}
              disabled={!detailsValid}
              aria-disabled={submitting || undefined}
              aria-busy={submitting || undefined}
              className={actionClass}
            >
              {t("checkout.listSubmit")}
            </Button>
          )}
        </CheckoutBar>
      )}
    </div>
  );
}
