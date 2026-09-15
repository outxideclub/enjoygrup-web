"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { useT } from "@/i18n";

interface CheckoutBarProps {
  /** Total ya formateado ("10,80 €"). */
  total: string;
  /** "1 entrada · incl. 0,80 € gastos". */
  caption?: string;
  /** "Falta: nombre del asistente 2" (paso de datos). */
  missing?: string;
  /** Texto de error del pago (ya traducido). */
  error?: string;
  /** Texto de carga del pago (ya traducido). */
  loading?: string;
  /** Salida de emergencia (taquilla completa): se enlaza junto al error. */
  fallbackHref?: string;
  /** Botón de acción: bar-continue, pay-button, pay-confirm o list-submit. */
  children: ReactNode;
}

/**
 * Barra FIJA inferior (CHECKOUT-PROPIO.md §5): total + acción siempre a mano
 * en móvil. Mientras está montada marca `body.has-checkout-bar` y publica su
 * altura real en `--checkout-bar-h` (crece con los textos de error): la
 * página añade ese relleno inferior para que el pie y la salida de emergencia
 * nunca queden tapados, y el banner de cookies se apoya encima de ella.
 */
export function CheckoutBar({ total, caption, missing, error, loading, fallbackHref, children }: CheckoutBarProps) {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const body = document.body;
    body.classList.add("has-checkout-bar");
    const el = ref.current;
    const publish = () => {
      if (el) body.style.setProperty("--checkout-bar-h", `${Math.ceil(el.getBoundingClientRect().height)}px`);
    };
    publish();
    const observer = typeof ResizeObserver !== "undefined" && el ? new ResizeObserver(publish) : null;
    observer?.observe(el as Element);
    return () => {
      observer?.disconnect();
      body.classList.remove("has-checkout-bar");
      body.style.removeProperty("--checkout-bar-h");
    };
  }, []);

  return (
    <div
      ref={ref}
      data-testid="checkout-bar"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-zinc-950/95 pb-[env(safe-area-inset-bottom)] backdrop-blur"
    >
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3 sm:px-6">
        <div className="min-w-0 flex-1">
          <p data-testid="bar-total" className="font-display text-2xl font-bold leading-none text-white">
            {total}
          </p>
          {caption && (
            // En pantallas muy bajas (zoom 400 %) la leyenda se oculta para
            // dejar sitio al contenido.
            <p
              data-testid="bar-caption"
              className="mt-1 truncate text-sm text-muted-foreground [@media(max-height:560px)]:hidden"
            >
              {caption}
            </p>
          )}
          {/* Región viva única para lo que cambia: carga, error o campo pendiente. */}
          <div aria-live="polite" aria-atomic="true" className="text-sm">
            {loading ? (
              <p data-testid="pay-loading" className="mt-1 text-outxide">
                {loading}
              </p>
            ) : error ? (
              <p data-testid="pay-error" className="mt-1 text-red-400">
                {error}
                {fallbackHref && (
                  <>
                    {" "}
                    <a
                      href={fallbackHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="pay-error-fallback"
                      className="inline-flex min-h-6 items-center gap-1 underline underline-offset-2 text-white hover:text-outxide"
                    >
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                      {t("checkout.fallbackHint")}
                      <span className="sr-only"> ({t("checkout.newTab")})</span>
                    </a>
                  </>
                )}
              </p>
            ) : missing ? (
              <p data-testid="bar-missing" className="mt-1 text-amber-300">
                {missing}
              </p>
            ) : null}
          </div>
        </div>
        <div className="shrink-0">{children}</div>
      </div>
    </div>
  );
}
