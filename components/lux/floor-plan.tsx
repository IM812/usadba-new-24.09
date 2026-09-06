import { BedDouble, ChefHat, ShowerHead, Sofa, UtensilsCrossed } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Планировка дома — перерисована с реального обмерного плана ("Обмерный
 * план", экспликация помещений: 1 Гостиная 57,0 · 2 Кухня 16,6 · 3 Столовая
 * 24,3 · 4 Спальня 12,2 · 5 Санузел 4,0, итого 114,10 м²). Топология
 * повторяет исходный чертёж: западное крыло — ряд из 8 отсеков (гардеробные
 * + спальня + санузел), узкий соединительный тамбур с двумя дверьми,
 * лестничный холл с главным входом, восточное крыло — гостиная охватывает
 * северный выступ и полосу над столовой/кухней, которые стоят рядом друг
 * с другом в нижней части. Пропорции сохранены по реальным размерным цепям.
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
  accent = false,
}: {
  hinge: [number, number]
  width: number
  rotate?: number
  accent?: boolean
}) {
  const [x, y] = hinge
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`} className={accent ? "stroke-accent" : "stroke-accent/70"}>
      <line x1={0} y1={0} x2={0} y2={width} strokeWidth={accent ? 3.5 : 3} strokeLinecap="round" />
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

/** Оконная засечка — тройная риска поперёк наружной стены. */
function WindowMark({ x, y, w = 40, rotate = 0 }: { x: number; y: number; w?: number; rotate?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`} className="stroke-sky-400/60" strokeWidth={2.5}>
      <line x1={-w / 2} y1={-5} x2={w / 2} y2={-5} />
      <line x1={-w / 2} y1={0} x2={w / 2} y2={0} />
      <line x1={-w / 2} y1={5} x2={w / 2} y2={5} />
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

function Staircase({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const steps = 9
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect width={w} height={h} rx={4} className="fill-secondary/45 stroke-accent/40" strokeWidth={2} />
      <g className="stroke-foreground/40" strokeWidth={1.5}>
        {Array.from({ length: steps }).map((_, i) => {
          const sy = 12 + i * ((h - 24) / (steps - 1))
          return <line key={i} x1={10} y1={sy} x2={w - 10} y2={sy} />
        })}
      </g>
      <path
        d={`M ${w / 2} ${h * 0.22} L ${w / 2} ${h * 0.82}`}
        className="stroke-accent"
        strokeWidth={2}
        markerEnd="url(#fp-arrow)"
      />
    </g>
  )
}

