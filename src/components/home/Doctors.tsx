import { doctorsBlock } from "@/content/copy";
import { doctors } from "@/content/doctors";
import { DoctorCard } from "@/components/ui/DoctorCard";
import { SectionHead } from "@/components/ui/Heading";
import { Mono } from "@/components/ui/Mono";
import { Reveal } from "@/components/ui/Reveal";
import { SectionCard } from "@/components/ui/SectionCard";

export function Doctors() {
  return (
    <SectionCard>
      <SectionHead eyebrow={doctorsBlock.eyebrow} title={doctorsBlock.title} lead={doctorsBlock.lead} link={{ label: doctorsBlock.all, href: "/doctors" }} />
      <Reveal group className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-5">
        {doctors.map((doctor) => (
          <div key={doctor.slug} data-reveal-item="">
            <DoctorCard doctor={doctor} sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw" />
            <p className="mt-3 text-[15px] leading-snug text-ink-muted">{doctor.specialization}</p>
            {doctor.experience && <Mono className="mt-1 block !text-[13px]">стаж {doctor.experience}</Mono>}
          </div>
        ))}
      </Reveal>
    </SectionCard>
  );
}
