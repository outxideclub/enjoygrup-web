"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Cookie, X, Settings2, Check } from "lucide-react";
import { useT } from "@/i18n";

type ConsentState = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

const CONSENT_KEY = "ge_cookie_consent";
const CONSENT_VERSION = "1";

function getStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed.consent as ConsentState;
  } catch {
    return null;
  }
}

function storeConsent(consent: ConsentState) {
  localStorage.setItem(
    CONSENT_KEY,
    JSON.stringify({ consent, version: CONSENT_VERSION, timestamp: new Date().toISOString() })
  );
}

function pushConsentToGtag(consent: ConsentState) {
  const w = window as Window & { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] };
  if (!w.gtag) return;
  w.gtag("consent", "update", {
    analytics_storage: consent.analytics ? "granted" : "denied",
    ad_storage: consent.marketing ? "granted" : "denied",
    ad_user_data: consent.marketing ? "granted" : "denied",
    ad_personalization: consent.marketing ? "granted" : "denied",
  });
}

export function CookieBanner() {
  const t = useT();
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) {
      setConsent(stored);
      pushConsentToGtag(stored);
    } else {
      setVisible(true);
    }
  }, []);

  const accept = useCallback((state: ConsentState) => {
    setConsent(state);
    storeConsent(state);
    pushConsentToGtag(state);
    setVisible(false);
    setShowSettings(false);
  }, []);

  const acceptAll = () => accept({ necessary: true, analytics: true, marketing: true });
  const rejectAll = () => accept({ necessary: true, analytics: false, marketing: false });
  const savePreferences = () => accept(consent);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] p-4 md:p-6">
      <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-zinc-950/95 backdrop-blur-xl shadow-2xl">
        {!showSettings ? (
          <div className="p-5 md:p-6">
            <div className="flex items-start gap-4">
              <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5">
                <Cookie className="h-5 w-5 text-white/60" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white mb-1">{t("cookieBanner.title")}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {t("cookieBanner.description")}{" "}
                  <Link href="/legal/cookies" className="underline underline-offset-2 hover:text-white transition-colors">
                    {t("cookieBanner.moreInfo")}
                  </Link>
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                onClick={acceptAll}
                className="rounded-full bg-white px-5 py-2 text-xs font-semibold text-black hover:bg-white/90 transition-colors"
              >
                {t("cookieBanner.acceptAll")}
              </button>
              <button
                onClick={rejectAll}
                className="rounded-full border border-white/10 px-5 py-2 text-xs font-medium text-white hover:bg-white/5 transition-colors"
              >
                {t("cookieBanner.rejectAll")}
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
              >
                <Settings2 className="h-3.5 w-3.5" />
                {t("cookieBanner.configure")}
              </button>
            </div>
          </div>
        ) : (
          <div className="p-5 md:p-6">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-white">{t("cookieBanner.configureTitle")}</p>
              <button
                onClick={() => setShowSettings(false)}
                className="p-1 text-muted-foreground hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              <CookieToggle
                label={t("cookieBanner.necessary")}
                description={t("cookieBanner.necessaryDesc")}
                checked={true}
                disabled
              />
              <CookieToggle
                label={t("cookieBanner.analytics")}
                description={t("cookieBanner.analyticsDesc")}
                checked={consent.analytics}
                onChange={(v) => setConsent((c) => ({ ...c, analytics: v }))}
              />
              <CookieToggle
                label={t("cookieBanner.marketing")}
                description={t("cookieBanner.marketingDesc")}
                checked={consent.marketing}
                onChange={(v) => setConsent((c) => ({ ...c, marketing: v }))}
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <button
                onClick={savePreferences}
                className="flex items-center gap-1.5 rounded-full bg-white px-5 py-2 text-xs font-semibold text-black hover:bg-white/90 transition-colors"
              >
                <Check className="h-3.5 w-3.5" />
                {t("cookieBanner.savePreferences")}
              </button>
              <button
                onClick={acceptAll}
                className="rounded-full border border-white/10 px-5 py-2 text-xs font-medium text-white hover:bg-white/5 transition-colors"
              >
                {t("cookieBanner.acceptAll")}
              </button>
            </div>

            <p className="mt-3 text-[10px] text-muted-foreground">
              {t("cookieBanner.moreDetails")}{" "}
              <Link href="/legal/cookies" className="underline underline-offset-2 hover:text-white transition-colors">
                {t("cookieBanner.cookiePolicy")}
              </Link>
              {" "}{t("cookieBanner.and")}{" "}
              <Link href="/legal/privacidad" className="underline underline-offset-2 hover:text-white transition-colors">
                {t("cookieBanner.privacyPolicy")}
              </Link>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function CookieToggle({
  label,
  description,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}) {
  return (
    <label
      className={`flex items-center justify-between gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-3 ${
        disabled ? "opacity-60" : "cursor-pointer hover:bg-white/[0.04]"
      } transition-colors`}
    >
      <div className="min-w-0">
        <p className="text-xs font-medium text-white">{label}</p>
        <p className="text-[10px] text-muted-foreground leading-relaxed">{description}</p>
      </div>
      <div className="relative shrink-0">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          className="sr-only peer"
        />
        <div className="h-5 w-9 rounded-full bg-white/10 peer-checked:bg-white/80 transition-colors" />
        <div className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white/40 peer-checked:bg-black peer-checked:translate-x-4 transition-all" />
      </div>
    </label>
  );
}
