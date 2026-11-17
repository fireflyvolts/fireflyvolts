import type { ProductId } from './products'
import { showPlaceholders } from './site-mode'

/**
 * B2C store: equipment people buy without a site visit (under ~$70k).
 * Projects (BESS, three-phase UPS, power quality, Power Glass) stay in lib/products.ts and end in a quote.
 *
 * `pricePlaceholder: true` marks prices we still have to confirm with the GPC price list.
 * Battery prices are the public prices on tiendagpc.com (Nov 2026).
 */

export type CategoryId = 'estaciones' | 'ups' | 'reguladores' | 'supresores' | 'baterias'

export const categories: { id: CategoryId; name: string; short: string; solution: ProductId }[] = [
  { id: 'estaciones', name: 'Estaciones de energía', short: 'Estaciones', solution: 'estaciones' },
  { id: 'ups', name: 'UPS · No-break', short: 'UPS', solution: 'ups' },
  { id: 'reguladores', name: 'Reguladores de voltaje', short: 'Reguladores', solution: 'reguladores' },
  { id: 'supresores', name: 'Supresores de picos', short: 'Supresores', solution: 'reguladores' },
  { id: 'baterias', name: 'Baterías de reemplazo', short: 'Baterías', solution: 'ups' },
]

export type StoreItem = {
  slug: string
  category: CategoryId
  name: string
  model: string
  price: number
  pricePlaceholder?: boolean
  badge?: string
  summary: string
  highlights: string[]
  specs: [string, string][]
  forWho: string[]
  /** Landing with the calculator that helps pick this item. */
  guide?: { href: string; label: string }
}

const stationGuide = { href: '/estaciones-de-energia', label: '¿Cuántas horas me aguanta?' }
const upsGuide = { href: '/ups', label: '¿Qué UPS necesito?' }
const regulatorGuide = { href: '/reguladores', label: '¿Qué regulador necesito?' }

