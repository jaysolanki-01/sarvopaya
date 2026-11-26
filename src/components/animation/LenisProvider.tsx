"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const pathname = usePathname();
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const rafFnRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    // Skip smooth scroll if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const instance = new Lenis({
      duration: 1.0,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      autoResize: true,
      ...options,
    });

    lenisRef.current = instance;

    // Keep ScrollTrigger in sync with Lenis scroll position
    instance.on("scroll", ScrollTrigger.update);

    // Drive Lenis via GSAP's ticker using GSAP's synchronized timestamp
    const rafFn = (time: number) => {
      instance.raf(time * 1000);
    };
    rafFnRef.current = rafFn;

    gsap.ticker.add(rafFn);
    gsap.ticker.lagSmoothing(0);

    // Debounced ResizeObserver keeps Lenis bounds & ScrollTrigger coordinates
    // accurate whenever accordions, tabs, images, or async widgets change page height.
    let refreshTimer: ReturnType<typeof setTimeout> | null = null;
    const resizeObserver = new ResizeObserver(() => {
      if (refreshTimer) clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => {
        instance.resize();
        ScrollTrigger.refresh();
      }, 160);
    });
    resizeObserver.observe(document.body);

    setLenis(instance);

    return () => {
      if (refreshTimer) clearTimeout(refreshTimer);
      resizeObserver.disconnect();
      if (rafFnRef.current) {
        gsap.ticker.remove(rafFnRef.current);
        rafFnRef.current = null;
      }
      instance.destroy();
      lenisRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-sync scroll bounds & ScrollTrigger positions across Next.js route changes
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      lenisRef.current?.resize();
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
