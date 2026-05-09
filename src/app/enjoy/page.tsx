"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Wine, Clock, MapPin, ArrowRight, Flame } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&h=400&fit=crop",
    alt: "Cocktail bar terraza",
  },
  {
    src: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&h=400&fit=crop",
    alt: "Cóctel premium",
  },
  {
    src: "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&h=400&fit=crop",
    alt: "Neon bar interior",
  },
  {
    src: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=400&fit=crop",
    alt: "Cóctel preparación",
  },
  {
    src: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=600&h=400&fit=crop",
    alt: "Terraza nocturna",
  },
  {
    src: "https://images.unsplash.com/photo-1560508179-b2c9a3f8e92b?w=600&h=400&fit=crop",
    alt: "Shisha lounge",
  },
];

const cocktailMenu = [
  {
    category: "Signature Cocktails",
    items: [
      { name: "Enjoy Old Fashioned", description: "Bourbon, angostura, naranja ahumada", price: "14€" },
      { name: "Pink Neon", description: "Gin rosa, lichi, flor de saúco, espumante", price: "13€" },
      { name: "Velvet Night", description: "Vodka, frutos rojos, lavanda, prosecco", price: "13€" },
    ],
  },
  {
    category: "Clásicos",
    items: [
      { name: "Negroni", description: "Gin, Campari, vermut rojo", price: "12€" },
      { name: "Espresso Martini", description: "Vodka, Kahlúa, espresso", price: "12€" },
      { name: "Margarita", description: "Tequila, triple sec, lima fresca", price: "11€" },
    ],
  },
  {
    category: "Shisha Premium",
    items: [
      { name: "Frutas tropicales", description: "Mango, maracuyá y piña", price: "25€" },
      { name: "Menta fresca", description: "Menta con toque de hierbabuena", price: "22€" },
      { name: "Berry Mix", description: "Arándanos, frambuesas y fresa", price: "25€" },
    ],
  },
];

export default function EnjoyPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1920&h=1080&fit=crop"
            alt="Enjoy Terrace"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.15),transparent_70%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Grupo Enjoy
            </Link>
            <div className="flex items-center justify-center gap-3 mb-4">
              <Wine className="h-6 w-6 text-enjoy" />
            </div>
            <h1 className="font-display text-6xl md:text-8xl font-bold text-white tracking-tight">
              Enjoy
            </h1>
            <p className="mt-2 text-lg tracking-[0.3em] text-enjoy/80 uppercase">
              Terrace &middot; Cocktails & Shisha
            </p>
            <p className="mt-6 max-w-lg mx-auto text-muted-foreground text-lg italic">
              Where nights begin
            </p>
            <p className="mt-3 max-w-lg mx-auto text-muted-foreground">
              Cócteles de autor, shisha premium y una terraza que marca el inicio
              de cada noche en Alcúdia.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Info bar */}
      <section className="border-y border-white/5 bg-card/50">
        <div className="mx-auto max-w-4xl px-6 py-6 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-enjoy" />
            <span>Abierto diario: 17:00 – 05:30</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-enjoy" />
            <span>Alcúdia, Mallorca</span>
          </div>
          <Link
            href="/outxide"
            className="flex items-center gap-2 text-enjoy hover:text-enjoy-light transition-colors"
          >
            <ArrowRight className="h-4 w-4" />
            <span>Continúa en Outxide Club</span>
          </Link>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm tracking-[0.3em] text-enjoy/60 uppercase mb-4">
                Galería
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
                La terraza
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="group relative overflow-hidden rounded-xl aspect-[3/2]">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Carta */}
      <section id="carta" className="py-24 md:py-32 bg-card/30">
        <div className="mx-auto max-w-4xl px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm tracking-[0.3em] text-enjoy/60 uppercase mb-4">
                Carta
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
                Cocktails & Shisha
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-16">
            {cocktailMenu.map((section, si) => (
              <ScrollReveal key={section.category} delay={si * 0.1}>
                <div>
                  <h3 className="text-lg font-semibold text-enjoy tracking-wider uppercase mb-6 pb-2 border-b border-enjoy/20 flex items-center gap-2">
                    {section.category === "Shisha Premium" && (
                      <Flame className="h-4 w-4" />
                    )}
                    {section.category}
                  </h3>
                  <div className="space-y-6">
                    {section.items.map((item) => (
                      <div
                        key={item.name}
                        className="flex items-start justify-between gap-4"
                      >
                        <div>
                          <h4 className="text-white font-medium">
                            {item.name}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.description}
                          </p>
                        </div>
                        <span className="text-enjoy font-semibold whitespace-nowrap">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
