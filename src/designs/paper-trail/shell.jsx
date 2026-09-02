import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, Check, Copy, Linkedin, Mail, MapPin, Menu, X } from 'lucide-react'
import { useContent } from '../../content/ContentContext.jsx'

/**
 * The one CTA on the site: a pre-filled email straight to Palak.
 * Uses Gmail's compose URL rather than mailto: — mailto silently does nothing
 * on machines with no default mail client, which is most Windows laptops.
 * On phones this deep-links into the Gmail app.
 */
export function useEmailHref() {
  const { cta, contact } = useContent()
  const params = new URLSearchParams({ view: 'cm', fs: '1', to: contact.email })
  if (cta?.subject) params.set('su', cta.subject)
  if (cta?.body) params.set('body', cta.body)
  return `https://mail.google.com/mail/?${params.toString()}`
}

const emailLinkProps = { target: '_blank', rel: 'noreferrer' }

/** Fallback for visitors who don't use Gmail: copy the address, never display it. */
function CopyEmail({ className = '' }) {
  const { contact } = useContent()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2200)
    return () => clearTimeout(t)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
    } catch {
      // clipboard blocked (http, old browser) — fall back to the OS mail client
      window.location.href = `mailto:${contact.email}`
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className={`inline-flex items-center gap-1.5 border-b border-ink/20 pb-0.5 text-[13px] text-ink/55 transition hover:border-crimson hover:text-crimson ${className}`}
    >
      {copied ? (
        <>
          <Check size={13} className="text-crimson" /> Address copied
        </>
      ) : (
        <>
          <Copy size={13} /> Not on Gmail? Copy my address
        </>
      )}
    </button>
  )
}

/** Scrolls to `#hash` after a client-side navigation, and to top otherwise. */
export function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    const id = hash.slice(1)
    // wait a frame so the target section exists after a route change
    const raf = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    return () => cancelAnimationFrame(raf)
  }, [pathname, hash])

  return null
}

/** Cream paper background + graph-paper overlay used on every page. */
export function PaperShell({ children, className = '' }) {
  return (
    <div className={`paper-bg relative min-h-screen overflow-x-clip text-ink ${className}`}>
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-[0.18]" />
      <div className="relative">{children}</div>
    </div>
  )
}

export function EmailButton({ className = '', size = 'sm', label }) {
  const { cta } = useContent()
  const href = useEmailHref()
  const sizes = {
    sm: 'px-4 py-2 text-[13px]',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base sm:px-10 sm:py-5 sm:text-lg',
  }
  const icon = size === 'lg' ? 19 : 15

  return (
    <a
      href={href}
      {...emailLinkProps}
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-crimson font-semibold text-white transition hover:bg-ink ${sizes[size]} ${className}`}
    >
      <Mail size={icon} />
      {label ?? cta?.label ?? 'Email Me'}
      <ArrowUpRight size={icon} className="transition group-hover:-translate-y-0.5" />
    </a>
  )
}

export function SiteNav() {
  const { nav } = useContent()
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()

  const isActive = (n) => {
    if (n.to === '/blog') return pathname.startsWith('/blog')
    if (n.hash) return pathname === '/' && hash === n.hash
    return pathname === '/' && !hash
  }

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-10">
        <Link to="/" className="shrink-0 font-hand text-2xl leading-none text-crimson">
          palak<span className="text-ink">.</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.links.map((n) => (
            <Link
              key={n.label}
              to={{ pathname: n.to, hash: n.hash ?? '' }}
              className={`text-[13px] font-medium tracking-wide transition hover:text-crimson ${
                isActive(n) ? 'text-crimson' : 'text-ink/60'
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* stays reachable at every scroll position, on every breakpoint */}
          <EmailButton className="hidden sm:inline-flex" />
          <button
            className="md:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-ink/10 px-5 pb-4 md:hidden">
          {nav.links.map((n) => (
            <Link
              key={n.label}
              to={{ pathname: n.to, hash: n.hash ?? '' }}
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium text-ink/70"
            >
              {n.label}
            </Link>
          ))}
          <EmailButton className="mt-2 sm:hidden" />
        </nav>
      )}
    </header>
  )
}

export function SiteFooter({ compact = false }) {
  const { contact, cta } = useContent()
  const email = useEmailHref()

  return (
    <footer
      id="contact"
      className={`relative scroll-mt-20 px-5 sm:px-10 ${compact ? 'pt-16 pb-12' : 'pt-20 pb-16 sm:pt-28'}`}
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="font-hand text-4xl text-crimson sm:text-5xl">{contact.kicker}</p>

        {!compact && (
          <>
            <h2 className="mt-6 font-display text-3xl leading-tight text-ink sm:text-5xl">
              {contact.line1}
            </h2>
            <p className="mt-4 font-display text-2xl text-ink/50 italic sm:text-3xl">
              {contact.line2}
            </p>
          </>
        )}

        <div className="mt-10 flex flex-col items-center gap-5">
          {/* two equal buttons: write to her, or look her up first */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a
              href={email}
              {...emailLinkProps}
              className={`group inline-flex items-center gap-3 bg-crimson font-semibold text-white transition hover:bg-ink ${
                compact ? 'px-6 py-3.5 text-sm' : 'px-8 py-4 text-base sm:px-10 sm:py-5 sm:text-lg'
              }`}
            >
              <Mail size={compact ? 17 : 20} className="shrink-0" />
              {cta?.label ?? 'Email Me'}
              <ArrowUpRight
                size={compact ? 16 : 20}
                className="shrink-0 transition group-hover:-translate-y-0.5"
              />
            </a>

            {contact.linkedin && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="Open Palak's LinkedIn profile"
                className={`group inline-flex items-center gap-3 border-2 border-ink font-semibold text-ink transition hover:bg-ink hover:text-white ${
                  compact ? 'px-6 py-3 text-sm' : 'px-8 py-3.5 text-base sm:px-10 sm:py-[18px] sm:text-lg'
                }`}
              >
                <Linkedin size={compact ? 17 : 20} className="shrink-0" />
                LinkedIn
                <ArrowUpRight
                  size={compact ? 16 : 20}
                  className="shrink-0 transition group-hover:-translate-y-0.5"
                />
              </a>
            )}
          </div>

          <CopyEmail className="-mt-1" />

          {!compact && cta?.closingLabel && (
            <p className="font-hand text-2xl text-bronze">{cta.closingLabel} — I reply myself.</p>
          )}

          <p className="inline-flex items-center gap-2 text-sm text-ink/55">
            <MapPin size={14} /> {contact.location}
          </p>
        </div>

        {!compact && contact.signOff && (
          <img
            src={contact.signOff}
            alt=""
            loading="lazy"
            className="mx-auto mt-14 h-20 w-auto opacity-90"
          />
        )}

        <p className="mt-10 border-t border-ink/10 pt-6 font-mono text-[10px] tracking-[0.24em] text-ink/35 uppercase">
          {contact.name} · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
