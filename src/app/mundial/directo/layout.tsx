import type { Metadata } from "next";

// Página pensada para pantalla/captura (OBS, mimoLive, kiosko). Fuera del índice.
export const metadata: Metadata = {
  title: "Mundial 2026 — Marcador en directo",
  robots: { index: false, follow: false },
};

export default function DirectoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
