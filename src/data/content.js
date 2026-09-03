/**
 * Single source of truth for every piece of copy + media on the site.
 * This object is intentionally shaped like the Sanity documents we will create,
 * so swapping `content` for a Sanity query later is a drop-in change.
 */

export const profile = {
  firstName: 'Palak',
  lastName: 'Agarwal',
  fullName: 'Palak Agarwal',
  headline: 'Content with intent',
  tagline: 'Positioning before posting. Always.',
  roles: [
    'MBA',
    'Brand Marketer',
    'Product Marketer',
    'Creative Strategist',
  ],
  oneLiner: 'Turning customer insights into marketing strategies.',
  legacyRoles: ['Product Marketer', 'Creative Strategist', 'Brand Marketer'],
  location: 'Ghaziabad, Uttar Pradesh',
  email: 'palakagarwal512@gmail.com',
  yearsExperience: '4+',
  portraitRed: '/assets/portrait/cover-red.png',
  portraitDress: '/assets/portrait/dress-red.png',
  portraitPhoto: '/assets/portrait/palms.png',
  portraitHire: '/assets/portrait/hire-me.png',
}

/** Global navigation. */
export const nav = {
  brand: 'Palak',
  brandTagline: 'Creative Strategist & Growth-Focused Brand Marketer',
  links: [
    { label: 'Home', to: '/', hash: '' },
    { label: 'Work', to: '/', hash: '#work' },
    { label: 'Services', to: '/', hash: '#services' },
    { label: 'Blog', to: '/blog' },
    { label: 'Contact', to: '/', hash: '#contact' },
  ],
}

/** Primary CTA everywhere on the site: a direct email, not a booking widget. */
export const cta = {
  label: 'Email Me',
  heroLabel: 'Work With Me',
  closingLabel: 'Send me an email',
  subject: 'Project enquiry from your website',
  body: 'Hi Palak,\n\nI came across your portfolio and would like to talk about:\n\n',
}

/** Section 1 — the hook. */
export const hero = {
  eyebrow: 'portfolio',
  headline: 'Content with intent',
  tagline: 'Positioning before posting. Always.',
  subheadline:
    '4+ years building relevance for brands in a world with a 3-second attention span.',
  primaryCta: { label: 'See the Results', href: '#results' },
  secondaryCta: { label: 'Work With Me' },
}

export const about = {
  greeting: 'Hey!',
  intro: "I'm Palak",
  paragraphs: [
    'I spend an unhealthy amount of time thinking about brands. Why do people trust some? Why do they ignore most? Why one line works and another… doesn’t.',
    'Half of me lives in dashboards, audience insights, and content calendars. The other nerdy part of me loves audience psychology and performance metrics.',
    'I care about hooks, but I care more about positioning. I care about trends, but I care more about timing. I care about engagement, but I care most about long-term brand equity.',
  ],
  kicker: 'I zoom out to see the brand & zoom in to fix the comma.',
  // words the PDF highlights in a different colour
  emphasis: [
    'audience psychology',
    'performance metrics',
    'positioning',
    'timing',
    'long-term brand equity',
  ],
}

/** Section 2 — framing for the “Who I am?” page of the deck. The copy itself
 *  lives in `about`, exactly as written in the PDF. */
export const philosophy = {
  title: 'Who I am?',
}

export const randomThings = {
  title: 'Random things about me.',
  // first half renders left of the figure, second half right — top to bottom
  items: [
    'I ask “but why?” until the room goes quiet.',
    'I think clarity is hotter than virality.',
    'I will ask who this is actually for. Repeatedly.',
    'I get suspicious when a “premium” brand screams SALE.',
    'I check if the promise matches the product.',
    'I care about alignment across the funnel.',
    'I care about what happens after the click.',
    'I get suspicious when “limited edition” happens every month.',
  ],
}

export const whatYoullSee = {
  title: 'What You’ll See Next',
  subtitle: '(AKA: Things I professionally overthought)',
  // each stop scrolls to a section id on the homepage
  items: [
    { label: 'Brand Marketing', href: '#results' },
    { label: 'Creative Strategy', href: '#creative-strategy' },
    { label: 'Influencer Collabs', href: '#influencer-collabs' },
    { label: 'Content Creation', href: '#content-creation' },
    { label: 'Copywriting Portfolio', href: '#work' },
  ],
}

/** Section heading for the results block. Brands are listed below it — WHOLELEAF is the first. */
export const results = {
  title: 'Results',
  subtitle: 'Brand strategy, with receipts.',
}

