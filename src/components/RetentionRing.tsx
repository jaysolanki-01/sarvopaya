"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion } from "framer-motion";

const R = 130;
const CX = 160;
const CY = 160;
const CIRCUMFERENCE = 2 * Math.PI * R;

function useCounter(target: number, active: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return count;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function RetentionRing() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const count = useCounter(100, inView, 2400);

  /* Tick marks — 72 ticks every 5°, 4 majors at quarters */
  const ticks = Array.from({ length: 72 }, (_, i) => {
    const angleDeg = (i / 72) * 360 - 90;
    const rad = (angleDeg * Math.PI) / 180;
    const isQuarter = i % 18 === 0;
    const isMid = i % 6 === 0;
    const inner = R + (isQuarter ? 14 : isMid ? 10 : 7);
    const outer = R + 20;
    return {
      x1: CX + inner * Math.cos(rad),
      y1: CY + inner * Math.sin(rad),
      x2: CX + outer * Math.cos(rad),
      y2: CY + outer * Math.sin(rad),
      w: isQuarter ? 1.5 : 0.75,
      opacity: isQuarter ? 0.6 : isMid ? 0.3 : 0.12,
    };
  });

  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] py-24 sm:py-32">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 700px 500px at 50% 50%, rgba(232,200,122,0.07) 0%, transparent 70%)",
        }}
      />

      <div ref={ref} className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center">

        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#E8C87A]" />
          Proven Track Record
        </motion.span>

        {/* Ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          className="relative mt-12"
          style={{ width: 320, height: 320 }}
        >
          <svg viewBox="0 0 320 320" width="320" height="320" className="overflow-visible">
            <defs>
              <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F0D68A" />
                <stop offset="60%" stopColor="#E8C87A" />
                <stop offset="100%" stopColor="#C9A84C" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Track ring */}
            <circle
              cx={CX} cy={CY} r={R}
              fill="none"
              stroke="#1C1C1C"
              strokeWidth="1.5"
            />

            {/* Tick marks */}
            {ticks.map((t, i) => (
              <line
                key={i}
                x1={t.x1} y1={t.y1}
                x2={t.x2} y2={t.y2}
                stroke="#E8C87A"
                strokeWidth={t.w}
                opacity={t.opacity}
              />
            ))}

            {/* Animated arc — starts from 12 o'clock via rotate(-90) */}
            <motion.circle
              cx={CX} cy={CY} r={R}
              fill="none"
              stroke="url(#rg)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              transform={`rotate(-90, ${CX}, ${CY})`}
              filter="url(#glow)"
              initial={{ strokeDashoffset: CIRCUMFERENCE }}
              animate={inView ? { strokeDashoffset: 0 } : { strokeDashoffset: CIRCUMFERENCE }}
              transition={{ duration: 2.4, ease: [0.4, 0, 0.2, 1], delay: 0.25 }}
            />

            {/* Dot at the leading edge when complete */}
            {inView && (
              <motion.circle
                cx={CX}
                cy={CY - R}
                r="4"
                fill="#F0D68A"
                filter="url(#glow)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.6, duration: 0.4 }}
              />
            )}
          </svg>

          {/* Center content — HTML over SVG for proper font rendering */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="font-heading leading-none font-black text-[#E8C87A]"
              style={{ fontSize: 72 }}
            >
              {count}%
            </span>
            <span className="mt-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">
              Retention
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: EASE, delay: 0.55 }}
          className="mt-10 font-heading text-3xl font-bold text-white sm:text-4xl"
          style={{ textWrap: "balance" } as React.CSSProperties}
        >
          Every client stays. Every time.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.7 }}
          className="mt-4 max-w-md text-base leading-relaxed text-white/40"
        >
          Not because we lock them in — because the results make leaving pointless.
          Every client we&apos;ve taken on has stayed, renewed, or expanded.
        </motion.p>

        {/* Mini stats */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE, delay: 0.85 }}
          className="mt-10 flex gap-10 sm:gap-16"
        >
          {[
            { value: "0%",  label: "Churn Rate" },
            { value: "100%", label: "Renewals"  },
            { value: "9+",  label: "Active Clients" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1.5">
              <span className="font-heading text-2xl font-black text-[#E8C87A]">{s.value}</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
                {s.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
