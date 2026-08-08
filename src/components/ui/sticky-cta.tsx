"use client";

import { useEffect, useState } from "react";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { cn } from "@/lib/utils";

type Accent = "enjoy" | "outxide" | "hiru";

// Clases literales por local (Tailwind necesita el nombre completo en el código).
const ACCENT: Record<Accent, { btn: string; ring: string }> = {
  enjoy: { btn: "bg-enjoy text-white hover:bg-enjoy/90", ring: "focus-visible:outline-enjoy" },
  outxide: { btn: "bg-outxide text-black hover:bg-outxide/90", ring: "focus-visible:outline-outxide" },
  hiru: { btn: "bg-hiru text-white hover:bg-hiru/90", ring: "focus-visible:outline-hiru" },
};

interface StickyCtaProps {
  accent: Accent;
  /** Acción principal de conversión (reservar / comprar entrada / llamar). */
  primary: { label: string; href: string; external?: boolean };
  /** DM de Instagram del local (canal de chat); si se pasa, muestra el botón. */
  instagramHref?: string;
  /** aria-label del botón de Instagram. */
  instagramLabel?: string;
}

/**
 * Barra de acción FIJA inferior, orientada a móvil (88% del tráfico). Aparece al
 * salir el hero del viewport para no tapar su CTA. Una sola acción de conversión
 * + chat por Instagram (el canal de mensajes del grupo).
 */
export function StickyCta({ accent, primary, instagramHref, instagramLabel }: StickyCtaProps) {
  const [visible, setVisible] = useState(false);
  const a = ACCENT[accent];

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        // Se muestra tras pasar ~70% de la altura del hero.
        setVisible(window.scrollY > window.innerHeight * 0.7);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 transition-all duration-300 sm:inset-x-auto sm:right-6",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0 sm:translate-y-4",
      )}
    >
      <div className="mx-auto flex max-w-md items-center gap-2 border-t border-white/10 bg-black/85 p-3 backdrop-blur-md sm:mb-6 sm:rounded-full sm:border sm:p-2 sm:shadow-2xl sm:shadow-black/40">
        <a
          href={primary.href}
          {...(primary.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={cn(
            "flex-1 rounded-full px-6 py-3 text-center text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:px-7",
            a.btn,
            a.ring,
          )}
        >
          {primary.label}
        </a>
        {instagramHref && (
          <a
            href={instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={instagramLabel ?? "Instagram"}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee2a7b]"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
        )}
      </div>
    </div>
  );
}
