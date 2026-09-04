/**
 * One-time seed: pushes everything in src/data/content.js into Sanity so the
 * Studio opens fully populated and every item can be edited or removed.
 *
 *   SANITY_WRITE_TOKEN=... node scripts/seed-sanity.mjs [--force]
 *
 * Reads project id / dataset from .env (VITE_SANITY_PROJECT_ID, VITE_SANITY_DATASET).
 * Safe to re-run: it skips documents that already exist unless --force is given.
 * Assets are de-duplicated by Sanity on content hash, so re-uploads are cheap.
 */
import { createClient } from '@sanity/client'
import { createReadStream, existsSync, readFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import content from '../src/data/content.js'

const root = fileURLToPath(new URL('..', import.meta.url))

function loadEnv() {
  const file = join(root, '.env')
  if (!existsSync(file)) return
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/)
    if (m && !(m[1] in process.env)) process.env[m[1]] = (m[2] ?? '').replace(/^["']|["']$/g, '')
  }
}
loadEnv()

const projectId = process.env.SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID
const dataset = process.env.SANITY_DATASET || process.env.VITE_SANITY_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN
const force = process.argv.includes('--force')

if (!projectId || !token) {
  console.error('Need VITE_SANITY_PROJECT_ID (in .env) and SANITY_WRITE_TOKEN (env var).')
  process.exit(1)
}

const client = createClient({ projectId, dataset, token, apiVersion: '2024-10-01', useCdn: false })

/* ------------------------------------------------------------- helpers */

let keyN = 0
const key = () => `k${(keyN += 1).toString(36)}`

const assetCache = new Map()

/** Upload a file from /public and return a Sanity asset reference. */
async function upload(kind, publicPath) {
  if (!publicPath) return undefined
  const cacheKey = `${kind}:${publicPath}`
  if (assetCache.has(cacheKey)) return assetCache.get(cacheKey)

  const file = join(root, 'public', publicPath)
  if (!existsSync(file)) {
    console.warn(`  ! missing ${publicPath}`)
    return undefined
  }
  const asset = await client.assets.upload(kind, createReadStream(file), { filename: basename(file) })
  const ref = {
    _type: kind,
    asset: { _type: 'reference', _ref: asset._id },
  }
  assetCache.set(cacheKey, ref)
  process.stdout.write('.')
  return ref
}

const img = (p) => upload('image', p)
const vid = (p) => upload('file', p)

const withKeys = (arr = []) => arr.map((x) => ({ _key: key(), ...x }))
const slug = (s) => ({ _type: 'slug', current: s })

async function imgs(paths = []) {
  const out = []
  for (const p of paths) {
    const r = await img(p)
    if (r) out.push({ _key: key(), ...r })
  }
  return out
}

/* ----------------------------------------------------------- documents */

async function buildDocs() {
  const c = content
  const docs = []
  const add = (type, fields) => docs.push({ _id: type, _type: type, ...fields })

  add('siteSettings', {
    brand: c.nav.brand,
    brandTagline: c.nav.brandTagline,
    navLinks: withKeys(c.nav.links.map((l) => ({ label: l.label, to: l.to, hash: l.hash ?? '' }))),
    ctaLabel: c.cta.label,
    ctaHeroLabel: c.cta.heroLabel,
    ctaClosingLabel: c.cta.closingLabel,
    ctaSubject: c.cta.subject,
    ctaBody: c.cta.body,
  })

  add('hero', {
    eyebrow: c.hero.eyebrow,
    headline: c.hero.headline,
    tagline: c.hero.tagline,
    subheadline: c.hero.subheadline,
    primaryCta: c.hero.primaryCta,
    secondaryCta: c.hero.secondaryCta,
  })

  console.log('\nprofile portraits')
  add('profile', {
    firstName: c.profile.firstName,
    lastName: c.profile.lastName,
    fullName: c.profile.fullName,
    headline: c.profile.headline,
    tagline: c.profile.tagline,
    roles: c.profile.roles,
    legacyRoles: c.profile.legacyRoles,
    oneLiner: c.profile.oneLiner,
    location: c.profile.location,
    email: c.profile.email,
    yearsExperience: c.profile.yearsExperience,
    portraitRed: await img(c.profile.portraitRed),
    portraitDress: await img(c.profile.portraitDress),
    portraitPhoto: await img(c.profile.portraitPhoto),
    portraitHire: await img(c.profile.portraitHire),
    socials: withKeys(c.profile.socials ?? []),
  })

  add('philosophy', { title: c.philosophy.title })
  add('about', { ...c.about })
  add('randomThings', { ...c.randomThings })
  add('whatYoullSee', {
    title: c.whatYoullSee.title,
    subtitle: c.whatYoullSee.subtitle,
    items: withKeys(c.whatYoullSee.items),
  })
  add('results', { ...c.results })

  console.log('\ncase study')
  add('caseStudy', {
    client: c.caseStudy.client,
    eyebrow: c.caseStudy.eyebrow,
    before: c.caseStudy.before,
    after: c.caseStudy.after,
    afterSuffix: c.caseStudy.afterSuffix,
    milestone: c.caseStudy.milestone,
    proofImage: await img(c.caseStudy.proofImage),
    breakdown: withKeys(c.caseStudy.breakdown),
  })

  console.log('\nmetrics boards')
  const boards = []
  for (const b of c.metrics.boards) boards.push({ _key: key(), label: b.label, image: await img(b.image) })
  add('metrics', {
    title: c.metrics.title,
    cards: withKeys(c.metrics.cards),
    headline: withKeys(c.metrics.headline),
    boards,
  })

  console.log('\narsenal (videos are large — this takes a while)')
  const grids = []
  for (const g of c.services.grids) {
    const items = []
    for (const it of g.items) {
      if (it.type === 'video') {
        items.push({
          _key: key(),
          _type: 'arsenalVideo',
          title: it.title,
          meta: it.meta,
          note: it.note,
          video: await vid(it.src),
          poster: await img(it.poster),
        })
      } else {
        items.push({
          _key: key(),
          _type: 'arsenalImage',
          title: it.title,
          meta: it.meta,
          note: it.note,
          image: await img(it.image),
        })
      }
    }
    grids.push({
      _key: key(),
      _type: 'arsenalGrid',
      title: g.title,
      slug: slug(g.id),
      blurb: g.blurb,
      deliverables: g.deliverables,
      items,
    })
  }
  add('services', { eyebrow: c.services.eyebrow, title: c.services.title, subtitle: c.services.subtitle, grids })

  console.log('\ncopywriting portfolio')
  const tabs = []
  for (const t of c.clientWork.tabs) {
    tabs.push({
      _key: key(),
      _type: 'workTab',
      label: t.label,
      slug: slug(t.id),
      note: t.note,
      images: await imgs(t.images),
    })
  }
  add('clientWork', {
    eyebrow: c.clientWork.eyebrow,
    title: c.clientWork.title,
    subtitle: c.clientWork.subtitle,
    tabs,
  })

  add('hireMe', { ...c.hireMe })

  console.log('\ntestimonials')
  const items = []
  for (const t of c.testimonials.items) {
    items.push({
      _key: key(),
      name: t.name,
      role: t.role,
      relationship: t.relationship,
      date: t.date,
      quote: t.quote,
      screenshot: await img(t.screenshot),
      url: t.url,
    })
  }
  add('testimonials', { title: c.testimonials.title, subtitle: c.testimonials.subtitle, items })

  console.log('\ncontact')
  add('contact', {
    kicker: c.contact.kicker,
    line1: c.contact.line1,
    line2: c.contact.line2,
    name: c.contact.name,
    location: c.contact.location,
    email: c.contact.email,
    linkedin: c.contact.linkedin,
    linkedinHandle: c.contact.linkedinHandle,
    card: await img(c.contact.card),
    signOff: await img(c.contact.signOff),
  })

  add('blogPage', { ...c.blogPage })

  return docs
}

/* ---------------------------------------------------------------- run */

const ids = [
  'siteSettings', 'hero', 'profile', 'philosophy', 'about', 'randomThings', 'whatYoullSee',
  'results', 'caseStudy', 'metrics', 'services', 'clientWork', 'hireMe', 'testimonials',
  'contact', 'blogPage',
]
const existing = new Set(await client.fetch(`*[_id in $ids]._id`, { ids }))
if (existing.size && !force) {
  console.log(`already in Sanity: ${[...existing].join(', ')}`)
}

const docs = await buildDocs()
const tx = client.transaction()
let written = 0
for (const doc of docs) {
  if (existing.has(doc._id) && !force) {
    console.log(`\nskip ${doc._id} (exists — use --force to overwrite)`)
    continue
  }
  tx.createOrReplace(doc)
  written += 1
}
if (written) {
  await tx.commit()
  console.log(`\n\nseeded ${written} documents into ${projectId}/${dataset}`)
} else {
  console.log('\n\nnothing to write')
}
