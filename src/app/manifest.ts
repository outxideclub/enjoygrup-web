import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Grupo Enjoy",
    short_name: "Grupo Enjoy",
    description:
      "Tres experiencias únicas en Alcúdia, Mallorca. Enjoy Terrace, Outxide Club y Hiru Food & Drinks.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
