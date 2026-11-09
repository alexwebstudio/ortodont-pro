import type { Metadata } from "next";
import { CtaForm } from "@/components/home/CtaForm";
import { Guarantees } from "@/components/home/Guarantees";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { PriceTable } from "@/components/ui/PriceTable";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";
import { priceNote, prices } from "@/content/prices";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: `Цены на стоматологию, ${site.city}`,
  description: `Стоимость услуг клиники ${site.brand}: терапия, имплантация, брекет-системы, протезирование, хирургия и реставрация. Точную цену врач называет после осмотра.`,
  path: "/prices",
});

export default function PricesPage() {
  return (
    <>
      <PageHero
        title="Цены и *стоимость*"
        lead={priceNote}
        crumbs={[{ name: "Цены", path: "/prices" }]}
        image="/images/hero/instruments.jpg"
        imageAlt="Стоматологические инструменты на светлой поверхности"
      >
        <Button booking arrow>
          Записаться на диагностику
        </Button>
      </PageHero>

      <SectionCard>
        <nav aria-label="Разделы прайса" className="mb-10 flex flex-wrap gap-2">
          {prices.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="inline-flex h-10 items-center rounded-full border border-line px-4 text-[15px] font-medium transition-colors hover:border-ink">
              {section.title}
            </a>
          ))}
        </nav>

        <div className="space-y-12 lg:space-y-16">
          {prices.map((section) => (
            <Reveal key={section.id}>
              <section id={section.id} className="grid scroll-mt-28 gap-5 lg:grid-cols-12">
                <h2 className="t-h2 lg:col-span-4">{section.title}</h2>
                <div className="lg:col-span-8">
                  <PriceTable items={section.items} caption={`Цены: ${section.title}`} />
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      </SectionCard>

      <Guarantees />
      <CtaForm />
    </>
  );
}
