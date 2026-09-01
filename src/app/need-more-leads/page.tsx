"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";

/* ═══ Constants & Tokens ═══════════════════════════════════════════════════ */
const EASE = [0.16, 1, 0.3, 1] as const;
const BG   = "#050505";
const BG2  = "#0B0B0B";
const BG3  = "#111111";
const BORDER = "rgba(255,255,255,0.07)";
const AI_BLUE   = "#60a5fa";
const SIG_GREEN = "#22c55e";
const REV_AMBER = "#f59e0b";
const BRAND_RED = "#ed2830";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };
const staggerFast = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };

/* ═══ Helpers ══════════════════════════════════════════════════════════════ */
function seeded(s: number) {
  const x = Math.sin(s + 1) * 10000;
  return x - Math.floor(x);
}

/* ═══ Reusable: animated counter ═══════════════════════════════════════════ */
function Counter({ to, suffix = "", dur = 1400 }: { to: number; suffix?: string; dur?: number }) {
  const ref   = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const t0 = performance.now();
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / dur, 1);
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setN(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, dur]);
  return <span ref={ref}>{n.toLocaleString("en-IN")}{suffix}</span>;
}

/* ═══ Reusable: section eyebrow ════════════════════════════════════════════ */
function Eye({ children, c = "blue" }: { children: React.ReactNode; c?: "blue"|"red"|"green"|"amber" }) {
  const cls: Record<string, string> = {
    blue:  "border-blue-500/20  text-blue-400  bg-blue-500/5",
    red:   "border-red-500/20   text-red-400   bg-red-500/5",
    green: "border-green-500/20 text-green-400 bg-green-500/5",
    amber: "border-amber-500/20 text-amber-400 bg-amber-500/5",
  };
  const dot: Record<string, string> = { blue:"bg-blue-400", red:"bg-red-400", green:"bg-green-400", amber:"bg-amber-400" };
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] ${cls[c]}`}>
      <span className={`h-1 w-1 rounded-full ${dot[c]}`} />
      {children}
    </span>
  );
}

/* ═══ Reusable: intent badge ════════════════════════════════════════════════ */
function IScore({ v, big }: { v: number; big?: boolean }) {
  const col = v >= 80 ? SIG_GREEN : v >= 60 ? REV_AMBER : "#94a3b8";
  return (
    <span style={{ color: col }} className={big ? "text-5xl font-black tabular-nums" : "text-base font-bold tabular-nums"}>
      {v}%
    </span>
  );
}

/* ═══ Reusable: primary CTA ════════════════════════════════════════════════ */
function CTA({ href = "/contact", children, outline }: { href?: string; children: React.ReactNode; outline?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex h-14 items-center gap-3 rounded-full px-8 text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
        outline
          ? "border border-white/20 text-white/80 hover:border-white/40 hover:text-white"
          : "bg-[#ed2830] text-white hover:bg-[#c41e24]"
      }`}
    >
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 01 — HERO
══════════════════════════════════════════════════════════════════════════════ */
type HeroPhase = "network" | "tracking" | "detected";

