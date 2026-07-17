import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/next'
import { MetaPixel } from '@/components/meta-pixel'
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
    images: [
      {
        url: '/firefly-volts-og.png',
        width: 1200,
        height: 630,
        alt: 'Firefly Volts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Peak shaving y BESS para empresas | Firefly Volts',
    description: 'Reduce picos de demanda CFE con un sistema BESS dimensionado para tu operación.',
    images: ['/firefly-volts-og.png'],
  },
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/favicon-firefly-96.png',
        type: 'image/png',
        sizes: '96x96',
      },
      {
        url: '/LOGO_FV-17.png',
        type: 'image/png',
        sizes: '32x32',
      },
    ],
    shortcut: '/favicon-firefly-96.png',
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
        <MetaPixel />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
