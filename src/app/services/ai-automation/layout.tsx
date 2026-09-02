import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Automation Agency | AI Workflow & n8n Automation | Sarvopaya",
  description:
    "Sarvopaya is an AI automation agency. We build AI-powered workflows using n8n, Make, and custom LLM integrations to automate marketing, operations, support and lead generation for businesses worldwide.",
  keywords: [
    "AI automation agency",
    "AI automation services",
    "n8n automation agency",
    "n8n automation services",
    "marketing automation agency",
    "business process automation",
    "AI workflow automation",
    "AI automation company India",
  ],
  alternates: {
    canonical: "/services/ai-automation",
    languages: {
      "en": "https://sarvopaya.com/services/ai-automation",
      "x-default": "https://sarvopaya.com/services/ai-automation",
    },
  },
  openGraph: {
    title: "AI Automation Agency | AI Workflow & n8n Automation | Sarvopaya",
    description:
      "Build AI-powered automation that removes manual work from marketing, sales, operations and support. Sarvopaya designs and deploys custom AI workflows for businesses of all sizes.",
    url: "/services/ai-automation",
  },
};

export default function AIAutomationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
