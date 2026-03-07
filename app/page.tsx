'use client'

import { Logo } from '@/components/logo'
import { CalculadoraForm } from '@/components/calculator/calculadora-form'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Flame,
  DollarSign,
  Snowflake,
  CheckCircle2,
  ArrowRight,
  Building2,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react'

export default function LandingPage() {

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1 bg-primary" />
        <div className="bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="container mx-auto px-4 h-16 flex items-center justify-center">
            <Logo />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        <div 
          className="absolute inset-0 opacity-5 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-white" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-[56px] md:text-[72px] font-bold mb-6 text-balance leading-tight">
              Reduce tu factura eléctrica hasta 35% sin cambiar tus ventanas
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12">
              PowerGlass: Película térmica profesional instalada en 1 día
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-9 py-[18px] h-auto shadow-lg hover:shadow-xl transition-shadow"
                onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
              >
                CALCULAR MI AHORRO
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-9 py-[18px] h-auto bg-transparent hover:shadow-lg transition-shadow">
                Ver instalaciones <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            ¿Tu negocio pierde dinero por estas ventanas?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="p-8 text-center hover:shadow-xl transition-shadow">
              <Flame className="w-16 h-16 mx-auto mb-4 text-destructive" />
              <h3 className="text-2xl font-bold mb-2">Calor insoportable</h3>
              <p className="text-muted-foreground text-lg">El AC trabaja el doble</p>
            </Card>
            <Card className="p-8 text-center hover:shadow-xl transition-shadow">
              <DollarSign className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-2">Factura CFE fuera de control</h3>
              <p className="text-muted-foreground text-lg">Cuesta mantener clima</p>
            </Card>
            <Card className="p-8 text-center hover:shadow-xl transition-shadow">
              <Snowflake className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-2">Clientes incómodos</h3>
              <p className="text-muted-foreground text-lg">Afecta ventas y productividad</p>
            </Card>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-center max-w-4xl mx-auto">
            Un restaurante de 200m² puede perder $8,500 pesos AL MES
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
            <div>
              <div className="text-5xl font-black mb-2">500+</div>
              <div className="text-lg opacity-90">Clientes</div>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">35%</div>
              <div className="text-lg opacity-90">Ahorro Promedio</div>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">10</div>
              <div className="text-lg opacity-90">Años Garantía</div>
            </div>
            <div>
              <div className="text-5xl font-black mb-2">24</div>
              <div className="text-lg opacity-90">Meses ROI</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-2">📍</div>
              <div className="text-lg opacity-90">Mérida, Yucatán</div>
              <div className="text-sm opacity-75">Distribuidor Local</div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparador */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              PowerGlass supera incluso al vidrio doble
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-12">
              Comparación científica de rechazo térmico y protección UV
            </p>

            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto mb-12">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-muted">
                    <th className="p-4 text-left font-semibold">Tipo de Vidrio</th>
                    <th className="p-4 text-center font-semibold"><span className="text-2xl">🔥</span> Rechazo IR</th>
                    <th className="p-4 text-center font-semibold"><span className="text-2xl">☀️</span> Rechazo UV</th>
                    <th className="p-4 text-center font-semibold"><span className="text-2xl">💡</span> Luz Natural</th>
                    <th className="p-4 text-center font-semibold">Inversión</th>
                    <th className="p-4 text-center font-semibold">Instalación</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Cristal Natural</td>
                    <td className="p-4 text-center"><span className="font-bold">27.5%</span> <span className="text-red-500">❌</span></td>
                    <td className="p-4 text-center"><span className="font-bold">19.9%</span> <span className="text-red-500">❌</span></td>
                    <td className="p-4 text-center"><span className="font-bold">87.2%</span> <span className="text-green-500">✅</span></td>
                    <td className="p-4 text-center">Base</td>
                    <td className="p-4 text-center text-muted-foreground">N/A</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Cristal Temporizado</td>
                    <td className="p-4 text-center"><span className="font-bold">21.8%</span> <span className="text-red-500">❌</span></td>
                    <td className="p-4 text-center"><span className="font-bold">54.4%</span> <span className="text-yellow-500">⚠️</span></td>
                    <td className="p-4 text-center"><span className="font-bold">60.1%</span> <span className="text-yellow-500">⚠️</span></td>
                    <td className="p-4 text-center">+40%</td>
                    <td className="p-4 text-center text-muted-foreground">N/A</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 font-medium">Cristal Doble</td>
                    <td className="p-4 text-center"><span className="font-bold">84.4%</span> <span className="text-yellow-500">⚠️</span></td>
                    <td className="p-4 text-center"><span className="font-bold">79.2%</span> <span className="text-yellow-500">⚠️</span></td>
                    <td className="p-4 text-center"><span className="font-bold">64.6%</span> <span className="text-yellow-500">⚠️</span></td>
                    <td className="p-4 text-center">+150%</td>
                    <td className="p-4 text-center">Obra civil</td>
                  </tr>
                  <tr className="bg-gradient-to-r from-blue-50 to-blue-100 border-b-2 border-primary border-l-4">
                    <td className="p-4 font-bold">PowerGlass</td>
                    <td className="p-4 text-center"><span className="font-bold text-xl">92.6%</span> <span className="text-green-500 text-2xl">✅</span></td>
                    <td className="p-4 text-center"><span className="font-bold text-xl">97.7%</span> <span className="text-green-500 text-2xl">✅</span></td>
                    <td className="p-4 text-center"><span className="font-bold text-xl">71.7%</span> <span className="text-green-500 text-2xl">✅</span></td>
                    <td className="p-4 text-center font-bold">+60%</td>
                    <td className="p-4 text-center font-bold">1 día sin obra</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4 mb-12">
              {[
                { name: 'Cristal Natural', ir: '27.5%', uv: '19.9%', light: '87.2%', inv: 'Base', inst: 'N/A', highlight: false },
                { name: 'Cristal Temporizado', ir: '21.8%', uv: '54.4%', light: '60.1%', inv: '+40%', inst: 'N/A', highlight: false },
                { name: 'Cristal Doble', ir: '84.4%', uv: '79.2%', light: '64.6%', inv: '+150%', inst: 'Obra civil', highlight: false },
                { name: 'PowerGlass', ir: '92.6%', uv: '97.7%', light: '71.7%', inv: '+60%', inst: '1 día sin obra', highlight: true },
              ].map((item, i) => (
                <Card key={i} className={item.highlight ? 'border-primary bg-blue-50' : ''}>
                  <div className="p-6 space-y-3">
                    <h3 className={`text-xl font-bold mb-4 ${item.highlight ? 'text-primary' : ''}`}>{item.name}</h3>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div><span className="text-muted-foreground">Rechazo IR:</span> <span className="font-bold">{item.ir}</span></div>
                      <div><span className="text-muted-foreground">Rechazo UV:</span> <span className="font-bold">{item.uv}</span></div>
                      <div><span className="text-muted-foreground">Luz Natural:</span> <span className="font-bold">{item.light}</span></div>
                      <div><span className="text-muted-foreground">Inversión:</span> <span className="font-bold">{item.inv}</span></div>
                      <div className="col-span-2"><span className="text-muted-foreground">Instalación:</span> <span className="font-bold">{item.inst}</span></div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Highlights */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <div className="text-green-500 text-3xl mb-2">✅</div>
                <p className="font-semibold">8% más rechazo de calor que cristal doble</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-green-500 text-3xl mb-2">✅</div>
                <p className="font-semibold">60% del costo vs reemplazar ventanas</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-green-500 text-3xl mb-2">✅</div>
                <p className="font-semibold">Mantiene 7% más luz natural</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Qué es PowerGlass */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              Nanotecnología térmica profesional
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-16">
              Film multicapa que transforma sus ventanas existentes en barrera térmica inteligente
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 text-center hover:shadow-xl transition-shadow">
                <div className="text-6xl mb-6">🔬</div>
                <h3 className="text-2xl font-bold mb-4">Tecnología Avanzada</h3>
                <p className="text-muted-foreground leading-relaxed">
                  7 capas nanotecnológicas que filtran selectivamente el calor sin bloquear la luz visible
                </p>
              </Card>

              <Card className="p-8 text-center hover:shadow-xl transition-shadow">
                <div className="text-6xl mb-6">⚡</div>
                <h3 className="text-2xl font-bold mb-4">Instalación Rápida</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Se aplica directamente sobre el vidrio existente. Sin obra, sin polvo, sin interrupciones
                </p>
              </Card>

              <Card className="p-8 text-center hover:shadow-xl transition-shadow">
                <div className="text-6xl mb-6">🛡️</div>
                <h3 className="text-2xl font-bold mb-4">Protección Total</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Garantía 10 años. Resistente a rayones, agua y temperaturas extremas (-40°C a +80°C)
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* PowerCoat - Solución Completa */}
      <section className="py-24 bg-gradient-to-br from-primary to-[#0891d0] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              ¿Tienes techo grande? Combina con PowerCoat
            </h2>
            <p className="text-xl text-center mb-16 opacity-90">
              Protección térmica completa para tu edificio
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* PowerGlass Column */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
                <div className="text-7xl text-center mb-4">🪟</div>
                <h3 className="text-3xl font-bold text-center mb-2">PowerGlass</h3>
                <p className="text-center mb-6 opacity-90">Para ventanas y fachadas de vidrio</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <span>Rechaza 92.6% del calor solar</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <span>Protección UV 97.7%</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <span>Instalación en 1 día</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <span className="font-semibold">Ideal para: Oficinas, restaurantes, hoteles</span>
                  </li>
                </ul>
              </div>

              {/* PowerCoat Column */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
                <div className="text-7xl text-center mb-4">🏢</div>
                <h3 className="text-3xl font-bold text-center mb-2">PowerCoat</h3>
                <p className="text-center mb-6 opacity-90">Recubrimiento térmico para techos</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <span>Reduce temperatura techo hasta 15°C</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <span>Refleja calor antes de entrar</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <span>Aplicación sobre cualquier superficie</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
                    <span className="font-semibold">Ideal para: Bodegas, naves industriales, centros comerciales</span>
                  </li>
                </ul>
              </div>
            </div>

            <p className="text-2xl font-bold text-center mb-8">
              Combina ambas soluciones y reduce hasta 50% tu factura eléctrica
            </p>

            <div className="text-center">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-12 py-7 h-auto shadow-xl">
                COTIZAR SOLUCIÓN COMPLETA
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <CalculadoraForm />

      {/* Solution */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
              <Building2 className="w-32 h-32 opacity-20" />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-8">PowerGlass: La solución profesional</h2>
              <div className="space-y-6">
                {[
                  'Se instala en 1 día (sin detener operaciones)',
                  'Rechaza hasta 79% del calor solar',
                  'Reduce 25-35% la factura de luz',
                  'Garantía 10 años',
                  'ROI en 18-24 meses',
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div className="font-semibold text-lg">{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo Funciona */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              De la visita a la instalación en 48 horas
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-16">
              Proceso profesional sin complicaciones
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {[
                {
                  icon: '🔍',
                  title: 'Visita Técnica',
                  items: [
                    'Evaluación sin costo',
                    'Medición precisa',
                    'Análisis de orientación solar',
                    '30 minutos en sitio',
                  ],
                },
                {
                  icon: '📊',
                  title: 'Cotización Personalizada',
                  items: [
                    'ROI calculado para su negocio',
                    'Inversión detallada',
                    'Proyección de ahorro 5 años',
                    'Respuesta en 24 horas',
                  ],
                },
                {
                  icon: '⚡',
                  title: 'Instalación Profesional',
                  items: [
                    'Equipo certificado Power-All',
                    'Sin detener operaciones',
                    'Limpieza incluida',
                    'Completado en 1 día',
                  ],
                },
                {
                  icon: '🛡️',
                  title: 'Garantía Extendida',
                  items: [
                    '10 años respaldo fabricante',
                    'Certificado de instalación',
                    'Soporte técnico continuo',
                    'Mantenimiento incluido',
                  ],
                },
              ].map((step, i) => (
                <Card key={i} className="relative p-6 hover:shadow-xl transition-shadow">
                  <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {i + 1}
                  </div>
                  <div className="text-5xl text-center mb-4 mt-2">{step.icon}</div>
                  <h3 className="text-xl font-bold text-center mb-4">{step.title}</h3>
                  <ul className="space-y-2">
                    {step.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button size="lg" className="text-lg px-12 py-7 h-auto">
                SOLICITAR VISITA TÉCNICA GRATIS
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Preguntas frecuentes</h2>
          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg text-left">
                ¿Funciona en cualquier tipo de ventana?
              </AccordionTrigger>
              <AccordionContent className="text-base">
                Sí, PowerGlass se puede instalar en cualquier tipo de ventana: vidrio templado, laminado, o vidrio simple.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg text-left">¿Cuánto dura la instalación?</AccordionTrigger>
              <AccordionContent className="text-base">
                La instalación típica se completa en un solo día, sin interrumpir las operaciones de tu negocio.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg text-left">¿Afecta la visibilidad?</AccordionTrigger>
              <AccordionContent className="text-base">
                No. PowerGlass mantiene excelente claridad visual mientras bloquea el calor y los rayos UV.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg text-left">¿Qué garantía tiene?</AccordionTrigger>
              <AccordionContent className="text-base">
                PowerGlass viene con garantía de 10 años del fabricante contra decoloración y defectos.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-secondary/50 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="text-2xl font-bold mb-4">Firefly Volts</div>
                <p className="text-muted-foreground">Distribuidor autorizado Power-All</p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Contacto</h3>
                <div className="space-y-2 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>WhatsApp: 999 XXX XXXX</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>contacto@fireflyvolts.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Mérida, Yucatán</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <div className="space-y-2">
                  <a href="#" className="block text-muted-foreground hover:text-foreground">Términos</a>
                  <a href="#" className="block text-muted-foreground hover:text-foreground">Privacidad</a>
                </div>
              </div>
            </div>
            <div className="pt-8 border-t text-center text-muted-foreground text-sm">
              © 2025 Firefly Volts. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
