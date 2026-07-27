import "server-only";
import { FourVenuesClient, type FVEvent } from "@/lib/fourvenues";

// Obtención de eventos en SERVIDOR (RSC): lee FOURVENUES_API_KEY vía el cliente,
// que ya fija next.revalidate=60 en su fetch. Aísla el acceso a env del cliente
// para que las páginas puedan renderizar los eventos en SSR (crawlables, sin
// spinner) reutilizando el mismo filtro que usaba el fetch de cliente.

/**
 * Próximos eventos de Outxide con flyer y aún no terminados, ordenados por
 * fecha de inicio. Ante cualquier fallo del upstream devuelve [] (la UI mostrará
 * el estado vacío) — nunca lanza, para no romper el render de la página.
 */
export async function getUpcomingOutxideEvents(days = 180): Promise<FVEvent[]> {
  try {
    const client = new FourVenuesClient();
    const startDate = new Date().toISOString().slice(0, 10);
    const endDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    const events = await client.getEvents(startDate, endDate);
    const now = new Date();
    return events
      .filter((e) => e.image_url && new Date(e.end_date) >= now)
      .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
  } catch {
    return [];
  }
}
