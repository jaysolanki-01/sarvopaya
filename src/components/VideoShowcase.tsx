"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CTAButton from "@/components/CTAButton";

const EASE = [0.16, 1, 0.3, 1] as const;

const overlayReveal = {
  rest: { opacity: 0, y: 24 },
  hover: { opacity: 1, y: 0 },
};

const dimReveal = {
  rest: { opacity: 0 },
  hover: { opacity: 1 },
};

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
        initial="rest"
        animate="rest"
        whileHover="hover"
        style={{ width, borderRadius: radius }}
        className="relative mx-auto aspect-video overflow-hidden bg-black shadow-2xl"
      >
        <video
          className="h-full w-full object-cover"
          src="/videos/dummy.mp4"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          disableRemotePlayback
        />
        <motion.div
          aria-hidden="true"
          variants={dimReveal}
          transition={{ duration: 0.4, ease: EASE }}
          className="absolute inset-0 bg-black/40"
        />
        <motion.div
          variants={overlayReveal}
          transition={{ duration: 0.45, ease: EASE }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <CTAButton href="/contact" variant="primary" size="lg">
            Contact Us
          </CTAButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
