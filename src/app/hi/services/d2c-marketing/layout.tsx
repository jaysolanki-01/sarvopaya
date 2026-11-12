import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "D2C मार्केटिंग एजेंसी भारत | परफॉर्मेंस मार्केटिंग | Sarvopaya",
  },
  description:
    "Sarvopaya भारत की प्रमुख D2C मार्केटिंग एजेंसी है। हम फुल-फनल परफॉर्मेंस मार्केटिंग, ट्रैकिंग इन्फ्रास्ट्रक्चर, क्रिएटिव टेस्टिंग और कस्टमर रिटेंशन में विशेषज्ञ हैं।",
  keywords: [
    "D2C मार्केटिंग एजेंसी",
    "D2C मार्केटिंग एजेंसी भारत",
    "परफॉर्मेंस मार्केटिंग D2C",
    "डायरेक्ट टू कंज्यूमर मार्केटिंग",
    "D2C ईकॉमर्स मार्केटिंग",
    "Meta Ads D2C",
    "Google Ads ecommerce",
    "server-side tracking CAPI",
    "ROAS ऑप्टिमाइजेशन",
    "ecommerce growth agency India",
  ],
  authors: [{ name: "Jay Solanki", url: "https://www.sarvopaya.com/about" }],
  creator: "Sarvopaya",
  publisher: "Sarvopaya",
  alternates: {
    canonical: "https://www.sarvopaya.com/hi/services/d2c-marketing",
    languages: {
      "x-default": "https://www.sarvopaya.com/services/d2c-marketing",
      "en-IN": "https://www.sarvopaya.com/services/d2c-marketing",
      "en-US": "https://www.sarvopaya.com/en-us/services/d2c-marketing",
      "en-GB": "https://www.sarvopaya.com/en-gb/services/d2c-marketing",
      "en-AE": "https://www.sarvopaya.com/en-ae/services/d2c-marketing",
      "hi": "https://www.sarvopaya.com/hi/services/d2c-marketing",
      "de": "https://www.sarvopaya.com/de/services/d2c-marketing",
      "nl": "https://www.sarvopaya.com/nl/services/d2c-marketing",
      "fr": "https://www.sarvopaya.com/fr/services/d2c-marketing",
      "pt": "https://www.sarvopaya.com/pt/services/d2c-marketing",
    },
  },
  openGraph: {
    type: "website",
    locale: "hi_IN",
    siteName: "Sarvopaya",
    title: "D2C मार्केटिंग एजेंसी भारत | परफॉर्मेंस मार्केटिंग | Sarvopaya",
    description:
      "भारत की फुल-फनल D2C मार्केटिंग एजेंसी। Server-side ट्रैकिंग, क्रिएटिव टेस्टिंग, मल्टी-चैनल मीडिया बाइंग और मापने योग्य नेट रेवेन्यू।",
    url: "https://www.sarvopaya.com/hi/services/d2c-marketing",
    images: [
      {
        url: "https://www.sarvopaya.com/images/Main_icon.png",
        width: 1200,
        height: 630,
        alt: "Sarvopaya - D2C Marketing Agency India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "D2C मार्केटिंग एजेंसी भारत | परफॉर्मेंस मार्केटिंग | Sarvopaya",
    description:
      "भारत की फुल-फनल D2C मार्केटिंग एजेंसी। Server-side ट्रैकिंग, क्रिएटिव टेस्टिंग, मल्टी-चैनल मीडिया बाइंग और मापने योग्य नेट रेवेन्यू।",
    images: ["https://www.sarvopaya.com/images/Main_icon.png"],
    creator: "@sarvopaya",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
