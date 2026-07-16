import { NextResponse } from 'next/server'

const HUBSPOT_BASE_URL = 'https://api.hubapi.com'

const allowedProperties = new Set([
  'firstname',
  'email',
  'phone',
  'nombre_del_negocio',
  'company',
  'tipo_de_negocio',
  'preocupacion_principal',
  'fuente_del_lead',
  'producto_de_interes',
  'lead_source',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
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

  return parseHubSpotResponse(await updateContact(token, contactId, properties))
}

export async function POST(request: Request) {
  const HUBSPOT_TOKEN = process.env.HUBSPOT_API_KEY

  if (!HUBSPOT_TOKEN) {
    return NextResponse.json(
      { error: 'HubSpot API key not configured' },
      { status: 500 }
    )
  }

  try {
    const body = await request.json()
    const submittedProperties = body.properties || {}
    const properties = Object.fromEntries(
      Object.entries(submittedProperties)
        .filter(([key, value]) => allowedProperties.has(key) && typeof value === 'string')
        .map(([key, value]) => [key, String(value).slice(0, 2000)])
    )

    if (!properties.email) {
      return NextResponse.json({ error: 'El correo es obligatorio' }, { status: 400 })
    }

    const result = await saveContact(HUBSPOT_TOKEN, properties)

    if (result.response.ok) {
      return NextResponse.json({ success: true, contact: result.data })
    }

    const fallbackProperties = {
      firstname: properties.firstname,
      email: properties.email,
      phone: properties.phone,
      company: properties.company || properties.nombre_del_negocio,
      lifecyclestage: 'lead',
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
