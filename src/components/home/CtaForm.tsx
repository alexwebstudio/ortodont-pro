import { cta } from "@/content/copy";
import { site } from "@/content/site";
import { BookingForm } from "@/components/ui/BookingForm";
import { AnimatedTitle } from "@/components/ui/Heading";
import { WhatsApp } from "@/components/ui/Icons";
import { Mono } from "@/components/ui/Mono";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";

export function CtaForm({ id = "booking", defaultService, title = cta.title, submitLabel }: { id?: string; defaultService?: string; title?: string; submitLabel?: string }) {
  return (
    <SectionCard id={id} tone="accent" clip>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <p className="t-eyebrow mb-4">{cta.eyebrow}</p>
          <AnimatedTitle text={title} />
          <Reveal delay={0.15} className="t-lead mt-5 max-w-[42ch]">
            <p>{cta.subtitle}</p>
          </Reveal>

          <Reveal delay={0.1} className="mt-9">
            <p className="t-eyebrow mb-4">{cta.afterTitle}</p>
            <ol className="space-y-3">
              {cta.after.map((item, index) => (
                <li key={item.title} className="flex gap-4 border-t border-[rgb(23_18_13/0.2)] pt-3">
                  <Mono>0{index + 1}</Mono>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-[15px] leading-snug">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mb-3 mt-7 text-[15px]">{cta.messengersNote}</p>
            <div className="flex flex-wrap gap-2">
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn !min-h-12" data-variant="outline-light">
                <WhatsApp /> WhatsApp
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal className="rounded-[22px] bg-surface p-5 text-ink shadow-[var(--shadow-lift)] md:p-8 lg:col-span-7 lg:self-center lg:p-10">
          <BookingForm submitLabel={submitLabel ?? cta.submit} defaultService={defaultService} />
        </Reveal>
      </div>
    </SectionCard>
  );
}
