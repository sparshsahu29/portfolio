import { motion } from 'framer-motion'
import { useLightbox } from '../../components/Lightbox.jsx'

export const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export function Section({ id, children, className = '' }) {
  return (
    <section id={id} className={`relative px-5 py-14 sm:px-10 sm:py-20 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  )
}

export function SectionTitle({ kicker, children, hand }) {
  return (
    <motion.div
      variants={rise}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className="mb-10 sm:mb-14"
    >
      {kicker && (
        <p className="mb-2 font-mono text-[11px] tracking-[0.3em] text-bronze uppercase">
          {kicker}
        </p>
      )}
      <h2 className="font-display text-4xl leading-[0.95] text-ink sm:text-6xl">{children}</h2>
      {hand && <p className="mt-3 font-hand text-2xl text-crimson sm:text-3xl">{hand}</p>}
      <div className="mt-5 h-[3px] w-24 bg-crimson" />
    </motion.div>
  )
}

/** A torn-edge paper card with optional tape and rotation. */
export function PaperCard({ children, rotate = 0, tape, className = '', tone = 'white' }) {
  const tones = {
    white: 'bg-white',
    kraft: 'bg-[#cbb391]',
    cream: 'bg-[#faf8f2]',
    ink: 'bg-ink text-white',
  }
  return (
    <div
      className={`relative ${tones[tone]} p-6 shadow-[0_10px_30px_-18px_rgba(18,18,18,0.55)] sm:p-8 ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {tape && (
        <>
          <span className="tape -top-3 left-6 -rotate-6" />
          <span className="tape -top-3 right-6 rotate-6" />
        </>
      )}
      {children}
    </div>
  )
}

/** Clickable screenshot styled as a taped-down photo print. */
export function Snap({ src, all, index = 0, caption, rotate = 0, className = '' }) {
  const { open } = useLightbox()
  return (
    <motion.button
      variants={rise}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      onClick={() => open(all ?? [src], index)}
      style={{ rotate }}
      whileHover={{ rotate: 0, y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className={`group relative block cursor-zoom-in bg-white p-2 pb-8 shadow-[0_12px_28px_-16px_rgba(18,18,18,0.6)] ${className}`}
    >
      <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3 opacity-80" />
      <img src={src} alt={caption ?? ''} loading="lazy" className="w-full object-cover" />
      <span className="absolute right-0 bottom-2 left-0 truncate px-3 text-center font-hand text-base text-ink/60">
        {caption ?? 'click to open'}
      </span>
    </motion.button>
  )
}

export function SnapGrid({ images, cols = 'sm:grid-cols-3', captionFor }) {
  return (
    <div className={`grid grid-cols-1 gap-6 ${cols} sm:gap-8`}>
      {images.map((src, i) => (
        <Snap
          key={src}
          src={src}
          all={images}
          index={i}
          rotate={i % 3 === 0 ? -1.6 : i % 3 === 1 ? 1.2 : -0.6}
          caption={captionFor?.(src, i)}
        />
      ))}
    </div>
  )
}

/**
 * Renders `text` with any phrase in `terms` picked out in crimson, the way the
 * bolded phrases read in the original deck.
 */
export function Emphasize({ text, terms = [] }) {
  if (!terms.length) return text

  const sorted = [...terms].sort((a, b) => b.length - a.length)
  const pattern = sorted.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')
  const parts = text.split(new RegExp(`(${pattern})`, 'gi'))
  const lookup = new Set(sorted.map((t) => t.toLowerCase()))

  return parts.map((part, i) =>
    lookup.has(part.toLowerCase()) ? (
      <strong key={i} className="font-semibold text-crimson">
        {part}
      </strong>
    ) : (
      part
    ),
  )
}

export function Chip({ children }) {
  return (
    <span className="inline-block rounded-full border border-crimson/40 bg-crimson/5 px-3 py-1 text-xs font-medium tracking-wide text-crimson">
      {children}
    </span>
  )
}
