"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import CTAButton from "@/components/CTAButton";
import FinalCTA from "@/components/FinalCTA";

const EASE = [0.16, 1, 0.3, 1] as const;

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/* ── Service categories ──────────────────────────────────────────────────── */
type ServiceId =
  | "all"
  | "performance-marketing"
  | "seo"
  | "social-media"
  | "website"
  | "growth-consulting";

const SERVICES: { id: ServiceId; label: string }[] = [
  { id: "all",                   label: "All Work" },
  { id: "performance-marketing", label: "Performance Marketing" },
  { id: "seo",                   label: "SEO" },
  { id: "social-media",          label: "Social Media" },
  { id: "website",               label: "Website & Digital" },
  { id: "growth-consulting",     label: "Growth Consulting" },
];

/* ── Projects ────────────────────────────────────────────────────────────── */
interface Project {
  id: string;
  title: string;
  headline: string;
  industry: string;
  service: ServiceId;
  tags: string[];
  bigStat: string;
  bigStatLabel: string;
  metrics: { label: string; value: string }[];
  about: string;
  result: string;
}

const PROJECTS: Project[] = [
  {
    id: "teleprompter-app",
    title: "Teleprompter App",
    headline: "MRR $400 → $2,000",
    industry: "Mobile App",
    service: "performance-marketing",
    tags: ["Google UAC", "Meta Ads", "Influencer", "Remarketing"],
    bigStat: "5×",
    bigStatLabel: "MRR Growth",
    metrics: [
      { label: "App Installs",   value: "1.69K" },
      { label: "Cost / Install", value: "₹2.06" },
      { label: "Total Spend",    value: "₹3.47K" },
      { label: "Total Installs", value: "60K+" },
    ],
    about:
      "A teleprompter app with a high churn rate among paying users needed to grow recurring revenue. The strategy focused on winning back lapsed paid users via Google in-app purchase ads, while Meta Ads attracted new sign-ups and influencer marketing amplified reach.",
    result:
      "Achieved 60% of the revenue expansion target, growing MRR from $400 to $2,000. Total installs crossed 60,000.",
  },
  {
    id: "study-visa-consultancy",
    title: "Study Visa Consultancy",
    headline: "ROAS 10× in 15 Days",
    industry: "Education / Visa Consultancy",
    service: "performance-marketing",
    tags: ["Meta Ads", "Google PMax", "Influencer", "Lead Gen"],
    bigStat: "10×",
    bigStatLabel: "ROAS — 15 Days",
    metrics: [
      { label: "Clicks",       value: "188" },
      { label: "Impressions",  value: "2.31K" },
      { label: "Avg. CPC",     value: "₹14.39" },
      { label: "Students Won", value: "5" },
    ],
    about:
      "A study visa consultancy needed to drive footfall to a European Education Fair in just 15 days. A full-funnel campaign was built: influencer video for awareness, Meta Ads across three objectives, and a Google PMax campaign for calls and local reach.",
    result:
      "5 students converted from a ₹20,000 spend, delivering a 10× ROAS within the 15-day window.",
  },
  {
    id: "ayurvedic-brand",
    title: "Ayurvedic E-commerce Brand",
    headline: "0 to Market — 3.84× ROAS",
    industry: "E-commerce / Health",
    service: "performance-marketing",
    tags: ["GTM Strategy", "Meta Ads", "AI Creatives", "Brand Launch"],
    bigStat: "3.84×",
    bigStatLabel: "ROAS",
    metrics: [
      { label: "ROAS", value: "3.84×" },
      { label: "ROI",  value: "148.7%" },
    ],
    about:
      "A brand-new Ayurvedic product needed a complete go-to-market plan before a single rupee was spent on ads. GTM planning, market research, and an AI-assisted creative production process laid the foundation. Meta Ads then ran across four objectives: Awareness, Sales, Leads, and Profile Visits.",
    result:
      "Achieved a 3.84× ROAS and 148.7% ROI from launch, validating the product-market fit and GTM strategy.",
  },
  {
    id: "video-conferencing-saas",
    title: "Open-Source Video Conferencing",
    headline: "31.1K Clicks · 584K Impressions",
    industry: "SaaS / Video Conferencing",
    service: "seo",
    tags: ["On-page SEO", "Technical SEO", "Content Strategy", "TOFU–BOFU"],
    bigStat: "584K",
    bigStatLabel: "Impressions (12 mo.)",
    metrics: [
      { label: "Total Clicks",  value: "31.1K" },
      { label: "Impressions",   value: "584K" },
      { label: "CTR",           value: "5.3%" },
      { label: "Leads / Month", value: "150+" },
    ],
    about:
      "An open-source video conferencing SaaS needed to build organic authority from near zero. A TOFU–MOFU–BOFU content plan was designed and executed alongside on-page and technical SEO fixes.",
    result:
      "Generated 31.1K clicks and 584K impressions in 12 months, with 150+ quality leads/month flowing consistently.",
  },
  {
    id: "white-label-platform",
    title: "White-Label SaaS Platform",
    headline: "10 Blogs on Page 1",
    industry: "SaaS / White-label",
    service: "seo",
    tags: ["SEO Audit", "On-page SEO", "Content Plan", "Competitor Research"],
    bigStat: "10",
    bigStatLabel: "Blogs on Page 1",
    metrics: [
      { label: "Total Clicks",  value: "487" },
      { label: "Impressions",   value: "84.1K" },
      { label: "CTR",           value: "0.6%" },
      { label: "Avg. Position", value: "40.8" },
    ],
    about:
      "A white-label SaaS platform needed to build organic visibility from scratch with no existing SEO foundation. A full audit, on-page optimisation, competitor research, and a structured content plan were executed.",
    result:
      "10 blog posts now rank on page 1 of Google. The platform consistently attracts high-quality leads through organic search.",
  },
  {
    id: "b2b-tech-brand",
    title: "B2B Tech Brand",
    headline: "38.2K Impressions · 236 Clicks",
    industry: "Technology / B2B",
    service: "seo",
    tags: ["On-page SEO", "Technical SEO", "Content Strategy", "Keyword Research"],
    bigStat: "38.2K",
    bigStatLabel: "Impressions",
    metrics: [
      { label: "Total Clicks",  value: "236" },
      { label: "Impressions",   value: "38.2K" },
      { label: "CTR",           value: "0.6%" },
      { label: "Avg. Position", value: "14.5" },
    ],
    about:
      "A B2B tech brand needed to establish organic search presence in a competitive niche. A structured SEO approach was applied — keyword research, on-page optimisation, and a content strategy targeting mid-funnel queries.",
    result:
      "Generated 38.2K impressions and 236 clicks with steady upward momentum. Impressions tripled in the final month, signalling strong organic growth.",
  },
];

