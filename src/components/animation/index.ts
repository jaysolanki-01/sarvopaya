// Animation system barrel exports
// All components are "use client" — safe to import from client components and
// from server components (they form a client boundary at the import site).

export { AnimationProviders } from "./AnimationProviders";
export { LenisProvider, useLenis } from "./LenisProvider";
export { GSAPInit } from "./GSAPInit";
export { RevealText } from "./RevealText";
export { FadeInView, StaggerList } from "./FadeInView";
export { ParallaxSection, ParallaxElement } from "./ParallaxSection";
export { MagneticButton } from "./MagneticButton";
export { CountUp } from "./CountUp";
export { MarqueeStrip } from "./MarqueeStrip";
export { ClipReveal, LineDraw } from "./ClipReveal";

// Re-export shared constants for convenience
export { EASE, DURATION, STAGGER, SCROLL_TRIGGER_DEFAULTS } from "@/lib/animation";
