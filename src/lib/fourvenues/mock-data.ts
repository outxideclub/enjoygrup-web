// ---------------------------------------------------------------------------
// FourVenues API - Mock data for local development & testing
// ---------------------------------------------------------------------------

import type { FourVenuesEvent, Venue } from "./types";

// ---------------------------------------------------------------------------
// Venues
// ---------------------------------------------------------------------------

export const MOCK_VENUE: Venue = {
  id: "venue-outxide-001",
  name: "Outxide Club",
  address: "Av. Tucà, 1, 07400 Alcúdia, Mallorca",
  capacity: 1200,
};

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

export const MOCK_EVENTS: FourVenuesEvent[] = [
  {
    id: "evt-001",
    title: "NEON PARADISE -- Opening Summer 2026",
    date: "2026-06-07",
    time: "23:30",
    description:
      "The summer season kicks off with a massive opening party. Two rooms, world-class production, and a lineup that will set the tone for the hottest months of the year.",
    image: "/images/events/neon-paradise.jpg",
    genre: "Tech House / Melodic Techno",
    dj: "Paco Osuna",
    ticketUrl: "https://fourvenues.com/outxide/neon-paradise",
    price: 18,
    venue: MOCK_VENUE,
    status: "published",
    tickets: [
      { id: "tkt-001a", name: "Early Bird", price: 18, available: 42, maxPerPurchase: 4 },
      { id: "tkt-001b", name: "General", price: 25, available: 300, maxPerPurchase: 6 },
      { id: "tkt-001c", name: "VIP Table (4 pax)", price: 200, available: 8, maxPerPurchase: 2 },
    ],
  },
  {
    id: "evt-002",
    title: "DARK FREQUENCIES",
    date: "2026-06-14",
    time: "00:00",
    description:
      "Pure underground energy. Expect hard-hitting techno from dusk till dawn in an industrial stage design that transforms the main room into a Berlin-inspired warehouse.",
    image: "/images/events/dark-frequencies.jpg",
    genre: "Techno / Industrial",
    dj: "DYEN",
    ticketUrl: "https://fourvenues.com/outxide/dark-frequencies",
    price: 15,
    venue: MOCK_VENUE,
    status: "published",
    tickets: [
      { id: "tkt-002a", name: "Anticipada", price: 15, available: 110, maxPerPurchase: 4 },
      { id: "tkt-002b", name: "General", price: 22, available: 400, maxPerPurchase: 6 },
    ],
  },
  {
    id: "evt-003",
    title: "RITMO LATINO -- Reggaeton & Dembow Night",
    date: "2026-06-21",
    time: "23:00",
    description:
      "The biggest urban night in town. Reggaeton classics, dembow, and the latest hits with live percussion and a full LED stage show.",
    image: "/images/events/ritmo-latino.jpg",
    genre: "Reggaeton / Dembow",
    dj: "DJ Nano",
    ticketUrl: "https://fourvenues.com/outxide/ritmo-latino",
    price: 12,
    venue: MOCK_VENUE,
    status: "published",
    tickets: [
      { id: "tkt-003a", name: "Lista", price: 0, available: 200, maxPerPurchase: 2 },
      { id: "tkt-003b", name: "General", price: 12, available: 500, maxPerPurchase: 6 },
      { id: "tkt-003c", name: "VIP Reservado", price: 150, available: 10, maxPerPurchase: 2 },
    ],
  },
  {
    id: "evt-004",
    title: "AFTERLIFE presents: Tale of Us",
    date: "2026-07-05",
    time: "23:00",
    description:
      "An immersive audiovisual journey curated by the Afterlife label. Ethereal melodies meet driving basslines in a once-in-a-summer experience.",
    image: "/images/events/afterlife.jpg",
    genre: "Melodic Techno / Progressive",
    dj: "Tale of Us",
    ticketUrl: "https://fourvenues.com/outxide/afterlife-tale-of-us",
    price: 35,
    venue: MOCK_VENUE,
    status: "published",
    tickets: [
      { id: "tkt-004a", name: "Tier 1", price: 35, available: 0, maxPerPurchase: 4 },
      { id: "tkt-004b", name: "Tier 2", price: 45, available: 85, maxPerPurchase: 4 },
      { id: "tkt-004c", name: "VIP Backstage", price: 120, available: 15, maxPerPurchase: 2 },
    ],
  },
  {
    id: "evt-005",
    title: "FOAM PARTY -- Summer Madness",
    date: "2026-07-12",
    time: "22:00",
    description:
      "The legendary foam party returns. Commercial hits, the best house anthems, and tonnes of foam on the outdoor terrace. Dress code: white.",
    image: "/images/events/foam-party.jpg",
    genre: "Commercial / House",
    dj: "Resident DJs",
    ticketUrl: "https://fourvenues.com/outxide/foam-party",
    price: 10,
    venue: MOCK_VENUE,
    status: "published",
    tickets: [
      { id: "tkt-005a", name: "Anticipada", price: 10, available: 350, maxPerPurchase: 6 },
      { id: "tkt-005b", name: "Taquilla", price: 18, available: 600, maxPerPurchase: 6 },
    ],
  },
  {
    id: "evt-006",
    title: "ELROW -- Psychedelic Trip",
    date: "2026-07-26",
    time: "16:00",
    description:
      "The iconic Elrow experience lands at Outxide for a special daytime-to-night marathon. Expect wild costumes, confetti, inflatables, and non-stop dancing across three stages.",
    image: "/images/events/elrow.jpg",
    genre: "Tech House / House",
    dj: "Luuk Van Dijk b2b Dennis Cruz",
    ticketUrl: "https://fourvenues.com/outxide/elrow-psychedelic",
    price: 40,
    venue: MOCK_VENUE,
    status: "published",
    tickets: [
      { id: "tkt-006a", name: "Early Bird", price: 40, available: 0, maxPerPurchase: 4 },
      { id: "tkt-006b", name: "Regular", price: 55, available: 120, maxPerPurchase: 4 },
      { id: "tkt-006c", name: "VIP All-Inclusive", price: 180, available: 20, maxPerPurchase: 2 },
    ],
  },
];
