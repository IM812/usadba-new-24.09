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
    id: 'yandex-nikita-zakharkin',
    name: 'Никита Захаркин',
    date: 'Август 2026',
    rating: 5,
    text: 'Прекрасный дом, уединение и спокойствие. Огромные плюсы: посудомойка, измельчитель, удобные диваны в гостиной, кровати, природа, озеро. Небольшой минус: не удалось поработать, интернет не очень хороший. Пожелание: будет здорово, если будет HDMI-кабель, чтобы подключить свой ноутбук к телевизору.',
  },
  {
    id: 'yandex-svetlana-shaustova',
    name: 'Светлана Шаустова',
    date: 'Май 2025',
    rating: 5,
    text: 'Очень красивое место для отдыха. Тихий, просторный чистый дом для большой компании, имеется вся необходимая современная техника, прекрасно обустроена кухня, зона отдыха у камина. Баня, сибирский чан на берегу озера — отдельный вид блаженства! Приятные, добродушные люди встречают и провожают гостей.',
  },
  {
    id: 'yandex-snezhana-kukhtarova',
    name: 'Снежана Кухтарова',
    date: 'Октябрь 2024',
    rating: 5,
    text: 'Чудесное местечко, чтобы переночевать по дороге в Ореховно или задержаться тут подольше! Дом огромный, просторный — самое то для большой семьи или огромной компании. Уютные спальни, чистые туалетные комнаты, огромная гостиная с камином, кухня с красивой посудой. А какой чудесный вид на озеро, особенно на закате!',
  },
  {
    id: 'yandex-elena',
    name: 'Елена',
    date: 'Июль 2024',
    rating: 5,
    text: 'Провели несколько дней в этом чудесном уединенном месте. 5 часов от Москвы — и вы в усадьбе, с собственным пляжем, баней, чаном на берегу. Дети резвятся, взрослые смотрят на них из окна кухни, неторопливо готовя обед — сказка. Вечером — барбекю, баня, прогулки на лодках и сапбордах. Идеальная перезагрузка.',
  },
  {
    id: 'yandex-allenn',
    name: 'Allenn',
    date: 'Сентябрь 2023',
    rating: 5,
    text: 'Чудесный домик на берегу озера! Очень понравилось здесь отдыхать. Дом оборудован на все 100%, отдельные спальни со своим санузлом и душевой, большая гостиная с камином и окном на озеро, кухня, много посуды, большие столы, стулья. Баня прекрасная и чаша с водой, в которой просто очень круто лежать ночью под звездами!',
  },
  {
    id: 'yandex-anna-danshova',
    name: 'Анна Даньшова',
    date: 'Сентябрь 2023',
    rating: 5,
    text: 'Шикарное место для отдыха в очень живописном месте. Просторный, уютный дом, где хватит места большой компании. В доме есть всё необходимое, даже посудомоечная машина, благодаря которой убраться после застолья не составило труда. Хорошая баня, выход к озеру прямо на территории, а чан просто завоевал наши сердца.',
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
