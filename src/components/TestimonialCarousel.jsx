import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Linkedin, Quote } from 'lucide-react'
import { useLightbox } from './Lightbox.jsx'

const AUTOPLAY_MS = 9000

export default function TestimonialCarousel({ items = [] }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const { open } = useLightbox()

  const count = items.length
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count])
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count])

  useEffect(() => {
    if (paused || count < 2) return
    const id = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, next, count])

  if (!count) return null
  const item = items[index]

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative min-h-[440px] sm:min-h-[360px]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={item.name}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-white p-7 shadow-[0_16px_38px_-22px_rgba(18,18,18,0.5)] sm:p-10"
          >
            <span className="tape -top-3 left-10 -rotate-5" />
            <span className="tape -top-3 right-10 rotate-5" />

            <Quote size={30} className="text-crimson/25" />

            <p className="mt-4 font-display text-lg leading-[1.55] text-ink sm:text-2xl">
              {item.quote}
            </p>

            <footer className="mt-7 flex flex-wrap items-end justify-between gap-4 border-t border-ink/10 pt-5">
              <div>
                <p className="flex items-center gap-2 font-display text-xl text-ink">
                  {item.name}
                  <Linkedin size={15} className="text-crimson" />
                </p>
                <p className="mt-0.5 max-w-md text-xs leading-relaxed text-ink/55">{item.role}</p>
                <p className="mt-1 font-mono text-[10px] tracking-[0.16em] text-bronze uppercase">
                  {item.relationship} · {item.date}
                </p>
              </div>

              {item.screenshot && (
                <button
                  onClick={() => open(items.map((t) => t.screenshot).filter(Boolean), index)}
                  className="shrink-0 border-b border-crimson/40 text-[11px] font-semibold tracking-wide text-crimson transition hover:border-crimson"
                >
                  View on LinkedIn ↗
                </button>
              )}
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex gap-2">
          {items.map((t, i) => (
            <button
              key={t.name}
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial from ${t.name}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? 'w-8 bg-crimson' : 'w-2 bg-ink/20 hover:bg-ink/40'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="mr-2 font-mono text-[10px] tracking-[0.18em] text-ink/40">
            {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
          </span>
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="rounded-full border border-ink/15 bg-white/70 p-2.5 text-ink/60 transition hover:border-crimson hover:text-crimson"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="rounded-full border border-ink/15 bg-white/70 p-2.5 text-ink/60 transition hover:border-crimson hover:text-crimson"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
