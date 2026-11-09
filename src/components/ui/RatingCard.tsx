import { site } from "@/content/site";
import { hero } from "@/content/copy";
import { cx } from "@/lib/utils";
import { Mono } from "./Mono";
import { Star } from "./Icons";

export function RatingCard({ className }: { className?: string }) {
  return (
    <div className={cx("inner-card flex items-center gap-5 p-5 lg:p-6", className)}>
      <div className="flex items-start gap-1.5">
        {/* Без счётчика: перезапись текста на первом экране сдвигает LCP. */}
        <span className="t-mono !text-[52px] font-medium leading-none">{site.stats.rating.toFixed(1)}</span>
        <Star className="mt-1 text-accent" />
      </div>
      <div className="min-w-0 border-l border-line pl-5">
        <p className="text-[15px] font-medium leading-snug">{hero.ratingLabel}</p>
        <Mono className="text-ink-muted">{site.stats.reviews} отзывов</Mono>
      </div>
    </div>
  );
}
