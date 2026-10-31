"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";

interface IndustryData {
  sector: string;
  shortName: string;
  rate: number;
  aov: string;
  repeatRate: string;
  driver: string;
  highlight?: boolean;
}

const INDUSTRY_CONVERSION_DATA: IndustryData[] = [
  {
    sector: "Beauty & Skincare",
    shortName: "Beauty",
    rate: 3.8,
    aov: "₹2,200 / $55",
    repeatRate: "42% (High)",
    driver: "UGC unboxings, routine bundles & before/after proof",
    highlight: true,
  },
  {
    sector: "Health & Supplements",
    shortName: "Supplements",
    rate: 3.4,
    aov: "₹2,800 / $68",
    repeatRate: "48% (Very High)",
    driver: "Subscription discounts, clinical studies & quiz funnels",
    highlight: true,
  },
  {
    sector: "Food & Beverage",
    shortName: "Food & Bev",
    rate: 3.1,
    aov: "₹1,600 / $38",
    repeatRate: "38% (High)",
    driver: "Impulse flavor variety packs & low entry price points",
    highlight: true,
  },
  {
    sector: "Pet Care & Supplies",
    shortName: "Pet Care",
    rate: 2.7,
    aov: "₹3,100 / $72",
    repeatRate: "45% (High)",
    driver: "Emotional connection & automated auto-ship replenishment",
  },
  {
    sector: "Apparel & Footwear",
    shortName: "Apparel",
    rate: 2.3,
    aov: "₹2,600 / $64",
    repeatRate: "26% (Moderate)",
    driver: "Accurate size finders, instant exchanges & model videos",
  },
  {
    sector: "Home Goods & Furniture",
    shortName: "Home Goods",
    rate: 1.6,
    aov: "₹8,500 / $195",
    repeatRate: "14% (Low)",
    driver: "Room visualizers, AR previews & 100-night trials",
  },
  {
    sector: "Consumer Electronics",
    shortName: "Electronics",
    rate: 1.4,
    aov: "₹11,000 / $240",
    repeatRate: "12% (Low)",
    driver: "Detailed tech comparison tables & no-questions warranties",
  },
  {
    sector: "Luxury Goods & Jewelry",
    shortName: "Luxury",
    rate: 1.1,
    aov: "₹18,500 / $380",
    repeatRate: "16% (Low)",
    driver: "High-touch concierge chat, hallmark certs & luxury packaging",
  },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: IndustryData;
    value: number;
  }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;

  return (
    <div className="z-50 rounded-2xl border border-black/10 bg-white p-4 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between gap-3 border-b border-black/6 pb-2.5">
        <p className="font-heading text-sm font-bold text-black">{data.sector}</p>
        <span className="rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-xs font-black text-white">
          {data.rate}% CVR
        </span>
      </div>
      <div className="mt-3 space-y-1.5 text-xs">
        <div className="flex justify-between gap-4">
          <span className="text-black/50">Benchmark AOV:</span>
          <span className="font-semibold text-black">{data.aov}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span className="text-black/50">Repeat Purchase Rate:</span>
          <span className="font-semibold text-black">{data.repeatRate}</span>
        </div>
        <div className="mt-2 border-t border-black/6 pt-2 text-[11px] text-black/70">
          <span className="font-bold text-black">Conversion Driver: </span>
          {data.driver}
        </div>
      </div>
    </div>
  );
}

export default function D2CIndustryConversionChart() {
  const [mounted, setMounted] = useState(false);
  const [activeSector, setActiveSector] = useState<string | null>("Beauty & Skincare");

  useEffect(() => {
    setMounted(true);
  }, []);

  const selectedData =
    INDUSTRY_CONVERSION_DATA.find((d) => d.sector === activeSector) ||
    INDUSTRY_CONVERSION_DATA[0];

  return (
    <div className="my-10 overflow-hidden rounded-3xl border border-black/8 bg-white p-6 shadow-sm sm:p-8">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="inline-block rounded-full bg-black/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black/50">
            Interactive Recharts Visualization
          </span>
          <h4 className="mt-2 text-xl font-black tracking-tight text-black sm:text-2xl">
            D2C E-Commerce Conversion Rates Across Industry Sectors (2026)
          </h4>
          <p className="mt-1 text-xs text-black/50">
            Empirical benchmarks compiled from high-growth direct-to-consumer brands worldwide.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start rounded-full border border-black/8 bg-black/[0.02] px-3 py-1.5 text-xs font-semibold text-black/60 sm:self-auto">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
          Industry Benchmark Average: <strong className="text-black">2.4%</strong>
        </div>
      </div>

      {/* Main Bar Chart Container */}
      <div className="mt-8 h-80 w-full sm:h-96">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={INDUSTRY_CONVERSION_DATA}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
            onMouseMove={(state: any) => {
              if (state && state.activePayload && state.activePayload.length) {
                setActiveSector(state.activePayload[0].payload.sector);
              }
            }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#00000010" />
            <XAxis
              type="number"
              domain={[0, 4.5]}
              unit="%"
              tick={{ fontSize: 11, fill: "#737373" }}
              axisLine={{ stroke: "#00000015" }}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="sector"
              width={140}
              tick={{ fontSize: 11, fill: "#171717", fontWeight: 500 }}
              axisLine={{ stroke: "#00000015" }}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,0,0,0.03)" }} />
            <Bar dataKey="rate" radius={[0, 8, 8, 0]} animationDuration={1200}>
              {INDUSTRY_CONVERSION_DATA.map((entry) => (
                <Cell
                  key={entry.sector}
                  fill={
                    entry.sector === activeSector
                      ? "var(--accent)"
                      : entry.highlight
                      ? "#171717"
                      : "#858585"
                  }
                  className="transition-all duration-200 cursor-pointer"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-2xl bg-black/[0.02]">
            <span className="text-xs font-semibold text-black/40">Loading interactive chart...</span>
          </div>
        )}
      </div>

      {/* Sector Spotlight Card */}
      <div className="mt-6 rounded-2xl border border-black/6 bg-black/[0.02] p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-black/40">
              Sector Spotlight (Hover to inspect)
            </span>
            <p className="mt-0.5 text-base font-bold text-black">{selectedData.sector}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div>
              <span className="text-black/40">Conversion Rate: </span>
              <strong className="text-[var(--accent)] text-sm">{selectedData.rate}%</strong>
            </div>
            <div>
              <span className="text-black/40">Avg AOV: </span>
              <strong className="text-black">{selectedData.aov}</strong>
            </div>
            <div>
              <span className="text-black/40">Repeat Rate: </span>
              <strong className="text-black">{selectedData.repeatRate}</strong>
            </div>
          </div>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-black/60">
          <strong className="text-black">Key Scaling Lever: </strong>
          {selectedData.driver}
        </p>
      </div>

      {/* Strategic Insight */}
      <div className="mt-4 rounded-xl border border-black/8 bg-white p-4 text-xs leading-relaxed text-black/70 shadow-sm">
        <strong className="text-black">Strategic Takeaway for D2C Operators: </strong>
        Consumable categories (Beauty, Supplements, Food &amp; Beverage) boast significantly higher conversion rates (3.1%–3.8%) due to lower purchase risk, frequent replenishment cycles, and relatable user-generated video proof. For high-ticket categories (Home Goods, Electronics, Luxury), conversion rates naturally sit lower (1.1%–1.6%), necessitating high-touch pre-purchase education, risk-reversal trials, and multi-step consultative booking or quiz funnels to scale profitably.
      </div>
    </div>
  );
}
