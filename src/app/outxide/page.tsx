"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Music,
  Calendar,
  Ticket,
  Clock,
  MapPin,
  ExternalLink,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";
import { MOCK_EVENTS, MOCK_VENUE } from "@/lib/fourvenues";
import type { FourVenuesEvent } from "@/lib/fourvenues";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("es-ES", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function getLowestAvailablePrice(event: FourVenuesEvent): string {
  if (!event.tickets || event.tickets.length === 0) return `${event.price}€`;
  const available = event.tickets.filter((t) => t.available > 0);
  if (available.length === 0) return "Agotado";
  const lowest = Math.min(...available.map((t) => t.price));
  return lowest === 0 ? "Gratis" : `Desde ${lowest}€`;
}

function getTotalAvailable(event: FourVenuesEvent): number {
  if (!event.tickets) return 0;
  return event.tickets.reduce((sum, t) => sum + t.available, 0);
}

const galleryImages = [
  "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=400&h=400&fit=crop",
];

export default function OutxidePage() {
  const events = MOCK_EVENTS;

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=1920&h=1080&fit=crop"
            alt="Outxide Club"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.15),transparent_70%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Grupo Enjoy
            </Link>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Music className="h-6 w-6 text-outxide" />
            </div>
            <h1 className="font-display text-6xl md:text-8xl font-bold text-white tracking-tight">
              Outxide
            </h1>
            <p className="mt-2 text-lg tracking-[0.3em] text-outxide/80 uppercase">
              Club
            </p>
            <p className="mt-6 max-w-lg mx-auto text-muted-foreground text-lg italic">
              The night continues
            </p>
            <p className="mt-3 max-w-lg mx-auto text-muted-foreground">
              Discoteca y club nocturno. La nueva referencia en vida nocturna de
              Alcúdia. Música, energía y noches que no olvidarás.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Info bar */}
      <section className="border-y border-white/5 bg-card/50">
        <div className="mx-auto max-w-4xl px-6 py-6 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-outxide" />
            <span>Abierto diario: 17:00 – 05:30</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-outxide" />
            <span>{MOCK_VENUE.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-outxide" />
            <span>Aforo: {MOCK_VENUE.capacity}</span>
          </div>
        </div>
      </section>

      {/* Events Calendar */}
      <section id="eventos" className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm tracking-[0.3em] text-outxide/60 uppercase mb-4">
                Calendario
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
                Próximos eventos
              </h2>
              <p className="mt-4 text-muted-foreground">
                Reserva tu entrada y asegura tu sitio
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, i) => {
              const priceLabel = getLowestAvailablePrice(event);
              const totalAvailable = getTotalAvailable(event);
              const isSoldOut = priceLabel === "Agotado";

              return (
                <ScrollReveal key={event.id} delay={i * 0.1}>
                  <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-card transition-all duration-500 hover:border-outxide/30 flex flex-col">
                    {/* Event image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={`https://images.unsplash.com/photo-${
                          [
                            "1571266028243-e4733b0f0bb0",
                            "1516450360452-9312f5e86fc7",
                            "1493225457124-a3eb161ffa5f",
                            "1574391884720-bbc3740c59d1",
                            "1470225620780-dba8ba36b745",
                            "1459749411175-04bf5292ceea",
                          ][i % 6]
                        }?w=600&h=400&fit=crop`}
                        alt={event.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

                      {/* Date badge */}
                      <div className="absolute top-4 left-4 glass rounded-lg px-3 py-1.5">
                        <span className="text-xs font-semibold text-white">
                          {formatDate(event.date)}
                        </span>
                      </div>

                      {/* Price badge */}
                      <div
                        className={`absolute top-4 right-4 rounded-lg px-3 py-1.5 ${
                          isSoldOut
                            ? "bg-destructive/90"
                            : "bg-outxide/90"
                        }`}
                      >
                        <span className="text-xs font-bold text-white">
                          {priceLabel}
                        </span>
                      </div>
                    </div>

                    {/* Event info */}
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-white mb-1 line-clamp-2">
                        {event.title}
                      </h3>
                      <p className="text-sm text-outxide mb-1">{event.dj}</p>
                      <p className="text-xs text-muted-foreground mb-2">
                        {event.genre} · {event.time}h
                      </p>
                      <p className="text-xs text-muted-foreground mb-4 line-clamp-2 flex-1">
                        {event.description}
                      </p>

                      {/* Ticket tiers summary */}
                      {event.tickets && event.tickets.length > 0 && (
                        <div className="mb-4 space-y-1.5">
                          {event.tickets.map((tier) => (
                            <div
                              key={tier.id}
                              className="flex items-center justify-between text-xs"
                            >
                              <span className="text-muted-foreground">
                                {tier.name}
                              </span>
                              <span
                                className={
                                  tier.available === 0
                                    ? "text-destructive line-through"
                                    : "text-white"
                                }
                              >
                                {tier.price === 0
                                  ? "Gratis"
                                  : `${tier.price}€`}
                                {tier.available === 0 && " Agotado"}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      <Button
                        asChild
                        size="sm"
                        className={`w-full rounded-lg text-white ${
                          isSoldOut
                            ? "bg-muted cursor-not-allowed"
                            : "bg-outxide hover:bg-outxide/80"
                        }`}
                        disabled={isSoldOut}
                      >
                        <a
                          href={event.ticketUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Ticket className="h-4 w-4 mr-2" />
                          {isSoldOut ? "Sold Out" : "Comprar entrada"}
                        </a>
                      </Button>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* FourVenues integration badge */}
          <ScrollReveal>
            <div className="mt-12 text-center">
              <a
                href="https://web.fourvenues.com/es/outxide-club"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 glass rounded-full px-6 py-3 hover:border-outxide/30 transition-colors"
              >
                <Calendar className="h-4 w-4 text-outxide" />
                <span className="text-sm text-muted-foreground">
                  Eventos y entradas via{" "}
                  <span className="text-white font-medium">FourVenues</span>
                </span>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 md:py-32 bg-card/30">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm tracking-[0.3em] text-outxide/60 uppercase mb-4">
                El club
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
                Vive la experiencia
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((src, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="group relative overflow-hidden rounded-xl aspect-square">
                  <img
                    src={src}
                    alt={`Outxide Club ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
