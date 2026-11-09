import type { Metadata } from "next";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { CtaForm } from "@/components/home/CtaForm";
import { Doctors } from "@/components/home/Doctors";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { Manifesto } from "@/components/home/Manifesto";
import { Quality } from "@/components/home/Quality";
import { Reviews } from "@/components/home/Reviews";
import { Services } from "@/components/home/Services";
import { Steps } from "@/components/home/Steps";
import { Tech } from "@/components/home/Tech";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: `${site.brand} — стоматология, ${site.city}`,
  description: "Стоматология Ortodont Pro в Актобе: брекет-системы, терапия, реставрация, протезирование, хирургия и имплантация. Рейтинг 5.0 в 2ГИС, онлайн-запись.",
  path: "/",
  absolute: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Quality />
      <Services />
      <Doctors />
      <Steps />
      <BeforeAfter />
      <Tech />
      <Reviews />
      <Faq />
      <CtaForm />
    </>
  );
}
