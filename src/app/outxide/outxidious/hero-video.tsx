"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { useT } from "@/i18n";

// Vídeo de cabecera de la landing, alimentado por src/lib/outxidious/content.ts
// (hoy no hay ninguno aprobado: este componente no se monta). Decisiones:
// - El póster es el LCP: la página lo precarga con prioridad alta y aquí se
//   reserva su caja exacta con width/height (CLS 0).
// - El HTML de servidor NO lleva autoplay: con prefers-reduced-motion o ahorro
//   de datos (Save-Data) solo se ve el póster, también antes de hidratar. La
//   reproducción (muted, playsInline, loop) arranca en cliente si ambas cosas
//   lo permiten; preload="metadata" mientras tanto, para no competir con el
//   póster por la red.
// - Botón visible de pausa/reproducción (WCAG 2.2.2: movimiento de más de 5 s).
// - Antes de publicar un vídeo: ≤ 3 destellos por segundo (WCAG 2.3.1).

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };

export interface HeroVideoProps {
  src: string;
  webmSrc?: string;
  poster: string;
  width: number;
  height: number;
  label: string;
}

export function HeroVideo({ src, webmSrc, poster, width, height, label }: HeroVideoProps) {
  const t = useT();
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let reduce = false;
    try {
      reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      /* navegador sin matchMedia: se trata como sin preferencia */
    }
    const saveData = (navigator as NavigatorWithConnection).connection?.saveData === true;
    if (reduce || saveData) return;
    const video = ref.current;
    if (!video) return;
    video.muted = true; // requisito de autoplay en iOS/Android (por si React no lo reflejó)
    video.play().catch(() => {
      // Autoplay bloqueado (ahorro de batería, navegador interno…): queda el póster.
    });
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      video.muted = true;
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  return (
    <div
      className="relative mx-auto w-full max-w-md overflow-hidden rounded-2xl"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <video
        ref={ref}
        data-testid="outxidious-hero-video"
        className="absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
        loop
        preload="metadata"
        poster={poster}
        width={width}
        height={height}
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        {webmSrc && <source src={webmSrc} type="video/webm" />}
        <source src={src} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? t("outxidious.videoPause") : t("outxidious.videoPlay")}
        data-testid="outxidious-video-toggle"
        className="absolute bottom-2 right-2 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
      >
        {playing ? <Pause className="h-4 w-4" aria-hidden /> : <Play className="h-4 w-4" aria-hidden />}
      </button>
    </div>
  );
}
