"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { EASE, DURATION } from "@/lib/animation";

type ClipDirection = "left" | "right" | "top" | "bottom";

interface ClipRevealProps {
  children: ReactNode;
  direction?: ClipDirection;
  delay?: number;
  duration?: number;
  start?: string;
  once?: boolean;
  className?: string;
  style?: CSSProperties;
  /**
   * Scale the inner element slightly larger to prevent white edges.
   * Useful for images. Set to false for text/decorative elements.
   */
  scaleInner?: boolean;
}

function getFromClip(direction: ClipDirection): string {
  switch (direction) {
    case "left":   return "inset(0 100% 0 0)";
    case "right":  return "inset(0 0 0 100%)";
    case "top":    return "inset(0 0 100% 0)";
    case "bottom": return "inset(100% 0 0 0)";
  }
}

export function ClipReveal({
  children,
  direction = "left",
  delay = 0,
  duration = DURATION.reveal,
  start = "top 85%",
  once = true,
  className,
  style,
  scaleInner = false,
}: ClipRevealProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const outer = outerRef.current;
      const inner = innerRef.current;
      if (!outer || !inner) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outer,
          start,
          once,
        },
      });

      tl.from(outer, {
        clipPath: getFromClip(direction),
        duration,
        delay,
        ease: EASE.expo,
      });

      if (scaleInner) {
        tl.from(
          inner,
          {
            scale: 1.15,
            duration: duration * 1.2,
            ease: EASE.power3,
          },
          "<"
        );
      }
    },
    { scope: outerRef, dependencies: [direction, duration, delay] }
  );

  return (
    <div
      ref={outerRef}
      className={className}
      style={{ overflow: "hidden", ...style }}
    >
      <div ref={innerRef} style={{ width: "100%", height: "100%" }}>
        {children}
      </div>
    </div>
  );
}

/**
 * Lightweight line draw (scaleX) for decorative dividers.
 */
interface LineDrawProps {
  delay?: number;
  duration?: number;
  start?: string;
  className?: string;
  color?: string;
  origin?: "left" | "center" | "right";
}

export function LineDraw({
  delay = 0,
  duration = 1,
  start = "top 90%",
  className,
  color = "currentColor",
  origin = "left",
}: LineDrawProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(el, {
        scaleX: 0,
        transformOrigin: origin,
        duration,
        delay,
        ease: EASE.expo,
        scrollTrigger: { trigger: el, start, once: true },
      });
    },
    { scope: ref, dependencies: [duration, delay, origin] }
  );

  return (
    <div
      ref={ref}
      className={className}
      style={{ background: color, height: "1px", width: "100%" }}
    />
  );
}
