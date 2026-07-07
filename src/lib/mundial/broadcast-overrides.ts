// ============================================================================
// AJUSTES MANUALES DE EMISIÓN — edita este fichero cuando quieras corregir
// qué partidos se retransmiten en Outxide según avancen las rondas.
//
// Por defecto la web decide sola: se emiten los partidos cuyo saque cae entre
// las 17:00 y las 23:00 (hora de Mallorca) y, si dos coinciden a la misma hora,
// gana el de mayor interés turístico (tabla TOURISM en src/lib/mundial/index.ts).
//
// Estas dos listas tienen prioridad sobre esa lógica:
//
//   FORCE_BROADCAST  → ids de partidos que SÍ se emiten, pase lo que pase
//                      (aunque caigan fuera de la franja 17–23h o pierdan
//                      su horario contra otro partido).
//
//   EXCLUDE_BROADCAST → ids de partidos que NO se emiten nunca. Si excluyes
//                      al ganador automático de un horario disputado, el otro
//                      partido de ese horario pasa a emitirse solo.
//
// ¿Dónde encuentro el id de un partido?
//   En data/mundial/matches.json (campo "id", junto a "num" y los equipos).
//   Ejemplo: la final es num 104 → id "400021542" (búscalo en el JSON).
//
// Ejemplo de uso:
//   export const FORCE_BROADCAST: string[] = ["400021537"];  // ARG–SUI aunque sea a la 1:00
//   export const EXCLUDE_BROADCAST: string[] = ["400021538"]; // no emitir ESP–BEL
//
// Después de editar: commit + push a main (Vercel despliega solo).
// ============================================================================

export const FORCE_BROADCAST: string[] = [];

export const EXCLUDE_BROADCAST: string[] = [];
