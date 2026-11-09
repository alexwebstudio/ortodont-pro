"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { mainNav } from "@/content/nav";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight, Instagram, WhatsApp } from "@/components/ui/Icons";

const messengers = [
  { href: site.whatsapp, label: "WhatsApp", Icon: WhatsApp },
  { href: site.instagram, label: "Instagram", Icon: Instagram },
];

const stagger = (index: number) => ({ "--i": index }) as CSSProperties;

export function MenuOverlay({ id, onClose }: { id: string; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <div id={id} data-lenis-prevent="" className="menu-overlay fixed inset-0 z-40 flex flex-col overflow-y-auto pb-6 pt-[104px] lg:pb-8 lg:pt-[128px]" style={{ paddingInline: "var(--inline)" }}>
      <div className="grid flex-1 gap-10 lg:grid-cols-12">
        <nav aria-label="Основное меню" className="lg:col-span-7">
          <ul>
            {mainNav.map((item, index) => (
              <li key={item.href} data-stagger="" style={stagger(index)} className="menu-item">
                <Link href={item.href} onClick={onClose} className="menu-link group" aria-current={pathname.startsWith(item.href) ? "page" : undefined}>
                  <span>{item.label}</span>
                  <span className="menu-num">0{index + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Услуги" className="hidden lg:col-span-5 lg:block">
          <p className="t-eyebrow mb-4" data-stagger="" style={stagger(2)}>
            Услуги
          </p>
          <ul>
            {services.map((service, index) => (
              <li key={service.slug} data-stagger="" style={stagger(index + 3)} className="hair-row">
                <Link href={`/services/${service.slug}`} onClick={onClose} className="group flex items-center justify-between gap-4 py-3 text-[18px] font-medium transition-colors hover:text-accent-ink">
                  {service.title}
                  <ArrowUpRight className="transition-transform duration-500 group-hover:rotate-45" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4" data-stagger="" style={stagger(7)}>
        <a href={site.phoneHref} className="t-mono !text-[24px] font-medium lg:!text-[20px]">
          {site.phone}
        </a>
        <div className="flex flex-wrap items-center gap-2">
          {messengers.map(({ href, label, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-2 transition-colors hover:bg-accent hover:text-on-accent lg:h-12 lg:w-12">
              <Icon />
            </a>
          ))}
          <span onClick={onClose} className="w-full sm:ml-2 sm:w-auto">
            <Button booking arrow className="!min-h-[64px] w-full !text-[18px] sm:w-auto lg:!min-h-[52px] lg:!text-[15px]">
              Записаться
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
}
