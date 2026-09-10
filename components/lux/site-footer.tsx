import Link from "next/link"
import { ExternalLink, MapPin, Phone, Send } from "lucide-react"
import { contacts, navigation, secondaryNavigation, site } from "@/lib/site"
import { Container, Eyebrow } from "@/components/lux/ui"
import { getRates } from "@/lib/rates"
import { getYandexRating, YANDEX_REVIEWS_URL } from "@/lib/reviews"

export async function SiteFooter() {
  const year = new Date().getFullYear()
  const [{ settings }, rating] = await Promise.all([getRates(), getYandexRating()])

  return (
    <footer className="border-t border-border bg-card">
      <Container size="wide" className="py-10 min-[390px]:py-12 lg:py-24">
        <div className="grid gap-9 min-[390px]:gap-10 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
          {/* Лого и подпись */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex flex-col leading-none">
              <span className="font-display text-3xl font-semibold text-foreground">Усадьба</span>
              <span className="eyebrow mt-2 text-accent">в Антропково</span>
            </Link>
            <p className="max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              Бревенчатый дом на 250 м² в сосновом бору между двумя озерами. Сдается целиком, без
              соседей и посторонних.
            </p>
            <a
              href={YANDEX_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${rating.value} из 5,0, ${rating.count} оценок — открыть отзывы на Яндекс Картах`}
              className="inline-flex min-h-11 w-fit items-center gap-1.5 text-[13px] text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:min-h-0"
            >
              <span>
                <span className="text-accent">{rating.value}</span> из 5,0 · {rating.count} оценок на Яндекс Картах
              </span>
              <ExternalLink className="size-3 shrink-0" aria-hidden />
            </a>
          </div>

          {/* Разделы */}
          <nav aria-label="Разделы сайта" className="flex flex-col gap-5">
            <Eyebrow className="text-muted-foreground">Разделы</Eyebrow>
            {/* На телефоне список — основной способ навигации, поэтому
                строки разведены до 44px; на широких экранах шаг прежний. */}
            <ul className="flex flex-col sm:gap-3">
              {[...navigation, ...secondaryNavigation].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex min-h-11 items-center text-sm text-foreground/75 transition-colors hover:text-accent sm:min-h-0"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Контакты */}
          <div className="flex flex-col gap-5">
            <Eyebrow className="text-muted-foreground">Связаться</Eyebrow>
            <a
              href={contacts.phoneHref}
              className="flex min-h-11 items-center gap-3 text-sm text-foreground/75 transition-colors hover:text-accent sm:min-h-0 sm:items-start"
            >
              <Phone className="size-4 shrink-0 text-accent sm:mt-0.5" aria-hidden="true" />
              {contacts.phoneLabel}
            </a>
            <a
              href={contacts.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center gap-3 text-sm text-foreground/75 transition-colors hover:text-accent sm:min-h-0 sm:items-start"
            >
              <Send className="size-4 shrink-0 text-accent sm:mt-0.5" aria-hidden="true" />
              WhatsApp
            </a>
            <a
              href={contacts.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 py-2 text-sm leading-relaxed text-foreground/75 transition-colors hover:text-accent sm:py-0"
            >
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              {contacts.addressFull}
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-[12px] text-muted-foreground sm:mt-14 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:pt-8">
          <p>
            © {year} {site.name}
          </p>
          <p className="text-pretty">
            {`Дом сдается целиком · Заезд с ${settings.check_in_time}, выезд до ${settings.check_out_time} · Условия подтверждаем перед бронированием`}
          </p>
        </div>
      </Container>
    </footer>
  )
}
