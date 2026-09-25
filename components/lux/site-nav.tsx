"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MessageCircle, Phone, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { contacts, navigation, secondaryNavigation, site } from "@/lib/site"
import { useBooking } from "@/components/lux/booking-provider"

const WHATSAPP_TEXT = encodeURIComponent("Здравствуйте! Хочу узнать о свободных датах в усадьбе.")

/** Мессенджеры в фирменном стиле печати-медальона — тот же приём, что и в логотипе. */
const socialLinks = [
  { href: `${contacts.whatsapp}?text=${WHATSAPP_TEXT}`, label: "WhatsApp", kind: "icon" as const },
  { href: contacts.vk, label: "ВКонтакте", kind: "text" as const, glyph: "VK" },
]

function SocialRow({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          title={link.label}
          className="group relative flex size-10 shrink-0 items-center justify-center rounded-full text-foreground/80 ring-1 ring-inset ring-current/20 backdrop-blur-sm transition-colors duration-300 hover:text-accent hover:ring-accent/50"
        >
          <span className="absolute inset-0 rounded-full bg-current/[0.06]" aria-hidden="true" />
          {link.kind === "icon" ? (
            <MessageCircle className="relative size-4" aria-hidden="true" />
          ) : (
            <span className="relative font-display text-[0.7rem] font-bold tracking-[-0.02em]" aria-hidden="true">
              {link.glyph}
            </span>
          )}
        </a>
      ))}
    </div>
  )
}

function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group flex min-h-11 items-center justify-center gap-3 leading-none", className)}
      aria-label={`${site.name} — на главную`}
    >
      {/* Печать-медальон со стеклянной подложкой: держит контраст и на фото,
          и на плотной шапке при скролле, но не выглядит как коробка-иконка. */}
      <span
        aria-hidden="true"
        className="relative flex size-9 shrink-0 items-center justify-center rounded-full ring-1 ring-inset ring-current/20 backdrop-blur-sm transition-colors duration-300 group-hover:ring-accent/50 sm:size-10"
      >
        <span className="absolute inset-0 rounded-full bg-current/[0.06]" />
        <Image src="/icon.svg" alt="" width={32} height={32} className="relative size-5 sm:size-[1.4rem]" priority />
      </span>
      <span aria-hidden="true" className="h-7 w-px shrink-0 bg-border/70 sm:h-8" />
      <span className="flex flex-col items-start">
        <span className="font-display text-[1.35rem] font-extrabold tracking-[-0.03em] text-foreground sm:text-2xl">
          Усадьба
        </span>
        <span className="eyebrow mt-1 text-[0.5rem] text-accent transition-colors sm:text-[0.5625rem]">
          в Антропково
        </span>
      </span>
    </Link>
  )
}

