import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Search } from 'lucide-react'
import { PaperShell, SiteFooter, SiteNav } from '../designs/paper-trail/shell.jsx'
import { PaperCard, rise } from '../designs/paper-trail/parts.jsx'
import { useContent } from '../content/ContentContext.jsx'

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : ''

export default function BlogIndex() {
  const { posts, blogPage, loading } = useContent()
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')

  const categories = useMemo(
    () => ['All', ...Array.from(new Set((posts ?? []).map((p) => p.category).filter(Boolean)))],
    [posts],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return (posts ?? []).filter((p) => {
      const matchesCat = category === 'All' || p.category === category
      const matchesQuery =
        !q ||
        p.title?.toLowerCase().includes(q) ||
        p.excerpt?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
      return matchesCat && matchesQuery
    })
  }, [posts, category, query])

  return (
    <PaperShell>
      <SiteNav />

      {/* editorial header */}
      <header className="px-5 pt-16 pb-12 sm:px-10 sm:pt-24">
        <div className="mx-auto max-w-6xl">
          <p className="font-mono text-[11px] tracking-[0.3em] text-bronze uppercase">
            The Strategist’s Diary
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.2rem,5.5vw,4rem)] leading-[0.95] text-ink">
            {blogPage.headline}
          </h1>
          <p className="mt-3 font-hand text-3xl text-crimson sm:text-4xl">
            {blogPage.headlineAside}
          </p>
          <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-ink/65">{blogPage.intro}</p>

          <div className="mt-10 flex flex-col gap-4 border-t border-ink/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="scrollbar-none flex gap-2 overflow-x-auto">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`shrink-0 rounded-full border px-4 py-1.5 text-[13px] font-medium transition ${
                    category === c
                      ? 'border-crimson bg-crimson text-white'
                      : 'border-ink/15 text-ink/60 hover:border-crimson/50 hover:text-crimson'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <label className="relative flex items-center sm:w-64">
              <Search size={15} className="absolute left-3 text-ink/35" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts"
                className="w-full rounded-full border border-ink/15 bg-white/70 py-2 pr-4 pl-9 text-sm text-ink outline-none transition placeholder:text-ink/35 focus:border-crimson"
              />
            </label>
          </div>
        </div>
      </header>

      {/* masonry grid */}
      <main className="px-5 pb-20 sm:px-10">
        <div className="mx-auto max-w-6xl">
          {loading && (
            <p className="py-16 text-center font-mono text-xs tracking-[0.2em] text-ink/40 uppercase">
              Loading posts…
            </p>
          )}

          {!loading && filtered.length === 0 && (
            <PaperCard tape rotate={-0.6} className="mx-auto max-w-md text-center">
              {(posts ?? []).length === 0 ? (
                <>
                  <p className="font-hand text-3xl text-crimson">Fresh ink, coming soon.</p>
                  <p className="mt-2 text-sm text-ink/60">
                    The first posts are being written. Check back shortly.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-display text-2xl text-ink">Nothing here yet.</p>
                  <p className="mt-2 text-sm text-ink/60">
                    Try a different category, or clear the search.
                  </p>
                </>
              )}
            </PaperCard>
          )}

          <div className="columns-1 gap-8 sm:columns-2 lg:columns-3">
            {filtered.map((p, i) => (
              <motion.article
                key={p.slug}
                variants={rise}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                transition={{ delay: (i % 3) * 0.06 }}
                className="group mb-8 break-inside-avoid"
              >
                <Link to={`/blog/${p.slug}`} className="block">
                  <PaperCard rotate={i % 3 === 0 ? -0.7 : i % 3 === 1 ? 0.6 : -0.3}>
                    {p.cover && (
                      <div className="mb-4 overflow-hidden">
                        <img
                          src={p.cover}
                          alt=""
                          loading="lazy"
                          className="w-full object-cover object-top transition duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.18em] text-bronze uppercase">
                      <span className="text-crimson">{p.category}</span>
                      <span className="text-ink/25">/</span>
                      <span>{p.readingTime}</span>
                    </div>
                    <h2 className="mt-2 font-display text-2xl leading-tight text-ink transition group-hover:text-crimson sm:text-3xl">
                      {p.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink/65">{p.excerpt}</p>
                    <div className="mt-5 flex items-center justify-between border-t border-ink/8 pt-4">
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-crimson">
                        Read it <ArrowUpRight size={14} />
                      </span>
                      <span className="text-[11px] text-ink/40">{formatDate(p.date)}</span>
                    </div>
                  </PaperCard>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter compact />
    </PaperShell>
  )
}
