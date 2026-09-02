import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Section, SectionTitle } from '../designs/paper-trail/parts.jsx'
import { useLightbox } from '../components/Lightbox.jsx'
import { useContent } from '../content/ContentContext.jsx'

/** How many clippings show before the "+N more" tile. One row on desktop. */
const VISIBLE = 5

/**
 * Section 5 — client copywriting work, filtered by deliverable.
 * Only one row of uniformly-cropped clippings renders; the rest sit behind a
 * "+N more" tile that opens the full set in the lightbox. The section stays
 * one screen tall however many samples get added in the CMS.
 */
export default function ClientWork() {
  const { clientWork } = useContent()
  const { open } = useLightbox()
  const [active, setActive] = useState(clientWork.tabs[0].id)
  const current = clientWork.tabs.find((t) => t.id === active) ?? clientWork.tabs[0]
  const shown = current.images.slice(0, VISIBLE)
  const hidden = current.images.length - shown.length

  return (
    <Section id="work">
      <SectionTitle kicker={clientWork.eyebrow} hand={clientWork.subtitle}>
        {clientWork.title}
      </SectionTitle>

      <div className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
        {clientWork.tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`shrink-0 rounded-full border px-5 py-2 text-sm font-medium transition ${
              active === t.id
                ? 'border-crimson bg-crimson text-white'
                : 'border-ink/15 bg-white/50 text-ink/60 hover:border-crimson/50 hover:text-crimson'
            }`}
          >
            {t.label}
            <span className="ml-2 font-mono text-[10px] opacity-60">{t.images.length}</span>
          </button>
        ))}
      </div>

      <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink/65">{current.note}</p>

      <motion.div
        key={current.id}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-6"
      >
        {shown.map((src, i) => (
          <Clipping key={src} src={src} all={current.images} index={i} label={current.label} />
        ))}

        {hidden > 0 && (
          <motion.button
            onClick={() => open(current.images, VISIBLE)}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="group flex aspect-[3/4] flex-col items-center justify-center gap-2 border-2 border-dashed border-ink/25 bg-white/40 text-ink transition hover:border-crimson hover:bg-white"
          >
            <span className="font-display text-4xl leading-none text-crimson sm:text-5xl">
              +{hidden}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold tracking-wide">
              more {current.label.toLowerCase()}
              <ArrowUpRight size={13} className="transition group-hover:-translate-y-0.5" />
            </span>
          </motion.button>
        )}
      </motion.div>
    </Section>
  )
}

function Clipping({ src, all, index, label }) {
  const { open } = useLightbox()
  const rotate = index % 3 === 0 ? -1.2 : index % 3 === 1 ? 1 : -0.4

  return (
    <motion.button
      onClick={() => open(all, index)}
      style={{ rotate }}
      whileHover={{ rotate: 0, y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="relative block w-full cursor-zoom-in bg-white p-1.5 pb-6 shadow-[0_12px_28px_-16px_rgba(18,18,18,0.6)]"
    >
      <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3 opacity-80" />
      {/* crop to the top of the page — headline + first paragraph is the hook */}
      <img
        src={src}
        alt={`${label} sample`}
        loading="lazy"
        className="aspect-[3/4] w-full object-cover object-top"
      />
      <span className="absolute right-0 bottom-1 left-0 truncate px-2 text-center font-hand text-sm text-ink/55">
        {label} · {index + 1}
      </span>
    </motion.button>
  )
}
