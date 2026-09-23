import type { Metadata } from "next"
import { Star } from "lucide-react"
import { PageHero } from "@/components/lux/page-hero"
import { BookingCta } from "@/components/lux/booking-cta"
import { ReviewsGrid } from "@/components/lux/reviews-rail"
import { Container, Section, SectionHeading, Eyebrow, TextLink } from "@/components/lux/ui"
import { plural } from "@/lib/availability"
import { YANDEX_REVIEWS_URL, getReviews, getYandexRating } from "@/lib/reviews"

export const metadata: Metadata = {
  title: "Отзывы гостей",
  description:
    "Отзывы гостей об усадьбе между двумя озерами в Псковской области. Актуальный рейтинг и оценки на Яндекс Картах.",
}

/** Из чего складывается репутация — по повторяющимся мотивам в отзывах. */
const themes = [
  {
    title: "Дом больше, чем на фото",
    text: "Гости чаще всего пишут про простор: 250 м², четыре спальни с собственными санузлами и гостиная, за столом которой умещается вся компания.",
  },
  {
    title: "Чисто и уютно",
    text: "В отзывах отмечают чистоту дома, ухоженную территорию и внимание хозяев к подготовке усадьбы перед приездом.",
  },
  {
    title: "Природа и тишина",
    text: "Гостям запоминаются сосновый лес, озера рядом с домом и возможность отдохнуть вдали от городского шума.",
  },
]

// Отзывы редактируются в админке — обновляем раз в 5 минут.
export const revalidate = 300

export default async function ReviewsPage() {
  const [reviews, rating] = await Promise.all([getReviews(), getYandexRating()])

  return (
    <>
      <PageHero
        eyebrow="Отзывы"
        title={`Рейтинг ${rating.value} по отзывам гостей`}
        lead={`${rating.count} ${plural(rating.count, "оценка", "оценки", "оценок")} на Яндекс Картах.`}
        image="/images/drive/living/sofa-window.webp"
        imageAlt="Гостиная усадьбы у больших окон"
        meta={[`${rating.count} ${plural(rating.count, "оценка", "оценки", "оценок")}`, "Яндекс Карты"]}
      />

      {/* Сводка рейтинга */}
      <Section tone="raised" className="py-10 min-[390px]:py-12 sm:py-20 lg:py-24">
        <Container>
          <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-6">
              <span className="font-display text-6xl font-semibold leading-none text-accent sm:text-7xl">
                {rating.value}
              </span>
              <div className="flex flex-col gap-2">
                <span className="flex gap-1" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-accent text-accent" />
                  ))}
                </span>
                <span className="text-sm text-muted-foreground">
                  {`Средняя оценка по ${rating.count} оценкам`}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Eyebrow className="text-muted-foreground">Источник оценок</Eyebrow>
              <TextLink href={YANDEX_REVIEWS_URL}>Открыть отзывы на Яндекс Картах</TextLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* Повторяющиеся мотивы */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Что отмечают чаще всего"
            title="Три вещи, о которых пишут почти все"
          />
          <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:mt-14 sm:grid-cols-3 sm:rounded-none">
            {themes.map((t) => (
              <div key={t.title} className="flex flex-col gap-4 bg-background p-8 lg:p-10">
                <span aria-hidden className="h-px w-10 bg-accent/60" />
                <h3 className="text-pretty font-display text-xl font-semibold leading-snug text-foreground">
                  {t.title}
                </h3>
                <p className="text-pretty text-[15px] leading-relaxed text-muted-foreground">
                  {t.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Сами отзывы */}
        <Section tone="raised">
        <Container>
          <SectionHeading eyebrow="Слово гостям" title="Отзывы без правок" />
          <div className="mt-8 sm:mt-12">
            <ReviewsGrid reviews={reviews} />
          </div>
        </Container>
      </Section>

      <BookingCta
        image="/images/drive/grounds/guests-pier.webp"
        imageAlt="Гости отдыхают на причале у лесного озера"
        title="Поделитесь впечатлениями"
        lead="Расскажем про свободные даты и подготовим усадьбу к вашему приезду."
      />
    </>
  )
}
