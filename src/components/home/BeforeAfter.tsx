import { casesBlock } from "@/content/copy";
import { homeCases } from "@/content/cases";
import { SectionHead } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";
import { CasesShowcase } from "./CasesShowcase";

// Без реальных фото блока нет.
export function BeforeAfter() {
  if (homeCases.length === 0) return null;

  return (
    <SectionCard tone="accent" clip>
      <SectionHead eyebrow={casesBlock.eyebrow} title={casesBlock.title} lead={casesBlock.lead} link={{ label: casesBlock.all, href: "/cases" }} />
      <Reveal>
        <CasesShowcase items={homeCases} />
      </Reveal>
    </SectionCard>
  );
}
