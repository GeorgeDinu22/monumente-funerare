import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  allowedDevOrigins: ['10.214.77.182','192.168.31.86','10.16.163.182'],

  cacheLife: {
    saptamana: {
      stale: 60 * 60 * 24 * 7,
      revalidate: 60 * 60 * 24 * 7,
      expire: 60 * 60 * 24 * 7,
    },
  },

  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    },
  },
  images: {
    remotePatterns: [new URL('https://monumente-funerare.b-cdn.net/**')],
  },
};

export default nextConfig;
