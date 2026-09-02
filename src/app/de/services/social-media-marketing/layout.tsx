import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Social-Media-Marketing — Community, Reichweite & Umsatz | Sarvopaya",
  description: "Strategisches Social-Media-Marketing auf Instagram, LinkedIn, Facebook, YouTube und mehr. Sarvopaya baut Ihre Community auf und wandelt Follower in Kunden um.",
  alternates: {
    canonical: "https://sarvopaya.com/de/services/social-media-marketing",
    languages: { de: "https://sarvopaya.com/de/services/social-media-marketing", en: "https://sarvopaya.com/services/social-media-marketing", "x-default": "https://sarvopaya.com/services/social-media-marketing" },
  },
};
export default function L({ children }: { children: React.ReactNode }) { return <>{children}</>; }
