"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { useT } from "@/i18n";
import { cn } from "@/lib/utils";
import { EventHeader } from "./event-header";
import { EventList } from "./event-list";
import { ListFlow } from "./list-flow";
import { TicketsFlow } from "./tickets-flow";
import type { CheckoutMode, NativeCheckoutData } from "./types";
import { VipFlow } from "./vip-flow";

export type { NativeCheckoutData, NativeCheckoutEvent, CheckoutMode } from "./types";

// Checkout propio (motor "native", CHECKOUT-PROPIO.md §5). Recibe TODO del
// servidor (evento, tarifas, zonas, listas) y solo habla con /api/checkout/*.
// Va dentro de la misma caja redondeada de la taquilla de siempre.

const TAB_KEY: Record<CheckoutMode, string> = {
  tickets: "checkout.tabTickets",
  vip: "checkout.tabVip",
  list: "checkout.tabList",
};

/** Pestañas con datos: sin tarifas no hay pestaña. */
function availableModes(data: NativeCheckoutData): CheckoutMode[] {
  const modes: CheckoutMode[] = [];
  if (data.rates.length > 0) modes.push("tickets");
  if (data.zones.some((z) => (z.spaces ?? []).some((s) => (s.rates ?? []).length > 0))) modes.push("vip");
  if (data.listRates.length > 0) modes.push("list");
  return modes;
}

export function NativeCheckout({ data }: { data: NativeCheckoutData }) {
  const t = useT();
  const modes = availableModes(data);
  const [mode, setMode] = useState<CheckoutMode>(() =>
    modes.includes(data.initialMode) ? data.initialMode : (modes[0] ?? "tickets"),
  );
  const tabRefs = useRef<Partial<Record<CheckoutMode, HTMLButtonElement | null>>>({});

  if (!data.event) return <EventList data={data} />;
  const event = data.event;
  const active: CheckoutMode | null = modes.includes(mode) ? mode : (modes[0] ?? null);

  // Patrón de pestañas de WAI-ARIA APG: una sola en la secuencia Tab (roving
  // tabindex) y flechas/Inicio/Fin mueven el foco y activan la pestaña.
  const onTabKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!active) return;
    const i = modes.indexOf(active);
    let next: number | null = null;
    if (e.key === "ArrowRight") next = (i + 1) % modes.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + modes.length) % modes.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = modes.length - 1;
    if (next === null) return;
    e.preventDefault();
    const target = modes[next];
    setMode(target);
    tabRefs.current[target]?.focus();
  };

  return (
    <div>
      <EventHeader event={event} locale={data.locale} />

      {modes.length > 1 && (
        <div role="tablist" onKeyDown={onTabKeyDown} className="flex border-b border-white/10 px-2 sm:px-4">
          {modes.map((m) => {
            const selected = m === active;
            return (
              <button
                key={m}
                ref={(el) => {
                  tabRefs.current[m] = el;
                }}
                type="button"
                role="tab"
                id={`tab-${m}`}
                data-testid={`tab-${m}`}
                aria-selected={selected}
                aria-controls={`panel-${m}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setMode(m)}
                className={cn(
                  "-mb-px min-h-12 border-b-2 px-4 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-outxide",
                  selected ? "border-outxide text-white" : "border-transparent text-muted-foreground hover:text-white",
                )}
              >
                {t(TAB_KEY[m])}
              </button>
            );
          })}
        </div>
      )}

      <div
        role={modes.length > 1 ? "tabpanel" : undefined}
        id={active ? `panel-${active}` : undefined}
        aria-labelledby={active && modes.length > 1 ? `tab-${active}` : undefined}
        className="p-4 sm:p-6"
      >
        {active === null && <p className="py-8 text-center text-muted-foreground">{t("checkout.errorUnavailable")}</p>}
        {/* key por pestaña: cada flujo arranca limpio al volver a él. */}
        {active === "tickets" && <TicketsFlow key="tickets" data={data} event={event} rates={data.rates} />}
        {active === "vip" && <VipFlow key="vip" data={data} event={event} zones={data.zones} />}
        {active === "list" && <ListFlow key="list" data={data} event={event} listRates={data.listRates} />}
      </div>
    </div>
  );
}
