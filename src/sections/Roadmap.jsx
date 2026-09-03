import { motion, useReducedMotion } from 'framer-motion'
import { useContent } from '../content/ContentContext.jsx'

const view = { once: true, amount: 0.4 }

/**
 * "What you'll see next" — the deck's table-of-contents page, rebuilt as a
 * live timeline. The line draws itself on scroll, a marker glides along it,
 * and every stop scrolls to its section. Stops come from `whatYoullSee.items`.
 */
export default function Roadmap() {
  const { whatYoullSee } = useContent()
  const items = whatYoullSee.items ?? []
  const reduce = useReducedMotion()
  if (!items.length) return null

  const go = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    history.replaceState(null, '', href)
  }

  return (
    <section id="roadmap" className="relative px-5 py-16 sm:px-10 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="font-display text-4xl leading-none sm:text-6xl">
            <span className="text-bronze">{whatYoullSee.title.replace(/\s*Next$/, '')}</span>{' '}
            <span className="text-crimson italic">Next</span>
          </h2>
          <p className="mt-3 font-hand text-2xl text-crimson sm:text-3xl">{whatYoullSee.subtitle}</p>
        </motion.div>

        {/* ------------------------------------------------ desktop: horizontal */}
        <div className="relative mt-8 hidden px-20 py-20 md:block lg:px-24">
          {/* the line, drawn left → right */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={view}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-20 top-1/2 h-[3px] origin-left -translate-y-1/2 bg-ink lg:inset-x-24"
          />

          {/* the marker that keeps travelling */}
          {!reduce && (
            <div aria-hidden className="pointer-events-none absolute inset-x-20 top-1/2 lg:inset-x-24">
              <motion.div
                initial={{ left: '0%', opacity: 0 }}
                whileInView={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{
                  left: { duration: 6, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.2, delay: 1.2 },
                  opacity: { duration: 6, times: [0, 0.05, 0.95, 1], repeat: Infinity, repeatDelay: 1.2, delay: 1.2 },
                }}
                className="absolute z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson shadow-[0_0_0_6px_rgba(192,17,17,0.18)]"
              />
            </div>
          )}

          <ol className="relative flex justify-between">
            {items.map((it, i) => {
              const above = i % 2 === 1
              return (
                <li key={it.href} className="relative flex w-0 flex-col items-center">
                  {/* dot */}
                  <motion.a
                    href={it.href}
                    onClick={(e) => go(e, it.href)}
                    aria-label={it.label}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={view}
                    transition={{ type: 'spring', stiffness: 420, damping: 18, delay: 0.25 + i * 0.2 }}
                    whileHover={{ scale: 1.35 }}
                    className="relative z-20 block h-5 w-5 rounded-full border-[3px] border-cream bg-ink shadow-[0_0_0_2px_#121212] transition-colors hover:bg-crimson hover:shadow-[0_0_0_2px_#C01111]"
                  />

                  {/* label */}
                  <motion.a
                    href={it.href}
                    onClick={(e) => go(e, it.href)}
                    initial={{ opacity: 0, y: above ? 8 : -8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={view}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.2 }}
                    className={`group absolute w-40 text-center lg:w-48 ${
                      above ? 'bottom-full mb-5' : 'top-full mt-5'
                    }`}
                  >
                    <span className="block text-[15px] font-semibold text-crimson transition group-hover:underline lg:text-base">
                      {it.label}
                    </span>
                    {it.sub && (
                      <span className="mt-0.5 block font-hand text-lg leading-tight text-ink/55">
                        {it.sub}
                      </span>
                    )}
                  </motion.a>
                </li>
              )
            })}
          </ol>
        </div>

        {/* ------------------------------------------------- mobile: vertical */}
        <ol className="relative mt-12 ml-3 border-l-[3px] border-ink pl-8 md:hidden">
          {items.map((it, i) => (
            <motion.li
              key={it.href}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="relative pb-8 last:pb-0"
            >
              <span className="absolute top-1.5 -left-[calc(2rem+9px)] h-4 w-4 rounded-full border-[3px] border-cream bg-ink shadow-[0_0_0_2px_#121212]" />
              <a href={it.href} onClick={(e) => go(e, it.href)} className="block">
                <span className="block text-base font-semibold text-crimson">{it.label}</span>
                {it.sub && <span className="font-hand text-lg text-ink/55">{it.sub}</span>}
              </a>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
