// Qué se pinta en /empresas para un idioma y una hora. PURO: recibe el
// diccionario (`t`), la hora y la configuración, y devuelve cadenas ya
// resueltas (o null = no se pinta). La página de servidor solo maqueta lo que
// sale de aquí y e2e/empresas.spec.ts lo prueba sin navegador.
//
// Reglas de resolución:
// - Texto del paquete (content.ts) en ese idioma si lo hay; si no, el NEUTRO
//   del diccionario cuando existe; si no existe versión neutra, el bloque no se
//   pinta (DE/FR/IT no tienen fin de temporada, Navidad, FAQ ni línea de datos).
// - Lo que caduca se decide con `now` (schedule.ts), calculado en el servidor.

import type { Locale } from "@/i18n/config";
import {
  EMPRESAS_CONTENT,
  contentLines,
  contentText,
  type EmpresasContent,
  type EmpresasFormCopy,
  type EmpresasFormCopyKey,
} from "./content";
import { getPublishedOffer, EMPRESAS_OFFER, type EmpresasOffer, type PublishedOffer } from "./offer";
import { isBefore } from "./schedule";

export interface FormatView {
  eyebrow: string;
  title: string;
  text: string;
  steps: string[];
  /** Firmas de marca (solo con texto del paquete). */
  signatures: string[];
}

export interface FaqView {
  question: string;
  answer: string;
  /** Enlace dentro de la respuesta (texto exacto que se convierte en enlace). */
  link?: { text: string; href: string };
}

export interface EmpresasView {
  /** El idioma tiene el texto creativo del paquete (hoy: es y en). */
  creative: boolean;
  hero: {
    eyebrow: string;
    h1Lines: string[];
    subtitle: string;
    /** Línea neutra de ocasiones (solo idiomas sin paquete; habla de «temporada»). */
    occasions: string | null;
    facts: string | null;
    cta: string;
    plate: string;
  };
  formats: {
    eyebrow: string;
    title: string;
    night: FormatView;
    day: FormatView;
    /** Notas neutras bajo las tarjetas (solo idiomas sin paquete). */
    notes: string[];
  };
  endOfSeason: { eyebrow: string; title: string; text: string; cta: string } | null;
  christmas: { eyebrow: string; title: string; text: string; dates: string | null; cta: string } | null;
  proposal: {
    /** Sin oferta publicada: título (solo paquete) y texto. */
    custom: { title: string | null; text: string } | null;
    /** Con oferta publicada: datos y, si hay paquete, encabezado y cierre. */
    offer: PublishedOffer | null;
    offerHeading: { eyebrow: string; title: string | null; closing: string | null } | null;
  };
  form: { eyebrow: string; title: string; intro: string; copy: EmpresasFormCopy };
  faq: FaqView[] | null;
  /** Placa +18 del pie (misma redacción que la de la primera pantalla). */
  footerPlate: string;
}

export interface ViewInput {
  locale: Locale;
  now: number;
  t: (key: string) => string;
  /** Ruta localizada de la landing de OUTXIDIOUS (para la frase de entradas). */
  outxidiousHref: string;
  content?: EmpresasContent;
  offer?: EmpresasOffer;
}

const FORM_COPY_KEYS: readonly EmpresasFormCopyKey[] = [
  "fieldCompany",
  "fieldName",
  "fieldPhone",
  "fieldEmail",
  "fieldDate",
  "fieldPeople",
  "fieldFormat",
  "fieldSource",
  "fieldComments",
  "phCompany",
  "phName",
  "phEmail",
  "phComments",
  "helpName",
  "helpPhone",
  "helpDate",
  "helpPeople",
  "formatAfterDinner",
  "formatLunch",
  "formatUndecided",
  "sourceInstagram",
  "sourceFacebook",
  "sourceGoogle",
  "sourceReferral",
  "sourceAlreadyKnew",
  "sourceOther",
  "errCompany",
  "errName",
  "errPhone",
  "errEmail",
  "errDateRequired",
  "errPeopleRequired",
  "errSelect",
  "errConsent",
  "errSummary",
  "errGeneric",
  "submit",
  "sending",
  "successTitle",
  "successText",
];

/** ¿Sigue vivo el bloque de fin de temporada? (también gobierna la línea neutra de ocasiones). */
export function isEndOfSeasonLive(now: number, content: EmpresasContent = EMPRESAS_CONTENT): boolean {
  // Sin configuración no hay hora de retirada: falla cerrado, igual que una fecha mal escrita.
  return isBefore(now, content.finTemporada?.visibleHasta);
}