/* ── Helpers ─────────────────────────────────────────────────────────────── */
function serviceLabel(id: ServiceId) {
  return SERVICES.find((s) => s.id === id)?.label ?? "";
}

/* ── Project Card ────────────────────────────────────────────────────────── */
const SERVICE_COLORS: Record<ServiceId, string> = {
  "all":                   "#000000",
  "performance-marketing": "#ed2830",
  "seo":                   "#22c55e",
  "social-media":          "#60a5fa",
  "website":               "#f59e0b",
  "growth-consulting":     "#a855f7",
};

function ProjectCard({ p, idx }: { p: Project; idx: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const iv  = useInView(ref, { once: true, amount: 0.15 });
  const col = SERVICE_COLORS[p.service];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={iv ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (idx % 3) * 0.08, duration: 0.6, ease: EASE }}
      className="flex flex-col rounded-3xl border border-black/8 bg-white overflow-hidden transition-shadow duration-300 hover:shadow-lg"
    >
      {/* colour stripe */}
      <div className="h-1 w-full" style={{ background: col }} />

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        {/* service badge + industry */}
        <div className="mb-5 flex items-center justify-between">
          <span
            className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{ background: `${col}12`, color: col, border: `1px solid ${col}25` }}
          >
            {serviceLabel(p.service)}
          </span>
          <span className="text-[11px] font-medium text-black/35">{p.industry}</span>
        </div>

        {/* title + big stat */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-heading text-xl font-bold leading-tight text-black">{p.title}</h3>
            <p className="mt-1 text-sm text-black/50">{p.headline}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-heading text-3xl font-black leading-none tabular-nums" style={{ color: col }}>
              {p.bigStat}
            </p>
            <p className="mt-0.5 text-[9px] font-bold uppercase tracking-widest text-black/35">{p.bigStatLabel}</p>
          </div>
        </div>

        {/* metrics */}
        <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {p.metrics.map((m) => (
            <div key={m.label} className="rounded-xl bg-black/[0.03] px-3 py-2.5">
              <p className="text-base font-black tabular-nums text-black">{m.value}</p>
              <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-wider text-black/40">{m.label}</p>
            </div>
          ))}
        </div>

        {/* tags */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {p.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-black/10 px-2.5 py-1 text-[10px] font-semibold text-black/50">
              {tag}
            </span>
          ))}
        </div>

        {/* expand / collapse */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-auto flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors hover:text-black"
          style={{ color: open ? col : "rgba(0,0,0,0.35)" }}
        >
          {open ? "Hide Detail" : "View Detail"}
          <span className={`transition-transform duration-300 ${open ? "rotate-45" : ""}`} style={{ fontSize: 18, lineHeight: 1 }}>+</span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-4 border-t border-black/8 pt-4">
                <div>
                  <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: col }}>
                    The Challenge + Approach
                  </p>
                  <p className="text-sm leading-relaxed text-black/60">{p.about}</p>
                </div>
                <div>
                  <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.18em]" style={{ color: col }}>
                    The Result
                  </p>
                  <p className="text-sm leading-relaxed text-black/70">{p.result}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ── Empty state ─────────────────────────────────────────────────────────── */
