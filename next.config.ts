import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/ilion",
        destination: "https://eknobl.github.io/ilion-dyson-ring/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
