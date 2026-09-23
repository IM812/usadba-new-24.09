import { cache } from 'react'
import { site } from '@/lib/site'

export const YANDEX_REVIEWS_URL =
  'https://yandex.ru/maps/org/usadba_v_antropkovo/216703670267/reviews/'

export type YandexRating = {
  value: string
  count: number
}

function readNumber(html: string, key: string) {
  const metaMatch = html.match(
    new RegExp(`<meta[^>]+(?:itemprop|property)=["']${key}["'][^>]+content=["']([^"']+)["']`, 'i'),
  )
  if (metaMatch) return Number(metaMatch[1].replace(',', '.'))

  const jsonMatch = html.match(
    new RegExp(`["']${key}["']\\s*:\\s*["']?([0-9]+(?:[.,][0-9]+)?)`, 'i'),
  )
  return jsonMatch ? Number(jsonMatch[1].replace(',', '.')) : Number.NaN
}

/**
 * Забирает рейтинг и количество оценок из карточки Яндекс Карт.
 * Next.js обновляет ответ автоматически раз в час, а при сбое оставляет fallback.
 */
export const getYandexRating = cache(async function getYandexRating(): Promise<YandexRating> {
  const fallback = {
    value: site.rating.value,
    count: site.rating.count,
  }

  try {
    const response = await fetch(YANDEX_REVIEWS_URL, {
      headers: {
        'Accept-Language': 'ru-RU,ru;q=0.9',
        'User-Agent': 'Mozilla/5.0 (compatible; AntropkovoWebsite/1.0)',
      },
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    })

    if (!response.ok) return fallback

    const html = await response.text()
    const ratingValue = readNumber(html, 'ratingValue')
    const ratingCount = readNumber(html, 'ratingCount')
    if (!Number.isFinite(ratingValue) || !Number.isInteger(ratingCount) || ratingCount < 1) {
      return fallback
    }

    return {
      value: ratingValue.toLocaleString('ru-RU', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }),
      count: ratingCount,
    }
  } catch {
    return fallback
  }
})

export type GuestReview = {
  id: string
  name: string
  date: string
  rating: number
  text: string
}

/** Реальные отзывы с Яндекс Карт — используются, пока база пуста. */
export const fallbackReviews: GuestReview[] = [
  {
    id: 'r1',
    name: 'Гость усадьбы',
    date: 'Ноябрь 2024',
    rating: 5,
    text: 'Отлично провели время всей семьёй: двое взрослых и трое детей. Мега чистая территория, ухоженный дом, четыре спальни и в каждой свой туалет и душ. Место очень красивое — наловили рыбы, набрали грибов, надышались свежим воздухом.',
  },
  {
    id: 'r2',
    name: 'Гость усадьбы',
    date: 'Сентябрь 2024',
    rating: 5,
    text: 'Пять часов от Москвы — и вы в усадьбе с собственным пляжем, баней и чаном на берегу. Дети резвятся, взрослые смотрят на них из окна кухни, неторопливо готовя обед. Сказка.',
  },
  {
    id: 'r3',
    name: 'Гость усадьбы',
    date: 'Июнь 2025',
    rating: 5,
    text: 'Мега прекрасное место в Псковской области. Красиво, уютно, пение птиц, ароматы цветов и леса. Шикарный дом — просторный, современный, кухня оборудована всем необходимым. Море развлечений: баня, чан, рыбалка, велосипеды, лодка, сап-сёрф.',
  },
  {
    id: 'r4',
    name: 'Гость усадьбы',
    date: 'Сентябрь 2023',
    rating: 5,
    text: 'Дом огромный, просторный — самое то для большой семьи. Уютные спальни, чистые санузлы, огромная гостиная с камином. Баня и сибирский чан на берегу озера — отдельный вид блаженства.',
  },
  {
    id: 'r5',
    name: 'Гость усадьбы',
    date: 'Декабрь 2023',
    rating: 5,
    text: 'Шикарное место, очень уютно и комфортно. А какая атмосфера и вид зимой! Никого из гостей не оставили равнодушными баня и чан — это восторг.',
  },
  {
    id: 'r6',
    name: 'Гость усадьбы',
    date: 'Июль 2024',
    rating: 5,
    text: 'Чувствуется, что хозяева вложили сердце и большой труд в усадьбу. И внутри, и снаружи уютно и комфортно, есть всё необходимое. Уезжать не хотелось.',
  },
]

/**
 * Отзывы для серверного рендеринга.
 *
 * Раньше страницы тянули их на клиенте через /api/admin/reviews: гость видел
 * заглушку, потом текст подменялся, а поисковики контента не получали вовсе.
 */
export const getReviews = cache(async function getReviews(): Promise<GuestReview[]> {
  try {
    const { createServiceClient } = await import('@/lib/supabase/server')
    const supabase = createServiceClient()

    const { data } = await supabase.from('reviews').select('*').order('sort_order')
    if (!data?.length) return fallbackReviews

    return data.map((r, i) => ({
      id: String(r.id ?? `db-${i}`),
      name: r.author_name ?? r.name ?? 'Гость усадьбы',
      date:
        r.date ??
        (r.created_at
          ? new Date(r.created_at).toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })
          : ''),
      rating: r.rating ?? 5,
      text: r.text,
    }))
  } catch (err) {
    console.error('[reviews] failed to load', err)
    return fallbackReviews
  }
})
