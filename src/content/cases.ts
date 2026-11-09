// Работы публикуются только с реальными фото конкретного пациента, снятыми с его согласия.
// Пока массив пуст, блока «Работы», страницы /cases и пункта в меню на сайте нет.
// Как добавить работу: положите снимки в public/images/cases/ и опишите случай в cases.
// Выдумывать результаты и подставлять стоковые улыбки нельзя.

export type CaseCategory = "implantation" | "orthodontics" | "esthetics" | "prosthetics";

export type Case = {
  slug: string;
  index: string;
  category: CaseCategory;
  serviceSlug: string;
  serviceTitle: string;
  title: string;
  duration: string;
  visits: string;
  doctorSlug: string;
  warranty: string;
  task: string[];
  plan: string[];
  before: string;
  after: string;
  altBefore: string;
  altAfter: string;
};

export const cases: Case[] = [];

export const caseFilters: { id: CaseCategory | "all"; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "implantation", label: "Имплантация" },
  { id: "orthodontics", label: "Ортодонтия" },
  { id: "esthetics", label: "Эстетика" },
  { id: "prosthetics", label: "Протезирование" },
];

// Для вкладки «Все»: услуги чередуются, а не идут блоками.
export const casesMixed = [...cases].sort((a, b) => {
  const order = (item: Case) => cases.filter((entry) => entry.category === item.category).indexOf(item);
  return order(a) - order(b);
});

export function getCase(slug: string) {
  return cases.find((item) => item.slug === slug);
}

export const hasCases = cases.length > 0;

// На главной по одному кейсу на услугу.
export const homeCases = caseFilters.slice(1).flatMap((filter) => cases.find((item) => item.category === filter.id) ?? []);
