import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/pricing',
        destination: '/',
        permanent: true,
      },
      {
        source: '/research',
        destination: '/',
        permanent: true,
      },
      {
        source: '/research/:slug*',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
