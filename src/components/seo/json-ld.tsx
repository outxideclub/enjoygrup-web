import { siteContact } from "@/lib/site";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

const ENJOY_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Av. Tucán, 1",
  addressLocality: "Port d'Alcúdia",
  addressRegion: "Illes Balears",
  postalCode: "07400",
  addressCountry: "ES",
};

const HIRU_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Carretera d'Artà, 40",
  addressLocality: "Alcúdia",
  addressRegion: "Illes Balears",
  postalCode: "07400",
  addressCountry: "ES",
};

const ENJOY_GEO = {
  "@type": "GeoCoordinates",
  latitude: 39.8402,
  longitude: 3.1375,
};

const HIRU_GEO = {
  "@type": "GeoCoordinates",
  latitude: 39.8402,
  longitude: 3.1222,
};

export function OrganizationJsonLd({ description }: { description?: string } = {}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://www.grupoenjoy.es/#organization",
        name: "Grupo Enjoy",
        url: "https://www.grupoenjoy.es",
        // Versión ligera del logo (~210 KB): Google lo descarga para el Knowledge Panel
        logo: "https://www.grupoenjoy.es/images/logos/enjoy-og.png",
        description:
          description ?? "Grupo de hostelería y ocio premium en Alcúdia, Mallorca. Tres experiencias únicas: Hiru Food & Drinks, Enjoy Terrace y Outxide Club.",
        telephone: siteContact.general.phone,
        address: ENJOY_ADDRESS,
        contactPoint: {
          "@type": "ContactPoint",
          email: "info@grupoenjoy.es",
          contactType: "customer service",
          availableLanguage: ["Spanish", "English", "German", "French", "Italian"],
        },
        subOrganization: [
          {
            "@type": "Restaurant",
            name: "Hiru Food & Drinks",
            url: "https://www.grupoenjoy.es/hiru",
          },
          {
            "@type": "BarOrPub",
            name: "Enjoy Terrace",
            url: "https://www.grupoenjoy.es/enjoy",
          },
          {
            "@type": "NightClub",
            name: "Outxide Club",
            url: "https://www.grupoenjoy.es/outxide",
          },
        ],
        sameAs: [
          "https://www.instagram.com/enjoy.club.alcudia/",
          "https://www.instagram.com/enjoy.terrace.alcudia/",
          "https://www.instagram.com/outxide.club/",
          "https://www.instagram.com/hirufoodanddrinks/",
          "https://www.facebook.com/EnjoyAlcudia/",
          "https://www.facebook.com/p/Hiru-61556033140610/",
          "https://www.tripadvisor.com/Attraction_Review-g580312-d4478448-Reviews-Enjoy_Club-Port_d_Alcudia_Alcudia_Majorca_Balearic_Islands.html",
          "https://www.tripadvisor.com/Restaurant_Review-g1233772-d27740707-Reviews-Hiru_Food_Drinks-Alcudia_Majorca_Balearic_Islands.html",
          "https://web.fourvenues.com/es/outxide-club",
        ],
      }}
    />
  );
}

