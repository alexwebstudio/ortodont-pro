"use client";

import { useCallback, useEffect, useState } from "react";
import { cta } from "@/content/copy";
import { plainText } from "@/lib/splitWords";
import { BookingForm } from "@/components/ui/BookingForm";
import { Modal } from "@/components/ui/Modal";

const TITLE_ID = "booking-title";

// Любая ссылка с data-booking открывает форму в модалке. Без JS это обычная ссылка на контакты.
export function BookingModal() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target?.closest("[data-booking]") || event.metaKey || event.ctrlKey) return;
      event.preventDefault();
      setOpen(true);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return (
    <Modal open={open} onClose={close} labelledBy={TITLE_ID}>
      <p id={TITLE_ID} className="t-h2 mb-2 !text-[44px] pr-12">
        {plainText(cta.title)}
      </p>
      <p className="mb-6 text-ink-muted">{cta.subtitle}</p>
      <BookingForm onSuccess={close} />
    </Modal>
  );
}
