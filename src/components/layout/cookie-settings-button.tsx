"use client";

import { Settings2 } from "lucide-react";
import { useT } from "@/i18n";

export function CookieSettingsButton() {
  const t = useT();

  const openCookieSettings = () => {
    localStorage.removeItem("ge_cookie_consent");
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
