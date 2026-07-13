import { readDataSafe } from "@/lib/data";
import type { LegalPage } from "@/lib/data";
import { getServerLocale, getServerT } from "@/i18n/server";
import { sanitizeHtml } from "@/lib/sanitize";

interface Props {
  slug: string;
}

export async function LegalPageContent({ slug }: Props) {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  const fallback: LegalPage = { slug, title: "", lastUpdated: "", sections: [] };
  // Orden de preferencia: idioma exacto → inglés (lo entiende el turista de/fr/it) → español.
  const candidates =
    locale === "es"
      ? [`legal/${slug}.json`]
      : locale === "en"
        ? [`legal/${slug}.en.json`, `legal/${slug}.json`]
        : [`legal/${slug}.${locale}.json`, `legal/${slug}.en.json`, `legal/${slug}.json`];
  let page = fallback;
  for (const path of candidates) {
    page = await readDataSafe<LegalPage>(path, fallback);
    if (page.title) break;
  }

  if (!page.title) {
    return <p>{t("legal.contentUnavailable")}</p>;
  }

  return (
    <>
      <h1>{page.title}</h1>
      {page.lastUpdated && (
        <p className="text-xs text-white/30">
          {t("legal.lastUpdated")}: {page.lastUpdated}
        </p>
      )}
      {page.sections.map((section) => (
        <section key={section.id}>
          <h2>{section.heading}</h2>
          <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(section.content) }} />
        </section>
      ))}
    </>
  );
}
