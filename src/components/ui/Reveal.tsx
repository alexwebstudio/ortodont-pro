import type { CSSProperties, ElementType, ReactNode } from "react";
import { cx } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  /** Дочерние элементы с data-reveal-item появляются каскадом. */
  group?: boolean;
  /** Для первого экрана: CSS-анимация без ожидания JS. */
  instant?: boolean;
};

// Обёртка без клиентского JS: анимацию вешает useReveal по data-атрибутам.
export function Reveal({ children, as: Tag = "div", delay, className, group, instant }: RevealProps) {
  if (instant) {
    return (
      <Tag className={cx("fade-css", className)} style={{ "--d": `${delay ?? 0}s` } as CSSProperties}>
        {children}
      </Tag>
    );
  }
  const attrs = group ? { "data-reveal-group": "" } : { "data-reveal": "", "data-delay": delay };
  return (
    <Tag className={className} {...attrs}>
      {children}
    </Tag>
  );
}
