"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import CTAButton from "@/components/CTAButton";


const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 select-none whitespace-nowrap text-[180px] font-bold uppercase leading-none text-transparent sm:-top-16 sm:text-[260px] lg:-top-24 lg:text-[360px]"
        style={{ WebkitTextStroke: "1px rgba(0,0,0,0.06)" }}
      >
        UPAYA
      </span>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start gap-8 lg:col-span-7"
        >
         

          <motion.h1 variants={item} className="max-w-2xl text-left text-black">
            <span className="block font-body text-xl font-normal text-black/40 sm:text-2xl">
              Your Partner For
            </span>
            <span className="mt-1 block text-5xl font-medium leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
              <span>SARV</span>{" "}
              <span className="font-body font-bold italic text-accent">
                Digital
              </span>{" "}
              <span>UPAYA</span>
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-xl text-left text-lg leading-8 text-black/60 sm:text-xl"
          >
            Sarvopaya helps ambitious businesses unlock digital growth, attract
            the right customers, and scale with confidence.
          </motion.p>

          <motion.div variants={item}>
            <CTAButton href="/contact" variant="primary" size="lg">
              Book a consultation call
            </CTAButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64 lg:col-span-5 lg:h-80 lg:w-80"
        >
          <motion.svg
            viewBox="0 0 200 200"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
            className="h-full w-full"
          >
            <defs>
              <path
                id="badgeCircle"
                fill="none"
                d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0"
              />
            </defs>
            <text
              className="fill-black uppercase"
              fontSize="12.5"
              fontWeight={600}
              letterSpacing="3"
            >
              <textPath href="#badgeCircle" startOffset="0%">
                Sarvopaya &bull; Digital Growth Partner &bull; Sarvopaya &bull;
                Digital Growth Partner &bull;
              </textPath>
            </text>
          </motion.svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/images/Main_icon.png"
              alt="Sarvopaya"
              width={500}
              height={500}
              className="h-28 w-28 drop-shadow-lg sm:h-32 sm:w-32 lg:h-36 lg:w-36"
            />
          </div>
        </motion.div>
      </div>

    
    </section>
  );
}
