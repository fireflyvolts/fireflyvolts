'use client'

import { useState } from 'react'
import Image from 'next/image'
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
    const investment = totalSqm * (pricePerSqm + 100)
    const monthlySavings = bill * savingsPercentage
    const roiMonths = Math.round(investment / monthlySavings)
    const annualSavings = monthlySavings * 12

    setResults({
      investment,
      monthlySavings,
      roiMonths,
      annualSavings,
      fiveYearSavings: annualSavings * 5,
      pricePerSqm,
      totalSqm,
      savingsPercentage: savingsPercentage * 100,
    })

    setShowResults(true)
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="h-10">
            <svg viewBox="0 0 350 75" className="h-full w-auto" xmlns="http://www.w3.org/2000/svg">
              <path d="M28.92,71.36c-.48,0-.92-.1-1.34-.31-.42-.2-.77-.47-1.07-.8v-.48c.29.35.65.64,1.07.86.42.22.86.34,1.32.34.61,0,1.1-.15,1.47-.44.37-.29.56-.7.56-1.22,0-.27-.06-.51-.17-.72-.11-.21-.29-.4-.54-.59-.25-.18-.58-.37-1.02-.56l-.88-.41c-.56-.25-.97-.54-1.25-.85-.27-.32-.41-.69-.41-1.12,0-.36.09-.68.28-.97.19-.29.45-.52.79-.68.34-.16.73-.25,1.18-.25s.85.08,1.2.25.66.38.92.64v.46c-.3-.31-.62-.54-.97-.7-.35-.16-.73-.25-1.15-.25-.55,0-.99.13-1.32.4-.33.27-.5.62-.5,1.06,0,.37.12.68.35.93.23.26.61.51,1.14.77l.9.41c.67.31,1.15.63,1.44.97.29.33.43.73.43,1.19,0,.42-.1.79-.31,1.11-.2.31-.49.55-.86.72-.37.17-.79.25-1.27.25Z" fill="currentColor"/>
              <path d="M35.27,71.33c-.55,0-1.03-.13-1.45-.39-.41-.26-.73-.62-.95-1.08s-.33-.99-.33-1.59c0-.55.1-1.04.31-1.47.2-.43.5-.77.9-1.02.39-.25.86-.37,1.4-.37.48,0,.88.1,1.22.31s.59.5.76.87c.17.37.26.8.26,1.28v.34h-4.6v-.34h4.31l-.08.16v-.15c0-.41-.07-.77-.21-1.09-.14-.32-.35-.57-.64-.75-.28-.18-.63-.27-1.04-.27-.45,0-.84.1-1.17.31-.32.21-.57.5-.74.87s-.26.8-.26,1.28v.07c0,.8.22,1.44.64,1.93.42.49.99.74,1.71.74.39,0,.75-.07,1.08-.2.32-.13.61-.32.85-.55v.38c-.25.22-.53.4-.87.54-.33.13-.7.2-1.1.2Z" fill="currentColor"/>
              <path d="M38.99,71.17v-5.59h.39v5.59h-.39ZM39.26,67.96c0-.75.15-1.36.44-1.81.29-.45.69-.68,1.2-.68.13,0,.25.01.36.04.1.03.2.07.3.12h.01v.39c-.2-.12-.45-.18-.74-.18-.45,0-.8.2-1.07.6-.26.4-.4.91-.4,1.53h-.11Z" fill="currentColor"/>
              <path d="M44.36,71.21l-2.19-5.63h.41l2.06,5.38h-.19l2.11-5.38h.4l-2.23,5.63h-.37Z" fill="currentColor"/>
              <circle cx="47" cy="10" r="3" fill="#0a8ee0"/>
              <text x="55" y="45" fontSize="28" fontWeight="bold" fill="currentColor" fontFamily="system-ui, -apple-system, sans-serif">Firefly Volts</text>
            </svg>
          </div>
          <Button size="lg">Contacto</Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
              Reduce tu factura eléctrica hasta 35% sin cambiar tus ventanas
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12">
              PowerGlass: Película térmica profesional instalada en 1 día
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="text-lg px-8 py-6 h-auto"
                onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
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
                    <th className="p-4 text-center font-semibold">Rechazo IR</th>
                    <th className="p-4 text-center font-semibold">Rechazo UV</th>
                    <th className="p-4 text-center font-semibold">Luz Natural</th>
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
                  <tr className="bg-blue-50 border-b-2 border-primary">
                    <td className="p-4 font-bold">PowerGlass</td>
                    <td className="p-4 text-center"><span className="font-bold">92.6%</span> <span className="text-green-500">✅</span></td>
                    <td className="p-4 text-center"><span className="font-bold">97.7%</span> <span className="text-green-500">✅</span></td>
                    <td className="p-4 text-center"><span className="font-bold">71.7%</span> <span className="text-green-500">✅</span></td>
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

      {/* Calculator */}
      <section id="calculator" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-8 md:p-12">
            <h2 className="text-4xl font-bold text-center mb-12">Calculadora de Ahorro</h2>

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

            <Button
              size="lg"
              className="w-full text-xl py-8 h-auto"
              onClick={calculateROI}
              disabled={!businessType || !squareMeters || !monthlyBill}
            >
              <Rocket className="w-6 h-6 mr-2" />
              CALCULAR AHORRO
            </Button>

            {showResults && (
              <div id="results" className="mt-12 pt-12 border-t">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <Card className="p-6 bg-secondary/50">
                    <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      INVERSIÓN TOTAL
                    </div>
                    <div className="text-5xl font-black mb-2">
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
                      {results.savingsPercentage}% reducción
                    </div>
                  </Card>

                  <Card className="p-6 bg-secondary/50">
                    <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      RETORNO DE INVERSIÓN
                    </div>
                    <div className="text-5xl font-black mb-2">{results.roiMonths} meses</div>
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
                      5 años: ${results.fiveYearSavings.toLocaleString('es-MX')}
                    </div>
                  </Card>
                </div>

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
                          <span>% Ahorro estimado</span>
                          <span className="font-semibold">{results.savingsPercentage}%</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Button size="lg" className="w-full text-lg py-7 h-auto">
                  SOLICITAR VISITA TÉCNICA GRATIS
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            )}
          </Card>
        </div>
      </section>

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

      {/* Final CTA */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              Únete a +500 negocios que ya redujeron su factura
            </h2>
            <Card className="p-8">
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
                <Button size="lg" className="w-full text-lg py-7 h-auto bg-foreground text-background hover:bg-foreground/90" type="submit">
                  SOLICITAR VISITA GRATIS
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </Card>
          </div>
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
              © 2024 Firefly Volts. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
