import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import staticContent from '../data/content.js'
import { isSanityConfigured, sanityClient } from '../lib/sanity.js'
import { siteQuery } from '../lib/queries.js'

const ContentContext = createContext({ ...staticContent, source: 'static', loading: false })

export const useContent = () => useContext(ContentContext)

const isPlainObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v)

/** Treat null / undefined / empty array / empty string as "not authored yet". */
const isEmpty = (v) =>
  v === null ||
  v === undefined ||
  (Array.isArray(v) && v.length === 0) ||
  (typeof v === 'string' && v.trim() === '')

/**
 * Deep-merge the CMS response over the static defaults.
 * Anything the editor has not filled in keeps its PDF-derived value, so the
 * site can never render a blank section.
 */
function merge(base, incoming) {
  if (isEmpty(incoming)) return base
  if (!isPlainObject(base) || !isPlainObject(incoming)) return incoming

  const out = { ...base }
  for (const [key, value] of Object.entries(incoming)) {
    if (isEmpty(value)) continue
    out[key] = isPlainObject(base[key]) ? merge(base[key], value) : value
  }
  return out
}

/** Sanity stores key/value rows as objects; the components expect [k, v] pairs. */
function normalise(data) {
  if (!data) return data
  const next = { ...data }

  if (next.metrics?.detail) {
    next.metrics = {
      ...next.metrics,
      detail: next.metrics.detail.map((d) => ({
        ...d,
        rows: Array.isArray(d.rows)
          ? d.rows.map((r) => (Array.isArray(r) ? r : [r.key, r.value]))
          : [],
      })),
    }
  }

  if (next.services?.grids) {
    next.services = {
      ...next.services,
      grids: next.services.grids
        .filter(Boolean)
        .map((g) => ({
          ...g,
          deliverables: g.deliverables ?? [],
          items: (g.items ?? [])
            .map((item) => {
              const type = item.type ?? (item.src ? 'video' : 'image')
              return { ...item, type }
            })
            // an item the editor has not finished uploading simply does not render
            .filter((item) => (item.type === 'video' ? Boolean(item.src) : Boolean(item.image))),
        }))
        .filter((g) => g.items.length > 0),
    }
  }

  if (next.marketing?.sections) {
    next.marketing = {
      ...next.marketing,
      sections: next.marketing.sections.map((s) => ({
        ...s,
        items: (s.items ?? []).map((item) => ({
          ...item,
          links: (item.links ?? []).map((l) => (typeof l === 'string' ? { label: l, url: null } : l)),
        })),
      })),
    }
  }

  return next
}

export function ContentProvider({ children }) {
  const [remote, setRemote] = useState(null)
  const [loading, setLoading] = useState(isSanityConfigured)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isSanityConfigured || !sanityClient) return
    let cancelled = false

    sanityClient
      .fetch(siteQuery)
      .then((data) => {
        if (!cancelled) setRemote(normalise(data))
      })
      .catch((err) => {
        console.error('[sanity] falling back to static content:', err)
        if (!cancelled) setError(err)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const value = useMemo(() => {
    const merged = remote ? merge(staticContent, remote) : staticContent
    return {
      ...merged,
      loading,
      error,
      source: remote ? 'sanity' : 'static',
    }
  }, [remote, loading, error])

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}
