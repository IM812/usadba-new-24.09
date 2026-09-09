"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export function FloorPlan({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => {
    setIsOpen(false)
    requestAnimationFrame(() => triggerRef.current?.focus())
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    closeButtonRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close()
      if (event.key === "Tab") {
        event.preventDefault()
        closeButtonRef.current?.focus()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [close, isOpen])

  return (
    <>
      <figure className={cn("min-w-0", className)}>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsOpen(true)}
          className="group block w-full overflow-hidden rounded-3xl border border-accent/30 bg-background p-2 text-left shadow-2xl shadow-background/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:p-3"
          aria-label="Открыть объёмную планировку дома в полном размере"
        >
          <div className="relative overflow-hidden rounded-2xl bg-foreground">
            <Image
              src="/images/estate/floor-plan-3d-source.jpg"
              alt="Объёмная планировка бревенчатого дома с четырьмя спальнями, гостиной, столовой и кухней"
              width={1491}
              height={1030}
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="h-auto w-full object-contain transition-transform duration-700 group-hover:scale-[1.01]"
            />

            <div className="absolute inset-x-3 bottom-3 flex flex-col gap-1 rounded-2xl border border-foreground/15 bg-background/85 px-4 py-3 backdrop-blur-md sm:inset-x-auto sm:left-5 sm:bottom-5 sm:px-5 sm:py-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent sm:text-xs">
                Планировка дома
              </span>
              <span className="text-xs font-medium text-foreground sm:text-sm">
                4 спальни · гостиная · столовая · кухня
              </span>
            </div>
          </div>
        </button>

        <figcaption className="mt-4 flex flex-col gap-1 text-xs leading-relaxed text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>Объёмная схема жилых помещений усадьбы.</span>
          <span className="text-foreground/70">Нажмите, чтобы рассмотреть план крупнее</span>
        </figcaption>
      </figure>

      {isOpen ? createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Планировка дома"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close()
          }}
          className="fixed inset-0 z-70 flex h-dvh max-h-dvh flex-col overflow-hidden bg-background/97 p-3 backdrop-blur-sm sm:p-5"
        >
          <div className="flex shrink-0 items-center justify-between gap-4 pb-3">
            <div>
              <p className="eyebrow text-accent">Планировка дома</p>
              <p className="mt-1 text-sm text-muted-foreground">4 спальни · гостиная · столовая · кухня</p>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Закрыть планировку"
              className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl bg-secondary">
            <Image
              src="/images/estate/floor-plan-3d-source.jpg"
              alt="Объёмная планировка бревенчатого дома с четырьмя спальнями, гостиной, столовой и кухней"
              fill
              priority
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>,
        document.body,
      ) : null}
    </>
  )
}
