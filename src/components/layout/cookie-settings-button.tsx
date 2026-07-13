"use client";

import { Settings2 } from "lucide-react";
import { useT } from "@/i18n";
import { CONSENT_KEY, deleteTrackingCookies } from "@/lib/consent";

export function CookieSettingsButton() {
  const t = useT();

  const openCookieSettings = () => {
    // Reabrir el banner equivale a retirar el consentimiento: además de volver
    // a preguntar, se eliminan las cookies de rastreo ya instaladas.
    localStorage.removeItem(CONSENT_KEY);
    deleteTrackingCookies({ necessary: true, analytics: false, marketing: false });
    window.location.reload();
  };

  return (
    <button
      onClick={openCookieSettings}
      className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-white transition-colors"
    >
      <Settings2 className="h-3.5 w-3.5" />
      {t("cookieBanner.settingsButton")}
    </button>
  );
}
