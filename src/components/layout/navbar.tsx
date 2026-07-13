"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { GroupLogo } from "@/components/ui/logos";
import { LanguageSelector } from "@/components/layout/language-selector";
import { useT } from "@/i18n";

const navItems = [
  { name: "Enjoy Terrace", href: "/enjoy", ariaKey: "nav.goToEnjoy", activeClass: "text-enjoy border-enjoy" },
  { name: "Outxide Club", href: "/outxide", ariaKey: "nav.goToOutxide", activeClass: "text-outxide border-outxide" },
  { name: "Hiru", href: "/hiru", ariaKey: "nav.goToHiru", activeClass: "text-hiru border-hiru" },
];

const secondaryItems = [
  { labelKey: "footer.blog", href: "/blog" },
  { labelKey: "footer.aboutUs", href: "/nosotros" },
  { labelKey: "footer.contactUs", href: "/contacto" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();
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

  // Accesibilidad del menú móvil: Escape lo cierra y devuelve el foco al botón.
  React.useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        document.getElementById("nav-menu-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

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
            aria-label="Grupo Enjoy - Home"
          >
            <GroupLogo />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm pb-1 border-b-2 transition-colors duration-300",
                    isActive
                      ? item.activeClass
                      : "link-underline text-muted-foreground border-transparent hover:text-white"
                  )}
                  aria-label={t(item.ariaKey)}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.name}
                </Link>
              );
            })}
            <span className="h-3 w-px bg-white/20" aria-hidden="true" />
            {secondaryItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-xs transition-colors duration-300",
                    isActive
                      ? "text-white"
                      : "text-muted-foreground hover:text-white"
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {t(item.labelKey)}
                </Link>
              );
            })}
            <LanguageSelector />
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSelector />
            <button
              id="nav-menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative z-50 p-2 text-white"
              aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
              aria-expanded={menuOpen}
              aria-controls="nav-mobile-menu"
            >
              {menuOpen ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="nav-mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item, i) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "text-3xl font-display font-bold transition-colors",
                      isActive ? item.activeClass : "text-white hover:text-primary"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              );
            })}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: navItems.length * 0.1 }}
              className="w-12 border-t border-white/10"
              aria-hidden="true"
            />
            {secondaryItems.map((item, i) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (navItems.length + 1 + i) * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "text-xl transition-colors",
                      isActive
                        ? "text-white"
                        : "text-muted-foreground hover:text-white"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {t(item.labelKey)}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
