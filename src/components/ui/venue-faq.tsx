"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useT } from "@/i18n";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { JsonLd } from "@/components/seo/json-ld";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FaqItem {
  questionKey: string;
  answerKey: string;
}

interface VenueFaqProps {
  /** Venue accent for colours: "enjoy" | "outxide" | "hiru" */
  venue: "enjoy" | "outxide" | "hiru";
  /** i18n keys for each Q&A pair */
  items: FaqItem[];
}

/* ------------------------------------------------------------------ */
/*  Colour map                                                         */
/* ------------------------------------------------------------------ */

const colours = {
  enjoy: {
    accent: "text-enjoy",
    border: "border-enjoy/15",
    bg: "bg-enjoy/[0.03]",
    chevron: "text-enjoy/60",
    glow: "rgba(236,72,153,0.08)",
    hoverBorder: "hover:border-enjoy/30",
  },
  outxide: {
    accent: "text-outxide",
    border: "border-outxide/15",
    bg: "bg-outxide/[0.03]",
    chevron: "text-outxide/60",
    glow: "rgba(6,182,212,0.08)",
    hoverBorder: "hover:border-outxide/30",
  },
  hiru: {
    accent: "text-hiru",
    border: "border-hiru/15",
    bg: "bg-hiru/[0.03]",
    chevron: "text-hiru/60",
    glow: "rgba(184,115,51,0.08)",
    hoverBorder: "hover:border-hiru/30",
  },
} as const;

/* ------------------------------------------------------------------ */
/*  Accordion Item                                                     */
/* ------------------------------------------------------------------ */

function AccordionItem({
  questionKey,
  answerKey,
  isOpen,
  onToggle,
  venue,
}: FaqItem & { isOpen: boolean; onToggle: () => void; venue: "enjoy" | "outxide" | "hiru" }) {
  const t = useT();
  const c = colours[venue];

  return (
    <div
      className={`rounded-2xl border ${c.border} ${c.bg} transition-colors duration-300 overflow-hidden`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full cursor-pointer items-center justify-between px-6 py-4 text-left text-sm font-medium text-white select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-2xl"
      >
        <span className="pr-4">{t(questionKey)}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className={`flex-shrink-0 ${c.chevron}`}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(answerKey)}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  VenueFaq                                                           */
/* ------------------------------------------------------------------ */

export function VenueFaq({ venue, items }: VenueFaqProps) {
  const t = useT();
  const c = colours[venue];
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  function toggle(idx: number) {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  // Build FAQPage JSON-LD for this venue's questions
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: t(item.questionKey),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(item.answerKey),
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <section className={`grain-overlay relative z-20 py-16 sm:py-20 border-t border-white/5 bg-[radial-gradient(ellipse_at_50%_50%,${c.glow}_0%,transparent_60%)]`}>
        <div className="mx-auto max-w-3xl px-6">
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className={`font-display text-2xl md:text-3xl font-bold tracking-tight uppercase ${c.accent}`}>
                {t("faq.heroTitle")}
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-3">
            {items.map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.05}>
                <AccordionItem
                  questionKey={item.questionKey}
                  answerKey={item.answerKey}
                  isOpen={openItems.has(idx)}
                  onToggle={() => toggle(idx)}
                  venue={venue}
                />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-8 text-center">
              <Link
                href="/faq"
                className={`inline-flex items-center gap-2 text-sm ${c.accent} hover:opacity-80 transition-opacity`}
              >
                {t("faq.contactCta")}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
