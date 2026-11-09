import Image from "next/image";
import { cx } from "@/lib/utils";

type Tooth3DProps = {
  className?: string;
  sizes: string;
  parallax?: number;
  priority?: boolean;
};

export function Tooth3D({ className, sizes, parallax, priority }: Tooth3DProps) {
  return (
    <div className={cx("isolate", className)} data-parallax={parallax} aria-hidden="true">
      <div className="tooth-halo" />
      <div data-float="">
        <Image src="/models/tooth.png" alt="" width={736} height={736} sizes={sizes} priority={priority} className="h-auto w-full select-none" draggable={false} />
      </div>
    </div>
  );
}
