import type { Metadata } from 'next'
import { Factory, Flame, Gauge, Home, ShieldAlert, ShieldCheck, Store, Timer, Waves, Zap } from 'lucide-react'
import { RegulatorCalculator } from '@/components/calculators/regulator-calculator'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { CalculatorCard, FeatureGrid, LandingHero, QuoteSection, Section, SectionHeading, Steps } from '@/components/site/landing'

export const metadata: Metadata = {
  title: 'Reguladores de voltaje y supresores de picos en Mérida | Firefly Volts',
  description:
    'Protege tus minisplits, bombas y equipos de las variaciones de voltaje. Calcula el regulador que necesitas según tus aires y recibe tu cotización.',
  alternates: { canonical: '/reguladores' },
}

const problems = [
  { icon: Waves, title: 'Bajones en horas pico', text: 'Con todos los aires prendidos el voltaje cae. Los compresores trabajan forzados y se calientan.' },
  { icon: Zap, title: 'Picos al regresar la luz', text: 'Cuando la energía vuelve llega con un golpe. Ahí se queman tarjetas inverter y fuentes.' },
  { icon: Flame, title: 'Reparaciones que se repiten', text: 'Cambiar una tarjeta de minisplit cuesta miles de pesos. Y vuelve a pasar si no se corrige la causa.' },
]

const lines = [
  { icon: Home, tag: '1–15 kVA', title: 'Residencial y oficina', text: 'Reguladores servo en 120 o 220 V con retardo de arranque, bypass y display. Para casas con varios aires.' },
  { icon: Store, tag: '10–30 kVA', title: 'Comercial', text: 'Reguladores bifásicos y trifásicos sobre ruedas para restaurantes, consultorios y tiendas.' },
  { icon: Factory, tag: '30–350 kVA', title: 'Industrial', text: 'Estabilizadores trifásicos con booster y monitoreo IoT para proteger toda una instalación.' },
]

const protection = [
  { icon: Gauge, title: 'Regulador', text: 'Corrige bajones y altos de voltaje todo el tiempo. Tus equipos reciben siempre lo que esperan.' },
  { icon: ShieldAlert, title: 'Supresor de picos', text: 'Absorbe descargas y transitorios que un regulador solo no alcanza a frenar.' },
  { icon: Timer, title: 'Retardo de arranque', text: 'Espera unos segundos antes de reconectar tras un corte para que los compresores no arranquen en falso.' },
  { icon: ShieldCheck, title: 'Póliza incluida', text: 'Puesta en marcha y visitas preventivas, con garantía extendida disponible.' },
]

export default function ReguladoresPage() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <SiteHeader />
      <main>
        <LandingHero
          icon={Gauge}
          eyebrow="Protección · Reguladores y supresores"
          title="Tus aires y equipos,"
          highlight="a salvo de las variaciones."
          lead="En Mérida los minisplits trabajan casi todo el año y la red no siempre aguanta. Un regulador con supresor evita que cada bajón o pico se convierta en una reparación."
          bullets={['Dimensionado según tus aires y equipos', 'Residencial, comercial e industrial', 'Instalación y póliza de mantenimiento']}
          aside={
            <CalculatorCard eyebrow="Selector" title="¿Qué regulador necesito?">
              <RegulatorCalculator />
            </CalculatorCard>
          }
        />

        <Section tone="muted">
          <SectionHeading eyebrow="El problema" title="Lo que quema tus aires no es el calor." />
          <FeatureGrid items={problems} />
        </Section>

        <Section>
          <SectionHeading eyebrow="Protección completa" title="Regulador + supresor: la pareja que funciona." text="Cada uno cubre un tipo de falla distinto. Juntos protegen el equipo y extienden su vida." />
          <FeatureGrid items={protection} columns={4} />
        </Section>

        <Section tone="dark">
          <SectionHeading eyebrow="Líneas" title="Del departamento a la planta." tone="dark" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {lines.map((line) => (
              <div key={line.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-7">
                <div className="flex items-center justify-between">
                  <line.icon className="h-9 w-9 text-sky-400" />
                  <span className="rounded-full bg-lime-300 px-3 py-1 text-xs font-black text-slate-950">{line.tag}</span>
                </div>
                <h3 className="mt-7 text-2xl font-black">{line.title}</h3>
                <p className="mt-3 leading-7 text-white/65">{line.text}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <SectionHeading eyebrow="Cómo trabajamos" title="Medimos, proponemos, instalamos." />
          <Steps
              tone="light"
              items={[
                { title: 'Revisión', text: 'Contamos tus aires y equipos y revisamos el voltaje de tu instalación.' },
                { title: 'Propuesta', text: 'Regulador, supresor e instalación en una sola cotización.' },
                { title: 'Instalación', text: 'Conexión al tablero con interruptores y bypass para mantenimiento.' },
                { title: 'Póliza', text: 'Visitas preventivas para que el equipo regule como el primer día.' },
              ]}
            />
        </Section>

        <QuoteSection
          product="reguladores"
          origin="Landing reguladores - formulario de cotización"
          title="Protege tus equipos hoy."
          text="Mándanos tu cálculo o cuántos aires tienes. Te respondemos con regulador, supresor e instalación."
        />
      </main>
      <SiteFooter />
    </div>
  )
}
