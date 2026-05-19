"use client";

import { cn } from "@/lib/utils";

type Venue = "enjoy" | "outxide" | "hiru" | "home";

const ORBS: Record<Venue, { color: string; x: string; y: string; size: string; delay: string }[]> = {
  enjoy: [
    { color: "rgba(236,72,153,0.14)", x: "10%", y: "8%", size: "50vw", delay: "0s" },
    { color: "rgba(236,72,153,0.10)", x: "65%", y: "45%", size: "55vw", delay: "-8s" },
    { color: "rgba(244,114,182,0.08)", x: "35%", y: "75%", size: "45vw", delay: "-16s" },
  ],
  outxide: [
    { color: "rgba(6,182,212,0.14)", x: "15%", y: "10%", size: "50vw", delay: "0s" },
    { color: "rgba(124,58,237,0.10)", x: "70%", y: "40%", size: "55vw", delay: "-8s" },
    { color: "rgba(6,182,212,0.08)", x: "30%", y: "70%", size: "45vw", delay: "-16s" },
  ],
  hiru: [
    { color: "rgba(184,115,51,0.14)", x: "10%", y: "8%", size: "50vw", delay: "0s" },
    { color: "rgba(184,115,51,0.09)", x: "68%", y: "45%", size: "55vw", delay: "-8s" },
    { color: "rgba(212,165,116,0.07)", x: "35%", y: "72%", size: "45vw", delay: "-16s" },
  ],
  home: [
    { color: "rgba(236,72,153,0.10)", x: "5%", y: "10%", size: "45vw", delay: "0s" },
    { color: "rgba(6,182,212,0.08)", x: "70%", y: "35%", size: "50vw", delay: "-8s" },
    { color: "rgba(184,115,51,0.07)", x: "40%", y: "70%", size: "40vw", delay: "-16s" },
  ],
};

interface AmbientGlowProps {
  venue: Venue;
  className?: string;
}

export function AmbientGlow({ venue, className }: AmbientGlowProps) {
  const orbs = ORBS[venue];

  return (
    <div
      className={cn("pointer-events-none fixed inset-0 -z-10 overflow-hidden", className)}
      aria-hidden="true"
    >
      {orbs.map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-ambient-drift"
          style={{
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            animationDelay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}
