import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Container } from "@/components/lux/ui"

/** Заголовочный блок внутренних страниц: фото на всю ширину и крупная антиква. */
export function PageHero({
  eyebrow,
  title,
  lead,
  image,
  imageAlt,
  meta,
  size = "default",
}: {
  eyebrow: string
  title: React.ReactNode
  lead?: string
  image: string
  imageAlt: string
  meta?: readonly string[]
  /** «short» — для утилитарных страниц, где важнее контент под хиро. */
  size?: "default" | "short"
}) {
  return (
    <section
      className={cn(
        "relative flex items-end overflow-hidden bg-background pb-10 pt-24 sm:pt-28",
        size === "default"
          ? "sm:min-h-[62svh] sm:pb-16"
          : "sm:min-h-[48svh] sm:pb-14",
      )}
    >
      <Image
        src={image || "/placeholder.svg"}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="lux-ken-burns object-cover"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/45 sm:via-background/70 sm:to-background/30"
      />

      <Container size="wide" className="relative">
        <nav aria-label="Хлебные крошки" className="mb-3 sm:mb-6">
          <ol className="eyebrow flex items-center gap-2 text-muted-foreground">
            <li>
              <Link
                href="/"
                className="inline-flex min-h-11 items-center transition-colors hover:text-accent"
              >
                Главная
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-accent">{eyebrow}</li>
          </ol>
        </nav>

        <h1 className="max-w-4xl text-balance font-display text-[2.15rem] font-semibold leading-[1.06] tracking-tight text-foreground min-[390px]:text-[2.5rem] sm:text-6xl lg:text-7xl">
          {title}
        </h1>

        {lead ? (
          <p className="mt-4 max-w-2xl text-pretty text-[15px] leading-relaxed text-foreground/75 sm:mt-6 sm:text-lg">
            {lead}
          </p>
        ) : null}

        {meta?.length ? (
          <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4 sm:mt-10 sm:gap-x-8 sm:gap-y-3 sm:pt-6">
            {meta.map((m) => (
              <li key={m} className="text-[13px] tracking-wide text-foreground/75">
                {m}
              </li>
            ))}
          </ul>
        ) : null}
      </Container>
    </section>
  )
}