export function HiruJsonLd({ description }: { description?: string } = {}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "@id": "https://www.grupoenjoy.es/hiru#restaurant",
        name: "Hiru Food & Drinks",
        alternateName: ["Hiru Restaurant", "Hiru Alcudia", "Hiru Food and Drinks", "Hiru Restaurante"],
        url: "https://www.grupoenjoy.es/hiru",
        image: "https://www.grupoenjoy.es/images/hiru/694647172_122298670106201104_2257975202148597878_n.jpg",
        description:
          description ?? "Cocina mallorquina a la brasa en Alcúdia. Carnes maduradas, arroces de lonja y pescados del Mediterráneo.",
        servesCuisine: ["Mediterranean", "Spanish", "Seafood", "Grill", "Paella", "Rice Dishes"],
        priceRange: "€€-€€€",
        address: HIRU_ADDRESS,
        geo: HIRU_GEO,
        telephone: siteContact.venues.hiru.phone,
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Wednesday", "Thursday"],
            opens: "12:00",
            closes: "23:30",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Friday", "Saturday"],
            opens: "12:00",
            closes: "01:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Sunday",
            opens: "12:00",
            closes: "23:30",
          },
        ],
        acceptsReservations: "True",
        potentialAction: {
          "@type": "ReserveAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://hirufoodanddrinks.myrestoo.net/es/reservar",
            actionPlatform: [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/IOSPlatform",
              "http://schema.org/AndroidPlatform",
            ],
          },
          result: {
            "@type": "FoodEstablishmentReservation",
            name: "Reserva en Hiru Food & Drinks",
          },
        },
        hasMenu: {
          "@type": "Menu",
          name: "Carta de Hiru Food & Drinks",
          url: "https://www.grupoenjoy.es/hiru#menu",
          hasMenuSection: [
            {
              "@type": "MenuSection",
              name: "Entrantes",
              hasMenuItem: [
                { "@type": "MenuItem", name: "Croquetas caseras", description: "Croquetas artesanales" },
                { "@type": "MenuItem", name: "Tataki de atún", description: "Tataki de atún rojo con sésamo" },
              ],
            },
            {
              "@type": "MenuSection",
              name: "Carnes a la Brasa",
              hasMenuItem: [
                { "@type": "MenuItem", name: "Chuletón de vaca madurada", description: "Carne madurada dry-aged a la brasa" },
                { "@type": "MenuItem", name: "Tomahawk", description: "Tomahawk premium a la brasa" },
                { "@type": "MenuItem", name: "Secreto ibérico", description: "Secreto ibérico a la brasa con guarnición" },
              ],
            },
            {
              "@type": "MenuSection",
              name: "Arroces y Paellas",
              hasMenuItem: [
                { "@type": "MenuItem", name: "Paella de marisco", description: "Paella tradicional con marisco fresco de lonja" },
                { "@type": "MenuItem", name: "Arroz caldoso de bogavante", description: "Arroz caldoso con bogavante del Mediterráneo" },
              ],
            },
            {
              "@type": "MenuSection",
              name: "Pescados",
              hasMenuItem: [
                { "@type": "MenuItem", name: "Pescado del día a la brasa", description: "Pescado fresco del Mediterráneo cocinado a la brasa" },
              ],
            },
          ],
        },
        hasMap: "https://www.google.com/maps/search/?api=1&query=Hiru+Food+Drinks+Ctra+Arta+40+Alcudia",
        areaServed: {
          "@type": "GeoCircle",
          geoMidpoint: { "@type": "GeoCoordinates", latitude: 39.8402, longitude: 3.1222 },
          geoRadius: "10000",
        },
        // Sin aggregateRating: Google ignora las valoraciones autoservidas (no
        // verificables en la propia página) y marcarlas es riesgo de acción manual.
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["[data-speakable]"],
        },
        sameAs: [
          "https://www.instagram.com/hirufoodanddrinks/",
          "https://www.facebook.com/p/Hiru-61556033140610/",
          "https://www.tripadvisor.com/Restaurant_Review-g1233772-d27740707-Reviews-Hiru_Food_Drinks-Alcudia_Majorca_Balearic_Islands.html",
        ],
        parentOrganization: {
          "@type": "Organization",
          "@id": "https://www.grupoenjoy.es/#organization",
          name: "Grupo Enjoy",
        },
      }}
    />
  );
}

