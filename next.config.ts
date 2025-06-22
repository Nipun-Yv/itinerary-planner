import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'r2imghtlak.mmtcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'r1imghtlak.mmtcdn.com',
      },
    ],
  },
};

export default nextConfig;
