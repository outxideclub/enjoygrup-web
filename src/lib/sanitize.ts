/**
 * Lightweight HTML sanitizer for trusted content (our own blog posts & legal pages).
 * Strips <script> tags and inline event handlers without requiring jsdom/DOMPurify.
 * Only use for content we control — NOT for user-generated content.
 */
export function sanitizeHtml(html: string): string {
  return html
    // Remove <script> blocks
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    // Remove on* event handlers (onclick, onerror, etc.)
    .replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/gi, "")
    // Remove javascript: protocol in href/src attributes
    .replace(/(?:href|src)\s*=\s*(?:"javascript:[^"]*"|'javascript:[^']*')/gi, "");
}
