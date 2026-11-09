import { stepsBlock } from "@/content/copy";
import { SectionHead } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";
import { StepsTabs } from "./StepsTabs";

export function Steps() {
  return (
    <SectionCard tone="surface-2">
      <SectionHead eyebrow={stepsBlock.eyebrow} title={stepsBlock.title} lead={stepsBlock.lead} />
      <Reveal>
        <StepsTabs />
      </Reveal>
    </SectionCard>
  );
}
