import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaForm } from "@/components/home/CtaForm";
import { PageHero } from "@/components/layout/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { ArrowButton } from "@/components/ui/ArrowButton";
import { Button } from "@/components/ui/Button";
import { CaseCard } from "@/components/ui/CaseCard";
import { DoctorCard } from "@/components/ui/DoctorCard";
import { AnimatedTitle, SectionHead } from "@/components/ui/Heading";
import { Check } from "@/components/ui/Icons";
import { JsonLd } from "@/components/ui/JsonLd";
import { PriceTable } from "@/components/ui/PriceTable";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";
import { cases } from "@/content/cases";
import { getDoctor } from "@/content/doctors";
import { minPrice, priceNote, priceSection } from "@/content/prices";
import { getService, services } from "@/content/services";
import { formatPriceFrom, site } from "@/content/site";
import { absoluteUrl, faqSchema, pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return pageMeta({
    title: `${service.title}: цены и этапы, ${site.city}`,
    description: `${service.title} в клинике ${site.brand}: ${service.short}. Сначала осмотр и план, потом лечение.`.slice(0, 155),
    path: `/services/${service.slug}`,
    image: service.image,
    imageAlt: service.imageAlt,
  });
}

export default async function ServicePage({ params }: Props) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const section = priceSection(service.priceId);
  const doctor = service.doctorSlug ? getDoctor(service.doctorSlug) : undefined;
  const gallery = service.caseCategory ? cases.filter((item) => item.category === service.caseCategory).slice(0, 3) : [];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalProcedure",
          name: service.title,
          description: service.lead,
          url: absoluteUrl(`/services/${service.slug}`),
          provider: { "@id": absoluteUrl("/#clinic") },
        }}
      />
      <JsonLd data={faqSchema(service.faq)} />

      <PageHero
        split
        title={service.headline}
        lead={service.lead}
        crumbs={[
          { name: "Услуги", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ]}
        image={service.image}
        imageAlt={service.imageAlt}
      >
        <Button booking arrow variant="light">
          Записаться на приём
        </Button>
        <span className="t-mono self-center !text-[15px] text-on-accent-muted">
          {formatPriceFrom(minPrice(service.priceId))} · {service.duration}
        </span>
      </PageHero>

      <SectionCard>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="t-eyebrow mb-4">Об услуге</p>
            <AnimatedTitle text="Что важно *знать*" />
            <Reveal delay={0.15} className="prose-clinic t-lead mt-6 max-w-[56ch] text-ink-muted">
              {service.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </Reveal>
          </div>
          <Reveal className="inner-card self-start p-6 lg:col-span-5 lg:p-8">
            <h2 className="t-h3 mb-5">Показания</h2>
            <ul className="space-y-3">
              {service.indications.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check className="mt-1 flex-none text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </SectionCard>

      <SectionCard tone="surface-2">
        <SectionHead eyebrow="Этапы" title="Как проходит *лечение*" lead="Заранее знаете каждый шаг лечения." />
        <Reveal as="ol" group className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {service.stages.map((stage, index) => (
            <li key={stage.title} data-reveal-item="" className="rounded-[18px] bg-surface p-5 lg:rounded-[22px] lg:p-6">
              <span className="t-stat block">0{index + 1}</span>
              <h3 className="mt-5 text-[19px] font-semibold leading-tight">{stage.title}</h3>
              <p className="mt-2 text-[15px] leading-snug text-ink-muted">{stage.text}</p>
            </li>
          ))}
        </Reveal>
      </SectionCard>

      <SectionCard>
        <SectionHead eyebrow="Цены" title={`Сколько стоит: *${section.title.toLowerCase()}*`} lead={priceNote} link={{ label: "Полный прайс", href: "/prices" }} />
        <Reveal>
          <PriceTable items={section.items} caption={`Цены: ${section.title}`} />
        </Reveal>
      </SectionCard>

      <SectionCard tone="surface-2">
        <SectionHead eyebrow="Преимущества" title="Почему здесь *спокойно*" />
        <Reveal group className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {service.benefits.map((benefit) => (
            <div key={benefit.title} data-reveal-item="" className="rounded-[18px] bg-surface p-5 lg:rounded-[22px] lg:p-6">
              <h3 className="text-[19px] font-semibold leading-tight">{benefit.title}</h3>
              <p className="mt-2 text-[15px] leading-snug text-ink-muted">{benefit.text}</p>
            </div>
          ))}
        </Reveal>
      </SectionCard>

      {gallery.length > 0 && (
        <SectionCard tone="accent">
          <SectionHead eyebrow="Работы" title="Примеры *лечения*" lead="Сравните до и после, откройте кейс и посмотрите план." link={{ label: "Все работы", href: "/cases" }} />
          <div className="grid gap-5 md:grid-cols-3 md:gap-4">
            {gallery.map((item) => (
              <CaseCard key={item.slug} item={item} sizes="(min-width: 768px) 31vw, 100vw" />
            ))}
          </div>
        </SectionCard>
      )}

      <SectionCard>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="t-eyebrow mb-4">Вопросы</p>
            <AnimatedTitle text="Частые *вопросы*" className="mb-8" />
            <Reveal>
              <Accordion items={service.faq} />
            </Reveal>
          </div>
          {doctor && (
            <Reveal className="lg:col-span-4 lg:col-start-9">
              <p className="t-eyebrow mb-4">Ведёт услугу</p>
              <DoctorCard doctor={doctor} sizes="(min-width: 1024px) 30vw, 100vw" />
              <Link href="/doctors" className="group mt-4 flex items-center justify-between gap-3 font-medium">
                Все врачи клиники <ArrowButton tone="ghost" />
              </Link>
            </Reveal>
          )}
        </div>
      </SectionCard>

      <CtaForm defaultService={service.title} />
    </>
  );
}
