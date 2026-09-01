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
import {
  ChartIcon,
  BoltIcon,
  CartIcon,
  GearIcon,
  RocketIcon,
  MegaphoneIcon,
  FunnelIcon,
  TargetIcon,
  MonitorIcon,
} from "@/components/icons";

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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtINR(n: number): string {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Math.round(n)
  );
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useAnimatedNumber(target: number, duration = 400): number {
  const [value, setValue] = useState(target);
  const prevRef = useRef(target);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const start = prevRef.current;
    const end = target;
    prevRef.current = target;
    if (start === end) return;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setValue(start + (end - start) * e);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return value;
}

// ─── Shared UI ────────────────────────────────────────────────────────────────

function SectionLabel({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <motion.span
      variants={fadeUp}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ${
        light
          ? "border-black/10 text-black/50"
          : "border-white/10 text-white/40"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
      {children}
    </motion.span>
  );
}

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="relative flex h-6 w-6 shrink-0 items-center justify-center"
    >
      <span className="absolute h-0.5 w-4 rounded-full bg-current" />
      <span
        className={`absolute h-0.5 w-4 rotate-90 rounded-full bg-current transition-all duration-300 ${
          open ? "scale-x-0 opacity-0" : ""
        }`}
      />
    </span>
  );
}

// ─── Motion UX 01 Revenue Engine ───────────────────────────────────────────

