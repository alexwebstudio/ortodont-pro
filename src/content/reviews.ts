// Видеоотзывы пациентов из Instagram @ortodontpro (актуальное «Отзывы»).
// Обложки — кадры из самих отзывов, клик ведёт в Instagram.

export type VideoReview = {
  title: string;
  caption: string;
  cover: string;
  coverAlt: string;
  href: string;
};

const highlight = "https://www.instagram.com/stories/highlights/18094267612315236/";

export const videoReviews: VideoReview[] = [
  {
    title: "Видеоотзыв пациента",
    caption: "Смотреть отзыв в Instagram",
    cover: "/images/reviews/review-1.jpg",
    coverAlt: "Кадр из видеоотзыва пациентки в кабинете Ortodont Pro",
    href: highlight,
  },
  {
    title: "Видеоотзыв пациента",
    caption: "Смотреть отзыв в Instagram",
    cover: "/images/reviews/review-2.jpg",
    coverAlt: "Кадр из видеоотзыва пациентки на фоне росписи в клинике",
    href: highlight,
  },
  {
    title: "Видеоотзыв пациента",
    caption: "Смотреть отзыв в Instagram",
    cover: "/images/reviews/review-3.jpg",
    coverAlt: "Кадр из видеоотзыва пациента в клинике Ortodont Pro",
    href: highlight,
  },
  {
    title: "Видеоотзыв пациента",
    caption: "Смотреть отзыв в Instagram",
    cover: "/images/reviews/review-4.jpg",
    coverAlt: "Кадр из видеоотзыва пациента на фоне логотипа Ortodont Pro",
    href: highlight,
  },
];
