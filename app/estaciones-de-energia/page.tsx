import type { Metadata } from 'next'
import { BatteryCharging, CloudLightning, Home, Laptop, PlugZap, ShieldCheck, Store, Sun, Tent, Timer, VolumeX, Zap } from 'lucide-react'
import Link from 'next/link'
import { formatPrice, itemBySlug } from '@/lib/catalog'
import { PowerStationCalculator } from '@/components/calculators/power-station-calculator'
import { DatasheetDownload } from '@/components/site/datasheet-download'
import { PhotoGallery, PhotoPlaceholder, ProofBar } from '@/components/site/placeholders'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { CalculatorCard, FeatureGrid, LandingHero, QuoteSection, Section, SectionHeading, Steps } from '@/components/site/landing'

export const metadata: Metadata = {
  title: 'Estaciones de energía portátiles en Mérida | Firefly Volts',
  description:
    'Baterías portátiles LiFePO4 Power-All de 512 a 3,840 Wh con función UPS y carga solar. Calcula cuántas horas te aguanta en un apagón.',
  alternates: { canonical: '/estaciones-de-energia' },
}

/** From the Power-All MG+13 vs EcoFlow comparison sheets. */
const lineup = [
  {
    model: 'MG+13-800LI',
    wh: '512 Wh',
    watts: '800 W',
    solar: '200 W',
    weight: '6.5 kg',
    use: 'Módem, laptop, focos y ventilador. Home office y cortes cortos.',
  },
  {
    model: 'MG+13-1800LI',
    wh: '1,024 Wh',
    watts: '1,800 W',
    solar: '500 W',
    weight: '11.6 kg',
    use: 'Refrigerador, TV e internet. La más versátil para casa.',
  },
  {
    model: 'MG+13-2400IL',
    wh: '2,048 Wh',
    watts: '2,400 W',
    solar: '1,200 W',
    weight: '21.6 kg',
    use: 'Casa completa en lo básico o un negocio pequeño. IP54.',
  },
  {
    model: 'MG+13-3600IL',
    wh: '3,840 Wh',
    watts: '3,600 W',
    solar: '2,000 W',
    weight: '42 kg',
    use: 'Negocio o casa grande. Con ruedas y ampliable hasta 11,520 Wh.',
  },
]

const versus = [
  { power: 'MG+13-800LI', eco: 'RIVER 2 Max', edge: '800 W contra 500 W: 60 % más potencia con la misma batería. Más de 3,500 ciclos contra 3,000.' },
  { power: 'MG+13-1800LI', eco: 'DELTA 3 Classic', edge: 'USB-C de 140 W, salidas de 12 V que EcoFlow no trae y más de 4,000 ciclos.' },
  { power: 'MG+13-2400IL', eco: 'DELTA 3 Max', edge: 'Hasta 1,200 W de entrada solar contra 500 W, dos USB-C de 140 W y protección IP54.' },
  { power: 'MG+13-3600IL', eco: 'DELTA PRO', edge: '240 Wh más de batería, 2,000 W solares contra 1,600 W y transferencia UPS menor a 10 ms contra 20 ms.' },
]

const reasons = [
  { icon: CloudLightning, title: 'Tormentas y huracanes', text: 'En temporada de lluvias los cortes en Mérida pueden durar horas. Tú decides qué se queda encendido.' },
  { icon: VolumeX, title: 'Sin ruido ni gasolina', text: 'A diferencia de una planta, funciona dentro de la casa: no hace ruido, no huele y no necesita combustible.' },
  { icon: PlugZap, title: 'Sin instalación', text: 'Llega cargada. La conectas a la pared y tus equipos a ella. Si se va la luz, cambia sola.' },
]

const features = [
  { icon: Timer, title: 'Función UPS', text: 'Transfiere en menos de 10 ms: el módem y la computadora no se apagan.' },
  { icon: Sun, title: 'Carga solar', text: 'Con paneles portátiles se recarga durante el día, aunque la luz tarde en volver.' },
  { icon: ShieldCheck, title: 'Batería LiFePO4', text: 'La química más segura y duradera: de 3,500 a más de 4,000 ciclos de carga.' },
  { icon: Zap, title: 'Onda senoidal pura', text: 'Energía tan limpia como la de la pared. Segura para refrigerador, CPAP y electrónica.' },
]

const uses = [
  { icon: Home, title: 'Casa', text: 'Refrigerador, ventiladores, internet y luz mientras regresa la corriente.' },
  { icon: Laptop, title: 'Home office', text: 'Sigue en tu videollamada aunque se vaya la luz en toda la colonia.' },
  { icon: Store, title: 'Comercio', text: 'Terminal, caja, cámaras e internet: no dejes de cobrar.' },
  { icon: Tent, title: 'Rancho, playa y obra', text: 'Energía donde no llega la red, con recarga solar.' },
]

