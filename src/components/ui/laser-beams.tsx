"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Laser {
  angle: number;
  speed: number;
  opacity: number;
  width: number;
}

export function LaserBeams({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current;
    if (!canvas || prefersReduced) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let lasers: Laser[] = [];
    const laserCount = 8;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      lasers = [];
      for (let i = 0; i < laserCount; i++) {
        lasers.push({
          angle: Math.random() * Math.PI * 2,
          speed: (Math.random() - 0.5) * 0.02,
          opacity: Math.random() * 0.5 + 0.2,
          width: Math.random() * 2 + 1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height * 0.3; // Top-ish origin
      const length = Math.max(canvas.width, canvas.height) * 1.5;

      lasers.forEach((laser) => {
        laser.angle += laser.speed;

        // Beam
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        const endX = centerX + Math.cos(laser.angle) * length;
        const endY = centerY + Math.sin(laser.angle) * length;

        const grad = ctx.createLinearGradient(centerX, centerY, endX, endY);
        grad.addColorStop(0, "rgba(6, 182, 212, 0)");
        grad.addColorStop(0.2, `rgba(6, 182, 212, ${laser.opacity})`);
        grad.addColorStop(1, "rgba(6, 182, 212, 0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = laser.width;
        ctx.stroke();

        // Glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#06b6d4";
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0 h-full w-full opacity-40", className)}
    />
  );
}
