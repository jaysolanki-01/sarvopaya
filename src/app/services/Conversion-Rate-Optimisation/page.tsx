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

const croVectors = [
  {
    number: "01",
    title: "Quantitative Analytics & Drop-Off Funnel Audit",
    subtitle: "Identify exactly where revenue leaks",
    desc: "We analyze your micro-conversion funnels in GA4 and Shopify: landing page bounce rates, product-to-cart ratios, checkout initiation rates, and payment drop-offs. We quantify the exact monetary cost of each leak so fixes are prioritized by immediate revenue impact.",
    deliverables: [
      "Full-funnel micro-conversion drop-off model",
      "Cart & checkout abandonment rate benchmarking",
      "Device & browser conversion disparity analysis",
      "Traffic source & audience intent segmentation",
    ],
  },
  {
    number: "02",
    title: "Qualitative User Behavior & Heatmap Diagnostics",
    subtitle: "See your site through your customers' eyes",
    desc: "Numbers tell you what is happening; user behavior tells you why. We deploy heatmaps, scroll depth tracking, click rage analysis, and recorded user sessions to observe where shoppers get confused, what they ignore, and where friction stops them from buying.",
    deliverables: [
      "Click, move & scroll depth heatmap teardowns",
      "Rage-click & dead-click friction logging",
      "Session recording pattern synthesis",
      "Form field drop-off & friction analysis",
    ],
  },
  {
    number: "03",
    title: "Above-The-Fold & Value Proposition Architecture",
    subtitle: "Win the first 5 seconds of visitor attention",
    desc: "Over 50% of visitors bounce before scrolling. We re-engineer your above-the-fold real estate: magnetic, benefit-driven headlines, scannable visual hierarchies, dynamic social proof badges, and clear, friction-free calls to action that command immediate engagement.",
    deliverables: [
      "Value proposition clarity & hook refinement",
      "Above-the-fold visual hierarchy redesign",
      "Sticky mobile CTA bar implementations",
      "Benefit-first product bullet architecture",
    ],
  },
  {
    number: "04",
    title: "Cart & Checkout Friction Elimination",
    subtitle: "Turn high-intent intent into completed transactions",
    desc: "Unexpected shipping fees, forced account creation, and clunky mobile payment inputs kill high-intent buyers at the finish line. We streamline checkouts: one-page flows, localized express payment options (UPI, Apple Pay, Shop Pay), address auto-completion, and transparent delivery dates.",
    deliverables: [
      "One-click checkout & slide-cart optimization",
      "Express payment & digital wallet integration",
      "Shipping cost transparency & threshold bars",
      "Address autofill & form field reduction",
    ],
  },
  {
    number: "05",
    title: "Trust Architecture & Conversion Psychology",
    subtitle: "Eliminate buyer hesitation and perceived risk",
    desc: "Skeptical shoppers don't convert without ironclad reassurance. We weave behavioral psychology heuristics throughout the purchasing flow: strategic review snippets, risk-reversal guarantees, UGC photo proof stacks, secure payment seals, and verified real-time stock indicators.",
    deliverables: [
      "Dynamic social proof & review integration",
      "Risk-reversal guarantee & returns framework",
      "Trust badge & secure checkout certification",
      "Scarcity & urgency ethical guardrails",
    ],
  },
  {
    number: "06",
    title: "Scientific A/B & Multivariate Testing Engine",
    subtitle: "Validate changes with statistical significance",
    desc: "We don't guess or rely on subjective aesthetic opinions. We formulate rigorous test hypotheses using our ICE framework (Impact, Confidence, Ease), running split tests until they reach 95%+ Bayesian statistical significance before permanent deployment to production.",
    deliverables: [
      "ICE-prioritized experimentation sprint roadmap",
      "Split URL & visual A/B test implementation",
      "Bayesian statistical significance reporting",
      "Winning variant code integration into production",
    ],
  },
];

const croImpactComparison = [
  {
    metric: "Traffic Strategy",
    traditional: "Pouring more ad spend into a 1.2% converting website",
    sarvopaya: "Optimizing conversion to 2.4%—doubling revenue on same spend",
  },
  {
    metric: "Blended CAC",
    traditional: "Steadily rising due to Meta CPM inflation and ad fatigue",
    sarvopaya: "Cut by 30%–50% because twice as many visitors purchase",
  },
  {
    metric: "Contribution Margin",
    traditional: "Eroded by high acquisition costs and refund/drop-off churn",
    sarvopaya: "Skyrockets because additional conversions require zero incremental ad cost",
  },
  {
    metric: "Decision Making",
    traditional: "Subjective redesigns based on executive opinions",
    sarvopaya: "Data-led A/B testing backed by statistical confidence",
  },
];

