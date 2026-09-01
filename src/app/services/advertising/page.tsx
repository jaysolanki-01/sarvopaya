"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";
import CTAButton from "@/components/CTAButton";

// ─── Constants ────────────────────────────────────────────────────────────────

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

// ─── Platform Icons ───────────────────────────────────────────────────────────

function MetaBadgeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4.5 12c0-1.6 1-3.2 2.5-3.2 1 0 1.8.7 2.7 2l2.3 3.3 2.3-3.3c.9-1.3 1.7-2 2.7-2 1.5 0 2.5 1.6 2.5 3.2 0 1.6-1 3.2-2.5 3.2-1 0-1.8-.7-2.7-2L12 10.2l-2.3 3c-.9 1.3-1.7 2-2.7 2C5.5 15.2 4.5 13.6 4.5 12z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function GoogleBadgeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M20.3 12.2c0-.6-.1-1.3-.2-1.8H12v3.4h4.7a4 4 0 0 1-1.7 2.6v2.2h2.8c1.6-1.5 2.5-3.7 2.5-6.4z"
        fill="currentColor"
        opacity=".5"
      />
      <path
        d="M12 21c2.4 0 4.4-.8 5.8-2.1l-2.8-2.2c-.8.5-1.8.8-3 .8-2.3 0-4.2-1.5-4.9-3.6H4.2v2.3A9 9 0 0 0 12 21z"
        fill="currentColor"
        opacity=".6"
      />
      <path
        d="M7.1 13.9a5.4 5.4 0 0 1 0-3.4V8.2H4.2a9 9 0 0 0 0 8l2.9-2.3z"
        fill="currentColor"
        opacity=".7"
      />
      <path
        d="M12 6.9c1.3 0 2.5.4 3.4 1.3l2.5-2.5A9 9 0 0 0 4.2 8l2.9 2.3C7.8 8.4 9.7 6.9 12 6.9z"
        fill="currentColor"
      />
    </svg>
  );
}

function YouTubeBadgeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2.5" y="6" width="19" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 9.5l4.5 2.5-4.5 2.5z" fill="currentColor" />
    </svg>
  );
}

function LinkedInBadgeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <line x1="7.5" y1="10" x2="7.5" y2="16.5" />
      <circle cx="7.5" cy="7" r="0.6" fill="currentColor" stroke="none" />
      <path d="M11.5 16.5V10M11.5 12.5c0-1.5 1-2.5 2.25-2.5S16 11 16 12.5v4" />
    </svg>
  );
}

function TikTokBadgeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.6 8.1a5.2 5.2 0 0 1-3.2-1.1V14a5.9 5.9 0 1 1-5-5.8v3.1a2.8 2.8 0 1 0 2 2.7V3h3.1a5.2 5.2 0 0 0 3.1 4.1v1z" />
    </svg>
  );
}

function SnapchatBadgeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3.5C9.2 3.5 7 5.7 7 8.5v1.8c-.8.3-1.5.2-2 .2 0 1 .5 1.7 1.8 1.9a8 8 0 0 1-1.6 2.3c1 .5 3.5.7 4 1.8.4 1 2 1 2.8 0 .5-1 3-1.3 4-1.8a8 8 0 0 1-1.6-2.3c1.3-.2 1.8-.9 1.8-1.9-.5 0-1.2.1-2-.2V8.5C17 5.7 14.8 3.5 12 3.5z" />
    </svg>
  );
}

function PinterestBadgeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3a9 9 0 0 0-3.3 17.4l-.1-.5.8-3.2a3.5 3.5 0 0 1-.3-1.4c0-1.3.7-2.3 1.8-2.3.9 0 1.3.6 1.3 1.4 0 .9-.5 2.1-.8 3.3-.2.9.5 1.7 1.4 1.7 1.7 0 3-1.8 3-4.4 0-2.3-1.7-3.9-4-3.9-2.8 0-4.4 2.1-4.4 4.2 0 .8.3 1.7.7 2.1.1.1.1.2 0 .4l-.3 1.1c0 .2-.1.2-.3.1-1.3-.6-2-2.5-2-4 0-3.3 2.4-6.3 6.9-6.3 3.6 0 6.4 2.6 6.4 6 0 3.6-2.3 6.5-5.4 6.5-1.1 0-2.1-.6-2.4-1.2l-.7 2.5c-.2 1-.9 2.1-1.3 2.8A9 9 0 1 0 12 3z" />
    </svg>
  );
}

// ─── Shared UI ────────────────────────────────────────────────────────────────

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

// ─── Campaign Ecosystem Radial ─────────────────────────────────────────────────

const ECOSYSTEM_PLATFORMS = [
  {
    id: "meta",
    label: "Meta",
    Icon: MetaBadgeIcon,
    formats: ["Feed", "Reels", "Stories", "Catalog", "Retargeting"],
    best: "D2C · Demand creation",
  },
  {
    id: "google",
    label: "Google",
    Icon: GoogleBadgeIcon,
    formats: ["Search", "Shopping", "Pmax", "Display"],
    best: "High-intent · Demand capture",
  },
  {
    id: "youtube",
    label: "YouTube",
    Icon: YouTubeBadgeIcon,
    formats: ["In-Stream", "Shorts", "Video Action"],
    best: "Awareness · Education",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    Icon: LinkedInBadgeIcon,
    formats: ["Sponsored", "InMail", "Lead Gen"],
    best: "B2B · Professional",
  },
  {
    id: "tiktok",
    label: "TikTok",
    Icon: TikTokBadgeIcon,
    formats: ["Discovery", "TopView", "Creator"],
    best: "Discovery · Short-form",
  },
  {
    id: "snapchat",
    label: "Snapchat",
    Icon: SnapchatBadgeIcon,
    formats: ["Snap Ads", "Stories", "AR Lens"],
    best: "Young audiences · Mobile",
  },
  {
    id: "pinterest",
    label: "Pinterest",
    Icon: PinterestBadgeIcon,
    formats: ["Pins", "Video", "Shopping"],
    best: "Discovery · Lifestyle",
  },
];

