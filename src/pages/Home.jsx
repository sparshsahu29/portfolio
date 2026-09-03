import { motion } from 'framer-motion'
import { ArrowDown, Star } from 'lucide-react'
import { LightboxProvider } from '../components/Lightbox.jsx'
import {
  Chip,
  Emphasize,
  PaperCard,
  Section,
  SectionTitle,
  Snap,
  rise,
} from '../designs/paper-trail/parts.jsx'
import { EmailButton, PaperShell, SiteFooter, SiteNav } from '../designs/paper-trail/shell.jsx'
import TestimonialCarousel from '../components/TestimonialCarousel.jsx'
import PitchStack from '../components/PitchStack.jsx'
import Arsenal from '../sections/Arsenal.jsx'
import RandomThings from '../sections/RandomThings.jsx'
import Roadmap from '../sections/Roadmap.jsx'
import ClientWork from '../sections/ClientWork.jsx'
import { useContent } from '../content/ContentContext.jsx'
import { textures } from '../data/content.js'

export default function Home() {
  return (
    <LightboxProvider>
      <PaperShell>
        <SiteNav />
        <Hook />
        <Philosophy />
        <Roadmap />
        <Results />
        <RandomThings />
        <Arsenal />
        <ClientWork />
        <WhyHireMe />
        <SiteFooter />
      </PaperShell>
    </LightboxProvider>
  )
}

/* ------------------------------------------------- section 1 · the hook */

function Hook() {
  const { hero, profile } = useContent()

  return (
    <section id="top" className="relative overflow-hidden px-5 pt-10 pb-8 sm:px-10 sm:pt-12">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1fr]">
        <motion.div initial="hidden" animate="show" variants={rise}>
          <h1 className="font-display text-[clamp(2.75rem,8vw,5.25rem)] leading-[0.86] text-ink">
            Content
            <br />
            with <span className="text-crimson italic">intent</span>
          </h1>

          <div className="relative mt-6 max-w-md">
            <img
              src={textures.ruled}
              alt=""
              className="pointer-events-none absolute -inset-x-6 -inset-y-4 -z-10 h-[calc(100%+2rem)] w-[calc(100%+3rem)] rotate-[-1.2deg] object-fill opacity-90"
            />
            <p className="relative py-1.5 font-display text-xl leading-snug text-ink sm:text-2xl">
              Positioning before posting.{' '}
              <span className="text-crimson underline decoration-wavy decoration-2">Always.</span>
            </p>
          </div>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/70 sm:text-[17px]">
            <span className="font-semibold text-ink">{profile.yearsExperience} years</span> building
            relevance for brands in a world with a{' '}
            <span className="marker-underline font-semibold text-bronze">
              3-second attention span
            </span>
            .
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <a
              href={hero.primaryCta.href}
              className="group inline-flex items-center gap-2 bg-ink px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-crimson sm:text-base"
            >
              {hero.primaryCta.label}
              <ArrowDown size={16} className="transition group-hover:translate-y-0.5" />
            </a>
            <EmailButton size="md" label={hero.secondaryCta.label} />
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-2">
            {profile.roles.map((r) => (
              <Chip key={r}>{r}</Chip>
            ))}
          </div>

          <img
            src={textures.socialIcons}
            alt=""
            className="mt-5 h-6 w-auto opacity-80"
            loading="lazy"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <div className="absolute inset-x-6 top-10 bottom-0 -rotate-2 rounded-sm bg-crimson/8" />
          <img
            src={profile.portraitRed}
            alt={profile.fullName}
            className="relative mx-auto max-h-[56vh] w-auto object-contain drop-shadow-[0_24px_40px_rgba(192,17,17,0.18)] lg:max-h-[78vh] lg:min-h-[520px]"
          />
        </motion.div>
      </div>
    </section>
  )
}

/* ----------------------------------------- section 2 · core philosophy */

