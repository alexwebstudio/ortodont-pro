import type { MetadataRoute } from "next";
import { cases, hasCases } from "@/content/cases";
import { doctors } from "@/content/doctors";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticPaths = ["/", "/services", "/doctors", ...(hasCases ? ["/cases"] : []), "/prices", "/about", "/contacts", "/privacy"];
  const dynamicPaths = [...services.map((item) => `/services/${item.slug}`), ...doctors.map((item) => `/doctors/${item.slug}`), ...cases.map((item) => `/cases/${item.slug}`)];

  return [...staticPaths, ...dynamicPaths].map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    priority: path === "/" ? 1 : 0.7,
  }));
}
