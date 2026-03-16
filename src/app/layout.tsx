import type { Metadata } from 'next'
import { Cinzel, Lato } from 'next/font/google'
import './globals.css'

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-cinzel',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
})

export const metadata: Metadata = {
  title: 'Grimório Umbanda',
  description: 'Um portal místico de feitiços, cantigas e conhecimentos da Umbanda',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${cinzel.variable} ${lato.variable}`}>
      <body className="bg-[#0d0626] min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
