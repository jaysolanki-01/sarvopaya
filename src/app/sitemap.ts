import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { blogPosts } from "@/lib/blogPosts";

const BASE = "https://sarvopaya.com";

// Static routes — add new pages here when created
const staticRoutes: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/",                                     changeFrequency: "weekly",  priority: 1.0 },
  { path: "/about",                                changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact",                              changeFrequency: "monthly", priority: 0.8 },
  { path: "/work",                                 changeFrequency: "weekly",  priority: 0.8 },
  { path: "/industries",                           changeFrequency: "monthly", priority: 0.6 },
  { path: "/resources",                            changeFrequency: "weekly",  priority: 0.8 },
  // Services
  { path: "/services/d2c-marketing",              changeFrequency: "monthly", priority: 0.9 },
  { path: "/services/seo",                         changeFrequency: "monthly", priority: 0.9 },
  { path: "/services/social-media-marketing",     changeFrequency: "monthly", priority: 0.8 },
  { path: "/services/advertising",                 changeFrequency: "monthly", priority: 0.8 },
  { path: "/services/website-digital-experience", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services/ai-automation",              changeFrequency: "monthly", priority: 0.9 },
  { path: "/services/growth-consulting",           changeFrequency: "monthly", priority: 0.7 },
  // Solutions
  { path: "/solutions/need-more-leads",           changeFrequency: "monthly", priority: 0.7 },
  { path: "/solutions/need-more-sales",           changeFrequency: "monthly", priority: 0.7 },
  { path: "/solutions/need-better-operations",    changeFrequency: "monthly", priority: 0.7 },
  { path: "/solutions/launching-a-new-product",   changeFrequency: "monthly", priority: 0.7 },
  // Resources
  { path: "/resources/founders-pov",              changeFrequency: "weekly",  priority: 0.7 },
  // Locations hub
  { path: "/locations",                           changeFrequency: "monthly", priority: 0.7 },
  // Locations — P1 markets
  { path: "/locations/usa",                       changeFrequency: "monthly", priority: 0.8 },
  { path: "/locations/uk",                        changeFrequency: "monthly", priority: 0.8 },
  { path: "/locations/uae",                       changeFrequency: "monthly", priority: 0.8 },
  { path: "/locations/saudi-arabia",              changeFrequency: "monthly", priority: 0.8 },
  // Locations — P2 markets
  { path: "/locations/australia",                 changeFrequency: "monthly", priority: 0.7 },
  { path: "/locations/canada",                    changeFrequency: "monthly", priority: 0.7 },
  { path: "/locations/singapore",                 changeFrequency: "monthly", priority: 0.7 },
  // German mirror — /de/*
  { path: "/de",                                        changeFrequency: "weekly",  priority: 0.9 },
  { path: "/de/about",                                  changeFrequency: "monthly", priority: 0.6 },
  { path: "/de/contact",                                changeFrequency: "monthly", priority: 0.7 },
  { path: "/de/work",                                   changeFrequency: "weekly",  priority: 0.7 },
  { path: "/de/industries",                             changeFrequency: "monthly", priority: 0.6 },
  { path: "/de/resources",                              changeFrequency: "weekly",  priority: 0.7 },
  { path: "/de/need-more-leads",                        changeFrequency: "monthly", priority: 0.6 },
  // DE Services
  { path: "/de/services/d2c-marketing",                changeFrequency: "monthly", priority: 0.8 },
  { path: "/de/services/seo",                           changeFrequency: "monthly", priority: 0.8 },
  { path: "/de/services/social-media-marketing",       changeFrequency: "monthly", priority: 0.7 },
  { path: "/de/services/advertising",                   changeFrequency: "monthly", priority: 0.7 },
  { path: "/de/services/website-digital-experience",   changeFrequency: "monthly", priority: 0.7 },
  { path: "/de/services/ai-automation",                changeFrequency: "monthly", priority: 0.8 },
  { path: "/de/services/growth-consulting",             changeFrequency: "monthly", priority: 0.6 },
  // DE Solutions
  { path: "/de/solutions/need-more-leads",             changeFrequency: "monthly", priority: 0.6 },
  { path: "/de/solutions/need-more-sales",             changeFrequency: "monthly", priority: 0.6 },
  { path: "/de/solutions/need-better-operations",      changeFrequency: "monthly", priority: 0.6 },
  { path: "/de/solutions/launching-a-new-product",     changeFrequency: "monthly", priority: 0.6 },
  // DE Locations
  { path: "/de/locations",                             changeFrequency: "monthly", priority: 0.6 },
  { path: "/de/locations/usa",                         changeFrequency: "monthly", priority: 0.7 },
  { path: "/de/locations/uk",                          changeFrequency: "monthly", priority: 0.7 },
  { path: "/de/locations/uae",                         changeFrequency: "monthly", priority: 0.7 },
  { path: "/de/locations/saudi-arabia",                changeFrequency: "monthly", priority: 0.7 },
  { path: "/de/locations/australia",                   changeFrequency: "monthly", priority: 0.6 },
  { path: "/de/locations/canada",                      changeFrequency: "monthly", priority: 0.6 },
  { path: "/de/locations/singapore",                   changeFrequency: "monthly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  // Dynamic resource/portfolio pages — auto-updates as projects.ts grows
  const resourceEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${BASE}/resources/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Dynamic blog posts — auto-updates as blogPosts.ts grows
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE}/resources/founders-pov/${post.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...resourceEntries, ...blogEntries];
}
