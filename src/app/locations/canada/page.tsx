import CountryPage, { type CountryPageProps } from "@/components/CountryPage";

const data: CountryPageProps = {
  country: "Canada",
  flag: "🇨🇦",
  region: "North America",
  slug: "canada",
  h1: "AI Automation & Digital Marketing Agency | for Canadian Businesses",
  intro:
    "Sarvopaya works with Canadian businesses — from Vancouver tech startups to Toronto D2C brands — delivering AI automation, performance marketing, SEO and digital growth at competitive rates. Canada has one of the world's largest Indian diaspora communities, and the India–Canada business relationship creates natural alignment in how we work together.",
  stats: [
    { value: "EST/PST", label: "Compatible timezone windows" },
    { value: "Bilingual", label: "English + French capability" },
    { value: "65%", label: "Canadian businesses investing in AI" },
  ],
  whyUs: [
    {
      title: "North American market expertise",
      body: "Canada shares much of its digital marketing landscape with the US but has its own distinct character — bilingual requirements in Québec, strong regional identities in Vancouver, Toronto and Montréal, and a tech sector concentrated in specific clusters. We work to Canadian benchmarks and audience nuances.",
    },
    {
      title: "French–English bilingual capability",
      body: "For businesses targeting Québec or navigating federal bilingual requirements, we offer French-language content strategy, translated ad copy and bilingual website content. We understand when French-language content is legally required versus commercially advantageous.",
    },
    {
      title: "SaaS and tech sector depth",
      body: "Canada's tech clusters — Toronto's Financial District, Vancouver's Silicon North and Montréal's AI research hub — have created a strong B2B SaaS market. We understand SaaS growth levers: trial-to-paid conversion, onboarding automation, product-led growth and B2B demand generation.",
    },
    {
      title: "India–Canada connection",
      body: "Canada has one of the world's largest Indian diaspora communities. The India–Canada bilateral relationship creates natural alignment in communication, working style and cultural understanding. Many of our Canadian clients find the collaboration unusually smooth compared to their experience with purely Western vendors.",
    },
  ],
  industries: [
    "SaaS & Technology",
    "D2C E-commerce",
    "Fintech",
    "Real Estate",
    "Healthcare & MedTech",
    "Education Technology",
    "Professional Services",
    "Clean Tech",
  ],
  services: [
    { title: "AI Automation", href: "/services/ai-automation", desc: "HubSpot automation, n8n workflows and AI processes for Canadian SaaS companies and service businesses." },
    { title: "D2C Marketing", href: "/services/d2c-marketing", desc: "Meta and Google performance marketing tuned to Canadian audience benchmarks and buying behaviour." },
    { title: "SEO", href: "/services/seo", desc: "Canadian market SEO — english.ca and bilingual SEO strategy for businesses targeting French and English audiences." },
    { title: "Social Media Marketing", href: "/services/social-media-marketing", desc: "LinkedIn for B2B, Instagram and TikTok — organic and paid social for Canadian audiences." },
    { title: "Website & Digital Experience", href: "/services/website-digital-experience", desc: "Bilingual websites, landing pages and CRO for Canadian D2C and SaaS companies." },
    { title: "Growth Consulting", href: "/services/growth-consulting", desc: "GTM strategy, digital audits and growth roadmaps for Canadian startups and scaling businesses." },
  ],
  faqs: [
    {
      q: "Do you create French-language content for Québec and bilingual Canada?",
      a: "Yes. We create French-language content for ads, landing pages, social media and email — including Québécois French where appropriate versus standard French Canadian. We also advise on when bilingual content is legally required (federal institutions, regulated industries) versus when it is a commercial decision.",
    },
    {
      q: "Do you have experience with Canadian SaaS growth?",
      a: "Yes. Canada's tech sector — particularly in Toronto and Vancouver — has a strong SaaS market. We have experience with B2B SaaS demand generation, trial conversion optimisation, LinkedIn ABM for Canadian enterprise accounts and the HubSpot stack common in Canadian SaaS companies.",
    },
    {
      q: "How do you handle EST and PST timezones across Canada?",
      a: "IST is 9.5h ahead of EST and 12.5h ahead of PST. We work async-first: deliverables are ready for your morning and we take briefs in your afternoon. For live calls, we work with your morning windows. Most Canadian clients find a Tuesday-Thursday morning slot for weekly calls, which works well with our evenings.",
    },
    {
      q: "What makes Sarvopaya a better fit for Canadian businesses than a local agency?",
      a: "Cost-effectiveness is the headline benefit — Canadian full-service agencies in Toronto and Vancouver charge $8K–$30K per month for comparable scope. But beyond cost, we bring cross-market perspective: we work across USA, UK, UAE, Australia and India simultaneously, which means we see what is working across markets and bring those insights to Canadian clients.",
    },
  ],
};

export default function CanadaPage() {
  return <CountryPage {...data} />;
}
