import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sarvopaya.com"),
  alternates: {
    canonical: "https://www.sarvopaya.com/de",
    languages: {
      de: "https://www.sarvopaya.com/de",
      en: "https://www.sarvopaya.com",
      "x-default": "https://www.sarvopaya.com",
    },
  },
};

export default function DeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