function Hero() {
  const [phase, setPhase] = useState<HeroPhase>("network");
  const [score, setScore]   = useState(0);
  const [stepIdx, setStepIdx] = useState(-1);
  const reduce = useReducedMotion();

  const journey = [
    { label: "Google Search" },
    { label: "Landing Page" },
    { label: "Services" },
    { label: "Pricing" },
    { label: "Exit" },
    { label: "Return" },
    { label: "Case Study" },
  ];

  useEffect(() => {
    if (reduce) { setPhase("detected"); setScore(87); setStepIdx(6); return; }
    const t1 = setTimeout(() => { setPhase("tracking"); setStepIdx(0); }, 1800);
    const t2 = setTimeout(() => setStepIdx(1), 2300);
    const t3 = setTimeout(() => setStepIdx(2), 2700);
    const t4 = setTimeout(() => setStepIdx(3), 3100);
    const t5 = setTimeout(() => setStepIdx(4), 3450);
    const t6 = setTimeout(() => setStepIdx(5), 3800);
    const t7 = setTimeout(() => { setStepIdx(6); setPhase("detected"); }, 4100);
    const t8 = setTimeout(() => {
      let s = 0;
      const iv = setInterval(() => {
        s += 2; setScore(Math.min(s, 87));
        if (s >= 87) clearInterval(iv);
      }, 25);
    }, 4600);
    return () => [t1,t2,t3,t4,t5,t6,t7,t8].forEach(clearTimeout);
  }, [reduce]);

  const particles = useMemo(() =>
    Array.from({ length: 90 }, (_, i) => ({
      id: i,
      x: seeded(i * 3) * 100,
      y: seeded(i * 3 + 1) * 100,
      s: 1.2 + seeded(i * 3 + 2) * 1.8,
      d: seeded(i * 7) * 4,
      highlight: i === 44,
    })), []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden" style={{ background: BG }}>
      {/* Grid */}
      <div aria-hidden className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.4) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />

      {/* Particles */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        {particles.map((p) =>
          p.highlight ? null : (
            <motion.div key={p.id} className="absolute rounded-full"
              style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, background: "rgba(255,255,255,0.15)" }}
              animate={!reduce ? { opacity: [0.06, 0.22, 0.06] } : {}}
              transition={{ duration: 2 + p.s, delay: p.d, repeat: Infinity, ease: "easeInOut" }}
            />
          )
        )}
      </div>

      {/* Highlighted visitor */}
      <AnimatePresence>
        {phase !== "network" && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute left-1/2 top-1/2"
            style={{ transform: "translate(-50%, -50%)", zIndex: 20 }}
          >
            {/* Pulse rings */}
            <motion.div animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
              className="absolute inset-0 rounded-full"
              style={{ background: phase === "detected" ? SIG_GREEN : BRAND_RED, opacity: 0.3 }} />
            <div className="relative flex h-3 w-3 rounded-full" style={{ background: phase === "detected" ? SIG_GREEN : BRAND_RED }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Journey panel */}
      <AnimatePresence>
        {phase !== "network" && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 sm:right-12"
            style={{ background: BG2, border: `1px solid ${BORDER}`, borderRadius: 16, padding: "16px 20px", minWidth: 180 }}
          >
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>
              VISITOR #10482
            </p>
            <div className="flex flex-col gap-1.5">
              {journey.map((j, i) => (
                <motion.div key={j.label}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: stepIdx >= i ? 1 : 0.15, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full shrink-0"
                    style={{ background: stepIdx >= i ? (j.label === "Exit" ? "#f87171" : SIG_GREEN) : "rgba(255,255,255,0.2)" }} />
                  <span className="text-xs font-semibold" style={{ color: stepIdx >= i ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.2)" }}>
                    {j.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI detection bubble */}
      <AnimatePresence>
        {phase === "detected" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 sm:left-12"
            style={{ background: BG2, border: `1px solid ${SIG_GREEN}30`, borderRadius: 16, padding: "16px 20px", minWidth: 160 }}
          >
            <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: SIG_GREEN }}>AI DETECTED</p>
            <p className="text-[10px] font-semibold uppercase tracking-wider mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>HIGH BUYING INTENT</p>
            <motion.p className="text-4xl font-black" style={{ color: SIG_GREEN }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              {score}%
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero copy */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 pb-24 pt-36 text-center sm:px-6 lg:px-8">
        <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-5xl">
          <motion.div variants={fadeUp}>
            <Eye c="blue">AI Powered Lead Intelligence</Eye>
          </motion.div>

          <motion.h1 variants={fadeUp}
            className="mt-8 text-[clamp(52px,10vw,120px)] font-bold uppercase leading-[0.9] tracking-tight text-white">
            NEED MORE<br />
            <span style={{ color: BRAND_RED }}>LEADS?</span>
          </motion.h1>

          <motion.p variants={fadeUp}
            className="mt-4 text-[clamp(28px,4vw,52px)] font-light leading-tight tracking-tight"
            style={{ color: "rgba(255,255,255,0.4)" }}>
            Start finding the buyers<br />you already have.
          </motion.p>

          <motion.p variants={fadeUp}
            className="mx-auto mt-8 max-w-2xl text-base leading-relaxed sm:text-lg"
            style={{ color: "rgba(255,255,255,0.5)" }}>
            Your website gets visitors every day. Some browse. Some compare. Some return.
            Some are already evaluating whether to buy. Sarvopaya uses AI to understand the
            signals behind that behaviour, identify high-intent opportunities and trigger the
            right action before the opportunity disappears.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <CTA href="/contact">FIND MY HIDDEN LEADS</CTA>
            <CTA href="#how-it-works" outline>SEE HOW IT WORKS</CTA>
          </motion.div>

          <motion.p variants={fadeUp} className="mt-6 text-xs uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.25)" }}>
            No guesswork. No vanity metrics. Just actionable buying signals.
          </motion.p>
        </motion.div>
      </div>

      {/* Spine indicator */}
      <div aria-hidden className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.2)" }}>SCROLL</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.4 }}
          className="h-6 w-px" style={{ background: "rgba(255,255,255,0.15)" }} />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 02 — THE INVISIBLE LEAD JOURNEY
══════════════════════════════════════════════════════════════════════════════ */
function VisitorJourney() {
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const nodes = [
    { step: "VISITOR", sub: "#10482 arrives", col: "rgba(255,255,255,0.7)", icon: "⬤" },
    { step: "Google Search", sub: "Brand keyword", col: "rgba(255,255,255,0.5)", icon: "G" },
    { step: "Landing Page", sub: "30s session", col: "rgba(255,255,255,0.5)", icon: "↗" },
    { step: "Pricing Page", sub: "2m 14s", col: AI_BLUE, icon: "₹" },
    { step: "Exit", sub: "Session ends", col: "#f87171", icon: "×" },
    { step: "Returns Day 3", sub: "Direct traffic", col: REV_AMBER, icon: "↩" },
    { step: "Case Study", sub: "68% above avg", col: SIG_GREEN, icon: "📋" },
    { step: "Contact Page", sub: "Form viewed", col: SIG_GREEN, icon: "✉" },
  ];

  return (
    <section ref={ref} style={{ background: BG2 }} className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.div variants={fadeUp}><Eye c="red">The Invisible Lead</Eye></motion.div>
          <motion.h2 variants={fadeUp}
            className="mt-6 text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            EVERY INTERACTION<br />
            <span style={{ color: "rgba(255,255,255,0.3)" }}>LEAVES A TRACE.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-relaxed"
            style={{ color: "rgba(255,255,255,0.45)" }}>
            Clicks are data. Pages are data. Returns are data. Content consumption is data.
            Individually, these actions mean very little. Together, they tell a story.
          </motion.p>
        </motion.div>

        {/* Journey visualization */}
        <div className="mt-16 overflow-x-auto">
          <div className="flex min-w-max items-center gap-0">
            {nodes.map((n, i) => (
              <div key={n.step} className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.12, duration: 0.5, ease: EASE }}
                  className="flex flex-col items-center gap-2 px-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold"
                    style={{ background: `${n.col}15`, border: `1px solid ${n.col}40`, color: n.col }}>
                    {n.icon}
                  </div>
                  <p className="text-center text-xs font-bold uppercase tracking-wide text-white">{n.step}</p>
                  <p className="text-center text-[10px]" style={{ color: "rgba(255,255,255,0.35)" }}>{n.sub}</p>
                </motion.div>
                {i < nodes.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
                    transition={{ delay: 0.25 + i * 0.12, duration: 0.3 }}
                    className="h-px w-8 origin-left"
                    style={{ background: `linear-gradient(90deg, ${nodes[i].col}60, ${nodes[i+1].col}60)` }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Data points cloud */}
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
          className="mt-16 flex flex-wrap gap-3">
          {["PAGE VIEW","CLICK","TIME ON SITE","RETURN VISIT","PRICING VIEW","CASE STUDY","FORM VISIT","SOURCE"].map((tag) => (
            <motion.span key={tag} variants={fadeUp}
              className="rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider"
              style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, color: "rgba(255,255,255,0.45)" }}>
              {tag}
            </motion.span>
          ))}
        </motion.div>
        <motion.p variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"}
          className="mt-8 text-sm font-bold uppercase tracking-widest"
          style={{ color: "rgba(255,255,255,0.2)" }}>
          RAW DATA ≠ INTELLIGENCE
        </motion.p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 03 — SIGNAL LAYER
══════════════════════════════════════════════════════════════════════════════ */
function SignalLayer() {
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [scoreVisible, setScoreVisible] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => {
      setScoreVisible(true);
      let s = 0;
      const iv = setInterval(() => { s += 3; setTotalScore(Math.min(s, 91)); if (s >= 91) clearInterval(iv); }, 20);
    }, 1200);
    return () => clearTimeout(t);
  }, [inView]);

  const signals = [
    { label: "Pricing View", pts: 21, col: AI_BLUE },
    { label: "Return Visit", pts: 18, col: REV_AMBER },
    { label: "Case Study", pts: 14, col: SIG_GREEN },
    { label: "Engagement", pts: 11, col: "rgba(255,255,255,0.6)" },
    { label: "ICP Match", pts: 27, col: BRAND_RED },
  ];

  return (
    <section ref={ref} style={{ background: BG }} className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.div variants={fadeUp}><Eye c="blue">Signal Detection</Eye></motion.div>
          <motion.h2 variants={fadeUp}
            className="mt-6 text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            DATA BECOMES POWERFUL<br />
            <span style={{ color: "rgba(255,255,255,0.3)" }}>WHEN PATTERNS EMERGE.</span>
          </motion.h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Signals list */}
          <div className="space-y-4">
            {signals.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.5, ease: EASE }}
                className="flex items-center justify-between rounded-2xl p-5"
                style={{ background: BG2, border: `1px solid ${BORDER}` }}>
                <div className="flex items-center gap-4">
                  <span className="h-2 w-2 rounded-full" style={{ background: s.col }} />
                  <span className="text-sm font-semibold text-white">{s.label}</span>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.4 }}
                  className="flex items-center gap-1">
                  <span className="text-xs font-bold" style={{ color: s.col }}>+{s.pts}</span>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>pts</span>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Intent score */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
            className="flex flex-col items-center justify-center rounded-3xl p-12"
            style={{ background: BG2, border: `1px solid ${SIG_GREEN}30` }}>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: SIG_GREEN }}>INTENT SCORE</p>
            <AnimatePresence>
              {scoreVisible ? (
                <motion.p key="score" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-8xl font-black tabular-nums" style={{ color: SIG_GREEN }}>
                  {totalScore}%
                </motion.p>
              ) : (
                <motion.p key="loading" className="mt-2 text-8xl font-black" style={{ color: "rgba(255,255,255,0.1)" }}>
                  --
                </motion.p>
              )}
            </AnimatePresence>
            <p className="mt-4 text-xs font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.35)" }}>BUYING SIGNAL DETECTED</p>
            <div className="mt-6 w-full rounded-full" style={{ background: "rgba(255,255,255,0.05)", height: 6 }}>
              <motion.div className="h-full rounded-full" style={{ background: SIG_GREEN }}
                animate={inView ? { width: `${totalScore}%` } : { width: 0 }}
                transition={{ delay: 1.4, duration: 0.8, ease: EASE }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 04 — AI INTELLIGENCE CORE
══════════════════════════════════════════════════════════════════════════════ */
function IntelligenceCore() {
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t1 = setTimeout(() => setProcessing(true), 600);
    const t2 = setTimeout(() => setDone(true), 2400);
    return () => [t1,t2].forEach(clearTimeout);
  }, [inView]);

  const inputs = ["Behaviour","Context","Journey","ICP","Engagement","Source"];
  const outputs = [
    { label: "INTENT",       val: "91%",      col: SIG_GREEN },
    { label: "BUYING STAGE", val: "DECISION", col: AI_BLUE },
    { label: "ICP MATCH",    val: "96%",      col: SIG_GREEN },
    { label: "URGENCY",      val: "HIGH",     col: BRAND_RED },
  ];

  return (
    <section ref={ref} style={{ background: BG2 }} className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.div variants={fadeUp}><Eye c="blue">AI Intelligence</Eye></motion.div>
          <motion.h2 variants={fadeUp}
            className="mt-6 text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            ONE SIGNAL MEANS LITTLE.<br />
            <span style={{ color: "rgba(255,255,255,0.3)" }}>THE PATTERN MEANS EVERYTHING.</span>
          </motion.h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 items-center gap-8 lg:grid-cols-3">
          {/* Inputs */}
          <div className="space-y-3">
            {inputs.map((inp, i) => (
              <motion.div key={inp}
                initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                className="flex items-center justify-between rounded-xl px-5 py-3"
                style={{ background: BG, border: `1px solid ${BORDER}` }}>
                <span className="text-sm font-semibold text-white">{inp}</span>
                <motion.div animate={processing ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.3 }}
                  className="text-[10px] font-bold uppercase tracking-widest" style={{ color: AI_BLUE }}>
                  ✓
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* AI Core */}
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
              className="flex h-52 w-52 flex-col items-center justify-center rounded-full text-center"
              style={{ background: `radial-gradient(circle, ${AI_BLUE}15, transparent)`, border: `2px solid ${AI_BLUE}40` }}>
              <motion.div animate={processing && !done ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 1.5, repeat: processing && !done ? Infinity : 0, ease: "linear" }}
                className="mb-3 text-2xl" style={{ color: AI_BLUE }}>⬡</motion.div>
              <p className="text-xs font-black uppercase tracking-widest text-white">SARVOPAYA</p>
              <p className="text-[10px] font-bold uppercase tracking-widest mt-0.5" style={{ color: AI_BLUE }}>
                {done ? "COMPLETE" : processing ? "ANALYSING..." : "AI"}
              </p>
            </motion.div>
          </div>

          {/* Outputs */}
          <div className="space-y-3">
            {outputs.map((o, i) => (
              <motion.div key={o.label}
                initial={{ opacity: 0, x: 16 }} animate={done ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.4, ease: EASE }}
                className="flex items-center justify-between rounded-xl px-5 py-3"
                style={{ background: BG, border: `1px solid ${o.col}30` }}>
                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>{o.label}</span>
                <span className="text-sm font-black" style={{ color: o.col }}>{o.val}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* AI explanation panel */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={done ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6, ease: EASE }}
          className="mt-10 rounded-3xl p-8 sm:p-10"
          style={{ background: BG, border: `1px solid ${SIG_GREEN}25` }}>
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: SIG_GREEN }}>AI EXPLANATION</p>
              <p className="text-lg font-bold text-white">Intent Score 91%</p>
              <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>WHY THIS VISITOR MATTERS:</p>
              <ul className="mt-3 space-y-1.5">
                {[
                  "Pricing page viewed twice in one session.",
                  "Returned after 3 days via direct traffic.",
                  "Viewed implementation case study.",
                  "Spent 68% longer than average visitor.",
                  "Behaviour matches target customer profile.",
                ].map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.55)" }}>
                    <span style={{ color: SIG_GREEN }}>→</span> {pt}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl p-6 sm:min-w-72" style={{ background: BG2, border: `1px solid ${AI_BLUE}20` }}>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: AI_BLUE }}>AI RECOMMENDATION</p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
                This visitor is likely evaluating vendors. Prioritise ROI-focused messaging
                instead of another promotional message. Recommend direct outreach.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 05 — AI DASHBOARD
