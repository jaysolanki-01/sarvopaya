"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import CTAButton from "@/components/CTAButton";
import Testimonials from "@/components/Testimonials";
import AudienceMotion from "@/components/AudienceMotion";
import {
  InstagramIcon,
  FacebookIcon,
  LinkedInIcon,
  YoutubeIcon,
  MegaphoneIcon,
  ChartIcon,
  TargetIcon,
  StarIcon,
  BoltIcon,
  RocketIcon,
  SearchIcon,
  GlobeIcon,
  GearIcon,
  FunnelIcon,
  LayersIcon,
  CursorClickIcon,
} from "@/components/icons";
import type { ComponentType } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

// ─── Data ────────────────────────────────────────────────────────────────────

const growthSystem = [
  {
    step: "01",
    icon: SearchIcon,
    title: "Research",
    summary: "Audience intelligence, competitor analysis, social listening.",
    purpose:
      "We start with data, not assumptions. We map your audience's behaviour, study what's working for competitors, and identify the content gaps your brand can own.",
  },
  {
    step: "02",
    icon: TargetIcon,
    title: "Strategy",
    summary: "Platform selection, content mix, campaign architecture.",
    purpose:
      "We build a 90-day roadmap that defines which platforms you should be on, what content to produce, and how paid amplification fits your customer journey.",
  },
  {
    step: "03",
    icon: LayersIcon,
    title: "Content",
    summary: "Copywriting, design, short-form video, creative direction.",
    purpose:
      "Every asset is built around a content role, authority, education, proof, or conversion, not just filling a calendar. Quality and intent over volume.",
  },
  {
    step: "04",
    icon: GlobeIcon,
    title: "Distribution",
    summary: "Publishing, scheduling, platform-native optimisation.",
    purpose:
      "Right content on the right platform at the right time. We optimise each post for the platform's native algorithm and audience behaviour.",
  },
  {
    step: "05",
    icon: MegaphoneIcon,
    title: "Community",
    summary: "Engagement, DMs, comments, brand reputation.",
    purpose:
      "Social media is a two-way channel. We manage conversations, build relationships, and turn engaged followers into qualified leads.",
  },
  {
    step: "06",
    icon: BoltIcon,
    title: "Paid Amplification",
    summary: "Boost organic reach, retarget warm audiences, acquire new customers.",
    purpose:
      "Organic builds the foundation. Paid scales what works. We use paid social to amplify your best content and convert audiences already familiar with your brand.",
  },
  {
    step: "07",
    icon: ChartIcon,
    title: "Measurement",
    summary: "KPIs, analytics, attribution, business outcomes.",
    purpose:
      "We track what matters for your business, not just reach and likes, but pipeline contribution, lead quality, and cost of customer acquisition.",
  },
  {
    step: "08",
    icon: GearIcon,
    title: "Optimisation",
    summary: "Monthly reviews, A/B testing, strategic pivots.",
    purpose:
      "Every month, we analyse performance, identify what moved the needle, and adjust the strategy. Social media is not set-and-forget.",
  },
];

type Service = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  what: string;
  how: string;
  why: string;
};

const services: Service[] = [
  {
    icon: TargetIcon,
    title: "Social Media Strategy",
    what: "A documented plan connecting your social media activity to business objectives.",
    how: "We audit your current presence, define platform priorities, map your content mix to your sales cycle, and build a clear roadmap with measurable goals.",
    why: "Without strategy, social media becomes activity without direction. Strategy is what separates brands that grow from brands that just post.",
  },
  {
    icon: LayersIcon,
    title: "Content Strategy",
    what: "A framework for what to create, why to create it, and how to make it land.",
    how: "We define content pillars, build an editorial calendar, and assign each piece of content a role, authority, education, proof, engagement, or conversion.",
    why: "Content without a job is wasted budget. Every post should be doing something useful for your brand or your audience.",
  },
  {
    icon: GearIcon,
    title: "Social Media Management",
    what: "End-to-end management of your social presence across chosen platforms.",
    how: "Monthly content calendars, daily publishing, community management, and weekly performance check-ins, all handled by a dedicated team that understands your brand.",
    why: "Consistency is the compounding force behind social media growth. An inconsistent presence signals an unreliable brand.",
  },
  {
    icon: StarIcon,
    title: "Creative Direction",
    what: "Visual identity and creative standards that make your brand immediately recognisable.",
    how: "We define your visual language, colour, typography, motion, photography style, and apply it consistently across every asset we produce.",
    why: "In a crowded feed, brands that look distinctive get noticed. Brands that look generic get scrolled past.",
  },
  {
    icon: YoutubeIcon,
    title: "Short-Form Video",
    what: "Reels, Shorts, and TikTok-style content built for retention and reach.",
    how: "We script, brief, and produce short-form video content designed to perform on each platform, not repurposed content stretched to fit.",
    why: "Short-form video consistently outperforms static content on reach. It is the primary discovery format in 2026.",
  },
  {
    icon: MegaphoneIcon,
    title: "Copywriting",
    what: "Captions, headlines, and scripts that get people to stop, read, and act.",
    how: "Every caption, carousel, and ad script is written to a brief, with a clear audience, clear message, and clear desired action.",
    why: "Weak copy kills strong creative. Most brands underinvest in copy and wonder why their content doesn't convert.",
  },
  {
    icon: GlobeIcon,
    title: "Community Management",
    what: "Active, human management of your audience interactions.",
    how: "We respond to comments, manage DMs, handle brand mentions, and build the two-way relationship that turns followers into advocates.",
    why: "Engagement signals tell algorithms your content is worth distributing. Community management keeps your brand present and responsive.",
  },
  {
    icon: CursorClickIcon,
    title: "Influencer Marketing",
    what: "Partnerships with relevant creators to extend reach and build credibility.",
    how: "We identify, vet, and brief creators who have genuine audiences in your niche, then manage the relationship from brief to final approval.",
    why: "Audience-borrowed trust converts faster than brand-earned trust. A credible creator vouching for your brand is a shortcut to consideration.",
  },
  {
    icon: FunnelIcon,
    title: "Paid Social Advertising",
    what: "Performance campaigns on Meta, LinkedIn, YouTube, and other platforms.",
    how: "We build and manage paid social campaigns, audience targeting, creative testing, budget allocation, and ongoing optimisation, with a focus on cost-effective customer acquisition.",
    why: "Organic reach has limits. Paid amplification removes the ceiling and lets you scale what's working.",
  },
  {
    icon: ChartIcon,
    title: "Social Media Analytics",
    what: "Regular reporting that converts data into actionable decisions.",
    how: "Monthly performance reports covering reach, engagement, demand signals, and business outcomes, with clear commentary and recommendations, not just dashboards.",
    why: "Data without interpretation is noise. Analytics should answer one question: what do we do differently next month?",
  },
  {
    icon: RocketIcon,
    title: "Personal Branding",
    what: "Building authority and audience around a founder, executive, or expert.",
    how: "We develop a personal content strategy, create and ghostwrite posts, and build a consistent presence on LinkedIn or other platforms suited to the individual.",
    why: "People trust people before they trust companies. A visible founder accelerates brand credibility and inbound.",
  },
];

