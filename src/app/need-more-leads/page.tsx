"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";

/* ── Tokens ─────────────────────────────────────────────────────────────── */
const EASE   = [0.16, 1, 0.3, 1] as const;
const BG     = "#050505";
const BG2    = "#0c0c0c";
const BORDER = "rgba(255,255,255,0.06)";
const AI     = "#60a5fa";
const GREEN  = "#22c55e";
const AMBER  = "#f59e0b";
const RED    = "#ed2830";

/* ── Variants ─────────────────────────────────────────────────────────────── */
const up  = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } } };
const seq = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

/* ── Helpers ─────────────────────────────────────────────────────────────── */
function sr(s: number) { const x = Math.sin(s + 1) * 10000; return x - Math.floor(x); }

function Counter({ to, dur = 1400 }: { to: number; dur?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const iv  = useInView(ref, { once: true, amount: 0.5 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!iv) return;
    const t0 = performance.now(); let raf: number;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / dur, 1);
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(tick); else setN(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [iv, to, dur]);
  return <span ref={ref}>{n.toLocaleString("en-IN")}</span>;
}

/* Architecture step pill shown at the top of each section */
function Spine({ step, label }: { step: string; label: string }) {
  return (
    <div className="mb-10 flex items-center gap-3">
      <span className="text-[10px] font-black tabular-nums" style={{ color: "rgba(255,255,255,0.18)" }}>
        {step}
      </span>
      <span className="h-px flex-1 max-w-8" style={{ background: BORDER }} />
      <span className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "rgba(255,255,255,0.25)" }}>
        {label}
      </span>
    </div>
  );
}

function CTA({ href = "/contact", children, outline }: { href?: string; children: React.ReactNode; outline?: boolean }) {
  return (
    <Link href={href}
      className={`group inline-flex h-14 items-center gap-3 rounded-full px-8 text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
        outline ? "border border-white/20 text-white/70 hover:border-white/40 hover:text-white"
                : "bg-[#ed2830] text-white hover:bg-[#c41e24]"
      }`}>
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════════════════════════ */
type Phase = "init" | "tracking" | "ai";

function Hero() {
  const [phase, setPhase] = useState<Phase>("init");
  const [stepIdx, setStepIdx] = useState(-1);
  const [aiScore, setAiScore] = useState(0);
  const reduce = useReducedMotion();

  const journey = ["Google Search","Landing Page","Pricing","Exit","Return","Case Study","Contact"];

  useEffect(() => {
    if (reduce) { setPhase("ai"); setStepIdx(6); setAiScore(87); return; }
    const ts = [
      setTimeout(() => { setPhase("tracking"); setStepIdx(0); }, 1600),
      setTimeout(() => setStepIdx(1), 2100),
      setTimeout(() => setStepIdx(2), 2500),
      setTimeout(() => setStepIdx(3), 2850),
      setTimeout(() => setStepIdx(4), 3200),
      setTimeout(() => setStepIdx(5), 3550),
      setTimeout(() => { setStepIdx(6); setPhase("ai"); }, 3900),
      setTimeout(() => {
        let s = 0;
        const iv = setInterval(() => { s += 3; setAiScore(Math.min(s, 87)); if (s >= 87) clearInterval(iv); }, 22);
      }, 4400),
    ];
    return () => ts.forEach(clearTimeout);
  }, [reduce]);

  const dots = useMemo(() =>
    Array.from({ length: 100 }, (_, i) => ({
      id: i, x: sr(i * 3) * 100, y: sr(i * 3 + 1) * 100,
      s: 1 + sr(i * 3 + 2) * 1.6, d: sr(i * 7) * 5,
    })), []);

  return (
    <section className="relative w-full overflow-hidden" style={{ background: BG, minHeight: "100svh" }}>
      {/* dot field */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        {dots.map((d) => (
          <motion.div key={d.id} className="absolute rounded-full"
            style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.s, height: d.s, background: "rgba(255,255,255,0.12)" }}
            animate={!reduce ? { opacity: [0.05, 0.2, 0.05] } : {}}
            transition={{ duration: 2.4 + d.s, delay: d.d, repeat: Infinity, ease: "easeInOut" }} />
        ))}
      </div>

      {/* horizontal rule at top */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: BORDER }} />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-36 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-40">
        {/* Left — headline */}
        <motion.div variants={seq} initial="hidden" animate="show">
          <motion.p variants={up}
            className="mb-6 text-[10px] font-bold uppercase tracking-[0.25em]"
            style={{ color: AI }}>
            AI POWERED LEAD INTELLIGENCE
          </motion.p>

          <motion.h1 variants={up}
            className="font-bold uppercase text-white"
            style={{ fontSize: "clamp(68px,12vw,160px)", lineHeight: 0.88, letterSpacing: "-0.02em" }}>
            NEED<br />MORE<br />
            <span style={{ color: RED }}>LEADS?</span>
          </motion.h1>

          <motion.p variants={up}
            className="mt-7 text-lg font-light leading-relaxed sm:text-xl"
            style={{ color: "rgba(255,255,255,0.4)", maxWidth: 460 }}>
            Start finding the buyers<br />you already have.
          </motion.p>

          <motion.p variants={up} className="mt-5 max-w-md text-sm leading-relaxed"
            style={{ color: "rgba(255,255,255,0.3)" }}>
            Your website has high-intent visitors right now. Sarvopaya AI reads the behaviour signals,
            identifies who is about to buy, and triggers the right action before they disappear.
          </motion.p>

          <motion.div variants={up} className="mt-10 flex flex-wrap gap-3">
            <CTA href="/contact">FIND MY HIDDEN LEADS</CTA>
            <CTA href="#dashboard" outline>SEE HOW IT WORKS</CTA>
          </motion.div>
          <motion.p variants={up} className="mt-5 text-[10px] uppercase tracking-widest"
            style={{ color: "rgba(255,255,255,0.18)" }}>
            No guesswork. No vanity metrics. Actionable buying signals.
          </motion.p>
        </motion.div>

        {/* Right — live visitor tracking panel */}
        <div className="flex justify-center lg:justify-end">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
            className="w-full max-w-sm rounded-2xl p-6"
            style={{ background: BG2, border: `1px solid ${BORDER}` }}>
            {/* header */}
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.3)" }}>
                  LIVE VISITOR TRACKING
                </p>
                <p className="mt-0.5 text-sm font-bold text-white">VISITOR #10482</p>
              </div>
              <AnimatePresence>
                {phase === "ai" && (
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-1.5 rounded-full px-3 py-1"
                    style={{ background: `${GREEN}15`, border: `1px solid ${GREEN}40` }}>
                    <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: GREEN }} />
                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: GREEN }}>AI ACTIVE</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* journey */}
            <div className="mb-5 space-y-2">
              {journey.map((j, i) => (
                <motion.div key={j} animate={{ opacity: stepIdx >= i ? 1 : 0.15 }} transition={{ duration: 0.3 }}
                  className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full shrink-0"
                    style={{ background: stepIdx >= i ? (j === "Exit" ? "#f87171" : GREEN) : "rgba(255,255,255,0.15)" }} />
                  <span className="text-xs font-semibold"
                    style={{ color: stepIdx >= i ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.2)" }}>{j}</span>
                  {i === 3 && stepIdx >= 3 && (
                    <span className="ml-auto text-[9px] font-bold" style={{ color: "#f87171" }}>EXITED</span>
                  )}
                  {i === 4 && stepIdx >= 4 && (
                    <span className="ml-auto text-[9px] font-bold" style={{ color: AMBER }}>DAY 3</span>
                  )}
                </motion.div>
              ))}
            </div>

            {/* AI result */}
            <AnimatePresence>
              {phase === "ai" && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="rounded-xl p-4"
                  style={{ background: `${GREEN}08`, border: `1px solid ${GREEN}25` }}>
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: GREEN }}>
                    AI DETECTED — HIGH BUYING INTENT
                  </p>
                  <div className="flex items-end gap-3">
                    <p className="text-5xl font-black tabular-nums" style={{ color: GREEN }}>{aiScore}%</p>
                    <div className="pb-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.5)" }}>DECISION STAGE</p>
                      <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>ICP MATCH 96%</p>
                    </div>
                  </div>
                  <p className="mt-3 text-[10px] leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>
                    Pricing viewed twice. Returned day 3. Case study consumed. Contact page visited.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* architecture spine preview at bottom */}
      <div className="absolute bottom-0 inset-x-0 border-t" style={{ borderColor: BORDER }}>
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {["VISITOR","DATA","SIGNAL","INTELLIGENCE","DECISION","ACTION","REVENUE"].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <span className="text-[9px] font-bold uppercase tracking-widest"
                  style={{ color: i === 0 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)" }}>
                  {s}
                </span>
                {i < 6 && <span className="text-[9px]" style={{ color: "rgba(255,255,255,0.12)" }}>→</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   DATA LAYER — The raw trace
══════════════════════════════════════════════════════════════════════════════ */
function DataLayer() {
  const ref = useRef<HTMLDivElement>(null);
  const iv  = useInView(ref, { once: true, amount: 0.3 });

  const nodes = [
    { label: "Google Search",  sub: "Source",    col: AI },
    { label: "Landing Page",   sub: "30s",       col: "rgba(255,255,255,0.5)" },
    { label: "Services",       sub: "1m 12s",    col: "rgba(255,255,255,0.5)" },
    { label: "Pricing",        sub: "2m 14s",    col: AI },
    { label: "Exit",           sub: "Session end", col: "#f87171" },
    { label: "Returns D3",     sub: "Direct",    col: AMBER },
    { label: "Case Study",     sub: "+68% avg",  col: GREEN },
    { label: "Contact",        sub: "Form view", col: GREEN },
  ];

  return (
    <section ref={ref} style={{ background: BG2, borderTop: `1px solid ${BORDER}` }} className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <Spine step="02" label="DATA" />
        <motion.div variants={seq} initial="hidden" animate={iv ? "show" : "hidden"}>
          <motion.h2 variants={up}
            className="text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            style={{ maxWidth: 700 }}>
            EVERY INTERACTION<br />LEAVES A TRACE.
          </motion.h2>
          <motion.p variants={up} className="mt-5 max-w-xl text-base leading-relaxed sm:text-lg"
            style={{ color: "rgba(255,255,255,0.38)" }}>
            Clicks. Pauses. Returns. Session depth. Time on pricing. Content consumed.
            Raw data is everywhere. The problem is it doesn&rsquo;t mean anything on its own.
          </motion.p>
        </motion.div>

        {/* horizontal journey */}
        <div className="mt-14 overflow-x-auto pb-4">
          <div className="flex min-w-max items-start gap-0">
            {nodes.map((n, i) => (
              <div key={n.label} className="flex items-start">
                <motion.div initial={{ opacity: 0, y: 16 }} animate={iv ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.08 + i * 0.1, duration: 0.5, ease: EASE }}
                  className="flex flex-col items-center px-5 first:pl-0">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center"
                    style={{ background: `${n.col}12`, border: `1px solid ${n.col}35` }}>
                    <span className="h-2 w-2 rounded-full" style={{ background: n.col }} />
                  </div>
                  <p className="mt-2 text-center text-[11px] font-bold text-white whitespace-nowrap">{n.label}</p>
                  <p className="text-center text-[10px] whitespace-nowrap" style={{ color: "rgba(255,255,255,0.28)" }}>{n.sub}</p>
                </motion.div>
                {i < nodes.length - 1 && (
                  <motion.div className="mt-5 h-px w-8 shrink-0"
                    style={{ background: BORDER }}
                    initial={{ scaleX: 0 }} animate={iv ? { scaleX: 1 } : {}}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.3 }} />
                )}
              </div>
            ))}
          </div>
        </div>

        <motion.p initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}} transition={{ delay: 1 }}
          className="mt-10 text-sm font-bold uppercase tracking-[0.2em]"
          style={{ color: "rgba(255,255,255,0.15)" }}>
          RAW DATA ≠ INTELLIGENCE
        </motion.p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SIGNAL LAYER
