// Guías destacadas para la sección de blog de la HOME.
// Módulo LIGERO a propósito (solo slug + imagen + título de tarjeta, sin el
// contenido pesado de posts.ts) para no inflar el bundle de la página de inicio,
// que es un componente cliente. Da a la home enlaces internos crawlables hacia
// los posts más fuertes (reparte autoridad al blog).

export type FeaturedLocale = "es" | "en" | "de" | "fr" | "it";

export interface FeaturedGuide {
  slug: string;
  image: string;
  title: Record<FeaturedLocale, string>;
}

export const featuredGuides: FeaturedGuide[] = [
  {
    slug: "que-hacer-alcudia-mallorca",
    image: "/images/hiru/694647172_122298670106201104_2257975202148597878_n.jpg",
    title: {
      es: "Qué hacer en Alcúdia",
      en: "What to do in Alcúdia",
      de: "Was in Alcúdia unternehmen",
      fr: "Que faire à Alcúdia",
      it: "Cosa fare ad Alcúdia",
    },
  },
  {
    slug: "vida-nocturna-mallorca-guia",
    image: "/images/outxide/DSCF8103-9.jpg",
    title: {
      es: "Vida nocturna en Mallorca",
      en: "Nightlife in Mallorca",
      de: "Nachtleben auf Mallorca",
      fr: "Vie nocturne à Majorque",
      it: "Vita notturna a Maiorca",
    },
  },
  {
    slug: "mejores-restaurantes-alcudia-mallorca",
    image: "/images/hiru/476864545_122218990460201104_8345858149750135207_n.jpg",
    title: {
      es: "Dónde comer en Alcúdia",
      en: "Where to eat in Alcúdia",
      de: "Wo man in Alcúdia isst",
      fr: "Où manger à Alcúdia",
      it: "Dove mangiare ad Alcúdia",
    },
  },
  {
    slug: "playas-alcudia-guia-completa",
    image: "/images/enjoy/489390658_1397879798281690_242980700226707519_n.jpg",
    title: {
      es: "Las mejores playas de Alcúdia",
      en: "The best beaches in Alcúdia",
      de: "Die besten Strände Alcúdias",
      fr: "Les plus belles plages d'Alcúdia",
      it: "Le spiagge migliori di Alcúdia",
    },
  },
  {
    slug: "cocteles-shisha-terraza-alcudia",
    image: "/images/enjoy/486794569_1387780529291617_4160677529187971189_n.jpg",
    title: {
      es: "Cócteles y shisha en terraza",
      en: "Cocktails & shisha on the terrace",
      de: "Cocktails & Shisha auf der Terrasse",
      fr: "Cocktails & chicha en terrasse",
      it: "Cocktail e shisha in terrazza",
    },
  },
  {
    slug: "fiestas-eventos-verano-alcudia-2026",
    image: "/images/enjoy/487828104_1394995181903485_876093983168073158_n.jpg",
    title: {
      es: "Fiestas y eventos 2026",
      en: "Parties & events 2026",
      de: "Partys & Events 2026",
      fr: "Fêtes & événements 2026",
      it: "Feste ed eventi 2026",
    },
  },
];
