import { arsenalGrid, arsenalImage, arsenalVideo, services } from './services.js'

/**
 * Document types that exist exactly once. The desk structure opens them
 * directly instead of showing a list.
 */
export const singletonTypes = new Set(['services'])

export const schemaTypes = [
  // objects
  arsenalVideo,
  arsenalImage,
  arsenalGrid,
  // documents
  services,
]
