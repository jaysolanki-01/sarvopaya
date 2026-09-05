"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import CTAButton from "@/components/CTAButton";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "What is the difference between a website redesign and CRO?", acceptedAnswer: { "@type": "Answer", text: "A redesign changes the look, structure and technology of a site. CRO focuses on improving how many visitors take the desired action using data, testing and targeted changes. They complement each other but serve different purposes." } },
        { "@type": "Question", name: "How long does a website development project take?", acceptedAnswer: { "@type": "Answer", text: "A landing page can be ready in 1–2 weeks. A full website typically takes 4–8 weeks depending on scope, number of pages, content availability and revision rounds." } },
        { "@type": "Question", name: "Do you build on Shopify or custom stacks?", acceptedAnswer: { "@type": "Answer", text: "Both. For ecommerce brands, we build on Shopify when the standard platform fits, or develop a custom Next.js solution when you need more flexibility." } },
        { "@type": "Question", name: "What makes a landing page high-converting?", acceptedAnswer: { "@type": "Answer", text: "Message-to-ad match, a clear single objective, a compelling headline, fast load time, trust signals, and a frictionless CTA." } },
        { "@type": "Question", name: "Do you handle tracking and analytics setup?", acceptedAnswer: { "@type": "Answer", text: "Yes. Every project includes GA4 event tracking, Google Tag Manager setup, and integration with any ad platforms running traffic to the site." } },
        { "@type": "Question", name: "Can you improve our existing site without a full rebuild?", acceptedAnswer: { "@type": "Answer", text: "Yes. CRO and landing page projects can work on top of your existing site. A full rebuild is only recommended when the current site has fundamental structural issues." } },
      ],
    },
    {
      "@type": "Service",
      "@id": "https://sarvopaya.com/services/website-digital-experience",
      name: "Website Development & Digital Experience",
      description:
        "Website development, CRO, and landing page design for brands that want a site that converts. Fast, modern, conversion-focused websites using Next.js, React and Shopify.",
      provider: { "@type": "Organization", name: "Sarvopaya", url: "https://sarvopaya.com" },
      serviceType: "Website Development",
      areaServed: "India",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Web Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Website Development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Conversion Rate Optimisation" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Landing Pages & Funnels" } },
        ],
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://sarvopaya.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://sarvopaya.com/services" },
        { "@type": "ListItem", position: 3, name: "Website & Digital Experience", item: "https://sarvopaya.com/services/website-digital-experience" },
      ],
    },
  ],
};

// ─── Shared ───────────────────────────────────────────────────────────────────

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <motion.span
      variants={fadeUp}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ${
        light ? "border-black/10 text-black/50" : "border-white/10 text-white/40"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
      {children}
    </motion.span>
  );
}

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span aria-hidden="true" className="relative flex h-6 w-6 shrink-0 items-center justify-center">
      <span className="absolute h-0.5 w-4 rounded-full bg-current" />
      <span className={`absolute h-0.5 w-4 rotate-90 rounded-full bg-current transition-all duration-300 ${open ? "scale-x-0 opacity-0" : ""}`} />
    </span>
  );
}

// ─── Services Cards ───────────────────────────────────────────────────────────

const SERVICES = [
  {
    id: "website-development",
    num: "01",
    title: "Website Development",
    subtitle: "Custom websites built to perform",
    desc: "We design and develop fast, modern websites that represent your brand and convert visitors into customers. Built on Next.js, React or Shopify — whichever fits your business model.",
    items: [
      "Custom website design",
      "Next.js / React development",
      "Shopify & ecommerce builds",
      "CMS integration (Sanity, Contentful)",
      "Mobile-first responsive design",
      "Page speed optimization",
      "SEO-ready architecture",
      "Analytics & tracking setup",
    ],
  },
  {
    id: "cro",
    num: "02",
    title: "CRO",
    subtitle: "Conversion Rate Optimisation",
    desc: "More traffic won't fix a leaking funnel. We audit your site, identify drop-off points, and make data-led changes that turn more visitors into buyers — without increasing your ad spend.",
    items: [
      "Full conversion audit",
      "Heatmap & session recording analysis",
      "Landing page redesign",
      "A/B testing framework",
      "Above-the-fold optimization",
      "Trust signal integration",
      "Checkout friction reduction",
      "Mobile UX improvements",
    ],
  },
  {
    id: "landing-pages-funnels",
    num: "03",
    title: "Landing Pages & Funnels",
    subtitle: "High-converting pages for every campaign",
    desc: "Generic product pages kill ad performance. We build dedicated landing pages and funnel sequences matched to your campaigns, audience, and offer — to squeeze more revenue from the same traffic.",
    items: [
      "Campaign-specific landing pages",
      "Lead generation funnels",
      "Sales funnel design",
      "Ad-to-page message match",
      "Thank you & upsell pages",
      "Webinar & event pages",
      "Multi-step form funnels",
      "Split testing setup",
    ],
  },
];

