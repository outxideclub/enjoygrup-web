"use client";

import React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { GroupLogo } from "@/components/ui/logos";
import { LanguageSelector } from "@/components/layout/language-selector";
import { useT } from "@/i18n";

const navItems = [
  { name: "Enjoy Terrace", href: "/enjoy", ariaKey: "nav.goToEnjoy" },
  { name: "Outxide Club", href: "/outxide", ariaKey: "nav.goToOutxide" },
  { name: "Hiru", href: "/hiru", ariaKey: "nav.goToHiru" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const t = useT();

  React.useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className={cn(
          "mx-auto mt-3 max-w-6xl px-6 transition-all duration-500",
          scrolled
            ? "max-w-4xl rounded-2xl border border-white/5 bg-black/60 backdrop-blur-xl px-5"
            : "bg-transparent"
        )}
      >
        <div className="flex items-center justify-between py-4">
          <Link
            href="/"
            className="flex items-center gap-2"
            aria-label="Volver al inicio de Grupo Enjoy"
          >
            <GroupLogo />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-white transition-colors duration-300"
                aria-label={t(item.ariaKey)}
              >
                {item.name}
              </Link>
            ))}
            <LanguageSelector />
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSelector />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative z-50 p-2 text-white"
              aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-3xl font-display font-bold text-white hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
