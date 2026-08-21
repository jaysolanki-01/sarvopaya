"use client";

import { motion } from "framer-motion";
import CTAButton from "@/components/CTAButton";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const word = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const headline = ["Be", "clear", "first."];
const marqueeWord = "CLARITY  •  ";

export default function FinalCTA() {
  return (
    <section className="relative w-full overflow-hidden bg-black py-14 sm:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap"
      >
        <div className="flex w-max animate-marquee items-center">
          {Array.from({ length: 8 }, (_, i) => (
            <span
              key={i}
              className="text-[140px] font-bold uppercase leading-none text-transparent sm:text-[200px]"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.05)" }}
            >
              {marqueeWord}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/60"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Ready When You Are
        </motion.span>

        <motion.h2
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="mt-8 flex flex-wrap justify-center gap-x-4 text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl"
        >
          {headline.map((w, i) => (
            <motion.span
              key={i}
              variants={word}
              className={i === headline.length - 1 ? "text-accent" : ""}
            >
              {w}
            </motion.span>
          ))}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/60"
        >
          No jargon, no vague retainers — just a straight conversation about
          where you are, where you want to be, and how we get you there.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-12 inline-flex items-center justify-center"
        >
          <motion.span
            aria-hidden="true"
            className="absolute inset-0 rounded-full border border-accent/50"
            animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <CTAButton href="/contact" variant="inverted" size="lg">
            Book a call now
          </CTAButton>
        </motion.div>
      </div>
    </section>
  );
}
