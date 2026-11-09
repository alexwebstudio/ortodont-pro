import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { AnimatedTitle } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Tooth3D } from "@/components/ui/Tooth3D";

export const metadata: Metadata = {
  title: "Страница не найдена",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section data-tone="surface" className="section-card page-top flex min-h-svh flex-col items-center justify-center text-center">
      <div aria-hidden="true" className="t-display mb-2 flex items-center text-[clamp(120px,24vw,320px)] leading-[0.82]">
        4
        <Tooth3D sizes="220px" className="relative w-[0.62em]" />4
      </div>
      <AnimatedTitle as="h1" text="Такой страницы *нет*" />
      <Reveal delay={0.15} className="t-lead mt-5 max-w-[40ch] text-ink-muted">
        <p>Возможно, ссылка устарела. Начните с главной или посмотрите услуги.</p>
      </Reveal>
      <Reveal delay={0.2} className="mt-7 flex flex-wrap justify-center gap-3">
        <Button href="/" arrow>
          На главную
        </Button>
        <Button href="/services" variant="secondary">
          Все услуги
        </Button>
      </Reveal>
    </section>
  );
}
