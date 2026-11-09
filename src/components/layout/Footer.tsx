import Link from "next/link";
import { footer } from "@/content/copy";
import { site } from "@/content/site";
import { ArrowUpRight, Instagram, LogoMark, WhatsApp } from "@/components/ui/Icons";

const socials = [
  { href: site.whatsapp, label: "WhatsApp", Icon: WhatsApp },
  { href: site.instagram, label: "Instagram", Icon: Instagram },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface" style={{ paddingInline: "var(--inline)" }}>
      <div>
        <div aria-hidden="true" className="footer-wordmark flex items-center justify-center gap-[0.03em] pt-10 lg:gap-[0.06em] lg:pt-14">
          <LogoMark className="-mr-[0.02em] h-[0.84em] w-[0.84em] flex-none" />
          <span>
            {site.wordmark[0]} <span className="text-accent">{site.wordmark[1]}</span>
          </span>
        </div>

        <div className="grid gap-10 border-t border-line py-10 lg:grid-cols-12 lg:py-12">
          <div className="lg:col-span-5">
            <p className="font-display text-[32px] uppercase leading-none lg:text-[40px]">{site.slogan}</p>
            <p className="mt-4 max-w-[40ch] text-ink-muted">{footer.description}</p>
          </div>

          <nav aria-label="Навигация в подвале" className="lg:col-span-3">
            <p className="t-eyebrow mb-4">Разделы</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 lg:grid-cols-1">
              {footer.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[16px] transition-colors hover:text-accent-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="t-eyebrow mb-4">Контакты</p>
            <address className="space-y-2.5 not-italic">
              <a href={site.phoneHref} className="t-mono block !text-[20px] font-medium transition-colors hover:text-accent-ink">
                {site.phone}
              </a>
              <p className="text-ink-muted">
                {site.city}, {site.address}
              </p>
              {site.hours && <p className="text-ink-muted">{site.hours}</p>}
            </address>
            <div className="mt-5 flex gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-2 transition-colors hover:bg-accent hover:text-on-accent">
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-line py-5 text-[13px] text-ink-muted">
          <div className="grid items-center gap-2 text-center md:grid-cols-3">
            <p className="md:text-left">© 2026 {site.brand}</p>
            <Link href="/privacy" className="justify-self-center transition-colors hover:text-accent-ink">
              Политика конфиденциальности
            </Link>
            <p className="md:text-right">
              {site.developer.label} —{" "}
              <a href={site.developer.href} target="_blank" rel="noopener" className="group inline-flex items-center gap-1 font-medium text-ink transition-colors hover:text-accent-ink">
                {site.developer.name}
                <ArrowUpRight width={13} height={13} className="transition-transform duration-500 group-hover:rotate-45" />
              </a>
            </p>
          </div>
          {(site.legal || site.license) && <p className="mt-3 text-center">{[site.legal, site.license].filter(Boolean).join(" · ")}</p>}
        </div>
      </div>
    </footer>
  );
}
