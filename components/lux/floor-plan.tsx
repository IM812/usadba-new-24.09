import Image from "next/image"
import { cn } from "@/lib/utils"

export function FloorPlan({ className }: { className?: string }) {
  return (
    <figure className={cn("min-w-0", className)}>
      <div className="overflow-hidden rounded-3xl border border-accent/30 bg-background p-2 shadow-2xl shadow-background/40 sm:p-3">
        <div className="relative overflow-hidden rounded-2xl bg-foreground">
          <Image
            src="/images/estate/floor-plan-3d-source.jpg"
            alt="Объёмная планировка бревенчатого дома с четырьмя спальнями, гостиной, столовой и кухней"
            width={1491}
            height={1030}
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="h-auto w-full object-contain"
          />
          <div className="absolute inset-x-3 bottom-3 flex flex-col gap-1 rounded-2xl border border-foreground/15 bg-background/85 px-4 py-3 backdrop-blur-md sm:inset-x-auto sm:left-5 sm:bottom-5 sm:px-5 sm:py-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent sm:text-xs">
              Планировка дома
            </span>
            <span className="text-xs font-medium text-foreground sm:text-sm">
              4 спальни · гостиная · столовая · кухня
            </span>
          </div>
        </div>
      </div>

      <figcaption className="mt-4 text-xs leading-relaxed text-muted-foreground">
        Объёмная схема жилых помещений усадьбы.
      </figcaption>
    </figure>
  )
}
