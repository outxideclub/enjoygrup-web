import type { Metadata } from "next";
import { BreadcrumbJsonLd, JsonLd } from "@/components/seo/json-ld";
import { getServerLocale, getServerT } from "@/i18n/server";
import { localizedPath } from "@/i18n/config";
import { getMatches, broadcastIds, flagUrl, madridTimeLabel } from "@/lib/mundial";

const ogLocaleMap: Record<string, string> = {
  es: "es_ES",
  en: "en_GB",
  de: "de_DE",
  fr: "fr_FR",
  it: "it_IT",
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  return {
    title: t("mundial.metaTitle"),
    description: t("mundial.metaDescription"),
    openGraph: {
      title: t("mundial.metaTitle"),
      description: t("mundial.metaDescription"),
      url: `https://www.grupoenjoy.es${localizedPath("/mundial", locale)}`,
      type: "website",
      locale: ogLocaleMap[locale] || "es_ES",
    },
    twitter: {
      card: "summary_large_image",
      title: t("mundial.metaTitle"),
      description: t("mundial.metaDescription"),
    },
  };
}

export default async function MundialLayout({ children }: { children: React.ReactNode }) {
  // JSON-LD: lista de los partidos que se emiten en Outxide con equipos definidos.
  const ids = broadcastIds();
  const events = getMatches()
    .filter((m) => ids.has(m.id) && m.home.name && m.away.name)
    .slice(0, 30)
    .map((m, i) => ({
      "@type": "BroadcastEvent",
      position: i + 1,
      name: `${m.home.name} vs ${m.away.name}`,
      startDate: m.kickoffUtc,
      isLiveBroadcast: true,
      broadcastOfEvent: {
        "@type": "SportsEvent",
        name: `${m.home.name} vs ${m.away.name} — FIFA World Cup 2026`,
        startDate: m.kickoffUtc,
        sport: "Soccer",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: "Outxide Club",
          address: "Av. Tucan 1, Port d'Alcúdia, Mallorca",
        },
        competitor: [
          { "@type": "SportsTeam", name: m.home.name, image: flagUrl(m.home.code) },
          { "@type": "SportsTeam", name: m.away.name, image: flagUrl(m.away.code) },
        ],
      },
      description: `${madridTimeLabel(m)} · Outxide Club, Port d'Alcúdia`,
    }));

  return (
    <div>
      {children}
      <BreadcrumbJsonLd
        items={[
          { name: "Grupo Enjoy", url: "https://www.grupoenjoy.es" },
          { name: "Mundial 2026", url: "https://www.grupoenjoy.es/mundial" },
        ]}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "FIFA World Cup 2026 — live at Outxide Club",
          itemListElement: events,
        }}
      />
    </div>
  );
}
