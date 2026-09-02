"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const EASE = [0.16, 1, 0.3, 1] as const;
const up = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
const seq = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const povs = [
  {
    title: "Why 80% of D2C brands fail at paid advertising — and what the successful ones do differently",
    date: "August 2026",
    tag: "Performance Marketing",
    excerpt:
      "Most D2C brands treat Meta Ads as a tap. Turn it on, money comes out. Turn it off, nothing. Here's why that mental model destroys margins and what building a real acquisition system actually looks like.",
    slug: "#",
  },
  {
    title: "AI automation isn't about replacing people — it's about removing the work that was already wasting them",
    date: "July 2026",
    tag: "AI Automation",
    excerpt:
      "Every founder I talk to thinks AI automation will reduce headcount. The ones who actually deploy it find the opposite — their team finally has time to do the work that moves the needle.",
    slug: "#",
  },
  {
    title: "The SEO strategy that worked in 2022 is actively hurting you in 2026",
    date: "June 2026",
    tag: "SEO & GEO",
    excerpt:
      "Keyword stuffing, thin cluster pages, guest post link farms. These tactics did not just stop working — Google is now penalising the sites that relied on them. Here's the 2026 playbook.",
    slug: "#",
  },
  {
    title: "Why Indian agencies should stop apologising for being Indian",
    date: "May 2026",
    tag: "Founder POV",
    excerpt:
      "The conversation in our industry defaults to 'we can match Western quality at Indian prices.' That framing is wrong. Here's why Indian market knowledge is an unfair advantage, not a liability.",
    slug: "#",
  },
];

export default function FoundersPovPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroIv = useInView(heroRef, { once: true, amount: 0.3 });
  const povsRef = useRef<HTMLDivElement>(null);
  const povsIv = useInView(povsRef, { once: true, amount: 0.1 });

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-white pb-20 pt-32" ref={heroRef}>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 select-none font-black uppercase leading-none text-black/[0.03]"
          style={{ fontSize: "clamp(80px,14vw,200px)" }}
        >
          POV
        </span>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={seq} initial="hidden" animate={heroIv ? "show" : "hidden"}>
            <motion.span
              variants={up}
              className="mb-4 inline-block rounded-full border border-black/10 bg-black/[0.04] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-black/50"
            >
              Founder&apos;s POVs
            </motion.span>
            <motion.h1
              variants={up}
              className="font-heading text-5xl font-black leading-[1.05] tracking-tight text-black sm:text-6xl lg:text-7xl"
            >
              Unfiltered Takes.
              <br />
              <span className="text-[var(--accent)]">Real Opinions.</span>
            </motion.h1>
            <motion.p
              variants={up}
              className="mt-6 max-w-xl text-lg leading-relaxed text-black/50 sm:text-xl"
            >
              Direct thoughts on growth, performance marketing, AI automation and building a brand
              in India — from Jay Solanki, founder of Sarvopaya.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── POVs ── */}
      <section className="bg-white pb-32 pt-4" ref={povsRef}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {povs.map((pov, i) => (
              <motion.article
                key={pov.title}
                initial={{ opacity: 0, y: 20 }}
                animate={povsIv ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
                className="group rounded-3xl border border-black/8 bg-white p-8 transition-shadow duration-300 hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/5 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
                    {pov.tag}
                  </span>
                  <span className="text-xs text-black/30">{pov.date}</span>
                </div>
                <h2 className="mt-5 font-heading text-xl font-bold leading-snug text-black group-hover:text-[var(--accent)] transition-colors duration-300">
                  {pov.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-black/50">{pov.excerpt}</p>
                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-black/30 transition-colors duration-300 group-hover:text-[var(--accent)]">
                  Read POV
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Coming soon note */}
          <div className="mt-16 rounded-3xl border border-dashed border-black/10 bg-black/[0.02] p-10 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-black/30">More POVs Coming</p>
            <p className="mt-3 text-base text-black/50">
              New founder perspectives published monthly. Want to discuss a topic?{" "}
              <Link href="/contact" className="font-bold text-black underline-offset-2 hover:text-[var(--accent)] hover:underline">
                Start a conversation.
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
