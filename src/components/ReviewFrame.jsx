import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, Eye, EyeOff, Monitor, Smartphone } from 'lucide-react'
import { designs } from '../designs/registry.js'

const DEVICES = [
  { id: 'desktop', icon: Monitor, width: null, label: 'Full width' },
  { id: 'mobile', icon: Smartphone, width: 420, label: 'Mobile' },
]

export default function ReviewFrame({ design, children }) {
  const [visible, setVisible] = useState(true)
  const [device, setDevice] = useState('desktop')
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const activeDevice = DEVICES.find((d) => d.id === device)

  return (
    <div className="min-h-screen bg-[#1a1a1c]">
      <div
        className="mx-auto min-h-screen bg-white transition-[max-width] duration-300"
        style={{ maxWidth: activeDevice.width ? `${activeDevice.width}px` : '100%' }}
      >
        {children}
      </div>

      {!visible && (
        <button
          onClick={() => setVisible(true)}
          className="fixed bottom-5 left-1/2 z-[999] -translate-x-1/2 rounded-full bg-ink/90 p-3 text-white shadow-xl backdrop-blur transition hover:bg-ink"
          aria-label="Show review toolbar"
        >
          <Eye size={16} />
        </button>
      )}

      {visible && (
        <div className="fixed bottom-5 left-1/2 z-[999] w-[min(92vw,760px)] -translate-x-1/2">
          <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/10 bg-ink/90 p-2 text-white shadow-2xl backdrop-blur-xl">
            <Link
              to="/design-review"
              className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft size={14} />
              All designs
            </Link>

            <div className="h-5 w-px bg-white/15" />

            <div className="flex flex-1 flex-wrap items-center gap-1">
              {designs.map((d) => {
                const active = d.id === design.id
                return (
                  <Link
                    key={d.id}
                    to={d.liveAt ?? `/d/${d.id}`}
                    className={`rounded-xl px-3 py-2 text-xs font-medium transition ${
                      active
                        ? 'bg-white text-ink'
                        : 'text-white/60 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="mr-1.5 font-mono text-[10px] opacity-60">{d.number}</span>
                    {d.name}
                    {d.selected && <span className="ml-1.5 text-crimson">●</span>}
                  </Link>
                )
              })}
            </div>

            <div className="h-5 w-px bg-white/15" />

            <div className="flex items-center gap-1">
              {DEVICES.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setDevice(id)}
                  title={label}
                  className={`rounded-xl p-2 transition ${
                    device === id ? 'bg-white text-ink' : 'text-white/60 hover:bg-white/10'
                  }`}
                >
                  <Icon size={14} />
                </button>
              ))}
              <button
                onClick={() => setVisible(false)}
                title="Hide toolbar"
                className="rounded-xl p-2 text-white/60 transition hover:bg-white/10"
              >
                <EyeOff size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