function Philosophy() {
  const { about, philosophy, profile } = useContent()

  return (
    <Section id="about" className="!pt-8 sm:!pt-12">
      <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        {/* polaroid */}
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto w-full max-w-xs lg:mx-0 lg:max-w-none"
        >
          <div className="relative rotate-[-2deg] bg-white p-3 pb-10 shadow-[0_18px_40px_-20px_rgba(18,18,18,0.55)]">
            <span className="tape -top-4 left-1/2 -translate-x-1/2 -rotate-3" />
            <img
              src={profile.portraitPhoto}
              alt={profile.fullName}
              loading="lazy"
              className="aspect-[3/4] w-full object-cover"
            />
          </div>
        </motion.div>

        <div>
          <motion.div
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="font-display text-5xl leading-[0.92] text-ink sm:text-7xl">
              {philosophy.title}
            </h2>
            <div className="mt-5 h-[3px] w-24 bg-crimson" />
          </motion.div>

          {/* straight from the deck: greeting, roles, then the manifesto in prose */}
          <motion.div
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mt-9"
          >
            <p className="font-hand text-4xl text-bronze sm:text-5xl">
              {about.greeting} <span className="text-crimson">{about.intro}</span>
            </p>
            <p className="mt-3 text-sm font-semibold tracking-wide text-crimson sm:text-base">
              {profile.legacyRoles.join(' | ')}
            </p>
          </motion.div>

          <div className="mt-7 space-y-5">
            {about.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                variants={rise}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.05 }}
                className="text-[16px] leading-[1.75] text-ink/75 sm:text-[17px]"
              >
                <Emphasize text={p} terms={about.emphasis} />
              </motion.p>
            ))}
          </div>

          <motion.p
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-8 border-t border-ink/12 pt-7 font-hand text-3xl leading-snug text-bronze sm:text-4xl"
          >
            {about.kicker}
          </motion.p>
        </div>
      </div>
    </Section>
  )
}

/* ------------------------------------------------- section 3 · results */

/**
 * One taped card per brand, laid out like the deck slide: headline in
 * handwriting, before / after / milestone on the left with the sales graph,
 * the breakdown on the right, headline numbers in a strip underneath.
 * WHOLELEAF is the only brand with numbers today; more can be added as cards.
 */
function Results() {
  const { results, caseStudy, metrics } = useContent()

  return (
    <Section id="results" className="!pt-6 sm:!pt-10">
      <SectionTitle kicker="results" hand={results.subtitle}>
        {results.title}
      </SectionTitle>

      <BrandResult brand={caseStudy} stats={metrics.cards} boards={metrics.boards} />
    </Section>
  )
}

function BrandResult({ brand, stats, boards = [] }) {
  const headline = brand.eyebrow.split(brand.client)

  return (
    <motion.div
      variants={rise}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      <PaperCard tape tone="cream" rotate={-0.4} className="px-6 py-8 sm:px-10 sm:py-10">
        {/* "At WHOLELEAF, we were nowhere" */}
        <p className="font-hand text-3xl leading-tight text-bronze sm:text-4xl lg:text-5xl">
          {headline[0]}
          <span className="font-display not-italic tracking-wide text-crimson">{brand.client}</span>
          {headline[1]}
        </p>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* left: the arc of the story + proof */}
          <div>
            <dl className="space-y-2.5 text-[15px] sm:text-base">
              <div className="flex gap-3">
                <dt className="w-16 shrink-0 font-mono text-[11px] tracking-[0.2em] text-ink/45 uppercase pt-1">
                  Before
                </dt>
                <dd className="text-ink/60 line-through decoration-ink/40">{brand.before}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-16 shrink-0 font-mono text-[11px] tracking-[0.2em] text-crimson uppercase pt-1">
                  After
                </dt>
                <dd>
                  <span className="font-display text-2xl leading-none text-crimson sm:text-3xl">
                    {brand.after}
                  </span>{' '}
                  <span className="text-ink/70">{brand.afterSuffix}</span>
                </dd>
              </div>
            </dl>

            <motion.span
              variants={rise}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.15 }}
              className="mt-5 inline-flex items-center gap-2 bg-ink px-4 py-2 text-[13px] font-semibold text-white"
            >
              <Star size={14} className="fill-crimson text-crimson" />
              {brand.milestone}
            </motion.span>

            <ProofStack
              cover={brand.proofImage}
              coverCaption="Total sales over time — ₹5.64 Cr, +315%"
              more={boards}
            />
          </div>

          {/* right: breakdown */}
          <div>
            <p className="font-hand text-3xl text-crimson sm:text-4xl">Breakdown</p>
            <ul className="mt-4 space-y-4">
              {brand.breakdown.map((b, i) => (
                <motion.li
                  key={i}
                  variants={rise}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex gap-3 border-b border-ink/10 pb-4 last:border-0"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                  <p className="text-[15px] leading-relaxed text-ink/75">
                    {b.lead}{' '}
                    {b.highlight && (
                      <span className="font-semibold text-crimson">{b.highlight}</span>
                    )}{' '}
                    {b.rest}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* headline numbers */}
        {stats?.length > 0 && (
          <div className="mt-9 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink/12 pt-7 sm:grid-cols-4">
            {stats.map((m, i) => (
              <motion.div
                key={`${m.label}-${m.value}`}
                variants={rise}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.06 }}
              >
                <p className="font-display text-2xl leading-none text-crimson sm:text-3xl">{m.value}</p>
                <p className="mt-1.5 text-[13px] font-semibold text-ink">{m.label}</p>
                <p className="text-xs text-ink/50">{m.sub}</p>
              </motion.div>
            ))}
          </div>
        )}
      </PaperCard>
    </motion.div>
  )
}