export function resolveEmpresasView({
  locale,
  now,
  t,
  outxidiousHref,
  content = EMPRESAS_CONTENT,
  offer: offerConfig = EMPRESAS_OFFER,
}: ViewInput): EmpresasView {
  const pick = (value: Parameters<typeof contentText>[0]) => contentText(value, locale, content);
  const lines = (value: Parameters<typeof contentLines>[0]) => contentLines(value, locale, content);
  const c = content;
  const cond = c.condiciones;
  const creative = pick(c.hero?.titular) !== null;
  const seasonLive = isEndOfSeasonLive(now, c);

  // --- 1. Primera pantalla -------------------------------------------------
  const h1 = pick(c.hero?.titular);
  const plate = pick(c.hero?.placa) ?? t("empresas.adultNotice");
  // Antetítulo del cartel del anuncio («Celebra tu fin de temporada en OUTXIDE
  // Club») mientras viva el bloque de fin de temporada; a la misma hora vuelve
  // el neutro del paquete. Mismo reloj que el bloque: nunca uno sin el otro.
  const seasonEyebrow = seasonLive ? pick(c.hero?.eyebrowFinTemporada) : null;
  const hero = {
    eyebrow: seasonEyebrow ?? pick(c.hero?.eyebrow) ?? t("empresas.heroEyebrow"),
    h1Lines: h1 ? h1.split("\n").map((s) => s.trim()).filter(Boolean) : [t("empresas.h1")],
    subtitle: pick(c.hero?.entradilla) ?? t("empresas.subtitle"),
    // La línea neutra habla de las fiestas de fin de temporada: se retira a la
    // misma hora que el bloque del paquete (en noviembre, nada de «temporada»).
    occasions: !creative && seasonLive ? t("empresas.occasions") : null,
    facts: pick(c.hero?.datos),
    cta: pick(c.hero?.boton) ?? t("empresas.cta"),
    plate,
  };

  // --- 2. Los dos formatos -------------------------------------------------
  const format = (
    f: EmpresasContent["formatoNoche"],
    neutral: { eyebrow: string; title: string; text: string; steps: string[] },
  ): FormatView => {
    const steps = lines(f?.pasos);
    const title = pick(f?.titulo);
    return {
      eyebrow: pick(f?.eyebrow) ?? t(neutral.eyebrow),
      title: title ?? t(neutral.title),
      text: pick(f?.texto) ?? t(neutral.text),
      steps: steps ?? neutral.steps.map((k) => t(k)),
      // Las firmas solo acompañan al texto del paquete.
      signatures: title ? (f?.firmas ?? []) : [],
    };
  };
  const formats = {
    eyebrow: pick(c.formatos?.eyebrow) ?? t("empresas.formatsEyebrow"),
    title: pick(c.formatos?.titulo) ?? t("empresas.formatsTitle"),
    night: format(c.formatoNoche, {
      eyebrow: "empresas.nightLabel",
      title: "empresas.nightTitle",
      text: "empresas.nightText",
      steps: ["empresas.nightStepDinner", "empresas.nightStepClub"],
    }),
    day: format(c.formatoTarde, {
      eyebrow: "empresas.dayLabel",
      title: "empresas.dayTitle",
      text: "empresas.dayText",
      steps: ["empresas.dayStepLunch", "empresas.dayStepTerrace", "empresas.dayStepClub"],
    }),
    notes: creative ? [] : [t("empresas.sameAddress"), t("empresas.hoursNote")],
  };

  // --- 3. Fin de temporada (hasta el cambio de tanda) y Navidad -------------
  const fs = c.finTemporada;
  const endOfSeasonParts = seasonLive
    ? { eyebrow: pick(fs?.eyebrow), title: pick(fs?.titulo), text: pick(fs?.texto), cta: pick(fs?.boton) }
    : null;
  const endOfSeason =
    endOfSeasonParts && endOfSeasonParts.eyebrow && endOfSeasonParts.title && endOfSeasonParts.text && endOfSeasonParts.cta
      ? (endOfSeasonParts as { eyebrow: string; title: string; text: string; cta: string })
      : null;

  const nv = c.navidad;
  let christmas: EmpresasView["christmas"] = null;
  if (nv) {
    const eyebrow = pick(nv.eyebrow);
    const cta = pick(nv.boton);
    let title: string | null;
    let text: string | null;
    let dates: string | null = null;
    if (cond.siDiciembre) {
      // Versión A: promete la noche de diciembre en OUTXIDE (solo con el sí de Jose).
      title = pick(nv.conDiciembre.titulo);
      const base = pick(nv.conDiciembre.texto);
      const terrace = cond.siTerrazaDic ? pick(nv.conDiciembre.terraza) : null;
      text = base ? [base, terrace].filter(Boolean).join(" ") : null;
      const fechas = pick(nv.fechasDiciembre);
      const line = pick(nv.conDiciembre.fechas);
      dates = fechas && line ? line.replace("{fechas}", fechas) : null;
    } else {
      // Versión B: sin fechas ni promesas de diciembre.
      title = pick(nv.sinDiciembre.titulo);
      text = pick(nv.sinDiciembre.texto);
    }
    if (eyebrow && cta && title && text) christmas = { eyebrow, title, text, dates, cta };
  }

  // --- 4. Qué incluye · precio · mínimo ------------------------------------
  const offer = getPublishedOffer(locale, offerConfig);
  const proposal: EmpresasView["proposal"] = offer
    ? {
        custom: null,
        offer,
        offerHeading: {
          eyebrow: pick(c.propuesta?.conDatos.eyebrow) ?? t("empresas.offerEyebrow"),
          title: pick(c.propuesta?.conDatos.titulo),
          closing: pick(c.propuesta?.conDatos.cierre),
        },
      }
    : {
        custom: {
          title: pick(c.propuesta?.sinDatos.titulo),
          text: pick(c.propuesta?.sinDatos.texto) ?? t("empresas.offerCustom"),
        },
        offer: null,
        offerHeading: null,
      };

  // --- 5. Formulario -------------------------------------------------------
  const copy: EmpresasFormCopy = {};
  for (const key of FORM_COPY_KEYS) {
    const value = pick(c.formulario?.campos[key]);
    if (value) copy[key] = value;
  }
  // Sin el sí de Jose a la tarde en diciembre, la opción de comida lleva «(según fechas)».
  if (copy.formatLunch && !cond.siTerrazaDic) {
    const suffix = pick(c.formulario?.segunFechas);
    if (suffix) copy.formatLunch = `${copy.formatLunch} ${suffix}`;
  }
  const form = {
    eyebrow: pick(c.formulario?.eyebrow) ?? t("empresas.formEyebrow"),
    title: pick(c.formulario?.titulo) ?? t("empresas.formTitle"),
    intro: pick(c.formulario?.entradilla) ?? t("empresas.formIntro"),
    copy,
  };

  // --- 6. Preguntas frecuentes ---------------------------------------------
  let faq: FaqView[] | null = null;
  if (c.faq) {
    const items: FaqView[] = [];
    for (const item of c.faq.items) {
      const question = pick(item.pregunta);
      const answer = pick(item.respuesta);
      if (question && answer) items.push({ question, answer });
    }
    const hw = c.faq.halloween;
    if (isBefore(now, hw.visibleHasta)) {
      const question = pick(hw.pregunta);
      const base = pick(hw.respuesta);
      if (question && base) {
        const parts = [base];
        if (cond.siGrupos31) {
          const groups = pick(hw.grupos31);
          if (groups) parts.push(groups);
        }
        let link: FaqView["link"];
        if (cond.siVentaOnline && isBefore(now, hw.ventaOnlineHasta)) {
          const tickets = pick(hw.ventaOnline);
          if (tickets) {
            parts.push(tickets);
            link = { text: "grupoenjoy.es/outxide/outxidious", href: outxidiousHref };
          }
        }
        items.push({ question, answer: parts.join(" "), link });
      }
    } else {
      // Desde las 23:00 del 31 entra la de vestimenta, para no quedarse en cinco.
      const question = pick(c.faq.vestimenta.pregunta);
      const answer = pick(c.faq.vestimenta.respuesta);
      if (question && answer) items.push({ question, answer });
    }
    faq = items.length > 0 ? items : null;
  }

  return {
    creative,
    hero,
    formats,
    endOfSeason,
    christmas,
    proposal,
    form,
    faq,
    footerPlate: plate,
  };
}

