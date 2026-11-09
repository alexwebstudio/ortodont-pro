"use client";

import { useEffect, useLayoutEffect, type RefObject } from "react";
import { gsap, playOnEnter, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";
import { bindCountUp } from "./useCountUp";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

// Все появления вешаются на data-атрибуты, поэтому секции остаются серверными компонентами.
// Параметры взяты из эффектов AW-Flow и стандарта из ТЗ.
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useIsoLayoutEffect(() => {
    const root = scope.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Всё, что уже на первом экране, запускается сразу, а не ждёт скролла.
      const start = (animation: gsap.core.Animation, el: HTMLElement, position: string) => {
        if (el.getBoundingClientRect().top < window.innerHeight && window.scrollY < 8) animation.play();
        else playOnEnter(animation, el, position);
      };

      // AW Blur Reveal: буквы проявляются из размытия.
      root.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
        const tween = gsap.to(el.querySelectorAll(".char"), { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.9, ease: "power3.out", stagger: 0.02, paused: true });
        start(tween, el, "top 85%");
      });

      root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        const vars = el.hasAttribute("data-blur") ? { filter: "blur(0px)" } : {};
        const tween = gsap.to(el, { opacity: 1, y: 0, duration: 0.8, delay: Number(el.dataset.delay ?? 0), paused: true, ...vars });
        start(tween, el, "top 86%");
      });

      // AW Blur In + Stagger Grid: карточки проявляются из размытия.
      root.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
        const tween = gsap.to(group.querySelectorAll(":scope > [data-reveal-item]"), { opacity: 1, filter: "blur(0px)", scale: 1, duration: 0.9, stagger: 0.07, paused: true });
        start(tween, group, "top 86%");
      });

      root.querySelectorAll<HTMLElement>("[data-count]").forEach(bindCountUp);

      root.querySelectorAll<HTMLElement>("[data-float]").forEach((el) => {
        const tween = gsap.to(el, { y: 10, duration: 0.9 * 3, ease: "sine.inOut", repeat: -1, yoyo: true, startAt: { y: -10 } });
        ScrollTrigger.create({ trigger: el, start: "top bottom", end: "bottom top", onToggle: (self) => tween.paused(!self.isActive) });
      });

      // Параллакс только на десктопе: на телефонах адресная строка меняет высоту окна,
      // ScrollTrigger пересчитывает точки и элемент может «уехать».
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        if (!desktop) return;
        gsap.to(el, {
          y: Number(el.dataset.parallax),
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }, root);

    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, [scope]);
}
