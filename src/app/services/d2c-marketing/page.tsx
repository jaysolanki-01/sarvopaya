"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import CTAButton from "@/components/CTAButton";
import {
  ChartIcon,
  BoltIcon,
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

// ─── Platform Icons ───────────────────────────────────────────────────────────

function IcGoogle() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function IcMeta() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
    </svg>
  );
}

function IcInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="ig-g" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f09433"/>
          <stop offset="50%" stopColor="#dc2743"/>
          <stop offset="100%" stopColor="#bc1888"/>
        </linearGradient>
      </defs>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" fill="url(#ig-g)"/>
    </svg>
  );
}

function IcYouTube() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FF0000"/>
    </svg>
  );
}

function IcShopify() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.924 7.625a1.52 1.52 0 00-1.425-1.282c-.131-.01-.261-.018-.392-.025A6.027 6.027 0 0014.9 2.4a1.457 1.457 0 00-.07.003 1.46 1.46 0 00-.288-.002C13.818 2.183 13.07 2 12.235 2 9.69 2 8.44 4.945 8.044 6.471L5.86 7.147C5.33 7.312 5.3 7.343 5.23 7.858L3 22.5l14.3 2.5 4.624-1.179L20.924 7.625zM14.6 2.834c-.692.215-1.46.453-2.232.692.216-.832.628-1.657 1.12-2.196.189-.203.45-.428.76-.552.296.621.367 1.456.352 2.056zm-1.359-2.834c.246 0 .459.052.641.15-.296.154-.584.398-.847.69-.672.735-1.185 1.876-1.386 2.973-.51.158-1.011.316-1.498.466.355-1.207 1.343-4.279 3.09-4.279zm1.1 10.636l-2.244-.686s-.27.913-.733 1.808a5.785 5.785 0 01-.484.782 3.46 3.46 0 01-.594.625.47.47 0 01-.1.065c-.174.075-.344.06-.48-.11-.288-.354-.295-1.267.069-2.333.22-.637.624-1.32 1.094-1.853a3.9 3.9 0 011.248-.934l-.009-.025c-.135-.358-.49-.596-.876-.596-.165 0-.33.045-.48.133-.524.304-1.137 1.188-1.512 2.313-.49 1.47-.461 2.916.08 3.618.256.317.613.471.985.471.368 0 .756-.15 1.123-.402a5.14 5.14 0 00.874-.828c.272-.32.509-.686.698-1.072l.093.028z" fill="#96BF48"/>
    </svg>
  );
}

function IcWooCommerce() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="0" y="3" width="24" height="15" rx="3" fill="#7F54B3"/>
      <path d="M2 7.5c.17-.23.4-.33.7-.3.56.06.86.4.88 1.02.1 1.09-.46 2.3-.36 3.4 0 .3.13.45.4.45.3 0 .75-.26 1.35-.82.26-.26.46-.46.59-.62.03.2.1.49.13.85.03.46.16.68.36.68.13 0 .29-.1.49-.26.49-.46.85-1.19 1.14-2.13.1-.3.17-.52.2-.62-.1.46-.13 1-.1 1.44.1 1.48.49 2.26 1.14 2.3.46.03.82-.49 1.08-1.51l.33.79c.3.49.65.78 1.08.82.39.03.75-.16 1.08-.62.3-.4.52-.89.69-1.51-.43.2-.75.16-.95-.07-.13-.16-.16-.43-.1-.79.07-.43.3-.95.65-1.64.2-.36.3-.65.3-.95 0-.49-.26-.78-.75-.82-.36-.03-.69.16-.98.52-.16.23-.36.62-.52 1.18-.16.52-.26 1.04-.26 1.51-.29-.26-.55-.82-.75-1.67l-.1-.39c-.1-.33-.26-.49-.49-.49-.2 0-.36.13-.46.43-.26.82-.46 1.44-.65 1.84-.3.69-.62 1.02-.98 1.02-.26 0-.43-.36-.49-1.08-.03-.43.03-1.28.2-2.56.06-.49.03-.85-.16-1.11C3.17 7.07 2.93 7 2.63 7L2 7.5z" fill="white"/>
      <path d="M13 7.5c.17-.23.4-.33.7-.3.56.06.86.4.88 1.02.1 1.09-.46 2.3-.36 3.4 0 .3.13.45.4.45.3 0 .75-.26 1.35-.82.26-.26.46-.46.59-.62.03.2.1.49.13.85.03.46.16.68.36.68.13 0 .29-.1.49-.26.49-.46.85-1.19 1.14-2.13.1-.3.17-.52.2-.62-.1.46-.13 1-.1 1.44.1 1.48.49 2.26 1.14 2.3.46.03.82-.49 1.08-1.51l.33.79c.3.49.65.78 1.08.82.39.03.75-.16 1.08-.62.3-.4.52-.89.69-1.51-.43.2-.75.16-.95-.07-.13-.16-.16-.43-.1-.79.07-.43.3-.95.65-1.64.2-.36.3-.65.3-.95 0-.49-.26-.78-.75-.82-.36-.03-.69.16-.98.52-.16.23-.36.62-.52 1.18-.16.52-.26 1.04-.26 1.51-.29-.26-.55-.82-.75-1.67l-.1-.39c-.1-.33-.26-.49-.49-.49-.2 0-.36.13-.46.43-.26.82-.46 1.44-.65 1.84-.3.69-.62 1.02-.98 1.02-.26 0-.43-.36-.49-1.08-.03-.43.03-1.28.2-2.56.06-.49.03-.85-.16-1.11C14.17 7.07 13.93 7 13.63 7L13 7.5z" fill="white"/>
    </svg>
  );
}

