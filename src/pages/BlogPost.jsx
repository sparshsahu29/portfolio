import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PortableText } from '@portabletext/react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { EmailButton, PaperShell, SiteFooter, SiteNav } from '../designs/paper-trail/shell.jsx'
import { PaperCard, rise } from '../designs/paper-trail/parts.jsx'
import { useContent } from '../content/ContentContext.jsx'
import { isSanityConfigured, sanityClient } from '../lib/sanity.js'
import { postQuery } from '../lib/queries.js'

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : ''

/** Paper-trail styling for rich text authored in Sanity. */
const components = {
  block: {
    normal: ({ children }) => (
      <p className="mb-6 text-[17px] leading-[1.8] text-ink/80 sm:text-[18px]">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 mb-4 font-display text-3xl leading-tight text-ink sm:text-4xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-9 mb-3 font-display text-2xl leading-tight text-ink">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-9 border-l-[3px] border-crimson pl-6 font-display text-2xl leading-snug text-ink italic sm:text-3xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mb-6 space-y-3 pl-1">{children}</ul>,
    number: ({ children }) => (
      <ol className="mb-6 list-decimal space-y-3 pl-5 marker:font-mono marker:text-crimson">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex gap-3 text-[17px] leading-[1.7] text-ink/80">
        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => <li className="text-[17px] leading-[1.7] text-ink/80">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    highlight: ({ children }) => (
      <span className="marker-underline font-semibold text-bronze">{children}</span>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noreferrer"
        className="border-b border-crimson/50 font-medium text-crimson transition hover:border-crimson"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) =>
      value?.url ? (
        <figure className="my-10">
          <div className="relative bg-white p-2 shadow-[0_14px_34px_-20px_rgba(18,18,18,0.6)]">
            <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-2" />
            <img src={value.url} alt={value.alt ?? ''} loading="lazy" className="w-full" />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center font-hand text-xl text-ink/55">
              {value.caption}
            </figcaption>
          )}
        </figure>
      ) : null,
  },
}

function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 z-[60] h-[3px] w-full origin-left bg-crimson"
    />
  )
}

export default function BlogPost() {
  const { slug } = useParams()
  const { posts } = useContent()

  // { slug, data } of the last completed Sanity fetch; loading while it lags the URL
  const [fetched, setFetched] = useState({ slug: null, data: null })
  const loading = isSanityConfigured && fetched.slug !== slug

  const listed = (posts ?? []).find((p) => p.slug === slug) ?? null
  const post = (fetched.slug === slug && fetched.data) || listed

  useEffect(() => {
    if (!isSanityConfigured || !sanityClient) return

    let cancelled = false
    sanityClient
      .fetch(postQuery, { slug })
      .then((data) => {
        if (!cancelled) setFetched({ slug, data: data ?? null })
      })
      .catch((err) => {
        console.error('[sanity] post fetch failed:', err)
        if (!cancelled) setFetched({ slug, data: null })
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  const related = post?.related ?? (posts ?? []).filter((p) => p.slug !== slug).slice(0, 3)

  if (!post && !loading) {
    return (
      <PaperShell>
        <SiteNav />
        <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-32 text-center">
          <p className="font-hand text-4xl text-crimson">oops</p>
          <h1 className="mt-2 font-display text-4xl text-ink">That post moved.</h1>
          <p className="mt-3 text-sm text-ink/60">
            The link may be old, or the piece is still a draft.
          </p>
          <Link
            to="/blog"
            className="mt-8 inline-flex items-center gap-2 bg-crimson px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink"
          >
            <ArrowLeft size={15} /> Back to the blog
          </Link>
        </div>
        <SiteFooter compact />
      </PaperShell>
    )
  }

  return (
    <PaperShell>
      <ReadingProgress />
      <SiteNav />

      {/* distraction-free reading column */}
      <article className="px-5 pt-14 pb-16 sm:px-10 sm:pt-20">
        <div className="mx-auto max-w-[46rem]">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-ink/50 transition hover:text-crimson"
          >
            <ArrowLeft size={15} /> All posts
          </Link>

          <motion.header variants={rise} initial="hidden" animate="show" className="mt-8">
            <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] tracking-[0.2em] text-bronze uppercase">
              {post?.category && <span className="text-crimson">{post.category}</span>}
              {post?.date && (
                <>
                  <span className="text-ink/25">/</span>
                  <span>{formatDate(post.date)}</span>
                </>
              )}
              {post?.readingTime && (
                <>
                  <span className="text-ink/25">/</span>
                  <span>{post.readingTime}</span>
                </>
              )}
            </div>

            <h1 className="mt-4 font-display text-[clamp(2.4rem,7vw,4.5rem)] leading-[0.98] text-ink">
              {post?.title}
            </h1>

            {post?.excerpt && (
              <p className="mt-5 font-display text-xl leading-snug text-ink/55 italic sm:text-2xl">
                {post.excerpt}
              </p>
            )}
          </motion.header>

          {post?.cover && (
            <div className="relative mt-10 bg-white p-2 shadow-[0_16px_38px_-22px_rgba(18,18,18,0.6)]">
              <span className="tape -top-3 left-12 -rotate-4" />
              <span className="tape -top-3 right-12 rotate-4" />
              <img
                src={post.cover}
                alt={post.coverAlt ?? ''}
                className="aspect-[16/9] w-full object-cover object-top"
              />
            </div>
          )}

          <div className="mt-12">
            {loading && !post?.body && (
              <p className="font-mono text-xs tracking-[0.2em] text-ink/40 uppercase">Loading…</p>
            )}

            {post?.body?.length ? (
              <PortableText value={post.body} components={components} />
            ) : (
              !loading && (
                <PaperCard tape rotate={-0.5}>
                  <p className="font-display text-xl text-ink">This one is still being written.</p>
                  <p className="mt-2 text-sm text-ink/60">
                    The full piece will appear here as soon as it is published from the dashboard.
                  </p>
                </PaperCard>
              )
            )}
          </div>

          <div className="mt-16 border-t border-ink/12 pt-8">
            <p className="font-hand text-2xl text-bronze">
              Liked this? There is usually a strategy behind the opinion.
            </p>
            <div className="mt-5">
              <EmailButton size="md" label="Work With Me" />
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="px-5 pb-20 sm:px-10">
          <div className="mx-auto max-w-6xl border-t border-ink/12 pt-12">
            <p className="mb-8 font-mono text-[11px] tracking-[0.3em] text-bronze uppercase">
              Keep reading
            </p>
            <div className="grid gap-8 sm:grid-cols-3">
              {related.map((p, i) => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className="group block h-full">
                  <PaperCard rotate={i % 2 ? 0.6 : -0.6} className="flex h-full flex-col">
                    {p.cover && (
                      <div className="mb-4 overflow-hidden">
                        <img
                          src={p.cover}
                          alt=""
                          loading="lazy"
                          className="h-32 w-full object-cover object-top transition duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <p className="font-mono text-[10px] tracking-[0.18em] text-bronze uppercase">
                      {p.category}
                    </p>
                    <h3 className="mt-1.5 font-display text-xl leading-tight text-ink transition group-hover:text-crimson">
                      {p.title}
                    </h3>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-crimson">
                      Read <ArrowUpRight size={13} />
                    </span>
                  </PaperCard>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteFooter compact />
    </PaperShell>
  )
}
