import { motion } from 'framer-motion'
import Rail from '../components/Rail.jsx'
import { Section, SectionTitle } from '../designs/paper-trail/parts.jsx'
import { useLightbox } from '../components/Lightbox.jsx'
import VideoCard from '../components/VideoCard.jsx'
import { useContent } from '../content/ContentContext.jsx'

/**
 * Section 4 — the deliverables a prospect can actually buy, grouped into
 * Performance Marketing / Influencer Collabs / Content Creation.
 */
export default function Arsenal() {
  const { services } = useContent()
  if (!services.grids?.length) return null

  return (
    <Section id="services" className="!pt-4 sm:!pt-6">
      <SectionTitle kicker={services.eyebrow} hand={services.subtitle}>
        {services.title}
      </SectionTitle>

      <div className="space-y-12 sm:space-y-14">
        {services.grids.map((grid, gi) => (
          <div key={grid.id} id={grid.id} className="scroll-mt-24">
            <div className="mb-8 grid gap-4 border-t border-ink/12 pt-6 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
              <div>
                <p className="font-mono text-[11px] tracking-[0.28em] text-bronze uppercase">
                  Grid {gi + 1}
                </p>
                <h3 className="mt-2 font-display text-3xl leading-tight text-ink sm:text-5xl">
                  {grid.title}
                </h3>
              </div>
              <div>
                <p className="text-[15px] leading-relaxed text-ink/70">{grid.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {grid.deliverables.map((d) => (
                    <span
                      key={d}
                      className="rounded-full border border-ink/15 bg-white/60 px-3 py-1 text-[11px] font-medium tracking-wide text-ink/65"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Rail>
              {grid.items.map((item, i) => (
                <ArsenalCard
                  key={item._key ?? item.src ?? item.image ?? i}
                  item={item}
                  index={i}
                  stills={grid.items.filter((x) => x.type !== 'video').map((x) => x.image)}
                />
              ))}
            </Rail>
          </div>
        ))}
      </div>
    </Section>
  )
}

function ArsenalCard({ item, index, stills }) {
  const { open } = useLightbox()
  const rotate = index % 3 === 0 ? -1.3 : index % 3 === 1 ? 1.1 : -0.5
  const isVideo = item.type === 'video' && item.src

  return (
    <motion.figure
      initial={{ opacity: 0, x: 48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: 'spring', stiffness: 180, damping: 24, delay: Math.min(index, 4) * 0.07 }}
      className="group flex w-[62vw] max-w-[240px] shrink-0 snap-start flex-col sm:w-[220px] lg:w-[240px]"
    >
      {isVideo ? (
        <VideoCard src={item.src} poster={item.poster} title={item.title} rotate={rotate} />
      ) : (
        <motion.button
          onClick={() => open(stills, stills.indexOf(item.image))}
          style={{ rotate }}
          whileHover={{ rotate: 0, y: -6 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          className="relative cursor-zoom-in bg-white p-2 shadow-[0_12px_28px_-16px_rgba(18,18,18,0.6)]"
        >
          <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3 opacity-80" />
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="aspect-[9/16] w-full object-cover object-top"
          />
        </motion.button>
      )}

      <figcaption className="mt-4 flex flex-1 flex-col">
        <p className="font-mono text-[10px] tracking-[0.18em] text-bronze uppercase">
          {item.meta}
        </p>
        <p className="mt-1 font-display text-lg leading-tight text-ink">{item.title}</p>
        {item.note && (
          <p className="mt-1 flex-1 text-xs leading-relaxed text-ink/55">{item.note}</p>
        )}
      </figcaption>
    </motion.figure>
  )
}
