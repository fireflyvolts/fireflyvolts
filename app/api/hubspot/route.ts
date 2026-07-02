import { NextResponse } from 'next/server'

const HUBSPOT_BASE_URL = 'https://api.hubapi.com'

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
    const properties = body.properties || {}

    const response = await createContact(HUBSPOT_TOKEN, properties)

    const data = await response.json()

    if (response.ok) {
      return NextResponse.json({ success: true, contact: data })
    }

    const fallbackProperties = {
      firstname: properties.firstname,
      phone: properties.phone,
      company: properties.company || properties.nombre_del_negocio,
      lifecyclestage: 'lead',
    }

    if (response.status === 400) {
      const fallbackResponse = await createContact(HUBSPOT_TOKEN, fallbackProperties)
      const fallbackData = await fallbackResponse.json()

      if (fallbackResponse.ok) {
        return NextResponse.json({
          success: true,
          contact: fallbackData,
          warning: 'Lead created with standard HubSpot fields. Check custom property mapping.',
        })
      }
    }

    console.error('[fireflyvolts] HubSpot API Error:', data)
    return NextResponse.json(
      { error: data.message || 'Error al crear contacto' },
      { status: response.status }
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
