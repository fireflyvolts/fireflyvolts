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
  'meta_event_id',
])

type HubSpotResult = {
  response: Response
  data: Record<string, unknown>
  createdNewContact: boolean
}

type AutomationResult = {
  dealId?: string
  taskId?: string
  warning?: string
}

function compactProperties(properties: Record<string, string | undefined>) {
  return Object.fromEntries(
    Object.entries(properties).filter(([, value]) => typeof value === 'string' && value.length > 0)
  ) as Record<string, string>
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
    origen_lead: 'Web Firefly Volts',
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
  return { response, data, createdNewContact: response.status === 201 }
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

function isQualifiedLead(monthlyBillRange?: string) {
  return monthlyBillRange === '$500 mil a $750 mil' || monthlyBillRange === 'Más de $750 mil'
}

async function createAssociation(
  token: string,
  fromType: string,
  fromId: string,
  toType: string,
  toId: string
) {
  const response = await fetch(
    `${HUBSPOT_BASE_URL}/crm/v4/objects/${fromType}/${fromId}/associations/default/${toType}/${toId}`,
    {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
    }
  )

  if (!response.ok) {
    const data = await response.json().catch(() => ({}))
    throw new Error(String(data.message || `No se pudo asociar ${fromType} con ${toType}`))
  }
}

async function automateQualifiedLead(
  token: string,
  ownerId: string,
  contactId: string,
  submitted: Record<string, string>
): Promise<AutomationResult> {
  const company = submitted.company || submitted.nombre_del_negocio || submitted.firstname || submitted.email
  const dealResponse = await fetch(`${HUBSPOT_BASE_URL}/crm/v3/objects/deals`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: {
        dealname: `BESS – ${company}`,
        pipeline: 'default',
        dealstage: 'appointmentscheduled',
        hubspot_owner_id: ownerId,
      },
    }),
  })
  const dealData = await dealResponse.json().catch(() => ({})) as Record<string, unknown>
  const dealId = typeof dealData.id === 'string' ? dealData.id : ''

  if (!dealResponse.ok || !dealId) {
    throw new Error(String(dealData.message || 'No se pudo crear la oportunidad BESS'))
  }

  await createAssociation(token, 'deals', dealId, 'contacts', contactId)

  const dueAt = new Date(Date.now() + 10 * 60 * 1000).toISOString()
  const campaign = submitted.utm_campaign || 'sin campaña'
  const source = `${submitted.utm_source || 'direct'} / ${submitted.utm_medium || 'sin medio'}`
  const queueId = process.env.HUBSPOT_TASK_QUEUE_ID || '12835214'
  const taskResponse = await fetch(`${HUBSPOT_BASE_URL}/crm/v3/objects/tasks`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      properties: compactProperties({
        hs_timestamp: dueAt,
        hs_task_subject: `Contactar lead BESS – ${company}`,
        hs_task_body: [
          `Recibo mensual: ${submitted.monthly_bill_range}`,
          `Teléfono: ${submitted.phone || 'no indicado'}`,
          `Fuente / medio: ${source}`,
          `Campaña: ${campaign}`,
          'Objetivo: contactar al lead y solicitar un recibo reciente de CFE.',
        ].join('\n'),
        hs_task_status: 'NOT_STARTED',
        hs_task_priority: 'HIGH',
        hubspot_owner_id: ownerId,
        hs_queue_membership_ids: queueId,
      }),
    }),
  })
  const taskData = await taskResponse.json().catch(() => ({})) as Record<string, unknown>
  const taskId = typeof taskData.id === 'string' ? taskData.id : ''

  if (!taskResponse.ok || !taskId) {
    throw new Error(String(taskData.message || 'La oportunidad se creó, pero no se pudo crear la tarea'))
  }

  await Promise.all([
    createAssociation(token, 'tasks', taskId, 'contacts', contactId),
    createAssociation(token, 'tasks', taskId, 'deals', dealId),
  ])

  return { dealId, taskId }
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
      const contactId = typeof result.data.id === 'string' ? result.data.id : ''
      let automation: AutomationResult = {}

      if (result.createdNewContact && contactId && isQualifiedLead(submittedProperties.monthly_bill_range)) {
        try {
          automation = await automateQualifiedLead(
            HUBSPOT_TOKEN,
            HUBSPOT_OWNER_ID,
            contactId,
            submittedProperties
          )
        } catch (automationError) {
          console.error('[fireflyvolts] HubSpot automation error:', automationError)
          automation = {
            warning: 'El lead se guardó, pero la automatización comercial requiere revisión.',
          }
        }
      }

      return NextResponse.json({ success: true, contact: result.data, automation })
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
        const contactId = typeof fallbackResult.data.id === 'string' ? fallbackResult.data.id : ''
        let automation: AutomationResult = {}

        if (
          fallbackResult.createdNewContact &&
          contactId &&
          isQualifiedLead(submittedProperties.monthly_bill_range)
        ) {
          try {
            automation = await automateQualifiedLead(
              HUBSPOT_TOKEN,
              HUBSPOT_OWNER_ID,
              contactId,
              submittedProperties
            )
          } catch (automationError) {
            console.error('[fireflyvolts] HubSpot fallback automation error:', automationError)
            automation.warning = 'El lead se guardó, pero la automatización comercial requiere revisión.'
          }
        }

        return NextResponse.json({
          success: true,
          contact: fallbackResult.data,
          automation,
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