export function FloorPlan({ className }: { className?: string }) {
  const EXT = 12 // толщина внешней стены
  const INT = 7 // толщина внутренней перегородки

  // Границы отсеков западного крыла — пропорционально размерной цепи
  // верхней стены обмера: 3770 / 1400 / 1420 / 5050 мм (итого 11 640 мм)
  const bx = [0, 194, 265, 338, 600]
  const wallTop = 360
  const wallMid = 510
  const wallBot = 660

  return (
    <div className={cn("relative", className)}>
      <svg
        viewBox="0 0 1400 1000"
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="Планировка дома по обмерному плану: гостиная 57 м², столовая 24,3 м², кухня 16,6 м², спальня 12,2 м² с санузлом 4 м². Общая площадь разрабатываемых помещений 114,1 м²."
      >
        <defs>
          <marker id="fp-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" className="fill-accent" />
          </marker>
        </defs>

        <g transform="translate(80 60)" className="text-foreground" strokeLinejoin="round" strokeLinecap="round">
          {/* ================= ЗАПАДНОЕ КРЫЛО — гардеробные, спальня, санузел ================= */}
          <g>
            <rect x={bx[0]} y={wallTop} width={bx[4] - bx[0]} height={wallBot - wallTop} className="fill-card/60 stroke-foreground/70" strokeWidth={EXT} />
            <line x1={bx[0]} y1={wallMid} x2={bx[4]} y2={wallMid} className="stroke-foreground/50" strokeWidth={INT} />
            {[bx[1], bx[2], bx[3]].map((x, i) => (
              <line key={`wt${i}`} x1={x} y1={wallTop} x2={x} y2={wallMid} className="stroke-foreground/50" strokeWidth={INT} />
            ))}
            {[bx[1], bx[2], bx[3]].map((x, i) => (
              <line key={`wb${i}`} x1={x} y1={wallMid} x2={x} y2={wallBot} className="stroke-foreground/50" strokeWidth={INT} />
            ))}

            {/* дверные притворы гардеробных (верхний ряд) */}
            <DoorSwing hinge={[bx[1], wallTop + 4]} width={30} rotate={90} />
            <DoorSwing hinge={[bx[2], wallTop + 4]} width={26} rotate={90} />
            <DoorSwing hinge={[bx[3], wallTop + 4]} width={30} rotate={90} />
            {/* двери спальни (4) и санузла (5), нижний ряд */}
            <DoorSwing hinge={[bx[1] + 4, wallBot]} width={30} rotate={180} />
            <DoorSwing hinge={[bx[2] + 4, wallBot]} width={26} rotate={180} />

            {/* мебель */}
            <rect x={bx[1] + 18} y={wallMid + 24} width={72} height={68} rx={6} className="fill-secondary/60 stroke-accent/40" strokeWidth={1.5} />
            <rect x={bx[1] + 26} y={wallMid + 30} width={26} height={20} rx={5} className="fill-card/50" />
            <rect x={bx[2] + 14} y={wallMid + 14} width={40} height={24} rx={6} className="stroke-accent/50" fill="none" strokeWidth={1.5} />
            <rect x={bx[2] + 12} y={wallMid + 48} width={44} height={36} rx={5} className="stroke-accent/50" fill="none" strokeWidth={1.5} />

            <WindowMark x={(bx[0] + bx[1]) / 2} y={wallTop} w={70} />
            <WindowMark x={(bx[3] + bx[4]) / 2 - 40} y={wallTop} w={60} />
            <WindowMark x={(bx[0] + bx[1]) / 2} y={wallBot} w={70} />
            <WindowMark x={(bx[3] + bx[4]) / 2 - 40} y={wallBot} w={60} />

            <text x={(bx[0] + bx[1]) / 2} y={wallTop + 44} textAnchor="middle" className="fill-muted-foreground/60 text-[10px] uppercase tracking-[0.1em]">
              гардероб
            </text>
            <text x={(bx[3] + bx[4]) / 2} y={wallTop + 44} textAnchor="middle" className="fill-muted-foreground/60 text-[10px] uppercase tracking-[0.1em]">
              хозблок
            </text>
            <text x={(bx[1] + bx[2]) / 2} y={wallMid + 34} textAnchor="middle" className="fill-foreground font-display text-[16px] font-bold">
              4
            </text>
            <text x={(bx[2] + bx[3]) / 2} y={wallMid + 34} textAnchor="middle" className="fill-foreground font-display text-[16px] font-bold">
              5
            </text>
          </g>
          <text x={(bx[1] + bx[2]) / 2} y={wallBot + 26} textAnchor="middle" className="fill-muted-foreground text-[11px]">
            Спальня
          </text>
          <text x={(bx[1] + bx[2]) / 2} y={wallBot + 42} textAnchor="middle" className="fill-muted-foreground/70 text-[11px]">
            12,2 м²
          </text>
          <text x={(bx[2] + bx[3]) / 2} y={wallBot + 26} textAnchor="middle" className="fill-muted-foreground text-[11px]">
            Санузел
          </text>
          <text x={(bx[2] + bx[3]) / 2} y={wallBot + 42} textAnchor="middle" className="fill-muted-foreground/70 text-[11px]">
            4,0 м²
          </text>

          {/* ================= ТАМБУР МЕЖДУ КРЫЛЬЯМИ ================= */}
          <rect x={bx[4]} y={wallMid - 55} width={70} height={110} className="fill-card/40 stroke-foreground/60" strokeWidth={EXT - 3} />
          <DoorSwing hinge={[bx[4] + 4, wallMid - 40]} width={26} rotate={0} />
          <DoorSwing hinge={[bx[4] + 66, wallMid + 10]} width={26} rotate={180} accent />

          {/* ================= ЛЕСТНИЧНЫЙ ХОЛЛ ================= */}
          <rect x={670} y={wallMid - 95} width={160} height={210} className="fill-secondary/30 stroke-foreground/70" strokeWidth={EXT} />
          <Staircase x={696} y={wallMid - 60} w={110} h={140} />
          <rect x={745} y={wallMid + 115} width={EXT * 2} height={70} className="fill-background" />
          <DoorSwing hinge={[745, wallMid + 115]} width={70} rotate={0} accent />
          <text x={750} y={wallMid - 108} textAnchor="middle" className="fill-muted-foreground/60 text-[10px] uppercase tracking-[0.1em]">
            вход
          </text>

          {/* ================= ВОСТОЧНОЕ КРЫЛО — гостиная, столовая, кухня ================= */}
          <g>
            {/* Заливки */}
            <rect x={890} y={0} width={280} height={340} className="fill-secondary/45" />
            <rect x={670} y={340} width={500} height={120} className="fill-secondary/45" />
            <rect x={670} y={460} width={230} height={310} className="fill-card/60" />
            <rect x={900} y={460} width={270} height={310} className="fill-card/60" />

            {/* Контур: северный выступ гостиной + основной блок */}
            <path
              d="M 890 0
                 L 1170 0
                 L 1170 340
                 L 670 340
                 L 670 460
                 L 1170 460
                 L 1170 770
                 L 670 770
                 L 670 340"
              fill="none"
              className="stroke-foreground/70"
              strokeWidth={EXT}
            />

            {/* перегородка между гостиной (полоса) и столовой/кухней */}
            <line x1={670} y1={460} x2={1170} y2={460} className="stroke-foreground/50" strokeWidth={INT} />
            {/* перегородка столовая ↔ кухня */}
            <line x1={900} y1={460} x2={900} y2={770} className="stroke-foreground/50" strokeWidth={INT} />
            <DoorSwing hinge={[900, 466]} width={34} rotate={0} />

            {/* внешние двери на восточной стене выступа гостиной */}
            <DoorSwing hinge={[1170, 30]} width={30} rotate={90} accent />
            <DoorSwing hinge={[1170, 200]} width={30} rotate={90} accent />

            {/* окна восточной стены (выступ + основной блок) */}
            <WindowMark x={1170} y={100} w={60} rotate={90} />
            <WindowMark x={1170} y={290} w={50} rotate={90} />
            <WindowMark x={1170} y={540} w={50} rotate={90} />
            <WindowMark x={1170} y={630} w={50} rotate={90} />
            <WindowMark x={1170} y={710} w={50} rotate={90} />
            {/* окна южной стены */}
            <WindowMark x={760} y={770} w={60} />
            <WindowMark x={840} y={770} w={50} />
            <WindowMark x={990} y={770} w={50} />
            <WindowMark x={1070} y={770} w={60} />

            {/* мебель гостиной: камин, диваны, стеллаж */}
            <rect x={930} y={0} width={110} height={30} rx={2} className="fill-secondary/80 stroke-accent/60" strokeWidth={1.5} />
            <path
              d="M 985 28 C 977 20 979 12 985 4 C 991 12 995 16 991 22 C 989 18 987 19 986 22 C 985 20 984 20 985 28 Z"
              className="fill-accent stroke-none"
            />
            <rect x={920} y={110} width={190} height={60} rx={10} className="fill-card/40 stroke-accent/40" strokeWidth={1.5} />
            <rect x={920} y={180} width={60} height={140} rx={10} className="fill-card/40 stroke-accent/40" strokeWidth={1.5} />
            <rect x={1000} y={160} width={90} height={46} rx={8} className="stroke-accent/35" fill="none" strokeWidth={1.5} />

            {/* мебель столовой: стол + стулья */}
            <rect x={720} y={510} width={150} height={90} rx={12} className="fill-card/40 stroke-accent/50" strokeWidth={1.5} />
            {[
              [755, 492],
              [835, 492],
              [755, 618],
              [835, 618],
              [704, 555],
              [886, 555],
            ].map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={9} className="fill-secondary/60" />
            ))}

            {/* мебель кухни: гарнитур */}
            <path d="M 940 480 L 1150 480 L 1150 510 L 970 510 Z" className="fill-secondary/70 stroke-accent/50" strokeWidth={1.5} />
            <rect x={1140} y={510} width={28} height={140} className="fill-secondary/70 stroke-accent/50" strokeWidth={1.5} />

            {/* подписи */}
            <RoomLabel x={1000} y={200} no={1} name="Гостиная" area="57,0" />
            <RoomLabel x={800} y={660} no={3} name="Столовая" area="24,3" />
            <RoomLabel x={1055} y={660} no={2} name="Кухня" area="16,6" />
          </g>

          {/* ================= РАЗМЕРНЫЕ ЛИНИИ (ключевые, по обмеру) ================= */}
          <g className="stroke-muted-foreground/45" strokeWidth={1.5}>
            <line x1={bx[0]} y1={wallTop - 34} x2={bx[4]} y2={wallTop - 34} />
            <line x1={bx[0]} y1={wallTop - 42} x2={bx[0]} y2={wallTop - 26} />
            <line x1={bx[4]} y1={wallTop - 42} x2={bx[4]} y2={wallTop - 26} />

            <line x1={bx[0] - 34} y1={wallTop} x2={bx[0] - 34} y2={wallBot} />
            <line x1={bx[0] - 42} y1={wallTop} x2={bx[0] - 26} y2={wallTop} />
            <line x1={bx[0] - 42} y1={wallBot} x2={bx[0] - 26} y2={wallBot} />

            <line x1={890} y1={-34} x2={1170} y2={-34} />
            <line x1={890} y1={-42} x2={890} y2={-26} />
            <line x1={1170} y1={-42} x2={1170} y2={-26} />

            <line x1={1204} y1={0} x2={1204} y2={340} />
            <line x1={1196} y1={0} x2={1212} y2={0} />
            <line x1={1196} y1={340} x2={1212} y2={340} />
          </g>
          <text x={(bx[0] + bx[4]) / 2} y={wallTop - 46} textAnchor="middle" className="fill-muted-foreground text-[13px] tracking-wide">
            11,64 м
          </text>
          <text x={bx[0] - 46} y={(wallTop + wallBot) / 2} textAnchor="middle" transform={`rotate(-90 ${bx[0] - 46} ${(wallTop + wallBot) / 2})`} className="fill-muted-foreground text-[13px] tracking-wide">
            6,00 м
          </text>
          <text x={1030} y={-46} textAnchor="middle" className="fill-muted-foreground text-[13px] tracking-wide">
            4,22 м
          </text>
          <text x={1230} y={170} textAnchor="middle" transform="rotate(-90 1230 170)" className="fill-muted-foreground text-[13px] tracking-wide">
            5,40 м
          </text>

          <text x={0} y={825} className="fill-muted-foreground/70 text-[11px] italic">
            Перерисовано по обмерному плану дома · площадь разрабатываемых помещений 114,10 м²
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
