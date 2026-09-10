import type { Metadata } from "next"
import { CalendarCheck, MessageCircle, KeyRound } from "lucide-react"

import { PageHero } from "@/components/lux/page-hero"
import { BookingCalendar } from "@/components/lux/booking-calendar"
import { Container, Section, SectionHeading, Eyebrow, TextLink } from "@/components/lux/ui"
import { contacts } from "@/lib/site"
import { getRates } from "@/lib/rates"

export const metadata: Metadata = {
  title: "Бронирование",
  description:
    "Календарь свободных дат усадьбы в Антропково. Выберите даты, посмотрите точную стоимость и отправьте заявку — подтвердим в течение дня.",
}

export const revalidate = 300

const steps = [
  {
    icon: CalendarCheck,
    title: "Выбираете даты",
    text: "Календарь показывает занятые дни в реальном времени — из нашей брони и с Авито.",
  },
  {
    icon: MessageCircle,
    title: "Мы подтверждаем",
    text: "Отвечаем в течение дня: уточняем детали, присылаем условия и реквизиты для предоплаты.",
  },
  {
    icon: KeyRound,
    title: "Приезжаете",
    text: "Дом готов, дрова сложены, встречаем лично. Заказывали баню с чаном — к вашему часу уже протоплены.",
  },
]

export default async function BookingPage() {
  const { settings } = await getRates()

  return (
    <>
      <PageHero
        eyebrow="Бронирование"
        title="Свободные даты усадьбы"
        lead={`Дом сдается целиком: до ${settings.max_guests} гостей, базовое размещение — ${settings.base_guests} человек. Отметьте даты, и мы сразу посчитаем стоимость.`}
        image="/images/estate/autumn-house-new.webp"
        imageAlt="Бревенчатый дом усадьбы среди осенних сосен"
        size="short"
      />

      <Section id="calendar" className="scroll-mt-24">
        <Container size="wide">
          <BookingCalendar />
        </Container>
      </Section>

      <Section tone="raised">
        <Container>
          <SectionHeading
            eyebrow="Как это работает"
            title="Три шага до поездки"
            align="center"
            className="items-center"
          />

          <div className="mt-8 grid gap-6 min-[390px]:gap-7 sm:mt-16 sm:grid-cols-3 sm:gap-10">
            {steps.map((s) => (
              <div key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-x-3 text-left sm:flex sm:flex-col sm:items-center sm:text-center">
                <span className="flex size-10 items-center justify-center rounded-full bg-accent/10"><s.icon className="size-5 text-accent" aria-hidden="true" /></span>
                <h3 className="self-center font-display text-xl font-semibold text-foreground sm:mt-6 sm:text-2xl">{s.title}</h3>
                <p className="col-start-2 mt-2 max-w-xs text-pretty text-[15px] leading-relaxed text-muted-foreground sm:mt-3">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="deep">
        <Container size="narrow" className="text-center">
          <Eyebrow className="justify-center">Нужна помощь</Eyebrow>
          <h2 className="mt-6 text-balance font-display text-[2rem] font-semibold leading-tight text-foreground sm:text-4xl">
            Проще спросить — ответим лично
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-pretty text-[15px] leading-relaxed text-muted-foreground">
            Остались вопросы о дороге, размещении или дополнительных услугах? Напишите — уточним
            детали до подтверждения бронирования.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-10">
            <a
              href={contacts.phoneHref}
              className="inline-flex min-h-11 items-center font-display text-2xl font-semibold text-foreground transition-colors hover:text-accent sm:text-3xl"
            >
              {contacts.phoneLabel}
            </a>
            <TextLink href={contacts.whatsapp}>Написать в WhatsApp</TextLink>
          </div>

        </Container>
      </Section>
    </>
  )
}
