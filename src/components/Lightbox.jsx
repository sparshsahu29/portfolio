import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

const LightboxContext = createContext({ open: () => {} })

export const useLightbox = () => useContext(LightboxContext)

export function LightboxProvider({ children }) {
  const [images, setImages] = useState([])
  const [index, setIndex] = useState(0)

  const open = useCallback((imgs, startAt = 0) => {
    setImages(Array.isArray(imgs) ? imgs : [imgs])
    setIndex(startAt)
  }, [])

  const close = useCallback(() => setImages([]), [])
  const next = useCallback(() => setIndex((i) => (i + 1) % images.length), [images.length])
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length],
  )

  useEffect(() => {
    if (!images.length) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [images.length, close, next, prev])

  const value = useMemo(() => ({ open }), [open])

  return (
    <LightboxContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/88 p-4 backdrop-blur-sm sm:p-10"
          >
            <button
              onClick={close}
              className="absolute top-5 right-5 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/20"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    prev()
                  }}
                  className="absolute left-3 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 sm:left-6"
                  aria-label="Previous"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    next()
                  }}
                  className="absolute right-3 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 sm:right-6"
                  aria-label="Next"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            <motion.img
              key={images[index]}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              src={images[index]}
              alt=""
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
            />

            {images.length > 1 && (
              <div className="absolute bottom-6 font-mono text-[11px] tracking-[0.2em] text-white/60">
                {index + 1} / {images.length}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </LightboxContext.Provider>
  )
}