type Platform = {
  icon: ComponentType<{ className?: string }>;
  name: string;
  bestFor: string;
  when: string;
  notFor: string;
  formats: string[];
};

const platforms: Platform[] = [
  {
    icon: InstagramIcon,
    name: "Instagram",
    bestFor: "Visual storytelling, brand discovery, D2C and lifestyle brands.",
    when: "When your product or service has strong visual appeal and your audience uses Instagram for discovery and inspiration. B2C brands, food, fashion, beauty, wellness, hospitality, and creator-economy products.",
    notFor: "Complex B2B sales with long decision cycles and senior decision-makers who aren't active on the platform.",
    formats: ["Reels", "Carousels", "Stories", "Static posts", "DMs for conversion"],
  },
  {
    icon: LinkedInIcon,
    name: "LinkedIn",
    bestFor: "B2B authority, founder positioning, lead generation, thought leadership.",
    when: "When you're selling to businesses, professionals, or decision-makers. If your buyer is a founder, manager, director, or C-suite, LinkedIn is the highest-intent B2B platform available.",
    notFor: "Impulse purchase products and highly visual consumer brands with no professional angle.",
    formats: ["Text posts", "Document carousels", "Short-form video", "Newsletters", "Lead Gen Forms"],
  },
  {
    icon: YoutubeIcon,
    name: "YouTube",
    bestFor: "Long-form education, search visibility, brand authority, evergreen content.",
    when: "When your audience needs to understand something before buying, complex products, professional services, SaaS, education, and industries where trust is built through demonstrated expertise.",
    notFor: "Brands with no capacity for regular video production or those needing fast results.",
    formats: ["Long-form explainers", "Tutorials", "Case studies", "Shorts", "Webinar recordings"],
  },
  {
    icon: FacebookIcon,
    name: "Facebook",
    bestFor: "Community, remarketing, local business, and broader audience reach.",
    when: "When you have an existing audience to retarget, you're running local campaigns, or you want to build a community around a product or interest. Facebook Groups remain one of the strongest organic community formats available.",
    notFor: "Brands targeting Gen Z exclusively or trying to drive organic discovery without paid support.",
    formats: ["Groups", "Ads", "Video", "Events", "Marketplace"],
  },
];

type Industry = {
  label: string;
  objective: string;
  platforms: string;
  content: string;
  conversion: string;
};

const industries: Industry[] = [
  {
    label: "B2B / SaaS",
    objective: "Generate qualified pipeline, position as category authority, support longer sales cycles.",
    platforms: "LinkedIn primary, YouTube secondary, Twitter/X for niche communities.",
    content: "Thought leadership, product education, founder content, customer case studies, industry data.",
    conversion: "Lead magnet downloads, webinar registrations, demo requests, LinkedIn Lead Gen Forms.",
  },
  {
    label: "D2C / Ecommerce",
    objective: "Drive product discovery, build brand preference, reduce cost-per-acquisition.",
    platforms: "Instagram primary, TikTok for reach, Facebook for retargeting and remarketing.",
    content: "Product content, UGC, unboxings, before-and-after, creator partnerships, value content.",
    conversion: "Direct product links, retargeting ads, DM-to-sale flows, WhatsApp follow-up.",
  },
  {
    label: "Professional Services",
    objective: "Build trust and authority, demonstrate expertise, generate qualified inbound inquiries.",
    platforms: "LinkedIn primary, Instagram or YouTube depending on audience.",
    content: "Insight posts, client outcomes (anonymised), process transparency, founder perspective, FAQs.",
    conversion: "Consultation booking, contact form, discovery calls via LinkedIn DM.",
  },
  {
    label: "Real Estate",
    objective: "Showcase listings and expertise, build local authority, generate buyer and seller inquiries.",
    platforms: "Instagram and Facebook for property content, YouTube for area and market guides.",
    content: "Property tours, market updates, buyer/seller tips, local neighbourhood content.",
    conversion: "WhatsApp inquiries, DMs, form submissions, call bookings.",
  },
  {
    label: "Education",
    objective: "Demonstrate learning outcomes, build trust with students and parents, drive enrolment.",
    platforms: "YouTube for long-form, Instagram for community, LinkedIn for professional programmes.",
    content: "Student success stories, course previews, educator content, free value samples.",
    conversion: "Free class registration, information request forms, WhatsApp or DM inquiries.",
  },
  {
    label: "Local Business",
    objective: "Build local visibility, drive footfall, create community loyalty.",
    platforms: "Instagram for discovery, Facebook for community and local ads, Google Business for reviews.",
    content: "Behind-the-scenes, staff stories, product/service highlights, community involvement, offers.",
    conversion: "Location visits, phone calls, WhatsApp, online bookings, direct messages.",
  },
];

