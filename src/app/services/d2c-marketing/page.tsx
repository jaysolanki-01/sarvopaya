"use client";

import { useState, useRef, useEffect, createContext, useContext, type ReactElement } from "react";
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
import type { D2CTranslations } from "@/lib/d2c-translations-types";
import { enIN as enINTranslations } from "@/lib/d2c-translations-en";

// ─── Translation Context ───────────────────────────────────────────────────

const TCtx = createContext<D2CTranslations>(enINTranslations);
function useT() { return useContext(TCtx); }

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
  const { reWidget } = useT();

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
          {reWidget.title}
        </p>
        <p className="text-[10px] text-white/20">
          {reWidget.disclaimer}
        </p>
      </div>

      <div className="grid sm:grid-cols-2">
        {/* Inputs */}
        <div className="border-b border-white/8 p-6 sm:border-b-0 sm:border-r sm:p-8">
          <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-white/25">
            {reWidget.inputs}
          </p>
          <div className="flex flex-col gap-7">
            {[
              {
                label: reWidget.adSpend,
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
                label: reWidget.roas,
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
                label: reWidget.cvr,
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
                label: reWidget.aov,
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
            {reWidget.outputs}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                label: reWidget.revenue,
                val: `₹${fmtINR(animRevenue)}`,
                accent: true,
              },
              { label: reWidget.orders, val: fmtINR(animOrders), accent: false },
              { label: reWidget.cac, val: `₹${fmtINR(animCac)}`, accent: false },
              {
                label: reWidget.traffic,
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
  const { pipelineNodes } = useT();
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
  const { stackPhases } = useT();
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
  const { funnelStages, funnelMeasureLabel, funnelOptimizeLabel, funnelRiskLabel } = useT();

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
                        {funnelMeasureLabel}
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
                        {funnelOptimizeLabel}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-white/45">
                        {stage.optimize}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/22">
                        {funnelRiskLabel}
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
  const { faqs } = useT();

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

// ─── DataLoop Infographic ─────────────────────────────────────────────────────

type LoopArrowDir = "right" | "down" | "left" | "up";

function LoopArrow({ dir, inView, delay = 0 }: {
  dir: LoopArrowDir; inView: boolean; delay?: number;
}) {
  const horiz = dir === "right" || dir === "left";
  const linePath = {
    right: "M 6,12 L 68,12",
    left:  "M 74,12 L 12,12",
    down:  "M 12,6 L 12,68",
    up:    "M 12,74 L 12,12",
  }[dir];
  const headPath = {
    right: "M 60,6 L 74,12 L 60,18",
    left:  "M 20,6 L 6,12 L 20,18",
    down:  "M 6,60 L 12,74 L 18,60",
    up:    "M 6,20 L 12,6 L 18,20",
  }[dir];

  if (horiz) {
    return (
      <svg width="80" height="24" viewBox="0 0 80 24" fill="none" aria-hidden="true">
        <motion.path d={linePath} stroke="#ed2830" strokeWidth="1.5" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 0.85 } : {}}
          transition={{ duration: 0.55, delay, ease: "easeOut" }}
        />
        <motion.path d={headPath} stroke="#ed2830" strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round" fill="none"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 0.85 } : {}}
          transition={{ duration: 0.25, delay: delay + 0.5 }}
        />
      </svg>
    );
  }
  return (
    <svg width="24" height="80" viewBox="0 0 24 80" fill="none" aria-hidden="true">
      <motion.path d={linePath} stroke="#ed2830" strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 0.85 } : {}}
        transition={{ duration: 0.55, delay, ease: "easeOut" }}
      />
      <motion.path d={headPath} stroke="#ed2830" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" fill="none"
        initial={{ opacity: 0 }} animate={inView ? { opacity: 0.85 } : {}}
        transition={{ duration: 0.25, delay: delay + 0.5 }}
      />
    </svg>
  );
}

function LoopStepCard({ step, label, desc, Icon, inView, delay, rtl = false }: {
  step: string; label: string; desc: string;
  Icon: (p: { className?: string }) => ReactElement;
  inView: boolean; delay: number; rtl?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5"
    >
      <div className={`flex items-start gap-3 ${rtl ? "flex-row-reverse" : ""}`}>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/[0.08] ring-1 ring-accent/15">
          <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
        </div>
        <div className={rtl ? "text-right" : ""}>
          <p className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-accent/55">{step}</p>
          <p className="font-heading text-[15px] font-black uppercase leading-tight text-white/85">{label}</p>
        </div>
      </div>
      <p className={`mt-3.5 text-[12.5px] leading-[1.6] text-white/32 ${rtl ? "text-right" : ""}`}>
        {desc}
      </p>
    </motion.div>
  );
}

function LoopCenterHub({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex h-[68px] w-[68px] items-center justify-center"
      aria-hidden="true"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 rounded-full border border-dashed border-accent/22"
      />
      <div className="relative flex h-[50px] w-[50px] items-center justify-center rounded-full border border-accent/12 bg-accent/[0.05]">
        <span className="text-[8.5px] font-extrabold uppercase tracking-[0.14em] text-accent/55">LOOP</span>
      </div>
    </motion.div>
  );
}

