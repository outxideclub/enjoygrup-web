"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, ArrowRight } from "lucide-react";
import { useT, useLocale } from "@/i18n";
import { localizedPath } from "@/i18n/config";

// Alta en la lista de AVISOS DE EVENTOS. Reutiliza el doble opt-in del
// newsletter (POST -> /api/waitlist -> email de confirmación firmado). El
// consentimiento expreso viaja al servidor; nada se persiste sin confirmar.
export function EventAlertsForm() {
  const t = useT();
  const locale = useLocale();
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
    <div className="mx-auto flex max-w-lg flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-outxide/15">
        <Bell className="h-5 w-5 text-outxide" aria-hidden />
      </div>
      <h2 className="font-display text-2xl font-bold text-white">{t("agenda.alertsTitle")}</h2>
      <p className="text-sm text-muted-foreground">{t("agenda.alertsText")}</p>
      <form onSubmit={handleSubmit} className="flex w-full max-w-sm gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
          placeholder={t("agenda.alertsPlaceholder")}
          aria-label={t("agenda.alertsPlaceholder")}
          className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/50 outline-none transition-colors focus:border-outxide/40"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-magnetic flex items-center gap-1.5 rounded-full bg-outxide px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-outxide/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "loading" ? "..." : t("agenda.alertsSubmit")}
          {status !== "loading" && <ArrowRight size={14} />}
        </button>
      </form>
      <label className="flex max-w-sm cursor-pointer items-start gap-2 text-left">
        <input
          type="checkbox"
          checked={privacyAccepted}
          onChange={(e) => { setPrivacyAccepted(e.target.checked); setStatus("idle"); }}
          className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-outxide"
        />
        <span className="text-[11px] leading-relaxed text-white/60">
          {t("agenda.alertsPrivacy")}{" "}
          <Link href={localizedPath("/legal/privacidad", locale)} className="underline underline-offset-2 hover:text-white">
            {t("agenda.alertsPrivacyLink")}
          </Link>
        </span>
      </label>
      {/* Información básica de primera capa (art. 11 LOPDGDD) */}
      <p className="max-w-sm text-left text-[10px] leading-relaxed text-white/45">
        {t("agenda.alertsInfoLayer")}
      </p>
      <div aria-live="polite" role="status">
        {status === "success" && (
          <p className="text-xs text-green-400">{t("agenda.alertsSuccess")}</p>
        )}
        {status === "error" && (
          <p className="text-xs text-red-400">
            {!privacyAccepted ? t("agenda.alertsPrivacyRequired") : t("agenda.alertsError")}
          </p>
        )}
      </div>
    </div>
  );
}