export function EnjoyJsonLd({ description }: { description?: string } = {}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BarOrPub",
        "@id": "https://www.grupoenjoy.es/enjoy#bar",
        name: "Enjoy Terrace - Cocktail Lounge & Shisha Bar",
        alternateName: ["Enjoy Club", "Enjoy Club Alcudia", "Enjoy Terrace Alcudia", "Enjoy Cocktails"],
        url: "https://www.grupoenjoy.es/enjoy",
        image: "https://www.grupoenjoy.es/images/enjoy/489390658_1397879798281690_242980700226707519_n.jpg",
        description:
          description ?? "Cocktail lounge y terraza premium en Alcúdia. Cócteles de autor, shisha premium y la mejor terraza nocturna de Mallorca.",
        servesCuisine: ["Cocktails", "Shisha", "Premium Drinks"],
        priceRange: "€€",
        address: ENJOY_ADDRESS,
        geo: ENJOY_GEO,
        telephone: siteContact.venues.enjoy.phone,
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
            ],
            opens: "17:00",
            closes: "05:30",
          },
        ],
        // Sin aggregateRating: valoraciones autoservidas, ver nota en HiruJsonLd
        hasMenu: {
          "@type": "Menu",
          name: "Enjoy Terrace Cocktail & Shisha Menu",
          url: "https://www.grupoenjoy.es/enjoy#menu",
          hasMenuSection: [
            {
              "@type": "MenuSection",
              name: "Signature Cocktails",
              hasMenuItem: [
                { "@type": "MenuItem", name: "Enjoy Sunset", description: "Signature cocktail with tropical flavours and Mediterranean citrus" },
                { "@type": "MenuItem", name: "Mediterranean Spritz", description: "Refreshing Aperol spritz with a house twist" },
                { "@type": "MenuItem", name: "Mojito Premium", description: "Classic mojito with fresh mint and premium rum" },
              ],
            },
            {
              "@type": "MenuSection",
              name: "Premium Shisha",
              hasMenuItem: [
                { "@type": "MenuItem", name: "Shisha Premium", description: "Premium hookah with a wide selection of flavours" },
                { "@type": "MenuItem", name: "Shisha Fruit Bowl", description: "Shisha served in a fresh fruit bowl" },
              ],
            },
          ],
        },
        potentialAction: {
          "@type": "ViewAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://www.grupoenjoy.es/enjoy#menu",
          },
          name: "Ver Carta de Enjoy Terrace",
        },
        hasMap: "https://www.google.com/maps/search/?api=1&query=Enjoy+Terrace+Av+Tucan+1+Alcudia",
        currenciesAccepted: "EUR",
        paymentAccepted: "Cash, Credit Card",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["[data-speakable]"],
        },
        sameAs: [
          "https://www.instagram.com/enjoy.terrace.alcudia/",
          "https://www.facebook.com/EnjoyAlcudia/",
          "https://www.tripadvisor.com/Attraction_Review-g580312-d4478448-Reviews-Enjoy_Club-Port_d_Alcudia_Alcudia_Majorca_Balearic_Islands.html",
        ],
        parentOrganization: {
          "@type": "Organization",
          "@id": "https://www.grupoenjoy.es/#organization",
          name: "Grupo Enjoy",
        },
      }}
    />
  );
}

