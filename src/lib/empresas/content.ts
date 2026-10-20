// Contenido CREATIVO de /empresas (titulares, textos, FAQ, formulario, muro +18,
// metadatos y alt de las fotos), separado del diccionario a propósito.
//
// ─── ESTADO (20-oct-2026) ────────────────────────────────────────────────────
// ENCENDIDO con la creatividad PROVISIONAL del paquete de la sesión META ADS:
// `meta-ads-outxide/campanas/2026-10-halloween-cenas/CREATIVO-LANDING-EMPRESAS.md`
// v0.2 (19-oct). Sergi dio luz verde a esa creatividad provisional («Adelante
// con la parte creativa con colores, textos, etc., y luego corregiremos con el
// contenido nuevo»); Jose (dueño) aún no la ha visto. Los textos de aquí son
// COPIA LITERAL del paquete (versiones «sin datos» donde faltan los de Jose):
// no se escribe copy creativo propio en este fichero.
//
// Idiomas: el paquete solo trae ES y EN. DE, FR e IT NO llevan texto aquí a
// propósito (no se traduce el copy creativo por nuestra cuenta): en esos
// idiomas la página sigue con los textos NEUTROS del diccionario (namespace
// `empresas`) y los bloques que no tienen versión neutra (fin de temporada,
// Navidad, FAQ, línea de datos) no se pintan.
//
// Dos interruptores, a propósito separados:
// - `activo` enciende los TEXTOS en la página (hoy: la creatividad provisional).
// - `approved` es el OK de Jose al contenido. Con él Y la oferta publicada
//   (src/lib/empresas/offer.ts, hoy vacía) la página pasaría a index. Así,
//   rellenar la oferta con textos aún provisionales NO indexa la página: robots
//   sigue en NOINDEX y fuera del sitemap hasta que alguien lo decida.
//
// Huecos y condiciones del paquete (§4.1): ningún corchete llega al público.
// - Sin [FECHAS], [PRECIO], [MÍNIMO], [QUÉ INCLUYE], [PLAZO], [CONTACTO] ni
//   [HORA TARDE]: se usan las versiones «sin datos» del paquete (§4.4–§4.6,
//   §4.8, FAQ 2–5) y las frases que dependen de un hueco sin versión sin datos
//   se quitan enteras («[QUÉ INCLUYE].» de los formatos; «desde las [HORA
//   TARDE]» del paso 2 del formato 2, que queda como «La tarde, en Enjoy
//   Terrace», el mismo titular E3-T2 de COPYS.md).
// - Las condiciones [SI-…] que la página sabe resolver están en `condiciones`
//   (en false hasta que se confirmen; hoy solo [SI-DICIEMBRE], ver abajo). Las
//   que solo afectan a versiones con datos ([SI-ZONA], [SI-CONTACTO],
//   [SI-OTRO-DÍA]) no tienen interruptor: esas versiones no están montadas.
//
// Ajustes del 20-oct-2026 (tarde), por encargo de Sergi:
// - CARTEL del anuncio de empresas (aprobado por Sergi): «CELEBRA TU FIN DE
//   TEMPORADA EN OUTXIDE CLUB · LA CENA, DONDE QUERÁIS · LA FIESTA, CON
//   NOSOTROS». Quien llega del anuncio tiene que reconocer el mensaje en la
//   primera pantalla, así que el antetítulo y el H1 dicen LO MISMO que el
//   cartel (ES y EN; DE/FR/IT siguen con el neutro). El antetítulo de fin de
//   temporada se retira a la misma hora que el bloque de fin de temporada
//   (finTemporada.visibleHasta: al acabar el conjunto, el dom 8-nov a las
//   23:59, COPYS.md v1.7) y vuelve el neutro; el H1 se queda. La foto
//   del cartel NO se usa: es stock de Canva con licencia solo dentro del diseño.
// - APERTURA confirmada por Sergi: OUTXIDE y Enjoy abren todos los días hasta
//   mediados de noviembre; después, solo fin de semana o bajo reserva de grupo.
//   Eso es [SI-DICIEMBRE] (versión A de Navidad, sin días concretos) y la
//   respuesta de la FAQ 2. [SI-TERRAZA-DIC] sigue sin confirmar: la tarde en
//   Enjoy Terrace no se promete en diciembre.
//
// Red de seguridad: un texto de aquí que contenga léxico prohibido (lexicon.ts)
// NO se pinta: se queda el neutro (o el bloque desaparece) y se avisa en log.

import type { Locale } from "@/i18n/config";
import { hasForbiddenLexicon } from "./lexicon";
import { EMPRESAS_OFFER, isOfferPublished, type EmpresasOffer, type LocalizedText } from "./offer";

