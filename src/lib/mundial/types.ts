// Tipos del apartado temporal "Mundial 2026".
// Los datos viven en data/mundial/matches.json (generados desde api.fifa.com).

export interface MatchTeam {
  /** Nombre en inglés (FIFA). La UI lo muestra tal cual o traduce el placeholder. */
  name: string | null;
  /** Código FIFA de 3 letras (p. ej. "MEX"). Sirve para la bandera. */
  code: string | null;
  /** Para eliminatorias aún sin equipo: etiqueta tipo "W101" / "RU-A". */
  placeholder: string | null;
}

export interface Match {
  id: string;
  num: number;
  /** Hora de inicio en UTC (ISO 8601). La hora local se deriva siempre de aquí. */
  kickoffUtc: string;
  stage: string;
  group: string | null;
  idStage: string;
  home: MatchTeam;
  away: MatchTeam;
  venue: string | null;
  city: string | null;
  country: string | null;
}

export interface MatchesDoc {
  meta: {
    competition: string;
    idCompetition: string;
    idSeason: string;
    source: string;
    tz: string;
    generated: string;
    totalMatches: number;
  };
  matches: Match[];
}

/** Marcador en vivo normalizado que devuelve /api/mundial/live. */
export interface LiveScore {
  matchId: string;
  status: "SCHEDULED" | "LIVE" | "HALFTIME" | "FINISHED" | "UNKNOWN";
  /** Minuto de juego, p. ej. "67'" (vacío si no ha empezado). */
  minute: string;
  home: { code: string | null; score: number | null };
  away: { code: string | null; score: number | null };
  /** true si el dato viene de un override manual del staff (salvaguarda). */
  manual?: boolean;
  /** epoch ms en que se obtuvo (para mostrar frescura). */
  fetchedAt: number;
}
