/**
 * Sanitizador HTML basado en allowlist, sin dependencias externas.
 *
 * Se usa en dos capas:
 *  1. Al GUARDAR contenido editable desde el CMS (PUT /api/admin/legal).
 *  2. Al RENDERIZAR con dangerouslySetInnerHTML (páginas legales y blog).
 *
 * Enfoque: se parsea el HTML con un pequeño analizador de etiquetas y solo
 * sobreviven las etiquetas y atributos de la allowlist. Todo lo demás se
 * elimina. Es robusto frente a mayúsculas, espacios raros, separadores tipo
 * `/` (p. ej. `<img src=x/onerror=...>`), atributos sin comillas y entidades
 * HTML en URLs (`java&#115;cript:`).
 */

// Etiquetas permitidas (todo lo que no esté aquí se elimina)
const ALLOWED_TAGS = new Set([
  "p", "br", "hr", "div", "span", "blockquote", "pre", "code",
  "b", "strong", "i", "em", "u", "s", "small", "sup", "sub", "mark",
  "h1", "h2", "h3", "h4", "h5", "h6",
  "ul", "ol", "li", "dl", "dt", "dd",
  "a", "img", "figure", "figcaption",
  "table", "thead", "tbody", "tfoot", "tr", "th", "td", "caption",
]);

// Etiquetas peligrosas cuyo CONTENIDO se descarta entero (no solo la etiqueta)
const DROP_CONTENT_TAGS = new Set([
  "script", "style", "iframe", "object", "embed", "svg", "math",
  "textarea", "noscript", "template", "form", "select", "option", "title",
]);

// Atributos permitidos en cualquier etiqueta
const GLOBAL_ATTRS = new Set(["class", "title"]);

// Atributos permitidos por etiqueta (además de los globales)
const TAG_ATTRS: Record<string, Set<string>> = {
  a: new Set(["href", "target", "rel"]),
  img: new Set(["src", "alt", "width", "height", "loading"]),
  td: new Set(["colspan", "rowspan"]),
  th: new Set(["colspan", "rowspan", "scope"]),
  ol: new Set(["start", "type"]),
};

// Elementos vacíos (se serializan sin etiqueta de cierre)
const VOID_TAGS = new Set(["br", "hr", "img"]);

/** Decodifica entidades numéricas y las básicas con nombre (suficiente para validar URLs). */
function decodeEntities(value: string): string {
  return value
    .replace(/&#x([0-9a-f]+);?/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);?/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&(amp|lt|gt|quot|apos|colon|tab|newline|nbsp);/gi, (_, name) => {
      const map: Record<string, string> = {
        amp: "&", lt: "<", gt: ">", quot: '"', apos: "'",
        colon: ":", tab: "\t", newline: "\n", nbsp: " ",
      };
      return map[name.toLowerCase()] ?? "";
    });
}

/** Escapa un valor para insertarlo con seguridad en un atributo entre comillas dobles. */
function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Valida una URL de href/src. Devuelve la URL decodificada si es segura,
 * o null si debe eliminarse (javascript:, data:text/html, vbscript:, etc.).
 */
