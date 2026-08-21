"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CTAButton from "@/components/CTAButton";
import { FunnelIcon, MonitorIcon, BoltIcon, TargetIcon } from "@/components/icons";

const services = [
  {
    icon: FunnelIcon,
    title: "Lead Generation",
    subtitle: "We design data-driven lead generation campaigns that bring the right buyers to your door. From paid ads to inbound funnels — we build pipelines that fill themselves.",
    gradient: "from-black to-neutral-800",
    bullets: [
      "Paid Ads & Media Buying",
      "Inbound Funnels",
      "Lead Scoring & Qualification",
      "Campaign Analytics",
    ],
    href: "/services/lead-generation-growth-marketing",
  },
  {
    icon: MonitorIcon,
    title: "Website & Digital",
    subtitle: "Your website is your most powerful salesperson. We craft fast, conversion-focused digital experiences that turn visitors into leads and leads into loyal customers.",
    gradient: "from-accent to-red-800",
    bullets: [
      "UX / UI Design",
      "Conversion Rate Optimization",
      "Landing Pages & Funnels",
      "Performance & SEO",
    ],
    href: "/services/website-digital-experience",
  },
  {
    icon: BoltIcon,
    title: "AI & Automation",
    subtitle: "We embed intelligent automation into your business — from AI chatbots to workflow automation — so you can do more with less effort and scale without adding headcount.",
    gradient: "from-neutral-800 to-black",
    bullets: [
      "AI Chatbots",
      "Workflow Automation",
      "CRM Integration",
      "Reporting Automation",
    ],
    href: "/services/ai-automation",
  },
  {
    icon: TargetIcon,
    title: "Growth Consulting",
    subtitle: "Unsure where to start? Our growth experts analyse your current digital footprint, identify gaps, and build a clear roadmap to sustainable, measurable growth.",
    gradient: "from-neutral-700 to-neutral-900",
    bullets: [
      "Digital Audit",
      "Growth Strategy",
      "Roadmap Planning",
      "Ongoing Advisory",
    ],
    href: "/services/growth-consulting",
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

export default function WhatWeDo() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section className="w-full bg-white pt-10 pb-14 sm:pt-14 sm:pb-16">
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
            What We Do?
          </motion.span>

          <motion.h2
            variants={item}
            className="mt-6 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl"
          >
            Everything you need to <span className="text-red-500">grow digitally under one roof</span>{" "}
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          onMouseLeave={() => setActive(null)}
          className="mt-14 border-t border-dashed border-black/20"
        >
          {services.map((service, index) => {
            const isActive = active === index;

            return (
              <div
              key={service.title}
              onMouseEnter={() => setActive(index)}
              onClick={() => setActive(index)}
                className="cursor-pointer border-b border-dashed border-black/20 py-8 transition-colors"
          >
                <div className="flex items-center gap-3 sm:gap-8">
                  <span className="w-8 shrink-0 font-heading text-sm font-bold text-black/30 sm:w-16 sm:text-lg">
                    ({String(index + 1).padStart(2, "0")})
                  </span>

                  <motion.div
                    layout
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${service.gradient} ${
                      isActive ? "h-16 w-24 sm:h-40 sm:w-64" : "h-10 w-16 sm:h-16 sm:w-24"
                    }`}
                  >
                    <service.icon
                      className={`text-white/25 transition-all duration-500 ${
                        isActive ? "h-14 w-14 sm:h-16 sm:w-16" : "h-7 w-7"
                      }`}
                    />
                  </motion.div>

                  <h3
                    className={`font-heading font-bold uppercase tracking-tight transition-all duration-500 ${
                      isActive
                        ? "text-lg text-black sm:text-4xl lg:text-5xl"
                        : "text-base text-black/40 sm:text-2xl"
                    }`}
                  >
                    {service.title}
                  </h3>
                </div>

                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-6 pl-10 sm:pl-[6.5rem]"
                  >
                    <p className="text-base text-black/60 sm:text-lg">
                      {service.subtitle}
                    </p>
                    <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {service.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-black sm:text-sm"
                        >
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-accent text-white">
                            &#8599;
                          </span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <CTAButton href={service.href} variant="primary" size="sm">
                        View More
                      </CTAButton>
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 flex justify-center"
        >
          <CTAButton href="/case-studies" variant="primary" size="lg">
            Check out our best work for your growth
          </CTAButton>
        </motion.div>
      </div>
    </section>
  );
}
