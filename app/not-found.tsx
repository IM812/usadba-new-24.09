import { ArrowLeft, Map } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function NotFound() {
  return (
    <main className="relative min-h-svh overflow-hidden bg-background">
      <div aria-hidden="true" className="absolute inset-0 lg:left-[52%]">
        <Image
          src="/images/estate/house-night.jpg"
          alt=""
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 48vw"
          className="object-cover object-[42%_center] opacity-50 lg:opacity-90"
        />
        <div className="absolute inset-0 bg-background/35 lg:bg-background/10" />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/70 to-background lg:bg-gradient-to-r lg:from-background lg:via-background lg:to-transparent"
      />

      <header className="relative z-10 mx-auto flex h-20 w-full max-w-[1600px] items-center justify-between px-5 sm:h-24 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="group flex min-h-11 flex-col justify-center leading-none"
          aria-label="Усадьба в Антропково — на главную"
        >
          <span className="font-display text-xl font-extrabold tracking-[-0.03em] text-foreground sm:text-2xl">
            Усадьба
          </span>
          <span className="mt-1 text-[0.5rem] font-semibold uppercase tracking-[0.22em] text-accent sm:text-[0.5625rem]">
            в Антропково
          </span>
        </Link>

        <span className="rounded-full border border-foreground/15 bg-background/45 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/70 backdrop-blur-md">
          Псковская область
        </span>
      </header>

      <section className="relative z-10 mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-[1600px] items-end px-5 pb-10 sm:min-h-[calc(100svh-6rem)] sm:items-center sm:px-8 sm:pb-16 lg:px-12">
        <div className="flex w-full max-w-2xl flex-col gap-7 lg:max-w-[46%]">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-accent" aria-hidden="true" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent sm:text-sm">
              Вы немного сбились с тропы
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <p aria-hidden="true" className="font-display text-[7.5rem] font-extrabold leading-[0.72] tracking-[-0.09em] text-foreground sm:text-[10rem] lg:text-[12rem]">
              404
            </p>
            <h1 className="max-w-xl text-balance font-display text-3xl font-extrabold leading-[1.05] tracking-[-0.04em] text-foreground sm:text-5xl">
              Такой страницы нет, но усадьба рядом
            </h1>
            <p className="max-w-lg text-pretty text-[15px] leading-relaxed text-foreground/70 sm:text-base">
              Возможно, адрес изменился или в ссылке закралась ошибка. Вернитесь на главную — там начинается дорога к озёрам.
            </p>
          </div>

          <nav aria-label="Навигация со страницы ошибки" className="flex flex-col gap-3 min-[390px]:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-accent px-6 text-[15px] font-semibold tracking-[-0.01em] text-accent-foreground transition-all duration-300 hover:brightness-110 active:scale-[0.97]"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              На главную
            </Link>
            <Link
              href="/estate"
              className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full border border-foreground/25 bg-background/25 px-6 text-[15px] font-semibold tracking-[-0.01em] text-foreground backdrop-blur-md transition-all duration-300 hover:border-accent hover:bg-accent/10 hover:text-accent active:scale-[0.97]"
            >
              <Map className="size-4" aria-hidden="true" />
              Смотреть усадьбу
            </Link>
          </nav>
        </div>
      </section>
    </main>
  )
}
