import { servicesBlock } from "@/content/copy";
import { homeServices } from "@/content/services";
import { Button } from "@/components/ui/Button";
import { SectionHead } from "@/components/ui/Heading";
import { SectionCard } from "@/components/ui/SectionCard";
import { QuestionCard, ServiceCard } from "@/components/ui/ServiceCard";

export function Services() {
  return (
    <SectionCard tone="surface-2">
      <SectionHead
        eyebrow={servicesBlock.eyebrow}
        title={servicesBlock.title}
        lead={servicesBlock.lead}
        action={
          <Button href="/services" arrow variant="light">
            {servicesBlock.all}
          </Button>
        }
      />
      <div data-reveal-group="" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {homeServices.map((service) => (
          <div key={service.slug} data-reveal-item="">
            <ServiceCard service={service} sizes="(min-width: 1024px) 24vw, (min-width: 640px) 46vw, 100vw" />
          </div>
        ))}
        <div data-reveal-item="" className="sm:col-span-2 lg:col-span-2">
          <QuestionCard />
        </div>
      </div>
    </SectionCard>
  );
}
