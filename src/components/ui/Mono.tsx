import type { ReactNode } from "react";
import { cx } from "@/lib/utils";

export function Mono({ children, className, count }: { children: ReactNode; className?: string; count?: boolean }) {
  return (
    <span className={cx("t-mono", className)} data-count={count ? "" : undefined}>
      {children}
    </span>
  );
}
