import Image from "next/image"
import { cn } from "@/lib/utils"

const legend = [
  { code: "С", label: "Спальня", detail: "четыре комнаты в левом крыле" },
  { code: "Т", label: "Туалет", detail: "возле лестницы" },
  { code: "Х", label: "Хозяйственное помещение", detail: "котельная и техническая зона" },
  { code: "Г", label: "Гостиная", detail: "центральное помещение" },
  { code: "К", label: "Столовая", detail: "нижняя левая комната" },
  { code: "СТ", label: "Кухня", detail: "нижняя правая комната" },
]

export function FloorPlan({ className }: { className?: string }) {
  return (
    <figure className={cn("min-w-0", className)}>
      <a
        href="/images/estate/floor-plan-labeled.png"
        target="_blank"
        rel="noopener noreferrer"
        className="group block overflow-hidden rounded-2xl border border-border bg-foreground p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-3"
        aria-label="Открыть обмерный план дома в полном размере"
      >
        <Image
          src="/images/estate/floor-plan-labeled.png"
          alt="Исходный обмерный план дома с обозначениями четырех спален, туалета, хозяйственного помещения, гостиной, столовой и кухни"
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
    <div className={cn("flex flex-col", className)}>
      <p className="eyebrow text-accent">Обозначения</p>
      <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {legend.map((item) => (
          <div key={item.code} className="flex items-center gap-4 border-b border-border pb-3">
            <dt className="flex size-10 shrink-0 items-center justify-center rounded-full border border-accent/70 bg-secondary font-display text-sm font-bold text-foreground">
              {item.code}
            </dt>
            <dd className="min-w-0">
              <p className="font-display text-base font-semibold text-foreground">{item.label}</p>
              <p className="text-xs leading-relaxed text-muted-foreground">{item.detail}</p>
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
        Нажмите на план, чтобы открыть исходный масштаб и рассмотреть размерные линии.
      </p>
    </div>
  )
}
