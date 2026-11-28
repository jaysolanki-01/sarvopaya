"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FadeInView, CountUp } from "@/components/animation";
import CTAButton from "@/components/CTAButton";
import type { Metadata } from "next";

// ─── Animation presets ────────────────────────────────────────────────────────

const EASE = [0.16, 1, 0.3, 1] as const;
const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const container = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    num: "01",
    title: "Custom Shopware Development",
    desc: "Tailor-made Shopware 6 storefronts and headless builds engineered to your exact business logic, with clean architecture that scales.",
    tags: ["Shopware 6", "Headless", "Custom Plugins", "API-First"],
  },
  {
    num: "02",
    title: "Shopware Migration",
    desc: "Zero-downtime migration from WooCommerce, Magento, Shopify, or legacy Shopware 5 to Shopware 6 — products, orders, customers, and SEO intact.",
    tags: ["WooCommerce → SW6", "Magento → SW6", "Shopware 5 → 6", "Data Mapping"],
  },
  {
    num: "03",
    title: "Plugin & Extension Development",
    desc: "Custom Shopware plugins built to extend functionality — payment gateways, ERP connectors, loyalty programs, B2B portals, and more.",
    tags: ["Shopware Store", "Private Plugins", "ERP Connect", "Payment"],
  },
  {
    num: "04",
    title: "Theme & Storefront Design",
    desc: "Conversion-driven Shopware themes built on Twig and Vue.js — responsive, accessible, and engineered for speed and brand consistency.",
    tags: ["Twig", "Vue.js", "Responsive", "CRO-Optimised"],
  },
  {
    num: "05",
    title: "Shopware B2B Suite",
    desc: "Full B2B implementation — customer-specific pricing, quote workflows, company accounts, role-based access, and custom approval chains.",
    tags: ["B2B Suite", "Custom Pricing", "Quote Mgmt", "Company Accounts"],
  },
  {
    num: "06",
    title: "Performance & DevOps",
    desc: "Shopware hosting setup, CI/CD pipelines, Redis/Elasticsearch tuning, and ongoing performance audits to keep your store sub-2s.",
    tags: ["Redis", "Elasticsearch", "Docker", "CI/CD"],
  },
];

const WHYS = [
  {
    icon: "⚡",
    title: "API-First Architecture",
    desc: "Shopware 6's headless core lets you serve any frontend — React, Vue, mobile app — from one unified commerce backend.",
  },
  {
    icon: "🏗️",
    title: "Scales Without Rewrites",
    desc: "Built on Symfony and Vue.js with a plugin system that extends cleanly — no monkey-patching, no tech debt spirals.",
  },
  {
    icon: "🌍",
    title: "Built for Global Commerce",
    desc: "Multi-language, multi-currency, multi-sales-channel out of the box — ideal for India + international expansion.",
  },
  {
    icon: "🔌",
    title: "Open Ecosystem",
    desc: "7,000+ plugins in the Shopware Store. SAP, Salesforce, HubSpot, and local Indian payment gateways all integrate natively.",
  },
];

const STACK = [
  { label: "Platform", items: ["Shopware 6.6", "Shopware 6.5", "Shopware 5 (legacy)"] },
  { label: "Frontend", items: ["Twig", "Vue.js 3", "Nuxt.js", "React (headless)"] },
  { label: "Backend", items: ["PHP 8.2+", "Symfony 6", "Doctrine ORM"] },
  { label: "Infrastructure", items: ["Docker", "Kubernetes", "AWS / GCP", "Redis", "Elasticsearch"] },
  { label: "Integrations", items: ["Razorpay", "Cashfree", "SAP", "Unicommerce", "Shiprocket"] },
  { label: "DevOps", items: ["GitHub Actions", "GitLab CI", "Bitbucket Pipelines", "Cloudflare"] },
];

const INDUSTRIES = [
  "Fashion & Apparel",
  "Electronics & Gadgets",
  "Home & Furniture",
  "Beauty & Wellness",
  "Food & Grocery",
  "B2B Manufacturing",
  "Automotive Parts",
  "Healthcare & Pharma",
];

