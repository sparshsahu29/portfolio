/**
 * Publishes one fully-featured sample blog post so the blog layout can be
 * reviewed with real structure (cover, excerpt, headings, quote, list, image).
 *
 *   $env:SANITY_WRITE_TOKEN="..."; node scripts/seed-sample-post.mjs
 *
 * Delete it afterwards from the Studio (Blog posts → "Positioning is a ...").
 */
import { createClient } from '@sanity/client'
import { createReadStream, existsSync, readFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import { fileURLToPath } from 'node:url'

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

if (!projectId || !token) {
  console.error('Need VITE_SANITY_PROJECT_ID (in .env) and SANITY_WRITE_TOKEN (env var).')
  process.exit(1)
}

const client = createClient({ projectId, dataset, token, apiVersion: '2024-10-01', useCdn: false })

let n = 0
const key = () => `k${(n += 1).toString(36)}`

async function img(publicPath, extra = {}) {
  const file = join(root, 'public', publicPath)
  const asset = await client.assets.upload('image', createReadStream(file), { filename: basename(file) })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id }, ...extra }
}

const p = (text, marks = []) => ({
  _type: 'block',
  _key: key(),
  style: 'normal',
  markDefs: [],
  children: [{ _type: 'span', _key: key(), text, marks }],
})
const h2 = (text) => ({ ...p(text), style: 'h2' })
const quote = (text) => ({ ...p(text), style: 'blockquote' })
const bullet = (text) => ({ ...p(text), listItem: 'bullet', level: 1 })

/** A paragraph with one bold run in the middle. */
const rich = (before, strong, after) => ({
  _type: 'block',
  _key: key(),
  style: 'normal',
  markDefs: [],
  children: [
    { _type: 'span', _key: key(), text: before, marks: [] },
    { _type: 'span', _key: key(), text: strong, marks: ['strong'] },
    { _type: 'span', _key: key(), text: after, marks: [] },
  ],
})

const slug = 'positioning-is-a-three-second-decision'

// ids containing a "." are private paths in Sanity (like drafts.*) — keep it dash-only
const doc = {
  _id: `post-${slug}`,
  _type: 'post',
  title: 'Positioning is a three-second decision. Make it before you post.',
  slug: { _type: 'slug', current: slug },
  category: 'Strategy',
  date: '2026-09-01',
  readingTime: '6 min read',
  excerpt:
    'Most brands write the caption first and figure out who it is for later. Here is the order that actually moves numbers.',
  cover: await img('assets/social/grid-1.png', { alt: 'A content calendar laid out on paper' }),
  body: [
    p(
      'Every feed I have ever taken over had the same problem, and it was never the design. It was that nobody could tell me, in one sentence, who the brand was talking to and why that person should care today.',
    ),
    rich(
      'That sentence is positioning. It is not a tagline and it is not a mission statement. It is the ',
      'one thing your reader should believe after three seconds',
      ' with your post. If you cannot say it, the post is a coin flip.',
    ),
    h2('Why three seconds'),
    p(
      'Three seconds is roughly how long a thumb hovers before it scrolls. In that window the reader decides two things: is this for me, and is it worth a stop. Positioning answers the first. Craft answers the second. Most content skips straight to craft.',
    ),
    quote('You do not have an attention problem. You have a relevance problem wearing an attention costume.'),
    h2('The order that works'),
    p('When I plan a month of content for a brand, the sequence is always the same:'),
    bullet('Who is this for, described as a person and not a demographic.'),
    bullet('What do they already believe, and what do we need them to believe instead.'),
    bullet('What is the one proof point that makes the shift credible.'),
    bullet('Only now: format, hook, caption, creative.'),
    p(
      'Notice that the fun part comes last. That is deliberate. Creative decisions made before positioning are decorations on a house with no foundation. They can look great and still fall over.',
    ),
    {
      _type: 'image',
      _key: key(),
      ...(await img('assets/social/insights-1.png')),
      alt: 'Instagram insights showing follower growth',
      caption: 'Same brand, same budget. The only change was the order of decisions.',
    },
    h2('What changed for Wholeleaf'),
    p(
      'When we rebuilt the Wholeleaf feed around a single reader, a health-conscious buyer who distrusted "natural" claims, the content got narrower and the numbers got wider. Fewer posts, more saves, and a follower base that actually converted because every post was for them.',
    ),
    p(
      'Positioning before posting is not a slogan I picked because it rhymes. It is the only part of this job that reliably compounds.',
    ),
  ],
  seoTitle: 'Positioning is a three-second decision',
  seoDescription:
    'Why positioning has to come before creative, and the four-step order that turns a feed into a growth channel.',
}

await client.createOrReplace(doc)
await client.delete(`post.${slug}`).catch(() => {})
console.log(`published /blog/${slug}`)
