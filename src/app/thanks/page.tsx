import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { AnimatedTitle } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Tooth3D } from "@/components/ui/Tooth3D";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Заявка принята",
  description: `Спасибо за заявку в клинику ${site.brand}. Администратор перезвонит и подберёт время визита.`,
  path: "/thanks",
  noindex: true,
});

export default function ThanksPage() {
  return (
    <section data-tone="surface" className="section-card page-top flex min-h-svh flex-col items-center justify-center text-center">
      <Tooth3D sizes="220px" className="relative mb-6 w-[160px] lg:w-[220px]" />
      <AnimatedTitle as="h1" text="Заявка *принята*" />
      <Reveal delay={0.15} className="t-lead mt-5 max-w-[42ch] text-ink-muted">
        <p>Администратор перезвонит и подберёт удобное время. Если вопрос срочный, позвоните нам сами.</p>
      </Reveal>
      <Reveal delay={0.2} className="mt-7 flex flex-wrap justify-center gap-3">
        <Button href="/" arrow>
          На главную
        </Button>
        <Button href={site.phoneHref} variant="secondary">
          {site.phone}
        </Button>
      </Reveal>
    </section>
  );
}