export const caseStudy = {
  client: 'WHOLELEAF',
  eyebrow: 'At WHOLELEAF, we were nowhere',
  before: 'Barely 1 crore a year',
  after: '5.6 crore',
  afterSuffix: 'in less than a year.',
  milestone: 'Raised funding on Shark Tank India Season 5',
  proofImage: '/assets/work/wholeleaf-proof.png',
  breakdown: [
    {
      lead: 'Strategized & wrote',
      highlight: '2500+ ads',
      rest: '(Videos + Statics)',
    },
    {
      lead: 'Ran',
      highlight: 'A/B tests',
      rest: 'on hooks, headlines, and CTAs.',
    },
    {
      lead: 'Analysed metrics',
      highlight: '',
      rest: 'like CPM, CTR, CPC, CAC & ROAS to grow online sales from nothing to 9 crore ARR.',
    },
    {
      lead: 'Grew social media following from',
      highlight: '350 to 20K+',
      rest: 'in one year through audience research & persona mapping.',
    },
    {
      lead: 'Aligned teams across marketing channels to ensure a',
      highlight: 'unified brand voice',
      rest: 'at every touchpoint.',
    },
  ],
}

export const metrics = {
  title: 'Key Performance Metrics of Top-Performing Ads',
  boards: [
    { label: 'Ads Manager — Campaign A · ₹10.25L spend · 2.76 ROAS', image: '/assets/metrics/campaign-a.png' },
    { label: 'Ads Manager — Campaign B · ₹2.48L spend · 3.18 ROAS', image: '/assets/metrics/campaign-b.png' },
  ],
  /** The four numbers that go directly under the WHOLELEAF case study. */
  cards: [
    { value: '350 → 20K+', label: 'Organic followers', sub: 'In one year' },
    { value: '₹9 Cr', label: 'ARR', sub: 'In one year' },
    { value: '17.2M', label: 'Views in 30 days', sub: '97.6% driven by ads' },
    { value: '8.9M', label: 'Impressions', sub: 'Single campaign, paid social' },
  ],
  // pulled straight off the dashboards in the deck
  headline: [
    { value: '17.2M', label: 'Views in 30 days', sub: '97.6% from ads' },
    { value: '6.9M', label: 'Accounts reached', sub: 'Instagram, 30 days' },
    { value: '3.18', label: 'Peak ROAS', sub: 'Campaign B' },
    { value: '₹12.7L', label: 'Ad spend managed', sub: 'Across both campaigns' },
    { value: '2500+', label: 'Ads written', sub: 'Video + static' },
    { value: '20K+', label: 'Organic followers', sub: 'From 350, in a year' },
  ],
  detail: [
    {
      name: 'Campaign A — scale play',
      rows: [
        ['Spend', '₹10,25,650.75'],
        ['Impressions', '8,945,620'],
        ['ROAS', '2.76'],
        ['AOV', '₹1,128.45'],
        ['CPM', '₹114.55'],
        ['Link clicks', '48,365'],
        ['CTR (link)', '1.12%'],
        ['CPC (link)', '₹21.20'],
        ['Engagement rate', '13.92%'],
        ['Click quality', '93.64%'],
        ['Click to purchase', '8.74%'],
      ],
    },
    {
      name: 'Campaign B — efficiency play',
      rows: [
        ['Spend', '₹2,48,732.60'],
        ['Impressions', '682,430'],
        ['ROAS', '3.18'],
        ['AOV', '₹1,672.35'],
        ['CPM', '₹362.21'],
        ['Link clicks', '6,842'],
        ['CTR (link)', '1.89%'],
        ['CPC (link)', '₹36.32'],
        ['Engagement rate', '32.18%'],
        ['Click quality', '98.76%'],
        ['Click to purchase', '12.45%'],
      ],
    },
  ],
}

export const socialMedia = {
  title: 'Social Media',
  blurb:
    'Copy, calendars and creative direction for feeds that had to sell — not just look nice.',
  insights: [
    '/assets/social/insights-1.png',
    '/assets/social/insights-2.png',
    '/assets/social/insights-3.png',
    '/assets/social/insights-4.png',
    '/assets/social/insights-5.png',
  ],
  grids: [
    '/assets/social/grid-1.png',
    '/assets/social/grid-2.png',
    '/assets/social/grid-3.png',
  ],
}

