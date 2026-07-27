import { getUpcomingOutxideEvents } from "@/lib/events.server";
import { OutxideClient } from "./outxide-client";

// Los eventos se obtienen en SERVIDOR (RSC) y se revalidan cada 60 s: quedan en
// el HTML inicial (crawlables, sin spinner). El resto de la página (hero, vídeo,
// parallax, i18n) sigue en la isla cliente OutxideClient.
export const revalidate = 60;

export default async function OutxidePage() {
  const events = await getUpcomingOutxideEvents();
  return <OutxideClient initialEvents={events} />;
}
