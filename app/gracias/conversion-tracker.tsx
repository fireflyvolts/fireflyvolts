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

    let attempts = 0
    const trackConversion = () => {
      if (!window.gtag && attempts < 20) {
        attempts += 1
        window.setTimeout(trackConversion, 100)
        return
      }

      if (!window.gtag) return

      let conversion: Record<string, string> = {}
      try {
        conversion = JSON.parse(rawConversion)
      } catch {
        conversion = {}
      }

      window.gtag('event', 'generate_lead', {
        lead_source: 'landing_bess',
        monthly_bill_range: conversion.monthly_bill_range || 'not_set',
      })
      window.sessionStorage.removeItem(conversionKey)
    }

    trackConversion()
  }, [])

  return null
}
