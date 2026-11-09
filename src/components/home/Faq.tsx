import { faqBlock } from "@/content/copy";
import { faq } from "@/content/faq";
import { Accordion } from "@/components/ui/Accordion";
import { AnimatedTitle } from "@/components/ui/Heading";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";
import { faqSchema } from "@/lib/seo";

export function Faq() {
  return (
    <SectionCard tone="surface-2">
      <JsonLd data={faqSchema(faq)} />
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="t-eyebrow mb-4">{faqBlock.eyebrow}</p>
          <AnimatedTitle text={faqBlock.title} />
          <Reveal delay={0.15} className="t-lead mt-5 max-w-[36ch] text-ink-muted">
            <p>{faqBlock.lead}</p>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-7">
          <Accordion items={faq} />
        </Reveal>
      </div>
    </SectionCard>
  );
}
