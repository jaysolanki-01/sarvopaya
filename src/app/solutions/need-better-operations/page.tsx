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
const AMBER = "#f59e0b";

const up = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } };
const seq = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

const waste = [
  { label: "Manual data entry", hrs: "8h/week", col: RED },
  { label: "Copy-paste between tools", hrs: "5h/week", col: AMBER },
  { label: "Chasing status updates", hrs: "4h/week", col: AMBER },
  { label: "Manual report compilation", hrs: "6h/week", col: RED },
  { label: "Re-keying customer data", hrs: "3h/week", col: AMBER },
  { label: "Ticket routing & assignment", hrs: "4h/week", col: RED },
];

const automations = [
  { title: "Marketing Ops Automation", desc: "Auto-sync leads from ads to CRM, trigger follow-up sequences, update campaign statuses and generate reports without touching a spreadsheet." },
  { title: "Sales Workflow Automation", desc: "Auto-enrich leads, assign deals, trigger follow-up reminders, update pipelines and notify the team at exactly the right moment." },
  { title: "Support Automation", desc: "Route tickets by type, auto-reply to common questions, escalate urgent cases and sync resolution status across tools." },
  { title: "Finance & Reporting", desc: "Auto-generate weekly performance reports, sync revenue data across tools and alert the right stakeholders without manual compilation." },
  { title: "HR & Onboarding", desc: "Automate new hire setup, tool access provisioning, onboarding task sequences and team notifications." },
  { title: "Data Sync & Integration", desc: "Keep your CRM, helpdesk, e-commerce platform and analytics tools perfectly in sync — no manual exports or imports." },
];

export default function NeedBetterOperationsPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroIv = useInView(heroRef, { once: true, amount: 0.3 });
  const wasteRef = useRef<HTMLDivElement>(null);
  const wasteIv = useInView(wasteRef, { once: true, amount: 0.3 });
  const autoRef = useRef<HTMLDivElement>(null);
  const autoIv = useInView(autoRef, { once: true, amount: 0.2 });

  return (
    <div style={{ background: BG }} className="min-h-screen">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "90svh", display: "flex", alignItems: "center" }} ref={heroRef}>
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: BORDER }} />
        <div className="mx-auto max-w-7xl px-4 py-40 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={heroIv ? "show" : "hidden"}>
            <motion.p variants={up} className="mb-6 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: AMBER }}>
              OPERATIONS & AUTOMATION
            </motion.p>
            <motion.h1 variants={up} className="font-bold uppercase text-white"
              style={{ fontSize: "clamp(48px,10vw,130px)", lineHeight: 0.88, letterSpacing: "-0.02em" }}>
              NEED<br />BETTER<br /><span style={{ color: RED }}>OPS?</span>
            </motion.h1>
            <motion.p variants={up} className="mt-8 max-w-md text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
              Automate the repetitive. Streamline the complex. Give your team back the hours they
              spend on work that should never involve a human.
            </motion.p>
            <motion.div variants={up} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact"
                className="inline-flex h-14 items-center gap-3 rounded-full bg-[#ed2830] px-8 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#c41e24]">
                AUTOMATE MY OPS <span>→</span>
              </Link>
              <Link href="/services/ai-automation"
                className="inline-flex h-14 items-center gap-3 rounded-full border border-white/20 px-8 text-sm font-bold uppercase tracking-wider text-white/70 transition-colors hover:border-white/40 hover:text-white">
                AI AUTOMATION SERVICES
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── TIME WASTE ── */}
      <section style={{ background: BG2, borderTop: `1px solid ${BORDER}` }} ref={wasteRef}>
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={wasteIv ? "show" : "hidden"} className="mb-14">
            <motion.h2 variants={up} className="text-3xl font-bold uppercase leading-tight text-white sm:text-4xl lg:text-5xl" style={{ maxWidth: 640 }}>
              WHERE YOUR TEAM&apos;S TIME<br />IS DISAPPEARING.
            </motion.h2>
            <motion.p variants={up} className="mt-4 text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.38)", maxWidth: 480 }}>
              The average team wastes 30+ hours per week on work that can be automated today.
            </motion.p>
          </motion.div>
          <div className="space-y-px divide-y border-t" style={{ borderColor: BORDER }}>
            {waste.map((w, i) => (
              <motion.div key={w.label}
                initial={{ opacity: 0, x: -12 }} animate={wasteIv ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.09, duration: 0.5, ease: EASE }}
                className="flex items-center justify-between py-5">
                <div className="flex items-center gap-4">
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: w.col }} />
                  <span className="text-sm font-semibold text-white">{w.label}</span>
                </div>
                <span className="text-sm font-black tabular-nums" style={{ color: w.col }}>{w.hrs}</span>
              </motion.div>
            ))}
          </div>
          <motion.p initial={{ opacity: 0 }} animate={wasteIv ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}
            className="mt-8 text-[10px] font-bold uppercase tracking-widest" style={{ color: GREEN }}>
            TOTAL: ~30h PER TEAM PER WEEK — AUTOMATABLE TODAY
          </motion.p>
        </div>
      </section>

      {/* ── WHAT WE AUTOMATE ── */}
      <section style={{ background: BG, borderTop: `1px solid ${BORDER}` }} ref={autoRef}>
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={autoIv ? "show" : "hidden"} className="mb-14">
            <motion.h2 variants={up} className="text-3xl font-bold uppercase leading-tight text-white sm:text-4xl lg:text-5xl">
              WHAT WE AUTOMATE.
            </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-px border-l border-t sm:grid-cols-2 lg:grid-cols-3" style={{ borderColor: BORDER }}>
            {automations.map((a, i) => (
              <motion.div key={a.title}
                initial={{ opacity: 0 }} animate={autoIv ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.09 }}
                className="border-b border-r p-8" style={{ borderColor: BORDER }}>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest" style={{ color: AMBER }}>
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="text-base font-bold text-white">{a.title}</p>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.42)" }}>{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: BG2, borderTop: `1px solid ${BORDER}` }}>
        <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: GREEN }}>GET STARTED</p>
          <h2 className="text-3xl font-bold uppercase text-white sm:text-4xl">
            READY TO AUTOMATE?
          </h2>
          <p className="mt-5 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
            Book a free 30-minute operations audit. We will map your biggest manual workflows and show you what can be automated immediately.
          </p>
          <Link href="/contact"
            className="mt-8 inline-flex h-14 items-center gap-3 rounded-full bg-[#ed2830] px-10 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#c41e24]">
            BOOK FREE AUDIT →
          </Link>
        </div>
      </section>
    </div>
  );
}
