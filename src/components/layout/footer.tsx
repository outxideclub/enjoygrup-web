"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, ArrowRight } from "lucide-react";

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
import { siteContact, telHref } from "@/lib/site";

function NewsletterForm() {
  const t = useT();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error" | "loading">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="mt-12 flex flex-col items-center gap-3 border-t border-white/5 pt-10">
      <p className="text-sm text-muted-foreground">
        {t("footer.newsletterTagline")}
      </p>
      <form onSubmit={handleSubmit} className="flex w-full max-w-sm gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
          placeholder={t("footer.newsletterPlaceholder")}
          aria-label="Email"
          className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/25 transition-colors"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-magnetic flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "..." : t("footer.newsletterSubmit")}
          {status !== "loading" && <ArrowRight size={14} />}
        </button>
      </form>
      {status === "success" && (
        <p className="text-xs text-green-400">{t("footer.newsletterSuccess")}</p>
      )}
      {status === "error" && (
        <p className="text-xs text-red-400">{t("footer.newsletterError")}</p>
      )}
    </div>
  );
}

export function Footer() {
  const t = useT();
  return (
    <footer className="border-t border-white/5 bg-black">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <GroupLogo />
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Enjoy */}
          <div>
            <p className="text-sm font-semibold text-enjoy uppercase tracking-wider">
              Enjoy Terrace
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/enjoy"
                  className="link-underline text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  {t("footer.enjoyTerrace")}
                </Link>
              </li>
              <li>
                <Link
                  href="/enjoy#carta"
                  className="link-underline text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  {t("footer.enjoyCocktails")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Outxide */}
          <div>
            <p className="text-sm font-semibold text-outxide uppercase tracking-wider">
              Outxide Club
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/outxide"
                  className="link-underline text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  {t("common.discover")}
                </Link>
              </li>
              <li>
                <Link
                  href="/outxide#eventos"
                  className="link-underline text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  {t("common.events")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Hiru */}
          <div>
            <p className="text-sm font-semibold text-hiru uppercase tracking-wider">
              Hiru Food & Drinks
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/hiru"
                  className="link-underline text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  {t("common.discover")}
                </Link>
              </li>
              <li>
                <Link
                  href="/hiru#menu"
                  className="link-underline text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  {t("common.menu")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-sm font-semibold text-white/40 uppercase tracking-wider">
              {t("footer.company")}
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/mundial"
                  className="link-underline text-sm font-medium text-emerald-300 hover:text-emerald-200 transition-colors"
                >
                  {t("mundial.navLabel")}
                </Link>
              </li>
              <li>
                <Link
                  href="/nosotros"
                  className="link-underline text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  {t("footer.aboutUs")}
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="link-underline text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  {t("footer.blog")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contacto"
                  className="link-underline text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  {t("footer.contactUs")}
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="link-underline text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  {t("footer.faqShort")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-sm font-semibold text-white/40 uppercase tracking-wider">
              {t("footer.legal")}
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/legal/aviso-legal"
                  className="link-underline text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  {t("footer.avisoLegal")}
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/privacidad"
                  className="link-underline text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/cookies"
                  className="link-underline text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  {t("footer.cookies")}
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/condiciones-venta"
                  className="link-underline text-sm text-muted-foreground hover:text-white transition-colors"
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

        <NewsletterForm />

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Grupo Enjoy · Alcúdia, Mallorca.
            </p>
            <span className="hidden sm:inline text-xs text-white/10">|</span>
            <a
              href={`mailto:${siteContact.general.privacyEmail}`}
              className="text-xs text-muted-foreground hover:text-white transition-colors"
            >
              {siteContact.general.privacyEmail}
            </a>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={siteContact.venues.enjoy.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic flex items-center gap-1.5 text-muted-foreground hover:text-enjoy transition-colors"
              aria-label="Instagram Enjoy"
            >
              <InstagramIcon />
              <span className="text-xs">Enjoy</span>
            </a>
            <a
              href={siteContact.venues.outxide.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic flex items-center gap-1.5 text-muted-foreground hover:text-outxide transition-colors"
              aria-label="Instagram Outxide"
            >
              <InstagramIcon />
              <span className="text-xs">Outxide</span>
            </a>
            <a
              href={siteContact.venues.hiru.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-magnetic flex items-center gap-1.5 text-muted-foreground hover:text-hiru transition-colors"
              aria-label="Instagram Hiru"
            >
              <InstagramIcon />
              <span className="text-xs">Hiru</span>
            </a>
            <a
              href={`mailto:${siteContact.general.email}`}
              className="btn-magnetic text-muted-foreground hover:text-white transition-colors"
              aria-label={t("footer.email")}
            >
              <Mail size={18} />
            </a>
            <a
              href={telHref(siteContact.general.phone)}
              className="btn-magnetic text-muted-foreground hover:text-white transition-colors"
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
