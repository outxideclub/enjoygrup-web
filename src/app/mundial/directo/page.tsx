"use client";

// Pantalla 16:9 de "directo": marcador en vivo + próximo partido + mini-calendario.
// Uso: abrir a pantalla completa en un PC/mini-PC (kiosko) en la pantalla central
// del DJ, o capturarla como Browser Source en OBS/mimoLive (cámara virtual).
// El partido grande va por tu OBS actual; esta página es la SEGUNDA fuente.

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { GroupLogo } from "@/components/ui/logos";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n";
import {
  flagUrl,
  madridTimeLabel,
  madridDayLabel,
  upcomingBroadcasts,
  type LiveScore,
  type Match,
} from "@/lib/mundial";

const STAGE_KEY: Record<string, string> = {
  "First Stage": "mundial.stageFirst",
  "Round of 32": "mundial.stageR32",
  "Round of 16": "mundial.stageR16",
  "Quarter-final": "mundial.stageQF",
  "Semi-final": "mundial.stageSF",
  "Play-off for third place": "mundial.stage3rd",
  Final: "mundial.stageFinal",
};

interface ApiMatch {
  id: string;
  kickoffUtc: string;
  stage: string;
  group: string | null;
  home: Match["home"];
  away: Match["away"];
  venue: string | null;
  city: string | null;
}

function Flag({ code, label, className }: { code: string | null; label: string; className?: string }) {
  const url = flagUrl(code);
  if (!url) {
    return (
      <div
        className={cn(
          "flex aspect-square items-center justify-center rounded-2xl bg-white/10 font-bold text-white/50",
          className,
        )}
      >
        {label.slice(0, 3).toUpperCase()}
      </div>
    );
  }
  return (
    <Image
      src={url}
      alt={label}
      width={260}
      height={260}
      className={cn("aspect-square rounded-2xl object-cover shadow-2xl ring-2 ring-white/15", className)}
      unoptimized
      priority
    />
  );
}

