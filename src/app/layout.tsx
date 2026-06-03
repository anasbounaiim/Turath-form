import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Diagnostic Huile | Turath Oils',
  description: "Diagnostic bilingue pour trouver l'huile naturelle idéale pour la peau et les cheveux.",
  icons: {
    icon: [{ url: '/favicon.ico?v=turath-1', type: 'image/x-icon' }],
    shortcut: '/favicon.ico?v=turath-1',
  },
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
      <body className="min-h-screen bg-brand-background font-sans text-brand-text antialiased">
        <main>{children}</main>
      </body>
    </html>
  )
}
