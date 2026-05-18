"use client";

import Link from "next/link";
import { Globe, Mail, MapPin } from "lucide-react";
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
              href="mailto:privacidad@grupoenjoy.com"
              className="text-xs text-muted-foreground hover:text-white transition-colors"
            >
              privacidad@grupoenjoy.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/enjoy.club.alcudia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-white transition-colors"
              aria-label="Instagram Enjoy"
            >
              <Globe size={18} />
            </a>
            <a
              href="mailto:info@grupoenjoy.com"
              className="text-muted-foreground hover:text-white transition-colors"
              aria-label={t("footer.email")}
            >
              <Mail size={18} />
            </a>
            <a
              href="https://www.instagram.com/hirufoodanddrinks"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-white transition-colors"
              aria-label="Instagram Hiru"
            >
              <MapPin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
