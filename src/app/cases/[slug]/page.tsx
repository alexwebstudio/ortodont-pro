import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaForm } from "@/components/home/CtaForm";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { AnimatedTitle } from "@/components/ui/Heading";
import { ArrowLeft, ArrowRight } from "@/components/ui/Icons";
import { Mono } from "@/components/ui/Mono";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";
import { cases, getCase } from "@/content/cases";
import { getDoctor } from "@/content/doctors";
import { site } from "@/content/site";
import { plainText } from "@/lib/splitWords";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return cases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = getCase((await params).slug);
  if (!item) return {};
  return pageMeta({
    title: `${plainText(item.title)}, кейс ${item.index}`,
    description: `Кейс клиники ${site.brand}: ${item.serviceTitle.toLowerCase()}, срок ${item.duration}. Задача, план лечения и сравнение до и после.`,
    path: `/cases/${item.slug}`,
  });
}

export default async function CasePage({ params }: Props) {
  const item = getCase((await params).slug);
  if (!item) notFound();

  const index = cases.indexOf(item);
  const previous = cases[(index - 1 + cases.length) % cases.length];
  const next = cases[(index + 1) % cases.length];
  const doctor = getDoctor(item.doctorSlug);

  const params_ = [
    { label: "Услуга", value: item.serviceTitle, href: `/services/${item.serviceSlug}` },
    { label: "Срок", value: item.duration },
    { label: "Количество визитов", value: item.visits },
    { label: "Врач", value: doctor?.role ?? "—", href: doctor ? `/doctors/${doctor.slug}` : undefined },
    { label: "Гарантия", value: item.warranty },
  ];

  return (
    <>
      <section data-tone="surface" className="section-card page-top">
        <Breadcrumbs
          items={[
            { name: "Работы", path: "/cases" },
            { name: `Кейс ${item.index}`, path: `/cases/${item.slug}` },
          ]}
        />
        <p className="t-eyebrow mb-4 mt-8">
          {item.serviceTitle} · {item.duration}
        </p>
        <AnimatedTitle as="h1" text={item.title} />
        <Reveal delay={0.2} className="mb-8 mt-7 flex flex-wrap gap-3">
          <Button booking arrow>
            Записаться на такое же
          </Button>
          <Button href="/cases" variant="secondary">
            Все работы
          </Button>
        </Reveal>
        <Reveal>
          <BeforeAfterSlider priority before={item.before} after={item.after} altBefore={item.altBefore} altAfter={item.altAfter} sizes="100vw" label={`${item.serviceTitle}, кейс ${item.index}`} className="!aspect-[16/10] lg:!aspect-[21/10] lg:!rounded-[22px]" />
        </Reveal>
      </section>

      <SectionCard>
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="t-h3 mb-5">Параметры</h2>
            <dl>
              {params_.map((row) => (
                <div key={row.label} className="hair-row flex items-center justify-between gap-6 py-3.5">
                  <dt className="text-ink-muted">{row.label}</dt>
                  <dd className="text-right font-medium">
                    {row.href ? (
                      <Link href={row.href} className="text-accent underline-offset-4 hover:underline">
                        {row.value}
                      </Link>
                    ) : (
                      <Mono className="!text-[15px]">{row.value}</Mono>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="space-y-10 lg:col-span-6 lg:col-start-7">
            <Reveal>
              <h2 className="t-h3 mb-4">Задача</h2>
              <div className="prose-clinic text-ink-muted">
                {item.task.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
            <Reveal>
              <h2 className="t-h3 mb-4">План лечения</h2>
              <ol>
                {item.plan.map((step, stepIndex) => (
                  <li key={step} className="hair-row flex gap-4 py-3">
                    <Mono className="pt-0.5 text-accent-ink">0{stepIndex + 1}</Mono>
                    {step}
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>

        <nav aria-label="Другие кейсы" className="mt-12 flex items-center justify-between gap-4 border-t border-line pt-6">
          {previous && (
            <Link href={`/cases/${previous.slug}`} className="flex items-center gap-3 font-medium transition-colors hover:text-accent">
              <ArrowLeft /> Предыдущий
            </Link>
          )}
          {next && (
            <Link href={`/cases/${next.slug}`} className="flex items-center gap-3 font-medium transition-colors hover:text-accent">
              Следующий <ArrowRight />
            </Link>
          )}
        </nav>
      </SectionCard>

      <CtaForm defaultService={item.serviceTitle} />
    </>
  );
}
