"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface MovingHeadEmitter {
  id: string;
  x: string;
  glowColor: string;
  sweepFrom: number;
  sweepTo: number;
  sweepDuration: string;
  sweepDelay: string;
  showPhase: string;
  showDuration: string;
  beamColor: string;
  beamWidth: number;
  opacity: number;
}

interface LaserEmitter {
  id: string;
  x: string;
  glowColor: string;
  spreadDeg: number;
  sweepFrom: number;
  sweepTo: number;
  sweepDuration: string;
  sweepDelay: string;
  showPhase: string;
  showDuration: string;
  beamColor: string;
  beamCount: number;
}

interface MosaicReflection {
  id: string;
  x: string;
  y: string;
  size: number;
  delay: string;
  duration: string;
  color: string;
  rotation: number;
}

const MOVING_HEADS: MovingHeadEmitter[] = [
  {
    id: "far-left",
    x: "10%",
    glowColor: "#06b6d4",
    sweepFrom: 18,
    sweepTo: 42,
    sweepDuration: "11s",
    sweepDelay: "-2s",
    showPhase: "0s",
    showDuration: "16s",
    beamColor: "6,182,212",
    beamWidth: 170,
    opacity: 0.38,
  },
  {
    id: "left",
    x: "28%",
    glowColor: "#7c3aed",
    sweepFrom: -12,
    sweepTo: 26,
    sweepDuration: "13s",
    sweepDelay: "-7s",
    showPhase: "-5s",
    showDuration: "18s",
    beamColor: "124,58,237",
    beamWidth: 190,
    opacity: 0.34,
  },
  {
    id: "center",
    x: "50%",
    glowColor: "#22d3ee",
    sweepFrom: -20,
    sweepTo: 20,
    sweepDuration: "10s",
    sweepDelay: "-4s",
    showPhase: "-9s",
    showDuration: "15s",
    beamColor: "34,211,238",
    beamWidth: 210,
    opacity: 0.42,
  },
  {
    id: "right",
    x: "72%",
    glowColor: "#7c3aed",
    sweepFrom: -26,
    sweepTo: 12,
    sweepDuration: "12s",
    sweepDelay: "-1s",
    showPhase: "-3s",
    showDuration: "17s",
    beamColor: "124,58,237",
    beamWidth: 190,
    opacity: 0.34,
  },
  {
    id: "far-right",
    x: "90%",
    glowColor: "#06b6d4",
    sweepFrom: -42,
    sweepTo: -18,
    sweepDuration: "11s",
    sweepDelay: "-6s",
    showPhase: "-11s",
    showDuration: "16s",
    beamColor: "6,182,212",
    beamWidth: 170,
    opacity: 0.38,
  },
];

const LASERS: LaserEmitter[] = [
  {
    id: "laser-left",
    x: "18%",
    glowColor: "#06b6d4",
    spreadDeg: 28,
    sweepFrom: -76,
    sweepTo: -42,
    sweepDuration: "13s",
    sweepDelay: "-1s",
    showPhase: "-2s",
    showDuration: "15s",
    beamColor: "6,182,212",
    beamCount: 5,
  },
  {
    id: "laser-center",
    x: "50%",
    glowColor: "#22d3ee",
    spreadDeg: 24,
    sweepFrom: -104,
    sweepTo: -76,
    sweepDuration: "10s",
    sweepDelay: "-6s",
    showPhase: "-8s",
    showDuration: "14s",
    beamColor: "34,211,238",
    beamCount: 4,
  },
  {
    id: "laser-right",
    x: "82%",
    glowColor: "#7c3aed",
    spreadDeg: 28,
    sweepFrom: -138,
    sweepTo: -104,
    sweepDuration: "14s",
    sweepDelay: "-4s",
    showPhase: "-5s",
    showDuration: "16s",
    beamColor: "124,58,237",
    beamCount: 5,
  },
];

