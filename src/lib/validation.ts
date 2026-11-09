import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Введите имя").max(80, "Слишком длинное имя"),
  phone: z
    .string()
    .trim()
    .refine((value) => {
      const digits = value.replace(/\D/g, "");
      return digits.length >= 10 && digits.length <= 15;
    }, "Введите телефон полностью"),
  service: z.string().trim().min(1, "Выберите услугу").max(80),
  time: z.string().trim().max(80).optional(),
  consent: z.boolean().refine((value) => value, "Нужно согласие на обработку данных"),
  website: z.string().max(0).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

// Маска под Казахстан: +7 (___) ___-__-__. Номер с другим кодом страны остаётся как введён.
export function formatPhone(value: string) {
  const raw = value.trim();
  if (raw === "" || raw === "+") return raw;
  const digits = raw.replace(/\D/g, "");
  if (raw.startsWith("+") && !raw.startsWith("+7")) return `+${digits.slice(0, 15)}`;

  let rest = digits;
  if (rest.startsWith("8") || rest.startsWith("7")) rest = rest.slice(1);
  rest = rest.slice(0, 10);

  let out = "+7";
  if (rest.length > 0) out += ` (${rest.slice(0, 3)}`;
  if (rest.length >= 3) out += ")";
  if (rest.length > 3) out += ` ${rest.slice(3, 6)}`;
  if (rest.length > 6) out += `-${rest.slice(6, 8)}`;
  if (rest.length > 8) out += `-${rest.slice(8, 10)}`;
  return out;
}
