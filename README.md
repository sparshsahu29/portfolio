# Palak Agarwal — Portfolio Website

Personal portfolio for **Palak Agarwal** (MBA · Brand Marketer · Product Marketer · Creative
Strategist). Built from her existing Canva PDF portfolio.

**Current stage:** the Paper Trail design is live at `/`. Content is served from Sanity when
configured and falls back to `src/data/content.js` otherwise, so the site is never blank.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

To connect the CMS, copy `.env.example` to `.env` and fill in `VITE_SANITY_PROJECT_ID`.
Without it the site renders the static fallback content.

## Routes

| Route             | What it is                                                  |
| ----------------- | ----------------------------------------------------------- |
| `/`               | Homepage — Hook, Who I am, Case study, Arsenal, Client work, Why hire me, Contact |
| `/blog`           | Blog index with category filter + search                    |
| `/blog/:slug`     | Individual post, Portable Text                              |
| `/design-review`  | Archive of the four round-1 directions (not linked from nav) |

---

## Sanity Studio

The editing dashboard lives in `studio/` as its own small app:

```bash
cd studio
cp .env.example .env     # add SANITY_STUDIO_PROJECT_ID
npm install
npm run dev              # http://localhost:3333
npm run deploy           # hosts it at <name>.sanity.studio
```

**What is editable.** Everything on the site. The desk is laid out in page order:
*Homepage — in page order* (Hero → Who I am → What you'll see next → Results → The Arsenal →
Copywriting portfolio → Random things → Why hire me → Testimonials → Contact), *Blog* (posts +
page headings), *Profile & portraits*, *Site settings* (menu, email button). Every list —
portfolio screenshots, Arsenal creatives, testimonials, skills, one-liners, timeline stops,
breakdown bullets, numbers — supports add, drag-to-reorder and remove. An emptied list stays
empty on the site; it does not fall back to the defaults.

**Seeding.** The Studio starts blank. Push the current site content (and upload every image and
video) once with an Editor token from sanity.io/manage → API → Tokens:

```bash
SANITY_WRITE_TOKEN=sk... npm run seed:sanity          # skips docs that already exist
SANITY_WRITE_TOKEN=sk... npm run seed:sanity -- --force  # overwrite everything
```

On PowerShell: `$env:SANITY_WRITE_TOKEN="sk..."; npm run seed:sanity`.

**Managing the Arsenal.** Open *Homepage → 5 · The Arsenal*. Each grid (Creative Strategy,
Influencer Collabs, Content Creation) has a *Creatives* list. Click **+** and choose
*Video* or *Static creative*, fill in title / label / note, upload the file, publish. Drag to
reorder, use the item menu to remove. Items without a file are skipped by the site, so a
half-finished entry can never break the page.

**Managing the copywriting portfolio.** *Homepage → 6 · Copywriting portfolio*. Each tab
(Social, Blogs, Emails, Website Copy) has a *Screenshots* list — select many files at once to
bulk upload, drag to reorder, remove from the item menu. Tabs themselves can be added or removed.

**Video guidelines.** Vertical 9:16, H.264 MP4, ideally under 15 MB. The originals in
`portfolio assets/` were 25–160 MB each; the web copies in `public/assets/video/` were made with:

```bash
ffmpeg -i in.mp4 -vf "scale=720:1280" -c:v libx264 -crf 28 -maxrate 2200k -bufsize 4400k \
  -movflags +faststart -c:a aac -b:a 96k out.mp4
ffmpeg -ss 3 -i in.mp4 -frames:v 1 -q:v 4 poster.jpg
```

## Where the fallback content lives

```
src/data/content.js
```

Each export maps 1:1 to a Sanity document (`src/lib/queries.js` has the GROQ). Anything the CMS
returns is deep-merged over this file in `src/content/ContentContext.jsx`.

| Export         | Source in the PDF                            |
| -------------- | -------------------------------------------- |
| `profile`      | Cover page                                    |
| `about`        | "Hey! I'm Palak"                              |
| `randomThings` | "Random things about me."                     |
| `whatYoullSee` | "What You'll See Next"                        |
| `caseStudy`    | WHOLELEAF before/after + breakdown            |
| `metrics`      | Ads-manager dashboards + Instagram insights   |
| `socialMedia`  | Social Media pages                            |
| `blogs`        | Blogs pages (11 niches)                       |
| `emails`       | Emails page                                   |
| `services`     | The Arsenal — videos + static creatives        |
| `clientWork`   | Blogs / Emails / Website copy / Social tabs    |
| `websiteCopy`  | Website Copy page                             |
| `hireMe`       | "Why Should A Brand Hire Me?"                 |
| `testimonials` | Testimonials pages                            |
| `contact`      | Closing page                                  |
| `posts`        | Placeholder blog posts (Sanity will own these)|

## Assets

All 68 images were extracted programmatically from the source PDF and organised under
`public/assets/`:

```
texture/     paper, ruled notebook, grid, kraft   (the scrapbook look)
portrait/    the red duotone cutouts + photos
doodle/      hand-drawn social icons, sign-off
metrics/     ads manager screenshots
social/      instagram insights + feed grids
blogs/       published article screenshots
emails/      email design screenshots
influencer/  creator collab stills
static-ads/  static ad creatives
video/       transcoded 720x1280 MP4s + poster JPGs (the Arsenal)
video-ads/   video ad stills from the PDF (superseded by video/)
creation/    UGC / reel stills from the PDF (superseded by video/)
website-copy/ landing page screenshots
testimonials/ client screenshots
work/        Shark Tank / WHOLELEAF proof
```

`_pdf-extract/` is the raw, unsorted dump from the PDF. It is gitignored and safe to delete.

## Design tokens

Lifted directly from the PDF:

| Token       | Hex       | Used for                    |
| ----------- | --------- | --------------------------- |
| `crimson`   | `#C01111` | primary accent              |
| `cream`     | `#F2F1EB` | page background             |
| `ink`       | `#121212` | body text                   |
| `bronze`    | `#734E0A` | secondary highlight         |
| `umber`     | `#785D2B` | tertiary                    |
| `kraft`     | `#9E8463` | paper elements              |
| `mint`      | `#79BBA6` | positive metrics            |

Fonts in the PDF were Canva Sans, DO Sans and a marker face. Closest free web equivalents in use:
**DM Sans** (body), **Playfair Display** / **Instrument Serif** (display), **Caveat** (handwriting),
**Space Grotesk** + **JetBrains Mono** (the data-forward direction).

---

## Next steps

1. Studio schemas for the remaining sections (hero, about, case study, client work,
   testimonials, contact, blog posts) — the frontend queries already exist for all of them.
2. Create the Sanity project, seed it from `content.js`, upload the videos.
3. SEO (react-helmet-async or SSG), analytics, deploy.
