"use client";

import { gsap, playOnEnter } from "@/lib/gsap";

// AW Number Roll: находит первое число в тексте и один раз докручивает его при входе в экран.
export function bindCountUp(el: HTMLElement) {
  // Исходный текст храним в атрибуте: эффект может запуститься повторно на уже открученном числе.
  const source = el.dataset.countSource ?? el.textContent ?? "";
  el.dataset.countSource = source;
  el.textContent = source;
  const match = source.match(/\d[\d\s ]*(?:[.,]\d+)?/);
  if (!match) return;

  const token = match[0];
  const before = source.slice(0, match.index);
  const after = source.slice((match.index ?? 0) + token.length);
  const decimals = (token.split(/[.,]/)[1] ?? "").length;
  const separator = token.includes(",") ? "," : ".";
  const target = Number(token.replace(/[\s ]/g, "").replace(",", "."));
  const state = { value: 0 };

  const render = () => {
    const fixed = state.value.toFixed(decimals);
    const [whole = "0", fraction] = fixed.split(".");
    const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    el.textContent = `${before}${grouped}${fraction ? separator + fraction : ""}${after}`;
  };

  const tween = gsap.to(state, {
    value: target,
    duration: 0.9,
    ease: "power3.out",
    paused: true,
    onStart: render,
    onUpdate: render,
    onComplete: () => {
      el.textContent = source;
    },
  });
  playOnEnter(tween, el, "top 88%");
}
