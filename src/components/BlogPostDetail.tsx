"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import CTAButton from "@/components/CTAButton";

const EASE = [0.16, 1, 0.3, 1] as const;
const up = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const seq = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

export type BlogTable = {
  caption?: string;
  headers: string[];
  rows: string[][];
};

export type BlogChartBar = {
  label: string;
  value: number;
  formattedValue: string;
  color?: "accent" | "emerald" | "amber" | "neutral" | "rose";
  annotation?: string;
};

export type BlogChart = {
  title: string;
  subtitle?: string;
  type: "waterfall" | "bar" | "cohort";
  bars: BlogChartBar[];
  insightNote?: string;
};

export type ArticleItem = {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  readTime: string;
  author: string;
  sections: {
    heading: string;
    body: string;
    table?: BlogTable;
    chart?: BlogChart;
    subsections?: {
      heading: string;
      body: string;
      table?: BlogTable;
      chart?: BlogChart;
    }[];
  }[];
  faqs?: { question: string; answer: string }[];
};

function BlogTableRenderer({ table }: { table: BlogTable }) {
  return (
    <div className="my-8 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">
      {table.caption && (
        <div className="border-b border-black/6 bg-black/[0.02] px-6 py-3.5">
          <p className="text-xs font-bold uppercase tracking-wider text-black/60">
            {table.caption}
          </p>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-black/8 bg-black/[0.03] text-xs font-bold uppercase tracking-wider text-black/70">
            <tr>
              {table.headers.map((h, i) => (
                <th key={i} className="px-5 py-3.5 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-black/6">
            {table.rows.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-black/[0.015] transition-colors">
                {row.map((cell, cIdx) => (
                  <td
                    key={cIdx}
                    className={`px-5 py-4 leading-relaxed ${
                      cIdx === 0
                        ? "font-bold text-black whitespace-nowrap"
                        : "text-black/75"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BlogChartRenderer({ chart }: { chart: BlogChart }) {
  const colorMap = {
    accent: "bg-[var(--accent)] text-white",
    emerald: "bg-emerald-500 text-white",
    amber: "bg-amber-500 text-white",
    rose: "bg-rose-500 text-white",
    neutral: "bg-neutral-800 text-white",
  };

  return (
    <div className="my-8 rounded-3xl border border-black/8 bg-black/[0.02] p-6 sm:p-8">
      <div className="mb-6">
        <span className="inline-block rounded-full bg-black/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black/50">
          Visual Model & Benchmark
        </span>
        <h4 className="mt-2 text-lg font-black tracking-tight text-black sm:text-xl">
          {chart.title}
        </h4>
        {chart.subtitle && (
          <p className="mt-1 text-xs text-black/50">{chart.subtitle}</p>
        )}
      </div>

      <div className="space-y-4">
        {chart.bars.map((bar, idx) => {
          const colorKey = bar.color || "accent";
          return (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-black">{bar.label}</span>
                <span className="font-mono font-bold text-black">
                  {bar.formattedValue}
                </span>
              </div>
              <div className="relative h-6 w-full overflow-hidden rounded-full bg-black/6">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min(Math.max(bar.value, 6), 100)}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.08, ease: EASE }}
                  className={`h-full rounded-full flex items-center px-3 text-[11px] font-bold ${
                    colorMap[colorKey]
                  }`}
                >
                  {bar.value >= 25 && bar.formattedValue}
                </motion.div>
              </div>
              {bar.annotation && (
                <p className="text-[11px] text-black/45 leading-tight">
                  {bar.annotation}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {chart.insightNote && (
        <div className="mt-6 rounded-xl border border-black/6 bg-white p-4 text-xs leading-relaxed text-black/70">
          <span className="font-bold text-black">Strategic Takeaway: </span>
          {chart.insightNote}
        </div>
      )}
    </div>
  );
}

export default function BlogPostDetail({
  post,
  parentLabel = "Blogs",
  parentHref = "/resource/blogs",
  watermark = "ARTICLE",
}: {
  post: ArticleItem;
  parentLabel?: string;
  parentHref?: string;
  watermark?: string;
}) {
  return (
    <article>
      {/* ── HEADER ── */}
      <section className="relative overflow-hidden bg-white pb-12 pt-28 sm:pt-32">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 select-none font-black uppercase leading-none text-black/[0.03]"
          style={{ fontSize: "clamp(80px,14vw,200px)" }}
        >
          {watermark}
        </span>

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate="show">
            {/* Breadcrumb */}
            <motion.div variants={up} className="mb-6 flex items-center gap-2 text-xs text-black/40">
              <Link href="/resources" className="hover:text-black transition-colors">Resources</Link>
              <span>/</span>
              <Link href={parentHref} className="hover:text-black transition-colors">{parentLabel}</Link>
            </motion.div>

            {/* Tag + date */}
            <motion.div variants={up} className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                {post.tag}
              </span>
              <span className="text-xs text-black/30">{post.date}</span>
              <span className="text-xs text-black/30">·</span>
              <span className="text-xs text-black/30">{post.readTime}</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={up}
              className="mt-6 text-3xl font-black leading-[1.1] tracking-tight text-black sm:text-4xl lg:text-5xl"
            >
              {post.title}
            </motion.h1>

            {/* Excerpt / intro */}
            <motion.p variants={up} className="mt-5 text-lg leading-relaxed text-black/50 sm:text-xl">
              {post.excerpt}
            </motion.p>

            {/* Author */}
            <motion.div variants={up} className="mt-8 flex items-center gap-3">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
                <Image
                  src="/images/jay-solanki.png"
                  alt="Jay Solanki"
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-black">{post.author}</p>
                <p className="text-xs text-black/40">Founder, Sarvopaya</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="h-px bg-black/8" />
      </div>

      {/* ── BODY ── */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {post.sections.map((section, i) => (
              <motion.div
                key={section.heading}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.05 }}
              >
                <h2 className="text-xl font-black tracking-tight text-black sm:text-2xl">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.body.split("\n\n").map((para, j) => (
                    <p key={j} className="text-base leading-relaxed text-black/60 sm:text-lg">
                      {para}
                    </p>
                  ))}
                </div>

                {section.table && <BlogTableRenderer table={section.table} />}
                {section.chart && <BlogChartRenderer chart={section.chart} />}

                {section.subsections && section.subsections.length > 0 && (
                  <div className="mt-8 space-y-8 pl-0 sm:pl-4 border-l-2 border-black/8">
                    {section.subsections.map((sub, k) => (
                      <div key={k} className="space-y-3">
                        <h3 className="text-lg font-bold tracking-tight text-black sm:text-xl">
                          {sub.heading}
                        </h3>
                        <div className="space-y-3">
                          {sub.body.split("\n\n").map((para, m) => (
                            <p key={m} className="text-base leading-relaxed text-black/60 sm:text-lg">
                              {para}
                            </p>
                          ))}
                        </div>
                        {sub.table && <BlogTableRenderer table={sub.table} />}
                        {sub.chart && <BlogChartRenderer chart={sub.chart} />}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}

            {post.faqs && post.faqs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="pt-10 border-t border-black/8"
              >
                <div className="mb-8">
                  <span className="mb-2 inline-block rounded-full border border-black/10 bg-black/[0.04] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black/50">
                    FAQ
                  </span>
                  <h2 className="text-2xl font-black tracking-tight text-black sm:text-3xl">
                    Frequently Asked Questions About D2C Marketing
                  </h2>
                  <p className="mt-2 text-sm text-black/50">
                    Expert answers to strategic questions direct-to-consumer founders and growth teams ask.
                  </p>
                </div>
                <div className="space-y-4">
                  {post.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-black/8 bg-black/[0.02] p-6 transition-colors hover:border-black/15"
                    >
                      <h3 className="text-base font-bold text-black sm:text-lg">
                        {faq.question}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-black/65 sm:text-base">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-black py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-white/30">
              Sarvopaya
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Want to discuss this for your business?
            </h2>
            <p className="mt-4 text-base text-white/50">
              Every insight in this article is something we apply for clients. If you want to explore what it looks like for your brand, let&apos;s talk.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <CTAButton href="/contact" variant="primary" size="lg">
                Start the Conversation
              </CTAButton>
              <CTAButton href={parentHref} variant="outline" size="lg">
                ← Back to {parentLabel}
              </CTAButton>
            </div>
          </motion.div>
        </div>
      </section>
    </article>
  );
}
