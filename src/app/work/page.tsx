"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";

/* ── Tokens ──────────────────────────────────────────────────────────────── */
const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Service categories ──────────────────────────────────────────────────── */
type ServiceId =
  | "all"
  | "performance-marketing"
  | "seo"
  | "social-media"
  | "website"
  | "growth-consulting";

const SERVICES: { id: ServiceId; label: string; color: string; bg: string }[] = [
  { id: "all",                  label: "All Work",             color: "#ffffff",   bg: "rgba(255,255,255,0.08)" },
  { id: "performance-marketing",label: "Performance Marketing",color: "#ed2830",   bg: "rgba(237,40,48,0.10)"  },
  { id: "seo",                  label: "SEO",                  color: "#22c55e",   bg: "rgba(34,197,94,0.10)"  },
  { id: "social-media",         label: "Social Media",         color: "#60a5fa",   bg: "rgba(96,165,250,0.10)" },
  { id: "website",              label: "Website & Digital",    color: "#f59e0b",   bg: "rgba(245,158,11,0.10)" },
  { id: "growth-consulting",    label: "Growth Consulting",    color: "#a855f7",   bg: "rgba(168,85,247,0.10)" },
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
    id: "rise-up-overseas",
    title: "Rise Up Overseas",
    headline: "ROAS 10× in 15 Days",
    industry: "Study Visa Consultancy",
    service: "performance-marketing",
    tags: ["Meta Ads", "Google PMax", "Influencer", "Lead Gen"],
    bigStat: "10×",
    bigStatLabel: "ROAS — 15 Days",
    metrics: [
      { label: "Clicks",        value: "188" },
      { label: "Impressions",   value: "2.31K" },
      { label: "Avg. CPC",      value: "₹14.39" },
      { label: "Students Won",  value: "5" },
    ],
    about:
      "Rise Up Overseas, a study visa consultancy, needed to drive footfall to a European Education Fair in just 15 days. A full-funnel campaign was built: influencer video for awareness, Meta Ads across three objectives, and a Google PMax campaign for calls and local reach.",
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
      { label: "ROAS",  value: "3.84×" },
      { label: "ROI",   value: "148.7%" },
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
      { label: "Total Clicks",    value: "31.1K" },
      { label: "Impressions",     value: "584K" },
      { label: "CTR",             value: "5.3%" },
      { label: "Leads / Month",   value: "150+" },
    ],
    about:
      "An open-source video conferencing SaaS needed to build organic authority from near zero. A TOFU–MOFU–BOFU content plan was designed and executed alongside on-page and technical SEO fixes. Blog publishing was automated within SEO guidelines to maintain publishing cadence.",
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
      "A white-label SaaS platform needed to build organic visibility from scratch with no existing SEO foundation. A full audit, on-page optimisation, competitor research, and a structured content plan were executed to target low-competition, high-intent keywords.",
    result:
      "10 blog posts now rank on page 1 of Google. The platform consistently attracts high-quality leads through organic search.",
  },
];

/* ── Helpers ─────────────────────────────────────────────────────────────── */
const up = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const seq = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

function serviceColor(id: ServiceId) {
  return SERVICES.find((s) => s.id === id)?.color ?? "#ffffff";
}
function serviceLabel(id: ServiceId) {
  return SERVICES.find((s) => s.id === id)?.label ?? "";
}

