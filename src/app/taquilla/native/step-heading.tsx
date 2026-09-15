"use client";

import { useEffect, useRef, type RefObject } from "react";
import { ArrowLeft } from "lucide-react";

/**
 * Foco al cambiar de paso: el h2 del paso recibe el foco (tabIndex=-1) para
 * que lectores de pantalla y teclado sigan el flujo. No se enfoca en la carga
 * inicial (se compara con el paso anterior, así StrictMode tampoco lo dispara).
 */
export function useStepFocus(step: number): RefObject<HTMLHeadingElement | null> {
  const ref = useRef<HTMLHeadingElement>(null);
  const prev = useRef(step);
  useEffect(() => {
    if (prev.current === step) return;
    prev.current = step;
    ref.current?.focus();
  }, [step]);
  return ref;
}

interface StepHeadingProps {
  ref: RefObject<HTMLHeadingElement | null>;
  id: string;
  title: string;
  backLabel: string;
  onBack?: () => void;
}

export function StepHeading({ ref, id, title, backLabel, onBack }: StepHeadingProps) {
  return (
    <div className="mt-5 flex items-center gap-3">
      {onBack && (
        <button
          type="button"
          data-testid="step-back"
          onClick={onBack}
          aria-label={backLabel}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-outxide"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
        </button>
      )}
      {/* scroll-mt/mb: al enfocar, el título no queda bajo la barra de navegación
          fija ni bajo la barra fija del checkout (su altura real la publica
          CheckoutBar en --checkout-bar-h). */}
      <h2
        ref={ref}
        id={id}
        tabIndex={-1}
        className="scroll-mt-28 scroll-mb-[calc(var(--checkout-bar-h,6rem)_+_1rem)] rounded font-display text-xl font-bold uppercase text-white outline-none focus-visible:ring-2 focus-visible:ring-outxide/60"
      >
        {title}
      </h2>
    </div>
  );
}
