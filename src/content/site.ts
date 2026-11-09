// ЕДИНАЯ ТОЧКА ПРАВКИ ДАННЫХ КЛИНИКИ Ortodont Pro (Актобе).
// Реальные данные: название, город, адрес, телефон, рейтинг и число отзывов (2ГИС).
// Пустые строки — данных пока нет, блоки с ними на сайте скрыты.

export const site = {
  isDemo: false,

  brand: "Ortodont Pro",
  /** Вордмарк: первая часть тёмная, вторая — оранжевая, как в логотипе. */
  wordmark: ["Ortodont", "Pro"] as const,
  descriptor: "Ortodont Pro · стоматология",
  slogan: "Ровная и здоровая улыбка",
  domain: "https://ortodont-pro.vercel.app", // ЗАМЕНИТЬ на домен клиники, когда появится
  city: "Актобе",

  phone: "+7 701 770 53 22",
  phoneHref: "tel:+77017705322",
  whatsapp: "https://wa.me/77017705322",
  instagram: "https://instagram.com/ortodontpro",
  instagramHandle: "@ortodontpro",
  // Актуальное с видеоотзывами в Instagram
  instagramReviews: "https://www.instagram.com/stories/highlights/18094267612315236/",
  // ЗАМЕНИТЬ: ссылка на актуальное с вопросами-ответами в Instagram.
  instagramFaq: "https://instagram.com/ortodontpro",
  email: "", // нет данных

  address: "12-й микрорайон, 49",
  addressRegion: "Актюбинская область",
  country: "KZ",
  hours: "", // ЗАМЕНИТЬ: часы работы клиники
  hoursSchema: [] as string[],
  directions: "Удобнее всего проложить маршрут в 2ГИС: по запросу «Ortodont Pro» карточка клиники находится сразу.",
  mapEmbed: "", // ЗАМЕНИТЬ: ссылка на iframe 2ГИС
  map2gis: "https://2gis.kz/aktobe/search/Ortodont%20Pro",

  developer: { label: "Разработка сайта", name: "AlexWebStudio", href: "https://alexwebstudio.ru" },

  legal: "", // ЗАМЕНИТЬ: ТОО / ИП, БИН
  license: "", // ЗАМЕНИТЬ: номер лицензии

  // Реальные показатели из 2ГИС на 09.11.2026
  stats: {
    rating: 5.0,
    reviews: 130,
    doctors: 3,
    maxExperience: 10,
  },
} as const;

export const demoNote = "";

export function formatPrice(value: number) {
  return `${value.toLocaleString("ru-RU").replace(/ |\s/g, " ")} ₸`;
}

/** Цены клиника пока не передала: вместо выдуманных цифр — «по консультации». */
export function formatPriceFrom(value?: number) {
  return value ? `от ${formatPrice(value)}` : "цена после консультации";
}

export function formatCount(value: number) {
  return value.toLocaleString("ru-RU").replace(/ |\s/g, " ");
}
