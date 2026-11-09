"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis, setLenis } from "@/lib/lenis";
import { prefersReducedMotion } from "@/lib/utils";

const HEADER_OFFSET = -84;

export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      anchors: { offset: HEADER_OFFSET },
    });
    const tick = (time: number) => lenis.raf(time * 1000);

    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    // Первый рендер не трогаем: браузер сам восстановит скролл или перейдёт к якорю.
    if (firstRender.current) {
      firstRender.current = false;
    } else if (window.location.hash) {
      getLenis()?.scrollTo(window.location.hash, { immediate: true, offset: HEADER_OFFSET });
    } else {
      getLenis()?.scrollTo(0, { immediate: true, force: true });
    }
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return children;
}
