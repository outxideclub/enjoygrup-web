import Image from "next/image";
import { ArrowDown, ArrowRight, MapPin } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getServerLocale, getServerT } from "@/i18n/server";
import type { Locale } from "@/i18n/config";
import type { PublishedOffer } from "@/lib/empresas/offer";
import { resolveNow } from "@/lib/empresas/schedule";
import { resolveEmpresasView, type FormatView } from "@/lib/empresas/view";
import { cn } from "@/lib/utils";
import { EmpresasForm } from "./empresas-form";
import { getEmpresasGames, getEmpresasPhoto, type ResolvedPhoto } from "./photos";

// Landing de CELEBRACIONES DE EMPRESA, destino de la campaña de Meta
// GRUPOENJOY | 20261108 | EMPRESAS (22-oct → 8-nov-2026). Concepto del dueño:
// NO son cenas en nuestras salas. La empresa come o cena donde quiera y la
// celebración sigue con nosotros: la tarde en Enjoy Terrace y la noche en
// OUTXIDE. Página de SERVIDOR: todo el texto llega en el HTML (rápida en el
// navegador de Instagram); la única isla cliente es el formulario.
//
// Textos, colores y fotos: paquete creativo PROVISIONAL de la sesión META ADS
// (CREATIVO-LANDING-EMPRESAS.md v0.5), cargado en src/lib/empresas/content.ts.
// Qué se pinta en cada idioma y a cada hora lo decide src/lib/empresas/view.ts.
//
// Orden (paquete §3): primera pantalla · los dos formatos · fin de temporada
// (hasta el dom 8-nov) y Navidad · qué incluye · formulario · preguntas
// frecuentes · pie con la placa +18. Halloween, OUTXIDIOUS y el tardeo no se
// nombran aquí (paquete v0.3): es otra campaña.
//
// Reglas de página destino de anuncios (no se rompen): «+18 · Consumo
// responsable» en la primera pantalla, junto al formulario y en el pie; muro
// +18 del layout (el mismo de /outxide); nada de bebida como gancho, shisha,
// cupos ni fechas que caduquen; sin precio mientras offer.ts esté vacía.

type SearchParams = Record<string, string | string[] | undefined>;

const NUMBER_LOCALE: Record<Locale, string> = { es: "es-ES", en: "en-GB", de: "de-DE", fr: "fr-FR", it: "it-IT" };

