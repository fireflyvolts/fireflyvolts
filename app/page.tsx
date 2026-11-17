import type { Metadata } from 'next'
import {
  ArrowRight,
  BatteryCharging,
  Building2,
  Calculator,
  CheckCircle2,
  ClipboardList,
  Factory,
  Gauge,
  Home,
  Hospital,
  Hotel,
  Mail,
  MapPin,
  Search,
  ShieldCheck,
  Store,
  Wrench,
} from 'lucide-react'
import { NeedFinder } from '@/components/home/need-finder'
import { OutageCalculator } from '@/components/home/outage-calculator'
import { ProductCta } from '@/components/home/product-cta'
import { QuoteForm } from '@/components/home/quote-form'
import { PhotoGallery, ProofBar } from '@/components/site/placeholders'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { products } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Firefly Volts | Energía para negocios en Mérida y Yucatán',
  description:
    'BESS, UPS, reguladores, estudios de calidad de energía y película térmica para negocios en Mérida. Calcula tu ahorro y recibe una propuesta.',
  alternates: { canonical: '/' },
}

const sectors = [
  { icon: Hotel, label: 'Hoteles' },
  { icon: Hospital, label: 'Hospitales y clínicas' },
  { icon: Factory, label: 'Industria y bodegas' },
  { icon: Store, label: 'Comercios y restaurantes' },
  { icon: Building2, label: 'Oficinas y plazas' },
  { icon: Home, label: 'Residencial premium' },
]

const steps = [
  { icon: Search, title: 'Diagnóstico', text: 'Revisamos tu recibo y, si hace falta, medimos tu instalación.' },
  { icon: ClipboardList, title: 'Propuesta', text: 'Equipo dimensionado a tu carga real, con opciones de compra o financiamiento.' },
  { icon: Wrench, title: 'Instalación', text: 'Instalamos, integramos con lo que ya tienes y capacitamos a tu personal.' },
  { icon: Gauge, title: 'Seguimiento', text: 'Mantenimiento preventivo y monitoreo para que el equipo rinda lo prometido.' },
]

