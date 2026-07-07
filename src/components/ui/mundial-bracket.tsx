"use client";

// Cuadro de eliminatorias del Mundial (wallchart): las dos mitades convergen en
// la Final. Dos variantes: "web" (apartado /mundial, con scroll horizontal) y
// "screen" (pantalla 16:9 del directo, tamaños en vw). Los partidos que se ven
// en la sala van remarcados en el color de Outxide.

import Image from "next/image";
import { Tv } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/i18n";
import { bracketData, broadcastState, flagUrl, madridDayLabel, madridTimeLabel } from "@/lib/mundial";
import type { Match } from "@/lib/mundial";

const STAGE_KEY: Record<string, string> = {
  "Round of 32": "mundial.stageR32",
  "Round of 16": "mundial.stageR16",
  "Quarter-final": "mundial.stageQF",
  "Semi-final": "mundial.stageSF",
  "Play-off for third place": "mundial.stage3rd",
  Final: "mundial.stageFinal",
};

type Variant = "web" | "screen";

// Tamaños por variante. La de pantalla usa vw para escalar en cualquier monitor.
const SIZES: Record<
  Variant,
  {
    col: string;
    gap: string;
    cell: string;
    head: string;
    flag: string;
    flagPx: number;
    name: string;
    score: string;
    time: string;
    tv: string;
  }
> = {
  web: {
    col: "min-w-0 flex-1",
    gap: "gap-1.5 lg:gap-2",
    cell: "rounded-xl p-2",
    head: "mb-2 text-[10px]",
    flag: "h-4 w-4",
    flagPx: 16,
    name: "text-[11px]",
    score: "text-[11px]",
    time: "text-[9px]",
    tv: "h-3 w-3",
  },
  screen: {
    col: "w-[16.5vw] shrink-0",
    gap: "gap-[1vw]",
    cell: "rounded-[0.8vw] p-[0.7vw]",
    head: "mb-[0.6vw] text-[1vw]",
    flag: "h-[1.5vw] w-[1.5vw]",
    flagPx: 28,
    name: "text-[1.15vw]",
    score: "text-[1.15vw]",
    time: "text-[0.9vw]",
    tv: "h-[1.1vw] w-[1.1vw]",
  },
};

/** Lado ganador de un partido acabado (desempate por penaltis). */
function winnerSide(m: Match): "home" | "away" | null {
  const r = m.result;
  if (!r || r.status !== "FINISHED" || r.home == null || r.away == null) return null;
  if (r.home !== r.away) return r.home > r.away ? "home" : "away";
  if (r.penHome != null && r.penAway != null && r.penHome !== r.penAway) {
    return r.penHome > r.penAway ? "home" : "away";
  }
  return null;
}

function TeamLine({
  team,
  score,
  pens,
  winner,
  played,
  variant,
  short,
}: {
  team: Match["home"];
  score: number | null;
  pens: number | null;
  winner: boolean;
  played: boolean;
  variant: Variant;
  /** Muestra el código de 3 letras (estilo gráficos de TV) en vez del nombre. */
  short?: boolean;
}) {
  const t = useT();
  const s = SIZES[variant];
  const url = flagUrl(team.code);
  const fullName = team.name ?? team.placeholder ?? t("mundial.tbd");
  const label = short ? (team.code ?? team.placeholder ?? "—") : fullName;
  const dim = (played && !winner) || (!team.name && !team.code);
  return (
    <div className="flex min-w-0 items-center gap-[0.45em]" title={fullName}>
      {url ? (
        <Image
          src={url}
          alt={fullName}
          width={s.flagPx}
          height={s.flagPx}
          className={cn("shrink-0 rounded-full object-cover ring-1 ring-white/15", s.flag)}
          unoptimized
        />
      ) : (
        <span className={cn("shrink-0 rounded-full bg-white/10", s.flag)} aria-hidden />
      )}
      <span
        className={cn(
          "min-w-0 flex-1 truncate",
          s.name,
          winner ? "font-semibold text-white" : dim ? "text-white/40" : "text-white/80",
        )}
      >
        {label}
      </span>
      {score != null && (
        <span
          className={cn(
            "shrink-0 tabular-nums",
            s.score,
            winner ? "font-bold text-white" : "text-white/50",
          )}
        >
          {score}
          {pens != null && <span className="text-white/40"> ({pens})</span>}
        </span>
      )}
    </div>
  );
}

function BracketCell({
  match,
  matches,
  variant,
  short,
}: {
  match: Match | null;
  matches: Match[];
  variant: Variant;
  short?: boolean;
}) {
  const t = useT();
  const s = SIZES[variant];

  if (!match) {
    return (
      <div className={cn("border border-white/5 bg-white/[0.02] text-center", s.cell)}>
        <span className={cn("text-white/25", s.name)}>{t("mundial.tbd")}</span>
      </div>
    );
  }

  const r = match.result ?? null;
  const isLive = r?.status === "LIVE" || r?.status === "HALFTIME";
  const played = r?.status === "FINISHED";
  const winner = winnerSide(match);
  const isBroadcast = broadcastState(match, matches) === "broadcast";
  const showScore = !!r && (isLive || played);

  return (
    <div
      className={cn(
        "relative border transition-colors",
        s.cell,
        isLive
          ? "border-emerald-400/40 bg-emerald-400/[0.06]"
          : isBroadcast
            ? "border-outxide/40 bg-outxide/[0.07]"
            : "border-white/10 bg-white/[0.03]",
      )}
    >
      {/* Se ve en la sala */}
      {isBroadcast && (
        <Tv className={cn("absolute right-[0.5em] top-[0.5em] text-outxide", s.tv)} aria-hidden />
      )}
      <div className={cn("flex flex-col gap-[0.35em]", isBroadcast && "pr-[1.4em]")}>
        <TeamLine
          team={match.home}
          score={showScore ? (r?.home ?? 0) : null}
          pens={showScore ? (r?.penHome ?? null) : null}
          winner={winner === "home"}
          played={played}
          variant={variant}
          short={short}
        />
        <TeamLine
          team={match.away}
          score={showScore ? (r?.away ?? 0) : null}
          pens={showScore ? (r?.penAway ?? null) : null}
          winner={winner === "away"}
          played={played}
          variant={variant}
          short={short}
        />
      </div>
      {/* Hora para los no jugados; minuto para los que están en juego */}
      {isLive ? (
        <p className={cn("mt-[0.4em] font-semibold text-emerald-300 tabular-nums", s.time)}>
          ● {r?.minute || t("mundial.liveNow")}
        </p>
      ) : (
        !played && (
          <p className={cn("mt-[0.4em] truncate capitalize text-white/35 tabular-nums", s.time)}>
            {madridDayLabel(match)} · {madridTimeLabel(match)}
          </p>
        )
      )}
    </div>
  );
}

