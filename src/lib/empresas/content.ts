// Contenido CREATIVO de /empresas (titulares, textos, FAQ, formulario, muro +18,
// metadatos y alt de las fotos), separado del diccionario a propósito.
//
// ─── ESTADO (20-oct-2026, noche) ─────────────────────────────────────────────
// ENCENDIDO con la creatividad PROVISIONAL del paquete de la sesión META ADS:
// `meta-ads-outxide/campanas/2026-10-halloween-cenas/CREATIVO-LANDING-EMPRESAS.md`
// v0.5 (20-oct, con los hechos que resolvió Sergi esa tarde). Sergi dio luz
// verde a esa creatividad provisional («Adelante con la parte creativa con
// colores, textos, etc., y luego corregiremos con el contenido nuevo»); Jose
// (dueño) aún no la ha visto. Los textos de aquí son COPIA LITERAL del paquete
// (versiones «sin datos» donde faltan los de Jose): no se escribe copy creativo
// propio en este fichero.
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
// - Sin [PRECIO], [MÍNIMO], [QUÉ INCLUYE], [PLAZO], [CONTACTO] ni [HORA TARDE]:
//   se usan las versiones «sin datos» del paquete (§4.4–§4.6, §4.8, FAQ 3–5) y
//   las frases que dependen de un hueco sin versión sin datos se quitan
//   enteras («[QUÉ INCLUYE].» de los formatos; «desde las [HORA TARDE]» del
//   paso 2 del formato 2, que queda como «La tarde, en Enjoy Terrace», el mismo
//   titular E3-T2 de COPYS.md; la línea «Fechas: [FECHAS].» del fin de
//   temporada, que el paquete no rellena).
// - [FECHAS], [FECHAS DICIEMBRE] y [SI-OTRO-DÍA] los resolvió Sergi (abajo): la
//   FAQ 2 va en su versión CON datos.
// - Las condiciones [SI-…] que la página sabe resolver están en `condiciones`.
//   Las que solo afectan a versiones con datos ([SI-ZONA], [SI-CONTACTO]) no
//   tienen interruptor: esas versiones no están montadas.
//
// Hechos resueltos por Sergi (20-oct-2026, tarde; paquete v0.5):
// - APERTURA: OUTXIDE y Enjoy (Enjoy Terrace) abren todos los días hasta
//   mediados de noviembre; después, solo fines de semana o bajo reserva de
//   grupo, también en diciembre. Se cumplen [SI-NOCHES-NOV-DIC] (la noche en
//   OUTXIDE ya no va «según fechas»: textos «confirmado» del paquete),
//   [SI-DICIEMBRE] (versión A de Navidad y descripción con «Navidad») y
//   [SI-TERRAZA-DIC] (la tarde pierde el «(según fechas)» del hero, la FAQ 1 y
//   la opción de comida del formulario, y Navidad lleva la frase de la terraza).
// - CARTEL del anuncio de empresas (aprobado por Sergi): «CELEBRA TU FIN DE
//   TEMPORADA EN OUTXIDE CLUB · LA CENA, DONDE QUERÁIS · LA FIESTA, CON
//   NOSOTROS». Quien llega del anuncio tiene que reconocer el mensaje en la
//   primera pantalla, así que el antetítulo y el H1 dicen LO MISMO que el
//   cartel (ES y EN; DE/FR/IT siguen con el neutro). La foto del cartel NO se
//   usa: es stock de Canva con licencia solo dentro del diseño.
// - El bloque de FIN DE TEMPORADA y el antetítulo del cartel siguen hasta el
//   dom 8-nov a las 23:59:59 (orden de META ADS por Sergi): el anuncio con ese
//   cartel corre hasta el 8-nov y, con el club abierto a diario hasta mediados
//   de noviembre, sigue siendo verdad. Navidad convive con él desde ya.
//
// Lo que ya NO está en /empresas (paquete v0.3, COPYS.md §3.0 y §5.4: «Halloween
// no se mezcla con empresas»): ni Halloween, ni OUTXIDIOUS, ni el tardeo, ni un
// enlace a sus entradas. La pregunta 6 es la de vestimenta desde el primer día
// (acotada a OUTXIDE) y se oculta sola la única noche en que no rige (la del
// sáb 31, que tiene su propio código), sin decir por qué.
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
  /**
   * Condiciones [SI-…] del paquete (§4.1) que cambian lo que se pinta. Las
   * confirma Jose (o Sergi en su nombre, como el 20-oct). Ya no hay
   * [SI-GRUPOS-31] ni [SI-VENTA-ONLINE]: solo decidían la pregunta de Halloween,
   * que salió de /empresas (v0.3); que el sáb 31 sea fecha para grupos se
   * explica en el presupuesto, no en la página.
   */
  condiciones: {
    /** [SI-DICIEMBRE] OUTXIDE abre en diciembre para grupos. */
    siDiciembre: boolean;
    /**
     * [SI-TERRAZA-DIC] Enjoy Terrace abre en las fechas de diciembre. Sin ella,
     * la tarde va «(según fechas)» (token {segunFechasTarde} del hero, la línea
     * de datos y la FAQ 1, y coletilla de la opción de comida del formulario) y
     * Navidad no lleva la frase de la terraza.
     */
    siTerrazaDic: boolean;
  };
  /**
   * «(según fechas)» de la tarde en Enjoy Terrace mientras no haya
   * siTerrazaDic: sustituye a {segunFechasTarde} (con un espacio delante) y es
   * la coletilla de la opción de comida del formulario. Con siTerrazaDic, nada.
   */
  segunFechas: LocalizedText;
  hero: {
    /** Antetítulo neutro (el de siempre; manda desde que se retira el de fin de temporada). */
    eyebrow: LocalizedText;
    /**
     * Antetítulo del cartel del anuncio. Vive mientras viva el bloque de fin de
     * temporada (misma hora, finTemporada.visibleHasta): nunca uno sin el otro.
     */
    eyebrowFinTemporada: LocalizedText;
    /** H1 en dos líneas, separadas por "\n". */
    titular: LocalizedText;
    /** Puede llevar {segunFechasTarde} (ver condiciones.siTerrazaDic). */
    entradilla: LocalizedText;
    /** Línea de datos, en el orden del día (tarde → noche). Puede llevar {segunFechasTarde}. */
    datos: LocalizedText;
    boton: LocalizedText;
    placa: LocalizedText;
  } | null;
  formatos: { eyebrow: LocalizedText; titulo: LocalizedText } | null;
  formatoNoche: ApprovedFormat | null;
  formatoTarde: ApprovedFormat | null;
  finTemporada: {
    /**
     * Se retira sola a esta hora, EXCLUIDA (ISO con desfase explícito; ver
     * schedule.ts). Gobierna también el antetítulo del cartel.
     */
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
  } | null;
  faq: {
    /** Preguntas 1–5 (la 1 puede llevar {segunFechasTarde}). */
    items: FaqItem[];
    /**
     * Pregunta 6 (vestimenta, acotada a OUTXIDE), desde el primer día. Se oculta
     * de `ocultaDesde` (incluida) a `ocultaHasta` (excluida): la noche del sáb
     * 31 tiene su propio código y aquí no se dice por qué (Halloween no se
     * nombra en /empresas). Nunca se cambia por el código de esa noche.
     */
    vestimenta: FaqItem & { ocultaDesde: string; ocultaHasta: string };
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

// ⬇︎ CONTENIDO — paquete CREATIVO-LANDING-EMPRESAS.md v0.5 (provisional).
export const EMPRESAS_CONTENT: EmpresasContent = {
  // Encendido: creatividad provisional con luz verde de Sergi (20-oct-2026).
  activo: true,
  // Jose aún no la ha visto: sin su OK, nunca index aunque se publique la oferta.
  approved: false,
  condiciones: {
    // Resueltas por Sergi (20-oct-2026, paquete v0.5 §4.1): OUTXIDE y Enjoy
    // abren todos los días hasta mediados de noviembre y después fines de
    // semana o bajo reserva de grupo, también en diciembre. siDiciembre enciende
    // la versión A de Navidad y la descripción con «Navidad»; siTerrazaDic quita
    // el «(según fechas)» de la tarde y añade la frase de la terraza en Navidad.
    siDiciembre: true,
    siTerrazaDic: true,
  },
  segunFechas: { es: "(según fechas)", en: "(on some dates)" },
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
    // Versión «con [SI-NOCHES-NOV-DIC] confirmado» (§4.2): la noche ya no va
    // «según fechas»; la tarde, solo sin [SI-TERRAZA-DIC] (token).
    entradilla: {
      es: "La celebración sigue con nosotros. La comida o la cena de empresa, donde os apetezca: en vuestro hotel, en vuestro restaurante de siempre. Después, la noche en OUTXIDE y, si es comida, la tarde antes en Enjoy Terrace{segunFechasTarde}. Los dos locales, en la Av. Tucán 1 de Port d'Alcúdia.",
      en: "The celebration carries on with us. Your company lunch or dinner, wherever suits you: at your own hotel or your favourite restaurant. Afterwards, the night at OUTXIDE and, if it's a lunch, the afternoon first at Enjoy Terrace{segunFechasTarde}. Both venues at Av. Tucán 1, Port d'Alcúdia.",
    },
    // v0.3: en el orden del día (tarde → noche, como lo quemado en E1) y la
    // tarde solo «si es comida»: a quien cena no se le ofrece la tarde.
    datos: {
      es: "Tarde en Enjoy Terrace si es comida{segunFechasTarde} · Noche en OUTXIDE, desde las 23:00",
      en: "Afternoon at Enjoy Terrace for lunch groups{segunFechasTarde} · Night at OUTXIDE, from 23:00",
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
    // Sin la frase final «[QUÉ INCLUYE].» (hueco sin datos) y, desde la v0.3,
    // sin «pista para todo el equipo»: una noche de club es pista compartida
    // con el público; un espacio para el grupo, solo con [SI-ZONA].
    texto: {
      es: "Cenáis donde queráis y, cuando acabéis, la noche sigue en OUTXIDE: cabina, luces y pista.",
      en: "Have dinner wherever you like and, once you're done, the night carries on at OUTXIDE: DJ booth, lights and dance floor.",
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
  // §4.4 — visible hasta el dom 8-nov a las 23:59:59 (+01:00) incluidas: orden
  // de META ADS por Sergi (20-oct), que manda sobre el corte del sáb 31 de las
  // versiones anteriores. El cartel «Celebra tu fin de temporada en OUTXIDE
  // Club» corre hasta el 8-nov y el club abre a diario hasta mediados de
  // noviembre. El corte es EXCLUSIVO: deja de verse a las 00:00 del lun 9.
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
    // Versión B, de reserva desde el 20-oct (diciembre resuelto); H2 de la v0.3.
    sinDiciembre: {
      titulo: { es: "¿Ya tenéis fecha para la cena de Navidad?", en: "Got a date for your Christmas dinner?" },
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
      // Frase [SI-TERRAZA-DIC] de la v0.3 (entra sin la etiqueta: resuelta).
      terraza: {
        es: "Y si es comida, antes de la noche, la tarde en Enjoy Terrace.",
        en: "And if it's a lunch, the afternoon at Enjoy Terrace comes first.",
      },
      // La línea de fechas con la formulación de Sergi (20-oct; paquete v0.5):
      // «en diciembre, fines de semana o bajo reserva para grupos», sin días
      // concretos (no los hay confirmados y la página sigue viva hasta el 8-nov).
      fechas: { es: "En diciembre, {fechas}.", en: "In December, {fechas}." },
    },
    // [FECHAS DICIEMBRE] (§4.1, resuelto el 20-oct).
    fechasDiciembre: { es: "fines de semana o bajo reserva para grupos", en: "weekends, or for groups by reservation" },
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
  },
  // §4.10 — la 1 en su versión «confirmado», la 2 con los datos que resolvió
  // Sergi, la 3 con la regla de puerta que publica la web, la 4 y la 5 sin
  // datos y la 6, vestimenta desde el primer día (v0.3).
  faq: {
    items: [
      {
        pregunta: { es: "¿Tenemos que comer o cenar con vosotros?", en: "Do we have to have lunch or dinner with you?" },
        respuesta: {
          es: "No. La comida o la cena la hacéis donde queráis: en vuestro hotel, en vuestro restaurante de siempre. Nosotros ponemos lo de después: la noche en OUTXIDE y, si es comida, la tarde antes en Enjoy Terrace{segunFechasTarde}.",
          en: "No. You have lunch or dinner wherever you like: at your own hotel or your favourite restaurant. We take care of what comes after: the night at OUTXIDE and, if it's a lunch, the afternoon first at Enjoy Terrace{segunFechasTarde}.",
        },
      },
      {
        pregunta: { es: "¿Qué días se puede?", en: "Which days are available?" },
        // Versión con datos (§4.10): [FECHAS] y [FECHAS DICIEMBRE] con la
        // formulación de Sergi (§4.1) y la frase [SI-OTRO-DÍA], que se mantiene.
        // Sin «jueves a sábado» ni «mayo-octubre» (la web está desfasada).
        respuesta: {
          es: "La noche en OUTXIDE empieza a las 23:00. Fechas para grupos: todos los días hasta mediados de noviembre; después, fines de semana o bajo reserva de grupo. En diciembre: fines de semana o bajo reserva para grupos. Si os encaja mejor otro día, decídnoslo en la solicitud y lo miramos.",
          en: "The night at OUTXIDE starts at 23:00. Dates for groups: every day until mid-November; after that, weekends, or for groups by reservation. In December: weekends, or for groups by reservation. If another day suits you better, tell us in your request and we'll look into it.",
        },
      },
      {
        pregunta: { es: "¿Cuántas personas hacen falta? ¿Hay edad mínima?", en: "How many people do we need? Is there a minimum age?" },
        // Por defecto, la regla de puerta que YA publica la web (faq.outxideA1:
        // «DNI o pasaporte»), sin [MÍNIMO]. La lista ampliada (DNI, NIE,
        // pasaporte o permiso de conducir) solo entra con el OK de Jose, en las
        // dos lenguas y en las dos landings a la vez (§7, punto 7).
        respuesta: {
          es: "Todo el grupo tiene que ser mayor de 18 años: en la puerta se pide DNI o pasaporte.",
          en: "Everyone must be 18 or over: ID or passport is required at the door.",
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
    vestimenta: {
      // La única noche en que no rige: la del sáb 31 (código propio en
      // Fourvenues). Oculta de las 23:00 del sáb 31 a las 05:30 del dom 1-nov
      // (+01:00: el cambio de hora es el dom 25-oct).
      ocultaDesde: "2026-10-31T23:00:00+01:00",
      ocultaHasta: "2026-11-01T05:30:00+01:00",
      pregunta: { es: "¿Hay código de vestimenta?", en: "Is there a dress code?" },
      // Adaptada de faq.outxideA3 de la web y acotada a OUTXIDE: la web no
      // publica ningún código para la tarde en Enjoy Terrace.
      respuesta: {
        es: "En OUTXIDE, arreglado pero informal (smart casual). No se permite ropa de playa ni chanclas.",
        en: "At OUTXIDE: smart casual. Beachwear and flip-flops are not permitted.",
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
  // §4.11 — metadatos PROPIOS (nada de «Cócteles, Shisha» heredado). El
  // og:title lleva las palabras del cartel (como el H1): la tarjeta al
  // compartir dice lo mismo que el anuncio. Las descripciones son las de la
  // v0.4/v0.5: la tarde solo «si es comida» (nada de «la cena… la fiesta sigue
  // en Enjoy Terrace», que prometía la tarde a quien cena), sin «temporada» ni
  // precio (la caché de Meta no se refresca).
  meta: {
    title: {
      es: "Celebraciones de empresa en Port d'Alcúdia · Grupo Enjoy",
      en: "Company celebrations in Port d'Alcúdia · Grupo Enjoy",
    },
    // De reserva: solo sin [SI-DICIEMBRE] (sin «Navidad»).
    description: {
      es: "Cenad o comed donde queráis: según fechas, la noche en OUTXIDE y, si es comida, antes la tarde en Enjoy Terrace. Port d'Alcúdia. Pide presupuesto. +18.",
      en: "Lunch or dinner wherever you like. On some dates, the night at OUTXIDE and, after lunch, Enjoy Terrace first. Port d'Alcúdia. Request a quote. 18+.",
    },
    // La que se pinta hoy ([SI-DICIEMBRE] confirmado, con noches de diciembre en
    // OUTXIDE): la noche sin «según fechas». 151 y 143 caracteres.
    descriptionDiciembre: {
      es: "Cenad o comed donde queráis: la noche en OUTXIDE y, si es comida, antes la tarde en Enjoy Terrace (según fechas). Fiestas de empresa y de Navidad. +18.",
      en: "Lunch or dinner wherever you like: the night at OUTXIDE and, after lunch, Enjoy Terrace first (on some dates). Team and Christmas parties. 18+.",
    },
    ogTitle: {
      es: "La cena, donde queráis. La fiesta, con nosotros.",
      en: "Dinner, wherever you like. The party, with us.",
    },
    // Con [SI-NOCHES-NOV-DIC] la noche va sin «según fechas» delante (como la
    // descripción con Navidad); la tarde lo conserva: el paquete deja los
    // metadatos tal cual al confirmarse la terraza, porque siguen siendo verdad
    // y es el texto que Meta guarda en caché (§4.1 y §4.11).
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
