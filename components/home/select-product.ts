import type { ProductId } from '@/lib/products'

export const SELECT_PRODUCT_EVENT = 'firefly:select-product'

/** Preselect a product in the home quote form and bring the form into view. */
export function selectProduct(id: ProductId) {
  window.dispatchEvent(new CustomEvent<ProductId>(SELECT_PRODUCT_EVENT, { detail: id }))
  document.getElementById('cotizar')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
