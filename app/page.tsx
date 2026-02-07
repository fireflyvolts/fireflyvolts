'use client'

import { useState } from 'react'

type BusinessType = 'hotel' | 'restaurant' | 'office' | null

export default function LandingPage() {
  const [businessType, setBusinessType] = useState<BusinessType>(null)
  const [squareMeters, setSquareMeters] = useState('')
  const [monthlyBill, setMonthlyBill] = useState('')
  const [showResults, setShowResults] = useState(false)
  const [openAccordion, setOpenAccordion] = useState<string | null>(null)
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">Firefly Volts</div>
          <button className="bg-[#0a8ee0] text-white px-6 py-2 rounded-md font-medium hover:bg-[#0a8ee0]/90 transition-colors">
            Contacto
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a8ee0]/10 via-white to-[#0a8ee0]/5" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 text-balance">
              Reduce tu factura eléctrica hasta 35% sin cambiar tus ventanas
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-12 text-balance">
              PowerGlass: Película térmica profesional instalada en 1 día
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[#0a8ee0] text-white text-lg px-8 py-4 rounded-md font-medium hover:bg-[#0a8ee0]/90 transition-colors"
              >
                CALCULAR MI AHORRO
              </button>
              <button className="border-2 border-gray-300 text-gray-900 text-lg px-8 py-4 rounded-md font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                Ver instalaciones
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-balance">
            ¿Tu negocio pierde dinero por estas ventanas?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-xl border border-gray-200 shadow p-8 text-center hover:shadow-xl transition-shadow">
              <svg className="w-16 h-16 mx-auto mb-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-2xl font-bold mb-2">Calor insoportable</h3>
              <p className="text-gray-600 text-lg">El AC trabaja el doble</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow p-8 text-center hover:shadow-xl transition-shadow">
              <svg className="w-16 h-16 mx-auto mb-4 text-[#0a8ee0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-2xl font-bold mb-2">Factura CFE fuera de control</h3>
              <p className="text-gray-600 text-lg">Cuesta mantener clima</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow p-8 text-center hover:shadow-xl transition-shadow">
              <svg className="w-16 h-16 mx-auto mb-4 text-[#0a8ee0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h3 className="text-2xl font-bold mb-2">Clientes incómodos</h3>
              <p className="text-gray-600 text-lg">Afecta ventas y productividad</p>
            </div>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-center text-balance max-w-4xl mx-auto">
            Un restaurante de 200m² de vidrio puede perder $8,500 pesos AL MES solo por ventanas
            ineficientes
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-16 bg-[#0a8ee0] text-white">
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
      <section id="calculator" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl border border-gray-200 shadow-2xl p-8 md:p-12">
            <h2 className="text-4xl font-bold text-center mb-12">Calculadora de Ahorro</h2>

            {/* Business Type Selector */}
            <div className="mb-10">
              <label className="text-lg mb-4 block font-medium">Tipo de Negocio</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setBusinessType('hotel')}
                  className={`h-20 text-lg rounded-md font-medium transition-all flex items-center justify-center gap-2 ${
                    businessType === 'hotel'
                      ? 'bg-[#0a8ee0] text-white'
                      : 'border-2 border-gray-300 text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Hotel
                </button>
                <button
                  onClick={() => setBusinessType('restaurant')}
                  className={`h-20 text-lg rounded-md font-medium transition-all flex items-center justify-center gap-2 ${
                    businessType === 'restaurant'
                      ? 'bg-[#0a8ee0] text-white'
                      : 'border-2 border-gray-300 text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Restaurante
                </button>
                <button
                  onClick={() => setBusinessType('office')}
                  className={`h-20 text-lg rounded-md font-medium transition-all flex items-center justify-center gap-2 ${
                    businessType === 'office'
                      ? 'bg-[#0a8ee0] text-white'
                      : 'border-2 border-gray-300 text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Oficina
                </button>
              </div>
            </div>

            {/* Input Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div>
                <label className="text-lg mb-4 flex items-center gap-2 font-medium">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Metros cuadrados de vidrio
                </label>
                <input
                  type="number"
                  placeholder="150"
                  value={squareMeters}
                  onChange={(e) => setSquareMeters(e.target.value)}
                  className="w-full text-4xl text-center h-20 rounded-md border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-[#0a8ee0]"
                />
              </div>
              <div>
                <label className="text-lg mb-4 flex items-center gap-2 font-medium">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Factura de luz mensual (MXN)
                </label>
                <input
                  type="number"
                  placeholder="25000"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(e.target.value)}
                  className="w-full text-4xl text-center h-20 rounded-md border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-[#0a8ee0]"
                />
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculateROI}
              disabled={!businessType || !squareMeters || !monthlyBill}
              className="w-full text-xl py-6 h-auto bg-gradient-to-r from-[#0a8ee0] to-[#0a8ee0]/80 hover:from-[#0a8ee0]/90 hover:to-[#0a8ee0]/70 text-white rounded-md font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              CALCULAR AHORRO
            </button>

            {/* Results Section */}
            {showResults && (
              <div id="results" className="mt-12 pt-12 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                    <div className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      INVERSIÓN TOTAL
                    </div>
                    <div className="text-5xl font-black mb-2 text-gray-900">
                      ${results.investment.toLocaleString('es-MX')}
                    </div>
                    <div className="text-sm text-gray-600">Material + Instalación</div>
                  </div>

                  <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                    <div className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      AHORRO MENSUAL
                    </div>
                    <div className="text-5xl font-black mb-2 text-[#0a8ee0]">
                      ${results.monthlySavings.toLocaleString('es-MX')}
                    </div>
                    <div className="text-sm text-gray-600">
                      {results.savingsPercentage}% reducción en factura
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                    <div className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      RETORNO DE INVERSIÓN
                    </div>
                    <div className="text-5xl font-black mb-2 text-gray-900">
                      {results.roiMonths} meses
                    </div>
                    <div className="inline-block px-3 py-1 bg-[#0a8ee0]/20 text-[#0a8ee0] rounded-full text-sm font-semibold">
                      ROI: {Math.round((results.annualSavings / results.investment) * 100)}%
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                    <div className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      AHORRO ANUAL
                    </div>
                    <div className="text-5xl font-black mb-2 text-[#0a8ee0]">
                      ${results.annualSavings.toLocaleString('es-MX')}
                    </div>
                    <div className="text-sm text-gray-600">
                      En 5 años: ${results.fiveYearSavings.toLocaleString('es-MX')}
                    </div>
                  </div>
                </div>

                {/* Details Accordion */}
                <div className="mb-8 border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setOpenAccordion(openAccordion === 'details' ? null : 'details')}
                    className="w-full flex items-center justify-between py-4 px-4 text-lg font-semibold text-left hover:bg-gray-50 transition-colors"
                  >
                    Ver detalles del cálculo
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        openAccordion === 'details' ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {openAccordion === 'details' && (
                    <div className="px-4 pb-4 pt-0 space-y-3">
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
                  )}
                </div>

                {/* CTA */}
                <button className="w-full text-lg py-5 h-auto bg-[#0a8ee0] text-white rounded-md font-medium hover:bg-[#0a8ee0]/90 transition-colors flex items-center justify-center gap-2">
                  SOLICITAR VISITA TÉCNICA GRATIS
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="aspect-square bg-gray-100 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                <svg className="w-32 h-32 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
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
                    <svg className="w-6 h-6 text-[#0a8ee0] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <div className="font-semibold text-lg">{item}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Preguntas frecuentes
          </h2>
          <div className="max-w-3xl mx-auto space-y-2">
            {[
              {
                q: '¿Funciona en cualquier tipo de ventana?',
                a: 'Sí, PowerGlass se puede instalar en cualquier tipo de ventana: vidrio templado, laminado, o vidrio simple. Nuestro equipo técnico evalúa cada caso para garantizar la mejor aplicación.',
              },
              {
                q: '¿Cuánto dura la instalación?',
                a: 'La instalación típica se completa en un solo día, dependiendo del tamaño del proyecto. Trabajamos sin interrumpir las operaciones de tu negocio.',
              },
              {
                q: '¿Afecta la visibilidad?',
                a: 'No. PowerGlass mantiene una excelente claridad visual mientras bloquea el calor y los rayos UV. Tus vistas permanecen intactas.',
              },
              {
                q: '¿Qué garantía tiene?',
                a: 'PowerGlass viene con una garantía de 10 años del fabricante contra decoloración, despegamiento y defectos de manufactura.',
              },
            ].map((item, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                <button
                  onClick={() => setOpenAccordion(openAccordion === `faq-${index}` ? null : `faq-${index}`)}
                  className="w-full flex items-center justify-between py-4 px-6 text-lg text-left hover:bg-gray-50 transition-colors font-medium"
                >
                  {item.q}
                  <svg
                    className={`w-4 h-4 transition-transform flex-shrink-0 ml-4 ${
                      openAccordion === `faq-${index}` ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openAccordion === `faq-${index}` && (
                  <div className="px-6 pb-4 pt-0 text-base text-gray-700">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-[#0a8ee0] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-balance">
              Únete a +500 negocios que ya redujeron su factura
            </h2>
            <div className="bg-white text-gray-900 rounded-xl border border-gray-200 p-8">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                {[
                  { label: 'Nombre', placeholder: 'Tu nombre', type: 'text' },
                  { label: 'Nombre del Negocio', placeholder: 'Tu negocio', type: 'text' },
                  { label: 'Teléfono', placeholder: '999 123 4567', type: 'tel' },
                  { label: 'Email', placeholder: 'tu@email.com', type: 'email' },
                ].map((field, i) => (
                  <div key={i}>
                    <label className="block mb-2 font-medium">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="w-full h-10 rounded-md border border-gray-300 px-3 focus:outline-none focus:ring-2 focus:ring-[#0a8ee0]"
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className="w-full text-lg py-5 h-auto bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  SOLICITAR VISITA GRATIS
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="text-2xl font-bold mb-4">Firefly Volts</div>
                <p className="text-gray-600">Distribuidor autorizado Power-All</p>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Contacto</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>WhatsApp: 999 XXX XXXX</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>contacto@fireflyvolts.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Mérida, Yucatán</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Legal</h3>
                <div className="space-y-2">
                  <a href="#" className="block text-gray-600 hover:text-gray-900">
                    Términos
                  </a>
                  <a href="#" className="block text-gray-600 hover:text-gray-900">
                    Privacidad
                  </a>
                </div>
              </div>
            </div>
            <div className="pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
              © 2024 Firefly Volts. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
