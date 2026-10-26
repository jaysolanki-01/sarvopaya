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

const strategyPillars = [
  {
    number: "01",
    title: "Financial & Unit Economics Modeling",
    subtitle: "Grounding growth in actual contribution cashflow",
    desc: "Scaling without unit economics discipline leads straight to cash crunch. We build your bottom-up financial model analyzing Contribution Margin 1, 2, and 3, customer acquisition payback velocity, and net LTV to ensure every rupee invested funds the next phase of growth.",
    deliverables: [
      "CM1/CM2/CM3 margin breakdown",
      "Payback period & cash conversion cycle model",
      "Customer lifetime value (LTV) cohort curves",
      "Break-even CAC thresholds by channel",
    ],
  },
  {
    number: "02",
    title: "Channel Prioritisation & Capital Allocation",
    subtitle: "Focus on your highest-leverage growth levers",
    desc: "Trying to be everywhere at once dilutes budget and team focus. We employ a disciplined 70/20/10 capital allocation framework: 70% to proven core scaling engines, 20% to emerging channels with high upside, and 10% to experimental growth hypotheses.",
    deliverables: [
      "Channel maturity & viability audit",
      "70/20/10 budget allocation roadmap",
      "Creative velocity & production requirements",
      "Cross-channel saturation & diminishing return caps",
    ],
  },
  {
    number: "03",
    title: "Quantitative Growth Engine & Forecasting",
    subtitle: "A dynamic model of your revenue drivers",
    desc: "We construct a live mathematical model connecting top-of-funnel traffic, landing page conversion rates, average order value, repurchase rates, and customer churn. This turns growth forecasting from a guessing game into a predictable engineering discipline.",
    deliverables: [
      "Dynamic sensitivity & scenario forecast model",
      "Funnel conversion elasticity benchmarks",
      "Retention curve & repeat purchase multipliers",
      "Quarterly milestone & revenue target projections",
    ],
  },
  {
    number: "04",
    title: "High-Velocity Experimentation Framework",
    subtitle: "Systematize test-learn-scale iterations",
    desc: "The fastest growing companies are those that run the most high-conviction experiments. We implement an ICE-scored (Impact, Confidence, Ease) growth sprint backlog, running weekly creative, pricing, and funnel tests with strict statistical guardrails.",
    deliverables: [
      "Weekly growth sprint process & backlog",
      "ICE experiment prioritization scorecard",
      "Hypothesis documentation & learning repository",
      "Post-test scale / kill decision criteria",
    ],
  },
  {
    number: "05",
    title: "OKRs, North Star Metric & Team Alignment",
    subtitle: "Unite marketing, sales, and product behind one goal",
    desc: "Strategy fails when execution is siloed. We define your company's single North Star Metric, establish quarterly Objectives and Key Results (OKRs), and set up executive dashboards so your leadership team maintains complete visibility.",
    deliverables: [
      "North Star Metric & supporting input metrics",
      "Quarterly department-level growth OKRs",
      "Executive growth dashboard specifications",
      "Bi-weekly performance review cadence",
    ],
  },
];

const targetAudiences = [
  {
    tag: "D2C Brands",
    title: "Scaling Past The ₹1Cr–₹10Cr Plateau",
    desc: "You have initial product-market fit, but Meta CPMs are rising and customer acquisition costs are squeezing margins. We rebuild your retention and contribution margin architecture.",
    focus: "Contribution Margin 3, LTV payback under 60 days, creative velocity, and omnichannel distribution.",
  },
  {
    tag: "Funded Startups",
    title: "Seed to Series B Capital Efficiency",
    desc: "Facing pressure from investors to demonstrate efficient growth and clean unit economics. We construct the scalable revenue engine needed for institutional financing rounds.",
    focus: "Blended CAC efficiency, cohort retention stability, pipeline predictability, and runway extension.",
  },
  {
    tag: "High-Ticket & B2B",
    title: "Enterprise Deal Velocity & Pipeline",
    desc: "Long sales cycles and unpredictable inbound lead flow. We implement automated lead qualification, account-based growth roadmaps, and high-intent capture funnels.",
    focus: "Sub-5 minute lead response SLAs, outbound/inbound synergy, and sales cycle compression.",
  },
  {
    tag: "Established Enterprises",
    title: "New Digital Revenue Vertical Launch",
    desc: "Expanding from traditional offline distribution into direct-to-consumer or digital-first models without channel conflict or organizational friction.",
    focus: "Category positioning, greenfield digital infrastructure, and internal growth pod enablement.",
  },
];

