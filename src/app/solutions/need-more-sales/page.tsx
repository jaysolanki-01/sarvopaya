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

const up = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const seq = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

const problems = [
  { title: "High traffic, low conversions", body: "You're getting visitors but your landing pages and product pages aren't closing them. Every click costs money — you're haemorrhaging budget." },
  { title: "Weak follow-up", body: "Leads come in and go cold. No automation, no sequence, no trigger to re-engage them at the right moment. Revenue left on the table daily." },
  { title: "Pages that explain, not convert", body: "Your website tells people what you do. It doesn't tell them why to buy now. No urgency, no social proof in the right places, no CRO thinking." },
  { title: "No attribution clarity", body: "You don't know which ads, pages or touchpoints actually drive sales. So you can't optimise. You're guessing what to scale." },
];

const solutions = [
  { label: "CRO", title: "Conversion Rate Optimisation", desc: "We audit your funnel, identify the exact drop-off points and fix them — landing page copy, layout, CTA placement, trust signals and form friction." },
  { label: "Funnels", title: "Sales Funnel Design", desc: "End-to-end funnel architecture: awareness → consideration → purchase → retention. Designed around how your buyers actually decide." },
  { label: "Automation", title: "Follow-Up Automation", desc: "Automated email sequences, WhatsApp follow-ups and retargeting triggers that reach the right prospect at the right time without manual effort." },
  { label: "Landing Pages", title: "Landing Pages That Convert", desc: "High-performance landing pages designed and built for conversion — tested copy, mobile-first design and fast load times. Not templates." },
];

export default function NeedMoreSalesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroIv = useInView(heroRef, { once: true, amount: 0.3 });
  const probRef = useRef<HTMLDivElement>(null);
  const probIv = useInView(probRef, { once: true, amount: 0.2 });
  const solRef = useRef<HTMLDivElement>(null);
  const solIv = useInView(solRef, { once: true, amount: 0.2 });

  return (
    <div style={{ background: BG }} className="min-h-screen">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ minHeight: "90svh", display: "flex", alignItems: "center" }} ref={heroRef}>
        <div className="absolute inset-x-0 top-0 h-px" style={{ background: BORDER }} />
        <div className="mx-auto max-w-7xl px-4 py-40 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={heroIv ? "show" : "hidden"}>
            <motion.p variants={up} className="mb-6 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: RED }}>
              CONVERSION & SALES
            </motion.p>
            <motion.h1
              variants={up}
              className="font-bold uppercase text-white"
              style={{ fontSize: "clamp(56px,11vw,140px)", lineHeight: 0.88, letterSpacing: "-0.02em" }}
            >
              NEED<br />MORE<br /><span style={{ color: RED }}>SALES?</span>
            </motion.h1>
            <motion.p variants={up} className="mt-8 max-w-md text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
              Convert more of the pipeline you already have. Stop losing deals to poor follow-up,
              weak landing pages and untracked drop-offs.
            </motion.p>
            <motion.div variants={up} className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact"
                className="inline-flex h-14 items-center gap-3 rounded-full bg-[#ed2830] px-8 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#c41e24]">
                FIX MY CONVERSION RATE <span>→</span>
              </Link>
              <Link href="/services/website-digital-experience"
                className="inline-flex h-14 items-center gap-3 rounded-full border border-white/20 px-8 text-sm font-bold uppercase tracking-wider text-white/70 transition-colors hover:border-white/40 hover:text-white">
                VIEW CRO SERVICES
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── PROBLEMS ── */}
      <section style={{ background: BG2, borderTop: `1px solid ${BORDER}` }} ref={probRef}>
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={probIv ? "show" : "hidden"} className="mb-14">
            <motion.h2 variants={up} className="text-3xl font-bold uppercase leading-tight text-white sm:text-4xl lg:text-5xl" style={{ maxWidth: 600 }}>
              WHY LEADS AREN&apos;T BECOMING SALES.
            </motion.h2>
            <motion.p variants={up} className="mt-4 max-w-lg text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.38)" }}>
              The gap between traffic and revenue is almost always one of these four problems.
            </motion.p>
          </motion.div>
          <div className="grid grid-cols-1 gap-px border-l border-t sm:grid-cols-2" style={{ borderColor: BORDER }}>
            {problems.map((p, i) => (
              <motion.div key={p.title}
                initial={{ opacity: 0 }} animate={probIv ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.1 }}
                className="border-b border-r p-8" style={{ borderColor: BORDER }}>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest" style={{ color: RED }}>
                  PROBLEM {String(i + 1).padStart(2, "0")}
                </p>
                <p className="text-base font-bold text-white">{p.title}</p>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS ── */}
      <section style={{ background: BG, borderTop: `1px solid ${BORDER}` }} ref={solRef}>
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={solIv ? "show" : "hidden"} className="mb-14">
            <motion.h2 variants={up} className="text-3xl font-bold uppercase leading-tight text-white sm:text-4xl lg:text-5xl">
              HOW WE FIX IT.
            </motion.h2>
          </motion.div>
          <div className="space-y-px divide-y" style={{ borderColor: BORDER }}>
            {solutions.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, x: -12 }} animate={solIv ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5, ease: EASE }}
                className="flex flex-col gap-4 py-8 sm:flex-row sm:items-start sm:gap-12">
                <span className="shrink-0 rounded-full border px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest"
                  style={{ border: `1px solid ${RED}30`, color: RED }}>{s.label}</span>
                <div>
                  <p className="text-base font-bold text-white">{s.title}</p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: BG2, borderTop: `1px solid ${BORDER}` }}>
        <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: GREEN }}>GET STARTED</p>
          <h2 className="text-3xl font-bold uppercase leading-tight text-white sm:text-4xl">
            READY TO CONVERT MORE?
          </h2>
          <p className="mt-5 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
            Book a free 30-minute strategy call. We will audit your conversion funnel and tell you exactly where you are losing sales.
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
