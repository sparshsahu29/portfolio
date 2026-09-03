import { motion } from 'framer-motion'
import { useContent } from '../content/ContentContext.jsx'

const view = { once: true, amount: 0.3 }
const spring = { type: 'spring', stiffness: 160, damping: 20 }

/**
 * "Random things about me" — a rebuild of the Canva page: the cutout in the
 * middle, the title arched over her head, eight handwritten notes fanned out
 * either side. Notes come from `randomThings.items`; the first half sit on the
 * left, the rest on the right, so reordering in the CMS reorders the page.
 */
export default function RandomThings() {
  const { randomThings, profile } = useContent()
  const items = randomThings.items ?? []
  const half = Math.ceil(items.length / 2)
  const left = items.slice(0, half)
  const right = items.slice(half)

  return (
    <section id="random-things" className="relative overflow-hidden px-5 pt-6 pb-0 sm:px-10">
      <div className="mx-auto max-w-6xl">
        {/* mobile: title first, then figure, then notes */}
        <ArchTitle text={randomThings.title} className="mx-auto w-[min(90vw,420px)] lg:hidden" />

        <div className="grid items-center gap-8 lg:grid-cols-[1fr_minmax(300px,380px)_1fr] lg:gap-6">
          <Column notes={left} side="left" className="order-2 lg:order-1" />

          <div className="relative order-1 mx-auto w-full max-w-[380px] lg:order-2">
            <ArchTitle
              text={randomThings.title}
              className="absolute inset-x-[-12%] top-0 z-10 hidden lg:block"
            />
            <Figure src={profile.portraitDress} alt={profile.fullName} />
          </div>

          <Column notes={right} side="right" className="order-3" />
        </div>
      </div>
    </section>
  )
}

/** Title set along an arc, drawn with a spring so it "lands" over her head. */
function ArchTitle({ text, className = '' }) {
  return (
    <motion.svg
      viewBox="0 0 400 210"
      className={`overflow-visible ${className}`}
      initial={{ opacity: 0, scale: 0.85, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={view}
      transition={{ ...spring, delay: 0.1 }}
      aria-hidden
    >
      <defs>
        <path id="arch" d="M 30 200 A 170 170 0 0 1 370 200" fill="none" />
      </defs>
      <text
        className="font-hand fill-crimson"
        style={{ fontSize: 46, fontWeight: 600 }}
        textAnchor="middle"
      >
        <textPath href="#arch" startOffset="50%">
          {text}
        </textPath>
      </text>
    </motion.svg>
  )
}

/**
 * The cutout is a full-body PNG with a lot of transparent padding; this crops
 * it to head-to-knees like the Canva page and lets the bottom run off the edge.
 */
function Figure({ src, alt }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={view}
      transition={{ ...spring, delay: 0.05 }}
      className="relative aspect-[3/4] w-full overflow-hidden"
    >
      {/* source PNG: figure spans ~x35–63%, y24–80% of a 3:4 canvas → scale 2.3, anchor on the head */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute left-1/2 w-[230%] max-w-none -translate-x-1/2 top-[-32%] lg:top-[-18%]"
      />
    </motion.div>
  )
}

function Column({ notes, side, className = '' }) {
  const dir = side === 'left' ? -1 : 1
  return (
    <ul
      className={`grid grid-cols-2 gap-x-4 gap-y-6 lg:flex lg:h-full lg:flex-col lg:justify-between lg:gap-10 lg:py-6 ${className}`}
    >
      {notes.map((n, i) => (
        <motion.li
          key={n}
          initial={{ opacity: 0, x: dir * 28, y: 10 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={view}
          transition={{ ...spring, delay: 0.2 + i * 0.12 }}
          // zig-zag the notes toward / away from the figure like the Canva layout
          style={{ '--zig': `${dir * (i % 2 ? 24 : -12)}px` }}
          className="font-hand text-center text-xl leading-snug text-ink/80 sm:text-2xl lg:ml-[var(--zig)] lg:text-[26px]"
        >
          {n}
        </motion.li>
      ))}
    </ul>
  )
}