function Column({
  matches: cellMatches,
  all,
  label,
  variant,
  short,
}: {
  matches: (Match | null)[];
  all: Match[];
  label: string;
  variant: Variant;
  short?: boolean;
}) {
  const s = SIZES[variant];
  return (
    <div className={cn("flex flex-col", s.col)}>
      <p className={cn("truncate text-center font-semibold uppercase tracking-wider text-white/40", s.head)}>
        {label}
      </p>
      <div className={cn("flex flex-1 flex-col justify-around", s.gap)}>
        {cellMatches.map((m, i) => (
          <BracketCell key={m?.id ?? `empty-${i}`} match={m} matches={all} variant={variant} short={short} />
        ))}
      </div>
    </div>
  );
}

/**
 * Cuadro de eliminatorias. `depth` = rondas antes de la Final (2 = desde
 * cuartos, para la pantalla del directo; 4 = desde dieciseisavos, para la web).
 *
 * Variante "web": SIN scroll horizontal. En ≥md el wallchart ocupa el ancho
 * disponible usando códigos de 3 letras (estilo gráficos de TV; el nombre
 * completo va en el tooltip). En <md las rondas se apilan en vertical con
 * nombres completos. Variante "screen": wallchart fijo en vw (pantalla 16:9).
 */
export function MundialBracket({
  matches,
  depth,
  variant,
}: {
  matches: Match[];
  depth: number;
  variant: Variant;
}) {
  const t = useT();
  const s = SIZES[variant];
  const data = bracketData(matches, depth);
  if (!data) return null;

  const stageLabel = (cells: (Match | null)[]): string => {
    const m = cells.find(Boolean);
    return m && STAGE_KEY[m.stage] ? t(STAGE_KEY[m.stage]) : "";
  };

  // Mitad izquierda de fuera hacia dentro, Final en el centro, derecha al revés.
  const leftCols = [...data.left].reverse();
  const rightCols = data.right;
  const short = variant === "web"; // códigos de 3 letras en el wallchart web

  const wallchart = (
    <div className={cn("flex w-full items-stretch", s.gap, variant === "web" && "hidden md:flex")}>
      {leftCols.map((cells, i) => (
        <Column
          key={`l${i}`}
          matches={cells}
          all={matches}
          label={stageLabel(cells)}
          variant={variant}
          short={short}
        />
      ))}

      {/* Centro: Final + tercer puesto */}
      <div className={cn("flex flex-col", s.col)}>
        <p className={cn("truncate text-center font-semibold uppercase tracking-wider text-amber-300/80", s.head)}>
          {t("mundial.stageFinal")}
        </p>
        <div className={cn("flex flex-1 flex-col justify-center", s.gap)}>
          <BracketCell match={data.final} matches={matches} variant={variant} short={short} />
          {data.third && (
            <div>
              <p className={cn("mb-[0.4em] truncate text-center uppercase tracking-wider text-white/30", s.time)}>
                {t("mundial.stage3rd")}
              </p>
              <BracketCell match={data.third} matches={matches} variant={variant} short={short} />
            </div>
          )}
        </div>
      </div>

      {rightCols.map((cells, i) => (
        <Column
          key={`r${i}`}
          matches={cells}
          all={matches}
          label={stageLabel(cells)}
          variant={variant}
          short={short}
        />
      ))}
    </div>
  );

  if (variant === "screen") return wallchart;

  // Móvil: rondas apiladas (de dieciseisavos a la Final), nombres completos.
  const stackedRounds = leftCols.map((cells, i) => [...cells, ...rightCols[rightCols.length - 1 - i]]);

  return (
    <>
      {wallchart}
      <div className="flex flex-col gap-6 md:hidden">
        {stackedRounds.map((cells, i) => (
          <div key={`s${i}`}>
            <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-wider text-white/40">
              {stageLabel(cells)}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {cells.map((m, j) => (
                <BracketCell key={m?.id ?? `se${i}-${j}`} match={m} matches={matches} variant="web" />
              ))}
            </div>
          </div>
        ))}
        <div>
          <p className="mb-2 text-center text-[11px] font-semibold uppercase tracking-wider text-amber-300/80">
            {t("mundial.stageFinal")}
          </p>
          <div className="grid grid-cols-2 gap-2">
            <BracketCell match={data.final} matches={matches} variant="web" />
            {data.third && <BracketCell match={data.third} matches={matches} variant="web" />}
          </div>
        </div>
      </div>
    </>
  );
}
