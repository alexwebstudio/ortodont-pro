// Реальные врачи клиники Ortodont Pro — данные и фото из Instagram-хайлайтов клиники (@ortodontpro).
// Ничего не дописывать: образование и сертификаты добавить, когда их передаст клиника.

export type Doctor = {
  slug: string;
  name: string;
  headline: string;
  role: string;
  specialization: string;
  experience?: string;
  about: string;
  /** Чем занимается врач — только то, что клиника публикует сама. */
  focus: string[];
  serviceSlugs: string[];
  image: string;
  imageAlt: string;
};

export const doctors: Doctor[] = [
  {
    slug: "erlan-turlybaevich",
    name: "Ерлан Турлыбаевич",
    headline: "Ерлан *Турлыбаевич*",
    role: "Врач-терапевт, хирург",
    specialization: "Терапия, хирургия, сложная реставрация, удаление зубов",
    experience: "10 лет",
    about: "Универсальный специалист: лечит, восстанавливает и удаляет. Проводит сложную реставрацию и хирургические процедуры — всё для здоровой и красивой улыбки.",
    focus: ["Лечение зубов", "Сложная реставрация", "Хирургические процедуры и удаление зубов"],
    serviceSlugs: ["therapy", "surgery", "restoration"],
    image: "/images/doctors/erlan.jpg",
    imageAlt: "Ерлан Турлыбаевич, врач-терапевт и хирург клиники Ortodont Pro",
  },
  {
    slug: "aidana-erlanovna",
    name: "Айдана Ерлановна",
    headline: "Айдана *Ерлановна*",
    role: "Врач-ортодонт, терапевт",
    specialization: "Брекет-системы, исправление прикуса, реставрация зубов",
    experience: "5 лет",
    about: "Исправляет прикус и выравнивает зубы с помощью брекет-систем. Специализируется на реставрации зубов: восстанавливает их форму, цвет и структуру.",
    focus: ["Исправление прикуса", "Выравнивание зубов брекет-системами", "Реставрация: форма, цвет и структура зуба"],
    serviceSlugs: ["orthodontics", "restoration", "therapy"],
    image: "/images/doctors/aidana.jpg",
    imageAlt: "Айдана Ерлановна, врач-ортодонт и терапевт клиники Ortodont Pro",
  },
  {
    slug: "zhenisbek-magauiyanovich",
    name: "Женисбек Магауиянович",
    headline: "Женисбек *Магауиянович*",
    role: "Врач-ортопед",
    specialization: "Протезирование зубов",
    about: "Специалист по протезированию филиала клиники Ortodont Pro: восстанавливает утраченные зубы, чтобы вернуть красивую улыбку и удобство при жевании.",
    focus: ["Протезирование зубов", "Восстановление эстетики улыбки"],
    serviceSlugs: ["prosthetics"],
    image: "/images/doctors/zhenisbek.jpg",
    imageAlt: "Женисбек Магауиянович, врач-ортопед клиники Ortodont Pro",
  },
];

export function getDoctor(slug: string) {
  return doctors.find((item) => item.slug === slug);
}
