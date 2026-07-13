import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { commitFile, isGitHubConfigured } from "@/lib/github";

const DATA_DIR = path.join(process.cwd(), "data");

async function ensureDir(filePath: string) {
  const dir = path.dirname(filePath);
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });
}

/** Resuelve una ruta relativa DENTRO de data/ y rechaza cualquier escape (../ etc.). */
function resolveDataPath(relativePath: string): string {
  const filePath = path.resolve(DATA_DIR, relativePath);
  if (!filePath.startsWith(path.resolve(DATA_DIR) + path.sep)) {
    throw new Error(`Ruta fuera de data/: ${relativePath}`);
  }
  return filePath;
}

export async function readData<T>(relativePath: string): Promise<T> {
  const raw = await readFile(resolveDataPath(relativePath), "utf-8");
  return JSON.parse(raw) as T;
}

export async function writeData<T>(
  relativePath: string,
  data: T,
  commitMessage?: string,
): Promise<void> {
  const json = JSON.stringify(data, null, 2);
  // In production (Vercel) the filesystem is read-only, so persist by committing
  // to the repo when GitHub is configured. Vercel then redeploys with the change.
  if (isGitHubConfigured()) {
    await commitFile(
      `data/${relativePath}`,
      `${json}\n`,
      commitMessage ?? `chore(admin): actualizar data/${relativePath}`,
    );
    return;
  }
  // Local development: write straight to disk for instant iteration.
  const filePath = resolveDataPath(relativePath);
  await ensureDir(filePath);
  await writeFile(filePath, json, "utf-8");
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
  description?: string;
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
