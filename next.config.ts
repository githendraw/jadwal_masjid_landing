import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: ["jadwalmasjid.com", "localhost"],
  },
};

export default nextConfig;
