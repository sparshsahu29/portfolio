import { lazy } from 'react'
import Home from '../pages/Home.jsx'

const Editorial = lazy(() => import('./editorial/Editorial.jsx'))
const Signal = lazy(() => import('./signal/Signal.jsx'))
const Bento = lazy(() => import('./bento/Bento.jsx'))

export const designs = [
  {
    id: 'paper-trail',
    number: '01',
    name: 'Paper Trail',
    subtitle: 'The deck, made alive',
    pitch:
      'A one-to-one translation of the current PDF. Same aged-paper texture, same crimson, same torn notebook cutouts and handwriting — just scrollable, clickable and responsive.',
    bestFor: 'Keeping the exact identity she already loves.',
    swatches: ['#F2F1EB', '#C01111', '#734E0A', '#121212'],
    typography: 'Playfair Display + DM Sans + Caveat',
    vibe: ['Scrapbook', 'Analog', 'Warm', 'Familiar'],
    accent: '#C01111',
    surface: '#F2F1EB',
    selected: true,
    liveAt: '/',
    Component: Home,
  },
  {
    id: 'editorial',
    number: '02',
    name: 'Editorial',
    subtitle: 'Marketing desk of a magazine',
    pitch:
      'Newsprint grid, oversized serif headlines, hairline rules and generous white space. Positions her as a thinker and writer first — the case studies read like features.',
    bestFor: 'Authority, thought leadership, and the blog.',
    swatches: ['#FBFAF7', '#111111', '#C01111', '#8A8578'],
    typography: 'Instrument Serif + DM Sans',
    vibe: ['Editorial', 'Calm', 'Premium', 'Text-led'],
    accent: '#C01111',
    surface: '#FBFAF7',
    Component: Editorial,
  },
  {
    id: 'signal',
    number: '03',
    name: 'Signal',
    subtitle: 'Performance marketer, dark mode',
    pitch:
      'Dark, data-forward and kinetic. Leads with the numbers — 17.2M views, 3.18 ROAS, ₹1Cr spend — with live-counting stats and a dashboard feel. Says "I can prove it".',
    bestFor: 'Performance / growth roles and D2C founders.',
    swatches: ['#0B0B0C', '#F4443A', '#79BBA6', '#EDEAE3'],
    typography: 'Space Grotesk + JetBrains Mono',
    vibe: ['Bold', 'Technical', 'Kinetic', 'Proof-led'],
    accent: '#F4443A',
    surface: '#0B0B0C',
    Component: Signal,
  },
  {
    id: 'bento',
    number: '04',
    name: 'Bento',
    subtitle: 'Playful, modern, snackable',
    pitch:
      'A soft, rounded bento grid where every card is a different piece of the story. Fast to scan, fun to scroll, and the easiest layout to keep adding to from the CMS.',
    bestFor: 'Personality, recruiters skimming on mobile.',
    swatches: ['#F7F4EF', '#C01111', '#79BBA6', '#9E8463'],
    typography: 'Space Grotesk + DM Sans',
    vibe: ['Friendly', 'Modular', 'Contemporary', 'Scannable'],
    accent: '#C01111',
    surface: '#F7F4EF',
    Component: Bento,
  },
]

export const getDesign = (id) => designs.find((d) => d.id === id)
