import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen, CheckCircle2, Mail, ReceiptText } from 'lucide-react'
import { Logo } from '@/components/logo'
import { ConversionTracker } from './conversion-tracker'

export const metadata: Metadata = {
  title: 'Gracias por contactarnos | Firefly Volts',
  description: 'Recibimos tus datos para revisar si un sistema BESS puede ayudar a reducir tus picos de demanda.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <ConversionTracker />

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 md:px-8">
          <Link href="/" aria-label="Ir al inicio de Firefly Volts">
            <Logo />
          </Link>
          <a
            href="mailto:ventas@fireflyvolts.com"
            className="inline-flex items-center text-sm font-bold text-slate-600 transition hover:text-sky-600"
          >
            <Mail className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">ventas@fireflyvolts.com</span>
            <span className="sm:hidden">Correo</span>
          </a>
        </div>
      </header>

      <main className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_12%,rgba(14,165,233,.16),transparent_32%),linear-gradient(to_right,rgba(14,165,233,.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,.04)_1px,transparent_1px)] bg-[size:auto,48px_48px,48px_48px]" />
        <div className="relative mx-auto max-w-4xl px-5 py-14 md:px-8 md:py-24">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-2xl shadow-slate-950/8 sm:p-10 md:p-14">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 text-sky-500">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <p className="mt-8 text-sm font-black uppercase tracking-[0.18em] text-sky-600">Solicitud recibida</p>
            <h1 className="mt-3 text-4xl font-black tracking-[-0.04em] sm:text-5xl md:text-6xl">
              Gracias. Ya tenemos tus datos.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Revisaremos la información de tu empresa para entender si vale la pena analizar un sistema BESS y te contactaremos para solicitar el recibo eléctrico.
            </p>

            <div className="mt-9 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:grid-cols-[auto_1fr]">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-sky-500 shadow-sm">
                <ReceiptText className="h-5 w-5" />
              </div>
              <div>
                <p className="font-black">¿Qué sigue?</p>
                <p className="mt-1 leading-7 text-slate-600">
                  Ten a la mano un recibo reciente. Primero validamos tarifa, demanda y perfil de consumo; después te decimos si el proyecto tiene sentido.
                </p>
              </div>
            </div>

            <Link
              href="/que-es-peak-shaving"
              className="group mt-6 flex flex-col gap-5 rounded-2xl border border-sky-200 bg-sky-50 p-6 transition hover:border-sky-300 hover:bg-sky-100/70 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-sky-500 shadow-sm">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-black">Mientras tanto, conoce mejor el peak shaving</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Aprende cómo funciona, qué diferencia hay entre kW y kWh y cuándo conviene evaluar un BESS.
                  </p>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center font-black text-sky-600 group-hover:text-sky-700">
                Aprende más
                <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-slate-950 px-6 font-black text-white transition hover:bg-slate-800"
              >
                Volver al inicio
              </Link>
              <a
                href="mailto:ventas@fireflyvolts.com"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 font-bold text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
              >
                Escribir a ventas
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
