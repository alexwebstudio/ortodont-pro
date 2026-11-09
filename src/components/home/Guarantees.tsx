import { guarantees } from "@/content/copy";
import { SectionHead } from "@/components/ui/Heading";
import { Check } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";

export function Guarantees({ id }: { id?: string }) {
  return (
    <SectionCard id={id}>
      <SectionHead eyebrow={guarantees.eyebrow} title={guarantees.title} lead={guarantees.lead} />
      <Reveal group className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {guarantees.items.map((item) => (
          <div key={item.title} data-reveal-item="" className="flex min-h-[190px] flex-col justify-between gap-6 rounded-[18px] bg-tint p-5 lg:rounded-[22px] lg:p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-surface text-accent">
              <Check />
            </span>
            <div>
              <h3 className="text-[19px] font-semibold leading-tight">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-snug text-ink-muted">{item.text}</p>
            </div>
          </div>
        ))}
      </Reveal>
    </SectionCard>
  );
}