const strategyDeliverables = [
  {
    title: "6–12 Month Growth Playbook",
    desc: "A bespoke, operational blueprint outlining exact growth levers, channel sequences, and tactical milestones for your company.",
    badge: "Core Deliverable",
  },
  {
    title: "Financial & Unit Economics Model",
    desc: "Dynamic, editable financial forecast with live CM1/CM2/CM3 calculations and sensitivity scenarios.",
    badge: "Financial Asset",
  },
  {
    title: "Weekly Experiment Backlog",
    desc: "An ICE-prioritized repository of 50+ growth hypotheses across paid ads, conversion rate optimization, and retention.",
    badge: "Execution Engine",
  },
  {
    title: "Bi-Weekly Executive Advisory",
    desc: "Direct strategic guidance with Jay Solanki and senior growth directors to review data, eliminate blockers, and pivot tactics.",
    badge: "Ongoing Partnership",
  },
];

const strategyFaqs = [
  {
    q: "How does Growth Strategy differ from Growth Consulting?",
    a: "Growth Strategy is a core forward-looking pillar of our Growth Consulting practice (anchored at /services/growth-consulting#growth-strategy). While Growth Consulting encompasses retrospective digital audits and broad advisory, Growth Strategy specifically designs your 6 to 12-month commercial scale model, unit economics, and experiment sprint cadence.",
  },
  {
    q: "What timeframe does a Growth Strategy engagement cover?",
    a: "The strategic formulation phase takes 3 to 4 weeks to conduct data synthesis, financial modeling, and roadmap construction. Once delivered, we typically partner with leadership teams across a 6 to 12-month execution horizon with bi-weekly advisory check-ins.",
  },
  {
    q: "Do you collaborate with our existing in-house marketing team?",
    a: "Yes, seamlessly. Our Growth Strategy is built to empower your internal teams by providing clarity, prioritizing their roadmaps, and removing guesswork. If your team has execution gaps (such as creative volume or AI workflows), Sarvopaya's execution pods can step in to support.",
  },
  {
    q: "What data or inputs do we need to provide before starting?",
    a: "We review your historical financial metrics (P&L, gross margins, shipping costs, refund rates), CRM and analytics data (GA4, Shopify, or custom dashboards), and ad platform histories. All data is protected under formal non-disclosure agreements.",
  },
  {
    q: "How quickly do companies see measurable results from a Growth Strategy?",
    a: "Immediate quick wins identified in the unit economics audit and budget reallocation typically yield margin improvements within the first 30 days. Foundational growth loops and new channel scale compound substantially between months 3 and 6.",
  },
];

