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
        <MegaCaseStudy />
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
    <section id="top" className="relative overflow-hidden px-5 pt-14 pb-24 sm:px-10 sm:pt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div initial="hidden" animate="show" variants={rise}>
          <p className="font-hand text-3xl text-crimson sm:text-4xl">{hero.eyebrow}</p>

          <h1 className="mt-2 font-display text-[clamp(3rem,11vw,7.5rem)] leading-[0.82] text-ink">
            Content
            <br />
            with <span className="text-crimson italic">intent</span>
          </h1>

          <div className="relative mt-8 max-w-md">
            <img
              src={textures.ruled}
              alt=""
              className="pointer-events-none absolute -inset-x-6 -inset-y-5 -z-10 h-[calc(100%+2.5rem)] w-[calc(100%+3rem)] rotate-[-1.2deg] object-fill opacity-90"
            />
            <p className="relative py-2 font-display text-2xl leading-snug text-ink sm:text-3xl">
              Positioning before posting.{' '}
              <span className="text-crimson underline decoration-wavy decoration-2">Always.</span>
            </p>
          </div>

          <p className="mt-8 max-w-lg text-base leading-relaxed text-ink/70 sm:text-lg">
            <span className="font-semibold text-ink">{profile.yearsExperience} years</span> building
            relevance for brands in a world with a{' '}
            <span className="marker-underline font-semibold text-bronze">
              3-second attention span
            </span>
            .
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={hero.primaryCta.href}
              className="group inline-flex items-center gap-2 bg-ink px-7 py-4 text-sm font-semibold text-white transition hover:bg-crimson sm:text-base"
            >
              {hero.primaryCta.label}
              <ArrowDown size={16} className="transition group-hover:translate-y-0.5" />
            </a>
            <EmailButton size="md" label={hero.secondaryCta.label} />
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-2">
            {profile.roles.map((r) => (
              <Chip key={r}>{r}</Chip>
            ))}
          </div>

          <img
            src={textures.socialIcons}
            alt=""
            className="mt-8 h-8 w-auto opacity-90"
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
            className="relative mx-auto max-h-[60vh] w-auto object-contain drop-shadow-[0_24px_40px_rgba(192,17,17,0.18)]"
          />
          <div className="absolute -right-2 bottom-6 rotate-3 bg-white px-4 py-2 shadow-lg">
            <p className="font-hand text-xl text-ink">{profile.location}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ----------------------------------------- section 2 · core philosophy */

function Philosophy() {
  const { about, philosophy, profile, randomThings } = useContent()

  return (
    <Section id="about">
      <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        {/* polaroid */}
        <motion.div
          variants={rise}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto w-full max-w-xs lg:mx-0 lg:max-w-none"
        >
          <div className="relative rotate-[-2deg] bg-white p-3 pb-16 shadow-[0_18px_40px_-20px_rgba(18,18,18,0.55)]">
            <span className="tape -top-4 left-1/2 -translate-x-1/2 -rotate-3" />
            <img
              src={profile.portraitPhoto}
              alt={profile.fullName}
              loading="lazy"
              className="aspect-[3/4] w-full object-cover"
            />
            <p className="absolute right-0 bottom-4 left-0 text-center font-hand text-2xl text-ink/65">
              {philosophy.polaroidCaption}
            </p>
          </div>

          <div className="mt-10 hidden lg:block">
            <p className="font-mono text-[10px] tracking-[0.24em] text-bronze uppercase">
              {randomThings.title}
            </p>
            <ul className="mt-3 space-y-2.5">
              {randomThings.items.slice(0, 5).map((r) => (
                <li key={r} className="flex gap-3 text-sm leading-snug text-ink/65">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div>
          <motion.div
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            <p className="font-mono text-[11px] tracking-[0.3em] text-bronze uppercase">
              {philosophy.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-5xl leading-[0.92] text-ink sm:text-7xl">
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

/* --------------------------------------- section 3 · mega case study */

function MegaCaseStudy() {
  const { caseStudy, metrics } = useContent()

  return (
    <Section id="results">
      <SectionTitle kicker="the mega case study">{caseStudy.client}</SectionTitle>

      {/* heavy typography before / after */}
      <motion.div
        variants={rise}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="grid gap-8 border-y border-ink/15 py-10 sm:grid-cols-[auto_1fr] sm:gap-14 sm:py-14"
      >
        <div>
          <p className="font-mono text-[11px] tracking-[0.28em] text-ink/40 uppercase">Before</p>
          <p className="mt-2 font-display text-3xl leading-none text-ink/40 line-through sm:text-5xl">
            Barely 1 crore
          </p>
          <p className="mt-1 text-sm text-ink/40">a year</p>
        </div>

        <div>
          <p className="font-mono text-[11px] tracking-[0.28em] text-crimson uppercase">After</p>
          <p className="mt-2 font-display text-[clamp(3.5rem,13vw,9rem)] leading-[0.8] text-crimson">
            5.6 crore
          </p>
          <p className="mt-3 font-display text-xl text-ink/70 italic sm:text-2xl">
            in less than a year.
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={rise}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="mt-8 flex flex-wrap items-center gap-4"
      >
        <span className="inline-flex items-center gap-2 bg-ink px-5 py-2.5 text-sm font-semibold text-white">
          <Star size={15} className="fill-crimson text-crimson" />
          Raised funding on Shark Tank India — Season 5
        </span>
        <span className="font-hand text-2xl text-bronze">{caseStudy.eyebrow}</span>
      </motion.div>

      {/* metric cards */}
      <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {metrics.cards.map((m, i) => (
          <motion.div
            key={`${m.label}-${m.value}`}
            variants={rise}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: i * 0.06 }}
          >
            <PaperCard rotate={i % 2 ? -0.7 : 0.7} className="h-full">
              <p className="font-display text-4xl leading-none text-crimson sm:text-6xl">
                {m.value}
              </p>
              <p className="mt-3 text-sm font-semibold text-ink">{m.label}</p>
              <p className="mt-0.5 text-xs text-ink/50">{m.sub}</p>
            </PaperCard>
          </motion.div>
        ))}
      </div>

      {/* breakdown + proof */}
      <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="font-mono text-[11px] tracking-[0.3em] text-bronze uppercase">
            How it happened
          </p>
          <ul className="mt-5 space-y-5">
            {caseStudy.breakdown.map((b, i) => (
              <motion.li
                key={i}
                variants={rise}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className="flex gap-4 border-b border-ink/10 pb-5"
              >
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-crimson" />
                <p className="text-[15px] leading-relaxed text-ink/75">
                  {b.lead}{' '}
                  {b.highlight && (
                    <span className="font-display text-xl text-crimson">{b.highlight}</span>
                  )}{' '}
                  {b.rest}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <Snap src={caseStudy.proofImage} caption="Shark Tank India · Season 5" rotate={0.8} />
          <div className="grid gap-6 sm:grid-cols-2">
            {metrics.boards.map((b, i) => (
              <Snap
                key={b.image}
                src={b.image}
                all={metrics.boards.map((x) => x.image)}
                index={i}
                caption={b.label}
                rotate={i ? 1 : -1}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
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
