import Image from "next/image"
import { cn } from "@/lib/utils"

const legend = [
  { code: "1", label: "Спальня" },
  { code: "2", label: "Спальня" },
  { code: "3", label: "Спальня" },
  { code: "4", label: "Спальня" },
  { code: "5", label: "Туалет" },
  { code: "6", label: "Хозяйственное помещение / котельная" },
  { code: "7", label: "Гостиная" },
  { code: "8", label: "Столовая" },
  { code: "9", label: "Кухня" },
]

export function FloorPlan({ className }: { className?: string }) {
  return (
    <figure className={cn("min-w-0", className)}>
      <a
        href="/images/estate/floor-plan-numbered.png"
        target="_blank"
        rel="noopener noreferrer"
        className="group block overflow-hidden rounded-2xl border border-accent/25 bg-background p-2 shadow-2xl shadow-background/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-3"
        aria-label="Открыть обмерный план дома в полном размере"
      >
        <Image
          src="/images/estate/floor-plan-numbered.png"
          alt="Точный обмерный план дома с цифровыми обозначениями помещений от 1 до 9"
          width={1875}
          height={1035}
          sizes="(max-width: 1024px) 100vw, 70vw"
          className="h-auto w-full rounded-xl object-contain transition-opacity group-hover:opacity-95"
        />
      </a>
      <figcaption className="mt-3 text-xs leading-relaxed text-muted-foreground">
        Стены, проёмы, окна, двери и размеры сохранены без изменений.
      </figcaption>
    </figure>
  )
}

export function FloorPlanLegend({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col border-t border-border pt-7", className)}>
      <p className="eyebrow text-accent">Экспликация помещений</p>
      <dl className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
        {legend.map((item) => (
          <div key={item.code} className="flex min-w-0 items-center gap-3 border-b border-border pb-3">
            <dt className="flex size-9 shrink-0 items-center justify-center rounded-full border border-accent/70 bg-secondary font-display text-sm font-bold text-foreground">
              {item.code}
            </dt>
            <dd className="min-w-0 font-display text-sm font-semibold leading-snug text-foreground sm:text-base">
              {item.label}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
        Нажмите на план, чтобы открыть его в полном размере и рассмотреть размерные линии.
      </p>
    </div>
  )
}
