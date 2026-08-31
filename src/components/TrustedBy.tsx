"use client";

import { motion } from "framer-motion";

const logos = [
  { src: "/images/clients/kaleen-baba.png",          alt: "Kaleen Baba" },
  { src: "/images/clients/sander-dickkopp.png",       alt: "Sander Dickkopp" },
  { src: "/images/clients/capitel-flux.png",          alt: "Capitel Flux" },
  { src: "/images/clients/urban-money.png",           alt: "Urban Money" },
  { src: "/images/clients/luniva.png",                alt: "Luniva" },
  { src: "/images/clients/raj-tandoor.png",           alt: "Raj Tandoor and Kitchen Equipment" },
  { src: "/images/clients/kareliya.png",              alt: "Kareliya Equipments" },
  { src: "/images/clients/jp-consultancy.png",        alt: "JP Consultancy" },
  { src: "/images/clients/hkt-consultancy.png",       alt: "HKT Consultancy" },
  { src: "/images/clients/shreedhar-spacecraft.png",  alt: "Shreedhar Spacecraft" },
  { src: "/images/clients/fair-print-solutions.png",  alt: "Fair Print Solutions GmbH" },
];

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
        Trusted by manufacturers, startups, and growing businesses across India
      </motion.p>

      <div className="relative mt-10 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-24" />
        <div className="flex w-max shrink-0 animate-marquee items-center gap-16 py-4">
          {[...logos, ...logos].map((logo, index) => (
            <div key={index} className="flex shrink-0 items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.src}
                alt={logo.alt}
                width={200}
                height={56}
                className="h-10 w-auto max-w-[160px] object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-14 sm:max-w-[200px]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
