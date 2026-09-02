import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Mail, MapPin, Menu, Sparkles, X } from 'lucide-react'
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

const pop = {
  hidden: { opacity: 0, y: 20, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const NAV = [
  ['About', '#about'],
  ['Proof', '#proof'],
  ['Work', '#work'],
  ['Journal', '#journal'],
  ['Contact', '#contact'],
]

export default function Bento() {
  return (
    <LightboxProvider>
      <div className="min-h-screen bg-[#F7F4EF] text-ink">
        <Nav />
        <Hero />
        <About />
        <Proof />
        <Work />
        <Journal />
        <Hire />
        <Testimonials />
        <Contact />
      </div>
    </LightboxProvider>
  )
}

/* ---------------------------------------------------------------- card */

function Card({ children, className = '', tone = 'white', hover = true, ...rest }) {
  const tones = {
    white: 'bg-white',
    crimson: 'bg-crimson text-white',
    ink: 'bg-ink text-white',
    mint: 'bg-mint/85 text-ink',
    kraft: 'bg-kraft/25',
    cream: 'bg-[#F0EBE1]',
  }
  return (
    <motion.div
      variants={pop}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      className={`relative overflow-hidden rounded-3xl p-6 ring-1 ring-ink/6 ${tones[tone]} ${
        hover ? 'transition duration-400 hover:-translate-y-1 hover:shadow-[0_20px_46px_-24px_rgba(18,18,18,0.4)]' : ''
      } ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

function Label({ children, className = '' }) {
  return (
    <p className={`font-mono text-[10px] tracking-[0.22em] uppercase opacity-45 ${className}`}>
      {children}
    </p>
  )
}

/* ----------------------------------------------------------------- nav */

function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full bg-white/85 px-5 py-2.5 ring-1 ring-ink/8 backdrop-blur-xl">
        <a href="#top" className="font-grotesk text-lg font-bold tracking-tight">
          Palak<span className="text-crimson">.</span>
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="text-[13px] font-medium text-ink/55 transition hover:text-crimson"
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          href={`mailto:${profile.email}`}
          className="hidden rounded-full bg-ink px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-crimson md:block"
        >
          Let’s talk
        </a>
        <button className="md:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu">
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      {open && (
        <nav className="mx-auto mt-2 flex max-w-6xl flex-col rounded-3xl bg-white/95 px-5 py-3 ring-1 ring-ink/8 backdrop-blur-xl md:hidden">
          {NAV.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium text-ink/70"
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
    <section id="top" className="mx-auto max-w-6xl px-4 pt-8 pb-6 sm:px-6 sm:pt-12">
      <div className="grid auto-rows-[minmax(120px,auto)] grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Card
          tone="crimson"
          hover={false}
          className="col-span-2 row-span-2 flex flex-col justify-between lg:col-span-2"
        >
          <div className="flex items-center gap-2">
            <Sparkles size={14} />
            <Label className="opacity-70">{about.greeting} I’m</Label>
          </div>
          <div>
            <h1 className="font-grotesk text-[clamp(2.6rem,8vw,4.6rem)] leading-[0.88] font-bold tracking-tight">
              Palak
              <br />
              Agarwal
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/80">
              {profile.oneLiner}
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {profile.roles.map((r) => (
              <span
                key={r}
                className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-medium backdrop-blur"
              >
                {r}
              </span>
            ))}
          </div>
        </Card>

        <Card tone="ink" className="col-span-2 flex flex-col justify-between lg:col-span-2">
          <Label className="opacity-50">Positioning before posting</Label>
          <p className="font-grotesk text-2xl leading-[1.08] font-bold sm:text-4xl">
            {profile.headline}. <span className="text-crimson-soft">Always.</span>
          </p>
        </Card>

        <Card className="flex flex-col justify-between">
          <Label>Views · 30d</Label>
          <p className="font-grotesk text-3xl leading-none font-bold text-crimson sm:text-4xl">
            17.2M
          </p>
          <p className="text-[11px] text-ink/45">97.6% from ads</p>
        </Card>

        <Card tone="mint" className="flex flex-col justify-between">
          <Label className="opacity-60">Peak ROAS</Label>
          <p className="font-grotesk text-3xl leading-none font-bold sm:text-4xl">3.18</p>
          <p className="text-[11px] opacity-60">Campaign B</p>
        </Card>

        <Card
          tone="kraft"
          className="col-span-2 overflow-hidden p-0 lg:col-span-1"
          hover={false}
        >
          <img
            src={profile.portraitPhoto}
            alt={profile.fullName}
            loading="lazy"
            className="h-full min-h-[160px] w-full object-cover"
          />
        </Card>

        <Card className="flex flex-col justify-between">
          <Label>Experience</Label>
          <p className="font-grotesk text-3xl leading-none font-bold sm:text-4xl">
            {profile.yearsExperience}
          </p>
          <p className="text-[11px] text-ink/45">years, brand + performance</p>
        </Card>

        <Card tone="cream" className="col-span-2 flex flex-col justify-center lg:col-span-3">
          <Label>The philosophy</Label>
          <p className="mt-2 font-grotesk text-xl leading-snug font-semibold sm:text-2xl">
            {about.kicker}
          </p>
        </Card>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- about */

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-6 sm:px-6">
      <div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2" hover={false}>
          <Label>About</Label>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-ink/70">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-x-3 gap-y-1 border-t border-ink/8 pt-4 font-mono text-[10px] tracking-[0.16em] text-ink/40 uppercase">
            {profile.legacyRoles.map((r) => (
              <span key={r}>{r}</span>
            ))}
          </div>
        </Card>

        <Card tone="cream" hover={false}>
          <Label>{randomThings.title}</Label>
          <ul className="mt-4 space-y-3">
            {randomThings.items.map((r, i) => (
              <li key={r} className="flex gap-3 text-sm leading-snug text-ink/70">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                {r}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- proof */

function Proof() {
  return (
    <section id="proof" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-6 sm:px-6">
      <div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
        <Card tone="ink" className="lg:col-span-2" hover={false}>
          <Label className="opacity-50">Case study</Label>
          <h2 className="mt-2 font-grotesk text-4xl leading-none font-bold tracking-tight sm:text-6xl">
            {caseStudy.client}
          </h2>
          <p className="mt-2 text-sm text-white/50">{caseStudy.eyebrow}</p>

          <div className="mt-6 flex flex-wrap items-end gap-8">
            <div>
              <Label className="opacity-40">Before</Label>
              <p className="font-grotesk text-lg text-white/40 line-through">{caseStudy.before}</p>
            </div>
            <div>
              <Label className="text-mint opacity-80">After</Label>
              <p className="font-grotesk text-4xl leading-none font-bold text-mint sm:text-5xl">
                {caseStudy.after}
              </p>
              <p className="mt-1 text-xs text-white/45">{caseStudy.afterSuffix}</p>
            </div>
          </div>

          <p className="mt-5 rounded-full bg-white/8 px-4 py-2 text-xs font-medium text-crimson-soft">
            ★ {caseStudy.milestone}
          </p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {caseStudy.breakdown.map((b, i) => (
              <li key={i} className="rounded-2xl bg-white/6 px-4 py-3 text-[13px] leading-snug text-white/70">
                {b.lead}{' '}
                {b.highlight && <span className="font-semibold text-mint">{b.highlight}</span>}{' '}
                {b.rest}
              </li>
            ))}
          </ul>
        </Card>

        <div className="grid gap-3 sm:gap-4">
          <Shot src={caseStudy.proofImage} rounded />
          {metrics.headline.slice(2, 6).map((m) => (
            <Card key={m.label} className="flex items-center justify-between gap-4 py-4">
              <div>
                <p className="text-sm font-semibold">{m.label}</p>
                <p className="text-[11px] text-ink/45">{m.sub}</p>
              </div>
              <p className="font-grotesk text-2xl leading-none font-bold text-crimson">{m.value}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="mt-3 grid gap-3 sm:mt-4 sm:gap-4 lg:grid-cols-2">
        {metrics.detail.map((d) => (
          <Card key={d.name} hover={false}>
            <p className="font-grotesk text-lg font-bold">{d.name}</p>
            <dl className="mt-3 grid grid-cols-2 gap-x-6">
              {d.rows.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-3 border-b border-ink/7 py-1.5">
                  <dt className="text-[11px] text-ink/50">{k}</dt>
                  <dd className="font-mono text-[11px] font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>
        ))}
        {metrics.boards.map((b) => (
          <Shot key={b.image} src={b.image} rounded />
        ))}
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- work */

function Work() {
  const groups = [
    { id: 'social', title: socialMedia.title, images: [...socialMedia.grids, ...socialMedia.insights] },
    { id: 'blogs', title: blogs.title, images: blogs.groups.flatMap((g) => g.images) },
    { id: 'emails', title: emails.title, images: emails.images },
    ...marketing.sections.map((s) => ({ id: s.id, title: s.title, images: s.items.map((i) => i.image) })),
    { id: 'website', title: websiteCopy.title, images: websiteCopy.images },
  ]
  const [active, setActive] = useState('social')
  const current = groups.find((g) => g.id === active) ?? groups[0]

  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-6 sm:px-6">
      <Card hover={false}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Label>Portfolio</Label>
            <h2 className="mt-2 font-grotesk text-3xl leading-none font-bold tracking-tight sm:text-5xl">
              Things I professionally
              <br />
              <span className="text-crimson">overthought.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm text-ink/50">{whatNote}</p>
        </div>

        <div className="scrollbar-none mt-7 flex gap-2 overflow-x-auto pb-1">
          {groups.map((g) => (
            <button
              key={g.id}
              onClick={() => setActive(g.id)}
              className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-medium transition ${
                active === g.id
                  ? 'bg-ink text-white'
                  : 'bg-ink/5 text-ink/60 hover:bg-ink/10'
              }`}
            >
              {g.title}
            </button>
          ))}
        </div>

        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-6 columns-2 gap-3 sm:gap-4 lg:columns-4"
        >
          {current.images.map((src, i) => (
            <div key={src} className="mb-3 break-inside-avoid sm:mb-4">
              <Shot src={src} all={current.images} index={i} rounded />
            </div>
          ))}
        </motion.div>
      </Card>
    </section>
  )
}

