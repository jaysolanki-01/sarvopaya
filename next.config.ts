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
      // /resources/blogs → /resource/blogs
      {
        source: "/resources/blogs",
        destination: "/resource/blogs",
        permanent: true,
      },
      // Shorten /resources/founders-pov/:slug → /resource/blogs/:slug
      {
        source: "/resources/founders-pov/:slug",
        destination: "/resource/blogs/:slug",
        permanent: true,
      },
      // Shorten /founders-pov/:slug → /resource/blogs/:slug
      {
        source: "/founders-pov/:slug",
        destination: "/resource/blogs/:slug",
        permanent: true,
      },
      // /resources/blog/:slug → /resource/blogs/:slug
      {
        source: "/resources/blog/:slug",
        destination: "/resource/blogs/:slug",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      // Short URLs directly serving blog posts
      {
        source: "/blog/:slug",
        destination: "/resource/blogs/:slug",
      },
      {
        source: "/blogs/:slug",
        destination: "/resource/blogs/:slug",
      },
      {
        source: "/pov/:slug",
        destination: "/resource/blogs/:slug",
      },
      {
        source: "/b/:slug",
        destination: "/resource/blogs/:slug",
      },
      {
        source: "/p/:slug",
        destination: "/resource/blogs/:slug",
      },
      // Short URLs for the blogs hub
      {
        source: "/blog",
        destination: "/resource/blogs",
      },
      {
        source: "/blogs",
        destination: "/resource/blogs",
      },
      {
        source: "/pov",
        destination: "/resource/blogs",
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