const croProcessSteps = [
  {
    num: "01",
    phase: "Data Audit & Tracking Validation",
    desc: "We audit your GA4 events, Shopify analytics, and GTM container to ensure attribution and micro-conversion data are 100% accurate before analyzing user behavior.",
  },
  {
    num: "02",
    phase: "Heuristic & Qualitative Teardown",
    desc: "We analyze hundreds of user session recordings, heatmaps, and customer surveys to identify the cognitive friction points holding visitors back from purchasing.",
  },
  {
    num: "03",
    phase: "Hypothesis Prioritization (ICE)",
    desc: "We build an exhaustive backlog of high-conviction test hypotheses, scored by commercial Impact, Confidence, and Ease of implementation.",
  },
  {
    num: "04",
    phase: "A/B Test Design & Code Deployment",
    desc: "We design high-fidelity variants and engineer lightweight code overlays or theme updates to run clean split tests without slowing down site speed.",
  },
  {
    num: "05",
    phase: "Statistical Validation & Permanent Rollout",
    desc: "Once a variant reaches 95%+ statistical significance, we document the learnings and permanently hardcode the winning solution into your production theme.",
  },
];

const croDeliverables = [
  {
    title: "Forensic CRO Teardown Report",
    desc: "A comprehensive audit of your homepage, collection pages, product display pages (PDP), cart, and checkout with screen-recorded walkthroughs.",
    badge: "Diagnostic Blueprint",
  },
  {
    title: "ICE Experiment Sprint Backlog",
    desc: "A prioritized roadmap of 30+ conversion rate hypotheses ready to be tested sequentially over the next 90 days.",
    badge: "Execution Plan",
  },
  {
    title: "Figma UI/UX Test Variants",
    desc: "Production-ready, responsive designs for winning product page layouts, sticky CTAs, trust sections, and checkout flows.",
    badge: "Design Assets",
  },
  {
    title: "Statistical Significance Reporting",
    desc: "Transparent bi-weekly reporting detailing test winners, revenue per visitor lift, and overall contribution margin expansion.",
    badge: "Transparent Data",
  },
];

const croFaqs = [
  {
    q: "How does this Conversion Rate Optimisation page relate to Website & Digital Experience?",
    a: "Conversion Rate Optimisation (CRO) is a central service pillar of our Website & Digital Experience hub (located at /services/website-digital-experience#cro). While our digital experience team also designs custom Next.js and Shopify websites from scratch, this practice focuses specifically on optimizing existing digital assets to dramatically increase conversion rates and revenue per visitor.",
  },
  {
    q: "How much can CRO improve our conversion rates and revenue?",
    a: "Most ecommerce and D2C brands experience a +30% to +85% relative lift in conversion rate within the first 90 to 120 days of structured CRO. Because this revenue comes from traffic you are already paying for, the lift flows straight to your bottom-line contribution margin.",
  },
  {
    q: "Do we need high traffic volume to do CRO?",
    a: "For formal, statistically significant A/B testing, having at least 30,000 monthly unique visitors and 400+ monthly transactions is ideal. However, for earlier-stage brands, we conduct qualitative heuristic teardowns, friction elimination, and rapid UX overhauls that yield immediate double-digit improvements without requiring extended split testing periods.",
  },
  {
    q: "Will CRO split-testing scripts slow down our website?",
    a: "No. We write lightweight, asynchronous testing code or perform server-side edge redirects that preserve sub-second page load times and comply with Google Core Web Vitals guidelines. We never use heavy, lag-inducing client-side widgets that cause layout shift.",
  },
  {
    q: "Which ecommerce and CMS platforms do you support?",
    a: "We work seamlessly across Shopify, Shopify Plus, Next.js, Headless React, WooCommerce, Magento, and custom tech stacks. We integrate natively with your current development workflow.",
  },
  {
    q: "How quickly do we start seeing results?",
    a: "Our initial 360° Conversion Audit is completed within 7 to 10 days. First-wave high-impact fixes (checkout friction, mobile sticky CTA, trust badge placement) are deployed immediately, with formal A/B test experiments launched in 2-week rolling sprint cycles.",
  },
];

