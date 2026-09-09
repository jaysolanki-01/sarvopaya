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
  title: "Growth Marketing Agency for Ambitious Brands | Sarvopaya",
  description:
    "We help ambitious businesses scale faster with AI automation, performance ads, and SEO. India-based, globally focused. Book a free growth audit today.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Growth Marketing Agency for Ambitious Brands | Sarvopaya",
    description:
      "We help ambitious businesses scale faster with AI automation, performance ads, and SEO. India-based, globally focused. Book a free growth audit today.",
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
