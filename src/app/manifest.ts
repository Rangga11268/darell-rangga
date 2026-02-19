import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Darell Rangga | Fullstack Developer Portfolio",
    short_name: "Darell Rangga",
    description:
      "Portfolio interaktif Darell Rangga - Fullstack Developer Indonesia spesialisasi React, Next.js, dan Laravel.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#4d28d0",
    orientation: "portrait-primary",
    scope: "/",
    lang: "id",
    categories: ["portfolio", "developer", "technology"],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
