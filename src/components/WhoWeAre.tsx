"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { MegaphoneIcon, MonitorIcon, BoltIcon } from "@/components/icons";

const EASE = [0.16, 1, 0.3, 1] as const;

const pillars = [
  {
    icon: MegaphoneIcon,
    title: "Creative Media",
    description:
      "We craft visual identities, campaigns, and content that stop the scroll and tell your brand story with clarity and conviction.",
  },
  {
    icon: MonitorIcon,
    title: "Technology",
    description:
      "From high-performance websites to custom digital platforms we build scalable tech that powers your business behind the scenes.",
  },
  {
    icon: BoltIcon,
    title: "Artificial Intelligence",
    description:
      "We integrate AI into your workflows, marketing, and products making your business smarter, faster, and more competitive every day.",
  },
];

const stats = [
  { value: "3-in-1", caption: "Creative · Tech · AI under one roof", span: "col-span-2 sm:col-span-2" },
  { value: "50+", numeric: 50, suffix: "+", caption: "Brands grown digitally", span: "" },
  { value: "100%", numeric: 100, suffix: "%", caption: "ROI-focused delivery", span: "" },
  { value: "Ahmedabad", caption: "HQ · Serving India & beyond", span: "col-span-2 sm:col-span-4" },
];

const clients = [
  "Manufacturers",
  "D2C Startups",
  "B2B Companies",
  "Tech Founders",
  "Product Businesses",
  "Growth-Stage Brands",
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
    transition: { duration: 0.7, ease: EASE },
  },
};

const headlineContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const word = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE },
  },
};

const headlineLead = ["Where", "creativity", "meets", "code"];
const headlineAccent = ["and", "ideas", "become", "impact"];

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (value) => setCount(Math.round(value)),
    });
    return () => controls.stop();
  }, [isInView, to]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function WhoWeAre() {
  return (
    <section className="w-full overflow-hidden bg-white pt-14 pb-10 sm:pt-16 sm:pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <motion.div
            variants={headlineContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-8"
          >
            <motion.span
              variants={word}
              className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-black/60"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Who We Are
            </motion.span>

            <h2 className="mt-6 flex flex-wrap gap-x-3 gap-y-1 font-heading text-4xl font-bold leading-[0.98] tracking-tight text-black sm:text-6xl lg:text-7xl">
              {headlineLead.map((w, i) => (
                <motion.span key={`lead-${i}`} variants={word}>
                  {w}
                </motion.span>
              ))}
              {headlineAccent.map((w, i) => (
                <motion.span key={`accent-${i}`} variants={word} className="text-accent">
                  {w}
                </motion.span>
              ))}
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
            className="text-lg leading-8 text-black/60 lg:col-span-4"
          >
            Sarvopaya is a creative media, technology and AI company built
            for businesses that refuse to stand still. We sit at the
            intersection of bold storytelling, intelligent systems, and
            growth strategy turning complex ideas into digital experiences
            that attract, engage, and convert.
          </motion.p>
        </div>

        {/* Three pillars */}
        <div className="mt-24">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-sm font-semibold uppercase tracking-widest text-black/40"
          >
            Our Three Pillars
          </motion.p>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3"
          >
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                variants={item}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="group relative flex flex-col overflow-hidden rounded-3xl bg-black p-8 shadow-xl shadow-black/5 transition-colors duration-500 hover:bg-accent sm:p-10"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-4 -top-8 font-heading text-[9rem] font-bold leading-none text-white/5 transition-colors duration-500 group-hover:text-white/10 sm:text-[11rem]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <pillar.icon className="relative h-12 w-12 text-accent transition-colors duration-500 group-hover:text-white" />
                <h3 className="relative mt-8 font-heading text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
                  {pillar.title}
                </h3>
                <p className="relative mt-4 text-base leading-7 text-white/60 transition-colors duration-500 group-hover:text-white/85">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* By the numbers */}
        <div className="mt-24">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-sm font-semibold uppercase tracking-widest text-black/40"
          >
            By The Numbers
          </motion.p>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-black/10 bg-black/10 sm:grid-cols-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.value}
                variants={item}
                className={`bg-white p-6 sm:p-8 ${stat.span}`}
              >
                <p className="font-heading text-5xl font-bold tracking-tight text-black sm:text-6xl lg:text-7xl">
                  {stat.numeric ? (
                    <Counter to={stat.numeric} suffix={stat.suffix} />
                  ) : (
                    <span className="text-accent">{stat.value}</span>
                  )}
                </p>
                <p className="mt-3 text-sm leading-6 text-black/50">
                  {stat.caption}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* We work with */}
        <div className="mt-24">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-sm font-semibold uppercase tracking-widest text-black/40"
          >
            We Work With
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="relative mt-8 select-none overflow-hidden py-6"
      >
        <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
          {Array.from({ length: 2 }, (_, loop) =>
            clients.map((client, i) => (
              <span key={`${loop}-${i}`} className="flex items-center gap-10">
                <span
                  className="font-heading text-2xl font-bold uppercase tracking-tight text-transparent sm:text-4xl"
                  style={{ WebkitTextStroke: "1.5px black" }}
                >
                  {client}
                </span>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  className="shrink-0 text-2xl text-black sm:text-3xl"
                  aria-hidden="true"
                >
                  ✳
                </motion.span>
              </span>
            )),
          )}
        </div>
      </motion.div>
    </section>
  );
}