function RevenueEngine() {
  const prefersReducedMotion = useReducedMotion();

  const [spend, setSpend] = useState(200000);
  const [roas, setRoas] = useState(3.2);
  const [cvr, setCvr] = useState(2.5);
  const [aov, setAov] = useState(2500);

  const revenue = spend * roas;
  const orders = aov > 0 ? Math.round(revenue / aov) : 0;
  const cac = orders > 0 ? spend / orders : 0;
  const traffic = cvr > 0 ? Math.round(orders / (cvr / 100)) : 0;

  const animRevenue = useAnimatedNumber(revenue, prefersReducedMotion ? 0 : 380);
  const animOrders = useAnimatedNumber(orders, prefersReducedMotion ? 0 : 380);
  const animCac = useAnimatedNumber(cac, prefersReducedMotion ? 0 : 380);
  const animTraffic = useAnimatedNumber(traffic, prefersReducedMotion ? 0 : 380);

  const track = `w-full h-1.5 appearance-none cursor-pointer rounded-full bg-white/10
    focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]
    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--accent)]
    [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2
    [&::-webkit-slider-thumb]:border-white/20`;

  return (
    <motion.div
      variants={fadeUp}
      className="mt-12 overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03]"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/8 px-6 py-4 sm:px-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/35">
          Performance Simulation
        </p>
        <p className="text-[10px] text-white/20">
          Illustrative model not a guarantee
        </p>
      </div>

      <div className="grid sm:grid-cols-2">
        {/* Inputs */}
        <div className="border-b border-white/8 p-6 sm:border-b-0 sm:border-r sm:p-8">
          <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white/25">
            Inputs
          </p>
          <div className="flex flex-col gap-7">
            {[
              {
                label: "Ad Spend",
                display: `₹${fmtINR(spend)}`,
                min: 10000,
                max: 2000000,
                step: 10000,
                value: spend,
                set: setSpend,
                lo: "₹10K",
                hi: "₹20L",
                accent: false,
              },
              {
                label: "ROAS",
                display: `${roas.toFixed(1)}×`,
                min: 0.5,
                max: 10,
                step: 0.1,
                value: roas,
                set: setRoas,
                lo: "0.5×",
                hi: "10×",
                accent: true,
              },
              {
                label: "Conversion Rate",
                display: `${cvr.toFixed(1)}%`,
                min: 0.1,
                max: 8,
                step: 0.1,
                value: cvr,
                set: setCvr,
                lo: "0.1%",
                hi: "8%",
                accent: false,
              },
              {
                label: "Avg Order Value",
                display: `₹${fmtINR(aov)}`,
                min: 500,
                max: 10000,
                step: 100,
                value: aov,
                set: setAov,
                lo: "₹500",
                hi: "₹10K",
                accent: false,
              },
            ].map((s) => (
              <div key={s.label}>
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="text-sm text-white/55">{s.label}</span>
                  <span
                    className={`font-heading text-lg font-bold tabular-nums ${
                      s.accent ? "text-[var(--accent)]" : "text-white"
                    }`}
                  >
                    {s.display}
                  </span>
                </div>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  step={s.step}
                  value={s.value}
                  onChange={(e) => s.set(Number(e.target.value))}
                  className={track}
                  aria-label={s.label}
                />
                <div className="mt-1 flex justify-between text-[10px] text-white/18">
                  <span>{s.lo}</span>
                  <span>{s.hi}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Outputs */}
        <div className="p-6 sm:p-8">
          <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white/25">
            Outputs
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                label: "Revenue",
                val: `₹${fmtINR(animRevenue)}`,
                accent: true,
              },
              { label: "Orders", val: fmtINR(animOrders), accent: false },
              { label: "CAC", val: `₹${fmtINR(animCac)}`, accent: false },
              {
                label: "Traffic Needed",
                val: fmtINR(animTraffic),
                accent: false,
              },
            ].map(({ label, val, accent }) => (
              <div
                key={label}
                className={`rounded-xl border p-4 ${
                  accent
                    ? "border-[var(--accent)]/30 bg-[var(--accent)]/5"
                    : "border-white/8 bg-white/[0.03]"
                }`}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-white/28">
                  {label}
                </p>
                <p
                  className={`mt-2 font-heading text-2xl font-bold tabular-nums sm:text-3xl ${
                    accent ? "text-[var(--accent)]" : "text-white"
                  }`}
                >
                  {val}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl border border-white/6 bg-white/[0.025] p-4">
            <p className="text-[11px] leading-5 text-white/22">
              Adjust ROAS from{" "}
              <span className="text-white/45">{roas.toFixed(1)}×</span> to see
              how revenue changes. Every 0.5× improvement at ₹{fmtINR(spend)}{" "}
              spend adds ₹{fmtINR(spend * 0.5)} to attributed revenue.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Motion UX 02 Data Pipeline ────────────────────────────────────────────

const pipelineNodes = [
  { label: "User", detail: "Purchase event triggered on your store" },
  { label: "Website", detail: "Data layer captures transaction data" },
  { label: "Client-Side Tag", detail: "Browser fires tag via GTM" },
  { label: "Server / GTM-SS", detail: "Event forwarded server-to-server" },
  { label: "Validation", detail: "Data quality and format verified" },
  { label: "Deduplication", detail: "Event ID checked to prevent double-counting" },
  { label: "Meta CAPI · Google EC · GA4", detail: "Platforms receive clean signal" },
  { label: "Reporting", detail: "Attribution models process the event" },
  { label: "Decision", detail: "Budget allocation informed by verified data" },
];

function DataPipeline() {
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-80px" });

  useEffect(() => {
    if (!isInView || prefersReducedMotion) return;
    const id = setInterval(
      () => setActive((n) => (n + 1) % pipelineNodes.length),
      480
    );
    return () => clearInterval(id);
  }, [isInView, prefersReducedMotion]);

  return (
    <div ref={ref} className="mt-10 flex flex-col gap-0">
      {pipelineNodes.map((node, i) => {
        const isActive = active === i;
        const isPast = i < active;
        return (
          <div key={node.label} className="relative flex items-start gap-4">
            {i < pipelineNodes.length - 1 && (
              <div
                aria-hidden="true"
                className="absolute left-[11px] top-6 h-full w-0.5 transition-colors duration-300"
                style={{
                  background: isPast
                    ? "var(--accent)"
                    : "rgba(255,255,255,0.07)",
                }}
              />
            )}
            <div className="relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center">
              <div
                className="h-3 w-3 rounded-full transition-all duration-300"
                style={{
                  background: isActive
                    ? "var(--accent)"
                    : isPast
                    ? "rgba(237,40,48,0.55)"
                    : "rgba(255,255,255,0.12)",
                  transform: isActive ? "scale(1.5)" : "scale(1)",
                }}
              />
              {isActive && !prefersReducedMotion && (
                <motion.div
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 2.8, opacity: 0 }}
                  transition={{ duration: 0.55, ease: "easeOut" }}
                  className="absolute h-3 w-3 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
              )}
            </div>
            <div className="pb-5">
              <p
                className="font-heading text-sm font-bold uppercase tracking-tight transition-colors duration-300"
                style={{
                  color: isActive
                    ? "var(--accent)"
                    : isPast
                    ? "rgba(255,255,255,0.45)"
                    : "rgba(255,255,255,0.2)",
                }}
              >
                {node.label}
              </p>
              <AnimatePresence>
                {isActive && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.22 }}
                    className="mt-0.5 text-xs leading-5 text-white/30"
                  >
                    {node.detail}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Performance Stack (5-phase tabs) ────────────────────────────────────────

const stackPhases = [
  {
    num: "01",
    label: "Track",
    headline: "Build the foundation first.",
    body: "You cannot optimize what you cannot measure. Before any campaign launches, we ensure every event, conversion, and signal is captured accurately.",
    items: [
      "Google Tag Manager",
      "GA4 Ecommerce",
      "Meta Pixel + CAPI",
      "Google Ads Conversions",
      "Enhanced Conversions",
      "Server-Side GTM",
      "Purchase Event Tracking",
      "UTM Architecture",
      "Event Deduplication",
    ],
  },
  {
    num: "02",
    label: "Understand",
    headline: "Data without insight is noise.",
    body: "Raw data tells you what happened. Analysis tells you why. We build the reporting layer that turns your numbers into decisions.",
    items: [
      "Multi-touch Attribution",
      "Customer Journey Mapping",
      "Funnel Analysis",
      "Cohort Analysis",
      "Audience Behaviour",
      "Channel Performance",
      "Product-Level Performance",
      "CAC by Segment",
    ],
  },
  {
    num: "03",
    label: "Acquire",
    headline: "Reach the right people, at the right cost.",
    body: "Platform strategy, audience architecture, and media buying optimized around your CAC target and margin structure not just click-through rates.",
    items: [
      "Meta Ads (Prospecting + Retargeting)",
      "Google Shopping",
      "Performance Max",
      "YouTube Ads",
      "Search Campaigns",
      "Catalog Ads",
      "Advantage+ Shopping",
      "Audience Strategy",
      "Budget Allocation",
    ],
  },
  {
    num: "04",
    label: "Convert",
    headline: "Traffic is worthless if the site doesn't convert.",
    body: "We audit and improve the entire conversion path from landing page to checkout because your ROAS is only as good as your CVR.",
    items: [
      "Landing Page Optimization",
      "Product Page CRO",
      "Mobile UX Audit",
      "Page Speed Optimization",
      "Offer Strategy",
      "Social Proof Integration",
      "Checkout Flow Optimization",
      "Cart Recovery",
    ],
  },
  {
    num: "05",
    label: "Scale",
    headline: "Scale what the data shows is working.",
    body: "Once the system is working, we expand systematically. New creatives, new audiences, broader budgets all informed by the performance data we've built.",
    items: [
      "Creative Testing & Iteration",
      "Audience Expansion",
      "Budget Scaling Framework",
      "Reporting & Dashboards",
      "Automation",
      "Cross-Channel Optimization",
      "LTV-based Bidding",
      "Ongoing Optimization",
    ],
  },
];

function PerformanceStack() {
  const [active, setActive] = useState(0);
  const phase = stackPhases[active];

  return (
    <div className="mt-10">
      <div className="flex gap-1.5 overflow-x-auto pb-1.5">
        {stackPhases.map((p, i) => (
          <button
            key={p.num}
            type="button"
            onClick={() => setActive(i)}
            className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold uppercase tracking-tight transition-all duration-250 ${
              active === i
                ? "border-[var(--accent)] bg-[var(--accent)]/10 text-white"
                : "border-white/10 text-white/38 hover:border-white/22 hover:text-white/55"
            }`}
          >
            <span className="text-[11px] tabular-nums text-white/28">
              {p.num}
            </span>
            {p.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.32, ease: EASE }}
          className="mt-5 rounded-2xl border border-white/8 bg-white/[0.03] p-6 sm:p-8"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            Phase {phase.num}
          </p>
          <h3 className="mt-2 font-heading text-2xl font-bold text-white sm:text-3xl">
            {phase.headline}
          </h3>
          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-white/45">
            {phase.body}
          </p>
          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {phase.items.map((it) => (
              <div
                key={it}
                className="flex items-center gap-2 rounded-lg border border-white/6 bg-white/[0.03] px-3 py-2.5"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                />
                <span className="text-[13px] text-white/55">{it}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── D2C Funnel ───────────────────────────────────────────────────────────────

const funnelStages = [
  {
    label: "Discovery",
    measure: ["Reach", "CPM", "Frequency", "Impressions"],
    optimize: "Audience targeting, creative hooks, platform and format selection",
    risk: "Wrong audience segments, weak creative, poor platform-format fit",
  },
  {
    label: "Ad Impression",
    measure: ["CTR", "CPC", "Hook Rate", "Thumb-Stop Rate"],
    optimize: "Ad creative, copy, offer framing, visual format",
    risk: "Low CTR, ad fatigue, misleading or weak hook",
  },
  {
    label: "Click",
    measure: ["Landing Page CVR", "Bounce Rate", "Time to Engage"],
    optimize: "Landing page relevance, speed, message-to-ad match",
    risk: "Mismatch between ad promise and landing page experience",
  },
  {
    label: "Product View",
    measure: ["View-to-Cart Rate", "Time on Page", "Scroll Depth"],
    optimize: "Product imagery, copy, reviews, trust signals",
    risk: "Insufficient social proof, weak product presentation",
  },
  {
    label: "Add to Cart",
    measure: ["ATC Rate", "Cart Abandonment Rate"],
    optimize: "Pricing, urgency, bundle offers, free shipping threshold",
    risk: "Price sensitivity, no urgency, excessive friction",
  },
  {
    label: "Checkout",
    measure: ["Checkout Completion Rate", "Payment Success Rate"],
    optimize: "Checkout UX, payment options, trust at point of purchase",
    risk: "Complex checkout, limited payment methods, trust gaps",
  },
  {
    label: "Purchase",
    measure: ["CVR", "AOV", "CAC", "ROAS"],
    optimize: "Upsells, cross-sells, order confirmation experience",
    risk: "Low AOV, poor unit economics, unsustainable CAC",
  },
  {
    label: "Repeat Purchase",
    measure: ["LTV", "Repeat Rate", "Retention Rate", "MER"],
    optimize: "Email / WhatsApp retention flows, loyalty, re-engagement ads",
    risk: "One-time buyers, no post-purchase retention system",
  },
];

function D2CFunnel() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="mt-10 overflow-hidden rounded-2xl border border-white/8">
      {funnelStages.map((stage, i) => {
        const isOpen = active === i;
        const w = 100 - i * 8;

        return (
          <button
            key={stage.label}
            type="button"
            onClick={() => setActive(isOpen ? null : i)}
            aria-expanded={isOpen}
            className="relative w-full border-b border-white/6 text-left transition-colors duration-200 last:border-b-0 hover:bg-white/[0.04]"
          >
            <div
              aria-hidden="true"
              className="absolute left-0 top-0 h-full bg-[var(--accent)]/4 transition-all duration-500"
              style={{ width: `${w}%` }}
            />
            <div className="relative flex items-center gap-4 px-5 py-4 sm:px-8">
              <span className="font-heading text-[11px] font-bold tabular-nums text-white/22">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`flex-1 font-heading text-base font-bold uppercase tracking-tight transition-colors duration-200 sm:text-lg ${
                  isOpen ? "text-[var(--accent)]" : "text-white/65"
                }`}
              >
                {stage.label}
              </span>
              <PlusIcon open={isOpen} />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="relative overflow-hidden"
                >
                  <div className="grid gap-4 px-5 pb-6 pt-1 sm:grid-cols-3 sm:px-8">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
                        What We Measure
                      </p>
                      <ul className="mt-2 flex flex-col gap-1">
                        {stage.measure.map((m) => (
                          <li key={m} className="text-sm text-white/48">
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
                        What We Optimize
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/45">
                        {stage.optimize}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/22">
                        Common Risk
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/32">
                        {stage.risk}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        );
      })}
    </div>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const faqs = [
  {
    q: "What does a D2C marketing agency do?",
    a: "A D2C marketing agency plans, executes and optimises the entire paid growth system for direct-to-consumer brands. This includes building tracking infrastructure, running Meta Ads and Google Ads, producing and testing creative, optimising the conversion funnel, and reporting on business metrics like ROAS, CAC and MER — not just clicks. Unlike a general digital marketing agency, a D2C-focused agency understands the unit economics of ecommerce: margin structures, repeat purchase rates and payback periods.",
  },
  {
    q: "What is performance marketing?",
    a: "Performance marketing is a form of digital advertising where spend is tied to measurable business outcomes typically revenue, orders, leads or conversions. Every rupee spent is tracked against a specific result, not just reach or brand awareness.",
  },
  {
    q: "What is D2C performance marketing?",
    a: "D2C performance marketing refers to paid acquisition strategies built specifically for direct-to-consumer brands. It covers Meta Ads, Google Ads, tracking infrastructure, attribution, creative testing and conversion optimization all measured against ecommerce revenue metrics like ROAS, CAC and AOV.",
  },
  {
    q: "What is ROAS?",
    a: "ROAS (Return on Ad Spend) is the revenue attributed to advertising divided by what you spent on advertising. A ROAS of 3× means ₹3 in attributed revenue for every ₹1 spent. Platform-reported ROAS and blended ROAS can differ significantly depending on attribution windows and models.",
  },
  {
    q: "Is ROAS enough to measure performance?",
    a: "No. ROAS is a useful signal but an incomplete picture. A brand with 4× ROAS can be less profitable than one with 3× ROAS if margins, CAC and LTV differ. We look at ROAS alongside MER, contribution margin and repeat purchase rate to understand true business performance.",
  },
  {
    q: "What is MER?",
    a: "MER (Marketing Efficiency Ratio) is total revenue divided by total marketing spend across all channels. Unlike platform ROAS, MER is a blended view of media efficiency that isn't distorted by attribution window differences between platforms. It's a more reliable top-level performance signal.",
  },
  {
    q: "What is CAC?",
    a: "CAC (Customer Acquisition Cost) is the total spend required to acquire one paying customer. A sustainable business needs a CAC that allows for profitable payback within an acceptable timeframe given LTV and gross margins. Optimizing CAC without understanding LTV often leads to the wrong decisions.",
  },
  {
    q: "What is server-side tracking?",
    a: "Server-side tracking sends conversion events directly from your server (or a server-side tag manager) to ad platforms, rather than relying entirely on browser-based JavaScript. This can improve measurement signal when browsers block or limit client-side scripts. It does not guarantee 100% tracking accuracy.",
  },
  {
    q: "What is Meta Conversions API (CAPI)?",
    a: "Meta Conversions API is a server-side integration that lets you send web events directly from your server to Meta's platform, supplementing browser-based Pixel events. When implemented with event deduplication using Event IDs, it can improve signal quality for Meta's ad delivery and attribution.",
  },
  {
    q: "What is the difference between Meta Pixel and CAPI?",
    a: "The Meta Pixel fires from the visitor's browser using JavaScript. CAPI fires from your server. Both can send the same event (e.g. Purchase). Deduplication via a shared Event ID prevents the same conversion being counted twice when both fire for the same event.",
  },
  {
    q: "What is Google Enhanced Conversions?",
    a: "Google Enhanced Conversions supplements existing conversion tags by securely hashing and sending first-party customer data (email, phone number) to Google when a conversion occurs. This can improve conversion measurement accuracy, particularly in cookieless environments.",
  },
  {
    q: "What is attribution in performance marketing?",
    a: "Attribution is the process of assigning credit to marketing touchpoints that contributed to a conversion. Last-click gives all credit to the final touchpoint. Data-driven attribution distributes credit across multiple touchpoints. No attribution model is perfectly accurate the goal is to use consistent measurement to inform better allocation decisions.",
  },
  {
    q: "Can you guarantee ROAS?",
    a: "No. Any agency that guarantees a specific ROAS is not being accurate. Ad performance depends on variables including your product, pricing, margins, website conversion rate, creative quality, market conditions and seasonality. We build measurement systems and optimize continuously, but we do not promise specific outcomes.",
  },
  {
    q: "How much should a D2C brand spend on ads?",
    a: "This depends on your CAC target, margins, LTV and growth objectives. A useful starting point: determine your maximum allowable CAC based on margin and payback period, then test at a scale where you can gather statistically meaningful signal typically a minimum of ₹50,000–₹1,00,000/month to draw useful conclusions.",
  },
  {
    q: "How long does performance marketing take to optimize?",
    a: "Most campaigns need 4–8 weeks to exit the learning phase and generate actionable data. The first month focuses on tracking setup, campaign structure and baseline measurement. Months 2–3 yield the first real insights on creative, audience and funnel performance. Meaningful ROAS improvements typically require 2–3 months of consistent work.",
  },
  {
    q: "How does GA4 fit into performance marketing?",
    a: "GA4 provides session-level analytics, funnel data, audience behaviour and ecommerce event tracking. It complements platform-reported data from Meta and Google Ads by giving a more complete view of the customer journey. GA4 uses a different attribution model than ad platforms, so numbers will often differ both views are useful for decision-making.",
  },
];

function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="mt-10 divide-y divide-black/8">
      {faqs.map((faq, i) => (
        <div key={i}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="flex w-full items-center justify-between gap-4 py-5 text-left"
          >
            <span className="font-heading text-[15px] font-bold leading-snug text-black sm:text-base">
              {faq.q}
            </span>
            <PlusIcon open={open === i} />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.32, ease: EASE }}
                className="overflow-hidden"
              >
                <p className="pb-5 text-[15px] leading-7 text-black/58">
                  {faq.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// ─── JSON-LD ──────────────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://sarvopaya.com/services/performance-marketing",
      name: "D2C Marketing Agency — Performance Marketing for D2C Brands",
      description:
        "Sarvopaya is a D2C marketing agency in India. We build performance marketing systems for direct-to-consumer brands — tracking infrastructure, Meta Ads, Google Ads, creative testing, attribution and revenue optimization.",
      provider: { "@type": "Organization", name: "Sarvopaya", url: "https://sarvopaya.com" },
      serviceType: "D2C Marketing Agency",
      areaServed: "India",
      keywords: "D2C marketing agency, performance marketing for D2C brands, direct to consumer marketing India, Meta Ads, Google Ads, ROAS, CAC",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://sarvopaya.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: "https://sarvopaya.com/services",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Performance Marketing",
          item: "https://sarvopaya.com/services/performance-marketing",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PerformanceMarketing() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── 01 HERO ────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-black pb-20 pt-28 sm:pb-28 sm:pt-36">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.028) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.028) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%,rgba(237,40,48,0.07) 0%,transparent 65%)",
          }}
        />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>D2C Marketing Agency</SectionLabel>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-7 font-heading text-4xl font-black leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              D2C Marketing Agency Built Around Business Outcomes.
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-7 max-w-2xl text-lg leading-8 text-white/50 sm:text-xl"
            >
              As a D2C marketing agency, we build the tracking layer, buy media
              with precision, test creative at volume, and optimize every stage
              of your funnel — because &ldquo;good ROAS&rdquo; means nothing
              without good data.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap gap-3"
            >
              <CTAButton href="/contact" variant="primary" size="lg">
                Get a Performance Audit
              </CTAButton>
              <CTAButton href="/contact" variant="outline" size="lg">
                Talk to a Growth Strategist
              </CTAButton>
            </motion.div>
          </motion.div>

          <RevenueEngine />
        </div>
      </section>

      {/* ── 02 VANITY VS BUSINESS METRICS ──────────────────────────────── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-2xl"
          >
            <SectionLabel light>What We Optimize</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              Don&apos;t Optimize for Clicks.
              <br />
              Optimize for Revenue.
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-5 text-lg leading-8 text-black/55"
            >
              Most agencies report on the metrics that make their dashboards
              look good. We report on the metrics that make your business grow.
            </motion.p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 overflow-hidden rounded-2xl border border-black/8"
          >
            <div className="grid grid-cols-2 border-b border-black/8 bg-black/[0.02] px-6 py-4 sm:px-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/35">
                Vanity Metrics
              </p>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                Business Metrics
              </p>
            </div>
            {[
              ["Clicks", "Revenue"],
              ["Impressions", "Orders"],
              ["Reach", "CAC"],
              ["CPC", "MER"],
              ["CTR", "LTV"],
              ["Platform ROAS", "Contribution Margin"],
              ["Followers", "Repeat Purchase Rate"],
              ["Engagement Rate", "Payback Period"],
            ].map(([vanity, biz], i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="grid grid-cols-2 border-b border-black/5 last:border-b-0"
              >
                <div className="px-6 py-3.5 sm:px-8">
                  <span className="text-[15px] text-black/35 line-through">
                    {vanity}
                  </span>
                </div>
                <div className="px-6 py-3.5 sm:px-8">
                  <span className="text-[15px] font-semibold text-black">
                    {biz}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 03 PERFORMANCE STACK ───────────────────────────────────────── */}
      <section className="bg-black py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <SectionLabel>The System</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl"
            >
              The Performance Stack
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-5 max-w-2xl text-lg leading-8 text-white/45"
            >
              Five phases. One system. Built in sequence, because the order
              matters.
            </motion.p>
          </motion.div>

          <PerformanceStack />
        </div>
      </section>

      {/* ── 04 TRACKING FOUNDATION ─────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-2">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <SectionLabel light>Tracking & Measurement</SectionLabel>
              <motion.h2
                variants={item}
                className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
              >
                If the Data Is Wrong, Everything Downstream Is Wrong.
              </motion.h2>
              <motion.p
                variants={item}
                className="mt-5 text-lg leading-8 text-black/55"
              >
                Tracking isn&apos;t setup once and forgotten. It&apos;s the
                infrastructure your entire performance system depends on. Broken
                events mean broken attribution. Broken attribution means broken
                decisions.
              </motion.p>
              <motion.p
                variants={item}
                className="mt-4 text-[15px] leading-7 text-black/48"
              >
                Before any campaign goes live, we audit your existing tracking,
                rebuild what&apos;s broken, and put in place the event
                architecture that makes every platform&apos;s data trustworthy.
              </motion.p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-2 gap-3 content-start"
            >
              {[
                {
                  icon: <GearIcon className="h-5 w-5" />,
                  title: "Google Tag Manager",
                  desc: "Container setup, triggers, custom events",
                },
                {
                  icon: <ChartIcon className="h-5 w-5" />,
                  title: "GA4 Ecommerce",
                  desc: "Full purchase funnel event tracking",
                },
                {
                  icon: <MonitorIcon className="h-5 w-5" />,
                  title: "Meta Pixel + CAPI",
                  desc: "Pixel implementation with Conversions API",
                },
                {
                  icon: <TargetIcon className="h-5 w-5" />,
                  title: "Google Ads Conversions",
                  desc: "Tag-based + Enhanced Conversions",
                },
                {
                  icon: <BoltIcon className="h-5 w-5" />,
                  title: "Server-Side GTM",
                  desc: "Event forwarding via GTM server container",
                },
                {
                  icon: <RocketIcon className="h-5 w-5" />,
                  title: "UTM Architecture",
                  desc: "Consistent campaign taxonomy at source",
                },
              ].map(({ icon, title, desc }) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  className="rounded-xl border border-black/8 bg-black/[0.02] p-4"
                >
                  <div className="mb-3 text-[var(--accent)]">{icon}</div>
                  <p className="font-heading text-sm font-bold text-black">
                    {title}
                  </p>
                  <p className="mt-1 text-[13px] leading-5 text-black/50">
                    {desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 05 SERVER-SIDE TRACKING + DATA PIPELINE ────────────────────── */}
      <section className="bg-black py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_360px]">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <SectionLabel>Server-Side Tracking</SectionLabel>
              <motion.h2
                variants={item}
                className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl"
              >
                Your Data Shouldn&apos;t Depend on a Browser.
              </motion.h2>
              <motion.p
                variants={item}
                className="mt-5 text-lg leading-8 text-white/45"
              >
                Browser-based tracking has limits. Ad blockers, ITP, browser
                restrictions all reduce the signal your platforms rely on to
                optimize delivery and report results.
              </motion.p>
              <motion.p
                variants={item}
                className="mt-4 text-[15px] leading-7 text-white/38"
              >
                Server-side tracking sends events from your infrastructure
                directly to Meta, Google and GA4 bypassing the browser layer
                entirely. Combined with proper event deduplication, this can
                improve the quality and completeness of your measurement signal.
              </motion.p>

              <motion.div
                variants={item}
                className="mt-8 grid gap-3 sm:grid-cols-3"
              >
                {[
                  {
                    label: "Meta Conversions API",
                    desc: "Server event forwarding to Meta",
                  },
                  {
                    label: "Google Enhanced Conversions",
                    desc: "First-party data to Google Ads",
                  },
                  {
                    label: "GTM Server Container",
                    desc: "Central server-side tag management",
                  },
                ].map(({ label, desc }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/8 bg-white/[0.03] p-4"
                  >
                    <p className="text-sm font-bold text-white/75">{label}</p>
                    <p className="mt-1 text-[13px] text-white/35">{desc}</p>
                  </div>
                ))}
              </motion.div>

              <motion.p
                variants={item}
                className="mt-6 text-[12px] text-white/22"
              >
                Server-side tracking supplements but does not replace client-side
                measurement. It does not guarantee 100% data accuracy.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/28">
                Data Flow
              </p>
              <DataPipeline />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 06 TOOL ECOSYSTEM (animated marquee) ───────────────────────── */}
      <section className="overflow-hidden bg-black py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-2xl"
          >
            <SectionLabel>The Performance Stack</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl"
            >
              Every Tool, Working Together.
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-4 text-lg leading-8 text-white/42"
            >
              The technology ecosystem behind a performance-led D2C brand from
              tracking infrastructure to media platforms to analytics and CRO.
            </motion.p>
          </motion.div>
        </div>

        {/* Category legend */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          className="mx-auto mt-10 flex max-w-5xl flex-wrap gap-4 px-4 sm:px-6 lg:px-8"
        >
          {[
            { label: "Tracking & Measurement", color: "#ed2830" },
            { label: "Paid Media Platforms", color: "#3b82f6" },
            { label: "Analytics & Reporting", color: "#22c55e" },
            { label: "Ecommerce & CRO", color: "#a855f7" },
          ].map(({ label, color }) => (
            <div key={label} className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full"
                style={{ background: color }}
              />
              <span className="text-[12px] text-white/38">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Animated rows */}
        <div className="relative mt-10 flex flex-col gap-3">
          {/* Fade edges */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 sm:w-32"
            style={{ background: "linear-gradient(to right, #000 0%, transparent 100%)" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 sm:w-32"
            style={{ background: "linear-gradient(to left, #000 0%, transparent 100%)" }}
          />

          {/* Row 1 Tracking (→ 32s) */}
          <div className="flex w-max animate-marquee items-center gap-3">
            {[...Array(2)].flatMap(() =>
              [
                { name: "Google Tag Manager", color: "#ed2830" },
                { name: "Meta Pixel", color: "#ed2830" },
                { name: "GA4 Ecommerce", color: "#ed2830" },
                { name: "Meta Conversions API", color: "#ed2830" },
                { name: "GTM Server Container", color: "#ed2830" },
                { name: "Google Ads Conversions", color: "#ed2830" },
                { name: "Enhanced Conversions", color: "#ed2830" },
                { name: "Event Deduplication", color: "#ed2830" },
                { name: "UTM Architecture", color: "#ed2830" },
                { name: "Data Layer", color: "#ed2830" },
                { name: "Server-Side GTM", color: "#ed2830" },
                { name: "Purchase Event Tracking", color: "#ed2830" },
              ].map((tool, i) => (
                <div
                  key={`r1-${tool.name}-${i}`}
                  className="flex shrink-0 items-center gap-2.5 rounded-full border border-white/8 bg-white/[0.04] px-4 py-2"
                >
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: tool.color, boxShadow: `0 0 6px ${tool.color}80` }}
                  />
                  <span className="text-[13px] font-medium text-white/65">
                    {tool.name}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Row 2 Paid Media (← 26s) */}
          <div className="flex w-max animate-marquee-r items-center gap-3">
            {[...Array(2)].flatMap(() =>
              [
                { name: "Meta Ads Manager", color: "#3b82f6" },
                { name: "Google Shopping", color: "#3b82f6" },
                { name: "Performance Max", color: "#3b82f6" },
                { name: "YouTube Ads", color: "#3b82f6" },
                { name: "Google Search Ads", color: "#3b82f6" },
                { name: "Advantage+ Shopping", color: "#3b82f6" },
                { name: "Dynamic Product Ads", color: "#3b82f6" },
                { name: "Retargeting Campaigns", color: "#3b82f6" },
                { name: "Catalog Ads", color: "#3b82f6" },
                { name: "Prospecting", color: "#3b82f6" },
                { name: "Instagram Ads", color: "#3b82f6" },
                { name: "Facebook Ads", color: "#3b82f6" },
              ].map((tool, i) => (
                <div
                  key={`r2-${tool.name}-${i}`}
                  className="flex shrink-0 items-center gap-2.5 rounded-full border border-white/8 bg-white/[0.04] px-4 py-2"
                >
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: tool.color, boxShadow: `0 0 6px ${tool.color}80` }}
                  />
                  <span className="text-[13px] font-medium text-white/65">
                    {tool.name}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Row 3 Analytics & Reporting (→ 38s) */}
          <div className="flex w-max animate-marquee-s items-center gap-3">
            {[...Array(2)].flatMap(() =>
              [
                { name: "Looker Studio", color: "#22c55e" },
                { name: "BigQuery", color: "#22c55e" },
                { name: "GA4 Reporting", color: "#22c55e" },
                { name: "Custom Dashboards", color: "#22c55e" },
                { name: "Attribution Modelling", color: "#22c55e" },
                { name: "Cohort Analysis", color: "#22c55e" },
                { name: "MER Tracking", color: "#22c55e" },
                { name: "LTV Reporting", color: "#22c55e" },
                { name: "Funnel Analysis", color: "#22c55e" },
                { name: "Webhook Integrations", color: "#22c55e" },
                { name: "CAC Reporting", color: "#22c55e" },
                { name: "Blended ROAS", color: "#22c55e" },
              ].map((tool, i) => (
                <div
                  key={`r3-${tool.name}-${i}`}
                  className="flex shrink-0 items-center gap-2.5 rounded-full border border-white/8 bg-white/[0.04] px-4 py-2"
                >
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: tool.color, boxShadow: `0 0 6px ${tool.color}80` }}
                  />
                  <span className="text-[13px] font-medium text-white/65">
                    {tool.name}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Row 4 Ecommerce & CRO (← 34s) */}
          <div className="flex w-max animate-marquee-rs items-center gap-3">
            {[...Array(2)].flatMap(() =>
              [
                { name: "Shopify", color: "#a855f7" },
                { name: "WooCommerce", color: "#a855f7" },
                { name: "Klaviyo", color: "#a855f7" },
                { name: "Landing Pages", color: "#a855f7" },
                { name: "Checkout Optimization", color: "#a855f7" },
                { name: "A/B Testing", color: "#a855f7" },
                { name: "Page Speed Optimization", color: "#a855f7" },
                { name: "Product Feed Optimization", color: "#a855f7" },
                { name: "Cart Recovery", color: "#a855f7" },
                { name: "Email Retention Flows", color: "#a855f7" },
                { name: "CRO Audits", color: "#a855f7" },
                { name: "Mobile UX", color: "#a855f7" },
              ].map((tool, i) => (
                <div
                  key={`r4-${tool.name}-${i}`}
                  className="flex shrink-0 items-center gap-2.5 rounded-full border border-white/8 bg-white/[0.04] px-4 py-2"
                >
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: tool.color, boxShadow: `0 0 6px ${tool.color}80` }}
                  />
                  <span className="text-[13px] font-medium text-white/65">
                    {tool.name}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ── 07 D2C FUNNEL ──────────────────────────────────────────────── */}
      <section className="bg-black py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-2xl"
          >
            <SectionLabel>The D2C Funnel</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl"
            >
              Every Stage Is an Optimization Opportunity
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-5 text-lg leading-8 text-white/45"
            >
              We measure, optimize, and monitor every stage of the D2C customer
              journey. Select a stage to see what we track and where things go
              wrong.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          >
            <D2CFunnel />
          </motion.div>
        </div>
      </section>

      {/* ── 08 MEDIA BUYING ────────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-2xl"
          >
            <SectionLabel light>Media Buying</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              Media Bought Around Your Business Model, Not the Platform&apos;s.
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-5 text-lg leading-8 text-black/55"
            >
              Platform defaults are built to maximize platform revenue. We
              configure, segment and optimize campaigns around your margin
              targets and CAC goals.
            </motion.p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 grid gap-6 sm:grid-cols-2"
          >
            {[
              {
                icon: <MegaphoneIcon className="h-6 w-6" />,
                platform: "Meta Ads",
                sub: "Facebook · Instagram · Reels · Stories",
                items: [
                  "Prospecting campaigns (cold audiences)",
                  "Retargeting (product viewers, cart abandoners)",
                  "Advantage+ Shopping Campaigns",
                  "Dynamic Product Ads (Catalog)",
                  "Audience segmentation and exclusions",
                  "CAPI-integrated conversion tracking",
                  "Creative testing framework (A/B, multivariate)",
                  "Frequency and fatigue management",
                ],
              },
              {
                icon: <ChartIcon className="h-6 w-6" />,
                platform: "Google Ads",
                sub: "Shopping · Search · Performance Max · YouTube",
                items: [
                  "Google Shopping (Standard + Smart)",
                  "Performance Max campaigns",
                  "Branded and non-branded Search",
                  "YouTube pre-roll and in-feed ads",
                  "Product feed optimization",
                  "Audience signals for PMax",
                  "Enhanced Conversions setup",
                  "Bidding strategy aligned to CAC targets",
                ],
              },
            ].map(({ icon, platform, sub, items }) => (
              <motion.div
                key={platform}
                variants={fadeUp}
                className="rounded-2xl border border-black/8 bg-black/[0.02] p-6 sm:p-8"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="text-[var(--accent)]">{icon}</div>
                  <div>
                    <p className="font-heading text-lg font-bold text-black">
                      {platform}
                    </p>
                    <p className="text-[12px] text-black/40">{sub}</p>
                  </div>
                </div>
                <ul className="flex flex-col gap-2">
                  {items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                      />
                      <span className="text-[14px] leading-6 text-black/60">
                        {it}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 09 CREATIVE PERFORMANCE ────────────────────────────────────── */}
      <section className="bg-black py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-2xl"
          >
            <SectionLabel>Creative & Media</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl"
            >
              Creative Is the Variable That Moves the ROAS.
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-5 text-lg leading-8 text-white/45"
            >
              At scale, the biggest performance lever isn&apos;t budget it&apos;s
              creative. We build, test and iterate ad creatives with a data-first
              framework, not guesswork.
            </motion.p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {[
              {
                step: "01",
                label: "Hook",
                desc: "First 3 seconds. Thumb-stop. Pattern interrupt. Relevant to audience.",
              },
              {
                step: "02",
                label: "Problem",
                desc: "Surface the pain. Connect with the specific context of your customer.",
              },
              {
                step: "03",
                label: "Solution",
                desc: "Your product as the mechanism. Benefits, not features.",
              },
              {
                step: "04",
                label: "Proof",
                desc: "Social proof, UGC, reviews, demonstration. Trust at the moment of doubt.",
              },
            ].map(({ step, label, desc }) => (
              <motion.div
                key={step}
                variants={fadeUp}
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-6"
              >
                <p className="font-heading text-4xl font-black text-white/8">
                  {step}
                </p>
                <p className="mt-3 font-heading text-lg font-bold uppercase text-white/80">
                  {label}
                </p>
                <p className="mt-2 text-[13px] leading-6 text-white/38">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 10 CREATIVE TESTING ────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-2xl"
          >
            <SectionLabel light>Creative Testing</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              Test. Learn. Iterate. Don&apos;t Guess.
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-5 text-[17px] leading-8 text-black/55"
            >
              We run structured creative tests at the ad level not the
              campaign level to isolate variables and understand what drives
              performance improvements.
            </motion.p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 overflow-x-auto rounded-2xl border border-black/8"
          >
            <div className="min-w-[520px]">
            <div className="grid grid-cols-3 border-b border-black/8 bg-black/[0.02] px-6 py-4 sm:px-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/35">Variable</p>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/35">What We Test</p>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/35">We Measure</p>
            </div>
            {[
              ["Hook", "Static vs video vs UGC, first-frame imagery", "CTR, Hook Rate"],
              ["Headline", "Benefit-led vs problem-led vs social proof", "CTR, CVR"],
              ["Format", "Reels, Carousels, Single image, Stories", "CPM, CTR"],
              ["Offer", "Free shipping vs % off vs gift-with-purchase", "CVR, AOV"],
              ["CTA", "Shop Now vs Learn More vs Get Offer", "CTR, CVR"],
              ["Audience", "Broad vs LAL vs interest-based", "ROAS, CAC"],
              ["Landing Page", "Homepage vs PDP vs custom lander", "CVR, Bounce"],
            ].map(([variable, test, measure], i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="grid grid-cols-3 border-b border-black/5 last:border-b-0"
              >
                <div className="px-6 py-3.5 sm:px-8">
                  <span className="font-heading text-sm font-bold text-black/75">{variable}</span>
                </div>
                <div className="px-6 py-3.5 sm:px-8">
                  <span className="text-[13px] text-black/50">{test}</span>
                </div>
                <div className="px-6 py-3.5 sm:px-8">
                  <span className="text-[13px] font-medium text-[var(--accent)]">{measure}</span>
                </div>
              </motion.div>
            ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 11 CRO ─────────────────────────────────────────────────────── */}
      <section className="bg-black py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <SectionLabel>Conversion Rate Optimization</SectionLabel>
              <motion.h2
                variants={item}
                className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl"
              >
                Double Your CVR. Halve Your CAC. Without Touching Your Spend.
              </motion.h2>
              <motion.p
                variants={item}
                className="mt-5 text-lg leading-8 text-white/45"
              >
                A 1% to 2% CVR improvement on the same traffic doubles your
                orders without adding a rupee to your ad spend. CRO is the
                highest-leverage performance intervention available.
              </motion.p>
              <motion.div
                variants={item}
                className="mt-8 rounded-xl border border-white/8 bg-white/[0.03] p-5"
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/28">
                  Revenue Formula
                </p>
                <p className="mt-3 font-heading text-2xl font-bold text-white/80 sm:text-3xl">
                  Traffic × CVR × AOV = Revenue
                </p>
                <p className="mt-3 text-[13px] text-white/32">
                  Improving any one of these three variables grows revenue. We
                  optimize all three.
                </p>
              </motion.div>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="flex flex-col gap-3 content-start"
            >
              {[
                "Landing Page Audit and Redesign",
                "Product Page Conversion Optimization",
                "Mobile UX Review",
                "Page Speed Assessment",
                "Above-the-fold Messaging",
                "Social Proof and Trust Signal Integration",
                "Checkout Friction Reduction",
                "Cart Abandonment Flow",
                "Upsell and Cross-sell Strategy",
                "A/B Testing of Page Elements",
              ].map((it) => (
                <motion.div
                  key={it}
                  variants={fadeUp}
                  className="flex items-center gap-3 rounded-xl border border-white/6 bg-white/[0.03] px-4 py-3"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]"
                  />
                  <span className="text-[14px] text-white/55">{it}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 12 REVENUE ECONOMICS ───────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-2xl"
          >
            <SectionLabel light>Revenue Economics</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              High ROAS. Zero Profit. How That Happens.
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-5 text-lg leading-8 text-black/55"
            >
              ROAS doesn&apos;t account for returns, margins, platform fees, or
              fulfilment costs. We optimize for contribution margin the number
              that determines whether the business is actually profitable.
            </motion.p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 overflow-x-auto rounded-2xl border border-black/8"
          >
            <div className="min-w-[480px]">
            <div className="grid grid-cols-3 border-b border-black/8 bg-black/[0.02] px-6 py-4 sm:px-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/35">Metric</p>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/35">Brand A</p>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">Brand B</p>
            </div>
            {[
              ["Ad Spend", "₹2,00,000", "₹2,00,000"],
              ["Platform ROAS", "4.5×", "3.0×"],
              ["Revenue (attributed)", "₹9,00,000", "₹6,00,000"],
              ["Gross Margin", "25%", "55%"],
              ["Gross Profit", "₹2,25,000", "₹3,30,000"],
              ["Ad Spend", "−₹2,00,000", "−₹2,00,000"],
              ["Contribution Margin", "₹25,000 ✗", "₹1,30,000 ✓"],
            ].map(([metric, a, b], i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className={`grid grid-cols-3 border-b border-black/5 last:border-b-0 ${
                  i === 6 ? "bg-black/[0.025]" : ""
                }`}
              >
                <div className="px-6 py-3.5 sm:px-8">
                  <span className={`text-[14px] ${i === 6 ? "font-bold text-black" : "text-black/50"}`}>{metric}</span>
                </div>
                <div className="px-6 py-3.5 sm:px-8">
                  <span className={`text-[14px] ${i === 6 ? "font-bold text-black/50" : "text-black/55"}`}>{a}</span>
                </div>
                <div className="px-6 py-3.5 sm:px-8">
                  <span className={`text-[14px] ${i === 6 ? "font-bold text-[var(--accent)]" : "text-black/55"}`}>{b}</span>
                </div>
              </motion.div>
            ))}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-5 text-[12px] text-black/30"
          >
            Illustrative example. Actual results depend on your product category, return rates, fulfilment costs and margin structure.
          </motion.p>
        </div>
      </section>

      {/* ── 13 ROAS STATEMENT ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-black py-20 sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%,rgba(237,40,48,0.1) 0%,transparent 65%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--accent)]">
              On ROAS
            </p>
            <h2 className="mt-5 font-heading text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              ROAS is a Signal.
              <br />
              Not the Destination.
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/45">
              Platform-reported ROAS tells you what a platform attributed to
              itself. It doesn&apos;t tell you what your business actually made.
              MER, contribution margin, and LTV tell you that. We work with
              brands to build measurement frameworks that go beyond the
              dashboard.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 14 ATTRIBUTION ─────────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-2xl"
          >
            <SectionLabel light>Attribution</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              No Attribution Model Is Perfect. Most Ignore That Fact.
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-5 text-lg leading-8 text-black/55"
            >
              We work with multiple attribution perspectives to make better
              decisions not to find the number that makes our performance look
              best.
            </motion.p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 grid gap-5 sm:grid-cols-3"
          >
            {[
              {
                label: "Platform Attribution",
                description:
                  "What Meta and Google each claim. Useful for platform-level optimization, not cross-channel truth.",
                use: "Campaign-level bidding and budget allocation within a platform",
                caveat: "Platforms over-attribute to themselves; totals will exceed actual revenue",
              },
              {
                label: "MER (Blended)",
                description:
                  "Total revenue divided by total marketing spend. Channel-agnostic. The clearest top-level efficiency signal.",
                use: "Evaluating overall marketing efficiency week-over-week",
                caveat: "Doesn't tell you which channel to invest more in",
              },
              {
                label: "Incrementality Testing",
                description:
                  "Holdout tests that measure whether ads actually drove additional revenue vs what would have happened anyway.",
                use: "Measuring true causal impact of a channel or campaign",
                caveat: "Requires sufficient scale and test periods to produce statistically valid results",
              },
            ].map(({ label, description, use, caveat }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="flex flex-col rounded-2xl border border-black/8 bg-black/[0.02] p-6"
              >
                <p className="font-heading text-base font-bold text-black">
                  {label}
                </p>
                <p className="mt-3 flex-1 text-[14px] leading-6 text-black/55">
                  {description}
                </p>
                <div className="mt-4 space-y-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
                      Best For
                    </span>
                    <p className="mt-1 text-[13px] text-black/50">{use}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/30">
                      Limitation
                    </span>
                    <p className="mt-1 text-[13px] text-black/40">{caveat}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 15 DATA → DECISION LOOP ────────────────────────────────────── */}
      <section className="bg-black py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-2xl"
          >
            <SectionLabel>How We Operate</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl"
            >
              The Loop That Drives Compounding Performance
            </motion.h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 grid gap-4 sm:grid-cols-4"
          >
            {[
              {
                step: "01",
                label: "Collect",
                desc: "Clean tracking captures every event across every channel",
              },
              {
                step: "02",
                label: "Analyse",
                desc: "Data is processed into readable signals and performance patterns",
              },
              {
                step: "03",
                label: "Decide",
                desc: "Spend, creative, audience and CRO decisions made from evidence",
              },
              {
                step: "04",
                label: "Test",
                desc: "Changes implemented, results measured, loop begins again",
              },
            ].map(({ step, label, desc }, i) => (
              <motion.div
                key={step}
                variants={fadeUp}
                className="relative rounded-2xl border border-white/8 bg-white/[0.03] p-6"
              >
                {i < 3 && (
                  <div
                    aria-hidden="true"
                    className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-1/2 text-white/15 sm:block"
                  >
                    →
                  </div>
                )}
                <p className="font-heading text-4xl font-black text-white/7">
                  {step}
                </p>
                <p className="mt-3 font-heading text-lg font-bold uppercase text-white/75">
                  {label}
                </p>
                <p className="mt-2 text-[13px] leading-5 text-white/35">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 16 REPORTING & DASHBOARD ───────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-2xl"
          >
            <SectionLabel light>Reporting</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              A Dashboard Built for Decision-Making, Not Decoration.
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-5 text-lg leading-8 text-black/55"
            >
              Weekly reports organized around the metrics that drive action. No
              vanity numbers. No walls of charts. Just what you need to make the
              next decision.
            </motion.p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
          >
            {[
              { metric: "MER", label: "Marketing Efficiency Ratio" },
              { metric: "ROAS", label: "Per Platform & Campaign" },
              { metric: "CAC", label: "By Channel & Segment" },
              { metric: "AOV", label: "By Source & Campaign" },
              { metric: "CVR", label: "Funnel Stage Breakdown" },
              { metric: "CTR", label: "Per Ad, Format & Audience" },
              { metric: "CPM", label: "Platform Benchmarks" },
              { metric: "LTV", label: "Cohort-Level Tracking" },
              { metric: "Orders", label: "Revenue by Campaign" },
              { metric: "Spend", label: "Pacing & Budget View" },
              { metric: "CPC", label: "Efficiency by Placement" },
              { metric: "Repeat Rate", label: "Retention Overview" },
            ].map(({ metric, label }) => (
              <motion.div
                key={metric}
                variants={fadeUp}
                className="rounded-xl border border-black/7 bg-black/[0.02] p-4"
              >
                <p className="font-heading text-2xl font-black text-[var(--accent)]">
                  {metric}
                </p>
                <p className="mt-1 text-[12px] text-black/45">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 17 WHAT WE MANAGE ──────────────────────────────────────────── */}
      <section className="bg-black py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-2xl"
          >
            <SectionLabel>Scope of Work</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl"
            >
              What We Take Off Your Plate
            </motion.h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                icon: <GearIcon className="h-5 w-5" />,
                label: "Tracking & Measurement",
                items: ["GTM, GA4, Pixel, CAPI, Enhanced Conversions", "Server-side setup and maintenance", "Attribution framework and reporting"],
              },
              {
                icon: <MegaphoneIcon className="h-5 w-5" />,
                label: "Paid Media",
                items: ["Meta Ads full management", "Google Ads (Shopping, Search, PMax, YouTube)", "Budget pacing, bidding, campaign structure"],
              },
              {
                icon: <BoltIcon className="h-5 w-5" />,
                label: "Creative",
                items: ["Ad creative briefs and feedback", "Creative testing framework", "Performance creative iterations"],
              },
              {
                icon: <FunnelIcon className="h-5 w-5" />,
                label: "Funnel & CRO",
                items: ["Landing page review and optimization", "Checkout flow analysis", "Product page improvement recommendations"],
              },
              {
                icon: <ChartIcon className="h-5 w-5" />,
                label: "Reporting",
                items: ["Weekly performance reports", "Monthly business review decks", "Custom dashboards (Looker Studio / GA4)"],
              },
              {
                icon: <RocketIcon className="h-5 w-5" />,
                label: "Strategy & Growth",
                items: ["Channel strategy and budget allocation", "Audience and offer strategy", "Scaling frameworks as performance grows"],
              },
            ].map(({ icon, label, items }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-6"
              >
                <div className="mb-3 text-[var(--accent)]">{icon}</div>
                <p className="font-heading text-base font-bold text-white/80">
                  {label}
                </p>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {items.map((it) => (
                    <li key={it} className="flex items-start gap-2">
                      <span
                        aria-hidden="true"
                        className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-white/20"
                      />
                      <span className="text-[13px] leading-5 text-white/40">
                        {it}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 18 D2C GROWTH PROCESS ──────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-2xl"
          >
            <SectionLabel light>How We Work</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              From Onboarding to Ongoing Optimization
            </motion.h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 flex flex-col gap-4"
          >
            {[
              {
                num: "01",
                phase: "Audit",
                timeline: "Week 1",
                desc: "Full audit of existing tracking, campaigns, creative, and funnel. Baseline established. Gaps identified. Priorities set.",
              },
              {
                num: "02",
                phase: "Setup",
                timeline: "Weeks 2–3",
                desc: "Tracking rebuilt or verified. Campaign structure reviewed and restructured where needed. Creative brief developed based on audit findings.",
              },
              {
                num: "03",
                phase: "Launch",
                timeline: "Week 4",
                desc: "Campaigns activated with proper tracking verified pre-launch. Initial creative set live across Meta and Google.",
              },
              {
                num: "04",
                phase: "Learn",
                timeline: "Weeks 4–8",
                desc: "Gathering performance data. Campaigns exit learning phase. First creative tests in flight. Funnel data reviewed.",
              },
              {
                num: "05",
                phase: "Optimize",
                timeline: "Month 2–3",
                desc: "Actionable patterns emerge. Winning creatives scaled. Underperforming segments cut or restructured. CRO improvements actioned.",
              },
              {
                num: "06",
                phase: "Scale",
                timeline: "Month 3+",
                desc: "What's working gets more budget. New creative tests expand the winning playbook. Reporting tightened as the business grows.",
              },
            ].map(({ num, phase, timeline, desc }) => (
              <motion.div
                key={num}
                variants={fadeUp}
                className="grid gap-4 rounded-2xl border border-black/8 p-6 sm:grid-cols-[56px_120px_1fr] sm:items-start sm:gap-6 sm:p-7"
              >
                <span className="font-heading text-3xl font-black text-black/8">
                  {num}
                </span>
                <div>
                  <p className="font-heading text-lg font-bold uppercase tracking-tight text-black">
                    {phase}
                  </p>
                  <p className="text-[12px] text-[var(--accent)]">{timeline}</p>
                </div>
                <p className="text-[15px] leading-7 text-black/55">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 19 PERFORMANCE AUDIT CTA ───────────────────────────────────── */}
      <section className="relative overflow-hidden bg-black py-20 sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 55% at 50% 50%,rgba(237,40,48,0.12) 0%,transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.p
              variants={fadeUp}
              className="text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--accent)]"
            >
              Free Performance Audit
            </motion.p>
            <motion.h2
              variants={item}
              className="mt-5 font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Your Ad Spend Deserves Better Data.
            </motion.h2>
            <motion.p
              variants={item}
              className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/45"
            >
              We review your tracking setup, campaign structure, creative
              performance and funnel and tell you exactly where you&apos;re
              losing money. No pitch. Just findings.
            </motion.p>
            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <CTAButton href="/contact" variant="primary" size="lg">
                Get a Performance Audit
              </CTAButton>
              <CTAButton href="/contact" variant="outline" size="lg">
                Talk to a Growth Strategist
              </CTAButton>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
            >
              {[
                "Free no obligation",
                "Delivered within 5 business days",
                "Tracking + campaign + funnel review",
              ].map((pt) => (
                <div key={pt} className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
                  />
                  <span className="text-[13px] text-white/40">{pt}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 20 WHO IT'S FOR ────────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-2xl"
          >
            <SectionLabel light>Who It&apos;s For</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              Built for D2C Brands Ready to Own Their Performance Data
            </motion.h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                label: "D2C ecommerce brands on Shopify or WooCommerce",
                desc: "Product-led brands selling direct, looking to profitably scale paid acquisition",
              },
              {
                label: "Brands spending ₹50K/month or more on ads",
                desc: "At this scale, measurement gaps and inefficiencies cost real money",
              },
              {
                label: "Brands with broken or unreliable tracking",
                desc: "If your platform numbers don't add up, your decisions won't either",
              },
              {
                label: "D2C brands transitioning from brand to performance",
                desc: "Moving from awareness-first to revenue-first with the right infrastructure",
              },
              {
                label: "Brands frustrated with ROAS-only reporting",
                desc: "Ready to measure real business outcomes instead of platform attribution",
              },
              {
                label: "Brands scaling creative at volume",
                desc: "Need a testing framework that tells you what to scale and what to cut",
              },
            ].map(({ label, desc }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="rounded-xl border border-black/8 bg-black/[0.02] p-5"
              >
                <p className="font-heading text-sm font-bold leading-5 text-black">
                  {label}
                </p>
                <p className="mt-2 text-[13px] leading-5 text-black/50">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 21 FAQ ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <SectionLabel light>FAQ</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              Questions About Performance Marketing
            </motion.h2>
          </motion.div>

          <FAQAccordion />
        </div>
      </section>

      {/* ── 22 FINAL CTA ───────────────────────────────────────────────── */}
      <section className="bg-black py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2
              variants={item}
              className="font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Stop Optimizing for
              <br />
              Platform Metrics.
            </motion.h2>
            <motion.p
              variants={item}
              className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/45"
            >
              Build the measurement infrastructure, media system, and creative
              engine your D2C brand needs to grow on actual numbers.
            </motion.p>
            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <CTAButton href="/contact" variant="primary" size="lg">
                Start With a Performance Audit
              </CTAButton>
              <CTAButton href="/services" variant="inverted" size="lg">
                Explore All Services
              </CTAButton>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
