import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { LogoMark } from "@/components/ui/Icons";

// Чистый CSS: работает до загрузки JS. Знак прорисовывается по шагам
// (контур зуба → брекет-дуга → замки и стрелка), под ним проявляется название.
export function Preloader() {
  return (
    <div className="preloader" aria-hidden="true">
      <LogoMark className="preloader-mark" />
      <span className="preloader-name">
        {site.wordmark.map((part, index) => (
          <span key={part} style={{ "--i": index } as CSSProperties}>
            {part}
          </span>
        ))}
      </span>
    </div>
  );
}
