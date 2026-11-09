"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";
import { cx } from "@/lib/utils";

// Fade только при переходах: на первой загрузке он прятал hero от LCP.
let navigated = false;

export function PageMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);

  useEffect(() => {
    navigated = true;
  }, []);

  return (
    <div ref={root} className={cx(navigated && "page-fade")}>
      {children}
    </div>
  );
}
