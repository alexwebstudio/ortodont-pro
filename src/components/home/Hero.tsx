import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { hero } from "@/content/copy";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Button } from "@/components/ui/Button";
import { AnimatedTitle } from "@/components/ui/Heading";
import { Mono } from "@/components/ui/Mono";
import { PillLabel } from "@/components/ui/PillLabel";
import { RatingCard } from "@/components/ui/RatingCard";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  const { photos, labels } = hero;

  return (
    <section className="section-card page-top !pb-6 lg:!pb-8" data-tone="surface">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
        <div className="flex flex-col justify-center lg:col-span-6">
          <Reveal instant>
            <Mono className="mb-5 block text-ink-muted">{hero.stamp}</Mono>
          </Reveal>
          <AnimatedTitle as="h1" text={hero.title} />
          <Reveal instant delay={0.15} className="t-lead mt-6 max-w-[44ch] text-ink-muted">
            <p>{hero.subtitle}</p>
          </Reveal>
          <Reveal instant delay={0.2} className="mt-7 flex flex-wrap gap-3">
            <Button booking arrow>
              {hero.primary}
            </Button>
            <Button href="/doctors" variant="secondary">
              {hero.secondary}
            </Button>
          </Reveal>
          <Reveal instant delay={0.28} className="mt-8 max-w-[420px]">
            <RatingCard />
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:col-span-6 lg:gap-4">
          <Link href="/about" className="group photo-card aspect-[16/10] sm:col-span-2 sm:aspect-[16/9]">
            <Image src={photos.clinic.src} alt={photos.clinic.alt} fill priority quality={60} sizes="(min-width: 1024px) 50vw, 60vw" className="object-cover" />
            <PillLabel className="absolute bottom-3 left-3 z-10">{labels.clinic}</PillLabel>
            <span className="absolute bottom-3 right-3 z-10">
              <ArrowButton />
            </span>
          </Link>
          <Link href="/about#tech" className="group photo-card aspect-[16/10] sm:aspect-square">
            <Image src={photos.scan.src} alt={photos.scan.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
            <PillLabel className="absolute bottom-3 left-3 z-10">{labels.scan}</PillLabel>
          </Link>
          <Link href="/about" className="group photo-card aspect-[16/10] sm:aspect-square">
            <Image src={photos.room.src} alt={photos.room.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
            <PillLabel className="absolute bottom-3 left-3 z-10">{labels.room}</PillLabel>
          </Link>
        </div>
      </div>

      <Reveal instant delay={0.3} className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line pt-5 lg:mt-8">
        {hero.params.map((param, index) => (
          <Fragment key={param}>
            {index > 0 && (
              <span aria-hidden="true" className="t-mono text-accent">
                ·
              </span>
            )}
            <Mono className="text-ink">{param}</Mono>
          </Fragment>
        ))}
      </Reveal>
    </section>
  );
}
