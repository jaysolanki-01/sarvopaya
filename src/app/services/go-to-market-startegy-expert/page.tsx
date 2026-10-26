"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const up = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const seq = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-4 inline-block rounded-full border border-black/10 bg-black/[0.04] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-black/50">
      {children}
    </span>
  );
}

const gtmPhases = [
  {
    number: "01",
    title: "Micro-ICP & Urgency Calibration",
    subtitle: "Identify who is desperate to buy right now",
    description:
      "Most launches fail because the Ideal Customer Profile (ICP) is broad, generic, and unvalidated. We dissect your market into high-intent micro-segments, uncovering the exact trigger events, emotional anxieties, and buying criteria that convert cold prospects into immediate buyers.",
    deliverables: [
      "Micro-segment ICP scoring matrix",
      "Buying trigger & objection mapping",
      "Customer interview synthesis",
      "TAM/SAM/SOM bottom-up model",
    ],
  },
  {
    number: "02",
    title: "Category Positioning & Narrative Moat",
    subtitle: "Stop competing on feature parity",
    description:
      "If you sound like everyone else in your category, your customer acquisition cost (CAC) will soar. We build your narrative design, category claim, and messaging hierarchy so you are positioned not as an incremental alternative, but as the only logical solution to a high-stakes problem.",
    deliverables: [
      "Category point-of-view (POV) manifesto",
      "Competitive differentiation grid",
      "Hook and value proposition hierarchy",
      "Sales narrative & pitch deck blueprint",
    ],
  },
  {
    number: "03",
    title: "Pricing Architecture & Unit Economics",
    subtitle: "Engineer positive contribution margin on Day 1",
    description:
      "We design packaging tiers, pricing psychology, and pay-per-value models structured around Contribution Margin (CM1, CM2, CM3). We test elasticity, optimize payback velocity, and ensure your acquisition spend produces compounding cash flow instead of subsidized burn.",
    deliverables: [
      "3-tier packaging & pricing matrix",
      "Contribution margin financial forecast",
      "LTV-to-CAC payback velocity model",
      "Discount & promotional guardrails",
    ],
  },
  {
    number: "04",
    title: "Omnichannel Launch Sequencing",
    subtitle: "Orchestrate multi-touch momentum",
    description:
      "A GTM launch is an orchestrated event, not a single press release or boosted ad. We construct a 90-day launch cascade integrating performance paid media, organic authority, founder storytelling, email/SMS warm-up funnels, and high-converting landing pages.",
    deliverables: [
      "90-day day-by-day launch Gantt roadmap",
      "Full-funnel digital architecture",
      "High-converting landing page wireframes",
      "Cross-channel creative testing brief",
    ],
  },
  {
    number: "05",
    title: "Automation Engine & Feedback Loops",
    subtitle: "Scale pipeline with automated workflows",
    description:
      "Launches lose momentum when leads fall through the cracks. We engineer automated n8n workflows, real-time CRM enrichment, instant WhatsApp response pipelines, and cohort retention analytics so your team captures, qualifies, and retains customers effortlessly.",
    deliverables: [
      "Automated lead capture & enrichment flows",
      "CRM pipeline stages & SLA routing",
      "Real-time analytics & attribution dashboard",
      "Post-purchase retention & onboarding loops",
    ],
  },
];

const launchScenarios = [
  {
    tag: "0-to-1 Launch",
    title: "New Product or Venture Introduction",
    desc: "Taking a concept from stealth to revenue. We de-risk market fit, validate willingness-to-pay, and engineer your initial customer acquisition engine.",
    idealFor: "Funded startups (Seed & Series A), bootstrapped innovations, and corporate spin-offs.",
  },
  {
    tag: "Global Expansion",
    title: "Cross-Border Market Entry",
    desc: "Expanding an established brand into India, the United States, the UK, UAE, Saudi Arabia, or Southeast Asia with localized messaging and distribution channels.",
    idealFor: "High-growth D2C brands and international software/service providers entering new territories.",
  },
  {
    tag: "Strategic Pivot",
    title: "Category Repositioning & Re-Launch",
    desc: "Stuck in growth stagnation or commodity pricing? We restructure your positioning, re-align your ICP, and re-introduce your offering with newfound authority.",
    idealFor: "Businesses seeking higher margins, larger deal sizes, or transitioning from SMB to Enterprise.",
  },
  {
    tag: "Scale-Up Sprint",
    title: "Next-Stage Growth Infrastructure",
    desc: "You have product-market fit, but your current acquisition channels are hitting a ceiling. We uncover untapped channels, build creative velocity, and scale volume.",
    idealFor: "Brands scaling from ₹1Cr to ₹50Cr+ ARR seeking repeatable, systemic growth.",
  },
];