type ContentPillar = {
  label: string;
  purpose: string;
  examples: string[];
  stage: string;
};

const contentPillars: ContentPillar[] = [
  {
    label: "Authority",
    purpose: "Position your brand as the credible, knowledgeable option in your category.",
    examples: ["Industry insights", "Founder perspective", "Market analysis", "Expert opinion"],
    stage: "Awareness",
  },
  {
    label: "Education",
    purpose: "Answer the questions your audience is already asking, build trust before the sale.",
    examples: ["How-to content", "Common mistakes", "Explainer carousels", "FAQ videos"],
    stage: "Consideration",
  },
  {
    label: "Proof",
    purpose: "Show that you've delivered results, for other people, in situations your audience recognises.",
    examples: ["Case studies", "Client outcomes", "Before-and-after", "Reviews", "UGC"],
    stage: "Consideration & Conversion",
  },
  {
    label: "Engagement",
    purpose: "Create content that invites participation and builds community around your brand.",
    examples: ["Polls", "Questions", "Relatable observations", "Behind the scenes", "Memes"],
    stage: "All stages",
  },
  {
    label: "Conversion",
    purpose: "Move your warm audience to take a specific action, a clear, low-friction next step.",
    examples: ["Offer announcements", "Consultation CTAs", "Product drops", "Lead magnets", "Free sessions"],
    stage: "Decision",
  },
];

const measurementTiers = [
  {
    label: "Awareness",
    color: "bg-white/10",
    metrics: ["Reach", "Impressions", "Video Views", "Follower Growth", "Share of Voice"],
    meaning: "Is our brand getting in front of the right people?",
  },
  {
    label: "Engagement",
    color: "bg-accent/20",
    metrics: ["Shares", "Saves", "Comments", "Engagement Rate", "Click-through Rate"],
    meaning: "Is our content resonating with the audience we're reaching?",
  },
  {
    label: "Demand",
    color: "bg-white/5",
    metrics: ["Website Visits", "Profile Visits", "WhatsApp Clicks", "Lead Form Submissions", "DM Inquiries"],
    meaning: "Is social media creating interest and intent to buy?",
  },
  {
    label: "Business",
    color: "bg-accent/30",
    metrics: ["Qualified Leads", "Customer Acquisition Cost", "Conversion Rate", "Revenue Influenced", "ROAS"],
    meaning: "Is social media contributing to real commercial outcomes?",
  },
];

const whyUs = [
  {
    title: "Strategy before execution",
    description: "We do not start creating content until there is a clear strategy. Every piece of content has a job. Every platform is chosen deliberately.",
  },
  {
    title: "Business-focused metrics",
    description: "We report on what matters to your business, leads, pipeline, and cost of acquisition, not just reach and likes.",
  },
  {
    title: "Platform-specific thinking",
    description: "What works on LinkedIn will not work on Instagram. We build platform-native content strategies, not repurposed output.",
  },
  {
    title: "Creative and performance integrated",
    description: "Our content team and paid media team work from the same strategy, so organic and paid social work together, not in parallel.",
  },
  {
    title: "Transparent reporting",
    description: "Monthly reports with plain-English commentary. No vanity metrics. No padding. You'll always know what happened and why.",
  },
  {
    title: "Continuous optimisation",
    description: "Social media is not set-and-forget. We review performance every month and adjust what isn't working, rather than repeating the same approach.",
  },
];

