# Handover — Palak Agarwal Portfolio

Everything needed to own and run the site. Three services, all on free tiers.

| Service | What it does | Where |
| ------- | ------------ | ----- |
| **GitHub** | Stores the code | github.com/sparshsahu29/portfolio |
| **Vercel** | Builds the code and serves the website | vercel.com → project `portfolio` |
| **Sanity** | Stores all content (text, images, videos, blog posts) + the editing dashboard | sanity.io/manage → project `82gh9vdq` |

Content changes never need a developer: edit in the Studio → Publish → live in ~1 minute.
Code changes are pushed to GitHub → Vercel rebuilds automatically.

---

## 1. Accounts Palak needs (create first)

- **GitHub** account — github.com/signup
- **Vercel** account — vercel.com/signup → *Continue with GitHub*
- **Sanity** — no separate signup; she logs into the Studio with Google

## 2. Transfer order

Do these in order; each step depends on the one before.

### 2.1 GitHub — transfer the repository
1. Repo → **Settings → General → Danger Zone → Transfer ownership**.
2. Enter her GitHub username. She accepts the emailed invite within 24 h.
3. Vercel's Git connection breaks on transfer — fixed in 2.2.

### 2.2 Vercel — transfer the project
1. Vercel → project `portfolio` → **Settings → General → Transfer Project** → choose her account (she must have accepted a team invite or be logged in on the same browser; alternatively she imports the repo herself — see *Fresh setup* below).
2. After transfer, on **her** account: **Settings → Git** → reconnect to the repo under her GitHub.
3. **Settings → Environment Variables** — these MUST exist or the site shows placeholder content:

   | Name | Value | Environments |
   | ---- | ----- | ------------ |
   | `VITE_SANITY_PROJECT_ID` | `82gh9vdq` | Production, Preview, Development |
   | `VITE_SANITY_DATASET` | `production` | Production, Preview, Development |

4. **Deployments → ⋯ → Redeploy** so the variables take effect.
5. Confirm at `https://<domain>/blog` that the sample post appears (proves Sanity is connected).

**Fresh setup instead of transfer** (equally fine): she goes to vercel.com/new → imports the repo → Framework *Vite* (auto-detected) → adds the two env vars above → Deploy. Then she picks the domain under **Settings → Domains**.

### 2.3 Sanity — make her the owner
1. sanity.io/manage → project → **Members → Invite** → her email, role **Administrator**.
2. She accepts; she is now a full owner. You can leave the project later (**Members → Leave**) or stay as maintainer.
3. **API → CORS origins** must list every domain the website is served from, e.g.
   `https://palak-agarwal-portfolio.vercel.app` (and any custom domain), **Allow credentials: off**.
   Missing origin → browser blocks content → placeholder site.
4. **API → Tokens** — should be empty. No token is needed for the live site. Only create one (Editor role) if re-running `npm run seed:sanity`, and revoke it after.

### 2.4 Studio (the editing dashboard)
- Hosted at `https://<hostname>.sanity.studio` (hostname is set in `studio/sanity.cli.js` / on first `npx sanity deploy`).
- Redeploy only after a schema change: `cd studio && npm install && npx sanity deploy`.
- She signs in with Google using the email invited in 2.3.

---

## 3. Custom domain (optional, when she buys one)
1. Vercel → **Settings → Domains → Add** → follow the DNS records shown (A / CNAME at the registrar). Vercel issues HTTPS automatically.
2. Sanity → **API → CORS origins** → add `https://her-domain.com`.
3. In the code, replace `palak-agarwal-portfolio.vercel.app` with the new domain in `index.html` (canonical, `og:url`, `og:image`, `twitter:image`) and `public/robots.txt`, then push.
4. Google Search Console → add the new domain as a property → submit `sitemap.xml` again.

## 4. Google Search Console
1. search.google.com/search-console → **Add property → URL prefix** → the site URL.
2. Verify with **HTML tag**: paste the `<meta name="google-site-verification" …>` line into `index.html` inside `<head>`, push, then click Verify.
3. **Sitemaps → Add** `sitemap.xml`. It updates itself whenever a blog post is published.
4. **URL inspection** → paste the home URL → **Request indexing**.

## 5. Sharing the link
Link previews (Threads / WhatsApp / LinkedIn) use `/og-image.jpg`. If a platform shows a stale card, run the URL through developers.facebook.com/tools/debug → **Scrape again**.

---

## 6. Day-to-day for Palak (no code)

- **Edit any text/image**: Studio → section in the left rail → change → **Publish**.
- **New blog post**: *Blog posts → +* → title, category, date, read time, excerpt, cover, body → Publish. It appears on `/blog`, in the sitemap and on the homepage teaser.
- **Portfolio screenshots**: *Copywriting portfolio → tab → Screenshots* → **+** (multi-select upload). Click an item to add **Link to the original** — with a link the card opens the piece, without it opens full-size.
- **Videos (Arsenal)**: vertical 9:16 MP4, under ~15 MB, plus a poster image.
- **Menu links / Email button text**: *Site settings*.
- **Undo**: any document → **History** (clock icon) → restore.
- Deleting every item in a list hides that block; a half-filled item is skipped, so nothing she does can blank the site.

## 7. Limits & costs
- Vercel Hobby: free, 100 GB bandwidth/month.
- Sanity Free: 100 GB bandwidth, 20 GB assets, 3 users (Admin counts as one).
- GitHub: free.
- All comfortably above a portfolio's needs. Vercel Hobby forbids commercial *products*, a personal portfolio is fine.

## 8. Developer quick reference
```bash
npm install && npm run dev          # site at localhost:5173 (needs .env from .env.example)
cd studio && npm install && npm run dev   # studio at localhost:3333
npm run build                        # production build check
```
Content shape and fallback values live in `src/data/content.js`; queries in `src/lib/queries.js`; Studio schemas in `studio/schemas/`.
