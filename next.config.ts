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
      // Alias for D2C brand building guide
      {
        source: "/how-to-build-a-d2c-brand-from-scratch",
        destination: "/how-to-build-d2c-brand-from-scratch",
        permanent: true,
      },
      // Alias for D2C vs B2C guide
      {
        source: "/d2c-vs-b2c",
        destination: "/d2c-vs-b2c-guide",
        permanent: true,
      },
      // Alias for 12 marketing channels guide
      {
        source: "/12-effective-marketing-channels-for-d2c-brands",
        destination: "/d2c-marketing-channels-guide",
        permanent: true,
      },
      // Alias for First 1,000 customers guide
      {
        source: "/how-d2c-brands-can-acquire-their-first-1000-customers",
        destination: "/how-d2c-brands-acquire-first-1000-customers",
        permanent: true,
      },
      // Alias for Marketing challenges guide
      {
        source: "/the-biggest-marketing-challenges-faced-by-d2c-brands",
        destination: "/biggest-marketing-challenges-d2c-brands",
        permanent: true,
      },
      // /resources/blogs → /resource/blogs
      {
        source: "/resources/blogs",
        destination: "/resource/blogs",
        permanent: true,
      },
      // Short URLs for all blogs
      {
        source: "/resource/blogs/:slug",
        destination: "/:slug",
        permanent: true,
      },
      {
        source: "/resources/blogs/:slug",
        destination: "/:slug",
        permanent: true,
      },
      {
        source: "/resources/blog/:slug",
        destination: "/:slug",
        permanent: true,
      },
      {
        source: "/resource/blog/:slug",
        destination: "/:slug",
        permanent: true,
      },
      {
        source: "/blog/:slug",
        destination: "/:slug",
        permanent: true,
      },
      {
        source: "/blogs/:slug",
        destination: "/:slug",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      // Short URLs for Blog listing
      {
        source: "/blog",
        destination: "/resource/blogs",
      },
      {
        source: "/blogs",
        destination: "/resource/blogs",
      },
      // Short URLs for Founder's POV
      {
        source: "/pov/:slug",
        destination: "/resources/founders-pov/:slug",
      },
      {
        source: "/pov",
        destination: "/resources/founders-pov",
      },
      {
        source: "/founders-pov/:slug",
        destination: "/resources/founders-pov/:slug",
      },
      {
        source: "/founders-pov",
        destination: "/resources/founders-pov",
      },
      // GTM Strategy Expert aliases
      {
        source: "/services/go-to-market-strategy-expert",
        destination: "/services/go-to-market-startegy-expert",
      },
      {
        source: "/services/gtm",
        destination: "/services/go-to-market-startegy-expert",
      },
      {
        source: "/gtm",
        destination: "/services/go-to-market-startegy-expert",
      },
      // Website Development aliases
      {
        source: "/services/web-development",
        destination: "/services/website-development",
      },
      {
        source: "/web-development",
        destination: "/services/website-development",
      },
      // Conversion Rate Optimisation aliases
      {
        source: "/services/conversion-rate-optimisation",
        destination: "/services/Conversion-Rate-Optimisation",
      },
      {
        source: "/conversion-rate-optimisation",
        destination: "/services/Conversion-Rate-Optimisation",
      },
      {
        source: "/services/cro",
        destination: "/services/Conversion-Rate-Optimisation",
      },
      {
        source: "/cro",
        destination: "/services/Conversion-Rate-Optimisation",
      },
      // Landing Pages & Funnels aliases
      {
        source: "/services/landing-pages",
        destination: "/services/landing-pages-funnels",
      },
      {
        source: "/landing-pages",
        destination: "/services/landing-pages-funnels",
      },
      {
        source: "/services/funnels",
        destination: "/services/landing-pages-funnels",
      },
      {
        source: "/funnels",
        destination: "/services/landing-pages-funnels",
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
