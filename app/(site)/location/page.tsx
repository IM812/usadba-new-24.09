import type { Metadata } from "next"
import { ArrowUpRight } from "lucide-react"
import { PageHero } from "@/components/lux/page-hero"
import { BookingCta } from "@/components/lux/booking-cta"
import { Container, Section, SectionHeading, Eyebrow } from "@/components/lux/ui"
import { contacts, routes } from "@/lib/site"

export const metadata: Metadata = {
  title: "Как добраться",
  description:
    "Усадьба в Псковской области, Новосокольнический район. Около пяти часов от Москвы и четырех от Санкт-Петербурга: маршруты и карта.",
}

const nearby = [
  { place: "Великие Луки", value: "35 км", note: "ближайший крупный город" },
  { place: "Ближайшее озеро", value: "50 м", note: "пляж и причал рядом с домом" },
  { place: "Москва", value: "≈ 5 ч", note: "по трассе М9 через Великие Луки" },
  { place: "Санкт-Петербург", value: "≈ 4 ч", note: "по трассе М20 через Псков" },
]

export default function LocationPage() {
  return (
    <>
      <PageHero
        eyebrow="Как добраться"
        title="5 часов от Москвы — и другая жизнь"
        lead="Усадьба стоит в сосновом лесу Новосокольнического района Псковской области. Дорога асфальтовая до самых ворот."
        image="/images/estate/house-lawn.jpg"
        imageAlt="Усадьба на своем участке среди сосен"
        meta={[contacts.addressShort, "56.3839, 29.8311"]}
      />

      {/* Маршруты */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Три способа доехать"
            title="Выберите свой маршрут"
            lead="Выберите маршрут из Москвы или Санкт-Петербурга — откроются Яндекс Карты с дорогой до усадьбы. Вариант на поезде приведён для справки."
          />
          <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {routes.map((r) => {
              const body = (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <Eyebrow className="text-accent">{r.from}</Eyebrow>
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent">
                      <ArrowUpRight
                        className={`size-5 transition-transform duration-300 ${r.href ? "group-hover:translate-x-0.5 group-hover:-translate-y-0.5" : "rotate-45"}`}
                        aria-hidden="true"
                      />
                    </span>
                  </div>

                  <div className="mt-10 flex min-w-0 flex-col gap-4">
                    <span className="text-balance font-display text-4xl font-semibold leading-tight tracking-[-0.04em] text-foreground">
                      {r.duration}
                    </span>
                    <span className="self-start rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                      {r.distance}
                    </span>
                  </div>

                  <p className="mt-6 text-pretty text-[15px] leading-relaxed text-muted-foreground">
                    {r.description}
                  </p>

                  <span className="mt-auto flex items-center gap-2 pt-8 text-sm font-semibold text-foreground/80 transition-colors group-hover:text-accent">
                    {r.href ? "Открыть маршрут" : "Справочная информация"}
                    {r.href ? <ArrowUpRight className="size-4" aria-hidden="true" /> : null}
                  </span>
                </>
              )
              return r.href ? (
                <a
                  key={r.id}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="surface-2 group flex min-h-96 flex-col rounded-3xl border border-border bg-card p-6 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-elev-3 sm:p-8"
                >
                  {body}
                </a>
              ) : (
                <div
                  key={r.id}
                  className="surface-2 group flex min-h-96 flex-col rounded-3xl border border-border bg-card p-6 sm:p-8"
                >
                  {body}
                </div>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* Карта + что рядом */}
      <Section tone="raised">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <div className="relative order-2 h-[360px] overflow-hidden rounded-2xl border border-border bg-secondary sm:h-[460px] lg:order-1">
              <iframe
                src={contacts.mapWidget}
                title="Расположение усадьбы на карте"
                width="100%"
                height="100%"
                className="absolute inset-0 size-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="order-1 flex flex-col justify-center lg:order-2">
              <SectionHeading eyebrow="Что рядом" title="Ориентиры вокруг" />
              <dl className="mt-10 flex flex-col">
                {nearby.map((n) => (
                  <div
                    key={n.place}
                    className="flex items-baseline justify-between gap-4 border-b border-border py-5 first:border-t"
                  >
                    <dt className="flex flex-col">
                      <span className="text-pretty text-foreground">{n.place}</span>
                      <span className="text-sm text-muted-foreground">{n.note}</span>
                    </dt>
                    <dd className="shrink-0 font-display text-2xl font-semibold text-accent">
                      {n.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <a
                href={contacts.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex min-h-11 items-center gap-2 self-start text-[15px] font-semibold tracking-[-0.01em] text-foreground/80 transition-colors hover:text-accent"
              >
                Открыть на Яндекс Картах
                <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </Container>
      </Section>

      <BookingCta
        image="/images/estate/aerial-between-lakes-new.webp"
        imageAlt="Усадьба в сосновом лесу между двумя озёрами"
        title="Готовы приехать?"
        lead="Подскажем удобный автомобильный маршрут и ответим на вопросы перед поездкой."
      />
    </>
  )
}