const faqData = [
  {
    question: "What is social media marketing?",
    answer:
      "Social media marketing is the practice of using social platforms, Instagram, LinkedIn, Facebook, YouTube, and others, to build brand awareness, engage an audience, and drive business outcomes such as leads, sales, or customer retention. Done well, it is a system that creates demand, not just content.",
  },
  {
    question: "What does a social media marketing agency actually do?",
    answer:
      "A good agency builds a social media strategy aligned with your business goals, creates content designed to attract and convert your target audience, manages your platforms day-to-day, runs paid social campaigns, and reports on performance with actionable insights, not just likes and followers.",
  },
  {
    question: "How much does social media marketing cost?",
    answer:
      "Costs vary significantly based on scope, platforms, content volume, and whether paid advertising is included. Most agencies work on monthly retainers. At Sarvopaya, we scope each engagement based on your objectives and budget, there is no fixed price because there is no one-size-fits-all strategy.",
  },
  {
    question: "How long does social media marketing take to work?",
    answer:
      "Organic social media is a compounding channel, it typically takes 60–90 days to build meaningful momentum and 6–12 months to see significant business impact. Paid social can generate results faster, often within the first two weeks. We set 30/60/90-day milestones at the start of every engagement so expectations are always clear.",
  },
  {
    question: "What is the difference between social media marketing and social media management?",
    answer:
      "Social media management is the operational layer, publishing content, responding to comments, maintaining your presence. Social media marketing is the strategic layer, building an audience, running campaigns, generating leads, and contributing to revenue. Management without marketing keeps you active. Marketing with management grows your business.",
  },
  {
    question: "Which social media platform is best for my business?",
    answer:
      "It depends on your audience, business model, and objective. LinkedIn is the most effective B2B platform. Instagram works well for B2C and visual brands. YouTube is the strongest platform for authority building and search visibility. Facebook is most useful for community, local business, and remarketing. The right answer is specific to your situation, which is why we start with research.",
  },
  {
    question: "Can social media actually generate leads?",
    answer:
      "Yes, but not through passive posting. Lead generation from social media requires a clear audience, content with a point of view, consistent distribution, and a specific call to action that moves people to the next step. LinkedIn, Meta, and YouTube all have formats specifically designed for lead capture. Organic social can also generate inbound DMs and inquiries from a warm audience.",
  },
  {
    question: "How do you measure social media ROI?",
    answer:
      "We break measurement into four layers: Awareness (reach, impressions, video views), Engagement (shares, saves, comments), Demand (website visits, inquiries, WhatsApp clicks), and Business (qualified leads, CAC, conversion rate, revenue). The most important metrics depend on your objective. For a brand-building campaign, reach and engagement matter most. For a lead generation campaign, cost-per-lead and conversion rate are the numbers that count.",
  },
  {
    question: "Does social media help with SEO?",
    answer:
      "Social media does not directly influence Google rankings, social signals are not confirmed ranking factors. However, consistent social media activity supports SEO indirectly: it drives traffic to your website, increases brand search volume, earns backlinks when content gets shared, and builds the brand signals that contribute to a stronger overall digital presence.",
  },
  {
    question: "What is GEO and why does it matter for social media?",
    answer:
      "Generative Engine Optimisation (GEO) is the practice of building your brand's presence so it is easier for AI systems, like Google's AI Overviews, ChatGPT, Gemini, and Perplexity, to understand and potentially surface when users ask relevant questions. Social media contributes to GEO by building consistent brand signals, demonstrating topical relevance, and creating content that gets cited, shared, and referenced across the web. We cannot guarantee that AI systems will cite any specific brand, but a consistent, coherent digital presence improves your chances.",
  },
  {
    question: "How often should a business post on social media?",
    answer:
      "Consistency matters more than frequency. Posting three times per week with strong creative and strategy will outperform posting daily with weak content. That said, most platforms reward regular publishing: LinkedIn responds well to 3–5 posts per week for personal profiles, Instagram to 4–6 feed posts per month with daily stories, and YouTube to at least one video per week for channel growth.",
  },
  {
    question: "Should we use paid advertising alongside organic social?",
    answer:
      "For most businesses, yes. Organic social builds trust, authority, and a warm audience over time. Paid social amplifies what's working, reaches cold audiences at scale, and accelerates results. The most effective approach integrates both: organic content fills the top of funnel and builds the retargeting audience, while paid converts that audience more efficiently.",
  },
  {
    question: "Do you work with businesses that have no social media presence yet?",
    answer:
      "Yes. Starting from zero is often an advantage, there are no bad habits, outdated branding, or inconsistent content to undo. We set up your profiles, build your visual identity for social, develop your content strategy, and launch properly rather than patching what's already broken.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10">
      <motion.span
        animate={{ rotate: open ? 45 : 0 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="relative flex h-8 w-8 items-center justify-center"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={open ? "text-accent" : "text-black"}
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </motion.span>
    </span>
  );
}

function SectionLabel({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ${
        dark ? "border-white/10 text-white/60" : "border-black/10 text-black/60"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {children}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SocialMediaMarketingPage() {
  const [activeService, setActiveService] = useState<number | null>(0);
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const activeInd = industries[activeIndustry];

  return (
    <>
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Social Media Marketing",
            provider: {
              "@type": "Organization",
              name: "Sarvopaya",
              url: "https://sarvopaya.com",
            },
            description:
              "Social media marketing services including strategy, content creation, community management, paid social advertising, and analytics, designed to build brand authority and generate measurable business outcomes.",
            areaServed: "IN",
            serviceType: "Social Media Marketing",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqData.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://sarvopaya.com" },
              { "@type": "ListItem", position: 2, name: "Services", item: "https://sarvopaya.com/services" },
              {
                "@type": "ListItem",
                position: 3,
                name: "Social Media Marketing",
                item: "https://sarvopaya.com/services/social-media-marketing",
              },
            ],
          }),
        }}
      />

      {/* ── Section 1: Hero ─────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[calc(100dvh-4rem)] w-full items-center overflow-hidden bg-white">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 select-none whitespace-nowrap text-[120px] font-bold uppercase leading-none text-transparent sm:text-[190px] lg:text-[260px]"
          style={{ WebkitTextStroke: "1px rgba(0,0,0,0.06)" }}
        >
          SOCIAL
        </span>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Social Media Marketing Agency</SectionLabel>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-black sm:text-6xl lg:text-7xl"
          >
            Social Media That Builds{" "}
            <span className="text-accent">Demand, Authority,</span>
            <br />
            and Revenue
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-black/60 sm:text-xl"
          >
            We don&apos;t manage your social media calendar. We build a social presence
            designed to create consistent attention, earn audience trust, and generate
            measurable business outcomes, for brands that want growth, not just activity.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <div className="w-full sm:w-auto">
              <CTAButton href="/contact" variant="primary" size="lg" fullWidth>
                Book a Strategy Call
              </CTAButton>
            </div>
            <div className="w-full sm:w-auto">
              <CTAButton href="#what-we-do" variant="outline" size="lg" fullWidth>
                See What We Do
              </CTAButton>
            </div>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-8 text-sm text-black/40"
          >
            Working with B2B, D2C, and professional service brands across India.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Section 2: The Problem ───────────────────────────────────────────── */}
      <section className="w-full bg-neutral-50 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl"
          >
            <motion.div variants={item}>
              <SectionLabel>The Real Problem</SectionLabel>
            </motion.div>
            <motion.h2
              variants={item}
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl"
            >
              Posting consistently doesn&apos;t mean{" "}
              <span className="text-accent">growing consistently.</span>
            </motion.h2>
            <motion.p variants={item} className="mt-4 max-w-2xl text-base leading-7 text-black/60">
              Most businesses already understand they need to be on social media. The problem
              is that activity is not the same as strategy. And strategy is what actually
              drives growth.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={container}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {/* Problem side */}
            <motion.div
              variants={item}
              className="rounded-3xl border border-black/10 bg-white p-8"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-black/30">
                What most brands do
              </p>
              <h3 className="mt-4 text-xl font-bold text-black">Just Posting Content</h3>
              <ul className="mt-6 flex flex-col gap-4">
                {[
                  "Content without a defined audience or goal",
                  "Followers who have no intent to buy",
                  "Reach that never turns into website visits",
                  "Engagement that feels good but means nothing commercially",
                  "Metrics reported monthly that no one acts on",
                  "Platform presence that has no connection to the sales pipeline",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-black/60">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-black/5 text-black/30">
                      ✕
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Solution side */}
            <motion.div
              variants={item}
              className="rounded-3xl bg-black p-8"
            >
              <p className="text-xs font-bold uppercase tracking-widest text-white/30">
                What a system looks like
              </p>
              <h3 className="mt-4 text-xl font-bold text-white">
                Building a Social Media Growth System
              </h3>
              <ul className="mt-6 flex flex-col gap-4">
                {[
                  "Research-backed strategy with clear platform rationale",
                  "Content built to attract the audience most likely to buy",
                  "Distribution designed to turn reach into website intent",
                  "Community management that converts conversations into leads",
                  "Paid amplification that scales what organic has proven",
                  "Monthly reporting that drives the next month's decisions",
                ].map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-white/70">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                      ✓
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── AudienceMotion interactive experience ─────────────────────────────── */}
      <AudienceMotion />

      {/* ── Section 3: Growth System ─────────────────────────────────────────── */}
      <section className="w-full bg-black py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl"
          >
            <motion.div variants={item}>
              <SectionLabel dark>Our Approach</SectionLabel>
            </motion.div>
            <motion.h2
              variants={item}
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              The Social Media{" "}
              <span className="text-accent">Growth System</span>
            </motion.h2>
            <motion.p variants={item} className="mt-4 max-w-xl text-base leading-7 text-white/60">
              Eight interconnected steps from research to revenue. Each step has a clear
              business purpose, not just a deliverable.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={container}
            className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {growthSystem.map((step) => (
              <motion.div
                key={step.step}
                variants={item}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors duration-500 hover:border-accent/30 hover:bg-accent/10"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -top-5 font-heading text-[5rem] font-bold leading-none text-white/[0.04]"
                >
                  {step.step}
                </span>
                <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white transition-colors duration-500 group-hover:bg-accent group-hover:text-white">
                  <step.icon className="h-6 w-6" />
                </span>
                <h3 className="relative mt-5 font-heading text-base font-bold text-white">
                  {step.title}
                </h3>
                <p className="relative mt-1 text-xs font-semibold uppercase tracking-wider text-accent">
                  {step.summary}
                </p>
                <p className="relative mt-3 text-sm leading-6 text-white/50">
                  {step.purpose}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Section 4: What We Do ────────────────────────────────────────────── */}
      <section id="what-we-do" className="w-full scroll-mt-20 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl"
          >
            <motion.div variants={item}>
              <SectionLabel>Services</SectionLabel>
            </motion.div>
            <motion.h2
              variants={item}
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl"
            >
              What We Do:{" "}
              <span className="text-accent">And Why It Matters</span>
            </motion.h2>
            <motion.p variants={item} className="mt-4 max-w-xl text-base leading-7 text-black/60">
              Every service has a strategic role. We don&apos;t offer things to fill a proposal.
              We offer what your growth actually requires.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: EASE }}
            onMouseLeave={() => setActiveService(null)}
            className="mt-10 border-t border-black/20"
          >
            {services.map((service, index) => {
              const isActive = activeService === index;
              return (
                <div
                  key={service.title}
                  onMouseEnter={() => setActiveService(index)}
                  onClick={() => setActiveService(index)}
                  className="cursor-pointer border-b border-black/20 py-7 transition-colors"
                >
                  <div className="flex items-center gap-3 sm:gap-8">
                    <span className="w-8 shrink-0 font-heading text-sm font-bold text-black/30 sm:w-16 sm:text-lg">
                      ({String(index + 1).padStart(2, "0")})
                    </span>
                    <motion.div
                      layout
                      transition={{ duration: 0.5, ease: EASE }}
                      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-black ${
                        isActive ? "h-16 w-24 sm:h-40 sm:w-64" : "h-10 w-16 sm:h-16 sm:w-24"
                      }`}
                    >
                      <service.icon
                        className={`text-white/20 transition-all duration-500 ${
                          isActive ? "h-14 w-14 sm:h-16 sm:w-16" : "h-7 w-7"
                        }`}
                      />
                    </motion.div>
                    <h3
                      className={`font-heading font-bold uppercase tracking-tight transition-all duration-500 ${
                        isActive
                          ? "text-lg text-black sm:text-3xl lg:text-4xl"
                          : "text-base text-black/40 sm:text-2xl"
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
                      className="mt-6 pl-10 sm:pl-[6.5rem]"
                    >
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-widest text-black/30">
                            What it is
                          </p>
                          <p className="mt-2 text-sm leading-6 text-black/70">{service.what}</p>
                        </div>
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-widest text-black/30">
                            What we do
                          </p>
                          <p className="mt-2 text-sm leading-6 text-black/70">{service.how}</p>
                        </div>
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-widest text-black/30">
                            Why it matters
                          </p>
                          <p className="mt-2 text-sm leading-6 text-black/70">{service.why}</p>
                        </div>
                      </div>
                      <div className="mt-6">
                        <CTAButton href="/contact" variant="primary" size="sm">
                          Discuss This Service
                        </CTAButton>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Section 5: Platform Strategy ─────────────────────────────────────── */}
      <section className="w-full bg-neutral-50 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl"
          >
            <motion.div variants={item}>
              <SectionLabel>Platform Strategy</SectionLabel>
            </motion.div>
            <motion.h2
              variants={item}
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl"
            >
              Not every platform is{" "}
              <span className="text-accent">right for every business.</span>
            </motion.h2>
            <motion.p variants={item} className="mt-4 max-w-2xl text-base leading-7 text-black/60">
              Platform selection should be based on your audience, business model, content format,
              sales cycle, and objective, not because a competitor is there or because a platform
              is currently trending. We help you focus where it matters.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={container}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {platforms.map((platform) => (
              <motion.div
                key={platform.name}
                variants={item}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-black/5"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black/[0.04] text-black transition-colors duration-500 group-hover:bg-black group-hover:text-white">
                    <platform.icon className="h-7 w-7" />
                  </span>
                  <h3 className="font-heading text-xl font-bold text-black">{platform.name}</h3>
                </div>

                <div className="mt-6 flex flex-col gap-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-black/30">
                      Use it when
                    </p>
                    <p className="mt-1.5 text-sm leading-6 text-black/70">{platform.when}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-black/30">
                      Less suited for
                    </p>
                    <p className="mt-1.5 text-sm leading-6 text-black/60">{platform.notFor}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-black/30">
                      Key formats
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {platform.formats.map((f) => (
                        <span
                          key={f}
                          className="rounded-full border border-black/10 px-3 py-1 text-[11px] font-semibold text-black/50"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Section 6: Industry Strategies ───────────────────────────────────── */}
      <section className="w-full bg-black py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl"
          >
            <motion.div variants={item}>
              <SectionLabel dark>Business Models</SectionLabel>
            </motion.div>
            <motion.h2
              variants={item}
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Strategy changes with{" "}
              <span className="text-accent">your business model.</span>
            </motion.h2>
            <motion.p variants={item} className="mt-4 max-w-xl text-base leading-7 text-white/60">
              A D2C brand and a B2B SaaS company both need social media, but the strategy,
              platforms, content, and conversion approach are completely different.
            </motion.p>
          </motion.div>

          {/* Tab selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mt-10 flex flex-wrap gap-2"
          >
            {industries.map((ind, i) => (
              <button
                key={ind.label}
                onClick={() => setActiveIndustry(i)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  activeIndustry === i
                    ? "border-accent bg-accent text-white"
                    : "border-white/20 text-white/60 hover:border-white/40 hover:text-white"
                }`}
              >
                {ind.label}
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeInd.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {[
                { label: "Primary Objective", value: activeInd.objective },
                { label: "Recommended Platforms", value: activeInd.platforms },
                { label: "Content Direction", value: activeInd.content },
                { label: "Conversion Approach", value: activeInd.conversion },
              ].map((block) => (
                <div
                  key={block.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <p className="text-[11px] font-bold uppercase tracking-widest text-accent">
                    {block.label}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/70">{block.value}</p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Section 7: Content Strategy ───────────────────────────────────────── */}
      <section className="w-full bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl"
          >
            <motion.div variants={item}>
              <SectionLabel>Content Framework</SectionLabel>
            </motion.div>
            <motion.h2
              variants={item}
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl"
            >
              Every post should have{" "}
              <span className="text-accent">a job to do.</span>
            </motion.h2>
            <motion.p variants={item} className="mt-4 max-w-2xl text-base leading-7 text-black/60">
              We structure content into five strategic categories, each serving a different
              audience mindset and stage in the buying journey. The mix shifts based on where
              your brand is in its growth and what the data is telling us month to month.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={container}
            className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          >
            {contentPillars.map((pillar, i) => (
              <motion.div
                key={pillar.label}
                variants={item}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-black/5"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -top-5 font-heading text-[5rem] font-bold leading-none text-black/[0.03]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-accent">
                  {pillar.stage}
                </span>
                <h3 className="relative mt-4 font-heading text-lg font-bold text-black">
                  {pillar.label}
                </h3>
                <p className="relative mt-2 text-sm leading-6 text-black/60">{pillar.purpose}</p>
                <ul className="relative mt-4 flex flex-col gap-1.5">
                  {pillar.examples.map((ex) => (
                    <li key={ex} className="text-xs text-black/40">
                      · {ex}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Section 8: Social + GEO ───────────────────────────────────────────── */}
      <section className="w-full bg-neutral-50 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div variants={item}>
                <SectionLabel>GEO</SectionLabel>
              </motion.div>
              <motion.h2
                variants={item}
                className="mt-6 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl"
              >
                Social media and the future of{" "}
                <span className="text-accent">brand discoverability.</span>
              </motion.h2>
              <motion.div variants={item} className="mt-6 flex flex-col gap-4 text-base leading-7 text-black/60">
                <p>
                  Generative Engine Optimisation (GEO) refers to building your brand&apos;s
                  presence in a way that makes it easier for AI systems, including Google AI
                  Overviews, ChatGPT, Gemini, and Perplexity, to understand who you are,
                  what you do, and who you serve.
                </p>
                <p>
                  Social media plays an indirect but meaningful role in this. Consistent,
                  coherent content across your platforms reinforces your brand as a recognisable
                  entity associated with specific topics, industries, and expertise. When your
                  LinkedIn posts, Instagram content, YouTube videos, and website all speak about
                  the same things in the same voice, AI systems have more signals to work with.
                </p>
                <p>
                  We cannot guarantee that any AI system will cite your brand. But we can help
                  you build the kind of consistent, credible digital presence that gives you a
                  better chance of being surfaced when it matters.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.p
                variants={item}
                className="text-sm font-bold uppercase tracking-wider text-black/40"
              >
                Where brand signals come from
              </motion.p>
              <motion.div variants={item} className="mt-6 flex flex-col gap-3">
                {[
                  { channel: "Website", signal: "Primary entity definition, service pages, blog content" },
                  { channel: "LinkedIn", signal: "Industry authority, professional context, thought leadership" },
                  { channel: "Instagram & Facebook", signal: "Brand personality, community, visual identity" },
                  { channel: "YouTube", signal: "Educational depth, search visibility, credibility signals" },
                  { channel: "Industry Publications", signal: "Third-party validation and external citations" },
                  { channel: "Digital PR", signal: "Brand mentions, coverage, earned media" },
                  { channel: "Reviews", signal: "Trust signals and sentiment data for brand entities" },
                  { channel: "Communities & Forums", signal: "Topic association and peer-to-peer reference" },
                ].map((row) => (
                  <div
                    key={row.channel}
                    className="flex items-start gap-4 rounded-xl border border-black/10 bg-white px-5 py-4"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-accent text-[10px] font-bold text-white">
                      ↗
                    </span>
                    <div>
                      <p className="text-sm font-bold text-black">{row.channel}</p>
                      <p className="mt-0.5 text-xs leading-5 text-black/50">{row.signal}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 9: Search-First Content ──────────────────────────────────── */}
      <section className="w-full bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div variants={item}>
                <SectionLabel>Search-First Content</SectionLabel>
              </motion.div>
              <motion.h2
                variants={item}
                className="mt-6 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl"
              >
                The best content answers{" "}
                <span className="text-accent">questions people are already asking.</span>
              </motion.h2>
              <motion.div variants={item} className="mt-6 flex flex-col gap-4 text-base leading-7 text-black/60">
                <p>
                  We use search data, social listening, and platform analytics to identify the
                  real questions your audience is asking, then build content around genuine demand
                  rather than guesswork.
                </p>
                <p>
                  This means your social media content has relevance beyond the platform it was
                  posted on. It supports your SEO, informs your paid ad creative, and creates a
                  consistent brand presence across every channel your audience uses.
                </p>
                <p>
                  Tools like Google Search Console, Meta Audience Insights, and LinkedIn Analytics
                  all contribute data that shapes what we create, not just what performed well last
                  month, but what your audience is actively seeking.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.p
                variants={item}
                className="text-sm font-bold uppercase tracking-wider text-black/40"
              >
                Real questions your audience is asking
              </motion.p>
              <motion.div variants={item} className="mt-6 flex flex-col gap-3">
                {[
                  "How much does social media marketing cost?",
                  "Does Instagram marketing work for B2B?",
                  "How often should a business post on LinkedIn?",
                  "How do you measure social media ROI?",
                  "Can social media generate leads?",
                  "Is organic social media still effective?",
                  "Which social media platform is best for my business?",
                  "What is the difference between social media marketing and management?",
                ].map((q) => (
                  <div
                    key={q}
                    className="flex items-start gap-3 rounded-xl border border-black/10 bg-neutral-50 px-5 py-4"
                  >
                    <SearchIcon className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <p className="text-sm text-black/70">{q}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 10: Measurement Framework ────────────────────────────────── */}
      <section className="w-full bg-black py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl"
          >
            <motion.div variants={item}>
              <SectionLabel dark>Measurement</SectionLabel>
            </motion.div>
            <motion.h2
              variants={item}
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Metrics that connect to{" "}
              <span className="text-accent">your business, not a dashboard.</span>
            </motion.h2>
            <motion.p variants={item} className="mt-4 max-w-xl text-base leading-7 text-white/60">
              Reach and likes are not business outcomes. We measure social media performance
              across four layers, from awareness to revenue, and weight each based on what
              your business actually needs.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={container}
            className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {measurementTiers.map((tier) => (
              <motion.div
                key={tier.label}
                variants={item}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <span className="inline-flex self-start rounded-full bg-accent/20 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-accent">
                  {tier.label}
                </span>
                <p className="mt-4 text-sm italic leading-6 text-white/40">{tier.meaning}</p>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {tier.metrics.map((m) => (
                    <li key={m} className="flex items-center gap-2.5 text-sm text-white/70">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {m}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Section 11: Reporting + Insights ─────────────────────────────────── */}
      <section className="w-full bg-neutral-50 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div variants={item}>
                <SectionLabel>Reporting</SectionLabel>
              </motion.div>
              <motion.h2
                variants={item}
                className="mt-6 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl"
              >
                Reports that drive{" "}
                <span className="text-accent">decisions, not archives.</span>
              </motion.h2>
              <motion.div variants={item} className="mt-6 flex flex-col gap-4 text-base leading-7 text-black/60">
                <p>
                  Most social media reports answer the question: what happened? We build
                  reports that answer: what do we do about it?
                </p>
                <p>
                  Every monthly report includes a performance summary, clear commentary on what
                  worked and what didn&apos;t, and specific recommendations for the next 30 days.
                  The objective is to turn data into decisions.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div variants={item} className="flex flex-col gap-4">
                <p className="text-sm font-bold uppercase tracking-wider text-black/40">
                  Our reporting loop
                </p>
                {[
                  { step: "Data", desc: "Pull performance data from all active platforms and paid channels." },
                  { step: "Insight", desc: "Identify what the data is actually saying, beyond the numbers." },
                  { step: "Hypothesis", desc: "Form a clear belief about why something is or isn't working." },
                  { step: "Test", desc: "Design a specific change in content, format, targeting, or timing." },
                  { step: "Optimisation", desc: "Apply the finding to the next cycle and measure the impact." },
                ].map((row, i) => (
                  <div key={row.step} className="flex items-start gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
                      {i + 1}
                    </span>
                    <div className="flex-1 rounded-xl border border-black/10 bg-white px-5 py-4">
                      <p className="text-sm font-bold text-black">{row.step}</p>
                      <p className="mt-0.5 text-xs leading-5 text-black/50">{row.desc}</p>
                    </div>
                  </div>
                ))}
                <p className="mt-2 text-xs text-black/40">
                  We use Meta Ads Manager, LinkedIn Analytics, Google Analytics, YouTube Analytics,
                  and where relevant, Google Search Console to inform content decisions.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section 12: Case Studies ──────────────────────────────────────────── */}
      <section className="w-full bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl"
          >
            <motion.div variants={item}>
              <SectionLabel>Case Studies</SectionLabel>
            </motion.div>
            <motion.h2
              variants={item}
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl"
            >
              Results we&apos;re{" "}
              <span className="text-accent">proud to talk about.</span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={container}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                industry: "B2B / Manufacturing",
                challenge: "No social presence, no inbound, relying entirely on referrals.",
                result: "Qualified leads from LinkedIn within 60 days of launch.",
                tag: "LinkedIn · Content Strategy · Lead Gen",
              },
              {
                industry: "D2C Brand",
                challenge: "High ad spend, low ROAS, no organic strategy supporting paid.",
                result: "Organic content reduced blended CAC through warmer remarketing audiences.",
                tag: "Instagram · Meta Ads · Creative",
              },
              {
                industry: "Professional Services",
                challenge: "Strong offline reputation but near-zero digital authority.",
                result: "Founder-led LinkedIn content created consistent inbound inquiry.",
                tag: "LinkedIn · Personal Branding · Copywriting",
              },
            ].map((cs) => (
              <motion.div
                key={cs.industry}
                variants={item}
                className="flex flex-col rounded-3xl border border-black/10 bg-white p-8 shadow-sm"
              >
                <span className="inline-flex self-start rounded-full border border-black/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-black/50">
                  {cs.industry}
                </span>
                <div className="mt-6 flex flex-col gap-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-black/30">
                      Challenge
                    </p>
                    <p className="mt-1.5 text-sm leading-6 text-black/70">{cs.challenge}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-accent">
                      Result
                    </p>
                    <p className="mt-1.5 text-sm font-semibold leading-6 text-black">{cs.result}</p>
                  </div>
                </div>
                <div className="mt-6 border-t border-black/10 pt-4">
                  <p className="text-xs text-black/40">{cs.tag}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Section 13: Why Choose Us ─────────────────────────────────────────── */}
      <section className="w-full bg-neutral-50 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl"
          >
            <motion.div variants={item}>
              <SectionLabel>Why Sarvopaya</SectionLabel>
            </motion.div>
            <motion.h2
              variants={item}
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl"
            >
              What makes the difference{" "}
              <span className="text-accent">isn&apos;t creativity.</span>
              <br />
              It&apos;s discipline.
            </motion.h2>
            <motion.p variants={item} className="mt-4 max-w-xl text-base leading-7 text-black/60">
              Plenty of agencies produce good-looking content. Fewer connect that content to
              a strategy. Fewer still tie strategy to commercial outcomes and report on it
              honestly every month.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={container}
            className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {whyUs.map((point, i) => (
              <motion.div
                key={point.title}
                variants={item}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white p-6 transition-colors duration-500 hover:border-black hover:bg-black"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -top-5 font-heading text-[5rem] font-bold leading-none text-black/[0.03] transition-colors duration-500 group-hover:text-white/5"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="relative font-heading text-base font-bold text-black transition-colors duration-500 group-hover:text-white">
                  {point.title}
                </h3>
                <p className="relative mt-3 text-sm leading-6 text-black/60 transition-colors duration-500 group-hover:text-white/60">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Section 14: Testimonials ──────────────────────────────────────────── */}
      <Testimonials />

      {/* ── Section 15 (old): FAQ ─────────────────────────────────────────────── */}
      <section className="w-full bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl"
          >
            <motion.div variants={item}>
              <SectionLabel>FAQ</SectionLabel>
            </motion.div>
            <motion.h2
              variants={item}
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl"
            >
              Questions worth{" "}
              <span className="text-accent">straight answers.</span>
            </motion.h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-14 divide-y divide-black/10 border-t border-black/10"
          >
            {faqData.map((faq, index) => {
              const open = openFaq === index;
              return (
                <motion.div key={faq.question} variants={item}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : index)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-heading text-lg font-medium text-black sm:text-xl">
                      {faq.question}
                    </span>
                    <PlusIcon open={open} />
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-3xl pb-6 text-base leading-7 text-black/60">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Section 15: Final CTA ─────────────────────────────────────────────── */}
      <section className="w-full bg-black py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.p
              variants={fadeUp}
              className="text-sm font-bold uppercase tracking-widest text-white/40"
            >
              Ready to start
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-4 text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Your content isn&apos;t the problem.
              <br />
              <span className="text-accent">Your strategy is.</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/60 sm:text-lg"
            >
              Book a strategy call and we&apos;ll audit your current social media presence,
              identify where the gaps are, and show you exactly how we&apos;d approach building
              a system that actually contributes to your business.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <CTAButton href="/contact" variant="inverted" size="lg">
                Book a Strategy Call
              </CTAButton>
              <Link
                href="/industries"
                className="text-sm font-semibold text-white/50 transition-colors duration-300 hover:text-white"
              >
                View Our Work →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