function ServiceCard({ s, idx }: { s: (typeof SERVICES)[0]; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      id={s.id}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: idx * 0.1, duration: 0.7, ease: EASE }}
      className="rounded-2xl border border-black/8 bg-white overflow-hidden"
    >
      <div className="h-1 w-full bg-[var(--accent)]" />
      <div className="p-6 sm:p-8">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
              {s.num}
            </p>
            <h3 className="font-heading text-2xl font-black text-black sm:text-3xl">{s.title}</h3>
            <p className="mt-0.5 text-sm text-black/45">{s.subtitle}</p>
          </div>
        </div>
        <p className="mb-6 text-[15px] leading-7 text-black/60">{s.desc}</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {s.items.map((it) => (
            <div key={it} className="flex items-center gap-2.5 rounded-lg bg-black/[0.03] px-3 py-2.5">
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
              <span className="text-[13px] text-black/65">{it}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Tech Stack ───────────────────────────────────────────────────────────────

const TECH = [
  { name: "Next.js",        cat: "Framework" },
  { name: "React",          cat: "Framework" },
  { name: "Shopify",        cat: "Ecommerce" },
  { name: "TypeScript",     cat: "Language" },
  { name: "Tailwind CSS",   cat: "Styling" },
  { name: "Framer Motion",  cat: "Animation" },
  { name: "Sanity CMS",     cat: "CMS" },
  { name: "Contentful",     cat: "CMS" },
  { name: "Vercel",         cat: "Hosting" },
  { name: "GA4",            cat: "Analytics" },
  { name: "Google Tag Mgr", cat: "Analytics" },
  { name: "Hotjar",         cat: "CRO" },
];

// ─── Process Steps ────────────────────────────────────────────────────────────

const PROCESS = [
  {
    num: "01",
    label: "Discovery",
    desc: "We map your goals, audience, existing assets and competitors. This shapes every design and development decision that follows.",
  },
  {
    num: "02",
    label: "Strategy & Wireframes",
    desc: "Page structure, user flow and conversion architecture defined before any design work starts. We think in funnels, not just pages.",
  },
  {
    num: "03",
    label: "Design",
    desc: "High-fidelity designs in your brand language. Desktop and mobile. Every element has a conversion purpose.",
  },
  {
    num: "04",
    label: "Development",
    desc: "Clean, performant code. Page speed, accessibility and SEO built in from the start — not bolted on after.",
  },
  {
    num: "05",
    label: "QA & Launch",
    desc: "Cross-browser and device testing, tracking verification, redirect mapping, and a staged launch process.",
  },
  {
    num: "06",
    label: "Optimise",
    desc: "Post-launch CRO: heatmaps, A/B tests, and iterative improvements based on how real users behave on the live site.",
  },
];

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const FAQS = [
  {
    q: "What is the difference between a website redesign and CRO?",
    a: "A redesign changes the look, structure and technology of a site. CRO (Conversion Rate Optimisation) focuses on improving how many visitors take the desired action — a purchase, a lead, a sign-up — using data, testing and targeted changes. They complement each other but serve different purposes.",
  },
  {
    q: "How long does a website development project take?",
    a: "A landing page can be ready in 1–2 weeks. A full website typically takes 4–8 weeks depending on scope, number of pages, content availability and revision rounds. We agree on a clear timeline before any work starts.",
  },
  {
    q: "Do you build on Shopify or custom stacks?",
    a: "Both. For ecommerce brands, we build on Shopify when the standard platform fits, or develop a custom Next.js solution when you need more flexibility. The right choice depends on your product catalogue, tech requirements and long-term roadmap.",
  },
  {
    q: "What makes a landing page high-converting?",
    a: "Message-to-ad match, a clear single objective, a compelling headline, fast load time, trust signals (reviews, proof, guarantees), and a frictionless CTA. A landing page fails most often because it asks visitors to do too many things or doesn't match what the ad promised.",
  },
  {
    q: "Do you handle tracking and analytics setup?",
    a: "Yes. Every project includes GA4 event tracking, Google Tag Manager setup, and integration with any ad platforms running traffic to the site. Accurate tracking is a prerequisite for any CRO or paid media work.",
  },
  {
    q: "Can you improve our existing site without a full rebuild?",
    a: "Yes. CRO and landing page projects can work on top of your existing site. We audit what's there, identify the highest-leverage changes, and implement them — a full rebuild is only recommended when the current site has fundamental structural issues.",
  },
];

function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="mt-10 divide-y divide-black/8">
      {FAQS.map((faq, i) => (
        <div key={i}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="flex w-full items-center justify-between gap-4 py-5 text-left"
          >
            <span className="font-heading text-[15px] font-bold leading-snug text-black sm:text-base">
              {faq.q}
            </span>
            <PlusIcon open={open === i} />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="overflow-hidden"
              >
                <p className="pb-5 text-[15px] leading-7 text-black/58">{faq.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WebsiteDigitalExperience() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── 01 HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-black pb-20 pt-28 sm:pb-28 sm:pt-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%,rgba(237,40,48,0.07) 0%,transparent 65%)",
          }}
        />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>Website & Digital Experience</SectionLabel>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-7 font-heading text-4xl font-black leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              Websites That Work
              <br />
              <span style={{ color: "rgba(255,255,255,0.25)" }}>As Hard As</span>
              <br />
              Your Best Salesperson.
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-7 max-w-2xl text-lg leading-8 text-white/50 sm:text-xl"
            >
              We design and build conversion-focused websites, landing pages and
              funnels for brands that want their digital presence to drive real
              revenue — not just look good.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
              <CTAButton href="/contact" variant="primary" size="lg">
                Get a Free Website Audit
              </CTAButton>
              <CTAButton href="/contact" variant="outline" size="lg">
                Discuss Your Project
              </CTAButton>
            </motion.div>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
            className="mt-16 flex flex-wrap gap-x-10 gap-y-6 border-t pt-10"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}
          >
            {[
              { v: "2×",   l: "Average CVR Improvement" },
              { v: "<2s",  l: "Target Load Time" },
              { v: "100%", l: "Mobile-First Builds" },
              { v: "4–8w", l: "Typical Delivery" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-heading text-3xl font-black text-white sm:text-4xl">{s.v}</p>
                <p className="mt-0.5 text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 02 THE PROBLEM ───────────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-2xl"
          >
            <SectionLabel light>The Problem</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              A Beautiful Site That
              <br />
              Doesn&rsquo;t Convert Is Just
              <br />
              an Expensive Brochure.
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-5 text-lg leading-8 text-black/55"
            >
              Most websites are built to impress in a design review, not to
              convert visitors. Slow load times, unclear messaging, poor mobile
              UX and mismatched ad-to-page journeys leave revenue on the table
              every single day.
            </motion.p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                problem: "Slow pages",
                impact: "1s delay = 7% drop in conversions",
              },
              {
                problem: "Ad-to-page mismatch",
                impact: "Visitor bounces when the page doesn't match the ad promise",
              },
              {
                problem: "Generic landing pages",
                impact: "Same page for every campaign means optimising for no one",
              },
              {
                problem: "No trust signals",
                impact: "Visitors won't buy from a site that feels risky",
              },
              {
                problem: "Poor mobile UX",
                impact: "60%+ of traffic is mobile — bad mobile = lost revenue",
              },
              {
                problem: "Unclear CTA",
                impact: "If visitors don't know what to do next, they leave",
              },
            ].map(({ problem, impact }) => (
              <motion.div
                key={problem}
                variants={fadeUp}
                className="rounded-xl border border-black/8 bg-black/[0.02] p-5"
              >
                <p className="font-heading text-sm font-bold text-black">{problem}</p>
                <p className="mt-1.5 text-[13px] leading-5 text-black/50">{impact}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 03 SERVICES ──────────────────────────────────────────────────── */}
      <section className="bg-[#f7f7f7] py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-12 max-w-2xl"
          >
            <SectionLabel light>What We Do</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              Three Ways We Help
              <br />
              Your Site Perform Better.
            </motion.h2>
          </motion.div>

          <div className="flex flex-col gap-8">
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.id} s={s} idx={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 TECH STACK ────────────────────────────────────────────────── */}
      <section className="bg-black py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-2xl"
          >
            <SectionLabel>Technology</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl"
            >
              Modern Stack.
              <br />
              Zero Bloat.
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-5 text-lg leading-8 text-white/45"
            >
              We use the right tool for the job — not the one that&rsquo;s
              easiest for us to build on. Every technology decision is made
              around your performance, scale and ownership requirements.
            </motion.p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
          >
            {TECH.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                className="rounded-xl border border-white/8 bg-white/[0.04] px-4 py-4"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">{t.cat}</p>
                <p className="mt-1 font-heading text-sm font-bold text-white">{t.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 05 PROCESS ───────────────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-2xl"
          >
            <SectionLabel light>How We Work</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              A Process Built for
              <br />
              Outcomes, Not Output.
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-5 text-lg leading-8 text-black/55"
            >
              We don&rsquo;t deliver a site and disappear. Every project follows
              a structured process that starts with your business goals and ends
              with a live, optimised, tracked digital experience.
            </motion.p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {PROCESS.map((p) => (
              <motion.div
                key={p.num}
                variants={fadeUp}
                className="rounded-2xl border border-black/8 bg-black/[0.02] p-6"
              >
                <p className="font-heading text-4xl font-black text-black/8">{p.num}</p>
                <p className="mt-3 font-heading text-lg font-bold text-black">{p.label}</p>
                <p className="mt-2 text-[13px] leading-6 text-black/55">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 06 WHY SARVOPAYA ─────────────────────────────────────────────── */}
      <section className="bg-black py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-2xl"
          >
            <SectionLabel>Why Sarvopaya</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl"
            >
              We Build Sites
              <br />
              Like We Run Ads.
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-5 text-lg leading-8 text-white/45"
            >
              Because we also manage paid media for our clients, we know exactly
              what makes a page convert after a click. We don&rsquo;t just hand
              you a site — we hand you a revenue asset.
            </motion.p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {[
              {
                title: "Performance-first mindset",
                desc: "Every design decision is weighed against conversion impact. If it doesn't help the visitor convert, it doesn't ship.",
              },
              {
                title: "Tracking built in from day one",
                desc: "GA4, GTM, Meta Pixel, Google Ads conversions — all set up before launch, not as an afterthought.",
              },
              {
                title: "Ad-to-page alignment",
                desc: "We build landing pages that match the ad creative, audience, and offer — because message mismatch is the #1 conversion killer.",
              },
              {
                title: "No templates, no shortcuts",
                desc: "Every site is built from scratch for your brand, your audience and your conversion goals. Not a theme with your logo swapped in.",
              },
              {
                title: "Post-launch optimisation",
                desc: "Launch is the start, not the finish. We run CRO experiments after go-live using real user data to keep improving.",
              },
              {
                title: "Fast turnaround",
                desc: "We work in focused sprints. Landing pages in 1–2 weeks. Full sites in 4–8 weeks. No endless revision cycles.",
              },
            ].map(({ title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="flex gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-6"
              >
                <span aria-hidden="true" className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
                <div>
                  <p className="font-heading text-base font-bold text-white">{title}</p>
                  <p className="mt-1.5 text-[14px] leading-6 text-white/45">{desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 07 FAQ ───────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-4"
          >
            <SectionLabel light>FAQ</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              Common Questions.
            </motion.h2>
          </motion.div>
          <FAQAccordion />
        </div>
      </section>

      {/* ── 08 CTA ───────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-black py-24 sm:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 100%,rgba(237,40,48,0.1) 0%,transparent 65%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.p
              variants={fadeUp}
              className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--accent)]"
            >
              Get Started
            </motion.p>
            <motion.h2
              variants={item}
              className="font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Ready to Build a Site
              <br />
              That Actually Converts?
            </motion.h2>
            <motion.p
              variants={item}
              className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/45"
            >
              Tell us about your project. We&rsquo;ll audit your current site,
              identify the biggest opportunities, and show you exactly what we&rsquo;d build.
            </motion.p>
            <motion.div
              variants={item}
              className="mt-10 flex flex-wrap justify-center gap-3"
            >
              <CTAButton href="/contact" variant="primary" size="lg">
                Start a Project
              </CTAButton>
              <CTAButton href="/work" variant="outline" size="lg">
                See Our Work
              </CTAButton>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
