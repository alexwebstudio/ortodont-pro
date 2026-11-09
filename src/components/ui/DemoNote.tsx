import { site } from "@/content/site";
import { Mono } from "./Mono";

// Пометка демо-данных. Исчезает со всего сайта при site.isDemo = false.
export function DemoNote({ children, className }: { children: string; className?: string }) {
  if (!site.isDemo) return null;
  return <Mono className={`block !text-[12px] text-ink-muted ${className ?? ""}`}>{children}</Mono>;
}
