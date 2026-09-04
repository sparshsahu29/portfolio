import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ZoomIn } from 'lucide-react'
import { Section, SectionTitle } from '../designs/paper-trail/parts.jsx'
import { useLightbox } from '../components/Lightbox.jsx'
import Rail from '../components/Rail.jsx'
import { useContent } from '../content/ContentContext.jsx'

/** Static content stores plain paths; the CMS stores { src, href }. Accept both. */
const toSample = (img) => (typeof img === 'string' ? { src: img, href: null } : img)

/**
 * Section 5 — client copywriting work, filtered by deliverable.
 * Every sample sits in one horizontal snap rail, framed like a browser window
 * so the page header stays legible. A sample with a link opens the original;
 * one without opens full-size in the lightbox.
 */
export default function ClientWork() {
  const { clientWork } = useContent()
  const [active, setActive] = useState(clientWork.tabs[0]?.id)
  const current = clientWork.tabs.find((t) => t.id === active) ?? clientWork.tabs[0]
  if (!current) return null
  const samples = current.images.map(toSample)
  const srcs = samples.map((s) => s.src)

  return (
    <Section id="work" className="!pt-4 sm:!pt-6">
      <SectionTitle kicker={clientWork.eyebrow} hand={clientWork.subtitle}>
        {clientWork.title}
      </SectionTitle>

      <div className="flex flex-wrap gap-2 pb-1">
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

      <Rail key={current.id} className="mt-4">
        {samples.map((s, i) => (
          <Clipping key={s.src} {...s} all={srcs} index={i} label={current.label} />
        ))}
      </Rail>
    </Section>
  )
}

function Clipping({ src, href, all, index, label }) {
  const { open } = useLightbox()
  const rotate = index % 3 === 0 ? -1 : index % 3 === 1 ? 0.8 : -0.4
  const Tag = href ? motion.a : motion.button
  const props = href
    ? { href, target: '_blank', rel: 'noopener noreferrer', title: 'Open the original' }
    : { onClick: () => open(all, index), type: 'button', title: 'View full size' }

  return (
    <Tag
      {...props}
      initial={{ opacity: 0, x: 48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      style={{ rotate }}
      whileHover={{ rotate: 0, y: -6 }}
      transition={{ type: 'spring', stiffness: 220, damping: 24, delay: Math.min(index, 4) * 0.06 }}
      className={`group relative block w-[78vw] max-w-[360px] shrink-0 snap-start bg-white p-1.5 pb-7 text-left shadow-[0_14px_32px_-18px_rgba(18,18,18,0.6)] sm:w-[320px] lg:w-[360px] ${
        href ? 'cursor-pointer' : 'cursor-zoom-in'
      }`}
    >
      <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3 opacity-80" />

      {/* browser chrome */}
      <span className="flex items-center gap-1.5 px-2 py-1.5">
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        <span className="h-2 w-2 rounded-full bg-ink/15" />
        {href && (
          <span className="ml-2 truncate font-mono text-[10px] text-ink/40">
            {href.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
          </span>
        )}
      </span>

      {/* landscape frame — the header and opening lines stay readable */}
      <span className="block overflow-hidden bg-ink/5">
        <img
          src={src}
          alt={`${label} sample`}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
        />
      </span>

      <span className="absolute top-3 right-3 z-10 grid h-7 w-7 place-items-center rounded-full bg-ink text-white shadow transition group-hover:bg-crimson">
        {href ? <ArrowUpRight size={14} /> : <ZoomIn size={14} />}
      </span>

      <span className="absolute right-0 bottom-1.5 left-0 truncate px-2 text-center font-hand text-sm text-ink/55">
        {label} · {index + 1}
        {href && <span className="text-crimson"> · read it</span>}
      </span>
    </Tag>
  )
}