export function OutxideJsonLd({ description }: { description?: string } = {}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "NightClub",
        "@id": "https://www.grupoenjoy.es/outxide#nightclub",
        name: "Outxide Club",
        alternateName: ["Outside Club", "Outxide Club Alcudia", "Outxide Alcudia", "Outxide Mallorca"],
        url: "https://www.grupoenjoy.es/outxide",
        image: "https://www.grupoenjoy.es/images/outxide/DSCF8103-9.jpg",
        description:
          description ?? "Club nocturno premium en Alcúdia, Mallorca. Los mejores DJs, eventos exclusivos, mesas VIP y la mejor vida nocturna de la isla.",
        priceRange: "€€",
        address: ENJOY_ADDRESS,
        geo: ENJOY_GEO,
        telephone: siteContact.venues.outxide.phone,
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Thursday", "Friday", "Saturday"],
            opens: "23:30",
            closes: "06:00",
          },
        ],
        amenityFeature: [
          { "@type": "LocationFeatureSpecification", name: "VIP Tables", value: true },
          { "@type": "LocationFeatureSpecification", name: "DJ Sets", value: true },
          { "@type": "LocationFeatureSpecification", name: "Themed Parties", value: true },
          { "@type": "LocationFeatureSpecification", name: "Bottle Service", value: true },
        ],
        // Sin aggregateRating: valoraciones autoservidas, ver nota en HiruJsonLd
        potentialAction: {
          "@type": "BuyAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://web.fourvenues.com/es/outxide-club",
            actionPlatform: [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/IOSPlatform",
              "http://schema.org/AndroidPlatform",
            ],
          },
          name: "Comprar Entradas Outxide Club",
        },
        hasMap: "https://www.google.com/maps/search/?api=1&query=Outxide+Club+Av+Tucan+1+Alcudia",
        isAccessibleForFree: false,
        currenciesAccepted: "EUR",
        paymentAccepted: "Cash, Credit Card",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["[data-speakable]"],
        },
        sameAs: [
          "https://www.instagram.com/outxide.club/",
          "https://web.fourvenues.com/es/outxide-club",
        ],
        parentOrganization: {
          "@type": "Organization",
          "@id": "https://www.grupoenjoy.es/#organization",
          name: "Grupo Enjoy",
        },
      }}
    />
  );
}

