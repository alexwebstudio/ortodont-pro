import Link from "next/link";
import type { Case } from "@/content/cases";
import { plainText } from "@/lib/splitWords";
import { ArrowUpRight } from "./Icons";
import { BeforeAfterSlider } from "./BeforeAfterSlider";
import { Mono } from "./Mono";

export function CaseCard({ item, sizes }: { item: Case; sizes: string }) {
  return (
    <article>
      <BeforeAfterSlider before={item.before} after={item.after} altBefore={item.altBefore} altAfter={item.altAfter} sizes={sizes} label={`${item.serviceTitle}, кейс ${item.index}`} />
      <Link href={`/cases/${item.slug}`} className="group mt-3 flex items-start justify-between gap-4">
        <span>
          <span className="block text-[17px] font-medium leading-snug group-hover:underline group-hover:underline-offset-4">{plainText(item.title)}</span>
          <Mono className="mt-1 block !text-[13px] opacity-70">
            Кейс {item.index} · {item.serviceTitle} · {item.duration}
          </Mono>
        </span>
        <ArrowUpRight className="mt-1 flex-none transition-transform duration-500 group-hover:rotate-45" />
      </Link>
    </article>
  );
}