export const blogs = {
  title: 'Blogs',
  niches: [
    'Skincare',
    'Travel',
    'Mind Body Wellness',
    'WordPress',
    'Finance',
    'Healthcare',
    'AI',
    'Softwares',
    'EdTech',
    'MSMEs',
    'Insurance',
  ],
  groups: [
    {
      title: 'Skincare & Travel',
      tags: ['Skincare', 'Travel'],
      images: [
        '/assets/blogs/skincare-travel-1.png',
        '/assets/blogs/skincare-travel-2.png',
        '/assets/blogs/skincare-travel-3.png',
        '/assets/blogs/skincare-travel-4.png',
        '/assets/blogs/skincare-travel-5.png',
        '/assets/blogs/skincare-travel-6.png',
      ],
    },
    {
      title: 'Wellness, WordPress & Finance',
      tags: ['Mind Body Wellness', 'WordPress', 'Finance'],
      images: [
        '/assets/blogs/wellness-finance-1.png',
        '/assets/blogs/wellness-finance-2.png',
        '/assets/blogs/wellness-finance-3.png',
        '/assets/blogs/wellness-finance-4.png',
        '/assets/blogs/wellness-finance-5.png',
        '/assets/blogs/wellness-finance-6.png',
        '/assets/blogs/wellness-finance-7.png',
        '/assets/blogs/wellness-finance-8.png',
        '/assets/blogs/wellness-finance-9.png',
      ],
    },
    {
      title: 'Healthcare, AI, Software, EdTech, MSMEs & Insurance',
      tags: ['Healthcare', 'AI', 'Softwares', 'EdTech', 'MSMEs', 'Insurance'],
      images: [
        '/assets/blogs/tech-b2b-1.png',
        '/assets/blogs/tech-b2b-2.png',
        '/assets/blogs/tech-b2b-3.png',
        '/assets/blogs/tech-b2b-4.png',
        '/assets/blogs/tech-b2b-5.png',
        '/assets/blogs/tech-b2b-6.png',
      ],
    },
  ],
}

export const emails = {
  title: 'Emails',
  blurb: 'Lifecycle, launch and win-back flows that people actually open.',
  images: [
    '/assets/emails/email-1.png',
    '/assets/emails/email-2.png',
    '/assets/emails/email-3.png',
  ],
}

export const marketing = {
  title: 'Marketing Content',
  sections: [
    {
      id: 'influencer',
      title: 'Influencer Collabs',
      items: [
        { image: '/assets/influencer/collab-1.png', links: ['Ad Link', 'Creator Profile'] },
        { image: '/assets/influencer/collab-2.png', links: ['Ad Link', 'Creator Profile'] },
        { image: '/assets/influencer/collab-3.png', links: ['Ad Link', 'Creator Profile'] },
        { image: '/assets/influencer/collab-4.png', links: ['Ad Link', 'Creator Profile'] },
      ],
    },
    {
      id: 'static-ads',
      title: 'Static Ads',
      items: [
        { image: '/assets/static-ads/static-1.png', links: ['Ad Link'] },
        { image: '/assets/static-ads/static-2.png', links: ['Ad Link'] },
        { image: '/assets/static-ads/static-3.png', links: ['Ad Link'] },
        { image: '/assets/static-ads/static-4.png', links: ['Ad Link'] },
      ],
    },
    {
      id: 'video-ads',
      title: 'Video Ads',
      items: [
        { image: '/assets/video-ads/video-1.png', links: ['Video Link'] },
        { image: '/assets/video-ads/video-2.png', links: ['Video Link'] },
        { image: '/assets/video-ads/video-3.png', links: ['Video Link'] },
        { image: '/assets/video-ads/video-4.png', links: ['Video Link'] },
      ],
    },
    {
      id: 'creation',
      title: 'Content Creation',
      items: [
        { image: '/assets/creation/reel-1.png', links: ['Video Link'] },
        { image: '/assets/creation/reel-2.png', links: ['Video Link'] },
        { image: '/assets/creation/reel-3.png', links: ['Video Link'] },
      ],
    },
  ],
}

/* ---------------------------------------------- section 4: the arsenal */

/**
 * Services / deliverables, grouped so a prospect can see exactly what they can
 * buy. Every item is either a `video` (mp4 + poster, plays inline) or an
 * `image` (opens in the lightbox). Add, reorder or remove freely — the grid
 * adapts. Videos live in /public/assets/video, transcoded to 720x1280 H.264.
 */
const video = (slug, fields) => ({
  type: 'video',
  src: `/assets/video/${slug}.mp4`,
  poster: `/assets/video/${slug}.jpg`,
  ...fields,
})
const still = (path, fields) => ({ type: 'image', image: path, ...fields })

