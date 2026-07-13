import type { NextConfig } from "next";

// Content-Security-Policy del sitio.
// Nota: Next.js App Router y los píxeles de GA4/Meta/TikTok usan scripts
// inline, por lo que script-src necesita 'unsafe-inline' (para una CSP
// estricta habría que migrar a nonces vía middleware). Aun así aporta:
// object-src 'none', base-uri 'self', allowlist de conexiones/frames y
// bloqueo de cualquier script de dominios no listados.
// React en modo desarrollo necesita eval() (reconstrucción de callstacks);
// en producción no se usa nunca, así que solo se permite en dev.
const SCRIPT_EVAL_DEV = process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : "";

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${SCRIPT_EVAL_DEV} https://www.googletagmanager.com https://connect.facebook.net https://analytics.tiktok.com`,
  "connect-src 'self' https://*.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://analytics.tiktok.com https://www.facebook.com",
  "img-src 'self' https: data:",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "media-src 'self'",
  "frame-src https://www.google.com https://web.fourvenues.com https://www.fourvenues.com https://fourvenues.com",
  "object-src 'none'",
  "base-uri 'self'",
].join("; ");

const nextConfig: NextConfig = {
  // No exponer "X-Powered-By: Next.js" (fingerprinting del stack)
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fourvenues.com",
        pathname: "/cdn-cgi/imagedelivery/**",
      },
      {
        protocol: "https",
        hostname: "api.fifa.com",
        pathname: "/api/v3/picture/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: CONTENT_SECURITY_POLICY },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
      {
        source: "/videos/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
