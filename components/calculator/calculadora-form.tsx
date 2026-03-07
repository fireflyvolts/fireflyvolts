'use client'

import { useState, useEffect } from 'react'
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
  const [showResults, setShowResults] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [results, setResults] = useState({
    investment: 0,
    monthlySavings: 0,
    roiMonths: 0,
    annualSavings: 0,
    fiveYearSavings: 0,
    pricePerSqm: 0,
    installationPerSqm: 200,
    totalSqm: 0,
    savingsPercentage: 0,
  })

  const calculateROI = async () => {
    if (!businessType || !squareMeters || !monthlyBill) return

    setIsSubmitting(true)

    const sqm = parseFloat(squareMeters)
    const bill = parseFloat(monthlyBill)

    // Precio fijo para todos los tipos de negocio
    const pricePerSqm = 750 // $750 MXN por m² de material
    const installationPerSqm = 200 // $200 MXN por m² de instalación

    const savingsMap = { hotel: 0.28, restaurant: 0.30, office: 0.25, hogar: 0.22 }
    const savingsPercentage = savingsMap[businessType]

    // Aplicar 10% de merma sobre los metros cuadrados
    const totalSqm = sqm * 1.1
    const materialCost = totalSqm * pricePerSqm
    const installationCost = sqm * installationPerSqm // Instalación sin merma
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
      installationPerSqm,
      totalSqm,
      savingsPercentage: savingsPercentage * 100,
    }

    setResults(calculatedResults)
    setShowResults(true)
    setIsSubmitting(false)

    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 100)
  }

  // Load HubSpot script when results are shown
  useEffect(() => {
    if (showResults) {
      const existingScript = document.querySelector('script[src="https://js.hsforms.net/forms/embed/50720390.js"]')
      if (!existingScript) {
        const script = document.createElement('script')
        script.src = 'https://js.hsforms.net/forms/embed/50720390.js'
        script.defer = true
        document.body.appendChild(script)
      }
    }
  }, [showResults])

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
            disabled={!businessType || !squareMeters || !monthlyBill || isSubmitting}
          >
            <Rocket className="w-6 h-6 mr-2" />
            {isSubmitting ? 'CALCULANDO...' : 'CALCULAR AHORRO'}
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

              {/* HubSpot Form Section */}
              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="text-2xl font-bold text-center mb-2">
                  ¿Te interesa esta cotización?
                </h3>
                <p className="text-center text-muted-foreground mb-6">
                  Déjanos tus datos y un asesor te contacta en menos de 24 horas
                </p>
                <div className="bg-secondary/30 rounded-lg p-6">
                  <div 
                    className="hs-form-frame" 
                    data-region="na1" 
                    data-form-id="07fbc8e6-4f9a-4eab-9fbc-dfdc9e9711d4" 
                    data-portal-id="50720390"
                  ></div>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </section>
  )
}
