"use client";

import { useId, useState } from "react";
import { useLocale, useT } from "@/i18n";
import { localizedPath } from "@/i18n/config";

// Variante del formulario de avisos de /agenda (EventAlertsForm) con el tema
// de esta landing (variables --ox-*: neutro hoy, rojo si se aprueba la
// campaña): el cian del club no encaja aquí. Misma API (POST /api/waitlist →
// doble opt-in con email de confirmación firmado), mismo consentimiento
// expreso, casilla SIN marcar, y los MISMOS textos legales (claves
// agenda.alerts*, que el diccionario recortado de esta ruta incluye).
// El enlace a la privacidad es un <a> normal (carga completa): esta página
// lleva un diccionario parcial y una navegación suave lo arrastraría.
export function OutxidiousAlertsForm() {
  const t = useT();
  const locale = useLocale();
  const id = useId();
  const [email, setEmail] = useState("");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error" | "loading">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyAccepted || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent: privacyAccepted }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
      setPrivacyAccepted(false);
    } catch {
      setStatus("error");
    }
  };

  return (
    <div data-testid="outxidious-alerts" className="mx-auto w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex w-full flex-col gap-2 sm:flex-row">
        <label htmlFor={`${id}-email`} className="sr-only">
          {t("agenda.alertsPlaceholder")}
        </label>
        <input
          id={`${id}-email`}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setStatus("idle");
          }}
          placeholder={t("agenda.alertsPlaceholder")}
          className="ox-input min-h-[48px] flex-1 rounded-full px-5 text-base outline-none"
        />
        <button type="submit" disabled={status === "loading"} className="ox-btn">
          {status === "loading" ? "…" : t("agenda.alertsSubmit")}
        </button>
      </form>
      <label className="mt-3 flex cursor-pointer items-start gap-2 text-left">
        <input
          type="checkbox"
          checked={privacyAccepted}
          onChange={(e) => {
            setPrivacyAccepted(e.target.checked);
            setStatus("idle");
          }}
          className="ox-check mt-0.5 h-4 w-4 shrink-0"
        />
        <span className="ox-body text-xs leading-relaxed">
          {t("agenda.alertsPrivacy")}{" "}
          <a href={localizedPath("/legal/privacidad", locale)} className="ox-link">
            {t("agenda.alertsPrivacyLink")}
          </a>
        </span>
      </label>
      {/* Información básica de primera capa (art. 11 LOPDGDD) */}
      <p className="ox-legal mt-2 text-left text-[11px] leading-relaxed">{t("agenda.alertsInfoLayer")}</p>
      <div aria-live="polite" role="status" className="mt-2 min-h-[1.25rem] text-left text-sm">
        {status === "success" && <p className="ox-title">{t("agenda.alertsSuccess")}</p>}
        {status === "error" && (
          <p className="ox-accent">
            {!privacyAccepted ? t("agenda.alertsPrivacyRequired") : t("agenda.alertsError")}
          </p>
        )}
      </div>
    </div>
  );
}
