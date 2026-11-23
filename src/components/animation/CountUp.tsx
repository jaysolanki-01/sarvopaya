"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface CountUpProps {
  /** Final value to count to */
  value: number;
  /** Number of decimal places */
  decimals?: number;
  /** Prefix (e.g. "$") */
  prefix?: string;
  /** Suffix (e.g. "K", "%", "+") */
  suffix?: string;
  duration?: number;
  delay?: number;
  start?: string;
  className?: string;
}

export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1.5,
  delay = 0,
  start = "top 85%",
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const obj = useRef({ val: 0 });

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      // Render immediately without animation if reduced motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        el.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
        return;
      }

      obj.current.val = 0;

      gsap.to(obj.current, {
        val: value,
        duration,
        delay,
        ease: "power2.out",
        onUpdate: () => {
          if (el) {
            el.textContent = `${prefix}${obj.current.val.toFixed(decimals)}${suffix}`;
          }
        },
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      });
    },
    { scope: ref, dependencies: [value, decimals, duration, delay] }
  );

  return (
    <span ref={ref} className={className} suppressHydrationWarning>
      {prefix}0{suffix}
    </span>
  );
}
