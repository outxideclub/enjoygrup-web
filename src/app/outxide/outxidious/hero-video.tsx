"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Pause, Play } from "lucide-react";
import { useT } from "@/i18n";

// Vídeo de cabecera de la landing, alimentado por src/lib/outxidious/content.ts
// (hueco heroMedia; hoy, el teaser OUTXIDE → OUTXIDIOUS aprobado el 20-oct).
// Decisiones:
// - El póster es el LCP: la página lo precarga con prioridad alta y aquí se
//   reserva su caja exacta con aspect-ratio en CSS desde el HTML de servidor
//   (CLS 0). En móvil la caja puede ir recortada (mobileAspect, y shortAspect
//   en pantallas bajas) para que el h1 y la placa +18 quepan debajo en la
//   primera pantalla; el vídeo se encuadra con object-cover a la altura focusY.
// - El HTML de servidor NO lleva el atributo autoplay a propósito: con
//   prefers-reduced-motion o ahorro de datos (Save-Data) solo se ve el póster,
//   también antes de hidratar. La reproducción automática (muted, playsInline,
//   loop) la arranca el cliente si ambas cosas lo permiten.
// - preload="none" en el HTML: el vídeo no compite con el póster y, con
//   movimiento reducido o Save-Data, no se baja nada (con "metadata" Chrome se
//   bajaba el webm entero, 97 KB, aunque no se fuera a reproducir: revisión
//   PA-7). Cuando se puede reproducir, play() lo carga.
// - Botón visible de pausa/reproducción (WCAG 2.2.2: movimiento de más de 5 s).
//   Con movimiento reducido el botón ofrece «Reproducir»: decide la persona.
// - Antes de publicar un vídeo: ≤ 3 destellos por segundo (WCAG 2.3.1).

type NavigatorWithConnection = Navigator & { connection?: { saveData?: boolean } };

export interface HeroVideoProps {
  src: string;
  webmSrc?: string;
  poster: string;
  width: number;
  height: number;
  /** Proporción ancho/alto de la caja en móvil (< 768 px); sin ella, la del vídeo. */
  mobileAspect?: number;
  /** Proporción en móvil con poca altura de pantalla (≤ 719 px); sin ella, mobileAspect. */
  shortAspect?: number;
  /** Encuadre vertical del recorte (object-position Y en %, 50 = centro). */
  focusY?: number;
  label: string;
  /** La petición traía Save-Data: on (solo póster, sin precarga). */
  saveData?: boolean;
}

export function HeroVideo({
  src,
  webmSrc,
  poster,
  width,
  height,
  mobileAspect,
  shortAspect,
  focusY,
  label,
  saveData = false,
}: HeroVideoProps) {
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
    const clientSaveData = (navigator as NavigatorWithConnection).connection?.saveData === true;
    if (reduce || saveData || clientSaveData) return;
    const video = ref.current;
    if (!video) return;
    video.muted = true; // requisito de autoplay en iOS/Android (por si React no lo reflejó)
    video.play().catch(() => {
      // Autoplay bloqueado (ahorro de batería, navegador interno…): queda el póster.
    });
  }, [saveData]);

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

  // Caja reservada por CSS (outxidious.css, .ox-media): proporción del vídeo en
  // escritorio, la recortada en móvil y la más estrecha en pantallas bajas.
  const box = {
    "--ox-media-ar": `${width} / ${height}`,
    ...(mobileAspect ? { "--ox-media-ar-sm": String(mobileAspect) } : {}),
    ...(shortAspect ? { "--ox-media-ar-short": String(shortAspect) } : {}),
    ...(typeof focusY === "number" ? { "--ox-media-focus-y": `${focusY}%` } : {}),
  } as CSSProperties;

  return (
    <div data-testid="outxidious-hero-media" className="ox-media relative mx-auto w-full max-w-md overflow-hidden rounded-2xl" style={box}>
      <video
        ref={ref}
        data-testid="outxidious-hero-video"
        className="ox-media-video absolute inset-0 h-full w-full object-cover"
        muted
        playsInline
        loop
        preload="none"
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
