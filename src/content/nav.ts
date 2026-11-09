import { hasCases } from "./cases";

export const mainNav = [
  { label: "Услуги", href: "/services" },
  { label: "Врачи", href: "/doctors" },
  { label: "Цены", href: "/prices" },
  ...(hasCases ? [{ label: "Работы", href: "/cases" }] : []),
  { label: "О клинике", href: "/about" },
  { label: "Контакты", href: "/contacts" },
];
