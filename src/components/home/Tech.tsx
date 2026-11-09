import Image from "next/image";
import { techBlock } from "@/content/copy";
import { SectionHead } from "@/components/ui/Heading";
import { Mono } from "@/components/ui/Mono";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";
import { cx } from "@/lib/utils";

export function Tech({ id }: { id?: string }) {
  return (
    <SectionCard tone="surface-2" id={id}>
      <SectionHead eyebrow={techBlock.eyebrow} title={techBlock.title} lead={techBlock.lead} link={id ? undefined : { label: techBlock.all, href: "/about#tech" }} />
      <Reveal group className="grid gap-3 md:grid-cols-2 lg:grid-cols-6 lg:gap-4">
        {techBlock.items.map((item, index) => (
          <figure key={item.title} data-reveal-item="" className={cx("overflow-hidden rounded-[18px] bg-surface lg:rounded-[22px]", index < 2 ? "lg:col-span-3" : "lg:col-span-2")}>
            <div className="photo-card aspect-[3/2] !rounded-none">
              <Image src={item.image} alt={item.alt} fill sizes={index < 2 ? "(min-width: 1024px) 46vw, 100vw" : "(min-width: 1024px) 30vw, 100vw"} className="object-cover" />
            </div>
            <figcaption className="flex items-start justify-between gap-4 p-4 lg:p-5">
              <span>
                <span className="block text-[18px] font-semibold leading-tight">{item.title}</span>
                <span className="mt-1.5 block text-[15px] leading-snug text-ink-muted">{item.text}</span>
              </span>
              <Mono className="flex-none !text-[13px] text-accent-ink">0{index + 1}</Mono>
            </figcaption>
          </figure>
        ))}
      </Reveal>
    </SectionCard>
  );
}