══════════════════════════════════════════════════════════════════════════════ */
function SignalLayer() {
  const ref = useRef<HTMLDivElement>(null);
  const iv  = useInView(ref, { once: true, amount: 0.3 });
  const [liveScore, setLiveScore] = useState(0);

  const sigs = [
    { label: "Pricing View",  pts: 21, col: AI },
    { label: "Return Visit",  pts: 18, col: AMBER },
    { label: "Case Study",    pts: 14, col: GREEN },
    { label: "Engagement",    pts: 11, col: "rgba(255,255,255,0.5)" },
    { label: "ICP Match",     pts: 27, col: RED },
  ];

  useEffect(() => {
    if (!iv) return;
    let accumulated = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    sigs.forEach((s, i) => {
      timers.push(setTimeout(() => {
        accumulated = Math.min(accumulated + s.pts, 91);
        const target = accumulated;
        let cur = liveScore;
        const iv2 = setInterval(() => {
          cur += 1;
          setLiveScore(Math.min(cur, target));
          if (cur >= target) clearInterval(iv2);
        }, 15);
      }, 400 + i * 500));
    });
    return () => timers.forEach(clearTimeout);
  }, [iv]); // eslint-disable-line

  const scoreCol = liveScore >= 80 ? GREEN : liveScore >= 60 ? AMBER : "rgba(255,255,255,0.4)";

  return (
    <section ref={ref} style={{ background: BG }} className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <Spine step="03" label="SIGNAL" />
        <motion.div variants={seq} initial="hidden" animate={iv ? "show" : "hidden"}>
          <motion.h2 variants={up}
            className="text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            style={{ maxWidth: 680 }}>
            DATA BECOMES POWERFUL<br />
            <span style={{ color: "rgba(255,255,255,0.25)" }}>WHEN PATTERNS EMERGE.</span>
          </motion.h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          {/* Signal table */}
          <div className="space-y-0 divide-y" style={{ borderColor: BORDER }}>
            <div className="flex justify-between pb-3 text-[9px] font-bold uppercase tracking-widest"
              style={{ color: "rgba(255,255,255,0.2)" }}>
              <span>SIGNAL</span><span>CONTRIBUTION</span>
            </div>
            {sigs.map((s, i) => (
              <motion.div key={s.label}
                initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.12 }}
                className="flex items-center justify-between py-4">
                <div className="flex items-center gap-3">
                  <motion.span className="h-1.5 w-1.5 rounded-full shrink-0"
                    style={{ background: s.col }}
                    animate={iv ? { scale: [0, 1.4, 1] } : {}}
                    transition={{ delay: 0.4 + i * 0.12, duration: 0.4 }} />
                  <span className="text-sm font-semibold text-white">{s.label}</span>
                </div>
                <motion.div initial={{ opacity: 0, x: 8 }} animate={iv ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.12 }}
                  className="text-sm font-black tabular-nums" style={{ color: s.col }}>
                  +{s.pts}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Live intent score */}
          <div className="flex flex-col items-center justify-center text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] mb-4"
              style={{ color: "rgba(255,255,255,0.25)" }}>INTENT SCORE BUILDING</p>
            <p className="font-black tabular-nums" style={{ fontSize: "clamp(100px,18vw,160px)", color: scoreCol, lineHeight: 1 }}>
              {liveScore}
              <span style={{ fontSize: "0.4em" }}>%</span>
            </p>
            <div className="mt-6 w-full max-w-xs rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)", height: 4 }}>
              <motion.div className="h-full rounded-full" style={{ background: scoreCol }}
                animate={{ width: `${liveScore}%` }}
                transition={{ duration: 0.3 }} />
            </div>
            <p className="mt-4 text-xs font-bold uppercase tracking-widest"
              style={{ color: liveScore >= 80 ? GREEN : "rgba(255,255,255,0.2)" }}>
              {liveScore >= 80 ? "BUYING SIGNAL DETECTED" : "ACCUMULATING SIGNALS..."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   AI INTELLIGENCE CORE
══════════════════════════════════════════════════════════════════════════════ */
function IntelligenceCore() {
  const ref = useRef<HTMLDivElement>(null);
  const iv  = useInView(ref, { once: true, amount: 0.3 });
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!iv) return;
    const t = setTimeout(() => setDone(true), 1800);
    return () => clearTimeout(t);
  }, [iv]);

  const inputs  = ["Behaviour","Context","Journey","ICP","Engagement","Source"];
  const outputs = [
    { label: "INTENT",        val: "91%",      col: GREEN },
    { label: "BUYING STAGE",  val: "DECISION", col: AI },
    { label: "ICP MATCH",     val: "96%",      col: GREEN },
    { label: "URGENCY",       val: "HIGH",     col: RED },
  ];

  return (
    <section ref={ref} style={{ background: BG2 }} className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <Spine step="04" label="INTELLIGENCE" />
        <motion.div variants={seq} initial="hidden" animate={iv ? "show" : "hidden"}>
          <motion.h2 variants={up}
            className="text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            style={{ maxWidth: 720 }}>
            ONE SIGNAL MEANS LITTLE.<br />
            <span style={{ color: "rgba(255,255,255,0.25)" }}>THE PATTERN MEANS EVERYTHING.</span>
          </motion.h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-center">
          {/* Input nodes */}
          <div className="space-y-2.5">
            {inputs.map((inp, i) => (
              <motion.div key={inp}
                initial={{ opacity: 0, x: -12 }} animate={iv ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.08 + i * 0.1, duration: 0.4 }}
                className="flex items-center justify-between border-b py-3"
                style={{ borderColor: BORDER }}>
                <span className="text-sm font-semibold text-white">{inp}</span>
                <motion.span animate={iv ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="text-[10px] font-bold" style={{ color: AI }}>RECEIVED ✓</motion.span>
              </motion.div>
            ))}
          </div>

          {/* Core node */}
          <div className="flex justify-center py-6">
            <div className="relative">
              <motion.div animate={iv && !done ? { rotate: 360 } : {}}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-full"
                style={{ border: `1px dashed ${AI}20` }} />
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }} animate={iv ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
                className="relative flex h-36 w-36 flex-col items-center justify-center rounded-full"
                style={{ background: `radial-gradient(circle, ${AI}18, transparent)`, border: `1.5px solid ${AI}40` }}>
                <p className="text-[10px] font-black uppercase tracking-widest text-white">SARVOPAYA</p>
                <p className="text-[9px] mt-1 font-bold uppercase tracking-widest"
                  style={{ color: done ? GREEN : AI }}>
                  {done ? "COMPLETE" : iv ? "PROCESSING" : "AI"}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Outputs */}
          <div className="space-y-2.5">
            {outputs.map((o, i) => (
              <motion.div key={o.label}
                initial={{ opacity: 0, x: 12 }} animate={done ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.4, ease: EASE }}
                className="flex items-center justify-between border-b py-3"
                style={{ borderColor: BORDER }}>
                <span className="text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: "rgba(255,255,255,0.3)" }}>{o.label}</span>
                <span className="text-sm font-black" style={{ color: o.col }}>{o.val}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Explanation */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={done ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
          className="mt-12 border-t pt-8"
          style={{ borderColor: BORDER }}>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: GREEN }}>
            AI EXPLAINS THE SCORE
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              {[
                "Pricing page viewed twice in one session.",
                "Returned after 3 days via direct traffic.",
                "Viewed implementation case study.",
                "Spent 68% longer than average visitor.",
              ].map((pt) => (
                <p key={pt} className="flex items-start gap-2 text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.45)" }}>
                  <span style={{ color: GREEN }} className="shrink-0 mt-0.5">→</span> {pt}
                </p>
              ))}
            </div>
            <div className="rounded-2xl p-5" style={{ background: BG, border: `1px solid ${AI}18` }}>
              <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: AI }}>
                AI RECOMMENDATION
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                This visitor is likely evaluating vendors. Prioritise ROI-focused messaging.
                Recommend direct sales contact within 24 hours.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   AI DASHBOARD — with zoom sequence
