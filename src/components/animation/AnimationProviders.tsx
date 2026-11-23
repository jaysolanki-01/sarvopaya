"use client";

import type { ReactNode } from "react";
import { GSAPInit } from "./GSAPInit";
import { LenisProvider } from "./LenisProvider";

/**
 * Drop-in provider for the root layout.
 * Initialises GSAP plugins and Lenis smooth scroll globally.
 *
 * Usage in app/layout.tsx (Server Component):
 *   <AnimationProviders>{children}</AnimationProviders>
 */
export function AnimationProviders({ children }: { children: ReactNode }) {
  return (
    <LenisProvider>
      <GSAPInit />
      {children}
    </LenisProvider>
  );
}