function sanitizeUrl(raw: string, allowDataImage: boolean): string | null {
  // Decodificar entidades y eliminar caracteres de control/espacios invisibles
  // que los navegadores ignoran dentro del esquema (java\tscript:)
  const decoded = decodeEntities(raw).replace(/[\u0000-\u0020\u00a0\u1680\u2000-\u200f\u2028\u2029\u202f\u205f\u3000\ufeff]/g, "");
  const lower = decoded.toLowerCase();

  // Relativas, anclas y protocol-relative
  if (/^(\/|\.\/|\.\.\/|#|\?)/.test(lower)) return decoded;
  // Esquemas seguros
  if (/^(https?|mailto|tel):/.test(lower)) return decoded;
  // Imágenes inline solo en <img src>
  if (allowDataImage && /^data:image\/(png|jpe?g|gif|webp);base64,/.test(lower)) return decoded;
  // Sin esquema (texto plano tipo "pagina.html")
  if (!/^[a-z][a-z0-9+.-]*:/.test(lower)) return decoded;
  return null;
}

interface ParsedAttr {
  name: string;
  value: string;
}

/** Parsea los atributos desde `pos` hasta el `>` de cierre. Devuelve null si la etiqueta está truncada. */
function parseAttributes(html: string, pos: number): { attrs: ParsedAttr[]; end: number; } | null {
  const attrs: ParsedAttr[] = [];
  let i = pos;
  while (i < html.length) {
    const ch = html[i];
    if (ch === ">") return { attrs, end: i + 1 };
    if (/[\s/]/.test(ch)) { i++; continue; }
    // Nombre del atributo
    const nameMatch = /^[^\s=/>]+/.exec(html.slice(i));
    if (!nameMatch) { i++; continue; }
    const name = nameMatch[0].toLowerCase();
    i += nameMatch[0].length;
    // Saltar espacios antes de un posible "="
    while (i < html.length && /\s/.test(html[i])) i++;
    let value = "";
    if (html[i] === "=") {
      i++;
      while (i < html.length && /\s/.test(html[i])) i++;
      const quote = html[i];
      if (quote === '"' || quote === "'") {
        const close = html.indexOf(quote, i + 1);
        if (close === -1) return null; // atributo sin cerrar → etiqueta truncada
        value = html.slice(i + 1, close);
        i = close + 1;
      } else {
        const valMatch = /^[^\s>]*/.exec(html.slice(i));
        value = valMatch ? valMatch[0] : "";
        i += value.length;
      }
    }
    attrs.push({ name, value });
  }
  return null; // no se encontró ">" → truncada, se descarta
}

/** Filtra y serializa los atributos permitidos de una etiqueta. */
function buildAttributes(tag: string, attrs: ParsedAttr[]): string {
  const allowed = TAG_ATTRS[tag];
  let out = "";
  let hasTarget = false;
  for (const { name, value } of attrs) {
    // Nunca permitir manejadores de eventos ni atributos de estilo/peligrosos
    if (name.startsWith("on") || name === "style" || name === "srcset" || name === "formaction") continue;
    if (!GLOBAL_ATTRS.has(name) && !(allowed && allowed.has(name))) continue;

    if (name === "href" || name === "src") {
      const safe = sanitizeUrl(value, tag === "img" && name === "src");
      if (safe === null) continue;
      out += ` ${name}="${escapeAttr(safe)}"`;
      continue;
    }
    if (name === "target") {
      // Solo valores conocidos; el rel de seguridad se añade al final
      const t = decodeEntities(value).trim().toLowerCase();
      if (t !== "_blank" && t !== "_self") continue;
      hasTarget = t === "_blank";
      out += ` target="${t}"`;
      continue;
    }
    if (name === "rel") continue; // se gestiona junto a target
    out += ` ${name}="${escapeAttr(decodeEntities(value))}"`;
  }
  // Los enlaces que abren pestaña nueva llevan siempre rel de seguridad
  if (tag === "a" && hasTarget) out += ' rel="noopener noreferrer"';
  return out;
}

/**
 * Sanitiza HTML dejando solo etiquetas y atributos de la allowlist.
 * Elimina <script>/<style>/<iframe>/<object>/<embed>/<svg> con su contenido,
 * todos los manejadores on*, y URLs javascript:/vbscript:/data:text/html.
 */
export function sanitizeHtml(html: string): string {
  let out = "";
  let i = 0;

  while (i < html.length) {
    const lt = html.indexOf("<", i);
    if (lt === -1) {
      out += html.slice(i);
      break;
    }
    out += html.slice(i, lt);

    // Comentarios: se eliminan enteros
    if (html.startsWith("<!--", lt)) {
      const close = html.indexOf("-->", lt + 4);
      i = close === -1 ? html.length : close + 3;
      continue;
    }
    // Doctype / instrucciones de procesado: se eliminan
    if (html[lt + 1] === "!" || html[lt + 1] === "?") {
      const close = html.indexOf(">", lt);
      i = close === -1 ? html.length : close + 1;
      continue;
    }

    const tagMatch = /^<(\/?)([a-zA-Z][a-zA-Z0-9-]*)/.exec(html.slice(lt));
    if (!tagMatch) {
      // "<" suelto que no abre etiqueta → se escapa como texto
      out += "&lt;";
      i = lt + 1;
      continue;
    }

    const isClosing = tagMatch[1] === "/";
    const tag = tagMatch[2].toLowerCase();
    const parsed = parseAttributes(html, lt + tagMatch[0].length);
    if (!parsed) {
      // Etiqueta truncada al final del input → se descarta el resto
      break;
    }

    if (isClosing) {
      if (ALLOWED_TAGS.has(tag) && !VOID_TAGS.has(tag)) out += `</${tag}>`;
      i = parsed.end;
      continue;
    }

    if (DROP_CONTENT_TAGS.has(tag)) {
      // Saltar también el contenido hasta la etiqueta de cierre correspondiente
      const closeRe = new RegExp(`</${tag}[\\s>]`, "i");
      const rest = html.slice(parsed.end);
      const m = closeRe.exec(rest);
      if (!m) { i = html.length; break; }
      const closeEnd = rest.indexOf(">", m.index);
      i = parsed.end + (closeEnd === -1 ? rest.length : closeEnd + 1);
      continue;
    }

    if (ALLOWED_TAGS.has(tag)) {
      const attrStr = buildAttributes(tag, parsed.attrs);
      out += VOID_TAGS.has(tag) ? `<${tag}${attrStr} />` : `<${tag}${attrStr}>`;
    }
    // Etiqueta no permitida pero inocua (font, center, u otras): se elimina
    // la etiqueta conservando su contenido textual.
    i = parsed.end;
  }

  return out;
}
