"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CTAButton from "@/components/CTAButton";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import {
  InstagramIcon,
  FacebookIcon,
  LinkedInIcon,
  YoutubeIcon,
  MegaphoneIcon,
  ChartIcon,
  TargetIcon,
  StarIcon,
  BoltIcon,
  RocketIcon,
} from "@/components/icons";
import type { ComponentType } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

type Service = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  gradient: string;
  bullets: string[];
};

const services: Service[] = [
  {
    icon: InstagramIcon,
    title: "Instagram & Facebook Marketing",
    subtitle:
      "We craft scroll-stopping content, manage your community, and run data-driven ad campaigns that turn followers into paying customers on Meta platforms.",
    gradient: "from-black to-neutral-800",
    bullets: [
      "Feed & Reel Content Creation",
      "Stories & Highlights Strategy",
      "Meta Ads (FB + IG)",
      "Community Management",
    ],
  },
  {
    icon: LinkedInIcon,
    title: "LinkedIn B2B Marketing",
    subtitle:
      "Position your brand as an industry authority on LinkedIn. We build thought-leadership content and run targeted campaigns to reach decision-makers and fill your B2B pipeline.",
    gradient: "from-accent to-red-800",
    bullets: [
      "Company Page Management",
      "Thought-Leadership Posts",
      "LinkedIn Ads & Lead Gen Forms",
      "Personal Brand for Founders",
    ],
  },
  {
    icon: YoutubeIcon,
    title: "YouTube & Video Strategy",
    subtitle:
      "Video is the highest-converting content format. We plan, script, and optimise YouTube channels to grow your audience and generate inbound leads on autopilot.",
    gradient: "from-neutral-800 to-black",
    bullets: [
      "Channel Strategy & SEO",
      "Script & Production Brief",
      "Thumbnail & Title Optimisation",
      "YouTube Ads",
    ],
  },
  {
    icon: MegaphoneIcon,
    title: "Content Creation & Copywriting",
    subtitle:
      "From captions to carousels, every word and visual we create is designed to stop the scroll, tell your story, and move people to act.",
    gradient: "from-neutral-700 to-neutral-900",
    bullets: [
      "Monthly Content Calendar",
      "Graphic Design & Reels",
      "Brand-Voice Copywriting",
      "Hashtag & SEO Research",
    ],
  },
];

type Stat = {
  value: string;
  label: string;
};

const stats: Stat[] = [
  { value: "3×", label: "Average follower growth in 90 days" },
  { value: "60%", label: "More engagement vs. pre-campaign baseline" },
  { value: "40%", label: "Reduction in cost-per-lead with optimised ads" },
  { value: "2×", label: "Inbound inquiries from organic social content" },
];

type Step = {
  icon: ComponentType<{ className?: string }>;
  step: string;
  title: string;
  description: string;
};

const process: Step[] = [
  {
    icon: ChartIcon,
    step: "01",
    title: "Audit & Research",
    description:
      "We deep-dive into your current social presence, competitors, and audience to find exactly where the growth opportunity is hiding.",
  },
  {
    icon: TargetIcon,
    step: "02",
    title: "Strategy & Roadmap",
    description:
      "A 90-day content and ad strategy built around your goals — whether that's brand awareness, lead generation, or direct sales.",
  },
  {
    icon: StarIcon,
    step: "03",
    title: "Content Creation",
    description:
      "Our creative team produces on-brand graphics, reels, captions, and ads — reviewed and approved by you before anything goes live.",
  },
  {
    icon: BoltIcon,
    step: "04",
    title: "Publish & Engage",
    description:
      "We schedule posts at peak times, respond to comments, manage DMs, and keep your community active and engaged every day.",
  },
  {
    icon: RocketIcon,
    step: "05",
    title: "Optimise & Scale",
    description:
      "Monthly performance reviews with clear reporting. We double down on what works and cut what doesn't to keep growing your results.",
  },
];

type Platform = {
  icon: ComponentType<{ className?: string }>;
  name: string;
  description: string;
  best: string;
};

const platforms: Platform[] = [
  {
    icon: InstagramIcon,
    name: "Instagram",
    description: "Visual storytelling, reels, and shopping — ideal for B2C brands wanting to build a loyal, purchase-ready audience.",
    best: "B2C, Fashion, Food, Beauty, Lifestyle",
  },
  {
    icon: FacebookIcon,
    name: "Facebook",
    description: "The widest audience reach with the most powerful ad targeting engine. Great for lead generation and retargeting campaigns.",
    best: "Local Business, B2C, Events, Lead Gen",
  },
  {
    icon: LinkedInIcon,
    name: "LinkedIn",
    description: "The premium B2B network for reaching founders, managers, and decision-makers with thought leadership and direct outreach.",
    best: "B2B, SaaS, Consulting, Export",
  },
  {
    icon: YoutubeIcon,
    name: "YouTube",
    description: "The world's second-largest search engine. Long-form and short-form video that keeps working for you months after publishing.",
    best: "Education, SaaS, Manufacturing, Services",
  },
];

