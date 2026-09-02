import Image from "next/image"
import { ArrowDown, ExternalLink, Star } from "lucide-react"
import { BookButton } from "@/components/lux/book-button"
import { LuxLink } from "@/components/lux/ui"
import { WeatherBadge } from "@/components/weather-badge"
import { YANDEX_REVIEWS_URL } from "@/lib/reviews"
import { contacts, site } from "@/lib/site"

export function HomeHero() {
  return (
    <section className="relative flex min-h-[86svh] flex-col overflow-hidden pb-7 sm:min-h-[100svh] sm:justify-end sm:pb-0">
      {/* Затемнение идет сверху вниз: текст читается, а нижняя половина
          остается открытой фотографией — без черной полосы. */}
      <div className="absolute inset-0">
        <Image
          src="/images/estate/house-lawn.jpg"
          alt="Бревенчатый дом усадьбы среди сосен"
          fill
          priority
          sizes="100vw"
          className="lux-ken-burns object-cover object-[50%_58%] sm:object-[52%_45%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/92 via-background/55 to-transparent sm:from-background/75 sm:via-background/20 sm:to-background" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-background/70 via-background/20 to-transparent sm:block" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background/85 to-transparent sm:hidden" />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pt-28 min-[390px]:px-5 sm:block sm:px-8 sm:pb-20 sm:pt-28 lg:px-12">
        {/* Чип вместо хайрлайна: тонкая линейка-засечка была самой «взрослой»
            деталью первого экрана. */}
        <a
          href={contacts.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${site.region}, ${site.shortName} — открыть точку на Яндекс Картах`}
          className="lux-rise eyebrow chip w-fit transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          style={{ animationDelay: "100ms" }}
        >
          <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-accent" />
          {site.region} · {site.shortName}
          <ExternalLink className="size-3" aria-hidden />
        </a>

        <h1
          className="lux-rise mt-3 max-w-3xl text-balance font-display text-[2.15rem] font-extrabold leading-[1] tracking-[-0.04em] text-foreground [text-shadow:0_2px_18px_rgb(0_0_0/0.55)] min-[390px]:text-[2.35rem] sm:mt-7 sm:text-7xl sm:leading-[0.94] sm:[text-shadow:none] lg:text-[5.5rem]"
          style={{ animationDelay: "220ms" }}
        >
          Усадьба между
          <br />
          двумя озерами
        </h1>

        <p
          className="lux-rise mt-3 max-w-lg text-pretty text-[15px] leading-[1.45] text-foreground/85 sm:mt-8 sm:text-lg"
          style={{ animationDelay: "360ms" }}
        >
          <span className="sm:hidden">Дом, баня, чан и свой причал. Вся усадьба — только для вашей компании.</span>
          <span className="hidden sm:inline">
            Бревенчатый дом 250 м² в сосновом бору. Баня на дровах, сибирский чан под звездами и
            собственный причал. Дом сдается целиком — только для вашей компании.
          </span>
        </p>

        <div
          className="lux-rise mt-auto flex flex-col gap-2.5 pt-10 [&>*]:h-12 [&>*]:w-full sm:mt-10 sm:flex-row sm:items-center sm:gap-3 sm:pt-0 sm:[&>*]:h-auto sm:[&>*]:w-auto"
          style={{ animationDelay: "480ms" }}
        >
          <BookButton>Забронировать даты</BookButton>
          <LuxLink
            href="/estate"
            variant="outline"
            className="border-foreground/30 bg-background/45 backdrop-blur-md sm:bg-transparent sm:backdrop-blur-none"
          >
            Смотреть усадьбу
          </LuxLink>
        </div>

        <WeatherBadge className="lux-rise mt-8 hidden text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-accent sm:inline-block" />

        {/* На телефоне показываем только три действительно полезных параметра,
            остальные детали остаются в полной десктопной полосе. */}
        <dl
          className="lux-rise mt-3 grid grid-cols-3 gap-2 rounded-2xl border border-foreground/15 bg-background/50 p-3.5 backdrop-blur-md sm:mt-12 sm:grid-cols-4 sm:gap-x-8 sm:rounded-3xl sm:border-border sm:bg-card/70 sm:p-7"
          style={{ animationDelay: "620ms" }}
        >
          {[
            { k: "Рейтинг", v: site.rating.value, sub: `${site.rating.count} отзыв на Яндекс Картах`, href: YANDEX_REVIEWS_URL },
            { k: "Площадь", v: "250 м²", sub: "4 спальни с санузлом", href: "/estate" },
            { k: "Формат", v: "дом целиком", sub: "только для вашей компании", href: "/estate" },
            { k: "От Москвы", v: "≈ 5 часов", sub: "точка на Яндекс Картах", href: contacts.mapsUrl },
          ].map((f) => {
            const external = f.href.startsWith("http")
            return (
              <div key={f.k} className={f.k === "Площадь" ? "hidden sm:block" : undefined}>
                <a
                  href={f.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <dt className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground transition-colors group-hover:text-accent sm:eyebrow">
                    {f.k}
                    {external ? <ExternalLink className="size-2.5" aria-hidden /> : null}
                  </dt>
                  <dd className={`mt-1.5 flex items-center gap-1 font-display font-extrabold tracking-[-0.03em] text-foreground sm:mt-2.5 sm:gap-1.5 sm:text-3xl ${f.k === "Формат" ? "max-w-16 text-base leading-tight min-[390px]:text-lg" : "whitespace-nowrap text-base min-[390px]:text-lg"}`}>
                    {f.v}
                    {f.k === "Рейтинг" ? (
                      <Star className="size-3.5 fill-accent text-accent sm:size-4" aria-hidden />
                    ) : null}
                  </dd>
                  <dd className="mt-1 hidden text-xs leading-snug text-muted-foreground sm:mt-1.5 sm:block">
                    {f.sub}
                  </dd>
                </a>
              </div>
            )
          })}
        </dl>
      </div>

      <div className="relative hidden justify-center pb-8 sm:flex">
        <ArrowDown className="size-4 animate-bounce text-accent/70" aria-hidden />
      </div>
    </section>
  )
}
