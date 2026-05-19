"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Ticket,
  Clock,
  Minus,
  Plus,
  ArrowRight,
  Loader2,
  ExternalLink,
} from "lucide-react";
import type {
  FVTicketRate,
  FVCheckoutRequest,
} from "@/lib/fourvenues/types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function calcTotal(price: number, feeType: string, feeQty: number): number {
  if (feeType === "fixed") return price + feeQty;
  return price + price * (feeQty / 100);
}

function fmt(value: number): string {
  return value.toFixed(2).replace(".", ",") + " €";
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`bg-white/5 animate-pulse rounded-xl ${className}`} />;
}

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/5 bg-zinc-950/80 p-5 space-y-4">
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

function QuantitySelector({
  value,
  max,
  onChange,
}: {
  value: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        disabled={value <= 0}
        className="h-9 w-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white transition-colors hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-10 text-center text-sm font-medium text-white tabular-nums">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="h-9 w-9 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white transition-colors hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function EventTicketTabs({ eventId }: { eventId: string }) {
  const [rates, setRates] = useState<FVTicketRate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cart: { ticketRateId: quantity }
  const [cart, setCart] = useState<Record<string, number>>({});

  // Checkout
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    birthday: "",
  });
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  // --- Fetch ticket rates ---
  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/fourvenues/events/${eventId}/ticket-rates`,
          { signal: controller.signal },
        );
        if (!res.ok) throw new Error("Error al cargar las entradas");
        const json = await res.json();
        setRates(json.data ?? []);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError((err as Error).message || "No se pudieron cargar los datos");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
  }, [eventId]);

  // --- Cart helpers ---
  const updateCart = useCallback((rateId: string, quantity: number) => {
    setCart((prev) => {
      const next = { ...prev };
      if (quantity <= 0) delete next[rateId];
      else next[rateId] = quantity;
      return next;
    });
  }, []);

  const cartItems = rates
    .filter((r) => cart[r._id] && cart[r._id] > 0)
    .map((r) => {
      const qty = cart[r._id];
      const unit = calcTotal(
        r.current_price.price,
        r.current_price.fee_type,
        r.current_price.fee_quantity,
      );
      return { rate: r, quantity: qty, unitPrice: unit, totalPrice: unit * qty };
    });

  const cartTotal = cartItems.reduce((sum, i) => sum + i.totalPrice, 0);
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  // --- Checkout handler ---
  async function handleCheckout() {
    if (cartItems.length === 0) return;
    setCheckoutLoading(true);
    setError(null);

    try {
      const item = cartItems[0];
      const origin = window.location.origin;

      const body: FVCheckoutRequest = {
        ticket_rate_id: item.rate._id,
        redirect_url: `${origin}/outxide/checkout/success`,
        error_url: `${origin}/outxide/checkout/cancel`,
        send_resources: true,
        tickets: Array.from({ length: item.quantity }, () => ({
          email: checkoutForm.email,
          full_name: checkoutForm.full_name,
          phone: checkoutForm.phone || undefined,
          birthday: checkoutForm.birthday || undefined,
          price_id: item.rate.current_price._id,
        })),
      };

      const res = await fetch("/api/fourvenues/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al procesar el pago");

      if (data.data?.payment_url) {
        window.location.href = data.data.payment_url;
      }
    } catch (err) {
      setError((err as Error).message || "No se pudo iniciar el pago");
      setCheckoutLoading(false);
    }
  }

  // --- Derived ---
  const freeRates = rates.filter(
    (r) => r.current_price.price === 0 && r.available,
  );
  const paidRates = rates.filter((r) => r.current_price.price > 0);
  const soldOutFreeRates = rates.filter(
    (r) => r.current_price.price === 0 && !r.available,
  );

  const fadeSlide = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: 0.25 },
  };

  // =========================================================================
  // Render
  // =========================================================================

  if (loading) {
    return (
      <div className="space-y-4">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    );
  }

  if (error && rates.length === 0) {
    return (
      <div className="rounded-2xl border border-white/5 bg-zinc-950/80 backdrop-blur p-8 text-center">
        <p className="text-muted-foreground">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 text-sm text-outxide hover:underline"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (rates.length === 0) {
    return (
      <div className="rounded-2xl border border-white/5 bg-zinc-950/80 backdrop-blur p-12 text-center">
        <Ticket className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">
          No hay entradas disponibles para este evento.
        </p>
      </div>
    );
  }

  return (
    <motion.div {...fadeSlide} className="space-y-6">
      {/* Error toast */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          >
            {error}
            <button
              onClick={() => setError(null)}
              className="ml-3 text-red-400 hover:text-red-200 underline"
            >
              Cerrar
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Free / invitation tickets */}
      {(freeRates.length > 0 || soldOutFreeRates.length > 0) && (
        <section>
          <h3 className="text-xs tracking-[0.2em] text-outxide/60 uppercase mb-3">
            Invitaciones
          </h3>
          <div className="space-y-3">
            {[...freeRates, ...soldOutFreeRates].map((rate) => {
              const isSoldOut = !rate.available;
              return (
                <div
                  key={rate._id}
                  className={`rounded-2xl border bg-zinc-950/80 backdrop-blur p-5 ${
                    isSoldOut
                      ? "border-white/5 opacity-60"
                      : "border-white/5 hover:border-outxide/20"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-white">{rate.name}</h4>
                      {rate.current_price.includes && (
                        <p className="text-sm text-muted-foreground mt-1 whitespace-pre-line line-clamp-3">
                          {rate.current_price.includes}
                        </p>
                      )}
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="text-lg font-bold text-emerald-400">
                        Gratis
                      </span>
                      {isSoldOut && (
                        <p className="text-xs text-red-400 mt-1">Agotado</p>
                      )}
                    </div>
                  </div>
                  {rate.available && (
                    <div className="mt-3 flex justify-end">
                      <QuantitySelector
                        value={cart[rate._id] ?? 0}
                        max={Math.min(rate.max, rate.availability.available)}
                        onChange={(v) => updateCart(rate._id, v)}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Paid tickets */}
      {paidRates.length > 0 && (
        <section>
          <h3 className="text-xs tracking-[0.2em] text-outxide/60 uppercase mb-3">
            Entradas
          </h3>
          <div className="space-y-3">
            {paidRates.map((rate) => {
              const { price, fee_type, fee_quantity, includes } = rate.current_price;
              const total = calcTotal(price, fee_type, fee_quantity);
              const hasFee = fee_quantity > 0;
              const soldOut = !rate.available;
              const isFuture = new Date(rate.valid_from) > new Date();

              return (
                <div
                  key={rate._id}
                  className={`rounded-2xl border bg-zinc-950/80 backdrop-blur p-5 transition-colors ${
                    soldOut
                      ? "border-white/5 opacity-60"
                      : "border-white/5 hover:border-outxide/20"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-white">{rate.name}</h4>
                      {includes && (
                        <p className="text-sm text-muted-foreground mt-0.5 whitespace-pre-line line-clamp-2">
                          {includes}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6">
                      <div className="text-right">
                        {hasFee && (
                          <span className="text-xs text-muted-foreground line-through mr-2">
                            {fmt(price)}
                          </span>
                        )}
                        <span className="text-lg font-bold text-white">
                          {fmt(total)}
                        </span>
                      </div>

                      {rate.available && !soldOut && !isFuture && (
                        <QuantitySelector
                          value={cart[rate._id] ?? 0}
                          max={Math.min(rate.max, rate.availability.available)}
                          onChange={(v) => updateCart(rate._id, v)}
                        />
                      )}

                      {soldOut && (
                        <span className="text-sm text-red-400 font-medium">
                          Agotado
                        </span>
                      )}
                    </div>
                  </div>

                  {isFuture && !soldOut && (
                    <div className="mt-4 flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-3">
                      <Clock className="h-4 w-4 text-outxide shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        Disponible próximamente
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Cart summary */}
      <AnimatePresence>
        {cartCount > 0 && !showCheckout && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="sticky bottom-4 z-30"
          >
            <div className="glass-strong rounded-2xl p-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  {cartCount} entrada{cartCount !== 1 && "s"}
                </p>
                <p className="text-lg font-bold text-white">{fmt(cartTotal)}</p>
              </div>
              <button
                onClick={() => setShowCheckout(true)}
                className="flex items-center gap-2 rounded-xl bg-outxide hover:bg-outxide/80 text-white px-6 py-3 text-sm font-medium transition-colors"
              >
                Continuar
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkout form */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="rounded-2xl border border-outxide/20 bg-zinc-950/80 backdrop-blur p-6 space-y-6">
              <h3 className="text-lg font-bold text-white">
                Resumen del pedido
              </h3>

              <div className="space-y-2">
                {cartItems.map((item) => (
                  <div
                    key={item.rate._id}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-muted-foreground">
                      {item.quantity}x {item.rate.name}
                    </span>
                    <span className="text-white font-medium">
                      {fmt(item.totalPrice)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-white/10 pt-2 flex items-center justify-between">
                  <span className="text-white font-medium">Total</span>
                  <span className="text-lg font-bold text-outxide">
                    {fmt(cartTotal)}
                  </span>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCheckout();
                }}
                className="space-y-4"
              >
                <h4 className="text-sm font-medium text-white">
                  Datos del comprador
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Nombre completo"
                    value={checkoutForm.full_name}
                    onChange={(e) =>
                      setCheckoutForm((f) => ({ ...f, full_name: e.target.value }))
                    }
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-outxide/50"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={checkoutForm.email}
                    onChange={(e) =>
                      setCheckoutForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-outxide/50"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Teléfono"
                    value={checkoutForm.phone}
                    onChange={(e) =>
                      setCheckoutForm((f) => ({ ...f, phone: e.target.value }))
                    }
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-outxide/50"
                  />
                  <input
                    type="date"
                    placeholder="Fecha de nacimiento"
                    value={checkoutForm.birthday}
                    onChange={(e) =>
                      setCheckoutForm((f) => ({ ...f, birthday: e.target.value }))
                    }
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 text-sm focus:outline-none focus:ring-2 focus:ring-outxide/50 [color-scheme:dark]"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCheckout(false)}
                    className="flex-1 rounded-xl bg-white/5 hover:bg-white/10 text-white py-3 text-sm font-medium transition-colors"
                  >
                    Volver
                  </button>
                  <button
                    type="submit"
                    disabled={checkoutLoading}
                    className="flex-1 rounded-xl bg-outxide hover:bg-outxide/80 text-white py-3 text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {checkoutLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      <>
                        Pagar {fmt(cartTotal)}
                        <ExternalLink className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