const MOSAIC_REFLECTIONS: MosaicReflection[] = [
  {
    id: "mosaic-1-1",
    x: "12%",
    y: "18%",
    size: 92,
    delay: "-1s",
    duration: "28s",
    color: "255,184,92",
    rotation: 0,
  },
  {
    id: "mosaic-1-2",
    x: "30%",
    y: "18%",
    size: 112,
    delay: "-16s",
    duration: "34s",
    color: "255,184,92",
    rotation: 0,
  },
  {
    id: "mosaic-1-3",
    x: "50%",
    y: "18%",
    size: 100,
    delay: "-9s",
    duration: "31s",
    color: "255,184,92",
    rotation: 0,
  },
  {
    id: "mosaic-1-4",
    x: "70%",
    y: "18%",
    size: 118,
    delay: "-24s",
    duration: "37s",
    color: "255,184,92",
    rotation: 0,
  },
  {
    id: "mosaic-1-5",
    x: "88%",
    y: "18%",
    size: 94,
    delay: "-13s",
    duration: "30s",
    color: "255,184,92",
    rotation: 0,
  },
  {
    id: "mosaic-2-1",
    x: "18%",
    y: "38%",
    size: 116,
    delay: "-20s",
    duration: "36s",
    color: "255,184,92",
    rotation: 0,
  },
  {
    id: "mosaic-2-2",
    x: "38%",
    y: "38%",
    size: 96,
    delay: "-6s",
    duration: "29s",
    color: "255,184,92",
    rotation: 0,
  },
  {
    id: "mosaic-2-3",
    x: "62%",
    y: "38%",
    size: 126,
    delay: "-27s",
    duration: "40s",
    color: "255,184,92",
    rotation: 0,
  },
  {
    id: "mosaic-2-4",
    x: "82%",
    y: "38%",
    size: 104,
    delay: "-15s",
    duration: "33s",
    color: "255,184,92",
    rotation: 0,
  },
  {
    id: "mosaic-3-1",
    x: "10%",
    y: "58%",
    size: 100,
    delay: "-22s",
    duration: "38s",
    color: "255,184,92",
    rotation: 0,
  },
  {
    id: "mosaic-3-2",
    x: "28%",
    y: "58%",
    size: 128,
    delay: "-4s",
    duration: "32s",
    color: "255,184,92",
    rotation: 0,
  },
  {
    id: "mosaic-3-3",
    x: "50%",
    y: "58%",
    size: 108,
    delay: "-18s",
    duration: "35s",
    color: "255,184,92",
    rotation: 0,
  },
  {
    id: "mosaic-3-4",
    x: "72%",
    y: "58%",
    size: 132,
    delay: "-29s",
    duration: "42s",
    color: "255,184,92",
    rotation: 0,
  },
  {
    id: "mosaic-3-5",
    x: "90%",
    y: "58%",
    size: 96,
    delay: "-10s",
    duration: "30s",
    color: "255,184,92",
    rotation: 0,
  },
  {
    id: "mosaic-4-1",
    x: "20%",
    y: "78%",
    size: 94,
    delay: "-25s",
    duration: "39s",
    color: "255,184,92",
    rotation: 0,
  },
  {
    id: "mosaic-4-2",
    x: "42%",
    y: "78%",
    size: 120,
    delay: "-12s",
    duration: "34s",
    color: "255,184,92",
    rotation: 0,
  },
  {
    id: "mosaic-4-3",
    x: "60%",
    y: "78%",
    size: 98,
    delay: "-31s",
    duration: "44s",
    color: "255,184,92",
    rotation: 0,
  },
  {
    id: "mosaic-4-4",
    x: "80%",
    y: "78%",
    size: 114,
    delay: "-19s",
    duration: "36s",
    color: "255,184,92",
    rotation: 0,
  },
];

function buildBeamAngles(count: number, spread: number): number[] {
  const angles: number[] = [];
  for (let i = 0; i < count; i++) {
    angles.push(-spread / 2 + (spread / (count - 1)) * i);
  }
  return angles;
}

