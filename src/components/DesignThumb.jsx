import { profile } from '../data/content.js'

/** Lightweight, hand-drawn previews so each gallery card reads differently at a glance. */
export default function DesignThumb({ design }) {
  const Thumb = THUMBS[design.id] ?? PaperThumb
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden">
      <Thumb />
    </div>
  )
}

function PaperThumb() {
  return (
    <div className="paper-bg relative h-full w-full">
      <div className="grid-bg absolute inset-0 opacity-25" />
      <img
        src={profile.portraitRed}
        alt=""
        className="absolute right-4 bottom-0 h-[86%] object-contain"
      />
      <div className="absolute top-1/2 left-6 -translate-y-1/2">
        <p className="font-hand text-lg text-crimson">portfolio</p>
        <p className="font-display text-3xl leading-[0.9] text-ink">
          Content
          <br />
          with intent
        </p>
        <p className="mt-2 max-w-[150px] text-[9px] tracking-wide text-ink/60">
          Positioning before posting. Always.
        </p>
      </div>
      <div className="tape top-3 left-10 -rotate-6" />
    </div>
  )
}

function EditorialThumb() {
  return (
    <div className="relative h-full w-full bg-[#FBFAF7] p-5">
      <div className="flex items-center justify-between border-b border-ink/80 pb-1.5">
        <span className="font-mono text-[7px] tracking-[0.2em] uppercase">Palak Agarwal</span>
        <span className="font-mono text-[7px] tracking-[0.2em] uppercase">Est. 2021</span>
      </div>
      <p className="mt-3 font-serif-editorial text-[34px] leading-[0.86] text-ink">
        Positioning
        <br />
        <span className="text-crimson italic">before</span> posting.
      </p>
      <div className="mt-3 grid grid-cols-3 gap-2 border-t border-ink/15 pt-2">
        {['Brand', 'Growth', 'Words'].map((t) => (
          <div key={t}>
            <p className="font-mono text-[6px] tracking-[0.18em] text-ink/40 uppercase">{t}</p>
            <div className="mt-1 space-y-[3px]">
              <div className="h-[2px] w-full bg-ink/15" />
              <div className="h-[2px] w-[85%] bg-ink/15" />
              <div className="h-[2px] w-[92%] bg-ink/15" />
              <div className="h-[2px] w-[60%] bg-ink/15" />
            </div>
          </div>
        ))}
      </div>
      <img
        src={profile.portraitDress}
        alt=""
        className="absolute right-3 -bottom-1 h-[42%] object-contain opacity-90 grayscale"
      />
    </div>
  )
}

function SignalThumb() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0B0B0C] p-5">
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            'linear-gradient(#F4443A 1px, transparent 1px), linear-gradient(90deg, #F4443A 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />
      <div className="relative">
        <p className="font-mono text-[7px] tracking-[0.28em] text-[#F4443A] uppercase">
          Proof · not vibes
        </p>
        <p className="mt-2 font-grotesk text-[30px] leading-[0.9] font-bold text-white">
          17.2M
          <span className="ml-1 text-[11px] font-normal text-white/45">views / 30d</span>
        </p>
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          {[
            ['3.18', 'ROAS'],
            ['2500+', 'ADS'],
            ['15K+', 'GROWN'],
          ].map(([v, l]) => (
            <div key={l} className="rounded border border-white/10 bg-white/[0.04] px-2 py-1.5">
              <p className="font-grotesk text-[13px] font-bold text-[#79BBA6]">{v}</p>
              <p className="font-mono text-[6px] tracking-[0.16em] text-white/35">{l}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex h-8 items-end gap-[3px]">
          {[30, 55, 42, 78, 61, 90, 70, 100, 84, 66, 95, 74].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-[#F4443A]/70"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function BentoThumb() {
  return (
    <div className="grid h-full w-full grid-cols-4 grid-rows-3 gap-1.5 bg-[#F7F4EF] p-3">
      <div className="col-span-2 row-span-2 flex flex-col justify-between rounded-xl bg-crimson p-3 text-white">
        <span className="font-mono text-[6px] tracking-[0.2em] uppercase">Hey, I’m</span>
        <span className="font-grotesk text-2xl leading-none font-bold">Palak</span>
      </div>
      <div className="col-span-2 rounded-xl bg-white p-2">
        <p className="font-grotesk text-[15px] leading-none font-bold text-ink">17.2M</p>
        <p className="font-mono text-[6px] tracking-[0.14em] text-ink/40 uppercase">views</p>
      </div>
      <div className="rounded-xl bg-mint/70" />
      <div className="overflow-hidden rounded-xl bg-kraft/40">
        <img src={profile.portraitPhoto} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="col-span-2 rounded-xl bg-ink p-2">
        <p className="font-grotesk text-[9px] leading-tight font-semibold text-white">
          Clarity &gt; virality
        </p>
      </div>
      <div className="rounded-xl bg-white" />
      <div className="rounded-xl bg-bronze/30" />
    </div>
  )
}

const THUMBS = {
  'paper-trail': PaperThumb,
  editorial: EditorialThumb,
  signal: SignalThumb,
  bento: BentoThumb,
}
