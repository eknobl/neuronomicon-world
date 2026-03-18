import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/ilion",
        destination: "https://ilion.neuronomicon.world",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