export default function GrowthStrategyPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroIv = useInView(heroRef, { once: true, amount: 0.2 });
  const pillarsRef = useRef<HTMLDivElement>(null);
  const pillarsIv = useInView(pillarsRef, { once: true, amount: 0.1 });
  const audienceRef = useRef<HTMLDivElement>(null);
  const audienceIv = useInView(audienceRef, { once: true, amount: 0.1 });
  const deliverablesRef = useRef<HTMLDivElement>(null);
  const deliverablesIv = useInView(deliverablesRef, { once: true, amount: 0.1 });
  const faqRef = useRef<HTMLDivElement>(null);
  const faqIv = useInView(faqRef, { once: true, amount: 0.2 });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Growth Strategy Consulting",
        serviceType: "Growth Strategy",
        provider: {
          "@type": "Organization",
          name: "Sarvopaya",
          url: "https://www.sarvopaya.com",
        },
        description:
          "6 to 12-month growth strategy roadmap built on unit economics, channel prioritisation, and experiment velocity for high-growth brands and funded startups.",
        url: "https://www.sarvopaya.com/services/growth-strategy",
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
            item: "https://www.sarvopaya.com/services/growth-consulting#growth-strategy",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Growth Strategy",
            item: "https://www.sarvopaya.com/services/growth-strategy",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: strategyFaqs.map((f) => ({
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
          GROWTH
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
                href="/services/growth-consulting#growth-strategy"
                className="flex items-center gap-1 font-semibold text-[var(--accent)] hover:underline underline-offset-4 transition-all"
              >
                <span>Growth Consulting (#growth-strategy)</span>
                <span className="text-[10px] text-black/40">↗</span>
              </Link>
              <span>/</span>
              <span className="font-bold text-black">Growth Strategy</span>
            </motion.div>

            <motion.div variants={up}>
              <SectionLabel>Strategic Advisory Practice</SectionLabel>
            </motion.div>

            {/* Explicit <h1> with "Growth Strategy" */}
            <motion.h1
              variants={up}
              className="font-heading text-5xl font-black leading-[1.05] tracking-tight text-black sm:text-6xl lg:text-7xl"
            >
              Growth Strategy
              <br />
              <span className="text-[var(--accent)]">
                Built for Predictable Scale.
              </span>
            </motion.h1>

            <motion.p
              variants={up}
              className="mt-6 max-w-3xl text-lg leading-relaxed text-black/60 sm:text-xl"
            >
              A 6 to 12-month commercial scale blueprint engineered around your unit
              economics, highest-leverage acquisition channels, and rigorous experiment
              cadences. We turn unpredictable growth into a repeatable, mathematical engine.
            </motion.p>

            {/* Quick Metrics Bar */}
            <motion.div
              variants={up}
              className="mt-10 grid grid-cols-2 gap-4 border-y border-black/8 py-6 sm:grid-cols-4"
            >
              <div>
                <p className="font-heading text-2xl font-black text-black sm:text-3xl">
                  6-12 Mo
                </p>
                <p className="mt-1 text-xs text-black/50">Execution Horizon</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-black text-black sm:text-3xl">
                  CM3 Focus
                </p>
                <p className="mt-1 text-xs text-black/50">Unit Economics Model</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-black text-[var(--accent)] sm:text-3xl">
                  70/20/10
                </p>
                <p className="mt-1 text-xs text-black/50">Capital Allocation</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-black text-black sm:text-3xl">
                  Weekly
                </p>
                <p className="mt-1 text-xs text-black/50">Experiment Sprints</p>
              </div>
            </motion.div>

            <motion.div variants={up} className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex h-13 items-center gap-2 rounded-full bg-black px-8 text-sm font-bold text-white transition-all duration-300 hover:bg-[var(--accent)] hover:shadow-xl"
              >
                Schedule Growth Consultation <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/services/growth-consulting#growth-strategy"
                className="inline-flex h-13 items-center gap-2 rounded-full border border-black/15 px-8 text-sm font-bold text-black transition-colors duration-300 hover:border-black/40 hover:bg-black/5"
              >
                Back to Growth Consulting Hub
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── THE GROWTH PLATEAU PROBLEM ── */}
      <section className="bg-black/[0.02] py-20 sm:py-28 border-y border-black/6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5">
              <SectionLabel>The Scale Plateau</SectionLabel>
              <h2 className="font-heading text-3xl font-black leading-tight tracking-tight text-black sm:text-4xl">
                Why What Got You to ₹1Cr Won't Get You to ₹20Cr.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-black/60">
                Most companies hit a growth wall because they rely on random acts of
                marketing: jumping from TikTok to micro-influencers, boosting ad spend,
                and hoping for breakthrough results. Sustainable scale requires an intentional,
                compounding architecture.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                <span className="text-xs font-bold uppercase tracking-wider text-black">
                  We replace guesswork with mathematically validated growth loops.
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-red-500/10 bg-white p-6 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-red-500">
                  The Tactical Trap
                </span>
                <h4 className="mt-2 font-heading text-lg font-bold text-black">
                  Random Channel Chasing
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-black/60">
                  Scattering budget across six different platforms without dominating
                  a single channel or mastering creative feedback loops.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-500/15 bg-white p-6 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  The Strategic Model
                </span>
                <h4 className="mt-2 font-heading text-lg font-bold text-black">
                  Disciplined Capital Allocation
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-black/60">
                  Focusing 70% of spend on a proven core engine while systematically
                  incubating next-generation channels with clear thresholds.
                </p>
              </div>

              <div className="rounded-2xl border border-red-500/10 bg-white p-6 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-red-500">
                  The Tactical Trap
                </span>
                <h4 className="mt-2 font-heading text-lg font-bold text-black">
                  Single-Purchase Obsession
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-black/60">
                  Burning margins to acquire one-time buyers while ignoring post-purchase
                  onboarding, repeat rate drop-offs, and customer churn.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-500/15 bg-white p-6 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  The Strategic Model
                </span>
                <h4 className="mt-2 font-heading text-lg font-bold text-black">
                  Compounding Retention Engines
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-black/60">
                  Designing automated lifecycle flows and repurchase triggers that
                  multiply 90-day LTV, funding higher acquisition aggression.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5 PILLARS OF GROWTH STRATEGY ── */}
      <section className="bg-white py-24 sm:py-32" ref={pillarsRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={pillarsIv ? "show" : "hidden"}
            className="mb-16"
          >
            <motion.div variants={up}>
              <SectionLabel>Our Strategic Framework</SectionLabel>
            </motion.div>
            <motion.h2
              variants={up}
              className="font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              The 5 Pillars of
              <br />
              <span className="text-black/30">Sustainable Scale.</span>
            </motion.h2>
            <motion.p
              variants={up}
              className="mt-4 max-w-2xl text-base text-black/60"
            >
              Every strategy roadmap we build is anchored in financial rigor, channel discipline,
              and iterative experiment execution.
            </motion.p>
          </motion.div>

          <div className="space-y-8">
            {strategyPillars.map((pillar, i) => (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 24 }}
                animate={pillarsIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                className="grid grid-cols-1 gap-8 rounded-3xl border border-black/8 bg-white p-8 transition-all duration-300 hover:border-black/20 hover:shadow-xl lg:grid-cols-12"
              >
                <div className="lg:col-span-2 flex items-start">
                  <span className="font-heading text-4xl font-black text-[var(--accent)]">
                    {pillar.number}
                  </span>
                </div>

                <div className="lg:col-span-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-black/40">
                    {pillar.subtitle}
                  </span>
                  <h3 className="mt-1 font-heading text-2xl font-bold text-black sm:text-3xl">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-black/65 sm:text-base">
                    {pillar.desc}
                  </p>
                </div>

                <div className="lg:col-span-4 rounded-2xl bg-black/[0.02] p-5 border border-black/5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">
                    Outputs & Assets
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {pillar.deliverables.map((item) => (
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

      {/* ── WHO THIS IS FOR ── */}
      <section className="bg-black/[0.02] py-24 sm:py-32" ref={audienceRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={audienceIv ? "show" : "hidden"}
            className="mb-16"
          >
            <motion.div variants={up}>
              <SectionLabel>Tailored Playbooks</SectionLabel>
            </motion.div>
            <motion.h2
              variants={up}
              className="font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              Who We Partner With For
              <br />
              <span className="text-[var(--accent)]">Growth Strategy.</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {targetAudiences.map((aud, idx) => (
              <motion.div
                key={aud.tag}
                initial={{ opacity: 0, y: 20 }}
                animate={audienceIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.1, duration: 0.6, ease: EASE }}
                className="flex flex-col justify-between rounded-3xl border border-black/8 bg-white p-8 shadow-sm transition-all duration-300 hover:border-black/20 hover:shadow-lg"
              >
                <div>
                  <div className="inline-block rounded-full bg-[var(--accent)]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[var(--accent)]">
                    {aud.tag}
                  </div>
                  <h3 className="mt-4 font-heading text-2xl font-bold text-black">
                    {aud.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-black/60">
                    {aud.desc}
                  </p>
                </div>
                <div className="mt-6 border-t border-black/6 pt-4 text-xs text-black/50">
                  <span className="font-bold text-black/75">Strategic Focus: </span>
                  {aud.focus}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DELIVERABLES ── */}
      <section className="bg-white py-24 sm:py-32" ref={deliverablesRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={deliverablesIv ? "show" : "hidden"}
            className="mb-16"
          >
            <motion.div variants={up}>
              <SectionLabel>Concrete Deliverables</SectionLabel>
            </motion.div>
            <motion.h2
              variants={up}
              className="font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              What You Walk Away With.
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {strategyDeliverables.map((d, idx) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 20 }}
                animate={deliverablesIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.1, duration: 0.6, ease: EASE }}
                className="flex flex-col justify-between rounded-3xl border border-black/8 bg-white p-7 shadow-sm transition-all duration-300 hover:border-black/20 hover:shadow-lg"
              >
                <div>
                  <span className="inline-block rounded-full bg-[var(--accent)]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                    {d.badge}
                  </span>
                  <h3 className="mt-4 font-heading text-xl font-bold text-black">
                    {d.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-black/60">
                    {d.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ATTACHED ECOSYSTEM ── */}
      <section className="bg-white py-20 sm:py-28 border-y border-black/6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-neutral-900 p-8 sm:p-12 text-white">
            <div className="max-w-3xl">
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">
                Unified Growth Ecosystem
              </span>
              <h2 className="mt-4 font-heading text-3xl font-black text-white sm:text-4xl">
                Strategy Connected To Real Execution.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
                A great strategy requires elite implementation. Sarvopaya integrates
                leadership strategy consulting with full-service execution across media,
                engineering, and automated pipelines:
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/services/growth-consulting#growth-strategy"
                className="rounded-2xl border border-[var(--accent)]/40 bg-[var(--accent)]/10 p-5 transition-all hover:bg-[var(--accent)]/15"
              >
                <p className="text-xs font-bold text-[var(--accent)]">01. Advisory Hub</p>
                <h4 className="mt-1 font-heading text-base font-bold text-white">
                  Growth Consulting Hub
                </h4>
                <p className="mt-2 text-xs text-white/70">
                  Anchor portal connecting strategy roadmaps, digital audits, and GTM.
                </p>
              </Link>

              <Link
                href="/services/digital-audit"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:bg-white/10 hover:border-white/20"
              >
                <p className="text-xs font-bold text-[var(--accent)]">02. Diagnostics</p>
                <h4 className="mt-1 font-heading text-base font-bold text-white">
                  360° Digital Audit
                </h4>
                <p className="mt-2 text-xs text-white/60">
                  Forensic review of ad leakage, CRO bottlenecks, and technical SEO.
                </p>
              </Link>

              <Link
                href="/services/go-to-market-startegy-expert"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:bg-white/10 hover:border-white/20"
              >
                <p className="text-xs font-bold text-[var(--accent)]">03. Market Entry</p>
                <h4 className="mt-1 font-heading text-base font-bold text-white">
                  GTM Strategy Experts
                </h4>
                <p className="mt-2 text-xs text-white/60">
                  First-principles positioning and 90-day launch sequencing.
                </p>
              </Link>

              <Link
                href="/services/d2c-marketing"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:bg-white/10 hover:border-white/20"
              >
                <p className="text-xs font-bold text-[var(--accent)]">04. Execution</p>
                <h4 className="mt-1 font-heading text-base font-bold text-white">
                  D2C Performance Marketing
                </h4>
                <p className="mt-2 text-xs text-white/60">
                  Meta & Google ads scaled directly to positive contribution margin.
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
              <SectionLabel>Frequently Asked Questions</SectionLabel>
            </motion.div>
            <motion.h2
              variants={up}
              className="font-heading text-4xl font-black tracking-tight text-black sm:text-5xl"
            >
              Everything You Need to Know.
            </motion.h2>
          </motion.div>

          <div className="space-y-4">
            {strategyFaqs.map((faq, i) => (
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
          <SectionLabel>Scale Predictably</SectionLabel>
          <h2 className="mt-4 font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Build Your 12-Month Growth Roadmap.
            <br />
            <span className="text-[var(--accent)]">Take Category Leadership.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/60 sm:text-lg">
            Stop running random marketing tactics. Partner with senior growth operators
            who align your unit economics, capital allocation, and team execution.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex h-13 items-center gap-2 rounded-full bg-[var(--accent)] px-8 text-sm font-bold text-white transition-all duration-300 hover:brightness-110 hover:shadow-2xl"
            >
              Book Your Growth Strategy Call <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/services/growth-consulting#growth-strategy"
              className="inline-flex h-13 items-center gap-2 rounded-full border border-white/20 px-8 text-sm font-bold text-white transition-colors duration-300 hover:border-white/50 hover:bg-white/5"
            >
              Explore Growth Consulting Hub
            </Link>
          </div>

          <p className="mt-6 text-xs text-white/40">
            30-minute high-impact session with Jay Solanki. Zero sales pressure.
          </p>
        </div>
      </section>
    </>
  );
}