/** Texto con los 5 idiomas obligatorios (para los alt de piezas nuevas). */
export type AllLocalesText = Record<Locale, string>;

/** Lista con el español obligatorio y el resto de idiomas opcional (SIN caída al es). */
export type LocalizedLines = { es: string[] } & Partial<Record<Exclude<Locale, "es">, string[]>>;

export interface ApprovedPhoto {
  /** Ruta dentro de public/, p. ej. "/images/empresas/grupo-e2.jpg". */
  src: string;
  alt: AllLocalesText;
}

/** Huecos de las fotos de la página (mismos nombres que photos.ts). */
export type EmpresasPhotoSlot = "hero" | "night" | "day";

/** Iconos de la zona de juegos (paso 2 del formato 2). */
export type EmpresasGameSlot = "futbolin" | "billar" | "dardos";

export interface ApprovedFormat {
  eyebrow: LocalizedText;
  titulo: LocalizedText;
  /** Recorrido paso a paso (dos o tres pasos). */
  pasos: LocalizedLines;
  texto: LocalizedText;
  /** Firma de las marcas, en inglés también en español (así está en la web). */
  firmas: string[];
}

/** Claves de texto del formulario (mismo nombre que en el diccionario cuando existe). */
export type EmpresasFormCopyKey =
  | "fieldCompany"
  | "fieldName"
  | "fieldPhone"
  | "fieldEmail"
  | "fieldDate"
  | "fieldPeople"
  | "fieldFormat"
  | "fieldSource"
  | "fieldComments"
  | "phCompany"
  | "phName"
  | "phEmail"
  | "phComments"
  | "helpName"
  | "helpPhone"
  | "helpDate"
  | "helpPeople"
  | "formatAfterDinner"
  | "formatLunch"
  | "formatUndecided"
  | "sourceInstagram"
  | "sourceFacebook"
  | "sourceGoogle"
  | "sourceReferral"
  | "sourceAlreadyKnew"
  | "sourceOther"
  | "errCompany"
  | "errName"
  | "errPhone"
  | "errEmail"
  | "errDateRequired"
  | "errPeopleRequired"
  | "errSelect"
  | "errConsent"
  | "errSummary"
  | "errGeneric"
  | "submit"
  | "sending"
  | "successTitle"
  | "successText";

/** Textos del formulario ya resueltos en un idioma (lo que recibe el componente cliente). */
export type EmpresasFormCopy = Partial<Record<EmpresasFormCopyKey, string>>;

export interface FaqItem {
  pregunta: LocalizedText;
  respuesta: LocalizedText;
}

