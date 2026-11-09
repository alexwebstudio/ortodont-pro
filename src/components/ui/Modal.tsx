"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useLockBody } from "@/hooks/useLockBody";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  children: ReactNode;
};

export function Modal({ open, onClose, labelledBy, children }: ModalProps) {
  const panel = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  useLockBody(open);

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement | null;
    panel.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !panel.current) return;
      const focusable = panel.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), input:not([tabindex='-1']), select, textarea");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      returnFocus.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="menu-overlay fixed inset-0 z-[70] flex items-end justify-center bg-ink/55 p-3 backdrop-blur-sm sm:items-center" onClick={onClose}>
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        data-lenis-prevent=""
        onClick={(event) => event.stopPropagation()}
        className="modal-panel relative max-h-[calc(100dvh-24px)] w-full max-w-[560px] overflow-y-auto rounded-[24px] bg-surface p-6 outline-none lg:rounded-[32px] lg:p-9"
      >
        <button type="button" onClick={onClose} aria-label="Закрыть" className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-surface-2">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            <path d="M1.5 1.5l11 11M12.5 1.5l-11 11" />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
