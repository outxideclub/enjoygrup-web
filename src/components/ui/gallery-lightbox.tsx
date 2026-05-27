"use client";

import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface GalleryImage {
  src: string;
  alt: string;
  description?: string;
  category?: string;
}

interface CategoryLabel {
  key: string;
  label: string;
}

interface GalleryLightboxProps {
  images: GalleryImage[];
  columns?: 2 | 3;
  accentColor?: string;
  categories?: CategoryLabel[];
}

export function GalleryLightbox({
  images,
  columns = 3,
  accentColor = "white",
  categories,
}: GalleryLightboxProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const filtered = categories
    ? activeCategory === "all"
      ? images
      : images.filter((img) => img.category === activeCategory)
    : images;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  // Resolve the portal target on mount (client-only)
  useEffect(() => {
    setPortalRoot(document.body);
  }, []);

  const close = useCallback(() => setActiveIndex(null), []);

  const prev = useCallback(
    () =>
      setActiveIndex((i) =>
        i !== null ? (i - 1 + filtered.length) % filtered.length : null,
      ),
    [filtered.length],
  );

  const next = useCallback(
    () =>
      setActiveIndex((i) =>
        i !== null ? (i + 1) % filtered.length : null,
      ),
    [filtered.length],
  );

  useEffect(() => {
    if (activeIndex === null) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeIndex, close, prev, next]);

  const gridCols =
    columns === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  // Lightbox rendered via portal so it escapes any parent stacking contexts
  // created by transforms, filters, or will-change on ancestor elements.
  const lightbox =
    activeIndex !== null && filtered[activeIndex] ? (
      <AnimatePresence>
        <motion.div
          key="lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={close}
        >
          {/* Close */}
          <button
            onClick={close}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Cerrar"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          {/* Prev */}
          {filtered.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
          )}

          {/* Next */}
          {filtered.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          )}

          {/* Image + description */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative max-w-5xl w-full mx-4 sm:mx-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden">
              <Image
                src={filtered[activeIndex].src}
                alt={filtered[activeIndex].alt}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
            </div>
            {(filtered[activeIndex].description ||
              filtered[activeIndex].alt) && (
              <div className="mt-4 text-center px-4">
                {filtered[activeIndex].description && (
                  <p className="text-white/90 text-base">
                    {filtered[activeIndex].description}
                  </p>
                )}
                <p className="text-white/40 text-sm mt-1">
                  {activeIndex + 1} / {filtered.length}
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    ) : null;

  return (
    <>
      {categories && categories.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => { setActiveCategory(cat.key); setActiveIndex(null); }}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.key
                  ? "bg-white text-black"
                  : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}
      <div className={`grid ${gridCols} gap-4`}>
        {filtered.map((img, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <button
              type="button"
              onClick={() => setActiveIndex(i)}
              className="group relative w-full overflow-hidden rounded-xl aspect-[3/2] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
              {img.description && (
                <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="bg-gradient-to-t from-black/80 via-black/50 to-transparent px-4 pb-4 pt-10">
                    <p className="text-sm text-white/90 line-clamp-2">
                      {img.description}
                    </p>
                  </div>
                </div>
              )}
            </button>
          </ScrollReveal>
        ))}
      </div>

      {/* Lightbox — portalled to body to escape parent stacking contexts */}
      {portalRoot && createPortal(lightbox, portalRoot)}
    </>
  );
}
