import { createClient } from '@sanity/client'

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
