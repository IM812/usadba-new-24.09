import Image from "next/image"
import { ArrowDown, Star } from "lucide-react"
import { BookButton } from "@/components/lux/book-button"
import { LuxLink } from "@/components/lux/ui"
import { WeatherBadge } from "@/components/weather-badge"
import { site } from "@/lib/site"

export function HomeHero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      {/* Кадр усадьбы на весь экран с медленным наездом */}
      <div className="absolute inset-0">
        <Image
          src="/images/estate/house-lawn.jpg"
          alt="Бревенчатый дом усадьбы среди сосен"
          fill
          priority
          sizes="100vw"
          className="lux-ken-burns object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/45 via-background/35 to-background sm:from-background/75 sm:via-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/55 via-background/20 to-transparent sm:from-background/70" />
        <div className="absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-background via-background/90 to-transparent sm:hidden" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-6 pt-24 min-[390px]:px-5 sm:px-8 sm:pb-20 sm:pt-28 lg:px-12">
        {/* Чип вместо хайрлайна: тонкая линейка-засечка была самой «взрослой»
            деталью первого экрана. */}
        <p className="lux-rise eyebrow chip w-fit" style={{ animationDelay: "100ms" }}>
          <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-accent" />
          {site.region} · {site.shortName}
        </p>

        <h1
          className="lux-rise mt-4 max-w-3xl text-balance font-display text-[2.5rem] font-extrabold leading-[0.98] tracking-[-0.045em] text-foreground drop-shadow-sm min-[390px]:text-[2.85rem] sm:mt-7 sm:text-7xl sm:leading-[0.94] lg:text-[5.5rem]"
          style={{ animationDelay: "220ms" }}
        >
          Усадьба между
          <br />
          двумя озерами
        </h1>

        <p
          className="lux-rise mt-4 max-w-lg text-pretty text-base leading-[1.5] text-foreground/85 sm:mt-8 sm:text-lg"
          style={{ animationDelay: "360ms" }}
        >
          <span className="sm:hidden">Дом, баня, чан и свой причал. Вся усадьба — только для вашей компании.</span>
          <span className="hidden sm:inline">
            Бревенчатый дом 250 м² в сосновом бору. Баня на дровах, сибирский чан под звездами и
            собственный причал. Дом сдается целиком — только для вашей компании.
          </span>
        </p>

        <div
          className="lux-rise mt-6 flex flex-col gap-3 [&>*]:w-full sm:mt-10 sm:flex-row sm:items-center sm:[&>*]:w-auto"
          style={{ animationDelay: "480ms" }}
        >
          <BookButton>Забронировать даты</BookButton>
          <LuxLink href="/estate" variant="outline">
            Смотреть усадьбу
          </LuxLink>
        </div>

        <WeatherBadge className="lux-rise mt-8 hidden text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-accent sm:inline-block" />

        {/* На телефоне показываем только три действительно полезных параметра,
            остальные детали остаются в полной десктопной полосе. */}
        <dl
          className="lux-rise mt-6 grid grid-cols-3 gap-2 border-t border-foreground/15 pt-4 sm:mt-12 sm:grid-cols-4 sm:gap-x-8 sm:rounded-3xl sm:border sm:border-border sm:bg-card/70 sm:p-7 sm:backdrop-blur-md"
          style={{ animationDelay: "620ms" }}
        >
          {[
            { k: "Рейтинг", v: site.rating.value, sub: `${site.rating.count} отзыв на Яндекс Картах` },
            { k: "Площадь", v: "250 м²", sub: "4 спальни с санузлом" },
            { k: "Формат", v: "целиком", sub: "только для вашей компании" },
            { k: "От Москвы", v: "≈ 5 часов", sub: "по трассе М9 через Великие Луки" },
          ].map((f) => (
            <div key={f.k} className={f.k === "Площадь" ? "hidden sm:block" : undefined}>
              <dt className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground sm:eyebrow">{f.k}</dt>
              <dd className="mt-1.5 flex items-center gap-1 font-display text-base font-extrabold tracking-[-0.03em] text-foreground min-[390px]:text-lg sm:mt-2.5 sm:gap-1.5 sm:text-3xl">
                {f.v}
                {f.k === "Рейтинг" ? (
                  <Star className="size-3.5 fill-accent text-accent sm:size-4" aria-hidden />
                ) : null}
              </dd>
              <dd className="mt-1 hidden text-xs leading-snug text-muted-foreground sm:mt-1.5 sm:block">
                {f.sub}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="relative hidden justify-center pb-8 sm:flex">
        <ArrowDown className="size-4 animate-bounce text-accent/70" aria-hidden />
      </div>
    </section>
  )
}
