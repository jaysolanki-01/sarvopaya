"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "@/components/Logo";
import CTAButton from "@/components/CTAButton";
import {
  MegaphoneIcon,
  ChartIcon,
  GearIcon,
  RocketIcon,
  SignalWaveIcon,
  BrowserPulseIcon,
  OrbitNodesIcon,
  CompassNeedleIcon,
} from "@/components/icons";

type SubLink = {
  label: string;
  href: string;
  description: string;
};

type ServiceSubLink = {
  label: string;
  href: string;
};

type ServiceCategory = {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  sublinks?: ServiceSubLink[];
  external?: boolean;
  tagline?: string;
};

type NavItem = {
  label: string;
  href: string;
  items?: SubLink[];
  services?: ServiceCategory[];
};

const EAJJY_AI_URL = "https://eajjy.com/";

const serviceCategories: ServiceCategory[] = [
  {
    label: "Lead Generation & Growth Marketing",
    href: "/services/lead-generation-growth-marketing",
    icon: SignalWaveIcon,
    sublinks: [
      { label: "Social Media Marketing", href: "/services/social-media-marketing" },
      { label: "Search Engine Optimisation", href: "/services/seo" },
      { label: "Performance Marketing", href: "/services/performance-marketing" },
      { label: "Advertising", href: "/services/advertising" },
    ],
  },
  {
    label: "Website & Digital Experience",
    href: "/services/website-digital-experience",
    icon: BrowserPulseIcon,
    sublinks: [
      { label: "Website Development", href: "/services/website-digital-experience#website-development" },
      { label: "CRO (Conversion Rate Optimisation)", href: "/services/website-digital-experience#cro" },
      { label: "Landing Pages & Funnels", href: "/services/website-digital-experience#landing-pages-funnels" },
    ],
  },
  {
    label: "AI & Automation",
    href: EAJJY_AI_URL,
    icon: OrbitNodesIcon,
    external: true,
    tagline: "Automate follow-up, ops, and reporting with AI workflows.",
  },
  {
    label: "Growth Consulting",
    href: "/services/growth-consulting",
    icon: CompassNeedleIcon,
    sublinks: [
      { label: "GTM", href: "/services/growth-consulting#gtm" },
      { label: "Digital Audit", href: "/services/growth-consulting#digital-audit" },
      { label: "Growth Strategy", href: "/services/growth-consulting#growth-strategy" },
      { label: "Ongoing Advisory", href: "/services/growth-consulting#ongoing-advisory" },
    ],
  },
];