export default function SocialMediaMarketingPage() {
  const [activeService, setActiveService] = useState<number | null>(0);

  return (
    <>
      {/* Section 1 — Hero */}
      <section className="relative flex min-h-[calc(100dvh-4rem)] w-full items-center overflow-hidden bg-white">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 select-none whitespace-nowrap text-[120px] font-bold uppercase leading-none text-transparent sm:-top-16 sm:text-[190px] lg:-top-20 lg:text-[260px]"
          style={{ WebkitTextStroke: "1px rgba(0,0,0,0.06)" }}
        >
          SOCIAL
        </span>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-black/60"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Social Media Marketing Agency
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-black sm:text-6xl lg:text-7xl"
          >
            Social Media That{" "}
            <span className="text-accent">Sells</span>,<br />
            Not Just Scrolls
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-black/60 sm:text-xl"
          >
            We build and manage social media strategies for ambitious brands on Instagram,
            Facebook, LinkedIn, and YouTube — turning followers into real business growth.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <div className="w-full sm:w-auto">
              <CTAButton href="#platforms" variant="outline" size="lg" fullWidth>
                View Platforms
              </CTAButton>
            </div>
            <div className="w-full sm:w-auto">
              <CTAButton href="/contact" variant="primary" size="lg" fullWidth>
                Book Free Consultation
              </CTAButton>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Section 2 — Stats */}
      <section className="w-full border-y border-black/10 bg-black py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={container}
            className="grid grid-cols-2 gap-8 lg:grid-cols-4"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={item} className="text-center">
                <p className="font-heading text-4xl font-bold text-accent sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-white/60">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 3 — Services Accordion */}
      <section className="w-full bg-white pt-14 pb-10 sm:pt-16 sm:pb-12">
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
              What We Do
            </motion.span>

            <motion.h2
              variants={item}
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl"
            >
              Every Platform.{" "}
              <span className="text-accent">One Strategy.</span>
            </motion.h2>

            <motion.p variants={item} className="mt-4 max-w-xl text-base leading-7 text-black/60">
              From content creation to paid advertising — we handle your entire social media
              presence so you can focus on running your business.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: EASE }}
            onMouseLeave={() => setActiveService(null)}
            className="mt-10 border-t border-dashed border-black/20"
          >
            {services.map((service, index) => {
              const isActive = activeService === index;
              return (
                <div
                  key={service.title}
                  onMouseEnter={() => setActiveService(index)}
                  onClick={() => setActiveService(index)}
                  className="cursor-pointer border-b border-dashed border-black/20 py-8 transition-colors"
                >
                  <div className="flex items-center gap-3 sm:gap-8">
                    <span className="w-8 shrink-0 font-heading text-sm font-bold text-black/30 sm:w-16 sm:text-lg">
                      ({String(index + 1).padStart(2, "0")})
                    </span>

                    <motion.div
                      layout
                      transition={{ duration: 0.5, ease: EASE }}
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
                      transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
                      className="mt-6 pl-10 sm:pl-[6.5rem]"
                    >
                      <p className="text-base text-black/60 sm:text-lg">{service.subtitle}</p>
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
                        <CTAButton href="/contact" variant="primary" size="sm">
                          Get Started
                        </CTAButton>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Section 4 — Our Process */}
      <section className="w-full bg-black py-14 sm:py-16">
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
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/60"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              How We Work
            </motion.span>

            <motion.h2
              variants={item}
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              From Zero to{" "}
              <span className="text-accent">Consistent Growth</span>
            </motion.h2>

            <motion.p variants={item} className="mt-4 max-w-xl text-base leading-7 text-white/60">
              A repeatable 5-step system we run for every client — built to deliver measurable
              results within the first 90 days.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={container}
            className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          >
            {process.map((step, i) => (
              <motion.div
                key={step.step}
                variants={item}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors duration-500 hover:bg-accent"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-2 -top-5 font-heading text-[5rem] font-bold leading-none text-white/5 transition-colors duration-500 group-hover:text-white/10"
                >
                  {step.step}
                </span>
                <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white shadow-sm transition-colors duration-500 group-hover:bg-white group-hover:text-accent">
                  <step.icon className="h-6 w-6" />
                </span>
                <h3 className="relative mt-5 font-heading text-base font-bold text-white">
                  {step.title}
                </h3>
                <p className="relative mt-2 text-sm leading-6 text-white/60 transition-colors duration-500 group-hover:text-white/80">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Section 5 — Platforms */}
      <section id="platforms" className="w-full scroll-mt-20 bg-white py-14 sm:py-16">
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
              Platforms We Master
            </motion.span>

            <motion.h2
              variants={item}
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl"
            >
              Right Platform.{" "}
              <span className="text-accent">Right Audience.</span>
            </motion.h2>

            <motion.p variants={item} className="mt-4 max-w-xl text-base leading-7 text-black/60">
              We don't spread thin across every channel. We pick the platforms where
              your customers actually spend time and go deep.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={container}
            className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            {platforms.map((platform, i) => (
              <motion.div
                key={platform.name}
                variants={item}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-white p-8 shadow-xl shadow-black/5 transition-shadow duration-300 hover:shadow-2xl"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-3 -top-6 font-heading text-[6rem] font-bold leading-none text-black/4 transition-colors duration-500 group-hover:text-black/[0.06]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-black/[0.04] text-black transition-colors duration-500 group-hover:bg-accent group-hover:text-white">
                  <platform.icon className="h-7 w-7" />
                </span>
                <h3 className="relative mt-5 font-heading text-xl font-bold text-black transition-colors duration-300 group-hover:text-accent">
                  {platform.name}
                </h3>
                <p className="relative mt-2 text-sm leading-6 text-black/60">
                  {platform.description}
                </p>
                <div className="relative mt-5 inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-black/50">
                    Best for: {platform.best}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
            className="mt-12 flex justify-center"
          >
            <CTAButton href="/contact" variant="primary" size="lg">
              Let&apos;s Grow Your Social Media
            </CTAButton>
          </motion.div>
        </div>
      </section>

      {/* Section 6 — Testimonials */}
      <Testimonials />

      {/* Section 7 — Final CTA */}
      <FinalCTA />
    </>
  );
}
