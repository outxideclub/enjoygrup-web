"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

// Indicador de pasos (1 Selección · 2 Datos · 3 Resumen · 4 Pago). En móvil
// solo se lee la etiqueta del paso actual para que quepa en 375 px. Números a
// 12 px mínimo y pendientes en white/60 (≈6,5:1): el zoom está bloqueado en
// la web, así que ningún texto funcional baja de ahí ni del contraste AA.
export function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <ol data-testid="stepper" className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
      {steps.map((label, i) => {
        const n = i + 1;
        const state = n < current ? "done" : n === current ? "current" : "todo";
        return (
          <li
            key={label}
            aria-current={state === "current" ? "step" : undefined}
            className="flex items-center gap-1.5"
          >
            <span
              aria-hidden
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                state === "current" && "bg-outxide text-black",
                state === "done" && "bg-outxide/20 text-outxide",
                state === "todo" && "bg-white/5 text-white/60",
              )}
            >
              {state === "done" ? <Check className="h-3.5 w-3.5" /> : n}
            </span>
            <span
              className={cn(
                state === "current" ? "font-semibold text-white" : "hidden text-muted-foreground sm:inline",
              )}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
