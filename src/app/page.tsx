import type { Metadata } from "next";
import AudienceMotion from "@/components/AudienceMotion";
import VideoShowcase from "@/components/VideoShowcase";
import TrustedBy from "@/components/TrustedBy";
import WhatWeDo from "@/components/WhatWeDo";
import WhoWeAre from "@/components/WhoWeAre";
import HowItWorks from "@/components/HowItWorks";
import RetentionRing from "@/components/RetentionRing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Sarvopaya | Digital Growth, Marketing & AI Automation Agency",
  description:
    "Sarvopaya is a digital growth partner helping businesses grow through performance marketing, SEO, website development, creative media, AI and automation.",
  alternates: {
    canonical: "https://sarvopaya.com/",
  },
  openGraph: {
    title: "Sarvopaya | Digital Growth, Marketing & AI Automation Agency",
    description:
      "Sarvopaya is a digital growth partner helping businesses grow through performance marketing, SEO, website development, creative media, AI and automation.",
    url: "https://sarvopaya.com/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sarvopaya | Digital Growth, Marketing & AI Automation Agency",
    description:
      "Sarvopaya is a digital growth partner helping businesses grow through performance marketing, SEO, website development, creative media, AI and automation.",
  },
};

export default function Home() {
  return (
    <>
      <AudienceMotion mode="homepage" />
      <VideoShowcase />
      <TrustedBy />
      <WhatWeDo />
      <WhoWeAre />
      <RetentionRing />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
