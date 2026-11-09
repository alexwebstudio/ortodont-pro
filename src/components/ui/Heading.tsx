import Link from "next/link";
import { Fragment, type CSSProperties, type ReactNode } from "react";
import { splitWords } from "@/lib/splitWords";
import { cx } from "@/lib/utils";
import { ArrowRight } from "./Icons";

type TitleProps = {
  text: string;
  as?: "h1" | "h2";
  className?: string;
  id?: string;
};

// Заголовок рисуется дважды: цельный sr-only для SEO и разбитый на буквы для Blur Reveal.
export function AnimatedTitle({ text, as: Tag = "h2", className, id }: TitleProps) {
  const { lines, plain } = splitWords(text);
  const first = Tag === "h1";
  let index = 0;

  const chars = (value: string) =>
    Array.from(value).map((char, position) => {
      index += 1;
      return (
        <span key={position} className={first ? "char char-css" : "char"} style={first ? ({ "--i": index } as CSSProperties) : undefined}>
          {char}
        </span>
      );
    });

  return (
    <>
      <Tag id={id} className="sr-only">
        {plain}
      </Tag>
      <div aria-hidden="true" data-split={first ? undefined : ""} className={cx(first ? "t-h1" : "t-h2", className)}>
        {lines.map((line, lineIndex) => (
          <span key={lineIndex} className="block">
            {line.map((word, wordIndex) => (
              <Fragment key={wordIndex}>
                <span className="word">
                  {word.accent ? <span className="accent-word">{chars(word.text)}</span> : chars(word.text)}
                  {chars(word.trail)}
                </span>{" "}
              </Fragment>
            ))}
          </span>
        ))}
      </div>
    </>
  );
}

type SectionHeadProps = {
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  link?: { label: string; href: string };
  action?: ReactNode;
  className?: string;
  id?: string;
};

export function SectionHead({ eyebrow, title, lead, link, action, className, id }: SectionHeadProps) {
  return (
    <header className={cx("mb-9 grid gap-6 lg:mb-14 lg:grid-cols-12 lg:items-end", className)}>
      <div className="lg:col-span-10">
        <p className="t-eyebrow mb-4">{eyebrow}</p>
        <AnimatedTitle text={title} id={id} />
        {lead && (
          <p data-reveal="" data-blur="" data-delay="0.15" className="t-lead mt-5 max-w-[46ch] opacity-85">
            {lead}
          </p>
        )}
      </div>
      {(link || action) && (
        <div data-reveal="" data-delay="0.15" className="lg:col-span-2 lg:justify-self-end lg:whitespace-nowrap">
          {action}
          {link && (
            <Link href={link.href} className="text-link">
              {link.label} <ArrowRight />
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
