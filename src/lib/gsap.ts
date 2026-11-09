"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "power3.out" });
}

// Запуск один раз при входе в экран. once: true здесь нельзя: если страница открылась
// не сверху (якорь, перезагрузка), триггер удаляет себя внутри refresh и роняет его.
export function playOnEnter(animation: gsap.core.Animation, trigger: Element, start: string) {
  ScrollTrigger.create({ trigger, start, onEnter: () => animation.play() });
}

export { gsap, ScrollTrigger };
