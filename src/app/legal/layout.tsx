import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Scale, Shield, Cookie, Camera, ShoppingBag, DoorOpen } from "lucide-react";
import { getServerLocale, getServerT } from "@/i18n/server";

export const metadata: Metadata = {
  title: {
    template: "%s | Legal — Grupo Enjoy",
    default: "Legal — Grupo Enjoy",
  },
  robots: { index: false, follow: true },
};

export default async function LegalLayout({ children }: { children: React.ReactNode }) {
  const locale = await getServerLocale();
  const t = getServerT(locale);

  const legalNav = [
    { href: "/legal/aviso-legal", label: t("legal.avisoLegal"), icon: Scale },
    { href: "/legal/privacidad", label: t("legal.privacy"), icon: Shield },
    { href: "/legal/cookies", label: t("legal.cookies"), icon: Cookie },
    { href: "/legal/imagenes", label: t("legal.images"), icon: Camera },
    { href: "/legal/condiciones-venta", label: t("legal.salesConditions"), icon: ShoppingBag },
    { href: "/legal/condiciones-entrada", label: t("legal.entryConditions"), icon: DoorOpen },
  ];
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-28 pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12">
            <aside className="hidden lg:block">
              <nav className="sticky top-28 space-y-1">
                <p className="text-xs font-bold tracking-[0.2em] text-white/30 uppercase mb-4">
                  {t("legal.title")}
                </p>
                {legalNav.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </aside>

            <main id="contenido" className="min-w-0">
              {/* Mobile navigation */}
              <nav className="lg:hidden mb-8 flex flex-wrap gap-2">
                {legalNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-full border border-white/10 px-4 py-1.5 text-xs text-muted-foreground hover:text-white hover:border-white/20 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <article className="prose prose-invert prose-sm max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:tracking-wide prose-h1:text-3xl prose-h2:text-xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-base prose-h3:mt-8 prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-white prose-a:text-white prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-primary prose-table:text-sm prose-th:text-left prose-th:text-white/60 prose-th:font-medium prose-td:text-muted-foreground">
                {children}
              </article>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