export interface EmpresasContent {
  /** Interruptor de los TEXTOS en la página (provisionales o aprobados). */
  activo: boolean;
  /** OK de Jose al contenido: solo con esto Y la oferta publicada se indexa. */
  approved: boolean;
  /** Condiciones [SI-…] del paquete (§4.1). Solo Jose las confirma. */
  condiciones: {
    /** [SI-DICIEMBRE] OUTXIDE abre en diciembre para grupos. */
    siDiciembre: boolean;
    /** [SI-TERRAZA-DIC] Enjoy Terrace abre en las fechas de diciembre. */
    siTerrazaDic: boolean;
    /** [SI-GRUPOS-31] Jose acepta grupos de empresa el sábado 31 (Halloween). */
    siGrupos31: boolean;
    /** [SI-VENTA-ONLINE] Venta online de OUTXIDIOUS abierta y su landing en producción. */
    siVentaOnline: boolean;
  };
  hero: {
    /** Antetítulo neutro (el de siempre; manda desde que se retira el de fin de temporada). */
    eyebrow: LocalizedText;
    /**
     * Antetítulo del cartel del anuncio. Vive mientras viva el bloque de fin de
     * temporada (misma hora, finTemporada.visibleHasta): cuando el conjunto
     * de empresas acaba (8-nov), «temporada» no sigue en la página.
     */
    eyebrowFinTemporada: LocalizedText;
    /** H1 en dos líneas, separadas por "\n". */
    titular: LocalizedText;
    entradilla: LocalizedText;
    datos: LocalizedText;
    boton: LocalizedText;
    placa: LocalizedText;
  } | null;
  formatos: { eyebrow: LocalizedText; titulo: LocalizedText } | null;
  formatoNoche: ApprovedFormat | null;
  formatoTarde: ApprovedFormat | null;
  finTemporada: {
    /** Se retira sola a esta hora (ISO con desfase explícito; ver schedule.ts). */
    visibleHasta: string;
    eyebrow: LocalizedText;
    titulo: LocalizedText;
    texto: LocalizedText;
    boton: LocalizedText;
  } | null;
  navidad: {
    eyebrow: LocalizedText;
    boton: LocalizedText;
    /** Versión B (§4.5): mientras Jose no confirme diciembre. No promete nada. */
    sinDiciembre: { titulo: LocalizedText; texto: LocalizedText };
    /** Versión A (§4.5): solo con condiciones.siDiciembre. */
    conDiciembre: {
      titulo: LocalizedText;
      texto: LocalizedText;
      /** Frase extra solo con condiciones.siTerrazaDic. */
      terraza: LocalizedText;
      /** «Fechas de diciembre: {fechas}.» — se pinta solo si hay fechasDiciembre. */
      fechas: LocalizedText;
    };
    /** [FECHAS DICIEMBRE] — sin dato, la línea de fechas no se pinta. */
    fechasDiciembre: LocalizedText | null;
  } | null;
  propuesta: {
    /** Versión de hoy (§4.6, sin datos de Jose). */
    sinDatos: { titulo: LocalizedText; texto: LocalizedText };
    /** Encabezado y cierre del bloque cuando offer.ts esté publicada. */
    conDatos: { eyebrow: LocalizedText; titulo: LocalizedText; cierre: LocalizedText };
  } | null;
  formulario: {
    eyebrow: LocalizedText;
    titulo: LocalizedText;
    entradilla: LocalizedText;
    campos: Partial<Record<EmpresasFormCopyKey, LocalizedText>>;
    /** Coletilla de la opción «Después de la comida» mientras no haya siTerrazaDic. */
    segunFechas: LocalizedText;
  } | null;
  faq: {
    /** Preguntas 1–5 (versiones sin datos). */
    items: FaqItem[];
    /** Pregunta 6 hasta `visibleHasta`; después, `vestimenta` ocupa su sitio. */
    halloween: FaqItem & {
      visibleHasta: string;
      grupos31: LocalizedText;
      ventaOnline: LocalizedText;
      /** La frase de entradas se borra a esta hora aunque siVentaOnline siga en true. */
      ventaOnlineHasta: string;
    };
    vestimenta: FaqItem;
  } | null;
  /** Texto propio del muro +18 en esta ruta (§4.12). */
  muroEdad: { title: LocalizedText; description: LocalizedText; confirm: LocalizedText; deny: LocalizedText } | null;
  meta: {
    title: LocalizedText;
    /** Mientras no haya siDiciembre (sin «Navidad»). */
    description: LocalizedText;
    /** Solo con siDiciembre. */
    descriptionDiciembre: LocalizedText;
    ogTitle: LocalizedText;
    ogDescription: LocalizedText;
    ogImageAlt: LocalizedText;
  } | null;
  /** Alt de las fotos YA publicadas que usa la página (photos.ts). */
  altFotos: Partial<Record<EmpresasPhotoSlot | EmpresasGameSlot, LocalizedText>> | null;
  /** Piezas nuevas aprobadas que sustituyen a las de photos.ts (p. ej. la foto de grupo E2). */
  fotos: Partial<Record<EmpresasPhotoSlot, ApprovedPhoto>> | null;
}

const PEDIR_PRESUPUESTO: LocalizedText = { es: "Pedir presupuesto", en: "Request a quote" };

