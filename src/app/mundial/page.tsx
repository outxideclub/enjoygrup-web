"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Tv, Radio, Star } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n";
import {
  getMatches,
  groupByDay,
  broadcastState,
  matchOfTheNightIds,
  flagUrl,
  madridTimeLabel,
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

function MatchCard({ match }: { match: Match }) {
  const t = useT();
  const state = broadcastState(match);
  const isMotn = matchOfTheNightIds().has(match.id);
  const stageLabel = STAGE_KEY[match.stage] ? t(STAGE_KEY[match.stage]) : match.stage;
  const groupLetter = match.group?.replace(/[^A-Z]/g, "");

  return (
    <div
      className={cn(
        "glass-card rounded-2xl p-4 transition-colors sm:p-5",
        state === "broadcast"
          ? "border-outxide/30 bg-outxide/[0.04]"
          : "border-white/5",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-lg font-bold tracking-tight text-white tabular-nums">
            {madridTimeLabel(match)}
          </span>
          <span className="text-[11px] uppercase tracking-wider text-muted-foreground">
            {stageLabel}
            {groupLetter ? ` · ${t("mundial.group")} ${groupLetter}` : ""}
          </span>
        </div>
        {state === "broadcast" && (
          <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-outxide/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-outxide">
            {isMotn ? <Star size={11} className="fill-outxide" /> : <Tv size={11} />}
            {isMotn ? t("mundial.matchOfTheNight") : t("mundial.watchAtOutxide")}
          </span>
        )}
        {state === "conflict" && (
          <span className="shrink-0 rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white/40">
            {t("mundial.conflictNote")}
          </span>
        )}
      </div>

      <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <TeamRow team={match.home} align="left" />
        <span className="text-xs font-semibold text-white/30">—</span>
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

export default function MundialPage() {
  const t = useT();
  const [onlyOutxide, setOnlyOutxide] = useState(false);

  const groups = useMemo(() => {
    const all = getMatches();
    const filtered = onlyOutxide
      ? all.filter((m) => broadcastState(m) === "broadcast")
      : all;
    return groupByDay(filtered);
  }, [onlyOutxide]);

  return (
    <main className="min-h-screen bg-background">
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
                    <MatchCard key={m.id} match={m} />
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
