"use client";

import { useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useInView } from "framer-motion";
import CTAButton from "@/components/CTAButton";
import FinalCTA from "@/components/FinalCTA";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Service categories ──────────────────────────────────────────────────── */
type ServiceId =
  | "all"
  | "performance-marketing"
  | "seo"
  | "social-media"
  | "website"
  | "growth-consulting";

const SERVICES: { id: ServiceId; label: string }[] = [
  { id: "all",                   label: "All Work"              },
  { id: "performance-marketing", label: "Performance Marketing" },
  { id: "seo",                   label: "SEO"                   },
  { id: "social-media",          label: "Social Media"          },
  { id: "website",               label: "Website & Digital"     },
  { id: "growth-consulting",     label: "Growth Consulting"     },
];

/* ── Projects ────────────────────────────────────────────────────────────── */
interface Project {
  id: string;
  title: string;
  industry: string;
  service: ServiceId;
  tags: string[];
  bigStat: string;
  bigStatLabel: string;
  whatWeDid: string;
  result: string;
  metrics: { label: string; value: string }[];
  link?: string;
  image?: string;
}

const PROJECTS: Project[] = [
  {
    id: "teleprompter-app",
    title: "Teleprompter App",
    industry: "Mobile App",
    service: "performance-marketing",
    tags: ["Google UAC", "Meta Ads", "Influencer", "Remarketing"],
    bigStat: "5×",
    bigStatLabel: "MRR Growth",
    whatWeDid: "Grew recurring revenue for a teleprompter app by winning back lapsed users with Google in-app purchase ads and attracting new signups via Meta Ads and influencer campaigns.",
    result: "MRR grew from $400 → $2,000. Total app installs crossed 60,000.",
    metrics: [
      { label: "MRR Growth", value: "5×" },
      { label: "Total Installs", value: "60K+" },
      { label: "Cost / Install", value: "₹2.06" },
    ],
  },
  {
    id: "study-visa-consultancy",
    title: "Study Visa Consultancy",
    industry: "Education",
    service: "performance-marketing",
    tags: ["Meta Ads", "Google PMax", "Influencer", "Lead Gen"],
    bigStat: "10×",
    bigStatLabel: "ROAS in 15 Days",
    whatWeDid: "Built a full-funnel campaign in 15 days to drive footfall to a European Education Fair — influencer video for awareness, Meta Ads across 3 objectives, and Google PMax for local calls.",
    result: "5 students enrolled from a ₹20,000 spend, delivering 10× ROAS.",
    metrics: [
      { label: "ROAS", value: "10×" },
      { label: "Students Won", value: "5" },
      { label: "Avg. CPC", value: "₹14.39" },
    ],
  },
  {
    id: "ayurvedic-brand",
    title: "Ayurvedic E-commerce Brand",
    industry: "E-commerce / Health",
    service: "performance-marketing",
    tags: ["GTM Strategy", "Meta Ads", "AI Creatives", "Brand Launch"],
    bigStat: "3.84×",
    bigStatLabel: "ROAS from Launch",
    whatWeDid: "Built the full go-to-market strategy for a new Ayurvedic brand — market research, AI-assisted creative production, and Meta Ads across 4 objectives before a single rupee was spent.",
    result: "3.84× ROAS and 148.7% ROI achieved straight from launch.",
    metrics: [
      { label: "ROAS", value: "3.84×" },
      { label: "ROI", value: "148.7%" },
    ],
  },
  {
    id: "video-conferencing-saas",
    title: "Open-Source Video Conferencing",
    industry: "SaaS",
    service: "seo",
    tags: ["On-page SEO", "Technical SEO", "Content Strategy"],
    bigStat: "584K",
    bigStatLabel: "Impressions in 12 mo.",
    whatWeDid: "Built organic authority from near zero with a TOFU–MOFU–BOFU content plan, on-page fixes, and a full technical SEO overhaul.",
    result: "31.1K clicks, 584K impressions, and 150+ quality leads per month in 12 months.",
    metrics: [
      { label: "Clicks", value: "31.1K" },
      { label: "Impressions", value: "584K" },
      { label: "Leads / Month", value: "150+" },
    ],
  },
  {
    id: "white-label-platform",
    title: "White-Label SaaS Platform",
    industry: "SaaS",
    service: "seo",
    tags: ["SEO Audit", "On-page SEO", "Content Plan"],
    bigStat: "10",
    bigStatLabel: "Blogs on Page 1",
    whatWeDid: "Full SEO audit, on-page optimisation, competitor research, and a structured content plan — all from scratch with no existing SEO foundation.",
    result: "10 blog posts now rank on page 1 of Google, driving consistent high-quality leads.",
    metrics: [
      { label: "Page 1 Rankings", value: "10" },
      { label: "Impressions", value: "84.1K" },
    ],
  },
  {
    id: "b2b-tech-brand",
    title: "B2B Tech Brand",
    industry: "Technology / B2B",
    service: "seo",
    tags: ["On-page SEO", "Technical SEO", "Content Strategy"],
    bigStat: "38.2K",
    bigStatLabel: "Impressions",
    whatWeDid: "Established organic search presence in a competitive B2B niche through keyword research, on-page optimisation, and a mid-funnel content strategy.",
    result: "38.2K impressions and 236 clicks — with impressions tripling in the final month.",
    metrics: [
      { label: "Impressions", value: "38.2K" },
      { label: "Avg. Position", value: "14.5" },
      { label: "Clicks", value: "236" },
    ],
  },
  {
    id: "the-stop-n-shop",
    title: "The Stop n Shop",
    industry: "Retail / E-commerce",
    service: "website",
    tags: ["Website Redesign", "On-page SEO", "CRO", "Speed Optimisation"],
    bigStat: "95+",
    bigStatLabel: "PageSpeed Score",
    whatWeDid: "Rebuilt the site from the ground up — fast, mobile-first, clean product structure, and on-page SEO baked in from day one.",
    result: "95+ PageSpeed score. Passes all Core Web Vitals. Now ranks for keywords it had zero presence for before.",
    metrics: [
      { label: "PageSpeed", value: "95+" },
      { label: "Core Web Vitals", value: "Pass" },
      { label: "SEO Score", value: "A" },
    ],
    link: "https://thestopnshop.in/",
    image: "/images/work-stopnshop.jpg",
  },
  {
    id: "kareliya-equipments",
    title: "Kareliya Equipments",
    industry: "Industrial Equipment",
    service: "website",
    tags: ["Website Development", "Technical SEO", "B2B", "Lead Capture"],
    bigStat: "90+",
    bigStatLabel: "PageSpeed Score",
    whatWeDid: "Built a fast B2B website with proper schema markup, clean URL structure, and category pages optimised for the exact queries industrial buyers use.",
    result: "Fully indexed, passes all Core Web Vitals. Organic visibility climbing month on month.",
    metrics: [
      { label: "PageSpeed", value: "90+" },
      { label: "Indexed Pages", value: "100%" },
      { label: "Schema", value: "✓" },
    ],
    link: "https://kareliyaequipments.com/",
    image: "/images/work-kareliya.jpg",
  },
  {
    id: "kaleen-baba",
    title: "Kaleen Baba",
    industry: "Home Furnishing",
    service: "website",
    tags: ["Website Redesign", "E-commerce SEO", "Product Catalogue", "CRO"],
    bigStat: "4×",
    bigStatLabel: "Organic Visibility",
    whatWeDid: "Redesigned the product catalogue, optimised every product page for search, and rebuilt the mobile experience to make it easy for buyers to find and purchase.",
    result: "Organic visibility grew 4×. Product pages now rank for category-level carpet and rug queries.",
    metrics: [
      { label: "Organic Growth", value: "4×" },
      { label: "PageSpeed", value: "92+" },
      { label: "Mobile UX", value: "✓" },
    ],
    link: "https://kaleenbaba.com/",
    image: "/images/work-kaleenbaba.jpg",
  },
];

