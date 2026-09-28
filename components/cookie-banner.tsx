'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const STORAGE_KEY = 'cookie-consent-accepted'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true)
      }
    } catch {
      setVisible(true)
    }
  }, [])

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // localStorage может быть недоступен (приватный режим) — просто скрываем баннер
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="region"
      aria-label="Уведомление об использовании файлов cookie"
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-border bg-card/95 p-5 shadow-2xl backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Мы используем файлы cookie для работы сайта и улучшения сервиса. Продолжая
          пользоваться сайтом, вы соглашаетесь с{' '}
          <Link href="/consent" className="text-foreground underline underline-offset-2 hover:text-primary">
            политикой обработки персональных данных
          </Link>{' '}
          и{' '}
          <Link href="/privacy" className="text-foreground underline underline-offset-2 hover:text-primary">
            политикой конфиденциальности
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={accept}
          className="shrink-0 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Принять
        </button>
      </div>
    </div>
  )
}
