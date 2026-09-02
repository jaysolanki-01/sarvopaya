"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import CTAButton from "@/components/CTAButton";
import type { BlogPost } from "@/lib/blogPosts";

const EASE = [0.16, 1, 0.3, 1] as const;
const up = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const seq = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } };

export default function BlogPostDetail({ post }: { post: BlogPost }) {
  return (
    <article>
      {/* ── HEADER ── */}
      <section className="relative overflow-hidden bg-white pb-12 pt-28 sm:pt-32">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 select-none font-black uppercase leading-none text-black/[0.03]"
          style={{ fontSize: "clamp(80px,14vw,200px)" }}
        >
          POV
        </span>

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate="show">
            {/* Breadcrumb */}
            <motion.div variants={up} className="mb-6 flex items-center gap-2 text-xs text-black/40">
              <Link href="/resources" className="hover:text-black transition-colors">Resources</Link>
              <span>/</span>
              <Link href="/resources/founders-pov" className="hover:text-black transition-colors">Founder&apos;s POV</Link>
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
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                J
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
              </motion.div>
            ))}
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
              <CTAButton href="/resources/founders-pov" variant="outline" size="lg">
                ← Back to POVs
              </CTAButton>
            </div>
          </motion.div>
        </div>
      </section>
    </article>
  );
}
