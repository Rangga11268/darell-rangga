import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  optimizePackageImports: ["@phosphor-icons/react", "framer-motion"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "ghchart.rshah.org",
      },
      {
        protocol: "https",
        hostname: "i.scdn.co", // Keeping just in case, but primary switch to Unsplash
      },
    ],
  },
};

export default nextConfig;
