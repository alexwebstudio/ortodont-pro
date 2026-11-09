import type { PriceItem } from "@/content/prices";
import { formatPriceFrom } from "@/content/site";
import { Mono } from "./Mono";

export function PriceTable({ items, caption }: { items: PriceItem[]; caption: string }) {
  return (
    <>
      <table className="hidden w-full border-collapse text-left md:table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="t-eyebrow">
            <th scope="col" className="pb-3 font-medium">Услуга</th>
            <th scope="col" className="pb-3 font-medium">Что входит</th>
            <th scope="col" className="pb-3 text-right font-medium">Цена</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.name} className="hair-row">
              <th scope="row" className="py-4 pr-6 text-[16px] font-medium">{item.name}</th>
              <td className="py-4 pr-6 text-[15px] text-ink-muted">{item.includes}</td>
              <td className="whitespace-nowrap py-4 text-right">
                <Mono className="!text-[15px] font-medium">{formatPriceFrom(item.price)}</Mono>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="space-y-2.5 md:hidden">
        {items.map((item) => (
          <li key={item.name} className="inner-card p-4">
            <p className="font-medium">{item.name}</p>
            <dl className="mt-2 space-y-1 text-[15px]">
              <div className="flex justify-between gap-4">
                <dt className="text-ink-muted">Входит</dt>
                <dd className="text-right">{item.includes}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-muted">Цена</dt>
                <dd>
                  <Mono className="font-medium">{formatPriceFrom(item.price)}</Mono>
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}