export function LaserBeams({ className }: { className?: string }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (reduced) return null;

  return (
    <div
      className={cn("pointer-events-none fixed inset-0 z-[5] overflow-hidden", className)}
      aria-hidden="true"
    >
      <div className="absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(ellipse_at_50%_0%,rgba(6,182,212,0.035),transparent_65%)]" />

      {MOSAIC_REFLECTIONS.map((reflection) => (
        <div
          key={reflection.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: reflection.x,
            top: reflection.y,
            width: reflection.size,
            height: reflection.size,
            transform: "translate(-50%, -50%)",
            background: `
              radial-gradient(circle at center, rgba(255,238,204,0.72) 0%, rgba(${reflection.color},0.62) 10%, rgba(${reflection.color},0.30) 28%, rgba(${reflection.color},0.09) 50%, transparent 74%)
            `,
            filter: "blur(7px)",
            mixBlendMode: "screen",
            opacity: 0,
            animation: `mosaic-reflection ${reflection.duration} ease-in-out ${reflection.delay} infinite`,
            ["--reflection-rotation" as string]: `${reflection.rotation}deg`,
          }}
        >
          <div
            className="absolute left-1/2 top-1/2 h-[28%] w-[28%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
            style={{
              boxShadow: `0 0 ${reflection.size * 0.14}px rgba(255,225,170,0.62), 0 0 ${reflection.size * 0.32}px rgba(${reflection.color},0.46)`,
            }}
          />
        </div>
      ))}

      {MOVING_HEADS.map((emitter) => (
        <div
          key={emitter.id}
          className="absolute -top-8"
          style={{
            left: emitter.x,
            transformOrigin: "50% 0",
            animation: `moving-head-sweep ${emitter.sweepDuration} ease-in-out ${emitter.sweepDelay} infinite, laser-show ${emitter.showDuration} ease-in-out ${emitter.showPhase} infinite`,
            ["--sweep-from" as string]: `${emitter.sweepFrom}deg`,
            ["--sweep-to" as string]: `${emitter.sweepTo}deg`,
          } as React.CSSProperties}
        >
          <div
            className="absolute left-1/2 top-0 h-[118vh] -translate-x-1/2 origin-top"
            style={{
              width: emitter.beamWidth,
              opacity: emitter.opacity,
              clipPath: "polygon(48% 0, 52% 0, 100% 100%, 0 100%)",
              background: `linear-gradient(to bottom, rgba(${emitter.beamColor},0.24) 0%, rgba(${emitter.beamColor},0.14) 32%, rgba(${emitter.beamColor},0.055) 62%, transparent 100%)`,
              filter: "blur(10px)",
              mixBlendMode: "screen",
              animation: `moving-head-breathe ${4.5 + emitter.beamWidth / 90}s ease-in-out infinite`,
            }}
          />
          <div
            className="absolute left-1/2 top-0 h-[112vh] -translate-x-1/2 origin-top"
            style={{
              width: Math.max(42, emitter.beamWidth * 0.26),
              clipPath: "polygon(46% 0, 54% 0, 95% 100%, 5% 100%)",
              background: `linear-gradient(to bottom, rgba(255,255,255,0.24) 0%, rgba(${emitter.beamColor},0.18) 26%, rgba(${emitter.beamColor},0.06) 58%, transparent 100%)`,
              filter: "blur(2px)",
              mixBlendMode: "screen",
              opacity: 0.36,
            }}
          />
        </div>
      ))}

      {LASERS.map((emitter) => {
        const beamAngles = buildBeamAngles(emitter.beamCount, emitter.spreadDeg);
        const halfSpread = emitter.spreadDeg / 2;

        return (
          <div
            key={emitter.id}
            className="absolute"
            style={{
              left: emitter.x,
              bottom: "-120px",
              transformOrigin: "0 0",
              opacity: 0.36,
              animation: `laser-emitter-sweep ${emitter.sweepDuration} ease-in-out ${emitter.sweepDelay} infinite, laser-show ${emitter.showDuration} ease-in-out ${emitter.showPhase} infinite`,
              ["--sweep-from" as string]: `${emitter.sweepFrom}deg`,
              ["--sweep-to" as string]: `${emitter.sweepTo}deg`,
            } as React.CSSProperties}
          >
            <div
              className="absolute origin-[0_0]"
              style={{
                width: "280vh",
                height: "280vh",
                top: "-140vh",
                left: 0,
                background: `conic-gradient(from ${-halfSpread}deg at 0% 50%, transparent 0deg, rgba(${emitter.beamColor},0.014) ${halfSpread * 0.2}deg, rgba(${emitter.beamColor},0.045) ${halfSpread}deg, rgba(${emitter.beamColor},0.014) ${halfSpread * 1.8}deg, transparent ${emitter.spreadDeg}deg)`,
                filter: "blur(14px)",
                mixBlendMode: "screen",
              }}
            />
            {beamAngles.map((angle, i) => {
              const distFromCenter = Math.abs(i - (beamAngles.length - 1) / 2);
              const intensity = 1 - distFromCenter * 0.14;

              return (
                <div
                  key={i}
                  className="absolute origin-[0_0]"
                  style={{
                    width: "260vh",
                    height: 0,
                    transform: `rotate(${angle}deg)`,
                  }}
                >
                  <div
                    className="absolute left-0 top-0 w-full"
                    style={{
                      height: 1.6,
                      marginTop: -0.8,
                      background: `linear-gradient(to right, rgba(255,255,255,${0.18 * intensity}) 0%, rgba(${emitter.beamColor},${0.28 * intensity}) 18%, rgba(${emitter.beamColor},${0.12 * intensity}) 48%, transparent 78%)`,
                      boxShadow: `0 0 6px ${emitter.glowColor}99`,
                      animation: `laser-flicker ${2.2 + i * 0.35}s ease-in-out infinite`,
                      animationDelay: `${-i * 0.45}s`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
