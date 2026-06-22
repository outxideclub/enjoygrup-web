"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  Send,
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Mail,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";
import { EnjoyLogo, OutxideLogo, HiruLogo } from "@/components/ui/logos";
import dynamic from "next/dynamic";
import { useT } from "@/i18n";

const AmbientGlow = dynamic(
  () =>
    import("@/components/ui/ambient-glow").then((m) => ({
      default: m.AmbientGlow,
    })),
  { ssr: false }
);

const venueCards = [
  {
    id: "enjoy" as const,
    name: "Enjoy Terrace",
    logo: EnjoyLogo,
    accent: "text-enjoy",
    accentIcon: "text-enjoy",
    border: "border-enjoy/20",
    glowClass: "hover-glow-enjoy",
    gradient: "from-pink-500/20 to-pink-900/10",
    addressKey: "contact.enjoyAddress" as const,
    phoneKey: "contact.enjoyPhone" as const,
    hoursKey: "contact.enjoyHours" as const,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Enjoy+Terrace+Av+Tucan+1+Alcudia",
  },
  {
    id: "outxide" as const,
    name: "Outxide Club",
    logo: OutxideLogo,
    accent: "text-outxide",
    accentIcon: "text-outxide",
    border: "border-outxide/20",
    glowClass: "hover-glow-outxide",
    gradient: "from-cyan-500/20 to-violet-500/10",
    addressKey: "contact.outxideAddress" as const,
    phoneKey: "contact.outxidePhone" as const,
    hoursKey: "contact.outxideHours" as const,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Outxide+Club+Av+Tucan+1+Alcudia",
  },
  {
    id: "hiru" as const,
    name: "Hiru Food & Drinks",
    logo: HiruLogo,
    accent: "text-hiru",
    accentIcon: "text-hiru",
    border: "border-hiru/20",
    glowClass: "hover-glow-hiru",
    gradient: "from-amber-800/20 to-amber-950/10",
    addressKey: "contact.hiruAddress" as const,
    phoneKey: "contact.hiruPhone" as const,
    hoursKey: "contact.hiruHours" as const,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Hiru+Food+Drinks+Ctra+Arta+40+Alcudia",
  },
];

