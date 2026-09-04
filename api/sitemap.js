/**
 * Live sitemap for Google Search Console — served at /sitemap.xml via the
 * rewrite in vercel.json. Published blog posts are read straight from Sanity
 * at request time, so a new post is indexed without a redeploy.
 */
const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
]

const escape = (s) =>
  String(s).replace(/[<>&'"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c])

async function fetchPosts() {
  const projectId = process.env.VITE_SANITY_PROJECT_ID
  const dataset = process.env.VITE_SANITY_DATASET || 'production'
  if (!projectId) return []

  const query = encodeURIComponent(
    `*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]{ "slug": slug.current, "updated": coalesce(_updatedAt, date) }`,
  )
  const url = `https://${projectId}.apicdn.sanity.io/v2024-10-01/data/query/${dataset}?query=${query}`

  try {
    const res = await fetch(url)
    if (!res.ok) return []
    const { result } = await res.json()
    return Array.isArray(result) ? result : []
  } catch {
    return []
  }
}

export default async function handler(req, res) {
  const host = req.headers['x-forwarded-host'] || req.headers.host
  const origin = process.env.SITE_URL || `https://${host}`
  const posts = await fetchPosts()

  const urls = [
    ...STATIC_PAGES.map(
      (p) =>
        `<url><loc>${escape(origin + p.path)}</loc><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`,
    ),
    ...posts.map(
      (p) =>
        `<url><loc>${escape(`${origin}/blog/${p.slug}`)}</loc>${
          p.updated ? `<lastmod>${escape(String(p.updated).slice(0, 10))}</lastmod>` : ''
        }<changefreq>monthly</changefreq><priority>0.6</priority></url>`,
    ),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`

  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  res.status(200).send(xml)
}
