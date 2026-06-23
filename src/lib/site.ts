import contactData from "../../data/site/contact.json";

/**
 * Site-wide contact / social data. Single source of truth for phone numbers,
 * emails, WhatsApp and Instagram links shown across the public site.
 *
 * This is the build-time snapshot (imported JSON). The admin panel edits the
 * same file at `data/site/contact.json` and commits it to GitHub, which
 * triggers a redeploy that re-bundles these values.
 */

export interface VenueContact {
  phone: string;
  instagram: string;
  mapsUrl: string;
}

export interface SiteContact {
  general: {
    email: string;
    privacyEmail: string;
    phone: string;
    whatsapp: string;
  };
  venues: {
    enjoy: VenueContact;
    outxide: VenueContact;
    hiru: VenueContact;
  };
}

export const siteContact: SiteContact = contactData;

/** `+34 971 853 932` → `tel:+34971853932` */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

/** `+34 657 87 89 17` → `https://wa.me/34657878917` */
export function waHref(phone: string): string {
  return `https://wa.me/${phone.replace(/[^\d]/g, "")}`;
}
