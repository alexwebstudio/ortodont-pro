import type { ReactNode } from "react";
import { PageMotion } from "@/components/layout/PageMotion";

// Шаблон пересоздаётся на каждом переходе: мягкий fade и новая привязка анимаций.
export default function Template({ children }: { children: ReactNode }) {
  return <PageMotion>{children}</PageMotion>;
}
