import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Mehr Leads generieren, Qualifizierte Nachfrage aufbauen | Sarvopaya",
  description: "Bauen Sie einen konsistenten Fluss qualifizierter Interessenten auf. Sarvopaya kombiniert SEO, Performance Marketing und KI-Lead-Intelligence für nachhaltige Lead-Generierung.",
  alternates: {
    canonical: "https://www.sarvopaya.com/de/solutions/need-more-leads",
    languages: { de: "https://www.sarvopaya.com/de/solutions/need-more-leads", en: "https://www.sarvopaya.com/solutions/need-more-leads", "x-default": "https://www.sarvopaya.com/solutions/need-more-leads" },
  },
};
export default function L({ children }: { children: React.ReactNode }) { return <>{children}</>; }
