import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/content/services";
import { minPrice } from "@/content/prices";
import { formatPriceFrom } from "@/content/site";
import { servicesBlock } from "@/content/copy";
import { ArrowButton } from "./ArrowButton";
import { Button } from "./Button";
import { Mono } from "./Mono";
import { PillLabel } from "./PillLabel";

export function ServiceCard({ service, sizes }: { service: Service; sizes: string }) {
  return (
    <Link href={`/services/${service.slug}`} aria-label={`${service.title}: ${service.short}`} className="group photo-card card-shade aspect-[4/5] text-white">
      <Image src={service.image} alt={service.imageAlt} fill sizes={sizes} className="object-cover" />
      <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 lg:p-5">
        <div className="flex items-start justify-between">
          <span className="font-display text-[44px] leading-none [text-shadow:0_1px_18px_rgb(13_40_110/0.5)]">{service.number}</span>
          <ArrowButton />
        </div>
        <div>
          <PillLabel className="mb-2.5">{service.title}</PillLabel>
          <p className="text-[15px] leading-snug">{service.short}</p>
          <Mono className="mt-2 block !text-[13px] opacity-90">
            {formatPriceFrom(minPrice(service.priceId))} · {service.duration}
          </Mono>
        </div>
      </div>
    </Link>
  );
}

export function QuestionCard() {
  const { question } = servicesBlock;
  return (
    <div className="on-accent flex h-full min-h-[280px] flex-col justify-between gap-8 rounded-[18px] p-5 text-on-accent lg:min-h-[320px] lg:rounded-[22px] lg:p-7" style={{ background: "var(--bright)" }}>
      <p className="font-display text-[clamp(36px,3.4vw,54px)] uppercase leading-none">{question.title}</p>
      <div>
        <p className="mb-5 max-w-[34ch]">{question.text}</p>
        <Button booking arrow variant="light">
          {question.cta}
        </Button>
      </div>
    </div>
  );
}
