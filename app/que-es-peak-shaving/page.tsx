import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BatteryCharging,
  CheckCircle2,
  Gauge,
  LineChart,
  ReceiptText,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import { Logo } from '@/components/logo'

const pageUrl = 'https://www.fireflyvolts.com/que-es-peak-shaving'
const diagnosticUrl = '/?utm_source=organic&utm_medium=seo&utm_campaign=peak_shaving_guide#diagnostico'

export const metadata: Metadata = {
  title: '¿Qué es peak shaving? Cómo reducir picos de demanda con BESS',
  description:
    'Conoce qué es peak shaving, cómo funciona con baterías BESS y cuándo puede reducir la demanda máxima y el recibo eléctrico de una empresa.',
  alternates: {
    canonical: '/que-es-peak-shaving',
  },
  openGraph: {
    type: 'article',
    locale: 'es_MX',
    url: '/que-es-peak-shaving',
    siteName: 'Firefly Volts',
    title: '¿Qué es peak shaving y cómo funciona con un sistema BESS?',
    description:
      'Guía para entender la reducción de picos de demanda, su impacto en el recibo y cuándo conviene analizar un sistema de almacenamiento.',
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
    title: '¿Qué es peak shaving y cómo funciona con un sistema BESS?',
    description:
      'Guía para entender la reducción de picos de demanda, su impacto en el recibo y cuándo conviene analizar un sistema de almacenamiento.',
    images: ['/firefly-volts-og.png'],
  },
}

const faqs = [
  {
    question: '¿Qué significa peak shaving?',
    answer:
      'Peak shaving significa recorte de picos. Es una estrategia para limitar la potencia máxima que una instalación toma de la red durante sus momentos de mayor demanda.',
  },
  {
    question: '¿El peak shaving reduce el consumo total de energía?',
    answer:
      'No necesariamente. Su objetivo principal es reducir o controlar la demanda máxima. El consumo total en kWh puede ser parecido, pero la forma y el horario en que se toma energía de la red cambian.',
  },
  {
    question: '¿Cómo se utiliza una batería BESS para peak shaving?',
    answer:
      'El BESS se carga cuando la demanda es menor y descarga cuando la carga de la instalación se acerca a un límite definido. Así aporta parte de la potencia necesaria y evita que todo el pico llegue a la red.',
  },
  {
    question: '¿Todas las empresas pueden ahorrar con peak shaving?',
    answer:
      'No. El resultado depende de la tarifa, la demanda máxima, la duración y frecuencia de los picos, el perfil de carga y el costo del sistema. Por eso se necesita revisar el recibo y medir la curva de demanda antes de dimensionar.',
  },
  {
    question: '¿Peak shaving también funciona como respaldo?',
    answer:
      'Un BESS puede diseñarse para ofrecer ambos servicios, pero peak shaving y respaldo no son lo mismo. Reservar energía para contingencias cambia la capacidad disponible para recortar picos y debe considerarse desde el diseño.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': `${pageUrl}#article`,
      headline: '¿Qué es peak shaving y cómo reduce los picos de demanda?',
      description:
        'Guía sobre peak shaving, demanda máxima, sistemas BESS y los criterios para evaluar un proyecto en una empresa.',
      inLanguage: 'es-MX',
      mainEntityOfPage: pageUrl,
      author: { '@type': 'Organization', name: 'Firefly Volts', url: 'https://www.fireflyvolts.com' },
      publisher: { '@type': 'Organization', name: 'Firefly Volts', url: 'https://www.fireflyvolts.com' },
      datePublished: '2026-07-16',
      dateModified: '2026-07-16',
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.fireflyvolts.com/' },
        { '@type': 'ListItem', position: 2, name: '¿Qué es peak shaving?', item: pageUrl },
      ],
    },
  ],
}

const differences = [
  {
    title: 'Peak shaving',
    text: 'Reduce la demanda máxima que la instalación toma de la red en momentos críticos.',
  },
  {
    title: 'Load shifting',
    text: 'Desplaza consumo entre horarios para aprovechar diferencias en el costo de la energía.',
  },
  {
    title: 'Respaldo',
    text: 'Mantiene cargas definidas durante una falla o variación del suministro.',
  },
]

