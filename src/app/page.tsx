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
  title: "AI Automation & Growth Marketing Agency India | Sarvopaya",
  description:
    "Sarvopaya is a growth marketing agency in India combining AI automation, performance ads, and SEO to help ambitious brands generate more leads and scale revenue predictably.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AI Automation & Growth Marketing Agency India | Sarvopaya",
    description:
      "Sarvopaya is a growth marketing agency in India combining AI automation, performance ads, and SEO to help ambitious brands generate more leads and scale revenue predictably.",
    url: "/",
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
