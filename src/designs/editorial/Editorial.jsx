import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react'
import { LightboxProvider, useLightbox } from '../../components/Lightbox.jsx'
import {
  about,
  blogs,
  caseStudy,
  contact,
  emails,
  hireMe,
  marketing,
  metrics,
  posts,
  profile,
  randomThings,
  socialMedia,
  testimonials,
  websiteCopy,
} from '../../data/content.js'

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

const NAV = [
  ['About', '#about'],
  ['Results', '#results'],
  ['Portfolio', '#portfolio'],
  ['Journal', '#journal'],
  ['Contact', '#contact'],
]

export default function Editorial() {
  return (
    <LightboxProvider>
      <div className="min-h-screen bg-[#FBFAF7] text-[#111]">
        <Masthead />
        <Hero />
        <Ticker />
        <About />
        <Results />
        <Portfolio />
        <Journal />
        <Hire />
        <Testimonials />
        <Colophon />
      </div>
    </LightboxProvider>
  )
}

/* ----------------------------------------------------------- masthead */

function Masthead() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 border-b border-[#111] bg-[#FBFAF7]/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-3 sm:px-8">
        <a href="#top" className="font-serif-editorial text-2xl tracking-tight">
          Palak Agarwal
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="font-mono text-[10px] tracking-[0.22em] text-[#111]/55 uppercase transition hover:text-crimson"
            >
              {label}
            </a>
          ))}
        </nav>
        <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col border-t border-[#111]/15 px-5 pb-3 md:hidden">
          {NAV.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="py-2 font-mono text-[11px] tracking-[0.2em] uppercase"
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

/* --------------------------------------------------------------- hero */

function Hero() {
  return (
    <section id="top" className="mx-auto max-w-[1200px] px-5 pt-10 pb-16 sm:px-8 sm:pt-16">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#111] pb-2 font-mono text-[10px] tracking-[0.22em] uppercase">
        <span>Vol. 01 — The Brand Issue</span>
        <span>{profile.location}</span>
        <span className="text-crimson">Est. 2021</span>
      </div>

      <motion.h1
        initial="hidden"
        animate="show"
        variants={rise}
        className="mt-10 font-serif-editorial text-[clamp(3.2rem,12vw,9.5rem)] leading-[0.82] tracking-[-0.02em]"
      >
        Positioning
        <br />
        <span className="text-crimson italic">before</span> posting.
      </motion.h1>

      <div className="mt-10 grid gap-8 border-t border-[#111]/15 pt-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <motion.div initial="hidden" animate="show" variants={rise}>
          <p className="font-serif-editorial text-2xl leading-snug sm:text-3xl">
            {profile.headline}. {profile.oneLiner}
          </p>
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] tracking-[0.2em] text-[#111]/55 uppercase">
            {profile.roles.map((r) => (
              <span key={r}>{r}</span>
            ))}
          </div>
          <a
            href="#results"
            className="mt-7 inline-flex items-center gap-2 border-b-2 border-crimson pb-1 text-sm font-semibold text-crimson"
          >
            Read the results <ArrowRight size={15} />
          </a>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={rise}
          className="border-[#111]/15 md:border-l md:pl-8"
        >
          <p className="font-mono text-[10px] tracking-[0.22em] text-[#111]/40 uppercase">
            The short version
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-[#111]/70">
            {about.paragraphs[0]}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={rise}
          className="border-[#111]/15 md:border-l md:pl-8"
        >
          <p className="font-mono text-[10px] tracking-[0.22em] text-[#111]/40 uppercase">
            By the numbers
          </p>
          <dl className="mt-3 space-y-2">
            {metrics.headline.slice(0, 4).map((m) => (
              <div key={m.label} className="flex items-baseline justify-between gap-3">
                <dt className="text-xs text-[#111]/55">{m.label}</dt>
                <dd className="font-serif-editorial text-xl">{m.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- ticker */

function Ticker() {
  const items = [...profile.roles, ...blogs.niches]
  return (
    <div className="overflow-hidden border-y border-[#111] bg-[#111] py-2.5">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
        className="flex w-max gap-8 whitespace-nowrap"
      >
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <span
            key={i}
            className="font-mono text-[10px] tracking-[0.3em] text-[#FBFAF7]/75 uppercase"
          >
            {t} <span className="ml-8 text-crimson">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* -------------------------------------------------------------- about */

function About() {
  return (
    <section id="about" className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-28">
      <Rule label="01 — About" />

      <div className="mt-10 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <img
            src={profile.portraitDress}
            alt={profile.fullName}
            loading="lazy"
            className="w-full max-w-xs object-contain"
          />
          <div className="mt-6 border-t border-[#111]/15 pt-4">
            <p className="font-mono text-[10px] tracking-[0.22em] text-[#111]/40 uppercase">
              Also true
            </p>
            <ul className="mt-3 space-y-2">
              {randomThings.items.slice(0, 4).map((r) => (
                <li key={r} className="text-sm leading-snug text-[#111]/65 italic">
                  “{r.replace(/^I /, 'I ')}”
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2 className="font-serif-editorial text-5xl leading-[0.95] sm:text-7xl">
            {about.greeting} {about.intro}
          </h2>
          <div className="mt-8 columns-1 gap-10 text-[15px] leading-[1.75] text-[#111]/75 sm:columns-2 sm:text-base">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="mb-5 break-inside-avoid">
                {i === 0 && (
                  <span className="float-left mr-2 font-serif-editorial text-6xl leading-[0.75] text-crimson">
                    {p.charAt(0)}
                  </span>
                )}
                {i === 0 ? p.slice(1) : p}
              </p>
            ))}
          </div>
          <blockquote className="mt-6 border-l-2 border-crimson pl-6 font-serif-editorial text-2xl leading-snug italic sm:text-3xl">
            {about.kicker}
          </blockquote>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ results */

function Results() {
  return (
    <section id="results" className="border-y border-[#111]/15 bg-white">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-28">
        <Rule label="02 — The Case" />

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="font-mono text-[10px] tracking-[0.24em] text-crimson uppercase">
              {caseStudy.eyebrow}
            </p>
            <h2 className="mt-3 font-serif-editorial text-6xl leading-[0.9] sm:text-8xl">
              {caseStudy.client}
            </h2>

            <div className="mt-8 flex flex-wrap items-end gap-8 border-y border-[#111]/15 py-6">
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-[#111]/40 uppercase">
                  Before
                </p>
                <p className="font-serif-editorial text-2xl text-[#111]/45 line-through">
                  {caseStudy.before}
                </p>
              </div>
              <ArrowRight className="mb-2 text-crimson" size={22} />
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-crimson uppercase">
                  After
                </p>
                <p className="font-serif-editorial text-5xl leading-none text-crimson">
                  {caseStudy.after}
                </p>
                <p className="text-xs text-[#111]/55">{caseStudy.afterSuffix}</p>
              </div>
            </div>

            <p className="mt-5 font-serif-editorial text-xl italic">★ {caseStudy.milestone}</p>

            <ol className="mt-8 space-y-5">
              {caseStudy.breakdown.map((b, i) => (
                <motion.li
                  key={i}
                  variants={rise}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  className="flex gap-5 border-b border-[#111]/10 pb-5"
                >
                  <span className="font-mono text-xs text-crimson">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-[15px] leading-relaxed text-[#111]/75">
                    {b.lead} {b.highlight && <em className="font-semibold not-italic">{b.highlight}</em>}{' '}
                    {b.rest}
                  </p>
                </motion.li>
              ))}
            </ol>
          </div>

          <div className="space-y-8">
            <Frame src={caseStudy.proofImage} caption="Shark Tank India, Season 5" />
            {metrics.detail.map((d) => (
              <div key={d.name} className="border border-[#111]/15 p-6">
                <p className="font-serif-editorial text-2xl">{d.name}</p>
                <dl className="mt-4 grid grid-cols-2 gap-x-8">
                  {d.rows.map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-baseline justify-between gap-3 border-b border-[#111]/8 py-1.5"
                    >
                      <dt className="text-xs text-[#111]/50">{k}</dt>
                      <dd className="font-mono text-xs font-semibold">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
            <div className="grid gap-6 sm:grid-cols-2">
              {metrics.boards.map((b) => (
                <Frame key={b.image} src={b.image} caption={b.label} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------------------------------------------------- portfolio */

function Portfolio() {
  const groups = [
    { id: 'social', title: socialMedia.title, note: socialMedia.blurb, images: [...socialMedia.grids, ...socialMedia.insights] },
    ...blogs.groups.map((g, i) => ({
      id: `blogs-${i}`,
      title: `Blogs — ${g.title}`,
      note: g.tags.join(' · '),
      images: g.images,
    })),
    { id: 'emails', title: emails.title, note: emails.blurb, images: emails.images },
    ...marketing.sections.map((s) => ({
      id: s.id,
      title: `${marketing.title} — ${s.title}`,
      note: s.items[0]?.links.join(' · '),
      images: s.items.map((i) => i.image),
    })),
    { id: 'website-copy', title: websiteCopy.title, note: websiteCopy.blurb, images: websiteCopy.images },
  ]

  const [active, setActive] = useState(groups[0].id)
  const current = groups.find((g) => g.id === active) ?? groups[0]

  return (
    <section id="portfolio" className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-28">
      <Rule label="03 — Portfolio" />

      <div className="mt-10 grid gap-10 lg:grid-cols-[240px_1fr]">
        <nav className="lg:sticky lg:top-24 lg:self-start">
          <ul className="flex gap-x-5 gap-y-1 overflow-x-auto lg:block">
            {groups.map((g) => (
              <li key={g.id}>
                <button
                  onClick={() => setActive(g.id)}
                  className={`w-full border-b border-[#111]/10 py-2.5 text-left text-sm whitespace-nowrap transition lg:whitespace-normal ${
                    active === g.id
                      ? 'font-semibold text-crimson'
                      : 'text-[#111]/50 hover:text-[#111]'
                  }`}
                >
                  {g.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <motion.div key={current.id} initial="hidden" animate="show" variants={rise}>
            <h3 className="font-serif-editorial text-4xl leading-tight sm:text-5xl">
              {current.title}
            </h3>
            <p className="mt-2 max-w-xl text-sm text-[#111]/60">{current.note}</p>
            <div className="mt-8 columns-1 gap-6 sm:columns-2 lg:columns-3">
              {current.images.map((src, i) => (
                <div key={src} className="mb-6 break-inside-avoid">
                  <Frame src={src} all={current.images} index={i} />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------ journal */

function Journal() {
  if (!posts.length) return null
  return (
    <section id="journal" className="border-y border-[#111]/15 bg-white">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-28">
        <Rule label="04 — Journal" />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <article className="group cursor-pointer">
            <img
              src={posts[0].cover}
              alt=""
              loading="lazy"
              className="aspect-[16/10] w-full object-cover object-top"
            />
            <div className="mt-5 flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] text-crimson uppercase">
              <span>{posts[0].category}</span>
              <span className="text-[#111]/25">/</span>
              <span className="text-[#111]/45">{posts[0].readingTime}</span>
            </div>
            <h3 className="mt-2 font-serif-editorial text-4xl leading-[1.02] sm:text-6xl">
              {posts[0].title}
            </h3>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#111]/70">
              {posts[0].excerpt}
            </p>
            <span className="mt-4 inline-flex items-center gap-2 border-b-2 border-crimson pb-0.5 text-sm font-semibold text-crimson">
              Read the piece <ArrowUpRight size={14} />
            </span>
          </article>

          <div className="divide-y divide-[#111]/12 border-t border-[#111]/12">
            {posts.slice(1).map((p) => (
              <article key={p.slug} className="group flex cursor-pointer gap-5 py-6">
                <img
                  src={p.cover}
                  alt=""
                  loading="lazy"
                  className="h-20 w-24 shrink-0 object-cover object-top"
                />
                <div>
                  <p className="font-mono text-[9px] tracking-[0.2em] text-crimson uppercase">
                    {p.category}
                  </p>
                  <h4 className="mt-1 font-serif-editorial text-2xl leading-tight transition group-hover:text-crimson">
                    {p.title}
                  </h4>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#111]/60">
                    {p.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- hire */

function Hire() {
  return (
    <section className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-28">
      <Rule label="05 — Why Hire" />
      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_0.7fr]">
        <div>
          <h2 className="font-serif-editorial text-5xl leading-[0.95] sm:text-7xl">
            {hireMe.title}
          </h2>
          <p className="mt-6 font-mono text-[10px] tracking-[0.24em] text-[#111]/45 uppercase">
            {hireMe.subtitle}
          </p>
          <ul className="mt-4 grid gap-x-10 sm:grid-cols-2">
            {hireMe.skills.map((s, i) => (
              <li
                key={s}
                className="flex items-baseline gap-4 border-b border-[#111]/10 py-3 text-[15px]"
              >
                <span className="font-mono text-[10px] text-crimson">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-8 font-serif-editorial text-2xl italic">{hireMe.teamNote}</p>
        </div>
        <div className="flex flex-col justify-between gap-8">
          <blockquote className="border border-[#111] p-8">
            <p className="font-serif-editorial text-3xl leading-tight">{hireMe.promise}</p>
          </blockquote>
          <img
            src={profile.portraitHire}
            alt=""
            loading="lazy"
            className="max-h-80 w-full object-contain"
          />
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------- testimonials */

function Testimonials() {
  return (
    <section className="border-t border-[#111]/15 bg-white">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-28">
        <Rule label="06 — Testimonials" />
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {testimonials.images.map((src, i) => (
            <Frame key={src} src={src} all={testimonials.images} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------- colophon */

function Colophon() {
  return (
    <footer id="contact" className="bg-[#111] text-[#FBFAF7]">
      <div className="mx-auto max-w-[1200px] px-5 py-20 sm:px-8 sm:py-28">
        <p className="font-mono text-[10px] tracking-[0.28em] text-crimson-soft uppercase">
          {contact.kicker}
        </p>
        <h2 className="mt-6 max-w-4xl font-serif-editorial text-4xl leading-[1.05] sm:text-7xl">
          {contact.line1}
        </h2>
        <p className="mt-3 font-serif-editorial text-2xl text-[#FBFAF7]/45 italic sm:text-4xl">
          {contact.line2}
        </p>

        <a
          href={`mailto:${contact.email}`}
          className="group mt-12 inline-flex items-center gap-4 border-b-2 border-crimson-soft pb-2 font-serif-editorial text-2xl transition sm:text-4xl"
        >
          {contact.email}
          <ArrowUpRight className="transition group-hover:-translate-y-1" size={28} />
        </a>

        <div className="mt-16 flex flex-wrap justify-between gap-4 border-t border-white/12 pt-6 font-mono text-[10px] tracking-[0.22em] text-[#FBFAF7]/40 uppercase">
          <span>{contact.name}</span>
          <span>{contact.location}</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  )
}

/* ------------------------------------------------------------- shared */

function Rule({ label }) {
  return (
    <div className="flex items-center gap-5">
      <span className="font-mono text-[10px] tracking-[0.28em] text-crimson uppercase">
        {label}
      </span>
      <span className="h-px flex-1 bg-[#111]/20" />
    </div>
  )
}

function Frame({ src, all, index = 0, caption }) {
  const { open } = useLightbox()
  return (
    <figure className="group">
      <button
        onClick={() => open(all ?? [src], index)}
        className="block w-full cursor-zoom-in overflow-hidden border border-[#111]/12 bg-white"
      >
        <img
          src={src}
          alt={caption ?? ''}
          loading="lazy"
          className="w-full object-cover transition duration-700 group-hover:scale-[1.03]"
        />
      </button>
      {caption && (
        <figcaption className="mt-2 font-mono text-[9px] tracking-[0.18em] text-[#111]/40 uppercase">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
