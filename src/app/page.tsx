import type { Metadata } from "next";
import AudienceMotion from "@/components/AudienceMotion";
import VideoShowcase from "@/components/VideoShowcase";
import TrustedBy from "@/components/TrustedBy";
import WhatWeDo from "@/components/WhatWeDo";
import WhoWeAre from "@/components/WhoWeAre";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = {
  title: "Sarvopaya We Move the Right Audiences",
  description:
    "Creative media, technology and AI company helping ambitious brands generate leads, build high-converting websites, automate operations with AI, and grow revenue predictably.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sarvopaya We Move the Right Audiences",
    description:
      "Creative media, technology and AI company helping ambitious brands generate leads, build high-converting websites, automate operations with AI, and grow revenue predictably.",
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
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
