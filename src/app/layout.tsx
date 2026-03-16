import type { Metadata } from 'next'
import './globals.css'
import Background from '@/src/components/Background'

export const metadata: Metadata = {
  title: 'Grimório Umbanda',
  description: 'Um portal místico de feitiços, cantigas e conhecimentos da Umbanda',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen overflow-x-hidden">
        <Background />
        <div style={{ position: 'relative', zIndex: 10 }}>
          {children}
        </div>
      </body>
    </html>
  )
}
