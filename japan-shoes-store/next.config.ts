import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bo.asics.co.id',
      }
    ]
  }
};

export default nextConfig;
