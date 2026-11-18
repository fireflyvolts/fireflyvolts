import { NextResponse, type NextRequest } from 'next/server'

/**
 * The live BESS ads still point at the home page, which is now multi-product.
 * Visitors who arrive at / from an ad click (Google or Meta click id in the URL) go to the BESS landing,
 * keeping every query parameter so attribution (gclid, fbclid, UTMs) survives.
 * Organic visitors to / are untouched. Remove this once the ads' final URLs point at /bess.
 */
const AD_CLICK_IDS = ['gclid', 'gbraid', 'wbraid', 'fbclid']

export function proxy(request: NextRequest) {
  const { searchParams } = request.nextUrl
  if (!AD_CLICK_IDS.some((id) => searchParams.has(id))) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = '/bess'
  return NextResponse.redirect(url, 307)
}

export const config = {
  matcher: '/',
}
