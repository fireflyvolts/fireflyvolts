import type { Metadata } from 'next'
import { Building2, Clock, Leaf, Paintbrush, Shield, Snowflake, Sofa, Sun, ThermometerSun } from 'lucide-react'
import { PowerGlassCalculator } from '@/components/calculators/power-glass-calculator'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { CalculatorCard, FeatureGrid, LandingHero, QuoteSection, Section, SectionHeading, Steps } from '@/components/site/landing'

export const metadata: Metadata = {
  title: 'Power Glass: película térmica para ventanas en Mérida | Firefly Volts',
  description:
    'Película térmica que bloquea 92.6 % del calor infrarrojo y 97.7 % de los rayos UV sin cambiar tus ventanas. Calcula tu ahorro en aire acondicionado.',
  alternates: { canonical: '/power-glass' },
}

/** Performance figures from the Power Glass sales deck. */
const comparison = [
  { name: 'Power Glass', ir: '92.8 %', uv: '97.7 %', light: '73.8 %', highlight: true },
  { name: 'Cristal doble', ir: '84.4 %', uv: '79.2 %', light: '64.6 %' },
  { name: 'Cristal templado', ir: '21.8 %', uv: '54.4 %', light: '60.1 %' },
  { name: 'Cristal natural', ir: '27.5 %', uv: '19.9 %', light: '87.2 %' },
  { name: 'Películas económicas', ir: '40–50 %', uv: '50 %', light: '50 %' },
]

const problems = [
  { icon: ThermometerSun, title: 'Calor que entra por el vidrio', text: 'El sol de Yucatán convierte cada ventana en un calentador. El aire acondicionado nunca alcanza.' },
  { icon: Snowflake, title: 'Aires al máximo', text: 'Los equipos trabajan todo el día para compensar. El recibo lo refleja cada bimestre.' },
  { icon: Sofa, title: 'Muebles y producto decolorados', text: 'Los rayos UV dañan tapicería, pisos y mercancía en exhibición.' },
]

const benefits = [
  { icon: Clock, title: 'Instalación en 1 día', text: 'Sin cerrar tu negocio y sin obra civil. Se pega sobre el vidrio que ya tienes.' },
  { icon: Sun, title: 'Luz natural', text: 'Deja pasar la luz visible: el espacio sigue iluminado, solo que más fresco.' },
  { icon: Shield, title: 'Vidrio más seguro', text: 'La película evita que el vidrio se astille si se rompe.' },
  { icon: Leaf, title: 'Cero mantenimiento', text: 'Limpieza normal y 10 años de garantía. Sin costos extra.' },
]

export default function PowerGlassPage() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <SiteHeader />
      <main>
        <LandingHero
          icon={Sun}
          eyebrow="Eficiencia · Power Glass"
          title="Menos calor por la ventana,"
          highlight="menos aire acondicionado."
          lead="Película térmica que se pega sobre tu vidrio actual. Bloquea 92.6 % del calor infrarrojo y 97.7 % de los rayos UV, y deja pasar la luz."
          bullets={['Hasta 5–8 °C más fresco junto a la ventana', 'Instalación en 1 día, sin cerrar', 'Garantía de 10 años']}
          aside={
            <CalculatorCard eyebrow="Calculadora" title="¿Cuánto ahorraría?">
              <PowerGlassCalculator />
            </CalculatorCard>
          }
        />

        <Section tone="muted">
          <SectionHeading eyebrow="El problema" title="Tu negocio pierde dinero por las ventanas." text="Cambiar ventanas toma semanas, obra y cierre. Hay una forma más rápida." />
          <FeatureGrid items={problems} />
        </Section>

        <Section>
          <SectionHeading eyebrow="Comparativa" title="Bloquea el calor, no la luz." text="Porcentaje de bloqueo de calor (IR) y rayos UV, y luz visible que deja pasar." />
          <div className="mt-12 overflow-x-auto rounded-[1.5rem] border border-slate-200">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-slate-50 font-mono text-xs uppercase tracking-[0.14em] text-slate-500">
                <tr>
                  <th className="px-6 py-4">Solución</th>
                  <th className="px-6 py-4">Bloquea calor (IR)</th>
                  <th className="px-6 py-4">Bloquea UV</th>
                  <th className="px-6 py-4">Luz visible</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.name} className={`border-t border-slate-200 ${row.highlight ? 'bg-sky-50 font-black text-slate-950' : 'text-slate-600'}`}>
                    <td className="px-6 py-4">{row.name}</td>
                    <td className="px-6 py-4">{row.ir}</td>
                    <td className="px-6 py-4">{row.uv}</td>
                    <td className="px-6 py-4">{row.light}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section tone="dark">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading eyebrow="Caso de referencia" title="Restaurante con fachada de vidrio." tone="dark" />
              <p className="mt-6 text-lg leading-8 text-white/65">80 m² de ventanas y un recibo de $25,000 al mes.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ['Ahorro', '$7,500–10,000', 'al mes'],
                ['Inversión', '$36,000', '80 m² × $450'],
                ['Recuperación', '4–5 meses', 'después, puro ahorro'],
              ].map(([label, value, note]) => (
                <div key={label} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6">
                  <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-white/50">{label}</p>
                  <p className="mt-3 text-2xl font-black text-lime-300">{value}</p>
                  <p className="mt-1 text-sm text-white/60">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section>
          <SectionHeading eyebrow="Beneficios" title="Más fresco, sin obra." />
          <FeatureGrid items={benefits} columns={4} />
        </Section>

        <Section tone="muted">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <SectionHeading
              eyebrow="¿Nave o techos grandes?"
              title="Complementa con Power Coat."
              text="Pintura térmica para techos que refleja 88.4 % del calor infrarrojo e impermeabiliza. Ventanas más techo: el combo para todo el edificio."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-7">
                <Building2 className="h-9 w-9 text-sky-500" />
                <h3 className="mt-6 text-xl font-black">Power Glass</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Ventanas y fachadas. Oficinas, restaurantes y hoteles.</p>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-7">
                <Paintbrush className="h-9 w-9 text-sky-500" />
                <h3 className="mt-6 text-xl font-black">Power Coat</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">Techos y láminas. Naves, almacenes y silos.</p>
              </div>
            </div>
          </div>
        </Section>

        <Section tone="dark">
          <SectionHeading eyebrow="Proceso" title="Tres pasos y listo." tone="dark" />
          <Steps
            items={[
              { title: 'Visita gratis', text: 'Medimos tus ventanas y techos. Cotización en 24 horas.' },
              { title: 'Instalación', text: 'De 1 a 3 días de trabajo, sin cerrar tu negocio.' },
              { title: 'Ahorro', text: 'Lo notas desde el siguiente recibo.' },
              { title: 'Garantía', text: '10 años de garantía en la película instalada.' },
            ]}
          />
        </Section>

        <QuoteSection
          product="power-glass"
          origin="Landing Power Glass - formulario"
          title="Agenda tu visita gratis."
          text="Medimos tus ventanas y te mandamos la cotización en 24 horas. Sin compromiso."
        />
      </main>
      <SiteFooter />
    </div>
  )
}