export const services = {
  eyebrow: 'The Arsenal',
  title: 'What you can actually hire me for',
  subtitle: 'Strategy on the inside. Assets you can ship on the outside.',
  grids: [
    {
      id: 'creative-strategy',
      title: 'Creative Strategy',
      blurb:
        'Static and video ads built to be tested — hooks, headlines and CTAs written against a hypothesis, not a mood board.',
      deliverables: ['Static ad creative', 'Video ad scripts', 'Hook & CTA testing', 'Ads copy at scale'],
      items: [
        video('dr-aier', {
          title: 'Dr. Arenna Aier',
          meta: 'WHOLELEAF · Doctor-led video ad',
          note: 'MBBS MD FIPM, Nagaland Pain Management Centre — authority explainer',
        }),
        video('dr-dureja', {
          title: 'Dr. G. P. Dureja',
          meta: 'WHOLELEAF · Doctor-led video ad',
          note: 'Delhi Pain Management Centre — clinical credibility for joint pain',
        }),
        video('joint-pain-story', {
          title: '“I got hysterectomy done”',
          meta: 'WHOLELEAF · Customer story',
          note: 'Real-user testimonial cut for paid social',
        }),
        video('migraine-vo', {
          title: 'MigroHeal',
          meta: 'WHOLELEAF · Voiceover ad',
          note: 'Migraine triggers → relief, scripted for VO',
        }),
        video('senthera-shower-gel', {
          title: 'Senthera Shower Gel',
          meta: 'SENTHERA · UGC-style ad',
          note: 'Selfie-shot, hook-first personal care creative',
        }),
        video('manduva', {
          title: 'Manduva Avakaya Pickle',
          meta: 'MANDUVA · UGC-style ad',
          note: 'Reaction-led food creative for a regional brand',
        }),
        still('/assets/static-ads/static-1.png', {
          title: 'Relief Tincture',
          meta: 'WHOLELEAF · Static ad',
          note: 'Clinically proven plant-based oil for neuropathic pain relief',
        }),
        still('/assets/static-ads/static-3.png', {
          title: 'MigroHeal',
          meta: 'WHOLELEAF · Static ad',
          note: '3 migraine triggers → how MigroHeal provides relief',
        }),
        still('/assets/static-ads/static-2.png', {
          title: 'Orthodexil Joint Pain Oil',
          meta: 'WHOLELEAF · Static ad',
          note: '“Don’t believe in magic pills. Believe in science.”',
        }),
        still('/assets/static-ads/static-4.png', {
          title: 'Muscle & Joint Rub Oil',
          meta: 'WHOLELEAF · Static ad',
          note: '“Don’t just numb joint pain. Treat the root cause.”',
        }),
      ],
    },
    {
      id: 'influencer-collabs',
      title: 'Influencer Collabs',
      blurb:
        'Creator briefs, hooks and captions that keep the brand voice intact while still sounding like the creator.',
      deliverables: ['Creator briefs', 'Hook writing', 'Usage rights copy', 'Whitelisting angles'],
      items: [
        video('roshni-devi', {
          title: 'Roshni Devi',
          meta: 'Fitness creator · Collab',
          note: '103 KG trap bar deadlift — strength-at-any-age angle',
        }),
        video('neha-ranglani', {
          title: 'Neha Ranglani',
          meta: 'Health coach · Collab',
          note: '“In today’s age.” — category-education hook for a colder audience',
        }),
        video('tridha-chaudhary', {
          title: 'Tridha Chaudhary',
          meta: 'Actor · Collab',
          note: 'Celebrity-led trust transfer into the product reveal',
        }),
        video('deepak-mishra', {
          title: 'Deepak Mishra',
          meta: 'Creator · Collab',
          note: 'Hinglish, pain-point-first script',
        }),
      ],
    },
    {
      id: 'content-creation',
      title: 'Content Creation',
      blurb:
        'On-camera scripting and delivery — when the brand needs a face and a point of view, not another stock cut.',
      deliverables: ['Reel scripts', 'On-camera delivery', 'Series formats', 'Caption writing'],
      items: [
        video('palak-self-medication', {
          title: 'Self Medication',
          meta: 'On camera · Reel',
          note: 'Written, shot and delivered by Palak',
        }),
        video('palak-sleep-apnea', {
          title: 'Sleep Apnea',
          meta: 'On camera · Reel',
          note: 'Category education in under a minute',
        }),
        video('palak-ugc', {
          title: 'UGC',
          meta: 'On camera · UGC',
          note: 'Creator-style product content, brand voice intact',
        }),
      ],
    },
  ],
}

