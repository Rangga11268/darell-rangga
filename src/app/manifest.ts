import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rangga | Digital Operations Center",
    short_name: "Rangga Portfolio",
    description:
      "Portfolio of Darell Rangga, Frontend Developer and UI/UX Enthusiast.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#4d28d0",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
