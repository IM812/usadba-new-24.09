import type { Metadata } from "next"
import Image from "next/image"
import { BookingCta } from "@/components/lux/booking-cta"
import { FloorPlan, FloorPlanLegend } from "@/components/lux/floor-plan"
import { PageHero } from "@/components/lux/page-hero"
import { Container, Divider, Eyebrow, Section, SectionHeading, TextLink } from "@/components/lux/ui"
import { includedInStay, rooms, spaSurcharge, extraGuestPolicy, waterEquipmentPolicy } from "@/lib/site"

export const metadata: Metadata = {
  title: "Усадьба",
  description: "Бревенчатый дом 250 м² с гостиной и камином, четырьмя спальнями и оборудованной кухней. Дом сдается целиком.",
}

const houseNotes = [
  { title: "Кухня", text: "Полностью оборудованная кухня, посудомоечная машина и все необходимое для приготовления еды во время отдыха." },
  { title: "Гостиная", text: "Общая зона с настоящим камином, мягкими диванами, книжными полками и небольшим столом." },
  { title: "Спальни", text: "В доме четыре отдельные спальни. Схему размещения под состав компании подтверждаем до бронирования." },
  { title: "Связь", text: "В доме работает Wi-Fi, поэтому при необходимости можно оставаться на связи." },
]

export default function EstatePage() {
  const livingRoom = rooms[0]
  const bedrooms = rooms[1]

  return (
    <>
      <PageHero eyebrow="Усадьба" title="Бревенчатый дом на 250 квадратных метров" lead="Дом из круглого бревна с гостиной и камином, четырьмя отдельными спальнями и полностью оборудованной кухней." image="/images/estate/house-autumn.jpg" imageAlt="Бревенчатый дом усадьбы целиком среди золотого осеннего леса" meta={["250 м²", "4 спальни", "дом целиком", "до 8 гостей в базовой цене"]} />

      <Section tone="base">
        <Container size="wide">
          <div data-reveal className="max-w-5xl"><SectionHeading eyebrow="Внутри дома" title="Просторные комнаты для отдыха всей компанией" lead="Четыре отдельные спальни, общая гостиная с камином и полностью оборудованная кухня. Показываем фактическую обстановку дома и заранее согласуем размещение." /></div>

          <article data-reveal className="mt-16 grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
            <figure className="relative aspect-4/3 overflow-hidden rounded-2xl bg-secondary lg:aspect-3/2"><Image src={livingRoom.image} alt="Гостиная с мягкими диванами, книжными полками и окнами" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></figure>
            <div className="flex flex-col gap-5"><Eyebrow>{livingRoom.kind}</Eyebrow><h2 className="text-balance font-display text-[1.75rem] font-semibold leading-tight text-foreground sm:text-4xl">{livingRoom.name}</h2><p className="max-w-lg text-pretty text-[15px] leading-relaxed text-muted-foreground sm:text-base">{livingRoom.description}</p><Divider /><ul className="flex flex-wrap gap-x-6 gap-y-2">{livingRoom.features.map((feature) => <li key={feature} className="text-[13px] tracking-wide text-foreground/70">{feature}</li>)}</ul></div>
          </article>

          <article data-reveal className="mt-24 lg:mt-32">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-16"><div className="flex flex-col gap-5"><Eyebrow>{bedrooms.kind}</Eyebrow><h2 className="text-balance font-display text-[1.75rem] font-semibold leading-tight text-foreground sm:text-4xl">{bedrooms.name}</h2><p className="text-pretty text-[15px] leading-relaxed text-muted-foreground sm:text-base">{bedrooms.description}</p></div><ul className="flex flex-wrap gap-x-6 gap-y-2 lg:justify-end">{bedrooms.features.map((feature) => <li key={feature} className="text-[13px] tracking-wide text-foreground/70">{feature}</li>)}</ul></div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-6">{bedrooms.images?.map((src, index) => <figure key={src} className="relative aspect-4/3 overflow-hidden rounded-2xl bg-secondary"><Image src={src} alt={`Спальня усадьбы, фотография ${index + 1}`} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" /></figure>)}</div>
          </article>
        </Container>
      </Section>

      <Section id="floor-plan" tone="raised">
        <Container size="wide">
          <div data-reveal className="max-w-2xl scroll-mt-24">
            <SectionHeading
              eyebrow="Обмерный план"
              title="Планировка дома"
              lead="Точный исходный чертёж без изменений геометрии. Добавлены только обозначения помещений по вашей разметке."
            />
          </div>

          <div data-reveal className="mt-12 grid gap-10 rounded-3xl border border-border bg-card/60 p-5 sm:p-8 lg:grid-cols-[1.55fr_1fr] lg:gap-14 lg:p-12">
            <FloorPlan />
            <div className="flex flex-col lg:justify-center">
              <FloorPlanLegend />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="deep"><Container size="wide"><div data-reveal className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"><SectionHeading eyebrow="Детали" title="То, о чем обычно спрашивают" /><div className="grid gap-x-12 gap-y-10 sm:grid-cols-2">{houseNotes.map((note) => <div key={note.title} className="flex flex-col gap-3 border-t border-border pt-5"><h3 className="font-display text-xl font-semibold text-accent">{note.title}</h3><p className="text-pretty text-[15px] leading-relaxed text-muted-foreground">{note.text}</p></div>)}</div></div></Container></Section>

      <Section tone="base"><Container size="wide"><div data-reveal className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"><div className="flex flex-col gap-8"><SectionHeading eyebrow="Включено" title="Что входит в проживание" lead="Дополнительные услуги и размещение сверх восьми гостей считаются отдельно." /><div className="flex flex-col gap-2 text-[14px] leading-relaxed text-muted-foreground"><p>{extraGuestPolicy.label}.</p><p>{spaSurcharge.short}.</p><p>{waterEquipmentPolicy}</p></div><TextLink href="/prices">Смотреть цены</TextLink></div><ul className="grid gap-x-12 sm:grid-cols-2">{includedInStay.map((item) => <li key={item} className="flex items-baseline gap-4 border-b border-border py-4 text-[15px] leading-relaxed text-foreground/85"><span aria-hidden className="mt-1 inline-block size-1 shrink-0 rounded-full bg-accent" />{item}</li>)}</ul></div></Container></Section>

      <BookingCta title="Посмотрите дом своими глазами" lead="Расскажите, сколько вас и на какие даты — подтвердим размещение и пришлем дополнительные фотографии комнат." image="/images/estate/house-facade.jpg" imageAlt="Фасад бревенчатого дома усадьбы среди сосен" />
    </>
  )
}
