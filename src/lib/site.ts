import contactData from "../../data/site/contact.json";

/**
 * Site-wide contact / social data. Single source of truth for phone numbers,
 * emails and Instagram links shown across the public site.
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

/** `https://www.instagram.com/outxide.club/` → `https://ig.me/m/outxide.club` (abre el DM). */
export function igDmHref(instagramUrl: string): string {
  const handle = instagramUrl.match(/instagram\.com\/([^/?]+)/)?.[1] ?? "";
  return handle ? `https://ig.me/m/${handle}` : instagramUrl;
}
