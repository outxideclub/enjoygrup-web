import Image from "next/image";
import { ArrowDown, ArrowRight, CalendarCheck, ClipboardList, MapPin, PartyPopper, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getServerLocale, getServerT } from "@/i18n/server";
import type { Locale } from "@/i18n/config";
import { EMPRESAS_CONTENT, approvedText } from "@/lib/empresas/content";
import { getPublishedOffer, type PublishedOffer } from "@/lib/empresas/offer";
import { cn } from "@/lib/utils";
import { EmpresasForm } from "./empresas-form";
import { getEmpresasPhoto } from "./photos";

// Landing de CELEBRACIONES DE EMPRESA (destino de la campaña de Meta que arranca
// el 22-oct-2026; la página no caduca: sirve para fin de temporada y Navidad).
// Concepto del dueño: NO son cenas en nuestras salas. La empresa come o cena
// donde quiera (un hotel, el suyo) y la celebración sigue con nosotros: la
// tarde en Enjoy Terrace y la noche en OUTXIDE. Página de servidor: todo el
// texto llega en el HTML (rápida en el navegador de Instagram); la única isla
// cliente es el formulario.
//
// MARCADOR NEUTRO (19-oct-2026): el contenido creativo no está aprobado. Los
// textos salen del diccionario (neutros, factuales, sin eslogan) salvo los
// huecos que se aprueben en src/lib/empresas/content.ts; la oferta, solo si
// src/lib/empresas/offer.ts está publicada y completa.
//
// Reglas de página destino de anuncios (no se rompen): +18 y consumo
// responsable en la primera pantalla y junto al formulario; nada de bebida
// como gancho; ninguna cantidad ni % de plazas; sin días ni horarios que no
// estén confirmados (el horario de OUTXIDE, solo como dato general).

const NUMBER_LOCALE: Record<Locale, string> = { es: "es-ES", en: "en-GB", de: "de-DE", fr: "fr-FR", it: "it-IT" };

