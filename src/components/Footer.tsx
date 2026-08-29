"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { LinkedInIcon, InstagramIcon, FacebookIcon, RedditIcon } from "@/components/icons";

const EASE = [0.16, 1, 0.3, 1] as const;


const timezones = [
  { label: "India", timeZone: "Asia/Kolkata" },
  { label: "UK", timeZone: "Europe/London" },
  { label: "USA", timeZone: "America/New_York" },
];

const footerNav = [
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Resources", href: "/resources" },

  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/sarvopaya/", icon: LinkedInIcon },
  { label: "Instagram", href: "https://www.instagram.com/sarvopaya/", icon: InstagramIcon },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61590305765567", icon: FacebookIcon },
  { label: "Reddit", href: "https://www.reddit.com/user/sarvopaya/", icon: RedditIcon },
];

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const hoverLift = "transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105";

const overlayReveal = {
  rest: { opacity: 0, y: 24 },
  hover: { opacity: 1, y: 0 },
};

const pillSweep = {
  rest: { scaleX: 0 },
  hover: { scaleX: 1 },
};

const pillLabelSwap = {
  rest: { opacity: 1 },
  hover: { opacity: 0 },
};

const pillContactSwap = {
  rest: { opacity: 0 },
  hover: { opacity: 1 },
};

const marqueeRepeats = Array.from({ length: 6 });

function TimezoneClock({
  label,
  timeZone,
  index,
}: {
  label: string;
  timeZone: string;
  index: number;
}) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    function update() {
      setTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone,
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(new Date()),
      );
    }
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, [timeZone]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
    >
      <motion.div
        initial="rest"
        animate="rest"
        whileHover="hover"
        className="inline-block animate-float"
        style={{ animationDelay: `${index * 0.5}s`, animationDuration: `${4 + index * 0.6}s` }}
      >
        <Link
          href="/contact"
          className="relative flex items-center justify-center overflow-hidden rounded-full border border-black/10 px-7 py-4 text-base font-bold sm:px-8 sm:py-5 sm:text-lg"
        >
          <motion.span
            aria-hidden="true"
            variants={pillSweep}
            transition={{ duration: 0.45, ease: EASE }}
            className="absolute inset-0 origin-left bg-accent"
          />
          <motion.span
            variants={pillLabelSwap}
            transition={{ duration: 0.25 }}
            className="relative z-10 inline-flex items-center gap-2 text-black"
          >
            <span>{label}:</span> {time ?? "--:--"}
          </motion.span>
          <motion.span
            variants={pillContactSwap}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 z-10 flex items-center justify-center text-white"
          >
            Contact Us
          </motion.span>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 1.1, ease: EASE }}
      className="sticky bottom-0 z-0 w-full"
    >
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, ease: EASE }}
        className="relative z-10 flex flex-wrap items-center justify-center gap-3 rounded-b-[2.5rem] bg-white px-4 py-8 sm:gap-6 sm:rounded-b-[3.5rem] sm:px-6 sm:py-10"
        style={{ willChange: "transform, opacity" }}
      >
        {timezones.map((tz, i) => (
          <TimezoneClock key={tz.label} label={tz.label} timeZone={tz.timeZone} index={i} />
        ))}
      </motion.div>

      <div className="relative -mt-10 overflow-hidden bg-black py-20 sm:-mt-14 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial="rest" animate="rest" whileHover="hover">
            <Link href="/contact" className="relative mx-auto block max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: EASE }}
              >
                <Image
                  src="/images/Logo_white.png"
                  alt="Sarvopaya"
                  width={3564}
                  height={719}
                  className="h-auto w-full"
                  priority
                />
              </motion.div>

              <motion.div
                variants={overlayReveal}
                transition={{ duration: 0.45, ease: EASE }}
                className="absolute inset-0 z-10 flex items-center justify-center"
              >
                <div className="relative flex w-36 items-center overflow-hidden rounded-full bg-black px-5 py-2.5 sm:w-44 sm:px-6 sm:py-3">
                  <motion.span
                    aria-hidden="true"
                    variants={pillSweep}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="absolute inset-0 origin-left bg-accent"
                  />
                  <div className="relative z-10 w-full overflow-hidden">
                    <div className="flex w-max animate-marquee items-center gap-4 whitespace-nowrap">
                      {marqueeRepeats.map((_, i) => (
                        <span
                          key={i}
                          className="flex items-center gap-1.5 font-heading text-xs font-bold uppercase tracking-tight text-white sm:text-sm"
                        >
                          Contact Us
                          <span aria-hidden="true">&rarr;</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-16 flex flex-col items-center gap-8 border-t border-white/10 pt-8 sm:mt-20 sm:flex-row sm:items-center sm:justify-between"
          >
            <motion.div variants={fadeUpItem} className="flex items-center gap-3">
              {socials.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white transition-colors duration-300 hover:border-accent hover:text-accent ${hoverLift}`}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </motion.div>

            <motion.ul
              variants={fadeUpItem}
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
            >
              {footerNav.map((navItem) => (
                <li key={navItem.href}>
                  <Link
                    href={navItem.href}
                    className="inline-block text-sm font-semibold text-white/60 transition-colors duration-300 hover:text-accent"
                  >
                    {navItem.label}
                  </Link>
                </li>
              ))}
            </motion.ul>

            <motion.p
              variants={fadeUpItem}
              className="text-center text-xs leading-relaxed text-white/40 sm:text-right"
            >
              Proudly built in India.
              <br />
              &copy; 2026 Sarvopaya. All rights reserved.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}