export function SiteNav({ transparent = true }: { transparent?: boolean }) {
  const pathname = usePathname()
  const { openBooking } = useBooking()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [everOpened, setEverOpened] = useState(false)

  const openMenu = () => {
    setEverOpened(true)
    setMenuOpen(true)
  }

  // Состояние шапки считаем через IntersectionObserver, а не в обработчике
  // скролла: браузер сам решает, когда пересечь порог, и главный поток свободен.
  useEffect(() => {
    const sentinel = document.createElement("div")
    sentinel.setAttribute("aria-hidden", "true")
    sentinel.style.cssText = "position:absolute;top:24px;left:0;width:1px;height:1px;pointer-events:none"
    document.body.prepend(sentinel)

    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), {
      threshold: 0,
    })
    io.observe(sentinel)

    return () => {
      io.disconnect()
      sentinel.remove()
    }
  }, [])

  // Меню закрывается при переходе на другую страницу
  useEffect(() => setMenuOpen(false), [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener("keydown", onKey)
    }
  }, [menuOpen])

  const solid = scrolled || !transparent

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-150 sm:duration-300",
          // blur включаем только с планшета: на телефоне он заставляет
          // перерисовывать всю полосу на каждом кадре скролла
          solid
            ? // На телефоне blur отключён, поэтому фон должен быть полностью
              // непрозрачным — иначе текст страницы просвечивал сквозь полосу.
              "border-b border-border bg-background sm:bg-background/85 sm:backdrop-blur-lg"
            : "border-b border-transparent",
        )}
      >
        {/* Пока шапка прозрачная, она лежит на фото. На светлых кадрах
            (например, окно с чашками на «Контактах») логотип и «Меню»
            сливались с фоном — мягкая тень сверху возвращает читаемость,
            оставаясь незаметной. */}
        {!solid ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background/70 via-background/25 to-transparent"
          />
        ) : null}

        <nav className="relative mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-2 px-3 min-[390px]:px-4 sm:h-20 sm:px-8 lg:h-24 lg:px-12">
          <button
            type="button"
            onClick={openMenu}
            aria-expanded={menuOpen}
            aria-label="Открыть меню"
            /* -ml-2 + px-2: зона нажатия дорастает до 44px, штрих остаётся на месте */
            className="group -ml-2 flex min-h-11 items-center gap-3 px-2 text-foreground transition-colors hover:text-accent"
          >
            <span aria-hidden="true" className="flex w-6 flex-col gap-[5px]">
              <span className="h-px w-full bg-current transition-all duration-300 group-hover:w-4" />
              <span className="h-px w-full bg-current" />
              <span className="h-px w-4 bg-current transition-all duration-300 group-hover:w-full" />
            </span>
            <span className="eyebrow hidden sm:inline">Меню</span>
          </button>

          {/* На телефоне логотип стоит в потоке: абсолютное центрирование
              накладывало его на кнопку «Забронировать» при ширине ~390px. */}
          <Wordmark className="sm:absolute sm:left-1/2 sm:-translate-x-1/2" />

          <div className="flex items-center gap-2 sm:gap-6">
            <a
              href={contacts.phoneHref}
              className="hidden items-center gap-2 text-[13px] tracking-wide text-foreground/80 transition-colors hover:text-accent lg:flex"
            >
              <Phone className="size-3.5" aria-hidden="true" />
              {contacts.phoneLabel}
            </a>
            <button
              type="button"
              onClick={() => openBooking()}
              /* Залитая лаймовая пилюля обычным кеглем — главное действие
                 должно читаться как кнопка, а не как капительная надпись. */
              className="inline-flex min-h-11 shrink-0 items-center rounded-full bg-accent px-3 text-[12px] font-semibold tracking-[-0.01em] text-accent-foreground transition-all duration-200 hover:brightness-110 active:scale-[0.97] min-[390px]:px-4 min-[390px]:text-[13px] sm:px-6 sm:text-[14px]"
            >
              <span className="min-[360px]:hidden">Даты</span>
              <span className="hidden min-[360px]:inline">Забронировать</span>
            </button>
          </div>
        </nav>
      </header>

      {/* ===== Полноэкранное меню ===== */}
      <div
        className={cn(
          "fixed inset-0 z-60 transition-opacity duration-500",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!menuOpen}
      >
        <div className="absolute inset-0 bg-background" />

        <div className="relative flex h-full flex-col overflow-y-auto pb-[env(safe-area-inset-bottom)] lg:overflow-hidden">
          <div className="flex h-16 shrink-0 items-center justify-between px-3 min-[390px]:px-4 sm:h-20 sm:px-8 lg:px-12">
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Закрыть меню"
              /* -ml-3 + px-3: иконка 20px, зона нажатия дорастает до 44px */
              className="-ml-3 flex min-h-11 items-center gap-3 px-3 text-foreground transition-colors hover:text-accent"
            >
              <X className="size-5" aria-hidden="true" />
              <span className="eyebrow hidden sm:inline">Закрыть</span>
            </button>
            <Wordmark className="absolute left-1/2 -translate-x-1/2" />
            <div className="hidden flex-col items-end gap-3 lg:flex">
              <span className="eyebrow text-muted-foreground">{site.region}</span>
              <SocialRow />
            </div>
          </div>

          <div className="mx-auto grid min-h-0 w-full max-w-[1600px] flex-1 gap-7 px-4 pb-8 pt-2 min-[390px]:px-5 sm:px-8 sm:pb-16 sm:pt-6 lg:grid-cols-[1.15fr_1fr] lg:gap-20 lg:px-12 lg:pb-6 lg:pt-2">
            <ul className="flex flex-col">
              {navigation.map((item, i) => {
                const active = pathname === item.href
                return (
                  <li key={item.href} className="border-b border-border/60">
                    <Link
                      href={item.href}
                      style={{ transitionDelay: menuOpen ? `${120 + i * 45}ms` : "0ms" }}
                      className={cn(
                        "group flex min-h-12 items-center justify-between gap-6 py-2.5 transition-all duration-500 min-[390px]:py-3 sm:py-5 lg:py-2",
                        menuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                      )}
                    >
                      <span
                        className={cn(
                          "font-display text-[1.45rem] font-semibold leading-none transition-colors min-[390px]:text-[1.65rem] sm:text-4xl lg:!text-[1.375rem]",
                          active ? "text-accent" : "text-foreground group-hover:text-accent",
                        )}
                      >
                        {item.label}
                      </span>
                      <span className="hidden max-w-[14rem] text-right text-xs leading-snug text-muted-foreground sm:block lg:text-sm">
                        {item.note}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>

            <div className="flex min-h-0 flex-col justify-between gap-5">
              {/* Кадр грузится только после первого открытия меню — телефон
                  не тратит трафик и память на скрытую картинку */}
              <div className="relative hidden aspect-4/5 w-full max-w-sm overflow-hidden rounded-2xl bg-secondary sm:block lg:ml-auto lg:h-[42vh] lg:max-h-[22rem] lg:aspect-auto">
                {everOpened ? (
                  <Image
                    src="/images/estate/house-autumn.jpg"
                    alt="Дере��янный дом усадьбы среди золотой осенней листвы"
                    fill
                    sizes="(max-width: 1024px) 60vw, 30vw"
                    className={cn(
                      "object-cover transition-all duration-1000",
                      menuOpen ? "scale-100 opacity-100" : "scale-105 opacity-0",
                    )}
                  />
                ) : null}
              </div>

              <div className="flex flex-col gap-5 lg:ml-auto lg:max-w-sm lg:text-right">
                <div className="flex flex-wrap gap-x-6 lg:justify-end">
                  {secondaryNavigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="inline-flex min-h-11 items-center text-[13px] tracking-wide text-muted-foreground transition-colors hover:text-accent"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
                <div className="rule-brass w-full lg:rotate-180" />
                <a
                  href={contacts.phoneHref}
                  className="inline-flex min-h-11 items-center font-display text-2xl font-semibold text-foreground transition-colors hover:text-accent sm:text-3xl lg:justify-end"
                >
                  {contacts.phoneLabel}
                </a>
                <p className="text-[13px] leading-relaxed text-muted-foreground">
                  {contacts.addressFull}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
