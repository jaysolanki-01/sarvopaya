"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GearIcon, TargetIcon, BoltIcon, RocketIcon, ChartIcon } from "@/components/icons";

const steps = [
  {
    icon: GearIcon,
    title: "Discover",
    description:
      "We audit your current tech stack, workflows, and growth blockers to map exactly where automation can save time and drive revenue.",
    bullets: ["Tech stack audit", "Workflow mapping", "Bottleneck diagnosis"],
  },
  {
    icon: TargetIcon,
    title: "Strategize",
    description:
      "We design the automation blueprint mapping data flows, integration points, and trigger logic before a single line of code is written.",
    bullets: ["Automation blueprint", "Integration planning", "Trigger logic design"],
  },
  {
    icon: BoltIcon,
    title: "Build & Automate",
    description:
      "Our team builds and wires up the workflows CRM syncs, AI chatbots, reporting pipelines so your systems start talking to each other.",
    bullets: ["CRM & tool integration", "AI workflow build", "QA & trigger testing"],
  },
  {
    icon: RocketIcon,
    title: "Launch",
    description:
      "We roll out in a controlled environment, test every trigger and edge case, then flip the switch on your fully automated pipeline.",
    bullets: ["Staged rollout", "Edge-case testing", "Go-live monitoring"],
  },
  {
    icon: ChartIcon,
    title: "Optimize",
    description:
      "We monitor performance, tune thresholds, and keep refining the automation as your business scales.",
    bullets: ["Performance tuning", "Reporting automation", "Continuous iteration"],
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

export default function HowItWorks() {
  const [active, setActive] = useState(0);

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
            How It Works
          </motion.span>

          <motion.h2
            variants={item}
            className="mt-6 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl"
          >
            A process built to <span className="text-accent">automate your growth</span>
          </motion.h2>
        </motion.div>

        <div className="relative mt-16 pl-6 sm:pl-8">
          <div className="absolute left-6 top-2 bottom-2 w-px bg-black/10 sm:left-8" />
          <motion.div
            className="absolute left-6 top-2 w-px origin-top bg-accent sm:left-8"
            initial={{ height: 0 }}
            whileInView={{ height: `${(active / (steps.length - 1)) * 100}%` }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />

          {steps.map((step, index) => {
            const isActive = active === index;
            return (
              <div key={step.title} className="relative pb-2">
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  className="group flex w-full items-center gap-5 py-6 text-left sm:gap-8"
                >
                  <span
                    className={`relative z-10 -ml-[calc(1.5rem+7px)] flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-300 sm:-ml-[calc(2rem+7px)] ${
                      isActive || active > index
                        ? "border-accent bg-accent"
                        : "border-black/20 bg-white"
                    }`}
                  />

                  <span className="w-10 shrink-0 font-heading text-base font-bold text-black/30 sm:w-16 sm:text-lg">
                    ({String(index + 1).padStart(2, "0")})
                  </span>

                  <step.icon
                    className={`hidden h-6 w-6 shrink-0 transition-colors duration-300 sm:block sm:h-7 sm:w-7 ${
                      isActive ? "text-accent" : "text-black/30"
                    }`}
                  />

                  <h3
                    className={`font-heading font-bold uppercase tracking-tight transition-all duration-300 ${
                      isActive ? "text-xl text-black sm:text-4xl" : "text-base text-black/40 sm:text-2xl"
                    }`}
                  >
                    {step.title}
                  </h3>

                  <span
                    className={`ml-auto text-xl text-black/30 transition-transform duration-300 ${
                      isActive ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="pb-8 pl-[3.75rem] sm:pl-[7.25rem]"
                  >
                    <p className="max-w-xl text-base text-black/60 sm:text-lg">
                      {step.description}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-3">
                      {step.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-center gap-2 rounded-full border border-black/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-black sm:text-sm"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
