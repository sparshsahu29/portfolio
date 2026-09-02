import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-10-01'

/**
 * True once the project id is present in .env.
 * Until then the whole site renders from src/data/content.js, so nothing is
 * ever blank while the studio is being set up.
 */
export const isSanityConfigured = Boolean(projectId)

export const sanityClient = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: 'published',
    })
  : null

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null

/** Turn a Sanity image ref into a URL. Returns null for anything unusable. */
export function urlFor(source, { width, height, quality = 82 } = {}) {
  if (!source) return null
  // already a plain path (the static fallback content)
  if (typeof source === 'string') return source
  if (!builder) return null

  let img = builder.image(source).auto('format').quality(quality)
  if (width) img = img.width(width)
  if (height) img = img.height(height)
  return img.url()
}

/** Normalise either a Sanity image object or a static string path to a URL. */
export const imgSrc = (source, opts) => urlFor(source, opts) ?? null
