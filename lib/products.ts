export type ProductId = 'bess' | 'ups' | 'estaciones' | 'reguladores' | 'calidad' | 'power-glass'

export type Product = {
  id: ProductId
  name: string
  eyebrow: string
  headline: string
  description: string
  audience: string[]
  tool: string
  /** Landing route. Products without one send the visitor to the home form. */
  href?: string
  ticket: 'Proyecto' | 'Cierre rápido' | 'Diagnóstico'
  /** Shown as a wide "Nuevo" card on the home. */
  isNew?: boolean
}

export const products: Product[] = [
  {
    id: 'bess',
    name: 'BESS · Peak shaving',
    eyebrow: '01 · Almacenamiento',
    headline: 'Recorta el pico que CFE te cobra.',
    description:
      'Baterías que se cargan cuando tu demanda es baja y descargan en tu momento más caro. Menos cargo por demanda, más respaldo.',
    audience: ['Hoteles', 'Industria', 'Hospitales'],
    tool: 'Calculadora de recibo CFE',
    href: '/bess',
    ticket: 'Proyecto',
  },
  {
    id: 'ups',
    name: 'UPS · No-break',
    eyebrow: '02 · Respaldo',
    headline: 'Que un apagón no detenga tu operación.',
    description:
      'Respaldo de doble conversión de 1 a 20 kVA para equipo médico, refrigeración, servidores y punto de venta.',
    audience: ['Clínicas', 'Consultorios', 'Oficinas'],
    tool: '¿Qué UPS necesito?',
    href: '/ups',
    ticket: 'Cierre rápido',
  },
  {
    id: 'reguladores',
    name: 'Reguladores + supresores',
    eyebrow: '03 · Protección',
    headline: 'Tus aires y equipos, a salvo de las variaciones.',
    description:
      'Estabilizadores de 1 a 25 kVA y supresores de picos para proteger minisplits, motores y electrónica sensible.',
    audience: ['Residencial', 'Comercios', 'Restaurantes'],
    tool: 'Selector por número de aires',
    href: '/reguladores',
    ticket: 'Cierre rápido',
  },
  {
    id: 'calidad',
    name: 'Estudio de calidad de energía',
    eyebrow: '04 · Diagnóstico',
    headline: 'Mide antes de comprar. Encuentra la falla real.',
    description:
      'Levantamiento eléctrico con analizador: armónicos, factor de potencia, variaciones y demanda. Sales con un plan, no con una corazonada.',
    audience: ['Hospitales', 'Plantas', 'Hoteles'],
    tool: 'Autodiagnóstico en 6 preguntas',
    href: '/calidad-de-energia',
    ticket: 'Diagnóstico',
  },
  {
    id: 'power-glass',
    name: 'Power Glass',
    eyebrow: '05 · Eficiencia',
    headline: 'Menos calor por la ventana, menos aire acondicionado.',
    description:
      'Película térmica para vidrios que reduce la ganancia de calor. Pensada para fachadas que reciben el sol de Yucatán todo el día.',
    audience: ['Hoteles', 'Oficinas', 'Restaurantes'],
    tool: 'Calculadora de ROI por m²',
    href: '/power-glass',
    ticket: 'Proyecto',
  },
  {
    id: 'estaciones',
    name: 'Estaciones de energía portátiles',
    eyebrow: '06 · Portátil',
    headline: 'Respaldo sin instalación: conecta y listo.',
    description:
      'Baterías LiFePO4 de 512 a 3,840 Wh con contactos, USB-C y función UPS. Se recargan con la luz o con paneles solares. Para casa, home office y negocio.',
    audience: ['Hogar', 'Home office', 'Comercios'],
    tool: '¿Cuántas horas me aguanta?',
    href: '/estaciones-de-energia',
    ticket: 'Cierre rápido',
    isNew: true,
  },
]

export const productById = Object.fromEntries(products.map((product) => [product.id, product])) as Record<
  ProductId,
  Product
>