const whatNote = 'Social copy, blogs, emails, influencer collabs, static + video ads, and website copy. Tap any card to open it full size.'

/* ------------------------------------------------------------- journal */

function Journal() {
  return (
    <section id="journal" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-6 sm:px-6">
      <div className="mb-3 flex items-end justify-between gap-4 px-2 sm:mb-4">
        <h2 className="font-grotesk text-3xl leading-none font-bold tracking-tight sm:text-4xl">
          Journal
        </h2>
        <p className="text-sm text-ink/45">Notes on brand, funnels & attention</p>
      </div>

      <div className="grid gap-3 sm:gap-4 lg:grid-cols-4">
        {posts.map((p, i) => (
          <Card
            key={p.slug}
            className={`group flex cursor-pointer flex-col p-0 ${i === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
          >
            <div className="overflow-hidden">
              <img
                src={p.cover}
                alt=""
                loading="lazy"
                className={`w-full object-cover object-top transition duration-700 group-hover:scale-105 ${
                  i === 0 ? 'h-56 sm:h-72' : 'h-32'
                }`}
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-crimson/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-crimson uppercase">
                  {p.category}
                </span>
                <span className="text-[10px] text-ink/35">{p.readingTime}</span>
              </div>
              <h3
                className={`mt-2 font-grotesk leading-tight font-bold transition group-hover:text-crimson ${
                  i === 0 ? 'text-2xl sm:text-3xl' : 'text-base'
                }`}
              >
                {p.title}
              </h3>
              {i === 0 && (
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/60">{p.excerpt}</p>
              )}
              <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-crimson">
                Read <ArrowUpRight size={13} />
              </span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------- hire */

function Hire() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <div className="grid gap-3 sm:gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2" hover={false}>
          <Label>{hireMe.subtitle}</Label>
          <h2 className="mt-2 font-grotesk text-3xl leading-none font-bold tracking-tight sm:text-5xl">
            {hireMe.title}
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {hireMe.skills.map((s) => (
              <span
                key={s}
                className="rounded-full bg-ink/5 px-4 py-2 text-[13px] font-medium text-ink/75 transition hover:bg-crimson hover:text-white"
              >
                {s}
              </span>
            ))}
          </div>
          <p className="mt-6 font-grotesk text-xl font-bold text-crimson">{hireMe.teamNote}</p>
        </Card>

        <Card tone="crimson" hover={false} className="flex flex-col justify-between">
          <Label className="opacity-70">The promise</Label>
          <p className="font-grotesk text-2xl leading-tight font-bold">{hireMe.promise}</p>
          <img
            src={profile.portraitHire}
            alt=""
            loading="lazy"
            className="mt-4 max-h-52 w-full object-contain opacity-90 mix-blend-luminosity"
          />
        </Card>
      </div>
    </section>
  )
}

/* -------------------------------------------------------- testimonials */

function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <div className="mb-3 px-2 sm:mb-4">
        <h2 className="font-grotesk text-3xl leading-none font-bold tracking-tight sm:text-4xl">
          {testimonials.title}
        </h2>
      </div>
      <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
        {testimonials.images.map((src, i) => (
          <Shot key={src} src={src} all={testimonials.images} index={i} rounded />
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- contact */

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-4 pt-6 pb-10 sm:px-6">
      <Card tone="ink" hover={false} className="p-8 sm:p-14">
        <Label className="opacity-50">{contact.kicker}</Label>
        <h2 className="mt-5 max-w-3xl font-grotesk text-3xl leading-[1.1] font-bold tracking-tight sm:text-5xl">
          {contact.line1}
        </h2>
        <p className="mt-3 font-grotesk text-xl text-white/35 sm:text-3xl">{contact.line2}</p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${contact.email}`}
            className="group inline-flex items-center gap-3 rounded-full bg-crimson px-7 py-4 text-sm font-semibold transition hover:bg-white hover:text-ink sm:text-base"
          >
            <Mail size={17} />
            {contact.email}
            <ArrowUpRight size={17} className="transition group-hover:-translate-y-0.5" />
          </a>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/8 px-5 py-4 text-sm text-white/60">
            <MapPin size={15} /> {contact.location}
          </span>
        </div>

        <p className="mt-12 border-t border-white/10 pt-5 font-mono text-[10px] tracking-[0.22em] text-white/30 uppercase">
          {contact.name} · © {new Date().getFullYear()}
        </p>
      </Card>
    </section>
  )
}

/* -------------------------------------------------------------- shared */

function Shot({ src, all, index = 0, rounded }) {
  const { open } = useLightbox()
  return (
    <button
      onClick={() => open(all ?? [src], index)}
      className={`group block w-full cursor-zoom-in overflow-hidden bg-white ring-1 ring-ink/6 ${
        rounded ? 'rounded-2xl' : ''
      }`}
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        className="w-full object-cover transition duration-700 group-hover:scale-[1.04]"
      />
    </button>
  )
}
