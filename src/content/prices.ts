// Прайс клиника пока не передала: цены не выдумываем, у позиций без price — «цена после консультации».
// ЗАМЕНИТЬ: проставить price (в тенге) по прайсу клиники — сайт сам покажет «от X ₸».

export type PriceItem = { name: string; includes: string; price?: number };
export type PriceSection = { id: string; title: string; items: PriceItem[] };

export const priceNote = "Точную стоимость врач назовёт после осмотра — до начала лечения.";

export const prices: PriceSection[] = [
  {
    id: "diagnostics",
    title: "Консультация",
    items: [
      { name: "Консультация врача", includes: "осмотр, план лечения" },
      { name: "Консультация ортодонта", includes: "оценка прикуса, план лечения брекетами" },
    ],
  },
  {
    id: "therapy",
    title: "Терапия",
    items: [
      { name: "Лечение кариеса", includes: "анестезия, пломба" },
      { name: "Лечение пульпита", includes: "лечение каналов, пломба" },
    ],
  },
  {
    id: "implantation",
    title: "Имплантация",
    items: [
      { name: "Установка импланта", includes: "хирургический этап" },
      { name: "Коронка на импланте", includes: "протезирование на импланте" },
    ],
  },
  {
    id: "orthodontics",
    title: "Брекет-системы",
    items: [
      { name: "Брекет-система", includes: "установка, план лечения" },
      { name: "Коррекция", includes: "контрольный визит" },
    ],
  },
  {
    id: "prosthetics",
    title: "Протезирование",
    items: [
      { name: "Коронка", includes: "примерка, фиксация" },
      { name: "Мостовидный протез", includes: "за единицу" },
      { name: "Съёмный протез", includes: "одна челюсть" },
    ],
  },
  {
    id: "surgery",
    title: "Хирургия",
    items: [
      { name: "Удаление зуба", includes: "анестезия, рекомендации" },
      { name: "Сложное удаление", includes: "анестезия, рекомендации" },
    ],
  },
  {
    id: "restoration",
    title: "Реставрация",
    items: [
      { name: "Художественная реставрация", includes: "восстановление формы и цвета" },
      { name: "Восстановление скола", includes: "один зуб" },
    ],
  },
];

export function priceSection(id: string) {
  const section = prices.find((item) => item.id === id);
  if (!section) throw new Error(`Нет раздела цен: ${id}`);
  return section;
}

export function minPrice(id: string): number | undefined {
  const values = priceSection(id)
    .items.map((item) => item.price)
    .filter((value): value is number => typeof value === "number");
  return values.length ? Math.min(...values) : undefined;
}
