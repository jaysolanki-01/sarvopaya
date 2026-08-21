"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const logos = Array.from({ length: 8 }, () => "/images/Logo_black.png");

export default function TrustedBy() {
  return (
    <section className="w-full bg-white py-10 sm:py-14">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-2xl px-4 text-center text-sm font-semibold uppercase tracking-wide text-black/50 sm:text-base"
      >
        Trusted by manufacturers, startups, and growing businesses across
        India
      </motion.p>

      <div className="relative mt-10 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-24" />
        <div className="flex w-max shrink-0 animate-marquee items-center gap-16 py-4">
          {[...logos, ...logos].map((src, index) => (
            <div key={index} className="flex shrink-0 items-center justify-center">
              <Image
                src={src}
                alt="Client logo"
                width={3564}
                height={719}
                className="h-10 w-auto object-contain opacity-60 transition-opacity hover:opacity-100 sm:h-14"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