export default function PeakShavingGuidePage() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5 md:px-8">
          <Link href="/" aria-label="Ir al inicio de Firefly Volts">
            <Logo />
          </Link>
          <Link
            href={diagnosticUrl}
            className="inline-flex h-11 items-center rounded-xl bg-sky-500 px-4 text-sm font-black text-white transition hover:bg-sky-400"
          >
            <span className="sm:hidden">Diagnóstico</span>
            <span className="hidden sm:inline">Analizar mi recibo</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </header>

      <main>
        <article>
          <section className="relative overflow-hidden border-b border-slate-200 bg-white">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_12%,rgba(14,165,233,.18),transparent_32%),linear-gradient(to_right,rgba(14,165,233,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,165,233,.04)_1px,transparent_1px)] bg-[size:auto,48px_48px,48px_48px]" />
            <div className="relative mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
              <nav aria-label="Migas de pan" className="text-sm font-semibold text-slate-500">
                <Link href="/" className="hover:text-sky-600">Inicio</Link>
                <span className="mx-2">/</span>
                <span>Guía de peak shaving</span>
              </nav>
              <div className="mt-9 max-w-4xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-sky-700">
                  <BatteryCharging className="h-4 w-4" />
                  Guía para empresas
                </div>
                <h1 className="mt-6 text-4xl font-black leading-[1.02] tracking-[-0.045em] md:text-7xl">
                  ¿Qué es el peak shaving y cómo reduce los picos de demanda?
                </h1>
                <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
                  El <strong className="text-slate-900">peak shaving</strong>, o recorte de picos, es una estrategia para limitar la potencia máxima que una empresa toma de la red. Con un sistema de baterías BESS, parte de la energía necesaria durante el pico puede venir del almacenamiento en lugar de solicitarse toda al mismo tiempo a la red eléctrica.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link href={diagnosticUrl} className="inline-flex h-13 items-center justify-center rounded-xl bg-sky-500 px-6 font-black text-white hover:bg-sky-400">
                    Revisar si aplica en mi empresa
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <a href="#como-funciona" className="inline-flex h-13 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 font-bold text-slate-700 hover:border-sky-300 hover:text-sky-700">
                    Ver cómo funciona
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-slate-50 py-16 md:py-24">
            <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[.78fr_1.22fr] md:px-8">
              <aside className="md:sticky md:top-28 md:h-fit">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-600">Respuesta corta</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight">Recortar potencia, no apagar la operación.</h2>
              </aside>
              <div className="space-y-6 text-lg leading-8 text-slate-700">
                <p>
                  En una instalación comercial o industrial, el consumo de energía no es constante. Motores, compresores, refrigeración, bombeo, climatización y otros equipos pueden coincidir durante algunos minutos y crear un pico de potencia.
                </p>
                <p>
                  Ese instante puede influir en componentes del recibo relacionados con la demanda. CFE explica, por ejemplo, que en la tarifa GDMTH la demanda máxima medida se determina mensualmente a partir de intervalos de 15 minutos. El peak shaving busca controlar precisamente esos momentos, sin exigir que el negocio detenga su actividad.
                </p>
                <div className="rounded-2xl border border-sky-200 bg-white p-6 shadow-sm">
                  <p className="font-black text-slate-950">La idea central:</p>
                  <p className="mt-2">si la carga de la empresa sube por encima de un límite, el BESS descarga y aporta la diferencia. La red ve un pico menor aunque la operación continúe.</p>
                </div>
              </div>
            </div>
          </section>

          <section id="como-funciona" className="scroll-mt-28 bg-white py-16 md:py-24">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-sky-600">Cómo funciona</p>
              <h2 className="mt-4 max-w-4xl text-4xl font-black tracking-[-0.035em] md:text-6xl">
                Un BESS responde antes de que el pico se convierta en el nuevo máximo.
              </h2>
              <div className="mt-12 grid gap-5 md:grid-cols-2">
                {[
                  { icon: LineChart, title: '1. Mide la carga', text: 'El sistema monitorea continuamente la potencia que la instalación está tomando de la red.' },
                  { icon: Gauge, title: '2. Define un límite', text: 'La estrategia de control establece el umbral de demanda que se quiere proteger.' },
                  { icon: Zap, title: '3. Descarga durante el pico', text: 'Cuando la carga supera el límite, la batería entrega potencia para cubrir la diferencia.' },
                  { icon: BatteryCharging, title: '4. Recupera energía', text: 'Cuando la demanda baja, el sistema vuelve a cargarse conforme a la estrategia operativa.' },
                ].map((step) => (
                  <div key={step.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
                    <step.icon className="h-10 w-10 text-sky-500" />
                    <h3 className="mt-7 text-2xl font-black">{step.title}</h3>
                    <p className="mt-3 leading-7 text-slate-600">{step.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-[#061224] py-16 text-white md:py-24">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-lime-300">Un error común</p>
              <h2 className="mt-4 max-w-4xl text-4xl font-black tracking-[-0.035em] md:text-6xl">
                Demanda máxima y consumo de energía no son lo mismo.
              </h2>
              <div className="mt-12 grid gap-5 md:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-white/[.06] p-8">
                  <div className="font-mono text-sm font-black uppercase tracking-[0.16em] text-sky-400">kW · Potencia</div>
                  <h3 className="mt-4 text-3xl font-black">Qué tan rápido usas energía</h3>
                  <p className="mt-4 leading-8 text-white/65">Representa la carga instantánea o promedio en un intervalo. Los picos de demanda se expresan en kW.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/[.06] p-8">
                  <div className="font-mono text-sm font-black uppercase tracking-[0.16em] text-lime-300">kWh · Energía</div>
                  <h3 className="mt-4 text-3xl font-black">Cuánta energía consumes</h3>
                  <p className="mt-4 leading-8 text-white/65">Acumula el uso a lo largo del tiempo. Una empresa puede mantener un consumo parecido y aun así reducir su pico.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white py-16 md:py-24">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-sky-600">Servicios diferentes</p>
              <h2 className="mt-4 max-w-4xl text-4xl font-black tracking-[-0.035em] md:text-5xl">Peak shaving, load shifting y respaldo pueden convivir, pero no son sinónimos.</h2>
              <div className="mt-12 grid gap-5 md:grid-cols-3">
                {differences.map((item, index) => (
                  <div key={item.title} className="rounded-3xl border border-slate-200 p-7">
                    <span className="font-mono text-sm font-black text-sky-500">0{index + 1}</span>
                    <h3 className="mt-6 text-2xl font-black">{item.title}</h3>
                    <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="border-y border-slate-200 bg-slate-50 py-16 md:py-24">
            <div className="mx-auto grid max-w-6xl gap-12 px-5 md:grid-cols-2 md:px-8">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-sky-600">Cuándo vale la pena analizarlo</p>
                <h2 className="mt-4 text-4xl font-black tracking-[-0.035em]">Señales de que tu operación puede tener una oportunidad.</h2>
              </div>
              <div className="grid gap-4">
                {[
                  'Tu recibo incluye conceptos de demanda o capacidad.',
                  'Tienes motores, refrigeración, bombeo, climatización u otras cargas que coinciden.',
                  'La demanda sube durante periodos cortos y después vuelve a bajar.',
                  'No puedes detener la operación para evitar esos picos.',
                  'Quieres evaluar ahorro, respaldo o ambos dentro del mismo proyecto.',
                ].map((signal) => (
                  <div key={signal} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-500" />
                    <p className="font-semibold leading-7 text-slate-700">{signal}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-white py-16 md:py-24">
            <div className="mx-auto max-w-6xl px-5 md:px-8">
              <div className="max-w-4xl">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-sky-600">Cómo se evalúa</p>
                <h2 className="mt-4 text-4xl font-black tracking-[-0.035em] md:text-6xl">Un recibo permite filtrar. La curva de carga permite dimensionar.</h2>
                <p className="mt-7 text-lg leading-8 text-slate-600">
                  El análisis comienza con la tarifa, la demanda máxima y los cargos del recibo. Después se necesitan datos de intervalos para entender cuándo aparece el pico, cuánto dura y con qué frecuencia se repite. Con esa información se compara el ahorro potencial con la potencia, energía útil, degradación, eficiencia y costo del BESS.
                </p>
              </div>
              <div className="mt-12 grid gap-5 md:grid-cols-3">
                {[
                  { icon: ReceiptText, title: 'Recibo', text: 'Tarifa, demanda, energía, capacidad y distribución.' },
                  { icon: LineChart, title: 'Curva de carga', text: 'Horario, duración, frecuencia y forma de los picos.' },
                  { icon: ShieldCheck, title: 'Modelo técnico-financiero', text: 'Dimensionamiento, estrategia, inversión y desempeño esperado.' },
                ].map((item) => (
                  <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
                    <item.icon className="h-9 w-9 text-sky-500" />
                    <h3 className="mt-6 text-xl font-black">{item.title}</h3>
                    <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
                  </div>
                ))}
              </div>
              <p className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
                No existe un porcentaje universal de ahorro. El resultado depende de cada centro de carga y debe validarse antes de contratar un sistema.
              </p>
            </div>
          </section>

          <section className="bg-slate-50 py-16 md:py-24">
            <div className="mx-auto max-w-4xl px-5 md:px-8">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-sky-600">Preguntas frecuentes</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.035em] md:text-5xl">Dudas sobre peak shaving</h2>
              <div className="mt-10 divide-y divide-slate-200 rounded-3xl border border-slate-200 bg-white px-6 md:px-8">
                {faqs.map((faq) => (
                  <details key={faq.question} className="group py-6">
                    <summary className="cursor-pointer list-none pr-8 text-lg font-black text-slate-950 marker:content-none">
                      {faq.question}
                    </summary>
                    <p className="mt-4 max-w-3xl leading-7 text-slate-600">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-white py-12">
            <div className="mx-auto max-w-4xl px-5 md:px-8">
              <h2 className="text-xl font-black">Fuentes para profundizar</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <li><a className="font-semibold text-sky-700 underline decoration-sky-200 underline-offset-4" href="https://app.cfe.mx/Aplicaciones/CCFE/Tarifas/TarifasCREIndustria/Tarifas/GranDemandaMTH.aspx" target="_blank" rel="noreferrer">CFE: tarifa Gran Demanda en Media Tensión Horaria (GDMTH)</a></li>
                <li><a className="font-semibold text-sky-700 underline decoration-sky-200 underline-offset-4" href="https://app.cfe.mx/Aplicaciones/CCFE/Tarifas/TarifasCRENegocio/Tarifas/GranDemandaBT.aspx/1000" target="_blank" rel="noreferrer">CFE: tarifa Gran Demanda en Baja Tensión (GDBT)</a></li>
                <li><a className="font-semibold text-sky-700 underline decoration-sky-200 underline-offset-4" href="https://www.energy.gov/sites/default/files/2024-01/bess-evaluation-method.pdf" target="_blank" rel="noreferrer">U.S. Department of Energy: método de evaluación de sistemas BESS</a></li>
              </ul>
            </div>
          </section>
        </article>

        <section className="relative overflow-hidden bg-[#061224] py-16 text-white md:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(132,204,22,.14),transparent_28%),linear-gradient(to_right,rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.04)_1px,transparent_1px)] bg-[size:auto,48px_48px,48px_48px]" />
          <div className="relative mx-auto max-w-6xl px-5 text-center md:px-8">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-lime-300">Del concepto a tus números</p>
            <h2 className="mx-auto mt-4 max-w-4xl text-4xl font-black tracking-[-0.035em] md:text-6xl">El primer diagnóstico empieza con tu recibo.</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/65">Revisamos la tarifa, los cargos y la demanda para decirte si vale la pena avanzar a una medición detallada.</p>
            <Link href={diagnosticUrl} className="mt-9 inline-flex h-14 items-center rounded-xl bg-lime-300 px-7 font-black text-slate-950 hover:bg-lime-200">
              Analizar mi recibo sin costo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 md:flex-row md:items-center md:justify-between md:px-8">
          <Logo />
          <div className="flex flex-wrap gap-5 text-sm font-semibold text-slate-600">
            <Link href="/" className="hover:text-sky-600">Soluciones BESS</Link>
            <a href="mailto:ventas@fireflyvolts.com" className="hover:text-sky-600">ventas@fireflyvolts.com</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
