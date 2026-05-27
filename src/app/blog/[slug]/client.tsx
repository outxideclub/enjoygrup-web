"use client";

import Link from "next/link";
import { ArrowRight, Wine, Music, Flame } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const iconMap = {
  wine: Wine,
  music: Music,
  flame: Flame,
} as const;

interface Venue {
  name: string;
  href: string;
  description: string;
  icon: keyof typeof iconMap;
  accent: string;
  border: string;
  glow: string;
}

interface BlogPostClientProps {
  venues: Venue[];
  discoverLabel: string;
  visitLabel: string;
}

export function BlogPostClient({ venues, discoverLabel, visitLabel }: BlogPostClientProps) {
  return (
    <section className="border-t border-white/5 py-16 sm:py-20 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(236,72,153,0.06)_0%,transparent_60%)]" />
      <div className="relative mx-auto max-w-4xl px-6">
        <ScrollReveal>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight text-center mb-10">
            {discoverLabel}
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {venues.map((venue, i) => {
            const Icon = iconMap[venue.icon];
            return (
              <ScrollReveal key={venue.name} delay={i * 0.1}>
                <Link
                  href={venue.href}
                  className={`group block glass-card rounded-xl p-5 transition-all duration-500 border ${venue.border} ${venue.glow}`}
                >
                  <Icon className={`h-6 w-6 ${venue.accent} mb-3`} />
                  <h3 className={`text-base font-semibold ${venue.accent} mb-1`}>
                    {venue.name}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                    {venue.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/50 group-hover:text-white transition-colors">
                    {visitLabel}
                    <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
