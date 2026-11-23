"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface ParallaxSectionProps {
  children: ReactNode;
  /**
   * Parallax speed multiplier.
   * Positive = moves up faster than scroll (depth layer behind).
   * Negative = moves up slower than scroll (depth layer in front).
   * Range: -1 to 1 for subtle effects.
   */
  speed?: number;
  /** Apply parallax to the inner content element only (not the outer clip) */
  inner?: boolean;
  className?: string;
  style?: CSSProperties;
  as?: keyof React.JSX.IntrinsicElements;
}

export function ParallaxSection({
  children,
  speed = 0.3,
  inner = true,
  className,
  style,
  as: Tag = "section",
}: ParallaxSectionProps) {
  const outerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const outer = outerRef.current;
      const innerEl = inner ? innerRef.current : outer;
      if (!outer || !innerEl) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Calculate the y movement range based on element height and speed
      const yPercent = speed * 30; // e.g. speed=0.3 → 9% movement

      gsap.fromTo(
        innerEl,
        { yPercent: -yPercent },
        {
          yPercent,
          ease: "none",
          scrollTrigger: {
            trigger: outer,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: outerRef, dependencies: [speed] }
  );

  const Component = Tag as React.ElementType;
  return (
    <Component ref={outerRef} className={className} style={style}>
      {inner ? (
        <div ref={innerRef} style={{ willChange: "transform" }}>
          {children}
        </div>
      ) : (
        children
      )}
    </Component>
  );
}

/**
 * Simple parallax for a single element (image, div, etc.)
 * Wraps in an overflow-hidden container to clip the parallax overflow.
 */
interface ParallaxElementProps {
  children: ReactNode;
  speed?: number;
  overflow?: boolean;
  className?: string;
  style?: CSSProperties;
}

export function ParallaxElement({
  children,
  speed = 0.2,
  overflow = true,
  className,
  style,
}: ParallaxElementProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const outer = outerRef.current;
      const innerEl = innerRef.current;
      if (!outer || !innerEl) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const yPercent = speed * 25;

      gsap.fromTo(
        innerEl,
        { yPercent: -yPercent },
        {
          yPercent,
          ease: "none",
          scrollTrigger: {
            trigger: outer,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: outerRef, dependencies: [speed] }
  );

  return (
    <div
      ref={outerRef}
      className={className}
      style={{ overflow: overflow ? "hidden" : undefined, ...style }}
    >
      <div
        ref={innerRef}
        style={{
          willChange: "transform",
          // Scale up slightly to prevent white edges during parallax movement
          scale: overflow ? 1.1 : undefined,
          height: overflow ? "110%" : "100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}
