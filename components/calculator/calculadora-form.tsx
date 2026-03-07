'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Hotel, UtensilsCrossed, Building2, Home, Ruler, Lightbulb, Rocket, DollarSign, TrendingDown, Clock, ArrowRight, CheckCircle2 } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

type BusinessType = 'hotel' | 'restaurant' | 'office' | 'hogar' | null

export function CalculadoraForm() {
  const [businessType, setBusinessType] = useState<BusinessType>(null)
  const [squareMeters, setSquareMeters] = useState('')
  const [monthlyBill, setMonthlyBill] = useState('')
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [email, setEmail] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  const calculateROI = async () => {
    if (!businessType || !squareMeters || !monthlyBill || !nombre || !telefono || !email) return

    setIsSubmitting(true)

    const sqm = parseFloat(squareMeters)
    const bill = parseFloat(monthlyBill)

    const priceMap = { hotel: 360, restaurant: 340, office: 370, hogar: 380 }
    const pricePerSqm = priceMap[businessType]

    const savingsMap = { hotel: 0.28, restaurant: 0.30, office: 0.25, hogar: 0.22 }
    const savingsPercentage = savingsMap[businessType]

    const totalSqm = sqm * 1.1
    const materialCost = totalSqm * pricePerSqm
    const installationCost = totalSqm * 100
    const investment = materialCost + installationCost

    const monthlySavings = bill * savingsPercentage
    const roiMonths = Math.round(investment / monthlySavings)
    const annualSavings = monthlySavings * 12
    const fiveYearSavings = annualSavings * 5

    const calculatedResults = {
      investment,
      monthlySavings,
      roiMonths,
      annualSavings,
      fiveYearSavings,
      pricePerSqm,
      installationPerSqm: 100,
      totalSqm,
      savingsPercentage: savingsPercentage * 100,
    }

    // Enviar a HubSpot
    try {
      await fetch('/api/hubspot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          telefono,
          email,
          tipo_negocio: businessType,
          metros_cuadrados: sqm,
          factura_mensual: bill,
          inversion_estimada: investment,
          ahorro_mensual: monthlySavings,
          roi_meses: roiMonths,
        }),
      })
    } catch (error) {
      console.error('[v0] Error sending to HubSpot:', error)
    }

    setResults(calculatedResults)
    setShowResults(true)
    setIsSubmitting(false)

    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 100)
  }

  return (
    <section id="calculator" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto p-8 md:p-12 shadow-2xl">
          <h2 className="text-4xl font-bold text-center mb-12">Calculadora de Ahorro</h2>

          {/* Business Type */}
          <div className="mb-10">
            <Label className="text-lg mb-4 block">Tipo de Negocio</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <Button
                size="lg"
                variant={businessType === 'hogar' ? 'default' : 'outline'}
                className="h-20 text-lg"
                onClick={() => setBusinessType('hogar')}
              >
                <Home className="w-6 h-6 mr-2" />
                Hogar
              </Button>
            </div>
            {businessType === 'hogar' && (
              <p className="mt-4 text-center text-muted-foreground">
                Para hogares: Protege a tu familia del calor. Reduce costos de aire acondicionado.
              </p>
            )}
          </div>

          {/* Contact Fields */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div>
              <Label className="text-base mb-2 block">Nombre completo *</Label>
              <Input
                type="text"
                placeholder="Juan Pérez"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="h-12"
              />
            </div>
            <div>
              <Label className="text-base mb-2 block">Teléfono *</Label>
              <Input
                type="tel"
                placeholder="999 123 4567"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="h-12"
              />
            </div>
            <div>
              <Label className="text-base mb-2 block">Email *</Label>
              <Input
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
              />
            </div>
          </div>

          {/* Meter y Factura */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <Label className="text-lg mb-4 flex items-center gap-2">
                <Ruler className="w-5 h-5" />
                {businessType === 'hogar' ? 'Metros cuadrados de ventanas en tu casa' : 'Metros cuadrados de vidrio'}
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
                {businessType === 'hogar' ? 'Tu factura de luz mensual (MXN)' : 'Factura de luz mensual (MXN)'}
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
            disabled={!businessType || !squareMeters || !monthlyBill || !nombre || !telefono || !email || isSubmitting}
          >
            <Rocket className="w-6 h-6 mr-2" />
            {isSubmitting ? 'ENVIANDO...' : 'CALCULAR AHORRO'}
          </Button>

          {/* Results */}
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

              <Button size="lg" className="w-full text-lg py-7 h-auto">
                SOLICITAR VISITA TÉCNICA GRATIS
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          )}
        </Card>
      </div>
    </section>
  )
}
