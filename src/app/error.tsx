"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useT } from "@/i18n";

// Límite de error del subtree: ante cualquier excepción de render se muestra
// esta página de marca (con reintento) en vez del 500 pelado de Next.
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useT();

  useEffect(() => {
    console.error("Render error:", error);
  }, [error]);

  return (
    <div className="noise-texture relative min-h-screen flex flex-col">
      <Navbar />
      <main id="contenido" className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <p className="text-9xl font-display font-bold text-white/5 mb-2 select-none">!</p>
          <h1 className="text-2xl font-bold text-white mb-4">{t("error.title")}</h1>
          <p className="text-muted-foreground mb-10 leading-relaxed">{t("error.description")}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={reset}
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {t("error.retry")}
            </button>
            <Link
              href="/"
              className="rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white/70 transition-colors hover:text-white hover:border-white/40"
            >
              {t("notFound.backHome")}
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
