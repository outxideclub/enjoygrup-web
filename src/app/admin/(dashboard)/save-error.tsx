"use client";

/**
 * Error de guardado compartido por las páginas del panel de administración.
 * Ante un 401 (sesión caducada) NO se redirige a /admin/login — se perderían
 * los cambios en memoria del admin — sino que se muestra un enlace para
 * re-loguearse en otra pestaña y volver a guardar.
 */
export interface SaveError {
  sessionExpired?: boolean;
  message?: string;
}

/** Traduce una respuesta fallida del API en un SaveError mostrable. */
export async function saveErrorFromResponse(
  res: Response,
  fallback: string,
): Promise<SaveError> {
  if (res.status === 401) return { sessionExpired: true };
  const data = await res.json().catch(() => null);
  const message =
    data && typeof data.error === "string" && data.error ? data.error : fallback;
  return { message: `${message} (HTTP ${res.status})` };
}

export function SaveErrorBanner({ error }: { error: SaveError | null }) {
  if (!error) return null;
  return (
    <div className="mb-6 rounded-lg border border-red-900/50 bg-red-950/40 px-4 py-3 text-sm text-red-300">
      {error.sessionExpired ? (
        <>
          Tu sesión ha caducado y los cambios NO se han guardado.{" "}
          <a
            href="/admin/login"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline hover:text-red-200"
          >
            Vuelve a iniciar sesión en otra pestaña
          </a>{" "}
          y pulsa Guardar de nuevo. No cierres esta pestaña para no perder los cambios.
        </>
      ) : (
        error.message
      )}
    </div>
  );
}
