'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    gtag?: (
      command: 'event',
      eventName: string,
      parameters?: Record<string, string | number>
    ) => void
  }
}

export function ConversionTracker() {
  useEffect(() => {
    const conversionKey = 'firefly_lead_conversion'
    const rawConversion = window.sessionStorage.getItem(conversionKey)

    if (!rawConversion) return

    let conversion: Record<string, string> = {}
    try {
      conversion = JSON.parse(rawConversion)
    } catch {
      conversion = {}
    }

    let attempts = 0
    let googleTracked = false
    let metaTracked = false
    const trackConversion = () => {
      if (!googleTracked && window.gtag) {
        window.gtag('event', 'generate_lead', {
          lead_source: 'landing_bess',
          monthly_bill_range: conversion.monthly_bill_range || 'not_set',
        })
        googleTracked = true
      }

      if (!metaTracked && window.fbq) {
        window.fbq(
          'track',
          'Lead',
          {
            content_name: 'BESS / Peak shaving',
            lead_source: 'landing_bess',
          },
          conversion.meta_event_id ? { eventID: conversion.meta_event_id } : undefined
        )
        metaTracked = true
      }

      if ((googleTracked && metaTracked) || attempts >= 50) {
        window.sessionStorage.removeItem(conversionKey)
        return
      }

      attempts += 1
      window.setTimeout(trackConversion, 100)
    }

    trackConversion()
  }, [])

  return null
}
