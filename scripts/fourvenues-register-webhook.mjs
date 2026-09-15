#!/usr/bin/env node
// Registra en Fourvenues el endpoint de webhooks de la web (CHECKOUT-PROPIO.md §4).
//
//   node scripts/fourvenues-register-webhook.mjs https://entradas.grupoenjoy.es/api/fourvenues/webhook
//
// Lee FOURVENUES_API_KEY y FOURVENUES_API_URL del entorno o de .env.local
// (parseo manual: cero dependencias), crea el endpoint {name:"grupoenjoy-web",
// url} y muestra el sign_secret UNA sola vez: hay que guardarlo en Vercel como
// FOURVENUES_WEBHOOK_SECRET (producción) antes de conmutar el motor a "native".
// Se niega a registrar URLs que no sean https públicas (Fourvenues no puede
// llamar a localhost). NO se ejecuta en esta fase; solo al pasar a producción.

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_BASE_URL = "https://channels-service.fourvenues.com";
const ENDPOINT_NAME = "grupoenjoy-web";

function die(message, code = 1) {
  console.error(`ERROR: ${message}`);
  process.exit(code);
}

/** KEY=VALUE por línea; comentarios, `export` y comillas simples/dobles admitidos. */
function parseEnvFile(path) {
  let text;
  try {
    text = readFileSync(path, "utf8");
  } catch {
    return {};
  }
  const out = {};
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const match = /^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/.exec(trimmed);
    if (!match) continue;
    let value = match[2].trim();
    const quoted =
      (value.startsWith('"') && value.endsWith('"') && value.length >= 2) ||
      (value.startsWith("'") && value.endsWith("'") && value.length >= 2);
    if (quoted) value = value.slice(1, -1);
    else {
      // Comentario al final de línea (" # ...") solo cuando el valor va sin comillas.
      const hash = value.indexOf(" #");
      if (hash !== -1) value = value.slice(0, hash).trim();
    }
    out[match[1]] = value;
  }
  return out;
}

const rawUrl = process.argv[2];
const force = process.argv.includes("--force");
if (!rawUrl || rawUrl.startsWith("--")) {
  die(
    "falta la URL. Uso: node scripts/fourvenues-register-webhook.mjs https://<host>/api/fourvenues/webhook [--force]",
  );
}
let target;
try {
  target = new URL(rawUrl);
} catch {
  die(`URL inválida: ${rawUrl}`);
}
if (target.protocol !== "https:" || !target.hostname.includes(".")) {
  die("solo se registran URLs https públicas (nada de http ni localhost).");
}

// El entorno del proceso manda; .env.local (junto al package.json) es el respaldo.
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fileEnv = parseEnvFile(resolve(repoRoot, ".env.local"));
const apiKey = (process.env.FOURVENUES_API_KEY ?? fileEnv.FOURVENUES_API_KEY ?? "").trim();
const baseUrl = (process.env.FOURVENUES_API_URL ?? fileEnv.FOURVENUES_API_URL ?? DEFAULT_BASE_URL)
  .trim()
  .replace(/\/+$/, "");
if (!apiKey) die("falta FOURVENUES_API_KEY (entorno o .env.local).");

async function api(path, init = {}) {
  const headers = { "X-Api-Key": apiKey, Accept: "application/json" };
  if (init.body !== undefined) headers["Content-Type"] = "application/json";
  let response;
  try {
    response = await fetch(`${baseUrl}${path}`, { ...init, headers });
  } catch (error) {
    die(`no se pudo conectar con ${baseUrl}: ${error instanceof Error ? error.message : error}`);
  }
  const text = await response.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    // no JSON
  }
  if (!response.ok) {
    const detail = json?.error ?? json?.message ?? text.slice(0, 200);
    die(`Fourvenues respondió ${response.status} en ${path}: ${detail}`);
  }
  // Las respuestas vienen envueltas en { data, success }.
  return json && typeof json === "object" && "data" in json ? json.data : json;
}

const url = target.toString();
console.log(`Fourvenues: ${baseUrl}`);
console.log(`Endpoint a registrar: ${ENDPOINT_NAME} → ${url}`);

const existing = await api("/webhooks/endpoints");
const list = Array.isArray(existing) ? existing : [];
if (list.length) {
  console.log(`Endpoints ya registrados (${list.length}):`);
  for (const e of list) console.log(`  - ${e._id ?? "?"}  ${e.name ?? ""}  ${e.url ?? ""}`);
}
const duplicate = list.find((e) => e.url === url);
if (duplicate && !force) {
  die(
    `esa URL ya está registrada (${duplicate._id}). Fourvenues no vuelve a enseñar su sign_secret: ` +
      "usa el que guardaste, bórralo desde su panel, o repite con --force para crear otro.",
    2,
  );
}

const created = await api("/webhooks/endpoints", {
  method: "POST",
  body: JSON.stringify({ name: ENDPOINT_NAME, url }),
});
if (!created || typeof created !== "object" || !created.sign_secret) {
  die(`respuesta inesperada al crear el endpoint: ${JSON.stringify(created).slice(0, 300)}`);
}

console.log("");
console.log("Endpoint creado:");
console.log(`  _id:  ${created._id}`);
console.log(`  name: ${created.name}`);
console.log(`  url:  ${created.url}`);
console.log("");
console.log("sign_secret (se muestra UNA sola vez, guárdalo ahora):");
console.log("");
console.log(`  ${created.sign_secret}`);
console.log("");
console.log("Siguientes pasos:");
console.log("  1. Vercel → proyecto de la web → Settings → Environment Variables →");
console.log("     FOURVENUES_WEBHOOK_SECRET = <sign_secret>  (entorno Production; Preview si se prueba ahí).");
console.log("     O por CLI:  vercel env add FOURVENUES_WEBHOOK_SECRET production");
console.log("  2. Redesplegar A MANO: Vercel NO redespliega al cambiar una variable de entorno.");
console.log("     Deployments → ⋯ del último deploy de producción → Redeploy (o `vercel redeploy <url> --prod`).");
console.log("  3. Comprobar: POST a la URL sin firma → 403; sin la variable → 503.");
console.log("  4. Nunca pegar el secreto en el repo ni en documentos compartidos.");
