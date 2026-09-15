"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { useT } from "@/i18n";
import { CheckField } from "./fields";
import { useLegalHref } from "./use-legal-href";
import type { Consents } from "./types";

export const EMPTY_CONSENTS: Consents = { adult: false, terms: false, marketing: false };

/** Las dos casillas legales marcadas (la de marketing es opcional). */
export function consentsComplete(c: Consents): boolean {
  return c.adult && c.terms;
}

/**
 * Nombre corto de la primera casilla obligatoria sin marcar, para que la barra
 * diga QUÉ falta ("Falta: +18" / "Falta: Condiciones de venta") y no solo que
 * falta algo.
 */
export function missingConsentLabel(c: Consents, t: (key: string) => string): string | null {
  if (!c.adult) return t("checkout.adults");
  if (!c.terms) return t("checkout.salesTerms");
  return null;
}

const LINK_CLASS =
  "inline-flex min-h-11 items-center gap-1 underline underline-offset-2 transition-colors hover:text-white";

/** "Ho letto l'" + "Informativa" no lleva espacio: se respeta el apóstrofo final. */
function sep(s: string): string {
  return /['’]$/.test(s) ? "" : " ";
}

interface ConsentFieldsProps {
  value: Consents;
  onChange: (next: Consents) => void;
  /** Origen de la página (para enlaces legales absolutos en la taquilla). */
  origin: string;
  /** Idioma del checkout: los textos legales se enlazan en esa lengua. */
  locale: string;
  /** Prefijo de ids (varios formularios en la misma página). */
  idPrefix: string;
}

/**
 * Consentimientos (CHECKOUT-PROPIO.md §5, corregidos en la revisión legal del
 * 15-sep): +18 (sin muro de edad), "he leído la privacidad y acepto las
 * condiciones" con los enlaces FUERA de la etiqueta (pulsar la fila marca la
 * casilla, no abre otra pestaña), aviso informativo de la política de imágenes
 * (interés legítimo: no se acepta) y marketing (desmarcada). Debajo, la
 * información básica de protección de datos (art. 13 RGPD / 11 LOPDGDD).
 * Cada casilla marca su error solo tras haberla tocado (no al salir de otro
 * campo) y lo dice con texto, no solo con color.
 */
export function ConsentFields({ value, onChange, origin, locale, idPrefix }: ConsentFieldsProps) {
  const t = useT();
  const legal = useLegalHref(origin, locale);
  const [touched, setTouched] = useState<{ adult: boolean; terms: boolean }>({ adult: false, terms: false });
  const set = (key: keyof Consents) => (checked: boolean) => onChange({ ...value, [key]: checked });
  const touch = (key: "adult" | "terms") => () => setTouched((prev) => ({ ...prev, [key]: true }));
  const errorFor = (key: "adult" | "terms") => (touched[key] && !value[key] ? t("checkout.required") : undefined);
  const link = (path: string, label: string) => (
    <a href={legal(path)} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
      {label}
      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
      <span className="sr-only"> ({t("checkout.newTab")})</span>
    </a>
  );

  const before = t("checkout.consentTermsBefore");

  return (
    <fieldset className="space-y-1">
      <legend className="mb-1 text-sm font-semibold text-white">{t("checkout.consents")}</legend>
      <CheckField
        id={`${idPrefix}-consent-adult`}
        testId="consent-adult"
        checked={value.adult}
        onChange={set("adult")}
        onBlur={touch("adult")}
        required
        error={errorFor("adult")}
        label={t("checkout.consentAdult")}
      />
      <CheckField
        id={`${idPrefix}-consent-terms`}
        testId="consent-terms"
        checked={value.terms}
        onChange={set("terms")}
        onBlur={touch("terms")}
        required
        error={errorFor("terms")}
        label={`${before}${sep(before)}${t("checkout.privacy")} ${t("checkout.consentAccept")} ${t("checkout.salesTerms")} ${t("checkout.and")} ${t("checkout.entryTerms")}.`}
        description={
          <span className="flex flex-wrap gap-x-4">
            {link("/legal/privacidad", t("checkout.privacy"))}
            {link("/legal/condiciones-venta", t("checkout.salesTerms"))}
            {link("/legal/condiciones-entrada", t("checkout.entryTerms"))}
          </span>
        }
      />
      <div data-testid="images-notice" className="py-1.5 pl-8 text-sm leading-relaxed text-white/70">
        <p>{t("checkout.imagesNotice")}</p>
        {link("/legal/imagenes", t("checkout.imagesPolicy"))}
      </div>
      <CheckField
        id={`${idPrefix}-consent-marketing`}
        testId="consent-marketing"
        checked={value.marketing}
        onChange={set("marketing")}
        label={t("checkout.consentMarketing")}
      />
      <p data-testid="privacy-basic" className="pt-2 text-sm leading-relaxed text-muted-foreground">
        {t("checkout.privacyBasic")} {link("/legal/privacidad", t("checkout.privacy"))}
      </p>
    </fieldset>
  );
}
