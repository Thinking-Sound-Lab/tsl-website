import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "q3kusohadpqcfxz4.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