// ⬇︎ CONTENIDO — paquete CREATIVO-LANDING-EMPRESAS.md v0.2 (provisional).
export const EMPRESAS_CONTENT: EmpresasContent = {
  // Encendido: creatividad provisional con luz verde de Sergi (20-oct-2026).
  activo: true,
  // Jose aún no la ha visto: sin su OK, nunca index aunque se publique la oferta.
  approved: false,
  condiciones: {
    // Confirmado por Sergi (20-oct-2026): abren todos los días hasta mediados
    // de noviembre y después fines de semana o bajo reserva de grupo. Enciende
    // la versión A de Navidad y la descripción con «Navidad».
    siDiciembre: true,
    // Sin confirmar: en Navidad no se ofrece la tarde en Enjoy Terrace.
    siTerrazaDic: false,
    siGrupos31: false,
    siVentaOnline: false,
  },
  // §4.2, con el antetítulo y el H1 del CARTEL del anuncio (20-oct-2026, ver
  // cabecera): quien llega del anuncio lee aquí las mismas palabras.
  hero: {
    eyebrow: { es: "Celebraciones de empresa · Port d'Alcúdia", en: "Company celebrations · Port d'Alcúdia" },
    eyebrowFinTemporada: {
      es: "Celebra tu fin de temporada en OUTXIDE Club",
      en: "Celebrate your end of season at OUTXIDE Club",
    },
    titular: {
      es: "La cena, donde queráis.\nLa fiesta, con nosotros.",
      en: "Dinner, wherever you like.\nThe party, with us.",
    },
    entradilla: {
      es: "La celebración sigue con nosotros. La comida o la cena de empresa, donde os apetezca: en vuestro hotel, en vuestro restaurante de siempre. Después, la noche en OUTXIDE y, si es comida, la tarde antes en Enjoy Terrace (según fechas). Los dos, en la Av. Tucán 1 de Port d'Alcúdia.",
      en: "The celebration carries on with us. Your company lunch or dinner, wherever suits you: at your own hotel or your favourite restaurant. Afterwards, the night at OUTXIDE and, if it's a lunch, the afternoon first at Enjoy Terrace (on some dates). Both at Av. Tucán 1, Port d'Alcúdia.",
    },
    datos: {
      es: "Noche en OUTXIDE, desde las 23:00 · Tarde en Enjoy Terrace, según fechas",
      en: "Night at OUTXIDE, from 23:00 · Afternoon at Enjoy Terrace, on some dates",
    },
    boton: PEDIR_PRESUPUESTO,
    placa: { es: "+18 · Consumo responsable", en: "18+ · Drink responsibly" },
  },
  // §4.3
  formatos: {
    eyebrow: { es: "Dos formas de seguir", en: "Two ways to carry on" },
    titulo: {
      es: "Vosotros elegís cómo empieza. Nosotros, cómo sigue.",
      en: "You choose how it starts. We take care of how it carries on.",
    },
  },
  formatoNoche: {
    eyebrow: { es: "Después de la cena", en: "After dinner" },
    titulo: { es: "La noche, en OUTXIDE", en: "The night, at OUTXIDE" },
    pasos: {
      es: ["La cena, donde queráis", "La noche, en OUTXIDE, desde las 23:00"],
      en: ["Dinner, wherever you like", "The night at OUTXIDE, from 23:00"],
    },
    // Sin la frase final «[QUÉ INCLUYE].» (hueco sin datos).
    texto: {
      es: "Cenáis donde queráis y, cuando acabéis, la noche sigue en OUTXIDE: cabina, luces y pista para todo el equipo.",
      en: "Have dinner wherever you like and, once you're done, the night carries on at OUTXIDE: DJ booth, lights and a dance floor for the whole team.",
    },
    firmas: ["The night continues"],
  },
  formatoTarde: {
    eyebrow: { es: "Después de la comida", en: "After lunch" },
    titulo: {
      es: "La tarde en Enjoy Terrace, la noche en OUTXIDE",
      en: "The afternoon at Enjoy Terrace, the night at OUTXIDE",
    },
    // Paso 2 sin «desde las [HORA TARDE]» (hueco sin datos).
    pasos: {
      es: ["La comida, donde queráis", "La tarde, en Enjoy Terrace", "La noche, en OUTXIDE, desde las 23:00"],
      en: ["Lunch, wherever you like", "The afternoon at Enjoy Terrace", "The night at OUTXIDE, from 23:00"],
    },
    texto: {
      es: "Coméis donde queráis. La tarde sigue en la terraza de Enjoy, con futbolín, billar y dardos para los piques del equipo, y a las 23:00 la celebración pasa a OUTXIDE, en el mismo sitio: Av. Tucán 1.",
      en: "Have lunch wherever you like. The afternoon carries on at the Enjoy terrace, with foosball, pool and darts for some friendly team rivalry, and at 23:00 the celebration moves on to OUTXIDE, at the same address: Av. Tucán 1.",
    },
    firmas: ["Where nights begin", "The night continues"],
  },
  // §4.4 — se retira sola al acabar el conjunto de empresas (dom 8-nov a las
  // 23:59). Hasta el 20-oct por la tarde se retiraba en el cambio de tanda del
  // sáb 31 a las 18:00 (E1 se apagaba ese día); desde COPYS.md v1.7 y el
  // paquete v0.5 (resuelto por Sergi): el anuncio aprobado es el CARTEL E1
  // («CELEBRA TU FIN DE TEMPORADA EN OUTXIDE CLUB», con EMP-2-S), que corre
  // hasta el 8-nov, y con los locales abiertos a diario hasta mediados de
  // noviembre «fin de temporada» sigue siendo verdad. Retirarlo el 31 dejaba
  // el anuncio prometiendo un titular y un bloque que la página ya no tenía
  // (revisión F2). Mismo instante para el antetítulo del cartel del hero.
  finTemporada: {
    visibleHasta: "2026-11-09T00:00:00+01:00",
    eyebrow: { es: "Fin de temporada", en: "End of season" },
    titulo: {
      es: "Toda la temporada cuidando de los demás. Ahora os toca a vosotros.",
      en: "A whole season looking after everyone else. Now it's your turn.",
    },
    // Sin la línea «Fechas: [FECHAS].» (hueco sin datos: se borra entera).
    texto: {
      es: "Para hoteles, restaurantes y comercios que cierran temporada: la cena de despedida del equipo, donde queráis; la celebración, con nosotros. Todo el grupo, mayor de 18.",
      en: "For hotels, restaurants and shops closing for the season: your team's farewell dinner, wherever you like; the celebration, with us. Everyone in the group must be 18 or over.",
    },
    boton: PEDIR_PRESUPUESTO,
  },
  // §4.5 — visible desde el primer día. Con [SI-DICIEMBRE] (confirmado el
  // 20-oct) va la versión A; sin él, la B.
  navidad: {
    eyebrow: { es: "Navidad 2026", en: "Christmas 2026" },
    boton: PEDIR_PRESUPUESTO,
    sinDiciembre: {
      titulo: { es: "¿La cena de Navidad es en diciembre?", en: "Is your Christmas dinner in December?" },
      texto: {
        es: "Contadnos la fecha y cuántos seréis, y os decimos qué podemos montar para la fiesta de después.",
        en: "Tell us the date and how many of you there will be, and we'll tell you what we can put together for the party afterwards.",
      },
    },
    conDiciembre: {
      titulo: {
        es: "La cena de Navidad, donde queráis. La fiesta de después, con nosotros.",
        en: "Your Christmas dinner, wherever you like. The party afterwards, with us.",
      },
      texto: {
        es: "Si la cena de empresa es en diciembre, la fiesta de después se organiza ahora. Vosotros elegís el restaurante; la noche la ponemos nosotros en OUTXIDE.",
        en: "If your company dinner is in December, now is the time to plan the party afterwards. You choose the restaurant; we take care of the night at OUTXIDE.",
      },
      terraza: {
        es: "Y si es comida, la tarde sigue antes en Enjoy Terrace.",
        en: "And if it's a lunch, the afternoon carries on first at Enjoy Terrace.",
      },
      // La línea de fechas que pidió Sergi (20-oct): «En diciembre, fines de
      // semana o bajo reserva para grupos.», sin días concretos (no los hay
      // confirmados y la página sigue viva hasta el 8-nov).
      fechas: { es: "En diciembre, {fechas}.", en: "In December, {fechas}." },
    },
    fechasDiciembre: { es: "fines de semana o bajo reserva para grupos", en: "weekends or by group booking" },
  },
  // §4.6
  propuesta: {
    sinDatos: {
      titulo: { es: "Cada equipo es distinto", en: "Every team is different" },
      texto: {
        es: "Contadnos la fecha, cuántos seréis y qué formato os encaja, y os mandamos un presupuesto cerrado, con el IVA incluido.",
        en: "Tell us the date, how many of you there will be and which format suits you, and we'll send you a final quote, VAT included.",
      },
    },
    conDatos: {
      eyebrow: { es: "Qué incluye", en: "What's included" },
      titulo: { es: "Lo que tenéis al llegar", en: "What's waiting for you" },
      cierre: {
        es: "Os mandamos el presupuesto cerrado antes de reservar: sin sorpresas.",
        en: "We send you the final quote before you book: no surprises.",
      },
    },
  },
  // §4.8 — sin [PLAZO]. La casilla y la capa de privacidad NO se toman del
  // paquete: «la versión legal definitiva es la que ya usa la sesión web».
  formulario: {
    eyebrow: { es: "Pedir presupuesto", en: "Request a quote" },
    titulo: { es: "Contadnos qué tenéis en mente", en: "Tell us what you have in mind" },
    entradilla: {
      es: "Rellénalo en un minuto y te contestamos con el presupuesto.",
      en: "It takes a minute, and we'll get back to you with a quote.",
    },
    campos: {
      fieldCompany: { es: "Empresa", en: "Company" },
      phCompany: { es: "Nombre de la empresa o del hotel", en: "Company or hotel name" },
      errCompany: { es: "Escribe el nombre de la empresa.", en: "Please enter the company name." },
      fieldName: { es: "Tu nombre", en: "Your name" },
      phName: { es: "Nombre y apellido", en: "First and last name" },
      helpName: { es: "Quien organiza; te escribiremos a ti.", en: "The organiser; we'll reply to you." },
      errName: { es: "Escribe tu nombre.", en: "Please enter your name." },
      fieldPhone: { es: "Teléfono", en: "Phone" },
      helpPhone: { es: "Con prefijo si no es español.", en: "Include the country code if it isn't Spanish." },
      errPhone: { es: "Revisa el teléfono: faltan números.", en: "Please check the phone number." },
      fieldEmail: { es: "Correo electrónico", en: "Email" },
      phEmail: { es: "nombre@empresa.com", en: "name@company.com" },
      errEmail: { es: "Revisa el correo: falta algo.", en: "Please check the email address." },
      fieldDate: { es: "¿Qué día tenéis en mente?", en: "Which date do you have in mind?" },
      helpDate: {
        es: "Si aún no está cerrada, pon la aproximada.",
        en: "If it isn't fixed yet, an approximate date is fine.",
      },
      errDateRequired: { es: "Elige una fecha.", en: "Please choose a date." },
      fieldPeople: { es: "¿Cuántos seréis?", en: "How many of you?" },
      helpPeople: {
        es: "Un número aproximado vale. Todo el grupo tiene que ser mayor de 18.",
        en: "An approximate number is fine. Everyone must be 18 or over.",
      },
      errPeopleRequired: { es: "Indica cuántos seréis.", en: "Please tell us how many." },
      fieldFormat: { es: "¿Qué formato os encaja?", en: "Which format suits you?" },
      formatAfterDinner: { es: "Después de la cena: la noche en OUTXIDE", en: "After dinner: the night at OUTXIDE" },
      formatLunch: {
        es: "Después de la comida: la tarde en Enjoy Terrace y la noche en OUTXIDE",
        en: "After lunch: the afternoon at Enjoy Terrace and the night at OUTXIDE",
      },
      formatUndecided: { es: "Aún no lo sabemos", en: "We're not sure yet" },
      errSelect: { es: "Elige una opción.", en: "Please choose an option." },
      fieldSource: { es: "¿Cómo nos conocisteis?", en: "How did you hear about us?" },
      sourceInstagram: { es: "Instagram", en: "Instagram" },
      sourceFacebook: { es: "Facebook", en: "Facebook" },
      sourceGoogle: { es: "Google", en: "Google" },
      sourceReferral: { es: "Nos lo recomendaron", en: "Word of mouth" },
      sourceAlreadyKnew: { es: "Ya habíamos venido", en: "We've been before" },
      sourceOther: { es: "Otro", en: "Other" },
      fieldComments: { es: "¿Algo más que debamos saber? (opcional)", en: "Anything else we should know? (optional)" },
      phComments: { es: "Horario de la cena, si alguien llega más tarde…", en: "Dinner time, people arriving later…" },
      errConsent: {
        es: "Para enviarlo, acepta la política de privacidad.",
        en: "Please accept the privacy policy to send the form.",
      },
      submit: PEDIR_PRESUPUESTO,
      sending: { es: "Enviando…", en: "Sending…" },
      successTitle: { es: "Recibido.", en: "Got it." },
      successText: {
        es: "Ya tenemos vuestra solicitud. Te escribimos lo antes posible al correo que nos has dado con el presupuesto. Revisa también la carpeta de spam.",
        en: "We've got your request. We'll email you the quote as soon as possible. Please check your spam folder too.",
      },
      errGeneric: {
        es: "No se ha podido enviar. Inténtalo de nuevo en un momento.",
        en: "It couldn't be sent. Please try again in a moment.",
      },
      errSummary: { es: "Revisa los campos marcados.", en: "Please check the highlighted fields." },
    },
    segunFechas: { es: "(según fechas)", en: "(on some dates)" },
  },
  // §4.10 — versiones sin datos de la 2 a la 5.
  faq: {
    items: [
      {
        pregunta: { es: "¿Tenemos que comer o cenar con vosotros?", en: "Do we have to have lunch or dinner with you?" },
        respuesta: {
          es: "No. La comida o la cena la hacéis donde queráis: en vuestro hotel, en vuestro restaurante de siempre. Nosotros ponemos lo de después: la noche en OUTXIDE y, si es comida, la tarde antes en Enjoy Terrace (según fechas).",
          en: "No. You have lunch or dinner wherever you like: at your own hotel or your favourite restaurant. We take care of what comes after: the night at OUTXIDE and, if it's a lunch, the afternoon first at Enjoy Terrace (on some dates).",
        },
      },
      {
        pregunta: { es: "¿Qué días se puede?", en: "Which days are available?" },
        // Apertura confirmada por Sergi (20-oct-2026). Sin «jueves a sábado»
        // ni «mayo-octubre» (lo que dice el resto de la web ya no vale aquí).
        respuesta: {
          es: "Hasta mediados de noviembre, cualquier día; después, fines de semana o bajo reserva para grupos.",
          en: "Until mid-November, any day; after that, weekends or by group booking.",
        },
      },
      {
        pregunta: { es: "¿Cuántas personas hacen falta? ¿Hay edad mínima?", en: "How many people do we need? Is there a minimum age?" },
        // Lista de documentos PENDIENTE de confirmar con Jose (la misma que en
        // la landing de OUTXIDIOUS): la nota [CONFIRMAR…] del paquete no se pinta.
        respuesta: {
          es: "Todo el grupo tiene que ser mayor de 18 años: en la puerta se pide un documento de identidad original con foto (DNI, NIE, pasaporte o permiso de conducir).",
          en: "Everyone must be 18 or over: an original photo ID (national ID card, residence card, passport or driving licence) is required at the door.",
        },
      },
      {
        pregunta: { es: "¿Qué incluye y cuánto cuesta?", en: "What's included and how much is it?" },
        respuesta: {
          es: "Depende de la fecha, del formato y de cuántos seáis: os mandamos el presupuesto cerrado, con el IVA incluido, antes de reservar.",
          en: "It depends on the date, the format and the size of your group: we send you a final quote, VAT included, before you book.",
        },
      },
      {
        pregunta: { es: "¿Cómo se reserva?", en: "How do we book?" },
        respuesta: {
          es: "Nos dejas la solicitud en este formulario, te mandamos el presupuesto y, si os encaja, lo cerramos contigo.",
          en: "Send us your request with this form, we'll send you the quote and, if it works for you, we'll confirm it with you.",
        },
      },
    ],
    halloween: {
      // A las 23:00 del 31 deja de ser verdad (la noche ya ha empezado).
      visibleHasta: "2026-10-31T23:00:00+01:00",
      pregunta: { es: "¿Y si queremos celebrarlo en Halloween?", en: "What if we want to celebrate on Halloween?" },
      respuesta: {
        es: "El sábado 31 de octubre es OUTXIDIOUS, el Halloween de OUTXIDE y Enjoy. Empezamos antes con tardeo de acceso libre en Enjoy Terrace, de 20:00 a 23:00. Después, la noche sigue en OUTXIDE de 23:00 a 05:30, con entrada. Las dos partes son solo para mayores de 18. Venid de negro.",
        en: "Saturday 31 October is OUTXIDIOUS, the Halloween night of OUTXIDE and Enjoy. We start early with a free-entry terrace party at Enjoy Terrace, 20:00–23:00. Then the night carries on at OUTXIDE, 23:00–05:30, ticket required. Both parts are 18+ only. Dress code: black.",
      },
      grupos31: {
        es: "Si sois grupo, pedid presupuesto igualmente y os decimos cómo encaja.",
        en: "If you're a group, request a quote anyway and we'll tell you how it fits.",
      },
      ventaOnline: {
        es: "Entradas para OUTXIDE en grupoenjoy.es/outxide/outxidious.",
        en: "Tickets for OUTXIDE at grupoenjoy.es/outxide/outxidious.",
      },
      // 18:00 del 31: acaba el último tramo online (COPYS.md §0.1). Sin
      // «agotado» ni nada parecido en su lugar (A2).
      ventaOnlineHasta: "2026-10-31T18:00:00+01:00",
    },
    vestimenta: {
      pregunta: { es: "¿Hay código de vestimenta?", en: "Is there a dress code?" },
      respuesta: {
        es: "Arreglado pero informal (smart casual). No se permite ropa de playa ni chanclas.",
        en: "Smart casual. Beachwear and flip-flops are not permitted.",
      },
    },
  },
  // §4.12
  muroEdad: {
    title: { es: "Verificación de edad", en: "Age verification" },
    description: {
      es: "Esta página habla de un bar de terraza y de una discoteca, solo para mayores de 18 años. ¿Confirmas que eres mayor de edad?",
      en: "This page is about a terrace bar and a nightclub, for over-18s only. Can you confirm you are 18 or over?",
    },
    confirm: { es: "Sí, soy mayor de 18 años", en: "Yes, I'm 18 or over" },
    deny: { es: "No, soy menor de edad", en: "No, I'm under 18" },
  },
  // §4.11 — metadatos PROPIOS (nada de «Cócteles, Shisha» heredado). Desde el
  // 20-oct, con las palabras del cartel en vez del titular viejo («Cenad donde
  // queráis. La fiesta, aquí»): la tarjeta al compartir dice lo mismo que el
  // anuncio. La descripción sigue sin «temporada» (vale también en noviembre).
  meta: {
    title: {
      es: "Celebraciones de empresa en Port d'Alcúdia · Grupo Enjoy",
      en: "Company celebrations in Port d'Alcúdia · Grupo Enjoy",
    },
    description: {
      es: "La cena, donde queráis: la fiesta sigue en OUTXIDE y, según fechas, en Enjoy Terrace. Port d'Alcúdia. Fiestas de empresa. Pide presupuesto. +18.",
      en: "Dinner, wherever you like: the party carries on at OUTXIDE and, on some dates, at Enjoy Terrace. Port d'Alcúdia. Team parties. Request a quote. 18+.",
    },
    // La que se pinta hoy ([SI-DICIEMBRE] confirmado). En inglés, «Get a quote»
    // como en la v0.3 del paquete, para no alargarla más.
    descriptionDiciembre: {
      es: "La cena, donde queráis: la fiesta sigue en OUTXIDE y, según fechas, en Enjoy Terrace. Port d'Alcúdia. Fiestas de empresa y de Navidad. Pide presupuesto. +18.",
      en: "Dinner, wherever you like: the party carries on at OUTXIDE and, on some dates, at Enjoy Terrace. Port d'Alcúdia. Team and Christmas parties. Get a quote. 18+.",
    },
    ogTitle: {
      es: "La cena, donde queráis. La fiesta, con nosotros.",
      en: "Dinner, wherever you like. The party, with us.",
    },
    ogDescription: {
      es: "La noche en OUTXIDE y, si es comida, antes la tarde en Enjoy Terrace (según fechas). Port d'Alcúdia. Pide presupuesto.",
      en: "The night at OUTXIDE and, if it's a lunch, the afternoon first at Enjoy Terrace (on some dates). Port d'Alcúdia. Request a quote.",
    },
    ogImageAlt: {
      es: "Fachada de OUTXIDE Club y Enjoy Terrace de noche en Port d'Alcúdia",
      en: "OUTXIDE Club and Enjoy Terrace at night in Port d'Alcúdia",
    },
  },
  // §4.9
  altFotos: {
    hero: {
      es: "Fachada de OUTXIDE Club y Enjoy Terrace de noche, en la Av. Tucán 1 de Port d'Alcúdia",
      en: "OUTXIDE Club and Enjoy Terrace at night, Av. Tucán 1, Port d'Alcúdia",
    },
    night: { es: "Manos de un DJ en la mesa de mezclas de OUTXIDE", en: "A DJ's hands on the mixer at OUTXIDE" },
    day: { es: "Rótulo luminoso de Enjoy Terrace de noche", en: "Enjoy Terrace's illuminated sign at night" },
    futbolin: { es: "Futbolín", en: "Foosball table" },
    billar: { es: "Mesa de billar", en: "Pool table" },
    dardos: { es: "Diana de dardos de Enjoy Terrace", en: "Dartboard at Enjoy Terrace" },
  },
  fotos: null,
};

