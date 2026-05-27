"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useT } from "@/i18n";

export default function NotFound() {
  const t = useT();

  return (
    <div className="noise-texture relative min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="text-9xl font-display font-bold text-white/5 mb-2 select-none">404</p>
          <h1 className="text-2xl font-bold text-white mb-4">
            {t("notFound.title")}
          </h1>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            {t("notFound.description")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:bg-white/90 transition-colors"
            >
              {t("notFound.backHome")}
            </Link>
            <Link
              href="/enjoy"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/70 hover:text-white hover:border-enjoy/40 transition-colors"
            >
              Enjoy Terrace
            </Link>
            <Link
              href="/hiru"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/70 hover:text-white hover:border-hiru/40 transition-colors"
            >
              Hiru Food & Drinks
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
