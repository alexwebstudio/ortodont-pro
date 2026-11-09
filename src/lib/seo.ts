import type { Metadata } from "next";
import { site } from "@/content/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  noindex?: boolean;
  /** Заголовок без суффикса бренда: для главной. */
  absolute?: boolean;
};

const OG_IMAGE = "/og.jpg";

export function pageMeta({ title, description, path, image = OG_IMAGE, imageAlt, noindex, absolute }: PageMeta): Metadata {
  const alt = imageAlt ?? `${site.brand} — стоматология, ${site.city}`;
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "website",
      locale: "ru_RU",
      siteName: site.brand,
      title,
      description,
      url: path,
      images: [{ url: image, width: 1200, height: 630, alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function absoluteUrl(path: string) {
  return new URL(path, site.domain).toString();
}

export function clinicSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Dentist", "MedicalBusiness", "LocalBusiness"],
    "@id": absoluteUrl("/#clinic"),
    name: site.brand,
    description: site.slogan,
    url: site.domain,
    image: absoluteUrl(OG_IMAGE),
    telephone: site.phone.replace(/[^\d+]/g, ""),
    ...(site.email ? { email: site.email } : {}),
    priceRange: "₸₸",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: site.city,
      addressRegion: site.addressRegion,
      addressCountry: site.country,
    },
    ...(site.hoursSchema.length ? { openingHours: site.hoursSchema } : {}),
    sameAs: [site.instagram],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