/* --------------------------------------- section 5: copywriting portfolio */

export const clientWork = {
  eyebrow: 'Client work',
  title: 'The copywriting portfolio',
  subtitle:
    'Long-form, lifecycle and on-site copy written for other people’s brands, in other people’s voices.',
  tabs: [
    {
      id: 'social',
      label: 'Social',
      note: 'Feeds, calendars and captions built to sell, not just to look nice.',
      images: [
        '/assets/social/grid-1.png',
        '/assets/social/grid-2.png',
        '/assets/social/grid-3.png',
        '/assets/social/insights-1.png',
        '/assets/social/insights-2.png',
        '/assets/social/insights-3.png',
        '/assets/social/insights-4.png',
        '/assets/social/insights-5.png',
      ],
    },
    {
      id: 'blogs',
      label: 'Blogs',
      note: 'Skincare, Travel, Wellness, WordPress, Finance, Healthcare, AI, Software, EdTech, MSMEs and Insurance.',
      images: [
        '/assets/blogs/skincare-travel-1.png',
        '/assets/blogs/skincare-travel-2.png',
        '/assets/blogs/skincare-travel-3.png',
        '/assets/blogs/skincare-travel-4.png',
        '/assets/blogs/skincare-travel-5.png',
        '/assets/blogs/skincare-travel-6.png',
        '/assets/blogs/wellness-finance-1.png',
        '/assets/blogs/wellness-finance-2.png',
        '/assets/blogs/wellness-finance-3.png',
        '/assets/blogs/wellness-finance-4.png',
        '/assets/blogs/wellness-finance-5.png',
        '/assets/blogs/wellness-finance-6.png',
        '/assets/blogs/wellness-finance-7.png',
        '/assets/blogs/wellness-finance-8.png',
        '/assets/blogs/wellness-finance-9.png',
        '/assets/blogs/tech-b2b-1.png',
        '/assets/blogs/tech-b2b-2.png',
        '/assets/blogs/tech-b2b-3.png',
        '/assets/blogs/tech-b2b-4.png',
        '/assets/blogs/tech-b2b-5.png',
        '/assets/blogs/tech-b2b-6.png',
      ],
    },
    {
      id: 'emails',
      label: 'Emails',
      note: 'Newsletters and lifecycle flows — including the Inner Child Healing newsletter.',
      images: [
        '/assets/emails/email-1.png',
        '/assets/emails/email-2.png',
        '/assets/emails/email-3.png',
      ],
    },
    {
      id: 'website-copy',
      label: 'Website Copy',
      note: 'Home, landing and product pages that carry one voice end to end.',
      images: ['/assets/website-copy/copy-1.png', '/assets/website-copy/copy-2.png'],
    },
  ],
}

export const websiteCopy = {
  title: 'Website Copy',
  blurb: 'Home pages, landing pages and product pages that carry the brand voice end to end.',
  images: ['/assets/website-copy/copy-1.png', '/assets/website-copy/copy-2.png'],
}

export const hireMe = {
  title: 'Why Should A Brand Hire Me?',
  subtitle: 'Core Strategic Skills',
  skills: [
    'Consumer Insight & Research',
    'Market & Competitor Analysis',
    'Messaging & Storytelling',
    'Tone & Voice Development',
    'Content Strategy',
    'Funnel Understanding',
    'Attention to Detail',
  ],
  teamNote: 'And… I LOVE working with teams!',
  promise: 'TCH…TCH… I’ll protect your brand voice like it’s mine.',
}

