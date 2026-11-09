import type { ReactNode } from "react";
import { cx } from "@/lib/utils";

export function PillLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cx("pill", className)}>{children}</span>;
}
