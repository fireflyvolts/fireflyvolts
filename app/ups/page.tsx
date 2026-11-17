import type { Metadata } from 'next'
import { Activity, BatteryCharging, Hospital, PlugZap, ServerCog, ShieldCheck, Smartphone, Store, Thermometer, Zap } from 'lucide-react'
import { UpsCalculator } from '@/components/calculators/ups-calculator'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { CalculatorCard, FeatureGrid, LandingHero, QuoteSection, Section, SectionHeading, Steps } from '@/components/site/landing'

export const metadata: Metadata = {
  title: 'UPS y No-break para negocios en Mérida | Firefly Volts',
  description:
    'UPS en línea de doble conversión de 1 a 20 kVA para clínicas, oficinas y comercios en Mérida. Calcula qué UPS necesitas y recibe tu cotización.',
  alternates: { canonical: '/ups' },
}

const types = [
  {
    icon: Zap,
    tag: '0.65–3 kVA',
    title: 'Interactivo',
    text: 'Para punto de venta, computadoras y red. Regula el voltaje y da minutos para guardar y apagar. La opción de menor costo.',
  },
  {
    icon: ShieldCheck,
    tag: '1–20 kVA',
    title: 'En línea doble conversión',
    text: 'Para equipo médico, servidores y laboratorio. Transferencia de 0 ms: tus equipos nunca ven el corte ni las variaciones.',
  },
  {
    icon: BatteryCharging,
    tag: '3–6 kVA',
    title: 'Respaldo prolongado',
    text: 'Para refrigeración de medicamento o alimentos. Baterías externas para horas de respaldo, sin planta de emergencia.',
  },
]

const reasons = [
  { icon: PlugZap, title: 'Apagones y bajones', text: 'En temporada de calor la red se satura. Cada corte detiene ventas, citas y procesos.' },
  { icon: Activity, title: 'Equipo que se daña', text: 'Las variaciones queman fuentes, tarjetas y compresores. Reparar cuesta más que proteger.' },
  { icon: Thermometer, title: 'Producto que se pierde', text: 'Un refrigerador sin respaldo puede echar a perder medicamento o inventario en una tarde.' },
]

const applications = [
  { icon: Hospital, title: 'Clínicas y consultorios', text: 'Ultrasonidos, monitores, refrigeradores de vacunas y expediente electrónico.' },
  { icon: Store, title: 'Comercios y restaurantes', text: 'Punto de venta, terminales, cámaras y red para no dejar de cobrar.' },
  { icon: ServerCog, title: 'Oficinas y sites', text: 'Servidores, conmutador y red con monitoreo remoto y apagado ordenado.' },
  { icon: Smartphone, title: 'Monitoreo desde el celular', text: 'Tarjeta IoT opcional que te avisa por alarma cuando el UPS trabaja con baterías.' },
]

export default function UpsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <SiteHeader />
      <main>
        <LandingHero
          icon={PlugZap}
          eyebrow="Respaldo · UPS / No-break"
          title="Que un apagón no detenga"
          highlight="tu operación."
          lead="UPS en línea de doble conversión de 1 a 20 kVA. Mantiene encendidos tus equipos críticos durante el corte y los protege de variaciones todos los días."
          bullets={['Dimensionado con tus equipos reales', 'Instalación, puesta en marcha y póliza', 'Hasta 36 meses de garantía con supresor de picos']}
          aside={
            <CalculatorCard eyebrow="Calculadora" title="¿Qué UPS necesito?">
              <UpsCalculator />
            </CalculatorCard>
          }
        />

        <Section tone="muted">
          <SectionHeading eyebrow="El problema" title="El corte dura minutos. El daño, semanas." />
          <FeatureGrid items={reasons} />
        </Section>

        <Section>
          <SectionHeading
            eyebrow="Tipos de UPS"
            title="No todos los UPS protegen igual."
            text="Elegimos la tecnología según lo que conectas y cuánto tiempo necesitas seguir operando."
          />
          <FeatureGrid items={types} />
        </Section>

        <Section tone="dark">
          <SectionHeading eyebrow="Cómo trabajamos" title="Del levantamiento a la póliza." tone="dark" />
          <Steps
            items={[
              { title: 'Levantamiento', text: 'Revisamos qué equipos proteges, su consumo y el voltaje de tu instalación.' },
              { title: 'Propuesta', text: 'UPS, baterías y supresor dimensionados, con el tiempo de respaldo que necesitas.' },
              { title: 'Instalación', text: 'Puesta en marcha, pruebas de transferencia y capacitación a tu personal.' },
              { title: 'Mantenimiento', text: 'Visitas preventivas y revisión de baterías para que el respaldo esté ahí cuando lo necesites.' },
            ]}
          />
        </Section>

        <Section>
          <SectionHeading eyebrow="Aplicaciones" title="Donde un segundo sin luz cuesta." />
          <FeatureGrid items={applications} columns={4} />
        </Section>

        <QuoteSection
          product="ups"
          origin="Landing UPS - formulario de cotización"
          title="Cotiza tu UPS."
          text="Mándanos tu cálculo o la lista de equipos. Te respondemos con modelo, tiempo de respaldo, instalación y garantía."
        />
      </main>
      <SiteFooter />
    </div>
  )
}