const PROCESS = [
  {
    num: "01",
    phase: "Discovery & Scoping",
    desc: "We map your catalogue structure, business rules, integrations, and growth targets to produce a detailed technical specification.",
    duration: "1–2 weeks",
  },
  {
    num: "02",
    phase: "Architecture & Design",
    desc: "Plugin architecture, database schema, API contracts, and storefront wireframes — signed off before a line of code is written.",
    duration: "1–2 weeks",
  },
  {
    num: "03",
    phase: "Agile Development",
    desc: "Two-week sprints with working demos at each milestone. Daily async updates, weekly video calls.",
    duration: "4–12 weeks",
  },
  {
    num: "04",
    phase: "QA & Performance",
    desc: "Automated test suites, Lighthouse audits, load testing, and security scanning before any code touches production.",
    duration: "1–2 weeks",
  },
  {
    num: "05",
    phase: "Launch & Support",
    desc: "Zero-downtime deployment, launch monitoring, and 60 days of post-launch support with SLA-backed response times.",
    duration: "Ongoing",
  },
];

const FAQS = [
  {
    q: "Why choose a Shopware development agency in India?",
    a: "Indian Shopware agencies offer a combination of certified Shopware expertise, significant cost advantage (typically 40–70% lower than UK/US rates), and overlapping time zones with Europe — where Shopware has the largest market share. Sarvopaya is based in Ahmedabad with clients across India, UAE, and Europe.",
  },
  {
    q: "What is the difference between Shopware 5 and Shopware 6?",
    a: "Shopware 6 is a complete rewrite on Symfony + Vue.js with an API-first, headless-ready architecture. It features a modern admin, visual content composer (Shopping Experiences), a plugin system built on Symfony DI, and far better performance at scale. We recommend all new projects on Shopware 6 and can migrate existing Shopware 5 stores.",
  },
  {
    q: "How long does a Shopware 6 store take to build?",
    a: "A standard Shopware 6 build typically takes 6–14 weeks depending on scope. A theme-only project can be done in 3–4 weeks. A full custom B2B platform with ERP integration is 12–20 weeks. We provide a detailed timeline after the discovery phase.",
  },
  {
    q: "Can you migrate our existing WooCommerce or Magento store to Shopware?",
    a: "Yes. We handle full data migrations — products (with variants, attributes, media), categories, customers, orders, and reviews. We also map your existing URL structure to preserve SEO rankings and set up 301 redirects for any changed URLs.",
  },
  {
    q: "Do you build custom Shopware plugins?",
    a: "Yes. We build both private plugins (for your store only) and plugins intended for the Shopware Store. Our plugins follow Shopware's official plugin system built on Symfony, with proper event subscribers, service decorators, and admin UI components in Vue.js.",
  },
  {
    q: "What Indian payment gateways do you integrate with Shopware?",
    a: "We integrate Razorpay, Cashfree, PayU, CCAvenue, Paytm, and PhonePe with Shopware 6. We build native Shopware payment plugins that support refunds, partial payments, and payment status webhooks.",
  },
  {
    q: "Do you support headless Shopware development?",
    a: "Yes. We build headless Shopware stores using the Shopware Store API (formerly Sales Channel API) with React or Nuxt.js frontends. This approach gives maximum frontend flexibility while keeping Shopware as the commerce engine.",
  },
  {
    q: "What does Shopware development cost in India?",
    a: "Our Shopware projects start from ₹3,00,000 for a standard theme implementation. Custom development with plugin work typically ranges from ₹6,00,000 to ₹25,00,000+. Enterprise B2B and headless projects are scoped individually. All engagements include a fixed-price proposal after discovery.",
  },
  {
    q: "Do you provide ongoing Shopware support and maintenance?",
    a: "Yes. We offer monthly retainers for Shopware support — covering security patches, plugin updates, performance monitoring, and new feature development. Plans start from ₹25,000/month.",
  },
  {
    q: "Is Shopware a good choice for B2B eCommerce in India?",
    a: "Shopware 6 has a mature B2B Suite that supports company accounts, role-based access, customer-specific pricing, quote requests, and minimum order values — making it one of the strongest B2B platforms available. We have implemented Shopware B2B for manufacturers and distributors serving the Indian and export market.",
  },
];

