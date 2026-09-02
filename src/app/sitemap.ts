import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

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
  { path: "/need-more-leads",                      changeFrequency: "monthly", priority: 0.7 },
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

  // Dynamic resource/blog pages — auto-updates as projects.ts grows
  const resourceEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${BASE}/resources/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...resourceEntries];
}
