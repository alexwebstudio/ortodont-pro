import { ArrowUpRight } from "./Icons";

export function ArrowButton({ tone = "light" }: { tone?: "light" | "accent" | "ghost" | "fill" }) {
  return (
    <span className="arrow-btn" data-tone={tone} aria-hidden="true">
      <ArrowUpRight />
    </span>
  );
}
