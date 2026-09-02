import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://sarvopaya.com"),
  alternates: {
    canonical: "https://sarvopaya.com/de",
    languages: {
      de: "https://sarvopaya.com/de",
      en: "https://sarvopaya.com",
      "x-default": "https://sarvopaya.com",
    },
  },
};

export default function DeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
