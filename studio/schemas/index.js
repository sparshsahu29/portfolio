import { arsenalGrid, arsenalImage, arsenalVideo, services } from './services.js'
import { blogPage, contact, siteSettings } from './site.js'
import { about, hero, hireMe, philosophy, profile, randomThings, whatYoullSee } from './home.js'
import { caseStudy, metrics, results } from './results.js'
import { clientWork, testimonials, workTab } from './work.js'
import { post } from './post.js'

/**
 * Document types that exist exactly once. The desk structure opens them
 * directly instead of showing a list, and they cannot be deleted.
 */
export const singletonTypes = new Set([
  'siteSettings',
  'hero',
  'profile',
  'philosophy',
  'about',
  'whatYoullSee',
  'results',
  'caseStudy',
  'metrics',
  'services',
  'clientWork',
  'randomThings',
  'hireMe',
  'testimonials',
  'contact',
  'blogPage',
])

export const schemaTypes = [
  // objects
  arsenalVideo,
  arsenalImage,
  arsenalGrid,
  workTab,
  // singletons
  siteSettings,
  hero,
  profile,
  philosophy,
  about,
  whatYoullSee,
  results,
  caseStudy,
  metrics,
  services,
  clientWork,
  randomThings,
  hireMe,
  testimonials,
  contact,
  blogPage,
  // collections
  post,
]