/** ¿Están encendidos los textos del paquete en la página? */
export function isContentActive(content: EmpresasContent = EMPRESAS_CONTENT): boolean {
  return content.activo === true;
}

/** ¿Tiene el contenido encendido el OK de Jose? */
export function isContentApproved(content: EmpresasContent = EMPRESAS_CONTENT): boolean {
  return isContentActive(content) && content.approved === true;
}

/**
 * ¿Se puede indexar /empresas? Solo con la oferta publicada (offer.ts) Y el
 * contenido aprobado por Jose (aquí). Única puerta para robots: la usa layout.tsx.
 */
export function isEmpresasIndexable(
  content: EmpresasContent = EMPRESAS_CONTENT,
  offer: EmpresasOffer = EMPRESAS_OFFER,
): boolean {
  return isOfferPublished(offer) && isContentApproved(content);
}

/**
 * Texto de un hueco en `locale`, o null si los textos están apagados, el hueco
 * está vacío, falta ESE idioma (no cae al español: la página inglesa nunca
 * pinta español) o incumple el léxico. Con null, quien llama usa el texto
 * neutro del diccionario o no pinta el bloque.
 */
export function contentText(
  value: LocalizedText | null | undefined,
  locale: Locale,
  content: EmpresasContent = EMPRESAS_CONTENT,
): string | null {
  if (!isContentActive(content) || !value) return null;
  const text = (value[locale] ?? "").trim();
  if (!text) return null;
  if (hasForbiddenLexicon(text)) {
    console.warn("[empresas] texto descartado por léxico prohibido", { locale });
    return null;
  }
  return text;
}

/** Lista de un hueco en `locale` (mismas reglas que contentText, todo o nada). */
export function contentLines(
  value: LocalizedLines | null | undefined,
  locale: Locale,
  content: EmpresasContent = EMPRESAS_CONTENT,
): string[] | null {
  if (!isContentActive(content) || !value) return null;
  const lines = (value[locale] ?? []).map((s) => s.trim()).filter(Boolean);
  if (lines.length === 0) return null;
  if (lines.some(hasForbiddenLexicon)) {
    console.warn("[empresas] lista descartada por léxico prohibido", { locale });
    return null;
  }
  return lines;
}

/** Pieza nueva aprobada de un hueco, o null (se usa la de photos.ts). */
export function approvedPhoto(
  slot: EmpresasPhotoSlot,
  content: EmpresasContent = EMPRESAS_CONTENT,
): ApprovedPhoto | null {
  if (!isContentActive(content)) return null;
  const photo = content.fotos?.[slot];
  // Solo rutas locales de public/: nada de URLs externas en una landing de anuncios.
  if (!photo || !photo.src.startsWith("/") || photo.src.startsWith("//")) return null;
  return photo;
}
