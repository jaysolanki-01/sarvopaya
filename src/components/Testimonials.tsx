"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Sarvopaya rebuilt our lead funnel from scratch and within two months our qualified pipeline doubled. They think like operators, not just an agency.",
    name: "Aarav Mehta",
    role: "Founder, D2C Nutrition Startup",
  },
  {
    quote:
      "We came to them with a factory floor of manual processes. They automated our reporting and CRM end to end it feels like we hired an entire ops team.",
    name: "Rohan Kapoor",
    role: "Director, Precision Manufacturing",
  },
  {
    quote:
      "The website redesign alone paid for itself in six weeks. Conversion rate optimization is where this team really separates from every other shop we tried.",
    name: "Priya Sundaram",
    role: "VP Marketing, B2B SaaS",
  },
  {
    quote:
      "As a solo founder I needed a partner who could move fast without hand-holding. Sarvopaya shipped our MVP launch campaign in under three weeks.",
    name: "Karan Shah",
    role: "Founder, Product-Led Startup",
  },
  {
    quote:
      "Their growth consulting gave us a roadmap we actually use every quarter. Clear priorities, real numbers, no fluff.",
    name: "Neha Iyer",
    role: "COO, Growth-Stage Brand",
  },
];

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

const slideVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -60 : 60 }),
};

export default function Testimonials() {
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);

  const paginate = (newDirection: number) => {
    setIndex(([current]) => {
      const next = (current + newDirection + testimonials.length) % testimonials.length;
      return [next, newDirection];
    });
  };

  const goTo = (target: number) => {
    setIndex(([current]) => [target, target > current ? 1 : -1]);
  };

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => paginate(1), 5000);
    return () => clearInterval(id);
  }, [paused]);

  const current = testimonials[index];

  return (
    <section className="w-full bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-3xl"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-black/60"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Testimonials
          </motion.span>

          <motion.h2
            variants={item}
            className="mt-6 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl"
          >
            Don&apos;t take our word for it —{" "}
            <span className="text-accent">hear it from them</span>
          </motion.h2>
        </motion.div>

        <div
          className="relative mt-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-16 left-0 select-none font-heading text-[160px] leading-none text-black/5 sm:text-[220px]"
          >
            &ldquo;
          </span>

          <div className="relative mx-auto min-h-[320px] max-w-3xl overflow-x-hidden sm:min-h-[240px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, dragInfo) => {
                  if (dragInfo.offset.x < -80) paginate(1);
                  else if (dragInfo.offset.x > 80) paginate(-1);
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative cursor-grab active:cursor-grabbing"
              >
                <p className="text-2xl font-medium leading-snug tracking-tight text-black sm:text-3xl">
                  {current.quote}
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent font-heading text-sm font-bold uppercase text-white">
                    {current.name.charAt(0)}
                  </span>
                  <div>
                    <p className="font-heading text-base font-bold text-black">{current.name}</p>
                    <p className="text-sm text-black/50">{current.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center gap-3">
            {testimonials.map((testimonial, dotIndex) => (
              <button
                key={testimonial.name}
                type="button"
                onClick={() => goTo(dotIndex)}
                aria-label={`Show testimonial from ${testimonial.name}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  dotIndex === index ? "w-8 bg-accent" : "w-1.5 bg-black/15 hover:bg-black/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
