"use client";

import { useId, useState } from "react";
import type { Faq } from "@/content/services";
import { ScrollTrigger } from "@/lib/gsap";

export function Accordion({ items, firstOpen = true }: { items: Faq[]; firstOpen?: boolean }) {
  const [open, setOpen] = useState<number | null>(firstOpen ? 0 : null);
  const baseId = useId();

  const toggle = (index: number) => {
    setOpen((current) => (current === index ? null : index));
    window.setTimeout(() => ScrollTrigger.refresh(), 480);
  };

  return (
    <div>
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.q} className="hair-row">
            <h3>
              <button
                type="button"
                id={`${baseId}-b${index}`}
                aria-expanded={expanded}
                aria-controls={`${baseId}-p${index}`}
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left text-[18px] font-medium leading-snug lg:text-[20px]"
              >
                {item.q}
                <span className="acc-icon" aria-hidden="true" />
              </button>
            </h3>
            <div id={`${baseId}-p${index}`} role="region" aria-labelledby={`${baseId}-b${index}`} className="acc-panel" data-open={expanded}>
              <div>
                <p className="max-w-[62ch] pb-6 pr-14 text-ink-muted">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