export default function ConversionRateOptimisationPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroIv = useInView(heroRef, { once: true, amount: 0.2 });
  const compRef = useRef<HTMLDivElement>(null);
  const compIv = useInView(compRef, { once: true, amount: 0.1 });
  const vectorsRef = useRef<HTMLDivElement>(null);
  const vectorsIv = useInView(vectorsRef, { once: true, amount: 0.1 });
  const processRef = useRef<HTMLDivElement>(null);
  const processIv = useInView(processRef, { once: true, amount: 0.1 });
  const delivRef = useRef<HTMLDivElement>(null);
  const delivIv = useInView(delivRef, { once: true, amount: 0.1 });
  const faqRef = useRef<HTMLDivElement>(null);
  const faqIv = useInView(faqRef, { once: true, amount: 0.2 });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Conversion Rate Optimisation (CRO)",
        serviceType: "Conversion Rate Optimization Services",
        provider: {
          "@type": "Organization",
          name: "Sarvopaya",
          url: "https://www.sarvopaya.com",
        },
        description:
          "Scientific Conversion Rate Optimisation (CRO) services for D2C brands, ecommerce, and scaling digital platforms. Fix leaky funnels, eliminate checkout friction, and run rigorous A/B tests.",
        url: "https://www.sarvopaya.com/services/Conversion-Rate-Optimisation",
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
            name: "Website & Digital Experience",
            item: "https://www.sarvopaya.com/services/website-digital-experience#cro",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Conversion Rate Optimisation",
            item: "https://www.sarvopaya.com/services/Conversion-Rate-Optimisation",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: croFaqs.map((f) => ({
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
          CONVERT
        </span>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={heroIv ? "show" : "hidden"}
          >
            {/* Breadcrumb connecting to website-digital-experience#cro */}
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
                href="/services/website-digital-experience#cro"
                className="flex items-center gap-1 font-semibold text-[var(--accent)] hover:underline underline-offset-4 transition-all"
              >
                <span>Website & Digital Experience (#cro)</span>
                <span className="text-[10px] text-black/40">↗</span>
              </Link>
              <span>/</span>
              <span className="font-bold text-black">Conversion Rate Optimisation</span>
            </motion.div>

            <motion.div variants={up}>
              <SectionLabel>Scientific Revenue Optimization</SectionLabel>
            </motion.div>

            {/* Explicit <h1> with "Conversion Rate Optimisation" as requested */}
            <motion.h1
              variants={up}
              className="font-heading text-5xl font-black leading-[1.05] tracking-tight text-black sm:text-6xl lg:text-7xl"
            >
              Conversion Rate Optimisation
              <br />
              <span className="text-[var(--accent)]">
                Turn Existing Traffic Into Compounding Revenue.
              </span>
            </motion.h1>

            <motion.p
              variants={up}
              className="mt-6 max-w-3xl text-lg leading-relaxed text-black/60 sm:text-xl"
            >
              More ad spend won't fix a leaking funnel. We conduct forensic qualitative
              and quantitative teardowns, eliminate checkout friction, and run scientific
              A/B tests to double your conversions without spending an additional rupee on media.
            </motion.p>

            {/* Quick Metrics Bar */}
            <motion.div
              variants={up}
              className="mt-10 grid grid-cols-2 gap-4 border-y border-black/8 py-6 sm:grid-cols-4"
            >
              <div>
                <p className="font-heading text-2xl font-black text-black sm:text-3xl">
                  +35% to +85%
                </p>
                <p className="mt-1 text-xs text-black/50">Average Conversion Lift</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-black text-black sm:text-3xl">
                  ₹0
                </p>
                <p className="mt-1 text-xs text-black/50">Extra Ad Spend Needed</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-black text-[var(--accent)] sm:text-3xl">
                  95%+
                </p>
                <p className="mt-1 text-xs text-black/50">Statistical Significance</p>
              </div>
              <div>
                <p className="font-heading text-2xl font-black text-black sm:text-3xl">
                  &lt; 60s
                </p>
                <p className="mt-1 text-xs text-black/50">Frictionless Checkout Time</p>
              </div>
            </motion.div>

            <motion.div variants={up} className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex h-13 items-center gap-2 rounded-full bg-black px-8 text-sm font-bold text-white transition-all duration-300 hover:bg-[var(--accent)] hover:shadow-xl"
              >
                Claim Your Free CRO Teardown <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/services/website-digital-experience#cro"
                className="inline-flex h-13 items-center gap-2 rounded-full border border-black/15 px-8 text-sm font-bold text-black transition-colors duration-300 hover:border-black/40 hover:bg-black/5"
              >
                Back to Website & Digital Experience Hub
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── THE LEAKY BUCKET PROBLEM ── */}
      <section className="bg-black/[0.02] py-20 sm:py-28 border-y border-black/6" ref={compRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={compIv ? "show" : "hidden"}
            className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center"
          >
            <motion.div variants={up} className="lg:col-span-5">
              <SectionLabel>The Leaky Bucket Trap</SectionLabel>
              <h2 className="font-heading text-3xl font-black leading-tight tracking-tight text-black sm:text-4xl">
                Why 98% of Your Paid Traffic Leaves Without Buying.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-black/60">
                Most ecommerce founders assume rising customer acquisition costs are an
                ad problem. In reality, it is almost always a conversion problem.
                If your site converts at 1.5%, you are losing 985 out of every 1,000 visitors.
                Improving that to 3.0% doubles your business overnight without changing your ad budget.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                <span className="text-xs font-bold uppercase tracking-wider text-black">
                  CRO unlocks massive leverage in your unit economics.
                </span>
              </div>
            </motion.div>

            <motion.div variants={up} className="lg:col-span-7">
              <div className="overflow-hidden rounded-3xl border border-black/8 bg-white shadow-sm">
                <div className="border-b border-black/6 bg-black/[0.02] px-6 py-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-black/50">
                    Acquisition Only vs. CRO-Optimized Funnel
                  </p>
                </div>
                <div className="divide-y divide-black/6">
                  {croImpactComparison.map((row) => (
                    <div key={row.metric} className="p-6">
                      <p className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-2">
                        {row.metric}
                      </p>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="rounded-xl bg-red-500/[0.04] border border-red-500/10 p-3.5">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-red-500">
                            Traditional Approach
                          </p>
                          <p className="mt-1 text-xs text-black/70">{row.traditional}</p>
                        </div>
                        <div className="rounded-xl bg-emerald-500/[0.05] border border-emerald-500/15 p-3.5">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                            Sarvopaya CRO Engine
                          </p>
                          <p className="mt-1 text-xs text-black/85 font-medium">{row.sarvopaya}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 6 CORE CRO VECTORS ── */}
      <section className="bg-white py-24 sm:py-32" ref={vectorsRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={vectorsIv ? "show" : "hidden"}
            className="mb-16"
          >
            <motion.div variants={up}>
              <SectionLabel>Forensic Optimization Scopes</SectionLabel>
            </motion.div>
            <motion.h2
              variants={up}
              className="font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              The 6 Vectors of Our
              <br />
              <span className="text-black/30">Conversion Rate Framework.</span>
            </motion.h2>
            <motion.p
              variants={up}
              className="mt-4 max-w-2xl text-base text-black/60"
            >
              We combine hard quantitative drop-off metrics with behavioral psychology and
              clean engineering execution to eliminate friction at every step of the funnel.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {croVectors.map((vec, i) => (
              <motion.div
                key={vec.number}
                initial={{ opacity: 0, y: 24 }}
                animate={vectorsIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
                className="flex flex-col justify-between rounded-3xl border border-black/8 bg-white p-8 transition-all duration-300 hover:border-black/20 hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-3xl font-black text-[var(--accent)]">
                      {vec.number}
                    </span>
                    <span className="rounded-full bg-black/[0.04] px-2.5 py-0.5 text-[10px] font-bold text-black/50 uppercase tracking-wider">
                      Vector
                    </span>
                  </div>

                  <h3 className="mt-4 font-heading text-xl font-bold text-black">
                    {vec.title}
                  </h3>
                  <p className="mt-1 text-xs font-semibold text-black/40 uppercase tracking-wider">
                    {vec.subtitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-black/60">
                    {vec.desc}
                  </p>
                </div>

                <div className="mt-6 border-t border-black/6 pt-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-black/35 mb-2.5">
                    What We Audit & Test
                  </p>
                  <ul className="space-y-1.5">
                    {vec.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-xs font-medium text-black/75"
                      >
                        <span className="text-[var(--accent)] font-bold">→</span>
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

      {/* ── 5-PHASE CRO METHODOLOGY ── */}
      <section className="bg-black/[0.02] py-24 sm:py-32" ref={processRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={processIv ? "show" : "hidden"}
            className="mb-16"
          >
            <motion.div variants={up}>
              <SectionLabel>Scientific Methodology</SectionLabel>
            </motion.div>
            <motion.h2
              variants={up}
              className="font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              How We Turn Insights
              <br />
              <span className="text-[var(--accent)]">Into Confirmed Revenue.</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
            {croProcessSteps.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                animate={processIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.1, duration: 0.6, ease: EASE }}
                className="relative flex flex-col justify-between rounded-2xl border border-black/8 bg-white p-6 shadow-sm"
              >
                <div>
                  <span className="font-heading text-3xl font-black text-[var(--accent)]">
                    {step.num}
                  </span>
                  <h3 className="mt-3 font-heading text-lg font-bold text-black">
                    {step.phase}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-black/60">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONCRETE DELIVERABLES ── */}
      <section className="bg-white py-24 sm:py-32" ref={delivRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={seq}
            initial="hidden"
            animate={delivIv ? "show" : "hidden"}
            className="mb-16"
          >
            <motion.div variants={up}>
              <SectionLabel>Tangible Assets</SectionLabel>
            </motion.div>
            <motion.h2
              variants={up}
              className="font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              What You Receive.
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {croDeliverables.map((d, idx) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, y: 20 }}
                animate={delivIv ? { opacity: 1, y: 0 } : {}}
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
                CRO Integrated With High-Velocity Execution.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
                CRO doesn't exist in a vacuum. Sarvopaya integrates conversion rate optimization
                with performance marketing, bespoke engineering, and AI automation for compounding returns:
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/services/website-digital-experience#cro"
                className="rounded-2xl border border-[var(--accent)]/40 bg-[var(--accent)]/10 p-5 transition-all hover:bg-[var(--accent)]/15"
              >
                <p className="text-xs font-bold text-[var(--accent)]">01. Experience Hub</p>
                <h4 className="mt-1 font-heading text-base font-bold text-white">
                  Website & Digital Experience
                </h4>
                <p className="mt-2 text-xs text-white/70">
                  Anchor portal connecting CRO, bespoke Next.js builds, and funnels.
                </p>
              </Link>

              <Link
                href="/services/website-development"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:bg-white/10 hover:border-white/20"
              >
                <p className="text-xs font-bold text-[var(--accent)]">02. Engineering</p>
                <h4 className="mt-1 font-heading text-base font-bold text-white">
                  Website Development
                </h4>
                <p className="mt-2 text-xs text-white/60">
                  Custom Next.js & Shopify builds engineered for speed and conversion.
                </p>
              </Link>

              <Link
                href="/services/d2c-marketing"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:bg-white/10 hover:border-white/20"
              >
                <p className="text-xs font-bold text-[var(--accent)]">03. Performance Ads</p>
                <h4 className="mt-1 font-heading text-base font-bold text-white">
                  D2C Performance Marketing
                </h4>
                <p className="mt-2 text-xs text-white/60">
                  Scale Meta & Google ad spend with higher revenue per session.
                </p>
              </Link>

              <Link
                href="/services/ai-automation"
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:bg-white/10 hover:border-white/20"
              >
                <p className="text-xs font-bold text-[var(--accent)]">04. Automation</p>
                <h4 className="mt-1 font-heading text-base font-bold text-white">
                  AI & n8n Workflows
                </h4>
                <p className="mt-2 text-xs text-white/60">
                  Automate checkout abandonment recovery via instant WhatsApp & email.
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
              <SectionLabel>FAQ</SectionLabel>
            </motion.div>
            <motion.h2
              variants={up}
              className="font-heading text-4xl font-black tracking-tight text-black sm:text-5xl"
            >
              Frequently Asked Questions.
            </motion.h2>
          </motion.div>

          <div className="space-y-4">
            {croFaqs.map((faq, i) => (
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
          <SectionLabel>Stop The Revenue Leaks</SectionLabel>
          <h2 className="mt-4 font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Double Your Conversions.
            <br />
            <span className="text-[var(--accent)]">Keep Your Ad Budget The Same.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/60 sm:text-lg">
            Stop losing 98% of your paid traffic at the finish line. Schedule a 30-minute
            CRO discovery session with our senior optimization team.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex h-13 items-center gap-2 rounded-full bg-[var(--accent)] px-8 text-sm font-bold text-white transition-all duration-300 hover:brightness-110 hover:shadow-2xl"
            >
              Get Your Free CRO Teardown <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/services/website-digital-experience#cro"
              className="inline-flex h-13 items-center gap-2 rounded-full border border-white/20 px-8 text-sm font-bold text-white transition-colors duration-300 hover:border-white/50 hover:bg-white/5"
            >
              Explore Digital Experience Hub
            </Link>
          </div>

          <p className="mt-6 text-xs text-white/40">
            Qualitative and quantitative diagnostics. No disruption to your live store during testing.
          </p>
        </div>
      </section>
    </>
  );
}