/* ── Helpers ─────────────────────────────────────────────────────────────── */
const SERVICE_COLORS: Record<ServiceId, { bg: string; text: string; accent: string }> = {
  "all":                   { bg: "#f5f5f5",  text: "#111",     accent: "#111" },
  "performance-marketing": { bg: "#fff1f1",  text: "#c00",     accent: "#ed2830" },
  "seo":                   { bg: "#f0fdf4",  text: "#166534",  accent: "#22c55e" },
  "social-media":          { bg: "#eff6ff",  text: "#1d4ed8",  accent: "#3b82f6" },
  "website":               { bg: "#fffbeb",  text: "#92400e",  accent: "#f59e0b" },
  "growth-consulting":     { bg: "#faf5ff",  text: "#6b21a8",  accent: "#a855f7" },
};

const SERVICE_GRADIENT: Record<ServiceId, string> = {
  "all":                   "from-gray-800 to-gray-900",
  "performance-marketing": "from-red-600 to-rose-700",
  "seo":                   "from-green-600 to-emerald-700",
  "social-media":          "from-blue-500 to-indigo-600",
  "website":               "from-amber-500 to-orange-600",
  "growth-consulting":     "from-purple-600 to-violet-700",
};

function serviceLabel(id: ServiceId) {
  return SERVICES.find((s) => s.id === id)?.label ?? "";
}

