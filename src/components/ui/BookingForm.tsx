"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { services } from "@/content/services";
import { formatPhone, leadSchema, type LeadInput } from "@/lib/validation";
import { Button } from "./Button";
import { Field, Input, Select } from "./Input";

type Status = "idle" | "loading" | "error";

const DIAGNOSTICS = "Диагностика и консультация";

export function BookingForm({ submitLabel = "Записаться", defaultService = "", onSuccess }: { submitLabel?: string; defaultService?: string; onSuccess?: () => void }) {
  const router = useRouter();
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: "", phone: "", service: defaultService, time: "", consent: false, website: "" },
  });

  const submit = handleSubmit(async (values) => {
    setStatus("loading");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error(String(response.status));
      onSuccess?.();
      router.push("/thanks");
    } catch {
      setStatus("error");
    }
  });

  const ids = { name: `${uid}-name`, phone: `${uid}-phone`, service: `${uid}-service`, time: `${uid}-time`, consent: `${uid}-consent` };

  return (
    <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
      <Field label="Имя" id={ids.name} error={errors.name?.message}>
        <Input id={ids.name} autoComplete="name" placeholder="Как к вам обращаться" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? `${ids.name}-error` : undefined} {...register("name")} />
      </Field>

      <Field label="Телефон" id={ids.phone} error={errors.phone?.message}>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Input
              id={ids.phone}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+7 (___) ___-__-__"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? `${ids.phone}-error` : undefined}
              name={field.name}
              ref={field.ref}
              onBlur={field.onBlur}
              value={field.value}
              onChange={(event) => field.onChange(formatPhone(event.target.value))}
            />
          )}
        />
      </Field>

      <Field label="Услуга" id={ids.service} error={errors.service?.message}>
        <Select id={ids.service} aria-invalid={Boolean(errors.service)} aria-describedby={errors.service ? `${ids.service}-error` : undefined} {...register("service")}>
          <option value="">Выберите услугу</option>
          <option value={DIAGNOSTICS}>{DIAGNOSTICS}</option>
          {services.map((service) => (
            <option key={service.slug} value={service.title}>
              {service.title}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Удобное время" hint="(необязательно)" id={ids.time}>
        <Input id={ids.time} placeholder="Например, будни после 18:00" {...register("time")} />
      </Field>

      {/* Ловушка для ботов: поле скрыто от людей и вспомогательных технологий. */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={`${uid}-website`}>Сайт</label>
        <input id={`${uid}-website`} type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor={ids.consent} className="flex cursor-pointer items-start gap-3 text-[14px] leading-snug">
          <input id={ids.consent} type="checkbox" className="mt-0.5 h-5 w-5 flex-none accent-[var(--accent)]" aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? `${ids.consent}-error` : undefined} {...register("consent")} />
          <span className="opacity-85">
            Даю согласие на обработку персональных данных и принимаю{" "}
            <Link href="/privacy" className="underline underline-offset-2">
              политику конфиденциальности
            </Link>
          </span>
        </label>
        {errors.consent && (
          <p id={`${ids.consent}-error`} role="alert" className="field-error">
            {errors.consent.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <Button type="submit" arrow={status !== "loading"} disabled={status === "loading"} className="w-full sm:w-auto">
          {status === "loading" ? "Отправляем…" : submitLabel}
        </Button>
        {status === "error" && (
          <p role="alert" className="field-error !mt-0">
            Заявка не отправилась. Попробуйте ещё раз или напишите нам в мессенджер.
          </p>
        )}
      </div>
    </form>
  );
}
