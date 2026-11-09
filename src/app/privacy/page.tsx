import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { DemoNote } from "@/components/ui/DemoNote";
import { AnimatedTitle } from "@/components/ui/Heading";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Политика конфиденциальности",
  description: `Как клиника ${site.brand} обрабатывает персональные данные, которые вы оставляете на сайте.`,
  path: "/privacy",
});

const sections = [
  {
    title: "Какие данные мы получаем",
    text: "Имя, телефон, выбранную услугу и удобное время — только то, что вы указали в форме записи.",
  },
  {
    title: "Зачем они нужны",
    text: "Чтобы связаться с вами, подтвердить запись на приём и ответить на вопрос. Мы не используем эти данные для рассылок без вашего согласия.",
  },
  {
    title: "Как мы их храним",
    text: "Заявка передаётся администратору клиники по защищённому каналу. Доступ есть только у сотрудников, которые работают с записью пациентов.",
  },
  {
    title: "Ваши права",
    text: `Вы можете запросить, уточнить или удалить свои данные и отозвать согласие. Позвоните или напишите в WhatsApp: ${site.phone}.`,
  },
];

export default function PrivacyPage() {
  return (
    <section data-tone="surface" className="section-card page-top">
      <Breadcrumbs items={[{ name: "Политика конфиденциальности", path: "/privacy" }]} />
      <div className="mt-8 max-w-[860px]">
        <AnimatedTitle as="h1" text="Политика *конфиденциальности*" />
        <DemoNote className="mt-5">Демо: текст-заготовка. Перед запуском его должен согласовать юрист клиники.</DemoNote>
        <div className="mt-10">
          {sections.map((section) => (
            <div key={section.title} className="hair-row py-6">
              <h2 className="t-h3 mb-2">{section.title}</h2>
              <p className="text-ink-muted">{section.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-[14px] text-ink-muted">Оператор данных: {site.legal || `клиника ${site.brand}, ${site.city}, ${site.address}`}.</p>
      </div>
    </section>
  );
}
