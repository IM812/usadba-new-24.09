import type { ReactNode } from "react"
import { Container, Eyebrow } from "@/components/lux/ui"

export function LegalDocument({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string
  title: string
  lead: string
  children: ReactNode
}) {
  return (
    <article className="border-b border-border bg-background">
      <header className="border-b border-border bg-card py-16 sm:py-24 lg:py-32">
        <Container size="narrow">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-6 text-balance font-display text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {lead}
          </p>
        </Container>
      </header>
      <Container size="narrow" className="py-12 sm:py-16 lg:py-24">
        <div className="flex flex-col gap-10 text-[15px] leading-relaxed text-foreground/80 sm:gap-12 sm:text-base">
          {children}
        </div>
      </Container>
    </article>
  )
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-display text-2xl font-semibold leading-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  )
}

export function LegalList({ items }: { items: string[] }) {
  return (
    <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-accent">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

export function LegalTable({ rows }: { rows: Array<[string, string]> }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
        <tbody>
          {rows.map(([label, value]) => (
            <tr key={label} className="border-b border-border last:border-b-0">
              <th scope="row" className="w-1/3 bg-card px-4 py-4 font-semibold text-foreground sm:px-5">
                {label}
              </th>
              <td className="px-4 py-4 sm:px-5">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function LegalNote({ children }: { children: ReactNode }) {
  return <p className="border-l-2 border-accent pl-4 text-muted-foreground">{children}</p>
}

export function LegalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent" href={href}>
      {children}
    </a>
  )
}

export function LegalParagraph({ children }: { children: ReactNode }) {
  return <p>{children}</p>
}

export function LegalNumberedList({ items }: { items: string[] }) {
  return (
    <ol className="flex list-decimal flex-col gap-3 pl-5 marker:font-semibold marker:text-accent">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ol>
  )
}

export function LegalDate() {
  return <p className="text-sm text-muted-foreground">Дата публикации: 24 сентября 2026 года</p>
}

export function LegalContact() {
  return (
    <LegalNote>
      По вопросам обработки персональных данных можно обратиться по телефону{" "}
      <a className="whitespace-nowrap text-accent underline underline-offset-4" href="tel:+79951558842">
        +7 (995) 155-88-42
      </a>{" "}
      или через WhatsApp.
    </LegalNote>
  )
}
