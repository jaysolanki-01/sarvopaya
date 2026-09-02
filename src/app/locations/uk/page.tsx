import CountryPage, { type CountryPageProps } from "@/components/CountryPage";

const data: CountryPageProps = {
  country: "United Kingdom",
  flag: "🇬🇧",
  region: "Europe",
  slug: "uk",
  h1: "AI Automation & Digital Marketing Agency | for UK Businesses",
  intro:
    "Sarvopaya is an AI automation and digital marketing agency serving UK businesses. GDPR-aware automation, performance marketing and SEO — without the overhead of a London agency. We deliver UK-market strategy at India pricing, with genuine knowledge of the British digital landscape.",
  stats: [
    { value: "5.5h", label: "IST / GMT timezone overlap" },
    { value: "GDPR", label: "Compliant automation" },
    { value: "50%+", label: "Saving vs London agency rates" },
  ],
  whyUs: [
    {
      title: "GDPR-compliant automation",
      body: "All automation workflows we design handle personal data in line with UK GDPR requirements. Data minimisation, purpose limitation, consent capture and audit trails are built into every workflow by default — not retrofitted. We do not build automation that creates regulatory risk.",
    },
    {
      title: "UK market knowledge",
      body: "We understand UK consumer behaviour, British ad platform benchmarks and the nuances of the post-Brexit digital landscape. UK Google Shopping, Meta UK audience sizing, Royal Mail-integrated order automation — we work to the right parameters for the British market.",
    },
    {
      title: "London rates do not apply",
      body: "London marketing agencies charge £5K–£30K per month for full-service retainers. Sarvopaya delivers comparable strategy and execution at India rates — the same quality of thinking, without the Mayfair office overhead. Your marketing budget goes significantly further.",
    },
    {
      title: "Timezone-friendly collaboration",
      body: "GMT is 5.5 hours behind IST. Our team structures deliveries to be ready for your morning and books calls in your UK afternoon. Most UK clients find the async rhythm works well — no waiting for a 3pm London standup that runs until 5.",
    },
  ],
  industries: [
    "Fintech",
    "Retail & E-commerce",
    "Professional Services",
    "Property & Real Estate",
    "SaaS & Technology",
    "Healthcare",
    "Education",
    "Fashion & Beauty",
  ],
  services: [
    { title: "AI Automation", href: "/services/ai-automation", desc: "GDPR-compliant n8n workflows, CRM automation and AI business processes for UK businesses." },
    { title: "D2C Marketing", href: "/services/d2c-marketing", desc: "Meta and Google performance marketing tuned to UK CPMs and British consumer behaviour." },
    { title: "SEO", href: "/services/seo", desc: "UK-market SEO strategy and content built to rank in google.co.uk results — not generic global SEO." },
    { title: "Social Media Marketing", href: "/services/social-media-marketing", desc: "UK-audience organic and paid social — Instagram, LinkedIn, X and TikTok." },
    { title: "Website & Digital Experience", href: "/services/website-digital-experience", desc: "Conversion-optimised websites designed for British buyer journeys and checkout behaviour." },
    { title: "Growth Consulting", href: "/services/growth-consulting", desc: "Digital audits and growth strategy for UK startups and scaling businesses." },
  ],
  faqs: [
    {
      q: "Are your automation workflows UK GDPR compliant?",
      a: "Yes. We design all automation with UK GDPR principles built in — lawful basis for processing, data minimisation, purpose limitation and appropriate retention policies. We document the data flows in each workflow so your compliance team can review them. We do not build workflows that would require a DPIA and then avoid doing one.",
    },
    {
      q: "Do you understand the UK digital advertising market?",
      a: "Yes. We work to UK-specific benchmarks — Meta UK CPMs, Google UK CPC rates and UK seasonal patterns (Black Friday, January sales, summer dips). We understand the British market and do not apply generic global benchmarks to UK campaigns.",
    },
    {
      q: "Can you help with UK-specific platforms and channels?",
      a: "We focus on the primary channels UK businesses use: Google (Search, Shopping, Display), Meta (Facebook, Instagram), LinkedIn for B2B, TikTok and email. We do not run TV or OOH — if you need those, we would point you to a specialist.",
    },
    {
      q: "How does the India–UK working relationship work in practice?",
      a: "Most of our UK clients settle into a weekly rhythm: a Monday briefing call (their afternoon, our evening), async updates via Slack through the week and deliverables ready for their Tuesday morning review. After the first fortnight, it typically feels no different from a local agency — minus the London commute.",
    },
  ],
};

export default function UKPage() {
  return <CountryPage {...data} />;
}
