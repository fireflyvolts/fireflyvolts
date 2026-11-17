import type { Metadata } from 'next'
import { Activity, ClipboardCheck, FileBarChart, Gauge, Hospital, Hotel, Factory, Search, Waves, Zap } from 'lucide-react'
import { PowerQualityQuiz } from '@/components/calculators/power-quality-quiz'
import { DatasheetDownload } from '@/components/site/datasheet-download'
import { PhotoGallery, ProofBar } from '@/components/site/placeholders'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { CalculatorCard, FeatureGrid, LandingHero, QuoteSection, Section, SectionHeading, Steps } from '@/components/site/landing'

export const metadata: Metadata = {
  title: 'Estudio de calidad de energía en Mérida | Firefly Volts',
  description:
    'Medimos armónicos, factor de potencia, variaciones de voltaje y demanda en tu instalación. Haz el autodiagnóstico y agenda tu estudio.',
  alternates: { canonical: '/calidad-de-energia' },
}

const measures = [
  { icon: Waves, title: 'Variaciones de voltaje', text: 'Bajones, altos y transitorios registrados durante días de operación real.' },
  { icon: Activity, title: 'Armónicos', text: 'La distorsión que calienta cables y transformadores y daña tarjetas de control.' },
  { icon: Gauge, title: 'Factor de potencia', text: 'Lo que CFE te cobra como penalización y cómo corregirlo.' },
  { icon: Zap, title: 'Demanda y desbalance', text: 'Cuánto pide tu instalación, en qué horario y si las fases están parejas.' },
]

const sectors = [
  { icon: Hospital, title: 'Hospitales y clínicas', text: 'Imagenología y equipo sensible donde una falla cuesta millones.' },
  { icon: Hotel, title: 'Hoteles', text: 'Muchos aires, bombas y elevadores trabajando al mismo tiempo.' },
  { icon: Factory, title: 'Plantas y bodegas', text: 'Motores y variadores que generan armónicos y disparos.' },
]

export default function CalidadPage() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <SiteHeader />
      <main>
        <LandingHero
          icon={Search}
          eyebrow="Diagnóstico · Calidad de energía"
          title="Mide antes de comprar."
          highlight="Encuentra la falla real."
          lead="Instalamos un analizador de redes en tu tablero y registramos cómo se comporta tu energía en operación real. Sales con un reporte y un plan, no con una corazonada."
          bullets={['Medición con analizador de redes', 'Reporte con hallazgos y prioridades', 'Plan de corrección con costos']}
          aside={
            <CalculatorCard eyebrow="Autodiagnóstico" title="¿Tu instalación tiene problemas?">
              <PowerQualityQuiz />
            </CalculatorCard>
          }
        />

        <ProofBar testimonial={{ quote: 'El estudio encontró armónicos que nadie había visto. Corregimos eso y dejamos de quemar tarjetas de control.', author: 'Nombre del cliente · Planta en Yucatán' }} />

        <Section tone="muted">
          <SectionHeading eyebrow="Qué medimos" title="Lo que no se ve, pero se paga." text="Cuatro mediciones que explican la mayoría de los equipos dañados, disparos y recibos inflados." />
          <FeatureGrid items={measures} columns={4} />
        </Section>

        <Section tone="dark">
          <SectionHeading eyebrow="Cómo funciona" title="De la medición al plan." tone="dark" />
          <Steps
            items={[
              { title: 'Visita', text: 'Revisamos tablero, cargas principales y recibo de CFE.' },
              { title: 'Medición', text: 'Dejamos el analizador registrando durante tu operación normal.' },
              { title: 'Reporte', text: 'Hallazgos explicados en claro, con gráficas y prioridades.' },
              { title: 'Plan', text: 'Qué corregir primero: regulación, filtros, UPS, BESS o la instalación.' },
            ]}
          />
        </Section>

        <Section>
          <SectionHeading eyebrow="Para quién" title="Si tu operación no puede fallar." />
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold text-slate-700">
            <span className="flex items-center gap-3"><ClipboardCheck className="h-5 w-5 text-sky-500" /> Antes de comprar UPS, reguladores o BESS</span>
            <span className="flex items-center gap-3"><FileBarChart className="h-5 w-5 text-sky-500" /> Cuando se repiten fallas sin explicación</span>
            <span className="flex items-center gap-3"><Gauge className="h-5 w-5 text-sky-500" /> Si CFE te penaliza por factor de potencia</span>
          </div>
          <FeatureGrid items={sectors} />

        </Section>

        <PhotoGallery title="Así se ve un estudio en sitio." photos={['Analizador de redes conectado al tablero principal', 'Gráfica de armónicos del reporte', 'Ingeniero revisando la instalación']} />

        <DatasheetDownload product="calidad" documents={['Ejemplo de reporte de calidad de energía', 'Alcance del estudio y entregables', 'Guía: cómo leer tu recibo de CFE']} />

        <QuoteSection
          product="calidad"
          origin="Landing calidad de energía - formulario"
          title="Agenda tu estudio."
          text="Cuéntanos qué está fallando. Te proponemos fecha de visita y alcance de la medición."
        />
      </main>
      <SiteFooter />
    </div>
  )
}
