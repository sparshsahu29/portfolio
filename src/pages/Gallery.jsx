import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check } from 'lucide-react'
import { designs } from '../designs/registry.js'
import { profile } from '../data/content.js'
import DesignThumb from '../components/DesignThumb.jsx'

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.06 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Gallery() {
  return (
    <div className="paper-bg min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <motion.header
          initial="hidden"
          animate="show"
          custom={0}
          variants={fade}
          className="max-w-3xl"
        >
          <p className="font-mono text-[11px] tracking-[0.32em] text-crimson uppercase">
            Design directions · Round 1
          </p>
          <h1 className="mt-5 font-display text-5xl leading-[0.95] text-ink sm:text-7xl">
            {profile.fullName}
            <span className="block text-crimson italic">portfolio website</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/70">
            Four complete, working directions built from your existing deck — same words, same
            proof, four different personalities. Open each one, scroll it end to end, then tell me
            the number you want to build on.
          </p>
          <p className="mt-4 font-hand text-2xl text-bronze">
            Everything you see becomes editable in a dashboard once we lock the look.
          </p>
        </motion.header>

        <div className="mt-14 grid gap-8 sm:mt-20 sm:grid-cols-2">
          {designs.map((design, i) => (
            <motion.article
              key={design.id}
              initial="hidden"
              animate="show"
              custom={i + 1}
              variants={fade}
              className="group relative"
            >
              <Link to={`/d/${design.id}`} className="block">
                <div className="relative overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_2px_0_rgba(18,18,18,0.06)] transition duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_18px_40px_-18px_rgba(18,18,18,0.45)]">
                  <DesignThumb design={design} />

                  <div className="absolute top-4 left-4 rounded-full bg-ink/85 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-white uppercase backdrop-blur">
                    {design.number}
                  </div>

                  <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 transition duration-300 group-hover:opacity-100">
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </Link>

              <div className="px-1 pt-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="font-display text-3xl text-ink">{design.name}</h2>
                  <div className="flex shrink-0 gap-1.5">
                    {design.swatches.map((c) => (
                      <span
                        key={c}
                        className="h-4 w-4 rounded-full ring-1 ring-ink/10"
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                </div>

                <p className="mt-1 font-hand text-xl text-crimson">{design.subtitle}</p>

                <p className="mt-3 text-sm leading-relaxed text-ink/65">{design.pitch}</p>

                <div className="mt-4 flex items-start gap-2 text-sm text-ink/75">
                  <Check size={15} className="mt-0.5 shrink-0 text-crimson" />
                  <span>
                    <span className="font-semibold">Best for:</span> {design.bestFor}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {design.vibe.map((v) => (
                    <span
                      key={v}
                      className="rounded-full border border-ink/12 px-2.5 py-1 text-[11px] tracking-wide text-ink/60"
                    >
                      {v}
                    </span>
                  ))}
                </div>

                <p className="mt-3 font-mono text-[11px] tracking-wide text-ink/40">
                  {design.typography}
                </p>

                <Link
                  to={`/d/${design.id}`}
                  className="mt-5 inline-flex items-center gap-2 border-b-2 border-crimson pb-0.5 text-sm font-semibold text-crimson transition hover:gap-3"
                >
                  Open live preview
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.footer
          initial="hidden"
          animate="show"
          custom={6}
          variants={fade}
          className="mt-20 border-t border-ink/10 pt-8"
        >
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <p className="font-mono text-[10px] tracking-[0.24em] text-ink/40 uppercase">
                What is shared
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">
                All four run off one content file — the exact copy, metrics and screenshots from
                your PDF. Changing a headline changes it everywhere.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.24em] text-ink/40 uppercase">
                Next step
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">
                Pick a direction (or mix — “01 hero with 03 metrics” is fine). Then we wire Sanity
                so every section is editable without touching code.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] tracking-[0.24em] text-ink/40 uppercase">
                Included in every direction
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">
                Hero, about, proof + metrics, work galleries, blog index, testimonials, contact —
                responsive down to 360px.
              </p>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  )
}
