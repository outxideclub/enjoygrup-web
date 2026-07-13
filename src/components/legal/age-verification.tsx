"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert } from "lucide-react";
import { OutxideLogo } from "@/components/ui/logos";
import { useT } from "@/i18n";

const AGE_KEY = "ge_age_verified";

export function AgeVerification() {
  const [show, setShow] = useState(false);
  const t = useT();
  const dialogRef = useRef<HTMLDivElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const verified = sessionStorage.getItem(AGE_KEY);
    if (!verified) setShow(true);
  }, []);

  // Diálogo modal accesible: foco inicial en "Confirmar" y Tab cíclico dentro.
  useEffect(() => {
    if (!show) return;
    confirmRef.current?.focus();
    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, a[href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [show]);

  const confirm = () => {
    sessionStorage.setItem(AGE_KEY, "true");
    setShow(false);
  };

  const deny = () => {
    window.location.href = "/";
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/images/outxide/hero-poster.webp)" }}
          />
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="age-verification-title"
            aria-describedby="age-verification-desc"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative mx-4 w-full max-w-sm rounded-2xl border border-white/10 bg-zinc-950/80 backdrop-blur-md p-8 text-center shadow-2xl"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-outxide/10 border border-outxide/20">
              <ShieldAlert className="h-8 w-8 text-outxide" />
            </div>

            <OutxideLogo className="h-10 mx-auto mb-6" />

            <h2 id="age-verification-title" className="text-lg font-display font-bold text-white uppercase tracking-wide mb-2">
              {t("ageVerification.title")}
            </h2>
            <p id="age-verification-desc" className="text-sm text-muted-foreground leading-relaxed mb-8">
              {t("ageVerification.description")}
            </p>

            <div className="space-y-3">
              <button
                ref={confirmRef}
                onClick={confirm}
                className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-black hover:bg-white/90 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t("ageVerification.confirm")}
              </button>
              <button
                onClick={deny}
                className="w-full rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/70 hover:text-white hover:border-white/40 hover:bg-white/5 transition-colors"
              >
                {t("ageVerification.deny")}
              </button>
            </div>

            <p className="mt-6 text-[10px] text-muted-foreground leading-relaxed">
              {t("ageVerification.legal1")}{" "}
              <a href="/legal/condiciones-entrada" className="underline underline-offset-2 hover:text-white transition-colors">
                {t("ageVerification.entryConditions")}
              </a>
              {" "}{t("cookieBanner.and")}{" "}
              <a href="/legal/privacidad" className="underline underline-offset-2 hover:text-white transition-colors">
                {t("ageVerification.privacyPolicy")}
              </a>.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
