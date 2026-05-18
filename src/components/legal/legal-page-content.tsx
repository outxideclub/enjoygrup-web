import { readDataSafe } from "@/lib/data";
import type { LegalPage } from "@/lib/data";
import { getServerLocale, getServerT } from "@/i18n/server";
import DOMPurify from "isomorphic-dompurify";

interface Props {
  slug: string;
}

export async function LegalPageContent({ slug }: Props) {
  const locale = await getServerLocale();
  const t = getServerT(locale);
  const fallback: LegalPage = { slug, title: "", lastUpdated: "", sections: [] };
  const localizedPath = locale !== "es" ? `legal/${slug}.${locale}.json` : `legal/${slug}.json`;
  let page = await readDataSafe<LegalPage>(localizedPath, fallback);
  if (!page.title && locale !== "es") {
    page = await readDataSafe<LegalPage>(`legal/${slug}.json`, fallback);
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
          <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(section.content) }} />
        </section>
      ))}
    </>
  );
}
