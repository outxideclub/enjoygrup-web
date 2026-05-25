"use client";

import Link from "next/link";
import { Mail, Phone } from "lucide-react";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
import { GroupLogo } from "@/components/ui/logos";
import { CookieSettingsButton } from "@/components/layout/cookie-settings-button";
import { useT } from "@/i18n";

export function Footer() {
  const t = useT();
  return (
    <footer className="border-t border-white/5 bg-black">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-1">
            <GroupLogo />
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Enjoy */}
          <div>
            <h3 className="text-sm font-semibold text-enjoy uppercase tracking-wider">
              Enjoy Terrace
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/enjoy"
                  className="text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  {t("common.discover")}
                </Link>
              </li>
              <li>
                <Link
                  href="/enjoy#carta"
                  className="text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  Cocktails & Shisha
                </Link>
              </li>
            </ul>
          </div>

          {/* Outxide */}
          <div>
            <h3 className="text-sm font-semibold text-outxide uppercase tracking-wider">
              Outxide Club
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/outxide"
                  className="text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  {t("common.discover")}
                </Link>
              </li>
              <li>
                <Link
                  href="/outxide#eventos"
                  className="text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  {t("common.events")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Hiru */}
          <div>
            <h3 className="text-sm font-semibold text-hiru uppercase tracking-wider">
              Hiru Food & Drinks
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/hiru"
                  className="text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  {t("common.discover")}
                </Link>
              </li>
              <li>
                <Link
                  href="/hiru#menu"
                  className="text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  {t("common.menu")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wider">
              {t("footer.legal")}
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/legal/aviso-legal"
                  className="text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  {t("footer.avisoLegal")}
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/privacidad"
                  className="text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/cookies"
                  className="text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  {t("footer.cookies")}
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/condiciones-venta"
                  className="text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  {t("footer.salesConditions")}
                </Link>
              </li>
              <li>
                <CookieSettingsButton />
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Grupo Enjoy · Alcúdia, Mallorca.
            </p>
            <span className="hidden sm:inline text-xs text-white/10">|</span>
            <a
              href="mailto:privacidad@grupoenjoy.es"
              className="text-xs text-muted-foreground hover:text-white transition-colors"
            >
              privacidad@grupoenjoy.es
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/enjoy.terrace.alcudia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-enjoy transition-colors"
              aria-label="Instagram Enjoy"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.instagram.com/outxide.club"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-outxide transition-colors"
              aria-label="Instagram Outxide"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.instagram.com/hirufoodanddrinks"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-hiru transition-colors"
              aria-label="Instagram Hiru"
            >
              <InstagramIcon />
            </a>
            <a
              href="mailto:info@grupoenjoy.es"
              className="text-muted-foreground hover:text-white transition-colors"
              aria-label={t("footer.email")}
            >
              <Mail size={18} />
            </a>
            <a
              href="tel:+34971853932"
              className="text-muted-foreground hover:text-white transition-colors"
              aria-label="Teléfono"
            >
              <Phone size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