const [featured, ...rest] = products

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(14,165,233,.18),transparent_34%),linear-gradient(to_right,rgba(14,165,233,.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,.045)_1px,transparent_1px)] bg-[size:auto,48px_48px,48px_48px]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 md:px-8 md:py-20 lg:grid-cols-[1.08fr_.92fr] lg:gap-14">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
                <MapPin className="h-4 w-4" />
                Mérida · Yucatán
              </div>
              <h1 className="mt-6 max-w-4xl text-[2.6rem] font-black leading-[.96] tracking-[-0.045em] md:text-6xl lg:text-7xl">
                Energía que <span className="text-sky-400">no se cae.</span> Recibos que no te asustan.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 md:text-xl md:leading-8">
                Respaldo, protección y ahorro eléctrico para negocios que no pueden parar. Calcula lo que pierdes hoy y
                recibe una propuesta hecha con tus números, no con un catálogo.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-slate-600">
                {['Diagnóstico sin costo', 'Equipo dimensionado a tu carga', 'Instalación y soporte local'].map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-sky-500" /> {item}
                  </span>
                ))}
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#soluciones"
                  className="inline-flex h-14 items-center rounded-xl bg-slate-950 px-6 font-black text-white transition hover:bg-slate-800"
                >
                  Ver las 5 soluciones
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
                <a
                  href="#calculadora"
                  className="inline-flex h-14 items-center rounded-xl border border-slate-300 bg-white px-6 font-black text-slate-950 transition hover:border-sky-300 hover:bg-sky-50"
                >
                  <Calculator className="mr-2 h-5 w-5 text-sky-500" />
                  ¿Cuánto me cuesta un apagón?
                </a>
              </div>
            </div>
            <NeedFinder />
          </div>
        </section>

        <ProofBar testimonial={{ quote: 'Nos dijeron exactamente qué necesitábamos y por qué. Nada de vendernos el equipo más caro del catálogo.', author: 'Nombre del cliente · Hotel en Mérida' }} />

        {/* Products */}
        <section id="soluciones" className="scroll-mt-20 border-y border-slate-200 bg-slate-50 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-600">Soluciones</p>
                <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.035em] md:text-6xl">
                  Cinco soluciones. Una sola llamada.
                </h2>
              </div>
              <p className="max-w-md leading-7 text-slate-600">
                Cada una con su calculadora para que sepas qué necesitas y cuánto te ahorra antes de hablar con un vendedor.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <article className="relative flex flex-col overflow-hidden rounded-[2rem] bg-[#061224] p-7 text-white md:col-span-2 md:row-span-2 md:p-9">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(14,165,233,.35),transparent_40%)]" />
                <div className="relative flex items-center justify-between gap-4">
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-white/50">{featured.eyebrow}</span>
                  <span className="rounded-full bg-lime-300 px-3 py-1 text-xs font-black text-slate-950">Calculadora disponible</span>
                </div>
                <BatteryCharging className="relative mt-8 h-11 w-11 text-sky-400" />
                <h3 className="relative mt-5 text-3xl font-black tracking-[-0.03em] md:text-5xl">{featured.headline}</h3>
                <p className="relative mt-4 max-w-lg leading-7 text-white/70">{featured.description}</p>
                <svg className="relative mt-8 h-32 w-full" viewBox="0 0 640 160" role="img" aria-label="Pico de demanda recortado por un BESS">
                  <path d="M0 130 L80 120 L140 126 L200 60 L260 14 L320 60 L380 104 L440 96 L520 116 L640 108" fill="none" stroke="#475569" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M0 130 L80 120 L140 126 L200 70 L320 70 L380 104 L440 96 L520 116 L640 108" fill="none" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="0" y1="70" x2="640" y2="70" stroke="#bef264" strokeWidth="2" strokeDasharray="8 8" />
                </svg>
                <div className="relative mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                  <div className="flex flex-wrap gap-2">
                    {featured.audience.map((item) => (
                      <span key={item} className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-white/70">{item}</span>
                    ))}
                  </div>
                  <ProductCta product={featured} tone="dark" />
                </div>
              </article>

              {rest.map((product) => (
                <article
                  key={product.id}
                  className="flex flex-col rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-950/10"
                >
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-slate-400">{product.eyebrow}</span>
                  <h3 className="mt-4 text-xl font-black leading-tight">{product.name}</h3>
                  <p className="mt-2 text-sm font-semibold text-slate-800">{product.headline}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-500">{product.description}</p>
                  <div className="mt-5 flex items-center gap-2 rounded-xl bg-sky-50 px-3 py-2 text-xs font-bold text-sky-700">
                    <Calculator className="h-4 w-4 shrink-0" />
                    {product.tool}
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                    <span className="text-xs font-semibold text-slate-400">{product.audience.join(' · ')}</span>
                    <ProductCta product={product} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Outage calculator */}
        <section id="calculadora" className="relative scroll-mt-20 overflow-hidden bg-[#061224] py-20 text-white md:py-28">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
          <div className="relative mx-auto max-w-7xl px-5 md:px-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-lime-300">Calculadora</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.035em] md:text-6xl">¿Cuánto te cuesta un apagón?</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/65">
              Mueve las barras con los datos de tu negocio. La mayoría se sorprende de cuánto vale una hora parada.
            </p>
            <div className="mt-12">
              <OutageCalculator />
            </div>
          </div>
        </section>

        {/* How we work */}
        <section id="como-trabajamos" className="scroll-mt-20 bg-white py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-600">Cómo trabajamos</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-[-0.035em] md:text-6xl">Primero medimos. Después vendemos.</h2>
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <div key={step.title} className="rounded-[1.5rem] border border-slate-200 p-7">
                  <div className="flex items-center justify-between">
                    <step.icon className="h-8 w-8 text-sky-500" />
                    <span className="font-mono text-lg font-black text-slate-300">0{index + 1}</span>
                  </div>
                  <h3 className="mt-8 text-2xl font-black">{step.title}</h3>
                  <p className="mt-3 leading-7 text-slate-600">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Field example */}
        <section className="border-y border-slate-200 bg-slate-50 py-20 md:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-600">Desde campo</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.035em] md:text-5xl">Así se ve un diagnóstico en Mérida.</h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Una clínica en Altabrisa nos llamó porque su UPS “se quemó” a menos de un año de instalado. En la visita
                encontramos algo más importante que un equipo dañado.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {sectors.map((sector) => (
                  <span key={sector.label} className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
                    <sector.icon className="h-4 w-4 text-sky-500" />
                    {sector.label}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-7">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-red-500">Lo que encontramos</p>
                <ul className="mt-5 grid gap-3 text-sm font-semibold leading-6 text-slate-700">
                  <li>UPS operando en bypass: sin respaldo real.</li>
                  <li>Ningún regulador en equipo médico.</li>
                  <li>Refrigeradores con medicamento sin protección.</li>
                  <li>Sistema solar nuevo sin integrar.</li>
                </ul>
              </div>
              <div className="rounded-[1.5rem] bg-[#061224] p-7 text-white">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-lime-300">Lo que propusimos</p>
                <ul className="mt-5 grid gap-3 text-sm font-semibold leading-6 text-white/80">
                  <li>UPS de 6 kVA para refrigeración crítica.</li>
                  <li>Regulador de 60 kVA para la instalación general.</li>
                  <li>Regulador de 10 kVA integrado al sistema solar.</li>
                  <li>Supresores de picos y mantenimiento el primer año.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <PhotoGallery title="Instalaciones en Mérida y la península." photos={['Sistema BESS instalado en un hotel', 'UPS y regulador en el site de una clínica', 'Equipo Firefly en visita técnica']} />

        {/* Quote */}
        <section id="cotizar" className="relative scroll-mt-20 overflow-hidden bg-[#061224] py-20 text-white md:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(14,165,233,.25),transparent_40%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-lime-300">Cotiza</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.035em] md:text-6xl">Cuéntanos qué necesitas.</h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">
                Un especialista revisa tu caso y te manda una propuesta con equipo, instalación y opciones de pago. Sin compromiso.
              </p>
              <div className="mt-8 grid gap-3 text-sm font-semibold text-white/80">
                <span className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-lime-300" /> Equipos con garantía y póliza de mantenimiento</span>
                <span className="flex items-center gap-3"><MapPin className="h-5 w-5 text-lime-300" /> Visitas técnicas en Mérida y la península</span>
                <a href="mailto:ventas@fireflyvolts.com" className="flex items-center gap-3 hover:text-white"><Mail className="h-5 w-5 text-lime-300" /> ventas@fireflyvolts.com</a>
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 md:p-8">
              <QuoteForm />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
