"use client";

import { useEffect } from "react";

// Sólo se activa si falla el propio root layout (raro). Debe ser autónomo:
// reemplaza <html>/<body>, así que no puede usar el layout ni el i18n de la app.
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Global render error:", error);
  }, [error]);

  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#fff",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: 420 }}>
          <h1 style={{ fontSize: 24, marginBottom: 12 }}>Algo ha ido mal · Something went wrong</h1>
          <p style={{ color: "#a1a1a1", marginBottom: 28, lineHeight: 1.6 }}>
            Ha ocurrido un error inesperado. / An unexpected error occurred.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              background: "#fff",
              color: "#000",
              border: "none",
              borderRadius: 999,
              padding: "12px 28px",
              fontSize: 15,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Reintentar · Try again
          </button>
        </div>
      </body>
    </html>
  );
}
