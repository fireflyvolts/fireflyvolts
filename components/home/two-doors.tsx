import Link from 'next/link'
import { ArrowRight, Building2, ShoppingBag } from 'lucide-react'
import { catalog, formatPrice, hasPrice } from '@/lib/catalog'
import { PlaceholderTag } from '@/components/site/placeholders'

const featured = ['estacion-mg13-1800li', 'ups-kr19-2kva', 'regulador-sms-3kva']
  .map((slug) => catalog.find((item) => item.slug === slug))
  .filter((item) => item !== undefined)

/** Splits the home in two: buy now (B2C store) or quote a project (B2B). */
export function TwoDoors() {
  return (
    <section className="bg-white pb-16 md:pb-20">
      <div className="mx-auto grid max-w-7xl gap-5 px-5 md:px-8 lg:grid-cols-2">
        <article className="flex flex-col rounded-[2rem] border-2 border-lime-300 bg-white p-7 md:p-9">
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Casa y negocio pequeño</span>
            <ShoppingBag className="h-7 w-7 text-sky-500" />
          </div>
          <h2 className="mt-5 text-3xl font-black tracking-[-0.03em] md:text-4xl">Compra directo.</h2>
          <p className="mt-3 leading-7 text-slate-600">Estaciones de energía, UPS, reguladores y baterías con precio claro y entrega en Mérida.</p>
          <PlaceholderTag className="mt-5 self-start" />
          <div className="mt-2 grid gap-2">
            {featured.map((item) => (
              <Link key={item.slug} href={`/tienda/${item.slug}`} className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 px-4 py-3 transition hover:border-sky-300 hover:bg-sky-50">
                <span className="text-sm font-bold text-slate-800">{item.name}</span>
                <span className="shrink-0 text-sm font-black text-slate-950">{hasPrice(item) ? formatPrice(item.price) : 'Ver precio'}</span>
              </Link>
            ))}
          </div>
          <Link href="/tienda" className="mt-6 inline-flex h-12 items-center justify-center rounded-xl bg-slate-950 font-black text-white transition hover:bg-sky-600">
            Ir a la tienda
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </article>

        <article className="relative flex flex-col overflow-hidden rounded-[2rem] bg-[#061224] p-7 text-white md:p-9">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(14,165,233,.35),transparent_40%)]" />
          <div className="relative flex items-center justify-between gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-white/50">Empresa, hotel, clínica, industria</span>
            <Building2 className="h-7 w-7 text-lime-300" />
          </div>
          <h2 className="relative mt-5 text-3xl font-black tracking-[-0.03em] md:text-4xl">Cotiza tu proyecto.</h2>
          <p className="relative mt-3 leading-7 text-white/70">BESS, UPS trifásicos, calidad de energía y Power Glass. Medimos, diseñamos y te entregamos una propuesta con tus números.</p>
          <ul className="relative mt-6 grid gap-2 text-sm font-semibold text-white/80">
            {['Diagnóstico en sitio sin costo', 'Equipo dimensionado a tu carga', 'Instalación, puesta en marcha y póliza'].map((point) => (
              <li key={point} className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">{point}</li>
            ))}
          </ul>
          <a href="#soluciones" className="relative mt-6 inline-flex h-12 items-center justify-center rounded-xl bg-lime-300 font-black text-slate-950 transition hover:bg-lime-200">
            Ver soluciones para empresas
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </article>
      </div>
    </section>
  )
}
