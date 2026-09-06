import { BedDouble, ChefHat, ShowerHead, Sofa, UtensilsCrossed } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Планировка дома — реконструирована по проектной экспликации помещений
 * (архитектурный документ с перечнем комнат и площадей). Схема выполнена
 * как самостоятельная архитектурная иллюстрация в тоне сайта: латунные
 * линии стен, дверные притворы с четвертью открывания, встроенная мебель.
 * Пропорции комнат приближены к реальным площадям, но чертёж иллюстративный.
 */

const rooms = [
  { no: 1, name: "Гостиная", area: "57,0", icon: Sofa },
  { no: 2, name: "Кухня", area: "16,6", icon: ChefHat },
  { no: 3, name: "Столовая", area: "24,3", icon: UtensilsCrossed },
  { no: 4, name: "Спальня", area: "12,2", icon: BedDouble },
  { no: 5, name: "Санузел", area: "4,0", icon: ShowerHead },
] as const

const TOTAL_AREA = "114,1"

/** Дверной притвор: короткий "лист" двери + дуга открывания на 90°. */
function DoorSwing({
  hinge,
  width,
  rotate = 0,
}: {
  hinge: [number, number]
  width: number
  rotate?: number
}) {
  const [x, y] = hinge
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`} className="stroke-accent/70">
      <line x1={0} y1={0} x2={0} y2={width} strokeWidth={3} strokeLinecap="round" />
      <path
        d={`M 0 ${width} A ${width} ${width} 0 0 1 ${width} 0`}
        fill="none"
        strokeWidth={2}
        strokeDasharray="3 5"
        className="stroke-accent/35"
      />
    </g>
  )
}

function RoomLabel({
  x,
  y,
  no,
  name,
  area,
}: {
  x: number
  y: number
  no: number
  name: string
  area: string
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={15} className="fill-accent/15 stroke-accent/60" strokeWidth={1.5} />
      <text textAnchor="middle" dominantBaseline="central" className="fill-accent font-display text-[15px] font-bold">
        {no}
      </text>
      <text y={34} textAnchor="middle" className="fill-foreground font-display text-[20px] font-bold tracking-[-0.02em]">
        {name}
      </text>
      <text y={56} textAnchor="middle" className="fill-muted-foreground text-[13px]">
        {area} м²
      </text>
    </g>
  )
}

export function FloorPlan({ className }: { className?: string }) {
  const EXT = 14 // толщина внешней стены
  const INT = 9 // толщина внутренней перегородки

  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox="0 0 1400 1100"
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="Схема планировки дома: гостиная 57 м², столовая 24,3 м², кухня 16,6 м², спальня 12,2 м² с санузлом 4 м². Общая площадь показанных помещений 114,1 м²."
      >
        <defs>
          <pattern id="fp-hatch" width={7} height={7} patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <line x1={0} y1={0} x2={0} y2={7} className="stroke-foreground/[0.06]" strokeWidth={1} />
          </pattern>
        </defs>

        {/* ---------- Дом смещён внутрь холста, чтобы осталось место под размерные линии, розу ветров и подпись ---------- */}
        <g transform="translate(96 92)" className="text-foreground">
          {/* Заливка помещений — едва заметный тон, чтобы контур стен читался первым */}
          <rect x={0} y={0} width={600} height={950} rx={2} className="fill-card/70" />
          <rect x={600} y={0} width={620} height={390} className="fill-secondary/55" />
          <rect x={600} y={390} width={620} height={260} className="fill-card/60" />
          <rect x={600} y={650} width={70} height={300} className="fill-secondary/35" />
          <rect x={670} y={650} width={420} height={300} className="fill-secondary/55" />
          <rect x={1090} y={650} width={130} height={300} className="fill-card/60" />
          <rect x={0} y={0} width={1220} height={950} fill="url(#fp-hatch)" />

          {/* ---------- Внешний контур ---------- */}
          <rect
            x={0}
            y={0}
            width={1220}
            height={950}
            rx={3}
            fill="none"
            className="stroke-foreground/70"
            strokeWidth={EXT}
          />
          {/* "Прорезь" входной двери в наружной стене (перекрывает внешний контур фоном) */}
          <rect x={-EXT} y={418} width={EXT * 2} height={94} className="fill-background" />

          {/* ---------- Внутренние перегородки (сегментами — с проёмами под двери и открытую планировку) ---------- */}
          <g className="stroke-foreground/55" strokeWidth={INT} strokeLinecap="square">
            {/* x=600: гостиная ↔ столовая/кухня/коридор */}
            <line x1={600} y1={0} x2={600} y2={40} />
            {/* 40–580 — открытый проём в столовую (без двери) */}
            <line x1={600} y1={580} x2={600} y2={650} />
            <line x1={600} y1={650} x2={600} y2={700} />
            {/* 700–790 — дверь в коридор */}
            <line x1={600} y1={790} x2={600} y2={950} />

            {/* y=390: столовая ↔ кухня, с широким открытым проёмом-барной стойкой */}
            <line x1={600} y1={390} x2={780} y2={390} />
            {/* 780–1000 — открытая стойка */}
            <line x1={1000} y1={390} x2={1220} y2={390} />

            {/* y=650: кухня ↔ (коридор/спальня/санузел) — сплошная */}
            <line x1={600} y1={650} x2={1220} y2={650} />

            {/* x=670: коридор ↔ спальня */}
            <line x1={670} y1={650} x2={670} y2={780} />
            {/* 780–870 — дверь в спальню */}
            <line x1={670} y1={870} x2={670} y2={950} />

            {/* x=1090: спальня ↔ санузел */}
            <line x1={1090} y1={650} x2={1090} y2={785} />
            {/* 785–865 — дверь в санузел */}
            <line x1={1090} y1={865} x2={1090} y2={950} />
          </g>

          {/* ---------- Дверные притворы ---------- */}
          <DoorSwing hinge={[600, 700]} width={90} rotate={0} />
          <DoorSwing hinge={[670, 780]} width={90} rotate={90} />
          <DoorSwing hinge={[1090, 785]} width={80} rotate={90} />
          <DoorSwing hinge={[0, 418]} width={94} rotate={0} />

          {/* ---------- Окна (тонкие засечки на внешних стенах) ---------- */}
          <g className="stroke-accent/50" strokeWidth={4}>
            <line x1={90} y1={-EXT / 2} x2={200} y2={-EXT / 2} />
            <line x1={330} y1={-EXT / 2} x2={440} y2={-EXT / 2} />
            <line x1={720} y1={-EXT / 2} x2={860} y2={-EXT / 2} />
            <line x1={1220 - EXT / 2} y1={460} x2={1220 - EXT / 2} y2={560} />
            <line x1={860} y1={950 + EXT / 2} x2={1000} y2={950 + EXT / 2} />
          </g>

          {/* ================= Мебель — тонкие архитектурные значки ================= */}
          <g className="stroke-muted-foreground/70" strokeWidth={2.5} fill="none">
            {/* Гостиная: камин у верхней стены */}
            <rect x={64} y={0} width={132} height={40} rx={2} className="fill-secondary/80 stroke-accent/60" />
            <path
              d="M 130 30 C 122 22 124 14 130 6 C 136 14 140 18 136 24 C 134 20 132 21 131 24 C 130 22 129 22 130 30 Z"
              className="fill-accent stroke-none"
            />

            {/* Диваны и столик */}
            <rect x={86} y={520} width={220} height={64} rx={8} className="fill-card/40" />
            <rect x={86} y={596} width={64} height={170} rx={8} className="fill-card/40" />
            <rect x={196} y={556} width={104} height={54} rx={10} className="stroke-accent/40" />

            {/* Стеллаж у нижней стены гостиной */}
            <rect x={392} y={912} width={168} height={26} className="fill-secondary/70" />
            <line x1={420} y1={912} x2={420} y2={938} />
            <line x1={476} y1={912} x2={476} y2={938} />
            <line x1={532} y1={912} x2={532} y2={938} />

            {/* Столовая: стол + стулья */}
            <rect x={730} y={175} width={180} height={100} rx={14} className="fill-card/40 stroke-accent/50" />
            {[
              [770, 153],
              [850, 153],
              [770, 297],
              [850, 297],
              [714, 225],
              [926, 225],
            ].map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={10} className="fill-secondary/60" />
            ))}
            {/* Комод у наружной стены столовой */}
            <rect x={1010} y={0} width={140} height={30} className="fill-secondary/70" />

            {/* Кухня: угловой гарнитур + стеллаж */}
            <path d="M 1160 400 L 1210 400 L 1210 630 L 1160 630" className="fill-secondary/70 stroke-accent/50" />
            <path d="M 640 606 L 950 606 L 950 640 L 640 640 Z" className="fill-secondary/70 stroke-accent/50" />
            <rect x={606} y={410} width={26} height={120} className="fill-secondary/70" />

            {/* Спальня: кровать с изголовьем + шкаф */}
            <rect x={850} y={686} width={180} height={140} rx={12} className="fill-card/40 stroke-accent/50" />
            <rect x={866} y={698} width={54} height={34} rx={8} className="fill-secondary/60" />
            <rect x={942} y={698} width={54} height={34} rx={8} className="fill-secondary/60" />
            <rect x={694} y={914} width={150} height={26} className="fill-secondary/70" />

            {/* Санузел: раковина + душ */}
            <rect x={1112} y={670} width={54} height={30} rx={10} className="fill-card/40 stroke-accent/50" />
            <rect x={1108} y={858} width={82} height={74} rx={6} className="stroke-accent/50" />
            <line x1={1108} y1={858} x2={1190} y2={932} className="stroke-accent/25" />
          </g>

          {/* ---------- Номерные метки и подписи комнат ---------- */}
          <RoomLabel x={300} y={200} no={1} name="Гостиная" area="57,0" />
          <RoomLabel x={820} y={68} no={3} name="Столовая" area="24,3" />
          <RoomLabel x={910} y={470} no={2} name="Кухня" area="16,6" />
          <RoomLabel x={880} y={720} no={4} name="Спальня" area="12,2" />
          <RoomLabel x={1155} y={790} no={5} name="Санузел" area="4,0" />
          <text x={635} y={815} className="fill-muted-foreground text-[11px] uppercase tracking-[0.12em]">
            коридор
          </text>

          {/* ---------- Размерные линии ---------- */}
          <g className="stroke-muted-foreground/45" strokeWidth={1.5}>
            <line x1={0} y1={-34} x2={1220} y2={-34} />
            <line x1={0} y1={-42} x2={0} y2={-26} />
            <line x1={1220} y1={-42} x2={1220} y2={-26} />
            <line x1={-34} y1={0} x2={-34} y2={950} />
            <line x1={-42} y1={0} x2={-26} y2={0} />
            <line x1={-42} y1={950} x2={-26} y2={950} />
          </g>
          <text x={610} y={-46} textAnchor="middle" className="fill-muted-foreground text-[13px] tracking-wide">
            12,2 м
          </text>
          <text
            x={-46}
            y={475}
            textAnchor="middle"
            transform="rotate(-90 -46 475)"
            className="fill-muted-foreground text-[13px] tracking-wide"
          >
            9,5 м
          </text>

          {/* ---------- Роза ветров ---------- */}
          <g transform="translate(1180 -8)" className="stroke-accent/60">
            <circle r={26} fill="none" strokeWidth={1.5} />
            <path d="M 0 -18 L 7 4 L 0 -2 L -7 4 Z" className="fill-accent stroke-none" />
            <text y={38} textAnchor="middle" className="fill-muted-foreground text-[11px] fill-current">
              С
            </text>
          </g>

          <text x={0} y={990} className="fill-muted-foreground/70 text-[11px] italic">
            Схема ориентировочная, по данным проектной документации — не является чертежом
          </text>
        </g>
      </svg>
    </div>
  )
}

export function FloorPlanLegend({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <dl className="flex flex-col gap-0">
        {rooms.map((room) => {
          const Icon = room.icon
          return (
            <div
              key={room.no}
              className="flex items-center gap-4 border-b border-border py-4 first:pt-0 last:border-b-0"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent/12 text-accent">
                <Icon className="size-[18px]" aria-hidden />
              </span>
              <dt className="flex-1 text-[15px] font-medium text-foreground">
                <span className="mr-2 text-muted-foreground">{room.no}.</span>
                {room.name}
              </dt>
              <dd className="font-display text-lg font-bold tracking-[-0.02em] text-foreground">
                {room.area}
                <span className="ml-1 text-sm font-normal text-muted-foreground">м²</span>
              </dd>
            </div>
          )
        })}
      </dl>
      <div className="mt-4 flex items-baseline justify-between border-t border-accent/30 pt-4">
        <span className="eyebrow text-muted-foreground">Площадь помещений</span>
        <span className="font-display text-2xl font-extrabold tracking-[-0.03em] text-accent">
          {TOTAL_AREA} <span className="text-base font-medium text-muted-foreground">м²</span>
        </span>
      </div>
    </div>
  )
}
