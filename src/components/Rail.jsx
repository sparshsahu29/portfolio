import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * Horizontal snap rail. Native scrolling (swipe / trackpad / shift-wheel) plus
 * arrow buttons that page by one viewport. Arrows hide at either end, and the
 * rail bleeds to the viewport edge on small screens so it reads as scrollable.
 * Content centres when it fits and left-aligns once it overflows.
 */
export default function Rail({ children, className = '' }) {
  const ref = useRef(null)
  const [edge, setEdge] = useState({ start: true, end: false })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const max = el.scrollWidth - el.clientWidth
      setEdge({ start: el.scrollLeft <= 2, end: el.scrollLeft >= max - 2 })
    }
    update()
    el.addEventListener('scroll', update, { passive: true })
    const ro = new ResizeObserver(update)
    ro.observe(el)
    for (const child of el.children) ro.observe(child)
    return () => {
      el.removeEventListener('scroll', update)
      ro.disconnect()
    }
  }, [children])

  const page = (dir) => {
    const el = ref.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  const scrollable = !(edge.start && edge.end)

  return (
    <div className={`group/rail relative ${className}`}>
      <div
        ref={ref}
        className={`scrollbar-none -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pt-4 pb-4 sm:-mx-10 sm:scroll-px-10 sm:px-10 sm:gap-7 ${
          scrollable ? 'justify-start' : 'justify-center'
        }`}
      >
        {children}
      </div>

      {/* edge fades */}
      <div
        className={`pointer-events-none absolute inset-y-0 -left-5 w-8 bg-gradient-to-r from-cream/45 to-transparent transition-opacity sm:-left-10 ${
          edge.start ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <div
        className={`pointer-events-none absolute inset-y-0 -right-5 w-8 bg-gradient-to-l from-cream/45 to-transparent transition-opacity sm:-right-10 ${
          edge.end ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {scrollable && (
        <>
          <RailButton dir={-1} hidden={edge.start} onClick={() => page(-1)} />
          <RailButton dir={1} hidden={edge.end} onClick={() => page(1)} />
        </>
      )}
    </div>
  )
}

function RailButton({ dir, hidden, onClick }) {
  const Icon = dir < 0 ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir < 0 ? 'Scroll left' : 'Scroll right'}
      tabIndex={hidden ? -1 : 0}
      className={`absolute top-[38%] z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-ink/15 bg-white text-ink shadow-[0_10px_24px_-12px_rgba(18,18,18,0.6)] transition hover:border-crimson hover:bg-crimson hover:text-white sm:flex ${
        dir < 0 ? '-left-3 lg:-left-6' : '-right-3 lg:-right-6'
      } ${hidden ? 'pointer-events-none scale-75 opacity-0' : 'opacity-100'}`}
    >
      <Icon size={18} />
    </button>
  )
}
