import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      // Old performance-marketing URL → new d2c-marketing
      {
        source: "/services/performance-marketing",
        destination: "/services/d2c-marketing",
        permanent: true,
      },
      // /need-more-leads → canonical solutions hierarchy
      {
        source: "/need-more-leads",
        destination: "/solutions/need-more-leads",
        permanent: true,
      },
      // /privacy → /privacy-policy
      {
        source: "/privacy",
        destination: "/privacy-policy",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
