export type Category = {
  label: string;
};

export const categories: Category[] = [
  { label: "Website Development" },
  { label: "AI Automation" },
  { label: "SEO & GEO" },
  { label: "E-commerce" },
  { label: "SaaS Development" },
  { label: "UI/UX Design" },
  { label: "Mobile Apps" },
];

export type ProjectSection = {
  heading: string;
  body: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  industry: string;
  services: string[];
  image: string;
  intro: string;
  sections: ProjectSection[];
};

export const projects: Project[] = [
  {
    slug: "nova-storefront-website",
    title: "Nova Storefront — Full Website Redesign",
    category: "Website Development",
    summary:
      "A full website rebuild focused on speed, clarity, and conversion for a fast-growing D2C brand.",
    industry: "D2C Retail",
    services: ["Website & Digital Experience", "Growth Consulting"],
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
    intro:
      "Nova came to us with a five-year-old website that no longer matched the brand or the business. Traffic was healthy, but conversion had stalled and the site took over six seconds to load on mobile.",
    sections: [
      {
        heading: "1. The Challenge",
        body: "Nova's catalog had outgrown its original site architecture. Product discovery was buried three clicks deep, checkout dropped a third of shoppers before payment, and the design no longer reflected the brand's premium positioning.",
      },
      {
        heading: "2. The Approach",
        body: "We rebuilt the site from the ground up on a lightweight, component-based stack — restructuring navigation around how customers actually shop, compressing checkout to two steps, and rebuilding every template for sub-two-second load times.",
      },
      {
        heading: "3. The Result",
        body: "Within eight weeks of launch, mobile conversion rate was up 42% and average load time dropped from 6.1s to 1.8s. The new site now serves as the template for every regional storefront Nova has launched since.",
      },
    ],
  },
  {
    slug: "flowdesk-ai-automation",
    title: "FlowDesk — AI Support Automation",
    category: "AI Automation",
    summary:
      "Automated 70% of inbound support tickets with an AI workflow trained on FlowDesk's own knowledge base.",
    industry: "SaaS",
    services: ["AI & Automation", "Growth Consulting"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    intro:
      "FlowDesk's support team was drowning in repetitive tickets — password resets, billing questions, integration errors — while the hard problems waited in queue for days.",
    sections: [
      {
        heading: "1. The Challenge",
        body: "Support headcount was growing faster than the product itself, and first-response times had slipped past 24 hours during peak weeks, directly hurting renewal conversations.",
      },
      {
        heading: "2. The Approach",
        body: "We built an AI workflow trained on FlowDesk's help docs, past tickets, and product changelog, wired into their existing helpdesk so it could resolve routine requests end-to-end and hand off anything ambiguous to a human with full context attached.",
      },
      {
        heading: "3. The Result",
        body: "70% of inbound volume is now resolved without a human touch, first-response time is under four minutes, and the support team spends its time on the accounts that actually need them.",
      },
    ],
  },
  {
    slug: "brightpath-seo-geo",
    title: "BrightPath — SEO & Generative Engine Optimization",
    category: "SEO & GEO",
    summary:
      "Rebuilt technical SEO and optimized content for AI answer engines, tripling organic demo signups.",
    industry: "EdTech",
    services: ["Lead Generation & Growth Marketing"],
    image:
      "https://images.unsplash.com/photo-1607703703674-df96af81dffa?auto=format&fit=crop&w=1600&q=80",
    intro:
      "BrightPath ranked well for its brand name and nothing else. Meanwhile, prospective students were increasingly asking AI assistants for course recommendations — and BrightPath was invisible in those answers too.",
    sections: [
      {
        heading: "1. The Challenge",
        body: "Years of thin, keyword-stuffed content had left BrightPath with a large but low-quality footprint, and none of it was structured in a way that generative search engines could cite with confidence.",
      },
      {
        heading: "2. The Approach",
        body: "We audited and consolidated the content library, rebuilt cornerstone pages around real student questions, fixed the technical debt holding back crawl and indexing, and restructured key pages with clear, citable answers for both traditional and generative search.",
      },
      {
        heading: "3. The Result",
        body: "Organic demo signups tripled in five months, non-brand organic traffic grew 4x, and BrightPath now regularly appears as a cited source in AI-generated course comparisons.",
      },
    ],
  },
  {
    slug: "urbancart-ecommerce",
    title: "UrbanCart — Headless E-commerce Build",
    category: "E-commerce",
    summary:
      "A headless storefront with AI-personalized merchandising that cut cart abandonment by a third.",
    industry: "Fashion & Apparel",
    services: ["Website & Digital Experience", "AI & Automation"],
    image:
      "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=1600&q=80",
    intro:
      "UrbanCart was outgrowing its templated storefront right as it expanded into three new markets, and every new feature request meant weeks of vendor back-and-forth.",
    sections: [
      {
        heading: "1. The Challenge",
        body: "A rigid, template-locked platform meant UrbanCart couldn't run the merchandising or promotions their growth plan needed, and page speed suffered as the catalog scaled past 10,000 SKUs.",
      },
      {
        heading: "2. The Approach",
        body: "We moved UrbanCart to a headless commerce architecture, giving the team full control over the frontend, and layered in an AI merchandising engine that reorders product grids per shopper based on browsing behavior.",
      },
      {
        heading: "3. The Result",
        body: "Cart abandonment dropped by a third, average order value rose 18%, and the team now ships storefront changes in days instead of waiting on vendor release cycles.",
      },
    ],
  },
  {
    slug: "ledgerly-saas",
    title: "Ledgerly — SaaS Product Launch",
    category: "SaaS Development",
    summary:
      "Took Ledgerly from private beta to public launch with a rebuilt product and go-to-market site.",
    industry: "FinTech",
    services: ["Website & Digital Experience", "Growth Consulting"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    intro:
      "Ledgerly had strong signal from a private beta but no public-facing product story, pricing page, or onboarding flow ready for a real launch.",
    sections: [
      {
        heading: "1. The Challenge",
        body: "The beta product worked, but there was no positioning, no pricing model tested against willingness to pay, and no marketing site built to convert cold traffic into trial signups.",
      },
      {
        heading: "2. The Approach",
        body: "We ran pricing workshops with the founding team, built a marketing site around three clear buyer journeys, and designed a self-serve onboarding flow that gets a new account to first value in under ten minutes.",
      },
      {
        heading: "3. The Result",
        body: "Ledgerly's public launch converted 3.2% of site visitors to trial signups in the first month, well above the category benchmark, with zero paid spend behind it.",
      },
    ],
  },
  {
    slug: "kaira-uiux",
    title: "Kaira — UI/UX Redesign",
    category: "UI/UX Design",
    summary:
      "A ground-up UX overhaul that made a clinical scheduling product feel simple for first-time patients.",
    industry: "Healthtech",
    services: ["Website & Digital Experience"],
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?auto=format&fit=crop&w=1600&q=80",
    intro:
      "Kaira's scheduling product worked well for clinic staff but confused the patients it was meant to serve, driving a steady stream of support calls for something that should have been self-service.",
    sections: [
      {
        heading: "1. The Challenge",
        body: "Booking a first appointment required navigating clinical terminology and a multi-step form never tested with an actual patient, and drop-off before confirmation was over 50%.",
      },
      {
        heading: "2. The Approach",
        body: "We ran usability sessions with real patients, rebuilt the booking flow around plain language and progressive disclosure, and redesigned the visual system to feel calm rather than clinical.",
      },
      {
        heading: "3. The Result",
        body: "Booking completion rose from under 50% to 84%, support tickets related to scheduling dropped by more than half, and Kaira now uses the new system as their design foundation going forward.",
      },
    ],
  },
  {
    slug: "tapstack-mobile",
    title: "TapStack — Mobile App Experience",
    category: "Mobile Apps",
    summary:
      "Designed and shipped a driver-facing mobile app that cut delivery dispatch time in half.",
    industry: "Logistics",
    services: ["AI & Automation", "Website & Digital Experience"],
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=80",
    intro:
      "TapStack's drivers were coordinating routes over group chat and phone calls, with dispatch relying on spreadsheets updated by hand throughout the day.",
    sections: [
      {
        heading: "1. The Challenge",
        body: "Manual dispatch didn't scale past a handful of drivers, route changes took minutes to communicate, and there was no visibility into delivery status until a driver called it in.",
      },
      {
        heading: "2. The Approach",
        body: "We designed and built a mobile app for drivers with live route updates, one-tap status changes, and an AI-assisted dispatch view that reassigns stops automatically when a delay hits.",
      },
      {
        heading: "3. The Result",
        body: "Average dispatch time dropped by half, driver-reported errors fell sharply, and TapStack scaled from 12 to over 90 active drivers on the same operations team.",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
