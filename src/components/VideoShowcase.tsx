"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function VideoShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const width = useTransform(scrollYProgress, [0, 0.5, 1], ["90%", "100%", "90%"]);
  const radius = useTransform(scrollYProgress, [0, 0.5, 1], [32, 0, 32]);

  return (
    <section ref={sectionRef} className="w-full bg-white pt-12 pb-8 sm:pt-16 sm:pb-10">
      <motion.div
        style={{ width, borderRadius: radius }}
        className="relative mx-auto aspect-video overflow-hidden bg-black"
      >
        {/* Subtle grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Accent glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 65%, rgba(237,40,48,0.09) 0%, transparent 58%)",
          }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-7 text-center">
          {/* Pulsing play ring */}
          <div className="relative flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.18, 0, 0.18] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
              className="absolute h-20 w-20 rounded-full bg-accent"
            />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/12 bg-white/6 backdrop-blur-sm sm:h-20 sm:w-20">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-6 w-6 translate-x-0.5 text-white/40 sm:h-7 sm:w-7"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/25">
              Coming Soon
            </p>
            <h3 className="mt-2 font-heading text-3xl font-bold uppercase tracking-tight text-white/75 sm:text-5xl lg:text-6xl">
              Sarvopaya Showreel
            </h3>
            <p className="mt-2 text-sm text-white/25">2025</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
