import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Menu, Terminal, X } from 'lucide-react'
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

const ACCENT = '#F4443A'
const MINT = '#79BBA6'

const rise = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const NAV = [
  ['/about', '#about'],
  ['/proof', '#proof'],
  ['/work', '#work'],
  ['/journal', '#journal'],
  ['/contact', '#contact'],
]

export default function Signal() {
  return (
    <LightboxProvider>
      <div className="relative min-h-screen overflow-x-clip bg-[#0B0B0C] text-[#EDEAE3]">
        <GridBackdrop />
        <div className="relative">
          <Nav />
          <Hero />
          <StatBand />
          <About />
          <Proof />
          <Work />
          <Journal />
          <Hire />
          <Testimonials />
          <Contact />
        </div>
      </div>
    </LightboxProvider>
  )
}

function GridBackdrop() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(${ACCENT} 1px, transparent 1px), linear-gradient(90deg, ${ACCENT} 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            'radial-gradient(1000px 600px at 78% -8%, rgba(244,68,58,0.16), transparent 62%), radial-gradient(760px 520px at 5% 92%, rgba(121,187,166,0.11), transparent 60%)',
        }}
      />
    </>
  )
}

/* ----------------------------------------------------------------- nav */

function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#0B0B0C]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <a href="#top" className="flex items-center gap-2 font-grotesk font-bold tracking-tight">
          <Terminal size={16} style={{ color: ACCENT }} />
          palak.agarwal
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="font-mono text-[11px] text-white/45 transition hover:text-white"
            >
              {label}
            </a>
          ))}
          <a
            href={`mailto:${profile.email}`}
            className="rounded-md px-4 py-2 font-mono text-[11px] font-semibold text-[#0B0B0C] transition hover:opacity-85"
            style={{ background: ACCENT }}
          >
            hire_me()
          </a>
        </nav>
        <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col border-t border-white/8 px-5 pb-3 md:hidden">
          {NAV.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="py-2 font-mono text-xs text-white/60"
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

/* ---------------------------------------------------------------- hero */

function Hero() {
  return (
    <section id="top" className="mx-auto max-w-6xl px-5 pt-16 pb-20 sm:px-8 sm:pt-24">
      <motion.p
        initial="hidden"
        animate="show"
        variants={rise}
        className="font-mono text-[11px] tracking-[0.3em] uppercase"
        style={{ color: ACCENT }}
      >
        ● Proof, not vibes
      </motion.p>

      <motion.h1
        initial="hidden"
        animate="show"
        variants={rise}
        className="mt-6 font-grotesk text-[clamp(2.6rem,8.4vw,6.5rem)] leading-[0.92] font-bold tracking-[-0.03em]"
      >
        I turn customer insight
        <br />
        into{' '}
        <span className="relative inline-block">
          <span style={{ color: ACCENT }}>revenue</span>
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-1 left-0 h-[5px] w-full origin-left"
            style={{ background: ACCENT }}
          />
        </span>{' '}
        you can audit.
      </motion.h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div initial="hidden" animate="show" variants={rise}>
          <p className="max-w-xl text-[15px] leading-relaxed text-white/60">
            {profile.roles.join(' · ')}. {profile.oneLiner} {profile.yearsExperience} years of
            building relevance in a world with a 3-second attention span.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#proof"
              className="rounded-md px-6 py-3 font-mono text-xs font-semibold text-[#0B0B0C] transition hover:opacity-85"
              style={{ background: ACCENT }}
            >
              view_the_numbers →
            </a>
            <a
              href="#work"
              className="rounded-md border border-white/15 px-6 py-3 font-mono text-xs font-semibold text-white/75 transition hover:border-white/40 hover:text-white"
            >
              browse_work
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur"
        >
          <div className="flex items-center gap-2 border-b border-white/8 pb-3">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: ACCENT }} />
            <span className="ml-2 font-mono text-[10px] text-white/35">
              instagram_insights.json
            </span>
          </div>
          <div className="mt-4 space-y-2.5 font-mono text-xs">
            {[
              ['views_30d', '17,257,497', MINT],
              ['from_ads', '97.6%', '#ffffff'],
              ['accounts_reached', '6,896,298', MINT],
              ['reels_share', '83.8%', '#ffffff'],
              ['peak_roas', '3.18', MINT],
              ['ads_written', '2,500+', '#ffffff'],
            ].map(([k, v, c]) => (
              <div key={k} className="flex items-baseline justify-between gap-4">
                <span className="text-white/35">&quot;{k}&quot;:</span>
                <span style={{ color: c }}>{v}</span>
              </div>
            ))}
          </div>
          <Sparkline />
        </motion.div>
      </div>
    </section>
  )
}

