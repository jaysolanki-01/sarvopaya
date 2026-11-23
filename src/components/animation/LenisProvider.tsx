"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

interface LenisProviderProps {
  children: ReactNode;
  /** Override Lenis options */
  options?: ConstructorParameters<typeof Lenis>[0];
}

export function LenisProvider({ children, options }: LenisProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafFnRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    // Skip smooth scroll if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const instance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      ...options,
    });

    // Keep ScrollTrigger in sync with Lenis scroll position
    instance.on("scroll", ScrollTrigger.update);

    // Drive Lenis via GSAP's RAF for synchronized animations
    const rafFn = () => {
      instance.raf(performance.now());
    };
    rafFnRef.current = rafFn;

    // Use GSAP ticker instead of requestAnimationFrame directly
    gsap.ticker.add(rafFn);
    // Prevent GSAP from adding artificial lag compensation (Lenis handles smoothing)
    gsap.ticker.lagSmoothing(0);

    setLenis(instance);

    return () => {
      if (rafFnRef.current) {
        gsap.ticker.remove(rafFnRef.current);
        rafFnRef.current = null;
      }
      instance.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
