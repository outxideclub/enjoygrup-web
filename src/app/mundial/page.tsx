"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Tv, Radio, Star } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { MundialBracket } from "@/components/ui/mundial-bracket";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n";
import {
  getMatches,
  groupByDay,
  broadcastState,
  matchOfTheNightIds,
  flagUrl,
  madridTimeLabel,
  type BroadcastState,
  type Match,
  type MatchResult,
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

function Flag({ code, label }: { code: string | null; label: string }) {
  const url = flagUrl(code);
  if (!url) {
    return (
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-[9px] font-semibold text-white/50"
        aria-hidden
      >
        {label.slice(0, 3).toUpperCase()}
      </span>
    );
  }
  return (
    <Image
      src={url}
      alt={label}
      width={28}
      height={28}
      className="h-7 w-7 shrink-0 rounded-full object-cover ring-1 ring-white/15"
      unoptimized
    />
  );
}

function TeamRow({
  team,
  align,
}: {
  team: Match["home"];
  align: "left" | "right";
}) {
  const t = useT();
  const name = team.name ?? team.placeholder ?? t("mundial.tbd");
  return (
    <div
      className={cn(
        "flex min-w-0 items-center gap-2.5",
        align === "right" && "flex-row-reverse text-right",
      )}
    >
      <Flag code={team.code} label={name} />
      <span className="truncate text-sm font-medium text-white sm:text-base">{name}</span>
    </div>
  );
}

/** Indicador de estado en vivo (minuto / descanso / final) para el calendario. */
function LiveBadge({ result }: { result: MatchResult }) {
  const t = useT();
  if (result.status === "LIVE") {
    return (
      <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        {result.minute || t("mundial.liveNow")}
      </span>
    );
  }
  if (result.status === "HALFTIME") {
    return (
      <span className="shrink-0 rounded-full bg-amber-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-300">
        {t("mundial.halftime")}
      </span>
    );
  }
  return (
    <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/60">
      {t("mundial.finished")}
    </span>
  );
}

function MatchCard({
  match,
  state,
  isMotn,
}: {
  match: Match;
  state: BroadcastState;
  isMotn: boolean;
}) {
  const t = useT();
  const stageLabel = STAGE_KEY[match.stage] ? t(STAGE_KEY[match.stage]) : match.stage;
  const groupLetter = match.group?.replace(/^group\s*/i, "");

  // Mostramos resultado cuando el partido está en juego, en descanso o ya acabó
  // (registro permanente del marcador para todos los partidos jugados).
  const result = match.result ?? null;
  const showScore =
    !!result &&
    (result.status === "LIVE" || result.status === "HALFTIME" || result.status === "FINISHED");
  const isLive = result?.status === "LIVE" || result?.status === "HALFTIME";
  const hasPens = result != null && result.penHome != null && result.penAway != null;

  return (
    <div
      className={cn(
        "glass-card rounded-2xl p-4 transition-colors sm:p-5",
        isLive
          ? "border-emerald-400/30 bg-emerald-400/[0.04]"
          : state === "broadcast"
            ? "border-outxide/30 bg-outxide/[0.04]"
            : "border-white/5",
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-lg font-bold tracking-tight text-white tabular-nums">
            {madridTimeLabel(match)}
          </span>
          <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
            {stageLabel}
            {groupLetter ? ` · ${t("mundial.group")} ${groupLetter}` : ""}
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          {showScore && result && <LiveBadge result={result} />}
          {state === "broadcast" && (
            <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-outxide/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-outxide">
              {isMotn ? <Star size={11} className="fill-outxide" /> : <Tv size={11} />}
              {isMotn ? t("mundial.matchOfTheNight") : t("mundial.watchAtOutxide")}
            </span>
          )}
          {state === "conflict" && !showScore && (
            <span className="shrink-0 rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white/40">
              {t("mundial.conflictNote")}
            </span>
          )}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <TeamRow team={match.home} align="left" />
        {showScore && result ? (
          <span className="flex flex-col items-center">
            <span
              className={cn(
                "flex items-baseline gap-1.5 font-display text-xl font-extrabold tabular-nums sm:text-2xl",
                isLive ? "text-emerald-300" : "text-white",
              )}
            >
              <span>{result.home ?? 0}</span>
              <span className="text-white/25">:</span>
              <span>{result.away ?? 0}</span>
            </span>
            {hasPens && (
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/50 tabular-nums">
                {t("mundial.penalties")} {result.penHome}–{result.penAway}
              </span>
            )}
          </span>
        ) : (
          <span className="text-xs font-semibold text-white/30">—</span>
        )}
        <TeamRow team={match.away} align="right" />
      </div>

      {(match.venue || match.city) && (
        <p className="mt-3 truncate text-[11px] text-muted-foreground">
          {[match.venue, match.city].filter(Boolean).join(" · ")}
        </p>
      )}
    </div>
  );
}

/**
 * Sondea /api/mundial/matches: partidos enriquecidos con el calendario de FIFA
 * (equipos reales en eliminatorias según clasifican + resultado de cada partido,
 * en vivo o como registro permanente). Arranca con el JSON estático mientras llega.
 */
function useEnrichedMatches(): Match[] {
  const [matches, setMatches] = useState<Match[]>(() => getMatches());
  const aliveRef = useRef(true);

  useEffect(() => {
    aliveRef.current = true;
    const load = async () => {
      try {
        const res = await fetch("/api/mundial/matches", { cache: "no-store" });
        const json = await res.json();
        if (!aliveRef.current) return;
        if (Array.isArray(json.matches) && json.matches.length > 0) {
          setMatches(json.matches as Match[]);
        }
      } catch {
        /* mantiene el último estado conocido */
      }
    };
    load();
    const id = setInterval(load, 1000 * 20);
    return () => {
      aliveRef.current = false;
      clearInterval(id);
    };
  }, []);

  return matches;
}

export default function MundialPage() {
  const t = useT();
  const [onlyOutxide, setOnlyOutxide] = useState(false);
  const all = useEnrichedMatches();

  const { groups, motnIds } = useMemo(() => {
    const filtered = onlyOutxide
      ? all.filter((m) => broadcastState(m, all) === "broadcast")
      : all;
    return { groups: groupByDay(filtered), motnIds: matchOfTheNightIds(all) };
  }, [all, onlyOutxide]);

  return (
    <main id="contenido" className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-12 pt-32 sm:pt-36">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-950/30 via-background to-background" />
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-300">
            <Radio size={13} />
            {t("mundial.badge")}
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold uppercase tracking-tight text-white sm:text-6xl">
            {t("mundial.title")}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            {t("mundial.subtitle")}
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/50">{t("mundial.intro")}</p>
        </div>

        {/* Filtro */}
        <div className="mx-auto mt-10 flex max-w-xs items-center rounded-full border border-white/10 bg-white/[0.03] p-1">
          {[
            { v: false, label: t("mundial.filterAll") },
            { v: true, label: t("mundial.filterOutxide") },
          ].map((opt) => (
            <button
              key={String(opt.v)}
              onClick={() => setOnlyOutxide(opt.v)}
              className={cn(
                "flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                onlyOutxide === opt.v
                  ? "bg-outxide/20 text-outxide"
                  : "text-muted-foreground hover:text-white",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </section>

      {/* Cuadro de eliminatorias (se rellena solo según clasifican los equipos) */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-center font-display text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
            {t("mundial.bracketTitle")}
          </h2>
          <MundialBracket matches={all} depth={4} variant="web" />
          <p className="mt-3 flex items-center justify-center gap-2 text-xs text-white/35">
            <span className="inline-block h-2.5 w-2.5 rounded-sm border border-outxide/40 bg-outxide/[0.15]" />
            {t("mundial.watchAtOutxide")}
          </p>
        </div>
      </section>

      {/* Lista de partidos */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-3xl space-y-10">
          {groups.map((day) => (
            <ScrollReveal key={day.dayKey}>
              <div>
                <h2 className="sticky top-20 z-10 mb-3 inline-block rounded-lg bg-background/80 py-1 pr-3 font-display text-sm font-semibold uppercase tracking-wider text-emerald-300 backdrop-blur">
                  {day.label}
                </h2>
                <div className="space-y-3">
                  {day.matches.map((m) => (
                    <MatchCard
                      key={m.id}
                      match={m}
                      state={broadcastState(m, all)}
                      isMotn={motnIds.has(m.id)}
                    />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-3xl text-center text-xs text-white/30">
          {t("mundial.disclaimer")}
        </p>
      </section>

      <Footer />
    </main>
  );
}