/** Metadatos propios de /empresas (nunca los generales: hablan de cócteles y shisha). */
export function resolveEmpresasMeta(
  locale: Locale,
  t: (key: string) => string,
  content: EmpresasContent = EMPRESAS_CONTENT,
): { title: string; description: string; ogTitle: string; ogDescription: string; ogImageAlt: string | null } {
  const pick = (value: Parameters<typeof contentText>[0]) => contentText(value, locale, content);
  const m = content.meta;
  const title = pick(m?.title) ?? t("empresas.metaTitle");
  // «Navidad» no entra en la descripción hasta [SI-DICIEMBRE] (la caché de Meta no se refresca).
  const description =
    (content.condiciones.siDiciembre ? pick(m?.descriptionDiciembre) : pick(m?.description)) ??
    t("empresas.metaDescription");
  return {
    title,
    description,
    ogTitle: pick(m?.ogTitle) ?? title,
    ogDescription: pick(m?.ogDescription) ?? description,
    ogImageAlt: pick(m?.ogImageAlt),
  };
}

/** Texto propio del muro +18 en /empresas para un idioma, o undefined (el muro usa sus textos de siempre). */
export function resolveEmpresasAgeGate(
  locale: Locale,
  content: EmpresasContent = EMPRESAS_CONTENT,
): { title: string; description: string; confirm: string; deny: string } | undefined {
  const pick = (value: Parameters<typeof contentText>[0]) => contentText(value, locale, content);
  const w = content.muroEdad;
  const title = pick(w?.title);
  const description = pick(w?.description);
  const confirm = pick(w?.confirm);
  const deny = pick(w?.deny);
  // Todo o nada: nunca un muro con medio texto en un idioma y medio en otro.
  return title && description && confirm && deny ? { title, description, confirm, deny } : undefined;
}
