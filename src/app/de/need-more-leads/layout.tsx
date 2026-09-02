import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mehr Leads generieren — KI-gestützte Lead Intelligence | Sarvopaya",
  description: "Finden Sie die Käufer, die schon auf Ihrer Website sind. Sarvopaya AI liest Verhaltens-Signale, identifiziert Hochkäufer-Absichten und löst die richtige Aktion aus — bevor sie verschwinden.",
  alternates: {
    canonical: "https://sarvopaya.com/de/need-more-leads",
    languages: { de: "https://sarvopaya.com/de/need-more-leads", en: "https://sarvopaya.com/need-more-leads", "x-default": "https://sarvopaya.com/need-more-leads" },
  },
};

export default function DeNeedMoreLeadsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
