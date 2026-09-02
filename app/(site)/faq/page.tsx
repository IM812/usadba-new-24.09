import type { Metadata } from "next"
import { PageHero } from "@/components/lux/page-hero"
import { BookingCta } from "@/components/lux/booking-cta"
import { Container, Section, SectionHeading, TextLink } from "@/components/lux/ui"
import { FaqJsonLd } from "@/components/json-ld"
import { contacts } from "@/lib/site"
import { getFaq } from "@/lib/faq"

export const metadata: Metadata = {
  title: "Вопросы и ответы",
  description:
    "Размещение, минимальный срок, баня и чан, дети и питомцы, магазины и связь — все, что обычно спрашивают перед бронированием усадьбы.",
}

// Ответы собираются из настроек в админке — обновляем раз в 5 минут.
export const revalidate = 300

export default async function FaqPage() {
  const items = await getFaq()

  return (
    <>
      <FaqJsonLd items={items} />

      <PageHero
        eyebrow="Вопросы и ответы"
        title="Все, что спрашивают до приезда"
        lead="Собрали ответы на частые вопросы гостей. Остались детали — напишите нам, все подскажем."
        image="/images/estate/house-night.jpg"
        imageAlt="Освещенный бревенчатый дом усадьбы вечером"
      />

      <Section>
        <Container size="narrow">
          <SectionHeading eyebrow="FAQ" title="Коротко и по делу" />

          <div className="mt-12 flex flex-col">
            {items.map((item) => (
              <details
                key={item.question}
                className="group border-b border-border py-6 first:border-t"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
                  <h2 className="text-pretty font-display text-xl font-semibold leading-snug text-foreground transition-colors group-open:text-accent sm:text-2xl">
                    {item.question}
                  </h2>
                  <span
                    aria-hidden
                    className="relative mt-2.5 size-3.5 shrink-0 text-accent"
                  >
                    <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                    <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current transition-transform duration-300 group-open:scale-y-0" />
                  </span>
                </summary>
                <p className="mt-4 max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>

          <p className="mt-12 text-pretty leading-relaxed text-muted-foreground">
            {"Остались вопросы? Напишите в "}
            <TextLink href={contacts.whatsapp}>WhatsApp</TextLink>
            {", напишите в сообщество "}
            <TextLink href={contacts.vk}>ВКонтакте</TextLink>
            {" или позвоните — "}
            <TextLink href={contacts.phoneHref}>{contacts.phoneLabel}</TextLink>
            {"."}
          </p>
        </Container>
      </Section>

      <BookingCta
        image="/images/estate/house-lawn.jpg"
        imageAlt="Бревенчатый дом усадьбы на зеленой поляне среди сосен"
        title="Проверим ваши даты"
        lead="Отправьте заявку — подтвердим свободные дни и пришлем условия."
      />
    </>
  )
}
