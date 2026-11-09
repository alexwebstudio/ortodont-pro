"use client";

import Image from "next/image";
import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { cx } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "./Icons";

type BeforeAfterSliderProps = {
  before: string;
  after: string;
  altBefore: string;
  altAfter: string;
  sizes: string;
  className?: string;
  label: string;
  priority?: boolean;
};

export function BeforeAfterSlider({ before, after, altBefore, altAfter, sizes, className, label, priority }: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const [touched, setTouched] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const moveTo = useCallback((clientX: number) => {
    const rect = frame.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    setTouched(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    moveTo(event.clientX);
  };
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragging.current) moveTo(event.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 4;
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      setPosition((value) => Math.max(0, value - step));
    }
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      setPosition((value) => Math.min(100, value + step));
    }
    if (event.key === "Home") setPosition(0);
    if (event.key === "End") setPosition(100);
    setTouched(true);
  };

  return (
    <div
      ref={frame}
      className={cx("ba", className)}
      data-touched={touched}
      style={{ "--pos": `${position}%` } as React.CSSProperties}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <Image src={before} alt={altBefore} fill sizes={sizes} priority={priority} className="object-cover" draggable={false} />
      <div className="ba-after">
        <Image src={after} alt={altAfter} fill sizes={sizes} priority={priority} className="object-cover" draggable={false} />
      </div>
      <span className="pill absolute left-3 top-3">До</span>
      <span className="pill absolute right-3 top-3">После</span>
      <div className="ba-handle">
        <div
          className="ba-knob"
          role="slider"
          tabIndex={0}
          aria-label={`Сравнение до и после: ${label}`}
          aria-orientation="horizontal"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          onKeyDown={onKeyDown}
        >
          <ArrowLeft width={13} height={13} />
          <ArrowRight width={13} height={13} />
        </div>
      </div>
      <span className="ba-hint" style={{ left: `${position}%` }}>
        Потяните
      </span>
    </div>
  );
}
