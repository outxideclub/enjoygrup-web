"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Wine, Music, Flame } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";

const businesses = [
  {
    name: "Enjoy",
    subtitle: "Terrace · Cocktails & Shisha",
    description:
      "Where nights begin. Cócteles de autor, shisha premium y la mejor terraza para empezar la noche en Alcúdia.",
    href: "/enjoy",
    icon: Wine,
    color: "from-pink-500/20 to-pink-900/10",
    accent: "text-enjoy",
    borderColor: "hover:border-enjoy/30",
    image:
      "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&h=600&fit=crop",
  },
  {
    name: "Outxide",
    subtitle: "Club",
    description:
      "The night continues. Discoteca y club nocturno con los mejores DJs y una energía que no encontrarás en otro sitio.",
    href: "/outxide",
    icon: Music,
    color: "from-cyan-500/20 to-violet-500/10",
    accent: "text-outxide",
    borderColor: "hover:border-outxide/30",
    image:
      "https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=800&h=600&fit=crop",
  },
  {
    name: "Hiru",
    subtitle: "Food & Drinks",
    description:
      "Cocina mallorquina a la brasa. Producto, tradición y sabor. Carnes maduradas, arroces de lonja y pescados del Mediterráneo.",
    href: "/hiru",
    icon: Flame,
    color: "from-amber-800/20 to-amber-950/10",
    accent: "text-hiru",
    borderColor: "hover:border-hiru/30",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-black">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.06),transparent_70%)]" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-enjoy/5 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <p className="text-sm tracking-[0.4em] text-enjoy/80 uppercase mb-6">
              Alcúdia, Mallorca
            </p>
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold text-white leading-[0.9] tracking-tight">
              Grupo
              <br />
              <span className="bg-gradient-to-r from-enjoy via-white to-enjoy bg-clip-text text-transparent">
                Enjoy
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-8 max-w-xl mx-auto text-lg text-muted-foreground leading-relaxed"
          >
            Terraza, club y restaurante. Tres espacios diseñados para
            crear momentos inolvidables en Alcúdia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="#spaces">
                Descubre nuestros espacios
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5"
          >
            <div className="w-1 h-2 rounded-full bg-white/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* Business Cards */}
      <section id="spaces" className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal>
            <div className="text-center mb-20">
              <p className="text-sm tracking-[0.3em] text-enjoy/60 uppercase mb-4">
                Nuestros espacios
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
                Tres mundos, una filosofía
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {businesses.map((biz, i) => (
              <ScrollReveal key={biz.name} delay={i * 0.15}>
                <Link href={biz.href} className="group block">
                  <div
                    className={`relative overflow-hidden rounded-2xl border border-white/5 bg-card transition-all duration-500 ${biz.borderColor}`}
                  >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={biz.image}
                        alt={biz.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${biz.color} to-transparent`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <biz.icon className={`h-5 w-5 ${biz.accent}`} />
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {biz.name}
                          </h3>
                          <p className={`text-xs tracking-wider ${biz.accent}`}>
                            {biz.subtitle}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {biz.description}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-sm text-white/60 group-hover:text-white transition-colors">
                        <span>Explorar</span>
                        <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(236,72,153,0.06),transparent_70%)]" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Preparado para vivir la experiencia?
            </h2>
            <p className="text-muted-foreground text-lg mb-10">
              Empieza en la terraza, sigue en el club, o disfruta de la mejor
              cocina mallorquina.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/enjoy">Enjoy Terrace</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-8"
              >
                <Link href="/outxide">Outxide Club</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-8"
              >
                <Link href="/hiru">Hiru Food & Drinks</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