export default function EstacionesPage() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <SiteHeader />
      <main>
        <LandingHero
          icon={BatteryCharging}
          eyebrow="Nuevo · Estaciones de energía"
          title="Se va la luz."
          highlight="Tu casa sigue."
          lead="Baterías portátiles Power-All de 512 a 3,840 Wh. Mantienen tu refrigerador, ventiladores e internet encendidos durante el apagón, sin planta, sin ruido y sin instalación."
          bullets={['Cambio automático en menos de 10 ms', 'Recarga con la luz o con paneles solares', 'Batería LiFePO4 de más de 3,500 ciclos']}
          aside={
            <CalculatorCard eyebrow="Calculadora" title="¿Cuántas horas me aguanta?">
              <PowerStationCalculator />
            </CalculatorCard>
          }
        />

        <ProofBar testimonial={{ quote: 'Con el último apagón el refri y el internet siguieron como si nada. Los niños ni se dieron cuenta.', author: 'Nombre del cliente · Casa en Mérida' }} />

        <Section tone="muted">
          <SectionHeading eyebrow="Por qué ahora" title="Los apagones no avisan." />
          <FeatureGrid items={reasons} />
        </Section>

        <Section>
          <SectionHeading eyebrow="Modelos" title="Cuatro tamaños. Elige por lo que conectas." text="Todas con contactos de 120 V, USB-A, USB-C, monitoreo desde la app y función UPS." />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {lineup.map((item) => (
              <article key={item.model} className="flex flex-col rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                <PhotoPlaceholder label={`Foto ${item.model}`} className="aspect-[4/3]" />
                <p className="mt-5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Power-All</p>
                <h3 className="mt-1 text-xl font-black">{item.model}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{item.use}</p>
                <dl className="mt-auto grid grid-cols-2 gap-x-3 gap-y-2 border-t border-slate-100 pt-5 text-sm">
                  {[
                    ['Batería', item.wh],
                    ['Potencia', item.watts],
                    ['Solar', item.solar],
                    ['Peso', item.weight],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-xs text-slate-400">{label}</dt>
                      <dd className="font-black text-slate-900">{value}</dd>
                    </div>
                  ))}
                </dl>
                <Link
                  href={`/tienda/estacion-${item.model.replace('+', '').toLowerCase()}`}
                  className="mt-5 inline-flex h-11 items-center justify-between rounded-xl bg-slate-950 px-4 text-sm font-black text-white transition hover:bg-sky-600"
                >
                  Comprar
                  <span>{formatPrice(itemBySlug[`estacion-${item.model.replace('+', '').toLowerCase()}`].price)}</span>
                </Link>
              </article>
            ))}
          </div>
        </Section>

        <Section tone="dark">
          <SectionHeading eyebrow="Frente a EcoFlow" title="Mismo uso, más equipo." tone="dark" text="Cada Power-All contra su equivalente de EcoFlow, según las fichas técnicas de ambos fabricantes." />
          <div className="mt-12 overflow-x-auto rounded-[1.5rem] border border-white/10">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-white/[0.04] font-mono text-xs uppercase tracking-[0.14em] text-white/50">
                <tr>
                  <th className="px-6 py-4">Power-All</th>
                  <th className="px-6 py-4">EcoFlow</th>
                  <th className="px-6 py-4">Ventaja Power-All</th>
                </tr>
              </thead>
              <tbody>
                {versus.map((row) => (
                  <tr key={row.power} className="border-t border-white/10">
                    <td className="px-6 py-4 font-black text-lime-300">{row.power}</td>
                    <td className="px-6 py-4 text-white/60">{row.eco}</td>
                    <td className="px-6 py-4 leading-6 text-white/80">{row.edge}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section>
          <SectionHeading eyebrow="Qué incluye" title="Más que una batería." />
          <FeatureGrid items={features} columns={4} />
        </Section>

        <Section tone="muted">
          <SectionHeading eyebrow="Para qué sirve" title="Donde necesites luz." />
          <FeatureGrid items={uses} columns={4} />
        </Section>

        <Section tone="dark">
          <SectionHeading eyebrow="Cómo comprar" title="De la calculadora a tu casa." tone="dark" />
          <Steps
            items={[
              { title: 'Calcula', text: 'Dinos qué quieres mantener encendido y cuántas horas.' },
              { title: 'Confirmamos', text: 'Revisamos tus equipos por WhatsApp y te mandamos el modelo y precio.' },
              { title: 'Entrega', text: 'Te la llevamos cargada en Mérida y te enseñamos a usarla.' },
              { title: 'Crece', text: 'Agrega paneles solares o baterías de expansión cuando quieras.' },
            ]}
          />
        </Section>

        <PhotoGallery title="En casa, en el negocio, en la playa." photos={['Estación de energía junto al refrigerador durante un apagón', 'Estación con paneles solares portátiles', 'Estación alimentando la caja de un comercio']} />

        <DatasheetDownload
          product="estaciones"
          documents={['Ficha técnica PA MG+13-800LI', 'Ficha técnica PA MG+13-1800LI', 'Ficha técnica PA MG+13-2400IL', 'Ficha técnica PA MG+13-3600IL', 'Comparativo Power-All vs EcoFlow']}
        />

        <QuoteSection
          product="estaciones"
          origin="Landing estaciones de energía - formulario"
          title="Cotiza tu estación."
          text="Mándanos tu cálculo o la lista de lo que quieres conectar. Te respondemos con modelo, precio y tiempo de entrega."
        />
      </main>
      <SiteFooter />
    </div>
  )
}
