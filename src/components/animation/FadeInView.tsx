"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { EASE, DURATION } from "@/lib/animation";

gsap.registerPlugin(ScrollTrigger);

interface FadeInViewProps {
  children: ReactNode;
  /** Animation variant */
  variant?: "fadeUp" | "fadeIn" | "fadeLeft" | "fadeRight" | "scaleIn";
  delay?: number;
  duration?: number;
  /** y offset in px for fadeUp/fadeDown */
  yOffset?: number;
  /** x offset in px for fadeLeft/fadeRight */
  xOffset?: number;
  start?: string;
  once?: boolean;
  className?: string;
  style?: CSSProperties;
  as?: keyof React.JSX.IntrinsicElements;
}

export function FadeInView({
  children,
  variant = "fadeUp",
  delay = 0,
  duration = DURATION.base,
  yOffset = 40,
  xOffset = 60,
  start = "top 90%",
  once = true,
  className,
  style,
  as: Tag = "div",
}: FadeInViewProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const fromVars: gsap.TweenVars = { opacity: 0, duration, delay, ease: EASE.expo };

      if (variant === "fadeUp") fromVars.y = yOffset;
      else if (variant === "fadeLeft") fromVars.x = xOffset;
      else if (variant === "fadeRight") fromVars.x = -xOffset;
      else if (variant === "scaleIn") { fromVars.scale = 0.9; fromVars.opacity = 0; }
      // fadeIn: opacity only

      gsap.from(el, {
        ...fromVars,
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: el,
          start,
          once,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: ref, dependencies: [] }
  );

  const Component = Tag as React.ElementType;
  return (
    <Component ref={ref} className={className} style={style}>
      {children}
    </Component>
  );
}

/**
 * Convenience wrapper for staggered children.
 * Wraps multiple children and staggers their fade-in.
 */
interface StaggerListProps {
  children: ReactNode[];
  stagger?: number;
  delay?: number;
  variant?: FadeInViewProps["variant"];
  className?: string;
  itemClassName?: string;
  start?: string;
  as?: keyof React.JSX.IntrinsicElements;
  itemAs?: keyof React.JSX.IntrinsicElements;
}

export function StaggerList({
  children,
  stagger = 0.08,
  delay = 0,
  variant = "fadeUp",
  className,
  itemClassName,
  start = "top 88%",
  as: Wrapper = "div",
  itemAs: Item = "div",
}: StaggerListProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const items = el.children;
      if (!items.length) return;

      const fromVars: gsap.TweenVars = {
        opacity: 0,
        duration: DURATION.base,
        stagger,
        delay,
        ease: EASE.expo,
      };

      if (variant === "fadeUp") fromVars.y = 40;
      else if (variant === "fadeLeft") fromVars.x = 60;
      else if (variant === "fadeRight") fromVars.x = -60;
      else if (variant === "scaleIn") { fromVars.scale = 0.9; }

      gsap.from(items, {
        ...fromVars,
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      });
    },
    { scope: ref, dependencies: [] }
  );

  const WrapperEl = Wrapper as React.ElementType;
  const ItemEl = Item as React.ElementType;

  return (
    <WrapperEl ref={ref} className={className}>
      {(Array.isArray(children) ? children : [children]).map((child, i) => (
        <ItemEl key={i} className={itemClassName}>
          {child}
        </ItemEl>
      ))}
    </WrapperEl>
  );
}