export default function DirectoPage() {
  const t = useT();
  const [api, setApi] = useState<{ match: ApiMatch | null; live: LiveScore | null } | null>(null);
  const [clock, setClock] = useState("");
  const [nowMs, setNowMs] = useState(0);
  // Desfase opcional (?delay=25) para que el marcador NO vaya por delante del
  // vídeo de la retransmisión. Buffer de snapshots con su hora de llegada.
  const [delaySec, setDelaySec] = useState(0);
  const historyRef = useRef<{ at: number; data: { match: ApiMatch | null; live: LiveScore | null } }[]>([]);

  // Lee ?delay=segundos de la URL (máx. 120 s).
  useEffect(() => {
    const d = parseInt(new URLSearchParams(window.location.search).get("delay") || "0", 10);
    if (!Number.isNaN(d) && d >= 0) setDelaySec(Math.min(d, 120));
  }, []);

  // Reloj local (Mallorca)
  useEffect(() => {
    const tick = () => {
      setClock(
        new Intl.DateTimeFormat("es-ES", {
          timeZone: "Europe/Madrid",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
      setNowMs(Date.now());
    };
    tick();
    const id = setInterval(tick, 1000 * 30);
    return () => clearInterval(id);
  }, []);

  // Polling del marcador → guarda cada respuesta en el historial con su hora.
  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch("/api/mundial/live", { cache: "no-store" });
        const json = await res.json();
        if (!alive) return;
        historyRef.current.push({ at: Date.now(), data: { match: json.match ?? null, live: json.live ?? null } });
        const cutoff = Date.now() - 150000; // conserva ~150 s
        historyRef.current = historyRef.current.filter((s) => s.at >= cutoff);
      } catch {
        /* mantiene el último estado */
      }
    };
    load();
    const id = setInterval(load, 1000 * 5);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  // Cada segundo elige qué snapshot mostrar según el desfase configurado.
  useEffect(() => {
    const tick = () => {
      const h = historyRef.current;
      if (!h.length) return;
      const target = Date.now() - delaySec * 1000;
      let chosen = h[0]; // si ninguno es lo bastante antiguo, el más viejo disponible
      for (const s of h) {
        if (s.at <= target) chosen = s;
        else break;
      }
      setApi(chosen.data);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [delaySec]);

  const upcoming = useMemo(() => (nowMs ? upcomingBroadcasts(nowMs, 4) : []), [nowMs]);

  const match = api?.match ?? null;
  const live = api?.live ?? null;
  const status = live?.status;
  // Mostramos marcador cuando hay partido en juego, descanso o recién acabado.
  const showScore = status === "LIVE" || status === "HALFTIME" || status === "FINISHED";
  const stageLabel = match && STAGE_KEY[match.stage] ? t(STAGE_KEY[match.stage]) : match?.stage ?? "";
  const groupLetter = match?.group?.replace(/[^A-Z]/g, "");
  const stageLine = stageLabel + (groupLetter ? ` · ${t("mundial.group")} ${groupLetter}` : "");

  // Texto grande del tiempo (minuto de FIFA / Descanso / Final).
  const bigTime =
    status === "LIVE"
      ? live?.minute || ""
      : status === "HALFTIME"
        ? t("mundial.halftime")
        : status === "FINISHED"
          ? t("mundial.finished")
          : "";

  const homeName = match ? match.home.name ?? match.home.placeholder ?? t("mundial.tbd") : "";
  const awayName = match ? match.away.name ?? match.away.placeholder ?? t("mundial.tbd") : "";

  // Lista de próximos (sin el partido que ya se muestra de héroe).
  const upcomingList = upcoming.filter((m) => m.id !== match?.id).slice(0, 3);

  return (
    // Letterbox a 16:9 exacto para que la captura/kiosko siempre cuadre.
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden bg-black">
      <div className="relative aspect-video w-full max-h-screen max-w-[177.78vh] overflow-hidden bg-[#0a0a0a] text-white">
        {/* fondo */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/40 via-[#0a0a0a] to-black" />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-outxide/10 blur-3xl" />

        <div className="relative flex h-full flex-col p-[3vw]">
          {/* Cabecera mínima (sin círculo rojo) */}
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-[1.2vw]">
              <GroupLogo />
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/5 px-[1vw] py-[0.4vw] text-[1.1vw] font-semibold uppercase tracking-wider text-emerald-300">
                {t("mundial.navLabel")}
              </span>
            </div>
            <div className="flex items-center gap-[1vw]">
              <span className="font-display text-[1.8vw] font-bold tabular-nums text-white/70">{clock}</span>
              {delaySec > 0 && (
                <span
                  className="text-[0.9vw] font-medium tabular-nums text-white/25"
                  title="Desfase aplicado para sincronizar con el vídeo"
                >
                  ⧖{delaySec}s
                </span>
              )}
            </div>
          </header>

          {showScore && match ? (
            /* ===== MODO PARTIDO: marcador y minuto enormes, sin próximos ===== */
            <div className="flex flex-1 flex-col items-center justify-center">
              <p className="mb-[1.5vw] text-[2vw] uppercase tracking-[0.2em] text-white/45">{stageLine}</p>

              <div className="flex w-full items-center justify-center gap-[3vw]">
                {/* Local */}
                <div className="flex flex-1 flex-col items-center gap-[1.2vw]">
                  <Flag code={match.home.code} label={homeName} className="w-[12vw]" />
                  <span className="text-center text-[3.2vw] font-bold leading-tight">{homeName}</span>
                </div>

                {/* Marcador */}
                <div className="flex items-center gap-[2vw] font-display text-[15vw] font-extrabold leading-none tabular-nums">
                  <span>{live?.home.score ?? 0}</span>
                  <span className="text-white/25">:</span>
                  <span>{live?.away.score ?? 0}</span>
                </div>

                {/* Visitante */}
                <div className="flex flex-1 flex-col items-center gap-[1.2vw]">
                  <Flag code={match.away.code} label={awayName} className="w-[12vw]" />
                  <span className="text-center text-[3.2vw] font-bold leading-tight">{awayName}</span>
                </div>
              </div>

              {/* Minuto ENORME, sin círculo rojo */}
              {bigTime && (
                <span
                  className={cn(
                    "mt-[2vw] font-display font-extrabold leading-none tabular-nums",
                    status === "LIVE" ? "text-[9vw] text-emerald-400" : "text-[6vw] text-white/80",
                  )}
                >
                  {bigTime}
                </span>
              )}
            </div>
          ) : (
            /* ===== MODO SIN PARTIDO: próximos en grande ===== */
            <div className="flex flex-1 flex-col items-center justify-center gap-[2vw]">
              <p className="text-[2.6vw] font-semibold uppercase tracking-[0.3em] text-emerald-300">
                {t("mundial.nextAtOutxide")}
              </p>

              {match ? (
                <>
                  <p className="text-[1.8vw] uppercase tracking-wider text-white/40">{stageLine}</p>
                  <div className="flex w-full items-center justify-center gap-[3vw]">
                    <div className="flex flex-1 flex-col items-center gap-[1vw]">
                      <Flag code={match.home.code} label={homeName} className="w-[10vw]" />
                      <span className="text-center text-[2.8vw] font-bold leading-tight">{homeName}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="font-display text-[6.5vw] font-extrabold leading-none tabular-nums">
                        {madridTimeLabel(match)}
                      </span>
                      <span className="mt-[0.5vw] text-[1.8vw] capitalize text-white/50">
                        {madridDayLabel(match)}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col items-center gap-[1vw]">
                      <Flag code={match.away.code} label={awayName} className="w-[10vw]" />
                      <span className="text-center text-[2.8vw] font-bold leading-tight">{awayName}</span>
                    </div>
                  </div>

                  {upcomingList.length > 0 && (
                    <div className="mt-[2vw] w-full">
                      <p className="mb-[1vw] text-center text-[1.4vw] font-semibold uppercase tracking-[0.3em] text-white/35">
                        {t("mundial.upcoming")}
                      </p>
                      <div className="flex flex-col gap-[1vw]">
                        {upcomingList.map((m) => (
                          <div
                            key={m.id}
                            className="flex items-center gap-[2vw] rounded-2xl border border-white/5 bg-white/[0.03] px-[2.5vw] py-[1.4vw]"
                          >
                            <span className="text-[2.6vw] font-bold tabular-nums text-emerald-300">
                              {madridTimeLabel(m)}
                            </span>
                            <span className="w-[9vw] text-[1.6vw] capitalize text-white/40">
                              {madridDayLabel(m)}
                            </span>
                            <span className="flex-1 truncate text-[2.4vw] font-medium">
                              {(m.home.name ?? m.home.placeholder ?? t("mundial.tbd")) +
                                "  –  " +
                                (m.away.name ?? m.away.placeholder ?? t("mundial.tbd"))}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-[2.5vw] text-white/40">{t("mundial.noUpcoming")}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