export default function ContactPage() {
  const t = useT();

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    venue: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (
      !formState.name.trim() ||
      !formState.email.trim() ||
      !formState.message.trim()
    ) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setFormState({ name: "", email: "", venue: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  const isLoading = status === "loading";

  return (
    <div className="noise-texture relative">
      <AmbientGlow venue="home" />
      <Navbar />
      <main>
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(236,72,153,0.12)_0%,transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 pt-32 pb-20 text-center">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-white/40 uppercase mb-4">
              {t("contact.heroSubtitle")}
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight uppercase">
              {t("contact.heroTitle")}
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Form + Quick Contact */}
      <section className="grain-overlay py-24 relative">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Form */}
            <ScrollReveal>
              <div className="glass-card rounded-3xl p-8 md:p-10">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-white/70 mb-2"
                    >
                      {t("contact.formName")}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => {
                        setFormState((s) => ({ ...s, name: e.target.value }));
                        if (status === "error") setStatus("idle");
                      }}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-enjoy/40 focus:ring-1 focus:ring-enjoy/20 transition-colors"
                      placeholder={t("contact.formName")}
                      disabled={isLoading}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-white/70 mb-2"
                    >
                      {t("contact.formEmail")}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => {
                        setFormState((s) => ({ ...s, email: e.target.value }));
                        if (status === "error") setStatus("idle");
                      }}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-enjoy/40 focus:ring-1 focus:ring-enjoy/20 transition-colors"
                      placeholder={t("contact.formEmail")}
                      disabled={isLoading}
                    />
                  </div>

                  {/* Venue Select */}
                  <div>
                    <label
                      htmlFor="contact-venue"
                      className="block text-sm font-medium text-white/70 mb-2"
                    >
                      {t("contact.formVenue")}
                    </label>
                    <select
                      id="contact-venue"
                      value={formState.venue}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, venue: e.target.value }))
                      }
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-enjoy/40 focus:ring-1 focus:ring-enjoy/20 transition-colors appearance-none cursor-pointer"
                      disabled={isLoading}
                    >
                      <option value="" className="bg-neutral-900">
                        {t("contact.formVenue")}
                      </option>
                      <option value="General" className="bg-neutral-900">
                        {t("contact.formVenueGeneral")}
                      </option>
                      <option value="Enjoy Terrace" className="bg-neutral-900">
                        {t("contact.formVenueEnjoy")}
                      </option>
                      <option value="Outxide Club" className="bg-neutral-900">
                        {t("contact.formVenueOutxide")}
                      </option>
                      <option
                        value="Hiru Food & Drinks"
                        className="bg-neutral-900"
                      >
                        {t("contact.formVenueHiru")}
                      </option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-white/70 mb-2"
                    >
                      {t("contact.formMessage")}
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(e) => {
                        setFormState((s) => ({
                          ...s,
                          message: e.target.value,
                        }));
                        if (status === "error") setStatus("idle");
                      }}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-enjoy/40 focus:ring-1 focus:ring-enjoy/20 transition-colors resize-none"
                      placeholder={t("contact.formMessage")}
                      disabled={isLoading}
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    size="lg"
                    className="w-full rounded-full bg-white text-black hover:bg-white/90 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="mr-2 h-4 w-4" />
                    )}
                    {t("contact.formSubmit")}
                  </Button>

                  {/* Status messages */}
                  {status === "success" && (
                    <div className="flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/10 p-4">
                      <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <p className="text-sm text-green-300">
                        {t("contact.formSuccess")}
                      </p>
                    </div>
                  )}
                  {status === "error" && (
                    <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4">
                      <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                      <p className="text-sm text-red-300">
                        {t("contact.formError")}
                      </p>
                    </div>
                  )}
                </form>
              </div>
            </ScrollReveal>

            {/* Quick Contact */}
            <ScrollReveal delay={0.15}>
              <div className="space-y-6">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/34657878917"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 glass-card rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {t("contact.whatsappCta")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      +34 657 87 89 17
                    </p>
                  </div>
                  <ExternalLink className="ml-auto h-4 w-4 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                {/* Email */}
                <a
                  href="mailto:info@grupoenjoy.es"
                  className="flex items-center gap-4 glass-card rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-white/70" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {t("contact.emailLabel")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("contact.emailAddress")}
                    </p>
                  </div>
                  <ExternalLink className="ml-auto h-4 w-4 text-white/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Venue Info Cards */}
      <section className="grain-overlay py-24 relative bg-[radial-gradient(ellipse_at_50%_0%,rgba(236,72,153,0.08)_0%,transparent_60%),radial-gradient(ellipse_at_80%_80%,rgba(184,115,51,0.06)_0%,transparent_60%)]">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight uppercase mb-12 text-center">
              {t("contact.venuesTitle")}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {venueCards.map((venue, i) => (
              <ScrollReveal key={venue.id} delay={i * 0.1}>
                <div
                  className={`glass-card rounded-3xl overflow-hidden border ${venue.border} ${venue.glowClass} transition-all duration-300 h-full flex flex-col`}
                >
                  {/* Logo Header */}
                  <div
                    className={`relative p-6 pb-4 bg-gradient-to-b ${venue.gradient} flex justify-center`}
                  >
                    <venue.logo className="h-8 w-auto" />
                  </div>

                  {/* Info */}
                  <div className="p-6 pt-3 flex flex-col flex-1">
                    <div className="space-y-4 flex-1">
                      <div className="flex items-start gap-3">
                        <MapPin
                          className={`h-4 w-4 mt-0.5 flex-shrink-0 ${venue.accentIcon}`}
                        />
                        <div>
                          <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-1">
                            {t("contact.address")}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {t(venue.addressKey)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone
                          className={`h-4 w-4 mt-0.5 flex-shrink-0 ${venue.accentIcon}`}
                        />
                        <div>
                          <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-1">
                            {t("contact.phone")}
                          </p>
                          <a
                            href={`tel:${t(venue.phoneKey).replace(/\s/g, "")}`}
                            className="text-sm text-muted-foreground hover:text-white transition-colors"
                          >
                            {t(venue.phoneKey)}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock
                          className={`h-4 w-4 mt-0.5 flex-shrink-0 ${venue.accentIcon}`}
                        />
                        <div>
                          <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-1">
                            {t("contact.hours")}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {t(venue.hoursKey)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-white/5">
                      <a
                        href={venue.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 text-sm font-medium ${venue.accent} hover:underline underline-offset-4 transition-colors`}
                      >
                        {t("contact.viewOnMaps")}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="grain-overlay py-24 relative bg-[radial-gradient(ellipse_at_80%_50%,rgba(6,182,212,0.08)_0%,transparent_60%)]">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight uppercase mb-10 text-center">
              {t("contact.mapTitle")}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="rounded-3xl overflow-hidden border border-white/10">
              <iframe
                src="https://www.google.com/maps?q=Enjoy+Cafe+Lounge,+Av.+Tuc%C3%A1n+1,+Port+d'Alc%C3%BAdia,+Mallorca&output=embed"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={t("contact.mapTitle")}
                className="w-full"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
