import type { ProductId } from '@/lib/products'

export const SELECT_PRODUCT_EVENT = 'firefly:select-product'

export type SelectProductDetail = {
  id: ProductId
  /** Calculator result, sent to HubSpot with the lead so sales sees what the visitor calculated. */
  summary?: string
}

/** Preselect a product in the quote form on the page and bring the form into view. */
export function selectProduct(id: ProductId, summary?: string) {
  window.dispatchEvent(new CustomEvent<SelectProductDetail>(SELECT_PRODUCT_EVENT, { detail: { id, summary } }))
  document.getElementById('cotizar')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
