import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über uns, KI & Growth Marketing Agentur | Sarvopaya",
  description: "Sarvopaya vereint kreative Medien, Technologie und KI unter einem Dach. Erfahren Sie, wer wir sind, was uns antreibt und warum 50+ Marken auf uns vertrauen.",
  alternates: {
    canonical: "https://www.sarvopaya.com/de/about",
    languages: { de: "https://www.sarvopaya.com/de/about", en: "https://www.sarvopaya.com/about", "x-default": "https://www.sarvopaya.com/about" },
  },
};

export default function DeAboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
