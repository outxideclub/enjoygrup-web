/**
 * Rate limit en memoria por IP para el login del admin.
 *
 * LIMITACIÓN SERVERLESS: este contador vive en la memoria del proceso. En
 * Vercel cada instancia de la función tiene su propia memoria y puede
 * reciclarse en cualquier momento, así que el límite NO es global: un
 * atacante que reparta peticiones entre instancias frías puede superar el
 * tope teórico. Aun así encarece mucho la fuerza bruta casual (las
 * invocaciones consecutivas de una misma IP suelen reutilizar instancia).
 * Para un límite real y compartido hay que usar un almacén externo
 * (@upstash/ratelimit, Vercel KV) o las reglas de rate limit del
 * WAF de Vercel/Cloudflare. La mitigación principal sigue siendo una
 * ADMIN_PASSWORD larga y aleatoria (>= 20 caracteres).
 */

const WINDOW_MS = 15 * 60 * 1000; // ventana de 15 minutos
const MAX_ATTEMPTS = 5; // intentos fallidos permitidos por ventana
const FAIL_DELAY_MS = 1000; // retardo tras fallo para encarecer la fuerza bruta
const MAX_ENTRIES = 10_000; // tope de IPs registradas para no crecer sin límite

interface AttemptEntry {
  count: number;
  windowStart: number;
}

const attempts = new Map<string, AttemptEntry>();

/** Elimina entradas cuya ventana ya expiró (y protege la memoria del proceso). */
function prune(now: number): void {
  for (const [ip, entry] of attempts) {
    if (now - entry.windowStart >= WINDOW_MS) attempts.delete(ip);
  }
  // Salvaguarda: si aun así crece demasiado, se vacía (peor caso: se resetea el límite)
  if (attempts.size > MAX_ENTRIES) attempts.clear();
}

/** IP del cliente detrás del proxy de Vercel/Cloudflare. */
export function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

/** Comprueba si la IP ha agotado sus intentos en la ventana actual. */
export function isRateLimited(ip: string): { limited: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  prune(now);
  const entry = attempts.get(ip);
  if (!entry || now - entry.windowStart >= WINDOW_MS) {
    return { limited: false, retryAfterSeconds: 0 };
  }
  if (entry.count >= MAX_ATTEMPTS) {
    const retryAfterSeconds = Math.ceil((entry.windowStart + WINDOW_MS - now) / 1000);
    return { limited: true, retryAfterSeconds };
  }
  return { limited: false, retryAfterSeconds: 0 };
}

/** Registra un intento de login fallido para la IP. */
export function registerFailedAttempt(ip: string): void {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || now - entry.windowStart >= WINDOW_MS) {
    attempts.set(ip, { count: 1, windowStart: now });
    return;
  }
  entry.count++;
}

/** Limpia el contador tras un login correcto. */
export function clearAttempts(ip: string): void {
  attempts.delete(ip);
}

/** Pequeño retardo constante tras un fallo de contraseña. */
export function failDelay(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, FAIL_DELAY_MS));
}