export const catalog: StoreItem[] = [
  // Estaciones de energía · specs from the Power-All MG+13 comparison sheets.
  {
    slug: 'estacion-mg13-800li',
    category: 'estaciones',
    name: 'Estación de energía 800 W',
    model: 'Power-All PA MG+13-800LI',
    price: 9990,
    pricePlaceholder: true,
    summary: 'La más ligera. Internet, laptop, focos y ventilador durante el apagón.',
    highlights: ['512 Wh · 800 W continuos', 'Función UPS: cambia en menos de 10 ms', 'Recarga solar hasta 200 W', '6.5 kg, con asa'],
    specs: [
      ['Capacidad', '512 Wh'],
      ['Potencia continua', '800 W'],
      ['Batería', 'LiFePO4 · más de 3,500 ciclos'],
      ['Salida CA', 'Onda senoidal pura, 120 V'],
      ['Transferencia UPS', 'Menor a 10 ms, con bypass'],
      ['Recarga CA', 'Aprox. 90 min (400 W)'],
      ['Entrada solar', 'Hasta 200 W'],
      ['USB-C', '1 × 100 W y 2 × 20 W'],
      ['Peso', '6.5 kg'],
      ['Dimensiones', '272 × 185 × 240 mm'],
      ['Monitoreo', 'App con Wi-Fi'],
    ],
    forWho: ['Home office', 'Módem y cámaras', 'Viajes y playa'],
    guide: stationGuide,
  },
  {
    slug: 'estacion-mg13-1800li',
    category: 'estaciones',
    name: 'Estación de energía 1,800 W',
    model: 'Power-All PA MG+13-1800LI',
    price: 19990,
    pricePlaceholder: true,
    badge: 'Más vendida',
    summary: 'Refrigerador, TV, internet y ventiladores. La más versátil para casa.',
    highlights: ['1,024 Wh · 1,800 W continuos', 'USB-C de 140 W', 'Salidas de 12 V para accesorios', 'Más de 4,000 ciclos'],
    specs: [
      ['Capacidad', '1,024 Wh'],
      ['Potencia continua', '1,800 W'],
      ['Batería', 'LiFePO4 · más de 4,000 ciclos'],
      ['Salida CA', 'Onda senoidal pura, 120 V'],
      ['Transferencia UPS', 'Menor a 10 ms'],
      ['Recarga CA', '1,000 W · aprox. 1.2 h al 100 %'],
      ['Entrada solar', 'Hasta 500 W'],
      ['USB-A', '2 × QC 18 W'],
      ['USB-C', '1 × 140 W y 1 × 20 W'],
      ['Salidas 12 V', '2 × DC5521 y toma vehicular 12 V/10 A'],
      ['Peso', '11.64 kg'],
      ['Dimensiones', '350 × 220 × 263 mm'],
      ['Monitoreo', 'App con Wi-Fi'],
    ],
    forWho: ['Casa', 'Refrigerador', 'Consultorio pequeño'],
    guide: stationGuide,
  },
  {
    slug: 'estacion-mg13-2400il',
    category: 'estaciones',
    name: 'Estación de energía 2,400 W',
    model: 'Power-All PA MG+13-2400IL',
    price: 34990,
    pricePlaceholder: true,
    summary: 'Lo básico de toda la casa o un negocio pequeño, con hasta 1,200 W solares.',
    highlights: ['2,048 Wh · 2,400 W continuos', 'Entrada solar hasta 1,200 W', '2 × USB-C de 140 W', 'Protección IP54'],
    specs: [
      ['Capacidad', '2,048 Wh'],
      ['Potencia continua', '2,400 W'],
      ['Batería', 'LiFePO4 · más de 4,000 ciclos'],
      ['Salida CA', 'Onda senoidal pura, 120 V'],
      ['Transferencia UPS', 'Menor a 10 ms'],
      ['Recarga CA', 'Hasta 1,800 W'],
      ['Entrada solar', 'Hasta 1,200 W (2 × 600 W)'],
      ['USB-A', '2 × 12 W'],
      ['USB-C', '2 × 140 W y 2 × 20 W'],
      ['Salidas CC', '2 × DC5521, XT60 12 V/25 A y vehicular 12 V/10 A'],
      ['Protección', 'IP54'],
      ['Peso', '21.6 kg'],
      ['Monitoreo', 'App con Wi-Fi'],
    ],
    forWho: ['Casa completa', 'Comercio', 'Rancho'],
    guide: stationGuide,
  },
  {
    slug: 'estacion-mg13-3600il',
    category: 'estaciones',
    name: 'Estación de energía 3,600 W',
    model: 'Power-All PA MG+13-3600IL',
    price: 64990,
    pricePlaceholder: true,
    summary: 'Para negocio o casa grande. Con ruedas y ampliable hasta 11,520 Wh.',
    highlights: ['3,840 Wh · 3,600 W', 'Ampliable a 11,520 Wh', 'Entrada solar hasta 2,000 W', 'Recarga CA en aprox. 2 h'],
    specs: [
      ['Capacidad', '3,840 Wh (ampliable a 11,520 Wh)'],
      ['Potencia de salida', '3,600 W a 120 V'],
      ['Batería', 'LiFePO4 · más de 3,500 ciclos'],
      ['Salida CA', 'Onda senoidal pura'],
      ['Transferencia UPS', 'Menor a 10 ms'],
      ['Recarga CA', 'Aprox. 2 h'],
      ['Entrada solar', 'Hasta 2,000 W'],
      ['USB-A', '2 × 18 W'],
      ['USB-C', '1 × 100 W y 3 × 20 W'],
      ['Salidas CC', 'DC5521, XT60 y vehicular'],
      ['Protección', 'IP54'],
      ['Peso', '42 kg, con ruedas'],
      ['Monitoreo', 'App con Wi-Fi'],
    ],
    forWho: ['Negocio', 'Casa grande', 'Obra y eventos'],
    guide: stationGuide,
  },

  // UPS · names and figures to confirm with the GPC catalog.
  {
    slug: 'ups-interactivo-1kva',
    category: 'ups',
    name: 'UPS interactivo 1 kVA',
    model: 'Power-All serie interactiva',
    price: 2490,
    pricePlaceholder: true,
    summary: 'Para computadora, punto de venta y red. Minutos para guardar y apagar.',
    highlights: ['1 kVA', 'Regulación de voltaje integrada', 'Contactos con respaldo y supresión', 'La opción de menor costo'],
    specs: [
      ['Capacidad', '1 kVA'],
      ['Tecnología', 'Interactivo'],
      ['Voltaje', '120 V'],
      ['Respaldo típico', '5–15 min con una PC'],
    ],
    forWho: ['Oficina', 'Punto de venta', 'Módem y cámaras'],
    guide: upsGuide,
  },
  {
    slug: 'ups-kr19-1kva',
    category: 'ups',
    name: 'UPS en línea 1 kVA',
    model: 'Power-All serie KR+19',
    price: 8990,
    pricePlaceholder: true,
    summary: 'Doble conversión: tus equipos nunca ven el corte ni las variaciones.',
    highlights: ['1 kVA en línea doble conversión', 'Transferencia 0 ms', 'Onda senoidal pura', 'Para equipo sensible'],
    specs: [
      ['Capacidad', '1 kVA'],
      ['Tecnología', 'En línea doble conversión'],
      ['Voltaje', '120 V'],
      ['Transferencia', '0 ms'],
    ],
    forWho: ['Consultorio', 'Servidor pequeño', 'Laboratorio'],
    guide: upsGuide,
  },
  {
    slug: 'ups-kr19-2kva',
    category: 'ups',
    name: 'UPS en línea 2 kVA',
    model: 'Power-All serie KR+19',
    price: 14990,
    pricePlaceholder: true,
    badge: 'Clínicas',
    summary: 'Equipo médico, refrigerador de vacunas y red con protección total.',
    highlights: ['2 kVA en línea doble conversión', 'Transferencia 0 ms', 'Baterías externas opcionales', 'Tarjeta de monitoreo opcional'],
    specs: [
      ['Capacidad', '2 kVA'],
      ['Tecnología', 'En línea doble conversión'],
      ['Voltaje', '120 V'],
      ['Transferencia', '0 ms'],
    ],
    forWho: ['Clínica', 'Oficina', 'Site pequeño'],
    guide: upsGuide,
  },
  {
    slug: 'ups-kr19-3kva',
    category: 'ups',
    name: 'UPS en línea 3 kVA',
    model: 'Power-All serie KR+19',
    price: 19990,
    pricePlaceholder: true,
    summary: 'Para varios equipos críticos o un site con servidores.',
    highlights: ['3 kVA en línea doble conversión', 'Transferencia 0 ms', 'Baterías externas para más respaldo', 'Monitoreo remoto opcional'],
    specs: [
      ['Capacidad', '3 kVA'],
      ['Tecnología', 'En línea doble conversión'],
      ['Voltaje', '120 V'],
      ['Transferencia', '0 ms'],
    ],
    forWho: ['Site', 'Clínica', 'Comercio'],
    guide: upsGuide,
  },

  // Reguladores · SMS series, figures to confirm.
  {
    slug: 'regulador-sms-1kva',
    category: 'reguladores',
    name: 'Regulador 1 kVA',
    model: 'Power-All serie SMS',
    price: 1990,
    pricePlaceholder: true,
    summary: 'Para refrigerador, TV y electrónica de casa.',
    highlights: ['1 kVA · 120 V', 'Supresor de picos integrado', 'Retardo de arranque para compresores'],
    specs: [
      ['Capacidad', '1 kVA'],
      ['Voltaje', '120 V'],
      ['Tipo', 'Regulador electrónico con supresor'],
    ],
    forWho: ['Refrigerador', 'TV y audio', 'Computadora'],
    guide: regulatorGuide,
  },
  {
    slug: 'regulador-sms-3kva',
    category: 'reguladores',
    name: 'Regulador 3 kVA',
    model: 'Power-All serie SMS',
    price: 4290,
    pricePlaceholder: true,
    badge: 'Para minisplit',
    summary: 'Protege uno o dos minisplits de las variaciones de la red.',
    highlights: ['3 kVA · 120 V', 'Para 1–2 minisplits de 1 tonelada', 'Supresor de picos integrado'],
    specs: [
      ['Capacidad', '3 kVA'],
      ['Voltaje', '120 V'],
      ['Tipo', 'Regulador electrónico con supresor'],
    ],
    forWho: ['Minisplit', 'Bomba de agua', 'Cocina'],
    guide: regulatorGuide,
  },
  {
    slug: 'regulador-sms-phv-5kva',
    category: 'reguladores',
    name: 'Regulador 5 kVA 220 V',
    model: 'Power-All serie SMS PHV',
    price: 8990,
    pricePlaceholder: true,
    summary: 'Para minisplits de 220 V y cargas de la casa completa.',
    highlights: ['5 kVA · 220 V', 'Para 2–3 minisplits de 220 V', 'Supresor de picos integrado'],
    specs: [
      ['Capacidad', '5 kVA'],
      ['Voltaje', '220 V'],
      ['Tipo', 'Regulador electrónico con supresor'],
    ],
    forWho: ['Minisplits 220 V', 'Casa completa', 'Restaurante'],
    guide: regulatorGuide,
  },

  // Supresores · to confirm.
  {
    slug: 'supresor-minisplit',
    category: 'supresores',
    name: 'Supresor de picos para minisplit',
    model: 'Power-All',
    price: 890,
    pricePlaceholder: true,
    summary: 'Protección básica contra descargas y picos para un minisplit.',
    highlights: ['Para equipos de 120 o 220 V', 'Protección contra descargas', 'Instalación sencilla'],
    specs: [
      ['Uso', 'Un minisplit'],
      ['Voltaje', '120 / 220 V'],
    ],
    forWho: ['Minisplit', 'Refrigerador'],
    guide: regulatorGuide,
  },
  {
    slug: 'supresor-tablero',
    category: 'supresores',
    name: 'Supresor para tablero',
    model: 'Power-All',
    price: 4990,
    pricePlaceholder: true,
    summary: 'Protege toda la instalación desde el tablero eléctrico.',
    highlights: ['Protección de toda la casa o local', 'Contra descargas y transitorios', 'Instalación por técnico'],
    specs: [
      ['Uso', 'Tablero principal'],
      ['Instalación', 'Incluye visita en Mérida'],
    ],
    forWho: ['Casa', 'Local comercial'],
    guide: regulatorGuide,
  },

  // Baterías · public prices on tiendagpc.com.
  ...([
    [26, 1666],
    [55, 2790],
    [110, 5560],
    [135, 7644],
  ] as const).map(([ah, price]): StoreItem => ({
    slug: `bateria-agm-12v-${ah}ah`,
    category: 'baterias',
    name: `Batería AGM 12 V ${ah} Ah`,
    model: 'Power-All · BU Battery',
    price,
    summary: 'Batería sellada de reemplazo para UPS, bancos de baterías y respaldo.',
    highlights: [`12 V · ${ah} Ah`, 'AGM/VRLA sellada, libre de mantenimiento', 'Para UPS y bancos de baterías'],
    specs: [
      ['Voltaje', '12 V'],
      ['Capacidad', `${ah} Ah`],
      ['Tecnología', 'AGM / VRLA de plomo ácido'],
    ],
    forWho: ['Reemplazo de UPS', 'Bancos de baterías'],
    guide: upsGuide,
  })),
]

export const itemBySlug = Object.fromEntries(catalog.map((item) => [item.slug, item])) as Record<string, StoreItem>

export const categoryById = Object.fromEntries(categories.map((category) => [category.id, category])) as Record<CategoryId, (typeof categories)[number]>

/** Unconfirmed prices are hidden on production: those items are sold by asking on WhatsApp. */
export function hasPrice(item: StoreItem) {
  return showPlaceholders || !item.pricePlaceholder
}

export function formatPrice(value: number) {
  return `$${value.toLocaleString('es-MX')}`
}
