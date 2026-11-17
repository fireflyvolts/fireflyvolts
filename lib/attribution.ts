const STORAGE_KEY = 'firefly_attribution'

const TRACKED_PARAMS = [
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
  'gclid',
  'gbraid',
  'wbraid',
] as const

/** Same first-touch attribution the BESS landing stores, so leads from any page reach HubSpot with UTMs. */
export function readAttribution(): Record<string, string> {
  if (typeof window === 'undefined') return {}

  const params = new URLSearchParams(window.location.search)
  let stored: Record<string, string> = {}
  try {
    stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    stored = {}
  }

  const current = Object.fromEntries(
    TRACKED_PARAMS.map((key) => [key, params.get(key) || ''] as const).filter(([, value]) => value)
  )

  const attribution = {
    ...stored,
    ...current,
    utm_source: current.utm_source || stored.utm_source || 'direct',
    landing_page: stored.landing_page || window.location.pathname,
    page_url: window.location.href,
    referrer: stored.referrer || document.referrer || '',
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution))
  } catch {
    // Private mode or blocked storage: the lead still goes out without stored attribution.
  }
  return attribution
}
