"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const BG = "#050505";
const BG2 = "#0c0c0c";
const BORDER = "rgba(255,255,255,0.06)";
const RED = "#ed2830";
const GREEN = "#22c55e";
const AI = "#60a5fa";

const up = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const seq = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

const gtmPhases = [
  { phase: "01", label: "Positioning", title: "Who It's For. Why Now. Why You.", desc: "We run messaging workshops to define your ICP, competitive position and the single reason someone should choose your product over alternatives." },
  { phase: "02", label: "Foundation", title: "The Site & Landing Page", desc: "A conversion-first launch page built in days, not months. Clear headline, product demo or screenshot, social proof and a CTA that converts cold traffic." },
  { phase: "03", label: "Acquisition", title: "First 1,000 Users", desc: "Paid acquisition (Meta + Google), SEO groundwork, LinkedIn outreach for B2B, and community activation — all built to get traction before you run out of runway." },
  { phase: "04", label: "Retention", title: "Onboarding & Activation", desc: "Onboarding email sequences, in-app triggers and support automation that get new users to first value fast and reduce early churn." },
  { phase: "05", label: "Scale", title: "What's Working Gets More Budget", desc: "After 30 days, we have real data. We double down on the acquisition channels and messaging that converts and cut everything else." },
];

const checklist = [
  "Positioning & messaging framework",
  "ICP definition",
  "Competitor analysis",
  "Launch landing page",
  "Paid acquisition setup (Meta + Google)",
  "SEO foundation",
  "Email onboarding sequence",
  "Analytics & attribution tracking",
  "Growth loop identification",
  "30-day performance review",
];

export default function LaunchingANewProductPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroIv = useInView(heroRef, { once: true, amount: 0.3 });
  const gtmRef = useRef<HTMLDivElement>(null);
  const gtmIv = useInView(gtmRef, { once: true, amount: 0.2 });
  const listRef = useRef<HTMLDivElement>(null);
  const listIv = useInView(listRef, { once: true, amount: 0.3 });

  return (
    <div style={{ background: BG }} className="min-h-screen">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "90svh", display: "flex", alignItems: "center" }} ref={heroRef}>
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: BORDER }} />
        <div className="mx-auto max-w-7xl px-4 py-40 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={heroIv ? "show" : "hidden"}>
            <motion.p variants={up} className="mb-6 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: AI }}>
              PRODUCT LAUNCH & GTM
            </motion.p>
            <motion.h1 variants={up} className="font-bold uppercase text-white"
              style={{ fontSize: "clamp(44px,9vw,120px)", lineHeight: 0.88, letterSpacing: "-0.02em" }}>
              LAUNCHING<br />A NEW<br /><span style={{ color: RED }}>PRODUCT?</span>
            </motion.h1>
            <motion.p variants={up} className="mt-8 max-w-md text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
              Go to market with a plan built to get traction fast. Positioning, landing pages,
              paid acquisition and growth systems — all in one integrated launch.
            </motion.p>
            <motion.div variants={up} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact"
                className="inline-flex h-14 items-center gap-3 rounded-full bg-[#ed2830] px-8 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#c41e24]">
                PLAN MY LAUNCH <span>→</span>
              </Link>
              <Link href="/services/growth-consulting"
                className="inline-flex h-14 items-center gap-3 rounded-full border border-white/20 px-8 text-sm font-bold uppercase tracking-wider text-white/70 transition-colors hover:border-white/40 hover:text-white">
                GROWTH CONSULTING
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── GTM PHASES ── */}
      <section style={{ background: BG2, borderTop: `1px solid ${BORDER}` }} ref={gtmRef}>
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={gtmIv ? "show" : "hidden"} className="mb-14">
            <motion.h2 variants={up} className="text-3xl font-bold uppercase leading-tight text-white sm:text-4xl lg:text-5xl" style={{ maxWidth: 680 }}>
              THE GTM PLAN.<br />
              <span style={{ color: "rgba(255,255,255,0.22)" }}>PHASE BY PHASE.</span>
            </motion.h2>
          </motion.div>
          <div className="space-y-px divide-y border-t" style={{ borderColor: BORDER }}>
            {gtmPhases.map((p, i) => (
              <motion.div key={p.phase}
                initial={{ opacity: 0, y: 12 }} animate={gtmIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5, ease: EASE }}
                className="flex flex-col gap-4 py-8 sm:flex-row sm:items-start sm:gap-10">
                <div className="shrink-0">
                  <span className="text-[10px] font-black tabular-nums" style={{ color: "rgba(255,255,255,0.2)" }}>{p.phase}</span>
                  <span className="ml-3 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest"
                    style={{ border: `1px solid ${AI}30`, color: AI }}>{p.label}</span>
                </div>
                <div>
                  <p className="text-base font-bold text-white">{p.title}</p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHECKLIST ── */}
      <section style={{ background: BG, borderTop: `1px solid ${BORDER}` }} ref={listRef}>
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start">
            <motion.div variants={seq} initial="hidden" animate={listIv ? "show" : "hidden"}>
              <motion.h2 variants={up} className="text-3xl font-bold uppercase leading-tight text-white sm:text-4xl lg:text-5xl">
                WHAT&apos;S INCLUDED<br />
                <span style={{ color: "rgba(255,255,255,0.2)" }}>IN A LAUNCH PACKAGE.</span>
              </motion.h2>
              <motion.p variants={up} className="mt-6 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.38)", maxWidth: 420 }}>
                A full GTM package covers everything from positioning to acquisition. No separate agencies, no coordination overhead.
              </motion.p>
            </motion.div>
            <div className="space-y-px divide-y border-t" style={{ borderColor: BORDER }}>
              {checklist.map((item, i) => (
                <motion.div key={item}
                  initial={{ opacity: 0, x: 12 }} animate={listIv ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: EASE }}
                  className="flex items-center gap-4 py-4">
                  <span className="text-xs font-black" style={{ color: GREEN }}>✓</span>
                  <span className="text-sm font-semibold text-white">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: BG2, borderTop: `1px solid ${BORDER}` }}>
        <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: GREEN }}>GET STARTED</p>
          <h2 className="text-3xl font-bold uppercase text-white sm:text-4xl">READY TO LAUNCH?</h2>
          <p className="mt-5 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
            Book a free 30-minute strategy call. We will map your launch plan and tell you the fastest path to your first 1,000 users.
          </p>
          <Link href="/contact"
            className="mt-8 inline-flex h-14 items-center gap-3 rounded-full bg-[#ed2830] px-10 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#c41e24]">
            BOOK A FREE CALL →
          </Link>
        </div>
      </section>
    </div>
  );
}
