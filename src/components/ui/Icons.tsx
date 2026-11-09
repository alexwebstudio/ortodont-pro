import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function ArrowRight(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" {...base} {...props}>
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

export function ArrowLeft(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" {...base} {...props}>
      <path d="M13.5 8h-11M7 3.5 2.5 8 7 12.5" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" {...base} {...props}>
      <path d="M4 12 12 4M5.5 4H12v6.5" />
    </svg>
  );
}

export function Chevron(props: IconProps) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" {...base} {...props}>
      <path d="m2.5 4.5 3.5 3.5 3.5-3.5" />
    </svg>
  );
}

export function Star(props: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="m12 2.6 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.5l-5.9 3.1 1.2-6.5L2.5 9.5l6.6-.9z" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" {...base} {...props}>
      <path d="m3 8.5 3.2 3.2L13 4.8" />
    </svg>
  );
}

export function Telegram(props: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <path d="M21 4.5 3 11.2l5.6 2 2.2 6.3 3.2-4 5 3.5z" />
      <path d="m8.6 13.2 7.9-5.4-5.7 7" />
    </svg>
  );
}

export function WhatsApp(props: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <path d="M3.5 20.5 5 16a8.5 8.5 0 1 1 3.1 3.1z" />
      <path d="M9 8.5c-.4 2.7 3.3 6.4 6 6l.8-1.5-2-1-.9.8c-.8-.3-1.7-1.2-2-2l.8-.9-1-2z" />
    </svg>
  );
}

export function Instagram(props: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17 7h.01" />
    </svg>
  );
}

export function Play(props: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M8 5.2v13.6a.8.8 0 0 0 1.2.7l10.6-6.8a.8.8 0 0 0 0-1.4L9.2 4.5A.8.8 0 0 0 8 5.2z" />
    </svg>
  );
}

export function Heart(props: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" {...base} strokeWidth={1.8} {...props}>
      <path d="M12 20s-7.5-4.4-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.6-7.5 10-7.5 10z" />
    </svg>
  );
}

export function Comment(props: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" {...base} strokeWidth={1.8} {...props}>
      <path d="M20 11.5a8 8 0 0 1-11.8 7L4 19.8l1.3-4A8 8 0 1 1 20 11.5z" />
    </svg>
  );
}

export function Send(props: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" {...base} strokeWidth={1.8} {...props}>
      <path d="M21 3.5 10.5 13.8M21 3.5l-6.6 17-3.9-6.7-6.7-3.9z" />
    </svg>
  );
}

export function Phone(props: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <path d="M5 4h3.5l1.5 4.5-2 1.5a12 12 0 0 0 6 6l1.5-2 4.5 1.5V19a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  );
}

/** Знак Ortodont Pro: серый контур зуба и оранжевая брекет-дуга со стрелкой.
 *  Части помечены классами logo-*: по ним прелоадер рисует знак по шагам. */
export function LogoMark(props: IconProps) {
  return (
    <svg width="40" height="40" viewBox="0 0 200 200" aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path
        className="logo-tooth"
        pathLength={1}
        stroke="#77716b"
        strokeWidth="6"
        d="M100 34C88 20 72 13 58 14 40 15 30 30 31 50c1 18 9 30 13 46 4 18 6 54 11 76 3 14 9 18 15 14 7-5 8-26 13-40 4-12 10-16 17-16s13 4 17 16c5 14 6 35 13 40 6 4 12 0 15-14 5-22 7-58 11-76 4-16 12-28 13-46 1-20-9-35-27-36-14-1-30 6-42 20z"
      />
      <path className="logo-arc" pathLength={1} stroke="#f5821f" strokeWidth="15" d="M104 182C70 190 28 176 21 147c-5-23 13-38 49-42 34-4 70-6 100-8" />
      <g className="logo-ticks" stroke="#fff" strokeWidth="4" strokeLinecap="butt">
        <path d="M56 94v22M68 93v22" />
      </g>
      <path className="logo-head" fill="#f5821f" d="M160 76 198 96 160 116 168 96z" />
    </svg>
  );
}
