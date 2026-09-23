import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Панель управления — Усадьба в Антропково',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Админка использует те же токены, фон и контраст, что и публичный сайт.
  return <div className="theme-admin min-h-screen bg-background text-foreground">{children}</div>
}
