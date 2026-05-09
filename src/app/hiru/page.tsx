"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, UtensilsCrossed, Clock, MapPin, Phone, Flame } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop",
    alt: "Carne a la brasa",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop",
    alt: "Interior restaurante",
  },
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop",
    alt: "Ingredientes frescos",
  },
  {
    src: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600&h=400&fit=crop",
    alt: "Paella de marisco",
  },
  {
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop",
    alt: "Pescado fresco",
  },
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
    alt: "Ambiente del restaurante",
  },
];

const menuSections = [
  {
    category: "Carnes a la brasa",
    icon: true,
    items: [
      {
        name: "Chuletón de vaca madurada",
        description: "1kg mínimo, maduración 45 días, sal Maldon y brasas de encina",
        price: "65€/kg",
      },
      {
        name: "Costillas de cordero mallorquín",
        description: "Cordero local alimentado con pasto, hierbas mediterráneas",
        price: "24€",
      },
      {
        name: "Secreto ibérico",
        description: "Bellota 100%, pimientos de padrón y alioli ahumado",
        price: "22€",
      },
    ],
  },
  {
    category: "Arroces",
    icon: false,
    items: [
      {
        name: "Arroz de bogavante",
        description: "Bogavante de Mallorca, fumet casero, pimiento choricero",
        price: "28€/pers",
      },
      {
        name: "Paella mixta mallorquina",
        description: "Pollo de campo, mariscos de lonja, azafrán de La Mancha",
        price: "18€/pers",
      },
      {
        name: "Arroz negro",
        description: "Sepia, calamar, tinta natural, alioli casero",
        price: "19€/pers",
      },
    ],
  },
  {
    category: "Pescados",
    icon: false,
    items: [
      {
        name: "Lubina salvaje a la sal",
        description: "Pieza entera de lonja, sal marina y limón",
        price: "Según peso",
      },
      {
        name: "Pulpo a la brasa",
        description: "Pulpo gallego, patata cachela, pimentón de la Vera",
        price: "22€",
      },
      {
        name: "Gambas rojas de Sóller",
        description: "A la plancha con sal gruesa y limón",
        price: "Según mercado",
      },
    ],
  },
];

export default function HiruPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1544025162-d76694265947?w=1920&h=1080&fit=crop"
            alt="Hiru Food & Drinks"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(184,115,51,0.12),transparent_70%)]" />
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
              <Flame className="h-6 w-6 text-hiru" />
            </div>
            <h1 className="font-display text-6xl md:text-8xl font-bold text-white tracking-tight">
              Hiru
            </h1>
            <p className="mt-2 text-lg tracking-[0.3em] text-hiru/80 uppercase">
              Food & Drinks
            </p>
            <p className="mt-6 max-w-lg mx-auto text-muted-foreground text-lg italic">
              Cocina mallorquina &middot; brasa
            </p>
            <p className="mt-3 max-w-lg mx-auto text-muted-foreground">
              Producto, tradición y sabor. Carnes a la brasa, arroces de lonja
              y los mejores pescados del Mediterráneo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Info bar */}
      <section className="border-y border-white/5 bg-card/50">
        <div className="mx-auto max-w-4xl px-6 py-6 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-hiru" />
            <span>12:00–23:30 · Vie–Sáb hasta 1:00 · Mar cerrado</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-hiru" />
            <span>Alcúdia, Mallorca</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-hiru" />
            <span>Reservas</span>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm tracking-[0.3em] text-hiru/60 uppercase mb-4">
                Galería
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
                Producto &middot; Tradición &middot; Sabor
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

      {/* Menu */}
      <section id="menu" className="py-24 md:py-32 bg-card/30">
        <div className="mx-auto max-w-4xl px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <p className="text-sm tracking-[0.3em] text-hiru/60 uppercase mb-4">
                Carta
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
                Cocina mallorquina de brasa
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-16">
            {menuSections.map((section, si) => (
              <ScrollReveal key={section.category} delay={si * 0.1}>
                <div>
                  <h3 className="text-lg font-semibold text-hiru tracking-wider uppercase mb-6 pb-2 border-b border-hiru/20 flex items-center gap-2">
                    {section.icon && <Flame className="h-4 w-4" />}
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
                        <span className="text-hiru font-semibold whitespace-nowrap">
                          {item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="mt-16 text-center">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 bg-hiru hover:bg-hiru/80 text-white"
              >
                <a href="tel:+34000000000">
                  <Phone className="h-4 w-4 mr-2" />
                  Reservar mesa
                </a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
