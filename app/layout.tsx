import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Source_Sans_3 } from "next/font/google"
import "./globals.css"
import { I18nProvider } from "@/lib/i18n/context"
import { KeepAlive } from "@/components/keep-alive"
import { Providers } from "@/components/session-provider"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "700"],
})

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans",
  weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
  title: "Mox Voyage - Agence de Voyage Professionnelle",
  description:
    "Découvrez le monde avec Mox Voyage. Voyages organisés, séjours touristiques et billets d'avion pour particuliers et entreprises.",
  generator: "v0.app",
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${sourceSans.variable} antialiased`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="font-sans">
        <Providers>
          <I18nProvider>{children}</I18nProvider>
          <KeepAlive />
        </Providers>
      </body>
    </html>
  )
}
