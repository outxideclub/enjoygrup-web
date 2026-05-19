export const es = {
  common: {
    location: "Alcudia, Mallorca",
    explore: "Explorar",
    visit: "Visitar",
    gallery: "Galeria",
    menu: "Carta",
    discover: "Descubrir",
    close: "Cerrar",
    loading: "Cargando...",
    backToGroup: "Grupo Enjoy",
    reserveTable: "Reservar mesa",
    events: "Eventos",
    open: "Abierto",
    language: "Idioma",
    backToMenu: "Volver a la carta",
  },
  nav: {
    openMenu: "Abrir menu",
    closeMenu: "Cerrar menu",
    goToHome: "Volver al inicio de Grupo Enjoy",
    goToEnjoy: "Ir a Enjoy Terrace",
    goToOutxide: "Ir a Outxide Club",
    goToHiru: "Ir a Hiru Food and Drinks",
  },
  home: {
    enjoySubtitle: "Terrace - Cocktails & Shisha",
    enjoyDescription:
      "Where nights begin. Los mejores cocteles de Alcudia, shisha premium y la terraza con mas ambiente para empezar la noche.",
    outxideSubtitle: "Club",
    outxideDescription:
      "The night continues. Club nocturno con los mejores DJs, produccion de primer nivel y una energia que no encontraras en otro sitio.",
    hiruSubtitle: "Food & Drinks",
    hiruDescription:
      "Brasa, cocktails y buen ambiente. Cocina de autor con las mejores carnes, arroces y cocteles hasta altas horas de la noche.",
    threeSpaces: "Tres espacios, una misma excelencia",
    grupoEnjoy: "Grupo Enjoy",
    enjoyCta: "Enjoy Terrace",
    outxideCta: "Outxide Club",
    hiruCta: "Hiru Food & Drinks",
  },
  enjoy: {
    tagline: "Where nights begin",
    subtitle: "Terrace - Cocktails & Shisha",
    galleryTitle: "La terraza",
    menuTitle: "Nuestra Carta",
    shishaTitle: "Shisha",
    drinksNavTitle: "Cocktails & Bebidas",
    hours: "Abierto diario: 17:00 - 05:30",
    address: "Av. Tucán, 1, Port d'Alcúdia",
    continueOutxide: "Continua en Outxide Club",
  },
  outxide: {
    tagline: "The night continues",
    description:
      "La nueva referencia en vida nocturna de Alcudia. Musica, energia y noches que no olvidaras.",
    galleryTitle: "El club",
    eventsTitle: "Proximos eventos",
    eventsCalendar: "Calendario",
    noEvents: "Proximamente nuevos eventos.",
    buyTicket: "Comprar entrada",
    eventsVia: "Eventos y entradas via",
    hours: "Abierto: 23:00 - 05:30",
    address: "Av. Tucán, 1, 07400 Alcúdia, Mallorca",
    dinnerHiru: "Cena en Hiru",
    checkoutSuccess: "Compra completada",
    checkoutSuccessDesc:
      "Tu compra se ha procesado correctamente. En breve recibiras la confirmacion con tus entradas.",
    checkoutSuccessEmail:
      "Revisa tu email (incluida la carpeta de spam) para encontrar tus entradas y el codigo QR de acceso.",
    checkoutCancel: "Pago cancelado",
    checkoutCancelDesc:
      "El proceso de pago ha sido cancelado. No se ha realizado ningun cargo. Puedes volver a intentarlo cuando quieras.",
    backToEvents: "Ver eventos",
    tryAgain: "Intentar de nuevo",
  },
  hiru: {
    subtitle: "Brasa - Cocktails - Good vibes",
    description:
      "Cocina de autor donde la brasa y el producto fresco son los protagonistas. Carnes, arroces de lonja y los mejores cocteles hasta altas horas.",
    galleryTitle: "Producto - Tradicion - Sabor",
    menuTitle: "La Carta",
    freshProduct: "Producto fresco",
    freshProductDesc:
      "Seleccionamos las mejores carnes y pescados para ofrecer platos de brasa con caracter.",
    signatureCuisine: "Cocina de autor",
    signatureCuisineDesc:
      "Reinterpretamos la cocina mallorquina con tecnicas modernas y sabores internacionales.",
    openLate: "Abierto hasta tarde",
    openLateDesc:
      "Restaurante y bar de cocteles con el mejor ambiente nocturno de Alcudia.",
    hours: "12:00-23:30 - Vie-Sab hasta 1:00 - Mar cerrado",
    address: "Ctra. d'Artà, 40, Port d'Alcúdia",
    continueEnjoy: "Continua en Enjoy Terrace",
  },
  footer: {
    tagline: "Tres experiencias unicas en Alcudia, Mallorca.",
    legal: "Legal",
    avisoLegal: "Aviso Legal",
    privacy: "Privacidad",
    cookies: "Cookies",
    salesConditions: "Condiciones de Venta",
    socialMedia: "Redes sociales",
    email: "Email",
    location: "Ubicacion",
    cookieSettings: "Configurar Cookies",
  },
  legal: {
    title: "Legal",
    avisoLegal: "Aviso Legal",
    privacy: "Privacidad",
    cookies: "Cookies",
    images: "Imagenes",
    salesConditions: "Condiciones de Venta",
    entryConditions: "Condiciones de Entrada",
    lastUpdated: "Ultima actualizacion",
    contentUnavailable: "Contenido no disponible.",
  },
  cookieBanner: {
    title: "Utilizamos cookies",
    description:
      "Usamos cookies esenciales para el funcionamiento del sitio. Con tu consentimiento, tambien usamos cookies analiticas y de marketing para mejorar tu experiencia.",
    moreInfo: "Mas informacion",
    acceptAll: "Aceptar todo",
    rejectAll: "Solo necesarias",
    configure: "Configurar",
    configureTitle: "Configurar cookies",
    necessary: "Necesarias",
    necessaryDesc: "Esenciales para el funcionamiento del sitio. No se pueden desactivar.",
    analytics: "Analiticas",
    analyticsDesc: "Nos ayudan a entender como se usa el sitio (Google Analytics 4).",
    marketing: "Marketing",
    marketingDesc: "Permiten mostrar publicidad relevante (Meta Pixel, TikTok Pixel).",
    savePreferences: "Guardar preferencias",
    moreDetails: "Mas detalles en nuestra",
    cookiePolicy: "Politica de Cookies",
    and: "y",
    privacyPolicy: "Politica de Privacidad",
    settingsButton: "Configurar Cookies",
  },
} as const;

// Recursive type that converts all leaf values to string
type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};

export type Dictionary = DeepStringify<typeof es>;