function EmptyState({ label }: { label: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="col-span-full flex flex-col items-center py-20 text-center"
    >
      <p className="text-base font-bold text-black/40">{label} work coming soon.</p>
      <p className="mt-2 text-sm text-black/30">We&rsquo;re putting the finishing touches on these case studies.</p>
    </motion.div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function WorkPage() {
  const [active, setActive] = useState<ServiceId>("all");

  const filtered = active === "all" ? PROJECTS : PROJECTS.filter((p) => p.service === active);

  return (
    <>
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-white">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 select-none whitespace-nowrap text-[160px] font-bold uppercase leading-none text-transparent sm:-top-16 sm:text-[240px] lg:-top-20 lg:text-[320px]"
          style={{ WebkitTextStroke: "1px rgba(0,0,0,0.06)" }}
        >
          WORK
        </span>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-28"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-black/60"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            Our Work
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-6 font-heading text-4xl font-bold leading-[1.05] tracking-tight text-black sm:text-6xl lg:text-7xl"
          >
            Real Campaigns.{" "}
            <span className="text-[var(--accent)]">Real Results.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-black/60 sm:text-xl"
          >
            See how we&rsquo;ve driven measurable growth across performance
            marketing, SEO, social media and growth strategy for brands across
            industries.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <div className="w-full sm:w-auto">
              <CTAButton href="#projects" variant="outline" size="lg" fullWidth>
                View Projects
              </CTAButton>
            </div>
            <div className="w-full sm:w-auto">
              <CTAButton href="/contact" variant="primary" size="lg" fullWidth>
                Start Your Project
              </CTAButton>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Filters + Grid */}
      <section id="projects" className="w-full scroll-mt-20 bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Filter pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-wrap justify-center gap-3"
          >
            {SERVICES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(s.id)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 ${
                  active === s.id
                    ? "bg-black text-white"
                    : "border border-black/10 text-black/60 hover:border-black/30 hover:text-black"
                }`}
              >
                {s.label}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-14 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.length > 0
                ? filtered.map((p, i) => <ProjectCard key={p.id} p={p} idx={i} />)
                : <EmptyState label={serviceLabel(active)} />
              }
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="mt-14 text-center text-black/50">
              No projects in this category yet — check back soon.
            </p>
          )}
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