function CampaignEcosystem() {
  const [hovered, setHovered] = useState<string | null>(null);
  const shouldReduce = useReducedMotion();

  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-[440px] items-center justify-center select-none">
      {/* Orbit rings */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[52%] w-[52%] rounded-full border border-white/8" />
        <div className="absolute h-[72%] w-[72%] rounded-full border border-white/5" />
        <div className="absolute h-[92%] w-[92%] rounded-full border border-white/4" />
      </div>

      {/* Center */}
      <div className="relative z-10 flex h-28 w-28 flex-col items-center justify-center rounded-full border border-white/20 bg-white/5 text-center ring-1 ring-inset ring-white/5 backdrop-blur-sm">
        {!shouldReduce && (
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ boxShadow: ["0 0 0px 0px rgba(237,40,48,0)", "0 0 24px 6px rgba(237,40,48,0.18)", "0 0 0px 0px rgba(237,40,48,0)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        <span className="font-heading text-[9px] font-bold uppercase tracking-[0.18em] text-white/40">Your</span>
        <span className="font-heading text-lg font-bold leading-tight text-white">CAMPAIGN</span>
      </div>

      {/* Platform badges */}
      {ECOSYSTEM_PLATFORMS.map((p, i) => {
        const angle = (i * 360) / 7 - 90;
        const rad = (angle * Math.PI) / 180;
        const rPct = 40;
        const xPct = Math.cos(rad) * rPct;
        const yPct = Math.sin(rad) * rPct;
        const isActive = hovered === p.id;
        const tooltipRight = xPct > 0;

        return (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `calc(50% + ${xPct}%)`,
              top: `calc(50% + ${yPct}%)`,
              transform: "translate(-50%, -50%)",
              zIndex: isActive ? 30 : 10,
            }}
            onMouseEnter={() => setHovered(p.id)}
            onMouseLeave={() => setHovered(null)}
            onTouchStart={(e) => {
              e.preventDefault();
              setHovered(hovered === p.id ? null : p.id);
            }}
            className="cursor-pointer"
          >
            <motion.div
              animate={{ scale: isActive ? 1.15 : 1 }}
              transition={{ duration: 0.25, ease: EASE }}
              className={`flex h-11 w-11 items-center justify-center rounded-xl border backdrop-blur-sm transition-colors duration-300 ${
                isActive
                  ? "border-[var(--accent)]/50 bg-[var(--accent)]/10 text-white"
                  : "border-white/15 bg-white/6 text-white/55 hover:border-white/30 hover:text-white/90"
              }`}
            >
              <p.Icon className="h-4.5 w-4.5" />
            </motion.div>

            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.18, ease: EASE }}
                  className="absolute z-40 min-w-[130px] rounded-xl border border-white/15 bg-black/95 p-3 shadow-2xl backdrop-blur-xl"
                  style={{
                    left: tooltipRight ? "120%" : "auto",
                    right: tooltipRight ? "auto" : "120%",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  <p className="mb-1 font-heading text-[10px] font-bold uppercase tracking-widest text-white">{p.label}</p>
                  <p className="mb-2 text-[10px] text-[var(--accent)]">{p.best}</p>
                  <div className="space-y-0.5">
                    {p.formats.map((f) => (
                      <p key={f} className="text-[10px] text-white/45">{f}</p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// ─── Platform Ecosystem Section ───────────────────────────────────────────────

const PLATFORM_CARDS = [
  {
    id: "meta",
    name: "Meta Ads",
    Icon: MetaBadgeIcon,
    best: "D2C, ecommerce, consumer brands",
    formats: ["Reels", "Feed", "Stories", "Carousel", "Catalog", "Retargeting"],
    objectives: ["Awareness", "Traffic", "Leads", "Sales", "App Installs"],
    detail:
      "The largest social advertising platform. Strongest for demand creation, retargeting and creative-led acquisition. Works at every stage of the funnel with sophisticated audience and creative testing capabilities.",
  },
  {
    id: "google",
    name: "Google Ads",
    Icon: GoogleBadgeIcon,
    best: "Demand capture, shopping, high-intent search",
    formats: ["Search", "Shopping", "Performance Max", "Display", "Demand Gen"],
    objectives: ["Sales", "Leads", "Traffic", "Store Visits"],
    detail:
      "Captures purchase intent at the exact moment of search. Best for capturing existing demand rather than creating it. Shopping campaigns are essential for ecommerce. Pairs well with Meta for full-funnel coverage.",
  },
  {
    id: "youtube",
    name: "YouTube Ads",
    Icon: YouTubeBadgeIcon,
    best: "Video, education, awareness, consideration",
    formats: ["In-Stream", "Skippable", "Shorts", "Video Action"],
    objectives: ["Awareness", "Consideration", "Conversions"],
    detail:
      "The world's second-largest search engine is also a premium video advertising environment. Best for storytelling, product education and brand building. The first 5 seconds of a skippable ad are critical.",
  },
  {
    id: "linkedin",
    name: "LinkedIn Ads",
    Icon: LinkedInBadgeIcon,
    best: "B2B, professional audiences, account-based",
    formats: ["Sponsored Content", "InMail", "Lead Gen Forms", "Dynamic Ads"],
    objectives: ["Brand Awareness", "Lead Generation", "Website Traffic"],
    detail:
      "The only major platform with professional context and job-role targeting. Higher CPCs than social platforms, but unmatched for B2B, SaaS and professional services. Lead Gen Forms reduce friction significantly.",
  },
  {
    id: "tiktok",
    name: "TikTok Ads",
    Icon: TikTokBadgeIcon,
    best: "Discovery, creator content, younger demographics",
    formats: ["In-Feed", "TopView", "Branded Effects", "Spark Ads"],
    objectives: ["Awareness", "Traffic", "App Installs", "Conversions"],
    detail:
      "A discovery-first platform where organic and paid content coexist. Creator-style and authentic-feeling ads typically outperform polished brand content. Fast-growing ad platform with strong targeting capabilities.",
  },
  {
    id: "snapchat",
    name: "Snapchat Ads",
    Icon: SnapchatBadgeIcon,
    best: "Younger audiences, mobile-first, visual discovery",
    formats: ["Snap Ads", "Story Ads", "Collection Ads", "AR Lenses"],
    objectives: ["Awareness", "Traffic", "App Installs", "Sales"],
    detail:
      "Strong reach with 13–34 demographics. Vertical video format. AR lens advertising provides immersive brand experiences. Under-utilised by many brands, which can mean lower competition and costs.",
  },
  {
    id: "pinterest",
    name: "Pinterest Ads",
    Icon: PinterestBadgeIcon,
    best: "Discovery, lifestyle, fashion, home, design, food",
    formats: ["Promoted Pins", "Video Pins", "Shopping Ads", "Collections"],
    objectives: ["Awareness", "Consideration", "Conversions", "Catalog Sales"],
    detail:
      "A visual search engine where users actively seek inspiration and products. High purchase intent. Particularly effective for lifestyle, fashion, food, home and beauty verticals. Longer content lifespan than social platforms.",
  },
];

function PlatformEcosystem() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-2">
      {PLATFORM_CARDS.map((p) => {
        const isOpen = openId === p.id;
        return (
          <div
            key={p.id}
            className="overflow-hidden rounded-2xl border border-white/10"
          >
            <button
              onClick={() => setOpenId(isOpen ? null : p.id)}
              className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors duration-200 hover:bg-white/4 sm:px-7 sm:py-5"
              aria-expanded={isOpen}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/70">
                <p.Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-heading text-sm font-bold text-white sm:text-base">{p.name}</p>
                <p className="mt-0.5 truncate text-xs text-white/40">{p.best}</p>
              </div>
              <PlusIcon open={isOpen} />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-white/10 px-5 pb-6 pt-5 sm:px-7 sm:pt-6">
                    <p className="mb-5 text-sm leading-relaxed text-white/65">{p.detail}</p>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/30">Ad Formats</p>
                        <div className="flex flex-wrap gap-1.5">
                          {p.formats.map((f) => (
                            <span key={f} className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-white/55">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-white/30">Objectives</p>
                        <div className="flex flex-wrap gap-1.5">
                          {p.objectives.map((o) => (
                            <span key={o} className="rounded-full border border-[var(--accent)]/20 px-2.5 py-0.5 text-xs text-[var(--accent)]/70">
                              {o}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// ─── Ad Lab ───────────────────────────────────────────────────────────────────

const AD_PLATFORMS = ["META", "GOOGLE", "YOUTUBE", "TIKTOK"] as const;
type AdPlatform = (typeof AD_PLATFORMS)[number];

const AD_DATA: Record<
  AdPlatform,
  {
    label: string;
    format: string;
    hook: string;
    body: string;
    cta: string;
    note: string;
    metrics: { label: string; value: string }[];
  }
> = {
  META: {
    label: "Meta Ads",
    format: "Feed / Reels",
    hook: "Your skin deserves better.",
    body: "Dermatologist-tested. No parabens. Ships in 24 hours.",
    cta: "Shop Now",
    note: "Short visual hook + social proof. Thumb-stop in the first 1.5s.",
    metrics: [
      { label: "Reach", value: "82K" },
      { label: "CTR", value: "1.6%" },
      { label: "CPC", value: "₹28" },
      { label: "ROAS", value: "3.4×" },
    ],
  },
  GOOGLE: {
    label: "Google Ads",
    format: "Search",
    hook: "Best Face Serum for Sensitive Skin",
    body: "Clinically Tested · Free Delivery · 30-Day Returns",
    cta: "sarvopaya.com/skincare",
    note: "Intent-led targeting. Captures demand at the moment of search.",
    metrics: [
      { label: "Impr", value: "24K" },
      { label: "Clicks", value: "510" },
      { label: "CPC", value: "₹31" },
      { label: "Conv", value: "42" },
    ],
  },
  YOUTUBE: {
    label: "YouTube Ads",
    format: "In-Stream",
    hook: '"I replaced 6 products with one."',
    body: "30-second narrative product reveal direct offer. Skip in 5s.",
    cta: "Watch",
    note: "Hook in the first 5 seconds before the skip button appears.",
    metrics: [
      { label: "Views", value: "47K" },
      { label: "VTR", value: "41%" },
      { label: "CPV", value: "₹0.42" },
      { label: "Conv", value: "68" },
    ],
  },
  TIKTOK: {
    label: "TikTok Ads",
    format: "Discovery / Creator",
    hook: "POV: your skincare routine actually works.",
    body: "Creator-style. Vertical video. Native to the feed. Trending audio.",
    cta: "Shop now ↗",
    note: "Feels like organic content. Designed for the scroll, not the banner blindness.",
    metrics: [
      { label: "Reach", value: "120K" },
      { label: "Plays", value: "3.6m" },
      { label: "Eng", value: "7.9%" },
      { label: "Orders", value: "195" },
    ],
  },
};

function MetaMockup({ data }: { data: (typeof AD_DATA)[AdPlatform] }) {
  return (
    <div className="mx-auto w-full max-w-[320px] overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a1a]">
      {/* Post header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent)]/20 text-xs font-bold text-[var(--accent)]">S</div>
        <div>
          <p className="text-xs font-semibold text-white/90">Sarvopaya Brand</p>
          <p className="text-[10px] text-white/35">Sponsored · <span className="text-white/25">Feed</span></p>
        </div>
        <span className="ml-auto text-white/20">···</span>
      </div>
      {/* Image area */}
      <div className="flex h-40 items-center justify-center bg-gradient-to-br from-white/6 to-white/2 text-white/10">
        <svg className="h-16 w-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      </div>
      {/* Copy */}
      <div className="px-4 pb-4 pt-3">
        <p className="mb-1 font-heading text-sm font-bold text-white">{data.hook}</p>
        <p className="mb-3 text-xs leading-relaxed text-white/55">{data.body}</p>
        <button className="w-full rounded-lg bg-[var(--accent)] py-2 text-xs font-bold text-white">{data.cta}</button>
      </div>
      {/* Reactions bar */}
      <div className="flex items-center gap-4 border-t border-white/6 px-4 py-2.5">
        {["♥ Like", "💬 Comment", "↗ Share"].map((a) => (
          <button key={a} className="text-[11px] text-white/35">{a}</button>
        ))}
      </div>
    </div>
  );
}

function GoogleMockup({ data }: { data: (typeof AD_DATA)[AdPlatform] }) {
  return (
    <div className="mx-auto w-full max-w-[340px] overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a1a]">
      {/* Search bar */}
      <div className="flex items-center gap-2 border-b border-white/8 px-4 py-3">
        <svg className="h-4 w-4 text-white/30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.5" y2="16.5" />
        </svg>
        <span className="text-xs text-white/50">best face serum for sensitive skin</span>
      </div>
      {/* Ad result */}
      <div className="px-4 py-4">
        <div className="mb-3 rounded-xl border border-white/8 bg-white/3 p-3.5">
          <div className="mb-1.5 flex items-center gap-1.5">
            <span className="rounded-sm bg-[var(--accent)]/80 px-1.5 py-0.5 text-[9px] font-bold text-white">Ad</span>
            <span className="text-[10px] text-white/40">{data.cta}</span>
          </div>
          <p className="mb-1 text-sm font-semibold leading-snug text-blue-400">{data.hook}</p>
          <p className="text-xs leading-relaxed text-white/50">{data.body}</p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {["Free Delivery", "30-Day Returns", "Dermatologist Tested"].map((e) => (
              <span key={e} className="rounded border border-white/10 px-2 py-0.5 text-[9px] text-white/40">{e}</span>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-white/5 bg-white/2 p-3.5 opacity-40">
          <div className="mb-1.5 flex items-center gap-1.5">
            <span className="rounded-sm bg-white/15 px-1.5 py-0.5 text-[9px] font-bold text-white">Ad</span>
            <span className="text-[10px] text-white/30">competitor.com</span>
          </div>
          <p className="text-sm font-semibold text-white/60">Face Serum Online Browse Range</p>
        </div>
      </div>
    </div>
  );
}

function YouTubeMockup({ data }: { data: (typeof AD_DATA)[AdPlatform] }) {
  return (
    <div className="mx-auto w-full max-w-[340px] overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a1a]">
      {/* Video area */}
      <div className="relative flex h-44 items-center justify-center bg-black">
        <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/70 to-transparent p-3">
          <div>
            <p className="font-heading text-xs font-bold text-white">{data.hook}</p>
            <p className="mt-0.5 text-[10px] text-white/50">Sarvopaya Brand · Sponsored</p>
          </div>
          <div className="rounded-lg bg-white/10 px-2.5 py-1.5 backdrop-blur">
            <p className="text-[10px] font-bold text-white">Skip ad in 5s</p>
          </div>
        </div>
        <svg className="h-12 w-12 text-white/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
          <circle cx="12" cy="12" r="10" />
          <path d="M10 8l6 4-6 4z" fill="currentColor" stroke="none" opacity=".4" />
        </svg>
      </div>
      {/* CTA bar */}
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <p className="text-xs font-semibold text-white/80">{data.body.split(" ")[0]}</p>
          <p className="text-[10px] text-white/35">sarvopaya.com</p>
        </div>
        <button className="rounded-full bg-[var(--accent)] px-4 py-2 text-xs font-bold text-white">
          {data.cta} →
        </button>
      </div>
      {/* Progress bar */}
      <div className="mx-4 mb-4 h-0.5 overflow-hidden rounded-full bg-white/10">
        <div className="h-full w-1/3 rounded-full bg-[var(--accent)]" />
      </div>
    </div>
  );
}

function TikTokMockup({ data }: { data: (typeof AD_DATA)[AdPlatform] }) {
  return (
    <div className="mx-auto w-[180px] overflow-hidden rounded-3xl border border-white/10 bg-black">
      {/* Vertical video frame */}
      <div className="relative flex aspect-[9/16] w-full flex-col items-start justify-end bg-gradient-to-b from-black/30 via-transparent to-black/80 p-3">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="h-10 w-10 text-white/10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 8l6 4-6 4z" />
          </svg>
        </div>
        {/* Right actions */}
        <div className="absolute right-2 top-1/3 flex flex-col items-center gap-3">
          {["♥", "💬", "↗"].map((icon) => (
            <div key={icon} className="flex flex-col items-center gap-0.5">
              <span className="text-base">{icon}</span>
              <span className="text-[8px] text-white/40">4.2k</span>
            </div>
          ))}
        </div>
        {/* Bottom copy */}
        <div className="w-[85%]">
          <div className="mb-1.5 flex items-center gap-1">
            <span className="rounded bg-[var(--accent)]/80 px-1.5 py-0.5 text-[8px] font-bold text-white">Sponsored</span>
          </div>
          <p className="font-heading text-[11px] font-bold leading-snug text-white">{data.hook}</p>
          <p className="mt-1 text-[9px] text-white/50">{data.body.split(".")[0]}.</p>
          <div className="mt-2 flex items-center gap-1.5">
            <div className="rounded-full bg-[var(--accent)] px-2.5 py-1 text-[9px] font-bold text-white">{data.cta}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdLab() {
  const [active, setActive] = useState<AdPlatform>("META");
  const data = AD_DATA[active];

  const mockups: Record<AdPlatform, React.ReactNode> = {
    META: <MetaMockup data={data} />,
    GOOGLE: <GoogleMockup data={data} />,
    YOUTUBE: <YouTubeMockup data={data} />,
    TIKTOK: <TikTokMockup data={data} />,
  };

  return (
    <div className="mx-auto max-w-4xl">
      {/* Platform selector */}
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:mb-10">
        {AD_PLATFORMS.map((p) => (
          <button
            key={p}
            onClick={() => setActive(p)}
            className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
              active === p
                ? "bg-white text-black"
                : "border border-white/15 text-white/50 hover:border-white/30 hover:text-white/80"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
        {/* Creative mockup */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="flex items-start justify-center"
          >
            {mockups[active]}
          </motion.div>
        </AnimatePresence>

        {/* Platform detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active + "-detail"}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="flex flex-col justify-start pt-2"
          >
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                {data.label} · {data.format}
              </span>
            </div>

            <h3 className="mb-3 font-heading text-2xl font-bold leading-tight text-white sm:text-3xl">
              {data.hook}
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-white/55">{data.body}</p>

            <div className="mb-6 rounded-xl border border-white/8 bg-white/4 p-4">
              <p className="text-xs leading-relaxed text-white/50"><span className="text-white/30">Strategy note: </span>{data.note}</p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-4 gap-3">
              {data.metrics.map((m) => (
                <div key={m.label} className="rounded-xl border border-white/8 bg-white/3 p-3 text-center">
                  <p className="font-heading text-lg font-bold text-white">{m.value}</p>
                  <p className="mt-0.5 text-[9px] uppercase tracking-wider text-white/35">{m.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[10px] text-white/25">Illustrative. Not a guarantee of results.</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Creative System ───────────────────────────────────────────────────────────

const CREATIVE_STEPS = [
  {
    num: "01",
    label: "HOOK",
    q: "What stops attention?",
    detail: "The first 1–2 seconds decide everything. A strong hook is specific, surprising or emotionally resonant. Generic openers are ignored.",
  },
  {
    num: "02",
    label: "ANGLE",
    q: "Why should they care?",
    detail: "The lens through which you present your message. The same product can be positioned from 10 different angles pain, aspiration, social proof, curiosity, authority.",
  },
  {
    num: "03",
    label: "MESSAGE",
    q: "What should they understand?",
    detail: "The core thing you want someone to walk away knowing. One idea per ad. Complexity loses attention; clarity wins it.",
  },
  {
    num: "04",
    label: "PROOF",
    q: "Why should they believe you?",
    detail: "Reviews, testimonials, numbers, endorsements, demonstrations or certifications. Claims without proof are noise. Proof converts claims into trust.",
  },
  {
    num: "05",
    label: "OFFER",
    q: "Why should they act now?",
    detail: "What makes acting today better than acting tomorrow? Offer can be a discount, a guarantee, a time limit, a free gift or simply the clarity of what they get.",
  },
  {
    num: "06",
    label: "CTA",
    q: "What should they do next?",
    detail: "One clear next step. Shop Now, Learn More, Get a Quote. The CTA should match the stage of the funnel. A cold audience needs a different instruction than a warm one.",
  },
];

function CreativeSystem() {
  const [openStep, setOpenStep] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-2xl space-y-2">
      {CREATIVE_STEPS.map((s, i) => {
        const isOpen = openStep === i;
        return (
          <div key={s.num} className="overflow-hidden rounded-2xl border border-black/8">
            <button
              onClick={() => setOpenStep(isOpen ? null : i)}
              className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-black/3"
              aria-expanded={isOpen}
            >
              <span className="font-heading text-xs font-bold text-[var(--accent)]">{s.num}</span>
              <div className="flex-1">
                <p className="font-heading text-sm font-bold text-black">{s.label}</p>
                <p className="text-xs text-black/40">{s.q}</p>
              </div>
              <PlusIcon open={isOpen} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="body"
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="border-t border-black/6 px-5 py-4 text-sm leading-relaxed text-black/60">
                    {s.detail}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// ─── FAQ Accordion ─────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "What is digital advertising?",
    a: "Digital advertising is the practice of distributing paid messages across digital platforms search engines, social media, websites and video platforms to reach specific audiences with specific objectives. Unlike organic channels, paid advertising gives you control over reach, targeting, format and timing.",
  },
  {
    q: "Which platforms do you run advertising on?",
    a: "We run campaigns across Meta (Facebook and Instagram), Google (Search, Shopping, Performance Max), YouTube, LinkedIn, TikTok, Snapchat and Pinterest. Platform selection is always based on your audience, product and objective not on what happens to be popular.",
  },
  {
    q: "What is the difference between advertising and performance marketing?",
    a: "Advertising is the broader discipline: creative, messaging, media buying, audience strategy and distribution. Performance marketing is a specific subset of advertising that is highly focused on measurable, revenue-linked outcomes ROAS, CAC, CPA. Most strong advertising strategies combine both: brand-building and performance.",
  },
  {
    q: "Which advertising platform is best for D2C brands?",
    a: "There is no single best platform. Most D2C brands benefit from a combination: Meta for demand creation and retargeting, Google for capturing existing demand through search and shopping, and YouTube or TikTok for video and discovery. The right mix depends on your product, audience and budget.",
  },
  {
    q: "Should I advertise on Meta or Google first?",
    a: "If your product solves a problem people are already searching for, start with Google Search or Shopping. If your product needs to be discovered or explained, start with Meta. Many brands benefit from running both simultaneously to cover demand capture and demand creation.",
  },
  {
    q: "How much should a business spend on advertising?",
    a: "There is no universal answer. It depends on your margins, CAC tolerance, growth goals and the competitive landscape. We work with you to define a budget that allows for meaningful testing while protecting business economics. Spending too little often produces inconclusive data; spending too much on an untested system is wasteful.",
  },
  {
    q: "How long does it take to see results from advertising?",
    a: "Paid search campaigns can show results within days. Social advertising typically requires 2–6 weeks of optimisation before consistent performance emerges. Campaigns need time to exit the learning phase, gather data and refine targeting. Expect the first 4–8 weeks to be a testing and learning period.",
  },
  {
    q: "What is ROAS and how is it measured?",
    a: "ROAS (Return on Ad Spend) measures revenue generated per rupee spent on advertising. A ROAS of 4× means you generate ₹4 in revenue for every ₹1 spent. It is one of several performance indicators we also track CAC, MER (Media Efficiency Ratio), and contribution margin to give a more complete picture.",
  },
  {
    q: "Why are my ads getting clicks but no conversions?",
    a: "This usually indicates a disconnect between the ad and the landing page message mismatch, weak offer, slow page speed, poor mobile experience, or a confusing conversion flow. The ad attracts attention; the landing page converts it. Both need to work together.",
  },
  {
    q: "How often should ad creatives be refreshed?",
    a: "Creative fatigue varies by platform, audience size and frequency. As a rule, monitor frequency and CTR trends. When frequency rises and CTR declines, it is time for fresh creative. For most active campaigns, we review creative performance weekly and rotate or refresh on a rolling basis.",
  },
  {
    q: "Do you create the ad creatives?",
    a: "Yes. Creative strategy, copy and design are part of our advertising service. We develop hooks, angles, visual concepts and copy then test them systematically. Creative is not an afterthought; it is the foundation of advertising performance.",
  },
  {
    q: "What is paid social advertising?",
    a: "Paid social refers to advertising on social media platforms Meta, TikTok, LinkedIn, Snapchat, Pinterest. These platforms allow brands to target audiences by behaviour, interest, demographics and signals, and distribute creative content in formats native to each platform.",
  },
  {
    q: "What is paid search advertising?",
    a: "Paid search (also called PPC) refers to text-based ads displayed in search engine results primarily Google. Ads appear when users search for specific keywords, making it highly intent-driven. You pay per click. Google Shopping extends this with product listing ads for ecommerce.",
  },
  {
    q: "Can you run campaigns across multiple platforms simultaneously?",
    a: "Yes. Multi-platform campaigns are common and often more effective than single-platform strategies, provided budgets allow for meaningful reach on each. We allocate budget based on audience, objective and platform efficiency not evenly by default.",
  },
  {
    q: "Can you guarantee advertising results?",
    a: "No. Advertising performance depends on many variables outside any agency's full control: market conditions, competitive activity, product quality, landing page experience and audience behaviour. What we commit to is a rigorous process smart strategy, strong creative, continuous optimisation and transparent reporting.",
  },
];

function FAQAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      {FAQ_ITEMS.map((faq, i) => {
        const isOpen = openIdx === i;
        return (
          <div key={i} className="overflow-hidden rounded-2xl border border-white/8">
            <button
              onClick={() => setOpenIdx(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/3 sm:px-6"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold leading-snug text-white/85">{faq.q}</span>
              <PlusIcon open={isOpen} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="ans"
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="border-t border-white/8 px-5 py-4 text-sm leading-relaxed text-white/55 sm:px-6">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Advertising Services",
      provider: { "@type": "Organization", name: "Sarvopaya", url: "https://sarvopaya.com" },
      description:
        "Digital advertising services combining creative strategy, media buying and distribution across Meta, Google, YouTube, LinkedIn, TikTok and more for D2C and consumer brands.",
      serviceType: "Digital Advertising",
      areaServed: "IN",
      url: "https://sarvopaya.com/services/advertising",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://sarvopaya.com" },
        { "@type": "ListItem", position: 2, name: "Services", item: "https://sarvopaya.com/services" },
        { "@type": "ListItem", position: 3, name: "Advertising", item: "https://sarvopaya.com/services/advertising" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdvertisingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── 01 HERO ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-black pb-20 pt-32 sm:pt-40 lg:pb-28">
        {/* Subtle grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 animate-grid-pan opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        {/* Accent glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[20%] top-[30%] h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-[120px]"
          style={{ background: "var(--accent)" }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: copy */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="max-w-2xl"
            >
              <motion.div variants={fadeUp} className="mb-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/40">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  Advertising Services
                </span>
              </motion.div>

              <motion.h1
                variants={item}
                className="font-heading text-[clamp(2.6rem,7vw,5.5rem)] font-bold leading-[0.92] tracking-tight text-white"
              >
                ADS PEOPLE
                <br />
                <span className="text-[var(--accent)]">ACTUALLY</span>
                <br />
                NOTICE.
              </motion.h1>

              <motion.p
                variants={item}
                className="mt-6 max-w-lg text-base leading-relaxed text-white/55 sm:text-lg"
              >
                We build advertising campaigns that combine sharp creative, intelligent media buying and deliberate distribution across the platforms where your audience actually spends their attention.
              </motion.p>

              <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
                <CTAButton href="/contact" variant="primary" size="lg">
                  Start a Campaign
                </CTAButton>
                <CTAButton href="/case-studies" variant="outline" size="lg">
                  See Our Work
                </CTAButton>
              </motion.div>

              {/* Platform badges row */}
              <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-2">
                {ECOSYSTEM_PLATFORMS.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-white/40"
                  >
                    <p.Icon className="h-3.5 w-3.5" />
                    <span className="text-[11px] font-semibold">{p.label}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Campaign Ecosystem */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: EASE, delay: 0.3 }}
              className="flex items-center justify-center lg:justify-end"
            >
              <CampaignEcosystem />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 02 PLATFORM REALITY ──────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20"
          >
            <div>
              <SectionLabel light>Platform Reality</SectionLabel>
              <motion.h2
                variants={item}
                className="mt-4 font-heading text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.95] tracking-tight text-black"
              >
                YOUR CUSTOMER
                <br />
                DOESN'T LIVE ON
                <br />
                ONE PLATFORM.
              </motion.h2>
            </div>

            <motion.div variants={item} className="flex flex-col justify-center space-y-6">
              <p className="text-base leading-relaxed text-black/55">
                People discover products through search. They research through video. They buy through social. They remember through repeated exposure across different environments.
              </p>
              <p className="text-base leading-relaxed text-black/55">
                An advertising strategy built around a single platform is built around your convenience, not your customer's behaviour.
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Search", icon: "🔍", text: "Intent" },
                  { label: "Social", icon: "📱", text: "Discovery" },
                  { label: "Video", icon: "▶", text: "Education" },
                ].map((c) => (
                  <div key={c.label} className="rounded-2xl border border-black/8 p-4 text-center">
                    <p className="mb-1 text-xl">{c.icon}</p>
                    <p className="font-heading text-sm font-bold text-black">{c.label}</p>
                    <p className="text-xs text-black/40">{c.text}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-black/40">
                Effective advertising maps your message to the right platform, at the right stage of your customer's journey.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 03 PLATFORM ECOSYSTEM ─────────────────────────────────────────── */}
      <section className="bg-black py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-12 text-center"
          >
            <SectionLabel>Platform Ecosystem</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-4 font-heading text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight text-white"
            >
              WHERE YOUR
              <br />
              AUDIENCE IS.
            </motion.h2>
            <motion.p variants={item} className="mx-auto mt-4 max-w-xl text-base text-white/50">
              Seven platforms. Each with a different audience, format and purchase behaviour. Tap to explore.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <PlatformEcosystem />
          </motion.div>
        </div>
      </section>

      {/* ── 04 CREATIVE FIRST ─────────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20"
          >
            <div>
              <SectionLabel light>Creative First</SectionLabel>
              <motion.h2
                variants={item}
                className="mt-4 font-heading text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.95] tracking-tight text-black"
              >
                THE PLATFORM
                <br />
                DOESN'T SAVE
                <br />A BAD AD.
              </motion.h2>
              <motion.p variants={item} className="mt-6 text-base leading-relaxed text-black/55">
                Media buying can distribute an ad to a million people. It cannot make a weak message relevant to any of them. The strategy that drives advertising performance begins with creative not with campaign settings.
              </motion.p>
            </div>

            <motion.div variants={item} className="flex flex-col justify-center">
              <div className="space-y-0">
                {[
                  { label: "Audience Insight", desc: "Who are they and what do they actually care about?" },
                  { label: "Message", desc: "What is the one thing they need to understand?" },
                  { label: "Creative Concept", desc: "How do we make that message stop attention?" },
                  { label: "Format", desc: "Which format fits the platform and the idea?" },
                  { label: "Distribution", desc: "Where, to whom, and at what frequency?" },
                  { label: "Optimisation", desc: "What is the data saying? What do we change?" },
                ].map((s, i) => (
                  <div key={s.label} className="flex gap-4 py-4 border-b border-black/6 last:border-0">
                    <span className="mt-0.5 font-heading text-xs font-bold text-[var(--accent)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-heading text-sm font-bold text-black">{s.label}</p>
                      <p className="mt-0.5 text-xs text-black/45">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 05 CREATIVE SYSTEM ────────────────────────────────────────────── */}
      <section className="bg-black py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-12 text-center"
          >
            <SectionLabel>Creative Framework</SectionLabel>
            <motion.h2 variants={item} className="mt-4 font-heading text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight text-white">
              SIX QUESTIONS
              <br />
              EVERY AD MUST ANSWER.
            </motion.h2>
            <motion.p variants={item} className="mx-auto mt-4 max-w-lg text-base text-white/50">
              Before we design anything, we answer these. The ad is an output of the strategy not a starting point.
            </motion.p>
          </motion.div>

          {/* White card with the accordion */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="rounded-3xl bg-white p-6 sm:p-8"
          >
            <CreativeSystem />
          </motion.div>
        </div>
      </section>

      {/* ── 06 AD FORMATS ─────────────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-12"
          >
            <SectionLabel light>Ad Formats</SectionLabel>
            <motion.h2 variants={item} className="mt-4 font-heading text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.95] tracking-tight text-black">
              ONE MESSAGE,
              <br />
              MANY FORMATS.
            </motion.h2>
            <motion.p variants={item} className="mt-4 max-w-lg text-base text-black/50">
              Different platforms, audiences and objectives call for different creative formats. We work across all of them.
            </motion.p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
          >
            {[
              { label: "Static Ads", icon: "▣", cat: "Social" },
              { label: "Video Ads", icon: "▶", cat: "All platforms" },
              { label: "Reels / Shorts", icon: "↕", cat: "Social · YouTube" },
              { label: "Stories", icon: "◯", cat: "Meta · Snap" },
              { label: "Carousel", icon: "⇄", cat: "Meta · LinkedIn" },
              { label: "Catalog Ads", icon: "⊞", cat: "Meta · Pinterest" },
              { label: "Search Ads", icon: "🔍", cat: "Google" },
              { label: "Shopping Ads", icon: "🛍", cat: "Google · Pinterest" },
              { label: "Display Ads", icon: "□", cat: "Google · Programmatic" },
              { label: "YouTube Ads", icon: "▷", cat: "YouTube" },
              { label: "Creator Ads", icon: "✦", cat: "TikTok · Meta" },
              { label: "UGC Style", icon: "👤", cat: "All social" },
              { label: "Lead Ads", icon: "◉", cat: "Meta · LinkedIn" },
              { label: "Performance Max", icon: "◈", cat: "Google" },
              { label: "App Ads", icon: "⊡", cat: "Meta · Google" },
            ].map((f) => (
              <motion.div
                key={f.label}
                variants={item}
                className="group rounded-2xl border border-black/8 bg-white p-4 transition-all duration-300 hover:border-[var(--accent)]/30 hover:bg-[var(--accent)]/3"
              >
                <span className="mb-2 block text-lg text-black/25 group-hover:text-[var(--accent)]/60 transition-colors">{f.icon}</span>
                <p className="font-heading text-xs font-bold text-black">{f.label}</p>
                <p className="mt-0.5 text-[10px] text-black/35">{f.cat}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 07 AD LAB (SIGNATURE) ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-black py-20 sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/3 translate-x-1/3 rounded-full opacity-8 blur-[120px]"
          style={{ background: "var(--accent)" }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-12 text-center"
          >
            <SectionLabel>The Ad Lab</SectionLabel>
            <motion.h2 variants={item} className="mt-4 font-heading text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight text-white">
              ONE IDEA.
              <br />
              MANY WAYS TO MAKE IT WORK.
            </motion.h2>
            <motion.p variants={item} className="mx-auto mt-4 max-w-xl text-base text-white/50">
              The same campaign concept behaves differently on every platform. Select a platform to see how the creative transforms.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <AdLab />
          </motion.div>
        </div>
      </section>

      {/* ── 08 AUDIENCE ───────────────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20"
          >
            <div>
              <SectionLabel light>Audience Strategy</SectionLabel>
              <motion.h2 variants={item} className="mt-4 font-heading text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.95] tracking-tight text-black">
                DON'T BUY
                <br />
                IMPRESSIONS.
                <br />
                BUY RELEVANCE.
              </motion.h2>
              <motion.p variants={item} className="mt-6 text-base leading-relaxed text-black/55">
                An impression served to the wrong person at the wrong moment is not media buying it is media waste. Audience strategy is the discipline of ensuring your message reaches people who are most likely to care.
              </motion.p>
            </div>

            <motion.div variants={container} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                {
                  label: "Cold Audiences",
                  desc: "Interest, behaviour and demographic targeting to reach people who don't know you yet.",
                  tag: "New Demand",
                },
                {
                  label: "Warm Audiences",
                  desc: "Page visitors, video viewers and engagers who have shown interest but not converted.",
                  tag: "Re-engage",
                },
                {
                  label: "Retargeting",
                  desc: "People who visited specific pages, added to cart or reached checkout your highest-intent pool.",
                  tag: "Recover",
                },
                {
                  label: "Lookalike Audiences",
                  desc: "Platform-modelled audiences similar to your existing buyers, for efficient cold reach.",
                  tag: "Scale",
                },
                {
                  label: "Customer Lists",
                  desc: "First-party customer data uploaded to platforms for exclusion, cross-sell or win-back campaigns.",
                  tag: "1st Party",
                },
                {
                  label: "Contextual Signals",
                  desc: "Platform-native intent and interest signals where demographic targeting is limited.",
                  tag: "Signal",
                },
              ].map((a) => (
                <motion.div
                  key={a.label}
                  variants={item}
                  className="rounded-2xl border border-black/8 p-4"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <p className="font-heading text-sm font-bold text-black">{a.label}</p>
                    <span className="rounded-full bg-black/5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-black/40">
                      {a.tag}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-black/50">{a.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 09 FULL FUNNEL ────────────────────────────────────────────────── */}
      <section className="bg-black py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-14"
          >
            <SectionLabel>Full Funnel</SectionLabel>
            <motion.h2 variants={item} className="mt-4 font-heading text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight text-white">
              ADVERTISING ACROSS
              <br />
              THE CUSTOMER JOURNEY.
            </motion.h2>
            <motion.p variants={item} className="mt-4 max-w-xl text-base text-white/50">
              Not every campaign needs to cover every stage. Strategy determines the right entry point.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                stage: "01",
                label: "Awareness",
                obj: "Make your brand known",
                formats: ["Video Ads", "Display", "TikTok Discovery", "YouTube In-Stream"],
                metric: "Reach, Frequency, Views",
                color: "border-white/15",
              },
              {
                stage: "02",
                label: "Consideration",
                obj: "Build interest and intent",
                formats: ["Educational Video", "Testimonials", "Demo Ads", "Comparison Content"],
                metric: "CTR, Engagement, Add to Cart",
                color: "border-white/15",
              },
              {
                stage: "03",
                label: "Conversion",
                obj: "Drive the purchase",
                formats: ["Retargeting", "Catalog Ads", "Search Ads", "Offer Ads"],
                metric: "CPA, ROAS, Revenue",
                color: "border-[var(--accent)]/30",
              },
              {
                stage: "04",
                label: "Retention",
                obj: "Maximise customer value",
                formats: ["Cross-sell", "Upsell", "Repurchase", "Customer Campaigns"],
                metric: "LTV, Repeat Rate, AOV",
                color: "border-white/15",
              },
            ].map((f) => (
              <motion.div
                key={f.stage}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: EASE, delay: Number(f.stage) * 0.08 }}
                className={`rounded-3xl border ${f.color} bg-white/3 p-6`}
              >
                <p className="mb-1 font-heading text-xs font-bold text-[var(--accent)]">{f.stage}</p>
                <h3 className="mb-1 font-heading text-xl font-bold text-white">{f.label}</h3>
                <p className="mb-4 text-xs text-white/40">{f.obj}</p>
                <div className="mb-4 space-y-1.5">
                  {f.formats.map((fmt) => (
                    <p key={fmt} className="flex items-center gap-2 text-xs text-white/55">
                      <span className="h-1 w-1 rounded-full bg-white/20" />
                      {fmt}
                    </p>
                  ))}
                </div>
                <div className="border-t border-white/8 pt-3">
                  <p className="text-[10px] text-white/30">Measured by</p>
                  <p className="mt-0.5 text-xs font-semibold text-white/50">{f.metric}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10 MEDIA BUYING ───────────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20"
          >
            <div>
              <SectionLabel light>Media Buying</SectionLabel>
              <motion.h2 variants={item} className="mt-4 font-heading text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.95] tracking-tight text-black">
                MEDIA STRATEGY
                <br />
                IS MORE
                <br />
                THAN BUDGET.
              </motion.h2>
              <motion.p variants={item} className="mt-6 text-base leading-relaxed text-black/55">
                Where you spend matters less than how intelligently you spend it. Media buying is the system of decisions platform allocation, audience segmentation, bidding strategy and creative pacing that determines whether your budget generates results or generates activity.
              </motion.p>
            </div>

            <motion.div variants={item} className="flex flex-col justify-center">
              <div className="space-y-0">
                {[
                  { n: "01", label: "Budget Allocation", desc: "Platform split based on audience size, intent and conversion data." },
                  { n: "02", label: "Campaign Structure", desc: "Audience segmentation, objective alignment and ad set architecture." },
                  { n: "03", label: "Bidding Strategy", desc: "Cost caps, ROAS targets and bid calibration to business unit economics." },
                  { n: "04", label: "Placement Selection", desc: "Manual vs automatic placements chosen per platform and format." },
                  { n: "05", label: "Creative Scheduling", desc: "Rotation and frequency management to fight creative fatigue." },
                  { n: "06", label: "Retargeting Windows", desc: "Audience pools matched to the buying cycle of your category." },
                  { n: "07", label: "Scaling Decisions", desc: "Budget scaling governed by signal quality, not spend ambition." },
                ].map((s) => (
                  <div key={s.n} className="flex gap-4 border-b border-black/6 py-4 last:border-0">
                    <span className="mt-0.5 font-heading text-xs font-bold text-[var(--accent)]">{s.n}</span>
                    <div>
                      <p className="font-heading text-sm font-bold text-black">{s.label}</p>
                      <p className="mt-0.5 text-xs text-black/45">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 11 AD TESTING ─────────────────────────────────────────────────── */}
      <section className="bg-black py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20"
          >
            <div>
              <SectionLabel>Ad Testing</SectionLabel>
              <motion.h2 variants={item} className="mt-4 font-heading text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight text-white">
                TEST THE IDEA.
                <br />
                NOT JUST
                <br />
                THE BUTTON COLOUR.
              </motion.h2>
              <motion.p variants={item} className="mt-6 text-base leading-relaxed text-white/55">
                Micro-testing minor variables wastes budget. High-impact advertising tests begin with the hypothesis that matters the hook, the angle, the offer, the format before moving to refinement.
              </motion.p>
            </div>

            <motion.div variants={item} className="grid grid-cols-2 gap-3">
              {[
                { label: "Hook", priority: "Critical", desc: "What stops the scroll?" },
                { label: "Angle", priority: "Critical", desc: "Why should they care?" },
                { label: "Offer", priority: "High", desc: "What is the incentive to act?" },
                { label: "Format", priority: "High", desc: "Video vs static vs carousel?" },
                { label: "Audience", priority: "Medium", desc: "Which segment responds best?" },
                { label: "Landing Page", priority: "Medium", desc: "Message match and conversion." },
                { label: "CTA", priority: "Low", desc: "Buy vs Shop vs Learn More." },
                { label: "Copy Length", priority: "Low", desc: "Short vs long body copy." },
              ].map((t) => (
                <div key={t.label} className="rounded-2xl border border-white/8 bg-white/3 p-4">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <p className="font-heading text-sm font-bold text-white">{t.label}</p>
                    <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide ${
                      t.priority === "Critical"
                        ? "bg-[var(--accent)]/15 text-[var(--accent)]"
                        : t.priority === "High"
                        ? "bg-white/10 text-white/60"
                        : "bg-white/5 text-white/30"
                    }`}>
                      {t.priority}
                    </span>
                  </div>
                  <p className="text-xs text-white/40">{t.desc}</p>
                </div>
              ))}
              <div className="col-span-2 rounded-2xl border border-white/8 bg-white/3 p-4">
                <div className="flex items-center gap-3 text-xs text-white/40">
                  {["Hypothesis", "Test", "Signal", "Learning", "Iteration"].map((s, i, arr) => (
                    <span key={s} className="flex items-center gap-3">
                      <span className={i === 0 ? "text-white/70" : ""}>{s}</span>
                      {i < arr.length - 1 && <span className="text-white/20">→</span>}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 12 AD → LANDING PAGE ──────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20"
          >
            <div>
              <SectionLabel light>Message Match</SectionLabel>
              <motion.h2 variants={item} className="mt-4 font-heading text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.95] tracking-tight text-black">
                THE AD IS
                <br />
                ONLY THE
                <br />
                BEGINNING.
              </motion.h2>
              <motion.p variants={item} className="mt-6 text-base leading-relaxed text-black/55">
                If the ad makes a promise and the landing page delivers something different, performance suffers regardless of how good the ad is. Creative, copy and offer must be consistent from the first impression to the final conversion.
              </motion.p>
            </div>

            <motion.div variants={item} className="flex flex-col justify-center">
              <div className="overflow-hidden rounded-3xl border border-black/8">
                {[
                  { label: "Ad Promise", icon: "▣", desc: "The hook, offer and message that got the click." },
                  { label: "Landing Page", icon: "⤵", desc: "Matches the promise. Eliminates friction. Builds trust." },
                  { label: "Product / Service", icon: "◈", desc: "Delivers exactly what was offered. No surprises." },
                  { label: "Proof", icon: "✓", desc: "Reviews, testimonials and evidence that reduce risk." },
                  { label: "Conversion", icon: "◉", desc: "A clear, frictionless next step that completes the action." },
                ].map((s, i) => (
                  <div
                    key={s.label}
                    className={`flex items-start gap-4 px-6 py-5 ${i < 4 ? "border-b border-black/6" : ""}`}
                  >
                    <span className="mt-0.5 text-lg text-black/20">{s.icon}</span>
                    <div>
                      <p className="font-heading text-sm font-bold text-black">{s.label}</p>
                      <p className="mt-0.5 text-xs text-black/45">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-black/40">
                Message mismatch is one of the most common causes of high CTR with poor conversion rates.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 13 ADVERTISING + DATA ─────────────────────────────────────────── */}
      <section className="bg-black py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-14"
          >
            <SectionLabel>Measurement</SectionLabel>
            <motion.h2 variants={item} className="mt-4 font-heading text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight text-white">
              NUMBERS THAT
              <br />
              TELL YOU SOMETHING.
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {[
              {
                title: "Advertising Metrics",
                metrics: [
                  { label: "Impressions", desc: "Total times your ad was shown" },
                  { label: "Reach", desc: "Unique people who saw it" },
                  { label: "Frequency", desc: "Average times each person saw it" },
                  { label: "CTR", desc: "Clicks as a percentage of impressions" },
                  { label: "CPC", desc: "Cost per click" },
                  { label: "CPM", desc: "Cost per 1,000 impressions" },
                  { label: "CPA", desc: "Cost per acquisition" },
                  { label: "ROAS", desc: "Revenue per rupee spent on ads" },
                ],
              },
              {
                title: "D2C / Ecommerce Metrics",
                metrics: [
                  { label: "AOV", desc: "Average Order Value" },
                  { label: "CAC", desc: "Customer Acquisition Cost" },
                  { label: "MER", desc: "Media Efficiency Ratio (total revenue / total ad spend)" },
                  { label: "LTV", desc: "Lifetime Value revenue per customer over time" },
                  { label: "Repeat Purchase Rate", desc: "Percentage of customers who buy again" },
                  { label: "Contribution Margin", desc: "Revenue minus variable costs per unit" },
                  { label: "Blended ROAS", desc: "Revenue from all channels / total ad spend" },
                  { label: "New vs Returning", desc: "Revenue split by customer acquisition type" },
                ],
              },
            ].map((group) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="rounded-3xl border border-white/10 p-6 sm:p-8"
              >
                <h3 className="mb-6 font-heading text-sm font-bold uppercase tracking-widest text-white/40">
                  {group.title}
                </h3>
                <div className="space-y-3">
                  {group.metrics.map((m) => (
                    <div key={m.label} className="flex items-start gap-3 border-b border-white/6 pb-3 last:border-0 last:pb-0">
                      <span className="min-w-[80px] font-heading text-xs font-bold text-white">{m.label}</span>
                      <span className="text-xs text-white/40">{m.desc}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          <p className="mt-6 text-sm text-white/30">
            Not every metric matters equally for every campaign. We define the right success criteria upfront based on your objective, budget and business model.
          </p>
        </div>
      </section>

      {/* ── 14 TRACKING ───────────────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20"
          >
            <div>
              <SectionLabel light>Tracking & Attribution</SectionLabel>
              <motion.h2 variants={item} className="mt-4 font-heading text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.95] tracking-tight text-black">
                ADVERTISING
                <br />
                DECISIONS NEED
                <br />
                CLEAN DATA.
              </motion.h2>
              <motion.p variants={item} className="mt-6 text-base leading-relaxed text-black/55">
                Campaigns optimised against inaccurate data don't improve they compound errors. Tracking is the infrastructure your advertising performance is built on.
              </motion.p>
              <motion.div variants={item} className="mt-6">
                <Link
                  href="/services/performance-marketing"
                  className="inline-flex items-center gap-2 rounded-full border border-black px-5 py-2.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white"
                >
                  See our Tracking & Attribution service →
                </Link>
              </motion.div>
            </div>

            <motion.div variants={item} className="grid grid-cols-2 gap-3">
              {[
                "Google Tag Manager",
                "GA4",
                "Meta Pixel",
                "Meta Conversions API",
                "Google Ads Conversion Tracking",
                "Enhanced Conversions",
                "Server-Side Tracking",
                "UTM Parameters",
                "Ecommerce Tracking",
                "Attribution Modelling",
              ].map((tool) => (
                <div
                  key={tool}
                  className="flex items-center gap-2 rounded-xl border border-black/8 px-3 py-2.5"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  <span className="text-xs font-semibold text-black/70">{tool}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 15 AI + ADVERTISING ───────────────────────────────────────────── */}
      <section className="bg-black py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20"
          >
            <div>
              <SectionLabel>AI & Advertising</SectionLabel>
              <motion.h2 variants={item} className="mt-4 font-heading text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight text-white">
                AI MAKES
                <br />
                IT FASTER.
                <br />
                STRATEGY MAKES
                <br />
                IT BETTER.
              </motion.h2>
              <motion.p variants={item} className="mt-6 text-base leading-relaxed text-white/55">
                AI tools accelerate research, creative variation, reporting and analysis. But the decisions that determine whether a campaign succeeds who to target, what to say, what to test, when to scale remain strategic ones. We use AI to do more of the right things, faster.
              </motion.p>
            </div>

            <motion.div variants={item} className="grid grid-cols-1 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/3 p-5">
                <p className="mb-3 font-heading text-xs font-bold uppercase tracking-widest text-[var(--accent)]">AI can accelerate</p>
                <div className="grid grid-cols-2 gap-2">
                  {["Creative ideation", "Copy variations", "Audience research", "Creative analysis", "Reporting", "Data summarisation", "A/B test setup", "Brief generation"].map((t) => (
                    <p key={t} className="flex items-center gap-2 text-xs text-white/55">
                      <span className="h-1 w-1 rounded-full bg-[var(--accent)]/50" />{t}
                    </p>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/3 p-5">
                <p className="mb-3 font-heading text-xs font-bold uppercase tracking-widest text-white/30">Human strategy decides</p>
                <div className="grid grid-cols-2 gap-2">
                  {["What to say", "Who to target", "Why it matters", "What to test", "When to scale", "What to cut", "How to position", "What success looks like"].map((t) => (
                    <p key={t} className="flex items-center gap-2 text-xs text-white/55">
                      <span className="h-1 w-1 rounded-full bg-white/20" />{t}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 16 CREATIVE × MEDIA EQUATION ─────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="text-center"
          >
            <SectionLabel light>The System</SectionLabel>
            <motion.h2 variants={item} className="mt-4 font-heading text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.95] tracking-tight text-black">
              THE ADVERTISING
              <br />
              EQUATION.
            </motion.h2>
            <motion.div variants={item} className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
              {[
                { label: "Creative", sub: "What you say and how you say it" },
                { op: "×" },
                { label: "Media", sub: "Where and how you distribute it" },
                { op: "×" },
                { label: "Audience", sub: "Who receives it" },
                { op: "×" },
                { label: "Offer", sub: "Why they should act now" },
                { op: "×" },
                { label: "Experience", sub: "What happens after the click" },
                { op: "=" },
                { label: "Impact", sub: "Attention that drives action", accent: true },
              ].map((el, i) =>
                "op" in el ? (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
                    className="font-heading text-2xl font-bold text-black/20 sm:text-3xl"
                  >
                    {el.op}
                  </motion.span>
                ) : (
                  <motion.div
                    key={el.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.07, ease: EASE }}
                    className={`rounded-2xl border px-5 py-4 text-center ${
                      el.accent
                        ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                        : "border-black/8 bg-white text-black"
                    }`}
                  >
                    <p className={`font-heading text-sm font-bold sm:text-base ${el.accent ? "text-white" : "text-black"}`}>
                      {el.label}
                    </p>
                    <p className={`mt-0.5 text-[10px] ${el.accent ? "text-white/70" : "text-black/35"}`}>
                      {el.sub}
                    </p>
                  </motion.div>
                )
              )}
            </motion.div>
            <motion.p variants={item} className="mx-auto mt-8 max-w-lg text-sm text-black/40">
              Change any variable in the system and the output changes. This is why advertising requires both creative and strategic thinking working together.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── 17 WHY SARVOPAYA ──────────────────────────────────────────────── */}
      <section className="bg-black py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-14"
          >
            <SectionLabel>Why Sarvopaya</SectionLabel>
            <motion.h2 variants={item} className="mt-4 font-heading text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight text-white">
              CREATIVE + MEDIA
              <br />
              UNDER ONE SYSTEM.
            </motion.h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                n: "01",
                label: "Creative + Media Together",
                desc: "Strategy, creative and media buying are managed as one system not handed between separate teams. What we learn from the data feeds directly back into the creative.",
              },
              {
                n: "02",
                label: "Platform-Specific Thinking",
                desc: "We don't adapt the same campaign to every platform. We build for each platform's audience behaviour, format expectations and content norms.",
              },
              {
                n: "03",
                label: "D2C Understanding",
                desc: "We understand the unit economics of consumer brands contribution margins, CAC tolerance, LTV implications. Advertising decisions are made in that context.",
              },
              {
                n: "04",
                label: "Tracking-Aware Campaigns",
                desc: "We build campaigns on clean measurement infrastructure. If the tracking isn't right, we fix it before spending significant budget.",
              },
              {
                n: "05",
                label: "Continuous Creative Testing",
                desc: "Creative is not a one-time deliverable. We systematically test hooks, angles and formats to build a growing body of knowledge about what works for your audience.",
              },
              {
                n: "06",
                label: "Business-Focused Reporting",
                desc: "Our reports answer: Is this growing the business? Not just: did impressions increase? We focus on metrics that connect advertising activity to revenue outcomes.",
              },
            ].map((d) => (
              <motion.div key={d.n} variants={item} className="rounded-3xl border border-white/8 bg-white/3 p-6">
                <p className="mb-3 font-heading text-xs font-bold text-[var(--accent)]">{d.n}</p>
                <h3 className="mb-3 font-heading text-lg font-bold text-white">{d.label}</h3>
                <p className="text-sm leading-relaxed text-white/50">{d.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 18 ADVERTISING PROCESS ────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-14"
          >
            <SectionLabel light>How We Work</SectionLabel>
            <motion.h2 variants={item} className="mt-4 font-heading text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[0.95] tracking-tight text-black">
              FROM BRIEF
              <br />
              TO CAMPAIGN.
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01", label: "Discover", items: ["Audience research", "Product positioning", "Competitor analysis", "Market context"] },
              { n: "02", label: "Strategise", items: ["Campaign objective", "Platform selection", "Budget allocation", "Creative brief"] },
              { n: "03", label: "Create", items: ["Concept development", "Ad copy", "Design / video", "Format variants"] },
              { n: "04", label: "Launch", items: ["Campaign setup", "Audience targeting", "Placement selection", "Tracking verification"] },
              { n: "05", label: "Learn", items: ["Performance data", "Creative signals", "Audience insights", "Landing page data"] },
              { n: "06", label: "Optimise", items: ["Budget reallocation", "Creative rotation", "Audience refinement", "Bid adjustment"] },
              { n: "07", label: "Scale", items: ["Expand what works", "Increase budget", "New markets", "New formats"] },
            ].map((phase) => (
              <motion.div
                key={phase.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.55, ease: EASE, delay: Number(phase.n) * 0.05 }}
                className="rounded-3xl border border-black/8 p-5"
              >
                <p className="mb-1 font-heading text-xs font-bold text-[var(--accent)]">{phase.n}</p>
                <h3 className="mb-3 font-heading text-lg font-bold text-black">{phase.label}</h3>
                <div className="space-y-1.5">
                  {phase.items.map((item) => (
                    <p key={item} className="flex items-center gap-2 text-xs text-black/50">
                      <span className="h-1 w-1 rounded-full bg-black/20" />{item}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 19 AUDIT CTA ──────────────────────────────────────────────────── */}
      <section className="bg-black py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <SectionLabel>Advertising Audit</SectionLabel>
            <motion.h2 variants={item} className="mt-6 font-heading text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight text-white">
              BEFORE YOU SPEND MORE,
              <br />
              FIND OUT WHAT'S
              <br />
              NOT WORKING.
            </motion.h2>
            <motion.p variants={item} className="mx-auto mt-6 max-w-lg text-base text-white/50">
              We review your advertising accounts, creative, audience strategy, tracking setup and landing pages and tell you exactly where performance is being lost.
            </motion.p>
            <motion.div variants={item} className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <div className="flex flex-wrap justify-center gap-2">
                {["Account Structure", "Creative", "Audience Strategy", "Budget Allocation", "Tracking", "Landing Pages", "Attribution"].map((area) => (
                  <span key={area} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/40">
                    {area}
                  </span>
                ))}
              </div>
            </motion.div>
            <motion.div variants={item} className="mt-8 flex flex-wrap justify-center gap-3">
              <CTAButton href="/contact" variant="primary" size="lg">
                Get an Advertising Audit
              </CTAButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 20 INTERNAL LINKS ─────────────────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mb-10"
          >
            <SectionLabel light>Related Services</SectionLabel>
            <motion.h2 variants={item} className="mt-4 font-heading text-2xl font-bold text-black sm:text-3xl">
              Advertising works best alongside these.
            </motion.h2>
          </motion.div>
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              { label: "Performance Marketing", desc: "ROAS, tracking, attribution and D2C revenue measurement.", href: "/services/performance-marketing" },
              { label: "SEO", desc: "Organic search visibility that complements paid traffic.", href: "/services/seo" },
              { label: "Social Media Marketing", desc: "Organic social presence to support paid social campaigns.", href: "/services/social-media-marketing" },
              { label: "Web Development", desc: "The landing pages and experiences your ads send traffic to.", href: "/services/website-digital-experience" },
              { label: "AI Automation", desc: "Automate reporting, follow-up and operational workflows.", href: "https://eajjy.com/" },
              { label: "Case Studies", desc: "Real campaign outcomes from real client work.", href: "/case-studies" },
            ].map((link) => (
              <motion.div key={link.label} variants={item}>
                <Link
                  href={link.href}
                  className="group flex items-start justify-between gap-4 rounded-2xl border border-black/8 p-5 transition-all duration-300 hover:border-black/20 hover:bg-black/2"
                >
                  <div>
                    <p className="font-heading text-sm font-bold text-black group-hover:text-[var(--accent)] transition-colors">{link.label}</p>
                    <p className="mt-1 text-xs text-black/45">{link.desc}</p>
                  </div>
                  <span className="mt-0.5 shrink-0 text-sm text-black/25 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-black">→</span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 21 FAQ ────────────────────────────────────────────────────────── */}
      <section className="bg-black py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mb-12"
          >
            <SectionLabel>FAQ</SectionLabel>
            <motion.h2 variants={item} className="mt-4 font-heading text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight text-white">
              COMMON
              <br />
              QUESTIONS.
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <FAQAccordion />
          </motion.div>
        </div>
      </section>

      {/* ── 22 FINAL CTA ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-black py-24 sm:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div
            className="h-[600px] w-[600px] rounded-full opacity-15 blur-[120px]"
            style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }}
          />
        </div>

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <SectionLabel>Let's Start</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-[clamp(2.5rem,7vw,5rem)] font-bold leading-[0.92] tracking-tight text-white"
            >
              READY TO GET
              <br />
              YOUR BRAND
              <br />
              <span className="text-[var(--accent)]">NOTICED?</span>
            </motion.h2>
            <motion.p variants={item} className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/55">
              Let's build the creative, distribution and measurement system behind your next campaign.
            </motion.p>
            <motion.div variants={item} className="mt-8 flex flex-wrap justify-center gap-3">
              <CTAButton href="/contact" variant="primary" size="lg">
                Start a Campaign
              </CTAButton>
              <CTAButton href="/contact" variant="outline" size="lg">
                Talk to a Strategist
              </CTAButton>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
