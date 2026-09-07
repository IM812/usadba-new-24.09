import Image from "next/image"
import { cn } from "@/lib/utils"

export function FloorPlan({ className }: { className?: string }) {
  return (
    <figure className={cn("min-w-0", className)}>
      <a
        href="/images/estate/floor-plan-3d-source.jpg"
        target="_blank"
        rel="noopener noreferrer"
        className="group block overflow-hidden rounded-3xl border border-accent/30 bg-background p-2 shadow-2xl shadow-background/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-3"
        aria-label="Открыть объёмную планировку дома в полном размере"
      >
        <div className="relative overflow-hidden rounded-2xl bg-foreground">
          <Image
            src="/images/estate/floor-plan-3d-source.jpg"
            alt="Объёмная планировка бревенчатого дома с четырьмя спальнями, гостиной, столовой и кухней"
            width={1491}
            height={1030}
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="h-auto w-full object-contain transition-transform duration-700 group-hover:scale-[1.01]"
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
      </a>

      <figcaption className="mt-4 flex flex-col gap-1 text-xs leading-relaxed text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>Объёмная схема жилых помещений усадьбы.</span>
        <span className="text-foreground/70">Нажмите, чтобы рассмотреть план крупнее</span>
      </figcaption>
    </figure>
  )
}
