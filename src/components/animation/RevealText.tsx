"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { EASE, DURATION, STAGGER, SCROLL_TRIGGER_DEFAULTS } from "@/lib/animation";

type SplitMode = "words" | "lines" | "chars" | "words,lines" | "chars,words,lines";

interface RevealTextProps {
  children: ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  splitBy?: SplitMode;
  /** Which split elements to animate (defaults to splitBy root level) */
  animateTarget?: "words" | "lines" | "chars";
  delay?: number;
  duration?: number;
  stagger?: number;
  /** ScrollTrigger start position */
  start?: string;
  /** Play once and stay (default true) */
  once?: boolean;
  /** Initial y offset in % */
  fromY?: string;
  className?: string;
  style?: CSSProperties;
  /** Marker for debugging ScrollTrigger */
  markers?: boolean;
}

export function RevealText({
  children,
  as: Tag = "div",
  splitBy = "words",
  animateTarget,
  delay = 0,
  duration = DURATION.reveal,
  stagger = STAGGER.word,
  start = SCROLL_TRIGGER_DEFAULTS.start,
  once = true,
  fromY = "110%",
  className,
  style,
  markers = false,
}: RevealTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      // Respect prefers-reduced-motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const split = new SplitType(el, { types: splitBy });

      // Determine which elements to animate
      const target =
        animateTarget === "chars"
          ? split.chars
          : animateTarget === "lines"
          ? split.lines
          : split.words ?? split.lines ?? split.chars;

      if (!target || target.length === 0) {
        split.revert();
        return;
      }

      // Wrap each line/word's overflow so characters slide in cleanly
      const parents = new Set(target.map((el) => el.parentElement));
      parents.forEach((p) => {
        if (p) p.style.overflow = "hidden";
      });

      const tween = gsap.from(target, {
        y: fromY,
        opacity: 0,
        duration,
        stagger,
        delay,
        ease: EASE.expo,
        scrollTrigger: {
          trigger: el,
          start,
          once,
          markers,
        },
      });

      // Cleanup: revert SplitType DOM changes when component unmounts
      return () => {
        tween.kill();
        split.revert();
      };
    },
    { scope: containerRef, dependencies: [] }
  );

  // suppressHydrationWarning prevents React from warning about the
  // SplitType DOM mutation (which happens after hydration in useGSAP/useLayoutEffect)
  const Component = Tag as React.ElementType;
  return (
    <Component
      ref={containerRef}
      className={className}
      style={style}
      suppressHydrationWarning
    >
      {children}
    </Component>
  );
}