function IcKlaviyo() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="3" fill="#231F20"/>
      <path d="M6.5 4.5h3v15h-3zm3 7.5 6-7.5h3.5l-6.5 8 6.5 7H15z" fill="white"/>
    </svg>
  );
}

function IcGTM() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.5L4 8v8l8 5.5 8-5.5V8L12 2.5z" fill="#8AB4F8"/>
      <path d="M12 7.5l-5 3v3l5 3 5-3v-3l-5-3z" fill="white" opacity="0.9"/>
      <circle cx="12" cy="12" r="2.5" fill="#4285F4"/>
    </svg>
  );
}

function IcGA4() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" fill="#E37400"/>
      <path d="M7 17V11h2.5v6H7zm3.75 0V7h2.5v10h-2.5zM14.5 17v-4H17v4h-2.5z" fill="white"/>
    </svg>
  );
}

function IcBigQuery() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#4285F4"/>
      <path d="M8 8h8v2H8zm0 3h8v2H8zm0 3h5v2H8z" fill="white"/>
      <path d="M15 15l3 3-1.5 1.5-3-3V15h1.5z" fill="#FBBC05"/>
    </svg>
  );
}

function IcLookerStudio() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#4285F4"/>
      <path d="M7 16V13l3-3 3 3 3-5v8H7z" fill="white"/>
      <circle cx="10" cy="10" r="1.5" fill="#FBBC05"/>
    </svg>
  );
}

function IcMetaPNG() {
  return (
    <span className="flex h-4 w-4 items-center justify-center overflow-hidden rounded-[3px] bg-white">
      <Image src="/images/logos/meta.png" alt="" width={12} height={12} className="h-3 w-3 object-contain" />
    </span>
  );
}

function IcGoogleAds() {
  return (
    <span className="flex h-4 w-4 items-center justify-center overflow-hidden rounded-[3px] bg-white">
      <Image src="/images/logos/google-ads.webp" alt="" width={12} height={12} className="h-3 w-3 object-contain" />
    </span>
  );
}

function IcGoogleAnalytics() {
  return (
    <span className="flex h-4 w-4 items-center justify-center overflow-hidden rounded-[3px] bg-white">
      <Image src="/images/logos/google-analytics.webp" alt="" width={12} height={12} className="h-3 w-3 object-contain" />
    </span>
  );
}

function IcClarity() {
  return (
    <span className="flex h-4 w-4 items-center justify-center overflow-hidden rounded-[3px] bg-white">
      <Image src="/images/logos/clarity.png" alt="" width={12} height={12} className="h-3 w-3 object-contain" />
    </span>
  );
}

function IcMerchantCenter() {
  return (
    <span className="flex h-4 w-4 items-center justify-center overflow-hidden rounded-[3px] bg-white">
      <Image src="/images/logos/merchant-center.png" alt="" width={12} height={12} className="h-3 w-3 object-contain" />
    </span>
  );
}

type MarqueeTool = { name: string; color: string; icon?: React.ReactNode };

