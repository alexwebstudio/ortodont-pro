import Image from "next/image";
import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { AnimatedTitle } from "@/components/ui/Heading";
import { LogoMark } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";

type PageHeroProps = {
  title: string;
  lead?: string;
  crumbs: Crumb[];
  /** Без фото — однотонный оранжевый фон в цвет логотипа. */
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
  /** Для вертикальных снимков: текст слева на оранжевой панели, фото справа. */
  split?: boolean;
  objectPosition?: string;
};

export function PageHero({ title, lead, crumbs, image, imageAlt = "", children, split, objectPosition = "center" }: PageHeroProps) {
  const text = (
    <>
      <div className="mb-auto pb-10">
        <Breadcrumbs items={crumbs} />
      </div>
      <AnimatedTitle as="h1" text={title} />
      {lead && (
        <Reveal instant delay={0.15} className="t-lead mt-5 max-w-[48ch]">
          <p>{lead}</p>
        </Reveal>
      )}
      {children && (
        <Reveal instant delay={0.2} className="mt-7 flex flex-wrap gap-3">
          {children}
        </Reveal>
      )}
    </>
  );

  if (!image) {
    return (
      <section className="on-accent page-top relative isolate flex min-h-[62svh] flex-col overflow-hidden pb-10 text-on-accent lg:min-h-[66svh] lg:pb-14" style={{ background: "var(--bright)", paddingInline: "var(--inline)" }}>
        {/* Крупный знак клиники как фактура фона */}
        <LogoMark aria-hidden="true" className="hero-mark pointer-events-none absolute -right-[18%] top-[14%] -z-10 h-auto w-[95vw] max-w-[760px] sm:-right-[6%] lg:right-[4%] lg:top-1/2 lg:w-[46vw] lg:-translate-y-1/2" />
        <div className="relative z-10 flex flex-1 flex-col">{text}</div>
      </section>
    );
  }

  if (split) {
    return (
      <section className="grid lg:grid-cols-12">
        <div className="on-accent page-top flex min-h-[52svh] flex-col pb-10 text-on-accent lg:col-span-7 lg:min-h-[66svh] lg:pb-14" style={{ background: "var(--bright)", paddingInline: "var(--gutter)" }}>
          {text}
        </div>
        <div className="relative aspect-[4/3] bg-surface-2 lg:col-span-5 lg:aspect-auto">
          <Image src={image} alt={imageAlt} fill priority quality={70} sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" style={{ objectPosition }} />
        </div>
      </section>
    );
  }

  return (
    <section className="hero-shade on-dark page-top relative isolate flex min-h-[66svh] flex-col overflow-hidden pb-10 lg:pb-14" style={{ background: "var(--dark)", paddingInline: "var(--inline)" }}>
      <Image src={image} alt={imageAlt} fill priority quality={60} sizes="(min-width: 768px) 100vw, 60vw" className="-z-10 object-cover" style={{ objectPosition }} />
      <div className="relative z-10 flex flex-1 flex-col">{text}</div>
    </section>
  );
}