══════════════════════════════════════════════════════════════════════════════ */
type DView = "overview" | "opps" | "visitor";

const OPPS = [
  { id: "#10482", journey: "Pricing → Return → Case Study → Contact", intent: 91, stage: "DECISION",    icp: 96, ago: "4m ago" },
  { id: "#08822", journey: "Pricing → Return",                         intent: 85, stage: "DECISION",    icp: 90, ago: "12m ago" },
  { id: "#09341", journey: "Services → Pricing → Exit",               intent: 78, stage: "EVALUATION",  icp: 84, ago: "31m ago" },
  { id: "#12019", journey: "Blog → Services → Pricing",               intent: 72, stage: "EVALUATION",  icp: 71, ago: "1h ago" },
  { id: "#11004", journey: "Contact → Exit → Return",                 intent: 68, stage: "AWARENESS",   icp: 77, ago: "2h ago" },
];

function AIDashboard() {
  const ref  = useRef<HTMLDivElement>(null);
  const iv   = useInView(ref, { once: true, amount: 0.2 });
  const [view, setView]   = useState<DView>("overview");
  const [sel, setSel]     = useState(0);

  const bars = [55, 62, 48, 71, 83, 69, 91, 74, 88, 65, 79, 92];

  return (
    <section ref={ref} id="dashboard" style={{ background: BG }} className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <Spine step="04b" label="INTELLIGENCE — LIVE" />
        <motion.div variants={seq} initial="hidden" animate={iv ? "show" : "hidden"} className="mb-10">
          <motion.h2 variants={up}
            className="text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl">
            YOUR MARKETING<br />
            <span style={{ color: "rgba(255,255,255,0.25)" }}>FINALLY HAS A BRAIN.</span>
          </motion.h2>
          <motion.p variants={up} className="mt-4 text-base sm:text-lg" style={{ color: "rgba(255,255,255,0.35)" }}>
            See what happens when AI connects the dots across 18,492 sessions.
          </motion.p>
        </motion.div>

        {/* Funnel breadcrumb above dashboard */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {[
            { label: "18,492 VISITORS", active: true, action: () => setView("overview") },
            { label: "624 HIGH INTENT", active: view !== "overview", action: () => setView("overview") },
            { label: "47 OPPORTUNITIES", active: view === "opps" || view === "visitor", action: () => setView("opps") },
            { label: view === "visitor" ? `VISITOR ${OPPS[sel].id}` : "1 VISITOR", active: view === "visitor", action: () => {} },
          ].map((b, i) => (
            <div key={b.label} className="flex items-center gap-2">
              <button type="button" onClick={b.action}
                className="text-[11px] font-black uppercase tracking-widest transition-colors"
                style={{ color: b.active ? (i === 3 ? GREEN : "white") : "rgba(255,255,255,0.2)", cursor: b.action.toString() === "() => {}" ? "default" : "pointer" }}>
                {b.label}
              </button>
              {i < 3 && <span className="text-[11px] font-bold" style={{ color: "rgba(255,255,255,0.15)" }}>→</span>}
            </div>
          ))}
        </div>

        {/* Dashboard shell */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={iv ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.7, ease: EASE }}
          className="overflow-hidden rounded-2xl"
          style={{ background: BG2, border: `1px solid ${BORDER}` }}>
          {/* title bar */}
          <div className="flex items-center justify-between border-b px-5 py-3" style={{ borderColor: BORDER }}>
            <div className="flex items-center gap-2.5">
              <div className="flex gap-1.5">
                {["#f87171","#fbbf24","#4ade80"].map(c => <div key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />)}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.18em]"
                style={{ color: "rgba(255,255,255,0.3)" }}>SARVOPAYA AI — LEAD INTELLIGENCE</span>
            </div>
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest"
              style={{ color: GREEN }}>
              <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: GREEN }} />LIVE
            </span>
          </div>

          <div className="flex min-h-[420px]">
            {/* sidebar */}
            <div className="hidden shrink-0 border-r py-3 sm:block" style={{ borderColor: BORDER, width: 168 }}>
              {["Overview","Visitors","Intent Signals","Opportunities","Campaigns","AI Insights","Revenue"].map((item, i) => (
                <button key={item}
                  onClick={() => { if (item === "Overview") setView("overview"); if (item === "Opportunities") setView("opps"); }}
                  className="flex w-full items-center gap-2.5 px-4 py-2 text-left transition-colors hover:bg-white/[0.03]"
                  style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.04em",
                    color: (view === "overview" && i === 0) || (view === "opps" && i === 3) || (view === "visitor" && i === 3)
                      ? "white" : "rgba(255,255,255,0.28)" }}>
                  <span className="h-1 w-1 rounded-full shrink-0"
                    style={{ background: (view === "overview" && i === 0) || ((view === "opps" || view === "visitor") && i === 3) ? RED : "transparent" }} />
                  {item}
                </button>
              ))}
            </div>

            {/* main */}
            <div className="flex-1 min-w-0 p-5">
              <AnimatePresence mode="wait">
                {view === "overview" && (
                  <motion.div key="ov" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}>
                    {/* metrics row */}
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-5 mb-4">
                      {[
                        { l: "VISITORS",      v: 18492, col: "rgba(255,255,255,0.6)" },
                        { l: "HIGH INTENT",   v: 624,   col: AI },
                        { l: "QUALIFIED",     v: 143,   col: AMBER },
                        { l: "OPPORTUNITIES", v: 47,    col: GREEN },
                        { l: "PIPELINE ₹L",   v: 284,   col: RED },
                      ].map((m) => (
                        <div key={m.l} className="rounded-xl p-3.5"
                          style={{ background: BG, border: `1px solid ${BORDER}` }}>
                          <p className="text-[8px] font-bold uppercase tracking-widest mb-1.5"
                            style={{ color: "rgba(255,255,255,0.25)" }}>{m.l}</p>
                          <p className="text-xl font-black tabular-nums" style={{ color: m.col }}>
                            <Counter to={m.v} />
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* chart */}
                    <div className="rounded-xl p-4 mb-3" style={{ background: BG, border: `1px solid ${BORDER}` }}>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-[9px] font-bold uppercase tracking-widest"
                          style={{ color: "rgba(255,255,255,0.3)" }}>INTENT TREND — 12 DAYS</p>
                        <p className="text-[9px] font-bold" style={{ color: GREEN }}>↑ 18% this week</p>
                      </div>
                      <div className="flex items-end gap-1.5 h-20">
                        {bars.map((h, i) => (
                          <div key={i} className="flex flex-1 flex-col items-center gap-1">
                            <motion.div className="w-full rounded-sm"
                              style={{ background: h > 80 ? `${GREEN}50` : h > 70 ? `${AI}40` : "rgba(255,255,255,0.08)" }}
                              initial={{ height: 0 }}
                              animate={iv ? { height: `${h}%` } : { height: 0 }}
                              transition={{ delay: 0.4 + i * 0.04, duration: 0.5, ease: EASE }} />
                            <p className="text-[7px]" style={{ color: "rgba(255,255,255,0.15)" }}>
                              {["M","T","W","T","F","S","S","M","T","W","T","F"][i]}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button onClick={() => setView("opps")}
                      className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left transition-colors hover:bg-white/[0.03]"
                      style={{ background: `${RED}08`, border: `1px solid ${RED}25` }}>
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-widest mb-0.5" style={{ color: RED }}>AI ALERT</p>
                        <p className="text-sm font-semibold text-white">47 opportunities waiting for action</p>
                      </div>
                      <span className="text-sm font-bold" style={{ color: RED }}>VIEW →</span>
                    </button>
                  </motion.div>
                )}

                {view === "opps" && (
                  <motion.div key="opps" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.25 }}>
                    <p className="text-[9px] font-bold uppercase tracking-widest mb-4"
                      style={{ color: "rgba(255,255,255,0.3)" }}>47 OPPORTUNITIES — BY INTENT</p>
                    <div className="space-y-2">
                      {OPPS.map((op, i) => (
                        <button key={op.id} type="button"
                          onClick={() => { setSel(i); setView("visitor"); }}
                          className="flex w-full items-center gap-4 rounded-xl p-3.5 text-left transition-all hover:border-white/15"
                          style={{ background: BG, border: `1px solid ${BORDER}` }}>
                          <div className="h-7 w-auto px-2 rounded-lg flex items-center justify-center text-[9px] font-black shrink-0"
                            style={{ background: `${GREEN}12`, color: GREEN, border: `1px solid ${GREEN}25` }}>{op.id}</div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-white truncate">{op.journey}</p>
                            <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{op.stage} · {op.ago}</p>
                          </div>
                          <div className="shrink-0 text-right">
                            <p className="text-base font-black tabular-nums"
                              style={{ color: op.intent >= 80 ? GREEN : AMBER }}>{op.intent}%</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {view === "visitor" && (
                  <motion.div key="vis" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                    {(() => {
                      const op = OPPS[sel];
                      return (
                        <div>
                          <div className="flex items-center gap-2 mb-5">
                            <button onClick={() => setView("opps")}
                              className="text-[10px] font-bold uppercase tracking-widest transition-colors hover:text-white"
                              style={{ color: "rgba(255,255,255,0.3)" }}>← OPPORTUNITIES</button>
                            <span style={{ color: BORDER }}>/</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-white">{op.id}</span>
                          </div>
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <p className="text-[9px] font-bold uppercase tracking-widest mb-3"
                                style={{ color: "rgba(255,255,255,0.3)" }}>JOURNEY</p>
                              <div className="space-y-1.5">
                                {op.journey.split(" → ").map((step, i, arr) => (
                                  <div key={step}>
                                    <div className="flex items-center gap-2.5">
                                      <span className="h-1.5 w-1.5 rounded-full shrink-0"
                                        style={{ background: step === "Exit" ? "#f87171" : GREEN }} />
                                      <span className="text-xs font-semibold text-white">{step}</span>
                                    </div>
                                    {i < arr.length - 1 && (
                                      <div className="ml-[2.75px] my-1 h-3 w-px" style={{ background: BORDER }} />
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="space-y-2">
                              {[
                                { l: "BUYING INTENT", v: `${op.intent}%`, c: GREEN },
                                { l: "BUYING STAGE",  v: op.stage,        c: AI },
                                { l: "ICP MATCH",     v: `${op.icp}%`,    c: AMBER },
                                { l: "PRIORITY",      v: "HIGH",           c: RED },
                              ].map((m) => (
                                <div key={m.l} className="flex justify-between items-center rounded-lg px-3.5 py-2.5"
                                  style={{ background: BG, border: `1px solid ${BORDER}` }}>
                                  <span className="text-[9px] font-bold uppercase tracking-widest"
                                    style={{ color: "rgba(255,255,255,0.3)" }}>{m.l}</span>
                                  <span className="text-sm font-black" style={{ color: m.c }}>{m.v}</span>
                                </div>
                              ))}
                              <div className="rounded-lg p-3.5" style={{ background: `${AI}07`, border: `1px solid ${AI}18` }}>
                                <p className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: AI }}>
                                  RECOMMENDED ACTION
                                </p>
                                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                                  Strong commercial evaluation detected. Contact now with ROI-focused messaging.
                                </p>
                              </div>
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
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   DECISION + ACTION
══════════════════════════════════════════════════════════════════════════════ */
function DecisionAction() {
  const ref = useRef<HTMLDivElement>(null);
  const iv  = useInView(ref, { once: true, amount: 0.3 });
  const [show, setShow] = useState(false);
  useEffect(() => { if (iv) { const t = setTimeout(() => setShow(true), 800); return () => clearTimeout(t); } }, [iv]);

  const branches = [
    { label: "SALES",     action: "CALL NOW",    col: GREEN,  hi: true },
    { label: "MARKETING", action: "RETARGET",   col: AI,     hi: false },
    { label: "NURTURE",   action: "EMAIL SEQ",  col: AMBER,  hi: false },
  ];

  return (
    <section ref={ref} style={{ background: BG2 }} className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <Spine step="05" label="DECISION" />
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
          {/* Decision */}
          <div>
            <motion.div variants={seq} initial="hidden" animate={iv ? "show" : "hidden"}>
              <motion.h2 variants={up}
                className="text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                AI DOESN&rsquo;T STOP AT<br />UNDERSTANDING.<br />
                <span style={{ color: "rgba(255,255,255,0.25)" }}>IT DECIDES WHAT HAPPENS NEXT.</span>
              </motion.h2>
            </motion.div>
            <div className="mt-14 flex flex-col items-start gap-3">
              <motion.div initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{ background: `${AI}12`, border: `1px solid ${AI}35`, color: AI, fontSize: 18 }}>⬡</motion.div>
              <motion.div animate={iv ? { height: 28, opacity: 1 } : { height: 0, opacity: 0 }} transition={{ delay: 0.6 }}
                className="ml-6 w-px" style={{ background: `${AI}40` }} />
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={iv ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 }}
                className="rounded-full px-4 py-2 text-[10px] font-black uppercase tracking-widest"
                style={{ background: `${GREEN}12`, border: `1px solid ${GREEN}35`, color: GREEN }}>
                91% INTENT — DECISION STAGE
              </motion.div>
              <motion.div animate={iv ? { height: 28, opacity: 1 } : { height: 0, opacity: 0 }} transition={{ delay: 0.9 }}
                className="ml-6 w-px" style={{ background: `${GREEN}40` }} />
              <div className="flex flex-wrap gap-3">
                {branches.map((b, i) => (
                  <motion.div key={b.label}
                    initial={{ opacity: 0, y: 10 }} animate={iv ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1.0 + i * 0.1 }}
                    className="rounded-xl p-4 text-center"
                    style={{ background: `${b.col}${b.hi ? "12" : "06"}`, border: `1px solid ${b.col}${b.hi ? "35" : "18"}`, minWidth: 96 }}>
                    <p className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: b.col }}>{b.label}</p>
                    <p className="text-xs font-black text-white">{b.action}</p>
                    {b.hi && <p className="mt-2 text-[8px] font-bold uppercase" style={{ color: GREEN }}>PRIORITY</p>}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Action */}
          <div>
            <Spine step="06" label="ACTION" />
            <motion.div variants={seq} initial="hidden" animate={iv ? "show" : "hidden"}>
              <motion.h2 variants={up}
                className="text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
                INTELLIGENCE MEANS NOTHING<br />
                <span style={{ color: "rgba(255,255,255,0.25)" }}>WITHOUT ACTION.</span>
              </motion.h2>
            </motion.div>
            <div className="mt-14 space-y-2">
              {[
                ["Visitor returns","rgba(255,255,255,0.45)"],
                ["AI detects high intent",AI],
                ["Intent score = 91%",GREEN],
                ["CRM updated","rgba(255,255,255,0.45)"],
                ["Sales notified",AMBER],
                ["Follow-up triggered",GREEN],
              ].map(([label, col], i) => (
                <motion.div key={label as string}
                  initial={{ opacity: 0, x: 16 }} animate={show ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.12, duration: 0.4, ease: EASE }}
                  className="flex items-center gap-4 border-b py-3"
                  style={{ borderColor: BORDER }}>
                  <span className="text-[9px] font-black tabular-nums" style={{ color: "rgba(255,255,255,0.2)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-semibold" style={{ color: col as string }}>{label as string}</span>
                  {i < 5 && (
                    <motion.span animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.15 }}
                      className="ml-auto text-xs" style={{ color: AI }}>→</motion.span>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={show ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9 }}
              className="mt-5 rounded-xl p-4"
              style={{ background: `${GREEN}07`, border: `1px solid ${GREEN}25` }}>
              <p className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: GREEN }}>LIVE ALERT</p>
              <p className="text-sm font-semibold text-white">Visitor #10482 — Intent 91% — Contact Now</p>
              <p className="mt-1 text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                Strong commercial evaluation detected. 4 minutes ago.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   5-LAYER ARCHITECTURE
══════════════════════════════════════════════════════════════════════════════ */
const LAYERS = [
  { id: "01", title: "ATTRACT",   sub: "Bring the right people in.",   tags: ["Google","Meta","LinkedIn","SEO","Content"],          col: AI },
  { id: "02", title: "OBSERVE",   sub: "Understand what they do.",     tags: ["Pages","Clicks","Sessions","Return Visits"],          col: "rgba(255,255,255,0.5)" },
  { id: "03", title: "INTERPRET", sub: "Let AI connect the signals.",  tags: ["Behaviour","Intent","ICP","Context"],                 col: AMBER },
  { id: "04", title: "PREDICT",   sub: "Find the opportunities.",      tags: ["Intent Score","Buying Stage","Priority"],             col: GREEN },
  { id: "05", title: "ACT",       sub: "Do something about it.",       tags: ["Sales Alert","Retargeting","WhatsApp","Email","CRM"], col: RED },
];

function ArchitectureTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const iv  = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} style={{ background: BG }} className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <motion.div variants={seq} initial="hidden" animate={iv ? "show" : "hidden"} className="mb-12">
          <motion.h2 variants={up}
            className="text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl">
            FIVE STAGES.<br />
            <span style={{ color: "rgba(255,255,255,0.2)" }}>ONE SYSTEM.</span>
          </motion.h2>
        </motion.div>

        <div className="space-y-px border-t" style={{ borderColor: BORDER }}>
          {LAYERS.map((l, i) => (
            <motion.div key={l.id}
              initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.14 }}
              className="flex items-start gap-8 border-b py-7"
              style={{ borderColor: BORDER }}>
              <span className="w-8 shrink-0 text-2xl font-black tabular-nums mt-0.5"
                style={{ color: `${l.col}30` }}>{l.id}</span>
              <div className="w-32 shrink-0">
                <p className="text-sm font-black uppercase tracking-tight" style={{ color: l.col }}>{l.title}</p>
                <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>{l.sub}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {l.tags.map((tag) => (
                  <span key={tag} className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                    style={{ background: `${l.col}08`, border: `1px solid ${l.col}18`, color: l.col }}>
                    {tag}
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
   REVENUE — massive typography
══════════════════════════════════════════════════════════════════════════════ */
function RevenueSection() {
  const ref = useRef<HTMLDivElement>(null);
  const iv  = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section ref={ref} style={{ background: BG2 }} className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <Spine step="07" label="REVENUE" />
        <motion.p initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
          className="text-base font-bold uppercase tracking-widest mb-4"
          style={{ color: "rgba(255,255,255,0.3)" }}>
          Because leads aren&rsquo;t the metric.
        </motion.p>
        <div className="overflow-hidden">
          <motion.p
            initial={{ y: "110%", opacity: 0 }}
            animate={iv ? { y: "0%", opacity: 1 } : {}}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="font-black uppercase tracking-tight"
            style={{ fontSize: "clamp(80px,18vw,220px)", color: AMBER, lineHeight: 0.88 }}>
            REVENUE<br />IS.
          </motion.p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={iv ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6, ease: EASE }}
          className="mt-16 grid grid-cols-2 gap-px border-t sm:grid-cols-6"
          style={{ borderColor: BORDER }}>
          {["TRAFFIC","ENGAGEMENT","INTENT","QUALIFICATION","SALES","REVENUE"].map((s, i) => (
            <div key={s} className="border-r py-6 px-4 last:border-r-0 text-center" style={{ borderColor: BORDER }}>
              <p className="text-[9px] font-black uppercase tracking-widest"
                style={{ color: i === 5 ? AMBER : i >= 2 ? GREEN : "rgba(255,255,255,0.25)" }}>
                {i === 5 ? "★ " : ""}{s}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   USE CASES
══════════════════════════════════════════════════════════════════════════════ */
const USE_CASES = [
  { title: "D2C",             body: "Turn product browsing into buying signals. Know which visitors are evaluating, not just browsing.", signals: ["Cart Abandon","Product Return","Price Check"] },
  { title: "B2B",             body: "Know which prospects are getting serious. Reach out at the right moment, not at random.",           signals: ["Pricing View","Case Study","Return Visit"] },
  { title: "SERVICE",         body: "Stop treating every enquiry equally. Find the visitors ready to hire, not just curious.",          signals: ["Service Page","Contact View","ICP Match"] },
  { title: "HIGH-TICKET",     body: "Find buyers, not browsers. High-value buyers research deeply before they act.",                   signals: ["Deep Research","Return","Engagement"] },
];

function UseCases() {
  const ref = useRef<HTMLDivElement>(null);
  const iv  = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} style={{ background: BG }} className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <motion.div variants={seq} initial="hidden" animate={iv ? "show" : "hidden"} className="mb-12">
          <motion.h2 variants={up}
            className="text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl">
            BUILT FOR BUSINESSES<br />
            <span style={{ color: "rgba(255,255,255,0.2)" }}>WHERE EVERY LEAD MATTERS.</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-px border-t border-l sm:grid-cols-2" style={{ borderColor: BORDER }}>
          {USE_CASES.map((uc, i) => (
            <motion.div key={uc.title}
              initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="group border-b border-r p-8 transition-colors duration-300 hover:bg-white/[0.02]"
              style={{ borderColor: BORDER }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: RED }}>{uc.title}</p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.45)", maxWidth: 320 }}>{uc.body}</p>
              <div className="flex flex-wrap gap-2">
                {uc.signals.map((sig) => (
                  <span key={sig} className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                    style={{ background: `${AI}08`, border: `1px solid ${AI}20`, color: AI }}>
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
   AI SIMULATOR ★ — live score, then full analysis
══════════════════════════════════════════════════════════════════════════════ */
const SIM_SIGS = [
  { id: "pricing",    label: "Visited pricing page",     pts: 21 },
  { id: "return",     label: "Returned twice or more",   pts: 18 },
  { id: "casestudy",  label: "Viewed case study",        pts: 14 },
  { id: "google",     label: "Came from Google Search",  pts:  8 },
  { id: "time",       label: "Spent 4+ minutes on site", pts: 11 },
  { id: "contact",    label: "Viewed contact page",      pts: 19 },
];
const SIM_STEPS = ["Behaviour","Intent","ICP","Journey","Context"];

type SimPhase = "live" | "analysing" | "result";

function AISimulator() {
  const ref    = useRef<HTMLDivElement>(null);
  const iv     = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();

  const [checked, setChecked] = useState<Set<string>>(new Set(["pricing","return","casestudy"]));
  const [phase, setPhase]     = useState<SimPhase>("live");
  const [stepDone, setStepDone] = useState(-1);
  const [showScore, setShowScore] = useState(0);

  const liveScore = useMemo(() => {
    let s = 0;
    SIM_SIGS.forEach((sig) => { if (checked.has(sig.id)) s += sig.pts; });
    return Math.min(s, 99);
  }, [checked]);

  function toggle(id: string) {
    if (phase !== "live") return;
    setChecked((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }

  function analyse() {
    if (phase === "result") { setPhase("live"); setStepDone(-1); setShowScore(0); return; }
    if (phase !== "live") return;
    setPhase("analysing"); setStepDone(-1);
    SIM_STEPS.forEach((_, i) => setTimeout(() => setStepDone(i), reduce ? 0 : 350 + i * 450));
    const delay = reduce ? 100 : 350 + SIM_STEPS.length * 450 + 200;
    setTimeout(() => {
      setPhase("result");
      if (!reduce) {
        let d = 0;
        const iv2 = setInterval(() => { d += 2; setShowScore(Math.min(d, liveScore)); if (d >= liveScore) clearInterval(iv2); }, 18);
      } else { setShowScore(liveScore); }
    }, delay);
  }

  const stageCol  = liveScore >= 80 ? GREEN : liveScore >= 60 ? AMBER : AI;
  const stage     = liveScore >= 80 ? "DECISION" : liveScore >= 60 ? "EVALUATION" : "AWARENESS";
  const priority  = liveScore >= 80 ? "HIGH" : liveScore >= 60 ? "MEDIUM" : "LOW";
  const rec       = liveScore >= 80
    ? "Strong commercial evaluation behaviour. Prioritise direct sales outreach with ROI-focused messaging — do not send another promotional email."
    : liveScore >= 60
    ? "Active evaluation stage. Recommend retargeting with case studies and ROI evidence."
    : "Early-stage awareness. Nurture with educational content before outreach.";

  const scoreCol = liveScore >= 80 ? GREEN : liveScore >= 60 ? AMBER : "rgba(255,255,255,0.25)";

  return (
    <section ref={ref} style={{ background: BG2 }} className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <motion.div variants={seq} initial="hidden" animate={iv ? "show" : "hidden"} className="mb-12">
          <motion.p variants={up} className="text-[10px] font-bold uppercase tracking-[0.22em] mb-3" style={{ color: AI }}>
            AI SIMULATOR
          </motion.p>
          <motion.h2 variants={up}
            className="text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            style={{ maxWidth: 760 }}>
            WHAT WOULD OUR AI THINK<br />
            <span style={{ color: "rgba(255,255,255,0.2)" }}>ABOUT YOUR VISITORS?</span>
          </motion.h2>
          <motion.p variants={up} className="mt-4 text-base sm:text-lg" style={{ color: "rgba(255,255,255,0.35)" }}>
            Tick the signals that describe a visitor. Watch the AI score respond in real time.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
          {/* Input */}
          <motion.div initial={{ opacity: 0, x: -16 }} animate={iv ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
            className="rounded-2xl p-6"
            style={{ background: BG, border: `1px solid ${BORDER}` }}>
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] mb-5"
              style={{ color: "rgba(255,255,255,0.28)" }}>VISITOR SIGNALS</p>
            <div className="space-y-2.5">
              {SIM_SIGS.map((sig) => {
                const on = checked.has(sig.id);
                return (
                  <button key={sig.id} type="button" onClick={() => toggle(sig.id)}
                    disabled={phase !== "live"}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left transition-all duration-200"
                    style={{ background: on ? `${AI}08` : "transparent", border: `1px solid ${on ? AI + "35" : BORDER}`, cursor: phase !== "live" ? "default" : "pointer" }}>
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded flex items-center justify-center shrink-0"
                        style={{ background: on ? AI : "rgba(255,255,255,0.07)", border: `1px solid ${on ? AI : "rgba(255,255,255,0.12)"}` }}>
                        {on && <span className="text-[10px] font-black text-white">✓</span>}
                      </div>
                      <span className="text-sm font-semibold" style={{ color: on ? "white" : "rgba(255,255,255,0.45)" }}>
                        {sig.label}
                      </span>
                    </div>
                    {on && <span className="text-xs font-black" style={{ color: AI }}>+{sig.pts}</span>}
                  </button>
                );
              })}
            </div>
            <button type="button" onClick={analyse}
              className="mt-6 w-full rounded-full py-4 text-sm font-black uppercase tracking-wider transition-all duration-300"
              style={{ background: phase === "result" ? "rgba(255,255,255,0.06)" : RED, color: "white",
                border: `1px solid ${phase === "result" ? "rgba(255,255,255,0.12)" : RED}` }}>
              {phase === "live" ? "ANALYSE THIS VISITOR →" : phase === "analysing" ? "ANALYSING..." : "RESET SIMULATOR"}
            </button>
          </motion.div>

          {/* Output */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={iv ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
            className="rounded-2xl p-6"
            style={{ background: BG, border: `1px solid ${BORDER}`, minHeight: 400 }}>
            <AnimatePresence mode="wait">
              {phase === "live" && (
                <motion.div key="live" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex h-full flex-col">
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] mb-5"
                    style={{ color: "rgba(255,255,255,0.28)" }}>LIVE INTENT PREVIEW</p>
                  <div className="flex flex-1 flex-col items-center justify-center text-center">
                    <p className="font-black tabular-nums"
                      style={{ fontSize: "clamp(72px,14vw,120px)", color: scoreCol, lineHeight: 1, transition: "color 0.4s" }}>
                      {liveScore}
                      <span style={{ fontSize: "0.35em" }}>%</span>
                    </p>
                    <div className="mt-4 w-full max-w-xs rounded-full overflow-hidden mx-auto"
                      style={{ background: "rgba(255,255,255,0.05)", height: 4 }}>
                      <div className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${liveScore}%`, background: scoreCol }} />
                    </div>
                    <p className="mt-4 text-xs font-bold uppercase tracking-widest"
                      style={{ color: liveScore >= 80 ? GREEN : liveScore >= 60 ? AMBER : "rgba(255,255,255,0.18)" }}>
                      {liveScore >= 80 ? "BUYING SIGNAL DETECTED" : liveScore >= 60 ? "EVALUATION STAGE" : liveScore > 0 ? "ACCUMULATING..." : "SELECT SIGNALS ABOVE"}
                    </p>
                    <p className="mt-6 text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
                      Click &ldquo;Analyse&rdquo; for full AI breakdown
                    </p>
                  </div>
                </motion.div>
              )}

              {phase === "analysing" && (
                <motion.div key="analysing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] mb-6" style={{ color: AI }}>ANALYSING...</p>
                  <div className="space-y-4">
                    {SIM_STEPS.map((step, i) => (
                      <motion.div key={step} className="flex items-center gap-4">
                        <motion.div className="h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0"
                          animate={stepDone >= i ? { background: GREEN } : { background: "rgba(255,255,255,0.08)" }}>
                          {stepDone >= i ? "✓" : ""}
                        </motion.div>
                        <span className="text-sm font-semibold"
                          style={{ color: stepDone >= i ? "white" : "rgba(255,255,255,0.28)" }}>{step}</span>
                        {stepDone < i && (
                          <motion.div animate={{ opacity: [0.2, 1, 0.2] }} transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.1 }}
                            className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {phase === "result" && (
                <motion.div key="result" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}>
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] mb-4" style={{ color: GREEN }}>AI RESULT</p>
                  <p className="font-black tabular-nums mb-1" style={{ fontSize: "clamp(60px,12vw,96px)", color: stageCol, lineHeight: 1 }}>
                    {showScore}<span style={{ fontSize: "0.35em" }}>%</span>
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-6"
                    style={{ color: "rgba(255,255,255,0.3)" }}>BUYING INTENT</p>
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {[
                      { l: "STAGE",    v: stage,            c: AI },
                      { l: "PRIORITY", v: priority,         c: stageCol },
                      { l: "SIGNALS",  v: `${checked.size}/6`, c: AMBER },
                    ].map((m) => (
                      <div key={m.l} className="rounded-xl p-3 text-center"
                        style={{ background: BG2, border: `1px solid ${m.c}18` }}>
                        <p className="text-[8px] font-bold uppercase tracking-widest mb-1"
                          style={{ color: "rgba(255,255,255,0.25)" }}>{m.l}</p>
                        <p className="text-xs font-black" style={{ color: m.c }}>{m.v}</p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl p-4 mb-4" style={{ background: `${AI}07`, border: `1px solid ${AI}20` }}>
                    <p className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: AI }}>AI RECOMMENDATION</p>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{rec}</p>
                  </div>
                  <Link href="/contact"
                    className="flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-black uppercase tracking-wider transition-colors hover:bg-[#c41e24]"
                    style={{ background: RED, color: "white" }}>
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
   DIFFERENTIATOR — large editorial type
══════════════════════════════════════════════════════════════════════════════ */
function Differentiator() {
  const ref = useRef<HTMLDivElement>(null);
  const iv  = useInView(ref, { once: true, amount: 0.3 });

  const statements = [
    { dim: "IT DOESN'T JUST TALK.",        bright: "IT OBSERVES." },
    { dim: "IT DOESN'T JUST AUTOMATE.",    bright: "IT DECIDES." },
    { dim: "IT DOESN'T JUST GENERATE LEADS.", bright: "IT FINDS OPPORTUNITIES." },
  ];

  return (
    <section ref={ref} style={{ background: BG }} className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <motion.p initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}}
          className="text-[10px] font-bold uppercase tracking-[0.22em] mb-12" style={{ color: RED }}>
          NOT ANOTHER AI CHATBOT
        </motion.p>
        <div className="space-y-10">
          {statements.map((s, i) => (
            <motion.div key={s.dim}
              initial={{ opacity: 0, y: 24 }} animate={iv ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.18, duration: 0.7, ease: EASE }}>
              <p style={{ fontSize: "clamp(18px,3vw,40px)", color: "rgba(255,255,255,0.2)" }}
                className="font-light uppercase leading-tight">
                {s.dim}
              </p>
              <p style={{ fontSize: "clamp(28px,5vw,72px)" }} className="font-black uppercase leading-tight text-white">
                {s.bright}
              </p>
              {i < statements.length - 1 && (
                <div className="mt-10 h-px" style={{ background: BORDER }} />
              )}
            </motion.div>
          ))}
        </div>
        <motion.p initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}} transition={{ delay: 0.8 }}
          className="mt-14 max-w-lg text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
          AI becomes useful when it understands context and triggers action.
          That&rsquo;s the only version of AI we build.
        </motion.p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   IMPLEMENTATION
══════════════════════════════════════════════════════════════════════════════ */
function Implementation() {
  const ref = useRef<HTMLDivElement>(null);
  const iv  = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} style={{ background: BG2 }} className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <motion.div variants={seq} initial="hidden" animate={iv ? "show" : "hidden"} className="mb-14">
          <motion.h2 variants={up}
            className="text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl">
            YOUR EXISTING MARKETING<br />
            <span style={{ color: "rgba(255,255,255,0.2)" }}>DOESN&rsquo;T NEED TO CHANGE.</span>
          </motion.h2>
          <motion.p variants={up} className="mt-3 text-lg font-light" style={{ color: "rgba(255,255,255,0.4)" }}>
            We add intelligence to it.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 gap-px border-t sm:grid-cols-3" style={{ borderColor: BORDER }}>
          {[
            { n: "01", t: "CONNECT",    b: "Your website, campaigns, analytics and CRM. Every source of signal mapped." },
            { n: "02", t: "UNDERSTAND", b: "We identify the behavioural patterns that indicate buying intent for your specific audience." },
            { n: "03", t: "ACTIVATE",   b: "AI finds opportunities and triggers the right action — sales alert, retargeting, or automated sequence." },
          ].map((s, i) => (
            <motion.div key={s.n}
              initial={{ opacity: 0, y: 16 }} animate={iv ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.14, duration: 0.5, ease: EASE }}
              className="border-r pt-8 pr-8 last:border-r-0 last:pr-0 sm:pl-8 first:pl-0" style={{ borderColor: BORDER }}>
              <p className="text-4xl font-black tabular-nums mb-5" style={{ color: `${GREEN}25` }}>{s.n}</p>
              <p className="text-base font-black uppercase tracking-tight text-white mb-3">{s.t}</p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.4)" }}>{s.b}</p>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }} className="mt-14">
          <CTA href="/contact">BUILD MY LEAD INTELLIGENCE SYSTEM</CTA>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FAQ
══════════════════════════════════════════════════════════════════════════════ */
const FAQS = [
  { q: "Is this replacing my CRM?", a: "No. We integrate with your existing CRM — HubSpot, Zoho, Salesforce. We enrich it with intent signals and trigger workflows inside it." },
  { q: "Do I need thousands of visitors?", a: "No. Even with a few hundred monthly visitors, intent intelligence is valuable. It's about signal quality, not traffic volume." },
  { q: "Does this only work with paid ads?", a: "No. The system works across all traffic sources — organic, direct, social, referral, and paid. Every channel produces behavioural data." },
  { q: "Can it automatically notify sales?", a: "Yes. When intent crosses your threshold, the system can trigger a CRM task, WhatsApp notification, Slack alert, or automated email sequence." },
  { q: "Can it work with our existing tracking?", a: "Yes. We integrate with GA4 and Google Tag Manager. We enhance your tracking layer rather than replacing it." },
  { q: "Is this just lead scoring?", a: "Lead scoring assigns a number. This system explains the number, maps the journey, identifies the stage, recommends the action, and triggers it. It's lead intelligence." },
];

function FAQ() {
  const ref  = useRef<HTMLDivElement>(null);
  const iv   = useInView(ref, { once: true, amount: 0.2 });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section ref={ref} style={{ background: BG }} className="w-full">
      <div className="mx-auto max-w-4xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <motion.h2 variants={up} initial="hidden" animate={iv ? "show" : "hidden"}
          className="text-3xl font-bold uppercase leading-tight tracking-tight text-white sm:text-4xl mb-12">
          COMMON QUESTIONS
        </motion.h2>
        <div className="space-y-0 divide-y" style={{ borderColor: BORDER }}>
          {FAQS.map((faq, i) => (
            <motion.div key={faq.q}
              initial={{ opacity: 0 }} animate={iv ? { opacity: 1 } : {}}
              transition={{ delay: 0.05 + i * 0.07 }}>
              <button type="button" onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-white">
                <span className="text-sm font-semibold pr-6" style={{ color: open === i ? "white" : "rgba(255,255,255,0.7)" }}>
                  {faq.q}
                </span>
                <span className={`shrink-0 text-xl font-light transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}
                  style={{ color: open === i ? AI : "rgba(255,255,255,0.25)" }}>+</span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: EASE }}
                    className="overflow-hidden pb-5 text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.45)" }}>
                    {faq.a}
                  </motion.p>
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
   FINAL CTA
══════════════════════════════════════════════════════════════════════════════ */
function FinalCTA() {
  const ref  = useRef<HTMLDivElement>(null);
  const iv   = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [nodePhase, setNodePhase] = useState<"visitor"|"opportunity"|"revenue">("visitor");

  useEffect(() => {
    if (!iv) return;
    if (reduce) { setNodePhase("revenue"); return; }
    const t1 = setTimeout(() => setNodePhase("opportunity"), 1000);
    const t2 = setTimeout(() => setNodePhase("revenue"), 2200);
    return () => [t1,t2].forEach(clearTimeout);
  }, [iv, reduce]);

  const nodeCol = nodePhase === "visitor" ? "rgba(255,255,255,0.3)" : nodePhase === "opportunity" ? GREEN : AMBER;
  const nodeLabel = nodePhase === "visitor" ? "VISITOR" : nodePhase === "opportunity" ? "OPPORTUNITY" : "REVENUE";

  return (
    <section ref={ref} style={{ background: BG2 }} className="w-full">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-32 text-center sm:px-6 lg:px-8">
        {/* transforming node */}
        <div className="mb-14 flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div key={nodePhase}
              initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.4 }} transition={{ duration: 0.45, ease: EASE }}
              className="flex items-center justify-center rounded-full"
              style={{ width: nodePhase === "revenue" ? 100 : 72, height: nodePhase === "revenue" ? 100 : 72,
                background: `${nodeCol}10`, border: `1.5px solid ${nodeCol}40` }}>
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: nodeCol }}>
                {nodeLabel}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div variants={seq} initial="hidden" animate={iv ? "show" : "hidden"} style={{ maxWidth: 820 }}>
          <motion.h2 variants={up}
            className="font-bold uppercase text-white"
            style={{ fontSize: "clamp(40px,8vw,100px)", lineHeight: 0.92, letterSpacing: "-0.015em" }}>
            YOUR NEXT CUSTOMER<br />MIGHT ALREADY BE<br />
            <span style={{ color: RED }}>LOOKING AT YOU.</span>
          </motion.h2>

          <motion.p variants={up}
            className="mt-8 text-xl font-light uppercase leading-snug"
            style={{ color: "rgba(255,255,255,0.35)" }}>
            THE QUESTION IS:<br />
            <span style={{ color: "rgba(255,255,255,0.65)" }}>CAN YOU RECOGNISE THEM?</span>
          </motion.p>

          <motion.div variants={up} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <CTA href="/contact">FIND MY HIDDEN LEADS</CTA>
            <CTA href="/contact" outline>TALK TO SARVOPAYA</CTA>
          </motion.div>

          <motion.p variants={up} className="mt-6 text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "rgba(255,255,255,0.18)" }}>
            Turn anonymous behaviour into actionable opportunities.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   JSON-LD + PAGE
══════════════════════════════════════════════════════════════════════════════ */
const schema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Need More Leads? AI Lead Intelligence by Sarvopaya",
  url: "https://sarvopaya.com/need-more-leads",
  description: "Sarvopaya AI identifies high-intent visitors and converts anonymous behaviour into actionable sales opportunities.",
};

export default function NeedMoreLeadsPage() {
  return (
    <main className="w-full overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Hero />
      <DataLayer />
      <SignalLayer />
      <IntelligenceCore />
      <AIDashboard />
      <DecisionAction />
      <ArchitectureTimeline />
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
