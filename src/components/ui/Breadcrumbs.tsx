import Link from "next/link";
import { breadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "./JsonLd";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Главная", path: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbSchema(all)} />
      <nav aria-label="Хлебные крошки">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px]">
          {all.map((item, index) => {
            const last = index === all.length - 1;
            return (
              <li key={item.path} className="flex items-center gap-2">
                {index > 0 && (
                  <span aria-hidden="true" className="opacity-50">
                    /
                  </span>
                )}
                {last ? (
                  <span aria-current="page" className="opacity-80">
                    {item.name}
                  </span>
                ) : (
                  <Link href={item.path} className="underline-offset-4 hover:underline">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
