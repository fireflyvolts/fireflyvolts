import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Calculator, CheckCircle2, ChevronRight, MessageCircle, ShieldCheck, Truck } from 'lucide-react'
import { BuyBox, Price, ProductCard, ProductImage } from '@/components/store/store-ui'
import { PlaceholderTag } from '@/components/site/placeholders'
import { DatasheetDownload } from '@/components/site/datasheet-download'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { catalog, categoryById, formatPrice, hasPrice, itemBySlug } from '@/lib/catalog'
import { showPlaceholders } from '@/lib/site-mode'

type Params = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return catalog.map((item) => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const item = itemBySlug[(await params).slug]
  if (!item) return {}
  return {
    title: `${item.name} · ${item.model} | Tienda Firefly Volts`,
    description: `${item.summary}${hasPrice(item) ? ` ${formatPrice(item.price)} MXN.` : ''} Entrega en Mérida.`,
    alternates: { canonical: `/tienda/${item.slug}` },
  }
}

export default async function ProductPage({ params }: Params) {
  const item = itemBySlug[(await params).slug]
  if (!item) notFound()
  const category = categoryById[item.category]
  const related = catalog.filter((other) => other.category === item.category && other.slug !== item.slug).slice(0, 4)

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-7xl px-5 pt-6 md:px-8">
          <nav aria-label="Ruta" className="flex flex-wrap items-center gap-1 text-sm font-semibold text-slate-400">
            <Link href="/tienda" className="hover:text-sky-600">Tienda</Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/tienda?categoria=${category.id}`} className="hover:text-sky-600">{category.name}</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-slate-600">{item.name}</span>
          </nav>
        </div>

        <section className="mx-auto grid max-w-7xl gap-10 px-5 py-8 md:px-8 md:py-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-14">
          <div className="grid gap-3">
            <ProductImage item={item} className="aspect-[4/3]" />
            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2].map((index) => (
                <ProductImage key={index} item={item} className="aspect-square" />
              ))}
            </div>
          </div>

          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{item.model}</p>
            <h1 className="mt-2 text-4xl font-black leading-[1] tracking-[-0.04em] md:text-5xl">{item.name}</h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">{item.summary}</p>
            <div className="mt-6">
              <Price item={item} size="lg" />
              {showPlaceholders && <p className="mt-1 flex items-center gap-2 text-xs font-semibold text-slate-400">IVA incluido · Meses sin intereses <PlaceholderTag /></p>}
            </div>

            <ul className="mt-6 grid gap-2">
              {item.highlights.map((highlight) => (
                <li key={highlight} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-sky-500" /> {highlight}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <BuyBox item={item} />
            </div>

            <div className="mt-6 grid gap-3 rounded-2xl bg-slate-50 p-5 text-sm">
              <span className="flex items-center gap-3 font-semibold text-slate-700"><Truck className="h-5 w-5 text-sky-500" /> Entrega en Mérida</span>
              <span className="flex items-center gap-3 font-semibold text-slate-700"><ShieldCheck className="h-5 w-5 text-sky-500" /> Garantía de fábrica Power-All</span>
              <span className="flex items-center gap-3 font-semibold text-slate-700"><MessageCircle className="h-5 w-5 text-sky-500" /> Soporte técnico por WhatsApp</span>
            </div>

            {item.guide && (
              <Link href={item.guide.href} className="group mt-6 flex items-center gap-3 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm font-bold text-sky-800">
                <Calculator className="h-5 w-5 shrink-0" />
                <span className="flex-1">¿No sabes si es el tuyo? Usa la calculadora: {item.guide.label}</span>
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </section>

        <section className="border-y border-slate-200 bg-slate-50 py-14 md:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <h2 className="text-3xl font-black tracking-[-0.03em]">Especificaciones</h2>
              <dl className="mt-6 overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white">
                {item.specs.map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[1fr_1.4fr] gap-4 border-t border-slate-100 px-6 py-3.5 text-sm first:border-t-0">
                    <dt className="font-semibold text-slate-500">{label}</dt>
                    <dd className="font-black text-slate-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <h2 className="text-3xl font-black tracking-[-0.03em]">Ideal para</h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {item.forWho.map((use) => (
                  <span key={use} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700">{use}</span>
                ))}
              </div>
              <div className="mt-8 rounded-[1.5rem] bg-[#061224] p-6 text-white">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-lime-300">¿Algo más grande?</p>
                <p className="mt-3 text-lg font-black">Para empresa, hotel o clínica lo dimensionamos en sitio.</p>
                <Link href="/#soluciones" className="mt-4 inline-flex items-center font-black text-lime-300 hover:text-lime-200">
                  Soluciones para empresas
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <DatasheetDownload product={category.solution} documents={[`Ficha técnica ${item.model}`, 'Manual de usuario', 'Póliza de garantía']} />

        {related.length > 0 && (
          <section className="bg-white pb-20 md:pb-28">
            <div className="mx-auto max-w-7xl px-5 md:px-8">
              <h2 className="text-3xl font-black tracking-[-0.03em]">También en {category.short.toLowerCase()}</h2>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {related.map((other) => (
                  <ProductCard key={other.slug} item={other} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
