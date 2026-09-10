"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import type { GuestReview } from "@/lib/reviews"

export function ReviewCard({ review, className }: { review: GuestReview; className?: string }) {
  return (
    <figure className={`flex flex-col rounded-2xl border border-border bg-card p-5 sm:rounded-none sm:border-x-0 sm:border-b-0 sm:bg-transparent sm:px-0 sm:pb-0 sm:pt-6 ${className ?? ""}`}>
      <div className="flex gap-1 text-accent" aria-label={`Оценка ${review.rating} из 5`}>
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} className="size-3 fill-current" aria-hidden />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-pretty font-sans text-[15px] font-medium leading-[1.65] text-foreground/85 sm:mt-5 sm:font-display sm:text-xl sm:font-semibold sm:leading-relaxed">
        {review.text}
      </blockquote>
      <figcaption className="mt-6 flex items-baseline justify-between gap-4 text-[13px]">
        <span className="tracking-wide text-foreground">{review.name}</span>
        <span className="text-muted-foreground">{review.date}</span>
      </figcaption>
    </figure>
  )
}

/** Горизонтальная лента отзывов — свайп на телефоне, стрелки на десктопе. */
export function ReviewsRail({ reviews }: { reviews: GuestReview[] }) {
  const trackRef = useRef<HTMLDivElement>(null)

  const scrollBy = (dir: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: "smooth" })
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="mobile-snap-rail -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-4 pb-2 min-[390px]:-mx-5 min-[390px]:px-5 sm:mx-0 sm:gap-8 sm:px-0"
      >
        {reviews.map((r) => (
          <ReviewCard
            key={r.id}
            review={r}
            className="w-[calc(100vw-2.75rem)] max-w-[23rem] shrink-0 snap-center min-[390px]:w-[calc(100vw-3.5rem)] sm:w-[26rem] sm:max-w-none sm:snap-start"
          />
        ))}
      </div>

      <div className="mt-8 hidden gap-2 sm:flex">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Предыдущие отзывы"
          className="flex size-11 items-center justify-center rounded-2xl border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          <ChevronLeft className="size-4" aria-hidden />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Следующие отзывы"
          className="flex size-11 items-center justify-center rounded-2xl border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          <ChevronRight className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  )
}

/** Полная сетка отзывов для страницы /reviews. */
export function ReviewsGrid({ reviews }: { reviews: GuestReview[] }) {
  return (
    <div className="grid gap-x-12 gap-y-12 md:grid-cols-2">
      {reviews.map((r) => (
        <ReviewCard key={r.id} review={r} />
      ))}
    </div>
  )
}