══════════════════════════════════════════════════════════════════════════════ */
type DView = "overview" | "opportunities" | "visitor";

const SIDEBAR_ITEMS = ["Overview","Visitors","Intent Signals","Opportunities","Campaigns","Automations","AI Insights","Revenue"];

const OPPORTUNITIES = [
  { id: "#10482", page: "Pricing → Case Study → Contact", intent: 91, stage: "DECISION", icp: 96 },
  { id: "#09341", page: "Services → Pricing → Exit",      intent: 78, stage: "EVALUATION", icp: 84 },
  { id: "#12019", page: "Blog → Services → Pricing",       intent: 72, stage: "AWARENESS",   icp: 71 },
  { id: "#08822", page: "Pricing → Return Visit",          intent: 85, stage: "DECISION",   icp: 90 },
  { id: "#11004", page: "Contact → Exit → Return",         intent: 68, stage: "EVALUATION", icp: 77 },
];

function AIDashboard() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [view, setView]  = useState<DView>("overview");
  const [active, setActive] = useState(0);

  const metrics = [
    { label: "VISITORS",     val: 18492, suf: "", col: "rgba(255,255,255,0.7)" },
    { label: "HIGH INTENT",  val: 624,   suf: "", col: AI_BLUE },
    { label: "QUALIFIED",    val: 143,   suf: "", col: REV_AMBER },
    { label: "OPPORTUNITIES",val: 47,    suf: "", col: SIG_GREEN },
    { label: "PIPELINE",     val: 284,   suf: "L", col: BRAND_RED },
  ];

  const chartBars = [62, 48, 71, 55, 83, 69, 91, 74, 88, 65, 79, 92];
  const chartDays = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun","Mon","Tue","Wed","Thu","Fri"];

  return (
    <section ref={ref} id="how-it-works" style={{ background: BG }} className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.div variants={fadeUp}><Eye c="green">Live Lead Intelligence</Eye></motion.div>
          <motion.h2 variants={fadeUp}
            className="mt-6 text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl">
            YOUR MARKETING<br />
            <span style={{ color: "rgba(255,255,255,0.3)" }}>FINALLY HAS A BRAIN.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-lg" style={{ color: "rgba(255,255,255,0.45)" }}>
            See what your marketing data looks like when AI connects the dots.
          </motion.p>
        </motion.div>

        {/* Dashboard UI */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
          className="mt-12 overflow-hidden rounded-3xl"
          style={{ background: BG2, border: `1px solid ${BORDER}` }}>
          {/* Title bar */}
          <div className="flex items-center justify-between border-b px-6 py-4" style={{ borderColor: BORDER }}>
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                {["#f87171","#fbbf24","#4ade80"].map(c => <div key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />)}
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-white/40">SARVOPAYA AI — LIVE LEAD INTELLIGENCE</span>
            </div>
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest" style={{ color: SIG_GREEN }}>
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: SIG_GREEN }} />
              LIVE
            </span>
          </div>

          <div className="flex">
            {/* Sidebar */}
            <div className="hidden shrink-0 border-r py-4 sm:block" style={{ borderColor: BORDER, width: 180 }}>
              {SIDEBAR_ITEMS.map((item, i) => (
                <button key={item} onClick={() => {
                  if (item === "Overview") { setView("overview"); }
                  if (item === "Opportunities") { setView("opportunities"); }
                }}
                  className="flex w-full items-center gap-3 px-5 py-2.5 text-left transition-colors duration-200 hover:bg-white/5"
                  style={{
                    color: (view === "overview" && i === 0) || (view === "opportunities" && i === 3) ? "white" : "rgba(255,255,255,0.35)",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                  }}>
                  {item === "Overview" || item === "Opportunities" ? (
                    <span className="h-1.5 w-1.5 rounded-full shrink-0"
                      style={{ background: (view === "overview" && i === 0) || (view === "opportunities" && i === 3) ? BRAND_RED : "rgba(255,255,255,0.15)" }} />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "transparent" }} />
                  )}
                  {item}
                </button>
              ))}
            </div>

            {/* Main panel */}
            <div className="flex-1 min-w-0 p-5 sm:p-6">
              <AnimatePresence mode="wait">
                {view === "overview" && (
                  <motion.div key="overview" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                      {metrics.map((m) => (
                        <div key={m.label} className="rounded-2xl p-4" style={{ background: BG, border: `1px solid ${BORDER}` }}>
                          <p className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>{m.label}</p>
                          <p className="text-xl font-black tabular-nums" style={{ color: m.col }}>
                            {m.label === "PIPELINE" ? `₹${m.val}${m.suf}` : <Counter to={m.val} suffix={m.suf} />}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Chart */}
                    <div className="mt-4 rounded-2xl p-5" style={{ background: BG, border: `1px solid ${BORDER}` }}>
                      <p className="mb-4 text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>INTENT TREND — LAST 12 DAYS</p>
                      <div className="flex items-end gap-2 h-24">
                        {chartBars.map((h, i) => (
                          <div key={i} className="flex flex-1 flex-col items-center gap-1">
                            <motion.div className="w-full rounded-sm"
                              style={{ background: h > 80 ? `${SIG_GREEN}60` : h > 70 ? `${AI_BLUE}50` : "rgba(255,255,255,0.1)" }}
                              initial={{ height: 0 }}
                              animate={inView ? { height: `${h}%` } : { height: 0 }}
                              transition={{ delay: 0.5 + i * 0.04, duration: 0.5, ease: EASE }} />
                            <p className="text-[8px]" style={{ color: "rgba(255,255,255,0.2)" }}>{chartDays[i]}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick action */}
                    <div className="mt-4 flex items-center justify-between rounded-2xl px-5 py-4"
                      style={{ background: `${BRAND_RED}10`, border: `1px solid ${BRAND_RED}25` }}>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: BRAND_RED }}>AI INSIGHT</p>
                        <p className="text-sm font-semibold text-white">47 qualified opportunities waiting for action</p>
                      </div>
                      <button onClick={() => setView("opportunities")}
                        className="shrink-0 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors duration-200 hover:bg-[#c41e24]"
                        style={{ background: BRAND_RED, color: "white" }}>
                        VIEW ALL →
                      </button>
                    </div>
                  </motion.div>
                )}

                {view === "opportunities" && (
                  <motion.div key="opps" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-xs font-bold uppercase tracking-widest text-white">47 OPPORTUNITIES — SORTED BY INTENT</p>
                      <button onClick={() => setView("overview")}
                        className="text-xs font-bold uppercase tracking-widest transition-colors hover:text-white"
                        style={{ color: "rgba(255,255,255,0.35)" }}>← BACK</button>
                    </div>
                    <div className="space-y-2">
                      {OPPORTUNITIES.map((op, i) => (
                        <motion.button key={op.id} type="button"
                          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07 }}
                          onClick={() => { setActive(i); setView("visitor"); }}
                          className="flex w-full items-center justify-between rounded-2xl p-4 text-left transition-all duration-200 hover:border-white/20"
                          style={{ background: BG, border: `1px solid ${active === i ? SIG_GREEN + "40" : BORDER}` }}>
                          <div className="flex items-center gap-4">
                            <div className="h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-black"
                              style={{ background: `${SIG_GREEN}15`, color: SIG_GREEN }}>{op.id}</div>
                            <div>
                              <p className="text-xs font-semibold text-white">{op.page}</p>
                              <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>Stage: {op.stage}</p>
                            </div>
                          </div>
                          <div className="text-right shrink-0 ml-4">
                            <IScore v={op.intent} />
                            <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>intent</p>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {view === "visitor" && (
                  <motion.div key="visitor" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                    <div className="mb-5 flex items-center justify-between">
                      <button onClick={() => setView("opportunities")}
                        className="text-xs font-bold uppercase tracking-widest transition-colors hover:text-white"
                        style={{ color: "rgba(255,255,255,0.35)" }}>← OPPORTUNITIES</button>
                    </div>
                    {(() => {
                      const op = OPPORTUNITIES[active];
                      const visitorJourney = [
                        "Google Search","Landing Page","Services","Pricing","Exit","Return","Case Study","Contact",
                      ];
                      return (
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: SIG_GREEN }}>VISITOR {op.id}</p>
                            <div className="space-y-2 mt-4">
                              {visitorJourney.map((step, i) => (
                                <motion.div key={step}
                                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.08 }}
                                  className="flex items-center gap-3">
                                  <span className="h-1.5 w-1.5 rounded-full shrink-0"
                                    style={{ background: step === "Exit" ? "#f87171" : SIG_GREEN }} />
                                  <span className="text-sm text-white">{step}</span>
                                  {i < visitorJourney.length - 1 && (
                                    <div className="ml-[2px] h-4 w-px" style={{ background: BORDER, position: "absolute", transform: "translateX(0)" }} />
                                  )}
                                </motion.div>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-3">
                            {[
                              { label: "BUYING INTENT", val: `${op.intent}%`, col: SIG_GREEN },
                              { label: "BUYING STAGE",  val: op.stage,        col: AI_BLUE },
                              { label: "ICP MATCH",     val: `${op.icp}%`,    col: REV_AMBER },
                              { label: "PRIORITY",      val: "HIGH",           col: BRAND_RED },
                            ].map((m) => (
                              <div key={m.label} className="flex items-center justify-between rounded-xl px-4 py-3"
                                style={{ background: BG, border: `1px solid ${m.col}25` }}>
                                <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>{m.label}</span>
                                <span className="text-sm font-black" style={{ color: m.col }}>{m.val}</span>
                              </div>
                            ))}
                            <div className="rounded-xl p-4" style={{ background: `${AI_BLUE}08`, border: `1px solid ${AI_BLUE}20` }}>
                              <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: AI_BLUE }}>AI ACTION</p>
                              <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                                Strong commercial evaluation behaviour detected. Recommend direct sales contact with ROI-focused messaging.
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Zoom architecture */}
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}
          className="mt-12 flex flex-wrap items-center justify-center gap-4 text-center">
          {[
            { label: "18,492 VISITORS", col: "rgba(255,255,255,0.3)" },
            { label: "↓" },
            { label: "624 HIGH INTENT", col: AI_BLUE },
            { label: "↓" },
            { label: "47 OPPORTUNITIES", col: REV_AMBER },
            { label: "↓" },
            { label: "1 BUYER", col: SIG_GREEN },
          ].map((n, i) => (
            <motion.span key={i} variants={fadeUp}
              className="text-sm font-black uppercase tracking-widest"
              style={{ color: n.col || "rgba(255,255,255,0.3)" }}>
              {n.label}
            </motion.span>
          ))}
        </motion.div>
        <motion.p variants={fadeUp} initial="hidden" animate={inView ? "show" : "hidden"}
          className="mt-4 text-center text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
          We don&rsquo;t just analyse traffic. We find the individual opportunities hidden inside it.
        </motion.p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 06 — DECISION + ACTION
══════════════════════════════════════════════════════════════════════════════ */
function DecisionAction() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const branches = [
    { label: "SALES",     action: "CALL",        col: SIG_GREEN,  active: true },
    { label: "MARKETING", action: "RETARGET",    col: AI_BLUE,    active: false },
    { label: "NURTURE",   action: "EMAIL",       col: REV_AMBER,  active: false },
  ];

  const automationSteps = [
    { label: "Visitor returns",           col: "rgba(255,255,255,0.5)" },
    { label: "AI detects high intent",    col: AI_BLUE },
    { label: "Intent = 91%",             col: SIG_GREEN },
    { label: "CRM updated",              col: "rgba(255,255,255,0.5)" },
    { label: "Sales notified",           col: REV_AMBER },
    { label: "Follow-up triggered",      col: SIG_GREEN },
  ];

  return (
    <section ref={ref} style={{ background: BG2 }} className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Decision */}
          <div>
            <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
              <motion.div variants={fadeUp}><Eye c="blue">Decision Engine</Eye></motion.div>
              <motion.h2 variants={fadeUp}
                className="mt-6 text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl">
                AI DOESN&rsquo;T STOP AT UNDERSTANDING.<br />
                <span style={{ color: "rgba(255,255,255,0.3)" }}>IT DECIDES WHAT HAPPENS NEXT.</span>
              </motion.h2>
            </motion.div>
            <div className="mt-12 flex flex-col items-center gap-4">
              <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 }}
                className="flex h-16 w-16 items-center justify-center rounded-full text-xl"
                style={{ background: `${AI_BLUE}15`, border: `1px solid ${AI_BLUE}40`, color: AI_BLUE }}>
                ⬡
              </motion.div>
              <motion.div initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
                transition={{ delay: 0.6 }} className="h-8 w-px origin-top" style={{ background: AI_BLUE + "60" }} />
              <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 }}
                className="rounded-full px-5 py-2 text-xs font-black uppercase tracking-widest"
                style={{ background: `${SIG_GREEN}15`, border: `1px solid ${SIG_GREEN}40`, color: SIG_GREEN }}>
                91% INTENT — DECISION STAGE
              </motion.div>
              <motion.div initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}}
                transition={{ delay: 0.9 }} className="h-8 w-px origin-top" style={{ background: SIG_GREEN + "60" }} />
              <div className="flex gap-4 flex-wrap justify-center">
                {branches.map((b, i) => (
                  <motion.div key={b.label}
                    initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.1 + i * 0.1 }}
                    className="flex flex-col items-center gap-2">
                    <div className="rounded-xl p-4 text-center"
                      style={{ background: `${b.col}${b.active ? "15" : "08"}`, border: `1px solid ${b.col}${b.active ? "40" : "20"}`, minWidth: 96 }}>
                      <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: b.col }}>{b.label}</p>
                      <p className="mt-2 text-sm font-black text-white">{b.action}</p>
                    </div>
                    {b.active && (
                      <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: SIG_GREEN }}>PRIORITY</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Automation */}
          <div>
            <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
              <motion.div variants={fadeUp}><Eye c="green">Automation</Eye></motion.div>
              <motion.h2 variants={fadeUp}
                className="mt-6 text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl">
                INTELLIGENCE MEANS NOTHING<br />
                <span style={{ color: "rgba(255,255,255,0.3)" }}>WITHOUT ACTION.</span>
              </motion.h2>
            </motion.div>
            <div className="mt-12 space-y-3">
              {automationSteps.map((s, i) => (
                <motion.div key={s.label}
                  initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.12, duration: 0.4, ease: EASE }}
                  className="flex items-center gap-4 rounded-xl px-5 py-3"
                  style={{ background: BG, border: `1px solid ${BORDER}` }}>
                  <span className="text-[10px] font-black tabular-nums" style={{ color: "rgba(255,255,255,0.25)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-semibold" style={{ color: s.col }}>{s.label}</span>
                  {i < automationSteps.length - 1 && (
                    <motion.span animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                      className="ml-auto text-xs" style={{ color: AI_BLUE }}>→</motion.span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Notification card */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2, duration: 0.5, ease: EASE }}
              className="mt-6 rounded-2xl p-5"
              style={{ background: `${SIG_GREEN}08`, border: `1px solid ${SIG_GREEN}30` }}>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: SIG_GREEN }}>HIGH INTENT OPPORTUNITY</p>
              <p className="text-sm font-semibold text-white">Visitor #10482 — Intent: 91% — Stage: Decision</p>
              <p className="mt-1 text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>Strong commercial evaluation behaviour detected.</p>
              <button className="mt-3 rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors hover:bg-[#c41e24]"
                style={{ background: BRAND_RED, color: "white" }}>
                CONTACT NOW →
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 07 — 5-LAYER ARCHITECTURE
══════════════════════════════════════════════════════════════════════════════ */
const LAYERS = [
  { id: "01", title: "ATTRACT",   sub: "Bring the right people in.", tags: ["Google","Meta","LinkedIn","SEO","Content"], col: AI_BLUE },
  { id: "02", title: "OBSERVE",   sub: "Understand what they do.",   tags: ["Pages","Clicks","Sessions","Content","Return Visits"], col: "rgba(255,255,255,0.6)" },
  { id: "03", title: "INTERPRET", sub: "Let AI connect the signals.",tags: ["Behaviour","Intent","ICP","Context"], col: REV_AMBER },
  { id: "04", title: "PREDICT",   sub: "Find the opportunities.",    tags: ["Intent Score","Buying Stage","Priority"], col: SIG_GREEN },
  { id: "05", title: "ACT",       sub: "Do something about it.",     tags: ["Sales","Retargeting","WhatsApp","Email","CRM"], col: BRAND_RED },
];

function ArchitectureTimeline() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} style={{ background: BG }} className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.div variants={fadeUp}><Eye c="amber">Intelligence Architecture</Eye></motion.div>
          <motion.h2 variants={fadeUp}
            className="mt-6 text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl">
            FIVE STAGES.<br />
            <span style={{ color: "rgba(255,255,255,0.3)" }}>ONE SYSTEM.</span>
          </motion.h2>
        </motion.div>

        <div className="mt-16 space-y-4">
          {LAYERS.map((l, i) => (
            <motion.div key={l.id}
              initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.14, duration: 0.55, ease: EASE }}
              className="flex items-start gap-6 rounded-2xl p-6"
              style={{ background: BG2, border: `1px solid ${BORDER}` }}>
              <div>
                <span className="text-3xl font-black tabular-nums" style={{ color: `${l.col}40` }}>{l.id}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-3">
                  <p className="text-lg font-black uppercase tracking-tight" style={{ color: l.col }}>{l.title}</p>
                  <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>{l.sub}</p>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {l.tags.map((tag) => (
                    <span key={tag} className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                      style={{ background: `${l.col}10`, border: `1px solid ${l.col}25`, color: l.col }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 08 — NOT ANOTHER AGENCY
══════════════════════════════════════════════════════════════════════════════ */
function Comparison() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const cols = [
    { title: "MOST AGENCIES",     items: ["More traffic","More clicks","More forms"],                           strong: false, col: "rgba(255,255,255,0.3)" },
    { title: "TYPICAL AUTOMATION",items: ["More workflows","More notifications","More noise"],                  strong: false, col: "rgba(255,255,255,0.3)" },
    { title: "SARVOPAYA",         items: ["Better signals","Better decisions","Better opportunities","Revenue"],strong: true,  col: SIG_GREEN },
  ];

  return (
    <section ref={ref} style={{ background: BG2 }} className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.div variants={fadeUp}><Eye c="red">Our Difference</Eye></motion.div>
          <motion.h2 variants={fadeUp}
            className="mt-6 text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            WE DON&rsquo;T WANT TO GIVE YOU<br />
            1,000 MORE LEADS.<br />
            <span style={{ color: "rgba(255,255,255,0.3)" }}>WE WANT TO FIND THE 50 THAT MATTER.</span>
          </motion.h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {cols.map((c, ci) => (
            <motion.div key={c.title}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + ci * 0.12, duration: 0.5, ease: EASE }}
              className="rounded-3xl p-8"
              style={{
                background: c.strong ? `${SIG_GREEN}08` : BG,
                border: `1px solid ${c.strong ? SIG_GREEN + "40" : BORDER}`,
              }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6" style={{ color: c.col }}>
                {c.title}
              </p>
              <div className="space-y-3">
                {c.items.map((item, ii) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="text-xs" style={{ color: c.strong && ii === c.items.length - 1 ? SIG_GREEN : c.col }}>
                      {c.strong ? (ii === c.items.length - 1 ? "★" : "→") : "→"}
                    </span>
                    <p className={`text-sm ${c.strong && ii === c.items.length - 1 ? "font-black" : "font-semibold"}`}
                      style={{ color: c.strong ? (ii === c.items.length - 1 ? SIG_GREEN : "rgba(255,255,255,0.8)") : "rgba(255,255,255,0.35)" }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 09 — SIGNAL ENGINE
══════════════════════════════════════════════════════════════════════════════ */
const SIGNAL_CARDS = [
  { title: "RETURN VISIT",    body: "Visitor came back after 72 hours.",     pts: 18, col: REV_AMBER },
  { title: "PRICING VIEW",    body: "Commercial page viewed.",               pts: 21, col: AI_BLUE },
  { title: "CASE STUDY",      body: "Visitor consumed proof content.",       pts: 14, col: SIG_GREEN },
  { title: "MULTI-PAGE",      body: "6 relevant pages viewed.",             pts: 11, col: "rgba(255,255,255,0.6)" },
  { title: "ICP MATCH",       body: "Matches target customer profile.",      pts: 27, col: BRAND_RED },
];

function SignalEngine() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} style={{ background: BG }} className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"} className="text-center">
          <motion.div variants={fadeUp} className="flex justify-center"><Eye c="green">Signal Engine</Eye></motion.div>
          <motion.h2 variants={fadeUp}
            className="mt-6 text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl">
            EVERY ACTION<br />
            <span style={{ color: "rgba(255,255,255,0.3)" }}>LEAVES A SIGNAL.</span>
          </motion.h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SIGNAL_CARDS.map((s, i) => (
            <motion.div key={s.title}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: EASE }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-3xl p-7"
              style={{ background: BG2, border: `1px solid ${s.col}25` }}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: s.col }}>{s.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{s.body}</p>
                </div>
                <div className="shrink-0 rounded-full px-3 py-1.5 text-sm font-black" style={{ background: `${s.col}15`, color: s.col }}>
                  +{s.pts}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mt-12 text-center">
          <p className="text-xl font-bold uppercase tracking-tight text-white">ONE SIGNAL MEANS LITTLE.</p>
          <p className="mt-1 text-xl font-bold uppercase tracking-tight" style={{ color: "rgba(255,255,255,0.3)" }}>
            THE PATTERN MEANS EVERYTHING.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 10 — MARKETING STACK
══════════════════════════════════════════════════════════════════════════════ */
const STACK_INPUTS  = ["Google Ads","Meta Ads","LinkedIn","GA4","GTM","Website","CRM","WhatsApp","Email"];
const STACK_OUTPUTS = ["Marketing Signals","Sales Alerts","Automation","Revenue"];

function MarketingStack() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} style={{ background: BG2 }} className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.div variants={fadeUp}><Eye c="blue">Connected Intelligence</Eye></motion.div>
          <motion.h2 variants={fadeUp}
            className="mt-6 text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl">
            CONNECT THE INTELLIGENCE<br />
            <span style={{ color: "rgba(255,255,255,0.3)" }}>TO EVERYTHING YOU ALREADY USE.</span>
          </motion.h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 items-center gap-8 lg:grid-cols-3">
          {/* Inputs */}
          <div className="space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>DATA SOURCES</p>
            {STACK_INPUTS.map((item, i) => (
              <motion.div key={item}
                initial={{ opacity: 0, x: -12 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                className="flex items-center gap-3 rounded-xl px-4 py-2.5"
                style={{ background: BG, border: `1px solid ${BORDER}` }}>
                <motion.span animate={inView ? { opacity: [0.3, 1, 0.3] } : {}}
                  transition={{ delay: 0.5 + i * 0.15, duration: 1.5, repeat: Infinity }}
                  className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: AI_BLUE }} />
                <span className="text-xs font-semibold text-white">{item}</span>
              </motion.div>
            ))}
          </div>

          {/* Central AI */}
          <div className="flex justify-center">
            <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
              className="relative flex h-40 w-40 flex-col items-center justify-center rounded-full text-center"
              style={{ background: `radial-gradient(circle, ${BRAND_RED}20, transparent 70%)`, border: `2px solid ${BRAND_RED}50` }}>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{ border: `1px dashed ${BRAND_RED}25` }} />
              <p className="text-xs font-black uppercase tracking-widest text-white">SARVOPAYA</p>
              <p className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: BRAND_RED }}>AI ENGINE</p>
            </motion.div>
          </div>

          {/* Outputs */}
          <div className="space-y-3">
            <p className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.3)" }}>OUTPUTS</p>
            {STACK_OUTPUTS.map((item, i) => (
              <motion.div key={item}
                initial={{ opacity: 0, x: 12 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
                className="flex items-center gap-3 rounded-xl px-4 py-3"
                style={{ background: BG, border: `1px solid ${SIG_GREEN}25` }}>
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: SIG_GREEN }}>→</span>
                <span className="text-xs font-semibold text-white">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 11 — REVENUE
══════════════════════════════════════════════════════════════════════════════ */
function RevenueSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  const spine = ["TRAFFIC","ENGAGEMENT","INTENT","QUALIFICATION","SALES","REVENUE"];

  return (
    <section ref={ref} style={{ background: BG }} className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
              <motion.div variants={fadeUp}><Eye c="amber">The Outcome</Eye></motion.div>
              <motion.h2 variants={fadeUp}
                className="mt-6 text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl">
                BECAUSE LEADS AREN&rsquo;T<br />
                THE METRIC.
              </motion.h2>
              <motion.p variants={fadeUp}
                className="mt-4 text-[clamp(48px,8vw,100px)] font-black uppercase tracking-tight"
                style={{ color: REV_AMBER, lineHeight: 0.9 }}>
                REVENUE IS.
              </motion.p>
            </motion.div>
          </div>

          <div className="space-y-2">
            {spine.map((s, i) => (
              <motion.div key={s}
                initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.12, duration: 0.5, ease: EASE }}
                className="flex items-center gap-4 rounded-2xl px-6 py-4"
                style={{
                  background: s === "REVENUE" ? `${REV_AMBER}10` : BG2,
                  border: `1px solid ${s === "REVENUE" ? REV_AMBER + "40" : BORDER}`,
                }}>
                <span className="text-[10px] font-black tabular-nums" style={{ color: "rgba(255,255,255,0.2)" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-bold uppercase tracking-widest"
                  style={{ color: s === "REVENUE" ? REV_AMBER : s === "INTENT" ? SIG_GREEN : "rgba(255,255,255,0.6)" }}>
                  {s}
                </span>
                {s === "REVENUE" && (
                  <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.8 }}
                    className="ml-auto text-xs font-black" style={{ color: REV_AMBER }}>★</motion.span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 12 — USE CASES
══════════════════════════════════════════════════════════════════════════════ */
const USE_CASES = [
  { title: "D2C", body: "Turn product browsing behaviour into buying signals. Know which visitors are comparing, not just browsing.", signals: ["Cart View","Product Return","Pricing Compare"] },
  { title: "B2B", body: "Know which prospects are getting serious about a decision. Reach out at the right moment, not at random.", signals: ["Pricing View","Case Study","Return Visit"] },
  { title: "SERVICE BUSINESSES", body: "Stop treating every enquiry equally. Find the visitors who are ready to hire, not just curious.", signals: ["Service Page","Contact View","ICP Match"] },
  { title: "HIGH-TICKET", body: "Find buyers, not browsers. High-value buyers research deeply before they act. Catch them in that window.", signals: ["Deep Research","Return","Engagement Score"] },
];

function UseCases() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} style={{ background: BG2 }} className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.div variants={fadeUp}><Eye c="blue">Who It&rsquo;s For</Eye></motion.div>
          <motion.h2 variants={fadeUp}
            className="mt-6 text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl">
            BUILT FOR BUSINESSES<br />
            <span style={{ color: "rgba(255,255,255,0.3)" }}>WHERE EVERY LEAD MATTERS.</span>
          </motion.h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {USE_CASES.map((uc, i) => (
            <motion.div key={uc.title}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: EASE }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group rounded-3xl p-8"
              style={{ background: BG, border: `1px solid ${BORDER}`, transition: "border-color 0.3s" }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: BRAND_RED }}>{uc.title}</p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.55)" }}>{uc.body}</p>
              <div className="flex flex-wrap gap-2">
                {uc.signals.map((sig) => (
                  <span key={sig} className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                    style={{ background: `${AI_BLUE}10`, border: `1px solid ${AI_BLUE}25`, color: AI_BLUE }}>
                    {sig}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 13 — AI SIMULATOR ★ MAJOR MOMENT
══════════════════════════════════════════════════════════════════════════════ */
type SimPhase = "idle" | "analysing" | "result";

const SIM_SIGNALS = [
  { id: "pricing",   label: "Visited pricing page",     pts: 21 },
  { id: "return",    label: "Returned twice or more",   pts: 18 },
  { id: "casestudy", label: "Viewed case study",        pts: 14 },
  { id: "google",    label: "Came from Google Search",  pts:  8 },
  { id: "time",      label: "Spent 4+ minutes on site", pts: 11 },
  { id: "contact",   label: "Viewed contact page",      pts: 19 },
];

const SIM_STEPS = ["Behaviour","Intent","ICP","Journey","Context"];

function AISimulator() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();

  const [checked, setChecked]   = useState<Set<string>>(new Set(["pricing","return","casestudy"]));
  const [simPhase, setSimPhase] = useState<SimPhase>("idle");
  const [stepDone, setStepDone] = useState<number>(-1);
  const [score, setScore]       = useState(0);
  const [displayScore, setDisplayScore] = useState(0);

  const totalScore = useMemo(() => {
    let s = 0;
    SIM_SIGNALS.forEach((sig) => { if (checked.has(sig.id)) s += sig.pts; });
    return Math.min(s, 99);
  }, [checked]);

  function toggle(id: string) {
    if (simPhase !== "idle") return;
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function analyse() {
    if (simPhase !== "idle") { setSimPhase("idle"); setStepDone(-1); setScore(0); setDisplayScore(0); return; }
    setSimPhase("analysing"); setStepDone(-1);
    SIM_STEPS.forEach((_, i) => {
      setTimeout(() => setStepDone(i), reduce ? 0 : 400 + i * 500);
    });
    const delay = reduce ? 100 : 400 + SIM_STEPS.length * 500 + 300;
    setTimeout(() => {
      setScore(totalScore);
      setSimPhase("result");
      if (!reduce) {
        let d = 0;
        const iv = setInterval(() => {
          d += 2; setDisplayScore(Math.min(d, totalScore));
          if (d >= totalScore) clearInterval(iv);
        }, 20);
      } else {
        setDisplayScore(totalScore);
      }
    }, delay);
  }

  const stage = totalScore >= 80 ? "DECISION" : totalScore >= 60 ? "EVALUATION" : "AWARENESS";
  const priority = totalScore >= 80 ? "HIGH" : totalScore >= 60 ? "MEDIUM" : "LOW";
  const stageCol = totalScore >= 80 ? SIG_GREEN : totalScore >= 60 ? REV_AMBER : AI_BLUE;
  const recommendation =
    totalScore >= 80
      ? "This visitor is showing strong commercial evaluation behaviour. Prioritise direct sales outreach with ROI-focused messaging."
      : totalScore >= 60
      ? "This visitor is actively evaluating options. Recommend retargeting with case studies and social proof content."
      : "Early stage awareness. Nurture with educational content and let engagement deepen before outreach.";

  return (
    <section ref={ref} style={{ background: BG }} className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.div variants={fadeUp}><Eye c="blue">AI Simulator</Eye></motion.div>
          <motion.h2 variants={fadeUp}
            className="mt-6 text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            WHAT WOULD OUR AI<br />
            <span style={{ color: "rgba(255,255,255,0.3)" }}>THINK ABOUT YOUR VISITORS?</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-lg" style={{ color: "rgba(255,255,255,0.45)" }}>
            Select the signals that describe your visitor. See how the AI interprets the pattern.
          </motion.p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 items-start gap-8 lg:grid-cols-2">
          {/* Input side */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
            className="rounded-3xl p-8"
            style={{ background: BG2, border: `1px solid ${BORDER}` }}>
            <p className="text-[10px] font-bold uppercase tracking-widest mb-6" style={{ color: "rgba(255,255,255,0.35)" }}>
              VISITOR SIGNALS
            </p>
            <div className="space-y-3">
              {SIM_SIGNALS.map((sig) => {
                const on = checked.has(sig.id);
                return (
                  <button key={sig.id} type="button" onClick={() => toggle(sig.id)}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left transition-all duration-200"
                    style={{
                      background: on ? `${AI_BLUE}10` : "transparent",
                      border: `1px solid ${on ? AI_BLUE + "40" : BORDER}`,
                      cursor: simPhase !== "idle" ? "default" : "pointer",
                    }}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-5 w-5 items-center justify-center rounded"
                        style={{ background: on ? AI_BLUE : "rgba(255,255,255,0.08)", border: `1px solid ${on ? AI_BLUE : "rgba(255,255,255,0.15)"}` }}>
                        {on && <span className="text-[10px] font-black text-white">✓</span>}
                      </div>
                      <span className="text-sm font-semibold" style={{ color: on ? "white" : "rgba(255,255,255,0.55)" }}>
                        {sig.label}
                      </span>
                    </div>
                    {on && (
                      <span className="text-xs font-bold" style={{ color: AI_BLUE }}>+{sig.pts}</span>
                    )}
                  </button>
                );
              })}
            </div>

            <button type="button" onClick={analyse}
              className="mt-8 w-full rounded-full py-4 text-sm font-black uppercase tracking-wider transition-all duration-300"
              style={{
                background: simPhase === "result" ? "rgba(255,255,255,0.08)" : BRAND_RED,
                color: "white",
                border: `1px solid ${simPhase === "result" ? "rgba(255,255,255,0.15)" : BRAND_RED}`,
              }}>
              {simPhase === "idle" ? "ANALYSE VISITOR →" : simPhase === "analysing" ? "ANALYSING..." : "RESET SIMULATOR"}
            </button>
          </motion.div>

          {/* Output side */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
            className="rounded-3xl p-8 min-h-96"
            style={{ background: BG2, border: `1px solid ${BORDER}` }}>
            <AnimatePresence mode="wait">
              {simPhase === "idle" && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex h-full min-h-80 flex-col items-center justify-center text-center gap-4">
                  <div className="h-16 w-16 rounded-full flex items-center justify-center text-2xl"
                    style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}` }}>⬡</div>
                  <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.3)" }}>
                    Select signals and click Analyse to see AI interpretation
                  </p>
                </motion.div>
              )}

              {simPhase === "analysing" && (
                <motion.div key="analysing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-6" style={{ color: AI_BLUE }}>ANALYSING...</p>
                  <div className="space-y-3">
                    {SIM_STEPS.map((step, i) => (
                      <motion.div key={step} className="flex items-center gap-4">
                        <motion.div className="h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0"
                          animate={stepDone >= i ? { background: SIG_GREEN, color: "white" } : { background: "rgba(255,255,255,0.08)" }}>
                          {stepDone >= i ? "✓" : ""}
                        </motion.div>
                        <span className="text-sm font-semibold" style={{ color: stepDone >= i ? "white" : "rgba(255,255,255,0.3)" }}>
                          {step}
                        </span>
                        {stepDone < i && (
                          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
                            className="h-1 flex-1 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }} />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {simPhase === "result" && (
                <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: SIG_GREEN }}>AI RESULT</p>
                  <p className="text-7xl font-black tabular-nums mb-1" style={{ color: stageCol }}>
                    {displayScore}%
                  </p>
                  <p className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "rgba(255,255,255,0.35)" }}>BUYING INTENT</p>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[
                      { label: "STAGE",    val: stage,    col: AI_BLUE },
                      { label: "PRIORITY", val: priority, col: stageCol },
                      { label: "SIGNALS",  val: `${checked.size}/6`,  col: REV_AMBER },
                    ].map((m) => (
                      <div key={m.label} className="rounded-xl p-3 text-center"
                        style={{ background: BG, border: `1px solid ${m.col}25` }}>
                        <p className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>{m.label}</p>
                        <p className="text-xs font-black" style={{ color: m.col }}>{m.val}</p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-2xl p-5" style={{ background: `${AI_BLUE}08`, border: `1px solid ${AI_BLUE}25` }}>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: AI_BLUE }}>AI RECOMMENDATION</p>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{recommendation}</p>
                  </div>

                  <Link href="/contact"
                    className="mt-6 flex w-full items-center justify-center gap-3 rounded-full py-4 text-sm font-black uppercase tracking-wider transition-colors hover:bg-[#c41e24]"
                    style={{ background: BRAND_RED, color: "white" }}>
                    BUILD THIS FOR MY BUSINESS →
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 14 — DIFFERENTIATOR
══════════════════════════════════════════════════════════════════════════════ */
const DIFFS = [
  { a: "IT DOESN'T JUST TALK.", b: "IT OBSERVES." },
  { a: "IT DOESN'T JUST AUTOMATE.", b: "IT DECIDES." },
  { a: "IT DOESN'T JUST GENERATE LEADS.", b: "IT IDENTIFIES OPPORTUNITIES." },
];

function Differentiator() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} style={{ background: BG2 }} className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
          <Eye c="red">Not Another AI Chatbot</Eye>
        </motion.div>

        <div className="mt-14 space-y-8">
          {DIFFS.map((d, i) => (
            <motion.div key={d.a}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.18, duration: 0.6, ease: EASE }}>
              <p className="text-[clamp(20px,4vw,48px)] font-light uppercase leading-tight tracking-tight"
                style={{ color: "rgba(255,255,255,0.25)" }}>
                {d.a}
              </p>
              <p className="text-[clamp(28px,5vw,64px)] font-black uppercase leading-tight tracking-tight text-white">
                {d.b}
              </p>
              {i < DIFFS.length - 1 && (
                <div className="mt-8 h-px w-full" style={{ background: BORDER }} />
              )}
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}
          className="mt-14 max-w-xl text-lg" style={{ color: "rgba(255,255,255,0.45)" }}>
          AI becomes useful when it can understand context and trigger action.
          That&rsquo;s the only version of AI we build.
        </motion.p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 15 — IMPLEMENTATION
══════════════════════════════════════════════════════════════════════════════ */
const IMPL_STEPS = [
  { num: "01", title: "CONNECT",     body: "Your website, campaigns, analytics and CRM. We map every source of signal in your existing stack." },
  { num: "02", title: "UNDERSTAND",  body: "We map your customer journey and identify the behavioural patterns that indicate buying intent for your specific audience." },
  { num: "03", title: "ACTIVATE",    body: "AI identifies opportunities in real time and triggers the right action — whether that&rsquo;s a sales alert, a retargeting campaign or an automated sequence." },
];

function Implementation() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} style={{ background: BG }} className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"}>
          <motion.div variants={fadeUp}><Eye c="green">How It Works</Eye></motion.div>
          <motion.h2 variants={fadeUp}
            className="mt-6 text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl">
            YOUR EXISTING MARKETING<br />
            <span style={{ color: "rgba(255,255,255,0.3)" }}>DOESN&rsquo;T NEED TO CHANGE.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-lg" style={{ color: "rgba(255,255,255,0.45)" }}>
            We add intelligence to it.
          </motion.p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {IMPL_STEPS.map((s, i) => (
            <motion.div key={s.num}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.14, duration: 0.5, ease: EASE }}
              className="rounded-3xl p-8"
              style={{ background: BG2, border: `1px solid ${BORDER}` }}>
              <p className="text-5xl font-black tabular-nums mb-6" style={{ color: `${SIG_GREEN}30` }}>{s.num}</p>
              <p className="text-lg font-black uppercase tracking-tight text-white mb-3">{s.title}</p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}
                dangerouslySetInnerHTML={{ __html: s.body }} />
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }} className="mt-10 flex justify-center">
          <CTA href="/contact">BUILD MY LEAD INTELLIGENCE SYSTEM</CTA>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 16 — FAQ
══════════════════════════════════════════════════════════════════════════════ */
const FAQS = [
  { q: "Is this replacing my CRM?", a: "No. We integrate with your existing CRM — HubSpot, Zoho, Salesforce, or others. We enrich it with intent signals and trigger workflows inside it. Your current process stays; it just becomes smarter." },
  { q: "Do I need thousands of visitors?", a: "Not at all. Even with a few hundred monthly visitors, intent intelligence is valuable. It&rsquo;s about quality of signal, not volume of traffic." },
  { q: "Does this only work with paid ads?", a: "No. The system works across all traffic sources — organic search, direct, social, referral, and paid. Every channel produces behavioural data." },
  { q: "Can it automatically notify sales?", a: "Yes. When a visitor crosses your intent threshold, the system can trigger a CRM task, send a WhatsApp notification, fire a Slack alert, or initiate an automated email sequence." },
  { q: "Can it work with our existing tracking?", a: "Yes. We integrate with GA4, Google Tag Manager, and your existing pixel setup. We enhance your tracking layer rather than replacing it." },
  { q: "Is this just lead scoring?", a: "Lead scoring assigns a number. This system explains the number, maps the journey, identifies the stage, recommends the action, and triggers it automatically. It&rsquo;s lead intelligence, not just scoring." },
];

function FAQ() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section ref={ref} style={{ background: BG2 }} className="w-full">
      <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"} className="text-center mb-12">
          <motion.div variants={fadeUp} className="flex justify-center"><Eye c="blue">Questions</Eye></motion.div>
          <motion.h2 variants={fadeUp}
            className="mt-6 text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl">
            COMMON QUESTIONS
          </motion.h2>
        </motion.div>

        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <motion.div key={faq.q}
              initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
              className="rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${open === i ? AI_BLUE + "30" : BORDER}` }}>
              <button type="button" onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors duration-200 hover:bg-white/[0.02]">
                <span className="text-sm font-semibold text-white pr-4">{faq.q}</span>
                <span className={`shrink-0 text-lg font-light transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}
                  style={{ color: open === i ? AI_BLUE : "rgba(255,255,255,0.3)" }}>+</span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }}
                    className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                      dangerouslySetInnerHTML={{ __html: faq.a }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 17 — FINAL CTA
══════════════════════════════════════════════════════════════════════════════ */
function FinalCTA() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [phase, setPhase] = useState<"node" | "opportunity" | "revenue">("node");
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) { setPhase("revenue"); return; }
    const t1 = setTimeout(() => setPhase("opportunity"), 1200);
    const t2 = setTimeout(() => setPhase("revenue"), 2400);
    return () => [t1,t2].forEach(clearTimeout);
  }, [inView, reduce]);

  return (
    <section ref={ref} style={{ background: BG }} className="w-full">
      <div className="mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
        {/* Transforming node */}
        <motion.div className="mb-12 flex flex-col items-center gap-4">
          <AnimatePresence mode="wait">
            <motion.div key={phase}
              initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.3 }} transition={{ duration: 0.5, ease: EASE }}
              className="flex items-center justify-center rounded-full"
              style={{
                width: phase === "revenue" ? 88 : 64,
                height: phase === "revenue" ? 88 : 64,
                background: phase === "node" ? "rgba(255,255,255,0.08)" : phase === "opportunity" ? `${SIG_GREEN}20` : `${REV_AMBER}20`,
                border: `2px solid ${phase === "node" ? "rgba(255,255,255,0.15)" : phase === "opportunity" ? SIG_GREEN + "50" : REV_AMBER + "60"}`,
              }}>
              <span className="text-xs font-black uppercase tracking-widest"
                style={{ color: phase === "node" ? "rgba(255,255,255,0.4)" : phase === "opportunity" ? SIG_GREEN : REV_AMBER }}>
                {phase === "node" ? "VISITOR" : phase === "opportunity" ? "OPPORTUNITY" : "REVENUE"}
              </span>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate={inView ? "show" : "hidden"} className="max-w-4xl">
          <motion.h2 variants={fadeUp}
            className="text-[clamp(36px,7vw,88px)] font-bold uppercase leading-[0.92] tracking-tight text-white">
            YOUR NEXT CUSTOMER<br />
            MIGHT ALREADY BE<br />
            <span style={{ color: BRAND_RED }}>LOOKING AT YOU.</span>
          </motion.h2>
          <motion.p variants={fadeUp}
            className="mt-8 text-2xl font-light uppercase tracking-wide"
            style={{ color: "rgba(255,255,255,0.4)" }}>
            THE QUESTION IS:<br />
            <span style={{ color: "rgba(255,255,255,0.7)" }}>CAN YOU RECOGNISE THEM?</span>
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <CTA href="/contact">FIND MY HIDDEN LEADS</CTA>
            <CTA href="/contact" outline>TALK TO SARVOPAYA</CTA>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-6 text-xs uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.2)" }}>
            Turn anonymous behaviour into actionable opportunities.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   JSON-LD
══════════════════════════════════════════════════════════════════════════════ */
const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Need More Leads? AI Lead Intelligence by Sarvopaya",
  url: "https://sarvopaya.com/need-more-leads",
  description: "Sarvopaya uses AI to identify high-intent visitors and convert anonymous behaviour into actionable sales opportunities.",
};

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE EXPORT
══════════════════════════════════════════════════════════════════════════════ */
export default function NeedMoreLeadsPage() {
  return (
    <main className="w-full overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <Hero />
      <VisitorJourney />
      <SignalLayer />
      <IntelligenceCore />
      <AIDashboard />
      <DecisionAction />
      <ArchitectureTimeline />
      <Comparison />
      <SignalEngine />
      <MarketingStack />
      <RevenueSection />
      <UseCases />
      <AISimulator />
      <Differentiator />
      <Implementation />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