function ToolChip({ tool }: { tool: MarqueeTool }) {
  return (
    <div className="flex shrink-0 items-center gap-2.5 rounded-full border border-white/8 bg-white/[0.04] px-4 py-2">
      {tool.icon ? (
        <span aria-hidden="true" className="shrink-0 flex h-4 w-4 items-center justify-center">
          {tool.icon}
        </span>
      ) : (
        <span
          aria-hidden="true"
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ background: tool.color, boxShadow: `0 0 6px ${tool.color}80` }}
        />
      )}
      <span className="text-[13px] font-medium text-white/65">{tool.name}</span>
    </div>
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
    a: "A D2C marketing agency plans, executes and optimises the entire paid growth system for direct-to-consumer brands. This includes building tracking infrastructure, running Meta Ads and Google Ads, producing and testing creative, optimising the conversion funnel, and reporting on business metrics like ROAS, CAC and MER, not just clicks. Unlike a general digital marketing agency, a D2C-focused agency understands the unit economics of ecommerce: margin structures, repeat purchase rates and payback periods.",
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
      "@type": "WebPage",
      "@id": "https://www.sarvopaya.com/services/d2c-marketing#webpage",
      url: "https://www.sarvopaya.com/services/d2c-marketing",
      name: "D2C Marketing Agency India | Performance Marketing Systems | Sarvopaya",
      description:
        "Full-funnel D2C marketing agency in India. We engineer server-side tracking, creative testing, multi-channel media buying, customer retention and measurable net revenue.",
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://www.sarvopaya.com/#website",
        name: "Sarvopaya",
        url: "https://www.sarvopaya.com",
      },
      breadcrumb: {
        "@id": "https://www.sarvopaya.com/services/d2c-marketing#breadcrumb",
      },
      inLanguage: "en-US",
      about: [
        { "@type": "Thing", name: "Direct-to-consumer", sameAs: "https://en.wikipedia.org/wiki/Direct-to-consumer" },
        { "@type": "Thing", name: "Performance marketing", sameAs: "https://en.wikipedia.org/wiki/Performance_marketing" },
        { "@type": "Thing", name: "Customer retention" },
        { "@type": "Thing", name: "Conversion rate optimization" },
      ],
      author: {
        "@type": "Person",
        "@id": "https://www.sarvopaya.com/about#jay-solanki",
        name: "Jay Solanki",
        jobTitle: "Founder & Growth Architect",
        url: "https://www.sarvopaya.com/about",
      },
      publisher: {
        "@type": "Organization",
        "@id": "https://www.sarvopaya.com/#organization",
        name: "Sarvopaya",
        url: "https://www.sarvopaya.com",
        logo: {
          "@type": "ImageObject",
          url: "https://www.sarvopaya.com/images/Logo_black.png",
        },
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://www.sarvopaya.com/images/Main_icon.png",
      },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["#speakable-summary", "#speakable-definition"],
      },
      significantLink: [
        "https://www.sarvopaya.com/customer-retention-d2c-marketing-guide",
        "https://www.sarvopaya.com/how-to-create-a-winning-d2c-marketing-strategy",
        "https://www.sarvopaya.com/d2c-marketing-channels-guide",
        "https://www.sarvopaya.com/services/advertising",
        "https://www.sarvopaya.com/services/Conversion-Rate-Optimisation",
      ],
    },
    {
      "@type": "Service",
      "@id": "https://www.sarvopaya.com/services/d2c-marketing#service",
      name: "D2C Marketing Agency & Performance Marketing",
      serviceType: "D2C Marketing Agency",
      category: "Digital Marketing & Ecommerce Growth",
      description:
        "Sarvopaya is a premier D2C marketing agency in India. We build performance marketing systems for direct-to-consumer brands: server-side tracking infrastructure (Meta CAPI & GA4), creative testing engines, Meta Ads, Google Ads, customer retention loops, and contribution margin optimization.",
      provider: {
        "@type": "Organization",
        "@id": "https://www.sarvopaya.com/#organization",
      },
      areaServed: [
        { "@type": "Country", name: "India" },
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "United Kingdom" },
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "Canada" },
        { "@type": "Country", name: "Australia" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "D2C Performance Marketing Deliverables",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Server-Side Tracking & Attribution (Meta CAPI & GA4)",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "High-Velocity Creative Testing Engine (15-30 assets/mo)",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Multi-Channel Media Buying (Meta, Google, YouTube, TikTok)",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "D2C Customer Retention & LTV Compounding",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "E-commerce Conversion Rate Optimization (CRO)",
            },
          },
        ],
      },
      offers: {
        "@type": "Offer",
        name: "Free D2C Growth & Unit Economics Audit",
        price: "0",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        url: "https://www.sarvopaya.com/contact",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "48",
        bestRating: "5",
        worstRating: "1",
      },
      review: [
        {
          "@type": "Review",
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          author: { "@type": "Person", name: "Vikram Mehta" },
          datePublished: "2026-08-14",
          reviewBody:
            "Sarvopaya overhauled our entire tracking stack with Meta CAPI and restructured our paid ad accounts. Our blended MER jumped from 2.4 to 4.1 within 90 days.",
        },
        {
          "@type": "Review",
          reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
          author: { "@type": "Person", name: "Ananya Sharma" },
          datePublished: "2026-09-22",
          reviewBody:
            "Their creative testing framework and discipline around contribution margin instead of fake vanity ROAS completely revolutionized how we allocate media budgets.",
        },
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.sarvopaya.com/#organization",
      name: "Sarvopaya",
      alternateName: "Sarvopaya Digital Growth Agency",
      url: "https://www.sarvopaya.com",
      logo: "https://www.sarvopaya.com/images/Logo_black.png",
      image: "https://www.sarvopaya.com/images/Main_icon.png",
      description:
        "Premier digital growth agency specializing in AI automation, performance marketing, SEO, and full-funnel D2C ecommerce scale.",
      email: "jay@sarvopaya.com",
      telephone: "+91-92655-03415",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "C-1102, PNTC, Times Of India Press Road, Vejalpur",
        addressLocality: "Ahmedabad",
        addressRegion: "Gujarat",
        postalCode: "380015",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 23.01106,
        longitude: 72.486887,
      },
      founder: {
        "@type": "Person",
        "@id": "https://www.sarvopaya.com/about#jay-solanki",
        name: "Jay Solanki",
      },
      sameAs: [
        "https://www.linkedin.com/company/sarvopaya",
        "https://twitter.com/sarvopaya",
        "https://www.instagram.com/sarvopaya",
      ],
    },
    {
      "@type": "Person",
      "@id": "https://www.sarvopaya.com/about#jay-solanki",
      name: "Jay Solanki",
      jobTitle: "Founder & Growth Architect",
      worksFor: {
        "@type": "Organization",
        "@id": "https://www.sarvopaya.com/#organization",
      },
      url: "https://www.sarvopaya.com/about",
      sameAs: [
        "https://www.sarvopaya.com/about",
        "https://www.sarvopaya.com/resources/founders-pov",
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.sarvopaya.com/services/d2c-marketing#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.sarvopaya.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: "https://www.sarvopaya.com/services",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "D2C Marketing Agency",
          item: "https://www.sarvopaya.com/services/d2c-marketing",
        },
      ],
    },
    {
      "@type": "HowTo",
      name: "How to Scale a Direct-to-Consumer (D2C) Brand with Sarvopaya",
      description:
        "A proven 4-phase D2C marketing framework to audit tracking, scale creative velocity, optimize paid media, and compound customer retention.",
      totalTime: "P90D",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Audit Tracking & Measurement Infrastructure",
          text: "Implement server-side tracking (Meta Conversions API, GA4, GTM Server) and clean event deduplication to eliminate tracking loss.",
          url: "https://www.sarvopaya.com/services/d2c-marketing#tracking-pipeline",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Deploy High-Velocity Creative Testing Engine",
          text: "Produce and iterate 15-30 modular ad creative variations (hook, problem, solution, proof) every month to counter creative fatigue.",
          url: "https://www.sarvopaya.com/services/d2c-marketing#creative-engine",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Scale Media Channels with Contribution Margin Discipline",
          text: "Allocate spend across Meta, Google Ads, and YouTube focusing on Blended MER and CM1 profitability rather than in-platform vanity ROAS.",
          url: "https://www.sarvopaya.com/services/d2c-marketing#revenue-economics",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Compound Customer Retention & Lifetime Value (LTV)",
          text: "Build automated post-purchase email, SMS, and WhatsApp lifecycle loops to generate repeat purchases at ₹0 additional CAC.",
          url: "https://www.sarvopaya.com/services/d2c-marketing#retention-strategy",
        },
      ],
    },
    {
      "@type": "SiteNavigationElement",
      name: "D2C Marketing Page Sitelinks",
      itemListElement: [
        {
          "@type": "SiteNavigationElement",
          name: "The Performance Stack",
          description: "Five-phase integrated system for scalable D2C acquisition.",
          url: "https://www.sarvopaya.com/services/d2c-marketing#performance-stack",
        },
        {
          "@type": "SiteNavigationElement",
          name: "Server-Side Tracking",
          description: "Robust Meta CAPI and GA4 first-party event architecture.",
          url: "https://www.sarvopaya.com/services/d2c-marketing#tracking-pipeline",
        },
        {
          "@type": "SiteNavigationElement",
          name: "Creative Testing Engine",
          description: "Data-driven creative framework moving ad account ROAS.",
          url: "https://www.sarvopaya.com/services/d2c-marketing#creative-engine",
        },
        {
          "@type": "SiteNavigationElement",
          name: "Revenue Economics & Contribution Margin",
          description: "Why high ROAS can yield zero profit and how to optimize true unit economics.",
          url: "https://www.sarvopaya.com/services/d2c-marketing#revenue-economics",
        },
        {
          "@type": "SiteNavigationElement",
          name: "D2C Customer Retention Strategy",
          description: "Unlocking 60%+ margins on repeat purchases at zero paid CAC.",
          url: "https://www.sarvopaya.com/services/d2c-marketing#retention-strategy",
        },
        {
          "@type": "SiteNavigationElement",
          name: "6-Phase Growth Process",
          description: "From day-one audit to aggressive quarter-two scaling.",
          url: "https://www.sarvopaya.com/services/d2c-marketing#growth-process",
        },
        {
          "@type": "SiteNavigationElement",
          name: "D2C Marketing FAQs",
          description: "Answers to questions on ROAS, CAC, CAPI, attribution, and budgets.",
          url: "https://www.sarvopaya.com/services/d2c-marketing#faqs",
        },
        {
          "@type": "SiteNavigationElement",
          name: "Free Performance Audit",
          description: "Uncover attribution leakage and creative bottlenecks.",
          url: "https://www.sarvopaya.com/services/d2c-marketing#audit",
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
            {/* Visual Semantic Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-white/45">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-white transition-colors">Services</Link>
              <span>/</span>
              <span className="text-[var(--accent)] font-medium" aria-current="page">D2C Marketing Agency</span>
            </nav>

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
              of your funnel, because &ldquo;good ROAS&rdquo; means nothing
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

      {/* ── QUICK SITELINKS & ON-PAGE JUMP NAVIGATION ──────────────────── */}
      <nav
        aria-label="D2C Marketing Table of Contents"
        className="sticky top-0 z-30 border-y border-white/8 bg-black/90 py-2.5 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-5xl items-center gap-1.5 overflow-x-auto px-4 no-scrollbar sm:justify-center">
          <span className="shrink-0 mr-1 text-[9px] font-black uppercase tracking-[0.25em] text-white/25">
            Jump to:
          </span>
          {[
            { href: "#why-sarvopaya", label: "Why Us" },
            { href: "#performance-stack", label: "Performance Stack" },
            { href: "#tracking-pipeline", label: "Tracking" },
            { href: "#creative-engine", label: "Creative Engine" },
            { href: "#revenue-economics", label: "Revenue Economics" },
            { href: "#retention-strategy", label: "Retention" },
            { href: "#growth-process", label: "Growth Process" },
            { href: "#faqs", label: "FAQs" },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="shrink-0 rounded-full border border-white/8 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold text-white/50 transition-all duration-200 hover:border-[var(--accent)]/60 hover:bg-[var(--accent)]/10 hover:text-white"
            >
              {label}
            </a>
          ))}
          <a
            href="#audit"
            className="shrink-0 rounded-full border border-[var(--accent)]/60 bg-[var(--accent)]/15 px-3 py-1 text-[11px] font-bold text-white transition-all duration-200 hover:bg-[var(--accent)]/25"
          >
            Free Audit →
          </a>
        </div>
      </nav>

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

      {/* ── WHY SARVOPAYA ──────────────────────────────────────────────── */}
      <section id="why-sarvopaya" className="bg-black py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="max-w-2xl"
          >
            <SectionLabel>The Difference</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl"
            >
              Why Sarvopaya for
              <br />
              Your D2C Brand.
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-5 text-lg leading-8 text-white/45"
            >
              Most agencies split tracking, media, and creative across
              different teams. We build one connected system where every layer
              feeds the next — so your spend compounds instead of leaking.
            </motion.p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              {
                num: "01",
                title: "D2C-Only Focus",
                body: "We work exclusively with direct-to-consumer brands. Every framework, benchmark, and playbook is built for ecommerce revenue — not lead gen, SaaS, or brand awareness.",
                accent: "from-[var(--accent)]/20 to-transparent",
                border: "border-[var(--accent)]/20",
              },
              {
                num: "02",
                title: "Tracking Before Spend",
                body: "We fix your measurement before we touch your media budget. Server-side events, deduplication, and GA4 ecommerce accuracy come first — so every rupee is tracked correctly.",
                accent: "from-blue-500/15 to-transparent",
                border: "border-blue-500/20",
              },
              {
                num: "03",
                title: "Creative at Scale",
                body: "Hooks, angles, and static + video variants shipped weekly. We test creative like a media buyer — structured, volume-driven, and tied directly to CPA and ROAS targets.",
                accent: "from-emerald-500/15 to-transparent",
                border: "border-emerald-500/20",
              },
              {
                num: "04",
                title: "MER Over Platform ROAS",
                body: "We report on Marketing Efficiency Ratio and contribution margin — not inflated in-platform numbers. If your overall business isn't growing, we tell you.",
                accent: "from-violet-500/15 to-transparent",
                border: "border-violet-500/20",
              },
              {
                num: "05",
                title: "Retention Built In",
                body: "Acquisition without retention is a leaking bucket. We build Klaviyo flows, post-purchase sequences, and LTV programmes alongside paid media — not as an afterthought.",
                accent: "from-amber-500/15 to-transparent",
                border: "border-amber-500/20",
              },
              {
                num: "06",
                title: "One Team, Full Stack",
                body: "No outsourcing, no silos. The person running your Meta account understands your GTM setup. The person building your reports reads the same P&L as you.",
                accent: "from-cyan-500/15 to-transparent",
                border: "border-cyan-500/20",
              },
            ].map(({ num, title, body, accent, border }) => (
              <motion.div
                key={num}
                variants={item}
                className={`group relative overflow-hidden rounded-2xl border ${border} bg-white/[0.03] p-6 transition-all duration-300 hover:bg-white/[0.055] hover:scale-[1.02]`}
              >
                <div className={`absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${accent} opacity-60`} />
                <div className="relative">
                  <span className="font-heading text-[11px] font-black tracking-[0.22em] text-white/18">
                    {num}
                  </span>
                  <h3 className="mt-3 font-heading text-lg font-black leading-snug text-white">
                    {title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-6 text-white/45">
                    {body}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom trust strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl border border-white/8 bg-white/[0.03] px-6 py-5"
          >
            {[
              "Meta Business Partner",
              "Google Partner",
              "D2C Brands Only",
              "No Lock-in Contracts",
              "Full Data Ownership",
            ].map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-2 text-[12px] font-semibold text-white/40"
              >
                <span className="h-1 w-1 rounded-full bg-[var(--accent)]/60" />
                {badge}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 03 PERFORMANCE STACK ───────────────────────────────────────── */}
      <section id="performance-stack" className="bg-black py-20 sm:py-28">
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
      <section id="tracking-pipeline" className="bg-black py-20 sm:py-28">
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

          {/* ── Analytics Dashboard Screenshots ──────────────────────── */}
          <div className="mt-20 sm:mt-24">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="mb-10 flex items-center gap-4"
            >
              <div className="h-px w-8 bg-[var(--accent)]/60" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--accent)]">
                Live Reporting
              </span>
              <div className="h-px flex-1 bg-white/8" />
            </motion.div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:items-start">
              {/* Card 1 — User Activity */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0 }}
                className="animate-float group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-transform duration-300 hover:scale-[1.03] hover:border-white/20 sm:mt-10"
                style={{ animationDelay: "0s" }}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.04] to-transparent" />
                <div className="relative p-1.5">
                  <Image
                    src="/images/analytics/ga4-activity.png"
                    alt="User activity over time – GA4 dashboard"
                    width={600}
                    height={400}
                    className="w-full rounded-xl opacity-90"
                  />
                </div>
                <div className="relative px-4 pb-4 pt-2.5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400/80">
                    User Activity
                  </p>
                  <p className="mt-0.5 text-[13px] text-white/40">
                    30-day rolling trend
                  </p>
                </div>
              </motion.div>

              {/* Card 2 — Audience */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.14 }}
                className="animate-float group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-transform duration-300 hover:scale-[1.03] hover:border-white/20"
                style={{ animationDelay: "1.4s" }}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.04] to-transparent" />
                <div className="relative p-1.5">
                  <Image
                    src="/images/analytics/ga4-users.png"
                    alt="Active and new users – GA4 dashboard"
                    width={600}
                    height={400}
                    className="w-full rounded-xl opacity-90"
                  />
                </div>
                <div className="relative px-4 pb-4 pt-2.5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400/80">
                    Audience
                  </p>
                  <p className="mt-0.5 text-[13px] text-white/40">
                    Active vs new users · 28s avg session
                  </p>
                </div>
              </motion.div>

              {/* Card 3 — Sessions */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.28 }}
                className="animate-float group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-transform duration-300 hover:scale-[1.03] hover:border-white/20 sm:mt-10"
                style={{ animationDelay: "2.8s" }}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-violet-500/[0.04] to-transparent" />
                <div className="relative p-1.5">
                  <Image
                    src="/images/analytics/ga4-sessions.png"
                    alt="Sessions and traffic channels – GA4 dashboard"
                    width={600}
                    height={400}
                    className="w-full rounded-xl opacity-90"
                  />
                </div>
                <div className="relative px-4 pb-4 pt-2.5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-400/80">
                    Sessions
                  </p>
                  <p className="mt-0.5 text-[13px] text-white/40">
                    Multi-channel traffic breakdown
                  </p>
                </div>
              </motion.div>
            </div>
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
            {([...Array(2)] as unknown[]).flatMap((_v, _a) =>
              ([
                { name: "Google Tag Manager", color: "#ed2830", icon: <IcGTM /> },
                { name: "Meta Pixel", color: "#ed2830", icon: <IcMetaPNG /> },
                { name: "GA4 Ecommerce", color: "#ed2830", icon: <IcGoogleAnalytics /> },
                { name: "Meta Conversions API", color: "#ed2830", icon: <IcMetaPNG /> },
                { name: "GTM Server Container", color: "#ed2830", icon: <IcGTM /> },
                { name: "Google Ads Conversions", color: "#ed2830", icon: <IcGoogleAds /> },
                { name: "Enhanced Conversions", color: "#ed2830", icon: <IcGoogleAds /> },
                { name: "Event Deduplication", color: "#ed2830" },
                { name: "UTM Architecture", color: "#ed2830" },
                { name: "Data Layer", color: "#ed2830" },
                { name: "Server-Side GTM", color: "#ed2830", icon: <IcGTM /> },
                { name: "Microsoft Clarity", color: "#ed2830", icon: <IcClarity /> },
              ] as MarqueeTool[]).map((tool, i) => (
                <ToolChip key={`r1-${tool.name}-${i}`} tool={tool} />
              ))
            )}
          </div>

          {/* Row 2 Paid Media (← 26s) */}
          <div className="flex w-max animate-marquee-r items-center gap-3">
            {([...Array(2)] as unknown[]).flatMap((_v, _a) =>
              ([
                { name: "Meta Ads Manager", color: "#3b82f6", icon: <IcMetaPNG /> },
                { name: "Google Shopping", color: "#3b82f6", icon: <IcGoogleAds /> },
                { name: "Performance Max", color: "#3b82f6", icon: <IcGoogleAds /> },
                { name: "YouTube Ads", color: "#3b82f6", icon: <IcYouTube /> },
                { name: "Google Search Ads", color: "#3b82f6", icon: <IcGoogleAds /> },
                { name: "Advantage+ Shopping", color: "#3b82f6", icon: <IcMetaPNG /> },
                { name: "Dynamic Product Ads", color: "#3b82f6", icon: <IcMetaPNG /> },
                { name: "Google Merchant Center", color: "#3b82f6", icon: <IcMerchantCenter /> },
                { name: "Retargeting Campaigns", color: "#3b82f6" },
                { name: "Catalog Ads", color: "#3b82f6" },
                { name: "Instagram Ads", color: "#3b82f6", icon: <IcInstagram /> },
                { name: "Facebook Ads", color: "#3b82f6", icon: <IcMetaPNG /> },
              ] as MarqueeTool[]).map((tool, i) => (
                <ToolChip key={`r2-${tool.name}-${i}`} tool={tool} />
              ))
            )}
          </div>

          {/* Row 3 Analytics & Reporting (→ 38s) */}
          <div className="flex w-max animate-marquee-s items-center gap-3">
            {([...Array(2)] as unknown[]).flatMap((_v, _a) =>
              ([
                { name: "Looker Studio", color: "#22c55e", icon: <IcLookerStudio /> },
                { name: "BigQuery", color: "#22c55e", icon: <IcBigQuery /> },
                { name: "GA4 Reporting", color: "#22c55e", icon: <IcGoogleAnalytics /> },
                { name: "Custom Dashboards", color: "#22c55e" },
                { name: "Attribution Modelling", color: "#22c55e" },
                { name: "Cohort Analysis", color: "#22c55e" },
                { name: "MER Tracking", color: "#22c55e" },
                { name: "LTV Reporting", color: "#22c55e" },
                { name: "Funnel Analysis", color: "#22c55e" },
                { name: "Webhook Integrations", color: "#22c55e" },
                { name: "CAC Reporting", color: "#22c55e" },
                { name: "Blended ROAS", color: "#22c55e" },
              ] as MarqueeTool[]).map((tool, i) => (
                <ToolChip key={`r3-${tool.name}-${i}`} tool={tool} />
              ))
            )}
          </div>

          {/* Row 4 Ecommerce & CRO (← 34s) */}
          <div className="flex w-max animate-marquee-rs items-center gap-3">
            {([...Array(2)] as unknown[]).flatMap((_v, _a) =>
              ([
                { name: "Shopify", color: "#a855f7", icon: <IcShopify /> },
                { name: "WooCommerce", color: "#a855f7", icon: <IcWooCommerce /> },
                { name: "Klaviyo", color: "#a855f7", icon: <IcKlaviyo /> },
                { name: "Landing Pages", color: "#a855f7" },
                { name: "Checkout Optimization", color: "#a855f7" },
                { name: "A/B Testing", color: "#a855f7" },
                { name: "Product Feed Optimization", color: "#a855f7" },
                { name: "Cart Recovery", color: "#a855f7" },
                { name: "Email Retention Flows", color: "#a855f7" },
                { name: "CRO Audits", color: "#a855f7" },
                { name: "Mobile UX", color: "#a855f7" },
                { name: "Google Merchant Center", color: "#a855f7", icon: <IcMerchantCenter /> },
              ] as MarqueeTool[]).map((tool, i) => (
                <ToolChip key={`r4-${tool.name}-${i}`} tool={tool} />
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
      <section id="creative-engine" className="bg-black py-20 sm:py-28">
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
                orders without adding a rupee to your ad spend. Through dedicated{" "}
                <Link
                  href="/services/Conversion-Rate-Optimisation"
                  className="text-[var(--accent)] underline underline-offset-2 hover:text-white transition-colors"
                >
                  Conversion Rate Optimisation (CRO)
                </Link>
                , we eliminate landing page friction, streamline mobile checkouts, and maximize revenue velocity.
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
      <section id="revenue-economics" className="bg-white py-20 sm:py-28">
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

      {/* ── 13B CUSTOMER RETENTION & LTV STRATEGY ───────────────────────── */}
      <section id="retention-strategy" className="relative overflow-hidden bg-black py-20 sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 50% at 50% 0%,rgba(237,40,48,0.09) 0%,transparent 65%)",
          }}
        />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl"
          >
            <SectionLabel>Customer Retention & LTV</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl"
            >
              The Second Order Is Where Profit Begins.
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-5 text-lg leading-8 text-white/50"
            >
              Cold ad auctions on Meta and Google grow more expensive every quarter. If your D2C brand relies solely on first-purchase margin, rising Customer Acquisition Costs (CAC) will inevitably compress your EBITDA. True scale happens when repeat purchases compound at <strong className="text-white font-semibold">₹0 incremental ad spend</strong>.
            </motion.p>
          </motion.div>

          {/* Retention Unit Economics Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 grid gap-4 sm:grid-cols-3"
          >
            {[
              {
                stat: "₹0 CAC",
                label: "Repeat Purchase Media Cost",
                desc: "Second and third transactions bypass paid ad auctions entirely, turning marketing expense into pure net contribution margin.",
              },
              {
                stat: "60%+",
                label: "Contribution Margin 3",
                desc: "While order #1 yields ~15–22% CM3 due to acquisition ad spend, repeat lifecycle orders expand contribution margin past 60%.",
              },
              {
                stat: "+42%",
                label: "Average 90-Day LTV Lift",
                desc: "Disciplined post-purchase cohort sequencing across WhatsApp, email, and SMS transforms one-time buyers into compounding annuities.",
              },
            ].map(({ stat, label, desc }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
              >
                <p className="font-heading text-3xl font-black text-[var(--accent)] sm:text-4xl">
                  {stat}
                </p>
                <p className="mt-2 font-heading text-sm font-bold uppercase tracking-wider text-white">
                  {label}
                </p>
                <p className="mt-2 text-[13px] leading-6 text-white/45">
                  {desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Strategic Knowledge Hub & Internal Links */}
          <div className="mt-14 rounded-2xl border border-white/10 bg-white/[0.02] p-7 sm:p-9 backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                  Topical Knowledge Hub
                </p>
                <h3 className="mt-1 font-heading text-2xl font-bold text-white">
                  Essential D2C Growth & Retention Frameworks
                </h3>
              </div>
              <p className="text-xs text-white/40">
                Curated by <Link href="/about" className="text-white hover:text-[var(--accent)] underline underline-offset-2 transition-colors">Jay Solanki</Link>, Founder & Growth Architect
              </p>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div className="flex flex-col justify-between rounded-xl border border-white/8 bg-black/40 p-5 hover:border-[var(--accent)]/40 transition-colors">
                <div>
                  <span className="inline-block rounded-full bg-[var(--accent)]/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                    Primary Guide
                  </span>
                  <h4 className="mt-3 font-heading text-base font-bold leading-snug text-white">
                    <Link
                      href="/customer-retention-d2c-marketing-guide"
                      className="hover:text-[var(--accent)] transition-colors"
                    >
                      Why Customer Retention Is Important for D2C Brands
                    </Link>
                  </h4>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/45">
                    How post-purchase automated sequences, cohort payback analysis, and retention economics protect your brand against rising ad auctions.
                  </p>
                </div>
                <Link
                  href="/customer-retention-d2c-marketing-guide"
                  className="mt-4 inline-flex items-center text-xs font-semibold text-[var(--accent)] hover:underline"
                >
                  Read Retention Guide &rarr;
                </Link>
              </div>

              <div className="flex flex-col justify-between rounded-xl border border-white/8 bg-black/40 p-5 hover:border-[var(--accent)]/40 transition-colors">
                <div>
                  <span className="inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/70">
                    Strategy Framework
                  </span>
                  <h4 className="mt-3 font-heading text-base font-bold leading-snug text-white">
                    <Link
                      href="/how-to-create-a-winning-d2c-marketing-strategy"
                      className="hover:text-[var(--accent)] transition-colors"
                    >
                      How to Create a Winning D2C Marketing Strategy for Your Brand
                    </Link>
                  </h4>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/45">
                    The end-to-end performance roadmap: calculating break-even ROAS, creative sprint cadences, and full-funnel media distribution.
                  </p>
                </div>
                <Link
                  href="/how-to-create-a-winning-d2c-marketing-strategy"
                  className="mt-4 inline-flex items-center text-xs font-semibold text-[var(--accent)] hover:underline"
                >
                  Explore Strategy Guide &rarr;
                </Link>
              </div>

              <div className="flex flex-col justify-between rounded-xl border border-white/8 bg-black/40 p-5 hover:border-[var(--accent)]/40 transition-colors">
                <div>
                  <span className="inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/70">
                    Channel Synergy
                  </span>
                  <h4 className="mt-3 font-heading text-base font-bold leading-snug text-white">
                    <Link
                      href="/d2c-marketing-channels-guide"
                      className="hover:text-[var(--accent)] transition-colors"
                    >
                      D2C Marketing Channels & Attribution Architecture
                    </Link>
                  </h4>
                  <p className="mt-2 text-[13px] leading-relaxed text-white/45">
                    How to balance Meta Ads, Google Performance Max, and YouTube alongside our <Link href="/services/advertising" className="text-white hover:text-[var(--accent)] underline underline-offset-2">paid advertising services</Link>.
                  </p>
                </div>
                <Link
                  href="/d2c-marketing-channels-guide"
                  className="mt-4 inline-flex items-center text-xs font-semibold text-[var(--accent)] hover:underline"
                >
                  View Channels Guide &rarr;
                </Link>
              </div>
            </div>
          </div>
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
      <section id="growth-process" className="bg-white py-20 sm:py-28">
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
      <section id="audit" className="relative overflow-hidden bg-black py-20 sm:py-28">
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
      <section id="faqs" className="bg-white py-20 sm:py-28">
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
