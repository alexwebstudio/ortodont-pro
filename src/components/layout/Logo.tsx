import Link from "next/link";
import { site } from "@/content/site";
import { LogoMark } from "@/components/ui/Icons";

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} className="logo-link flex items-center gap-2" aria-label={`${site.brand}, на главную`}>
      <LogoMark className="h-10 w-10 flex-none lg:h-11 lg:w-11" />
      <span className="font-display text-[22px] uppercase leading-none tracking-[0.06em] lg:text-[24px]">
        {site.wordmark[0]} <span className="text-accent">{site.wordmark[1]}</span>
      </span>
    </Link>
  );
}
