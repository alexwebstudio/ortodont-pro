"use client";

import { useMemo, useState } from "react";
import { caseFilters, cases, casesMixed, type CaseCategory } from "@/content/cases";
import { ScrollTrigger } from "@/lib/gsap";
import { Button } from "./Button";
import { CaseCard } from "./CaseCard";
import { Mono } from "./Mono";

const PAGE = 8;

export function CasesGrid() {
  const [filter, setFilter] = useState<CaseCategory | "all">("all");
  const [visible, setVisible] = useState(PAGE);

  const filtered = useMemo(() => (filter === "all" ? casesMixed : cases.filter((item) => item.category === filter)), [filter]);
  const shown = filtered.slice(0, visible);
  const rest = filtered.length - shown.length;

  const refresh = () => requestAnimationFrame(() => ScrollTrigger.refresh());

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Фильтр работ по услуге">
        {caseFilters.map((item) => {
          const count = item.id === "all" ? cases.length : cases.filter((entry) => entry.category === item.id).length;
          const active = filter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => {
                setFilter(item.id);
                setVisible(PAGE);
                refresh();
              }}
              className={`inline-flex h-11 items-center gap-2 rounded-full border px-4 text-[15px] font-medium transition-colors ${active ? "border-accent bg-accent text-on-accent" : "border-line hover:border-ink"}`}
            >
              {item.label} <span className="t-mono !text-[13px]">{count}</span>
            </button>
          );
        })}
      </div>

      <Mono className="mb-6 mt-5 block text-ink-muted">
        <span aria-live="polite">
          Показано: {shown.length} из {filtered.length}
        </span>
      </Mono>

      <div className="grid gap-x-5 gap-y-10 md:grid-cols-2">
        {shown.map((item) => (
          <CaseCard key={item.slug} item={item} sizes="(min-width: 768px) 46vw, 100vw" />
        ))}
      </div>

      {rest > 0 && (
        <div className="mt-10 flex justify-center">
          <Button
            variant="secondary"
            onClick={() => {
              setVisible((value) => value + PAGE);
              refresh();
            }}
          >
            Показать ещё · {rest}
          </Button>
        </div>
      )}
    </div>
  );
}
