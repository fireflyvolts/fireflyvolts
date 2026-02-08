import { NextResponse } from 'next/server'

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

    const response = await fetch(
      'https://api.hubapi.com/crm/v3/objects/contacts',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${HUBSPOT_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: body.properties,
        }),
      }
    )

    const data = await response.json()

    if (response.ok) {
      return NextResponse.json({ success: true, contact: data })
    } else {
      console.error('[v0] HubSpot API Error:', data)
      return NextResponse.json(
        { error: data.message || 'Error al crear contacto' },
        { status: response.status }
      )
    }
  } catch (error) {
    console.error('[v0] Server Error:', error)
    return NextResponse.json(
      { error: 'Error de conexión' },
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
