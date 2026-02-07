'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  TrendingDown,
  Clock,
  CheckCircle2,
  ArrowRight,
  Ruler,
  Lightbulb,
  Rocket,
  Hotel,
  UtensilsCrossed,
  Building2,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react'

type BusinessType = 'hotel' | 'restaurant' | 'office' | null

export default function LandingPage() {
  const [businessType, setBusinessType] = useState<BusinessType>(null)
  const [squareMeters, setSquareMeters] = useState('')
  const [monthlyBill, setMonthlyBill] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState({
    investment: 0,
    monthlySavings: 0,
    roiMonths: 0,
    annualSavings: 0,
    fiveYearSavings: 0,
    pricePerSqm: 0,
    installationPerSqm: 100,
    totalSqm: 0,
    savingsPercentage: 0,
  })

  const calculateROI = () => {
    if (!businessType || !squareMeters || !monthlyBill) return

    const sqm = parseFloat(squareMeters)
    const bill = parseFloat(monthlyBill)

    const priceMap = { hotel: 360, restaurant: 340, office: 370 }
    const pricePerSqm = priceMap[businessType]

    const savingsMap = { hotel: 0.28, restaurant: 0.30, office: 0.25 }
    const savingsPercentage = savingsMap[businessType]

    const totalSqm = sqm * 1.1
    const materialCost = totalSqm * pricePerSqm
    const installationCost = totalSqm * 100
    const investment = materialCost + installationCost

    const monthlySavings = bill * savingsPercentage
    const roiMonths = Math.round(investment / monthlySavings)
    const annualSavings = monthlySavings * 12
    const fiveYearSavings = annualSavings * 5

    setResults({
      investment,
      monthlySavings,
      roiMonths,
      annualSavings,
      fiveYearSavings,
      pricePerSqm,
      installationPerSqm: 100,
      totalSqm,
      savingsPercentage: savingsPercentage * 100,
    })

    setShowResults(true)

    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 100)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold text-foreground">Firefly Volts</div>
          <Button variant="default" size="lg">
            Contacto
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance">
              Reduce tu factura eléctrica hasta 35% sin cambiar tus ventanas
            </h1>
            <p className="text-xl md:text-2xl text-foreground/90 mb-12 text-balance">
              PowerGlass: Película térmica profesional instalada en 1 día
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 h-auto"
                onClick={() => {
                  document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                CALCULAR MI AHORRO
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto bg-transparent">
                Ver instalaciones <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-balance">
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
          <p className="text-2xl md:text-3xl font-bold text-center text-balance max-w-4xl mx-auto">
            Un restaurante de 200m² de vidrio puede perder $8,500 pesos AL MES solo por ventanas
            ineficientes
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
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
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-8 md:p-12 shadow-2xl">
            <h2 className="text-4xl font-bold text-center mb-12">Calculadora de Ahorro</h2>

            {/* Business Type Selector */}
            <div className="mb-10">
              <Label className="text-lg mb-4 block">Tipo de Negocio</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  size="lg"
                  variant={businessType === 'hotel' ? 'default' : 'outline'}
                  className="h-20 text-lg"
                  onClick={() => setBusinessType('hotel')}
                >
                  <Hotel className="w-6 h-6 mr-2" />
                  Hotel
                </Button>
                <Button
                  size="lg"
                  variant={businessType === 'restaurant' ? 'default' : 'outline'}
                  className="h-20 text-lg"
                  onClick={() => setBusinessType('restaurant')}
                >
                  <UtensilsCrossed className="w-6 h-6 mr-2" />
                  Restaurante
                </Button>
                <Button
                  size="lg"
                  variant={businessType === 'office' ? 'default' : 'outline'}
                  className="h-20 text-lg"
                  onClick={() => setBusinessType('office')}
                >
                  <Building2 className="w-6 h-6 mr-2" />
                  Oficina
                </Button>
              </div>
            </div>

            {/* Input Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div>
                <Label className="text-lg mb-4 flex items-center gap-2">
                  <Ruler className="w-5 h-5" />
                  Metros cuadrados de vidrio
                </Label>
                <Input
                  type="number"
                  placeholder="150"
                  value={squareMeters}
                  onChange={(e) => setSquareMeters(e.target.value)}
                  className="text-4xl text-center h-20"
                />
              </div>
              <div>
                <Label className="text-lg mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  Factura de luz mensual (MXN)
                </Label>
                <Input
                  type="number"
                  placeholder="25000"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(e.target.value)}
                  className="text-4xl text-center h-20"
                />
              </div>
            </div>

            {/* Calculate Button */}
            <Button
              size="lg"
              className="w-full text-xl py-8 h-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              onClick={calculateROI}
              disabled={!businessType || !squareMeters || !monthlyBill}
            >
              <Rocket className="w-6 h-6 mr-2" />
              CALCULAR AHORRO
            </Button>

            {/* Results Section */}
            {showResults && (
              <div id="results" className="mt-12 pt-12 border-t border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Card className="p-6 bg-secondary/50">
                    <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      INVERSIÓN TOTAL
                    </div>
                    <div className="text-5xl font-black mb-2 text-foreground">
                      ${results.investment.toLocaleString('es-MX')}
                    </div>
                    <div className="text-sm text-muted-foreground">Material + Instalación</div>
                  </Card>

                  <Card className="p-6 bg-secondary/50">
                    <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <TrendingDown className="w-4 h-4" />
                      AHORRO MENSUAL
                    </div>
                    <div className="text-5xl font-black mb-2 text-primary">
                      ${results.monthlySavings.toLocaleString('es-MX')}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {results.savingsPercentage}% reducción en factura
                    </div>
                  </Card>

                  <Card className="p-6 bg-secondary/50">
                    <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      RETORNO DE INVERSIÓN
                    </div>
                    <div className="text-5xl font-black mb-2 text-foreground">
                      {results.roiMonths} meses
                    </div>
                    <div className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-semibold">
                      ROI: {Math.round((results.annualSavings / results.investment) * 100)}%
                    </div>
                  </Card>

                  <Card className="p-6 bg-secondary/50">
                    <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      AHORRO ANUAL
                    </div>
                    <div className="text-5xl font-black mb-2 text-primary">
                      ${results.annualSavings.toLocaleString('es-MX')}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      En 5 años: ${results.fiveYearSavings.toLocaleString('es-MX')}
                    </div>
                  </Card>
                </div>

                {/* Details */}
                <Accordion type="single" collapsible className="mb-8">
                  <AccordionItem value="details">
                    <AccordionTrigger className="text-lg font-semibold">
                      Ver detalles del cálculo
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 pt-4">
                        <div className="flex justify-between">
                          <span>M² requeridos (con merma 10%)</span>
                          <span className="font-semibold">{results.totalSqm.toFixed(1)} m²</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Precio por m²</span>
                          <span className="font-semibold">${results.pricePerSqm}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Instalación por m²</span>
                          <span className="font-semibold">${results.installationPerSqm}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>% Ahorro estimado</span>
                          <span className="font-semibold">{results.savingsPercentage}%</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* CTA */}
                <Button size="lg" className="w-full text-lg py-7 h-auto">
                  SOLICITAR VISITA TÉCNICA GRATIS
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="aspect-square bg-muted rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <Building2 className="w-32 h-32 opacity-20" />
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-8">PowerGlass: La solución profesional</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-lg">
                      Se instala en 1 día (sin detener operaciones)
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-lg">Rechaza hasta 79% del calor solar</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-lg">Reduce 25-35% la factura de luz</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-lg">Garantía 10 años</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-semibold text-lg">ROI en 18-24 meses</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Preguntas frecuentes
          </h2>
          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg text-left">
                ¿Funciona en cualquier tipo de ventana?
              </AccordionTrigger>
              <AccordionContent className="text-base">
                Sí, PowerGlass se puede instalar en cualquier tipo de ventana: vidrio templado,
                laminado, o vidrio simple. Nuestro equipo técnico evalúa cada caso para garantizar
                la mejor aplicación.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg text-left">
                ¿Cuánto dura la instalación?
              </AccordionTrigger>
              <AccordionContent className="text-base">
                La instalación típica se completa en un solo día, dependiendo del tamaño del
                proyecto. Trabajamos sin interrumpir las operaciones de tu negocio.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg text-left">
                ¿Afecta la visibilidad?
              </AccordionTrigger>
              <AccordionContent className="text-base">
                No. PowerGlass mantiene una excelente claridad visual mientras bloquea el calor y
                los rayos UV. Tus vistas permanecen intactas.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg text-left">
                ¿Qué garantía tiene?
              </AccordionTrigger>
              <AccordionContent className="text-base">
                PowerGlass viene con una garantía de 10 años del fabricante contra decoloración,
                despegamiento y defectos de manufactura.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-balance">
              Únete a +500 negocios que ya redujeron su factura
            </h2>
            <Card className="p-8 bg-card text-card-foreground">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" placeholder="Tu nombre" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="business">Nombre del Negocio</Label>
                  <Input id="business" placeholder="Tu negocio" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input id="phone" type="tel" placeholder="999 123 4567" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="tu@email.com" className="mt-2" />
                </div>
                <Button
                  size="lg"
                  className="w-full text-lg py-7 h-auto bg-foreground text-background hover:bg-foreground/90"
                  type="submit"
                >
                  SOLICITAR VISITA GRATIS
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-secondary/50 border-t border-border">
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
                  <a href="#" className="block text-muted-foreground hover:text-foreground">
                    Términos
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-foreground">
                    Privacidad
                  </a>
                </div>
              </div>
            </div>
            <div className="pt-8 border-t border-border text-center text-muted-foreground text-sm">
              © 2024 Firefly Volts. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
