"use client";

// Pantalla 16:9 de "directo": marcador en vivo + próximo partido + mini-calendario.
// Uso: abrir a pantalla completa en un PC/mini-PC (kiosko) en la pantalla central
// del DJ, o capturarla como Browser Source en OBS/mimoLive (cámara virtual).
// El partido grande va por tu OBS actual; esta página es la SEGUNDA fuente.

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { GroupLogo } from "@/components/ui/logos";
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

function BigFlag({ code, label }: { code: string | null; label: string }) {
  const url = flagUrl(code);
  if (!url) {
    return (
      <div className="flex aspect-square w-[7vw] items-center justify-center rounded-2xl bg-white/10 text-[1.4vw] font-bold text-white/50">
        {label.slice(0, 3).toUpperCase()}
      </div>
    );
  }
  return (
    <Image
      src={url}
      alt={label}
      width={160}
      height={160}
      className="aspect-square w-[7vw] rounded-2xl object-cover shadow-2xl ring-2 ring-white/15"
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

  // Polling del marcador
  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch("/api/mundial/live", { cache: "no-store" });
        const json = await res.json();
        if (alive) setApi({ match: json.match ?? null, live: json.live ?? null });
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

  const upcoming = useMemo(() => (nowMs ? upcomingBroadcasts(nowMs, 4) : []), [nowMs]);

  const match = api?.match ?? null;
  const live = api?.live ?? null;
  const isLive = live?.status === "LIVE" || live?.status === "HALFTIME";
  const stageLabel = match && STAGE_KEY[match.stage] ? t(STAGE_KEY[match.stage]) : match?.stage ?? "";
  const groupLetter = match?.group?.replace(/[^A-Z]/g, "");

  const statusText =
    live?.status === "LIVE"
      ? live.minute || t("mundial.liveNow")
      : live?.status === "HALFTIME"
        ? t("mundial.halftime")
        : live?.status === "FINISHED"
          ? t("mundial.finished")
          : match
            ? `${madridDayLabel(match)} · ${madridTimeLabel(match)}`
            : "";

  return (
    // Letterbox a 16:9 exacto para que la captura/kiosko siempre cuadre.
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden bg-black">
      <div className="relative aspect-video w-full max-h-screen max-w-[177.78vh] overflow-hidden bg-[#0a0a0a] text-white">
        {/* fondo */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/40 via-[#0a0a0a] to-black" />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-outxide/10 blur-3xl" />

        <div className="relative flex h-full flex-col p-[3vw]">
          {/* Cabecera */}
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-[1.2vw]">
              <div className="scale-[1.1] origin-left">
                <GroupLogo />
              </div>
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/5 px-[1vw] py-[0.4vw] text-[1vw] font-semibold uppercase tracking-wider text-emerald-300">
                {t("mundial.navLabel")}
              </span>
            </div>
            <div className="flex items-center gap-[1vw]">
              {isLive && (
                <span className="flex items-center gap-[0.5vw] rounded-full bg-red-600 px-[1vw] py-[0.4vw] text-[1vw] font-bold uppercase tracking-wider">
                  <span className="h-[0.8vw] w-[0.8vw] animate-pulse rounded-full bg-white" />
                  {t("mundial.liveNow")}
                </span>
              )}
              <span className="font-display text-[1.6vw] font-bold tabular-nums text-white/70">
                {clock}
              </span>
            </div>
          </header>

          {/* Marcador / próximo */}
          <div className="flex flex-1 flex-col items-center justify-center">
            {!isLive && (
              <p className="mb-[1.5vw] text-[1.3vw] font-semibold uppercase tracking-[0.3em] text-emerald-300">
                {t("mundial.nextAtOutxide")}
              </p>
            )}
            <p className="mb-[2vw] text-[1.1vw] uppercase tracking-wider text-white/40">
              {stageLabel}
              {groupLetter ? ` · ${t("mundial.group")} ${groupLetter}` : ""}
            </p>

            {match ? (
              <div className="flex w-full items-center justify-center gap-[3vw]">
                {/* Local */}
                <div className="flex flex-1 flex-col items-center gap-[1vw]">
                  <BigFlag code={match.home.code} label={match.home.name ?? match.home.placeholder ?? "?"} />
                  <span className="text-center text-[2vw] font-bold leading-tight">
                    {match.home.name ?? match.home.placeholder ?? t("mundial.tbd")}
                  </span>
                </div>

                {/* Marcador */}
                <div className="flex flex-col items-center">
                  {isLive || live?.status === "FINISHED" ? (
                    <div className="flex items-center gap-[1.5vw] font-display text-[7vw] font-bold leading-none tabular-nums">
                      <span>{live?.home.score ?? 0}</span>
                      <span className="text-white/30">:</span>
                      <span>{live?.away.score ?? 0}</span>
                    </div>
                  ) : (
                    <div className="font-display text-[5vw] font-bold leading-none text-white/30">
                      {madridTimeLabel(match)}
                    </div>
                  )}
                  <span
                    className={
                      "mt-[1vw] rounded-full px-[1.2vw] py-[0.4vw] text-[1.1vw] font-semibold tabular-nums " +
                      (isLive ? "bg-red-600/90 text-white" : "bg-white/10 text-white/60")
                    }
                  >
                    {statusText}
                  </span>
                  {live?.manual && (
                    <span className="mt-[0.5vw] text-[0.8vw] text-white/30">·</span>
                  )}
                </div>

                {/* Visitante */}
                <div className="flex flex-1 flex-col items-center gap-[1vw]">
                  <BigFlag code={match.away.code} label={match.away.name ?? match.away.placeholder ?? "?"} />
                  <span className="text-center text-[2vw] font-bold leading-tight">
                    {match.away.name ?? match.away.placeholder ?? t("mundial.tbd")}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-[1.6vw] text-white/40">{t("mundial.noUpcoming")}</p>
            )}

            {match && (match.venue || match.city) && (
              <p className="mt-[2vw] text-[1vw] text-white/40">
                {[match.venue, match.city].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>

          {/* Mini-calendario */}
          <footer className="border-t border-white/10 pt-[1.5vw]">
            <p className="mb-[1vw] text-[0.9vw] font-semibold uppercase tracking-[0.3em] text-white/40">
              {t("mundial.upcoming")}
            </p>
            <div className="flex gap-[1.2vw]">
              {upcoming.map((m) => (
                <div
                  key={m.id}
                  className="flex flex-1 items-center gap-[0.8vw] rounded-xl border border-white/5 bg-white/[0.03] px-[1vw] py-[0.8vw]"
                >
                  <div className="flex flex-col items-center text-[0.8vw] leading-tight text-emerald-300">
                    <span className="font-semibold">{madridTimeLabel(m)}</span>
                    <span className="text-white/30">{madridDayLabel(m).split(" ")[0]}</span>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-[0.3vw] text-[0.95vw]">
                    <span className="truncate">{m.home.name ?? m.home.placeholder ?? t("mundial.tbd")}</span>
                    <span className="truncate text-white/50">
                      {m.away.name ?? m.away.placeholder ?? t("mundial.tbd")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
