import type { Metadata } from "next";
import { CtaForm } from "@/components/home/CtaForm";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { DoctorCard } from "@/components/ui/DoctorCard";
import { SectionHead } from "@/components/ui/Heading";
import { Mono } from "@/components/ui/Mono";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";
import { doctors } from "@/content/doctors";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: `Врачи клиники, ${site.city}`,
  description: `Врачи клиники ${site.brand}: ортодонт, терапевт, хирург и ортопед. Выберите врача и запишитесь на приём онлайн.`,
  path: "/doctors",
});

export default function DoctorsPage() {
  return (
    <>
      <PageHero title="Команда, которой *доверяют*" lead={`Три врача, рейтинг ${site.stats.rating.toFixed(1)} и ${site.stats.reviews} отзывов в 2ГИС. Выберите врача и запишитесь на приём.`} crumbs={[{ name: "Врачи", path: "/doctors" }]}>
        <Button booking arrow variant="light">
          Записаться к врачу
        </Button>
      </PageHero>

      <SectionCard>
        <SectionHead eyebrow="Врачи" title="Найдите *своего* врача" lead="Откройте карточку: специализация, стаж и услуги." />
        <Reveal group className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-8">
          {doctors.map((doctor) => (
            <div key={doctor.slug} data-reveal-item="">
              <DoctorCard doctor={doctor} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw" />
              <p className="mt-3 text-[15px] leading-snug text-ink-muted">{doctor.specialization}</p>
              {doctor.experience && <Mono className="mt-1 block !text-[13px]">стаж {doctor.experience}</Mono>}
            </div>
          ))}
        </Reveal>
      </SectionCard>

      <CtaForm />
    </>
  );
}
