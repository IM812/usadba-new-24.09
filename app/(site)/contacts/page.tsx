import type { Metadata } from "next"
import { ArrowUpRight, Phone, MessageCircle, MapPin } from "lucide-react"
import { PageHero } from "@/components/lux/page-hero"
import { BookingCta } from "@/components/lux/booking-cta"
import { Container, Section, SectionHeading, Eyebrow } from "@/components/lux/ui"
import { BookButton } from "@/components/lux/book-button"
import { contacts } from "@/lib/site"
import { getRates } from "@/lib/rates"

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Телефон и WhatsApp усадьбы в Антропково. Отвечаем ежедневно с 9:00 до 22:00 по московскому времени.",
}

const channels = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Написать в WhatsApp",
    note: "Самый быстрый способ связаться",
    href: contacts.whatsapp,
    external: true,
  },
  {
    icon: Phone,
    label: "Телефон",
    value: contacts.phoneLabel,
    note: "Ежедневно с 9:00 до 22:00",
    href: contacts.phoneHref,
    external: false,
  },
]

export default async function ContactsPage() {
  const { settings } = await getRates()

  const facts = [
    { k: "Адрес", v: contacts.addressFull },
    { k: "Координаты", v: "56.383947, 29.831097" },
    { k: "Заезд и выезд", v: `с ${settings.check_in_time} · до ${settings.check_out_time}` },
    { k: "Мы на связи", v: "Ежедневно 9:00 — 22:00 (МСК)" },
  ]

  return (
    <>
      <PageHero
        eyebrow="Контакты"
        title="Напишите нам напрямую"
        lead="Усадьбой занимаются хозяева, а не отдел бронирования. Ответим на любой вопрос — от свободных дат до того, какие сапоги брать в ноябре."
        image="/images/drive/house/terrace-chairs.webp"
        imageAlt="Веранда усадьбы среди золотого осеннего леса"
        size="short"
      />

      {/* Каналы связи */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Способы связи"
            title="Как с нами связаться"
            lead="Обычно отвечаем в течение часа в рабочее время."
          />

          <div className="mt-8 grid grid-cols-1 gap-3 min-[390px]:mt-10 sm:mt-12 sm:grid-cols-2 sm:gap-4">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="surface-2 group flex min-h-48 min-w-0 flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-elev-3 min-[390px]:min-h-52 sm:min-h-64 sm:rounded-3xl sm:p-8"
              >
                <span className="flex items-start justify-between gap-4">
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-accent/40 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                    <c.icon className="size-6" aria-hidden="true" />
                  </span>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent">
                    <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  </span>
                </span>

                <span className="flex min-w-0 flex-col gap-3">
                  <Eyebrow className="text-accent">{c.label}</Eyebrow>
                  <span className="text-balance font-display text-2xl font-semibold tracking-[-0.03em] text-foreground sm:text-3xl lg:text-4xl">
                    {c.value}
                  </span>
                  <span className="text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                    {c.note}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </Container>
      </Section>

      {/* Реквизиты и карта */}
      <Section tone="raised">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col">
              <SectionHeading eyebrow="Где мы находимся" title="Антропково" />
              <dl className="mt-7 flex flex-col sm:mt-10">
                {facts.map((f) => (
                  <div key={f.k} className="flex flex-col gap-1 border-b border-border py-5 first:border-t">
                    <dt className="eyebrow text-muted-foreground">{f.k}</dt>
                    <dd className="text-pretty text-foreground">{f.v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <BookButton>Забронировать даты</BookButton>
                <a
                  href={contacts.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold tracking-[-0.01em] text-foreground/80 transition-colors hover:text-accent"
                >
                  <MapPin className="size-4" />
                  Проложить маршрут
                </a>
              </div>
            </div>

            <div className="relative h-[340px] overflow-hidden rounded-2xl border border-border bg-secondary sm:h-[440px]">
              <iframe
                src={contacts.mapWidget}
                title="Усадьба в Антропково на карте"
                width="100%"
                height="100%"
                className="absolute inset-0 size-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Container>
      </Section>

      <BookingCta
        title="Договоримся о вашем отдыхе"
        lead="Выберите удобные даты — мы лично ответим на вопросы, уточним детали и подготовим усадьбу к вашему приезду."
        image="/images/drive/grounds/pond-evening.webp"
        imageAlt="Вечер у лесного озера рядом с усадьбой"
      />
    </>
  )
}
