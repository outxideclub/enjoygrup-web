"use client";

import { cn } from "@/lib/utils";

interface Emitter {
  id: string;
  x: string;
  color: string;
  glowColor: string;
  spreadDeg: number;
  sweepDuration: string;
  sweepDelay: string;
  sweepFrom: number;
  sweepTo: number;
  showPhase: string;
  showDuration: string;
  beamCount: number;
  beamColor: string;
}

const EMITTERS: Emitter[] = [
  {
    id: "left",
    x: "22%",
    color: "rgba(6,182,212,VAR)",
    glowColor: "#06b6d4",
    spreadDeg: 35,
    sweepDuration: "14s",
    sweepDelay: "0s",
    sweepFrom: -80,
    sweepTo: -35,
    showPhase: "0s",
    showDuration: "12s",
    beamCount: 7,
    beamColor: "6,182,212",
  },
  {
    id: "right",
    x: "80%",
    color: "rgba(124,58,237,VAR)",
    glowColor: "#7c3aed",
    spreadDeg: 32,
    sweepDuration: "18s",
    sweepDelay: "-4s",
    sweepFrom: -145,
    sweepTo: -100,
    showPhase: "-4s",
    showDuration: "14s",
    beamCount: 6,
    beamColor: "124,58,237",
  },
  {
    id: "center",
    x: "50%",
    color: "rgba(34,211,238,VAR)",
    glowColor: "#22d3ee",
    spreadDeg: 28,
    sweepDuration: "11s",
    sweepDelay: "-8s",
    sweepFrom: -108,
    sweepTo: -72,
    showPhase: "-7s",
    showDuration: "10s",
    beamCount: 5,
    beamColor: "34,211,238",
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
  return (
    <div
      className={cn("pointer-events-none fixed inset-0 z-[5] overflow-hidden", className)}
      aria-hidden="true"
    >
      {EMITTERS.map((emitter) => {
        const beamAngles = buildBeamAngles(emitter.beamCount, emitter.spreadDeg);
        const halfSpread = emitter.spreadDeg / 2;

        return (
          <div
            key={emitter.id}
            className="absolute"
            style={{
              left: emitter.x,
              bottom: "-100px",
              transformOrigin: "0 0",
              animation: `laser-emitter-sweep ${emitter.sweepDuration} ease-in-out infinite, laser-show ${emitter.showDuration} ease-in-out infinite`,
              animationDelay: `${emitter.sweepDelay}, ${emitter.showPhase}`,
              ["--sweep-from" as string]: `${emitter.sweepFrom}deg`,
              ["--sweep-to" as string]: `${emitter.sweepTo}deg`,
            } as React.CSSProperties}
          >
            {/* === LIGHT SHEET — the filled cone/plancha === */}
            <div
              className="absolute origin-[0_0]"
              style={{
                width: "300vh",
                height: "300vh",
                top: "-150vh",
                left: 0,
                background: `conic-gradient(from ${-halfSpread}deg at 0% 50%, transparent 0deg, rgba(${emitter.beamColor},0.04) ${halfSpread * 0.15}deg, rgba(${emitter.beamColor},0.12) ${halfSpread * 0.7}deg, rgba(${emitter.beamColor},0.15) ${halfSpread}deg, rgba(${emitter.beamColor},0.12) ${halfSpread * 1.3}deg, rgba(${emitter.beamColor},0.04) ${halfSpread * 1.85}deg, transparent ${emitter.spreadDeg}deg)`,
                filter: "blur(16px)",
              }}
            />
            {/* Brighter inner sheet core */}
            <div
              className="absolute origin-[0_0]"
              style={{
                width: "250vh",
                height: "250vh",
                top: "-125vh",
                left: 0,
                background: `conic-gradient(from ${-halfSpread * 0.5}deg at 0% 50%, transparent 0deg, rgba(${emitter.beamColor},0.06) ${halfSpread * 0.3}deg, rgba(${emitter.beamColor},0.1) ${halfSpread * 0.5}deg, rgba(${emitter.beamColor},0.06) ${halfSpread * 0.7}deg, transparent ${halfSpread}deg)`,
                filter: "blur(8px)",
              }}
            />

            {/* === INDIVIDUAL BEAM LINES within the sheet === */}
            {beamAngles.map((angle, i) => {
              const isCenter = i === Math.floor(beamAngles.length / 2);
              const distFromCenter = Math.abs(i - (beamAngles.length - 1) / 2);
              const intensity = 1 - distFromCenter * 0.12;
              const width = isCenter ? 2 : 1.2 - distFromCenter * 0.1;

              return (
                <div
                  key={i}
                  className="absolute origin-[0_0]"
                  style={{
                    width: "280vh",
                    height: 0,
                    transform: `rotate(${angle}deg)`,
                  }}
                >
                  {/* Sharp beam core */}
                  <div
                    className="absolute top-0 left-0 w-full"
                    style={{
                      height: Math.max(width, 0.5),
                      marginTop: -(Math.max(width, 0.5) / 2),
                      background: `linear-gradient(to right, rgba(${emitter.beamColor},${0.7 * intensity}) 0%, rgba(${emitter.beamColor},${0.3 * intensity}) 30%, transparent 75%)`,
                      animation: `laser-flicker ${2 + i * 0.3}s ease-in-out infinite`,
                      animationDelay: `${-i * 0.5}s`,
                    }}
                  />
                  {/* Beam glow */}
                  <div
                    className="absolute top-0 left-0 w-full"
                    style={{
                      height: width * 10,
                      marginTop: -(width * 5),
                      background: `linear-gradient(to right, ${emitter.glowColor}30 0%, ${emitter.glowColor}10 20%, transparent 55%)`,
                      filter: "blur(5px)",
                      opacity: 0.4 * intensity,
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
