import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ subsets: ["latin"], variable: '--font-sans' });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Firefly Volts | Peak shaving y BESS para empresas',
  description: 'Reduce picos de demanda CFE con un sistema BESS dimensionado para tu operación. Diagnóstico energético sin costo en Mérida y Yucatán.',
  generator: 'v0.app',
  icons: {
    icon: {
      url: '/LOGO_FV-17.png',
      type: 'image/png',
      sizes: '32x32',
    },
    shortcut: '/LOGO_FV-17.png',
    apple: '/apple-icon.jpg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
