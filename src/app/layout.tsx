import type { Metadata, Viewport } from 'next'
import { Cairo, Josefin_Sans } from 'next/font/google'
import './globals.css'

const josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-josefin',
})

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-cairo',
})

export const metadata: Metadata = {
  title: 'Diagnostic Huile | Turath Oils',
  description: "Diagnostic bilingue pour trouver l'huile naturelle idéale pour la peau et les cheveux.",
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${josefin.variable} ${cairo.variable} min-h-screen bg-cream font-sans text-earth antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  )
}
