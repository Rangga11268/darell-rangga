import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  outputFileTracingRoot: path.join(__dirname),
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react", "framer-motion"],
  },
  async redirects() {
    return [
      {
        source: "/projects",
        destination: "/#projects",
        permanent: true,
      },
      {
        source: "/projects/:id*",
        destination: "/#projects",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