function DataLoopInfographic({ steps }: {
  steps: { step: string; label: string; desc: string }[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const Icons = [MonitorIcon, ChartIcon, TargetIcon, BoltIcon] as const;
  // Grid layout (clockwise cycle):
  //   TL = steps[0] = 01 Collect     TR = steps[1] = 02 Analyse
  //   BL = steps[3] = 04 Test        BR = steps[2] = 03 Decide

  return (
    <div ref={ref} className="mt-16">
      {/* Mobile: vertical list */}
      <div className="flex flex-col gap-3 sm:hidden">
        {steps.map(({ step, label, desc }, i) => {
          const Icon = Icons[i];
          return (
            <motion.div key={step}
              initial={{ opacity: 0, x: -14 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/[0.08] ring-1 ring-accent/15">
                <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[9px] font-extrabold uppercase tracking-[0.25em] text-accent/55">{step}</p>
                <p className="font-heading text-[15px] font-black uppercase text-white/85">{label}</p>
                <p className="mt-1.5 text-[12.5px] leading-[1.6] text-white/32">{desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Desktop: 2×2 cycle grid with animated arrows */}
      <div
        className="hidden sm:grid mx-auto"
        style={{
          gridTemplateColumns: "1fr 80px 1fr",
          gridTemplateRows: "auto 80px auto",
          maxWidth: "700px",
        }}
      >
        {/* Row 1: Collect | → | Analyse */}
        <LoopStepCard step={steps[0].step} label={steps[0].label} desc={steps[0].desc}
          Icon={Icons[0]} inView={inView} delay={0.05} />
        <div className="flex items-center justify-center">
          <LoopArrow dir="right" inView={inView} delay={0.25} />
        </div>
        <LoopStepCard step={steps[1].step} label={steps[1].label} desc={steps[1].desc}
          Icon={Icons[1]} inView={inView} delay={0.15} rtl />

        {/* Row 2: ↑ | HUB | ↓ */}
        <div className="flex items-center justify-center">
          <LoopArrow dir="up" inView={inView} delay={0.75} />
        </div>
        <div className="flex items-center justify-center">
          <LoopCenterHub inView={inView} />
        </div>
        <div className="flex items-center justify-center">
          <LoopArrow dir="down" inView={inView} delay={0.45} />
        </div>

        {/* Row 3: Test | ← | Decide */}
        <LoopStepCard step={steps[3].step} label={steps[3].label} desc={steps[3].desc}
          Icon={Icons[3]} inView={inView} delay={0.65} />
        <div className="flex items-center justify-center">
          <LoopArrow dir="left" inView={inView} delay={0.55} />
        </div>
        <LoopStepCard step={steps[2].step} label={steps[2].label} desc={steps[2].desc}
          Icon={Icons[2]} inView={inView} delay={0.55} rtl />
      </div>
    </div>
  );
}

// ─── Unit Economics Calculator ───────────────────────────────────────────────

type UECStatus = "scalable" | "caution" | "pause";

function UECGauge({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/10">
      <motion.div
        className="absolute left-0 top-0 h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}

function UECMetricCard({
  label, value, suffix = "", subtext, color, max,
}: {
  label: string; value: number; suffix?: string; subtext?: string;
  color: string; max: number;
}) {
  const anim = useAnimatedNumber(Math.round(value));
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-white/8 bg-white/[0.03] p-4"
    >
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/40">{label}</p>
      <p className="mb-2 font-heading text-2xl font-bold leading-none" style={{ color }}>
        {anim.toLocaleString("en-IN")}{suffix}
      </p>
      {subtext && <p className="mb-2 text-[11px] text-white/40">{subtext}</p>}
      <UECGauge value={value} max={max} color={color} />
    </motion.div>
  );
}

function UECSlider({
  label, value, min, max, step, format, onChange,
}: {
  label: string; value: number; min: number; max: number; step: number;
  format: (v: number) => string; onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-white/50">{label}</span>
        <span className="font-heading text-sm font-bold text-white">{format(value)}</span>
      </div>
      <div className="relative h-5 flex items-center">
        <div className="absolute w-full h-1 rounded-full bg-white/10" />
        <div
          className="absolute h-1 rounded-full"
          style={{ width: `${pct}%`, backgroundColor: "#ed2830" }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute w-full appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#ed2830] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#ed2830] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white"
        />
      </div>
    </div>
  );
}

function UnitEconomicsCalculator() {
  const [adSpend, setAdSpend] = useState(500000);
  const [aov, setAov] = useState(1800);
  const [grossMargin, setGrossMargin] = useState(55);
  const [repeatRate, setRepeatRate] = useState(2.1);

  const orders = adSpend / (aov * 0.03); // assume 3% CVR proxy
  const revenue = orders * aov;
  const mer = revenue / adSpend;
  const cac = adSpend / orders;
  const ltv = aov * grossMargin / 100 * repeatRate;
  const ltvCac = ltv / cac;
  const contribMargin = aov * (grossMargin / 100) - cac;
  const breakevenRoas = 1 / (grossMargin / 100);

  let status: UECStatus = "pause";
  if (ltvCac >= 3) status = "scalable";
  else if (ltvCac >= 1.5) status = "caution";

  const statusConfig: Record<UECStatus, { label: string; color: string; desc: string }> = {
    scalable: { label: "SCALABLE", color: "#22c55e", desc: "Strong unit economics. Scale with confidence." },
    caution: { label: "CAUTION", color: "#f59e0b", desc: "Marginal. Optimise CAC or improve margin before scaling." },
    pause: { label: "PAUSE", color: "#ef4444", desc: "Unit economics are negative. Fix before increasing spend." },
  };
  const sc = statusConfig[status];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        {/* Inputs */}
        <div className="space-y-7 rounded-2xl border border-white/8 bg-white/[0.025] p-6 sm:p-8">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">Your Numbers</p>
          <UECSlider
            label="Monthly Ad Spend"
            value={adSpend}
            min={50000}
            max={5000000}
            step={50000}
            format={(v) => `₹${fmtINR(v)}`}
            onChange={setAdSpend}
          />
          <UECSlider
            label="Average Order Value"
            value={aov}
            min={300}
            max={15000}
            step={100}
            format={(v) => `₹${fmtINR(v)}`}
            onChange={setAov}
          />
          <UECSlider
            label="Gross Margin"
            value={grossMargin}
            min={15}
            max={85}
            step={1}
            format={(v) => `${v}%`}
            onChange={setGrossMargin}
          />
          <UECSlider
            label="Repeat Purchase Rate (×)"
            value={repeatRate}
            min={1}
            max={6}
            step={0.1}
            format={(v) => `${v.toFixed(1)}×`}
            onChange={setRepeatRate}
          />
        </div>

        {/* Outputs */}
        <div className="flex flex-col gap-6">
          {/* Status badge */}
          <motion.div
            key={status}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-4 rounded-2xl border p-5"
            style={{ borderColor: sc.color + "44", backgroundColor: sc.color + "0d" }}
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold"
              style={{ backgroundColor: sc.color + "22", color: sc.color }}
            >
              {status === "scalable" ? "✓" : status === "caution" ? "!" : "✕"}
            </div>
            <div>
              <p className="font-heading text-lg font-black uppercase tracking-wide" style={{ color: sc.color }}>
                {sc.label}
              </p>
              <p className="text-[12px] text-white/55">{sc.desc}</p>
            </div>
          </motion.div>

          {/* Metrics grid */}
          <div className="grid grid-cols-2 gap-3">
            <UECMetricCard
              label="MER"
              value={Math.round(mer * 10) / 10}
              suffix="×"
              subtext="Media Efficiency Ratio"
              color="#ed2830"
              max={10}
            />
            <UECMetricCard
              label="LTV : CAC"
              value={Math.round(ltvCac * 10) / 10}
              suffix="×"
              subtext="Target ≥ 3×"
              color={sc.color}
              max={8}
            />
            <UECMetricCard
              label="Breakeven ROAS"
              value={Math.round(breakevenRoas * 10) / 10}
              suffix="×"
              subtext="Minimum to cover COGS"
              color="#94a3b8"
              max={10}
            />
            <UECMetricCard
              label="Contrib. Margin / Order"
              value={Math.round(contribMargin)}
              suffix=""
              subtext={contribMargin > 0 ? "Positive — room to scale" : "Negative — fix first"}
              color={contribMargin > 0 ? "#22c55e" : "#ef4444"}
              max={aov}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── Shared 3D Mascot SVG ─────────────────────────────────────────────────────

function D2CMascotSVG({ width = 88, height = 126, p = "d2cm" }: { width?: number; height?: number; p?: string }) {
  return (
    <svg width={width} height={height} viewBox="0 0 100 140" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Skin — lit top-left */}
        <radialGradient id={`${p}-sk`} cx="38%" cy="28%" r="68%">
          <stop offset="0%" stopColor="#ffe0b8"/>
          <stop offset="55%" stopColor="#f5c891"/>
          <stop offset="100%" stopColor="#c97840"/>
        </radialGradient>
        {/* Suit */}
        <linearGradient id={`${p}-su`} x1="15%" y1="5%" x2="90%" y2="95%">
          <stop offset="0%" stopColor="#ff4a52"/>
          <stop offset="40%" stopColor="#ed2830"/>
          <stop offset="100%" stopColor="#8b0a14"/>
        </linearGradient>
        {/* Eye white */}
        <radialGradient id={`${p}-ew`} cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#ffffff"/>
          <stop offset="100%" stopColor="#dde0ee"/>
        </radialGradient>
        {/* Iris */}
        <radialGradient id={`${p}-ir`} cx="38%" cy="35%" r="58%">
          <stop offset="0%" stopColor="#3a3a60"/>
          <stop offset="100%" stopColor="#08080f"/>
        </radialGradient>
        {/* Hand skin */}
        <radialGradient id={`${p}-hd`} cx="40%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#ffe0b8"/>
          <stop offset="100%" stopColor="#c97840"/>
        </radialGradient>
        {/* Hair */}
        <linearGradient id={`${p}-hr`} x1="10%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#3a1e00"/>
          <stop offset="50%" stopColor="#1a0900"/>
          <stop offset="100%" stopColor="#080400"/>
        </linearGradient>
        {/* Pants */}
        <linearGradient id={`${p}-pt`} x1="10%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#28283a"/>
          <stop offset="100%" stopColor="#0d0d16"/>
        </linearGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="50" cy="138" rx="26" ry="4.5" fill="rgba(0,0,0,0.3)"/>

      {/* LEGS */}
      <rect x="28" y="96" width="17" height="27" rx="8" fill={`url(#${p}-pt)`}/>
      <rect x="55" y="96" width="17" height="27" rx="8" fill={`url(#${p}-pt)`}/>
      <rect x="30" y="99" width="5" height="18" rx="2.5" fill="rgba(255,255,255,0.09)"/>
      <rect x="57" y="99" width="5" height="18" rx="2.5" fill="rgba(255,255,255,0.09)"/>

      {/* SHOES */}
      <ellipse cx="36.5" cy="123" rx="14" ry="6" fill="#111"/>
      <ellipse cx="63.5" cy="123" rx="14" ry="6" fill="#111"/>
      <ellipse cx="33" cy="120.5" rx="6" ry="2.2" fill="rgba(255,255,255,0.22)"/>
      <ellipse cx="59.5" cy="120.5" rx="6" ry="2.2" fill="rgba(255,255,255,0.22)"/>

      {/* BODY / SUIT */}
      <rect x="20" y="54" width="60" height="48" rx="15" fill={`url(#${p}-su)`}/>
      {/* suit highlight */}
      <ellipse cx="35" cy="62" rx="13" ry="7" fill="rgba(255,255,255,0.12)"/>
      {/* suit bottom rim shadow */}
      <rect x="20" y="93" width="60" height="9" rx="4" fill="rgba(0,0,0,0.18)"/>

      {/* SHIRT / TIE */}
      <polygon points="41,54 50,67 59,54" fill="#f8f8f8"/>
      <polygon points="44,67 50,77 56,67" fill="#e2e2e2"/>
      <polygon points="47,67 50,80 53,67 50,63" fill="#fff"/>
      <polygon points="49,67 50,80 52,67" fill="rgba(0,0,0,0.08)"/>
      <ellipse cx="50" cy="63" rx="3" ry="2" fill="rgba(255,255,255,0.9)"/>
      <circle cx="50" cy="86" r="2.2" fill="rgba(0,0,0,0.25)"/>

      {/* LEFT ARM */}
      <line x1="21" y1="67" x2="7" y2="81" stroke="#ed2830" strokeWidth="13" strokeLinecap="round"/>
      <line x1="22" y1="66" x2="9" y2="78" stroke="rgba(255,120,120,0.35)" strokeWidth="5" strokeLinecap="round"/>
      <circle cx="5" cy="83" r="7.5" fill={`url(#${p}-hd)`}/>
      <circle cx="3" cy="81" r="2.2" fill="rgba(255,255,255,0.45)"/>

      {/* RIGHT ARM (animated) */}
      <g className="d2c-arm">
        <line x1="79" y1="63" x2="92" y2="48" stroke="#ed2830" strokeWidth="13" strokeLinecap="round"/>
        <line x1="78" y1="62" x2="90" y2="48" stroke="rgba(255,120,120,0.35)" strokeWidth="5" strokeLinecap="round"/>
        <circle cx="93" cy="44" r="7.5" fill={`url(#${p}-hd)`}/>
        <circle cx="91" cy="42" r="2.2" fill="rgba(255,255,255,0.45)"/>
      </g>

      {/* NECK */}
      <rect x="43" y="50" width="14" height="9" rx="4" fill="#f0b878"/>

      {/* HEAD */}
      <circle cx="50" cy="31" r="31" fill={`url(#${p}-sk)`}/>

      {/* HAIR */}
      <path d="M19 26 Q19 1 50 4 Q81 1 81 26 Q74 13 50 13 Q26 13 19 26Z" fill={`url(#${p}-hr)`}/>
      <path d="M26 15 Q38 5 56 6 Q66 8 72 14" stroke="rgba(200,130,30,0.3)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <path d="M30 12 Q42 4 58 5" stroke="rgba(255,220,100,0.12)" strokeWidth="5" fill="none" strokeLinecap="round"/>

      {/* EARS */}
      <ellipse cx="19" cy="33" rx="4.5" ry="7" fill={`url(#${p}-sk)`}/>
      <ellipse cx="81" cy="33" rx="4.5" ry="7" fill={`url(#${p}-sk)`}/>
      <ellipse cx="19" cy="34" rx="2.3" ry="4" fill="#d08040" opacity="0.65"/>
      <ellipse cx="81" cy="34" rx="2.3" ry="4" fill="#d08040" opacity="0.65"/>

      {/* GLASSES — 3D depth: shadow frame behind, then lit frame */}
      <rect x="24.5" y="21.5" width="22" height="21" rx="7" fill="none" stroke="#8b0a14" strokeWidth="4"/>
      <rect x="52.5" y="21.5" width="22" height="21" rx="7" fill="none" stroke="#8b0a14" strokeWidth="4"/>
      <rect x="25" y="22" width="22" height="21" rx="7" fill="rgba(180,210,255,0.06)" stroke="#ed2830" strokeWidth="2.5"/>
      <rect x="53" y="22" width="22" height="21" rx="7" fill="rgba(180,210,255,0.06)" stroke="#ed2830" strokeWidth="2.5"/>
      {/* lens reflection streaks */}
      <path d="M28 25 L37 23" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M56 25 L65 23" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="47" y1="32" x2="53" y2="32" stroke="#ed2830" strokeWidth="2.5"/>
      <line x1="25" y1="35" x2="21" y2="39" stroke="#ed2830" strokeWidth="2" strokeLinecap="round"/>
      <line x1="75" y1="35" x2="79" y2="39" stroke="#ed2830" strokeWidth="2" strokeLinecap="round"/>

      {/* EYES */}
      <g className="d2c-eyel">
        <circle cx="36" cy="33" r="8" fill={`url(#${p}-ew)`}/>
        <circle cx="37" cy="34" r="5" fill={`url(#${p}-ir)`}/>
        <circle cx="37" cy="34" r="2.8" fill="#05050e"/>
        <circle cx="38.8" cy="31.5" r="2" fill="white"/>
        <circle cx="34.5" cy="35.5" r="0.9" fill="rgba(255,255,255,0.55)"/>
      </g>
      <g className="d2c-eyer">
        <circle cx="64" cy="33" r="8" fill={`url(#${p}-ew)`}/>
        <circle cx="65" cy="34" r="5" fill={`url(#${p}-ir)`}/>
        <circle cx="65" cy="34" r="2.8" fill="#05050e"/>
        <circle cx="66.8" cy="31.5" r="2" fill="white"/>
        <circle cx="62.5" cy="35.5" r="0.9" fill="rgba(255,255,255,0.55)"/>
      </g>

      {/* EYEBROWS */}
      <path d="M28 23.5 Q35.5 20 43 22.5" stroke="#2a1500" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M57 22.5 Q64.5 20 72 23.5" stroke="#2a1500" strokeWidth="2.5" fill="none" strokeLinecap="round"/>

      {/* NOSE */}
      <ellipse cx="50" cy="41" rx="3.5" ry="2.5" fill="rgba(180,100,30,0.4)"/>
      <circle cx="49" cy="40" r="1.3" fill="rgba(255,220,160,0.4)"/>

      {/* MOUTH */}
      <path d="M37 47 Q50 58 63 47" stroke="#b05020" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <circle cx="37" cy="47" r="1.5" fill="#c07838" opacity="0.5"/>
      <circle cx="63" cy="47" r="1.5" fill="#c07838" opacity="0.5"/>

      {/* CHEEK BLUSH */}
      <ellipse cx="22" cy="43" rx="6.5" ry="3.5" fill="#ffb0b0" opacity="0.4"/>
      <ellipse cx="78" cy="43" rx="6.5" ry="3.5" fill="#ffb0b0" opacity="0.4"/>

      {/* HEAD TOP HIGHLIGHT — 3D sphere illusion */}
      <ellipse cx="38" cy="17" rx="13" ry="7" fill="rgba(255,255,255,0.13)"/>
    </svg>
  );
}

// ─── D2C Mascot ─────────────────────────────────────────────────────────────────

function D2CMascot() {
  const [tipIdx, setTipIdx] = useState(0);
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [contacted, setContacted] = useState(false);
  const [ctaBounce, setCtaBounce] = useState(false);
  const phaseRef = useRef(false);

  const tips = [
    "Open the calculator! ↑",
    "LTV : CAC above 3×?",
    "Know your breakeven ROAS!",
    "Scale or Pause — you decide!",
  ];

  useEffect(() => {
    const t1 = setTimeout(() => setBubbleVisible(true), 2400);
    const interval = setInterval(() => {
      if (phaseRef.current) return;
      setBubbleVisible(false);
      setTimeout(() => {
        setTipIdx((p) => (p + 1) % tips.length);
        setBubbleVisible(true);
      }, 400);
    }, 5500);
    return () => { clearTimeout(t1); clearInterval(interval); };
  }, []);

  const handleClick = () => {
    if (contacted) {
      window.location.href = "/contact";
      return;
    }
    document.getElementById("unit-economics")?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      phaseRef.current = true;
      setBubbleVisible(false);
      setTimeout(() => {
        setContacted(true);
        setBubbleVisible(true);
        setCtaBounce(true);
        setTimeout(() => setCtaBounce(false), 700);
      }, 500);
    }, 3500);
  };

  return (
    <>
      <style>{`
        @keyframes d2c-char-enter { from { transform: translateY(155px); } to { transform: translateY(0); } }
        @keyframes d2c-char-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
        @keyframes d2c-arm-wave   { 0%,100% { transform: rotate(0deg); } 28% { transform: rotate(-24deg); } 70% { transform: rotate(18deg); } }
        @keyframes d2c-blink      { 0%,90%,100% { transform: scaleY(1); } 94% { transform: scaleY(0.07); } }
        @keyframes d2c-cta-bounce { 0% { transform: scale(1) translateY(0); } 30% { transform: scale(1.12) translateY(-12px); } 60% { transform: scale(0.96) translateY(2px); } 100% { transform: scale(1) translateY(0); } }
        .d2c-mwrap  { animation: d2c-char-enter 0.75s cubic-bezier(0.34,1.56,0.64,1) 1.3s both; }
        .d2c-mfloat { animation: d2c-char-float 3.2s ease-in-out infinite; }
        .d2c-mfloat.d2c-bounce { animation: d2c-cta-bounce 0.65s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .d2c-arm    { transform-origin: 79px 63px; animation: d2c-arm-wave 1.8s ease-in-out infinite; }
        .d2c-eyel   { transform-origin: 36px 33px; animation: d2c-blink 5s ease-in-out 0.9s infinite; }
        .d2c-eyer   { transform-origin: 64px 33px; animation: d2c-blink 5s ease-in-out 1.1s infinite; }
      `}</style>
      <div
        className="d2c-mwrap fixed bottom-0 z-50 flex flex-col items-start pointer-events-none"
        style={{ left: "max(16px, env(safe-area-inset-left, 0px))" }}
      >
        {/* Speech bubble */}
        <div
          className="pointer-events-auto mb-1 ml-2 relative"
          style={{
            background: contacted ? "#ed2830" : "#fff",
            color: contacted ? "#fff" : "#111",
            fontFamily: "var(--font-heading, 'Space Grotesk', sans-serif)",
            fontSize: contacted ? 13 : 12,
            fontWeight: 700,
            lineHeight: 1.45,
            padding: "9px 13px",
            borderRadius: "12px 12px 12px 3px",
            maxWidth: contacted ? 185 : 165,
            boxShadow: contacted ? "0 6px 28px rgba(237,40,48,0.5)" : "0 6px 24px rgba(0,0,0,0.6)",
            transition: "opacity 0.38s ease, background 0.4s ease, box-shadow 0.4s ease, max-width 0.3s ease",
            opacity: bubbleVisible ? 1 : 0,
          }}
        >
          {contacted ? "Talk to our expert →" : tips[tipIdx]}
          <span style={{ position: "absolute", bottom: -7, left: 16, borderStyle: "solid", borderWidth: "7px 7px 0", borderColor: contacted ? "#ed2830 transparent transparent" : "#fff transparent transparent" }} />
        </div>

        {/* Character */}
        <div
          className={`d2c-mfloat pointer-events-auto cursor-pointer select-none${ctaBounce ? " d2c-bounce" : ""}`}
          style={{ filter: "drop-shadow(0 12px 20px rgba(0,0,0,0.65))" }}
          onClick={handleClick}
          role="button"
          aria-label={contacted ? "Talk to our expert" : "Open Unit Economics Calculator"}
        >
          <D2CMascotSVG width={88} height={126} p="d2cm" />
        </div>
      </div>
    </>
  );
}

// ─── Exit-Intent Modal ────────────────────────────────────────────────────────

function D2CExitIntentModal() {
  const [visible, setVisible] = useState(false);
  const firedRef = useRef(false);

  useEffect(() => {
    try { if (sessionStorage.getItem("d2c_exit_shown")) return; } catch {}

    const fire = () => {
      if (firedRef.current) return;
      firedRef.current = true;
      try { sessionStorage.setItem("d2c_exit_shown", "1"); } catch {}
      setVisible(true);
    };

    const onMouseLeave = (e: MouseEvent) => { if (e.clientY <= 5) fire(); };
    const onVisibilityChange = () => { if (document.visibilityState === "hidden") fire(); };

    const t = setTimeout(() => {
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("visibilitychange", onVisibilityChange);
    }, 5000);

    return () => {
      clearTimeout(t);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes d2c-ei-bg   { from { opacity: 0; } to { opacity: 1; } }
        @keyframes d2c-ei-card { from { opacity: 0; transform: translate(-50%, -40%) scale(0.88); } to { opacity: 1; transform: translate(-50%, -50%) scale(1); } }
        @keyframes d2c-ei-char { 0% { transform: translateY(120px) scale(0.6); opacity: 0; } 55% { transform: translateY(-18px) scale(1.1); opacity: 1; } 75% { transform: translateY(6px) scale(0.97); } 100% { transform: translateY(0) scale(1); opacity: 1; } }
        @keyframes d2c-ei-run  { 0%,100% { transform: rotate(0deg); } 25% { transform: rotate(-4deg); } 75% { transform: rotate(4deg); } }
        @keyframes d2c-ei-bubble { from { opacity: 0; transform: scale(0.7) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .d2c-ei-char { animation: d2c-ei-char 0.65s cubic-bezier(0.34,1.56,0.64,1) both; }
        .d2c-ei-char svg { animation: d2c-ei-run 0.4s ease-in-out 3; }
        .d2c-ei-bubble { animation: d2c-ei-bubble 0.4s ease 0.5s both; }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={() => setVisible(false)}
        style={{
          position: "fixed", inset: 0, zIndex: 200,
          background: "rgba(0,0,0,0.78)",
          backdropFilter: "blur(5px)",
          animation: "d2c-ei-bg 0.3s ease both",
        }}
      />

      {/* Card */}
      <div
        style={{
          position: "fixed", zIndex: 201,
          top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          background: "#111",
          border: "1px solid rgba(237,40,48,0.35)",
          borderRadius: 20,
          padding: "36px 32px 32px",
          maxWidth: 400,
          width: "calc(100vw - 32px)",
          boxShadow: "0 24px 80px rgba(237,40,48,0.25), 0 8px 32px rgba(0,0,0,0.8)",
          animation: "d2c-ei-card 0.45s cubic-bezier(0.34,1.56,0.64,1) both",
          textAlign: "center",
        }}
      >
        {/* Close */}
        <button
          onClick={() => setVisible(false)}
          style={{
            position: "absolute", top: 14, right: 16,
            background: "none", border: "none", color: "#666",
            fontSize: 22, cursor: "pointer", lineHeight: 1,
          }}
          aria-label="Close"
        >
          ×
        </button>

        {/* Mascot */}
        <div className="d2c-ei-char" style={{ marginBottom: 8 }}>
          <D2CMascotSVG width={92} height={132} p="d2cei" />
        </div>

        {/* Speech bubble callout */}
        <div
          className="d2c-ei-bubble"
          style={{
            display: "inline-block",
            background: "#ed2830",
            color: "#fff",
            fontFamily: "var(--font-heading, 'Space Grotesk', sans-serif)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            padding: "5px 12px",
            borderRadius: 20,
            marginBottom: 14,
          }}
        >
          Before you go…
        </div>

        <h3 style={{ color: "#fff", fontFamily: "var(--font-heading, 'Space Grotesk', sans-serif)", fontSize: 22, fontWeight: 800, margin: "0 0 10px", lineHeight: 1.25 }}>
          Get a <span style={{ color: "#ed2830" }}>Free Brand Audit</span>
        </h3>
        <p style={{ color: "#aaa", fontSize: 14, lineHeight: 1.6, margin: "0 0 24px" }}>
          Find out exactly what&apos;s holding your D2C brand back—CAC, ROAS, LTV gaps—in one 30-min call. No pitch, just clarity.
        </p>

        {/* CTA */}
        <a
          href="/contact"
          style={{
            display: "block",
            background: "#ed2830",
            color: "#fff",
            fontFamily: "var(--font-heading, 'Space Grotesk', sans-serif)",
            fontWeight: 700,
            fontSize: 15,
            padding: "14px 24px",
            borderRadius: 10,
            textDecoration: "none",
            marginBottom: 10,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          Book Free Audit →
        </a>
        <button
          onClick={() => setVisible(false)}
          style={{ background: "none", border: "none", color: "#555", fontSize: 13, cursor: "pointer" }}
        >
          No thanks, I&apos;ll figure it out myself
        </button>
      </div>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PerformanceMarketing({ t: tProp }: { t?: D2CTranslations } = {}) {
  const trans = tProp ?? enINTranslations;
  return (
    <TCtx.Provider value={trans}>
      <PerformanceMarketingContent trans={trans} />
    </TCtx.Provider>
  );
}

function PerformanceMarketingContent({ trans: t }: { trans: D2CTranslations }) {
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
              <Link href="/" className="hover:text-white transition-colors">{t.heroBcHome}</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-white transition-colors">{t.heroBcServices}</Link>
              <span>/</span>
              <span className="text-[var(--accent)] font-medium" aria-current="page">{t.heroBcCurrent}</span>
            </nav>

            <motion.div variants={fadeUp}>
              <SectionLabel>{t.heroLabel}</SectionLabel>
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-7 font-heading text-4xl font-black leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              {t.heroH1}
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-7 max-w-2xl text-lg leading-8 text-white/50 sm:text-xl"
            >
              {t.heroSub}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap gap-3"
            >
              <CTAButton href="/contact" variant="primary" size="lg">
                {t.heroCta1}
              </CTAButton>
              <CTAButton href="/contact" variant="outline" size="lg">
                {t.heroCta2}
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
            {t.navJumpTo}
          </span>
          {[
            { href: "#why-sarvopaya", label: t.navWhyUs },
            { href: "#performance-stack", label: t.navStack },
            { href: "#tracking-pipeline", label: t.navTracking },
            { href: "#creative-engine", label: t.navCreative },
            { href: "#revenue-economics", label: t.navRevenue },
            { href: "#retention-strategy", label: t.navRetention },
            { href: "#growth-process", label: t.navProcess },
            { href: "#faqs", label: t.navFaqs },
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
            {t.navAudit}
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
            <SectionLabel light>{t.vanityLabel}</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              {t.vanityH2}
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-5 text-lg leading-8 text-black/55"
            >
              {t.vanityBody}
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
                {t.vanityColA}
              </p>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                {t.vanityColB}
              </p>
            </div>
            {t.vanityRows.map(([vanity, biz], i) => (
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
            <SectionLabel>{t.whyLabel}</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl"
            >
              {t.whyH2}
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-5 text-lg leading-8 text-white/45"
            >
              {t.whyBody}
            </motion.p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {t.whyCards.map(({ title, body }, cardIdx) => {
              const cardStyles = [
                { accent: "from-[var(--accent)]/20 to-transparent", border: "border-[var(--accent)]/20" },
                { accent: "from-blue-500/15 to-transparent", border: "border-blue-500/20" },
                { accent: "from-emerald-500/15 to-transparent", border: "border-emerald-500/20" },
                { accent: "from-violet-500/15 to-transparent", border: "border-violet-500/20" },
                { accent: "from-amber-500/15 to-transparent", border: "border-amber-500/20" },
                { accent: "from-cyan-500/15 to-transparent", border: "border-cyan-500/20" },
              ];
              const { accent, border } = cardStyles[cardIdx % cardStyles.length];
              const num = String(cardIdx + 1).padStart(2, "0");
              return ({ num, title, body, accent, border });
            }).map(({ num, title, body, accent, border }) => (
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
            {t.whyBadges.map((badge) => (
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
            <SectionLabel>{t.stackLabel}</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl"
            >
              {t.stackH2}
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-5 max-w-2xl text-lg leading-8 text-white/45"
            >
              {t.stackBody}
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
              <SectionLabel light>{t.trackingLabel}</SectionLabel>
              <motion.h2
                variants={item}
                className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
              >
                {t.trackingH2}
              </motion.h2>
              <motion.p
                variants={item}
                className="mt-5 text-lg leading-8 text-black/55"
              >
                {t.trackingBody1}
              </motion.p>
              <motion.p
                variants={item}
                className="mt-4 text-[15px] leading-7 text-black/48"
              >
                {t.trackingBody2}
              </motion.p>
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-2 gap-3 content-start"
            >
              {t.trackingCards.map(({ title, desc }, tcIdx) => {
                const tcIcons = [
                  <GearIcon key="gear" className="h-5 w-5" />,
                  <ChartIcon key="chart" className="h-5 w-5" />,
                  <MonitorIcon key="monitor" className="h-5 w-5" />,
                  <TargetIcon key="target" className="h-5 w-5" />,
                  <BoltIcon key="bolt" className="h-5 w-5" />,
                  <RocketIcon key="rocket" className="h-5 w-5" />,
                ];
                const icon = tcIcons[tcIdx % tcIcons.length];
                return ({ icon, title, desc });
              }).map(({ icon, title, desc }) => (
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
              <SectionLabel>{t.serverLabel}</SectionLabel>
              <motion.h2
                variants={item}
                className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl"
              >
                {t.serverH2}
              </motion.h2>
              <motion.p
                variants={item}
                className="mt-5 text-lg leading-8 text-white/45"
              >
                {t.serverBody1}
              </motion.p>
              <motion.p
                variants={item}
                className="mt-4 text-[15px] leading-7 text-white/38"
              >
                {t.serverBody2}
              </motion.p>

              <motion.div
                variants={item}
                className="mt-8 grid gap-3 sm:grid-cols-3"
              >
                {t.serverCards.map(({ label, desc }) => (
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
                {t.serverDisclaimer}
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/28">
                {t.serverDataFlowLabel}
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
                {t.serverLiveReportingLabel}
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
                    {t.serverAnalyticsCards[0].label}
                  </p>
                  <p className="mt-0.5 text-[13px] text-white/40">
                    {t.serverAnalyticsCards[0].sub}
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
                    {t.serverAnalyticsCards[1].label}
                  </p>
                  <p className="mt-0.5 text-[13px] text-white/40">
                    {t.serverAnalyticsCards[1].sub}
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
                    {t.serverAnalyticsCards[2].label}
                  </p>
                  <p className="mt-0.5 text-[13px] text-white/40">
                    {t.serverAnalyticsCards[2].sub}
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
            <SectionLabel>{t.toolEcosystemLabel}</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl"
            >
              {t.toolEcosystemH2}
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-4 text-lg leading-8 text-white/42"
            >
              {t.toolEcosystemBody}
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
            <SectionLabel>{t.funnelLabel}</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl"
            >
              {t.funnelH2}
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-5 text-lg leading-8 text-white/45"
            >
              {t.funnelBody}
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
            <SectionLabel>{t.creativeLabel}</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl"
            >
              {t.creativeH2}
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-5 text-lg leading-8 text-white/45"
            >
              {t.creativeBody}
            </motion.p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {t.creativeSteps.map(({ step, label, desc }) => (
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
            <SectionLabel light>{t.testingLabel}</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              {t.testingH2}
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-5 text-[17px] leading-8 text-black/55"
            >
              {t.testingBody}
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
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/35">{t.testingColA}</p>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/35">{t.testingColB}</p>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/35">{t.testingColC}</p>
            </div>
            {t.testingRows.map(([variable, test, measure], i) => (
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
              <SectionLabel>{t.croLabel}</SectionLabel>
              <motion.h2
                variants={item}
                className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl"
              >
                {t.croH2}
              </motion.h2>
              <motion.p
                variants={item}
                className="mt-5 text-lg leading-8 text-white/45"
              >
                {t.croBody}
              </motion.p>
              <motion.div
                variants={item}
                className="mt-8 rounded-xl border border-white/8 bg-white/[0.03] p-5"
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/28">
                  {t.croFormulaLabel}
                </p>
                <p className="mt-3 font-heading text-2xl font-bold text-white/80 sm:text-3xl">
                  {t.croFormula}
                </p>
                <p className="mt-3 text-[13px] text-white/32">
                  {t.croFormulaNote}
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
              {t.croItems.map((it) => (
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
            <SectionLabel light>{t.revenueLabel}</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              {t.revenueH2}
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-5 text-lg leading-8 text-black/55"
            >
              {t.revenueBody}
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
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/35">{t.revenueColMetric}</p>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-black/35">{t.revenueColA}</p>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">{t.revenueColB}</p>
            </div>
            {t.revenueRows.map(([metric, a, b], i) => (
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
            {t.revenueDisclaimer}
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
              {t.roasEyebrow}
            </p>
            <h2 className="mt-5 font-heading text-4xl font-black leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {t.roasH2}
            </h2>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-white/45">
              {t.roasBody}
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
            <SectionLabel>{t.retentionLabel}</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl"
            >
              {t.retentionH2}
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-5 text-lg leading-8 text-white/50"
            >
              {t.retentionBody}
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
            {t.retentionStats.map(({ stat, label, desc }) => (
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
                  {t.retentionHubEyebrow}
                </p>
                <h3 className="mt-1 font-heading text-2xl font-bold text-white">
                  {t.retentionHubH3}
                </h3>
              </div>
              <p className="text-xs text-white/40">
                {t.retentionHubByline}
              </p>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {([
                "/customer-retention-d2c-marketing-guide",
                "/how-to-create-a-winning-d2c-marketing-strategy",
                "/d2c-marketing-channels-guide",
              ] as const).map((href, gi) => {
                const g = t.retentionGuides[gi];
                return (
                  <div key={gi} className="flex flex-col justify-between rounded-xl border border-white/8 bg-black/40 p-5 hover:border-[var(--accent)]/40 transition-colors">
                    <div>
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${gi === 0 ? "bg-[var(--accent)]/15 text-[var(--accent)]" : "bg-white/10 text-white/70"}`}>
                        {g.tag}
                      </span>
                      <h4 className="mt-3 font-heading text-base font-bold leading-snug text-white">
                        <Link href={href} className="hover:text-[var(--accent)] transition-colors">
                          {g.title}
                        </Link>
                      </h4>
                      <p className="mt-2 text-[13px] leading-relaxed text-white/45">
                        {g.desc}
                      </p>
                    </div>
                    <Link href={href} className="mt-4 inline-flex items-center text-xs font-semibold text-[var(--accent)] hover:underline">
                      {g.cta}
                    </Link>
                  </div>
                );
              })}
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
            <SectionLabel light>{t.attributionLabel}</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              {t.attributionH2}
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-5 text-lg leading-8 text-black/55"
            >
              {t.attributionBody}
            </motion.p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 grid gap-5 sm:grid-cols-3"
          >
            {t.attributionMethods.map(({ label, description, use, caveat }) => (
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
                      {t.attributionBestFor}
                    </span>
                    <p className="mt-1 text-[13px] text-black/50">{use}</p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/30">
                      {t.attributionLimitation}
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
            <SectionLabel>{t.dataLoopLabel}</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl"
            >
              {t.dataLoopH2}
            </motion.h2>
          </motion.div>

          <DataLoopInfographic steps={t.dataLoopSteps} />
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
            <SectionLabel light>{t.reportingLabel}</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              {t.reportingH2}
            </motion.h2>
            <motion.p
              variants={item}
              className="mt-5 text-lg leading-8 text-black/55"
            >
              {t.reportingBody}
            </motion.p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
          >
            {t.reportingMetrics.map(({ metric, label }) => (
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
            <SectionLabel>{t.scopeLabel}</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl"
            >
              {t.scopeH2}
            </motion.h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {t.scopeCategories.map(({ label, items }, si) => {
              const scopeIcons = [GearIcon, MegaphoneIcon, BoltIcon, FunnelIcon, ChartIcon, RocketIcon];
              const ScopeIcon = scopeIcons[si] ?? GearIcon;
              return (
              <motion.div
                key={label}
                variants={fadeUp}
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-6"
              >
                <div className="mb-3 text-[var(--accent)]"><ScopeIcon className="h-5 w-5" /></div>
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
              );
            })}
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
            <SectionLabel light>{t.growthLabel}</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              {t.growthH2}
            </motion.h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 flex flex-col gap-4"
          >
            {t.growthPhases.map(({ num, phase, timeline, desc }) => (
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

      {/* ── 18B UNIT ECONOMICS CALCULATOR ──────────────────────────────── */}
      <section id="unit-economics" className="relative overflow-hidden bg-black py-20 sm:py-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.018) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 0%,rgba(237,40,48,0.06) 0%,transparent 65%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <SectionLabel>Free Tool</SectionLabel>
            <h2 className="mt-4 font-heading text-3xl font-black uppercase tracking-tight text-white sm:text-4xl lg:text-5xl">
              Unit Economics Calculator
            </h2>
            <p className="mt-4 text-base text-white/50 max-w-xl mx-auto">
              Move the sliders to see your real MER, LTV:CAC and breakeven ROAS — instantly.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <UnitEconomicsCalculator />
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
              {t.auditEyebrow}
            </motion.p>
            <motion.h2
              variants={item}
              className="mt-5 font-heading text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {t.auditH2}
            </motion.h2>
            <motion.p
              variants={item}
              className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/45"
            >
              {t.auditBody}
            </motion.p>
            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <CTAButton href="/contact" variant="primary" size="lg">
                {t.auditCta1}
              </CTAButton>
              <CTAButton href="/contact" variant="outline" size="lg">
                {t.auditCta2}
              </CTAButton>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
            >
              {t.auditBadges.map((pt) => (
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
            <SectionLabel light>{t.whoLabel}</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              {t.whoH2}
            </motion.h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {t.whoItems.map(({ label, desc }) => (
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
            <SectionLabel light>{t.faqLabel}</SectionLabel>
            <motion.h2
              variants={item}
              className="mt-6 font-heading text-4xl font-black leading-tight tracking-tight text-black sm:text-5xl"
            >
              {t.faqH2}
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
              {t.finalH2}
            </motion.h2>
            <motion.p
              variants={item}
              className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/45"
            >
              {t.finalBody}
            </motion.p>
            <motion.div
              variants={item}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <CTAButton href="/contact" variant="primary" size="lg">
                {t.finalCta1}
              </CTAButton>
              <CTAButton href="/services" variant="inverted" size="lg">
                {t.finalCta2}
              </CTAButton>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <D2CMascot />
      <D2CExitIntentModal />
    </>
  );
}

