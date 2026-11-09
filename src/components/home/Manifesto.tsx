import { manifesto } from "@/content/copy";
import { SectionHead } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";

export function Manifesto() {
  return (
    <SectionCard tone="surface-2">
      <SectionHead eyebrow={manifesto.eyebrow} title={manifesto.title} lead={manifesto.signature} />
      <Reveal group className="grid gap-3 md:grid-cols-3 lg:gap-4">
        {manifesto.points.map((point) => (
          <div key={point.title} data-reveal-item="" className="rounded-[18px] bg-surface p-5 lg:rounded-[22px] lg:p-6">
            <h3 className="text-[20px] font-semibold leading-tight">{point.title}</h3>
            <p className="mt-3 text-[15px] leading-snug text-ink-muted">{point.text}</p>
          </div>
        ))}
      </Reveal>
    </SectionCard>
  );
}
