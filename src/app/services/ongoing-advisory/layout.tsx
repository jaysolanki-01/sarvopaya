import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ongoing Growth Advisory & Fractional CMO Services | Sarvopaya",
  description:
    "Senior growth advisory and fractional executive guidance for founders and marketing leaders. Weekly strategic reviews, campaign course-correction, fundraising prep, and team mentorship.",
  alternates: {
    canonical: "/services/ongoing-advisory",
  },
  openGraph: {
    title: "Ongoing Growth Advisory & Fractional CMO Services | Sarvopaya",
    description:
      "A senior growth strategist in your corner. Reviewing campaigns, course-correcting ad spend, preparing for fundraising, and accelerating decision velocity.",
    url: "/services/ongoing-advisory",
    type: "website",
    siteName: "Sarvopaya",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ongoing Growth Advisory & Fractional CMO Services | Sarvopaya",
    description:
      "A senior growth strategist in your corner. Reviewing campaigns, course-correcting ad spend, preparing for fundraising, and accelerating decision velocity.",
  },
};

export default function OngoingAdvisoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