/**
 * The sales graph sits on top of a visible pile; the Ads Manager boards peek
 * out behind it. Clicking opens all of them in one lightbox, graph first.
 */
function ProofStack({ cover, coverCaption, more = [] }) {
  const all = [cover, ...more.map((b) => b.image)]
  const extra = more.length

  return (
    <div className="relative isolate mt-9 mr-3 mb-3">
      {/* the pile: one sheet per extra screenshot, fanned out behind the cover */}
      {more.slice(0, 2).map((b, i) => (
        <motion.div
          key={b.image}
          aria-hidden
          initial={{ opacity: 0, rotate: 0, x: 0, y: 0 }}
          whileInView={{ opacity: 1, rotate: (i + 1) * 2.2, x: (i + 1) * 6, y: (i + 1) * 5 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.25 + i * 0.08 }}
          className="absolute inset-0 overflow-hidden bg-white p-2 shadow-[0_10px_24px_-16px_rgba(18,18,18,0.6)]"
          style={{ zIndex: -1 - i }}
        >
          <img src={b.image} alt="" loading="lazy" className="h-full w-full object-cover opacity-80" />
        </motion.div>
      ))}

      <Snap src={cover} all={all} index={0} caption={coverCaption} rotate={-0.8} className="relative z-10" />

      {extra > 0 && (
        <span className="pointer-events-none absolute -top-3 -right-3 z-20 inline-flex items-center gap-1 bg-crimson px-2.5 py-1 font-mono text-[11px] font-semibold text-white shadow-md">
          +{extra} <span className="font-hand text-sm normal-case">Ads Manager</span>
        </span>
      )}
    </div>
  )
}

/* --------------------------- section 6 · why hire me + social proof */

function WhyHireMe() {
  const { hireMe, testimonials } = useContent()

  return (
    <Section id="why-hire-me">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SectionTitle kicker="the pitch">{hireMe.title}</SectionTitle>
          <p className="font-mono text-[11px] tracking-[0.3em] text-bronze uppercase">
            {hireMe.subtitle}
          </p>
          <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {hireMe.skills.map((s, i) => (
              <motion.li
                key={s}
                variants={rise}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-3 border-b border-ink/10 pb-3 text-[15px] text-ink/80"
              >
                <span className="font-mono text-xs text-crimson">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {s}
              </motion.li>
            ))}
          </ul>
          <p className="mt-8 font-hand text-3xl text-crimson">{hireMe.teamNote}</p>
          <PaperCard tape rotate={-1} className="mt-8">
            <p className="font-display text-xl leading-snug text-ink sm:text-2xl">
              {hireMe.promise}
            </p>
          </PaperCard>
        </div>

        <div className="relative flex items-center justify-center lg:pt-10">
          <PitchStack />
        </div>
      </div>

      {/* social proof */}
      <div id="testimonials" className="mt-20 scroll-mt-24 border-t border-ink/12 pt-14">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] tracking-[0.3em] text-bronze uppercase">
              Social proof
            </p>
            <h3 className="mt-2 font-display text-4xl leading-none text-ink sm:text-5xl">
              {testimonials.title}
            </h3>
          </div>
          <p className="font-hand text-2xl text-bronze">{testimonials.subtitle}</p>
        </div>

        <TestimonialCarousel items={testimonials.items} />
      </div>
    </Section>
  )
}
