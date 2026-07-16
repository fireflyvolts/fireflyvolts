import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({ subsets: ["latin"], variable: '--font-sans' });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: '--font-mono' });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.fireflyvolts.com'),
  title: 'Firefly Volts | Peak shaving y BESS para empresas',
  description: 'Reduce picos de demanda CFE con un sistema BESS dimensionado para tu operación. Diagnóstico energético sin costo en Mérida y Yucatán.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: 'Firefly Volts',
    title: 'Peak shaving y BESS para empresas | Firefly Volts',
    description: 'Reduce picos de demanda CFE con un sistema BESS dimensionado para tu operación.',
    url: '/',
  },
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
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-340JFFWW76"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-340JFFWW76');
gtag('config', 'AW-18325533736');`}
        </Script>
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
