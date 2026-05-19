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
  addressLocality: "Port d'Alcúdia",
  addressRegion: "Illes Balears",
  postalCode: "07400",
  addressCountry: "ES",
};

const ENJOY_GEO = {
  "@type": "GeoCoordinates",
  latitude: 39.8531,
  longitude: 3.1217,
};

const HIRU_GEO = {
  "@type": "GeoCoordinates",
  latitude: 39.8548,
  longitude: 3.1185,
};

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "https://www.grupoenjoy.es/#organization",
        name: "Grupo Enjoy",
        url: "https://www.grupoenjoy.es",
        logo: "https://www.grupoenjoy.es/images/logos/enjoy.png",
        description:
          "Grupo de hostelería y ocio premium en Alcúdia, Mallorca. Tres experiencias únicas: Hiru Food & Drinks, Enjoy Terrace y Outxide Club.",
        address: ENJOY_ADDRESS,
        contactPoint: {
          "@type": "ContactPoint",
          email: "info@grupoenjoy.com",
          contactType: "customer service",
          availableLanguage: ["Spanish", "English"],
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
          "https://www.instagram.com/grupoenjoy",
          "https://www.tiktok.com/@grupoenjoy",
          "https://www.facebook.com/grupoenjoy",
        ],
      }}
    />
  );
}

export function HiruJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "@id": "https://www.grupoenjoy.es/hiru#restaurant",
        name: "Hiru Food & Drinks",
        url: "https://www.grupoenjoy.es/hiru",
        image: "https://www.grupoenjoy.es/images/hiru/694647172_122298670106201104_2257975202148597878_n.jpg",
        description:
          "Cocina mallorquina a la brasa en Alcúdia. Carnes maduradas, arroces de lonja y pescados del Mediterráneo.",
        servesCuisine: ["Mediterránea", "Mallorquina", "Brasa"],
        priceRange: "€€€",
        address: HIRU_ADDRESS,
        geo: HIRU_GEO,
        telephone: "+34 971 546 789",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
            ],
            opens: "13:00",
            closes: "01:00",
          },
        ],
        acceptsReservations: true,
        hasMenu: {
          "@type": "Menu",
          url: "https://www.grupoenjoy.es/hiru#menu",
        },
        parentOrganization: {
          "@type": "Organization",
          name: "Grupo Enjoy",
        },
      }}
    />
  );
}

export function EnjoyJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BarOrPub",
        "@id": "https://www.grupoenjoy.es/enjoy#bar",
        name: "Enjoy Terrace",
        url: "https://www.grupoenjoy.es/enjoy",
        image: "https://www.grupoenjoy.es/images/enjoy/489390658_1397879798281690_242980700226707519_n.jpg",
        description:
          "Cocktail lounge y terraza premium en Alcúdia. Cócteles de autor, shisha premium y la mejor terraza nocturna de Mallorca.",
        servesCuisine: "Cocktails",
        priceRange: "€€€",
        address: ENJOY_ADDRESS,
        geo: ENJOY_GEO,
        telephone: "+34 971 546 789",
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
            ],
            opens: "17:00",
            closes: "04:00",
          },
        ],
        acceptsReservations: true,
        hasMenu: {
          "@type": "Menu",
          url: "https://www.grupoenjoy.es/enjoy#carta",
        },
        parentOrganization: {
          "@type": "Organization",
          name: "Grupo Enjoy",
        },
      }}
    />
  );
}

export function OutxideJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "NightClub",
        "@id": "https://www.grupoenjoy.es/outxide#nightclub",
        name: "Outxide Club",
        url: "https://www.grupoenjoy.es/outxide",
        image: "https://www.grupoenjoy.es/images/outxide/DSCF8103-9.webp",
        description:
          "Club nocturno premium en Alcúdia, Mallorca. Los mejores DJs, eventos exclusivos, mesas VIP y la mejor vida nocturna de la isla.",
        priceRange: "€€€",
        address: ENJOY_ADDRESS,
        geo: ENJOY_GEO,
        telephone: "+34 971 546 789",
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
        parentOrganization: {
          "@type": "Organization",
          name: "Grupo Enjoy",
        },
      }}
    />
  );
}
