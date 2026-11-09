import type { ReactNode } from "react";
import { cx } from "@/lib/utils";

type SectionCardProps = {
  children: ReactNode;
  tone?: "surface" | "surface-2" | "accent";
  clip?: boolean;
  className?: string;
  id?: string;
  labelledBy?: string;
};

export function SectionCard({ children, tone = "surface", clip, className, id, labelledBy }: SectionCardProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-tone={tone}
      data-clip={clip ? "true" : undefined}
      className={cx("section-card scroll-mt-24", tone === "accent" && "on-accent", className)}
    >
      {children}
    </section>
  );
}