export const testimonials = {
  title: 'Testimonials',
  subtitle: 'Straight from LinkedIn. Nothing edited.',
  images: [
    '/assets/testimonials/testimonial-a-1.png',
    '/assets/testimonials/testimonial-a-2.png',
    '/assets/testimonials/testimonial-b-1.png',
    '/assets/testimonials/testimonial-b-2.png',
  ],
  items: [
    {
      name: 'Anamika Jha',
      role: 'Trauma Healing & Emotional Wellness Coach · Featured twice on NY Times Square',
      relationship: 'Anamika managed Palak directly',
      date: 'August 31, 2024',
      quote:
        'Palak is a highly skilled writer & marketer. I have worked directly with her & her ability to learn & grasp things is pretty quick. Whatever your project requirements are, you just give her a brief idea of it & rest assured you see she’ll bring in her A game in that. As she is a quick learner & highly versatile you can just give brief instructions & relax because you know it’s in good hands. If you are looking for a skillful content writer & good content marketer Palak is your go to person. Go ahead & hire her — you will thank me later.',
      screenshot: '/assets/testimonials/testimonial-a-1.png',
    },
    {
      name: 'Bharti Khatri',
      role: 'Ghostwriter · SEO & Conversion Copywriter',
      relationship: 'Bharti worked with Palak on the same team',
      date: 'August 28, 2024',
      quote:
        'I highly recommend Palak for her fantastic work as a content writer and LinkedIn Growth Manager. Palak is great at planning and always finishes tasks on time. She’s been a great team player and has been helping everyone with her smart strategies and hard work. Palak’s positive attitude and reliability make her a top choice for any team. Working with Palak has been awesome!',
      screenshot: '/assets/testimonials/testimonial-a-2.png',
    },
    {
      name: 'Dr. Mohd Aslam',
      role: 'Founder & CEO, Bakka Bags · Author, “30 Business Hacks”',
      relationship: 'Dr. Mohd was Palak’s client',
      date: 'July 12, 2024',
      quote:
        'I highly recommend Palak for her exceptional content writing and LinkedIn management services. She consistently delivered high-quality, engaging content that resonated with my audience and significantly boosted my online presence. Palak is reliable, creative, and highly skilled in optimizing LinkedIn profiles to enhance visibility and connections. Her dedication and expertise make her a valuable asset for anyone seeking professional content and social media management.',
      screenshot: '/assets/testimonials/testimonial-b-1.png',
    },
    {
      name: 'Sarvam Fating',
      role: 'LinkedIn Ghostwriter for 6-Figure Business Owners & Coaches',
      relationship: 'Sarvam worked with Palak on the same team',
      date: 'June 2, 2024',
      quote:
        'Palak and I work in the same agency. And I’ve seen many writers give up the first time they get unexpected feedback on their write-up. Palak isn’t one of them. Not even close — I’ve seen the passion in her to grow, adapt, and promptly help out with her skills whenever I needed it. I highly recommend Palak if you’re looking for a writer who respects your time and money while excelling with her writing skills.',
      screenshot: '/assets/testimonials/testimonial-b-2.png',
    },
  ],
}

export const contact = {
  kicker: 'We’ll get there ;)',
  line1: 'You are a smart person & understand how much consistent brand voice matters.',
  line2: 'That’s why you are here…',
  name: 'Palak Agarwal',
  location: 'Ghaziabad, Uttar Pradesh',
  email: 'palakagarwal512@gmail.com',
  linkedin: 'https://linkedin.com/in/palakkagarwal',
  linkedinHandle: 'linkedin.com/in/palakkagarwal',
  card: '/assets/doodle/contact-card.png',
  signOff: '/assets/doodle/sign-off.png',
}

/** Section 6 + the dedicated /blog route. */
export const blogPage = {
  teaserEyebrow: 'The Strategist’s Diary',
  teaserTitle: 'Thinking out loud, on the record.',
  teaserSubtitle:
    'Notes on positioning, audience psychology and the small copy decisions that quietly move numbers.',
  teaserCta: 'Read My Blog',
  headline: 'Positioning, Psychology, and Performance.',
  headlineAside: '(And a little bit of overthinking.)',
  intro:
    'Long-form thinking from someone who lives in dashboards and content calendars — and still cares about the comma.',
}

/* ---------------------------------------------------------------- posts */

/**
 * Her own writing lives in Sanity (`post` documents). Nothing is seeded here on
 * purpose — the blog shows an empty state until the first post is published.
 * Blogs written for client brands are a different thing: see `blogs` above.
 */
export const posts = []

export const textures = {
  paper: '/assets/texture/paper.png',
  ruled: '/assets/texture/ruled-paper.png',
  grid: '/assets/texture/grid-paper.png',
  kraft: '/assets/texture/kraft-bag.png',
  socialIcons: '/assets/doodle/social-icons.png',
  canvaDisc: '/assets/doodle/canva-disc.png',
}

export default {
  nav,
  cta,
  hero,
  profile,
  about,
  philosophy,
  randomThings,
  whatYoullSee,
  results,
  caseStudy,
  metrics,
  services,
  clientWork,
  socialMedia,
  blogs,
  emails,
  marketing,
  websiteCopy,
  hireMe,
  testimonials,
  contact,
  blogPage,
  posts,
  textures,
}
