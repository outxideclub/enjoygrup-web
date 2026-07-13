// ---------------------------------------------------------------------------
// Rate limiting sencillo en memoria por clave (normalmente IP).
//
// NOTA: en despliegues serverless (Vercel) cada instancia lambda tiene su
// propia memoria, así que el límite es POR INSTANCIA, no global. Aun así
// frena el abuso básico (ráfagas contra una instancia caliente) y es mejor
// que nada; para un límite global real usar un almacén compartido
// (Upstash/Vercel KV) o reglas de rate limit del WAF.
// ---------------------------------------------------------------------------

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

// Evita que la Map crezca sin límite en instancias de larga vida
const MAX_BUCKETS = 5000;

/**
 * Devuelve true si la petición está permitida, false si supera el límite.
 *
 * @param key      Clave única (p. ej. `contact:${ip}`)
 * @param limit    Nº máximo de peticiones por ventana
 * @param windowMs Duración de la ventana en milisegundos
 */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    if (buckets.size >= MAX_BUCKETS) {
      // Purga entradas caducadas; si aun así no cabe, vacía todo (fail-open)
      for (const [k, b] of buckets) {
        if (now >= b.resetAt) buckets.delete(k);
      }
      if (buckets.size >= MAX_BUCKETS) buckets.clear();
    }
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (bucket.count >= limit) return false;
  bucket.count += 1;
  return true;
}

/** Extrae la IP del cliente de las cabeceras que ponen Vercel/Cloudflare. */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
