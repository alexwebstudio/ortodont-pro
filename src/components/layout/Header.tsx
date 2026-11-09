"use client";

import { useCallback, useEffect, useState } from "react";
import { site } from "@/content/site";
import { useLockBody } from "@/hooks/useLockBody";
import { useScrolled } from "@/hooks/useScrolled";
import { Button } from "@/components/ui/Button";
import { Phone } from "@/components/ui/Icons";
import { Logo } from "./Logo";
import { MenuOverlay } from "./MenuOverlay";

const MENU_ID = "site-menu";

export function Header() {
  const scrolled = useScrolled(24);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useLockBody(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      {/* Оверлей рядом с хедером, а не внутри: backdrop-filter ограничил бы его размером панели. */}
      {open && <MenuOverlay id={MENU_ID} onClose={close} />}
      <header className="site-header">
        <div className="header-shell" data-scrolled={scrolled} data-open={open}>
          <Logo onClick={close} />

          <div className="flex items-center gap-2 sm:gap-3">
            <a href={site.phoneHref} className="t-mono hidden items-center gap-2 px-2 !text-[14px] font-medium lg:inline-flex">
              <Phone className="text-accent" /> {site.phone}
            </a>
            <Button booking arrow className="hidden !min-h-12 !px-5 sm:inline-flex">
              Записаться
            </Button>
            <a href={site.phoneHref} aria-label={`Позвонить: ${site.phone}`} className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 lg:hidden">
              <Phone />
            </a>
            <button type="button" className="burger" aria-label={open ? "Закрыть меню" : "Открыть меню"} aria-expanded={open} aria-controls={MENU_ID} onClick={() => setOpen((value) => !value)}>
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
