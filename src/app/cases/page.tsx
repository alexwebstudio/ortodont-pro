import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaForm } from "@/components/home/CtaForm";
import { PageHero } from "@/components/layout/PageHero";
import { CasesGrid } from "@/components/ui/CasesGrid";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";
import { hasCases } from "@/content/cases";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: `Работы до и после, ${site.city}`,
  description: `Работы клиники ${site.brand}: имплантация, ортодонтия, эстетика и протезирование. Сравните результат и посмотрите план лечения.`,
  path: "/cases",
});

export default function CasesPage() {
  // Нет реальных фото — нет страницы.
  if (!hasCases) notFound();

  return (
    <>
      <PageHero
        title="Работы до и *после*"
        lead="Выберите услугу и сравните результат шторкой. В кейсе открыт план лечения."
        crumbs={[{ name: "Работы", path: "/cases" }]}
        image="/images/hero/care.jpg"
        imageAlt="Два врача в защитной одежде проводят лечение в кабинете"
        objectPosition="50% 30%"
      />
      <SectionCard>
        <Reveal>
          <CasesGrid />
        </Reveal>
      </SectionCard>
      <CtaForm />
    </>
  );
}
