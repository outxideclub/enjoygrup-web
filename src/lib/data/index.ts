import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

async function ensureDir(filePath: string) {
  const dir = path.dirname(filePath);
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });
}

export async function readData<T>(relativePath: string): Promise<T> {
  const filePath = path.join(DATA_DIR, relativePath);
  const raw = await readFile(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

export async function writeData<T>(relativePath: string, data: T): Promise<void> {
  const filePath = path.join(DATA_DIR, relativePath);
  await ensureDir(filePath);
  await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function readDataSafe<T>(relativePath: string, fallback: T): Promise<T> {
  try {
    return await readData<T>(relativePath);
  } catch {
    return fallback;
  }
}

// Type definitions for all data models

export interface MenuItem {
  name: string;
  description: string;
  price?: string;
}

export interface MenuSection {
  id: string;
  category: string;
  icon: string;
  subtitle?: string;
  type?: "cocktails" | "drinks";
  items: (MenuItem | string)[];
}

export interface GalleryImage {
  src: string;
  alt: string;
}

export interface VenueInfo {
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  heroImage: string;
  heroVideo?: string;
  heroPoster?: string;
  hours: string;
  address: string;
  phone: string;
  instagram: string;
  googleMaps: string;
}

export interface LegalPage {
  slug: string;
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export interface LegalSection {
  id: string;
  heading: string;
  content: string;
}
