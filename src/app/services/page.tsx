"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import CTAButton from "@/components/CTAButton";
import FinalCTA from "@/components/FinalCTA";
import {
  FunnelIcon,
  SearchIcon,
  MegaphoneIcon,
  CartIcon,
  MonitorIcon,
  CursorClickIcon,
  LayersIcon,
  BoltIcon,
  GearIcon,
  ChartIcon,
  TargetIcon,
  RocketIcon,
  CompassNeedleIcon,
  StarIcon,
} from "@/components/icons";
import type { ComponentType } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

type ServiceItem = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  href: string;
};

type ServiceGroup = {
  label: string;
  tagline: string;
  description: string;
  services: ServiceItem[];
  dark?: boolean;
};

const groups: ServiceGroup[] = [
  {
    label: "Lead Generation & Growth Marketing",
    tagline: "Fill your pipeline with the right people.",
    description:
      "Performance-driven marketing systems that bring in qualified prospects across organic and paid channels, built to convert intent into pipeline.",
    services: [
      {
        icon: SearchIcon,
        title: "SEO, AEO & GEO",
        description:
          "Search visibility across traditional engines, AI-powered search, and every discovery surface your audience uses.",
        href: "/services/seo",
      },
      {
        icon: MegaphoneIcon,
        title: "Social Media Marketing",
        description:
          "Content and campaigns that build audience, generate demand, and move people from awareness to action.",
        href: "/services/social-media-marketing",
      },
      {
        icon: CartIcon,
        title: "D2C Marketing",
        description:
          "Direct-to-consumer strategies that acquire customers profitably and keep them coming back.",
        href: "/services/d2c-marketing",
      },
      {
        icon: TargetIcon,
        title: "Advertising",
        description:
          "Paid campaigns across Google, Meta, and beyond — engineered for cost-efficient, scalable growth.",
        href: "/services/advertising",
      },
    ],
  },
  {
    label: "Website & Digital Experience",
    tagline: "Your website should do more than look good.",
    description:
      "We build websites and digital experiences that perform — fast, conversion-focused, and built to grow with your business.",
    dark: true,
    services: [
      {
        icon: MonitorIcon,
        title: "Website Development",
        description:
          "Custom websites engineered for performance, clarity, and business outcomes — not just aesthetics.",
        href: "/services/website-development",
      },
      {
        icon: CursorClickIcon,
        title: "Conversion Rate Optimisation",
        description:
          "Turn more of your existing traffic into leads, sales, and customers through data-driven CRO.",
        href: "/services/Conversion-Rate-Optimisation",
      },
      {
        icon: FunnelIcon,
        title: "Landing Pages & Funnels",
        description:
          "High-converting landing pages and funnel architectures built to capture and qualify demand.",
        href: "/services/landing-pages-funnels",
      },
      {
        icon: LayersIcon,
        title: "Website & Digital Experience",
        description:
          "End-to-end digital experience design — from information architecture to UX to ongoing optimisation.",
        href: "/services/website-digital-experience",
      },
    ],
  },
  {
    label: "AI & Automation",
    tagline: "Let your business run smarter.",
    description:
      "We identify where AI and automation create the most leverage in your operations and build systems that free your team to focus on higher-value work.",
    services: [
      {
        icon: BoltIcon,
        title: "AI & Automation",
        description:
          "Custom AI workflows and automation systems that reduce manual effort, speed up operations, and improve output quality.",
        href: "/services/ai-automation",
      },
    ],
  },
  {
    label: "Growth Consulting",
    tagline: "Strategy before execution.",
    description:
      "Advisory engagements built to give your business clarity on where to grow, how to grow, and what to fix before you spend on execution.",
    dark: true,
    services: [
      {
        icon: RocketIcon,
        title: "Growth Consulting",
        description:
          "Hands-on consulting that connects your digital activity to real business outcomes.",
        href: "/services/growth-consulting",
      },
      {
        icon: CompassNeedleIcon,
        title: "Go-To-Market Strategy",
        description:
          "A clear GTM plan covering positioning, channels, messaging, and launch sequencing.",
        href: "/services/go-to-market-startegy-expert",
      },
      {
        icon: ChartIcon,
        title: "Digital Audit",
        description:
          "A thorough review of your website, SEO, ads, and marketing stack to surface what's holding you back.",
        href: "/services/digital-audit",
      },
      {
        icon: GearIcon,
        title: "Growth Strategy",
        description:
          "A documented growth strategy tied to your specific market, business model, and objectives.",
        href: "/services/growth-strategy",
      },
      {
        icon: StarIcon,
        title: "Ongoing Advisory",
        description:
          "Retained strategic guidance for founders and marketing teams who want a trusted outside perspective.",
        href: "/services/ongoing-advisory",
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.sarvopaya.com" },
              { "@type": "ListItem", position: 2, name: "Services", item: "https://www.sarvopaya.com/services" },
            ],
          }),
        }}
      />

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[calc(100dvh-4rem)] w-full items-center overflow-hidden bg-black">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 top-0 select-none whitespace-nowrap text-[130px] font-bold uppercase leading-none text-transparent sm:text-[200px] lg:text-[280px]"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.04)" }}
        >
          SERVICES
        </span>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 lg:px-8 lg:py-20"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/60"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            What We Do
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Every service we offer{" "}
            <span className="text-accent">moves the needle.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/60 sm:text-xl"
          >
            Four practice areas. One goal: measurable growth for your business.
            Whether you need more leads, a better website, smarter operations,
            or a clearer strategy — we have built the systems to get you there.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <CTAButton href="/contact" variant="inverted" size="lg">
              Book a Free Consultation
            </CTAButton>
            <CTAButton href="#services" variant="outline" size="lg">
              Explore Services
            </CTAButton>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Service Groups ───────────────────────────────────────────────────── */}
      <div id="services">
        {groups.map((group, gi) => (
          <section
            key={group.label}
            className={`w-full py-16 sm:py-20 ${group.dark ? "bg-black" : "bg-white"}`}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {/* Group header */}
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="max-w-3xl"
              >
                <motion.span
                  variants={item}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ${
                    group.dark ? "border-white/10 text-white/60" : "border-black/10 text-black/60"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {String(gi + 1).padStart(2, "0")}
                </motion.span>

                <motion.h2
                  variants={item}
                  className={`mt-5 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl ${
                    group.dark ? "text-white" : "text-black"
                  }`}
                >
                  {group.label}
                </motion.h2>

                <motion.p
                  variants={item}
                  className={`mt-2 text-lg font-semibold ${group.dark ? "text-accent" : "text-accent"}`}
                >
                  {group.tagline}
                </motion.p>

                <motion.p
                  variants={item}
                  className={`mt-3 max-w-2xl text-base leading-7 ${
                    group.dark ? "text-white/60" : "text-black/60"
                  }`}
                >
                  {group.description}
                </motion.p>
              </motion.div>

              {/* Service cards */}
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                variants={container}
                className={`mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 ${
                  group.services.length >= 4 ? "lg:grid-cols-4" : group.services.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
                }`}
              >
                {group.services.map((svc, si) => (
                  <motion.div
                    key={svc.title}
                    variants={item}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className={`group relative flex flex-col overflow-hidden rounded-2xl border p-6 transition-colors duration-500 ${
                      group.dark
                        ? "border-white/10 bg-white/5 hover:border-accent/30 hover:bg-accent/10"
                        : "border-black/10 bg-black/[0.02] hover:border-black hover:bg-black"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute -right-2 -top-5 font-bold leading-none text-[5.5rem] transition-colors duration-500 ${
                        group.dark ? "text-white/[0.04]" : "text-black/[0.04] group-hover:text-white/[0.08]"
                      }`}
                    >
                      {String(si + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={`relative flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-500 ${
                        group.dark
                          ? "bg-white/10 text-white group-hover:bg-accent group-hover:text-white"
                          : "bg-white text-accent shadow-sm shadow-black/5 group-hover:bg-accent group-hover:text-white"
                      }`}
                    >
                      <svc.icon className="h-6 w-6" />
                    </span>

                    <h3
                      className={`relative mt-5 text-base font-bold transition-colors duration-500 ${
                        group.dark
                          ? "text-white"
                          : "text-black group-hover:text-white"
                      }`}
                    >
                      {svc.title}
                    </h3>

                    <p
                      className={`relative mt-2 flex-1 text-sm leading-6 transition-colors duration-500 ${
                        group.dark
                          ? "text-white/50 group-hover:text-white/70"
                          : "text-black/60 group-hover:text-white/70"
                      }`}
                    >
                      {svc.description}
                    </p>

                    <Link
                      href={svc.href}
                      className={`relative mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold transition-colors duration-300 ${
                        group.dark
                          ? "text-white/50 group-hover:text-accent"
                          : "text-black/50 group-hover:text-accent"
                      }`}
                    >
                      Learn More
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        &rarr;
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        ))}
      </div>

      {/* ── Not sure where to start ─────────────────────────────────────────── */}
      <section className="w-full bg-neutral-50 py-16 sm:py-20">
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
              Not sure where to start?
            </motion.span>

            <motion.h2
              variants={item}
              className="mt-6 text-3xl font-bold leading-tight tracking-tight text-black sm:text-4xl lg:text-5xl"
            >
              Tell us your problem.{" "}
              <span className="text-accent">We'll find the right fit.</span>
            </motion.h2>

            <motion.p
              variants={item}
              className="mt-4 max-w-2xl text-base leading-7 text-black/60"
            >
              Most clients don't start with a service in mind — they start with
              a challenge. Book a free 30-minute conversation and we'll map the
              right services to your specific situation.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <CTAButton href="/contact" variant="primary" size="lg">
                Book a Free Consultation
              </CTAButton>
              <CTAButton href="/solutions/need-more-leads" variant="outline" size="lg">
                Explore by Problem
              </CTAButton>
            </motion.div>
          </motion.div>

          {/* Problem-based quick links */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={container}
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {[
              { label: "I need more leads", href: "/solutions/need-more-leads" },
              { label: "I need more sales", href: "/solutions/need-more-sales" },
              { label: "I need better operations", href: "/solutions/need-better-operations" },
              { label: "I'm launching a new product", href: "/solutions/launching-a-new-product" },
            ].map((sol) => (
              <motion.div key={sol.label} variants={item}>
                <Link
                  href={sol.href}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-black/10 bg-white px-5 py-4 text-sm font-semibold text-black transition-all duration-300 hover:border-black hover:bg-black hover:text-white"
                >
                  {sol.label}
                  <span
                    aria-hidden="true"
                    className="shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
