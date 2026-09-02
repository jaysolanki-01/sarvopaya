import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über uns — KI & Growth Marketing Agentur | Sarvopaya",
  description: "Sarvopaya vereint kreative Medien, Technologie und KI unter einem Dach. Erfahren Sie, wer wir sind, was uns antreibt und warum 50+ Marken auf uns vertrauen.",
  alternates: {
    canonical: "https://sarvopaya.com/de/about",
    languages: { de: "https://sarvopaya.com/de/about", en: "https://sarvopaya.com/about", "x-default": "https://sarvopaya.com/about" },
  },
};

export default function DeAboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
