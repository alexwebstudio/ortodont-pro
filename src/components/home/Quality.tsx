import { quality } from "@/content/copy";
import { Button } from "@/components/ui/Button";
import { SectionHead } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";
import { Tooth3D } from "@/components/ui/Tooth3D";
import { cx } from "@/lib/utils";

// Расположение карточек вокруг зуба на десктопе.
const positions = ["lg:left-0 lg:top-[6%]", "lg:right-0 lg:top-0", "lg:left-[7%] lg:bottom-[2%]", "lg:right-[5%] lg:bottom-[9%]"];

export function Quality() {
  return (
    <SectionCard clip>
      <SectionHead eyebrow={quality.eyebrow} title={quality.title} lead={quality.lead} className="relative z-10 !mb-6 lg:!mb-0" />

      <div className="relative lg:-mt-6 lg:h-[640px]">
        <div className="rings hidden lg:block" aria-hidden="true" />
        {/* Мобильные: зуб в потоке между текстом и карточками, кольца — вокруг самого зуба. */}
        <div className="relative mx-auto w-[min(60vw,250px)] lg:static lg:w-auto">
          <div className="rings-mobile lg:hidden" aria-hidden="true" />
          <Tooth3D parallax={-30} sizes="(min-width: 1024px) 520px, 60vw" className="relative w-full lg:absolute lg:left-1/2 lg:top-1/2 lg:w-[500px] lg:-translate-x-1/2 lg:-translate-y-1/2" />
        </div>

        <Reveal group className="relative z-10 mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:static lg:mt-0">
          {quality.cards.map((card, index) => (
            <div key={card.title} data-reveal-item="" className={cx("lg:absolute lg:w-[300px]", positions[index])}>
              <article className="inner-card flex min-h-[150px] flex-col justify-between gap-6 p-5 shadow-[var(--shadow-soft)] lg:min-h-[176px] lg:p-6">
                <h3 className="text-[20px] font-semibold leading-tight">{card.title}</h3>
                <p className="text-[15px] leading-snug text-ink-muted">{card.text}</p>
              </article>
            </div>
          ))}
        </Reveal>
      </div>

      <Reveal className="relative z-10 mt-6 lg:mt-8">
        <Button booking arrow className="!min-h-[60px] w-full">
          {quality.cta}
        </Button>
      </Reveal>
    </SectionCard>
  );
}
