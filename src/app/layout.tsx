import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Grupo Enjoy | Coctelería, Club & Restaurante",
    template: "%s | Grupo Enjoy",
  },
  description:
    "Tres experiencias únicas bajo un mismo grupo. Enjoy Lounge, Outxide Club y Hiru Restaurante. Descubre la mejor gastronomía, coctelería y vida nocturna.",
  keywords: [
    "grupo enjoy",
    "coctelería premium",
    "discoteca",
    "restaurante",
    "enjoy lounge",
    "outxide club",
    "hiru restaurante",
  ],
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Grupo Enjoy",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
