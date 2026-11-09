import Link from "next/link";
import type { ReactNode } from "react";
import { cx } from "@/lib/utils";
import { ArrowRight } from "./Icons";

type Variant = "primary" | "secondary" | "light" | "outline-light";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  arrow?: boolean;
  /** Открывает модалку записи; без JS ведёт на форму в контактах. */
  booking?: boolean;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  external?: boolean;
  onClick?: () => void;
};

export function Button({ children, href, variant = "primary", arrow, booking, className, type = "button", disabled, external, onClick }: ButtonProps) {
  const shared = { className: cx("btn", className), "data-variant": variant };
  const content = (
    <>
      {children}
      {arrow && <ArrowRight />}
    </>
  );

  if (booking) {
    return (
      <Link href="/contacts#booking" data-booking="" {...shared}>
        {content}
      </Link>
    );
  }
  if (href && external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...shared}>
        {content}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} {...shared}>
        {content}
      </Link>
    );
  }
  return (
    <button type={type} disabled={disabled} onClick={onClick} {...shared}>
      {content}
    </button>
  );
}
