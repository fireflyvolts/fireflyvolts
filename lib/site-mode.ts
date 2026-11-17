/**
 * Placeholder content (invented testimonials, figures, logos, photos and unconfirmed prices) is for the demo only.
 * It shows in local development and on Vercel previews, and is hidden everywhere else, including fireflyvolts.com.
 * Hidden is the default so production stays clean even if Vercel's system variables are not exposed.
 * Set NEXT_PUBLIC_SHOW_PLACEHOLDERS=true or false to force either mode.
 */
const forced = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS

export const showPlaceholders = forced
  ? forced === 'true'
  : process.env.NODE_ENV === 'development' || process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