function formatPrice(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(NUMBER_LOCALE[locale], {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/** Aviso legal +18 (mismo texto en la primera pantalla y junto al formulario). */
function AdultNotice({ text, className, testId }: { text: string; className?: string; testId?: string }) {
  return (
    <p
      data-testid={testId}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/70 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur-sm sm:text-sm",
        className,
      )}
    >
      <ShieldCheck className="h-4 w-4 shrink-0 text-white/80" aria-hidden />
      <span>{text}</span>
    </p>
  );
}

function Steps({ items, className }: { items: { label: string; tone: "enjoy" | "outxide" | "neutral" }[]; className?: string }) {
  const tone = {
    enjoy: "border-enjoy/40 text-enjoy",
    outxide: "border-outxide/40 text-outxide",
    neutral: "border-white/20 text-white/80",
  };
  return (
    <ol className={cn("flex flex-wrap items-center gap-2", className)}>
      {items.map((item, i) => (
        <li key={item.label} className="flex items-center gap-2">
          {i > 0 && <ArrowRight className="h-3.5 w-3.5 shrink-0 text-white/40" aria-hidden />}
          <span className={cn("rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider", tone[item.tone])}>
            {item.label}
          </span>
        </li>
      ))}
    </ol>
  );
}

function OfferBlock({ offer, t, locale }: { offer: PublishedOffer | null; t: (k: string) => string; locale: Locale }) {
  if (!offer) {
    // Sin datos confirmados: ni oferta, ni precio, ni correo de destino.
    return (
      <p data-testid="empresas-offer-custom" className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-base leading-relaxed text-white/85">
        {t("empresas.offerCustom")}
      </p>
    );
  }
  return (
    <div data-testid="empresas-offer" className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">{t("empresas.offerEyebrow")}</p>
      <div>
        <p className="text-sm font-semibold text-white">{t("empresas.offerIncludes")}</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/80">
          {offer.incluye.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <p className="text-white">
        <span className="sr-only">{t("empresas.offerPrice")}: </span>
        <span className="font-display text-3xl font-bold">{formatPrice(offer.precioConIva, locale)}</span>{" "}
        <span className="text-sm text-white/80">
          {offer.unidad === "persona" ? t("empresas.offerPerPerson") : t("empresas.offerPerGroup")} · {t("empresas.offerVatIncluded")}
        </span>
      </p>
      <p className="text-sm text-white/80">{t("empresas.offerMinPeople").replace("{n}", String(offer.minimoPersonas))}</p>
      <p className="text-sm text-white/80">
        <span className="font-semibold text-white">{t("empresas.offerDates")}:</span> {offer.fechas}
      </p>
    </div>
  );
}

export default async function EmpresasPage() {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  const offer = getPublishedOffer(locale);
  const c = EMPRESAS_CONTENT;
  // Texto aprobado del hueco (content.ts) o, si no lo hay, el neutro del diccionario.
  const text = (slot: Parameters<typeof approvedText>[0], key: string) => approvedText(slot, locale) ?? t(key);
  const hero = getEmpresasPhoto("hero", locale, t);
  const night = getEmpresasPhoto("night", locale, t);
  const day = getEmpresasPhoto("day", locale, t);
  const space = getEmpresasPhoto("space", locale, t);

  return (
    <div className="noise-texture relative">
      <Navbar />
      <main id="contenido">
        {/* Primera pantalla: H1 único, +18 arriba (por encima del banner de
            cookies en móvil) y un solo botón al formulario. */}
        <section className="relative overflow-hidden">
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-background" aria-hidden />
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(6,182,212,0.18),transparent_60%),radial-gradient(ellipse_at_85%_40%,rgba(236,72,153,0.16),transparent_60%)]"
            aria-hidden
          />
          <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-4xl flex-col items-center justify-center px-4 pb-16 pt-24 text-center sm:px-6 sm:pb-24 sm:pt-32">
            <AdultNotice text={t("empresas.adultNotice")} testId="empresas-adult-hero" className="mb-5" />
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-white/70 sm:text-sm">{t("empresas.heroEyebrow")}</p>
            <h1 className="font-display text-[1.85rem] font-bold uppercase leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
              {text(c.titular, "empresas.h1")}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">{text(c.entradilla, "empresas.subtitle")}</p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">{t("empresas.occasions")}</p>
            <a
              href="#solicitud"
              className="btn-magnetic mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-8 py-3 text-base font-semibold text-black shadow-lg shadow-white/10 transition-colors hover:bg-white/90"
            >
              {t("empresas.cta")}
              <ArrowDown className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </section>

        {/* Los dos formatos */}
        <section aria-labelledby="empresas-formatos" className="grain-overlay relative py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <ScrollReveal>
              <div className="mb-12 text-center">
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-white/50">{t("empresas.formatsEyebrow")}</p>
                <h2 id="empresas-formatos" className="font-display text-3xl font-bold uppercase text-white md:text-5xl">
                  {t("empresas.formatsTitle")}
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <ScrollReveal className="h-full">
                <article data-testid="empresas-format-night" className="glass-card hover-glow-outxide flex h-full flex-col overflow-hidden rounded-3xl border border-outxide/20">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={night.src}
                      alt={night.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 576px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-outxide">{t("empresas.nightLabel")}</p>
                    <h3 className="mt-2 font-display text-2xl font-bold uppercase text-white md:text-3xl">{text(c.formatoNoche?.titulo, "empresas.nightTitle")}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{text(c.formatoNoche?.texto, "empresas.nightText")}</p>
                    <Steps
                      className="mt-6"
                      items={[
                        { label: t("empresas.nightStepDinner"), tone: "neutral" },
                        { label: t("empresas.nightStepClub"), tone: "outxide" },
                      ]}
                    />
                  </div>
                </article>
              </ScrollReveal>

              <ScrollReveal className="h-full" delay={0.08}>
                <article data-testid="empresas-format-day" className="glass-card hover-glow-enjoy flex h-full flex-col overflow-hidden rounded-3xl border border-enjoy/20">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={day.src}
                      alt={day.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 576px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-8">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-enjoy">{t("empresas.dayLabel")}</p>
                    <h3 className="mt-2 font-display text-2xl font-bold uppercase text-white md:text-3xl">{text(c.formatoTarde?.titulo, "empresas.dayTitle")}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{text(c.formatoTarde?.texto, "empresas.dayText")}</p>
                    <Steps
                      className="mt-6"
                      items={[
                        { label: t("empresas.dayStepLunch"), tone: "neutral" },
                        { label: t("empresas.dayStepTerrace"), tone: "enjoy" },
                        { label: t("empresas.dayStepClub"), tone: "outxide" },
                      ]}
                    />
                  </div>
                </article>
              </ScrollReveal>
            </div>

            <div className="mt-10 flex flex-col items-center gap-2 text-center text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/60" aria-hidden />
                <span>{t("empresas.sameAddress")}</span>
              </p>
              <p>{t("empresas.hoursNote")}</p>
            </div>
          </div>
        </section>

        {/* Cómo funciona */}
        <section aria-labelledby="empresas-pasos" className="relative border-y border-white/5 bg-white/[0.02] py-20 md:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-white/50">{t("empresas.stepsEyebrow")}</p>
              <h2 id="empresas-pasos" className="font-display text-3xl font-bold uppercase text-white md:text-4xl">
                {t("empresas.stepsTitle")}
              </h2>
            </div>
            <ol className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {[
                { icon: ClipboardList, title: "empresas.step1Title", text: "empresas.step1Text" },
                { icon: CalendarCheck, title: "empresas.step2Title", text: "empresas.step2Text" },
                { icon: PartyPopper, title: "empresas.step3Title", text: "empresas.step3Text" },
              ].map((step, i) => (
                <li key={step.title} className="rounded-2xl border border-white/5 bg-white/[0.03] p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 font-display text-lg font-bold text-white" aria-hidden>
                      {i + 1}
                    </span>
                    <step.icon className="h-5 w-5 text-white/60" aria-hidden />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{t(step.title)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t(step.text)}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* La sala */}
        <figure className="relative">
          <div className="relative aspect-[16/9] w-full sm:aspect-[21/9]">
            <Image
              src={space.src}
              alt={space.alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" aria-hidden />
          </div>
          <figcaption className="mx-auto -mt-10 max-w-6xl px-4 text-right text-xs uppercase tracking-[0.2em] text-white/60 sm:px-6">
            {t("empresas.spaceCaption")}
          </figcaption>
        </figure>

        {/* Propuesta + formulario */}
        <section id="solicitud" aria-labelledby="empresas-solicitud" className="grain-overlay relative scroll-mt-24 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-5 lg:gap-14">
            <div className="space-y-6 lg:col-span-2">
              <div>
                <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-white/50">{t("empresas.formEyebrow")}</p>
                <h2 id="empresas-solicitud" className="font-display text-3xl font-bold uppercase text-white md:text-4xl">
                  {t("empresas.formTitle")}
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">{t("empresas.formIntro")}</p>
              </div>
              <OfferBlock offer={offer} t={t} locale={locale} />
            </div>
            <div className="lg:col-span-3">
              <div className="glass-card rounded-3xl p-5 sm:p-8 md:p-10">
                <AdultNotice text={t("empresas.adultNotice")} testId="empresas-adult-form" className="mb-6" />
                <EmpresasForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* adLanding: sin «Shisha» en el pie (página destino de anuncios). */}
      <Footer adLanding />
    </div>
  );
}
