import { siteContact } from "@/lib/site";
import { fourVenuesOrgUrl } from "@/lib/events";

interface JsonLdProps {
  data: Record<string, unknown>;
}

/**
 * Serializa a JSON escapando los caracteres que podrían romper el <script> o
 * inyectar HTML (`<`, `>`, `&`) y los separadores de línea JS (U+2028/2029).
 * Cualquier dato del CMS que acabe en un JSON-LD queda neutralizado.
 */
function safeJsonLd(data: Record<string, unknown>): string {
  // Escapa <, >, & y los separadores de línea JS U+2028/U+2029 por su forma \uXXXX.
  return JSON.stringify(data).replace(/[<>&\u2028\u2029]/g, (c) => {
    return "\\u" + c.charCodeAt(0).toString(16).padStart(4, "0");
  });
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
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

const ENJOY_GEO = {
  "@type": "GeoCoordinates",
  latitude: 39.8402,
  longitude: 3.1375,
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
          description ?? "Grupo de hostelería y ocio premium en Alcúdia, Mallorca. Dos experiencias únicas: Enjoy Terrace y Outxide Club.",
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
          "https://www.facebook.com/EnjoyAlcudia/",
          "https://www.tripadvisor.com/Attraction_Review-g580312-d4478448-Reviews-Enjoy_Club-Port_d_Alcudia_Alcudia_Majorca_Balearic_Islands.html",
          "https://site.fourvenues.com/es/outxide-club",
        ],
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
        // Sin aggregateRating: Google ignora valoraciones autoservidas (riesgo de acción manual)
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

export function OutxideJsonLd({ description, locale = "es" }: { description?: string; locale?: string } = {}) {
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
            opens: "23:00",
            closes: "05:30",
          },
        ],
        amenityFeature: [
          { "@type": "LocationFeatureSpecification", name: "VIP Tables", value: true },
          { "@type": "LocationFeatureSpecification", name: "DJ Sets", value: true },
          { "@type": "LocationFeatureSpecification", name: "Themed Parties", value: true },
          { "@type": "LocationFeatureSpecification", name: "Bottle Service", value: true },
        ],
        // Sin aggregateRating: Google ignora valoraciones autoservidas (riesgo de acción manual)
        potentialAction: {
          "@type": "BuyAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: fourVenuesOrgUrl(locale),
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
          "https://site.fourvenues.com/es/outxide-club",
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
    name: "Hiru Food & Drinks — A Farewell to Our Charcoal Grill in Alcúdia, Mallorca",
    description: "A look back at Hiru Food & Drinks, the Mediterranean charcoal grill restaurant of Grupo Enjoy in Alcúdia (closed in August 2026). Thank you for everything.",
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
        description: description ?? "Cocktail lounge & nightclub in Port d'Alcúdia, Mallorca",
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