// ─── Components ───────────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-black/8">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-[15px] font-semibold leading-snug text-black">{q}</span>
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-black/15 text-black/40 text-sm transition-transform duration-300" style={{ transform: open ? "rotate(45deg)" : "none" }}>+</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-7 text-black/55">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://www.sarvopaya.com/services/shopware-development/#service",
      name: "Shopware Development",
      provider: {
        "@type": "Organization",
        "@id": "https://www.sarvopaya.com/#organization",
        name: "Sarvopaya",
      },
      description:
        "Custom Shopware 6 development, migration, plugin development, theme design, and B2B suite implementation by a certified Shopware agency in India.",
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "Germany" },
      ],
      serviceType: "eCommerce Development",
      url: "https://www.sarvopaya.com/services/shopware-development",
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.sarvopaya.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://www.sarvopaya.com/services" },
        { "@type": "ListItem", position: 3, name: "Shopware Development", item: "https://www.sarvopaya.com/services/shopware-development" },
      ],
    },
  ],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ShopwareDevelopmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
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
              "radial-gradient(ellipse 80% 50% at 50% 0%,rgba(237,40,48,0.09) 0%,transparent 65%)",
          }}
        />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-white/40">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-white transition-colors">Services</Link>
              <span>/</span>
              <span className="text-[var(--accent)] font-medium" aria-current="page">Shopware Development</span>
            </nav>

            <motion.span
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/40"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              Shopware Development Agency · India
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="font-heading text-4xl font-black leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              India&apos;s Dedicated{" "}
              <span className="text-[var(--accent)]">Shopware</span>{" "}
              Development Agency
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-2xl text-lg leading-8 text-white/50"
            >
              Custom Shopware 6 builds, migrations, plugin development, and B2B suite implementation — engineered by certified Shopware developers in India, serving clients across India, UAE, and Europe.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <CTAButton href="/contact" variant="primary" size="lg">
                Get a Free Shopware Audit
              </CTAButton>
              <CTAButton href="/contact" variant="outline" size="lg">
                Talk to a Developer
              </CTAButton>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={fadeUp}
              className="mt-14 grid grid-cols-2 gap-6 border-t border-white/8 pt-10 sm:grid-cols-4"
            >
              {[
                { value: 40, suffix: "+", label: "Shopware Projects" },
                { value: 5, suffix: "+", label: "Years Experience" },
                { value: 100, suffix: "%", label: "On-Time Delivery" },
                { value: 3, suffix: " Countries", label: "Clients Served" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="font-heading text-3xl font-black text-white">
                    <CountUp value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-xs font-medium text-white/35 uppercase tracking-widest">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES GRID ────────────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <FadeInView variant="fadeUp">
            <span className="mb-3 inline-block text-[10px] font-bold uppercase tracking-widest text-black/40">
              What We Build
            </span>
            <h2 className="font-heading text-3xl font-black tracking-tight text-black sm:text-4xl lg:text-5xl">
              Shopware Development Services
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-black/50">
              End-to-end Shopware expertise — from greenfield builds and platform migrations to plugin development, B2B implementation, and DevOps.
            </p>
          </FadeInView>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <FadeInView key={s.num} variant="fadeUp" delay={i * 0.07} start="top 90%">
                <div className="group h-full rounded-2xl border border-black/8 bg-white p-7 transition-shadow duration-300 hover:shadow-lg">
                  <div className="mb-4 font-heading text-xs font-black tracking-widest text-[var(--accent)]">{s.num}</div>
                  <h3 className="mb-3 text-base font-bold leading-snug text-black">{s.title}</h3>
                  <p className="mb-5 text-sm leading-6 text-black/50">{s.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.tags.map((t) => (
                      <span key={t} className="rounded-full bg-black/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-black/40">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY SHOPWARE ─────────────────────────────────────────────────── */}
      <section className="bg-black py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <FadeInView variant="fadeUp">
            <span className="mb-3 inline-block text-[10px] font-bold uppercase tracking-widest text-white/30">
              The Platform
            </span>
            <h2 className="font-heading text-3xl font-black tracking-tight text-white sm:text-4xl">
              Why Shopware 6 for Your eCommerce Store?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/45">
              Shopware 6 is Europe&apos;s fastest-growing commerce platform — open-source, API-first, and built for brands that need flexibility without paying enterprise licensing fees.
            </p>
          </FadeInView>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {WHYS.map((w, i) => (
              <FadeInView key={w.title} variant="fadeUp" delay={i * 0.08} start="top 90%">
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-7">
                  <div className="mb-4 text-2xl">{w.icon}</div>
                  <h3 className="mb-2 text-base font-bold text-white">{w.title}</h3>
                  <p className="text-sm leading-6 text-white/45">{w.desc}</p>
                </div>
              </FadeInView>
            ))}
          </div>

          {/* Shopware vs comparison strip */}
          <FadeInView variant="fadeUp" delay={0.2} start="top 92%">
            <div className="mt-10 overflow-x-auto rounded-2xl border border-white/8 bg-white/[0.02]">
              <table className="w-full min-w-[560px] text-sm">
                <thead>
                  <tr className="border-b border-white/8">
                    <th className="py-4 pl-6 text-left text-[10px] font-bold uppercase tracking-widest text-white/30">Feature</th>
                    <th className="py-4 text-center text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">Shopware 6</th>
                    <th className="py-4 text-center text-[10px] font-bold uppercase tracking-widest text-white/30">WooCommerce</th>
                    <th className="py-4 pr-6 text-center text-[10px] font-bold uppercase tracking-widest text-white/30">Magento 2</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Headless / API-first", "✓", "Partial", "✓"],
                    ["B2B Suite built-in", "✓", "Plugin only", "✓"],
                    ["Licence cost", "Free / Community", "Free", "High (Commerce)"],
                    ["Plugin ecosystem", "7,000+", "60,000+", "5,000+"],
                    ["Performance at scale", "Excellent", "Moderate", "Good"],
                    ["Developer talent pool in India", "Growing fast", "Abundant", "Limited"],
                  ].map(([feat, sw, woo, mag]) => (
                    <tr key={feat as string} className="border-b border-white/5 last:border-0">
                      <td className="py-3.5 pl-6 text-white/60">{feat}</td>
                      <td className="py-3.5 text-center font-semibold text-white">{sw}</td>
                      <td className="py-3.5 text-center text-white/35">{woo}</td>
                      <td className="py-3.5 pr-6 text-center text-white/35">{mag}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ── TECH STACK ───────────────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <FadeInView variant="fadeUp">
            <span className="mb-3 inline-block text-[10px] font-bold uppercase tracking-widest text-black/40">
              Technology
            </span>
            <h2 className="font-heading text-3xl font-black tracking-tight text-black sm:text-4xl">
              Our Shopware Tech Stack
            </h2>
          </FadeInView>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {STACK.map((s, i) => (
              <FadeInView key={s.label} variant="fadeUp" delay={i * 0.07} start="top 90%">
                <div className="rounded-2xl border border-black/8 p-6">
                  <div className="mb-4 text-[10px] font-bold uppercase tracking-widest text-[var(--accent)]">{s.label}</div>
                  <div className="flex flex-wrap gap-2">
                    {s.items.map((item) => (
                      <span key={item} className="rounded-lg bg-black/[0.04] px-3 py-1.5 text-xs font-medium text-black/60">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ───────────────────────────────────────────────────── */}
      <section className="bg-black py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <FadeInView variant="fadeUp">
            <span className="mb-3 inline-block text-[10px] font-bold uppercase tracking-widest text-white/30">
              Industries
            </span>
            <h2 className="font-heading text-3xl font-black tracking-tight text-white sm:text-4xl">
              Shopware Builds Across Industries
            </h2>
          </FadeInView>
          <div className="mt-10 flex flex-wrap gap-3">
            {INDUSTRIES.map((ind, i) => (
              <FadeInView key={ind} variant="scaleIn" delay={i * 0.05} start="top 92%">
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-white/60">
                  {ind}
                </span>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <FadeInView variant="fadeUp">
            <span className="mb-3 inline-block text-[10px] font-bold uppercase tracking-widest text-black/40">
              How We Work
            </span>
            <h2 className="font-heading text-3xl font-black tracking-tight text-black sm:text-4xl">
              Our Shopware Development Process
            </h2>
          </FadeInView>

          <div className="mt-14 space-y-4">
            {PROCESS.map((p, i) => (
              <FadeInView key={p.num} variant="fadeUp" delay={i * 0.08} start="top 92%">
                <div className="flex gap-6 rounded-2xl border border-black/8 p-7">
                  <div className="flex-none font-heading text-sm font-black text-[var(--accent)]">{p.num}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h3 className="text-base font-bold text-black">{p.phase}</h3>
                      <span className="rounded-full bg-black/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-black/40">
                        {p.duration}
                      </span>
                    </div>
                    <p className="text-sm leading-6 text-black/50">{p.desc}</p>
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY SARVOPAYA ────────────────────────────────────────────────── */}
      <section className="bg-black py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <FadeInView variant="fadeUp">
            <span className="mb-3 inline-block text-[10px] font-bold uppercase tracking-widest text-white/30">
              Why Us
            </span>
            <h2 className="font-heading text-3xl font-black tracking-tight text-white sm:text-4xl">
              Why Hire Sarvopaya as Your Shopware Agency in India?
            </h2>
          </FadeInView>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Shopware-Specialist Team", body: "Our developers work exclusively on Shopware — not juggling five platforms. Deep specialisation means faster builds and fewer surprises." },
              { title: "Fixed-Price Delivery", body: "We price by deliverable, not by hour. You know the cost before development starts, and we absorb any scope overrun in the agreed spec." },
              { title: "India-Based, Europe-Ready", body: "Ahmedabad-based team, with business hours that overlap with India, UAE, and Central European Time. No async lag for European clients." },
              { title: "Post-Launch SLA", body: "60-day warranty on all deliverables. Critical bugs fixed within 4 hours. Monthly retainers available for ongoing support." },
              { title: "SEO-First Builds", body: "Every Shopware store we build ships with schema markup, sitemap, structured data, and Core Web Vitals benchmarks baked in." },
              { title: "Indian Payment Stack", body: "Razorpay, Cashfree, PayU, and PhonePe integrations handled natively — no third-party wrappers, full webhook support." },
            ].map((w, i) => (
              <FadeInView key={w.title} variant="fadeUp" delay={i * 0.07} start="top 90%">
                <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-7">
                  <h3 className="mb-3 text-base font-bold text-white">{w.title}</h3>
                  <p className="text-sm leading-6 text-white/45">{w.body}</p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section id="faqs" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <FadeInView variant="fadeUp">
            <span className="mb-3 inline-block text-[10px] font-bold uppercase tracking-widest text-black/40">
              FAQ
            </span>
            <h2 className="font-heading text-3xl font-black tracking-tight text-black sm:text-4xl">
              Shopware Development — Frequently Asked Questions
            </h2>
          </FadeInView>

          <div className="mt-12">
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-black py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <FadeInView variant="fadeUp">
            <span className="mb-4 inline-block text-[10px] font-bold uppercase tracking-widest text-white/30">
              Get Started
            </span>
            <h2 className="font-heading text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to Build on Shopware?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/45">
              Tell us about your project — new build, migration, or plugin development. We&apos;ll respond within one business day with a scoping call invitation.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <CTAButton href="/contact" variant="primary" size="lg">
                Start Your Shopware Project
              </CTAButton>
              <CTAButton href="/services" variant="outline" size="lg">
                View All Services
              </CTAButton>
            </div>
            <p className="mt-8 text-xs text-white/25">
              Based in Ahmedabad, India · Serving clients across India, UAE & Europe
            </p>
          </FadeInView>
        </div>
      </section>
    </>
  );
}