export function OutxideEventsJsonLd() {
  // Generate concrete upcoming dates for Google Rich Results validation
  // Google requires startDate on each Event — Schedule alone is not enough
  const now = new Date();

  function getNextDay(dayOfWeek: number): Date {
    const d = new Date(now);
    d.setHours(23, 30, 0, 0);
    const diff = (dayOfWeek - d.getDay() + 7) % 7;
    d.setDate(d.getDate() + (diff === 0 && now.getHours() >= 23 ? 7 : diff === 0 ? 0 : diff));
    return d;
  }

  // Format as ISO 8601 with CEST offset (summer Mallorca = +02:00)
  function fmtDate(d: Date, time: string): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}T${time}:00+02:00`;
  }

  const eventDefs = [
    {
      name: "Outxide Thursday",
      dayOfWeek: 4,
      description:
        "Weekly club night at Outxide Club, Port d'Alcúdia. Techno, house and the best DJs every Thursday.",
    },
    {
      name: "Outxide Friday",
      dayOfWeek: 5,
      description:
        "Friday night at Outxide Club, Port d'Alcúdia. International DJs, themed parties and VIP bottle service.",
    },
    {
      name: "Outxide Saturday",
      dayOfWeek: 6,
      description:
        "Saturday night at Outxide Club, Port d'Alcúdia. The biggest party of the week with top DJs and special events.",
    },
  ];

  const OUTXIDE_IMAGE = "https://www.grupoenjoy.es/images/outxide/DSCF8103-9.jpg";
  const ORGANIZER = {
    "@type": "Organization",
    "@id": "https://www.grupoenjoy.es/#organization",
    name: "Grupo Enjoy",
    url: "https://www.grupoenjoy.es",
  };
  const LOCATION = {
    "@type": "NightClub",
    "@id": "https://www.grupoenjoy.es/outxide#nightclub",
    name: "Outxide Club",
    address: ENJOY_ADDRESS,
    geo: ENJOY_GEO,
  };

  // Generate next 2 occurrences of each day = 6 concrete events
  const subEvents = eventDefs.flatMap((e) => {
    const first = getNextDay(e.dayOfWeek);
    return [0, 7].map((offset) => {
      const start = new Date(first);
      start.setDate(start.getDate() + offset);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      return {
        "@type": "Event",
        name: e.name,
        description: e.description,
        startDate: fmtDate(start, "23:30"),
        endDate: fmtDate(end, "06:00"),
        image: OUTXIDE_IMAGE,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        location: LOCATION,
        organizer: ORGANIZER,
        offers: {
          "@type": "Offer",
          url: "https://web.fourvenues.com/es/outxide-club",
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
        },
        performer: {
          "@type": "PerformingGroup",
          name: "International DJs",
        },
      };
    });
  });

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "EventSeries",
        name: "Outxide Club Weekly Events",
        description:
          "Weekly club nights at Outxide Club in Port d'Alcúdia, Mallorca. Techno, house, reggaetón and international DJs every Thursday, Friday and Saturday.",
        url: "https://www.grupoenjoy.es/outxide",
        location: LOCATION,
        organizer: ORGANIZER,
        image: OUTXIDE_IMAGE,
        subEvent: subEvents,
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Venue hero video schema for Video Rich Results + AI Mode           */
/* ------------------------------------------------------------------ */

interface VenueVideoProps {
  venue: "enjoy" | "outxide" | "hiru";
}

const venueVideoData = {
  enjoy: {
    name: "Enjoy Terrace — Cocktail Lounge & Shisha Bar in Port d'Alcúdia",
    description: "Experience the sunset cocktail atmosphere at Enjoy Terrace, the premium shisha and cocktail lounge in Port d'Alcúdia, Mallorca. Open daily from 17:00.",
    thumbnailUrl: "https://www.grupoenjoy.es/videos/enjoy-hero-poster.jpg",
    contentUrl: "https://www.grupoenjoy.es/videos/enjoy-hero.mp4",
    embedUrl: "https://www.grupoenjoy.es/enjoy",
    uploadDate: "2025-05-01",
  },
  outxide: {
    name: "Outxide Club — Premier Nightclub in Port d'Alcúdia, Mallorca",
    description: "Feel the energy of Outxide Club, the top nightclub in northern Mallorca. International DJs, VIP service, and unforgettable nights in Port d'Alcúdia.",
    thumbnailUrl: "https://www.grupoenjoy.es/videos/outxide-hero-poster.jpg",
    contentUrl: "https://www.grupoenjoy.es/videos/outxide-hero.mp4",
    embedUrl: "https://www.grupoenjoy.es/outxide",
    uploadDate: "2025-05-01",
  },
  hiru: {
    name: "Hiru Food & Drinks — Charcoal Grill Restaurant in Alcúdia, Mallorca",
    description: "Discover Hiru Food & Drinks, a Mediterranean charcoal grill restaurant in Alcúdia, Mallorca. Dry-aged meats, fresh seafood paella, and a vibrant atmosphere.",
    thumbnailUrl: "https://www.grupoenjoy.es/videos/hiru-hero-poster.jpg",
    contentUrl: "https://www.grupoenjoy.es/videos/hiru-hero.mp4",
    embedUrl: "https://www.grupoenjoy.es/hiru",
    uploadDate: "2025-05-01",
  },
} as const;

export function VenueVideoJsonLd({ venue }: VenueVideoProps) {
  const v = venueVideoData[venue];
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: v.name,
        description: v.description,
        thumbnailUrl: v.thumbnailUrl,
        contentUrl: v.contentUrl,
        embedUrl: v.embedUrl,
        uploadDate: v.uploadDate,
        publisher: {
          "@type": "Organization",
          "@id": "https://www.grupoenjoy.es/#organization",
          name: "Grupo Enjoy",
        },
      }}
    />
  );
}

export function WebSiteJsonLd({ description }: { description?: string } = {}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://www.grupoenjoy.es/#website",
        url: "https://www.grupoenjoy.es",
        name: "Grupo Enjoy",
        alternateName: ["Grupo Enjoy Alcudia", "Enjoy Group Mallorca"],
        description: description ?? "Cocktail lounge, nightclub & restaurant in Port d'Alcúdia, Mallorca",
        inLanguage: ["es", "en", "de", "fr", "it"],
        publisher: {
          "@type": "Organization",
          "@id": "https://www.grupoenjoy.es/#organization",
          name: "Grupo Enjoy",
          url: "https://www.grupoenjoy.es",
        },
        // Sin SearchAction: /blog no implementa búsqueda y Google retiró el
        // sitelinks search box en 2024 — el markup era un no-op engañoso.
      }}
    />
  );
}
