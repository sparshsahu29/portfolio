import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useContent } from '../content/ContentContext.jsx'

const INTERVAL = 3200

/**
 * A deck of taped index cards that deals itself: the top card shows one
 * headline number, gets a crimson "protected" stamp, then slides off to reveal
 * the next. Pure motion — no image assets — so it never needs re-exporting.
 */
export default function PitchStack({ stamp = 'Brand voice · protected' }) {
  const { metrics } = useContent()
  const cards = (metrics.headline ?? []).slice(0, 6)
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (reduce || paused || cards.length < 2) return
    const t = setInterval(() => setI((n) => (n + 1) % cards.length), INTERVAL)
    return () => clearInterval(t)
  }, [reduce, paused, cards.length])

  if (!cards.length) return null
  const top = cards[i]

  return (
    <div
      className="relative mx-auto flex h-[420px] w-full max-w-[340px] items-center justify-center sm:h-[480px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onClick={() => setI((n) => (n + 1) % cards.length)}
      role="group"
      aria-label="Headline results"
    >
      {/* the rest of the deck, fanned out underneath */}
      {[3, 2, 1].map((depth) => (
        <motion.div
          key={depth}
          aria-hidden
          animate={reduce ? {} : { y: [0, -4, 0], rotate: [depth * 2.2, depth * 2.6, depth * 2.2] }}
          transition={{ duration: 5 + depth, repeat: Infinity, ease: 'easeInOut' }}
          style={{ rotate: depth * 2.2, y: depth * 6, scale: 1 - depth * 0.03 }}
          className="absolute h-[300px] w-[260px] bg-white shadow-[0_18px_40px_-24px_rgba(18,18,18,0.55)] sm:h-[340px] sm:w-[290px]"
        />
      ))}

      <AnimatePresence mode="popLayout" initial={false}>
        <motion.article
          key={i}
          initial={reduce ? false : { y: 40, opacity: 0, rotate: -6 }}
          animate={{ y: 0, opacity: 1, rotate: -1.5 }}
          exit={reduce ? { opacity: 0 } : { x: 220, y: -60, opacity: 0, rotate: 14 }}
          transition={{ type: 'spring', stiffness: 220, damping: 24 }}
          className="relative flex h-[300px] w-[260px] cursor-pointer flex-col justify-between bg-white p-6 shadow-[0_24px_50px_-22px_rgba(18,18,18,0.6)] sm:h-[340px] sm:w-[290px] sm:p-7"
        >
          <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-2" />

          {/* ruled-paper lines */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-6 top-16 bottom-14 opacity-[0.12]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, transparent 0 27px, #121212 27px 28px)',
            }}
          />

          <p className="font-mono text-[10px] tracking-[0.24em] text-bronze uppercase">
            {String(i + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}
          </p>

          <div>
            <p className="font-display text-5xl leading-none text-ink sm:text-6xl">{top.value}</p>
            <p className="mt-3 text-[15px] font-medium text-ink/85">{top.label}</p>
            {top.sub && <p className="mt-1 text-xs text-ink/50">{top.sub}</p>}
          </div>

          <p className="font-hand text-xl text-crimson">— verified on the dashboard</p>

          {/* the stamp lands a beat after the card settles */}
          <motion.div
            aria-hidden
            initial={reduce ? false : { scale: 2.2, opacity: 0, rotate: -22 }}
            animate={{ scale: 1, opacity: 1, rotate: -12 }}
            transition={{ delay: 0.45, type: 'spring', stiffness: 500, damping: 18 }}
            className="absolute -right-4 -bottom-3 rounded-sm border-[3px] border-crimson/80 px-3 py-1.5 font-mono text-[10px] font-bold tracking-[0.22em] text-crimson/80 uppercase mix-blend-multiply"
          >
            {stamp}
          </motion.div>
        </motion.article>
      </AnimatePresence>

      {/* progress dots */}
      <div className="absolute -bottom-2 flex gap-1.5">
        {cards.map((_, n) => (
          <span
            key={n}
            className={`h-1.5 w-1.5 rounded-full transition ${n === i ? 'bg-crimson' : 'bg-ink/20'}`}
          />
        ))}
      </div>
    </div>
  )
}