function Sparkline() {
  const bars = [28, 44, 36, 62, 51, 74, 58, 88, 70, 96, 79, 100, 84, 92]
  return (
    <div className="mt-5 flex h-16 items-end gap-1 border-t border-white/8 pt-4">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.035, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 rounded-sm"
          style={{ background: `linear-gradient(180deg, ${ACCENT}, ${ACCENT}44)` }}
        />
      ))}
    </div>
  )
}

/* ----------------------------------------------------------- stat band */

function Counter({ value }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const numeric = parseFloat(String(value).replace(/[^\d.]/g, '')) || 0
  const prefix = String(value).match(/^[^\d]*/)?.[0] ?? ''
  const suffix = String(value).match(/[^\d.]*$/)?.[0] ?? ''
  const decimals = String(numeric).includes('.') ? String(numeric).split('.')[1].length : 0

  const mv = useMotionValue(0)
  const spring = useSpring(mv, { duration: 1400, bounce: 0 })
  const text = useTransform(spring, (v) =>
    v.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }),
  )

  useEffect(() => {
    if (inView) mv.set(numeric)
  }, [inView, mv, numeric])

  return (
    <span ref={ref}>
      {prefix}
      <motion.span>{text}</motion.span>
      {suffix}
    </span>
  )
}

function StatBand() {
  return (
    <section className="border-y border-white/8 bg-white/[0.02]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px px-5 sm:px-8 lg:grid-cols-3">
        {metrics.headline.map((m) => (
          <div key={m.label} className="border-b border-white/6 py-8 lg:border-b-0">
            <p className="font-grotesk text-4xl font-bold tracking-tight sm:text-5xl">
              <Counter value={m.value} />
            </p>
            <p className="mt-1.5 text-sm font-medium text-white/70">{m.label}</p>
            <p className="font-mono text-[10px] tracking-wide text-white/30">{m.sub}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- about */

function About() {
  return (
    <Section id="about" label="about">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="font-grotesk text-4xl leading-[1.02] font-bold tracking-tight sm:text-6xl">
            {about.greeting}{' '}
            <span style={{ color: ACCENT }}>{about.intro}</span>
          </h2>
          <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-white/60">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <p className="mt-8 font-grotesk text-2xl leading-snug font-semibold sm:text-3xl">
            “{about.kicker}”
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
          <p className="font-mono text-[10px] tracking-[0.24em] text-white/35 uppercase">
            {randomThings.title}
          </p>
          <ul className="mt-4 space-y-3">
            {randomThings.items.map((r, i) => (
              <li key={r} className="flex gap-3 text-sm leading-snug text-white/65">
                <span className="font-mono text-[10px]" style={{ color: ACCENT }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

/* --------------------------------------------------------------- proof */

function Proof() {
  return (
    <Section id="proof" label="proof">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="font-mono text-[11px] tracking-[0.24em] uppercase" style={{ color: ACCENT }}>
            {caseStudy.eyebrow}
          </p>
          <h2 className="mt-3 font-grotesk text-6xl leading-none font-bold tracking-tight sm:text-8xl">
            {caseStudy.client}
          </h2>

          <div className="mt-8 flex items-end gap-8 rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase">
                before
              </p>
              <p className="font-grotesk text-xl text-white/35 line-through">{caseStudy.before}</p>
            </div>
            <div className="flex-1">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: MINT }}>
                after
              </p>
              <p className="font-grotesk text-4xl leading-none font-bold" style={{ color: MINT }}>
                {caseStudy.after}
              </p>
              <p className="mt-1 text-xs text-white/45">{caseStudy.afterSuffix}</p>
            </div>
          </div>

          <p className="mt-4 font-mono text-xs" style={{ color: ACCENT }}>
            ★ {caseStudy.milestone}
          </p>

          <ul className="mt-8 space-y-4">
            {caseStudy.breakdown.map((b, i) => (
              <motion.li
                key={i}
                variants={rise}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="flex gap-4 border-b border-white/8 pb-4"
              >
                <span className="font-mono text-[10px] text-white/25">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-sm leading-relaxed text-white/65">
                  {b.lead}{' '}
                  {b.highlight && (
                    <span className="font-semibold" style={{ color: MINT }}>
                      {b.highlight}
                    </span>
                  )}{' '}
                  {b.rest}
                </p>
              </motion.li>
            ))}
          </ul>

          <div className="mt-8">
            <Shot src={caseStudy.proofImage} />
          </div>
        </div>

        <div className="space-y-6">
          {metrics.detail.map((d) => (
            <div key={d.name} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
                <p className="font-grotesk text-lg font-semibold">{d.name}</p>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-x-6">
                {d.rows.map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-3 border-b border-white/6 py-2"
                  >
                    <dt className="font-mono text-[10px] text-white/35">{k}</dt>
                    <dd className="font-mono text-xs font-semibold text-white/85">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
          <div className="grid gap-5">
            {metrics.boards.map((b) => (
              <Shot key={b.image} src={b.image} caption={b.label} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ---------------------------------------------------------------- work */

function Work() {
  const rows = [
    { title: socialMedia.title, meta: 'Instagram · 17.2M views', images: [...socialMedia.insights, ...socialMedia.grids] },
    { title: blogs.title, meta: blogs.niches.join(' · '), images: blogs.groups.flatMap((g) => g.images) },
    { title: emails.title, meta: emails.blurb, images: emails.images },
    ...marketing.sections.map((s) => ({
      title: s.title,
      meta: `${marketing.title} · ${s.items.length} pieces`,
      images: s.items.map((i) => i.image),
    })),
    { title: websiteCopy.title, meta: websiteCopy.blurb, images: websiteCopy.images },
  ]

  return (
    <Section id="work" label="work">
      <h2 className="font-grotesk text-4xl leading-tight font-bold tracking-tight sm:text-6xl">
        Everything I professionally
        <br />
        <span style={{ color: ACCENT }}>overthought.</span>
      </h2>

      <div className="mt-12 space-y-14">
        {rows.map((row) => (
          <div key={row.title}>
            <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-white/10 pb-3">
              <h3 className="font-grotesk text-2xl font-semibold">{row.title}</h3>
              <p className="max-w-md truncate font-mono text-[10px] tracking-wide text-white/30">
                {row.meta}
              </p>
            </div>
            <div className="scrollbar-none -mx-5 mt-6 flex gap-5 overflow-x-auto px-5 pb-2 sm:mx-0 sm:px-0">
              {row.images.map((src, i) => (
                <div key={src} className="w-[210px] shrink-0 sm:w-[250px]">
                  <Shot src={src} all={row.images} index={i} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------- journal */

function Journal() {
  return (
    <Section id="journal" label="journal">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-grotesk text-4xl leading-tight font-bold tracking-tight sm:text-6xl">
          Journal
        </h2>
        <p className="font-mono text-[11px] text-white/35">
          {'// notes on brand, funnels and attention'}
        </p>
      </div>

      <div className="mt-10 divide-y divide-white/8 border-y border-white/8">
        {posts.map((p) => (
          <article
            key={p.slug}
            className="group grid cursor-pointer gap-4 py-7 transition sm:grid-cols-[110px_1fr_auto] sm:items-center"
          >
            <span className="font-mono text-[10px] tracking-wide text-white/30">
              {new Date(p.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: ACCENT }}>
                {p.category}
              </p>
              <h3 className="mt-1 font-grotesk text-2xl font-semibold transition group-hover:translate-x-1 sm:text-3xl">
                {p.title}
              </h3>
              <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-white/50">{p.excerpt}</p>
            </div>
            <span className="flex items-center gap-2 font-mono text-[10px] text-white/35">
              {p.readingTime}
              <ArrowUpRight size={16} className="transition group-hover:-translate-y-0.5" />
            </span>
          </article>
        ))}
      </div>
    </Section>
  )
}

/* ---------------------------------------------------------------- hire */

function Hire() {
  return (
    <Section id="hire" label="why_hire">
      <div className="grid gap-12 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <h2 className="font-grotesk text-4xl leading-tight font-bold tracking-tight sm:text-6xl">
            {hireMe.title}
          </h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {hireMe.skills.map((s, i) => (
              <motion.div
                key={s}
                variants={rise}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.04 }}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/75 transition hover:border-white/25"
              >
                <span className="mr-2 font-mono text-[10px]" style={{ color: ACCENT }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {s}
              </motion.div>
            ))}
          </div>
          <p className="mt-7 font-grotesk text-xl font-semibold" style={{ color: MINT }}>
            {hireMe.teamNote}
          </p>
        </div>

        <div className="relative flex flex-col justify-between gap-8">
          <div
            className="rounded-xl p-8 text-[#0B0B0C]"
            style={{ background: ACCENT }}
          >
            <p className="font-grotesk text-2xl leading-tight font-bold sm:text-3xl">
              {hireMe.promise}
            </p>
          </div>
          <img
            src={profile.portraitHire}
            alt=""
            loading="lazy"
            className="max-h-72 w-full object-contain opacity-90"
          />
        </div>
      </div>
    </Section>
  )
}

/* -------------------------------------------------------- testimonials */

function Testimonials() {
  return (
    <Section id="testimonials" label="testimonials">
      <h2 className="font-grotesk text-4xl leading-tight font-bold tracking-tight sm:text-6xl">
        {testimonials.title}
      </h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {testimonials.images.map((src, i) => (
          <Shot key={src} src={src} all={testimonials.images} index={i} />
        ))}
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------- contact */

function Contact() {
  return (
    <section id="contact" className="border-t border-white/8">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <p className="font-mono text-[11px] tracking-[0.28em] uppercase" style={{ color: ACCENT }}>
          {contact.kicker}
        </p>
        <h2 className="mt-6 max-w-4xl font-grotesk text-3xl leading-[1.08] font-bold tracking-tight sm:text-6xl">
          {contact.line1}
        </h2>
        <p className="mt-3 font-grotesk text-2xl text-white/35 sm:text-4xl">{contact.line2}</p>

        <a
          href={`mailto:${contact.email}`}
          className="group mt-12 inline-flex items-center gap-4 rounded-lg px-8 py-5 font-grotesk text-lg font-bold text-[#0B0B0C] transition hover:opacity-90 sm:text-2xl"
          style={{ background: ACCENT }}
        >
          {contact.email}
          <ArrowUpRight className="transition group-hover:-translate-y-1" size={24} />
        </a>

        <div className="mt-16 flex flex-wrap justify-between gap-4 border-t border-white/8 pt-6 font-mono text-[10px] tracking-[0.2em] text-white/30 uppercase">
          <span>{contact.name}</span>
          <span>{contact.location}</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------- shared */

function Section({ id, label, children }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20 sm:px-8 sm:py-28">
      <p className="mb-8 font-mono text-[10px] tracking-[0.3em] text-white/25 uppercase">
        {`// ${label}`}
      </p>
      {children}
    </section>
  )
}

function Shot({ src, all, index = 0, caption }) {
  const { open } = useLightbox()
  return (
    <figure>
      <button
        onClick={() => open(all ?? [src], index)}
        className="group block w-full cursor-zoom-in overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]"
      >
        <img
          src={src}
          alt={caption ?? ''}
          loading="lazy"
          className="w-full object-cover opacity-85 transition duration-700 group-hover:scale-[1.04] group-hover:opacity-100"
        />
      </button>
      {caption && (
        <figcaption className="mt-2 font-mono text-[9px] tracking-[0.16em] text-white/30 uppercase">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
