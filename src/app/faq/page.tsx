"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useT } from "@/i18n";

const AmbientGlow = dynamic(
  () =>
    import("@/components/ui/ambient-glow").then((m) => ({
      default: m.AmbientGlow,
    })),
  { ssr: false }
);

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface FaqItem {
  questionKey: string;
  answerKey: string;
}

interface FaqSection {
  titleKey: string;
  accent: string;
  accentBorder: string;
  accentBg: string;
  accentChevron: string;
  items: FaqItem[];
}

const faqSections: FaqSection[] = [
  {
    titleKey: "faq.generalTitle",
    accent: "text-white",
    accentBorder: "border-white/10",
    accentBg: "bg-white/[0.03]",
    accentChevron: "text-white/50",
    items: [
      { questionKey: "faq.generalQ1", answerKey: "faq.generalA1" },
      { questionKey: "faq.generalQ2", answerKey: "faq.generalA2" },
      { questionKey: "faq.generalQ3", answerKey: "faq.generalA3" },
      { questionKey: "faq.generalQ4", answerKey: "faq.generalA4" },
      { questionKey: "faq.generalQ5", answerKey: "faq.generalA5" },
    ],
  },
  {
    titleKey: "faq.enjoyTitle",
    accent: "text-enjoy",
    accentBorder: "border-enjoy/15",
    accentBg: "bg-enjoy/[0.03]",
    accentChevron: "text-enjoy/60",
    items: [
      { questionKey: "faq.enjoyQ1", answerKey: "faq.enjoyA1" },
      { questionKey: "faq.enjoyQ2", answerKey: "faq.enjoyA2" },
      { questionKey: "faq.enjoyQ3", answerKey: "faq.enjoyA3" },
      { questionKey: "faq.enjoyQ4", answerKey: "faq.enjoyA4" },
      { questionKey: "faq.enjoyQ5", answerKey: "faq.enjoyA5" },
    ],
  },
  {
    titleKey: "faq.outxideTitle",
    accent: "text-outxide",
    accentBorder: "border-outxide/15",
    accentBg: "bg-outxide/[0.03]",
    accentChevron: "text-outxide/60",
    items: [
      { questionKey: "faq.outxideQ1", answerKey: "faq.outxideA1" },
      { questionKey: "faq.outxideQ2", answerKey: "faq.outxideA2" },
      { questionKey: "faq.outxideQ3", answerKey: "faq.outxideA3" },
      { questionKey: "faq.outxideQ4", answerKey: "faq.outxideA4" },
      { questionKey: "faq.outxideQ5", answerKey: "faq.outxideA5" },
    ],
  },
  {
    titleKey: "faq.hiruTitle",
    accent: "text-hiru",
    accentBorder: "border-hiru/15",
    accentBg: "bg-hiru/[0.03]",
    accentChevron: "text-hiru/60",
    items: [
      { questionKey: "faq.hiruQ1", answerKey: "faq.hiruA1" },
      { questionKey: "faq.hiruQ2", answerKey: "faq.hiruA2" },
      { questionKey: "faq.hiruQ3", answerKey: "faq.hiruA3" },
      { questionKey: "faq.hiruQ4", answerKey: "faq.hiruA4" },
      { questionKey: "faq.hiruQ5", answerKey: "faq.hiruA5" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Accordion Item                                                     */
/* ------------------------------------------------------------------ */

function AccordionItem({
  questionKey,
  answerKey,
  isOpen,
  onToggle,
  accentBorder,
  accentBg,
  accentChevron,
}: FaqItem & {
  isOpen: boolean;
  onToggle: () => void;
  accentBorder: string;
  accentBg: string;
  accentChevron: string;
}) {
  const t = useT();

  return (
    <div
      className={`rounded-2xl border ${accentBorder} ${accentBg} transition-colors duration-300 overflow-hidden`}
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
          className={`flex-shrink-0 ${accentChevron}`}
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
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function FaqPage() {
  const t = useT();

  // Track which items are open: "sectionIdx-itemIdx"
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  function toggleItem(key: string) {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }

  return (
    <div className="noise-texture relative">
      <AmbientGlow venue="home" />
      <Navbar />
      <main>
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(184,115,51,0.10)_0%,transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-4xl px-6 pt-32 pb-20 text-center">
          <ScrollReveal>
            <p className="text-sm font-bold tracking-[0.2em] text-white/40 uppercase mb-4">
              {t("faq.heroSubtitle")}
            </p>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight uppercase">
              {t("faq.heroTitle")}
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="grain-overlay py-24 relative">
        <div className="mx-auto max-w-3xl px-6 space-y-16">
          {faqSections.map((section, sectionIdx) => (
            <ScrollReveal key={section.titleKey} delay={sectionIdx * 0.1}>
              <div>
                <h2
                  className={`font-display text-2xl md:text-3xl font-bold tracking-tight uppercase mb-6 ${section.accent}`}
                >
                  {t(section.titleKey)}
                </h2>

                <div className="space-y-3">
                  {section.items.map((item, itemIdx) => {
                    const key = `${sectionIdx}-${itemIdx}`;
                    return (
                      <AccordionItem
                        key={key}
                        questionKey={item.questionKey}
                        answerKey={item.answerKey}
                        isOpen={openItems.has(key)}
                        onToggle={() => toggleItem(key)}
                        accentBorder={section.accentBorder}
                        accentBg={section.accentBg}
                        accentChevron={section.accentChevron}
                      />
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="grain-overlay py-24 relative bg-[radial-gradient(ellipse_at_50%_50%,rgba(236,72,153,0.08)_0%,transparent_60%)]">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <ScrollReveal>
            <div className="glass-card rounded-3xl p-10 md:p-14">
              <p className="text-lg text-muted-foreground mb-8">
                {t("faq.contactCta")}
              </p>
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 bg-white text-black hover:bg-white/90"
              >
                <Link href="/contacto">
                  {t("faq.contactCtaButton")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  );
}