/* ── Project Card ────────────────────────────────────────────────────────── */
function ProjectCard({ p, idx }: { p: Project; idx: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const iv  = useInView(ref, { once: true, amount: 0.15 });
  const col = serviceColor(p.service);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={iv ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: idx * 0.07, duration: 0.6, ease: EASE }}
      className="group flex flex-col rounded-2xl border bg-white overflow-hidden transition-shadow duration-300 hover:shadow-xl"
      style={{ borderColor: "rgba(0,0,0,0.07)" }}>
      {/* colour stripe */}
      <div className="h-1 w-full" style={{ background: col }} />

      <div className="flex flex-1 flex-col p-6">
        {/* service badge */}
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{ background: `${col}12`, color: col, border: `1px solid ${col}25` }}>
            {serviceLabel(p.service)}
          </span>
          <span className="text-[11px] font-medium text-black/35">{p.industry}</span>
        </div>

        {/* headline + big stat */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-heading text-lg font-bold leading-tight text-black sm:text-xl">
              {p.title}
            </h3>
            <p className="mt-1 text-sm text-black/50">{p.headline}</p>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-heading text-3xl font-black leading-none tabular-nums sm:text-4xl"
              style={{ color: col }}>{p.bigStat}</p>
            <p className="mt-0.5 text-[9px] font-bold uppercase tracking-widest text-black/35">
              {p.bigStatLabel}
            </p>
          </div>
        </div>

        {/* metrics row */}
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
        <button type="button" onClick={() => setOpen((v) => !v)}
          className="mt-auto flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors hover:text-black"
          style={{ color: open ? col : "rgba(0,0,0,0.35)" }}>
          {open ? "HIDE DETAIL" : "VIEW DETAIL"}
          <span className={`transition-transform duration-300 ${open ? "rotate-45" : ""}`} style={{ fontSize: 18, lineHeight: 1 }}>+</span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="overflow-hidden">
              <div className="mt-4 space-y-4 border-t border-black/08 pt-4">
                <div>
                  <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.18em]"
                    style={{ color: col }}>THE CHALLENGE + APPROACH</p>
                  <p className="text-sm leading-relaxed text-black/60">{p.about}</p>
                </div>
                <div>
                  <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.18em]"
                    style={{ color: col }}>THE RESULT</p>
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full flex flex-col items-center py-20 text-center">
      <p className="text-4xl mb-4">📂</p>
      <p className="text-base font-bold text-black/40">{label} work coming soon.</p>
      <p className="mt-2 text-sm text-black/30">We&rsquo;re putting the finishing touches on these case studies.</p>
    </motion.div>
  );
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function WorkPage() {
  const [active, setActive] = useState<ServiceId>("all");
  const heroRef = useRef<HTMLDivElement>(null);

  const filtered = active === "all" ? PROJECTS : PROJECTS.filter((p) => p.service === active);

  return (
    <main>
      {/* Hero */}
      <section ref={heroRef} className="w-full bg-black">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 sm:pb-20 sm:pt-24 lg:px-8">
          <motion.div variants={seq} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p variants={up}
              className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em]"
              style={{ color: "#ed2830" }}>
              PORTFOLIO
            </motion.p>
            <motion.h1 variants={up}
              className="font-heading font-bold uppercase text-white"
              style={{ fontSize: "clamp(44px,9vw,110px)", lineHeight: 0.9, letterSpacing: "-0.02em" }}>
              WORK THAT<br />
              <span style={{ color: "rgba(255,255,255,0.25)" }}>MOVES THE</span><br />
              NEEDLE.
            </motion.h1>
            <motion.p variants={up}
              className="mt-7 max-w-lg text-base leading-relaxed sm:text-lg"
              style={{ color: "rgba(255,255,255,0.38)" }}>
              Real campaigns. Real numbers. See how we&rsquo;ve driven measurable growth
              across performance marketing, SEO and growth strategy.
            </motion.p>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
            className="mt-14 flex flex-wrap gap-x-10 gap-y-6 border-t pt-10"
            style={{ borderColor: "rgba(255,255,255,0.07)" }}>
            {[
              { v: "5+",   l: "Projects Delivered" },
              { v: "10×",  l: "Best ROAS Achieved" },
              { v: "60K+", l: "App Installs Driven" },
              { v: "584K", l: "Organic Impressions" },
            ].map((s) => (
              <div key={s.l}>
                <p className="font-heading text-3xl font-black text-white sm:text-4xl">{s.v}</p>
                <p className="mt-0.5 text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: "rgba(255,255,255,0.3)" }}>{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="w-full bg-[#f7f7f7]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">

          {/* Filter tabs */}
          <div className="mb-10 flex flex-wrap gap-2">
            {SERVICES.map((s) => {
              const isActive = active === s.id;
              const count = s.id === "all" ? PROJECTS.length : PROJECTS.filter(p => p.service === s.id).length;
              return (
                <button key={s.id} type="button"
                  onClick={() => setActive(s.id)}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-all duration-200"
                  style={{
                    background: isActive ? s.color : "white",
                    color: isActive ? "white" : "rgba(0,0,0,0.5)",
                    border: `1.5px solid ${isActive ? s.color : "rgba(0,0,0,0.1)"}`,
                    boxShadow: isActive ? `0 4px 14px ${s.color}30` : "none",
                  }}>
                  {s.label}
                  <span className="rounded-full px-1.5 py-0.5 text-[9px] font-black"
                    style={{ background: isActive ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.06)" }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div key={active}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.length > 0
                ? filtered.map((p, i) => <ProjectCard key={p.id} p={p} idx={i} />)
                : <EmptyState label={serviceLabel(active)} />
              }
            </motion.div>
          </AnimatePresence>

          {/* More coming */}
          <motion.div
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-16 rounded-2xl border border-dashed border-black/15 p-10 text-center">
            <p className="text-sm font-bold text-black/40 uppercase tracking-wider">More case studies coming soon</p>
            <p className="mt-2 text-sm text-black/30">
              Social Media, Website and Growth Consulting projects are being prepared.
            </p>
            <Link href="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#ed2830]">
              Work with us →
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