const gtmFaqs = [
  {
    q: "How does this GTM page relate to Sarvopaya's Growth Consulting services?",
    a: "This dedicated Go-to-Market Strategy practice is an executive pillar of our Growth Consulting offering (available at /services/growth-consulting#gtm). While Growth Consulting encompasses digital audits and ongoing advisory, our GTM Strategy practice is specifically engineered for high-stakes product launches, market expansions, and category pivots.",
  },
  {
    q: "What is the typical timeframe for a full GTM engagement?",
    a: "A complete GTM Strategy Blueprint is formulated and handed over within 3 to 4 weeks. Following the blueprint, we frequently transition into a 90-day launch execution sprint where our performance marketing, creative, and automation teams deploy the strategy into live market channels.",
  },
  {
    q: "Do you just give us a strategy deck, or do you also execute?",
    a: "Unlike traditional management consultancies that deliver theoretical slides and walk away, Sarvopaya is a full-stack growth and technology company. Our strategy is built by operators who also manage media budgets, write conversion copy, design web platforms, and program AI automation workflows.",
  },
  {
    q: "Which industries and markets do your GTM experts specialize in?",
    a: "We possess deep, proven domain expertise in D2C consumer brands, B2B SaaS and high-ticket service firms, AI and technology platforms, and industrial innovators across India, the United States, United Kingdom, UAE, Saudi Arabia, and Australia.",
  },
  {
    q: "How do you measure the success of a Go-To-Market launch?",
    a: "We measure success on genuine financial metrics: Day-1 pipeline generation, customer acquisition cost relative to contribution margin, 30-day conversion velocity, and customer retention cohorts—not vanity impressions or generic press mentions.",
  },
];

export default function GoToMarketStrategyExpertPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroIv = useInView(heroRef, { once: true, amount: 0.2 });
  const frameworkRef = useRef<HTMLDivElement>(null);
  const frameworkIv = useInView(frameworkRef, { once: true, amount: 0.1 });
  const scenariosRef = useRef<HTMLDivElement>(null);
  const scenariosIv = useInView(scenariosRef, { once: true, amount: 0.1 });
  const faqRef = useRef<HTMLDivElement>(null);
  const faqIv = useInView(faqRef, { once: true, amount: 0.2 });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Go-to-Market (GTM) Strategy Experts",
        serviceType: "Go-to-Market Strategy Consulting",
        provider: {
          "@type": "Organization",
          name: "Sarvopaya",
          url: "https://www.sarvopaya.com",
        },
        description:
          "First-principles GTM strategy consulting, ICP validation, positioning, pricing, and 90-day launch execution roadmaps for D2C brands, funded startups, and scaling businesses.",
        url: "https://www.sarvopaya.com/services/go-to-market-startegy-expert",
        areaServed: [
          "India",
          "United States",
          "United Kingdom",
          "United Arab Emirates",
          "Saudi Arabia",
          "Australia",
          "Singapore",
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.sarvopaya.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: "https://www.sarvopaya.com/services",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Growth Consulting",
            item: "https://www.sarvopaya.com/services/growth-consulting#gtm",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Go-To-Market Strategy Experts",
            item: "https://www.sarvopaya.com/services/go-to-market-startegy-expert",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: gtmFaqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden bg-white pb-20 pt-32 sm:pb-28 sm:pt-40"
        ref={heroRef}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 select-none font-black uppercase leading-none text-black/[0.03]"
          style={{ fontSize: "clamp(80px,14vw,200px)" }}
        >
          GTM
        </span>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={heroIv ? "show" : "hidden"}
          >
            {/* Breadcrumb back link */}
            <motion.div
              variants={up}
              className="mb-6 flex flex-wrap items-center gap-2 text-xs text-black/50"
            >
              <Link
                href="/services"
                className="hover:text-black transition-colors"
              >
                Services
              </Link>
              <span>/</span>
              <Link
                href="/services/growth-consulting#gtm"
                className="flex items-center gap-1 font-semibold text-[var(--accent)] hover:underline underline-offset-4 transition-all"
              >
                <span>Growth Consulting (#gtm)</span>
                <span className="text-[10px] text-black/40">↗</span>
              </Link>
              <span>/</span>
              <span className="font-bold text-black">GTM Strategy Experts</span>
            </motion.div>

            <motion.div variants={up}>
              <SectionLabel>Go-To-Market Strategy Experts</SectionLabel>
            </motion.div>

            <motion.h1
              variants={up}
              className="font-heading text-5xl font-black leading-[1.05] tracking-tight text-black sm:text-6xl lg:text-7xl"
            >
              Go to Market Strategy Experts
              <br />
              <span className="text-[var(--accent)]">
                Launch With Velocity. Dominate Your Category.
              </span>
            </motion.h1>

            <motion.p
              variants={up}
              className="mt-6 max-w-3xl text-lg leading-relaxed text-black/60 sm:text-xl"
            >
              We design first-principles Go-To-Market architectures for high-growth
              D2C brands, funded tech startups, and ambitious enterprises.
              From micro-ICP validation and narrative moats to multi-channel
              execution roadmaps that generate sustainable pipeline on Day 1.
            </motion.p>

            {/* Quick Metrics Bar */}
            <motion.div
              variants={up}
              className="mt-10 grid grid-cols-2 gap-4 border-y border-black/8 py-6 sm:grid-cols-4"
            >
              <div>
                <p className="font-heading text-2xl font-black text-black sm:text-3xl">
                  3-4 Wks
                </p>
                <p className="mt-1 text-xs text-black/50">Strategy Delivery</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-black text-black sm:text-3xl">
                  90-Day
                </p>
                <p className="mt-1 text-xs text-black/50">Execution Roadmap</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-black text-[var(--accent)] sm:text-3xl">
                  100%
                </p>
                <p className="mt-1 text-xs text-black/50">Operator-Built Plan</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-black text-black sm:text-3xl">
                  7+ Mkts
                </p>
                <p className="mt-1 text-xs text-black/50">Global Expansion</p>
              </div>
            </motion.div>

            <motion.div variants={up} className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex h-13 items-center gap-2 rounded-full bg-black px-8 text-sm font-bold text-white transition-all duration-300 hover:bg-[var(--accent)] hover:shadow-xl"
              >
                Schedule GTM Consultation <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/services/growth-consulting#gtm"
                className="inline-flex h-13 items-center gap-2 rounded-full border border-black/15 px-8 text-sm font-bold text-black transition-colors duration-300 hover:border-black/40 hover:bg-black/5"
              >
                Back to Growth Consulting Hub
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── THE PROBLEM WITH LEGACY GTM ── */}
      <section className="bg-black/[0.02] py-20 sm:py-28 border-y border-black/6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5">
              <SectionLabel>The GTM Dilemma</SectionLabel>
              <h2 className="font-heading text-3xl font-black leading-tight tracking-tight text-black sm:text-4xl">
                Why 70% of Product Launches Fail to Hit Year-1 Targets.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-black/60">
                Traditional market entry advice is broken. Agencies build generic
                ad sets without validating unit economics, while strategy consultants
                deliver 120-slide decks that no operator knows how to execute.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                <span className="text-xs font-bold uppercase tracking-wider text-black">
                  Sarvopaya bridges strategy with engineering & media execution.
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-red-500/10 bg-white p-6 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-red-500">
                  Legacy Launch Trap
                </span>
                <h4 className="mt-2 font-heading text-lg font-bold text-black">
                  The Broad Audience Blindspot
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-black/60">
                  Targeting everyone who might be interested, burning precious seed
                  capital on diffuse ads with zero category resonance.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-500/15 bg-white p-6 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  The Sarvopaya Advantage
                </span>
                <h4 className="mt-2 font-heading text-lg font-bold text-black">
                  Laser Micro-ICP Concentration
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-black/60">
                  Identifying the top 5% of early adopters with acute hair-on-fire
                  pain points, generating rapid word-of-mouth momentum.
                </p>
              </div>

              <div className="rounded-2xl border border-red-500/10 bg-white p-6 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-red-500">
                  Legacy Launch Trap
                </span>
                <h4 className="mt-2 font-heading text-lg font-bold text-black">
                  Subsidized ROAS Illusions
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-black/60">
                  Chasing blended ROAS while ignoring refunds, payment gateway cuts,
                  and fulfillment drag that silently destroy working capital.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-500/15 bg-white p-6 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  The Sarvopaya Advantage
                </span>
                <h4 className="mt-2 font-heading text-lg font-bold text-black">
                  CM3-Grounded Financial Modeling
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-black/60">
                  Engineering first-order contribution margin neutrality so scale
                  funds itself without requiring emergency bridge financing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5-PHASE GTM FRAMEWORK ── */}
      <section className="bg-white py-24 sm:py-32" ref={frameworkRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={frameworkIv ? "show" : "hidden"}
            className="mb-16"
          >
            <motion.div variants={up}>
              <SectionLabel>Our Execution Architecture</SectionLabel>
            </motion.div>
            <motion.h2
              variants={up}
              className="font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              The 5-Stage GTM Blueprint.
              <br />
              <span className="text-black/30">From First Principles to Revenue.</span>
            </motion.h2>
            <motion.p
              variants={up}
              className="mt-4 max-w-2xl text-base text-black/60"
            >
              Every launch we architect passes through a rigorous sequence of validation,
              positioning, unit economics design, multi-channel orchestration, and automation.
            </motion.p>
          </motion.div>

          <div className="space-y-8">
            {gtmPhases.map((phase, i) => (
              <motion.div
                key={phase.number}
                initial={{ opacity: 0, y: 24 }}
                animate={frameworkIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                className="grid grid-cols-1 gap-8 rounded-3xl border border-black/8 bg-white p-8 transition-all duration-300 hover:border-black/20 hover:shadow-xl lg:grid-cols-12"
              >
                <div className="lg:col-span-2 flex items-start">
                  <span className="font-heading text-4xl font-black text-[var(--accent)]">
                    {phase.number}
                  </span>
                </div>

                <div className="lg:col-span-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-black/40">
                    {phase.subtitle}
                  </span>
                  <h3 className="mt-1 font-heading text-2xl font-bold text-black sm:text-3xl">
                    {phase.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-black/65 sm:text-base">
                    {phase.description}
                  </p>
                </div>

                <div className="lg:col-span-4 rounded-2xl bg-black/[0.02] p-5 border border-black/5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">
                    Key Deliverables
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {phase.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-xs font-medium text-black/80"
                      >
                        <span className="mt-0.5 text-[var(--accent)] font-bold">
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LAUNCH SCENARIOS ── */}
      <section className="bg-black/[0.02] py-24 sm:py-32" ref={scenariosRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={scenariosIv ? "show" : "hidden"}
            className="mb-16"
          >
            <motion.div variants={up}>
              <SectionLabel>Engagements & Scenarios</SectionLabel>
            </motion.div>
            <motion.h2
              variants={up}
              className="font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              When to Bring In
              <br />
              <span className="text-[var(--accent)]">Our GTM Experts.</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {launchScenarios.map((scen, idx) => (
              <motion.div
                key={scen.tag}
                initial={{ opacity: 0, y: 20 }}
                animate={scenariosIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.1, duration: 0.6, ease: EASE }}
                className="flex flex-col justify-between rounded-3xl border border-black/8 bg-white p-8 shadow-sm transition-all duration-300 hover:border-black/20 hover:shadow-lg"
              >
                <div>
                  <div className="inline-block rounded-full bg-[var(--accent)]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[var(--accent)]">
                    {scen.tag}
                  </div>
                  <h3 className="mt-4 font-heading text-2xl font-bold text-black">
                    {scen.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-black/60">
                    {scen.desc}
                  </p>
                </div>
                <div className="mt-6 border-t border-black/6 pt-4 text-xs text-black/45">
                  <span className="font-bold text-black/70">Ideal for: </span>
                  {scen.idealFor}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ATTACHED SERVICE ECOSYSTEM ── */}
      <section className="bg-white py-20 sm:py-28 border-b border-black/6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-neutral-900 p-8 sm:p-12 text-white">
            <div className="max-w-3xl">
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">
                Unified Growth Ecosystem
              </span>
              <h2 className="mt-4 font-heading text-3xl font-black text-white sm:text-4xl">
                GTM Strategy Powered By Full Execution Capability.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
                A great GTM plan requires seamless cross-functional delivery. As a
                growth marketing, technology, and AI firm, Sarvopaya executes
                every facet of your launch under one roof:
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/services/d2c-marketing"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:bg-white/10 hover:border-white/20"
              >
                <p className="text-xs font-bold text-[var(--accent)]">01. Paid Media</p>
                <h4 className="mt-1 font-heading text-base font-bold text-white">
                  D2C Performance Ads
                </h4>
                <p className="mt-2 text-xs text-white/60">
                  Meta, Google & TikTok acquisition scaled to contribution margin.
                </p>
              </Link>

              <Link
                href="/services/ai-automation"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:bg-white/10 hover:border-white/20"
              >
                <p className="text-xs font-bold text-[var(--accent)]">02. Infrastructure</p>
                <h4 className="mt-1 font-heading text-base font-bold text-white">
                  AI Automation & n8n
                </h4>
                <p className="mt-2 text-xs text-white/60">
                  Sub-60s lead response, automated WhatsApp workflows & CRM pipelines.
                </p>
              </Link>

              <Link
                href="/services/seo"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:bg-white/10 hover:border-white/20"
              >
                <p className="text-xs font-bold text-[var(--accent)]">03. Organic Moats</p>
                <h4 className="mt-1 font-heading text-base font-bold text-white">
                  SEO & Generative GEO
                </h4>
                <p className="mt-2 text-xs text-white/60">
                  Rank on search engines and secure citations in ChatGPT & Perplexity.
                </p>
              </Link>

              <Link
                href="/services/growth-consulting#gtm"
                className="rounded-2xl border border-[var(--accent)]/40 bg-[var(--accent)]/10 p-5 transition-all hover:bg-[var(--accent)]/15"
              >
                <p className="text-xs font-bold text-[var(--accent)]">04. Strategic Advisory</p>
                <h4 className="mt-1 font-heading text-base font-bold text-white">
                  Growth Consulting Hub
                </h4>
                <p className="mt-2 text-xs text-white/70">
                  Digital audits, ongoing leadership advisory & board reporting.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ACCORDION ── */}
      <section className="bg-white py-24 sm:py-32" ref={faqRef}>
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={faqIv ? "show" : "hidden"}
            className="mb-14 text-center"
          >
            <motion.div variants={up}>
              <SectionLabel>Got Questions?</SectionLabel>
            </motion.div>
            <motion.h2
              variants={up}
              className="font-heading text-4xl font-black tracking-tight text-black sm:text-5xl"
            >
              Frequently Asked Questions.
            </motion.h2>
            <motion.p variants={up} className="mt-3 text-sm text-black/55">
              Everything you need to know about partnering with our GTM strategy team.
            </motion.p>
          </motion.div>

          <div className="space-y-4">
            {gtmFaqs.map((faq, i) => (
              <div
                key={faq.q}
                className="overflow-hidden rounded-2xl border border-black/8 bg-white transition-colors hover:border-black/15"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between p-6 text-left transition-colors"
                >
                  <span className="font-heading text-base font-bold text-black sm:text-lg pr-4">
                    {faq.q}
                  </span>
                  <span
                    className={`shrink-0 text-xl font-bold transition-transform duration-200 ${
                      openFaq === i ? "rotate-45 text-[var(--accent)]" : "text-black/40"
                    }`}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      <div className="px-6 pb-6 text-sm leading-relaxed text-black/60 border-t border-black/4 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="bg-black py-20 text-white sm:py-28">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <SectionLabel>Take Market Leadership</SectionLabel>
          <h2 className="mt-4 font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Ready to Build a GTM Plan
            <br />
            <span className="text-[var(--accent)]">That Actually Converts?</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/60 sm:text-lg">
            Skip the guesswork, avoid premature media burn, and launch with a proven
            system. Book a 30-minute diagnostic session with founder Jay Solanki
            and our senior GTM team.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex h-13 items-center gap-2 rounded-full bg-[var(--accent)] px-8 text-sm font-bold text-white transition-all duration-300 hover:brightness-110 hover:shadow-2xl"
            >
              Book Your GTM Strategy Call <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/services/growth-consulting#gtm"
              className="inline-flex h-13 items-center gap-2 rounded-full border border-white/20 px-8 text-sm font-bold text-white transition-colors duration-300 hover:border-white/50 hover:bg-white/5"
            >
              Explore Growth Consulting Hub
            </Link>
          </div>

          <p className="mt-6 text-xs text-white/40">
            No pitch decks. Real operators reviewing your unit economics & category positioning.
          </p>
        </div>
      </section>
    </>
  );
}