const navigation: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    services: serviceCategories,
  },
  {
    label: "Solutions",
    href: "/solutions",
    items: [
      {
        label: "Need More Leads?",
        href: "/solutions/need-more-leads",
        description: "Grow a consistent flow of qualified prospects.",
      },
      {
        label: "Need More Sales?",
        href: "/solutions/need-more-sales",
        description: "Convert more of the pipeline you already have.",
      },
      {
        label: "Need Better Operations?",
        href: "/solutions/need-better-operations",
        description: "Streamline workflows and cut manual busywork.",
      },
      {
        label: "Launching a New Product?",
        href: "/solutions/launching-a-new-product",
        description: "Go to market with a plan built to get traction fast.",
      },
    ],
  },
  { label: "Work", href: "/work" },
  { label: "Industries", href: "/industries" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const tileGradients = [
  "from-black to-neutral-800",
  "from-accent to-red-800",
  "from-neutral-800 to-black",
  "from-neutral-700 to-neutral-900",
];

const tileIcons: Record<string, ComponentType<{ className?: string }>> = {
  "/solutions/need-more-leads": MegaphoneIcon,
  "/solutions/need-more-sales": ChartIcon,
  "/solutions/need-better-operations": GearIcon,
  "/solutions/launching-a-new-product": RocketIcon,
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {open ? (
        <path d="M18 6 6 18M6 6l12 12" />
      ) : (
        <path d="M3 6h18M3 12h18M3 18h18" />
      )}
    </svg>
  );
}

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [activeService, setActiveService] = useState<string>(serviceCategories[0].label);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubOpen, setMobileSubOpen] = useState<string | null>(null);
  const [mobileServiceOpen, setMobileServiceOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      // iOS Safari ignores overflow:hidden on body use position:fixed instead
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflowY = "scroll";
    } else {
      const top = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
      if (top) window.scrollTo(0, -parseInt(top, 10));
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
    };
  }, [mobileOpen]);

  function openMegaMenu(label: string) {
    setOpenMenu(label);
    if (label === "Services") {
      setActiveService(serviceCategories[0].label);
    }
  }

  const linkClass = `block rounded-md px-3 py-2 text-[15px] font-bold transition-colors duration-300 hover:text-accent ${
    scrolled ? "text-white" : "text-black"
  }`;

  const activeItem = navigation.find(
    (item) => item.label === openMenu && (item.items || item.services),
  );

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-white/10 bg-black" : "border-black/10 bg-white"
      }`}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" onClick={() => setOpenMenu(null)}>
          <Logo variant={scrolled ? "light" : "dark"} />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <li
              key={item.label}
              className="relative"
              onMouseEnter={() => (item.items || item.services) && openMegaMenu(item.label)}
            >
              {item.items || item.services ? (
                <button
                  type="button"
                  className={`flex items-center gap-1 ${linkClass}`}
                  aria-expanded={openMenu === item.label}
                  onClick={() =>
                    setOpenMenu((current) => {
                      const next = current === item.label ? null : item.label;
                      if (next === "Services") {
                        setActiveService(serviceCategories[0].label);
                      }
                      return next;
                    })
                  }
                >
                  {item.label}
                  <ChevronIcon open={openMenu === item.label} />
                </button>
              ) : (
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <CTAButton href="/contact" variant={scrolled ? "inverted" : "primary"}>
            Contact Us
          </CTAButton>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className={`flex items-center justify-center rounded-md p-2 transition-colors lg:hidden ${
            scrolled ? "text-white" : "text-black"
          }`}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <MenuIcon open={mobileOpen} />
        </button>
      </nav>

      {/* Full-width mega menu */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            key={activeItem.label}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-full hidden w-full overflow-hidden border-t border-black/10 bg-white shadow-2xl lg:block"
          >
            {activeItem.services ? (() => {
              const activeCategory =
                activeItem.services!.find((category) => category.label === activeService) ??
                activeItem.services![0];
              const ActiveIcon = activeCategory.icon;

              return (
                <div className="relative">
                  {/* Ambient background animation */}
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-neutral-100 blur-3xl animate-blob-a" />
                    <div className="absolute -right-16 top-0 h-64 w-64 rounded-full bg-accent/[0.05] blur-3xl animate-blob-b" />
                    <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-neutral-100 blur-3xl animate-blob-b" />
                    <div
                      className="absolute inset-0 animate-grid-pan opacity-[0.5]"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                      }}
                    />
                  </div>

                  <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="flex items-stretch">
                      {/* Left: category rail */}
                      <div className="w-[300px] shrink-0 border-r border-black/10 pr-6">
                        <p className="px-3 pb-3 text-[11px] font-semibold uppercase tracking-wider text-black/40">
                          Services
                        </p>
                        <ul className="flex flex-col gap-1">
                          {activeItem.services!.map((category, index) => {
                            const isActive = category.label === activeService;
                            return (
                              <motion.li
                                key={category.href}
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                              >
                                <Link
                                  href={category.href}
                                  target={category.external ? "_blank" : undefined}
                                  rel={category.external ? "noopener noreferrer" : undefined}
                                  onMouseEnter={() => setActiveService(category.label)}
                                  onFocus={() => setActiveService(category.label)}
                                  onClick={() => setOpenMenu(null)}
                                  className={`group relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-3 transition-colors duration-300 ${
                                    isActive ? "bg-black text-white" : "text-black hover:bg-black/5"
                                  }`}
                                >
                                  {isActive && (
                                    <motion.span
                                      layoutId="service-active-bar"
                                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                                      className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-full bg-accent"
                                    />
                                  )}
                                  <span
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-colors duration-300 ${
                                      isActive
                                        ? "border-white/15 bg-white/10 text-white"
                                        : "border-black/10 bg-white text-black group-hover:border-black/20"
                                    }`}
                                  >
                                    <category.icon className="h-5 w-5" />
                                  </span>
                                  <span className="flex-1 font-heading text-[14.5px] font-bold leading-tight">
                                    {category.label}
                                  </span>
                                  <span
                                    aria-hidden="true"
                                    className={`text-xs transition-all duration-300 ${
                                      isActive
                                        ? "translate-x-0 opacity-70"
                                        : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-40"
                                    }`}
                                  >
                                    &rarr;
                                  </span>
                                </Link>
                              </motion.li>
                            );
                          })}
                        </ul>
                      </div>

                      {/* Right: detail panel */}
                      <div className="relative min-h-[320px] flex-1 pl-10 lg:pl-14">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={`${activeCategory.label}-icon`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="pointer-events-none absolute -right-2 top-0 text-black/[0.04]"
                          >
                            <ActiveIcon className="h-48 w-48" />
                          </motion.div>
                        </AnimatePresence>

                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeCategory.label}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            className="relative pt-2"
                          >
                            

                            {activeCategory.sublinks ? (
                              <ul className="mt-4 flex max-w-xl flex-col divide-y divide-black/5">
                                {activeCategory.sublinks.map((sub, i) => (
                                  <motion.li
                                    key={sub.href}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.25, delay: i * 0.05 }}
                                  >
                                    <Link
                                      href={sub.href}
                                      onClick={() => setOpenMenu(null)}
                                      className="group/sub flex items-center justify-between py-3.5 text-[15px] font-bold text-black/70 transition-colors duration-300 hover:text-black"
                                    >
                                      {sub.label}
                                      <span
                                        aria-hidden="true"
                                        className="text-black/20 transition-all duration-300 group-hover/sub:translate-x-1 group-hover/sub:text-accent"
                                      >
                                        &rarr;
                                      </span>
                                    </Link>
                                  </motion.li>
                                ))}
                              </ul>
                            ) : (
                              <div className="mt-5 max-w-md">
                                <p className="text-[15px] leading-7 text-black/60">
                                  {activeCategory.tagline}
                                </p>
                                <a
                                  href={activeCategory.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() => setOpenMenu(null)}
                                  className="group/sub mt-5 inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-accent"
                                >
                                  Visit EAJJY AI
                                  <span
                                    aria-hidden="true"
                                    className="transition-transform duration-300 group-hover/sub:translate-x-1 group-hover/sub:-translate-y-0.5"
                                  >
                                    &#8599;
                                  </span>
                                </a>
                              </div>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-6 sm:flex-row">
                      <p className="text-sm text-black/50">
                        Not sure which service fits your business?
                      </p>
                      <Link
                        href="/contact"
                        onClick={() => setOpenMenu(null)}
                        className="group/cta inline-flex items-center gap-1.5 text-sm font-semibold text-black transition-colors duration-300 hover:text-accent"
                      >
                        Book a free consult
                        <span
                          aria-hidden="true"
                          className="transition-transform duration-300 group-hover/cta:translate-x-1"
                        >
                          &rarr;
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })() : (
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
              {activeItem.items!.map((sub, index) => {
                const Icon = tileIcons[sub.href];
                return (
                  <motion.div
                    key={sub.href}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={sub.href}
                      className="group block"
                      onClick={() => setOpenMenu(null)}
                    >
                      <div
                        className={`relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br ${tileGradients[index % tileGradients.length]}`}
                      >
                        {Icon && (
                          <div className="absolute inset-0 flex items-center justify-center text-white/25 transition-transform duration-300 group-hover:scale-110">
                            <Icon className="h-20 w-20 sm:h-24 sm:w-24" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
                        <span
                          aria-hidden="true"
                          className="absolute bottom-4 left-4 flex h-9 w-9 items-center justify-center rounded-full bg-white text-black opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                        >
                          &rarr;
                        </span>
                      </div>
                      <p className="font-heading text-base font-medium text-black transition-colors group-hover:text-accent">
                        {sub.label}
                      </p>
                      <p className="mt-1 text-sm leading-5 text-black/60">
                        {sub.description}
                      </p>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <div
        className={`overflow-y-auto border-t transition-[max-height,background-color] duration-300 ease-in-out lg:hidden ${
          scrolled ? "border-white/10 bg-black" : "border-black/10 bg-white"
        } ${mobileOpen ? "max-h-[calc(100dvh-4rem)]" : "max-h-0"}`}
      >
        <ul className="flex flex-col gap-1 px-4 py-4">
          {navigation.map((item) => (
            <li key={item.label}>
              {item.services ? (
                <>
                  <button
                    type="button"
                    className={`flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-base font-bold transition-colors duration-300 hover:text-accent ${
                      scrolled ? "text-white" : "text-black"
                    }`}
                    aria-expanded={mobileSubOpen === item.label}
                    onClick={() =>
                      setMobileSubOpen((current) =>
                        current === item.label ? null : item.label,
                      )
                    }
                  >
                    {item.label}
                    <ChevronIcon open={mobileSubOpen === item.label} />
                  </button>
                  <div
                    className={`overflow-hidden pl-3 transition-[max-height] duration-300 ease-in-out ${
                      mobileSubOpen === item.label ? "max-h-[999px]" : "max-h-0"
                    }`}
                  >
                    <ul
                      className={`flex flex-col gap-1 border-l pb-2 pl-3 ${
                        scrolled ? "border-white/10" : "border-black/10"
                      }`}
                    >
                      {item.services.map((category) =>
                        category.external ? (
                          <li key={category.href}>
                            <a
                              href={category.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setMobileOpen(false)}
                              className={`flex items-center gap-2 rounded-md px-2 py-2 text-sm font-bold transition-colors duration-300 hover:text-accent ${
                                scrolled ? "text-white" : "text-black"
                              }`}
                            >
                              <category.icon
                                className={`h-4 w-4 shrink-0 ${scrolled ? "text-white/70" : "text-black/70"}`}
                              />
                              <span className="flex-1">{category.label}</span>
                              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                              <span aria-hidden="true" className={scrolled ? "text-white/70" : "text-black/70"}>
                                &#8599;
                              </span>
                            </a>
                          </li>
                        ) : (
                          <li key={category.href}>
                            <div className="flex items-center">
                              <Link
                                href={category.href}
                                onClick={() => setMobileOpen(false)}
                                className={`flex flex-1 items-center gap-2 rounded-md px-2 py-2 text-sm font-bold transition-colors duration-300 hover:text-accent ${
                                  scrolled ? "text-white" : "text-black"
                                }`}
                              >
                                <category.icon
                                  className={`h-4 w-4 shrink-0 ${scrolled ? "text-white/70" : "text-black/70"}`}
                                />
                                {category.label}
                              </Link>
                              {category.sublinks && (
                                <button
                                  type="button"
                                  aria-expanded={mobileServiceOpen === category.label}
                                  aria-label={`Toggle ${category.label} services`}
                                  onClick={() =>
                                    setMobileServiceOpen((current) =>
                                      current === category.label ? null : category.label,
                                    )
                                  }
                                  className={`rounded-md p-2 ${scrolled ? "text-white/60" : "text-black/60"}`}
                                >
                                  <ChevronIcon open={mobileServiceOpen === category.label} />
                                </button>
                              )}
                            </div>
                            {category.sublinks && (
                              <div
                                className={`overflow-hidden pl-6 transition-[max-height] duration-300 ease-in-out ${
                                  mobileServiceOpen === category.label ? "max-h-96" : "max-h-0"
                                }`}
                              >
                                <ul
                                  className={`flex flex-col gap-1 border-l pb-2 pl-3 ${
                                    scrolled ? "border-white/10" : "border-black/10"
                                  }`}
                                >
                                  {category.sublinks.map((sub) => (
                                    <li key={sub.href}>
                                      <Link
                                        href={sub.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`block rounded-md px-2 py-1.5 text-xs font-medium transition-colors duration-300 hover:text-accent ${
                                          scrolled ? "text-white/70" : "text-black/70"
                                        }`}
                                      >
                                        {sub.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </>
              ) : item.items ? (
                <>
                  <button
                    type="button"
                    className={`flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-base font-bold transition-colors duration-300 hover:text-accent ${
                      scrolled ? "text-white" : "text-black"
                    }`}
                    aria-expanded={mobileSubOpen === item.label}
                    onClick={() =>
                      setMobileSubOpen((current) =>
                        current === item.label ? null : item.label,
                      )
                    }
                  >
                    {item.label}
                    <ChevronIcon open={mobileSubOpen === item.label} />
                  </button>
                  <div
                    className={`overflow-hidden pl-3 transition-[max-height] duration-300 ease-in-out ${
                      mobileSubOpen === item.label ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul
                      className={`flex flex-col gap-1 border-l pb-2 pl-3 ${
                        scrolled ? "border-white/10" : "border-black/10"
                      }`}
                    >
                      {item.items.map((sub) => (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            className={`block rounded-md px-2 py-2 text-sm font-medium transition-colors duration-300 hover:text-accent ${
                              scrolled ? "text-white/80" : "text-black/80"
                            }`}
                            onClick={() => setMobileOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              ) : (
                <Link
                  href={item.href}
                  className={`block rounded-md px-3 py-3 text-base font-bold transition-colors duration-300 hover:text-accent ${
                    scrolled ? "text-white" : "text-black"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
          <li className="mt-2">
            <CTAButton
              href="/contact"
              variant={scrolled ? "inverted" : "primary"}
              fullWidth
              onClick={() => setMobileOpen(false)}
            >
              Contact Us
            </CTAButton>
          </li>
        </ul>
      </div>
    </header>
  );
}