function formatPrice(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(NUMBER_LOCALE[locale], {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/** Placa legal: literal, en su caja #1E1F1F con letra #F8F8F8 (nunca gris sobre foto). */
function AdultPlate({ text, testId, className }: { text: string; testId: string; className?: string }) {
  return (
    <p data-testid={testId} className={cn("emp-plate", className)}>
      {text}
    </p>
  );
}

/** Botón al formulario de la propia página (único destino). */
function QuoteLink({ text, testId, className }: { text: string; testId?: string; className?: string }) {
  return (
    <a href="#solicitud" data-testid={testId} className={cn("emp-btn", className)}>
      {text}
      <ArrowDown className="h-4 w-4" aria-hidden />
    </a>
  );
}

type StepTone = "neutral" | "enjoy" | "gold";

const STEP_TONE: Record<StepTone, string> = {
  neutral: "border-[var(--emp-field-border)] text-[var(--emp-text)]",
  enjoy: "border-[var(--emp-enjoy)] text-[var(--emp-enjoy)]",
  gold: "border-[var(--emp-gold)] text-[var(--emp-gold)]",
};

/** Recorrido numerado (paquete §4.3: «1 · … → 2 · …»). */
function Steps({ steps, tones, games }: { steps: string[]; tones: StepTone[]; games?: { index: number; items: ResolvedPhoto[] } }) {
  return (
    <ol className="mt-5 space-y-3">
      {steps.map((step, i) => (
        <li key={step} className="flex items-start gap-3">
          <span
            className={cn(
              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-sm font-semibold",
              STEP_TONE[tones[i] ?? "neutral"],
            )}
            aria-hidden
          >
            {i + 1}
          </span>
          <div className="min-w-0 pt-0.5">
            <span className="text-[0.9375rem] font-medium leading-snug text-[var(--emp-text)]">{step}</span>
            {games && games.index === i && (
              <ul className="mt-2 flex items-end gap-4" data-testid="empresas-games">
                {games.items.map((g) => (
                  <li key={g.src} className="flex h-12 items-end">
                    <Image
                      src={g.src}
                      alt={g.alt}
                      width={g.width ?? 120}
                      height={g.height ?? 80}
                      sizes="72px"
                      className="h-12 w-auto object-contain"
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

function FormatCard({
  testId,
  format,
  photo,
  accent,
  eyebrowTone,
  tones,
  signatureTones,
  games,
}: {
  testId: string;
  format: FormatView;
  photo: ResolvedPhoto;
  accent: "gold" | "split";
  eyebrowTone: "gold" | "enjoy";
  tones: StepTone[];
  signatureTones: ("enjoy" | "gold")[];
  games?: { index: number; items: ResolvedPhoto[] };
}) {
  return (
    <article data-testid={testId} className="emp-card flex h-full flex-col overflow-hidden rounded-2xl">
      <div className={cn("h-1", accent === "gold" ? "emp-accent-gold" : "emp-accent-split")} aria-hidden />
      <div className="relative aspect-[2/1]">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 576px"
          className="object-cover"
          style={photo.position ? { objectPosition: photo.position } : undefined}
        />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className={cn("emp-eyebrow", eyebrowTone === "gold" ? "emp-eyebrow--gold" : "emp-eyebrow--enjoy")}>{format.eyebrow}</p>
        <h3 className="emp-h3 mt-2">{format.title}</h3>
        <Steps steps={format.steps} tones={tones} games={games} />
        <p className="emp-body mt-5 text-[var(--emp-text-2)]">{format.text}</p>
        {format.signatures.length > 0 && (
          <p className="emp-signature mt-auto flex flex-wrap items-center gap-2 pt-5" data-testid={`${testId}-signature`}>
            {format.signatures.map((sig, i) => (
              <span key={sig} className="inline-flex items-center gap-2">
                {i > 0 && <ArrowRight className="h-3.5 w-3.5 text-[var(--emp-text-2)]" aria-hidden />}
                <span className={signatureTones[i] === "enjoy" ? "text-[var(--emp-enjoy)]" : "text-[var(--emp-gold)]"}>{sig}</span>
              </span>
            ))}
          </p>
        )}
      </div>
    </article>
  );
}

function OfferBlock({
  offer,
  heading,
  t,
  locale,
}: {
  offer: PublishedOffer;
  heading: { eyebrow: string; title: string | null; closing: string | null } | null;
  t: (k: string) => string;
  locale: Locale;
}) {
  return (
    <div data-testid="empresas-offer" className="emp-card space-y-4 rounded-2xl p-6 text-left sm:p-8">
      {heading && <p className="emp-eyebrow">{heading.eyebrow}</p>}
      {heading?.title && <h2 className="emp-h2">{heading.title}</h2>}
      <div>
        <p className="text-sm font-semibold text-[var(--emp-text)]">{t("empresas.offerIncludes")}</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-[0.9375rem] text-[var(--emp-text)]">
          {offer.incluye.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <p className="text-[var(--emp-text)]">
        <span className="sr-only">{t("empresas.offerPrice")}: </span>
        <span className="font-display text-3xl font-bold">{formatPrice(offer.precioConIva, locale)}</span>{" "}
        <span className="text-sm text-[var(--emp-text-2)]">
          {offer.unidad === "persona" ? t("empresas.offerPerPerson") : t("empresas.offerPerGroup")} · {t("empresas.offerVatIncluded")}
        </span>
      </p>
      <p className="emp-muted">{t("empresas.offerMinPeople").replace("{n}", String(offer.minimoPersonas))}</p>
      <p className="emp-muted">
        <span className="font-semibold text-[var(--emp-text)]">{t("empresas.offerDates")}:</span> {offer.fechas}
      </p>
      {heading?.closing && <p className="emp-body">{heading.closing}</p>}
    </div>
  );
}

export default async function EmpresasPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const [sp, locale] = await Promise.all([searchParams, getServerLocale()]);
  const t = getServerT(locale);
  // Hora de SERVIDOR (cada petición): decide qué bloques con fecha siguen
  // vivos. `?now=` solo fuera de producción, para probar el antes y el después.
  const now = resolveNow({ query: sp.now, isProduction: process.env.VERCEL_ENV === "production" });
  const view = resolveEmpresasView({ locale, now, t });
  const hero = getEmpresasPhoto("hero", locale, t);
  const night = getEmpresasPhoto("night", locale, t);
  const day = getEmpresasPhoto("day", locale, t);
  const games = getEmpresasGames(locale, t);
  const seasonal = [view.endOfSeason, view.christmas].filter(Boolean).length;

  return (
    <div className="relative">
      <Navbar />
      <main id="contenido">
        {/* 1 · Primera pantalla: todo visible sin desplazar en 375 × 550 (un
            iPhone SE dentro de Instagram): antetítulo, H1, subtítulo, botón al
            formulario y, debajo, la placa +18. La foto va tras una capa negra
            del 85 % (texto blanco ≥ 12,3:1 en el peor píxel, paquete §1.4). */}
        <section data-testid="empresas-hero" className="relative overflow-hidden">
          <Image src={hero.src} alt={hero.alt} fill priority sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-[#0a0a0a]/85" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#0a0a0a]" aria-hidden />
          <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-center px-4 pb-6 pt-[4.5rem] text-center sm:px-6 sm:pb-16 sm:pt-28 md:min-h-[88svh]">
            <p className="emp-eyebrow">{view.hero.eyebrow}</p>
            <h1 className="emp-h1 mt-2">
              {view.hero.h1Lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="mt-3 max-w-2xl text-[0.9375rem] leading-normal text-[var(--emp-text)] sm:mt-5 sm:text-[1.0625rem] sm:leading-relaxed">
              {view.hero.subtitle}
            </p>
            {view.hero.occasions && <p className="emp-muted mt-2 max-w-2xl">{view.hero.occasions}</p>}
            {view.hero.facts && (
              <p data-testid="empresas-hero-facts" className="emp-muted mt-2 max-w-2xl">
                {view.hero.facts}
              </p>
            )}
            <QuoteLink text={view.hero.cta} testId="empresas-hero-cta" className="mt-5 w-full sm:w-auto" />
            <AdultPlate text={view.hero.plate} testId="empresas-adult-hero" className="mt-4" />
          </div>
        </section>

        {/* 2 · Los dos formatos */}
        <section aria-labelledby="empresas-formatos" className="relative py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
              <p className="emp-eyebrow">{view.formats.eyebrow}</p>
              <h2 id="empresas-formatos" className="emp-h2 mt-3">
                {view.formats.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormatCard
                testId="empresas-format-night"
                format={view.formats.night}
                photo={night}
                accent="gold"
                eyebrowTone="gold"
                tones={["neutral", "gold"]}
                signatureTones={["gold"]}
              />
              <FormatCard
                testId="empresas-format-day"
                format={view.formats.day}
                photo={day}
                accent="split"
                eyebrowTone="enjoy"
                tones={["neutral", "enjoy", "gold"]}
                signatureTones={["enjoy", "gold"]}
                games={{ index: 1, items: games }}
              />
            </div>
            {view.formats.notes.length > 0 && (
              <div className="mt-10 flex flex-col items-center gap-2 text-center">
                {view.formats.notes.map((note, i) => (
                  <p key={note} className="emp-muted flex items-start gap-2">
                    {i === 0 && <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />}
                    <span>{note}</span>
                  </p>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 3 · Fin de temporada (hasta el dom 8-nov a las 23:59:59, lo decide
            el servidor) y Navidad (desde el primer día). */}
        {seasonal > 0 && (
          <section className="relative border-y border-[var(--emp-line)] py-16 md:py-20">
            <div className={cn("mx-auto grid grid-cols-1 gap-6 px-4 sm:px-6", seasonal === 2 ? "max-w-6xl md:grid-cols-2" : "max-w-3xl")}>
              {view.endOfSeason && (
                <article data-testid="empresas-end-of-season" className="emp-card flex flex-col rounded-2xl p-6 sm:p-8">
                  <p className="emp-eyebrow">{view.endOfSeason.eyebrow}</p>
                  <h2 className="emp-h2 mt-3">{view.endOfSeason.title}</h2>
                  <p className="emp-body mt-4 text-[var(--emp-text-2)]">{view.endOfSeason.text}</p>
                  <QuoteLink text={view.endOfSeason.cta} className="mt-6 w-full self-start sm:w-auto" />
                </article>
              )}
              {view.christmas && (
                <article data-testid="empresas-christmas" className="emp-card flex flex-col overflow-hidden rounded-2xl p-6 sm:p-8">
                  <div className="-mx-6 -mt-6 mb-6 h-1 emp-accent-gold sm:-mx-8 sm:-mt-8" aria-hidden />
                  <p className="emp-eyebrow emp-eyebrow--gold">{view.christmas.eyebrow}</p>
                  <h2 className="emp-h2 mt-3">{view.christmas.title}</h2>
                  <p className="emp-body mt-4 text-[var(--emp-text-2)]">{view.christmas.text}</p>
                  {view.christmas.dates && <p className="emp-body mt-3">{view.christmas.dates}</p>}
                  <QuoteLink text={view.christmas.cta} className="mt-6 w-full self-start sm:w-auto" />
                </article>
              )}
            </div>
          </section>
        )}

        {/* 4 · Qué incluye · precio · mínimo. Sin oferta publicada (offer.ts),
            la versión de hoy: ni oferta, ni precio, ni correo de destino. */}
        <section aria-labelledby={view.proposal.custom?.title ? "empresas-propuesta" : undefined} className="relative py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            {view.proposal.custom && (
              <>
                {view.proposal.custom.title && (
                  <h2 id="empresas-propuesta" className="emp-h2">
                    {view.proposal.custom.title}
                  </h2>
                )}
                <p data-testid="empresas-offer-custom" className="emp-body mx-auto mt-4 text-[var(--emp-text-2)]">
                  {view.proposal.custom.text}
                </p>
              </>
            )}
            {view.proposal.offer && <OfferBlock offer={view.proposal.offer} heading={view.proposal.offerHeading} t={t} locale={locale} />}
          </div>
        </section>

        {/* 5 · Formulario */}
        <section id="solicitud" aria-labelledby="empresas-solicitud" className="relative scroll-mt-24 pb-16 md:pb-24">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="mb-8 text-center">
              <p className="emp-eyebrow emp-eyebrow--enjoy">{view.form.eyebrow}</p>
              <h2 id="empresas-solicitud" className="emp-h2 mt-3">
                {view.form.title}
              </h2>
              <p className="emp-body mx-auto mt-4 text-[var(--emp-text-2)]">{view.form.intro}</p>
            </div>
            <div className="emp-card rounded-3xl p-5 sm:p-8 md:p-10">
              <AdultPlate text={view.hero.plate} testId="empresas-adult-form" className="mb-6" />
              <EmpresasForm copy={view.form.copy} />
            </div>
          </div>
        </section>

        {/* 6 · Preguntas frecuentes (todas visibles: sin JS ni desplegables). */}
        {view.faq && (
          <section aria-labelledby="empresas-faq" data-testid="empresas-faq" className="relative border-t border-[var(--emp-line)] py-16 md:py-20">
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
              <h2 id="empresas-faq" className="emp-h2 mb-8 text-center">
                {t("blog.faqTitle")}
              </h2>
              <dl className="space-y-4">
                {view.faq.map((item) => (
                  <div key={item.question} className="emp-card rounded-xl p-5 sm:p-6" data-testid="empresas-faq-item">
                    <dt className="emp-h3">{item.question}</dt>
                    <dd className="emp-body mt-2 text-[var(--emp-text-2)]">{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        )}
      </main>
      {/* 7 · Pie de la web con la placa +18. adLanding: sin «Shisha» en el pie. */}
      <Footer adLanding adultPlate={view.footerPlate} />
    </div>
  );
}
