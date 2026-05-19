"use client";

import { cn } from "@/lib/utils";

type Venue = "enjoy" | "outxide" | "hiru" | "home";

interface OrbConfig {
  color: string;
  x: string;
  y: string;
  size: string;
  delay: string;
  blur: string;
}

const ORBS: Record<Venue, OrbConfig[]> = {
  enjoy: [
    { color: "rgba(236,72,153,0.20)", x: "-10%", y: "-5%", size: "70vw", delay: "0s", blur: "100px" },
    { color: "rgba(219,39,119,0.14)", x: "50%", y: "25%", size: "65vw", delay: "-8s", blur: "120px" },
    { color: "rgba(244,114,182,0.10)", x: "15%", y: "55%", size: "60vw", delay: "-16s", blur: "110px" },
    { color: "rgba(236,72,153,0.08)", x: "70%", y: "70%", size: "55vw", delay: "-22s", blur: "90px" },
    { color: "rgba(190,24,93,0.06)", x: "30%", y: "85%", size: "50vw", delay: "-12s", blur: "130px" },
  ],
  outxide: [
    { color: "rgba(6,182,212,0.18)", x: "-10%", y: "-5%", size: "65vw", delay: "0s", blur: "100px" },
    { color: "rgba(124,58,237,0.14)", x: "55%", y: "20%", size: "60vw", delay: "-8s", blur: "120px" },
    { color: "rgba(6,182,212,0.10)", x: "10%", y: "50%", size: "65vw", delay: "-16s", blur: "110px" },
    { color: "rgba(124,58,237,0.07)", x: "70%", y: "65%", size: "55vw", delay: "-22s", blur: "90px" },
    { color: "rgba(34,211,238,0.06)", x: "35%", y: "85%", size: "50vw", delay: "-12s", blur: "130px" },
  ],
  hiru: [
    { color: "rgba(184,115,51,0.18)", x: "-10%", y: "-5%", size: "65vw", delay: "0s", blur: "100px" },
    { color: "rgba(184,115,51,0.12)", x: "55%", y: "25%", size: "60vw", delay: "-8s", blur: "120px" },
    { color: "rgba(212,165,116,0.09)", x: "10%", y: "55%", size: "65vw", delay: "-16s", blur: "110px" },
    { color: "rgba(139,94,60,0.07)", x: "75%", y: "70%", size: "50vw", delay: "-22s", blur: "90px" },
    { color: "rgba(184,115,51,0.05)", x: "30%", y: "85%", size: "55vw", delay: "-12s", blur: "130px" },
  ],
  home: [
    { color: "rgba(236,72,153,0.15)", x: "-5%", y: "-5%", size: "60vw", delay: "0s", blur: "100px" },
    { color: "rgba(6,182,212,0.12)", x: "55%", y: "20%", size: "55vw", delay: "-8s", blur: "120px" },
    { color: "rgba(184,115,51,0.09)", x: "20%", y: "55%", size: "55vw", delay: "-16s", blur: "110px" },
    { color: "rgba(124,58,237,0.07)", x: "70%", y: "70%", size: "50vw", delay: "-22s", blur: "90px" },
    { color: "rgba(236,72,153,0.05)", x: "40%", y: "85%", size: "45vw", delay: "-12s", blur: "130px" },
  ],
};

const MESH_GRADIENTS: Record<Venue, string> = {
  enjoy:
    "radial-gradient(ellipse 80% 60% at 20% 30%, rgba(236,72,153,0.08) 0%, transparent 70%), " +
    "radial-gradient(ellipse 70% 50% at 80% 70%, rgba(219,39,119,0.05) 0%, transparent 70%)",
  outxide:
    "radial-gradient(ellipse 80% 60% at 20% 30%, rgba(6,182,212,0.07) 0%, transparent 70%), " +
    "radial-gradient(ellipse 70% 50% at 80% 70%, rgba(124,58,237,0.05) 0%, transparent 70%)",
  hiru:
    "radial-gradient(ellipse 80% 60% at 20% 30%, rgba(184,115,51,0.07) 0%, transparent 70%), " +
    "radial-gradient(ellipse 70% 50% at 80% 70%, rgba(212,165,116,0.04) 0%, transparent 70%)",
  home:
    "radial-gradient(ellipse 60% 50% at 15% 25%, rgba(236,72,153,0.05) 0%, transparent 70%), " +
    "radial-gradient(ellipse 50% 40% at 75% 60%, rgba(6,182,212,0.04) 0%, transparent 70%), " +
    "radial-gradient(ellipse 40% 35% at 50% 80%, rgba(184,115,51,0.03) 0%, transparent 70%)",
};

interface AmbientGlowProps {
  venue: Venue;
  className?: string;
}

export function AmbientGlow({ venue, className }: AmbientGlowProps) {
  const orbs = ORBS[venue];
  const meshGradient = MESH_GRADIENTS[venue];

  return (
    <div
      className={cn("pointer-events-none fixed inset-0 -z-10 overflow-hidden", className)}
      aria-hidden="true"
    >
      <div className="absolute inset-0" style={{ background: meshGradient }} />
      {orbs.map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-ambient-drift"
          style={{
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 65%)`,
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            filter: `blur(${orb.blur})`,
            animationDelay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}
