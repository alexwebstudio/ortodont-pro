import Image from "next/image";
import Link from "next/link";
import type { Doctor } from "@/content/doctors";
import { ArrowButton } from "./ArrowButton";

export function DoctorCard({ doctor, sizes }: { doctor: Doctor; sizes: string }) {
  return (
    <Link href={`/doctors/${doctor.slug}`} aria-label={`${doctor.name}, ${doctor.role.toLowerCase()}`} className="group block">
      <span className="photo-card aspect-[3/4]">
        <Image src={doctor.image} alt={doctor.imageAlt} fill sizes={sizes} className="object-cover" />
      </span>
      <span className="mt-3 flex items-center justify-between gap-3">
        <span className="min-w-0">
          <span className="block text-[16px] font-semibold leading-tight lg:text-[17px]">{doctor.name}</span>
          <span className="mt-0.5 block text-[14px] leading-tight text-ink-muted">{doctor.role}</span>
        </span>
        <span>
          <ArrowButton tone="fill" />
        </span>
      </span>
    </Link>
  );
}
