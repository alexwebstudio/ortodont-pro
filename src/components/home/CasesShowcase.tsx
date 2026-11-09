"use client";

import Link from "next/link";
import { useState } from "react";
import type { Case } from "@/content/cases";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import { Mono } from "@/components/ui/Mono";
import { plainText } from "@/lib/splitWords";

const round = "flex h-12 w-12 items-center justify-center rounded-full border border-[rgb(255_255_255/0.32)] transition-colors hover:border-on-accent";

// Витрина результата: один крупный кейс, услуги переключаются табами и стрелками.
export function CasesShowcase({ items }: { items: Case[] }) {
  const [active, setActive] = useState(0);
  const item = items[active] ?? items[0];
  if (!item) return null;

  const step = (shift: number) => setActive((active + shift + items.length) % items.length);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Услуга">
          {items.map((entry, index) => (
            <button
              key={entry.slug}
              type="button"
              aria-pressed={index === active}
              onClick={() => setActive(index)}
              className={`inline-flex h-11 items-center rounded-full border px-4 text-[15px] font-medium transition-colors ${index === active ? "border-white bg-white text-ink" : "border-[rgb(255_255_255/0.32)] hover:border-on-accent"}`}
            >
              {entry.serviceTitle}
            </button>
          ))}
        </div>
        <div className="hidden gap-2 md:flex">
          <button type="button" onClick={() => step(-1)} aria-label="Предыдущий кейс" className={round}>
            <ArrowLeft />
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Следующий кейс" className={round}>
            <ArrowRight />
          </button>
        </div>
      </div>

      <div className="rounded-[22px] shadow-[var(--shadow-lift)]">
        <BeforeAfterSlider key={item.slug} before={item.before} after={item.after} altBefore={item.altBefore} altAfter={item.altAfter} sizes="(min-width: 1560px) 1420px, 100vw" label={`${item.serviceTitle}, кейс ${item.index}`} className="swap-in !aspect-[4/3] md:!aspect-[16/8]" />
      </div>

      <Link href={`/cases/${item.slug}`} className="group mt-5 flex items-center justify-between gap-6">
        <span>
          <span className="block text-[20px] font-semibold leading-snug lg:text-[24px]">{plainText(item.title)}</span>
          <Mono className="mt-1 block !text-[14px] text-on-accent-muted">
            {item.serviceTitle} · срок {item.duration}
          </Mono>
        </span>
        <span className="hidden items-center gap-2 text-[15px] font-medium sm:inline-flex">
          Открыть кейс <ArrowUpRight className="transition-transform duration-500 group-hover:rotate-45" />
        </span>
      </Link>
    </div>
  );
}
