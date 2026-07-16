import { NextResponse } from 'next/server'

const HUBSPOT_BASE_URL = 'https://api.hubapi.com'

const acceptedInputProperties = new Set([
  'firstname',
  'email',
  'phone',
  'nombre_del_negocio',
  'company',
  'monthly_bill_range',
  'lead_origin',
  'product_interest',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_id',
  'utm_content',
  'utm_term',
  'campaign_id',
  'adgroup_id',
  'creative_id',
  'keyword',
  'match_type',
  'device',
  'network',
  'location_id',
  'landing_page',
  'page_url',
  'referrer',
  'gclid',
  'gbraid',
  'wbraid',
])

type HubSpotResult = {
  response: Response
  data: Record<string, unknown>
}

function compactProperties(properties: Record<string, string | undefined>) {
  return Object.fromEntries(
    Object.entries(properties).filter(([, value]) => typeof value === 'string' && value.length > 0)
  ) as Record<string, string>
}

function getAnalyticsSource(properties: Record<string, string>) {
  const source = (properties.utm_source || '').toLowerCase()
  const medium = (properties.utm_medium || '').toLowerCase()
  const hasGoogleClickId = Boolean(properties.gclid || properties.gbraid || properties.wbraid)

  if (hasGoogleClickId || ['cpc', 'ppc', 'paid_search'].includes(medium)) return 'PAID_SEARCH'
  if (['organic', 'seo', 'organic_search'].includes(medium)) return 'ORGANIC_SEARCH'
  if (medium === 'referral') return 'REFERRALS'
  if ((!source || source === 'direct') && !medium) return 'DIRECT_TRAFFIC'
  return 'OTHER_CAMPAIGNS'
}

function buildContactProperties(
  submitted: Record<string, string>,
  ownerId: string
): Record<string, string> {
  const campaignId = submitted.utm_id || submitted.campaign_id
  const keyword = submitted.utm_term || submitted.keyword
  const creativeId = submitted.utm_content || submitted.creative_id
  const detailLines = [
    `Producto: ${submitted.product_interest || 'BESS / Peak shaving'}`,
    `Recibo mensual: ${submitted.monthly_bill_range || 'No indicado'}`,
    `Origen: ${submitted.lead_origin || 'Landing Firefly Volts'}`,
    `Fuente / medio: ${submitted.utm_source || 'direct'} / ${submitted.utm_medium || 'sin medio'}`,
    `Campaña: ${submitted.utm_campaign || 'sin campaña'}`,
    campaignId ? `Campaign ID: ${campaignId}` : '',
    submitted.adgroup_id ? `Ad group ID: ${submitted.adgroup_id}` : '',
    keyword ? `Keyword: ${keyword}` : '',
    creativeId ? `Creative ID: ${creativeId}` : '',
    submitted.match_type ? `Match type: ${submitted.match_type}` : '',
    submitted.device ? `Dispositivo: ${submitted.device}` : '',
    submitted.network ? `Red: ${submitted.network}` : '',
    submitted.location_id ? `Location ID: ${submitted.location_id}` : '',
    submitted.gclid ? `GCLID: ${submitted.gclid}` : '',
    submitted.gbraid ? `GBRAID: ${submitted.gbraid}` : '',
    submitted.wbraid ? `WBRAID: ${submitted.wbraid}` : '',
    submitted.landing_page ? `Landing inicial: ${submitted.landing_page}` : '',
    submitted.page_url ? `URL de conversión: ${submitted.page_url}` : '',
    submitted.referrer ? `Referente: ${submitted.referrer}` : '',
  ].filter(Boolean)

  return compactProperties({
    firstname: submitted.firstname,
    email: submitted.email,
    phone: submitted.phone,
    company: submitted.company || submitted.nombre_del_negocio,
    nombre_del_negocio: submitted.nombre_del_negocio || submitted.company,
    hubspot_owner_id: ownerId,
    hs_lead_status: 'NEW',
    lifecyclestage: 'lead',
    fuente_del_lead: 'Otro',
    hs_analytics_source: getAnalyticsSource(submitted),
    hs_analytics_source_data_1: [submitted.utm_campaign, campaignId, submitted.adgroup_id]
      .filter(Boolean)
      .join(' | '),
    hs_analytics_source_data_2: [keyword, creativeId, submitted.match_type]
      .filter(Boolean)
      .join(' | '),
    message: detailLines.join('\n').slice(0, 2000),
  })
}

