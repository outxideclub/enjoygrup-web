import Link from "next/link";
import { Globe, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <span className="font-display text-2xl font-bold text-white">
              ENJOY
            </span>
            <span className="ml-2 text-xs tracking-[0.3em] text-muted-foreground uppercase">
              Group
            </span>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Tres experiencias únicas en Alcúdia, Mallorca.
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
                  Descubrir
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
                  Descubrir
                </Link>
              </li>
              <li>
                <Link
                  href="/outxide#eventos"
                  className="text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  Eventos
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
                  Descubrir
                </Link>
              </li>
              <li>
                <Link
                  href="/hiru#menu"
                  className="text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  Carta
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Grupo Enjoy · Alcúdia, Mallorca.
            Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-muted-foreground hover:text-white transition-colors"
              aria-label="Redes sociales"
            >
              <Globe size={18} />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-white transition-colors"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-white transition-colors"
              aria-label="Ubicación"
            >
              <MapPin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
