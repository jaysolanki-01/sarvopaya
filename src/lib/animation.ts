// Shared animation constants — importable from both client and server components
// (no browser APIs used here)

export const EASE = {
  expo: "expo.out",
  power3: "power3.out",
  power2: "power2.out",
  elastic: "elastic.out(1, 0.5)",
  back: "back.out(1.7)",
  smooth: "power1.inOut",
} as const;

export const DURATION = {
  instant: 0.2,
  fast: 0.4,
  base: 0.7,
  slow: 1.0,
  reveal: 1.2,
} as const;

export const STAGGER = {
  word: 0.055,
  line: 0.1,
  char: 0.025,
  item: 0.08,
  card: 0.12,
} as const;

export const SCROLL_TRIGGER_DEFAULTS = {
  start: "top 85%",
  end: "bottom 15%",
  once: true,
} as const;

export type AnimationVariant =
  | "fadeUp"
  | "fadeIn"
  | "slideLeft"
  | "slideRight"
  | "scaleIn"
  | "revealWords"
  | "revealLines"
  | "revealChars";
