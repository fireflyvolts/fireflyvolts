import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BatteryCharging, Building2, Calculator, MessageCircle, PlugZap, ShieldCheck, Truck, Wrench } from 'lucide-react'
import { StoreGrid } from '@/components/store/store-ui'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { catalog, categories, type CategoryId } from '@/lib/catalog'

export const metadata: Metadata = {
  title: 'Tienda: estaciones de energía, UPS y reguladores en Mérida | Firefly Volts',
  description: 'Compra estaciones de energía, UPS, reguladores, supresores y baterías Power-All con entrega en Mérida y asesoría por WhatsApp.',
  alternates: { canonical: '/tienda' },
}

const trust = [
  { icon: ShieldCheck, title: 'Garantía de fábrica', text: 'Equipos Power-All fabricados por Grupo Precisión Control.' },
  { icon: Truck, title: 'Entrega en Mérida', text: 'Te lo llevamos y lo dejamos funcionando.' },
  { icon: MessageCircle, title: 'Asesoría por WhatsApp', text: 'Antes y después de comprar, con un técnico.' },
  { icon: Wrench, title: 'Instalación opcional', text: 'Para reguladores, supresores de tablero y UPS.' },
]

const guides = [
  { href: '/estaciones-de-energia', icon: BatteryCharging, title: '¿Cuántas horas me aguanta?', text: 'Elige tu estación de energía.' },
  { href: '/ups', icon: PlugZap, title: '¿Qué UPS necesito?', text: 'Por equipos y tiempo de respaldo.' },
  { href: '/reguladores', icon: Calculator, title: '¿Qué regulador necesito?', text: 'Por número de aires y equipos.' },
]

export default async function TiendaPage({ searchParams }: { searchParams: Promise<{ categoria?: string }> }) {
  const { categoria } = await searchParams
  const initial = categories.some((category) => category.id === categoria) ? (categoria as CategoryId) : 'todo'

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden border-b border-slate-200">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(14,165,233,.18),transparent_34%),linear-gradient(to_right,rgba(14,165,233,.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,.045)_1px,transparent_1px)] bg-[size:auto,48px_48px,48px_48px]" />
          <div className="relative mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-600">Tienda · Distribuidor Power-All en Mérida</p>
            <h1 className="mt-4 max-w-3xl text-[2.4rem] font-black leading-[1] tracking-[-0.04em] md:text-5xl lg:text-[3.4rem]">
              Compra directo. <span className="text-sky-400">Te lo entregamos funcionando.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Estaciones de energía, UPS, reguladores y baterías para tu casa o negocio. Precio claro, garantía de fábrica y un técnico que te contesta.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {trust.map((item) => (
                <div key={item.title} className="flex gap-3 rounded-2xl border border-slate-200 bg-white/80 p-4">
                  <item.icon className="h-6 w-6 shrink-0 text-sky-500" />
                  <div>
                    <p className="text-sm font-black">{item.title}</p>
                    <p className="text-xs leading-5 text-slate-500">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <StoreGrid items={catalog} initial={initial} />
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-600">¿No sabes cuál?</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] md:text-5xl">Calcula y te decimos el modelo.</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {guides.map((guide) => (
                <Link key={guide.href} href={guide.href} className="group flex items-center gap-4 rounded-[1.5rem] border border-slate-200 bg-white p-6 transition hover:border-sky-300 hover:shadow-lg">
                  <guide.icon className="h-9 w-9 shrink-0 text-sky-500" />
                  <div className="flex-1">
                    <p className="font-black">{guide.title}</p>
                    <p className="text-sm text-slate-500">{guide.text}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-300 transition group-hover:translate-x-1 group-hover:text-sky-500" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#061224] py-16 text-white md:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,233,.25),transparent_40%)]" />
          <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-5 md:flex-row md:items-center md:justify-between md:px-8">
            <div className="max-w-2xl">
              <Building2 className="h-10 w-10 text-lime-300" />
              <h2 className="mt-5 text-3xl font-black tracking-[-0.03em] md:text-5xl">¿Es para tu empresa?</h2>
              <p className="mt-4 text-lg leading-8 text-white/65">
                UPS trifásicos, baterías BESS, estudios de calidad de energía y Power Glass se cotizan por proyecto, con visita y diagnóstico.
              </p>
            </div>
            <Link href="/#soluciones" className="inline-flex h-14 shrink-0 items-center rounded-xl bg-lime-300 px-6 font-black text-slate-950 transition hover:bg-lime-200">
              Ver soluciones para empresas
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