/* ── Project Card ────────────────────────────────────────────────────────── */
function ProjectCard({ p, idx }: { p: Project; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const iv  = useInView(ref, { once: true, amount: 0.1 });
  const col = SERVICE_COLORS[p.service];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={iv ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: (idx % 3) * 0.07, duration: 0.55, ease: EASE }}
      className="group flex flex-col rounded-2xl border border-black/[0.07] bg-white overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      {/* ── Visual area ── */}
      {p.image ? (
        <div className="relative w-full overflow-hidden" style={{ height: 200 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.image}
            alt={`${p.title} website`}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
          {/* gradient overlay at bottom for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          {/* big stat on image */}
          <div className="absolute bottom-3 right-4 text-right">
            <p className="font-heading text-4xl font-black text-white leading-none drop-shadow-lg">
              {p.bigStat}
            </p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-white/80 mt-0.5">
              {p.bigStatLabel}
            </p>
          </div>
          {/* service badge on image */}
          <div className="absolute top-3 left-3">
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm"
              style={{ background: `${col.accent}cc`, color: "#fff" }}
            >
              {serviceLabel(p.service)}
            </span>
          </div>
        </div>
      ) : (
        /* Gradient banner for non-image projects */
        <div className={`relative w-full bg-gradient-to-br ${SERVICE_GRADIENT[p.service]} flex items-center justify-between px-6 py-8`}>
          <div>
            <span className="rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/90">
              {serviceLabel(p.service)}
            </span>
            <p className="mt-3 text-sm font-medium text-white/70">{p.industry}</p>
          </div>
          <div className="text-right">
            <p className="font-heading text-5xl font-black text-white leading-none">{p.bigStat}</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-white/70">{p.bigStatLabel}</p>
          </div>
        </div>
      )}

      {/* ── Card body ── */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">

        {/* Industry + title */}
        {p.image && (
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-black/40">{p.industry}</p>
        )}
        <h3 className="font-heading text-xl font-bold text-black leading-snug">{p.title}</h3>

        {/* What we did */}
        <p className="mt-3 text-sm leading-relaxed text-black/55 flex-1">
          {p.whatWeDid}
        </p>

        {/* Result callout */}
        <div
          className="mt-4 rounded-xl px-4 py-3"
          style={{ background: col.bg }}
        >
          <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: col.accent }}>
            Result
          </p>
          <p className="text-sm font-semibold text-black/75">{p.result}</p>
        </div>

        {/* Metrics row */}
        <div className="mt-4 flex flex-wrap gap-2">
          {p.metrics.map((m) => (
            <div key={m.label} className="rounded-lg border border-black/[0.07] bg-black/[0.02] px-3 py-2 text-center">
              <p className="text-sm font-black tabular-nums text-black">{m.value}</p>
              <p className="text-[9px] font-semibold uppercase tracking-wider text-black/40 mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-black/10 px-2.5 py-0.5 text-[10px] font-medium text-black/50"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer action */}
        {p.link && (
          <div className="mt-5 pt-4 border-t border-black/[0.06]">
            <a
              href={p.link}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:gap-3"
              style={{ background: col.bg, color: col.text }}
            >
              View Live Site
              <span>↗</span>
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ── Aggregate stats ─────────────────────────────────────────────────────── */
const STATS = [
  { value: "9+", label: "Projects Delivered" },
  { value: "584K", label: "Organic Impressions" },
  { value: "10×", label: "Highest ROAS" },
  { value: "60K+", label: "App Installs" },
];

/* ── Page ────────────────────────────────────────────────────────────────── */
function WorkPageInner() {
  const router = useRouter();
  const params = useSearchParams();
  const raw = params.get("service") ?? "all";
  const active: ServiceId = (SERVICES.some(s => s.id === raw) ? raw : "all") as ServiceId;

  function setActive(id: ServiceId) {
    const url = id === "all" ? "/work" : `/work?service=${id}`;
    router.push(url, { scroll: false });
  }

  const filtered = active === "all" ? PROJECTS : PROJECTS.filter((p) => p.service === active);

  return (
    <>
      {/* ── Hero ── */}
      <section className="w-full bg-white border-b border-black/[0.06]">
        <div className="mx-auto max-w-5xl px-4 pt-20 pb-16 sm:px-6 sm:pt-24 sm:pb-20 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-black/50"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            Our Work
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 font-heading text-4xl font-bold leading-tight tracking-tight text-black sm:text-5xl lg:text-6xl"
          >
            Real clients.{" "}
            <span className="text-[var(--accent)]">Real results.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-black/55"
          >
            Every project below is a real business we worked with — with real numbers, real challenges, and real outcomes. No stock imagery. No made-up stats.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <CTAButton href="#projects" variant="outline" size="lg">
              Browse Projects ↓
            </CTAButton>
            <CTAButton href="/contact" variant="primary" size="lg">
              Start Your Project →
            </CTAButton>
          </motion.div>
        </div>

        {/* Aggregate stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-black/[0.06] grid grid-cols-2 sm:grid-cols-4"
        >
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`py-6 px-4 text-center ${i < STATS.length - 1 ? "border-r border-black/[0.06]" : ""}`}
            >
              <p className="font-heading text-3xl font-black text-black">{s.value}</p>
              <p className="mt-1 text-xs font-medium text-black/45">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Filters + Grid ── */}
      <section id="projects" className="w-full scroll-mt-16 bg-[#fafafa] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Filter tabs */}
          <div className="mb-12">
            <p className="text-center text-xs font-semibold uppercase tracking-widest text-black/35 mb-4">
              Filter by service
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {SERVICES.map((s) => {
                const count = s.id === "all" ? PROJECTS.length : PROJECTS.filter(p => p.service === s.id).length;
                const isActive = active === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActive(s.id)}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-black text-white shadow-sm"
                        : "bg-white border border-black/10 text-black/60 hover:border-black/25 hover:text-black"
                    }`}
                  >
                    {s.label}
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                        isActive ? "bg-white/20 text-white" : "bg-black/[0.06] text-black/40"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.length > 0 ? (
                filtered.map((p, i) => <ProjectCard key={p.id} p={p} idx={i} />)
              ) : (
                <div className="col-span-full py-24 text-center">
                  <p className="text-base font-semibold text-black/40">
                    Case studies for this service are being prepared.
                  </p>
                  <p className="mt-2 text-sm text-black/30">Check back soon — or reach out and we&rsquo;ll walk you through relevant work.</p>
                  <div className="mt-6 flex justify-center">
                    <CTAButton href="/contact" variant="primary" size="sm">Talk to us →</CTAButton>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}

export default function WorkPage() {
  return (
    <Suspense fallback={null}>
      <WorkPageInner />
    </Suspense>
  );
}
