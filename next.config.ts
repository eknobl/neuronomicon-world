import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/ilion",
        destination: "/ilion/index.html",
      },
    ];
  },
};

export default nextConfig;
