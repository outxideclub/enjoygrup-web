// Léxico PROHIBIDO en /empresas (página destino de anuncios de Meta).
//
// Reglas del dueño que no se rompen: la bebida nunca es el gancho, nada de
// urgencia falsa ni de cantidades de plazas, y nada de shisha (sería publicidad
// de tabaco). Esta lista es la red de seguridad para lo que se rellena A MANO
// más adelante —los textos aprobados (content.ts) y la oferta (offer.ts)—: si
// un texto la incumple, NO se pinta y la página se queda con el texto neutro.
// El e2e (e2e/empresas.spec.ts) comprueba lo mismo sobre la página servida.
//
// Se compara sin acentos y en minúsculas, por palabra completa.

const FORBIDDEN_PATTERNS: readonly RegExp[] = [
  /\bbarra libre\b/,
  /\bcopas? incluidas?\b/,
  // «copa/copas como gancho»: en un texto de esta página no hay uso legítimo.
  /\bcopas?\b/,
  /\bchupitos?\b/,
  /\bbotellas?\b/,
  /\b2 ?x ?1\b/,
  /\bhappy hour\b/,
  /\bultimas plazas\b/,
  /\bplazas limitadas\b/,
  /\bquedan\b/,
  /\bshisha\b/,
  /\bcachimbas?\b/,
  // «Qué NO poner» del paquete creativo (CREATIVO-LANDING-EMPRESAS.md §6,
  // 20-oct-2026): la bebida como gancho (la web usa «cóctel» y «mixología» en
  // Enjoy, aquí no), cenas en nuestras salas («menú»: la empresa come o cena
  // donde quiere), conducción, urgencia o cupo, léxico vetado en destinos de
  // pago («oficial») y la campaña de Halloween (otra identidad).
  /\bcocteles?\b/,
  /\bcocktails?\b/,
  /\bmixologia\b/,
  /\bfree bar\b/,
  /\bmenus?\b/,
  /\bcoche\b/,
  /\btaxis?\b/,
  /\bse llenan\b/,
  /\bultimas\b/,
  /\bagotad[oa]s?\b/,
  /\boficial(?:es)?\b/,
  /\binsidious\b/,
  /\bpuerta roja\b/,
  // Equivalentes en los otros idiomas de la web.
  /\bopen bar\b/,
  /\bfree drinks?\b/,
  /\bshots?\b/,
  /\bbottles?\b/,
  /\bflaschen?\b/,
  /\bfreigetranke?\b/,
  /\bbouteilles?\b/,
  /\bbottiglie?\b/,
];

/**
 * Minúsculas y sin acentos («Últimas» → «ultimas»). Las marcas diacríticas
 * combinantes (U+0300–U+036F) se quitan por número y no con un escape \u en
 * un literal regex, como en src/lib/checkout/validation.ts.
 */
function normalize(text: string): string {
  let out = "";
  for (const ch of text.normalize("NFD")) {
    const cp = ch.codePointAt(0) ?? 0;
    if (cp < 0x0300 || cp > 0x036f) out += ch;
  }
  return out.toLowerCase();
}

/** ¿El texto contiene algún término prohibido? */
export function hasForbiddenLexicon(text: string): boolean {
  const t = normalize(text);
  return FORBIDDEN_PATTERNS.some((re) => re.test(t));
}