async function createContact(token: string, properties: Record<string, string>) {
  return fetch(`${HUBSPOT_BASE_URL}/crm/v3/objects/contacts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        ...properties,
        lifecyclestage: properties.lifecyclestage || 'lead',
      },
    }),
  })
}

async function updateContact(token: string, contactId: string, properties: Record<string, string>) {
  return fetch(`${HUBSPOT_BASE_URL}/crm/v3/objects/contacts/${contactId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ properties }),
  })
}

async function findContactByEmail(token: string, email: string) {
  return fetch(
    `${HUBSPOT_BASE_URL}/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
}

async function parseHubSpotResponse(response: Response): Promise<HubSpotResult> {
  const data = await response.json().catch(() => ({}))
  return { response, data }
}

async function saveContact(token: string, properties: Record<string, string>): Promise<HubSpotResult> {
  const created = await parseHubSpotResponse(await createContact(token, properties))

  if (created.response.status !== 409 || !properties.email) return created

  const existing = await parseHubSpotResponse(await findContactByEmail(token, properties.email))
  const contactId = typeof existing.data.id === 'string' ? existing.data.id : ''

  if (!existing.response.ok || !contactId) return created

  const updateProperties = { ...properties }
  delete updateProperties.hubspot_owner_id
  delete updateProperties.hs_lead_status
  delete updateProperties.lifecyclestage

  return parseHubSpotResponse(await updateContact(token, contactId, updateProperties))
}

export async function POST(request: Request) {
  const HUBSPOT_TOKEN = process.env.HUBSPOT_API_KEY
  const HUBSPOT_OWNER_ID = process.env.HUBSPOT_OWNER_ID || '85294082'

  if (!HUBSPOT_TOKEN) {
    return NextResponse.json(
      { error: 'HubSpot API key not configured' },
      { status: 500 }
    )
  }

  try {
    const body = await request.json()
    const rawSubmittedProperties = body.properties || {}
    const submittedProperties = Object.fromEntries(
      Object.entries(rawSubmittedProperties)
        .filter(([key, value]) => acceptedInputProperties.has(key) && typeof value === 'string')
        .map(([key, value]) => [key, String(value).slice(0, 2000)])
    )

    if (!submittedProperties.email) {
      return NextResponse.json({ error: 'El correo es obligatorio' }, { status: 400 })
    }

    const properties = buildContactProperties(submittedProperties, HUBSPOT_OWNER_ID)
    const result = await saveContact(HUBSPOT_TOKEN, properties)

    if (result.response.ok) {
      return NextResponse.json({ success: true, contact: result.data })
    }

    const fallbackProperties = {
      firstname: properties.firstname,
      email: properties.email,
      phone: properties.phone,
      company: properties.company || properties.nombre_del_negocio,
      hubspot_owner_id: properties.hubspot_owner_id,
      hs_lead_status: 'NEW',
      lifecyclestage: 'lead',
      message: properties.message,
    }

    if (result.response.status === 400) {
      const fallbackResult = await saveContact(HUBSPOT_TOKEN, fallbackProperties)

      if (fallbackResult.response.ok) {
        return NextResponse.json({
          success: true,
          contact: fallbackResult.data,
          warning: 'Lead created with standard HubSpot fields. Check custom property mapping.',
        })
      }
    }

    console.error('[fireflyvolts] HubSpot API Error:', result.data)
    return NextResponse.json(
      { error: String(result.data.message || 'Error al crear contacto') },
      { status: result.response.status }
    )
  } catch (error) {
    console.error('[fireflyvolts] Server Error:', error)
    return NextResponse.json(
      { error: 'Error de conexion' },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
