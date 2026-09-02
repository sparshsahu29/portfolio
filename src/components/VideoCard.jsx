import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Volume2, VolumeX } from 'lucide-react'

/**
 * A 9:16 ad rendered inline. Shows the poster until the visitor taps play, so
 * the page never downloads video it does not need. Only one card plays at a
 * time; starting one pauses every other.
 */
export default function VideoCard({ src, poster, title, rotate = 0 }) {
  const ref = useRef(null)
  const [started, setStarted] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onPlay = () => {
      setPlaying(true)
      document.querySelectorAll('video[data-arsenal]').forEach((v) => {
        if (v !== el && !v.paused) v.pause()
      })
    }
    const onPause = () => setPlaying(false)
    el.addEventListener('play', onPlay)
    el.addEventListener('pause', onPause)
    el.addEventListener('ended', onPause)
    return () => {
      el.removeEventListener('play', onPlay)
      el.removeEventListener('pause', onPause)
      el.removeEventListener('ended', onPause)
    }
  }, [])

  const start = () => {
    setStarted(true)
    const el = ref.current
    if (!el) return
    el.muted = muted
    el.play().catch(() => {})
  }

  const toggle = () => {
    const el = ref.current
    if (!el) return
    if (el.paused) el.play().catch(() => {})
    else el.pause()
  }

  const toggleMute = (e) => {
    e.stopPropagation()
    const el = ref.current
    if (!el) return
    el.muted = !el.muted
    setMuted(el.muted)
  }

  return (
    <motion.div
      style={{ rotate }}
      whileHover={{ rotate: 0, y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="relative bg-white p-2 shadow-[0_12px_28px_-16px_rgba(18,18,18,0.6)]"
    >
      <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3 opacity-80" />

      <div
        className="group relative aspect-[9/16] w-full cursor-pointer overflow-hidden bg-ink"
        onClick={started ? toggle : start}
        role="button"
        aria-label={playing ? `Pause ${title}` : `Play ${title}`}
      >
        <video
          ref={ref}
          data-arsenal=""
          src={src}
          poster={poster}
          preload="none"
          playsInline
          loop={false}
          className="h-full w-full object-cover"
        />

        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center bg-ink/20 transition group-hover:bg-ink/30">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-crimson shadow-lg transition group-hover:scale-110">
              <Play size={22} className="ml-0.5 fill-current" />
            </span>
          </div>
        )}

        {started && (
          <button
            onClick={toggleMute}
            aria-label={muted ? 'Unmute' : 'Mute'}
            className="absolute right-2 bottom-2 rounded-full bg-ink/60 p-2 text-white backdrop-blur transition hover:bg-ink/80"
          >
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        )}
      </div>
    </motion.div>
  )
}
