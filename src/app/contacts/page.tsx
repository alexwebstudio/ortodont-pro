import type { Metadata } from "next";
import { CtaForm } from "@/components/home/CtaForm";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Instagram, Phone, WhatsApp } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";
import { Tooth3D } from "@/components/ui/Tooth3D";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: `Контакты клиники, ${site.city}`,
  description: `Адрес, телефон и часы работы клиники ${site.brand}. Запишитесь на приём онлайн или напишите в WhatsApp.`,
  path: "/contacts",
});

const channels = [
  { label: "Позвонить", value: site.phone, href: site.phoneHref, Icon: Phone },
  { label: "WhatsApp", value: "Написать в WhatsApp", href: site.whatsapp, Icon: WhatsApp },
  { label: "Instagram", value: "Открыть профиль", href: site.instagram, Icon: Instagram },
];

export default function ContactsPage() {
  const query = encodeURIComponent(`${site.city}, ${site.address}`);

  return (
    <>
      <PageHero
        title="Контакты и *запись*"
        lead="Позвоните, напишите в мессенджер или оставьте заявку на сайте."
        crumbs={[{ name: "Контакты", path: "/contacts" }]}
        image="/images/clinic/lobby-wide.jpg"
        imageAlt="Холл клиники Ortodont Pro"
      >
        <Button href="#booking" arrow>
          Оставить заявку
        </Button>
      </PageHero>

      <SectionCard>
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="t-h2 mb-6">Где мы</h2>
            <address className="not-italic">
              <dl>
                <div className="hair-row py-3.5">
                  <dt className="text-[14px] text-ink-muted">Адрес</dt>
                  <dd className="text-[18px] font-medium">
                    {site.city}, {site.address}
                  </dd>
                </div>
                <div className="hair-row py-3.5">
                  <dt className="text-[14px] text-ink-muted">Телефон и WhatsApp</dt>
                  <dd className="t-mono !text-[18px] font-medium">
                    <a href={site.phoneHref} className="transition-colors hover:text-accent-ink">
                      {site.phone}
                    </a>
                  </dd>
                </div>
                {site.hours && (
                  <div className="hair-row py-3.5">
                    <dt className="text-[14px] text-ink-muted">Часы работы</dt>
                    <dd className="text-[18px] font-medium">{site.hours}</dd>
                  </div>
                )}
                <div className="hair-row py-3.5">
                  <dt className="text-[14px] text-ink-muted">Как добраться</dt>
                  <dd>{site.directions}</dd>
                </div>
              </dl>
            </address>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {channels.map(({ label, value, href, Icon }) => (
                <li key={label}>
                  <a href={href} target={href.startsWith("tel:") ? undefined : "_blank"} rel="noopener noreferrer" className="inner-card flex items-center gap-3 p-3.5 transition-colors hover:bg-tint">
                    <Icon className="flex-none text-accent" />
                    <span className="min-w-0">
                      <span className="block text-[13px] text-ink-muted">{label}</span>
                      <span className="block truncate text-[15px] font-medium">{value}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            {site.mapEmbed ? (
              <iframe title={`Карта: ${site.brand}`} src={site.mapEmbed} loading="lazy" className="aspect-[4/3] h-full min-h-[420px] w-full rounded-[22px] border-0" />
            ) : (
              <div className="on-accent relative flex h-full min-h-[420px] flex-col justify-between overflow-hidden rounded-[18px] p-6 text-on-accent lg:rounded-[22px] lg:p-10" style={{ background: "var(--bright)" }}>
                <div>
                  <p className="font-display text-[clamp(34px,4vw,60px)] uppercase leading-none">
                    {site.city}, {site.address}
                  </p>
                  <p className="mt-3 max-w-[38ch] text-on-accent-muted">Откройте маршрут в удобном приложении: карточка клиники находится по запросу «Ortodont Pro».</p>
                </div>
                <div className="relative z-10 flex flex-wrap gap-2">
                  <Button href={site.map2gis} external variant="light" arrow>
                    Открыть в 2ГИС
                  </Button>
                  <Button href={`https://yandex.kz/maps/?text=${query}`} external variant="outline-light">
                    Яндекс Карты
                  </Button>
                </div>
                <Tooth3D sizes="300px" className="absolute -bottom-10 -right-6 w-[220px] opacity-90 lg:w-[300px]" />
              </div>
            )}
          </Reveal>
        </div>
      </SectionCard>

      <CtaForm />
    </>
  );
}
